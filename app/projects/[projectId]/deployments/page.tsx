import { loadProject } from "@/lib/projects";
import { EmptyState } from "@/components/dashboard/EmptyState";

export const dynamic = "force-dynamic";

export default async function Deployments({ params }: { params: { projectId: string } }) {
  const p = await loadProject(params.projectId);
  const dep = p?.manifest?.deployment;
  const proj = p?.manifest?.project;
  if (!dep) return <EmptyState title="No deployment config" />;
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-card border border-line bg-surface p-5">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div><div className="text-tx2 text-xs uppercase tracking-wide">Mode</div><div className="font-mono mt-1">{dep.mode}</div></div>
          <div><div className="text-tx2 text-xs uppercase tracking-wide">Target</div><div className="font-mono mt-1">{dep.target || "—"}</div></div>
          <div><div className="text-tx2 text-xs uppercase tracking-wide">Provider</div><div className="font-mono mt-1">{dep.provider || "—"}</div></div>
          <div><div className="text-tx2 text-xs uppercase tracking-wide">Local</div><div className="font-mono mt-1">{proj?.localUrl}</div></div>
          <div><div className="text-tx2 text-xs uppercase tracking-wide">Subdomain</div><div className="font-mono mt-1">{proj?.subdomain || "—"}</div></div>
        </div>
      </div>
      <EmptyState title="No deploys yet" hint="Subdomain routing + deploy actions are a later, auth-gated phase." />
    </div>
  );
}
