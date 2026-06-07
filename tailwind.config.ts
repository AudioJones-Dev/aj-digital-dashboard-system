import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0D1117",
        surface: "#1F2937",
        inset: "#273344",
        line: "#334155",
        tx: "#F8FAFC",
        tx2: "#CBD5E1",
        signal: "#E8FF5A",
        "signal-hover": "#D6F23A",
        ink: "#0D1117",
        ok: "#3fb950",
        warn: "#e5aa00",
        bad: "#E25555",
      },
      fontFamily: {
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      borderRadius: { card: "14px" },
    },
  },
  plugins: [],
};
export default config;
