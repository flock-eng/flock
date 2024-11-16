package home_page

import (
	"buf.build/gen/go/wcygan/flock/connectrpc/go/frontend/v1/frontendv1connect"
	"buf.build/gen/go/wcygan/flock/protocolbuffers/go/frontend/v1"
	"connectrpc.com/connect"
	"context"
	"errors"
)

type Handler struct{}

func (h *Handler) GetHomePage(ctx context.Context, req *connect.Request[frontendv1.GetHomePageRequest]) (*connect.Response[frontendv1.GetHomePageResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("frontend.v1.HomePageService.GetHomePage is not implemented"))
}
