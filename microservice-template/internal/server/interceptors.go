package server

import (
	"context"
	"errors"
	"net/http"
	"strings"
	"time"

	"connectrpc.com/connect"
	"github.com/flock-eng/flock/{{SERVICE_NAME}}/internal/logger"
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

func LoggingInterceptor() connect.UnaryInterceptorFunc {
	return func(next connect.UnaryFunc) connect.UnaryFunc {
		return func(ctx context.Context, req connect.AnyRequest) (connect.AnyResponse, error) {
			start := time.Now()
			log := logger.Get()

			// Extract request information
			info := RequestInfo{
				ID:        req.Header().Get("X-Request-ID"),
				Procedure: req.Spec().Procedure,
				Method:    req.HTTPMethod(),
				ClientIP:  getClientIP(req.Header()),
				UserAgent: req.Header().Get("User-Agent"),
			}

			// If no request ID, generate one
			if info.ID == "" {
				info.ID = time.Now().Format(time.RFC3339Nano)
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

func TimeoutInterceptor(timeout time.Duration) connect.UnaryInterceptorFunc {
	return func(next connect.UnaryFunc) connect.UnaryFunc {
		return func(ctx context.Context, req connect.AnyRequest) (connect.AnyResponse, error) {
			ctx, cancel := context.WithTimeout(ctx, timeout)
			defer cancel()

			return next(ctx, req)
		}
	}
}

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
