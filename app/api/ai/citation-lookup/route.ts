import { NextResponse } from "next/server";
import { executeAiCompletion } from "@/lib/ai-gateway";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { input, sourceType = "auto" } = body;

    if (!input || typeof input !== "string" || !input.trim()) {
      return NextResponse.json({ error: "Source title, URL, or DOI is required." }, { status: 400 });
    }

    const systemPrompt = `You are a world-class academic bibliographer and metadata extraction engine (Zotero, CrossRef, and Mendeley standard).
Given a user's input (which could be an article title, website URL, book title, DOI, or author list), extract and infer the complete academic citation metadata.

Return STRICT JSON ONLY with the following exact schema:
{
  "type": "book" | "journal" | "website" | "conference",
  "title": "Clean standard title",
  "authors": [
    { "first": "First/Middle Name", "last": "Last Name" }
  ],
  "year": "YYYY",
  "publisher": "Publisher Name or Organization (or empty)",
  "journal": "Journal Name (if applicable, else empty)",
  "volume": "Volume number (or empty)",
  "issue": "Issue number (or empty)",
  "pages": "pp-pp (or empty)",
  "doi": "10.xxxx/... (or empty)",
  "url": "https://... (or empty)",
  "accessDate": "YYYY-MM-DD",
  "inTextCitation": "(Author, Year)",
  "citations": {
    "apa": "Complete APA 7th edition formatted citation string",
    "mla": "Complete MLA 9th edition formatted citation string",
    "chicago": "Complete Chicago 17th author-date citation string",
    "harvard": "Complete Harvard style citation string",
    "ieee": "Complete IEEE numeric reference string",
    "bibtex": "@article{... BibTeX entry ...}"
  }
}
No markdown backticks, no explanatory text, valid raw JSON only.`;

    const userPrompt = `Source type preference: ${sourceType}\nSource input: ${input.trim()}\nExtract metadata and generate all citation formats.`;

    const aiRes = await executeAiCompletion({
      systemPrompt,
      userPrompt,
      temperature: 0.2,
      maxTokens: 2500,
      responseFormat: "json"
    });

    if (!aiRes.success || !aiRes.content) {
      throw new Error("Failed to parse citation metadata.");
    }

    const cleaned = aiRes.content
      .replace(/<think>[\s\S]*?<\/think>/gi, "")
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const startIdx = cleaned.indexOf("{");
    const endIdx = cleaned.lastIndexOf("}");

    if (startIdx === -1 || endIdx === -1) {
      throw new Error("Invalid JSON returned by AI citation engine.");
    }

    const parsed = JSON.parse(cleaned.slice(startIdx, endIdx + 1));

    return NextResponse.json({
      success: true,
      data: parsed,
      provider: aiRes.provider
    });
  } catch (error: any) {
    console.error("Citation Lookup Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to extract citation" },
      { status: 500 }
    );
  }
}
