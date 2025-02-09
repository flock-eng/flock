package auth

import (
	"context"

	authv1 "buf.build/gen/go/wcygan/flock/protocolbuffers/go/auth/v1"
	"connectrpc.com/connect"
)

// Handler implements the authentication service handler
type Handler struct {
	service *Service
}

// NewHandler creates a new authentication handler with the given service
func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

// Register handles user registration requests
func (h *Handler) Register(ctx context.Context, req *connect.Request[authv1.RegisterRequest]) (*connect.Response[authv1.RegisterResponse], error) {
	resp, err := h.service.Register(ctx, req.Msg)
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(resp), nil
}

// Login handles user login requests
func (h *Handler) Login(ctx context.Context, req *connect.Request[authv1.LoginRequest]) (*connect.Response[authv1.LoginResponse], error) {
	resp, err := h.service.Login(ctx, req.Msg)
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(resp), nil
}

// Logout handles user logout requests
func (h *Handler) Logout(ctx context.Context, req *connect.Request[authv1.LogoutRequest]) (*connect.Response[authv1.LogoutResponse], error) {
	resp, err := h.service.Logout(ctx, req.Msg)
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(resp), nil
}
