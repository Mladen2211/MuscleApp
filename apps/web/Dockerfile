# syntax=docker/dockerfile:1.6

ARG NODE_VERSION=20.11.1
FROM node:${NODE_VERSION}-slim AS base
WORKDIR /repo

FROM base AS deps
RUN corepack enable && corepack prepare pnpm@8.15.5 --activate
COPY package.json pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps/web/package.json apps/web/package.json
COPY apps/api/package.json apps/api/package.json
COPY apps/mobile/package.json apps/mobile/package.json
RUN pnpm install --frozen-lockfile

FROM deps AS dev
COPY . .
CMD ["pnpm", "--filter", "@muscleapp/web", "dev"]

FROM deps AS build
COPY . .
RUN pnpm turbo run build --filter=@muscleapp/web

FROM base AS prod
ENV NODE_ENV=production
COPY --from=build /repo/apps/web/.next /repo/apps/web/.next
COPY --from=build /repo/apps/web/public /repo/apps/web/public
COPY --from=build /repo/apps/web/package.json /repo/apps/web/package.json
EXPOSE 3000
CMD ["pnpm", "--filter", "@muscleapp/web", "start"]
