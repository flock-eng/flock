package account

import (
	backendv1 "buf.build/gen/go/wcygan/flock/protocolbuffers/go/backend/v1"
	"connectrpc.com/connect"
	"context"
)

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) Login(ctx context.Context, req *connect.Request[backendv1.LoginRequest]) (*connect.Response[backendv1.LoginResponse], error) {
	resp, err := h.service.Login(ctx, req.Msg)
	if err != nil {
		return nil, connect.NewError(connect.CodeUnimplemented, err)
	}
	return connect.NewResponse(resp), nil
}

func (h *Handler) CreateAccount(ctx context.Context, req *connect.Request[backendv1.CreateAccountRequest]) (*connect.Response[backendv1.CreateAccountResponse], error) {
	resp, err := h.service.CreateAccount(ctx, req.Msg)
	if err != nil {
		return nil, connect.NewError(connect.CodeUnimplemented, err)
	}
	return connect.NewResponse(resp), nil
}
