import { loadProject } from "@/lib/projects";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { CommandRunner } from "@/components/dashboard/CommandRunner";
import { CommandList } from "@/components/dashboard/CommandList";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
const commandRunnerEnabled = process.env.NEXT_PUBLIC_ENABLE_COMMAND_RUNNER === "true";

export default async function Overview({ params }: { params: { projectId: string } }) {
  const p = await loadProject(params.projectId);
  if (!p) notFound();
  if (!p.online || !p.data) return <EmptyState title="Project offline" hint={`Start its dashboard server${p.manifest ? ` on port ${p.manifest.project.localPort}` : ""} and refresh.`} />;

  const d = p.data;
  const done = d.tasks.filter((t) => t.status === "Done").length;

  return (
    <div className="flex flex-col gap-5">
      {d.next && (
        <div className="rounded-card border border-[#322a55] bg-gradient-to-br from-[#1a1530] to-[#161a26] p-5">
          <div className="text-[11px] font-bold tracking-wide text-signal">★ NEXT — {d.next.owner}</div>
          <div className="font-display text-lg font-bold mt-1">{d.next.title}</div>
          <div className="text-tx2 text-sm">{d.next.phaseName} · {d.next.priority}</div>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="Overall" value={d.meta.overall + "%"} />
        <MetricCard label="Tasks Done" value={`${done}/${d.tasks.length}`} />
        <MetricCard label="Blocked" value={String(d.blocked?.length || 0)} />
        <MetricCard label="Open PRs" value={String(d.prs?.total ?? "—")} />
      </div>

      <section>
        <h3 className="text-xs uppercase tracking-wider text-tx2 font-semibold mb-2">Roadmap</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {d.phases.map((ph) => (
            <div key={ph.order} className="rounded-card border border-line bg-surface p-4">
              <div className="flex justify-between items-center"><span className="font-display font-bold text-sm">{ph.name}</span><StatusBadge status={ph.status} /></div>
              <div className="h-2 rounded bg-inset overflow-hidden my-2"><div className="h-full bg-signal" style={{ width: ph.progress + "%" }} /></div>
              <div className="text-[11px] text-tx2">{ph.progress}% · {ph.done}/{ph.taskCount} · {ph.lead}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xs uppercase tracking-wider text-tx2 font-semibold mb-2">Repo Health</h3>
        <div className="rounded-card border border-line bg-surface overflow-hidden">
          {d.repos.map((r) => (
            <div key={r.clone} className="flex items-center justify-between px-4 py-3 border-b border-line last:border-0 text-sm">
              <span className="font-mono text-xs truncate">{r.clone}</span>
              <span className="text-tx2">↑{r.ahead}/↓{r.behind}</span>
              <StatusBadge status={r.consistency === "synced" ? "Done" : r.consistency === "drift" ? "Blocked" : "In Progress"} />
            </div>
          ))}
        </div>
      </section>

      {p.manifest && (
        <section>
          <h3 className="text-xs uppercase tracking-wider text-tx2 font-semibold mb-2">
            Commands{" "}
            <span className="text-tx2 font-normal normal-case tracking-normal">
              {commandRunnerEnabled
                ? "· low-risk runs on click; medium/high confirm · localhost-only, audited"
                : "· display-only until command execution is explicitly enabled"}
            </span>
          </h3>
          {commandRunnerEnabled ? (
            <CommandRunner url={p.url} commands={p.manifest.commands} />
          ) : (
            <CommandList commands={p.manifest.commands} />
          )}
        </section>
      )}
    </div>
  );
}
