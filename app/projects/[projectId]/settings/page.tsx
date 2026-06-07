import { loadProject } from "@/lib/projects";
import { EmptyState } from "@/components/dashboard/EmptyState";

export const dynamic = "force-dynamic";

export default async function Settings({ params }: { params: { projectId: string } }) {
  const p = await loadProject(params.projectId);
  if (!p?.manifest) return <EmptyState title="No manifest" hint="This project doesn't expose /api/manifest yet." />;
  const m = p.manifest;
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-card border border-line bg-surface p-5">
        <h3 className="font-display font-semibold mb-3">Capabilities</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(m.capabilities).map(([k, v]) => (
            <span key={k} className={`text-[11px] px-2.5 py-1 rounded-full border ${v ? "text-ok border-ok/40 bg-ok/10" : "text-tx2 border-line bg-inset"}`}>{v ? "✓" : "✗"} {k}</span>
          ))}
        </div>
      </div>
      <div className="rounded-card border border-line bg-surface p-5">
        <h3 className="font-display font-semibold mb-3">Manifest</h3>
        <pre className="font-mono text-[11px] text-tx2 overflow-auto whitespace-pre-wrap">{JSON.stringify(m, null, 2)}</pre>
      </div>
    </div>
  );
}
