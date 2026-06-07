import { loadProject } from "@/lib/projects";
import { EmptyState } from "@/components/dashboard/EmptyState";

export const dynamic = "force-dynamic";

export default async function Runs({ params }: { params: { projectId: string } }) {
  const p = await loadProject(params.projectId);
  const activity = p?.data?.activity || [];
  if (!activity.length) return <EmptyState title="Run console" hint="Recent task updates/comments appear here as the ledger fills." />;
  return (
    <div className="rounded-card border border-line bg-surface overflow-hidden">
      {activity.map((a, i) => (
        <div key={i} className="px-4 py-3 border-b border-line last:border-0 text-sm">
          <div className="text-tx2 text-xs">{new Date(a.ts).toLocaleString()} · <b className="text-tx">{a.task}</b>{a.status ? ` · ${a.status}` : ""}{a.owner ? ` · ${a.owner}` : ""}</div>
          <div>{a.note}</div>
        </div>
      ))}
    </div>
  );
}
