# Flock

Flock is a social media platform.

## Pre-requisites

It is recommended to install the following tools before running the project:

- [Docker](https://docs.docker.com/get-docker/)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- [Skaffold](https://skaffold.dev/docs/install/)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Helm](https://helm.sh/docs/intro/install/)

## Tailscale

Internally, we are using [Tailscale](https://tailscale.com/kb/1236/kubernetes-operator) to connect to a remote Kubernetes cluster. You can install Tailscale on your local machine by following the instructions [here](https://tailscale.com/download).

The tailnet is scrubbed (it is not actually `your-domain.ts.net`), so the commands below will not work as-is. The tailnet needs to be replaced with the actual tailnet when running the commands.

## Testing

### API

The API can be reached through our Ingress:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  "https://$(kubectl get ing flock-api-ingress -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')/frontend.v1.ProfilePageService/GetProfilePage" \
  -d '{"username":"testuser"}'
```

Here are other commands used for testing:

```bash
curl -X POST -H "Content-Type: application/json" https://$(kubectl get ing flock-api-ingress -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')/frontend.v1.ProfilePageService/GetProfilePage -d '{"username": "testuser"}'

curl -X POST -H "Content-Type: application/json" https://$(kubectl get ing flock-api-ingress -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')/frontend.v1.HomePageService/GetHomePage -d '{}'

curl -X POST -H "Content-Type: application/json" https://$(kubectl get ing flock-api-ingress -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')/backend.v1.PostService/CreatePost -d '{"author_id": 1, "content": "This is a new post"}'

curl -X POST -H "Content-Type: application/json" https://$(kubectl get ing flock-api-ingress -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')/backend.v1.PostService/GetPost -d '{"id": 123}'

curl -X POST -H "Content-Type: application/json" https://$(kubectl get ing flock-api-ingress -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')/backend.v1.PostService/BatchGetPosts -d '{"ids": ["123", "456", "789"]}'

curl -X POST -H "Content-Type: application/json" https://$(kubectl get ing flock-api-ingress -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')/backend.v1.PostService/ListMostRecentPosts -d '{"post_limit": 10}'

curl -X POST -H "Content-Type: application/json" https://$(kubectl get ing flock-api-ingress -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')/backend.v1.PostService/ListMostRecentPostsByUser -d '{"author": {"id": "1", "username": "testuser"}, "post_limit": 5}'
```

### KeyCloak

Access the KeyCloak admin console:

```bash
open "https://$(kubectl get ing keycloak -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')"
```

Access the KeyCloak account console:

```bash
open "https://$(kubectl get ing keycloak -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')/realms/flock/account/"
```
