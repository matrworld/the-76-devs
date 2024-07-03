# Setup base deps
FROM node:20-alpine AS base
ARG APP_NAME
ENV APP_NAME=${APP_NAME}
RUN apk update
RUN apk add --no-cache libc6-compat g++ make py3-pip
RUN npm install pnpm turbo --global --no-cache
RUN pnpm config set store-dir /root/.local/share/pnpm/store/v3

# clean/prepare/prune only the required apps/packages 
FROM base as pruner
WORKDIR /pruned
COPY . .
RUN rm -rf /**/*/node_modules
# Add default .env file from .env.example
RUN cp /pruned/apps/${APP_NAME}/.env.example /pruned/apps/${APP_NAME}/.env
RUN turbo prune ${APP_NAME} --docker

# Install & build
FROM base as builder
WORKDIR /build
COPY --from=pruner /pruned/out/json .
COPY --from=pruner /pruned/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /pruned/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm i
COPY --from=pruner /pruned/out/full .
RUN pnpm run build --filter ${APP_NAME}

# Runner (don't run as root user)
FROM base AS runner
COPY --from=builder --chown=runnergroup:runer /build .
RUN addgroup --system --gid 1001 runnergroup
RUN adduser --system --uid 1001 runner
USER runner
WORKDIR /apps/${APP_NAME}
CMD pnpm start
