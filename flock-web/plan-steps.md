# Steps

Below is a breakdown of the Plan into atomic steps that you can follow to build the UI for the Flock Social Media Platform. We'll start from scratch by creating a new SvelteKit project called flock-web. The steps are organized to guide you through setting up the project, implementing best practices, designing the frontend, integrating with the backend and authentication, and deploying to Kubernetes.

## Atomic Steps to Build the Flock UI with SvelteKit

### 1. Project Initialization

#### 1.1. Install Node.js and pnpm (if not already installed)

Ensure you have Node.js (version 18.x) and pnpm installed on your system.

#### 1.2. Create a New SvelteKit Project

Open your terminal and run:

```bash
npx sv create flock-web
```

Choose the following options during setup:

- Minimal project (no demo app)
- Add TypeScript? Yes, use TypeScript syntax.
- Add ESLint for code linting? Yes.
- Add Prettier for code formatting? Yes.
- Add Vitest for unit testing? Yes.
- Add Tailwind CSS for styling? Yes.

#### 1.3. Navigate to the Project Directory

```bash
cd flock-web
```

#### 1.4. Install Dependencies

```bash
pnpm install
```

### 2. Integrate Tailwind CSS

#### 2.1. Install Tailwind CSS and Dependencies

```bash
pnpm install -D tailwindcss postcss autoprefixer
npx tailwindcss init tailwind.config.cjs -p
```

#### 2.2. Configure Tailwind CSS

Update `tailwind.config.cjs`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.{html,js,svelte,ts}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
```

#### 2.3. Include Tailwind in Your CSS

Create a new file `src/app.css` (if not already present) and add:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### 2.4. Import `app.css` in `src/routes/+layout.svelte`

```svelte
<script>
    // No script needed
</script>

<style>
    /* Empty, styles are imported via app.css */
</style>

<svelte:head>
    <link rel="stylesheet" href="/app.css">
</svelte:head>

<slot />
```

### 3. Set Up Project Structure

Organize your files as follows:

```bash
src/
├── routes/
│   ├── +layout.svelte
│   ├── +page.svelte (Home Page)
│   └── profile/
│       └── [username]/
│           └── +page.svelte (Profile Page)
├── lib/
│   ├── components/ (Reusable UI components)
│   ├── api/ (API clients and mocks)
│   ├── stores/ (Svelte stores)
│   └── types/ (TypeScript types)
├── app.css (Tailwind CSS)
└── hooks.server.ts (Server-side hooks)
```

### 4. Configure TypeScript

Ensure strict TypeScript settings in `tsconfig.json`:

```json
{
    "extends": "./.svelte-kit/tsconfig.json",
    "compilerOptions": {
        "strict": true,
        "moduleResolution": "node",
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "resolveJsonModule": true,
        "skipLibCheck": true,
        "sourceMap": true
    }
}
```

### 5. Implement Global Layout and Navigation

#### 5.1. Create a Sidebar Component

File: `src/lib/components/Sidebar.svelte`

```svelte
<script lang="ts">
    import { page } from '$app/stores';
    import { derived } from 'svelte/store';

    const activeRoute = derived(page, ($page) => $page.url.pathname);
</script>

<nav class="flex flex-col w-64 h-screen bg-gray-800 text-white">
    <div class="p-4 font-bold text-xl">Flock</div>
    <ul class="flex-1">
        <li class="{activeRoute === '/' ? 'bg-gray-700' : ''}">
            <a href="/" class="block p-4 hover:bg-gray-700">Home</a>
        </li>
        <li class="{activeRoute.startsWith('/profile') ? 'bg-gray-700' : ''}">
            <a href="/profile/username" class="block p-4 hover:bg-gray-700">Profile</a>
        </li>
        <!-- Additional links for other pages -->
    </ul>
    <!-- Optional footer content -->
</nav>
```

#### 5.2. Update the Layout File

File: `src/routes/+layout.svelte`

```svelte
<script lang="ts">
    import '../app.css';
    import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<div class="flex h-screen">
    <Sidebar />
    <main class="flex-1 overflow-auto">
        <slot />
    </main>
</div>
```

### 6. Install and Set Up ConnectRPC and Protocol Buffers

#### 6.1. Configure pnpm for Buf Registry

```bash
pnpm config set @buf:registry https://buf.build/gen/pnpm/v1/
```

#### 6.2. Install Packages

```bash
pnpm install @buf/wcygan_flock.bufbuild_es@latest
pnpm install @bufbuild/connect-web
```

### 7. Create API Clients

#### 7.1. Set Up the Transport and Clients

File: `src/lib/api/api-client.ts`

```typescript
import { createPromiseClient } from '@bufbuild/connect';
import { createConnectTransport } from '@bufbuild/connect-web';
import { PostService } from '@buf/wcygan_flock.bufbuild_es/backend/v1/post_connect';
import { HomePageService } from '@buf/wcygan_flock.bufbuild_es/frontend/v1/home_page_connect';
import { ProfilePageService } from '@buf/wcygan_flock.bufbuild_es/frontend/v1/profile_page_connect';

const transport = createConnectTransport({
    baseUrl: import.meta.env.VITE_PUBLIC_API_BASE_URL,
});

export const ApiClient = {
    posts: createPromiseClient(PostService, transport),
    homePage: createPromiseClient(HomePageService, transport),
    profilePage: createPromiseClient(ProfilePageService, transport),
};
```

#### 7.2. Create Mock API Clients

File: `src/lib/api/api-client-mock.ts`

```typescript
import type { Post } from '@buf/wcygan_flock.bufbuild_es/backend/v1/post_pb';

export const ApiClientMock = {
    homePage: {
        getHomePage: async () => ({
            posts: [
                {
                    id: '1',
                    content: 'Welcome to Flock!',
                    authorId: 'user1',
                    createdAt: new Date().toISOString(),
                },
                // Add more fake posts as needed
            ],
        }),
    },
    profilePage: {
        getProfilePage: async ({ username }) => ({
            user: {
                id: 'user1',
                username,
                bio: 'This is a mock bio.',
            },
            posts: [
                {
                    id: '2',
                    content: 'My first post!',
                    authorId: 'user1',
                    createdAt: new Date().toISOString(),
                },
                // Add more fake posts as needed
            ],
        }),
    },
    // Add mocks for other services if needed
};
```

### 8. Implement the Home Page

#### 8.1. Create the Home Page Component

File: `src/routes/+page.svelte`

```svelte
<script lang="ts">
    import { onMount } from 'svelte';
    import { ApiClientMock as ApiClient } from '$lib/api/api-client-mock';
    import PostComponent from '$lib/components/PostComponent.svelte';
    import type { Post } from '@buf/wcygan_flock.bufbuild_es/backend/v1/post_pb';

    let posts: Post[] = [];

    onMount(async () => {
        const response = await ApiClient.homePage.getHomePage({ postLimit: 10 });
        posts = response.posts;
    });
</script>

<h1 class="text-2xl font-bold p-4">Home</h1>
<div class="space-y-4 p-4">
    {#each posts as post}
        <PostComponent {post} />
    {/each}
</div>
```

#### 8.2. Create the Post Component

File: `src/lib/components/PostComponent.svelte`

```svelte
<script lang="ts">
    import type { Post } from '@buf/wcygan_flock.bufbuild_es/backend/v1/post_pb';

    export let post: Post;
</script>

<div class="border rounded p-4 shadow">
    <div class="font-semibold">{post.authorId}</div>
    <div class="text-gray-600 text-sm">{new Date(post.createdAt).toLocaleString()}</div>
    <p class="mt-2">{post.content}</p>
</div>
```

### 9. Implement the Profile Page

#### 9.1. Create the Profile Page Route

File: `src/routes/profile/[username]/+page.svelte`

```svelte
<script lang="ts">
    import { onMount } from 'svelte';
    import { ApiClientMock as ApiClient } from '$lib/api/api-client-mock';
    import { page } from '$app/stores';
    import { get } from 'svelte/store';
    import PostComponent from '$lib/components/PostComponent.svelte';
    import type { Post } from '@buf/wcygan_flock.bufbuild_es/backend/v1/post_pb';

    const { username } = get(page).params;
    let user;
    let posts: Post[] = [];

    onMount(async () => {
        const response = await ApiClient.profilePage.getProfilePage({ username });
        user = response.user;
        posts = response.posts;
    });
</script>

<h1 class="text-2xl font-bold p-4">{user.username}'s Profile</h1>
<p class="p-4">{user.bio}</p>
<div class="space-y-4 p-4">
    {#each posts as post}
        <PostComponent {post} />
    {/each}
</div>
```

### 10. Implement Under Construction Pages

For each of the under-construction pages, create a simple page displaying an "Under Construction" message.

#### 10.1. Discover Page

File: `src/routes/discover/+page.svelte`

```svelte
<h1 class="text-2xl font-bold p-4">Discover</h1>
<p class="p-4">Under Construction</p>
```

#### 10.2. Repeat for Notifications, Messages, and Settings Pages

Create similar pages in their respective routes.

### 11. Integrate Authentication with Keycloak

#### 11.1. Choose an Authentication Library

Install `@auth/core` and `@auth/sveltekit`:

```bash
pnpm install @auth/core @auth/sveltekit
```

#### 11.2. Configure Authentication

File: `src/hooks.server.ts`

```typescript
import { SvelteKitAuth } from '@auth/sveltekit';
import KeycloakProvider from '@auth/core/providers/keycloak';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = SvelteKitAuth({
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_CLIENT_ID,
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
            issuer: process.env.KEYCLOAK_ISSUER,
        }),
    ],
});
```

#### 11.3. Configure Environment Variables

Create an `.env` file (do not commit to version control):

```env
KEYCLOAK_CLIENT_ID=your-client-id
KEYCLOAK_CLIENT_SECRET=your-client-secret
KEYCLOAK_ISSUER=https://your-keycloak-domain/auth/realms/your-realm
```

Ensure these variables are set in your Kubernetes secrets for production.

#### 11.4. Protect Routes and Access Session

Update pages to check for authentication and access the user session when needed.

### 12. Kubernetes Integration

#### 12.1. Create a Dockerfile

File: `Dockerfile`

```dockerfile
# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY package.json pnpm-lock.yaml svelte.config.js vite.config.js tsconfig.json ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# Stage 2: Run
FROM node:18-alpine AS runner
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY --from=builder /app/build ./build
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod
EXPOSE 3000
CMD ["node", "build"]
```

#### 12.2. Create Kubernetes Manifests

File: `k8s/deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: flock-frontend
spec:
    replicas: 1
    selector:
        matchLabels:
            app: flock-frontend
    template:
        metadata:
            labels:
                app: flock-frontend
        spec:
            containers:
                - name: frontend
                    image: your-repo/flock-frontend:latest
                    ports:
                        - containerPort: 3000
                    env:
                        - name: VITE_PUBLIC_API_BASE_URL
                            valueFrom:
                                secretKeyRef:
                                    name: api-base-url-secret
                                    key: VITE_PUBLIC_API_BASE_URL
                        # Add other environment variables as needed
```

File: `k8s/service.yaml`

```yaml
apiVersion: v1
kind: Service
metadata:
    name: flock-frontend
spec:
    selector:
        app: flock-frontend
    ports:
        - protocol: TCP
            port: 80
            targetPort: 3000
```

File: `k8s/ingress.yaml`

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
    name: flock-ingress
    annotations:
        kubernetes.io/ingress.class: nginx
        nginx.ingress.kubernetes.io/rewrite-target: /
        nginx.ingress.kubernetes.io/proxy-read-timeout: "3600"
        nginx.ingress.kubernetes.io/proxy-send-timeout: "3600"
        nginx.ingress.kubernetes.io/websocket-services: "flock-frontend"
spec:
    rules:
        - host: flock.yourdomain.com
            http:
                paths:
                    - path: /
                        pathType: Prefix
                        backend:
                            service:
                                name: flock-frontend
                                port:
                                    number: 80
```

#### 12.3. Configure WebSocket Support for HMR

Ensure `nginx.ingress.kubernetes.io/websocket-services: "flock-frontend"` annotation is added to support WebSockets.

### 13. Set Up Development Tools

#### 13.1. Configure Vite for HMR Over Network

File: `vite.config.js`

```javascript
import { sveltekit } from '@sveltejs/kit/vite';

export default {
    plugins: [sveltekit()],
    server: {
        hmr: {
            host: 'localhost',
            clientPort: 3000,
        },
    },
};
```

#### 13.2. Use Telepresence for Local Development

Install Telepresence and connect your local development environment to the Kubernetes cluster.

#### 13.3. Set Up Skaffold (Optional)

Configure Skaffold for automating builds and deployments during development.

### 14. Set Up CI/CD Pipeline

Implement CI/CD using GitHub Actions or your preferred CI tool to automate testing, building, and deployment.

### 15. Testing and Linting

#### 15.1. Run ESLint and Prettier

Ensure your code adheres to linting and formatting standards.

#### 15.2. Implement Unit Tests

Use Vitest (installed during project setup) to write unit tests for your components and utilities.

### 16. Documentation and README

Create a `README.md` with setup instructions, explaining how to run the project locally and deploy it.

## Checklist of Steps

1. Project Initialization
    - [x] Install Node.js and pnpm
    - [x] Create a New SvelteKit Project (flock-web)
    - [x] Navigate to the Project Directory
    - [x] Install Dependencies
2. Integrate Tailwind CSS
    - [x] Install Tailwind CSS and Dependencies
    - [x] Configure Tailwind CSS
    - [x] Include Tailwind in Your CSS
    - [x] Import `app.css` in `+layout.svelte`
3. Set Up Project Structure
4. Configure TypeScript
5. Implement Global Layout and Navigation
    - [x] Create a Sidebar Component
    - [x] Update the Layout File
6. Install and Set Up ConnectRPC and Protocol Buffers
    - [x] Configure pnpm for Buf Registry
    - [x] Install Packages
7. Create API Clients
    - [x] Set Up the Transport and Clients
    - [x] Create Mock API Clients
    - [x] Add tests for the mock API clients
8. Implement the Home Page
    - [x] Create the Home Page Component
    - [x] Create the Post Component
9. Implement the Profile Page
    - [x] Create the Profile Page Route
10. Implement Under Construction Pages
    - [x] Discover Page
    - [x] Notifications Page
    - [x] Messages Page
    - [x] Settings Page
11. Kubernetes Integration
    - [ ] Create a Dockerfile
    - [ ] Create Kubernetes Manifests
    - [ ] Configure WebSocket Support for HMR
12. Frontend uses ConnectRPC to call the Backend API  
    - [ ] Create a Kubernetes Secret for the API Base URL
    - [ ] Add an environment variable for the API Base URL in the Kubernetes Deployment
    - [ ] Add an ingress rule for the frontend in the Kubernetes Ingress
13. Integrate Authentication with Keycloak
    - [ ] Choose an Authentication Library
    - [ ] Configure Authentication
    - [ ] Configure Environment Variables
    - [ ] Protect Routes and Access Session
14. Set Up Development Tools
    - [ ] Configure Vite for HMR Over Network
    - [ ] Use Telepresence for Local Development
    - [ ] Set Up Skaffold (Optional)
15. Set Up CI/CD Pipeline
16. Testing and Linting
    - [ ] Run ESLint and Prettier
    - [ ] Implement Unit Tests
17. Documentation and README

By following these steps, you'll systematically build the UI for the Flock Social Media Platform from scratch, adhering to best practices and ensuring smooth integration with the backend and authentication services. This detailed plan will also assist AI coding assistants like Cursor in generating appropriate code and maintaining consistency throughout the project.
