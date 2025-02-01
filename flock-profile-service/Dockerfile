# syntax=docker/dockerfile:1

#############################################
# Stage 1: Build the Go application
#############################################
FROM golang:1.23.3 AS builder

WORKDIR /app

# Copy module files first to leverage caching
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the code
COPY . .

# Build the microservice binary (the SERVICE_NAME placeholder will be replaced)
RUN --mount=type=cache,target=/root/.cache/go-build \
    CGO_ENABLED=0 GOOS=linux go build -o /flock-profile-service ./cmd/main.go

#############################################
# Stage 2: Create a lightweight runtime image
#############################################
FROM alpine:3.14

# Add a non-root user for better security
RUN addgroup -S flock-profile-service && adduser -S flock-profile-service -G flock-profile-service

WORKDIR /app

COPY --from=builder /flock-profile-service /app/flock-profile-service

USER flock-profile-service

EXPOSE 8080
ENTRYPOINT ["/app/flock-profile-service"]