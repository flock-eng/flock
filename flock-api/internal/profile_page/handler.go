package profile_page

import (
    "connectrpc.com/connect"
    "context"
    frontendv1 "buf.build/gen/go/wcygan/flock/protocolbuffers/go/frontend/v1"
)

type Handler struct {
    service *Service
}

func NewHandler(service *Service) *Handler {
    return &Handler{service: service}
}

func (h *Handler) GetProfilePage(ctx context.Context, req *connect.Request[frontendv1.GetProfilePageRequest]) (*connect.Response[frontendv1.GetProfilePageResponse], error) {
    resp, err := h.service.GetProfilePage(ctx, req.Msg)
    if err != nil {
        return nil, connect.NewError(connect.CodeUnimplemented, err)
    }
    return connect.NewResponse(resp), nil
}
