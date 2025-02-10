package server

import (
	"context"
	"errors"
	"net/http"
	"strings"
	"sync"
	"time"

	"connectrpc.com/connect"
	"github.com/flock-eng/flock/flock-api/internal/logger"
	"github.com/flock-eng/flock/flock-api/internal/server/requestid"
	"go.uber.org/zap"
)

// RequestInfo holds information about the request for logging
type RequestInfo struct {
	ID        string
	Procedure string
	Method    string
	ClientIP  string
	UserAgent string
}

// LoggingInterceptor creates a new interceptor that logs request information
func LoggingInterceptor() connect.UnaryInterceptorFunc {
	return func(next connect.UnaryFunc) connect.UnaryFunc {
		return func(ctx context.Context, req connect.AnyRequest) (connect.AnyResponse, error) {
			start := time.Now()
			log := logger.Get()

			// Extract request information
			info := RequestInfo{
				ID:        requestid.FromContext(ctx),
				Procedure: req.Spec().Procedure,
				Method:    req.HTTPMethod(),
				ClientIP:  getClientIP(req.Header()),
				UserAgent: req.Header().Get("User-Agent"),
			}

			// Log the incoming request
			log.Info("Request started",
				zap.String("request_id", info.ID),
				zap.String("method", info.Method),
				zap.String("procedure", info.Procedure),
				zap.String("client_ip", info.ClientIP),
				zap.String("user_agent", info.UserAgent),
			)

			// Call the handler
			res, err := next(ctx, req)

			// Calculate duration
			duration := time.Since(start)

			// Determine status code and error details
			if err != nil {
				var connectErr *connect.Error
				status := "unknown"
				if errors.As(err, &connectErr) {
					status = connectErr.Code().String()
				}

				log.Error("Request failed",
					zap.String("request_id", info.ID),
					zap.String("method", info.Method),
					zap.String("procedure", info.Procedure),
					zap.String("client_ip", info.ClientIP),
					zap.Duration("duration", duration),
					zap.String("status", status),
					zap.Error(err),
				)
			} else {
				log.Info("Request completed",
					zap.String("request_id", info.ID),
					zap.String("method", info.Method),
					zap.String("procedure", info.Procedure),
					zap.String("client_ip", info.ClientIP),
					zap.Duration("duration", duration),
					zap.String("status", "success"),
				)
			}

			return res, err
		}
	}
}

// getClientIP extracts the client IP from request headers
func getClientIP(header http.Header) string {
	// Check X-Forwarded-For header first (for proxied requests)
	if xff := header.Get("X-Forwarded-For"); xff != "" {
		ips := strings.Split(xff, ",")
		// Take the first IP in the list
		return strings.TrimSpace(ips[0])
	}

	// Check X-Real-IP header next
	if xrip := header.Get("X-Real-IP"); xrip != "" {
		return xrip
	}

	// If neither header is present, return placeholder
	return "unknown"
}

// Claims represents the JWT claims structure
type Claims struct {
	UserID    string
	Username  string
	Role      string
	ExpiresAt int64
}

// PublicEndpoints defines endpoints that don't require authentication
var PublicEndpoints = map[string]bool{
	"/healthz":                           true,
	"/grpc.health.v1.Health/Check":    true,
	"/auth.v1.FlockAuthService/Login":    true,
	"/auth.v1.FlockAuthService/Register": true,
}

// isPublicEndpoint checks if the given procedure is a public endpoint
func isPublicEndpoint(procedure string) bool {
	return PublicEndpoints[procedure]
}

// extractBearerToken extracts the token from the Authorization header
func extractBearerToken(header http.Header) string {
	auth := header.Get("Authorization")
	if !strings.HasPrefix(auth, "Bearer ") {
		return ""
	}
	return strings.TrimPrefix(auth, "Bearer ")
}

// validateToken is a stub for JWT token validation
// TODO: Implement proper JWT validation
func validateToken(token string) (*Claims, error) {
	// Stub implementation
	if token == "" {
		return nil, errors.New("empty token")
	}

	// TODO: Implement actual JWT validation
	// For now, return dummy claims
	return &Claims{
		UserID:    "stub-user-id",
		Username:  "stub-user",
		Role:      "user",
		ExpiresAt: time.Now().Add(24 * time.Hour).Unix(),
	}, nil
}

// AuthInterceptor provides authentication and authorization for RPC calls
func AuthInterceptor() connect.UnaryInterceptorFunc {
	return func(next connect.UnaryFunc) connect.UnaryFunc {
		return func(ctx context.Context, req connect.AnyRequest) (connect.AnyResponse, error) {
			// Skip auth for public endpoints
			if isPublicEndpoint(req.Spec().Procedure) {
				return next(ctx, req)
			}

			token := extractBearerToken(req.Header())
			if token == "" {
				return nil, connect.NewError(connect.CodeUnauthenticated, errors.New("missing authentication token"))
			}

			// Validate token and add claims to context
			claims, err := validateToken(token)
			if err != nil {
				return nil, connect.NewError(connect.CodeUnauthenticated, err)
			}

			// Define a type for the context key to avoid collisions
			type contextKey string
			const userClaimsKey contextKey = "user_claims"

			// Add claims to context using typed key
			newCtx := context.WithValue(ctx, userClaimsKey, claims)

			return next(newCtx, req)
		}
	}
}

// RateLimitInterceptor implements a token bucket rate limiter for requests
type RateLimitInterceptor struct {
	tokenLimit          int
	tokensPerPeriod     int
	replenishmentPeriod time.Duration
	ipBuckets           map[string]*tokenBucket
	mu                  sync.Mutex
}

type tokenBucket struct {
	tokens          int
	lastReplenished time.Time
}

// NewRateLimitInterceptor creates a new rate limiter with the specified parameters
func NewRateLimitInterceptor(tokenLimit, tokensPerPeriod int, replenishmentPeriod time.Duration) *RateLimitInterceptor {
	return &RateLimitInterceptor{
		tokenLimit:          tokenLimit,
		tokensPerPeriod:     tokensPerPeriod,
		replenishmentPeriod: replenishmentPeriod,
		ipBuckets:           make(map[string]*tokenBucket),
	}
}

// InterceptConnect returns a connect interceptor function that implements rate limiting
func (i *RateLimitInterceptor) InterceptConnect() connect.UnaryInterceptorFunc {
	return func(next connect.UnaryFunc) connect.UnaryFunc {
		return func(ctx context.Context, req connect.AnyRequest) (connect.AnyResponse, error) {
			ip := getClientIP(req.Header())

			i.mu.Lock()
			defer i.mu.Unlock()

			bucket, exists := i.ipBuckets[ip]
			if !exists {
				bucket = &tokenBucket{
					tokens:          i.tokenLimit,
					lastReplenished: time.Now(),
				}
				i.ipBuckets[ip] = bucket
			}

			// Auto-replenish tokens
			now := time.Now()
			elapsed := now.Sub(bucket.lastReplenished)
			periods := int(elapsed / i.replenishmentPeriod)

			if periods > 0 {
				newTokens := periods * i.tokensPerPeriod
				bucket.tokens = min(bucket.tokens+newTokens, i.tokenLimit)
				bucket.lastReplenished = bucket.lastReplenished.Add(time.Duration(periods) * i.replenishmentPeriod)
			}

			if bucket.tokens > 0 {
				bucket.tokens--
				return next(ctx, req)
			}

			return nil, connect.NewError(connect.CodeResourceExhausted, errors.New("rate limit exceeded"))
		}
	}
}

// TimeoutInterceptor creates an interceptor that enforces a timeout for requests
func TimeoutInterceptor(timeout time.Duration) connect.UnaryInterceptorFunc {
	return func(next connect.UnaryFunc) connect.UnaryFunc {
		return func(ctx context.Context, req connect.AnyRequest) (connect.AnyResponse, error) {
			ctx, cancel := context.WithTimeout(ctx, timeout)
			defer cancel()

			return next(ctx, req)
		}
	}
}

// ValidationInterceptor creates an interceptor that validates request messages
func ValidationInterceptor() connect.UnaryInterceptorFunc {
	return func(next connect.UnaryFunc) connect.UnaryFunc {
		return func(ctx context.Context, req connect.AnyRequest) (connect.AnyResponse, error) {
			if validator, ok := req.Any().(interface{ Validate() error }); ok {
				if err := validator.Validate(); err != nil {
					return nil, connect.NewError(connect.CodeInvalidArgument, err)
				}
			}
			return next(ctx, req)
		}
	}
}
