# syntax=docker/dockerfile:1

# Stage 1: Build the Go application
FROM golang:1.23.3 as builder

# Set the Current Working Directory inside the container
WORKDIR /app/flock-api

# Cache dependencies by copying go.mod and go.sum first, and downloading modules
COPY go.mod go.sum ./

# Install the Go dependencies
RUN go mod download

# Copy the entire monorepo into the container's working directory
COPY . .

# Build the "flock-api" executable
RUN --mount=type=cache,target=/root/.cache/go-build \
    CGO_ENABLED=0 GOOS=linux go build -o flock-api ./cmd/main.go

# Stage 2: Create a lightweight runtime image
FROM alpine:3.14

# Copy the built executable and migrations from the builder stage
COPY --from=builder /app/flock-api/flock-api /app/flock-api

WORKDIR /app

# Set the entrypoint to run the executable
ENTRYPOINT ["/app/flock-api"]