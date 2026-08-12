import { auth } from "@/lib/auth";
import { type NextRequest, NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const { pathname } = request.nextUrl;

  // Normalized path for URL matching
  const normalizedPath = pathname.toLowerCase();

  // Redirect "prompt optimizer" with space or encoded space
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

  // Protected routes
  const protectedRoutes = ["/dashboard", "/profile", "/settings"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !session) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*", "/tools/ai/:path*"],
};
