import type { ReactNode } from "react";

function Logo() {
  return (
    <svg width="38" height="38" viewBox="0 0 100 100" fill="none" className="drop-shadow-[0_0_10px_rgba(232,255,90,.3)] shrink-0">
      <g stroke="#E8FF5A" strokeWidth="14" strokeLinecap="round">
        <line x1="24" y1="22" x2="49" y2="72" /><line x1="49" y1="33" x2="68" y2="72" /><line x1="71" y1="44" x2="84" y2="70" />
      </g>
      <circle cx="80" cy="86" r="8" fill="#E8FF5A" />
    </svg>
  );
}

export function Topbar({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  return (
    <header className="rounded-card border border-line bg-gradient-to-r from-[#161d27] to-[#111722] px-6 py-5 mb-4 flex items-center gap-4">
      <Logo />
      <div className="flex-1 min-w-0">
        <h1 className="font-display text-xl font-bold truncate">{title}</h1>
        {subtitle && <div className="text-xs text-tx2 mt-0.5 truncate">{subtitle}</div>}
      </div>
      {right}
    </header>
  );
}
