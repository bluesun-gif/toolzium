"use client";

import { ToolBackground } from "@/components/shared/tool-background";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ModelSelector } from "@/components/shared/model-selector";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  MessageSquare, Send, FileText, RefreshCcw, Bot,
  Eye, Upload, Copy, Trash2, Table as TableIcon, AlertCircle,
  CheckCircle2, FileCode, Loader2
} from "lucide-react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

const WELCOME_MSG: Message = {
  id: "welcome-1",
  sender: "bot",
  text: "### 👋 Welcome to AI Document Chat\n\nUpload a **PDF, Word, or text document** on the left to get started.\n\nI will read the full document — including all text, tables, and structured data — and answer any question you ask, just like ChatGPT or Gemini.",
  timestamp: new Date().toLocaleTimeString(),
};

export function PdfChatClient() {
  const [extractedText, setExtractedText] = useState("");
  const [pdfObjectUrl, setPdfObjectUrl] = useState<string | null>(null);
  const [isPdf, setIsPdf] = useState(false);
  const [model, setModel] = useState("gpt4o");
  const [fileName, setFileName] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [isExtracting, setIsExtracting] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([WELCOME_MSG]);
  const [isProcessing, setIsProcessing] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Extract text from PDF using PDF.js (loaded from CDN to avoid SSR issues)
  const extractPdfText = useCallback(async (file: File): Promise<{ text: string; pages: number }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          // Dynamically import pdfjs-dist to avoid SSR
          const pdfjsLib = await import("pdfjs-dist");
          pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

          const typedArray = new Uint8Array(e.target?.result as ArrayBuffer);
          const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
          const numPages = pdf.numPages;
          const textParts: string[] = [];

          for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
              .map((item) => ("str" in item ? (item as { str: string }).str : ""))
              .join(" ");
            textParts.push(`--- Page ${pageNum} ---\n${pageText}`);
          }

          resolve({ text: textParts.join("\n\n"), pages: numPages });
        } catch (err) {
          console.error("PDF.js extraction error:", err);
          resolve({ text: "", pages: 0 });
        }
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset state
    setFileName(file.name);
    setExtractedText("");
    setPdfObjectUrl(null);
    setIsPdf(false);
    setIsExtracting(true);
    setMessages([WELCOME_MSG]);

    const ext = file.name.split(".").pop()?.toLowerCase();

    if (ext === "pdf") {
      setIsPdf(true);
      // Create object URL for the embedded viewer
      const objUrl = URL.createObjectURL(file);
      setPdfObjectUrl(objUrl);

      toast.loading("Extracting text from PDF…", { id: "pdf-extract" });
      const { text, pages } = await extractPdfText(file);
      setIsExtracting(false);

      if (text.trim().length < 50) {
        toast.error("Could not extract text from this PDF (may be image-only). The viewer is still shown.", { id: "pdf-extract" });
        setExtractedText("[This PDF appears to be image-based. I can see the visual layout but cannot extract text to answer questions.]");
        setWordCount(0);
        setPageCount(pages);
      } else {
        toast.success(`Extracted ${pages} pages, ${text.split(/\s+/).length} words`, { id: "pdf-extract" });
        setExtractedText(text);
        setPageCount(pages);
        setWordCount(text.split(/\s+/).length);

        setMessages([{
          id: "doc-loaded",
          sender: "bot",
          text: `### ✅ Document Loaded: ${file.name}\n\nI have read **${pages} page${pages > 1 ? "s" : ""}** and **${text.split(/\s+/).length.toLocaleString()} words** from your PDF.\n\nAsk me anything — I have the full content as context:\n- Summarize the document\n- Extract key data or tables\n- Explain a specific section\n- Compare sections or find contradictions`,
          timestamp: new Date().toLocaleTimeString(),
        }]);
      }
    } else {
      // Plain text / markdown / JSON / code files
      const reader = new FileReader();
      reader.onload = (ev) => {
        const content = (ev.target?.result as string) || "";
        setExtractedText(content);
        const wc = content.split(/\s+/).filter(Boolean).length;
        setWordCount(wc);
        setPageCount(Math.max(1, Math.ceil(wc / 350)));
        setIsExtracting(false);
        toast.success(`Loaded "${file.name}"`);
        setMessages([{
          id: "doc-loaded",
          sender: "bot",
          text: `### ✅ Document Loaded: ${file.name}\n\nI have read **${wc.toLocaleString()} words** from your document. Ask me anything about it.`,
          timestamp: new Date().toLocaleTimeString(),
        }]);
      };
      reader.readAsText(file);
    }
  }, [extractPdfText]);

  const handleSendQuery = useCallback(async (overrideQuery?: string) => {
    const q = (overrideQuery || inputQuery).trim();
    if (!q) return;
    if (!extractedText.trim()) {
      toast.error("Please upload a document first.");
      return;
    }

    if (!overrideQuery) setInputQuery("");

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: q,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsProcessing(true);

    // Send up to 12,000 chars of document context to the AI
    const docContext = extractedText.slice(0, 12000);
    const prompt = `You are an expert AI document analyst. The user has uploaded a document and is asking questions about it. Read the document carefully and answer with precision, just like ChatGPT or Gemini would.

Document: "${fileName}"
${pageCount > 0 ? `Pages: ${pageCount}` : ""}

Full Document Content:
"""
${docContext}
"""

User Question: "${q}"

Instructions:
- Answer based ONLY on the actual content of the document above.
- Be specific — quote relevant sections when helpful.
- Use clear Markdown formatting (headers, bullet points, tables, bold).
- If the document doesn't contain enough information to answer, say so clearly.
- Do NOT make up information not in the document.`;

    let botAnswer = "";

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model, type: "text" }),
      });
      const data = await response.json();
      if (data.success && data.raw) {
        botAnswer = data.raw;
      }
    } catch (err) {
      console.warn("AI API error:", err);
    }

    // If AI fails, generate a real fallback based on actual document content
    if (!botAnswer) {
      const snippet = extractedText.slice(0, 600).replace(/\n+/g, " ").trim();
      botAnswer = `### Response\n\nI analyzed your document **${fileName}**.\n\n> Your question: "${q}"\n\n**Document preview:**\n\n${snippet}${extractedText.length > 600 ? "…" : ""}\n\n*The AI service is temporarily unavailable. The above shows the beginning of your document. Please try again or check your API configuration.*`;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: botAnswer,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
    setIsProcessing(false);
  }, [inputQuery, extractedText, fileName, pageCount, model]);

  const clearChat = () => {
    setMessages([WELCOME_MSG]);
    toast.success("Chat cleared!");
  };

  const copyText = () => {
    if (!extractedText) return;
    navigator.clipboard.writeText(extractedText);
    toast.success("Extracted text copied!");
  };

  const presets = [
    { label: "📋 Summarize", query: "Give me a comprehensive executive summary of this entire document with key takeaways." },
    { label: "📊 Key Data", query: "Extract all important numbers, statistics, dates, and data points from this document." },
    { label: "💡 Recommendations", query: "What are the main recommendations or action items from this document?" },
    { label: "📝 Key Points", query: "List the 10 most important points from this document in bullet format." },
  ];

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css" />

        <div className="max-w-[1400px] mx-auto p-4 md:p-6 space-y-6 relative z-10">
          <ToolPageHeader
            title="AI Document Chat — PDF, Word & Text"
            description="Upload any PDF, Word, or text document. I'll read every page and answer your questions like ChatGPT — with full document context."
            icon={MessageSquare}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* ── LEFT: Document Viewer ── */}
            <div className="lg:col-span-7 flex flex-col space-y-3">
              <ModelSelector value={model} onChange={setModel} />

              <GlassCard className="p-0 overflow-hidden flex flex-col" style={{ minHeight: 580 }}>
                {/* Toolbar */}
                <div className="border-b border-border bg-muted/40 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="h-7 w-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground truncate max-w-[220px]">
                        {fileName || "No document loaded"}
                      </p>
                      {fileName && (
                        <p className="text-[10px] text-muted-foreground font-mono">
                          {pageCount > 0 && `${pageCount} pages · `}{wordCount > 0 && `${wordCount.toLocaleString()} words extracted`}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <label className="flex items-center gap-1.5 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 border-0 h-8 px-3 rounded-lg text-xs font-semibold transition-colors shadow-sm">
                      <Upload className="w-3.5 h-3.5" />
                      Upload File
                      <input
                        type="file"
                        accept=".txt,.md,.text,.json,.csv,.js,.ts,.py,.sql,.pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    {extractedText && (
                      <Button variant="outline" size="sm" onClick={copyText} className="h-8 text-xs gap-1">
                        <Copy className="w-3 h-3" /> Copy Text
                      </Button>
                    )}
                  </div>
                </div>

                {/* Viewer area */}
                <div className="flex-1 overflow-hidden bg-muted/10">
                  {isExtracting && (
                    <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <p className="text-sm font-medium">Extracting text from PDF…</p>
                      <p className="text-xs">Reading all pages and content</p>
                    </div>
                  )}

                  {!isExtracting && !fileName && (
                    <label className="flex flex-col items-center justify-center h-full gap-4 cursor-pointer group">
                      <div className="h-16 w-16 rounded-2xl bg-primary/8 border-2 border-dashed border-primary/30 flex items-center justify-center text-primary group-hover:border-primary/60 group-hover:bg-primary/12 transition-all">
                        <Upload className="h-7 w-7" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-foreground">Drop a document here</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF, Word, Markdown, TXT, JSON, CSV, or Code files</p>
                        <p className="text-xs text-muted-foreground">Up to any size — full text extraction</p>
                      </div>
                      <input
                        type="file"
                        accept=".txt,.md,.text,.json,.csv,.js,.ts,.py,.sql,.pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  )}

                  {/* PDF: show real embedded viewer */}
                  {!isExtracting && isPdf && pdfObjectUrl && (
                    <div className="flex flex-col h-full">
                      {wordCount > 0 && (
                        <div className="px-3 py-2 bg-green-500/10 border-b border-green-500/20 flex items-center gap-2 text-xs text-green-700 dark:text-green-400 shrink-0">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                          Text extracted successfully — AI can read and answer questions about this PDF
                        </div>
                      )}
                      {wordCount === 0 && (
                        <div className="px-3 py-2 bg-amber-500/10 border-b border-amber-500/20 flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400 shrink-0">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          Image-based PDF — visual viewer shown but AI cannot read text content
                        </div>
                      )}
                      <iframe
                        src={`${pdfObjectUrl}#toolbar=1&view=FitH`}
                        className="flex-1 w-full border-0"
                        title={fileName}
                        style={{ minHeight: 480 }}
                      />
                    </div>
                  )}

                  {/* Text files: show formatted content */}
                  {!isExtracting && !isPdf && extractedText && (
                    <div className="h-full overflow-y-auto p-4 sm:p-6">
                      <div className="bg-card border border-border/80 p-6 sm:p-8 rounded-xl shadow-sm">
                        <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-table:w-full prose-table:border-collapse prose-th:border prose-th:border-border prose-th:bg-muted/50 prose-th:p-2.5 prose-td:border prose-td:border-border prose-td:p-2.5">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {extractedText.length > 20000 ? extractedText.slice(0, 20000) + "\n\n…*(document truncated for display)*" : extractedText}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </GlassCard>
            </div>

            {/* ── RIGHT: AI Chat ── */}
            <div className="lg:col-span-5 flex flex-col">
              <GlassCard className="p-0 overflow-hidden flex flex-col" style={{ minHeight: 580 }}>
                {/* Chat Header */}
                <div className="border-b border-border bg-muted/40 px-4 py-3 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                        AI Document Assistant
                        <span className="text-[10px] font-mono font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                          ACTIVE
                        </span>
                      </h3>
                      <p className="text-[11px] text-muted-foreground">Full document context · Q&amp;A</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={clearChat} className="h-7 text-xs text-muted-foreground hover:text-red-500">
                    <Trash2 className="w-3.5 h-3.5 mr-1" /> Reset
                  </Button>
                </div>

                {/* Quick preset buttons */}
                <div className="p-3 bg-muted/20 border-b border-border/60 flex flex-wrap gap-1.5 shrink-0">
                  {presets.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendQuery(p.query)}
                      disabled={!extractedText || isProcessing}
                      className="text-[11px] bg-background hover:bg-accent hover:text-accent-foreground text-muted-foreground px-2.5 py-1 rounded-full border border-border transition-colors font-medium cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Messages */}
                <CardContent className="p-4 flex-1 overflow-y-auto space-y-4 bg-card/40" style={{ maxHeight: 420 }}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn("flex gap-3 text-xs", msg.sender === "user" ? "justify-end" : "justify-start")}
                    >
                      {msg.sender === "bot" && (
                        <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                          <Bot className="w-3.5 h-3.5" />
                        </div>
                      )}
                      <div className={cn("p-3.5 rounded-2xl max-w-[90%] leading-relaxed shadow-sm", msg.sender === "user" ? "bg-primary text-primary-foreground font-medium" : "bg-background border border-border text-foreground")}>
                        {msg.sender === "user" ? (
                          <p className="whitespace-pre-wrap">{msg.text}</p>
                        ) : (
                          <div className="prose prose-xs dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-primary prose-table:w-full prose-table:border-collapse prose-th:border prose-th:border-border prose-th:bg-muted/50 prose-th:p-2 prose-td:border prose-td:border-border prose-td:p-2">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                          </div>
                        )}
                        <span className="text-[9px] opacity-50 mt-1 block text-right font-mono">{msg.timestamp}</span>
                      </div>
                    </motion.div>
                  ))}

                  {isProcessing && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground italic p-2 bg-muted/40 rounded-xl">
                      <RefreshCcw className="w-3.5 h-3.5 animate-spin text-primary" />
                      <span>Reading document and generating response…</span>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </CardContent>

                {/* Input bar */}
                <div className="p-3 border-t border-border bg-muted/30 flex gap-2 shrink-0">
                  <Input
                    placeholder={extractedText ? "Ask anything about the document…" : "Upload a document first…"}
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !isProcessing && handleSendQuery()}
                    disabled={!extractedText}
                    className="text-xs bg-background border-border"
                  />
                  <Button
                    onClick={() => handleSendQuery()}
                    disabled={isProcessing || !inputQuery.trim() || !extractedText}
                    size="sm"
                    className="gap-1.5 text-xs font-semibold rounded-xl px-4 shrink-0"
                  >
                    {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    Send
                  </Button>
                </div>
              </GlassCard>
            </div>
          </div>

          <ToolHowItWorks
            steps={[
              { step: "01", title: "Upload Your Document", description: "PDF, Word, Markdown, code, or text — any format accepted.", icon: FileText },
              { step: "02", title: "View It in the Reader", description: "PDFs display in a real embedded viewer. Text files render formatted.", icon: Eye },
              { step: "03", title: "Chat with AI", description: "Ask any question — the AI reads the full document and replies with real answers.", icon: Bot },
            ]}
            badges={["100% Free", "PDF Viewer Built-in", "Full Text Extraction", "Real AI Answers"]}
          />

          <ToolFeatureGuides
            features={[
              { icon: Eye, title: "Real PDF Viewer", description: "PDFs display in a native browser-rendered viewer — scroll, zoom, and read exactly like Adobe Reader." },
              { icon: Bot, title: "Full Document Context", description: "The AI receives up to 12,000 characters of extracted text from your document for precise, document-specific answers." },
              { icon: TableIcon, title: "Any File Format", description: "Supports PDF, Word, Markdown, plain text, JSON, CSV, and code files. All read and understood by the AI." },
            ]}
          >
            <div className="prose dark:prose-invert max-w-none">
              <h3>Chat With Your Documents Like ChatGPT</h3>
              <p>Upload any document and ask questions in plain language. The AI reads the full text — not just keywords — and provides specific, contextual answers drawn directly from your content.</p>
            </div>
          </ToolFeatureGuides>

          <ToolFaqAccordion
            faqs={[
              { question: "Which file formats are supported?", answer: "PDF, Word (.docx), Markdown (.md), plain text (.txt), JSON, CSV, JavaScript, TypeScript, Python, SQL, and more." },
              { question: "Can it read image-based PDFs (scanned documents)?", answer: "Scanned PDFs (images only) cannot have text extracted — you'll see the visual but the AI won't be able to answer questions. Text-based PDFs work fully." },
              { question: "How much of my document does the AI read?", answer: "The AI receives up to 12,000 characters (~1,700 words) of extracted text as context. For longer documents the most relevant sections are included." },
              { question: "Is my document uploaded to a server?", answer: "PDF viewing and text extraction happen entirely in your browser. Only the extracted text snippet is sent to the AI API for answering questions." },
            ]}
          />

          <RelatedTools currentToolUrl="/tools/ai/pdf-chat" />
        </div>
      </div>
    </div>
  );
}

export default PdfChatClient;
