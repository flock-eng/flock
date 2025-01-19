# Environment Variables for Authentication

When implementing authentication in any web framework (Fresh, SvelteKit, NextJS, etc.),
you'll need to configure certain environment variables that are loaded at runtime rather than build time.

This is particularly important for values that may change between environments or need to be kept secure.

## Required Environment Variables

Two critical environment variables needed for authentication are:

1. `BACKEND_API_URL`: The URL of your backend API service
   - Example: `https://api.myapp.com`
   - This should be configurable per environment (development, staging, production)
   - Must be loaded at runtime to support different deployment environments

2. `KEYCLOAK_URL`: The URL of your Keycloak authentication server
   - Example: `https://auth.myapp.com/realms/flock`
   - Should point to your Keycloak instance
   - Must be loaded at runtime to support different Keycloak deployments

## Why Runtime Loading is Important

Loading these values at runtime rather than build time is crucial because:

- It enables deployment to different environments without rebuilding
- Supports containerized deployments with environment-specific configurations
- Allows for easier testing and local development
- Follows security best practices by keeping sensitive URLs out of built assets

## Environment Configuration

### Development Environment
- Use `.env` files for local development
- Create a `.env.example` file in version control to document required variables
- Never commit actual `.env` files containing real values to version control

### Production Environment
- Environment variables are injected via Kubernetes Deployment Manifest
- Sensitive values are stored as Kubernetes Secrets
- Example Kubernetes configuration:
  ```yaml
    apiVersion: onepassword.com/v1
    kind: OnePasswordItem
    metadata:
    name: keycloak-credentials
    namespace: default
    spec:
    itemPath: "vaults/flock/items/keycloak"
  ---
    apiVersion: apps/v1
    kind: Deployment
    spec:
    template:
        spec:
        containers:
        - name: app
            env:
                - name: KEYCLOAK_CLIENT_ID
                valueFrom:
                    secretKeyRef:
                    name: keycloak-credentials
                    key: client_id
                - name: KEYCLOAK_CLIENT_SECRET
                valueFrom:
                    secretKeyRef:
                    name: keycloak-credentials
                    key: client_secret
                - name: KEYCLOAK_ISSUER
                valueFrom:
                    secretKeyRef:
                    name: keycloak-credentials
                    key: issuer
  ```
