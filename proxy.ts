import { auth } from "@/lib/auth";
import { type NextRequest, NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
  // 1. Enforce apex canonical domain: redirect www. to non-www
  const host = request.headers.get("host") || "";
  if (host.startsWith("www.")) {
    const newHost = host.replace(/^www\./, "");
    const url = request.nextUrl.clone();
    url.host = newHost;
    url.protocol = "https";
    return NextResponse.redirect(url, 308);
  }

  const { pathname } = request.nextUrl;
  const normalizedPath = pathname.toLowerCase();

  // 2. Redirect legacy "prompt optimizer" URLs
  if (
    normalizedPath === "/tools/ai/prompt optimizer" || 
    normalizedPath === "/tools/ai/prompt%20optimizer" ||
    normalizedPath === "/tools/ai/prompt_optimizer" ||
    normalizedPath === "/tools/ai/promptoptimizer" ||
    normalizedPath === "/tools/ai/prompt-engineering"
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/tools/ai/prompt-optimizer";
    return NextResponse.redirect(url, 301);
  }

  // 3. Protected routes check (only fetch session when actually needed)
  const protectedRoutes = ["/dashboard", "/profile", "/settings"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    if (!session) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except internal Next.js static files and favicon
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
