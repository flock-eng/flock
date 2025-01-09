# syntax=docker/dockerfile:1

#####################################################
# Stage 1: Build the Next.js application
#####################################################
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package manifest for caching
COPY package*.json ./

# Install dependencies (npm ci is stricter & faster than npm install)
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

#####################################################
# Stage 2: Create a lightweight runtime image
#####################################################
FROM node:18-alpine

# (Optional) Add a non-root user for security
RUN addgroup -S flock && adduser -S flock -G flock

WORKDIR /app

# Copy the final build artifacts
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./

# Install only production deps
RUN npm ci --production

# Switch to non-root user
USER flock

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
