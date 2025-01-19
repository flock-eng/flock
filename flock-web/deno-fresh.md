# Deno Fresh Documentation

This is a comprehensive guide to Deno Fresh, from basic concepts to advanced topics.

## Introduction

Fresh is a modern full-stack web framework using Preact and JSX. It emphasizes server-side rendering by default—with only selectively interactive "islands" of JavaScript sent to the client as needed. This approach minimizes client JS, speeds up page loads, and improves resilience through progressive enhancement.

### Key Points

- Fresh has no build step by default: your TypeScript/JSX is transpiled on-the-fly
- Deploy best to an edge runtime like Deno Deploy for global performance
- File-system routing means you create/organize route files, and Fresh automatically knows how to serve them
- You can add interactivity only where it's needed via "islands"—special components that hydrate in the client

## Getting Started (Beginner)

### 1. Creating a Project

Use the project creation tool:

```bash
deno run -A -r https://fresh.deno.dev
```

This scaffolds out a basic Fresh project with:

- `dev.ts` (development entry point)
- `main.ts` (production entry point)
- `fresh.gen.ts` (auto-generated manifest of routes/islands)
- A `deno.json` file that sets up dependency imports and tasks

#### Project Structure

- `routes/`: Route files automatically mapped to URLs
- `islands/`: Interactive components that ship JS to the client
- `static/`: Static assets served at the root (CSS, images, etc.)

### 2. Running Locally

From the project folder:

```bash
deno task start
```

This launches the dev server (usually on http://localhost:8000) in watch mode, automatically reloading on file changes. Alternatively:

```bash
deno run --allow-net --allow-read --allow-env --allow-run --watch=static/,routes/ main.ts
```

### 3. Creating a Route

In `routes/`, a file's name matches the path:

- `routes/index.tsx` → `/`
- `routes/about.tsx` → `/about`
- `routes/greet/[name].tsx` → `/greet/:name`

Example route:

```tsx
export default function AboutPage() {
  return (
    <main>
      <h1>About</h1>
      <p>This is the about page.</p>
    </main>
  );
}
```

### 4. Dynamic Routes

Use square brackets for path segments you want to capture:

```bash
routes/greet/[name].tsx
```

Access captured params in your component:

```tsx
export default function GreetPage(props) {
  const { name } = props.params;
  return <p>Greetings to you, {name}!</p>;
}
```

### 5. Custom Handlers

A route can export a named handler for different HTTP methods:

```tsx
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(req, ctx) {
    // custom logic, possibly returning JSON or rendering a page
    return ctx.render();
  },
};
```

Example JSON endpoint:

```typescript
export const handler: Handlers = {
  GET(_req) {
    const uuid = crypto.randomUUID();
    return new Response(JSON.stringify({ uuid }), {
      headers: { "Content-Type": "application/json" },
    });
  }
};
```

### 6. Handling Form Submissions

Fresh encourages using standard HTML forms:

```tsx
export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();
    const email = form.get("email");
    // do stuff, then redirect or render next page
    return new Response(null, {
      status: 303,
      headers: { location: "/thank-you" },
    });
  },
};
```

### 7. Adding Interactivity With Islands

Fresh uses the "islands architecture":

```tsx
// islands/Counter.tsx
import { useSignal } from "@preact/signals";

export default function Counter() {
  const count = useSignal(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => count.value++}>Increment</button>
    </div>
  );
}
```

Use it in a page:

```tsx
import Counter from "../islands/Counter.tsx";

export default function HomePage() {
  return <Counter />;
}
```

## Deploying to Production

Deno Deploy is recommended. Steps:
1. Commit your code to GitHub
2. Create a Deno Deploy project
3. Link it to the repo
4. Choose "Fresh" framework
5. Specify `deno task build`

Every push to the main branch auto-deploys globally.

## Core Concepts (Intermediate)

### Ahead-of-Time Builds

For optimized production builds:

```bash
deno task build
```

This creates a `_fresh/` folder with optimized assets.

### The App Wrapper

Create a global wrapper in `routes/_app.tsx`:

```tsx
export default function App({ Component }) {
  return (
    <html>
      <head>
        <title>My App</title>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
```

### Layouts

Structure for shared layouts:

```
routes
└── about
    ├── _layout.tsx
    └── info.tsx
```

### Middleware

Create `_middleware.ts` for request interception:

```typescript
export async function handler(req, ctx) {
  // do something, e.g. check authentication
  return ctx.next();
}
```

### Error Pages

Customize error pages:

```tsx
// routes/_404.tsx
export default function NotFoundPage() {
  return <p>404 not found</p>;
}
```

### Partials and Client Navigation

Enable partial navigation:

```html
<body f-client-nav>
  <Partial name="body">
    <!-- content that can be replaced or appended -->
  </Partial>
</body>
```

### Plugins

Fresh supports plugins for extending functionality, like the first-party Twind plugin for Tailwind-in-JS styling.

### Routing & URL Pattern API

Advanced routing patterns:

```typescript
export const config: RouteConfig = {
  routeOverride: "/x/:module@:version/:path*",
};
```

### Static Files

- Files in `static/` are served directly
- Use `asset("/logo.svg")` for cache-friendly URLs

## Advanced Topics

### Server Configuration

Customize server behavior:

```typescript
await start(manifest, {
  server: {
    port: 8080,
    onError: (err) => new Response("Server Error", { status: 500 }),
  },
  router: {
    basePath: "/my-app",
    trailingSlash: true,
  },
});
```

### Deployment Options

- Deno Deploy (recommended)
- Docker containers
- Self-contained executable with `deno compile --include <assets> ...`

### CORS

Handle CORS with middleware:

```typescript
export async function handler(req, ctx) {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: { ...CORS_HEADERS } });
  }
  const resp = await ctx.next();
  resp.headers.set("Access-Control-Allow-Origin", "*");
  return resp;
}
```

## Code Examples & Recipes

Fresh provides examples for:

- Active Links with `aria-current`
- Authentication with Supabase (PKCE flow)
- CRUD APIs
- Complex Routes
- Rendering Markdown
- Sharing State between islands
- Content Security Policy
- Testing with `createHandler()`
- Tailwind vs. Twind migrations

## Integrations

Available integrations:

- `fresh_charts`: Chart.js integration
- `fresh_marionette`: End-to-end testing
- Tailwind/Twind plugins for styling

## Conclusion

Fresh prioritizes:
- Server-side rendering by default
- Optional "islands" for interactivity
- Fast page loads
- Minimal client JavaScript
- Resilient web applications
- Global deployment capabilities

Start building with Fresh today and deploy globally in seconds!