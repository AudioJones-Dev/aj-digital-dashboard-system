import Link from "next/link";
import { PROJECT_NAV, EXTERNAL_LINKS } from "@/config/nav";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface/30 mt-12">
      <div className="max-w-[1280px] mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display font-bold mb-2">AJ Digital — Dashboard</div>
          <p className="text-tx2 text-[13px] leading-relaxed">Local-first project control surface. Live status, ownership, and repo health across every AJ Digital build.</p>
        </div>
        <div>
          <div className="text-tx2 text-[11px] uppercase tracking-wide mb-3">Projects</div>
          <ul className="space-y-2">{PROJECT_NAV.map((p) => <li key={p.id}><Link href={`/projects/${p.id}`} className="text-tx2 hover:text-tx">{p.label}</Link></li>)}</ul>
        </div>
        <div>
          <div className="text-tx2 text-[11px] uppercase tracking-wide mb-3">Navigate</div>
          <ul className="space-y-2">
            <li><Link href="/" className="text-tx2 hover:text-tx">Dashboard</Link></li>
            <li><Link href="/sitemap" className="text-tx2 hover:text-tx">Sitemap</Link></li>
            {EXTERNAL_LINKS.map((l) => <li key={l.label}><a href={l.href} target="_blank" rel="noreferrer" className="text-tx2 hover:text-signal">{l.label} ↗</a></li>)}
          </ul>
        </div>
        <div>
          <div className="text-tx2 text-[11px] uppercase tracking-wide mb-3">Status</div>
          <ul className="space-y-2 text-tx2 text-[13px]">
            <li>3 project engines</li>
            <li>Notion two-way sync</li>
            <li><span className="text-ok">●</span> dash.ajdigital.app</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="max-w-[1280px] mx-auto px-4 py-4 flex items-center justify-between text-[12px] text-tx2">
          <span>© 2026 AJ Digital LLC</span>
          <span>Built by Audio Jones</span>
        </div>
      </div>
    </footer>
  );
}
