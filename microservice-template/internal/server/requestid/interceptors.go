package requestid

import (
	"context"

	"connectrpc.com/connect"
)

// ServerInterceptor creates a new interceptor that handles request ID propagation for servers
func ServerInterceptor() connect.UnaryInterceptorFunc {
	return connect.UnaryInterceptorFunc(func(next connect.UnaryFunc) connect.UnaryFunc {
		return connect.UnaryFunc(func(ctx context.Context, req connect.AnyRequest) (connect.AnyResponse, error) {
			// Extract or generate request ID
			requestID := req.Header().Get(HeaderKey)
			if requestID == "" {
				requestID = Generate()
			}

			// Add request ID to context
			ctx = NewContext(ctx, requestID)

			// Call the handler
			resp, err := next(ctx, req)

			// Add request ID to response headers
			if resp != nil {
				resp.Header().Set(HeaderKey, requestID)
			}

			return resp, err
		})
	})
}

// ClientInterceptor creates a new interceptor that handles request ID propagation for clients
func ClientInterceptor() connect.UnaryInterceptorFunc {
	return connect.UnaryInterceptorFunc(func(next connect.UnaryFunc) connect.UnaryFunc {
		return connect.UnaryFunc(func(ctx context.Context, req connect.AnyRequest) (connect.AnyResponse, error) {
			// Get request ID from context
			if requestID := FromContext(ctx); requestID != "" {
				req.Header().Set(HeaderKey, requestID)
			}

			return next(ctx, req)
		})
	})
}
