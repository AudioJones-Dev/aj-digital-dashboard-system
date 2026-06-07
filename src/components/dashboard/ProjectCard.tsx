import Link from "next/link";
import type { LiveProject } from "@/types/dashboard";

function tag(t: string, kind?: "bad") {
  const c = kind === "bad" ? "text-bad border-bad/40 bg-bad/10" : "text-tx2 border-line bg-inset";
  return <span key={t} className={`px-2.5 py-0.5 rounded-full border ${c}`}>{t}</span>;
}

export function ProjectCard({ p }: { p: LiveProject }) {
  const m = p.manifest?.project;
  const name = m?.name || p.id;

  if (!p.online || !p.data) {
    return (
      <Link href={`/projects/${p.id}`} className="block rounded-card border border-line bg-surface p-5 opacity-60 hover:opacity-100 transition">
        <div className="flex justify-between items-center">
          <div className="font-display font-bold text-lg">{name}</div>
          <span className="w-2.5 h-2.5 rounded-full bg-tx2" />
        </div>
        <div className="text-tx2 text-sm mt-3">⚫ offline · start its dashboard server{m ? ` (port ${m.localPort})` : ""}</div>
      </Link>
    );
  }

  const d = p.data;
  const done = d.tasks.filter((t) => t.status === "Done").length;
  return (
    <Link href={`/projects/${p.id}`} className="block rounded-card border border-line bg-surface p-5 transition hover:-translate-y-1 hover:border-signal-hover hover:shadow-[0_14px_28px_rgba(0,0,0,.4)]">
      <div className="flex justify-between items-start">
        <div className="min-w-0">
          <div className="font-display font-bold text-lg truncate">{name}</div>
          <div className="font-mono text-[11px] text-tx2 mt-0.5 truncate">{d.meta.repo}</div>
        </div>
        <span className="w-2.5 h-2.5 rounded-full bg-ok shrink-0" />
      </div>
      <div className="h-2.5 rounded bg-inset overflow-hidden my-3.5">
        <div className="h-full bg-signal transition-all" style={{ width: d.meta.overall + "%" }} />
      </div>
      <div className="flex justify-between text-xs text-tx2">
        <span>{d.meta.overall}% overall</span>
        <span>{done}/{d.tasks.length} tasks</span>
      </div>
      {d.next && (
        <div className="mt-3 text-sm bg-inset border border-line rounded-lg px-3 py-2.5">
          <div className="text-[10px] uppercase tracking-wide text-tx2">Next task</div>
          <div><span className="font-semibold">{d.next.owner}</span> {d.next.title} · {d.next.priority}</div>
        </div>
      )}
      <div className="flex gap-2 mt-3 flex-wrap text-[11px]">
        {tag(`${done}/${d.tasks.length} tasks`)}
        {(d.blocked?.length || 0) > 0 && tag(`${d.blocked!.length} blocked`, "bad")}
        {d.prs?.total != null && tag(`${d.prs.total} PRs`)}
        {m?.subdomain && tag(m.subdomain)}
      </div>
    </Link>
  );
}
