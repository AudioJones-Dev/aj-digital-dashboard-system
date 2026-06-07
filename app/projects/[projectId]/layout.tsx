import { loadProject } from "@/lib/projects";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default async function ProjectLayout({ children, params }: { children: ReactNode; params: { projectId: string } }) {
  const project = await loadProject(params.projectId);
  if (!project) notFound();
  return <DashboardShell project={project}>{children}</DashboardShell>;
}
