package server

import (
	"context"
	"errors"
	"net/http"
	"testing"
	"time"

	"connectrpc.com/connect"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type mockRequest struct {
	connect.AnyRequest
	header    http.Header
	procedure string
	method    string
	msg       interface{}
}

func (m *mockRequest) Header() http.Header { return m.header }
func (m *mockRequest) Spec() connect.Spec  { return connect.Spec{Procedure: m.procedure} }
func (m *mockRequest) HTTPMethod() string  { return m.method }
func (m *mockRequest) Any() interface{}    { return m.msg }

type validateMsg struct {
	shouldError bool
}

func (v *validateMsg) Validate() error {
	if v.shouldError {
		return errors.New("validation error")
	}
	return nil
}

func TestLoggingInterceptor(t *testing.T) {
	tests := []struct {
		name       string
		requestID  string
		procedure  string
		method     string
		clientIP   string
		userAgent  string
		shouldFail bool
	}{
		{
			name:      "successful request with all headers",
			requestID: "test-id",
			procedure: "TestService/Method",
			method:    "POST",
			clientIP:  "192.168.1.1",
			userAgent: "test-agent",
		},
		{
			name:      "request without request ID",
			procedure: "TestService/Method",
			method:    "POST",
			clientIP:  "192.168.1.1",
			userAgent: "test-agent",
		},
		{
			name:       "failed request",
			requestID:  "test-id",
			procedure:  "TestService/Method",
			method:     "POST",
			clientIP:   "192.168.1.1",
			userAgent:  "test-agent",
			shouldFail: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			header := make(http.Header)
			if tt.requestID != "" {
				header.Set("X-Request-ID", tt.requestID)
			}
			if tt.clientIP != "" {
				header.Set("X-Forwarded-For", tt.clientIP)
			}
			if tt.userAgent != "" {
				header.Set("User-Agent", tt.userAgent)
			}

			req := &mockRequest{
				header:    header,
				procedure: tt.procedure,
				method:    tt.method,
			}

			interceptor := LoggingInterceptor()
			handler := interceptor(func(ctx context.Context, req connect.AnyRequest) (connect.AnyResponse, error) {
				if tt.shouldFail {
					return nil, connect.NewError(connect.CodeInternal, errors.New("test error"))
				}
				return nil, nil
			})

			_, err := handler(context.Background(), req)
			if tt.shouldFail {
				assert.Error(t, err)
			} else {
				assert.NoError(t, err)
			}
		})
	}
}

func TestTimeoutInterceptor(t *testing.T) {
	tests := []struct {
		name        string
		timeout     time.Duration
		sleepTime   time.Duration
		shouldError bool
	}{
		{
			name:        "request within timeout",
			timeout:     100 * time.Millisecond,
			sleepTime:   50 * time.Millisecond,
			shouldError: false,
		},
		{
			name:        "request exceeds timeout",
			timeout:     50 * time.Millisecond,
			sleepTime:   100 * time.Millisecond,
			shouldError: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			interceptor := TimeoutInterceptor(tt.timeout)
			handler := interceptor(func(ctx context.Context, req connect.AnyRequest) (connect.AnyResponse, error) {
				time.Sleep(tt.sleepTime)
				select {
				case <-ctx.Done():
					return nil, ctx.Err()
				default:
					return nil, nil
				}
			})

			_, err := handler(context.Background(), &mockRequest{})
			if tt.shouldError {
				assert.Error(t, err)
				assert.True(t, errors.Is(err, context.DeadlineExceeded))
			} else {
				assert.NoError(t, err)
			}
		})
	}
}

func TestValidationInterceptor(t *testing.T) {
	tests := []struct {
		name        string
		msg         interface{}
		shouldError bool
	}{
		{
			name:        "valid message",
			msg:         &validateMsg{shouldError: false},
			shouldError: false,
		},
		{
			name:        "invalid message",
			msg:         &validateMsg{shouldError: true},
			shouldError: true,
		},
		{
			name:        "non-validatable message",
			msg:         struct{}{},
			shouldError: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req := &mockRequest{msg: tt.msg}
			interceptor := ValidationInterceptor()
			handler := interceptor(func(ctx context.Context, req connect.AnyRequest) (connect.AnyResponse, error) {
				return nil, nil
			})

			_, err := handler(context.Background(), req)
			if tt.shouldError {
				assert.Error(t, err)
				var connectErr *connect.Error
				require.True(t, errors.As(err, &connectErr))
				assert.Equal(t, connect.CodeInvalidArgument, connectErr.Code())
			} else {
				assert.NoError(t, err)
			}
		})
	}
}

func TestAuthInterceptor(t *testing.T) {
	tests := []struct {
		name        string
		authHeader  string
		shouldError bool
	}{
		{
			name:        "valid auth header",
			authHeader:  "Bearer valid-token",
			shouldError: false,
		},
		{
			name:        "missing auth header",
			authHeader:  "",
			shouldError: true,
		},
		{
			name:        "invalid auth header format",
			authHeader:  "invalid-format",
			shouldError: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			header := make(http.Header)
			if tt.authHeader != "" {
				header.Set("Authorization", tt.authHeader)
			}

			req := &mockRequest{
				header: header,
			}

			interceptor := AuthInterceptor()
			handler := interceptor(func(ctx context.Context, req connect.AnyRequest) (connect.AnyResponse, error) {
				return nil, nil
			})

			_, err := handler(context.Background(), req)
			if tt.shouldError {
				assert.Error(t, err)
				var connectErr *connect.Error
				require.True(t, errors.As(err, &connectErr))
				assert.Equal(t, connect.CodeUnauthenticated, connectErr.Code())
			} else {
				assert.NoError(t, err)
			}
		})
	}
}

func TestRateLimitInterceptor(t *testing.T) {
	tests := []struct {
		name        string
		limit       int
		tokens      int
		period      time.Duration
		requests    int
		shouldError bool
	}{
		{
			name:        "within rate limit",
			limit:       5,
			tokens:      5,
			period:      time.Second,
			requests:    3,
			shouldError: false,
		},
		{
			name:        "exceeds rate limit",
			limit:       2,
			tokens:      2,
			period:      time.Second,
			requests:    3,
			shouldError: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			limiter := NewRateLimitInterceptor(tt.limit, tt.tokens, tt.period)
			interceptor := limiter.InterceptConnect()
			handler := interceptor(func(ctx context.Context, req connect.AnyRequest) (connect.AnyResponse, error) {
				return nil, nil
			})

			var lastErr error
			for i := 0; i < tt.requests; i++ {
				_, err := handler(context.Background(), &mockRequest{})
				if err != nil {
					lastErr = err
					break
				}
			}

			if tt.shouldError {
				assert.Error(t, lastErr)
				var connectErr *connect.Error
				require.True(t, errors.As(lastErr, &connectErr))
				assert.Equal(t, connect.CodeResourceExhausted, connectErr.Code())
			} else {
				assert.NoError(t, lastErr)
			}
		})
	}
}

func TestGetClientIP(t *testing.T) {
	tests := []struct {
		name     string
		headers  map[string]string
		expected string
	}{
		{
			name: "X-Forwarded-For single IP",
			headers: map[string]string{
				"X-Forwarded-For": "192.168.1.1",
			},
			expected: "192.168.1.1",
		},
		{
			name: "X-Forwarded-For multiple IPs",
			headers: map[string]string{
				"X-Forwarded-For": "192.168.1.1, 10.0.0.1",
			},
			expected: "192.168.1.1",
		},
		{
			name: "X-Real-IP",
			headers: map[string]string{
				"X-Real-IP": "192.168.1.1",
			},
			expected: "192.168.1.1",
		},
		{
			name:     "no headers",
			headers:  map[string]string{},
			expected: "unknown",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			header := make(http.Header)
			for k, v := range tt.headers {
				header.Set(k, v)
			}
			assert.Equal(t, tt.expected, getClientIP(header))
		})
	}
} 