package server

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"connectrpc.com/grpchealth"
	"connectrpc.com/grpcreflect"
	"go.uber.org/zap"

	"connectrpc.com/connect"
	"github.com/flock-eng/flock/template-service/internal/logger"
	"github.com/flock-eng/flock/template-service/internal/service"
)

// Config holds the server configuration parameters
type Config struct {
	Port           string
	ReadTimeout    time.Duration
	WriteTimeout   time.Duration
	MaxHeaderBytes int
}

// Dependencies holds all external dependencies required by the server
type Dependencies struct {
	// Add your dependencies here, for example:
	// DB           *sql.DB
	// RedisClient  *redis.Client
	// MessageQueue MessageQueueClient
	// etc...
}

// DependencyInitializer is responsible for initializing external dependencies
type DependencyInitializer interface {
	Initialize(ctx context.Context) (*Dependencies, error)
	Cleanup(ctx context.Context, deps *Dependencies) error
}

// Server is an immutable server instance after construction
type Server struct {
	handler http.Handler
	deps    *Dependencies
}

// Builder handles the registration of services during server construction
type Builder struct {
	cfg      *Config
	mux      *http.ServeMux
	services []service.Registerable
	deps     *Dependencies
}

// NewServerBuilder creates a new Builder instance with the given configuration
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

// WithDependencies adds initialized dependencies to the builder
func (b *Builder) WithDependencies(deps *Dependencies) *Builder {
	b.deps = deps
	return b
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
		deps:    b.deps,
	}
}

// Handler returns the HTTP handler for the server
func (s *Server) Handler() http.Handler {
	return s.handler
}

// Dependencies returns the server's dependencies
func (s *Server) Dependencies() *Dependencies {
	return s.deps
}

// NewServer creates a new server with the default services and optional dependencies
func NewServer(cfg *Config, deps *Dependencies) *Server {
	builder := NewServerBuilder(cfg)

	if deps != nil {
		builder.WithDependencies(deps)
	}

	builder.RegisterService(service.NewRegisterableService(
		grpchealth.HealthV1ServiceName,
		func(options ...connect.HandlerOption) (string, http.Handler) {
			return grpchealth.NewHandler(grpchealth.NewStaticChecker(), options...)
		},
	))

	return builder.Build()
}

// NewServerWithInit creates a new server with dependencies initialized by the provided initializer
func NewServerWithInit(ctx context.Context, cfg *Config, initializer DependencyInitializer) (*Server, error) {
	if initializer == nil {
		return NewServer(cfg, nil), nil
	}

	deps, err := initializer.Initialize(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to initialize dependencies: %w", err)
	}

	return NewServer(cfg, deps), nil
}
