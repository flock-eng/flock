package post

import (
	"context"

	postv1 "buf.build/gen/go/wcygan/flock/protocolbuffers/go/post/v1"
	"connectrpc.com/connect"
)

// Handler implements the post service handler
type Handler struct {
	service *Service
}

// NewHandler creates a new post handler with the given service
func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

// CreatePost handles requests to create new posts
func (h *Handler) CreatePost(ctx context.Context, req *connect.Request[postv1.CreatePostRequest]) (*connect.Response[postv1.CreatePostResponse], error) {
	resp, err := h.service.CreatePost(ctx, req.Msg)
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(resp), nil
}

// GetPost handles requests to retrieve a single post
func (h *Handler) GetPost(ctx context.Context, req *connect.Request[postv1.GetPostRequest]) (*connect.Response[postv1.GetPostResponse], error) {
	resp, err := h.service.GetPost(ctx, req.Msg)
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(resp), nil
}

// BatchGetPost handles requests to retrieve multiple posts
func (h *Handler) BatchGetPost(ctx context.Context, req *connect.Request[postv1.BatchGetPostRequest]) (*connect.Response[postv1.BatchGetPostResponse], error) {
	resp, err := h.service.BatchGetPost(ctx, req.Msg)
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(resp), nil
}

// UpdatePost handles requests to update existing posts
func (h *Handler) UpdatePost(ctx context.Context, req *connect.Request[postv1.UpdatePostRequest]) (*connect.Response[postv1.UpdatePostResponse], error) {
	resp, err := h.service.UpdatePost(ctx, req.Msg)
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(resp), nil
}
