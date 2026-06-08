# Deploy — dash.ajdigital.app (Vercel + Cloudflare Access)

The hub is **local-first**. It only becomes useful deployed once the per-project
engines are reachable from the internet (a Vercel function cannot reach your
`localhost:742x`). This doc covers both halves.

## Decisions (locked)
- **Host:** Vercel · **Domain:** `dash.ajdigital.app` (DNS on Cloudflare) · **Auth:** Cloudflare Access.

## A. Make the engines reachable (required first)
A deployed hub fetches each project's `/api/manifest` and `/api/data` by default.
`/api/run` is an optional, separately approved capability.
Pick one:

1. **Cloudflare Tunnel per engine (recommended — keeps live read data available).**
   On the machine running the engines:
   ```bash
   cloudflared tunnel create aj-engines
   # map hostnames → local ports
   #   ajos-engine.ajdigital.app      → http://localhost:7421
   #   responseos-engine.ajdigital.app→ http://localhost:7422
   #   audiojones-engine.ajdigital.app→ http://localhost:7423
   cloudflared tunnel route dns aj-engines ajos-engine.ajdigital.app   # etc.
   ```
   Put each engine hostname behind **Cloudflare Access** too (service tokens for the hub).
2. **Snapshot store (read-only, simplest).** Engines already write `/.dashboard/snapshots/latest.json`.
   Commit/sync those to a hosted store (R2/KV or the repo) and have the hub read snapshots
   instead of live `/api/data`. No live command execution remotely.

> ⚠️ Until this is done, deploy the hub but expect "offline" cards — it can't see localhost.

## B. Configure the hub on Vercel
1. `vercel link` (or import `AudioJones-Dev/aj-digital-dashboard-system` in the Vercel dashboard).
2. Set env vars (Production) → the tunnel URLs from step A:
   ```
   ENGINE_AJ_DIGITAL_OS   = https://ajos-engine.ajdigital.app
   ENGINE_RESPONSEOS      = https://responseos-engine.ajdigital.app
   ENGINE_AUDIOJONES_COM  = https://audiojones-engine.ajdigital.app
   ```
   (Locally these are unset → defaults to `localhost:742x`.)
3. `vercel --prod`.

## C. Domain + auth
1. Cloudflare DNS: `dash` CNAME → `cname.vercel-dns.com` (Vercel will show the exact target). Add `dash.ajdigital.app` as a domain on the Vercel project.
2. **Cloudflare Access** → Applications → Add → self-hosted → `dash.ajdigital.app` →
   policy: allow emails `tyrone.nelms87@gmail.com` / `@ajdigital.app`. Zero app code; the
   operator dashboards are never public.

## D. Security posture
- Operator dashboards behind Cloudflare Access (never public).
- `/api/run` stays **localhost-only** at the engine by default. Remote command execution must
  go through an Access-gated tunnel with a service token and `NEXT_PUBLIC_ENABLE_COMMAND_RUNNER=true`
  — design before enabling remote `Run`.
- No secrets in the hub; engine `.env` (NOTION_TOKEN) stays on the local machine.
