import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { TopNav } from "@/components/dashboard/TopNav";
import { Footer } from "@/components/dashboard/Footer";

export const metadata: Metadata = {
  title: "AJ Digital — Dashboard System",
  description: "Reusable local-first project control surface for AJ Digital repos.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body min-h-screen flex flex-col">
        <TopNav />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
