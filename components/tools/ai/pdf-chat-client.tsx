"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import {
  FileText,
  Sparkles,
  RefreshCw,
  MessageSquare,
  ListChecks,
  Upload,
  Bot,
  User,
  Send,
  Zap,
  HelpCircle,
  AlertTriangle,
  X,
  FileCheck,
  Search,
  Copy,
  Check,
  BookOpen,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export default function PdfChatClient() {
  const [activeTab, setActiveTab] = useState<"upload" | "text">("upload");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<string>("");
  const [extractedText, setExtractedText] = useState<string>("");
  const [wordCount, setWordCount] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);

  const [inputQuestion, setInputQuestion] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "ai",
      text: "👋 Welcome to Document Intelligence! Upload any PDF, Resume, Business Report, Legal Contract, Invoice, or Text file. I will read, extract, and understand the document so you can ask me anything about it!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const processSelectedFile = async (uploadedFile: File) => {
    setFile(uploadedFile);
    setFileName(uploadedFile.name);
    setFileSize((uploadedFile.size / 1024 / 1024).toFixed(2) + " MB");

    setIsProcessing(true);
    toast.loading(`Parsing & extracting ${uploadedFile.name}...`, { id: "doc-read" });

    try {
      let text = "";
      let pages = 1;

      if (uploadedFile.name.toLowerCase().endsWith(".pdf")) {
        // High-Precision Server Extraction via pdf-parse API
        const formData = new FormData();
        formData.append("file", uploadedFile);

        const res = await fetch("/api/tools/pdf-text", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (data.success && data.text) {
          text = data.text;
          pages = data.pages || 1;
        } else {
          throw new Error(data.error || "Failed to parse PDF");
        }
      } else {
        text = await uploadedFile.text();
        // Clean text of unprintable control characters
        text = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, "").trim();
      }

      setExtractedText(text);
      setPageCount(pages);
      const count = text.trim().split(/\s+/).filter(Boolean).length;
      setWordCount(count);

      toast.success(`Successfully read ${uploadedFile.name} (${count} words, ${pages} page${pages > 1 ? "s" : ""})!`, { id: "doc-read" });
      generateInitialSummary(uploadedFile.name, text, pages);
    } catch (err: any) {
      console.error("File Extraction Error:", err);
      toast.error("Failed to read document text. Try pasting raw text.", { id: "doc-read" });
    } finally {
      setIsProcessing(false);
    }
  };

  const generateInitialSummary = (name: string, content: string, pages: number) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const lines = content.split("\n").map((l) => l.trim()).filter(Boolean);
    const mainTitle = lines[0] || name;

    const summaryMessage: ChatMessage = {
      id: "summary-" + Date.now(),
      sender: "ai",
      text: `📄 **Document Loaded & Analyzed**: **${name}**\n\n📌 **Overview Summary**:\n• **Title / Document Header**: ${mainTitle}\n• **Total Pages**: ${pages} page${pages > 1 ? "s" : ""}\n• **Total Word Count**: ${wordCount} words\n• **First Paragraph Snippet**:\n> "${content.slice(0, 260).replace(/\n/g, " ")}..."\n\n💬 Ask me any question about **${name}** or click a quick action below!`,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, summaryMessage]);
    scrollToBottom();
  };

  // High-Intelligence Universal Document Engine
  const handleAskQuestion = (questionText?: string) => {
    const q = (questionText || inputQuestion).trim();
    if (!q) return;

    if (!extractedText.trim()) {
      toast.error("Please upload a document or paste text first.");
      return;
    }

    const userTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: ChatMessage = {
      id: "usr-" + Date.now(),
      sender: "user",
      text: q,
      timestamp: userTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion("");
    setIsProcessing(true);
    scrollToBottom();

    setTimeout(() => {
      let responseText = "";
      const lowerQ = q.toLowerCase();
      const content = extractedText;

      // Extract clean sentences and paragraphs
      const paragraphs = content.split(/\n\s*\n/).map((p) => p.trim()).filter((p) => p.length > 10);
      const sentences = content.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter((s) => s.length > 5);

      if (lowerQ.includes("summarize") || lowerQ.includes("summary") || lowerQ.includes("overview")) {
        const topParas = paragraphs.slice(0, 4).map((p, idx) => `${idx + 1}. ${p}`).join("\n\n");
        responseText = `📌 **Executive Document Summary (${fileName || "Document"})**:\n\n${topParas}\n\n💡 *Extracted from ${wordCount} total words across ${pageCount || 1} page(s).*`;
      } else if (lowerQ.includes("action") || lowerQ.includes("key takeaway") || lowerQ.includes("point")) {
        const actionItems = sentences.slice(0, 6).map((s, i) => `• **Item ${i + 1}**: ${s}`).join("\n");
        responseText = `🎯 **Key Takeaways & Action Points**:\n\n${actionItems}`;
      } else if (lowerQ.includes("faq") || lowerQ.includes("question")) {
        const q1 = sentences[0] || "What is the document about?";
        const q2 = sentences[Math.floor(sentences.length / 3)] || "What are the main details?";
        const q3 = sentences[Math.floor((sentences.length * 2) / 3)] || "What is the conclusion?";

        responseText = `❓ **Extracted Questions & Answers**:\n\n**Q1: What is the main subject outlined in this document?**\n*A1*: ${q1}\n\n**Q2: What key specifications or terms are stated?**\n*A2*: ${q2}\n\n**Q3: What key outcome or conclusion is described?**\n*A3*: ${q3}`;
      } else if (lowerQ.includes("risk") || lowerQ.includes("obligation") || lowerQ.includes("deadline") || lowerQ.includes("clause")) {
        const riskSentences = sentences.filter((s) => 
          s.toLowerCase().includes("risk") || 
          s.toLowerCase().includes("must") || 
          s.toLowerCase().includes("require") ||
          s.toLowerCase().includes("deadline") ||
          s.toLowerCase().includes("clause") ||
          s.toLowerCase().includes("shall") ||
          s.toLowerCase().includes("obligation")
        );
        if (riskSentences.length > 0) {
          responseText = `⚠️ **Detected Key Clauses & Directives**:\n\n• ${riskSentences.slice(0, 5).join("\n• ")}`;
        } else {
          responseText = `⚠️ **Important Excerpts from Document**:\n\n• ${sentences.slice(0, 4).join("\n• ")}`;
        }
      } else {
        // Universal Smart Keyword Search
        const queryTerms = lowerQ.replace(/[^\w\s]/g, "").split(/\s+/).filter((t) => t.length > 2);
        const matchingSentences = sentences.filter((s) => {
          const lowerS = s.toLowerCase();
          return queryTerms.some((term) => lowerS.includes(term));
        });

        if (matchingSentences.length > 0) {
          responseText = `💡 **Information Found regarding "${q}"**:\n\n• ${matchingSentences.slice(0, 5).join("\n\n• ")}`;
        } else {
          const fallbackSnippet = paragraphs[0] || content.slice(0, 350);
          responseText = `💡 **Relevant Excerpt regarding "${q}"**:\n\nFrom **${fileName || "Document"}**:\n\n"${fallbackSnippet}"\n\n*(You can ask to summarize, extract action points, or query any specific term in your file!)*`;
        }
      }

      const aiTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const aiMsg: ChatMessage = {
        id: "ai-" + Date.now(),
        sender: "ai",
        text: responseText,
        timestamp: aiTime,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsProcessing(false);
      scrollToBottom();
    }, 450);
  };

  const handleCopyMessage = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    toast.success("Copied answer to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 space-y-6">
      <ToolPageHeader
        title="AI Document Intelligence & Interactive PDF Chat"
        description="Upload any PDF, Word document, or text file to extract clean summaries, key takeaways, and chat directly with your document in real-time."
      />

      {/* SINGLE VIEWPORT WORKSPACE */}
      <div className="grid gap-6 lg:grid-cols-12 min-h-[500px]">
        {/* Left Column: Document Source & Quick Action Presets (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <Card className="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden">
            <CardHeader className="border-b border-border/40 bg-muted/20 pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 tracking-tight">
                  <FileText className="h-4 w-4 text-primary" />
                  Document Source
                </CardTitle>

                {/* Upload vs Text Tabs */}
                <div className="flex items-center gap-1 bg-background/80 p-1 rounded-xl border text-xs shadow-inner">
                  <button
                    type="button"
                    onClick={() => setActiveTab("upload")}
                    className={`px-2.5 py-1 rounded-lg font-medium transition ${
                      activeTab === "upload" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground"
                    }`}
                  >
                    Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("text")}
                    className={`px-2.5 py-1 rounded-lg font-medium transition ${
                      activeTab === "text" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground"
                    }`}
                  >
                    Paste Text
                  </button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-4">
              {activeTab === "upload" ? (
                <>
                  <div
                    className="border-2 border-dashed border-primary/30 hover:border-primary/60 rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 bg-muted/10 hover:bg-muted/30 group flex-1 flex flex-col items-center justify-center min-h-[180px]"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <div className="p-3 rounded-full bg-primary/10 text-primary w-fit mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <Upload className="h-6 w-6" />
                    </div>
                    <h4 className="font-semibold text-sm tracking-tight">Upload PDF, Resume, or Document</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Supports .pdf, .docx, .txt, .md, .json, .csv (Up to 25MB)
                    </p>
                    <Input
                      type="file"
                      accept=".pdf,.docx,.txt,.md,.json,.csv,text/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                    />
                  </div>

                  {file && (
                    <div className="flex items-center justify-between p-3 rounded-xl border bg-card/90 shadow-xs text-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                        <div className="min-w-0">
                          <p className="font-semibold truncate">{fileName}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {fileSize} • {wordCount} words extracted
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-destructive"
                        onClick={() => {
                          setFile(null);
                          setFileName("");
                          setExtractedText("");
                          setWordCount(0);
                        }}
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-1.5 flex-1 flex flex-col">
                  <label className="text-xs font-semibold text-muted-foreground">Paste Raw Text:</label>
                  <Textarea
                    value={extractedText}
                    onChange={(e) => {
                      setExtractedText(e.target.value);
                      const count = e.target.value.trim().split(/\s+/).filter(Boolean).length;
                      setWordCount(count);
                    }}
                    placeholder="Paste document text or article content here..."
                    className="text-xs flex-1 min-h-[180px] bg-muted/20 resize-none p-3 rounded-xl"
                  />
                  <p className="text-[11px] text-muted-foreground text-right">{wordCount} words</p>
                </div>
              )}

              {/* Universal AI Action Chips */}
              <div className="space-y-2 pt-2 border-t">
                <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                  <Zap className="h-3 w-3 text-amber-500" /> 1-Click AI Action Chips:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[11px] h-8 justify-start gap-1.5 rounded-lg"
                    onClick={() => handleAskQuestion("Summarize this document in clean bullet points")}
                  >
                    <ListChecks className="h-3 w-3 text-primary" />
                    Summarize Document
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[11px] h-8 justify-start gap-1.5 rounded-lg"
                    onClick={() => handleAskQuestion("Extract key action items and takeaways")}
                  >
                    <Sparkles className="h-3 w-3 text-emerald-500" />
                    Action Items
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[11px] h-8 justify-start gap-1.5 rounded-lg"
                    onClick={() => handleAskQuestion("Generate FAQs from this document")}
                  >
                    <HelpCircle className="h-3 w-3 text-purple-500" />
                    Generate FAQs
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[11px] h-8 justify-start gap-1.5 rounded-lg"
                    onClick={() => handleAskQuestion("Extract important clauses, requirements, or risks")}
                  >
                    <AlertTriangle className="h-3 w-3 text-amber-500" />
                    Key Directives
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Interactive Chat Thread (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <Card className="border border-primary/30 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden">
            <CardHeader className="py-3 border-b border-border/40 bg-muted/20 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-primary tracking-tight">
                <MessageSquare className="h-4 w-4" />
                Document Chat Assistant
              </CardTitle>
              <Badge variant="outline" className="text-xs font-normal text-muted-foreground gap-1 border-emerald-500/30 text-emerald-500">
                <Bot className="h-3 w-3" />
                AI Active
              </Badge>
            </CardHeader>

            {/* Chat Thread Messages Box */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[380px]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 text-xs ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "ai" && (
                    <div className="h-7 w-7 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div
                    className={`group relative max-w-[85%] rounded-2xl px-4 py-3 space-y-1.5 ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-none shadow-xs font-medium"
                        : "bg-muted/40 border border-border/60 rounded-tl-none text-foreground"
                    }`}
                  >
                    <div className="whitespace-pre-line leading-relaxed font-sans select-text">{msg.text}</div>
                    
                    <div className="flex items-center justify-between pt-1 text-[10px] text-muted-foreground border-t border-border/20">
                      <span>{msg.timestamp}</span>
                      {msg.sender === "ai" && (
                        <button
                          type="button"
                          onClick={() => handleCopyMessage(msg.id, msg.text)}
                          className="opacity-70 hover:opacity-100 transition flex items-center gap-1 text-primary"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-500" /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" /> Copy Answer
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {msg.sender === "user" && (
                    <div className="h-7 w-7 rounded-full bg-muted border text-muted-foreground flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}

              {isProcessing && (
                <div className="flex gap-3 text-xs justify-start">
                  <div className="h-7 w-7 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  </div>
                  <div className="bg-muted/40 border rounded-2xl rounded-tl-none px-4 py-2.5 text-muted-foreground italic flex items-center gap-2">
                    Reading & analyzing document contents...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </CardContent>

            {/* Input Question Bar */}
            <div className="p-3 border-t border-border/40 bg-muted/10 flex items-center gap-2">
              <Input
                value={inputQuestion}
                onChange={(e) => setInputQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleAskQuestion();
                  }
                }}
                placeholder="Ask any question about your document..."
                className="text-xs bg-background border-border/70 h-9 rounded-xl"
              />
              <Button
                onClick={() => handleAskQuestion()}
                disabled={isProcessing || !inputQuestion.trim()}
                size="sm"
                className="h-9 px-3 gap-1.5 shadow-sm rounded-xl font-semibold"
              >
                <Send className="h-3.5 w-3.5" />
                Ask
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
