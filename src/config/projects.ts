import type { ProjectEntry } from "@/types/dashboard";

// The project registry. Each entry points at a project's local dashboard engine,
// which exposes /api/manifest (static project config) and /api/data (live status).
// Add a project by pointing at its localhost URL — no per-repo UI code required.
export const PROJECTS: ProjectEntry[] = [
  { id: "aj-digital-os", url: "http://localhost:7421" },
  { id: "responseos", url: "http://localhost:7422" },
  { id: "audiojones-com", url: "http://localhost:7423" },
];
