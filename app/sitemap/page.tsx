import Link from "next/link";
import { PROJECT_NAV, PROJECT_PAGES, PAGE_LABELS, EXTERNAL_LINKS } from "@/config/nav";

export const metadata = { title: "Sitemap — AJ Digital Dashboard" };

export default function SitemapPage() {
  return (
    <main className="max-w-[1280px] mx-auto p-4">
      <h1 className="font-display text-2xl font-bold mb-1">Sitemap</h1>
      <p className="text-tx2 text-sm mb-6">Every page across the dashboard, in one place.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <section className="rounded-card border border-line bg-surface p-5">
          <h2 className="font-display font-bold mb-3">Top level</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="text-tx2 hover:text-signal">Dashboard — project launcher</Link></li>
            <li><Link href="/sitemap" className="text-tx2 hover:text-signal">Sitemap</Link></li>
          </ul>
        </section>
        {PROJECT_NAV.map((p) => (
          <section key={p.id} className="rounded-card border border-line bg-surface p-5">
            <h2 className="font-display font-bold mb-3">{p.label}</h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {PROJECT_PAGES.map((pg) => (
                <li key={pg}><Link href={`/projects/${p.id}${pg}`} className="text-tx2 hover:text-signal">{PAGE_LABELS[pg]}</Link></li>
              ))}
            </ul>
          </section>
        ))}
        <section className="rounded-card border border-line bg-surface p-5">
          <h2 className="font-display font-bold mb-3">External</h2>
          <ul className="space-y-2 text-sm">
            {EXTERNAL_LINKS.map((l) => <li key={l.label}><a href={l.href} target="_blank" rel="noreferrer" className="text-tx2 hover:text-signal">{l.label} ↗</a></li>)}
          </ul>
        </section>
      </div>
    </main>
  );
}
