import { NextRequest, NextResponse } from "next/server";
import { checkEmailDomainSecurity } from "@/lib/data/adapters/email-security-adapter";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { domain } = await req.json();
    if (typeof domain !== "string" || !domain.trim()) {
      return NextResponse.json({ error: "Domain must be a string." }, { status: 400 });
    }
    const result = await checkEmailDomainSecurity(domain);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Email security check failed." },
      { status: 500 }
    );
  }
}
