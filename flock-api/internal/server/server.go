package server

import (
    "net/http"
    "github.com/flock-eng/flock/flock-api/internal/account"
    "github.com/flock-eng/flock/flock-api/internal/home_page"
    "github.com/flock-eng/flock/flock-api/internal/post"
    "github.com/flock-eng/flock/flock-api/internal/profile_page"
    "buf.build/gen/go/wcygan/flock/connectrpc/go/backend/v1/backendv1connect"
    "buf.build/gen/go/wcygan/flock/connectrpc/go/frontend/v1/frontendv1connect"
)

type Server struct {
    mux *http.ServeMux
    
    // Services
    accountService  *account.Service
    homePageService *home_page.Service
    postService     *post.Service
    profileService  *profile_page.Service
}

type Config struct {
    // Add any configuration options here as needed
}

func NewServer(cfg *Config) *Server {
    s := &Server{
        mux: http.NewServeMux(),
    }
    
    s.initializeServices(cfg)
    s.registerHandlers()
    s.registerHealthCheck()
    
    return s
}

func (s *Server) initializeServices(cfg *Config) {
    s.accountService = account.NewService()
    s.homePageService = home_page.NewService()
    s.postService = post.NewService()
    s.profileService = profile_page.NewService()
}

func (s *Server) registerHandlers() {
    s.mux.Handle(backendv1connect.NewAccountServiceHandler(
        account.NewHandler(s.accountService)))
    
    s.mux.Handle(frontendv1connect.NewHomePageServiceHandler(
        home_page.NewHandler(s.homePageService)))
    
    s.mux.Handle(backendv1connect.NewPostServiceHandler(
        post.NewHandler(s.postService)))
    
    s.mux.Handle(frontendv1connect.NewProfilePageServiceHandler(
        profile_page.NewHandler(s.profileService)))
}

func (s *Server) registerHealthCheck() {
    s.mux.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusOK)
    })
}

func (s *Server) Handler() http.Handler {
    return s.mux
}
