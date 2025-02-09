package post

import (
	"context"

	postv1 "buf.build/gen/go/wcygan/flock/protocolbuffers/go/post/v1"
	"connectrpc.com/connect"
)

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) CreatePost(ctx context.Context, req *connect.Request[postv1.CreatePostRequest]) (*connect.Response[postv1.CreatePostResponse], error) {
	resp, err := h.service.CreatePost(ctx, req.Msg)
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(resp), nil
}

func (h *Handler) GetPost(ctx context.Context, req *connect.Request[postv1.GetPostRequest]) (*connect.Response[postv1.GetPostResponse], error) {
	resp, err := h.service.GetPost(ctx, req.Msg)
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(resp), nil
}

func (h *Handler) BatchGetPost(ctx context.Context, req *connect.Request[postv1.BatchGetPostRequest]) (*connect.Response[postv1.BatchGetPostResponse], error) {
	resp, err := h.service.BatchGetPost(ctx, req.Msg)
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(resp), nil
}

func (h *Handler) UpdatePost(ctx context.Context, req *connect.Request[postv1.UpdatePostRequest]) (*connect.Response[postv1.UpdatePostResponse], error) {
	resp, err := h.service.UpdatePost(ctx, req.Msg)
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(resp), nil
}
