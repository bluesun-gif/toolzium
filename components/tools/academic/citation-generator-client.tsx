"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import SelectField from "@/components/shared/form-fields/select-field";
import { CopyButton } from "@/components/shared/action-buttons";
import { BookOpen } from "lucide-react";
import toast from "react-hot-toast";

const FORMATS = [
  { value: "apa", label: "📄 APA 7th Edition" },
  { value: "mla", label: "📚 MLA 9th Edition" },
  { value: "chicago", label: "📜 Chicago Manual of Style" },
];

export default function CitationGeneratorClient() {
  const [format, setFormat] = useState("apa");
  const [author, setAuthor] = useState("Smith, John A.");
  const [title, setTitle] = useState("Artificial Intelligence and Modern Society");
  const [publisher, setPublisher] = useState("Academic Press");
  const [year, setYear] = useState("2026");
  const [url, setUrl] = useState("https://doi.org/10.1000/182");

  const generateCitation = () => {
    if (format === "apa") {
      return `${author} (${year}). ${title}. ${publisher}. ${url}`;
    } else if (format === "mla") {
      return `${author}. "${title}." ${publisher}, ${year}, ${url}.`;
    } else {
      return `${author}. ${title}. ${publisher}, ${year}. ${url}.`;
    }
  };

  const citation = generateCitation();

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={BookOpen}
        title="APA / MLA / Chicago Citation & Bibliography Generator"
        description="Generate formatted APA 7th, MLA 9th, and Chicago style citations and bibliography entries for academic papers."
      />

      <GlassCard className="p-6 space-y-4">
        <SelectField
          label="Select Citation Format Style"
          value={format}
          onValueChange={(v) => setFormat(String(v || "apa"))}
          options={FORMATS}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Author Name(s):</label>
            <Input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. Smith, J. & Doe, A."
              className="h-10 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Article / Book Title:</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The Future of AI"
              className="h-10 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Publisher / Journal:</label>
            <Input
              type="text"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              placeholder="e.g. Oxford University Press"
              className="h-10 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Publication Year:</label>
            <Input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="e.g. 2026"
              className="h-10 text-sm"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-xs font-semibold text-foreground">DOI or Web URL:</label>
            <Input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g. https://doi.org/10.1000/182"
              className="h-10 text-sm"
            />
          </div>
        </div>
      </GlassCard>

      {/* Output Card */}
      <GlassCard className="p-6 space-y-4 border-primary/30 bg-primary/5">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-base font-bold text-foreground">Formatted {format.toUpperCase()} Citation</h2>
          <CopyButton getText={() => citation} label="Copy Citation" />
        </div>

        <p className="font-mono text-sm p-4 bg-background border rounded-xl leading-relaxed text-foreground select-all">
          {citation}
        </p>
      </GlassCard>
    </div>
  );
}
