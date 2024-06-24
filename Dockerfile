# Setup base deps
FROM node:20-alpine AS base
ARG APP_NAME
ENV APP_NAME=${APP_NAME}
RUN apk update
RUN apk add --no-cache libc6-compat g++ make py3-pip
RUN npm install pnpm turbo --global --no-cache
RUN pnpm config set store-dir /root/.local/share/pnpm/store/v3

# Prune apps/packages we don't need
FROM base as pruner
COPY . .
RUN rm -rf /**/*/node_modules
RUN turbo prune ${APP_NAME} --docker

# Install & build
FROM base as builder
WORKDIR /build
COPY --from=pruner /out/json .
COPY --from=pruner /out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm i
COPY --from=pruner /out/full .
RUN pnpm run build --filter ${APP_NAME}

# Runner (don't run as root user)
FROM base AS runner
RUN addgroup --system --gid 1001 runnergroup
RUN adduser --system --uid 1001 runner
USER runner
COPY --from=builder --chown=runnergroup:runer /build .
CMD node /apps/${APP_NAME}/build/index.js
