import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { TopNav } from "@/components/dashboard/TopNav";
import { Footer } from "@/components/dashboard/Footer";

export const metadata: Metadata = {
  title: "AJ Digital — Dashboard System",
  description: "Reusable local-first project control surface for AJ Digital repos.",
};

const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout({ children }: { children: ReactNode }) {
  const tree = (
    <html lang="en">
      <body className="font-body min-h-screen flex flex-col">
        <TopNav />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );

  if (!clerkEnabled) return tree;

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#E8FF5A",
          colorTextOnPrimaryBackground: "#0D1117",
          colorBackground: "#1F2937",
          borderRadius: "12px",
          fontFamily: "Inter, system-ui, sans-serif",
        },
      }}
    >
      {tree}
    </ClerkProvider>
  );
}
