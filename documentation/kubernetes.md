# Kubernetes FAQ

## Deploy latest images to Kubernetes

Did you just merge a PR and push a new image to Docker Hub? You can deploy the latest images to Kubernetes by running the following commands:

```bash
kubectl rollout restart deployment flock-web
kubectl rollout restart deployment flock-api
```

That will correspond to the `flock-web` and `flock-api` deployments respectively. Their images are hosted on Docker Hub:

- https://hub.docker.com/r/wcygan/flock-api
- https://hub.docker.com/r/wcygan/flock-web
