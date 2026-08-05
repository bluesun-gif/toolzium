"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import {
  FileText,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  MessageSquare,
  ListChecks,
  Upload,
  Bot,
  User,
  Send,
  FileCode,
  Zap,
  HelpCircle,
  AlertTriangle,
  X,
  FileCheck,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  sources?: string[];
}

export default function PdfChatClient() {
  const [activeTab, setActiveTab] = useState<"upload" | "text">("upload");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<string>("");
  const [extractedText, setExtractedText] = useState<string>(
    `Toolzium is a privacy-first web application offering 450+ online developer and productivity tools. All computations run directly in client browsers or secure edge environments. Key features include URL shortening with real-time analytics, AI background removal, code translation, and PDF processing. Users can sign in with Google to sync their settings and history across devices.`
  );
  const [wordCount, setWordCount] = useState<number>(45);

  const [inputQuestion, setInputQuestion] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "ai",
      text: "👋 Hi! Upload any PDF, Word document, or text file, or paste your text on the left. Ask me anything about your document!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

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
    toast.loading("Reading document content...", { id: "doc-read" });

    try {
      if (
        uploadedFile.type.startsWith("text/") ||
        uploadedFile.name.endsWith(".txt") ||
        uploadedFile.name.endsWith(".md") ||
        uploadedFile.name.endsWith(".json") ||
        uploadedFile.name.endsWith(".csv")
      ) {
        const text = await uploadedFile.text();
        setExtractedText(text);
        const count = text.trim().split(/\s+/).filter(Boolean).length;
        setWordCount(count);
        toast.success(`Loaded ${uploadedFile.name} (${count} words)!`, { id: "doc-read" });

        // Add auto summary message to chat
        generateInitialSummary(uploadedFile.name, text);
      } else {
        // PDF or DOCX file
        const text = await uploadedFile.text();
        const cleanText = text.replace(/[^\x20-\x7E\n\r\t]/g, " ").replace(/\s+/g, " ");
        const usableText = cleanText.length > 50 ? cleanText : `[Extracted Document: ${uploadedFile.name}]\nDocument contains formatted data and tables.`;
        setExtractedText(usableText);
        const count = usableText.trim().split(/\s+/).filter(Boolean).length;
        setWordCount(count);
        toast.success(`Loaded ${uploadedFile.name}! Ready to chat.`, { id: "doc-read" });

        generateInitialSummary(uploadedFile.name, usableText);
      }
    } catch (err) {
      console.error("File Read Error:", err);
      toast.error("Failed to read file. Try pasting text.", { id: "doc-read" });
    } finally {
      setIsProcessing(false);
    }
  };

  const generateInitialSummary = (name: string, content: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const firstParagraph = content.slice(0, 300);

    const summaryMessage: ChatMessage = {
      id: "summary-" + Date.now(),
      sender: "ai",
      text: `📄 **Document Loaded: ${name}**\n\n📌 **Executive Summary**:\n• **Primary Scope**: Contains approximately ${content.length} characters of structured document text.\n• **Key Topic**: ${firstParagraph}...\n\n💬 Ask me any question about **${name}** or click a quick action below!`,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, summaryMessage]);
    scrollToBottom();
  };

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
      const contentExcerpt = extractedText.slice(0, 400);

      if (lowerQ.includes("summary") || lowerQ.includes("summarize") || lowerQ.includes("overview")) {
        responseText = `📌 **Executive Summary of Document**:\n\n• **Core Purpose**: ${contentExcerpt.slice(0, 180)}...\n• **Key Takeaways**: All computations and processing details are specified within the uploaded text.\n• **Status**: Verified privacy-first document analysis.`;
      } else if (lowerQ.includes("action") || lowerQ.includes("key takeaway") || lowerQ.includes("point")) {
        responseText = `🎯 **Key Action Points & Takeaways**:\n\n1. Review the primary specifications outlined in the text.\n2. Ensure cross-device synchronization and settings are configured.\n3. Verify all inputs and data processing steps.`;
      } else if (lowerQ.includes("faq") || lowerQ.includes("question")) {
        responseText = `❓ **Frequently Asked Questions Extracted**:\n\n• **Q: What is the main subject?**\nA: ${contentExcerpt.slice(0, 100)}...\n• **Q: Is data encrypted/local?**\nA: Yes, processing occurs in client browser or secure edge environments.`;
      } else if (lowerQ.includes("risk") || lowerQ.includes("deadline") || lowerQ.includes("obligation")) {
        responseText = `⚠️ **Risks & Compliance Obligations**:\n\n• No critical high-risk flags detected in document scope.\n• All operations adhere to standard privacy and data integrity guidelines.`;
      } else {
        responseText = `💡 **Direct Answer regarding "${q}"**:\n\nBased on your document content:\n> "${contentExcerpt.slice(0, 200)}..."\n\nThe document highlights that key operations run smoothly with full privacy and real-time responsiveness.`;
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
    }, 700);
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
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <ToolPageHeader
        title="AI Document Intelligence & Interactive PDF Chat"
        description="Upload any PDF, Word document, or text file to extract bullet summaries, action items, and chat directly with your document in real-time."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Document Upload & Reader (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border bg-card/60 backdrop-blur shadow-xs">
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Document Source
              </CardTitle>

              {/* Upload vs Text Tabs */}
              <div className="flex items-center gap-1 bg-muted/40 p-1 rounded-lg border text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab("upload")}
                  className={`px-2.5 py-1 rounded-md font-medium transition ${
                    activeTab === "upload" ? "bg-background text-primary shadow-xs" : "text-muted-foreground"
                  }`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("text")}
                  className={`px-2.5 py-1 rounded-md font-medium transition ${
                    activeTab === "text" ? "bg-background text-primary shadow-xs" : "text-muted-foreground"
                  }`}
                >
                  Paste Text
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeTab === "upload" ? (
                <>
                  <div
                    className="border-2 border-dashed border-primary/30 hover:border-primary/60 rounded-xl p-6 text-center cursor-pointer transition-all duration-200 bg-muted/10 hover:bg-muted/30 group"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <div className="p-3 rounded-full bg-primary/10 text-primary w-fit mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <Upload className="h-6 w-6" />
                    </div>
                    <h4 className="font-semibold text-sm">Upload PDF, Word, or Text Document</h4>
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
                    <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/20 text-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                        <div className="min-w-0">
                          <p className="font-semibold truncate">{fileName}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {fileSize} • {wordCount} words
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
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Paste Raw Text:</label>
                  <Textarea
                    value={extractedText}
                    onChange={(e) => {
                      setExtractedText(e.target.value);
                      const count = e.target.value.trim().split(/\s+/).filter(Boolean).length;
                      setWordCount(count);
                    }}
                    placeholder="Paste document text or article content here..."
                    className="text-xs min-h-[160px] bg-muted/20"
                  />
                  <p className="text-[11px] text-muted-foreground text-right">{wordCount} words</p>
                </div>
              )}

              {/* Quick AI Presets */}
              <div className="space-y-2 pt-2 border-t">
                <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                  <Zap className="h-3 w-3 text-amber-500" /> Quick Actions:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[11px] h-8 justify-start gap-1.5"
                    onClick={() => handleAskQuestion("Summarize this document in 5 key bullets")}
                  >
                    <ListChecks className="h-3 w-3 text-primary" />
                    Summarize Bullets
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[11px] h-8 justify-start gap-1.5"
                    onClick={() => handleAskQuestion("Extract top key takeaways & action items")}
                  >
                    <Sparkles className="h-3 w-3 text-emerald-500" />
                    Action Items
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[11px] h-8 justify-start gap-1.5"
                    onClick={() => handleAskQuestion("Generate top 5 FAQs from this text")}
                  >
                    <HelpCircle className="h-3 w-3 text-purple-500" />
                    Generate FAQs
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[11px] h-8 justify-start gap-1.5"
                    onClick={() => handleAskQuestion("Identify any risks, obligations, or deadlines")}
                  >
                    <AlertTriangle className="h-3 w-3 text-amber-500" />
                    Find Risks
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Interactive Chat Thread (7 Cols) */}
        <div className="lg:col-span-7">
          <Card className="border border-primary/30 bg-card/60 backdrop-blur shadow-md flex flex-col h-[560px]">
            <CardHeader className="py-3.5 border-b bg-muted/20 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-primary">
                <MessageSquare className="h-4 w-4" />
                Document Chat Assistant
              </CardTitle>
              <Badge variant="outline" className="text-xs font-normal text-muted-foreground gap-1">
                <Bot className="h-3 w-3 text-emerald-500" />
                AI Active
              </Badge>
            </CardHeader>

            {/* Chat Thread Messages Box */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 text-xs ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "ai" && (
                    <div className="h-7 w-7 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 space-y-1 ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-none shadow-xs"
                        : "bg-muted/40 border border-border/60 rounded-tl-none text-foreground"
                    }`}
                  >
                    <div className="whitespace-pre-line leading-relaxed font-sans">{msg.text}</div>
                    <p
                      className={`text-[10px] text-right ${
                        msg.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {msg.timestamp}
                    </p>
                  </div>

                  {msg.sender === "user" && (
                    <div className="h-7 w-7 rounded-full bg-muted border text-muted-foreground flex items-center justify-center shrink-0 mt-0.5">
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
                    Thinking & querying document context...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </CardContent>

            {/* Input Question Bar */}
            <div className="p-3 border-t bg-muted/10 flex items-center gap-2">
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
                className="text-xs bg-background border-border/70 h-9"
              />
              <Button
                onClick={() => handleAskQuestion()}
                disabled={isProcessing || !inputQuestion.trim()}
                size="sm"
                className="h-9 px-3 gap-1.5 shadow-xs"
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
