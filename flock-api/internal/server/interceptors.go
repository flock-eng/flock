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
}

func LoggingInterceptor() connect.UnaryInterceptorFunc {
    return connect.UnaryInterceptorFunc(func(next connect.UnaryFunc) connect.UnaryFunc {
        return func(ctx context.Context, req connect.AnyRequest) (connect.AnyResponse, error) {
            start := time.Now()

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

            // Determine status code and error details
            var status string
            if err != nil {
                if connectErr, ok := err.(*connect.Error); ok {
                    status = connectErr.Code().String()
                } else {
                    status = connect.CodeUnknown.String()
                }
                
                log.Printf("[%s] ✗ Failed %s %s from %s (duration: %v, status: %s): %v",
                    info.ID,
                    info.Method,
                    info.Procedure,
                    info.ClientIP,
                    duration,
                    status,
                    err,
                )
            } else {
                status = connect.CodeOK.String()
                log.Printf("[%s] ✓ Completed %s %s from %s (duration: %v, status: %s)",
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
