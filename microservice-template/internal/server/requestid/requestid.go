package requestid

import (
	"context"

	"github.com/google/uuid"
)

// contextKey is a custom type to prevent context key collisions
type contextKey string

// RequestIDKey is the context key for request IDs
const (
	RequestIDKey contextKey = "request_id"
	HeaderKey    string     = "X-Request-ID"
)

// FromContext extracts the request ID from the context
func FromContext(ctx context.Context) string {
	if requestID, ok := ctx.Value(RequestIDKey).(string); ok {
		return requestID
	}
	return ""
}

// NewContext creates a new context with the request ID
func NewContext(ctx context.Context, requestID string) context.Context {
	return context.WithValue(ctx, RequestIDKey, requestID)
}

// Generate creates a new request ID
func Generate() string {
	return uuid.New().String()
}
