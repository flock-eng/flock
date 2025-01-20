package post

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"time"

	"buf.build/gen/go/wcygan/flock/connectrpc/go/backend/v1/backendv1connect"
	backendv1 "buf.build/gen/go/wcygan/flock/protocolbuffers/go/backend/v1"
	"connectrpc.com/connect"
	"github.com/flock-eng/flock/flock-api/internal/service"
)

type Service struct{}

func NewService() service.RegisterableService {
	return &registeredService{svc: &Service{}}
}

// registeredService wraps the Service to implement RegisterableService
type registeredService struct {
	svc *Service
}

func (w *registeredService) ServiceName() string {
	return backendv1connect.PostServiceName
}

func (w *registeredService) HandlerFunc(opts connect.HandlerOption) (string, http.Handler) {
	return backendv1connect.NewPostServiceHandler(NewHandler(w.svc), opts)
}

func (s *Service) CreatePost(ctx context.Context, request *backendv1.CreatePostRequest) (*backendv1.CreatePostResponse, error) {
	fmt.Printf("Received request to create post with content: %s\n", request.Content)

	dummyPost := &backendv1.Post{
		Id: &backendv1.PostKey{Id: "dummy-id"},
		Author: &backendv1.MiniProfile{
			Key:            &backendv1.ProfileKey{Id: "dummy-author-id"},
			Username:       "foobar",
			FirstName:      "foo",
			LastName:       "bar",
			ProfilePicture: nil,
		},
		Content:   "This is a dummy post content.",
		CreatedAt: time.Now().Unix(),
	}

	response := &backendv1.CreatePostResponse{
		Post: dummyPost,
	}

	return response, nil
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
