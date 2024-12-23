# syntax=docker/dockerfile:1

#####################################################
# Stage 1: Build the Go application
#####################################################
FROM golang:1.23.3 AS builder

# Create an app directory
WORKDIR /app

# Copy the module files first for caching
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the code
COPY . .

# Build the "flock-api" executable
RUN --mount=type=cache,target=/root/.cache/go-build \
    CGO_ENABLED=0 GOOS=linux go build -o /flock-api ./cmd/main.go

#####################################################
# Stage 2: Create a lightweight runtime image
#####################################################
FROM alpine:3.14

# (Optional) Add a non-root user for better security
RUN addgroup -S flock && adduser -S flock -G flock

WORKDIR /app
COPY --from=builder /flock-api /app/flock-api

# Switch to non-root user
USER flock

# Expose port 8080
EXPOSE 8080

ENTRYPOINT ["/app/flock-api"]
