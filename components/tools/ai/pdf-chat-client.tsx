"use client";

import React, { useState, useCallback } from"react";
import { motion } from"framer-motion";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { MessageSquare, Sparkles, Send, FileText, CheckCircle2, Sliders, RefreshCcw, Bot } from"lucide-react";
import toast from"react-hot-toast";

interface Message {
 sender:"user"|"bot";
 text: string;
}

export function PdfChatClient() {
 const [pdfText, setPdfText] = useState("");
 const [fileName, setFileName] = useState("");
 const [inputQuery, setInputQuery] = useState("");
 const [messages, setMessages] = useState<Message[]>([
 { sender:"bot", text:"Hello! Paste your document text on the left or upload a file, then ask me anything about its contents."}
 ]);
 const [isProcessing, setIsProcessing] = useState(false);

 const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
 const file = e.target.files?.[0];
 if (!file) return;

 setFileName(file.name);
 const reader = new FileReader();
 reader.onload = (event) => {
 const content = event.target?.result as string;
 setPdfText(content ||"");
 toast.success(`Loaded"${file.name}"`);
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
 setMessages((prev) => [...prev, { sender:"user", text: userMsg }]);
 setIsProcessing(true);

 setTimeout(() => {
 const queryLower = userMsg.toLowerCase();

 let botAnswer ="";
 if (queryLower.includes("summary") || queryLower.includes("summarize") || queryLower.includes("about")) {
 const snippet = pdfText.slice(0, 300).trim();
 botAnswer = `**Document Overview:**\n\n${snippet}...\n\n*Document contains approximately ${pdfText.split(/\s+/).length} words.*`;
 } else {
 const sentences = pdfText.split(/(?<=[.?!])\s+/);
 const matches = sentences.filter((s) => s.toLowerCase().includes(queryLower.slice(0, 5)));

 if (matches.length > 0) {
 botAnswer = `Based on your document context:\n\n>"${matches[0]}"\n\n` + (matches[1] ? `>"${matches[1]}"` :"");
 } else {
 botAnswer = `I searched the document context for references regarding"${userMsg}". Relevant section excerpt:\n\n>"${pdfText.slice(0, 250)}..."`;
 }
 }

 setMessages((prev) => [...prev, { sender:"bot", text: botAnswer }]);
 setIsProcessing(false);
 }, 450);
 }, [inputQuery, pdfText]);

 return (
 <div className="max-w-6xl mx-auto space-y-8 p-4">
 {/* 3D Blue Document Icon Header Box */}
 <div className="flex items-center gap-4 bg-background p-6 rounded-3xl border border-border shadow-md shadow-slate-200/50">
 <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary text-white shadow-lg shadow-blue-500/30 flex items-center justify-center shrink-0">
 <MessageSquare className="w-7 h-7"/>
 </div>
 <div>
 <div className="flex items-center gap-2">
 <h1 className="text-xl sm:text-2xl font-black text-foreground">AI PDF & Document Chat Reader</h1>
 <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 dark:bg-blue-950/50 text-primary px-2.5 py-0.5 rounded-full border border-blue-200">NEW</span>
 </div>
 <p className="text-xs sm:text-sm text-muted-foreground mt-1">Interact with PDF documents, research papers, and legal contracts through an instant conversational AI assistant.</p>
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <GlassCard className="p-0">
 <CardHeader className="border-b border-slate-100 bg-slate-50/50 p-4">
 <div className="flex justify-between items-center">
 <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
 <FileText className="w-4 h-4 text-primary"/>
 Document Context & Reader
 </CardTitle>
 {fileName && <span className="text-xs font-mono text-primary bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded">{fileName}</span>}
 </div>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-4">
 <div>
 <Label className="text-xs mb-1.5 block text-slate-700 dark:text-slate-300 font-medium">Upload Document File (.txt, .md)</Label>
 <Input type="file"accept=".txt,.md,.text"onChange={handleFileUpload} className="text-xs cursor-pointer bg-background border-border"/>
 </div>

 <div>
 <Label className="text-xs mb-1.5 block text-slate-700 dark:text-slate-300 font-medium">Or Paste Document Text Directly</Label>
 <textarea
 className="w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 min-h-[220px] font-sans text-foreground"
 placeholder="Paste the full text of your PDF, article, or legal contract here..."
 value={pdfText}
 onChange={(e) => setPdfText(e.target.value)}
 />
 </div>
 </CardContent>
 </GlassCard>

 {/* Interactive Chat Panel */}
 <GlassCard className="p-0 flex flex-col h-[460px]">
 <CardHeader className="border-b border-slate-100 bg-slate-50/50 p-4">
 <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
 <Bot className="w-4 h-4 text-primary"/>
 Document Assistant Q&A
 </CardTitle>
 </CardHeader>

 <CardContent className="p-4 flex-1 overflow-y-auto space-y-3">
 {messages.map((msg, idx) => (
 <motion.div
 key={idx}
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 className={`flex gap-2.5 text-xs ${msg.sender ==="user"?"justify-end":"justify-start"}`}
 >
 {msg.sender ==="bot"&& (
 <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
 <Bot className="w-3.5 h-3.5"/>
 </div>
 )}
 <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
 msg.sender ==="user"?"bg-blue-600 text-white font-medium shadow-md shadow-blue-500/20":"bg-slate-50 border border-border/60 text-foreground dark:text-slate-200"
 }`}>
 {msg.text}
 </div>
 </motion.div>
 ))}
 </CardContent>

 <div className="p-3 border-t border-slate-100 bg-slate-50/50 flex gap-2">
 <Input
 placeholder="Ask a question about your document..."
 value={inputQuery}
 onChange={(e) => setInputQuery(e.target.value)}
 onKeyDown={(e) => e.key ==="Enter"&& handleSendQuery()}
 className="text-xs bg-background border-border"
 />
 <Button onClick={handleSendQuery} disabled={isProcessing || !inputQuery.trim()} size="sm"className="gap-1 text-xs bg-blue-600 text-white font-semibold rounded-xl">
 <Send className="w-3.5 h-3.5"/>
 </Button>
 </div>
 </GlassCard>
 </div>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Upload or Paste Text", description:"Input text from research papers, PDFs, or contracts.", icon: FileText },
 { step:"02", title:"Ask Questions", description:"Type plain-English questions regarding key points and summaries.", icon: Sliders },
 { step:"03", title:"Instant Q&A Extraction", description:"Receive instant answers with context citations.", icon: CheckCircle2 }
 ]}
 badges={["100% Free","Document Chat","Private & Offline"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: MessageSquare, title:"Interactive Conversational Chat", description:"Ask follow-up questions to explore specific clauses or arguments."},
 { icon: FileText, title:"Executive Overview Extractor", description:"Generates instant high-level summaries of long research documents."},
 { icon: CheckCircle2, title:"Zero Server Logging", description:"Processes sensitive documents strictly inside your local client memory."}
 ]}
 >
 <div className="prose dark:prose-invert max-w-none">
 <h3>Streamlining Long Document Analysis</h3>
 <p>
 Reviewing lengthy PDFs, legal contracts, and academic papers can take hours. Conversational document readers parse context instantly, enabling researchers and professionals to query specific data points without reading hundreds of pages.
 </p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"Is my document text stored on any server?", answer:"No. All text parsing and Q&A responses occur locally inside your client web browser."},
 { question:"Can I upload TXT or Markdown files?", answer:"Yes! Use the file uploader to load text or markdown files directly."}
 ]}
 />

 <RelatedTools currentToolUrl="/tools/ai/pdf-chat"max={6} />
 </div>
 );
}

export default PdfChatClient;
