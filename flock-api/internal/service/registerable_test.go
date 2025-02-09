package service

import (
	"net/http"
	"testing"

	"connectrpc.com/connect"
	"github.com/stretchr/testify/assert"
)

func TestNewRegisterableService(t *testing.T) {
	mockHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {})
	handlerFunc := func(opts ...connect.HandlerOption) (string, http.Handler) {
		return "/test", mockHandler
	}

	svc := NewRegisterableService("test-service", handlerFunc)
	assert.NotNil(t, svc, "service should not be nil")
	assert.Equal(t, "test-service", svc.name, "service name should match")
	assert.NotNil(t, svc.handler, "handler function should not be nil")
}

func TestRegisterableService_ServiceName(t *testing.T) {
	tests := []struct {
		name        string
		serviceName string
		want        string
	}{
		{
			name:        "basic service name",
			serviceName: "test.v1.TestService",
			want:        "test.v1.TestService",
		},
		{
			name:        "empty service name",
			serviceName: "",
			want:        "",
		},
		{
			name:        "complex service name",
			serviceName: "auth.v1.FlockAuthService",
			want:        "auth.v1.FlockAuthService",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {})
			handlerFunc := func(opts ...connect.HandlerOption) (string, http.Handler) {
				return "/test", mockHandler
			}

			svc := NewRegisterableService(tt.serviceName, handlerFunc)
			got := svc.ServiceName()
			assert.Equal(t, tt.want, got, "service name should match")
		})
	}
}

func TestRegisterableService_Handler(t *testing.T) {
	tests := []struct {
		name        string
		path        string
		handlerFunc func(opts ...connect.HandlerOption) (string, http.Handler)
	}{
		{
			name: "basic handler",
			path: "/test.v1.TestService/",
			handlerFunc: func(opts ...connect.HandlerOption) (string, http.Handler) {
				return "/test.v1.TestService/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {})
			},
		},
		{
			name: "handler with options",
			path: "/auth.v1.FlockAuthService/",
			handlerFunc: func(opts ...connect.HandlerOption) (string, http.Handler) {
				return "/auth.v1.FlockAuthService/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {})
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			svc := NewRegisterableService("test-service", tt.handlerFunc)

			// Test without options
			path, handler := svc.Handler()
			assert.Equal(t, tt.path, path, "handler path should match")
			assert.NotNil(t, handler, "handler should not be nil")

			// Test with options
			path, handler = svc.Handler(connect.WithInterceptors())
			assert.Equal(t, tt.path, path, "handler path should match with options")
			assert.NotNil(t, handler, "handler should not be nil with options")
		})
	}
}
