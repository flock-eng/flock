# Environment Variables Configuration

## Overview

This document outlines the environment variables required for the Flock Web application across different frameworks, authentication setups, and deployment scenarios.

## Core Environment Variables

These variables are required regardless of framework choice:

```env
# API Configuration
PUBLIC_API_BASE_URL=https://api.example.com  # Production API endpoint
PUBLIC_APP_URL=https://app.example.com       # Frontend app URL

# Authentication (Keycloak)
PUBLIC_AUTH_ISSUER=https://auth.example.com/realms/flock
PUBLIC_AUTH_CLIENT_ID=flock-web
AUTH_CLIENT_SECRET=your-client-secret        # Only needed server-side
```

## Framework-Specific Configuration

### Next.js

```env
# Development
NODE_ENV=development
PORT=3000

# Authentication (server-side)
NEXTAUTH_URL=http://localhost:3000           # Local development
NEXTAUTH_SECRET=your-nextauth-secret        # Session encryption key

# Production overrides
NODE_ENV=production
NEXTAUTH_URL=https://app.example.com
```

### SvelteKit

```env
# Development
NODE_ENV=development
PORT=3000

# Authentication (server-side)
ORIGIN=http://localhost:3000                # Local development
AUTH_SECRET=your-auth-secret               # Session encryption key

# Production overrides
NODE_ENV=production
ORIGIN=https://app.example.com
```

### Deno Fresh

```env
# Development
PORT=3000

# No specific environment requirements beyond core variables
```

## Deployment-Specific Configuration

### Local Development with Telepresence

```env
# API Configuration
PUBLIC_API_BASE_URL=http://api-service.default.svc.cluster.local
PUBLIC_APP_URL=http://localhost:3000

# Authentication
PUBLIC_AUTH_ISSUER=https://auth.example.com/realms/flock
PUBLIC_AUTH_CLIENT_ID=flock-web-local
AUTH_CLIENT_SECRET=your-local-client-secret
```

### Production Deployment

```env
# API Configuration
PUBLIC_API_BASE_URL=https://api.example.com
PUBLIC_APP_URL=https://app.example.com

# Authentication
PUBLIC_AUTH_ISSUER=https://auth.example.com/realms/flock
PUBLIC_AUTH_CLIENT_ID=flock-web-prod
AUTH_CLIENT_SECRET=your-prod-client-secret
```

## Environment File Setup

### Local Development

1. Create a `.env.local` file in your project root:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in the values according to your local setup

### Production

1. Environment variables should be injected through Kubernetes secrets:
   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: flock-web-env
   type: Opaque
   data:
     AUTH_CLIENT_SECRET: base64-encoded-secret
     # ... other secrets
   ```

2. Reference secrets in your deployment:
   ```yaml
   spec:
     containers:
       - name: flock-web
         envFrom:
           - secretRef:
               name: flock-web-env
   ```

## Security Considerations

1. Never commit `.env` files to version control
2. Use different client IDs and secrets for local and production
3. Prefix public variables with `PUBLIC_` to make them available client-side
4. Store sensitive values in Kubernetes secrets
5. Rotate secrets regularly in production

## Framework-Specific Notes

### Next.js
- Uses `.env.local` for local development
- Automatically handles `PUBLIC_` prefix as `NEXT_PUBLIC_`
- Requires `NEXTAUTH_SECRET` for session encryption

### SvelteKit
- Uses `.env` files with Vite conventions
- Requires `PUBLIC_` prefix for client-side variables
- Server-only variables available in hooks and endpoints

### Deno Fresh
- Uses `Deno.env` for environment variables
- Requires explicit import of `config` from "dotenv"
- No built-in public/private distinction

## Validation

Each framework should implement environment variable validation at startup:

```typescript
// Example validation
function validateEnv() {
  const required = [
    'PUBLIC_API_BASE_URL',
    'PUBLIC_AUTH_ISSUER',
    'PUBLIC_AUTH_CLIENT_ID',
    'AUTH_CLIENT_SECRET'
  ];

  for (const var_name of required) {
    if (!process.env[var_name]) {
      throw new Error(`Missing required environment variable: ${var_name}`);
    }
  }
}
```
