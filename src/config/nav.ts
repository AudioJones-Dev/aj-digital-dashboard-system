// Navigation config — drives the top nav, footer, and sitemap.
export const PROJECT_NAV = [
  { id: "aj-digital-os", label: "AJ Digital OS" },
  { id: "responseos", label: "ResponseOS" },
  { id: "audiojones-com", label: "AudioJones.com" },
];

export const PROJECT_PAGES = ["", "/tasks", "/agents", "/runs", "/docs", "/metrics", "/deployments", "/settings"];

export const PAGE_LABELS: Record<string, string> = {
  "": "Overview", "/tasks": "Tasks", "/agents": "Agents", "/runs": "Runs",
  "/docs": "Docs", "/metrics": "Metrics", "/deployments": "Deployments", "/settings": "Settings",
};

export const EXTERNAL_LINKS = [
  { label: "Portfolio", href: "http://localhost:7400" },
  { label: "Notion", href: "https://www.notion.so" },
  { label: "GitHub", href: "https://github.com/AudioJones-Dev" },
];
