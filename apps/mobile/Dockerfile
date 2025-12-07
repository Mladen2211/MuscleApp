# syntax=docker/dockerfile:1.6

ARG NODE_VERSION=20.11.1
FROM node:${NODE_VERSION}-slim AS base
WORKDIR /repo

RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

FROM base AS deps
RUN corepack enable && corepack prepare pnpm@8.15.5 --activate
COPY package.json pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
COPY apps/mobile/package.json apps/mobile/package.json
RUN pnpm install --frozen-lockfile

FROM deps AS dev
EXPOSE 19000 19001 19002
WORKDIR /repo
COPY . .
CMD ["pnpm", "--filter", "@muscleapp/mobile", "start"]
