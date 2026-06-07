// The standardized AJ Digital project manifest (per-repo config contract).
export type ProjectStatus = "active" | "paused" | "archived" | "experimental";
export type Risk = "low" | "medium" | "high";

export interface ProjectManifest {
  project: {
    id: string;
    name: string;
    type: string;
    owner: string;
    status: ProjectStatus;
    repoPath: string;
    localPort: number;
    localUrl: string;
    subdomain?: string;
  };
  navigation: { label: string; route: string }[];
  capabilities: Record<string, boolean>;
  commands: { id: string; label: string; description?: string; command: string; risk: Risk }[];
  docs: { root: string; canonical: string[] };
  metrics: { source: string; include: string[] };
  deployment: { mode: "localhost" | "subdomain" | "private"; target?: string; provider?: string };
}

// Subset of each project's live /api/data that the hub renders.
export interface ProjectData {
  meta: { repo: string; generatedAt: string; overall: number };
  phases: { order: string; name: string; status: string; progress: number; done: number; taskCount: number; lead: string }[];
  tasks: { title: string; phase: string; owner: string; status: string; priority: string; next?: boolean; acceptance?: string }[];
  repos: { clone: string; branch: string; tree: string; ahead: number; behind: number; consistency: string }[];
  prs?: { total: number | null; byOwner: Record<string, number> };
  next?: { owner: string; title: string; phase: string; phaseName: string; priority: string; prompt: string } | null;
  ownerNext?: { owner: string; title: string }[];
  blocked?: { title: string; owner: string }[];
  activity?: { ts: string; task: string; status: string | null; owner: string | null; note: string }[];
}

export interface ProjectEntry { id: string; url: string }
export interface LiveProject {
  id: string;
  url: string;
  manifest: ProjectManifest | null;
  data: ProjectData | null;
  online: boolean;
}
