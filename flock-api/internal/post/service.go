package post

import (
	backendv1 "buf.build/gen/go/wcygan/flock/protocolbuffers/go/backend/v1"
	"context"
	"errors"
)

type Service struct{}

func NewService() *Service {
	return &Service{}
}

func (s *Service) CreatePost(ctx context.Context, request *backendv1.CreatePostRequest) (*backendv1.CreatePostResponse, error) {
	return nil, errors.New("backend.v1.PostService.CreatePost is not implemented")
}

func (s *Service) GetPost(ctx context.Context, request *backendv1.GetPostRequest) (*backendv1.GetPostResponse, error) {
	return nil, errors.New("backend.v1.PostService.GetPost is not implemented")
}

func (s *Service) BatchGetPosts(ctx context.Context, request *backendv1.BatchGetPostsRequest) (*backendv1.BatchGetPostsResponse, error) {
	return nil, errors.New("backend.v1.PostService.BatchGetPosts is not implemented")
}

func (s *Service) ListMostRecentPosts(ctx context.Context, request *backendv1.ListMostRecentPostsRequest) (*backendv1.ListMostRecentPostsResponse, error) {
	return nil, errors.New("backend.v1.PostService.ListMostRecentPosts is not implemented")
}

func (s *Service) ListMostRecentPostsByUser(ctx context.Context, request *backendv1.ListMostRecentPostsByUserRequest) (*backendv1.ListMostRecentPostsByUserResponse, error) {
	return nil, errors.New("backend.v1.PostService.ListMostRecentPostsByUser is not implemented")
}
