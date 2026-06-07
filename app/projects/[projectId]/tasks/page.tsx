import { loadProject } from "@/lib/projects";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { EmptyState } from "@/components/dashboard/EmptyState";

export const dynamic = "force-dynamic";
const ORDER: Record<string, number> = { Blocked: 0, "In Progress": 1, Todo: 2, Done: 3 };

export default async function Tasks({ params }: { params: { projectId: string } }) {
  const p = await loadProject(params.projectId);
  if (!p?.online || !p.data) return <EmptyState title="No live data" hint="Start the project's dashboard server." />;
  const tasks = [...p.data.tasks].sort((a, b) => (ORDER[a.status] ?? 9) - (ORDER[b.status] ?? 9));
  return (
    <div className="rounded-card border border-line bg-surface overflow-hidden">
      {tasks.map((t) => (
        <div key={t.title} className="flex items-center justify-between gap-3 px-4 py-3 border-b border-line last:border-0 text-sm">
          <div className="min-w-0">{t.next && <span className="text-signal font-bold mr-1">★</span>}<span className="font-medium">{t.title}</span></div>
          <div className="flex items-center gap-3 shrink-0 text-tx2 text-xs"><span>{t.phase}</span><span>{t.owner}</span><span className="border border-line rounded px-1.5">{t.priority}</span><StatusBadge status={t.status} /></div>
        </div>
      ))}
    </div>
  );
}
