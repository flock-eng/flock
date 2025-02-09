package post

import (
	"context"
	"errors"

	postv1 "buf.build/gen/go/wcygan/flock/protocolbuffers/go/post/v1"
	"connectrpc.com/connect"
)

type Service struct{}

func NewService() *Service {
	return &Service{}
}

func (s *Service) CreatePost(ctx context.Context, req *postv1.CreatePostRequest) (*postv1.CreatePostResponse, error) {
	// Stub implementation
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("post.v1.FlockPostService.CreatePost is not implemented"))
}

func (s *Service) GetPost(ctx context.Context, req *postv1.GetPostRequest) (*postv1.GetPostResponse, error) {
	// Stub implementation
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("post.v1.FlockPostService.GetPost is not implemented"))
}

func (s *Service) BatchGetPost(ctx context.Context, req *postv1.BatchGetPostRequest) (*postv1.BatchGetPostResponse, error) {
	// Stub implementation
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("post.v1.FlockPostService.BatchGetPost is not implemented"))
}

func (s *Service) UpdatePost(ctx context.Context, req *postv1.UpdatePostRequest) (*postv1.UpdatePostResponse, error) {
	// Stub implementation
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("post.v1.FlockPostService.UpdatePost is not implemented"))
}
