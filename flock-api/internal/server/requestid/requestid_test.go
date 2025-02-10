package requestid

import (
	"context"
	"net/http"
	"testing"

	"connectrpc.com/connect"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type mockRequest struct {
	connect.AnyRequest
	header http.Header
}

func (m *mockRequest) Header() http.Header { return m.header }

type mockResponse struct {
	connect.AnyResponse
	header http.Header
}

func (m *mockResponse) Header() http.Header { return m.header }

func TestRequestIDPropagation(t *testing.T) {
	tests := []struct {
		name           string
		existingReqID  string
		shouldGenerate bool
	}{
		{
			name:           "propagates existing request ID",
			existingReqID:  "test-id-123",
			shouldGenerate: false,
		},
		{
			name:           "generates new request ID when missing",
			existingReqID:  "",
			shouldGenerate: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Create mock request with headers
			req := &mockRequest{
				header: make(http.Header),
			}
			if tt.existingReqID != "" {
				req.header.Set(HeaderKey, tt.existingReqID)
			}

			// Create mock response
			resp := &mockResponse{
				header: make(http.Header),
			}

			// Create server interceptor
			interceptor := ServerInterceptor()
			handler := interceptor(func(ctx context.Context, req connect.AnyRequest) (connect.AnyResponse, error) {
				// Verify request ID in context
				requestID := FromContext(ctx)
				require.NotEmpty(t, requestID)
				if !tt.shouldGenerate {
					assert.Equal(t, tt.existingReqID, requestID)
				}
				return resp, nil
			})

			// Call handler
			_, err := handler(context.Background(), req)
			require.NoError(t, err)

			// Verify response headers
			respID := resp.Header().Get(HeaderKey)
			require.NotEmpty(t, respID)
			if !tt.shouldGenerate {
				assert.Equal(t, tt.existingReqID, respID)
			}
		})
	}
}

func TestClientInterceptor(t *testing.T) {
	tests := []struct {
		name      string
		contextID string
		wantID    string
	}{
		{
			name:      "propagates request ID from context",
			contextID: "test-id-123",
			wantID:    "test-id-123",
		},
		{
			name:      "no request ID in context",
			contextID: "",
			wantID:    "",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Create mock request
			req := &mockRequest{
				header: make(http.Header),
			}

			// Create context with request ID
			ctx := context.Background()
			if tt.contextID != "" {
				ctx = NewContext(ctx, tt.contextID)
			}

			// Create client interceptor
			interceptor := ClientInterceptor()
			handler := interceptor(func(ctx context.Context, req connect.AnyRequest) (connect.AnyResponse, error) {
				// Verify request headers
				assert.Equal(t, tt.wantID, req.Header().Get(HeaderKey))
				return nil, nil
			})

			// Call handler
			_, err := handler(ctx, req)
			require.NoError(t, err)
		})
	}
}

func TestContextFunctions(t *testing.T) {
	// Test NewContext and FromContext
	requestID := "test-id-123"
	ctx := NewContext(context.Background(), requestID)
	assert.Equal(t, requestID, FromContext(ctx))

	// Test FromContext with empty context
	assert.Empty(t, FromContext(context.Background()))
}

func TestGenerate(t *testing.T) {
	// Generate should create unique IDs
	id1 := Generate()
	id2 := Generate()
	assert.NotEqual(t, id1, id2)
	assert.NotEmpty(t, id1)
	assert.NotEmpty(t, id2)
}
