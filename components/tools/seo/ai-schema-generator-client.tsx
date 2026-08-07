"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { FileJson, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function AiSchemaGeneratorClient() {
  const [businessName, setBusinessName] = useState("Toolzium AI Solutions");
  const [schemaType, setSchemaType] = useState("SoftwareApplication");
  const [description, setDescription] = useState("Free online developer and productivity suite powered by serverless AI.");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateSchema = async () => {
    if (!businessName.trim()) return;

    setLoading(true);

    try {
      const prompt = `Generate a valid Schema.org JSON-LD snippet for a '${schemaType}' named '${businessName}'. Description: '${description}'. Output 3 valid, rich JSON-LD code blocks ready for insertion into script tags. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "cards" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
        toast.success("AI Schema.org JSON-LD generated!");
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
        icon={FileJson}
        title="AI Schema.org JSON-LD Structured Data Generator"
        description="Generate Google Rich Snippet JSON-LD structured data for Products, Local Businesses, Software, and FAQs with live AI."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Entity / Business Name:</label>
            <Input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. Apex Fitness Studio"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Schema.org Type:</label>
            <select
              value={schemaType}
              onChange={(e) => setSchemaType(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border bg-background text-sm font-medium"
            >
              <option value="SoftwareApplication">SoftwareApplication</option>
              <option value="Product">Product</option>
              <option value="LocalBusiness">LocalBusiness</option>
              <option value="Article">Article</option>
              <option value="FAQPage">FAQPage</option>
              <option value="Organization">Organization</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Entity Description:</label>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief explanation of the business or product..."
            className="h-11"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={generateSchema}
            disabled={loading || !businessName}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Generating Schema..." : "AI Generate JSON-LD Schema"}
          </Button>
        </div>
      </GlassCard>

      {/* Output */}
      {results.length > 0 && (
        <AiOutputDisplay
          title="Generated JSON-LD Rich Snippet Schemas"
          subtitle="Copy and paste into your website's <head> script tag"
          content={results}
          loading={loading}
          onRegenerate={generateSchema}
          variant="cards"
        />
      )}
    </div>
  );
}
