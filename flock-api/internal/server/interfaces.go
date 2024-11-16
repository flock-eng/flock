package server

import (
    "context"
    backendv1 "buf.build/gen/go/wcygan/flock/protocolbuffers/go/backend/v1"
    frontendv1 "buf.build/gen/go/wcygan/flock/protocolbuffers/go/frontend/v1"
)

type AccountService interface {
    Login(ctx context.Context, request *backendv1.LoginRequest) (*backendv1.LoginResponse, error)
    CreateAccount(ctx context.Context, request *backendv1.CreateAccountRequest) (*backendv1.CreateAccountResponse, error)
}

type HomePageService interface {
    GetHomePage(ctx context.Context, request *frontendv1.GetHomePageRequest) (*frontendv1.GetHomePageResponse, error)
}

type PostService interface {
    CreatePost(ctx context.Context, request *backendv1.CreatePostRequest) (*backendv1.CreatePostResponse, error)
    GetPost(ctx context.Context, request *backendv1.GetPostRequest) (*backendv1.GetPostResponse, error)
    BatchGetPosts(ctx context.Context, request *backendv1.BatchGetPostsRequest) (*backendv1.BatchGetPostsResponse, error)
    ListMostRecentPosts(ctx context.Context, request *backendv1.ListMostRecentPostsRequest) (*backendv1.ListMostRecentPostsResponse, error)
    ListMostRecentPostsByUser(ctx context.Context, request *backendv1.ListMostRecentPostsByUserRequest) (*backendv1.ListMostRecentPostsByUserResponse, error)
}

type ProfilePageService interface {
    GetProfilePage(ctx context.Context, request *frontendv1.GetProfilePageRequest) (*frontendv1.GetProfilePageResponse, error)
}
