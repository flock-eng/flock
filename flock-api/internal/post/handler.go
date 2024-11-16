package post

import (
	"buf.build/gen/go/wcygan/flock/connectrpc/go/backend/v1/backendv1connect"
	"buf.build/gen/go/wcygan/flock/protocolbuffers/go/backend/v1"
	"connectrpc.com/connect"
	"context"
	"errors"
)

type Handler struct{}

func (h *Handler) CreatePost(ctx context.Context, req *connect.Request[backendv1.CreatePostRequest]) (*connect.Response[backendv1.CreatePostResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("backend.v1.PostService.CreatePost is not implemented"))
}

func (h *Handler) GetPost(ctx context.Context, req *connect.Request[backendv1.GetPostRequest]) (*connect.Response[backendv1.GetPostResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("backend.v1.PostService.GetPost is not implemented"))
}

func (h *Handler) BatchGetPosts(ctx context.Context, req *connect.Request[backendv1.BatchGetPostsRequest]) (*connect.Response[backendv1.BatchGetPostsResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("backend.v1.PostService.BatchGetPosts is not implemented"))
}

func (h *Handler) ListMostRecentPosts(ctx context.Context, req *connect.Request[backendv1.ListMostRecentPostsRequest]) (*connect.Response[backendv1.ListMostRecentPostsResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("backend.v1.PostService.ListMostRecentPosts is not implemented"))
}

func (h *Handler) ListMostRecentPostsByUser(ctx context.Context, req *connect.Request[backendv1.ListMostRecentPostsByUserRequest]) (*connect.Response[backendv1.ListMostRecentPostsByUserResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("backend.v1.PostService.ListMostRecentPostsByUser is not implemented"))
}
