.PHONY: fmt lint vet test check tidy build run coverage bench

# Format all Go files
fmt:
	go fmt ./...

# Run golangci-lint
lint:
	golangci-lint run ./...

# Run go vet for static analysis
vet:
	go vet ./...

# Run tests with race detection
test:
	go test -race ./...

dev:
	air

# Run all checks in sequence
check: fmt tidy lint vet test

# Tidy up go.mod and go.sum files
tidy:
	go mod tidy

# Build the binary to bin/template-service
build:
	mkdir -p bin; go build -o bin/template-service ./cmd

# Run the application using go run
run:
	go run ./cmd

# Generate test coverage and create coverage report (coverage.html)
coverage:
	go test -coverprofile=coverage.txt -v ./...
	go tool cover -html=coverage.txt -o coverage.html

# Run benchmarks
bench:
	go test -bench=. ./... 