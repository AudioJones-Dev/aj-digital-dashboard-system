import { NextRequest, NextResponse } from "next/server";

// Free, app-level gate (HTTP Basic Auth over HTTPS). Active only when HUB_USER +
// HUB_PASS are set (so local dev stays open). Keeps the deployed hub private
// without Vercel's paid Deployment Protection.
export function middleware(req: NextRequest) {
  const user = process.env.HUB_USER;
  const pass = process.env.HUB_PASS;
  if (!user || !pass) return NextResponse.next();

  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    try {
      const [u, p] = atob(auth.slice(6)).split(":");
      if (u === user && p === pass) return NextResponse.next();
    } catch {
      /* fall through to challenge */
    }
  }
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="AJ Digital Dashboard"' },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
