import type { ReactNode } from "react";

export function MetricCard({ label, value, sub }: { label: string; value: ReactNode; sub?: string }) {
  return (
    <div className="rounded-card border border-line bg-surface p-4 transition hover:-translate-y-0.5 hover:border-[#3d4b5e]">
      <div className="text-[10.5px] uppercase tracking-wide text-tx2">{label}</div>
      <div className="font-mono text-2xl font-bold mt-1">{value}</div>
      {sub && <div className="text-xs text-tx2 mt-0.5">{sub}</div>}
    </div>
  );
}
