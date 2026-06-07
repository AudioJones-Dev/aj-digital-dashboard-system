const MAP: Record<string, string> = {
  Done: "text-ok bg-ok/15",
  "In Progress": "text-[#56b6ff] bg-[#56b6ff]/15",
  active: "text-ok bg-ok/15",
  Blocked: "text-bad bg-bad/15",
  Todo: "text-tx2 bg-white/5",
  "Not Started": "text-tx2 bg-white/5",
  paused: "text-warn bg-warn/15",
};

export function StatusBadge({ status }: { status: string }) {
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${MAP[status] || "text-tx2 bg-white/5"}`}>{status}</span>;
}
