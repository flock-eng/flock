package server

import (
	"net/http"
	"time"

	"buf.build/gen/go/wcygan/flock/connectrpc/go/auth/v1/authv1connect"
	"buf.build/gen/go/wcygan/flock/connectrpc/go/bff/v1/bffv1connect"
	"buf.build/gen/go/wcygan/flock/connectrpc/go/post/v1/postv1connect"
	"connectrpc.com/connect"
	"connectrpc.com/grpcreflect"
	"github.com/flock-eng/flock/flock-api/internal/auth"
	"github.com/flock-eng/flock/flock-api/internal/bff"
	"github.com/flock-eng/flock/flock-api/internal/post"
)

type Server struct {
	mux *http.ServeMux

	// Services
	authService *auth.Service
	bffService  *bff.Service
	postService *post.Service
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

	s.authService = auth.NewService()
	s.bffService = bff.NewService()
	s.postService = post.NewService()

	interceptors := connect.WithInterceptors(LoggingInterceptor())

	// Register auth service
	s.mux.Handle(authv1connect.NewFlockAuthServiceHandler(
		auth.NewHandler(s.authService),
		interceptors,
	))

	// Register BFF service
	s.mux.Handle(bffv1connect.NewFlockUserAggregationServiceHandler(
		bff.NewHandler(s.bffService),
		interceptors,
	))

	// Register Post service
	s.mux.Handle(postv1connect.NewFlockPostServiceHandler(
		post.NewHandler(s.postService),
		interceptors,
	))

	// Register the reflection service
	reflector := grpcreflect.NewStaticReflector(
		authv1connect.FlockAuthServiceName,
		bffv1connect.FlockUserAggregationServiceName,
		postv1connect.FlockPostServiceName,
	)

	s.mux.Handle(grpcreflect.NewHandlerV1(reflector))

	s.mux.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	return s
}

func (s *Server) Handler() http.Handler {
	return s.mux
}
