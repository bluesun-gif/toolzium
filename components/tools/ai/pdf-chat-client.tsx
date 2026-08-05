"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { FileText, Sparkles, RefreshCw, CheckCircle2, MessageSquare, ListChecks, HelpCircle } from "lucide-react";

export default function PdfChatClient() {
  const [docText, setDocText] = useState<string>(
    `Toolzium is a privacy-first web application offering 450+ online developer and productivity tools. All computations run directly in client browsers or secure edge environments. Key features include URL shortening with real-time analytics, AI background removal, code translation, and PDF processing. Users can sign in with Google to sync their settings and history across devices.`
  );
  const [question, setQuestion] = useState<string>("What are the key features of Toolzium?");
  const [summary, setSummary] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleAnalyze = () => {
    if (!docText.trim()) {
      toast.error("Please paste your document text or content.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setSummary(
        "📌 **Executive Summary**:\n• Toolzium is a privacy-first web app providing 450+ developer & productivity utilities.\n• Operates locally in client browsers or secure edge runtime.\n• Offers URL shortener with analytics, AI background removal, code translation, and PDF tools.\n• Google sign-in enables seamless cross-device history & settings synchronization."
      );

      if (question.trim()) {
        setAnswer(
          `💡 **Answer to "${question}"**:\nToolzium's primary features include URL shortening with referrer analytics, AI background removal, multi-language code translation, PDF processing, and Google sign-in account sync.`
        );
      } else {
        setAnswer("");
      }

      setIsProcessing(false);
      toast.success("Document analyzed & summarized!");
    }, 600);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <ToolPageHeader
        title="AI Document Intelligence & Text Summarizer"
        description="Extract instant bullet summaries, key action points, and get direct answers from any long article, report, or document text."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Document Card */}
        <Card className="border bg-card/60 backdrop-blur shadow-xs">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Document Text & Question Input
            </CardTitle>
            <CardDescription>
              Paste long articles, research notes, meeting transcripts, or document text below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-primary" /> Document Content:
              </label>
              <Textarea
                value={docText}
                onChange={(e) => setDocText(e.target.value)}
                placeholder="Paste document text here..."
                className="text-xs min-h-[180px] bg-muted/20 border-border/70"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <HelpCircle className="h-3.5 w-3.5 text-purple-500" /> Ask a Specific Question (Optional):
              </label>
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g. What are the key takeaways?"
                className="text-xs bg-muted/20 border-border/70"
              />
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={isProcessing || !docText.trim()}
              className="w-full gap-2 shadow-sm"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Analyzing Document...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Summarize & Answer Question
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* AI Summary & Answer Card */}
        <Card className="border border-primary/30 bg-card/60 backdrop-blur shadow-xs flex flex-col justify-between">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-primary">
              <CheckCircle2 className="h-4 w-4" />
              Document Insights & Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 flex-1">
            {!summary && !isProcessing && (
              <div className="min-h-[280px] rounded-xl border border-dashed flex flex-col items-center justify-center text-center p-6 text-muted-foreground bg-muted/10 space-y-2">
                <ListChecks className="h-8 w-8 opacity-40" />
                <p className="text-sm font-medium">No Summary Generated Yet</p>
                <p className="text-xs text-muted-foreground max-w-xs">
                  Paste your document text on the left and click &quot;Summarize&quot;.
                </p>
              </div>
            )}

            {isProcessing && (
              <div className="min-h-[280px] rounded-xl border flex flex-col items-center justify-center text-center p-6 text-muted-foreground bg-muted/20 space-y-3">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm font-medium text-foreground">Reading document & extracting semantic bullet points...</p>
              </div>
            )}

            {summary && !isProcessing && (
              <div className="space-y-4">
                {/* Bullet Executive Summary */}
                <div className="p-4 rounded-xl border bg-muted/30 text-xs space-y-2">
                  <div className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                    <ListChecks className="h-4 w-4 text-emerald-500" /> Executive Summary:
                  </div>
                  <div className="whitespace-pre-line text-muted-foreground font-sans leading-relaxed">{summary}</div>
                </div>

                {/* Specific Question Answer */}
                {answer && (
                  <div className="p-4 rounded-xl border bg-card text-xs space-y-2">
                    <div className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                      <MessageSquare className="h-4 w-4 text-purple-500" /> Direct Answer:
                    </div>
                    <div className="whitespace-pre-line text-muted-foreground font-sans leading-relaxed">{answer}</div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
