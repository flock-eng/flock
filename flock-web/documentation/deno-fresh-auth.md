# Setting up Authentication in Fresh

Fresh is an edge-native web framework that uses server-side rendering and islands architecture. This guide summarizes how to implement basic authentication in a Fresh application.

## Quick Setup Steps

1. Create a new Fresh app:
```bash
deno run -A -r https://fresh.deno.dev my-auth-app
```

2. Update `import_map.json` to include std lib for cookie management.

3. Key Components:

### Main Route (`/routes/index.tsx`)
- Uses cookies to check login status
- Displays different content based on authentication state
- Includes login form component

### Login API (`/routes/api/login.ts`)
- Handles POST requests for authentication
- Validates credentials
- Sets authentication cookies
- Redirects after successful login

### Logout Route (`/routes/logout.ts`)
- Deletes authentication cookies
- Redirects to home page

## Implementation Details

### Cookie Management
- Uses `getCookies` and `setCookie` from std/http/cookie
- Sets secure cookies with:
  - maxAge
  - sameSite protection
  - Secure flag
  - Domain and path specifications

### Security Considerations
- Forms use native browser features (multipart/form-data)
- Implements CSRF protection via SameSite cookie attributes
- Uses HTTP 303 redirects for proper method handling

### Protected Routes Options
1. Redirect Approach:
   - Automatically redirect non-authenticated users
   - Check cookie status in handler

2. Conditional Content:
   - Show different content based on auth status
   - No redirect, just conditional rendering

## Production Considerations
- Replace hardcoded credentials with proper authentication strategies
- Implement secure session management
- Use persistent data storage (e.g., MongoDB for users, Redis for sessions)
- Generate unique session values instead of static cookie values

Source: [Deno Blog - Setup Auth with Fresh](https://deno.com/blog/setup-auth-with-fresh)
