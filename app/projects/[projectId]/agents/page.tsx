import { EmptyState } from "@/components/dashboard/EmptyState";

export const dynamic = "force-dynamic";
const AGENTS = ["Claude Code", "Codex", "Copilot", "Hermes / OpenClaw"];

export default function Agents() {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {AGENTS.map((a) => (
          <div key={a} className="rounded-card border border-line bg-surface p-4">
            <div className="font-display font-semibold text-sm">{a}</div>
            <div className="text-tx2 text-xs mt-2">No recent runs</div>
          </div>
        ))}
      </div>
      <EmptyState title="Agent activity feed" hint="Session summaries + run logs wire in once the engine exposes /api/agent-activity." />
    </div>
  );
}
