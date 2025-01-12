# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies
COPY package.json pnpm-lock.yaml svelte.config.js vite.config.js tsconfig.json ./
RUN pnpm install --frozen-lockfile

# Copy source code and build
COPY . .
RUN pnpm run build

# Stage 2: Run
FROM node:18-alpine AS runner
WORKDIR /app

# Enable pnpm in runner stage
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy build output and package files
COPY --from=builder /app/build ./build
COPY package.json pnpm-lock.yaml ./

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "build"] 