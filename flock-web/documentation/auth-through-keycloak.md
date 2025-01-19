# Authentication through Keycloak

References:

1. https://deno.com/blog/setup-auth-with-fresh
2. https://www.keycloak.org/securing-apps/javascript-adapter
3. https://fresh.deno.dev/docs/concepts/middleware

Application Goals:

1. All pages should be protected by Keycloak
2. When a user is not authenticated, they should be redirected to the Keycloak login page
3. When a user is authenticated, they should be redirected to the home page

## Setup Auth with Fresh

Authentication and session management are one of the most fundamental aspects of building a modern web app. It's necessary for hiding premium content or creating admin-only sections like dashboards.

Fresh is an edge-native web framework that embraces progressive enhancement through server-side rendering and islands architecture, while optimizing for latency and performance. As a result, Fresh apps tend to see higher Lighthouse scores and can function in areas with low internet bandwidth.

Here's a simple guide to adding authentication into your Fresh app. Follow along below or view source here.

### Create a new Fresh app

First, let's create a new Fresh app:

```bash
deno run -A -r https://fresh.deno.dev my-auth-app
```

To keep things simple, let's remove a bunch of things:

```bash
rm -rf islands/Counter.tsx routes/api/joke.ts routes/[name].tsx
```

### Update index.tsx

First, let's update our `import_map.json` to include std lib:

```json
{
  "imports": {
    "$fresh/": "https://deno.land/x/fresh@1.1.2/",
    "preact": "https://esm.sh/preact@10.11.0",
    "preact/": "https://esm.sh/preact@10.11.0/",
    "preact-render-to-string": "https://esm.sh/*preact-render-to-string@5.2.4",
    "@preact/signals": "https://esm.sh/*@preact/signals@1.0.3",
    "@preact/signals-core": "https://esm.sh/*@preact/signals-core@1.0.1",
    "twind": "https://esm.sh/twind@0.16.17",
    "twind/": "https://esm.sh/twind@0.16.17/",
    "std/": "https://deno.land/std@0.160.0/"
  }
}
```

Next, let's update `/routes/index.tsx` to show your logged in status. We'll use cookies (with the help of `getCookies` from `std/cookie`) to check the user's status:

```typescript
import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";

interface Data {
  isAllowed: boolean;
}

export const handler: Handlers = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);
    return ctx.render!({ isAllowed: cookies.auth === "bar" });
  },
};

export default function Home({ data }: PageProps<Data>) {
  return (
    <div>
      <div>
        You currently {data.isAllowed ? "are" : "are not"} logged in.
      </div>
    </div>
  );
}
```

The custom handler simply checks the cookies and sets `isAllowed`. Our default component will show a different state based on the value of `isAllowed`. Right now, since we haven't added any logic to log in or set cookies, it shows the initial login screen.

### Create the `<Login>` component

We can create this component right in `index.tsx`:

```typescript
function Login() {
  return (
    <form method="post" action="/api/login">
      <input type="text" name="username" />
      <input type="password" name="password" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

This component will POST the username and password to `/api/login`, which we'll define later. Note that the form uses `multipart/form-data` (as opposed to json), which relies on native browser features where possible and minimizes the need for any client-side JavaScript.

### Add login and logout routes

Under `/routes/api/`, let's create `login.ts`:

```bash
touch /routes/api/login.ts
```

All of the authentication logic for this endpoint will be contained in the custom handler function.

For simplicity, our username and password will be hardcoded as "deno" and "land". (In most production situations, you would use authentication strategies, tokens from persistent data storage, etc.)

When a POST request is made to `/api/login`, the custom handler function will perform the following:
- Pulls username and password from the `req` request parameter
- Checks against our hardcoded username and password
- Sets the auth cookie to `bar` (in production, this should be a unique value per session) with a `maxAge` of 120 (it will expire after 2 minutes)
- Returns the appropriate HTTP responses (HTTP 303 forces the method back to a GET, preventing weird browser history behavior)

Here's the code:

```typescript
import { Handlers } from "$fresh/server.ts";
import { setCookie } from "std/http/cookie.ts";

export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url);
    const form = await req.formData();
    if (form.get("username") === "deno" && form.get("password") === "land") {
      const headers = new Headers();
      setCookie(headers, {
        name: "auth",
        value: "bar", // this should be a unique value for each session
        maxAge: 120,
        sameSite: "Lax", // this is important to prevent CSRF attacks
        domain: url.hostname,
        path: "/",
        secure: true,
      });

      headers.set("location", "/");
      return new Response(null, {
        status: 303, // "See Other"
        headers,
      });
    } else {
      return new Response(null, {
        status: 403,
      });
    }
  },
};
```

Let's also create an endpoint for logging out at `/routes/logout.ts`:

```bash
touch routes/logout.ts
```

The logging out logic will delete the cookie set by logging in, and redirect the user to the root page:

```typescript
import { Handlers } from "$fresh/server.ts";
import { deleteCookie } from "std/http/cookie.ts";

export const handler: Handlers = {
  GET(req) {
    const url = new URL(req.url);
    const headers = new Headers(req.headers);
    deleteCookie(headers, "auth", { path: "/", domain: url.hostname });

    headers.set("location", "/");
    return new Response(null, {
      status: 302,
      headers,
    });
  },
};
```

### Add `<Login>` and logout to index

In the `<Home>` component of our `routes/index.tsx` page, let's add the `<Login>` component, as well as a button to logout (which sends a request to `/logout`):

```typescript
// routes/index.tsx

export default function Home({ data }: PageProps<Data>) {
  return (
    <div>
      <div>
        You currently {data.isAllowed ? "are" : "are not"} logged in.
      </div>
      {!data.isAllowed ? <Login /> : <a href="/logout">Logout</a>}
    </div>
  );
}
```

### Handle non-logged-in users

A lot of paywall sites will automatically redirect a user if they're not logged in. We can add this functionality by adding redirect logic in the custom handler:

```typescript
import type { Handlers } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";

export default function Home() {
  return (
    <div>
      Here is some secret
    </div>
  );
}

export const handler: Handlers = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);
    if (cookies.auth === "bar") {
      return ctx.render!();
    } else {
      const url = new URL(req.url);
      url.pathname = "/";
      return Response.redirect(url);
    }
  },
};
```

Or, if you don't want to redirect the user and just show a secret only when the user is authenticated:

```typescript
import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";

interface Data {
  isAllowed: boolean;
}

export default function Home({ data }: PageProps<Data>) {
  return (
    <div>
      {data.isAllowed ? "Here is some secret" : "You are not allowed here"}
    </div>
  );
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);
    return ctx.render!({ isAllowed: cookies.auth === "bar" });
  },
};
```

### What's next

This is a bare bones guide to add authentication to your Fresh app. There are plenty of ways to make this more production ready that we plan to explore in future posts:

- Adding more robust authentication strategies in `/routes/api/login.ts`
- Making cookie and session management more secure with unique values
- Using a persistent data store like MongoDB for user accounts or Redis for session management

We hope this post helped!

## Keycloak JS Adapter

The Keycloak JavaScript adapter is a client-side library that makes it easy to secure web applications. The adapter supports OpenID Connect protocol and provides built-in support for Cordova applications.

### Installation

Install the keycloak-js package from NPM:

```bash
npm install keycloak-js
```

### Server Configuration

When using client-side applications with Keycloak:

1. Create a public client in the Keycloak Admin Console
2. Disable "Client authentication" on the "Capability config" page
3. Configure "Valid Redirect URIs" and "Web Origins" carefully to prevent security vulnerabilities

### Basic Usage

Here's how to initialize and use the adapter:

```javascript
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: "http://keycloak-server",
    realm: "my-realm",
    clientId: "my-app"
});

try {
    const authenticated = await keycloak.init();
    if (authenticated) {
        console.log('User is authenticated');
    } else {
        console.log('User is not authenticated');
    }
} catch (error) {
    console.error('Failed to initialize adapter:', error);
}
```

### Authentication Options

The adapter provides two main authentication options:

1. **login-required**: Automatically authenticates if the user is logged in to Keycloak or shows the login page
2. **check-sso**: Only authenticates if the user is already logged in

Example with login-required:

```javascript
await keycloak.init({
    onLoad: 'login-required'
});
```

### Silent Check-SSO

For Single Page Applications (SPAs), you can enable silent check-sso to avoid full page reloads:

```javascript
await keycloak.init({
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: `${location.origin}/silent-check-sso.html`
});
```

Create a `silent-check-sso.html` file:

```html
<!doctype html>
<html>
<body>
    <script>
        parent.postMessage(location.href, location.origin);
    </script>
</body>
</html>
```

### Making Secure Requests

After authentication, include the bearer token in API requests:

```javascript
async function fetchUsers() {
    const response = await fetch('/api/users', {
        headers: {
            accept: 'application/json',
            authorization: `Bearer ${keycloak.token}`
        }
    });

    return response.json();
}
```

### Token Refresh

Access tokens have short lifespans. Use `updateToken()` to refresh them:

```javascript
try {
    await keycloak.updateToken(30);
} catch (error) {
    console.error('Failed to refresh token:', error);
}

const users = await fetchUsers();
```

### Important Security Notes

1. Access and refresh tokens are stored in memory only
2. Never persist tokens to prevent hijacking attacks
3. Configure Valid Redirect URIs and Web Origins carefully
4. Use HTTPS in production
5. Enable CSRF protection with SameSite cookie attributes

### Callback Events

Set up event listeners before initializing Keycloak:

```javascript
keycloak.onAuthSuccess = () => console.log('Authenticated!');
keycloak.onAuthError = () => console.log('Authentication failed');
keycloak.onAuthRefreshSuccess = () => console.log('Token refreshed');
keycloak.onAuthRefreshError = () => console.log('Token refresh failed');
keycloak.onAuthLogout = () => console.log('Logged out');
keycloak.onTokenExpired = () => console.log('Token expired');
```

### Available Methods

Key methods provided by the adapter:

- `login(options)`: Redirects to login form
- `logout(options)`: Logs out the user
- `register(options)`: Redirects to registration form
- `accountManagement()`: Redirects to account management console
- `updateToken(minValidity)`: Refreshes the token
- `hasRealmRole(role)`: Checks if user has a realm role
- `hasResourceRole(role, resource)`: Checks if user has a resource role
- `loadUserProfile()`: Loads the user's profile
- `isTokenExpired(minValidity)`: Checks if token is expired

## Middleware in Deno Fresh

Middleware in Fresh is defined in `_middleware.ts` files and serves to intercept requests to perform custom logic before or after route handlers. Common use cases include logging, authentication, and performance monitoring.

### Basic Structure

A middleware receives a `next` function in the context argument to trigger child handlers and has access to a `state` property for passing data between handlers. Here's a basic example:

```typescript
import { FreshContext } from "$fresh/server.ts";

interface State {
  data: string;
}

export async function handler(
  req: Request,
  ctx: FreshContext<State>,
) {
  ctx.state.data = "myData";
  const resp = await ctx.next();
  resp.headers.set("server", "fresh server");
  return resp;
}
```

### Scoped and Layered Middleware

Middlewares are scoped and can be layered, meaning:
- Multiple middlewares can exist in different directories
- Each middleware covers a specific set of routes
- Multiple middlewares covering the same route run in order of specificity (least specific first)

Example project structure:
```
└── routes
    ├── _middleware.ts
    ├── index.ts
    └── admin
        ├── _middleware.ts
        └── index.ts
        └── signin.ts
```

### Multiple Middlewares in One File

A single middleware file can define multiple handlers by exporting an array:

```typescript
export const handler = [
  async function middleware1(req, ctx) {
    // do something
    return ctx.next();
  },
  async function middleware2(req, ctx) {
    // do something
    return ctx.next();
  },
];
```

### Route Parameters in Middleware

Middleware has access to route parameters. For example, in `routes/[tenant]/admin/_middleware.ts`:

```typescript
import { FreshContext } from "$fresh/server.ts";

export async function handler(_req: Request, ctx: FreshContext) {
  const currentTenant = ctx.params.tenant;
  // do something with the tenant
  const resp = await ctx.next();
  return resp;
}
```

### Middleware Destination

The `FreshContext` includes a `destination` property that indicates where the request is headed:
- `"internal"`: Internal Fresh framework requests
- `"static"`: Static file requests
- `"route"`: Application route requests
- `"notFound"`: 404 not found requests

This allows filtering middleware execution based on request type.

### Redirects in Middleware

To perform redirects from middleware, you can return a redirect Response:

```typescript
export function handler(req: Request): Response {
  // Temporary redirect (307)
  return Response.redirect("https://example.com", 307);
  
  // Or for relative paths:
  return new Response("", {
    status: 307,
    headers: { Location: "/my/new/relative/path" },
  });
}
```
