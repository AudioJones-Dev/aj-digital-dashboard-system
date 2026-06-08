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

const localOpen =
  process.env.NODE_ENV === "development" &&
  process.env.HUB_LOCAL_OPEN !== "false" &&
  process.env.HUB_AUTH_MODE !== "clerk";
const clerkEnabled = !localOpen && !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Operator-only: a signed-in user must carry publicMetadata.role === "admin".
// Unauthenticated requests never reach here (middleware redirects to /sign-in).
// Without Clerk configured (local dev), the hub is open.
async function isOperator(): Promise<boolean> {
  if (!clerkEnabled) return true;
  try {
    const { currentUser } = await import("@clerk/nextjs/server");
    const u = await currentUser();
    if (!u) return true; // sign-in page (no session yet)
    return (u.publicMetadata as { role?: string } | undefined)?.role === "admin";
  } catch {
    return true;
  }
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const operator = await isOperator();
  const content = operator ? (
    children
  ) : (
    <main className="flex flex-col items-center justify-center gap-3 px-4 py-32 text-center">
      <h1 className="font-display text-xl font-bold text-tx">Operator access only</h1>
      <p className="max-w-md text-sm text-tx2">
        This dashboard is restricted to AJ Digital operators. Your account isn&apos;t authorized — use the
        account menu (top-right) to sign out.
      </p>
    </main>
  );

  const tree = (
    <html lang="en">
      <body className="font-body min-h-screen flex flex-col">
        <TopNav />
        <div className="flex-1">{content}</div>
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
