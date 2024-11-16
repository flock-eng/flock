package home_page

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

func (h *Handler) GetHomePage(ctx context.Context, req *connect.Request[frontendv1.GetHomePageRequest]) (*connect.Response[frontendv1.GetHomePageResponse], error) {
    resp, err := h.service.GetHomePage(ctx, req.Msg)
    if err != nil {
        return nil, connect.NewError(connect.CodeUnimplemented, err)
    }
    return connect.NewResponse(resp), nil
}
