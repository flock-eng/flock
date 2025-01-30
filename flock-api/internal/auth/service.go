package auth

import (
	"buf.build/gen/go/wcygan/flock/protocolbuffers/go/auth/v1"
	"connectrpc.com/connect"
	"context"
	"errors"
)

type Service struct{}

func NewService() *Service {
	return &Service{}
}

func (s *Service) Register(ctx context.Context, req *authv1.RegisterRequest) (*authv1.RegisterResponse, error) {
	// Stub implementation
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("auth.v1.FlockAuthService.Register is not implemented"))
}

func (s *Service) Login(ctx context.Context, req *authv1.LoginRequest) (*authv1.LoginResponse, error) {
	// Stub implementation
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("auth.v1.FlockAuthService.Login is not implemented"))
}

func (s *Service) Logout(ctx context.Context, req *authv1.LogoutRequest) (*authv1.LogoutResponse, error) {
	// Stub implementation
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("auth.v1.FlockAuthService.Logout is not implemented"))
}
