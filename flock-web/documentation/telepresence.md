# Framework-agnostic Telepresence Setup

A summary of how Telepresence is used for local development with Kubernetes.

## Core Setup

### Package Scripts (from `package.json`)

```json
{
    "connect": "telepresence connect",
    "intercept": "telepresence intercept flock-web --service flock-web --port 3000",
    "list": "telepresence list",
    "leave": "telepresence leave flock-web",
    "tele": "pnpm run connect && pnpm run intercept",
    "tele-dev": "pnpm run tele && pnpm run dev"
}
```

These scripts outline the essential Telepresence workflow:

1. **Connect** to the cluster
2. **Intercept** service traffic
3. **List** active intercepts
4. **Remove** intercepts
5. **Combined** commands for development

## How It Works

### Service Configuration

A Kubernetes service named `flock-web` runs on port `3000`. The service has a
corresponding deployment in the cluster.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: flock-web
  namespace: default
  labels:
    app: flock-web
spec:
  type: ClusterIP
  ports:
    - port: 3000
      targetPort: 3000
      protocol: TCP
      name: http
  selector:
    app: flock-web
```

### Local Development Flow

1. Telepresence **connects** to your Kubernetes cluster.
2. It **intercepts** traffic meant for the `flock-web` service.
3. Redirects that traffic to your local port `3000`.
4. Your local development server **handles** the requests.

## Framework-Agnostic Implementation

This approach works with any framework that can:

- Run a development server on port `3000`
- Handle HTTP/HTTPS requests
- Support hot module reloading (HMR)

### Example Setup for Different Frameworks

```bash
# 1. Connect to cluster
telepresence connect

# 2. Start intercept
telepresence intercept your-service-name --port 3000

# 3. Run your dev server on port 3000
```

#### Framework-specific Commands:

```bash
# SvelteKit
npm run dev -- --port 3000

# Next.js
next dev -p 3000

# Deno Fresh
deno task start --port 3000

# React (Create React App)
PORT=3000 npm start

# Qwik
npm run dev -- --port 3000
```

## Key Benefits

- Real cluster environment testing
- Access to cluster services
- Live reload development
- No need to rebuild containers
- Seamless integration with cluster resources

## Important Notes

- Requires Telepresence CLI installation
- Needs cluster access configuration
- Works with any framework that can serve on port `3000`
- Supports hot reloading through proper ingress configuration
- Environment variables and secrets are accessible from the cluster

This setup provides a consistent local development experience regardless of the
frontend framework being used.
