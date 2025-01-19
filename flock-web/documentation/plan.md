# Flock Web (UI) Plan

## Overview

**Goal**: Build a scalable, real-time social media UI, deployable on Kubernetes, with Keycloak authentication, ConnectRPC for backend communication, and best practices for performance and accessibility.

**Framework Agnostic**: The steps below outline what to do rather than how to do it in a specific framework. Implementation details will vary depending on whether you choose SvelteKit, Next.js, Deno Fresh, or another framework.

**Key Points**:
- Project initialization and "Hello World" deployment on Port 3000 (locally & through Telepresence)
- Authentication setup with Keycloak
  - App is hosted on app.mydomain.com
  - Auth is hosted on auth.mydomain.com/realms/flock
- Then proceed with other features (home page, profile page, connect to backend, etc.)

## High-Level Steps

### 1. Project Initialization

#### 1.1. Create/Configure the Web App
- Initialize a new project in your chosen framework
- Ensure it runs a minimal "Hello World" endpoint/page on Port 3000

#### 1.2. Local Development
- Run your app locally, confirm you can see "Hello World" at http://localhost:3000

#### 1.3. Kubernetes Setup
- Create initial Deployment and Service manifests
- Deploy a basic version of the app to the cluster
- Verify the app is accessible through the cluster

#### 1.4. Telepresence Setup
- Install and configure Telepresence locally
- Set up Telepresence to proxy your local service into the cluster
- Confirm you can reach the "Hello World" endpoint from both local and cluster environments

### 2. Authentication Setup (Keycloak)

#### 2.1. Choose an Auth Approach
- If using a Node-based SSR framework (SvelteKit, Next.js, etc.), you can use a library like @auth/core, or implement OAuth2/OIDC flows manually
- If using Deno or a custom framework, integrate a Keycloak JS adapter or use a generic OAuth2 library

#### 2.2. Keycloak Configuration
- Create a Keycloak client, note the client ID, secret, and realm/issuer URL
- Store them in environment variables or secrets (do not commit secrets to version control)

#### 2.3. Server-Side Session & Route Protection
- If SSR is supported, set up server-side session handling (e.g., in Next.js with API routes, or in SvelteKit with hooks)
- If it's a purely client-side app, incorporate Keycloak's client library to handle logins, token storage, and route protection

#### 2.4. Validate Authentication
- Verify that, once logged in via Keycloak, the user session or token is accessible to the app
- Ensure that protected routes/pages require valid tokens

### 3. Frontend Foundation and UI Features

#### 3.1. UI Framework Setup
- Add your styling approach (e.g., Tailwind CSS, SCSS, or another utility-first or component library)
- Organize files according to your framework's conventions (e.g., routes/, pages/, components/, etc.)

#### 3.2. Core Pages
- **Home Page**
  - Displays a feed of recent posts (or mock data)
  - Include a "Create Post" button/section
- **Profile Page**
  - Shows user's profile information and their posts
- **Under Construction Pages**
  - Discover, Notifications, Messages, Settings (initially just placeholder pages)

### 4. Backend Integration (ConnectRPC + Protocol Buffers)

#### 4.1. Install ConnectRPC and Protobuf Stubs
- For Node-based setups, configure pnpm, npm, or yarn to pull from Buf's registry
- For Deno, you can import from a URL-based distribution or adapt your approach

#### 4.2. Create a Client
- Implement a ConnectRPC/Protobuf client that interacts with your backend microservices
- Example Node-based implementation:

```typescript
import { createPromiseClient } from '@bufbuild/connect';
import { createConnectTransport } from '@bufbuild/connect-web';
// Import your services from generated code

const transport = createConnectTransport({
  baseUrl: process.env.PUBLIC_API_BASE_URL || 'https://example.com'
});

export const apiClient = {
  postService: createPromiseClient(PostService, transport),
  // etc.
};
```

#### 4.3. Mock API Calls
- For local dev or pre-backend readiness, create a mock layer returning fake data

#### 4.4. Usage in Components/Pages
- Retrieve real or fake data, render in UI, handle loading states

### 5. Deployment & Kubernetes Integration

#### 5.1. Dockerizing the App
Example Dockerfile for Node-based setup:

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/build .
EXPOSE 3000
CMD ["node", "index.js"]
```

#### 5.2. Kubernetes Manifests
- **Deployment**: references your Docker image, sets PORT=3000 and any other environment variables
- **Service**: exposes port 3000 internally
- **Ingress**: configures host-based routing (e.g., flock.yourdomain.com)
- **Secrets**: store Keycloak client secrets, PUBLIC_API_BASE_URL, etc.

#### 5.3. Advanced Kubernetes Features
- Set up horizontal pod autoscaling
- Configure resource limits and requests
- Implement health checks and readiness probes
- Set up monitoring and logging integrations

### 6. Additional Considerations

#### 6.1. State Management
- Depending on your framework, you might use React context, Redux, Svelte stores, or simpler local state solutions

#### 6.2. Accessibility (A11y)
- Use semantic HTML, consider keyboard navigation, color contrast, screen-reader support

#### 6.3. Performance
- Avoid unnecessary reactivity
- Implement code splitting or lazy loading for large components

#### 6.4. Testing
- **Unit tests**: Use your framework's recommended setup (Vitest, Jest, etc.)
- **E2E tests**: Cypress, Playwright, or similar

#### 6.5. Logging & Monitoring
- On the server side, log errors and important events
- Hook into cluster-level monitoring (Prometheus, Grafana) as needed

### 7. CI/CD Pipeline
- Implement automated build, test, and deploy via GitHub Actions, GitLab CI, or another platform
- Ensure environment variables and secrets are handled securely

### 8. Documentation
- Create a README.md to describe local setup, environment variables, build steps, and deployment instructions
- Provide references or links for contributing and environment-specific configs

## Sample Implementation Order

1. **Hello World**
   - Initialize your chosen framework, confirm local dev on port 3000
   - Configure Telepresence to ensure it can route requests to/from Kubernetes

2. **Keycloak Authentication**
   - Integrate Keycloak
   - Ensure login and logout flows work
   - Protect certain routes so they require authentication

3. **Core UI & Layout**
   - Add a global navigation/side menu
   - Implement a basic home page and feed
   - Placeholder pages for profile, discover, notifications, messages, settings

4. **ConnectRPC & Protobuf Integration**
   - Fetch data from the backend for posts, profiles, etc.
   - Use a mock client if the backend isn't fully ready

5. **Refinement & Under-Construction Pages**
   - Gradually flesh out the under-construction pages once the MVP is stable

6. **Docker/Kubernetes Deployment**
   - Containerize your app
   - Deploy to a cluster with your chosen CI/CD pipeline
   - Confirm Telepresence-based dev workflow is smooth

7. **Testing, Linting, and Final Touches**
   - Add unit/E2E tests
   - Ensure code quality with linting (ESLint, Prettier, etc.)
   - Document everything in a README or wiki

## Conclusion

By following this framework-agnostic plan, you ensure:
- You get a functional skeleton running in local and Kubernetes environments quickly
- Authentication is established early using Keycloak (so user flows and route protection are clear from the start)
- You can layer on UI features, ConnectRPC integration, and Kubernetes deployment incrementally, regardless of whether you choose SvelteKit, Next.js, Deno Fresh, or another modern web framework

## Implementation Roadmap

### Project Setup
- [x] Initialize framework project
- [x] Configure development environment
- [x] Create basic "Hello World" page
- [x] Set up basic Kubernetes manifests
- [x] Configure Telepresence for local development

### Authentication
- [ ] Set up Keycloak client
- [ ] Configure environment variables
- [ ] Implement authentication flow
- [ ] Add route protection
- [ ] Test authentication flow

### Frontend Development
- [ ] Set up UI framework and styling
- [ ] Create layout components
- [ ] Implement home page
- [ ] Build profile page
- [ ] Add placeholder pages
- [ ] Implement navigation

### Backend Integration
- [ ] Set up ConnectRPC client
- [ ] Generate Protobuf stubs
- [ ] Create mock API layer
- [ ] Implement real API integration
- [ ] Add error handling
- [ ] Set up data caching

### Kubernetes Deployment
- [ ] Create Dockerfile
- [ ] Set up Kubernetes Deployment
- [ ] Configure Kubernetes Service
- [ ] Implement Ingress rules
- [ ] Set up Secrets management
- [ ] Configure autoscaling
- [ ] Add health checks

### Testing & Quality
- [ ] Set up unit testing framework
- [ ] Add component tests
- [ ] Implement E2E tests
- [ ] Configure linting
- [ ] Set up CI pipeline
- [ ] Add monitoring
- [ ] Configure logging

### Documentation
- [ ] Create README
- [ ] Document setup process
- [ ] Add API documentation
- [ ] Write deployment guide
- [ ] Create contributing guidelines