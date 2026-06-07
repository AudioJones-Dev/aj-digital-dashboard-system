import { loadAllProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { Topbar } from "@/components/dashboard/Topbar";

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await loadAllProjects();
  const online = projects.filter((p) => p.online);
  const avg = online.length ? Math.round(online.reduce((s, p) => s + p.data!.meta.overall, 0) / online.length) : 0;
  const blocked = online.reduce((s, p) => s + (p.data?.blocked?.length || 0), 0);

  const kpis = [
    { l: "Avg Progress", v: avg + "%", accent: true },
    { l: "Projects Online", v: `${online.length} / ${projects.length}` },
    { l: "Total Blocked", v: String(blocked) },
    { l: "Registered", v: String(projects.length) },
  ];

  return (
    <main className="max-w-[1280px] mx-auto p-4">
      <Topbar title="AJ Digital — Dashboard System" subtitle="Project control surface · local-first · auto-refresh on load" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
        {kpis.map((k) => (
          <div key={k.l} className={`rounded-card border p-4 ${k.accent ? "bg-signal border-signal-hover text-ink" : "bg-surface border-line"}`}>
            <div className={`text-[10.5px] uppercase tracking-wide ${k.accent ? "text-ink/60" : "text-tx2"}`}>{k.l}</div>
            <div className="font-mono text-2xl font-bold mt-1">{k.v}</div>
          </div>
        ))}
      </div>
      <h2 className="text-xs uppercase tracking-wider text-tx2 font-semibold mb-3 mt-7">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {projects.map((p) => <ProjectCard key={p.id} p={p} />)}
      </div>
      <footer className="text-center text-tx2 text-xs mt-8">
        Reads each project&apos;s <code>/api/manifest</code> + <code>/api/data</code> · register projects in <code>src/config/projects.ts</code>
      </footer>
    </main>
  );
}
