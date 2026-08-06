import { NextRequest, NextResponse } from "next/server";
// @ts-ignore
import PDFParser from "pdf2json";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const pdfParser = new PDFParser(null, true);

    const cleanText = await new Promise<string>((resolve, reject) => {
      pdfParser.on("pdfParser_dataError", (errData: any) => reject(errData.parserError || errData));
      pdfParser.on("pdfParser_dataReady", () => {
        try {
          const rawText = pdfParser.getRawTextContent();
          resolve(rawText);
        } catch (e) {
          reject(e);
        }
      });
      pdfParser.parseBuffer(buffer);
    });

    let decoded = cleanText;
    try {
      decoded = decodeURIComponent(cleanText);
    } catch {
      decoded = cleanText;
    }

    const sanitized = decoded
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, "")
      .replace(/----------------Page \(\d+\) Break----------------/gi, "\n")
      .replace(/\r\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    return NextResponse.json({
      success: true,
      text: sanitized,
    });
  } catch (error: any) {
    console.error("PDF Parsing Error:", error);
    return NextResponse.json(
      { error: "Failed to parse PDF document: " + (error?.message || "Unknown error") },
      { status: 500 }
    );
  }
}
