# Flock Web

## Quick Start

### Local Development

```bash
deno task start
```

This will watch the project directory and restart as necessary.

### Telepresence

```
deno task telepresence-connect
deno task telepresence-intercept
```

Then, access the app:

```bash
open "https://$(kubectl get ing flock-web-ingress -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')"
```

## Docker

```bash
docker build -t flock-web .
docker run -p 3000:3000 flock-web
```

## Documentation

- [Deno Fresh](https://fresh.deno.dev/docs/getting-started)
- [Deno Getting Started](https://deno.land/manual/getting_started/installation)
