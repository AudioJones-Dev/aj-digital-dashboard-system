import { loadProject } from "@/lib/projects";
import { EmptyState } from "@/components/dashboard/EmptyState";

export const dynamic = "force-dynamic";

export default async function Docs({ params }: { params: { projectId: string } }) {
  const p = await loadProject(params.projectId);
  const docs = p?.manifest?.docs;
  if (!docs) return <EmptyState title="No docs configured" hint="Add docs.canonical to the project manifest." />;
  return (
    <div>
      <p className="text-tx2 text-sm mb-3">Canonical docs from <code className="font-mono">{docs.root}/</code> (rendering arrives in a later phase):</p>
      <div className="rounded-card border border-line bg-surface overflow-hidden">
        {docs.canonical.map((d) => (
          <div key={d} className="px-4 py-3 border-b border-line last:border-0 font-mono text-sm">{d}</div>
        ))}
      </div>
    </div>
  );
}
