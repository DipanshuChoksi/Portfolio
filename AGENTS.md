# Portfolio — OpenCode Agent Guide

## Developer Commands (root)

| Command | Does |
|---------|------|
| `npm run dev` | Start Next.js dev server at http://localhost:3000 |
| `npm run build` | Run Next.js build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format:check` | Check Prettier formatting |
| `npm run format:write` | Auto-format with Prettier |

## Environment Variables

Create `.env.local` (gitignored) with these required vars:

```
DB_URI=your_mongodb_connection_string
ADMIN_EMAIL=your_admin_email@example.com
GITHUB_ID=your_github_oauth_client_id
GITHUB_SECRET=your_github_oauth_client_secret
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=your_aws_region (e.g. us-east-1)
AWS_S3_BUCKET_NAME=your_s3_bucket_name
```

Without these, the app will fail to start (DB connect, auth, S3).

## Architecture Overview

- **Entry point**: `app/layout.tsx` (Next.js App Router root). Sets metadata from `config/siteConfig`, wraps with `ThemeProvider`, renders `Toaster`/`Analytics`.
- **Public pages**: under `app/(main)/` — `page.tsx` (home), `projects/page.tsx`, `archieve/page.tsx`, plus `education`, `skills`, `achievements`, `hero` components.
- **Admin**: under `app/admin/` — `login/page.tsx`, `dashboard/page.tsx`. Protected by `middleware.ts` (GitHub OAuth + `ADMIN_EMAIL` match).
- **API routes** (`app/api/*`):
  - `auth/[...nextauth]/route.ts` → NextAuth GitHub OAuth handlers (`auth.ts`)
  - `image/route.ts` → S3 image proxy: extracts key from S3 `.amazonaws.com/` URL, returns binary with `Cache-Control: max-age=31536000`
  - `resume/route.ts` → GET downloads resume PDF from S3; PUT/DELETE require admin auth via `getAuthStatus()`
- **Database**: MongoDB via Mongoose. `lib/connectDB.ts` (singleton pattern). Models: `models/Project.ts` (slug, title, description, image, tags, links, status, timestamps), `models/ArchiveNote.ts` (slug, title, Topics, info, Source, date, visibility).
- **Authentication**: next-auth v5 (`auth.ts` with GitHub provider). Session checked in `middleware.ts` + `app/actions/auth.ts` (`getAuthStatus` validates `session.user.email` matches `ADMIN_EMAIL`). Admin routes in middleware require both login + email match.
- **Storage**: AWS S3 (`lib/s3.ts`) for project images (`public/projects/<slug>-<timestamp><ext>`), resume (`public/Resume_Dipanshu_Choksi.pdf`), and archive markdown (`archieve/*.md`).
- **No app-level tests** exist. Extensive test suites are in `OmniRoute/` (separate gateway project). This repo has no test scripts in `package.json`.

## High-Signal Conventions

- **Middleware** (`middleware.ts`): protects `/admin/*` (redirect unauthenticated to `/admin/login`, unauthorized to `/`). Allows `/api/auth/*`. Redirects authorized admin from login to `/admin/dashboard`. Pattern: `req.nextUrl.pathname.startsWith('/admin') && !isLoginRoute`.
- **Server Actions** (`app/actions/*`): marked `'use server'`. Import `getAuthStatus` to check admin privileges. All CRUD actions (`handleProject`, `deleteProject`, `saveMarkdownNote`, `deleteMarkdownNote`, `uploadResume`) gate on `canEdit` from `getAuthStatus()`.
- **S3 key patterns**: 
  - Projects: `public/projects/<unique-filename>`
  - Resume: `public/Resume_Dipanshu_Choksi.pdf` (constant `RESUME_KEY`)
  - Archive: `archieve/<slug>.md`
- **Slug generation**: `title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')` — fallback to `project-<timestamp>` or `note-<timestamp>` if empty.
- **Revalidation**: All mutations call `revalidatePath('/')` or `revalidatePath('/projects')` or `revalidatePath('/archieve')` to keep SSG in sync.

## Directory Ownership

| Directory | Purpose |
|-----------|---------|
| `app/` | Next.js routes & pages (App Router) |
| `app/(main)/*` | Public-facing portfolio pages |
| `app/admin/*` | Admin dashboard & content management |
| `app/api/*` | API routes (auth, image, resume) |
| `app/actions/*` | Next.js Server Actions (db mutations, uploads, auth) |
| `components/` | UI & layout components (shadcn/ui, Radix) |
| `lib/` | Utilities: `connectDB.ts`, `s3.ts`, `utils.ts` |
| `models/` | Mongoose schemas: `Project.ts`, `ArchiveNote.ts` |
| `config/` | `siteConfig` export |
| `interfaces/` | TypeScript interfaces |
| `consts/` | Static content data |
| `omniroute/` | Separate AI gateway project (extensive test suites) |

## Common Gotchas

- **Missing env vars** cause hard crashes: `process.exit(1)` in `connectDB.ts` if DB connection fails; S3 client warns but continues if creds missing.
- **Admin auth is strict**: `getAuthStatus()` requires `session.user.email.trim().toLowerCase() === process.env.ADMIN_EMAIL.trim().toLowerCase()`. Just being logged in via GitHub is not enough — email must match.
- **Middleware runs on every request**: be careful not to redirect in ways that cause loops. The `isApiAuthRoute` check (`req.nextUrl.pathname.startsWith('/api/auth')`) prevents redirect loops on auth endpoints.
- **S3 image proxy** (`app/api/image/route.ts`): extracts key by splitting on `.amazonaws.com/`. If key not found, returns 400. Always sets `Cache-Control: public, max-age=31536000, immutable`.
- **Resumé upload** (`app/api/resume/route.ts`): PUT/DELETE require admin auth. Body must be `multipart/form-data` with field `file`.
- **Archive notes** (`app/actions/archive.ts`): `saveMarkdownNote` does upsert on `ArchiveNote` by slug, writes markdown to S3. `deleteMarkdownNote` deletes from S3 and DB; errors caught silently (logs only).
- **Project image upload** (`app/actions/project.ts`): `uploadImageIfPresent` uploads to S3 with content-type detection by extension. Returns URL that gets stored as the project's `image` field.
- **No typecheck script** in `package.json`. `tsc` would run via `npx tsc` but the repo relies on `typescript: { ignoreBuildErrors: false }` in `next.config.mjs`. ESLint catches most issues.

## How to Investigate

1. Start with `README.md` — it has the most up-to-date setup and feature overview.
2. If architecture is unclear, inspect `app/layout.tsx`, `middleware.ts`, and `auth.ts` first — these wire the system together.
3. Env vars are the #1 integration point. If something doesn't work, check `.env.local` matches the README list.
4. Server Actions in `app/actions/` are the primary way to mutate data. They `await connectDB()` then act on Mongoose models.
5. S3 is used for all media. If uploads/downloads fail, check `lib/s3.ts` creds and bucket name, and that the key format matches what the app expects.