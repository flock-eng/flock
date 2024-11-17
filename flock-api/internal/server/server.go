package server

import (
	"buf.build/gen/go/wcygan/flock/connectrpc/go/backend/v1/backendv1connect"
	"buf.build/gen/go/wcygan/flock/connectrpc/go/frontend/v1/frontendv1connect"
	"connectrpc.com/connect"
	"github.com/flock-eng/flock/flock-api/internal/home_page"
	"github.com/flock-eng/flock/flock-api/internal/post"
	"github.com/flock-eng/flock/flock-api/internal/profile_page"
	"net/http"
	"time"
)

type Server struct {
	mux *http.ServeMux

	// Services
	homePageService *home_page.Service
	postService     *post.Service
	profileService  *profile_page.Service
}

type Config struct {
	Port           string
	ReadTimeout    time.Duration
	WriteTimeout   time.Duration
	MaxHeaderBytes int
}

func NewServer(cfg *Config) *Server {
	if cfg == nil {
		cfg = &Config{
			Port:           "8080",
			ReadTimeout:    10 * time.Second,
			WriteTimeout:   10 * time.Second,
			MaxHeaderBytes: 1 << 20, // 1MB
		}
	}

	s := &Server{
		mux: http.NewServeMux(),
	}

	s.initializeServices(cfg)
	s.registerHandlers()
	s.registerHealthCheck()

	return s
}

func (s *Server) initializeServices(cfg *Config) {
	s.homePageService = home_page.NewService()
	s.postService = post.NewService()
	s.profileService = profile_page.NewService()
}

func (s *Server) registerHandlers() {
	interceptors := connect.WithInterceptors(LoggingInterceptor())

	s.mux.Handle(frontendv1connect.NewHomePageServiceHandler(
		home_page.NewHandler(s.homePageService),
		interceptors,
	))

	s.mux.Handle(backendv1connect.NewPostServiceHandler(
		post.NewHandler(s.postService),
		interceptors,
	))

	s.mux.Handle(frontendv1connect.NewProfilePageServiceHandler(
		profile_page.NewHandler(s.profileService),
		interceptors,
	))
}

func (s *Server) registerHealthCheck() {
	s.mux.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})
}

func (s *Server) Handler() http.Handler {
	return s.mux
}
