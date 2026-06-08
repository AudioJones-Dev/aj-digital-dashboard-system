import type { ProjectEntry } from "@/types/dashboard";

// The project registry. Each entry points at a project's local dashboard engine,
// which exposes /api/manifest (static config), /api/data (live status), and
// /api/run (gated command execution). Add a project by pointing at its URL.
//
// URLs are env-overridable so the same code runs locally (localhost) and when
// deployed (point ENGINE_* at each engine's Cloudflare Tunnel URL — see DEPLOY.md).
const engine = (key: string, dev: string) => process.env[key] || dev;

export const PROJECTS: ProjectEntry[] = [
  { id: "aj-digital-os", url: engine("ENGINE_AJ_DIGITAL_OS", "http://127.0.0.1:7421") },
  { id: "responseos", url: engine("ENGINE_RESPONSEOS", "http://127.0.0.1:7422") },
  { id: "audiojones-com", url: engine("ENGINE_AUDIOJONES_COM", "http://127.0.0.1:7423") },
];
