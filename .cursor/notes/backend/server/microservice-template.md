# Microservice Template

## Overview
The microservice template provides a standardized foundation for creating new Go-based microservices in the Flock platform. It implements best practices for service development, deployment, and operations.

## Template Structure
```
microservice-template/
├── cmd/                    # Main application entrypoints
│   └── main.go            # Service entry point with server setup
├── internal/              # Private application code
│   ├── logger/           # Logging configuration
│   ├── server/           # Server implementation
│   │   ├── interceptors.go  # gRPC interceptors
│   │   └── server.go       # Server setup and configuration
│   └── service/          # Service implementations
├── scripts/              # Utility scripts
├── .air.toml            # Air configuration for live reload
├── Dockerfile           # Multi-stage build configuration
├── deployment.yaml      # Kubernetes deployment manifests
├── go.mod              # Go module definition
├── go.sum              # Go module checksums
├── skaffold.yaml       # Skaffold configuration
└── github-actions-template.yaml  # CI/CD workflow template
```

## Key Features

### 1. Server Implementation
- Built on Connect-Go for gRPC/HTTP services
- Implements standard interceptors:
  - Logging with request/response details
  - Timeout handling
  - Input validation
- Health check endpoint at `/healthz`
- gRPC reflection enabled for service discovery

### 2. Development Experience
- Live reload using Air
- Local development with:
  ```bash
  air
  ```
- Service health verification:
  ```bash
  grpcurl --plaintext localhost:8080 grpc.health.v1.Health/Check
  ```

### 3. Container Support
- Multi-stage Docker builds
- Optimized layer caching
- Non-root user for security
- Built for both amd64 and arm64 architectures

### 4. Kubernetes Integration
- Ready-to-use deployment manifests
- Resource limits and requests
- Health/readiness probes
- Horizontal Pod Autoscaling
- Skaffold integration for development

### 5. CI/CD
- GitHub Actions workflow
- Automated builds and tests
- Multi-arch Docker image publishing
- Caching for faster builds

## Usage

### Creating a New Service
1. Use the creation script:
   ```bash
   ./scripts/create_microservice.sh flock-new-service
   ```
   - Service name must be prefixed with "flock-"
   - Creates new directory with all template files
   - Automatically updates import paths and service names

2. The script will:
   - Copy template files
   - Replace template-service references
   - Set up GitHub Actions
   - Initialize Go modules
   - Start the service with live reload

### Development Workflow
1. Local Development:
   ```bash
   cd flock-new-service
   air  # Starts service with live reload
   ```

2. Testing gRPC Endpoints:
   ```bash
   # List all services
   grpcurl --plaintext localhost:8080 list
   
   # Health check
   grpcurl --plaintext localhost:8080 grpc.health.v1.Health/Check
   ```

3. Kubernetes Development:
   ```bash
   skaffold run  # Deploy to Kubernetes
   ./scripts/live-reload-in-k8s.sh  # Live reload in cluster
   ```

### Best Practices
1. Service Implementation:
   - Add new services in `internal/service`
   - Implement the `Registerable` interface
   - Register services in `server.NewServer`

2. Error Handling:
   - Use appropriate gRPC status codes
   - Include detailed error messages
   - Log errors with context

3. Configuration:
   - Use environment variables for configuration
   - Document all configuration options
   - Provide sensible defaults

## Evolution History
- 2024-02-09: Initial template with basic gRPC service support
- 2024-02-09: Added GitHub Actions workflow
- 2024-02-09: Updated to use template-service instead of placeholders 