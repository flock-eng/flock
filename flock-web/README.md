# Flock Web

References:

- [SvelteKit](https://kit.svelte.dev/)
- [SvelteKit Adapters](https://kit.svelte.dev/docs/adapters)
- [Vitest](https://vitest.dev/)
- [pnpm](https://pnpm.io/)
- [sv](https://github.com/sveltejs/cli)
- [Connect](https://connectrpc.com/)
- [Buf](https://buf.build/)

## Quick Start

```bash
pnpm install
pnpm dev
```

## Unit Tests

```bash
pnpm run test
```

## Docker Build

```bash
docker buildx version
docker buildx create --use
docker buildx inspect --bootstrap
docker buildx build --platform linux/amd64,linux/arm64 -t wcygan/flock-web:svelte --push .
```

## Docker Run

```bash
docker run -p 3000:3000 wcygan/flock-web:svelte
```

## Linting

```bash
pnpm lint
```

## Formatting

```bash
pnpm format
```
