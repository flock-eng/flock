package server

import (
	"buf.build/gen/go/wcygan/flock/connectrpc/go/auth/v1/authv1connect"
	"connectrpc.com/connect"
	"github.com/flock-eng/flock/flock-api/internal/auth"
	"net/http"
	"time"
)

type Server struct {
	mux *http.ServeMux

	// Services
	authService *auth.Service
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
	s.authService = auth.NewService()
}

func (s *Server) registerHandlers() {
	interceptors := connect.WithInterceptors(LoggingInterceptor())

	s.mux.Handle(authv1connect.NewFlockAuthServiceHandler(
		auth.NewHandler(s.authService),
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
