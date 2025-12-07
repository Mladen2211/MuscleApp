# MuscleApp Monorepo

Turborepo-powered monorepo for the MuscleApp ecosystem (React web, Node.js API, and React Native mobile). The MuscleApp web client now mirrors the product scaffold, while the API and mobile apps remain placeholders for upcoming integrations.

## Tech Highlights
- **Package manager:** pnpm (Node.js 20 LTS)
- **Workspace tooling:** Turborepo, TypeScript, ESLint, Prettier
- **Apps:** `apps/web` (Next.js), `apps/api` (Fastify + TypeScript), `apps/mobile` (Expo / React Native)
- **Containers:** Dockerfiles for each app plus a `docker-compose.yml` for local orchestration

## Getting Started
1. Install pnpm if needed: `corepack enable` or `npm install -g pnpm@8`.
2. Install dependencies from the repo root:
   ```bash
   pnpm install
   ```
3. Run development mode (all apps):
   ```bash
   pnpm dev
   ```
   Use Turbo filters (e.g., `pnpm dev --filter=@muscleapp/api`) to target a specific app.

## Repository Layout
```
.
├── apps
│   ├── api       # Node.js backend scaffold
│   ├── mobile    # Expo / React Native scaffold
│   └── web       # Next.js frontend (dashboard/activity/profile/settings)
├── packages      # Shared packages (add as needed)
├── docker-compose.yml
├── turbo.json
└── tsconfig.base.json
```

## Docker
- Each app has its own Dockerfile (`apps/*/Dockerfile`).
- `docker-compose.yml` runs all services sharing the pnpm cache via bind mounts.
- Customize environment variables in `.env` or service-specific files before building images.

## Web Frontend (apps/web)
- Mirrors the original `scaffold.html` experience using the Next.js App Router and Tailwind CSS.
- Tracks profile data, nutrition targets, meals, steps, training status, and theme preference via `localStorage` (pure client state until backend APIs arrive).
- Includes a glassmorphism UI kit, toast notifications, theme picker, and JSON export/reset utilities.
- Relies on `react-icons` for Font Awesome glyphs plus the Outfit font through `next/font`.

## Next Steps
- Flesh out backend/mobile features and connect the web client to real APIs.
- Add shared packages under `packages/` for design system, schema, etc.
- Configure CI (GitHub Actions, etc.) once the codebase stabilizes.

## Customization Plan
- **Web:** hook the current UI into backend services (auth, macro plans, feed data) and extract shared tokens/components into `packages/ui` when ready.
- **API:** expand `apps/api/src` with domain routes, validation schemas (Zod), and persistence adapters; promote modular Fastify plugins under `packages/server-core` for reuse.
- **Mobile:** evolve `apps/mobile/App.tsx` into a navigation root (e.g., Expo Router) and share theme/type definitions with the web client once established.
- **Tooling:** introduce CI pipelines plus storybook/testing packages after first feature slices land.
