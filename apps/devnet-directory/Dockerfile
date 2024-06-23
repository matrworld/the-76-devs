# STAGE 1: Setup node, pnpm + install base deps
FROM node:20-alpine AS base
RUN npm install turbo --global --no-cache
RUN apk update
RUN apk add --no-cache libc6-compat g++ make py3-pip
RUN npm install pnpm turbo --global --no-cache
RUN pnpm config set store-dir /root/.local/share/pnpm/store/v3

# STAGE 2: Define env + write to .env
FROM base AS env
WORKDIR /app
ARG GOOGLE_OAUTH_CLIENT_ID
ARG GOOGLE_OAUTH_CLIENT_SECRET
ARG GOOGLE_OAUTH_REDIRECT_URI
ARG DATABASE_URL
RUN echo "GOOGLE_OAUTH_CLIENT_ID=$GOOGLE_OAUTH_CLIENT_ID" >> .env
RUN echo "GOOGLE_OAUTH_CLIENT_SECRET=$GOOGLE_OAUTH_CLIENT_SECRET" >> .env
RUN echo "GOOGLE_OAUTH_REDIRECT_URI=$GOOGLE_OAUTH_CLIENT_SECRET" >> .env
RUN echo "DATABASE_URL=$GOOGLE_OAUTH_CLIENT_SECRET" >> .env

# STAGE 3: Filters the apps/packages we need into ./out
FROM base AS pruner
COPY . /app
WORKDIR /app
RUN turbo prune devnet-directory --docker

# STAGE 4: Builder stage
# Copy ./out from above + install and build
FROM base AS builder
COPY . /app
WORKDIR /app
# Copy only projects we want to build
COPY --from=pruner /app/out/full .
# Copy .env for sveltekit to pickup
COPY --from=env /app/.env ./apps/devnet-directory/.env
# Install
RUN --mount=type=cache,id=s/50bee284-677e-48da-95d0-9df714e4e3d1-/root/.local/share/pnpm/store/v3,target=/root/.local/share/pnpm/store/v3  pnpm i
# Build
RUN turbo build --filter devnet-directory

# STAGE 5: Runner stage (don't run as root user)
FROM base AS runner
RUN addgroup --system --gid 1001 runnergroup
RUN adduser --system --uid 1001 runner
USER runner
COPY --from=builder --chown=runner:runnergroup ./app ./app
WORKDIR /app
CMD node apps/devnet-directory/build/index.js
