"use client";
import { useState } from "react";
import { RiskBadge } from "./RiskBadge";
import type { ProjectManifest } from "@/types/dashboard";

type Cmd = ProjectManifest["commands"][number];

// Runs allowlisted commands against the project's engine (/api/run, localhost-only).
// Low-risk runs immediately; medium/high require an explicit confirm (= approval).
export function CommandRunner({ url, commands }: { url: string; commands: Cmd[] }) {
  const [busy, setBusy] = useState<string | null>(null);
  const [out, setOut] = useState<{ id: string; text: string; ok: boolean } | null>(null);

  async function run(c: Cmd) {
    if (c.risk !== "low" && !confirm(`Run ${c.risk.toUpperCase()}-risk command?\n\n${c.command}`)) return;
    setBusy(c.id); setOut(null);
    try {
      const r = await fetch(`${url}/api/run`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: c.id, approve: c.risk !== "low" }),
      });
      const j = await r.json();
      if (j.requiresApproval) setOut({ id: c.id, text: "Requires approval.", ok: false });
      else if (j.error) setOut({ id: c.id, text: j.error, ok: false });
      else setOut({ id: c.id, text: `exit ${j.exitCode}\n\n${j.output || ""}`.slice(0, 5000), ok: j.ok });
    } catch (e) {
      setOut({ id: c.id, text: String((e as Error).message), ok: false });
    } finally {
      setBusy(null);
    }
  }

  if (!commands?.length) return <div className="text-tx2 text-sm">No commands configured.</div>;
  return (
    <div className="flex flex-col gap-2">
      {commands.map((c) => (
        <div key={c.id} className="rounded-lg border border-line bg-inset px-3 py-2.5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="font-semibold text-sm">{c.label}</div>
              <div className="font-mono text-[11px] text-tx2 truncate">{c.command}</div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <RiskBadge risk={c.risk} />
              <button onClick={() => run(c)} disabled={busy === c.id}
                className={`text-[11px] px-3 py-1 rounded-md font-semibold disabled:opacity-50 ${c.risk === "low" ? "bg-signal text-ink" : "bg-inset border border-line text-tx hover:border-tx2"}`}>
                {busy === c.id ? "Running…" : "Run"}
              </button>
            </div>
          </div>
          {out && out.id === c.id && (
            <pre className={`mt-2 text-[11px] font-mono whitespace-pre-wrap max-h-52 overflow-auto rounded bg-bg p-2 border ${out.ok ? "border-ok/40" : "border-bad/40"}`}>{out.text}</pre>
          )}
        </div>
      ))}
    </div>
  );
}
