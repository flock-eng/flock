# Microservice Template

This is a barebones template for a microservice built with Go. It provides:

- A Dockerfile for building a multi-stage Docker image.
- Live-reload support using Air.
- Kubernetes manifests for deployment.
- Skaffold configuration for easy iterative development and deployment.

To create a new microservice from this template, run the provided script `create_microservice.sh` and pass your desired service name (for example, `profile-service`).

After creating your microservice, adjust the module name and any specific configurations as needed.

## Quick Start

1. Run `./scripts/create_microservice.sh <service-name>` to create a new microservice.
2. Run `air` to start the microservice with live-reload. In another terminal, run `curl http://localhost:8080/healthz` to check that the microservice is running.
3. Commit the changes & push them to GitHub to build the Docker image & push it to Docker Hub.
4. Run `skaffold run` to start the microservice in Kubernetes.

## Protocol Buffers & ConnectRPC

To start developing, install the following dependencies:

- https://buf.build/wcygan/flock/sdks/main:connectrpc/go
- https://buf.build/wcygan/flock/sdks/main:protocolbuffers/go
- https://github.com/connectrpc/connect-go

## Docker

Don't forget to add `.github/workflows/{{service-name}}.yml` to push to docker hub

Generally it will be good to create a PR solely for the initial creation of the microservice and then merge it to trigger the docker build and push to docker hub