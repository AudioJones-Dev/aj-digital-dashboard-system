import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

// Auth strategy, in order of preference:
//   1. Clerk        — when NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is set (login page, reset, MFA)
//   2. Basic Auth   — when HUB_USER + HUB_PASS are set (interim gate; never public)
//   3. Open         — local dev with neither configured
const isPublicRoute = createRouteMatcher(["/sign-in(.*)"]);
const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

function basicAuth(req: NextRequest) {
  const user = process.env.HUB_USER;
  const pass = process.env.HUB_PASS;
  if (!user || !pass) return NextResponse.next();
  const header = req.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    try {
      const [u, p] = atob(header.slice(6)).split(":");
      if (u === user && p === pass) return NextResponse.next();
    } catch {
      /* fall through */
    }
  }
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="AJ Digital Dashboard"' },
  });
}

export default clerkEnabled
  ? clerkMiddleware(async (auth, req) => {
      if (!isPublicRoute(req)) await auth.protect();
    })
  : basicAuth;

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|logo.svg).*)"],
};
