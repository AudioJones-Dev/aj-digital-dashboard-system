import { PROJECTS } from "@/config/projects";
import type { LiveProject, ProjectManifest, ProjectData } from "@/types/dashboard";

// When the engines are behind Cloudflare Access (deployed), the hub presents a
// service token. Locally these are unset → no headers → direct localhost works.
const accessHeaders: Record<string, string> = {
  ...(process.env.AJ_API_TOKEN ? { "x-aj-token": process.env.AJ_API_TOKEN } : {}),
  ...(process.env.CF_ACCESS_CLIENT_ID && process.env.CF_ACCESS_CLIENT_SECRET
    ? { "CF-Access-Client-Id": process.env.CF_ACCESS_CLIENT_ID, "CF-Access-Client-Secret": process.env.CF_ACCESS_CLIENT_SECRET }
    : {}),
};

async function getJson<T>(url: string): Promise<T | null> {
  try {
    const r = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(6000), headers: accessHeaders });
    if (!r.ok) return null;
    return (await r.json()) as T;
  } catch {
    return null;
  }
}

export async function loadProject(id: string): Promise<LiveProject | null> {
  const entry = PROJECTS.find((p) => p.id === id);
  if (!entry) return null;
  const [manifest, data] = await Promise.all([
    getJson<ProjectManifest>(entry.url + "/api/manifest"),
    getJson<ProjectData>(entry.url + "/api/data"),
  ]);
  return { id, url: entry.url, manifest, data, online: Boolean(data) };
}

export async function loadAllProjects(): Promise<LiveProject[]> {
  return Promise.all(PROJECTS.map((p) => loadProject(p.id))) as Promise<LiveProject[]>;
}
