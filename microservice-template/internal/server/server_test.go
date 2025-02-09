package server

import (
	"context"
	"errors"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"connectrpc.com/connect"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

// mockDependencyInitializer implements DependencyInitializer for testing
type mockDependencyInitializer struct {
	initializeFunc func(ctx context.Context) (*Dependencies, error)
	cleanupFunc    func(ctx context.Context, deps *Dependencies) error
}

func (m *mockDependencyInitializer) Initialize(ctx context.Context) (*Dependencies, error) {
	if m.initializeFunc != nil {
		return m.initializeFunc(ctx)
	}
	return &Dependencies{}, nil
}

func (m *mockDependencyInitializer) Cleanup(ctx context.Context, deps *Dependencies) error {
	if m.cleanupFunc != nil {
		return m.cleanupFunc(ctx, deps)
	}
	return nil
}

func TestNewServerBuilder(t *testing.T) {
	tests := []struct {
		name string
		cfg  *Config
		want *Config
	}{
		{
			name: "with nil config",
			cfg:  nil,
			want: &Config{
				Port:           "8080",
				ReadTimeout:    10 * time.Second,
				WriteTimeout:   10 * time.Second,
				MaxHeaderBytes: 1 << 20,
			},
		},
		{
			name: "with custom config",
			cfg: &Config{
				Port:           "9090",
				ReadTimeout:    5 * time.Second,
				WriteTimeout:   5 * time.Second,
				MaxHeaderBytes: 1 << 10,
			},
			want: &Config{
				Port:           "9090",
				ReadTimeout:    5 * time.Second,
				WriteTimeout:   5 * time.Second,
				MaxHeaderBytes: 1 << 10,
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			builder := NewServerBuilder(tt.cfg)
			assert.NotNil(t, builder)
			assert.Equal(t, tt.want, builder.cfg)
			assert.NotNil(t, builder.mux)
			assert.Empty(t, builder.services)
			assert.Nil(t, builder.deps)
		})
	}
}

type mockService struct {
	name    string
	handler http.Handler
	path    string
}

func (m *mockService) ServiceName() string {
	return m.name
}

func (m *mockService) Handler(opts ...connect.HandlerOption) (string, http.Handler) {
	return m.path, m.handler
}

func TestBuilder_RegisterService(t *testing.T) {
	builder := NewServerBuilder(nil)
	mockHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {})

	svc := &mockService{
		name:    "test-service",
		handler: mockHandler,
		path:    "/test.v1.TestService/",
	}

	builder.RegisterService(svc)

	assert.Len(t, builder.services, 1)
	assert.Equal(t, svc, builder.services[0])
}

func TestServer_HealthCheck(t *testing.T) {
	server := NewServer(nil, nil)
	require.NotNil(t, server)

	req := httptest.NewRequest(http.MethodGet, "/healthz", http.NoBody)
	w := httptest.NewRecorder()

	server.Handler().ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestServer_Build(t *testing.T) {
	builder := NewServerBuilder(nil)
	mockHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {})

	svc := &mockService{
		name:    "test-service",
		handler: mockHandler,
		path:    "/test.v1.TestService/",
	}

	deps := &Dependencies{}
	builder.WithDependencies(deps).RegisterService(svc)
	server := builder.Build()

	assert.NotNil(t, server)
	assert.NotNil(t, server.Handler())
	assert.Equal(t, deps, server.Dependencies())

	// Test registered service endpoint
	req := httptest.NewRequest(http.MethodGet, "/test.v1.TestService/", http.NoBody)
	w := httptest.NewRecorder()
	server.Handler().ServeHTTP(w, req)
}

func TestServer_DefaultServices(t *testing.T) {
	server := NewServer(nil, nil)
	require.NotNil(t, server)

	// Test health check endpoint
	req := httptest.NewRequest(http.MethodGet, "/healthz", http.NoBody)
	w := httptest.NewRecorder()
	server.Handler().ServeHTTP(w, req)
	assert.Equal(t, http.StatusOK, w.Code)

	// Test gRPC health check endpoint exists
	req = httptest.NewRequest(http.MethodPost, "/grpc.health.v1.Health/Check", http.NoBody)
	w = httptest.NewRecorder()
	server.Handler().ServeHTTP(w, req)
	// We expect a 415 because we're not sending a proper gRPC request
	assert.Equal(t, http.StatusUnsupportedMediaType, w.Code)
}

func TestNewServerWithInit(t *testing.T) {
	tests := []struct {
		name        string
		initializer DependencyInitializer
		wantErr     bool
	}{
		{
			name:        "nil initializer",
			initializer: nil,
			wantErr:     false,
		},
		{
			name: "successful initialization",
			initializer: &mockDependencyInitializer{
				initializeFunc: func(ctx context.Context) (*Dependencies, error) {
					return &Dependencies{}, nil
				},
			},
			wantErr: false,
		},
		{
			name: "initialization error",
			initializer: &mockDependencyInitializer{
				initializeFunc: func(ctx context.Context) (*Dependencies, error) {
					return nil, errors.New("initialization failed")
				},
			},
			wantErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ctx := context.Background()
			server, err := NewServerWithInit(ctx, nil, tt.initializer)

			if tt.wantErr {
				assert.Error(t, err)
				assert.Nil(t, server)
			} else {
				assert.NoError(t, err)
				assert.NotNil(t, server)
				if tt.initializer != nil {
					assert.NotNil(t, server.Dependencies())
				}
			}
		})
	}
}
