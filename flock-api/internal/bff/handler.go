package bff

import (
	"context"

	bffv1 "buf.build/gen/go/wcygan/flock/protocolbuffers/go/bff/v1"
	"connectrpc.com/connect"
)

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) FetchHomepage(ctx context.Context, req *connect.Request[bffv1.FetchHomepageRequest]) (*connect.Response[bffv1.FetchHomepageResponse], error) {
	resp, err := h.service.FetchHomepage(ctx, req.Msg)
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(resp), nil
}

func (h *Handler) FetchUserProfilePage(ctx context.Context, req *connect.Request[bffv1.FetchUserProfilePageRequest]) (*connect.Response[bffv1.FetchUserProfilePageResponse], error) {
	resp, err := h.service.FetchUserProfilePage(ctx, req.Msg)
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(resp), nil
}
