import { NextResponse } from "next/server";

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "Pass2580#";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { passcode } = body;

    if (!passcode || typeof passcode !== "string") {
      return NextResponse.json({ ok: false, error: "Passcode is required" }, { status: 400 });
    }

    if (passcode === ADMIN_PASSCODE) {
      // Set secure HTTP-only cookie or session token
      const response = NextResponse.json({ ok: true, success: true, message: "Access Granted" });
      response.cookies.set("toolzium_admin_session", "authenticated_owner_789", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
      return response;
    }

    return NextResponse.json({ ok: false, error: "Incorrect Admin Passcode" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Server Error" }, { status: 500 });
  }
}
