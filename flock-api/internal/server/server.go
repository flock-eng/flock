package server

import (
	"net/http"
	"time"

	"connectrpc.com/connect"
	"connectrpc.com/grpcreflect"
	"github.com/flock-eng/flock/flock-api/internal/home_page"
	"github.com/flock-eng/flock/flock-api/internal/post"
	"github.com/flock-eng/flock/flock-api/internal/profile_page"
	"github.com/flock-eng/flock/flock-api/internal/service"
)

// ServiceRegistry handles the registration of services and their reflection
type ServiceRegistry struct {
	mux             *http.ServeMux
	reflectServices []string
	interceptors    connect.HandlerOption
}

// NewServiceRegistry creates a new service registry with the given interceptors
func NewServiceRegistry(mux *http.ServeMux, interceptors connect.HandlerOption) *ServiceRegistry {
	return &ServiceRegistry{
		mux:             mux,
		reflectServices: make([]string, 0),
		interceptors:    interceptors,
	}
}

// RegisterService registers a service handler and adds it to reflection
func (sr *ServiceRegistry) RegisterService(svc service.RegisterableService) {
	path, handler := svc.HandlerFunc(sr.interceptors)
	sr.mux.Handle(path, handler)
	sr.reflectServices = append(sr.reflectServices, svc.ServiceName())
}

// InitializeReflection sets up the gRPC reflection handlers
func (sr *ServiceRegistry) InitializeReflection() {
	reflector := grpcreflect.NewStaticReflector(sr.reflectServices...)
	sr.mux.Handle(grpcreflect.NewHandlerV1(reflector))
	sr.mux.Handle(grpcreflect.NewHandlerV1Alpha(reflector))
}

type Server struct {
	mux      *http.ServeMux
	registry *ServiceRegistry
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

	s.registry = NewServiceRegistry(s.mux, connect.WithInterceptors(LoggingInterceptor()))
	s.initializeServices()
	s.registerHealthCheck()

	return s
}

func (s *Server) initializeServices() {
	// Register all services
	s.registry.RegisterService(home_page.NewService())
	s.registry.RegisterService(post.NewService())
	s.registry.RegisterService(profile_page.NewService())

	// Initialize reflection after all services are registered
	s.registry.InitializeReflection()
}

func (s *Server) registerHealthCheck() {
	s.mux.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})
}

func (s *Server) Handler() http.Handler {
	return s.mux
}
