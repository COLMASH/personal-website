# CLAUDE.md — personal-website

This file provides guidance to Claude Code (claude.ai/code) when working with this codebase.

## Project Overview

**personal-website** is a full-stack monorepo containing:
- **Frontend**: Next.js 15 (App Router) with TypeScript, Tailwind CSS, and shadcn/ui
- **Backend**: NestJS with TypeScript, Prisma ORM, and SQLite
- **Infrastructure**: Docker Compose for local development, VPS deployment via SSH

## Architecture

```
personal-website/
├── apps/
│   ├── web/          # Next.js 15 frontend (port 3000)
│   └── api/          # NestJS backend (port 8000)
├── packages/         # Shared packages (types, utils, config)
├── docker/           # Docker configuration files
├── docker-compose.yml
├── turbo.json        # Turborepo pipeline config
└── pnpm-workspace.yaml
```

### Backend (NestJS)
- **Framework**: NestJS with TypeScript
- **ORM**: Prisma with SQLite
- **Database**: SQLite (file-based)
- **Auth**: JWT-based authentication
- **Structure**: Module-based architecture (controllers, services, modules, DTOs, guards)

### Frontend (Next.js)
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **State**: React hooks + server components where possible
- **API calls**: Server actions or fetch with API route handlers

## Commands

### Monorepo (from root)
- `pnpm dev` — Start all apps in development mode
- `pnpm dev:web` — Start only the frontend
- `pnpm dev:api` — Start only the backend
- `pnpm build` — Build all apps
- `pnpm lint` — Lint all apps
- `pnpm format` — Format all apps
- `pnpm check-types` — Type-check all apps
- `pnpm test` — Run all tests (frontend + backend)
- `pnpm test:api` — Run backend tests only
- `pnpm check-format` — Check Prettier formatting across all apps
- `pnpm check-lint` — Check ESLint across all apps (no auto-fix)
- `pnpm setup` — Full project setup (install deps, link .env, generate Prisma, run migrations)
- `pnpm db:setup` — Link .env files, install API deps, generate Prisma client, run migrations
- `pnpm db:studio` — Open Prisma Studio GUI
- `pnpm start` — Start Redis container and all apps in dev mode
- `pnpm stop` — Stop all Docker containers

### Frontend (from apps/web)
- `pnpm dev` — Start dev server on port 3000
- `pnpm build` — Production build
- `pnpm lint` — ESLint check
- `pnpm format` — Prettier format

### Backend (from apps/api)
- `npm run start:dev` — Start NestJS in watch mode (port 8000)
- `npm run build` — Compile TypeScript
- `npm run lint` — ESLint check
- `npm test` — Run unit tests (Jest)
- `npm run test:e2e` — Run end-to-end tests
- `npx prisma migrate dev --name <name>` — Create a new migration
- `npx prisma migrate deploy` — Apply pending migrations
- `npx prisma generate` — Regenerate Prisma client
- `npx prisma studio` — Open Prisma Studio GUI

### Docker
- `pnpm docker:up` — Build and start all containers
- `pnpm docker:down` — Stop containers
- `pnpm docker:reset` — Reset volumes and rebuild
- **Important**: The API Dockerfile uses `npm ci` with `apps/api/package-lock.json`. After changing API deps, run `pnpm api:sync-lock` to regenerate the lockfile. CI will fail if it's out of sync.

### Database
- `pnpm db:migrate` — Deploy migrations via Prisma
- `pnpm db:revision` — Create a new migration (append name after --)

### VPS Operations
- SSH into VPS, pull latest, rebuild containers
- Database backups: copy the SQLite `.db` file from the data volume
- Logs: `docker compose logs -f <service>`

## Key Conventions

### General
- Use TypeScript everywhere (strict mode)
- Prefer `const` over `let`; never use `var`
- Use named exports, not default exports (except Next.js pages)
- All environment variables go in `.env` (copied from `.env.example`)
- Never commit `.env` files
- **Screaming folder architecture**: Features live in `features/[feature-name]/` with subfolders for `types/`, `api/`, `hooks/`, `components/`, `__tests__/`
- **API calls**: Always use `apiClient` from `@/lib/api-client` — never raw `fetch`
- **Server state**: Always use TanStack Query (`queryOptions`, `useMutation`) — never raw `useEffect` + `useState` for API data
- **UI components**: Use shadcn/ui components from `@/components/ui/` — never raw HTML elements for standard UI patterns
- **State management**: Zustand for client state, TanStack Query for server state

### Backend (NestJS)
- Follow NestJS module structure: `module.ts`, `controller.ts`, `service.ts`, `dto/`, `guards/`
- Use class-validator decorators for DTO validation
- Use Prisma for all database operations (no raw SQL unless necessary)
- Business logic belongs in services, not controllers
- Use guards for authentication/authorization
- Use interceptors for response transformation
- Use pipes for input validation and transformation
- Migrations live in `apps/api/prisma/migrations/`
- Name migrations descriptively: `add_users_table`, `add_post_slug_index`

### Frontend (Next.js)
- Use App Router (`app/` directory) — no Pages Router
- Prefer server components; add `'use client'` only when needed
- Use `cn()` utility for conditional Tailwind classes
- Place reusable components in `components/ui/` (shadcn) or `components/`
- Colocate page-specific components with their route
- Use `next/image` for all images
- Use `next/link` for all internal navigation
- **Semantic Tailwind v4**: Always use semantic Tailwind classes over arbitrary values. When a canonical utility exists (e.g. `h-75` over `h-[300px]`, `max-w-3/5` over `max-w-[60%]`, `blur-4xl` over `blur-[120px]`), use it. When no canonical exists, define a custom theme token in `globals.css` (e.g. `--blur-4xl: 120px`) rather than scattering arbitrary `[value]` syntax. Leave shadcn/ui component files (`components/ui/*`) as-is — they use arbitrary values intentionally.

### Code Style
- Prettier handles formatting (see `.prettierrc`)
- No semicolons
- Single quotes
- Trailing commas (ES5)
- 2-space indentation
- Max line width: 100 characters

### Git
- **Branching**: Direct pushes to `main` are allowed (solo project)
- **Workflow**: Work on `develop` or feature branches, merge/push to `main` directly
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`
- Pre-commit hook runs lint-staged (Prettier + ESLint)
- Keep commits small and focused

### Testing
- Backend: Jest for unit and e2e tests
- Frontend: Vitest + React Testing Library (if configured)
- Test files live next to the code they test (`*.spec.ts` or `*.test.ts`)
- Every frontend and API feature must include tests
- Frontend feature tests go in `features/[feature]/__tests__/`
- Backend follows NestJS recommended folder structure — each module must include tests (`*.spec.ts` colocated within the module)
