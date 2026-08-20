import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileName = file.name;
    const ext = fileName.split(".").pop()?.toLowerCase() || "";
    const buffer = Buffer.from(await file.arrayBuffer());

    let extractedText = "";
    let pages = 1;

    if (ext === "pdf") {
      const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
      const loadingTask = pdfjsLib.getDocument({
        data: new Uint8Array(buffer),
        useSystemFonts: true,
        disableFontFace: false,
      });
      const pdf = await loadingTask.promise;
      pages = pdf.numPages;

      const pageTexts: string[] = [];
      for (let i = 1; i <= pages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const str = textContent.items
          .map((item: any) => item.str || "")
          .join(" ");
        if (str.trim()) {
          pageTexts.push(`--- Page ${i} ---\n${str.trim()}`);
        }
      }
      extractedText = pageTexts.join("\n\n");
    } else if (ext === "docx") {
      // Basic docx XML text extraction from zip buffer
      const jszip = (await import("jszip")).default;
      const zip = await jszip.loadAsync(buffer);
      const docXml = await zip.file("word/document.xml")?.async("string");
      if (docXml) {
        // Strip XML tags and get clean text
        extractedText = docXml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      }
    } else {
      // Plain text, markdown, csv, json
      extractedText = buffer.toString("utf-8");
    }

    const words = extractedText.split(/\s+/).filter(Boolean).length;

    return NextResponse.json({
      success: true,
      fileName,
      pages,
      wordCount: words,
      text: extractedText,
    });
  } catch (error: any) {
    console.error("Parse Doc Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to parse document" },
      { status: 500 }
    );
  }
}
