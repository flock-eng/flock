# Microservice Template

This template provides a starting point for creating new microservices in the Flock ecosystem.

## Features

- gRPC/Connect-based API with HTTP/2 support
- Structured logging with Zap
- Health check endpoint
- gRPC reflection support
- Configurable middleware/interceptors:
  - Logging
  - Timeout
  - Request validation
- Docker support
- Kubernetes deployment configuration
- GitHub Actions CI/CD pipeline

## Development

### Prerequisites

- Go 1.23.2 or later
- Docker
- golangci-lint

### Getting Started

1. Copy this template directory and rename all occurrences of "template-service" to your service name
2. Update the module name in `go.mod`
3. Update the import paths in all Go files
4. Update the service name in `github-actions-template.yaml` and move it to `.github/workflows/`

### Local Development

```bash
# Install dependencies
go mod download

# Run linter
golangci-lint run

# Run tests
go test -v -race ./...

# Run the service
go run cmd/main.go
```

### Docker Build

```bash
docker build -t template-service .
docker run -p 8080:8080 template-service
```

### Kubernetes Deployment

```bash
kubectl apply -f deployment.yaml
```

## Project Structure

```
.
├── cmd/                    # Application entrypoints
│   └── main.go            # Main application
├── internal/              # Private application code
│   ├── logger/            # Logging configuration
│   ├── server/            # Server implementation
│   └── service/           # Service implementations
├── .golangci.yml          # Linter configuration
├── Dockerfile             # Docker build configuration
├── deployment.yaml        # Kubernetes deployment configuration
├── github-actions-template.yaml  # CI/CD workflow template
└── README.md             # This file
```

## CI/CD Pipeline

The template includes a GitHub Actions workflow that:

1. On Pull Requests:
   - Runs linting checks
   - Runs tests with race detection
   - Builds the Docker image (without pushing)

2. On Push to Main:
   - Runs linting checks
   - Runs tests with race detection
   - Builds and pushes multi-arch Docker images
   - Tags images with both latest and timestamp versions

### Linting

The project uses golangci-lint with the following linters enabled:
- gofmt: Format checking
- govet: Suspicious constructs
- errcheck: Error handling
- staticcheck: Static analysis
- gosimple: Code simplification
- ineffassign: Assignment efficiency
- typecheck: Type checking
- unused: Unused code
- misspell: Spelling
- gosec: Security
- prealloc: Slice preallocation
- gocritic: Style and diagnostic
- revive: Style and best practices

## License

[Add your license here]