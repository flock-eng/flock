# Flock Auth Service

## Quick Start

```bash
# Run the service
air
curl http://localhost:8080/healthz

# Or, run in Kubernetes with live reload through Telepresence
skaffold run
./scripts/live-reload-in-k8s.sh
```

### gRPC

There are a few tools to help with gRPC development:

- [grpcurl](https://github.com/fullstorydev/grpcurl)
- [grpcui](https://github.com/fullstorydev/grpcui)

```bash
grpcurl --plaintext localhost:8080 list
grpc.health.v1.Health

grpcurl --plaintext localhost:8080 grpc.health.v1.Health/Check
{
  "status": "SERVING"
}

grpcui --plaintext localhost:8080
gRPC Web UI available at http://127.0.0.1:port/
```

## Protocol Buffers & ConnectRPC

To start developing, install the following dependencies:

- https://buf.build/wcygan/flock/sdks/main:connectrpc/go
- https://buf.build/wcygan/flock/sdks/main:protocolbuffers/go
- https://github.com/connectrpc/connect-go

## Kubernetes

### Deploying new versions

After your Docker image is built and pushed to the registry, you can deploy a new version with the following command:

```bash
kubectl rollout restart deployment/flock-auth-service
```
