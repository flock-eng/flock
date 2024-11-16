package account

import (
    "context"
    "errors"
    backendv1 "buf.build/gen/go/wcygan/flock/protocolbuffers/go/backend/v1"
)

type Service struct{}

func NewService() *Service {
    return &Service{}
}

func (s *Service) Login(ctx context.Context, request *backendv1.LoginRequest) (*backendv1.LoginResponse, error) {
    return nil, errors.New("backend.v1.AccountService.Login is not implemented")
}

func (s *Service) CreateAccount(ctx context.Context, request *backendv1.CreateAccountRequest) (*backendv1.CreateAccountResponse, error) {
    return nil, errors.New("backend.v1.AccountService.CreateAccount is not implemented")
}
