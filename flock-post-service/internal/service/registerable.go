package service

import (
	"net/http"

	"connectrpc.com/connect"
)

// Registerable defines the interface for services that can be registered with the server
type Registerable interface {
	// ServiceName returns the fully qualified protobuf service name
	ServiceName() string

	// Handler returns the connect handler for the service
	Handler(options ...connect.HandlerOption) (string, http.Handler)
}

// RegisterableService is a helper struct that implements Registerable
type RegisterableService struct {
	name    string
	handler func(...connect.HandlerOption) (string, http.Handler)
}

// NewRegisterableService creates a new RegisterableService
func NewRegisterableService(name string, handler func(...connect.HandlerOption) (string, http.Handler)) *RegisterableService {
	return &RegisterableService{
		name:    name,
		handler: handler,
	}
}

func (s *RegisterableService) ServiceName() string {
	return s.name
}

func (s *RegisterableService) Handler(options ...connect.HandlerOption) (string, http.Handler) {
	return s.handler(options...)
} 