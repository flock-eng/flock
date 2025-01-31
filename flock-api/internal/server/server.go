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
	"github.com/flock-eng/flock/flock-api/internal/service"
)

type Server struct {
	mux *http.ServeMux

	// Services
	services []service.Registerable
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
		mux:      http.NewServeMux(),
		services: make([]service.Registerable, 0),
	}

	// Register all services
	s.registerService(service.NewRegisterableService(
		authv1connect.FlockAuthServiceName,
		func(options ...connect.HandlerOption) (string, http.Handler) {
			return authv1connect.NewFlockAuthServiceHandler(
				auth.NewHandler(auth.NewService()),
				options...,
			)
		},
	))

	s.registerService(service.NewRegisterableService(
		bffv1connect.FlockUserAggregationServiceName,
		func(options ...connect.HandlerOption) (string, http.Handler) {
			return bffv1connect.NewFlockUserAggregationServiceHandler(
				bff.NewHandler(bff.NewService()),
				options...,
			)
		},
	))

	s.registerService(service.NewRegisterableService(
		postv1connect.FlockPostServiceName,
		func(options ...connect.HandlerOption) (string, http.Handler) {
			return postv1connect.NewFlockPostServiceHandler(
				post.NewHandler(post.NewService()),
				options...,
			)
		},
	))

	// Register all handlers with common interceptors
	options := []connect.HandlerOption{
		connect.WithInterceptors(LoggingInterceptor()),
	}
	s.registerHandlers(options...)

	// Register health check
	s.mux.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	return s
}

func (s *Server) registerService(svc service.Registerable) {
	s.services = append(s.services, svc)
}

func (s *Server) registerHandlers(options ...connect.HandlerOption) {
	// Register service handlers
	for _, svc := range s.services {
		path, handler := svc.Handler(options...)
		s.mux.Handle(path, handler)
	}

	// Register reflection service
	serviceNames := make([]string, len(s.services))
	for i, svc := range s.services {
		serviceNames[i] = svc.ServiceName()
	}
	reflector := grpcreflect.NewStaticReflector(serviceNames...)
	path, handler := grpcreflect.NewHandlerV1(reflector)
	s.mux.Handle(path, handler)
}

func (s *Server) Handler() http.Handler {
	return s.mux
}
