package bff

import (
	"context"

	bffv1 "buf.build/gen/go/wcygan/flock/protocolbuffers/go/bff/v1"
	"connectrpc.com/connect"
)

// Handler implements the BFF service handler
type Handler struct {
	service *Service
}

// NewHandler creates a new BFF handler with the given service
func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

// FetchHomepage handles requests to retrieve homepage data
func (h *Handler) FetchHomepage(ctx context.Context, req *connect.Request[bffv1.FetchHomepageRequest]) (*connect.Response[bffv1.FetchHomepageResponse], error) {
	resp, err := h.service.FetchHomepage(ctx, req.Msg)
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(resp), nil
}

// FetchUserProfilePage handles requests to retrieve user profile page data
func (h *Handler) FetchUserProfilePage(ctx context.Context, req *connect.Request[bffv1.FetchUserProfilePageRequest]) (*connect.Response[bffv1.FetchUserProfilePageResponse], error) {
	resp, err := h.service.FetchUserProfilePage(ctx, req.Msg)
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(resp), nil
}
