# API

## Quickstart

```bash
# Install the Air CLI
go install github.com/air-verse/air@latest

# Run the server with hot reload
air
```

```bash
grpcui --plaintext localhost:8080
grpcurl --plaintext localhost:8080 list
```

## Docker

The images are pushed to https://hub.docker.com/r/wcygan/flock-api/tags

## Kubernetes

### Deploying new versions

After your Docker image is built and pushed to the registry, you can deploy a new version with the following command:

```bash
kubectl rollout restart deployment/flock-api
```

You can use the `:latest` tag to deploy the latest image to Kubernetes. If you're having trouble with that, you can use the `date +'%Y%m%d.%H%M%S'` tag to ensure the latest image is running.