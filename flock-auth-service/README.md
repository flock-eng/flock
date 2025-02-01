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

## Docker

The images are pushed to https://hub.docker.com/r/wcygan/flock-auth-service/tags

## Kubernetes

### Deploying new versions

After your Docker image is built and pushed to the registry, you can deploy a new version with the following command:

```bash
kubectl rollout restart deployment/flock-auth-service
```

You can use the `:latest` tag to deploy the latest image to Kubernetes. If you're having trouble with that, you can use the `date +'%Y%m%d.%H%M%S'` tag to ensure the latest image is running.