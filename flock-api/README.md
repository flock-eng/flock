# Flock API

## gRPC UI

Requires gRPC reflection to be enabled in the server.

```bash
brew install grpcui
go run cmd/main.go
grpcui -plaintext localhost:8080
```