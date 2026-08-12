import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname.toLowerCase();

  // Redirect "prompt optimizer" with space or encoded space
  if (
    pathname === "/tools/ai/prompt optimizer" || 
    pathname === "/tools/ai/prompt%20optimizer" ||
    pathname === "/tools/ai/prompt_optimizer" ||
    pathname === "/tools/ai/promptoptimizer" ||
    pathname === "/tools/ai/prompt-engineering"
  ) {
    url.pathname = "/tools/ai/prompt-optimizer";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  // Only run middleware on paths under /tools/ai/
  matcher: "/tools/ai/:path*",
};
