import { RiskBadge } from "./RiskBadge";
import type { ProjectManifest } from "@/types/dashboard";

// NOTE: command execution is intentionally NOT wired yet. It is a later, gated
// phase — must be localhost-only, allowlisted, audit-logged, and high-risk
// commands must require explicit human approval before running.
export function CommandList({ commands }: { commands: ProjectManifest["commands"] }) {
  if (!commands?.length) return <div className="text-tx2 text-sm">No commands configured.</div>;
  return (
    <div className="flex flex-col gap-2">
      {commands.map((c) => (
        <div key={c.id} className="flex items-center justify-between rounded-lg border border-line bg-inset px-3 py-2.5">
          <div className="min-w-0">
            <div className="font-semibold text-sm">{c.label}</div>
            <div className="font-mono text-[11px] text-tx2 truncate">{c.command}</div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <RiskBadge risk={c.risk} />
            <button disabled title="Execution gated — coming in a later phase" className="text-[11px] px-3 py-1 rounded-md bg-inset border border-line text-tx2 cursor-not-allowed">
              Run
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
