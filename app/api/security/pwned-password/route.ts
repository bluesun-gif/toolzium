import { NextRequest, NextResponse } from "next/server";
import { checkPwnedPassword } from "@/lib/data/adapters/breach-adapter";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (typeof password !== "string") {
      return NextResponse.json({ error: "Password must be a string." }, { status: 400 });
    }

    const result = await checkPwnedPassword(password);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Password check failed." },
      { status: 500 }
    );
  }
}
