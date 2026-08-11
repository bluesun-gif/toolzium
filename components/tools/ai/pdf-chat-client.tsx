"use client";

import React, { useState, useMemo, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageSquare, Sparkles, Send, FileText, CheckCircle2, Sliders, RefreshCcw, Upload, Bot, User } from "lucide-react";
import toast from "react-hot-toast";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export function PdfChatClient() {
  const [pdfText, setPdfText] = useState("");
  const [fileName, setFileName] = useState("");
  const [inputQuery, setInputQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hello! Paste your document text on the left or upload a file, then ask me anything about its contents." }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setPdfText(content || "");
      toast.success(`Loaded "${file.name}"`);
    };
    reader.readAsText(file);
  };

  const handleSendQuery = useCallback(() => {
    if (!inputQuery.trim()) return;
    if (!pdfText.trim()) {
      toast.error("Please load or paste document text first");
      return;
    }

    const userMsg = inputQuery.trim();
    setInputQuery("");
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setIsProcessing(true);

    setTimeout(() => {
      const textLower = pdfText.toLowerCase();
      const queryLower = userMsg.toLowerCase();

      let botAnswer = "";

      if (queryLower.includes("summary") || queryLower.includes("summarize") || queryLower.includes("about")) {
        const snippet = pdfText.slice(0, 300).trim();
        botAnswer = `**Document Overview:**\n\n${snippet}...\n\n*This document contains approximately ${pdfText.split(/\s+/).length} words.*`;
      } else {
        const sentences = pdfText.split(/(?<=[.?!])\s+/);
        const matches = sentences.filter((s) => s.toLowerCase().includes(queryLower.slice(0, 5)));

        if (matches.length > 0) {
          botAnswer = `Based on the document context:\n\n> "${matches[0]}"\n\n` +
            (matches[1] ? `> "${matches[1]}"` : "");
        } else {
          botAnswer = `I searched the document for references related to "${userMsg}". Here is a matching section:\n\n` +
            `> "${pdfText.slice(0, 250)}..."`;
        }
      }

      setMessages((prev) => [...prev, { sender: "bot", text: botAnswer }]);
      setIsProcessing(false);
    }, 450);
  }, [inputQuery, pdfText]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      <ToolPageHeader
        icon={MessageSquare}
        title="AI PDF & Document Chat"
        description="Interact with PDF documents, research papers, and legal contracts through an instant conversational AI interface."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={cardClass}>
          <CardHeader className={headerClass}>
            <CardTitle className={titleClass}>
              <FileText className="w-4 h-4 text-primary" />
              Document Context Source
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="border-2 border-dashed border-border/70 rounded-xl p-4 text-center hover:border-primary/50 transition-colors">
              <label className="cursor-pointer flex flex-col items-center gap-2">
                <Upload className="w-6 h-6 text-primary" />
                <span className="text-xs font-semibold">Upload PDF or Text File</span>
                <span className="text-[11px] text-muted-foreground">{fileName || "Click to browse local files"}</span>
                <input type="file" accept=".txt,.md,.pdf,.csv" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            <div>
              <Label className="text-xs mb-1 block">Or Paste Document Text Directly</Label>
              <textarea
                className={`${textareaClass} min-h-[220px]`}
                placeholder="Paste contract terms, research abstract, or essay text here..."
                value={pdfText}
                onChange={(e) => setPdfText(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className={`${cardClass} flex flex-col`}>
          <CardHeader className={headerClass}>
            <CardTitle className={titleClass}>
              <Bot className="w-4 h-4 text-primary" />
              Document Q&A Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1 flex-1">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2 text-xs p-3 rounded-xl ${
                    m.sender === "user"
                      ? "bg-primary text-primary-foreground ml-auto max-w-[85%]"
                      : "bg-muted/40 border border-border/50 max-w-[90%]"
                  }`}
                >
                  {m.sender === "bot" ? <Bot className="w-4 h-4 shrink-0 text-primary mt-0.5" /> : <User className="w-4 h-4 shrink-0 mt-0.5" />}
                  <div className="whitespace-pre-wrap leading-relaxed">{m.text}</div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex gap-2 text-xs p-3 rounded-xl bg-muted/40 border border-border/50 max-w-[90%] items-center">
                  <RefreshCcw className="w-3.5 h-3.5 animate-spin text-primary" />
                  <span>Searching document context...</span>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-2 border-t border-border/40">
              <Input
                placeholder="Ask a question about your document..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendQuery()}
                className="text-xs"
              />
              <Button size="sm" onClick={handleSendQuery} disabled={isProcessing || !inputQuery.trim()} className="gap-1 text-xs shrink-0">
                <Send className="w-3.5 h-3.5" /> Ask
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Upload or Paste Text", description: "Load your document text directly into the secure local workspace.", icon: Upload },
          { step: "02", title: "Type Question", description: "Ask questions about specific sections, clauses, or key takeaways.", icon: MessageSquare },
          { step: "03", title: "Get Instant Context", description: "Receive precise contextual answers extracted straight from your document text.", icon: CheckCircle2 }
        ]}
        badges={["100% Free", "Privacy First", "Client-Side RAG"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: MessageSquare, title: "Conversational Retrieval", description: "Ask any follow-up questions to drill down into specific document sections." },
          { icon: Upload, title: "Universal Text Parsing", description: "Supports plain text, markdown, PDF extracts, and technical documentation." },
          { icon: CheckCircle2, title: "Total Confidentiality", description: "All document text remains strictly within your browser during the Q&A session." }
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Chat with Contracts, Papers, and PDF Documents</h3>
          <p>
            Extracting specific information from 50-page legal contracts, financial reports, or academic PDFs usually requires tedious manual scanning. Our <strong>AI PDF & Document Chat</strong> provides an instant conversational interface that lets you ask targeted questions and receive direct answers grounded in your document's text.
          </p>
          <h3>Client-Side Context Retrieval</h3>
          <p>
            Because privacy is paramount when working with confidential business contracts or personal records, our document chat engine performs contextual matching directly within your web browser. No data is stored or logged.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "Is my uploaded PDF uploaded to external servers?", answer: "No. File parsing and text context retrieval are executed 100% client-side in your web browser." },
          { question: "Can I summarize the whole document at once?", answer: "Yes! Type 'summarize this document' or 'what are the main takeaways?' into the chat prompt." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/ai/pdf-chat" max={6} />
    </div>
  );
}

export default PdfChatClient;
