# Flock

Flock is a social media platform.

## Pre-requisites

It is recommended to install the following tools before running the project:

- [Docker](https://docs.docker.com/get-docker/)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- [Skaffold](https://skaffold.dev/docs/install/)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Helm](https://helm.sh/docs/intro/install/)

## Quickstart

```bash
minikube start
minikube addons enable ingress
skaffold run -p infrastructure
skaffold dev
```

When you are done:

```bash
skaffold delete -p infrastructure
```

## Testing

Use these commands to test the services:

```bash
curl -X POST -H "Content-Type: application/json" http://localhost:8080/frontend.v1.ProfilePageService/GetProfilePage -d '{"username": "testuser"}'

curl -X POST -H "Content-Type: application/json" http://localhost:8080/frontend.v1.HomePageService/GetHomePage -d '{}'

curl -X POST -H "Content-Type: application/json" http://localhost:8080/backend.v1.PostService/CreatePost -d '{"author_id": 1, "content": "This is a new post"}'

curl -X POST -H "Content-Type: application/json" http://localhost:8080/backend.v1.PostService/GetPost -d '{"id": 123}'

curl -X POST -H "Content-Type: application/json" http://localhost:8080/backend.v1.PostService/BatchGetPosts -d '{"ids": ["123", "456", "789"]}'

curl -X POST -H "Content-Type: application/json" http://localhost:8080/backend.v1.PostService/ListMostRecentPosts -d '{"post_limit": 10}'

curl -X POST -H "Content-Type: application/json" http://localhost:8080/backend.v1.PostService/ListMostRecentPostsByUser -d '{"author": {"id": "1", "username": "testuser"}, "post_limit": 5}'
```
