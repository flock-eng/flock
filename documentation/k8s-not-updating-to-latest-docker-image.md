# Kubernetes & `:latest` Docker Image Tag

I've made the mistake to run this:

```bash
docker build -t wcygan/flock-auth-service:latest .
docker push wcygan/flock-auth-service:latest
```

And not build for both linux/amd64 and linux/arm64. As a result, my Kubernetes cluster seems to be "stuck" on the old image, 
and ultimately failing because the image wasn't originally built for Linux.

So, a strategy to avoid this issue is to append versions to `:latest`, like `:latest-v2`, `:latest-v3`, etc. for every time we encounter the issue.

I am fairly certain that `:latest` will continue to pull the latest images as long as this issue isn't triggered.

That said, I'm not very familiar with the "right" way to orchestrate this. It's just a hack that helps me move forward...

Anyways, the solution is to implement this diff:

In [flock-auth-service/deployment.yaml](../flock-auth-service/deployment.yaml)

```diff
- image: wcygan/flock-auth-service:latest
+ image: wcygan/flock-auth-service:latest-v2
```

In [.github/workflows/flock-auth-service.yaml](../.github/workflows/flock-auth-service.yaml)

```diff
- image: wcygan/flock-auth-service:latest
+ image: wcygan/flock-auth-service:latest-v2
```