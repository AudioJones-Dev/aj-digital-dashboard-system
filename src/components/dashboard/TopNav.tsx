import Link from "next/link";
import { PROJECT_NAV, EXTERNAL_LINKS } from "@/config/nav";

function Mark() {
  return (
    <svg width="26" height="26" viewBox="0 0 100 100" fill="none" className="shrink-0">
      <g stroke="#E8FF5A" strokeWidth="14" strokeLinecap="round">
        <line x1="24" y1="22" x2="49" y2="72" /><line x1="49" y1="33" x2="68" y2="72" /><line x1="71" y1="44" x2="84" y2="70" />
      </g>
      <circle cx="80" cy="86" r="8" fill="#E8FF5A" />
    </svg>
  );
}

const link = "px-3 py-1.5 rounded-lg text-sm text-tx2 hover:bg-surface hover:text-tx transition";

export function TopNav() {
  return (
    <header className="sticky top-0 z-[60] border-b border-line bg-bg/85 backdrop-blur">
      <nav className="max-w-[1280px] mx-auto px-4 h-14 flex items-center gap-1">
        <Link href="/" className="flex items-center gap-2 mr-3 shrink-0">
          <Mark />
          <span className="font-display font-bold text-sm hidden sm:block">AJ Digital</span>
        </Link>
        <Link href="/" className={link}>Dashboard</Link>
        {PROJECT_NAV.map((p) => (
          <Link key={p.id} href={`/projects/${p.id}`} className={`${link} hidden md:block`}>{p.label}</Link>
        ))}
        <Link href="/sitemap" className={link}>Sitemap</Link>
        <div className="flex-1" />
        {EXTERNAL_LINKS.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg text-sm text-tx2 hover:text-signal transition hidden lg:block">{l.label} ↗</a>
        ))}
      </nav>
    </header>
  );
}
