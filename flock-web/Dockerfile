# Stage 1: Build
FROM --platform=linux/amd64 node:18-alpine AS builder
WORKDIR /app

# Enable pnpm and install dependencies
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy remaining source and build
COPY . .
RUN pnpm run build
# Remove dev dependencies
RUN pnpm prune --prod

# Stage 2: Run
FROM --platform=linux/amd64 node:18-alpine AS runner
WORKDIR /app

# Enable pnpm in runner stage
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy build output and pruned node_modules from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY package.json pnpm-lock.yaml ./

ENV NODE_ENV=production
EXPOSE 3000

# Use non-root user for security (optional)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

CMD ["node", "build"]
