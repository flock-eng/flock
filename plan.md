# Flock Web (UI) Plan

## Introduction

Flock is a scalable, real-time social media platform focused on user engagement. The goal is to develop a responsive and interactive web interface, enabling users to create posts, view profiles, and interact with content. The frontend will be built using SvelteKit with TypeScript and TailwindCSS, integrating with backend services through ConnectRPC and Protocol Buffers.

## Brief Product Specification

**Project Name:** Flock Social Media Platform  
**Objective:** Create a modern social media web application with core functionalities such as viewing and creating posts, managing profiles, and real-time updates.  
**Target Users:** Individuals looking to engage in a social community by sharing updates and interacting with others.

### Key Features

- **Home Page:** Displays a feed of recent posts.
- **Profile Page:** Shows user profile information and their posts.
- **Additional Pages:** Discover, Notifications, Messages, Settings (marked as under construction).

### Backend Integration

- Utilize ConnectRPC and Protocol Buffers to communicate with backend microservices.
- Incorporate types and services from the `@buf/wcygan_flock.bufbuild_es` package.

### Authentication

- Implement secure user authentication via Keycloak.
- Choose an appropriate authentication library for SvelteKit (excluding Lucia).

### Deployment

- Deploy on a Kubernetes cluster with routing through ingress-nginx-controller.
- Manage secrets with Kubernetes secrets, secured via 1Password.

## SvelteKit Best Practices

### Project Setup

- **Use SvelteKit with TypeScript:**
  - Initialize the project with TypeScript support for better type safety.
  - Use strict TypeScript settings in `tsconfig.json`.
- **Integrate TailwindCSS:**
  - Install TailwindCSS and configure it to work with SvelteKit.
  - Use JIT mode for faster builds and efficient styling.

### File Structure

- Organize files according to SvelteKit conventions:
  - `/src/routes` for page components.
  - `/src/components` for reusable UI components.
  - `/src/lib` for utilities and API clients.

### Component Development

- Build components using the Svelte syntax for reactivity and simplicity.
- Keep components focused and reusable.

### State Management

- Use Svelte stores (writable, readable, derived) for global state when necessary.
- Prefer local component state when possible.

### Styling

- Use TailwindCSS utility classes directly in components.
- Create custom components or styles when Tailwind doesn't suffice.

### Accessibility (A11y)

- Follow accessibility best practices; use semantic HTML elements.
- Utilize Svelte A11y hints and warnings.

### Performance Optimization

- Utilize Svelte's compiler optimizations by writing idiomatic Svelte code.
- Avoid unnecessary reactivity; use reactive statements judiciously.

### Environment Variables

- Use SvelteKit's environment variable system:
  - Prefix public variables with `PUBLIC_` (e.g., `VITE_PUBLIC_API_URL`).
  - Keep secrets secure by not exposing them to client-side code.
  - Access variables via `import.meta.env` on the client and `process.env` on the server.

## Frontend Design

### Pages to Implement

- **Home Page (`/`):**
  - Displays a feed of posts.
  - Each post includes author details, timestamp, and content.
  - Incorporates a "Create Post" button.
  - API calls are stubbed to return fake data.
- **Profile Page (`/profile/[username]`):**
  - Shows user profile information (avatar, username, bio).
  - Lists the user's posts.
  - API calls are stubbed to return fake data.
- **Discover Page (`/discover`):**
  - Under construction.
  - Displays an "Under Construction" message.
- **Notifications Page (`/notifications`):**
  - Under construction.
  - Displays an "Under Construction" message.
- **Messages Page (`/messages`):**
  - Under construction.
  - Displays an "Under Construction" message.
- **Settings Page (`/settings`):**
  - Under construction.
  - Displays an "Under Construction" message.

### Design Considerations

- **Navigation:**
  - Implement a sidebar for navigation between pages.
  - Use icons and text labels for clarity.
  - Ensure responsive design for mobile and desktop views.
- **Components:**
  - **Post Component:** Reusable component for displaying individual posts. Accepts props for post data.
  - **User Profile Component:** Displays user information. Can be reused on the Profile Page and in the sidebar.
  - **Create Post Modal/Dialog:** Form for creating new posts. Includes fields for post content and submission actions.
- **Styling:**
  - **TailwindCSS:** Use Tailwind utility classes for consistent styling. Define custom themes if necessary.
  - **Responsive Design:** Ensure components adapt to different screen sizes. Use Tailwind's responsive utilities (`sm:`, `md:`, `lg:`, etc.).
  - **Icons and Graphics:** Use a consistent icon library (e.g., Heroicons).
- **User Experience:**
  - **Feedback:** Provide visual feedback on interactions (e.g., button presses, form submissions). Use loading indicators during async operations.
  - **Accessibility:** Implement keyboard navigation and screen reader support. Ensure sufficient color contrast.

## Frontend and Backend Integration

### ConnectRPC and Protocol Buffers Integration

- **Install Packages:**

    ```bash
    npm config set @buf:registry https://buf.build/gen/npm/v1/
    npm install @buf/wcygan_flock.bufbuild_es@latest
    npm install @bufbuild/connect-web
    ```

- **Setup API Clients:**

    ```ts
    // src/lib/api-client.ts
    import { createPromiseClient } from "@bufbuild/connect";
    import { createConnectTransport } from "@bufbuild/connect-web";
    import { PostService } from "@buf/wcygan_flock.bufbuild_es/backend/v1/post_connect";
    import { HomePageService } from "@buf/wcygan_flock.bufbuild_es/frontend/v1/home_page_connect";
    import { ProfilePageService } from "@buf/wcygan_flock.bufbuild_es/frontend/v1/profile_page_connect";

    const transport = createConnectTransport({
        baseUrl: import.meta.env.VITE_PUBLIC_API_BASE_URL,
    });

    export const ApiClient = {
        posts: createPromiseClient(PostService, transport),
        homePage: createPromiseClient(HomePageService, transport),
        profilePage: createPromiseClient(ProfilePageService, transport),
    };
    ```

- **Stubbed API Calls:**

    ```ts
    // src/lib/api-client-mock.ts
    // Mock implementations returning fake data
    export const ApiClientMock = {
        // ...implement mock methods
    };
    ```

- **Usage in Svelte Components:**

    ```svelte
    <!-- src/routes/+page.svelte -->
    <script lang="ts">
        import { onMount } from 'svelte';
        import { ApiClientMock as ApiClient } from '$lib/api-client-mock';
        import PostComponent from '$components/PostComponent.svelte';
        import type { Post } from "@buf/wcygan_flock.bufbuild_es/backend/v1/post_pb";

        let posts: Post[] = [];

        onMount(async () => {
            const response = await ApiClient.homePage.getHomePage({ postLimit: 10 });
            posts = response.posts;
        });
    </script>

    <div>
        {#each posts as post}
            <PostComponent {post} />
        {/each}
    </div>
    ```

### Authentication with Keycloak

- **Select an Authentication Library:**
  - Consider using `@auth/core` (formerly `next-auth`) which can work with SvelteKit.
  - Alternatively, implement custom OAuth2/OpenID Connect flows using SvelteKit's server-side capabilities.
- **Implement Authentication Flow:**
  - Use SvelteKit's hooks (`handle` in `src/hooks.server.ts`) to check authentication status.
  - Create endpoints for login and logout that interact with Keycloak.
  - Protect routes by checking authentication before rendering pages.

### Environment Variables for Authentication

- **Store Secrets Securely:**
  - Store client IDs, secrets, and URLs in environment variables.
  - Access them only on the server side using `process.env`.

## Kubernetes Integration

### Dockerize the Application

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json svelte.config.js vite.config.js ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/build ./build
COPY package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["node", "build/index.js"]
```

### Kubernetes Manifests

- Create Deployment and Service YAML files for the frontend app.
- Ensure that environment variables are passed through Kubernetes secrets.
- Mount secrets as environment variables in the deployment spec.

### Ingress Configuration

- Define Ingress resources to route traffic via ingress-nginx-controller.
- Include necessary annotations to support WebSocket connections.

### WebSocket Connection for HMR During Development

- **Configure Vite for HMR:**
  - Adjust `vite.config.js` to enable HMR over network if developing remotely.
  - Set `server.hmr.host` and `server.hmr.clientPort` appropriately.

- **Ingress Annotations for WebSocket Support:**

    ```yaml
    nginx.ingress.kubernetes.io/backend-protocol: "HTTP"
    nginx.ingress.kubernetes.io/proxy-read-timeout: "3600"
    nginx.ingress.kubernetes.io/proxy-send-timeout: "3600"
    nginx.ingress.kubernetes.io/proxy-http-version: "1.1"
    nginx.ingress.kubernetes.io/proxy-connection: "keep-alive"
    nginx.ingress.kubernetes.io/connection-proxy-header: "keep-alive"
    nginx.ingress.kubernetes.io/proxy-set-headers: "ingress-nginx/custom-headers"
    ```

- **Custom Headers ConfigMap:**

    ```yaml
    apiVersion: v1
    kind: ConfigMap
    metadata:
        name: custom-headers
    data:
        Upgrade: "websocket"
        Connection: "Upgrade"
    ```

## Additional Considerations

### Development Tools

- **Telepresence:**
  - Use Telepresence to connect local development environment with the Kubernetes cluster.
  - Allows for live debugging and development against remote services.
- **Skaffold:**
  - Automates builds and deployments during development.
  - Watch for file changes and continuously deploy updated code.

### Continuous Integration/Continuous Deployment (CI/CD)

- **Set Up Pipelines:**
  - Use GitHub Actions or another CI tool to automate testing, building, and deployment.
  - Ensure that pipelines handle secrets securely.

### Testing

- **Unit Testing:**
  - Use Vitest or Jest for unit testing components and utilities.
- **End-to-End Testing:**
  - Use Cypress or Playwright for E2E testing (optional at this stage).

### Logging and Monitoring

- Implement logging on the server side for error tracking.
- Configure monitoring tools as needed (e.g., Prometheus, Grafana).

### Documentation

- **README Files:**
  - Provide clear setup instructions for the development environment.
- **Code Comments:**
  - Document complex logic within the codebase for future reference.

### Security Best Practices

- **Secure Authentication:**
  - Ensure tokens and sensitive data are transmitted securely.
- **Input Validation:**
  - Validate and sanitize user inputs to prevent attacks such as XSS.
- **Dependency Updates:**
  - Keep dependencies up-to-date to mitigate vulnerabilities.

### Performance Optimization V2

- **Lazy Loading:**
  - Implement code splitting to load components only when necessary.
- **Caching:**
  - Use HTTP caching headers where appropriate.

By following this plan, development can proceed efficiently, and AI coding assistants like Cursor can generate code that aligns with best practices and project requirements. The plan provides a high-level overview while including specific details and code snippets to guide implementation.
