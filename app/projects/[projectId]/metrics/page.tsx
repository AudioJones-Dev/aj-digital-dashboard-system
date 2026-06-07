import { loadProject } from "@/lib/projects";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { EmptyState } from "@/components/dashboard/EmptyState";

export const dynamic = "force-dynamic";

export default async function Metrics({ params }: { params: { projectId: string } }) {
  const p = await loadProject(params.projectId);
  if (!p?.online || !p.data) return <EmptyState title="No live data" />;
  const d = p.data;
  const done = d.tasks.filter((t) => t.status === "Done").length;
  const dirty = d.repos.filter((r) => r.tree === "dirty" || r.consistency === "drift").length;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <MetricCard label="Overall" value={d.meta.overall + "%"} sub="weighted by phase" />
      <MetricCard label="Tasks Done" value={`${done}/${d.tasks.length}`} />
      <MetricCard label="Blocked" value={String(d.blocked?.length || 0)} />
      <MetricCard label="Open PRs" value={String(d.prs?.total ?? "—")} />
      <MetricCard label="Repos" value={String(d.repos.length)} sub={`${dirty} drifted/dirty`} />
      <MetricCard label="Phases" value={String(d.phases.filter((x) => x.status === "Done").length) + "/" + d.phases.length} sub="complete" />
    </div>
  );
}
