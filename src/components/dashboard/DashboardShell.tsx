import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import type { LiveProject } from "@/types/dashboard";

export function DashboardShell({ project, children }: { project: LiveProject; children: ReactNode }) {
  const nav = project.manifest?.navigation || [{ label: "Overview", route: "/" }];
  const name = project.manifest?.project.name || project.id;
  return (
    <div className="flex min-h-screen">
      <Sidebar projectId={project.id} nav={nav} />
      <div className="flex-1 max-w-[1180px] mx-auto p-4 w-full">
        <Topbar
          title={name}
          subtitle={project.manifest?.project.repoPath}
          right={
            <a href={project.url} target="_blank" rel="noreferrer" className="text-xs px-3 py-2 rounded-full bg-signal text-ink font-semibold whitespace-nowrap">
              Open live dashboard ↗
            </a>
          }
        />
        {children}
      </div>
    </div>
  );
}
