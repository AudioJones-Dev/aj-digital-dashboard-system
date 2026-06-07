import Link from "next/link";
import type { ProjectManifest } from "@/types/dashboard";

export function Sidebar({ projectId, nav }: { projectId: string; nav: ProjectManifest["navigation"] }) {
  return (
    <aside className="w-[210px] shrink-0 border-r border-line bg-surface/40 p-4 hidden md:block">
      <Link href="/" className="text-tx2 text-xs hover:text-signal">← All projects</Link>
      <nav className="mt-5 flex flex-col gap-1">
        {nav.map((n) => {
          const href = `/projects/${projectId}` + (n.route === "/" ? "" : n.route);
          return (
            <Link key={n.route} href={href} className="px-3 py-2 rounded-lg text-sm text-tx2 hover:bg-inset hover:text-tx transition">
              {n.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
