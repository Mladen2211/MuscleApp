# syntax=docker/dockerfile:1.6

ARG NODE_VERSION=20.11.1
FROM node:${NODE_VERSION}-slim AS base
WORKDIR /repo

FROM base AS deps
RUN corepack enable && corepack prepare pnpm@8.15.5 --activate
COPY package.json pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
COPY apps/mobile/package.json apps/mobile/package.json
RUN pnpm install --frozen-lockfile

FROM deps AS dev
COPY . .
CMD ["pnpm", "--filter", "@muscleapp/api", "dev"]

FROM deps AS build
COPY . .
RUN pnpm turbo run build --filter=@muscleapp/api

FROM base AS prod
ENV NODE_ENV=production
WORKDIR /repo/apps/api
COPY --from=build /repo/apps/api/dist ./dist
COPY --from=build /repo/apps/api/package.json ./package.json
EXPOSE 4000
CMD ["node", "dist/index.js"]
