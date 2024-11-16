package account

import (
	"buf.build/gen/go/wcygan/flock/protocolbuffers/go/backend/v1"
	"connectrpc.com/connect"
	"context"
	"errors"
)

type Handler struct{}

func (h *Handler) Login(ctx context.Context, req *connect.Request[backendv1.LoginRequest]) (*connect.Response[backendv1.LoginResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("backend.v1.AccountService.Login is not implemented"))
}

func (h *Handler) CreateAccount(ctx context.Context, req *connect.Request[backendv1.CreateAccountRequest]) (*connect.Response[backendv1.CreateAccountResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("backend.v1.AccountService.CreateAccount is not implemented"))
}
