"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Book,
  FileText,
  Globe,
  Plus,
  Trash2,
  Download,
  Copy,
  Check,
  Library,
  Sparkles,
  Search,
  Layers,
  GraduationCap,
  Quote,
  Flame,
  CheckCircle2
} from "lucide-react";
import toast from "react-hot-toast";
import { ToolBackground } from "@/components/shared/tool-background";

type SourceType = "book" | "journal" | "website" | "conference";
type CitationFormat = "apa" | "mla" | "chicago" | "harvard" | "ieee" | "bibtex";

interface Author {
  first: string;
  last: string;
}

interface SourceData {
  type: SourceType;
  authors: Author[];
  title: string;
  year: string;
  publisher?: string;
  url?: string;
  accessDate?: string;
  journal?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  inTextCitation?: string;
  citations?: Record<string, string>;
}

const PRESET_SOURCES = [
  {
    name: "🧠 Attention Is All You Need (Transformers)",
    query: "Attention Is All You Need by Ashish Vaswani, Noam Shazeer, Niki Parmar (NeurIPS 2017)",
    type: "conference" as SourceType
  },
  {
    name: "🧬 DNA Double Helix Structure",
    query: "Molecular Structure of Nucleic Acids by J. D. Watson and F. H. C. Crick (Nature 1953)",
    type: "journal" as SourceType
  },
  {
    name: "🌍 Sapiens: A Brief History of Humankind",
    query: "Sapiens: A Brief History of Humankind by Yuval Noah Harari (Harper 2015)",
    type: "book" as SourceType
  },
  {
    name: "💻 Deep Residual Learning (ResNet)",
    query: "Deep Residual Learning for Image Recognition by Kaiming He, Xiangyu Zhang (CVPR 2016)",
    type: "conference" as SourceType
  }
];

const INITIAL_SOURCE: SourceData = {
  type: "journal",
  authors: [{ first: "Ashish", last: "Vaswani" }, { first: "Noam", last: "Shazeer" }],
  title: "Attention Is All You Need",
  year: "2017",
  journal: "Advances in Neural Information Processing Systems",
  volume: "30",
  pages: "5998-6008",
  doi: "10.48550/arXiv.1706.03762",
  inTextCitation: "(Vaswani et al., 2017)",
  citations: {
    apa: "Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I. (2017). Attention is all you need. Advances in Neural Information Processing Systems, 30, 5998–6008.",
    mla: "Vaswani, Ashish, et al. \"Attention Is All You Need.\" Advances in Neural Information Processing Systems, vol. 30, 2017, pp. 5998-6008.",
    chicago: "Vaswani, Ashish, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, and Illia Polosukhin. 2017. \"Attention Is All You Need.\" Advances in Neural Information Processing Systems 30: 5998–6008.",
    harvard: "Vaswani, A. et al. (2017) 'Attention is all you need', Advances in Neural Information Processing Systems, 30, pp. 5998–6008.",
    ieee: "A. Vaswani et al., \"Attention is all you need,\" in Advances in Neural Information Processing Systems, vol. 30, 2017, pp. 5998–6008.",
    bibtex: "@inproceedings{vaswani2017attention,\n  title={Attention is all you need},\n  author={Vaswani, Ashish and Shazeer, Noam and Parmar, Niki and Uszkoreit, Jakob and Jones, Llion and Gomez, Aidan N and Kaiser, {\\L}ukasz and Polosukhin, Illia},\n  booktitle={Advances in Neural Information Processing Systems},\n  volume={30},\n  pages={5998--6008},\n  year={2017}\n}"
  }
};

export function CitationGeneratorClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [source, setSource] = useState<SourceData>(INITIAL_SOURCE);
  const [format, setFormat] = useState<CitationFormat>("apa");
  const [isSearching, setIsSearching] = useState(false);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [copiedInText, setCopiedInText] = useState(false);
  const [activeTab, setActiveTab] = useState<"auto" | "manual">("auto");

  const handleAiLookup = async (queryToSearch?: string) => {
    const q = queryToSearch || searchQuery;
    if (!q.trim()) {
      toast.error("Please enter an article title, URL, or DOI");
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch("/api/ai/citation-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: q, sourceType: source.type })
      });

      if (!res.ok) throw new Error("AI citation lookup failed");
      const json = await res.json();

      if (json.success && json.data) {
        setSource(json.data);
        toast.success("Citation metadata extracted!");
      } else {
        throw new Error("Invalid metadata format");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Lookup failed. Please verify the query or use manual entry.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleApplyPreset = (preset: typeof PRESET_SOURCES[0]) => {
    setSearchQuery(preset.query);
    handleAiLookup(preset.query);
  };

  const currentCitationText = source.citations?.[format] || generateFallbackCitation(source, format);
  const inTextCitationText = source.inTextCitation || generateFallbackInText(source);

  const copyCitation = async (textToCopy: string, label: string) => {
    await navigator.clipboard.writeText(textToCopy);
    setCopiedFormat(label);
    toast.success(`Copied ${label} citation!`);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const copyInText = async () => {
    await navigator.clipboard.writeText(inTextCitationText);
    setCopiedInText(true);
    toast.success("Copied In-Text citation!");
    setTimeout(() => setCopiedInText(false), 2000);
  };

  const downloadBibtex = () => {
    const bib = source.citations?.bibtex || generateBibtexFallback(source);
    const blob = new Blob([bib], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `citation-${source.year || "ref"}.bib`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded .bib BibTeX file!");
  };

  const downloadTxt = () => {
    const text = `CITATION & BIBLIOGRAPHY ENTRY\nStyle: ${format.toUpperCase()}\n\nFULL REFERENCE:\n${currentCitationText}\n\nIN-TEXT CITATION:\n${inTextCitationText}\n\nGenerated by Toolzium Citation Studio (https://toolzium.com/tools/academic/citation-generator)\n`;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `citation-${format}-${source.year || "ref"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded reference text!");
  };

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={GraduationCap}
          title="Free AI Citation Generator & Bibliography Studio"
          description="Instant APA 7th, MLA 9th, Chicago, Harvard, IEEE, and BibTeX citations. Auto-lookup any URL, DOI, book, or research paper with AI precision."
        />

        {/* 1-Click Popular Research Presets */}
        <div className="rounded-2xl border border-border/70 bg-card/40 backdrop-blur-md p-4 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <Flame className="h-4 w-4 text-amber-500" />
            <span>1-Click Academic Presets (Try Instant Auto-Cite)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {PRESET_SOURCES.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className="text-left p-2.5 rounded-xl border border-border/60 bg-background/50 hover:bg-primary/10 hover:border-primary/40 transition-all text-xs font-semibold truncate cursor-pointer"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Auto-Lookup Search Bar */}
        <GlassCard className="p-6 space-y-4 rounded-3xl border-border/80 shadow-xl">
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground block">
              Auto-Cite by URL, DOI (e.g. 10.1038/...), or Article Title:
            </label>
            <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAiLookup()}
                  placeholder="Paste URL, DOI (10.1038/...), Book Title, or PubMed link..."
                  className="pl-10 h-12 rounded-xl text-sm font-medium"
                />
              </div>
              <Button
                onClick={() => handleAiLookup()}
                disabled={isSearching}
                className="h-12 px-6 rounded-xl font-bold bg-primary text-primary-foreground gap-2 cursor-pointer shadow-md hover:scale-101 active:scale-99 transition-all shrink-0"
              >
                {isSearching ? (
                  <>
                    <Sparkles className="h-4 w-4 animate-spin" />
                    <span>Extracting...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Auto-Cite</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Style Selector Tabs */}
          <div className="space-y-2 border-t border-border/60 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Select Citation Style:
              </span>
              <span className="text-[11px] font-mono text-primary font-semibold">
                Updated to 2026 Guidelines
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "apa", label: "APA 7th" },
                { id: "mla", label: "MLA 9th" },
                { id: "chicago", label: "Chicago 17th" },
                { id: "harvard", label: "Harvard" },
                { id: "ieee", label: "IEEE" },
                { id: "bibtex", label: "BibTeX (LaTeX)" }
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setFormat(s.id as CitationFormat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    format === s.id
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-muted/50 text-muted-foreground border-border/60 hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Live Formatted Citation Output Card */}
        <GlassCard className="p-6 space-y-5 rounded-3xl border-primary/30 bg-card/60 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-border/60 pb-3.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-primary/20 text-primary text-xs font-black uppercase">
                {format} Format
              </span>
              <h3 className="text-sm font-bold text-foreground">Formatted Bibliography Entry</h3>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyCitation(currentCitationText, format.toUpperCase())}
                className="flex-1 sm:flex-initial h-9 rounded-xl text-xs font-bold gap-1.5 border-border/80 cursor-pointer"
              >
                {copiedFormat === format.toUpperCase() ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span>{copiedFormat === format.toUpperCase() ? "Copied Reference" : "Copy Reference"}</span>
              </Button>
              <Button
                size="sm"
                onClick={format === "bibtex" ? downloadBibtex : downloadTxt}
                className="flex-1 sm:flex-initial h-9 rounded-xl text-xs font-bold gap-1.5 bg-primary text-primary-foreground cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>{format === "bibtex" ? "Download .bib" : "Export .txt"}</span>
              </Button>
            </div>
          </div>

          {/* Full Reference Text Box */}
          <div className="rounded-2xl border border-border/70 bg-background/80 p-5 text-sm sm:text-base leading-relaxed text-foreground font-serif whitespace-pre-wrap selection:bg-primary/30">
            {currentCitationText}
          </div>

          {/* In-Text Citation Subcard */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-border/60 bg-muted/30 p-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                <Quote className="h-3.5 w-3.5 text-primary" />
                <span>In-Text Parenthetical Citation:</span>
              </div>
              <p className="text-xs font-mono font-bold text-primary pl-5">
                {inTextCitationText}
              </p>
            </div>

            <Button
              size="sm"
              variant="ghost"
              onClick={copyInText}
              className="h-8 px-3 rounded-lg text-xs font-bold gap-1.5 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              {copiedInText ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedInText ? "Copied" : "Copy In-Text"}</span>
            </Button>
          </div>
        </GlassCard>

        {/* Manual Metadata Inspection & Fine-Tuning */}
        <GlassCard className="p-6 space-y-4 rounded-3xl border-border/80">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <h4 className="text-xs font-bold text-foreground flex items-center gap-2 uppercase tracking-wider">
              <FileText className="h-4 w-4 text-primary" />
              Source Details & Metadata Editor
            </h4>
            <span className="text-[11px] text-muted-foreground">Edit fields to dynamically update all styles</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Title:</label>
              <Input
                value={source.title}
                onChange={(e) => setSource({ ...source, title: e.target.value })}
                className="h-10 text-xs rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Authors (Comma-separated):</label>
              <Input
                value={source.authors.map((a) => `${a.first} ${a.last}`).join(", ")}
                onChange={(e) => {
                  const names = e.target.value.split(",").map((n) => n.trim());
                  const parsedAuthors = names.map((n) => {
                    const parts = n.split(" ");
                    return { first: parts.slice(0, -1).join(" "), last: parts[parts.length - 1] || "" };
                  });
                  setSource({ ...source, authors: parsedAuthors });
                }}
                className="h-10 text-xs rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Publication Year:</label>
              <Input
                value={source.year}
                onChange={(e) => setSource({ ...source, year: e.target.value })}
                className="h-10 text-xs rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Journal / Publisher:</label>
              <Input
                value={source.journal || source.publisher || ""}
                onChange={(e) => setSource({ ...source, journal: e.target.value, publisher: e.target.value })}
                className="h-10 text-xs rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">DOI or URL:</label>
              <Input
                value={source.doi || source.url || ""}
                onChange={(e) => setSource({ ...source, doi: e.target.value, url: e.target.value })}
                className="h-10 text-xs rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Volume / Issue / Pages:</label>
              <Input
                value={source.volume ? `Vol ${source.volume}, pp. ${source.pages || ""}` : source.pages || ""}
                onChange={(e) => setSource({ ...source, pages: e.target.value })}
                className="h-10 text-xs rounded-xl"
              />
            </div>
          </div>
        </GlassCard>

        {/* Academic Guides & FAQ */}
        <ToolHowItWorks
          steps={[
            {
              step: "1",
              title: "Paste URL, DOI, or Title",
              description: "Enter any article link, DOI identifier (10.xxxx), or book title into the auto-cite box."
            },
            {
              step: "2",
              title: "Select Citation Style",
              description: "Toggle between APA 7th, MLA 9th, Chicago, Harvard, IEEE, or BibTeX with 1 click."
            },
            {
              step: "3",
              title: "Copy In-Text & Export",
              description: "Copy parenthetical in-text citations directly into your paper or export to Overleaf/Word."
            }
          ]}
        />

        <ToolFeatureGuides
          features={[
            {
              title: "1-Click DOI & URL Extraction",
              description: "Extracts complete volume, issue, journal title, and author taxonomy without tedious manual typing."
            },
            {
              title: "Overleaf & LaTeX BibTeX Export",
              description: "Generates clean, sanitized BibTeX entries ready to paste into your .bib file for LaTeX research compilations."
            },
            {
              title: "Parenthetical In-Text Generator",
              description: "Never guess whether to use et al. or ampersands. Dynamically formats correct in-text citations."
            }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            {
              question: "What is the difference between APA 7th and MLA 9th?",
              answer: "APA (American Psychological Association) emphasizes the date of publication (Author, Year) and is standard in sciences and psychology. MLA (Modern Language Association) emphasizes the author and page number (Author Page) and is standard in humanities and literature."
            },
            {
              question: "Can I cite YouTube videos, websites, and preprints?",
              answer: "Yes. Our AI citation engine automatically identifies websites, YouTube lectures, arXiv preprints, and government reports."
            },
            {
              question: "Is this citation generator free?",
              answer: "Yes. Toolzium Citation Studio is 100% free with unlimited citations, no ads, and no signups required."
            }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/academic/citation-generator" />
      </div>
    </div>
  );
}

// Fallback formatters
function generateFallbackCitation(s: SourceData, format: CitationFormat): string {
  const authorStr = s.authors.map((a) => `${a.last}, ${a.first.charAt(0)}.`).join(", ");
  switch (format) {
    case "apa":
      return `${authorStr || "Author"} (${s.year || "n.d."}). ${s.title}. ${s.journal || s.publisher || ""}. ${s.doi ? `https://doi.org/${s.doi}` : s.url || ""}`;
    case "mla":
      return `${s.authors[0]?.last || "Author"}, ${s.authors[0]?.first || ""}. "${s.title}." ${s.journal || s.publisher || ""}, ${s.year || ""}.`;
    case "chicago":
      return `${authorStr || "Author"}. ${s.year || ""}. "${s.title}." ${s.journal || s.publisher || ""}.`;
    case "harvard":
      return `${authorStr || "Author"} (${s.year || "n.d."}) '${s.title}', ${s.journal || s.publisher || ""}.`;
    case "ieee":
      return `${s.authors.map((a) => `${a.first.charAt(0)}. ${a.last}`).join(", ")}, "${s.title}," ${s.journal || s.publisher || ""}, ${s.year || ""}.`;
    case "bibtex":
      return generateBibtexFallback(s);
  }
}

function generateFallbackInText(s: SourceData): string {
  if (s.authors.length === 0) return `(${s.title?.slice(0, 15) || "Source"}, ${s.year || "n.d."})`;
  if (s.authors.length === 1) return `(${s.authors[0].last}, ${s.year || "n.d."})`;
  if (s.authors.length === 2) return `(${s.authors[0].last} & ${s.authors[1].last}, ${s.year || "n.d."})`;
  return `(${s.authors[0].last} et al., ${s.year || "n.d."})`;
}

function generateBibtexFallback(s: SourceData): string {
  const key = `${(s.authors[0]?.last || "ref").toLowerCase()}${s.year || "2026"}`;
  return `@article{${key},\n  title={${s.title}},\n  author={${s.authors.map((a) => `${a.last}, ${a.first}`).join(" and ")}},\n  journal={${s.journal || s.publisher || ""}},\n  year={${s.year || "2026"}}\n}`;
}

export default CitationGeneratorClient;

