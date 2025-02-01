# Microservice Template

This is a barebones template for a microservice built with Go. It provides:

- A Dockerfile for building a multi-stage Docker image.
- Live-reload support using Air.
- Kubernetes manifests for deployment.
- Skaffold configuration for easy iterative development and deployment.

To create a new microservice from this template, run the provided script `create_microservice.sh` and pass your desired service name (for example, `profile-service`).

After creating your microservice, adjust the module name and any specific configurations as needed.

## Template Quick Start

1. Run `./scripts/create_microservice.sh <service-name>` to create a new microservice.
2. Run `air` to start the microservice with live-reload. In another terminal, run `curl http://localhost:8080/healthz` to check that the microservice is running.
3. Commit the changes & push them to GitHub to build the Docker image & push it to Docker Hub.
4. Run `skaffold run` to start the microservice in Kubernetes.

## Development Quick Start

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

Don't forget to add `.github/workflows/{{SERVICE_NAME}}.yaml` to push to docker hub. There is a file called `github-actions-template.yaml` that you can copy and modify. Don't forget to rename it.

Generally it will be good to create a PR solely for the initial creation of the microservice and then merge it to trigger the docker build and push to docker hub.

You can test out docker build and push by doing the following:

```bash
docker build -t wcygan/{{SERVICE_NAME}}:latest .
docker push wcygan/{{SERVICE_NAME}}:latest
```

The action is setup to build for `linux/amd64` and `linux/arm64`.

The images are pushed to https://hub.docker.com/r/wcygan/{{SERVICE_NAME}}/tags

## Kubernetes

### Deploying new versions

After your Docker image is built and pushed to the registry, you can deploy a new version with the following command:

```bash
kubectl rollout restart deployment/{{SERVICE_NAME}}
```

You can use the `:latest` tag to deploy the latest image to Kubernetes. If you're having trouble with that, you can use the `date +'%Y%m%d.%H%M%S'` tag to ensure the latest image is running.