# Svelte and SvelteKit Best Practices

Below is a condensed set of best practices for developing apps and sites with Svelte and SvelteKit. They are grouped by topic, with brief explanations and references to how each ties back to Svelte/SvelteKit features.

## 1. Project Setup

### Use the official SvelteKit CLI or Vite

Initialize your project with:
```bash
npx sv create my-app
cd my-app
npm install
npm run dev
```

- If you need a minimal Svelte (non-Kit) setup or a library template, pick the template that fits (`--template minimal|demo|library`).
- Keep your directory structure conventional — by default `src/routes` for pages, `src/lib` for reusable components/logic, `static` for static assets.

### Editor Tooling

- Install the Svelte for VS Code extension (or relevant plugin for your editor of choice).
- Use `sv check` (or `npx sv check`) to catch errors in your `.svelte` and `.js/.ts` files.

### Directory and Naming Conventions

- Keep pages in `src/routes` — each folder/file structure corresponds to a URL route.
- Put your internal library code in `src/lib`, which SvelteKit automatically aliases as `$lib`.
- If you only want to expose server-only logic (like database calls, environment variable usage, etc.), place it in `$lib/server` to avoid accidentally importing it in the browser.

## 2. Svelte Component Structure

### Use Runes (Svelte 5)

- Declare reactive state with `let count = $state(0)` and derived values with `let doubled = $derived(count * 2)`.
- Use `$effect` only for code that has side effects (e.g. DOM manipulation, logging, or library calls).
- When you only need a snippet of logic or state, consider creating a snippet or a `.svelte.js` file with runes for reusability.

### Scope Your Styles

- Use `<style>` blocks in components for scoping.
- For global or reset styles, place them in a global stylesheet or use `:global(...)`.
- Make sure each component has a single top-level `<style>` (or `<style>` tags nested inside logic blocks if needed).

### Organize Code

- Keep component code short. If a component grows large, break out reusable logic or sub-components.
- For shared type definitions or standard library-like functions (date formatting, etc.), place them in `$lib/utils` or `$lib/server/utils` if only used on the server side.

## 3. Routing and File Structure

### Filesystem-based Routing

Create pages by adding `+page.svelte` inside a directory matching the route:
```bash
src/routes/
├── about
│   └── +page.svelte   ->  /about
├── blog
│   ├── +page.svelte   ->  /blog
│   └── [slug]
│       └── +page.svelte   ->  /blog/[slug]
```

- Use `+server.js` in the same directory to define HTTP endpoints (GET, POST, etc.) for that route.

### Layouts

- Use `+layout.svelte` in directories to wrap child routes in shared markup (e.g. nav bars).
- Use `+layout.js` (or `+layout.server.js`) to load data that all child pages can share.
- If you need a different layout for a subset of child routes, nest layouts or use advanced layout groups (`group`).

### Parameters and Matching

- `[slug]` captures single segments. `[...rest]` captures multiple segments in a single parameter.
- Use `[param=matcherName]` if you want a custom param matcher.

### Optional Layouts and Groups

- If a route should not inherit a parent layout, use `+page@<layoutName>.svelte` or `+layout@<layoutName>.svelte` to break out.

## 4. Data Loading (load Functions)

### Choose Server vs Universal load

- Universal `+page.js`/`+layout.js`: Runs in both server and client. Great for fetching public data from external APIs or for logic that doesn't need private credentials.
- Server `+page.server.js`/`+layout.server.js`: Runs exclusively on the server, can handle sensitive data or environment variables.

### Avoid Waterfalls

- In a load function, structure code so you don't block on parent data if not necessary.
- Do not call `await parent()` first if your data fetch doesn't require parent data.

### Use Streaming (Promises)

When returning from a server load function, you can return Promises for slow data:
```javascript
// +page.server.js
export async function load() {
  return {
    post: loadPost(),       // used eagerly
    comments: loadComments() // resolves later
  };
}
```

### Handle Errors and Redirects Gracefully

- Throw `error(status, 'Message')` for expected errors.
- Use `redirect(status, '/destination')` for navigations you want to be triggered on the server or in SSR.

## 5. Form Actions

### Basic Form Setup
```javascript
// +page.server.js
export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    // process
    return { success: true };
  }
};
```

### Progressive Enhancement

Use `use:enhance` from `$app/forms`:
```svelte
<form method="POST" use:enhance>
  <!-- ... -->
</form>
```

### Validation

- Return validation errors via `fail(status, { ... })`.
- Check out SvelteKit's built-in error-handling or pass data to your page as form.

## 6. Client-Side Navigation

### Links

- Use normal `<a href="/path">` for internal links.
- Preload data or code with `data-sveltekit-preload-code="hover"`, `data-sveltekit-preload-data="tap"`, etc.
- For external URLs, a full page navigation always occurs.

### goto vs. Anchor

- Usually prefer `<a>` unless you need to navigate in an event handler.
- For a direct route change in code, do `goto('/somewhere', { replaceState: false, ... })`.

### Disable/Customize

- `data-sveltekit-noscroll`: don't reset scroll.
- `data-sveltekit-keepfocus`: keep current focus.
- `data-sveltekit-reload`: do a full reload rather than client navigation.

## 7. Server-Only Modules and Environment Variables

### Keep Secrets on the Server

- Use files that end in `.server.js`, or place them in `$lib/server`.
- Import environment variables from `$env/static/private` or `$env/dynamic/private` in server-only code.

### Use $env/static/public

- For environment variables that begin with `PUBLIC_`, safe to expose to the browser, import from `$env/static/public`.

### Avoid Shared Server-Global State

- Keep user-specific data in `event.locals` or the database, not in static variables.

## 8. Accessibility

### Titles

- Each page should have a `<svelte:head><title>...</title></svelte:head>`.

### Focus Management

- By default, SvelteKit focuses the `<body>` after navigation.
- Customize or disable in `afterNavigate`, but ensure consistent screen reader experience.

### Route Announcements

- SvelteKit automatically announces the new page's `<title>` to screen readers on navigation.

## 9. Performance

### SSR

- Keep SSR on if possible (default).
- Selectively disable with `export const ssr = false` if needed.

### Code Splitting

- SvelteKit automatically splits JS.
- Place large seldom-used logic behind dynamic imports.

### CSR vs. SSR

- Use `export const csr = false` for purely static content pages.
- Be mindful that disabling both SSR and prerendering creates a blank "shell".

### Prerender

- Set `export const prerender = true` for truly static pages.
- Ensure prerendered routes don't rely on dynamic session data.

## 10. Miscellaneous

### Snapshots

- For ephemeral UI state, export `export const snapshot = { capture, restore }`.

### Shallow Routing

- Use `pushState`/`replaceState` from `$app/navigation` for history entries without page changes.

### Testing

- Use Vitest or Playwright for integration/E2E tests.
- Consider `@testing-library/svelte` for component tests.

### Service Workers

- Place service worker at `src/service-worker.js` for automatic registration.
- Configure caching strategies for PWA functionality.

## Summary

The best SvelteKit projects:

- Use server or universal load functions appropriately
- Carefully separate server-only code from client code
- Emphasize accessibility
- Rely on built-in SSR for good SEO and partial hydration
- Use prerendering for static sections
- Keep code well-organized with layouts
- Are mindful about env variables and user data
- Use shallow routing and snapshots judiciously

Following these guidelines will help you create efficient, maintainable SvelteKit applications.