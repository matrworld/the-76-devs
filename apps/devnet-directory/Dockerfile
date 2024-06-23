# Setup node and pnpm
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Prepare stage
# Filters the apps/packages we need into ./out
FROM base AS prepared
COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm dlx turbo prune devnet-directory --docker

# Builder stage
# Copy ./out from above + install and build
FROM base AS builder
COPY . /app
WORKDIR /app
COPY --from=prepared /app/out/full .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm i
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm run build --filter devnet-directory

# Runnder stage (don't run as root user)
FROM base AS runner
RUN addgroup --system --gid 1001 runnergroup
RUN adduser --system --uid 1001 runner
USER runner
COPY --from=builder --chown=runner:runnergroup ./app ./app
WORKDIR /app
CMD node apps/devnet-directory/build/index.js