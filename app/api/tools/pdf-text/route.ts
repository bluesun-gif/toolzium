import { NextRequest, NextResponse } from "next/server";
const pdfParse = require("pdf-parse");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // High-Precision Server PDF Parsing
    const data = await pdfParse(buffer);

    // Clean and sanitize extracted text (strip control characters and fix line endings)
    const cleanText = (data.text || "")
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, "") // remove non-printable control chars
      .replace(/\r\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    return NextResponse.json({
      success: true,
      text: cleanText,
      pages: data.numpages || 1,
      info: data.info || {},
    });
  } catch (error: any) {
    console.error("PDF Parsing Error:", error);
    return NextResponse.json(
      { error: "Failed to parse PDF document: " + (error?.message || "Unknown error") },
      { status: 500 }
    );
  }
}
