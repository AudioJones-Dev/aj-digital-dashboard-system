const C: Record<string, string> = {
  low: "text-tx2 border-line",
  medium: "text-warn border-warn/40",
  high: "text-bad border-bad/40",
};

export function RiskBadge({ risk }: { risk: string }) {
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${C[risk] || C.low}`}>{risk.toUpperCase()}</span>;
}
