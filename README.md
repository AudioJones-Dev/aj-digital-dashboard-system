# AJ Digital Dashboard System

A reusable, local-first **project control surface** for AJ Digital repos, products, and client systems. It is the shared **interface layer** of AJ Digital OS: one dashboard shell that discovers projects and renders a consistent experience, while each project keeps its own configuration and data.

## Canonical role

This repo is the **canonical dashboard hub and shared UI shell**.

- Hub/UI shell: `C:\dev\aj-digital-dashboard-system`
- AJ Digital OS engine instance: `C:\dev\aj-os-dashboard`
- AJ Digital OS product repo: `C:\dev\AJ-DIGITAL-OS`

The hub renders project data, navigation, commands, and status from each engine's
standard contract. It does not own project task ledgers, repo-health collection,
Notion writeback, or AJ Digital OS working-context gates.

For AJ Digital OS, the repo's governed working context remains authoritative:
`C:\dev\AJ-DIGITAL-OS\memory\working-context\working-context.md`. Hub "next task"
cards are operational hints and must not override repo stabilization gates.

> **Key architectural choice:** this hub does **not** re-implement data collection. Each project runs its own lightweight dashboard engine (`aj-os-dashboard` toolkit) that already exposes:
> - `GET /api/manifest` — the project's static config (the standardized manifest)
> - `GET /api/data` — live status (progress, tasks, owners, repo health, next task, blocked, activity)
>
> The hub consumes those. One source of truth, no drift.

## Stack
Next.js 14 (App Router) · TypeScript · Tailwind CSS · Voltline theme (dark + signal-yellow `#E8FF5A`). No database, no auth, no external calls — local-first.

## Run
```bash
npm install
npm run dev      # http://localhost:7500
```
Each project's engine must be running on its own port (e.g. AJ Digital OS on 7421).

Local auth note: development mode is open by default even if Clerk keys exist in `.env.local`.
Set `HUB_LOCAL_OPEN=false` or `HUB_AUTH_MODE=clerk` when you want to test Clerk-protected
routes locally.

## Architecture
```
app/
  page.tsx                         hub home — project launcher (cards)
  projects/[projectId]/
    layout.tsx                     DashboardShell (sidebar + topbar from manifest)
    page.tsx                       Overview (live /api/data)
    tasks|agents|runs|docs|metrics|deployments|settings/page.tsx
src/
  types/dashboard.ts               ProjectManifest + ProjectData contracts
  config/projects.ts               the project registry (add a project = one line)
  lib/projects.ts                  fetches /api/manifest + /api/data per project
  components/dashboard/*            Shell, Sidebar, Topbar, ProjectCard, StatusBadge,
                                    RiskBadge, MetricCard, EmptyState, CommandList
```

## Add a project
1. Stand up its dashboard engine with the `aj-os-dashboard` toolkit (`npm run new`), which serves `/api/manifest` + `/api/data` on a unique port.
2. Add one line to `src/config/projects.ts`:
   ```ts
   { id: "responseos", url: "http://localhost:7422" }
   ```

## Roadmap (phased, governed)
- **Now:** hub shell, registry, live overview, manifest-driven nav, command list (display-only).
- **Next:** command execution — opt in with `NEXT_PUBLIC_ENABLE_COMMAND_RUNNER=true` only after reviewing each engine's `/api/run` boundary: **localhost-only, allowlisted, audit-logged, high-risk = human approval**.
- **Later:** auth → deploy to `dash.ajdigital.app/projects/<id>` → per-project subdomains for client-facing/productized dashboards.

## Rules
- Shared UI/behavior lives here; project-specific data lives in each project's manifest + `/api/data`.
- No repo is hardcoded into the shell.
- No secrets in source (`.env.example` only).
- Mutating/deploy/delete commands are risk-labeled; execution is gated and logged.
