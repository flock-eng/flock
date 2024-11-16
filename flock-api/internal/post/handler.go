package post

import (
    "connectrpc.com/connect"
    "context"
    backendv1 "buf.build/gen/go/wcygan/flock/protocolbuffers/go/backend/v1"
)

type Handler struct {
    service *Service
}

func NewHandler(service *Service) *Handler {
    return &Handler{service: service}
}

func (h *Handler) CreatePost(ctx context.Context, req *connect.Request[backendv1.CreatePostRequest]) (*connect.Response[backendv1.CreatePostResponse], error) {
    resp, err := h.service.CreatePost(ctx, req.Msg)
    if err != nil {
        return nil, connect.NewError(connect.CodeUnimplemented, err)
    }
    return connect.NewResponse(resp), nil
}

func (h *Handler) GetPost(ctx context.Context, req *connect.Request[backendv1.GetPostRequest]) (*connect.Response[backendv1.GetPostResponse], error) {
    resp, err := h.service.GetPost(ctx, req.Msg)
    if err != nil {
        return nil, connect.NewError(connect.CodeUnimplemented, err)
    }
    return connect.NewResponse(resp), nil
}

func (h *Handler) BatchGetPosts(ctx context.Context, req *connect.Request[backendv1.BatchGetPostsRequest]) (*connect.Response[backendv1.BatchGetPostsResponse], error) {
    resp, err := h.service.BatchGetPosts(ctx, req.Msg)
    if err != nil {
        return nil, connect.NewError(connect.CodeUnimplemented, err)
    }
    return connect.NewResponse(resp), nil
}

func (h *Handler) ListMostRecentPosts(ctx context.Context, req *connect.Request[backendv1.ListMostRecentPostsRequest]) (*connect.Response[backendv1.ListMostRecentPostsResponse], error) {
    resp, err := h.service.ListMostRecentPosts(ctx, req.Msg)
    if err != nil {
        return nil, connect.NewError(connect.CodeUnimplemented, err)
    }
    return connect.NewResponse(resp), nil
}

func (h *Handler) ListMostRecentPostsByUser(ctx context.Context, req *connect.Request[backendv1.ListMostRecentPostsByUserRequest]) (*connect.Response[backendv1.ListMostRecentPostsByUserResponse], error) {
    resp, err := h.service.ListMostRecentPostsByUser(ctx, req.Msg)
    if err != nil {
        return nil, connect.NewError(connect.CodeUnimplemented, err)
    }
    return connect.NewResponse(resp), nil
}
