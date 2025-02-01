package server

import (
	"connectrpc.com/grpchealth"
	"go.uber.org/zap"
	"net/http"
	"time"

	"connectrpc.com/connect"
	"connectrpc.com/grpcreflect"
	"github.com/flock-eng/flock/flock-profile-service/internal/logger"
	"github.com/flock-eng/flock/flock-profile-service/internal/service"
)

type Config struct {
	Port           string
	ReadTimeout    time.Duration
	WriteTimeout   time.Duration
	MaxHeaderBytes int
}

// Server is an immutable server instance after construction
type Server struct {
	handler http.Handler
}

// Builder handles the registration of services during server construction
type Builder struct {
	cfg      *Config
	mux      *http.ServeMux
	services []service.Registerable
}

func NewServerBuilder(cfg *Config) *Builder {
	if cfg == nil {
		cfg = &Config{
			Port:           "8080",
			ReadTimeout:    10 * time.Second,
			WriteTimeout:   10 * time.Second,
			MaxHeaderBytes: 1 << 20, // 1MB
		}
	}

	return &Builder{
		cfg:      cfg,
		mux:      http.NewServeMux(),
		services: make([]service.Registerable, 0),
	}
}

// RegisterService adds a service to the builder
func (b *Builder) RegisterService(svc service.Registerable) *Builder {
	b.services = append(b.services, svc)
	logger.Get().Info("Registered ", zap.String("service", svc.ServiceName()))
	return b
}

// Build finalizes the server configuration and returns an immutable Server
func (b *Builder) Build() *Server {
	// Register all handlers with common interceptors
	options := []connect.HandlerOption{
		connect.WithInterceptors(
			LoggingInterceptor(),
			TimeoutInterceptor(10*time.Second),
			ValidationInterceptor(),
		),
	}

	// Register service handlers
	for _, svc := range b.services {
		path, handler := svc.Handler(options...)
		b.mux.Handle(path, handler)
	}

	// Register reflection service
	serviceNames := make([]string, len(b.services))
	for i, svc := range b.services {
		serviceNames[i] = svc.ServiceName()
	}

	reflector := grpcreflect.NewStaticReflector(serviceNames...)
	path, handler := grpcreflect.NewHandlerV1(reflector)
	b.mux.Handle(path, handler)

	// Register health check
	b.mux.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
		logger.Get().Info("Health check request received")
		w.WriteHeader(http.StatusOK)
	})

	return &Server{
		handler: b.mux,
	}
}

// Handler returns the HTTP handler for the server
func (s *Server) Handler() http.Handler {
	return s.handler
}

// NewServer creates a new server with the default services
func NewServer(cfg *Config) *Server {
	builder := NewServerBuilder(cfg)

	builder.RegisterService(service.NewRegisterableService(
		grpchealth.HealthV1ServiceName,
		func(options ...connect.HandlerOption) (string, http.Handler) {
			return grpchealth.NewHandler(grpchealth.NewStaticChecker(), options...)
		},
	))
	return builder.Build()
}
