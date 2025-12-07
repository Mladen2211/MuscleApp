# MuscleApp API

Fastify-based Node.js service scaffold for the MuscleApp monorepo. The API currently exposes only a `/health` endpoint to validate wiring. Expand handlers and plugins as business logic becomes available.

## Scripts
- `pnpm dev` – run Fastify with hot reloading via `tsx watch`.
- `pnpm build` – compile TypeScript to `dist/` using `tsc`.
- `pnpm start` – execute the compiled server.

Environment variables such as `PORT` should be defined in a local `.env` file (not committed) or Docker compose overrides.
