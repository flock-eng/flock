package server

import (
    "connectrpc.com/connect"
    "context"
    "fmt"
    "log"
    "net/http"
    "strings"
    "time"
)

// RequestInfo holds information about the request for logging
type RequestInfo struct {
    ID        string
    Procedure string
    Method    string
    ClientIP  string
    UserAgent string
    Size      int64
}

func LoggingInterceptor() connect.UnaryInterceptorFunc {
    return connect.UnaryInterceptorFunc(func(next connect.UnaryFunc) connect.UnaryFunc {
        return func(ctx context.Context, req connect.AnyRequest) (connect.AnyResponse, error) {
            start := time.Now()

            // Extract HTTP request from context
            httpReq := connect.RequestContext(ctx).Header()

            // Gather request information
            info := RequestInfo{
                ID:        req.Header().Get("X-Request-ID"),
                Procedure: req.Spec().Procedure,
                Method:    req.HTTPMethod(),
                ClientIP:  getClientIP(httpReq),
                UserAgent: req.Header().Get("User-Agent"),
            }

            // If no request ID, generate one
            if info.ID == "" {
                info.ID = fmt.Sprintf("%d", time.Now().UnixNano())
            }

            // Log the incoming request
            log.Printf("[%s] → Started %s %s from %s (User-Agent: %s)",
                info.ID,
                info.Method,
                info.Procedure,
                info.ClientIP,
                info.UserAgent,
            )

            // Call the handler
            res, err := next(ctx, req)

            // Calculate duration
            duration := time.Since(start)

            // Determine status code
            status := http.StatusOK
            if err != nil {
                if connectErr, ok := err.(*connect.Error); ok {
                    status = connect.CodeToHTTP(connectErr.Code())
                } else {
                    status = http.StatusInternalServerError
                }
            }

            // Log the completion
            if err != nil {
                log.Printf("[%s] ✗ Failed %s %s from %s (duration: %v, status: %d): %v",
                    info.ID,
                    info.Method,
                    info.Procedure,
                    info.ClientIP,
                    duration,
                    status,
                    err,
                )
            } else {
                log.Printf("[%s] ✓ Completed %s %s from %s (duration: %v, status: %d)",
                    info.ID,
                    info.Method,
                    info.Procedure,
                    info.ClientIP,
                    duration,
                    status,
                )
            }

            return res, err
        }
    })
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
