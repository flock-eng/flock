package main

import (
	"buf.build/gen/go/wcygan/flock/connectrpc/go/backend/v1/backendv1connect"
	"buf.build/gen/go/wcygan/flock/connectrpc/go/frontend/v1/frontendv1connect"
	"buf.build/gen/go/wcygan/flock/protocolbuffers/go/backend/v1"
	"buf.build/gen/go/wcygan/flock/protocolbuffers/go/frontend/v1"
	"connectrpc.com/connect"
	"context"
	"errors"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
	"log"
	"net/http"
)

func main() {
	port := "8080"
	mux := http.NewServeMux()
	attachHandlers(mux)

	log.Printf("Starting server on :%s", port)

	err := http.ListenAndServe(
		"localhost:"+port,
		// Use h2c so we can serve HTTP/2 without TLS.
		h2c.NewHandler(mux, &http2.Server{}),
	)

	if err != nil {
		log.Fatal(err)
	}
}

func attachHandlers(mux *http.ServeMux) {
	mux.Handle(frontendv1connect.NewProfilePageServiceHandler(&ProfilePageServiceHandler{}))
	mux.Handle(frontendv1connect.NewHomePageServiceHandler(&HomePageServiceHandler{}))
	mux.Handle(backendv1connect.NewPostServiceHandler(&PostServiceHandler{}))
	mux.Handle(backendv1connect.NewAccountServiceHandler(&AccountServiceHandler{}))
}

// ProfilePageServiceHandler implementation
type ProfilePageServiceHandler struct{}

func (h *ProfilePageServiceHandler) GetProfilePage(ctx context.Context, req *connect.Request[frontendv1.GetProfilePageRequest]) (*connect.Response[frontendv1.GetProfilePageResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("frontend.v1.ProfilePageService.GetProfilePage is not implemented"))
}

// HomePageServiceHandler implementation
type HomePageServiceHandler struct{}

func (h *HomePageServiceHandler) GetHomePage(ctx context.Context, req *connect.Request[frontendv1.GetHomePageRequest]) (*connect.Response[frontendv1.GetHomePageResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("frontend.v1.HomePageService.GetHomePage is not implemented"))
}

// PostServiceHandler implementation
type PostServiceHandler struct{}

func (h *PostServiceHandler) CreatePost(ctx context.Context, req *connect.Request[backendv1.CreatePostRequest]) (*connect.Response[backendv1.CreatePostResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("backend.v1.PostService.CreatePost is not implemented"))
}

func (h *PostServiceHandler) GetPost(ctx context.Context, req *connect.Request[backendv1.GetPostRequest]) (*connect.Response[backendv1.GetPostResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("backend.v1.PostService.GetPost is not implemented"))
}

func (h *PostServiceHandler) BatchGetPosts(ctx context.Context, req *connect.Request[backendv1.BatchGetPostsRequest]) (*connect.Response[backendv1.BatchGetPostsResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("backend.v1.PostService.BatchGetPosts is not implemented"))
}

func (h *PostServiceHandler) ListMostRecentPosts(ctx context.Context, req *connect.Request[backendv1.ListMostRecentPostsRequest]) (*connect.Response[backendv1.ListMostRecentPostsResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("backend.v1.PostService.ListMostRecentPosts is not implemented"))
}

func (h *PostServiceHandler) ListMostRecentPostsByUser(ctx context.Context, req *connect.Request[backendv1.ListMostRecentPostsByUserRequest]) (*connect.Response[backendv1.ListMostRecentPostsByUserResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("backend.v1.PostService.ListMostRecentPostsByUser is not implemented"))
}

// AccountServiceHandler implementation
type AccountServiceHandler struct{}

func (h *AccountServiceHandler) Login(ctx context.Context, req *connect.Request[backendv1.LoginRequest]) (*connect.Response[backendv1.LoginResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("backend.v1.AccountService.Login is not implemented"))
}

func (h *AccountServiceHandler) CreateAccount(ctx context.Context, req *connect.Request[backendv1.CreateAccountRequest]) (*connect.Response[backendv1.CreateAccountResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("backend.v1.AccountService.CreateAccount is not implemented"))
}
