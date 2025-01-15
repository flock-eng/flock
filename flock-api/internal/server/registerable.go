package server

import (
	"net/http"

	"connectrpc.com/connect"
)

// RegisterableService is an interface that all services must implement
type RegisterableService interface {
	ServiceName() string
	HandlerFunc(connect.HandlerOption) (string, http.Handler)
} 