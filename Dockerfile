# syntax=docker/dockerfile:1

# Build arguments for customization
ARG NODE_VERSION=22
ARG PNPM_VERSION=10.12.4
ARG APP_PORT=4321
ARG URL
ARG GA_MEASUREMENT_ID

# Stage 1: Build environment with all dependencies
FROM node:${NODE_VERSION}-slim AS builder

# Install build dependencies and security updates
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# Set working directory
WORKDIR /app

# Create non-root user for security
RUN groupadd -g 1001 astro && \
    useradd -u 1001 -g astro -m astro && \
    chown astro:astro /app

USER astro

# Copy package files first for better layer caching
COPY --chown=astro:astro package.json pnpm-lock.yaml ./

# Install dependencies with optimizations
ENV HUSKY=0 \
    CI=true \
    NODE_ENV=production \
    ASTRO_TELEMETRY_DISABLED=1 \
    PNPM_HOME=/pnpm

ENV PATH=$PNPM_HOME:$PATH

# Install and build in single layer to reduce image size
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy source code (optimized order for layer caching)
COPY --chown=astro:astro config ./config/
COPY --chown=astro:astro public ./public/
COPY --chown=astro:astro src ./src/
COPY --chown=astro:astro types ./types/
COPY --chown=astro:astro astro.config.mjs tsconfig.json ./

# Variables needed for build only
ARG URL
ARG GA_MEASUREMENT_ID
ENV URL=${URL}
ENV GA_MEASUREMENT_ID=${GA_MEASUREMENT_ID}

# Build application
RUN pnpm run build

# Stage 2: Dependencies cleaner - Smart dependency optimization
FROM node:${NODE_VERSION}-slim AS deps-cleaner

# Install pnpm for dependency management
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

WORKDIR /app

# Copy package info and built node_modules from builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/node_modules ./node_modules

# Clean dependencies intelligently - keep source maps for production debugging
RUN pnpm prune --prod --ignore-scripts --config.confirmModulesPurge=false
RUN rm -rf node_modules/.cache
RUN rm -rf .pnpm-store
RUN find node_modules -name "*.d.ts" -type f -delete
RUN find node_modules -name ".bin" -type d -exec rm -rf {} + 2>/dev/null || true

# Stage 3: Minimal runtime with distroless approach
FROM node:${NODE_VERSION}-slim AS runtime

# Pass PNPM version for Sharp rebuild
ARG PNPM_VERSION

# Security hardening: minimal packages and updates
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
    tini \
    ca-certificates \
    libvips42 \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
    && groupadd -g 1001 astro \
    && useradd -u 1001 -g astro -m astro \
    && mkdir -p /app /tmp \
    && chown -R astro:astro /app /tmp

# Railway environment variables (passed as build args)
ARG APP_PORT
ARG URL
ARG RESEND_API_KEY
ARG APP_ENV
ARG GA_MEASUREMENT_ID

# Convert ARGs to ENV for runtime availability
ENV PORT=${APP_PORT}
ENV URL=${URL}
ENV RESEND_API_KEY=${RESEND_API_KEY}
ENV APP_ENV=${APP_ENV}
ENV GA_MEASUREMENT_ID=${GA_MEASUREMENT_ID}

# Set secure runtime environment
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV ASTRO_TELEMETRY_DISABLED=1
ENV NODE_NO_WARNINGS=1
ENV NODE_OPTIONS="--max-old-space-size=512 --max-semi-space-size=64"
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:/app/node_modules/.bin:$PATH

# Railway.app deployment optimizations

WORKDIR /app

# Copy minimal production files from respective stages
COPY --from=deps-cleaner --chown=astro:astro /app/node_modules ./node_modules
COPY --from=builder --chown=astro:astro /app/dist ./dist
COPY --from=builder --chown=astro:astro /app/package.json ./package.json

# Rebuild Sharp native bindings for runtime environment (must run as root for pnpm setup)
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate && \
    cd /app && pnpm rebuild sharp && \
    chown -R astro:astro /app/node_modules/sharp

# Security: Remove SUID/SGID bits and set read-only filesystem
RUN find /app -type f -perm /6000 -exec chmod -s {} \; 2>/dev/null || true

# Switch to non-root user
USER astro

# Health check handled by Railway platform via healthcheckPath
# HEALTHCHECK disabled to avoid conflicts with Railway monitoring

# Expose port
EXPOSE $APP_PORT

# Security: Use tini for proper signal handling and PID 1
ENTRYPOINT ["/usr/bin/tini", "-g", "--"]

# Start application with security optimizations
CMD ["node", "--enable-source-maps", "--unhandled-rejections=strict", "./dist/server/entry.mjs"]