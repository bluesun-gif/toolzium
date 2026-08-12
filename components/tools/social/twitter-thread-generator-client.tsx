"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { MessageSquare, RefreshCw } from"lucide-react";
import toast from"react-hot-toast";

export default function TwitterThreadGeneratorClient() {
 const [topic, setTopic] = useState("10 Lessons I Learned Scaling a Next.js App to 1 Million Users");
 const [targetAudience, setTargetAudience] = useState("Developers & Tech Founders");
 const [threadLength, setThreadLength] = useState("5 Tweets");
 const [results, setResults] = useState<string[]>([]);
 const [loading, setLoading] = useState(false);

 const generateThread = async () => {
 if (!topic.trim()) return;

 setLoading(true);

 try {
 const prompt = `Write a viral X / Twitter thread about: '${topic}'. Target Audience: '${targetAudience}'. Length: ${threadLength}. Make Tweet 1 a magnetic hook that drives retweets. Subsequent tweets should deliver actionable insights, bullet points, and concise key takeaways. End with a high-converting CTA tweet. Format as ${threadLength.split("")[0]} distinct tweet cards. No markdown asterisks.`;

 const res = await fetch("/api/ai/generate", {
 method:"POST",
 headers: {"Content-Type":"application/json"},
 body: JSON.stringify({ prompt, type:"cards"}),
 });

 if (!res.ok) throw new Error("AI API failed");

 const data = await res.json();
 if (data.results && data.results.length > 0) {
 setResults(data.results);
 toast.success("AI X Thread generated!");
 } else {
 throw new Error("No results");
 }
 } catch (err) {
 toast.error("AI generation failed. Please try again.");
 } finally {
 setLoading(false);
 }
 };

 return (
 <div className="space-y-6 max-w-4xl mx-auto px-4">
 <ToolPageHeader
 icon={MessageSquare}
 title="AI X / Twitter Viral Thread Generator"
 description="Generate high-converting 1st-tweet opening hooks, actionable storytelling tweets, and viral CTA tweets powered by live AI."
 />

 <GlassCard className="p-6 space-y-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Thread Topic / Core Lesson:</label>
 <Input
 type="text"
 value={topic}
 onChange={(e) => setTopic(e.target.value)}
 placeholder="e.g. How I built a full-stack SaaS in 48 hours"
 className="h-11 font-medium"
 />
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Target Audience:</label>
 <Input
 type="text"
 value={targetAudience}
 onChange={(e) => setTargetAudience(e.target.value)}
 className="h-11"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Number of Tweets:</label>
 <select
 value={threadLength}
 onChange={(e) => setThreadLength(e.target.value)}
 className="w-full h-11 px-3 rounded-xl border bg-background text-sm font-medium"
 >
 <option value="5 Tweets">5 Tweets (Compact Punchy Thread)</option>
 <option value="7 Tweets">7 Tweets (Standard Storytelling Thread)</option>
 <option value="10 Tweets">10 Tweets (Deep-Dive Masterclass Thread)</option>
 </select>
 </div>
 </div>

 <div className="flex justify-end pt-2">
 <Button
 onClick={generateThread}
 disabled={loading || !topic.trim()}
 className="gap-2 font-bold h-11 px-6 shadow-md"
 >
 <RefreshCw className={`h-4 w-4 ${loading ?"animate-spin":""}`} />
 {loading ?"AI Writing Thread...":"AI Generate Viral X Thread"}
 </Button>
 </div>
 </GlassCard>

 {/* Output */}
 {results.length > 0 && (
 <AiOutputDisplay
 title="Generated Viral X / Twitter Thread"
 subtitle="Ready to copy & paste straight to X / Twitter"
 content={results}
 loading={loading}
 onRegenerate={generateThread}
 variant="cards"
 />
 )}
 </div>
 );
}
