"use client";

import React, { useState, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/action-buttons";
import toast from "react-hot-toast";
import { Fingerprint, Hash, RefreshCw, Zap } from "lucide-react";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";

function generateUuidV4(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

export default function UuidGeneratorClient() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);

  const handleGenerate = useCallback(() => {
    const generated = Array.from({ length: count }, () => generateUuidV4());
    setUuids(generated);
    toast.success(`Generated ${count} UUIDs`);
  }, [count]);

  const handleCopyAll = () => {
    if (uuids.length === 0) return;
    navigator.clipboard.writeText(uuids.join("\n"));
    toast.success(`Copied ${uuids.length} UUIDs`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <ToolPageHeader
        icon={Fingerprint}
        title="UUID v4 Generator"
        description="Generate cryptographically random RFC 4122 version 4 UUIDs for databases, APIs, and identifiers."
      />

      <Card className={cardClass}>
        <CardHeader className={headerClass}>
          <CardTitle className={titleClass}>
            <Hash className="w-4 h-4 text-primary" /> Generator Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-end">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                How many UUIDs to generate: <span className="font-bold text-foreground">{count}</span>
              </label>
              <select
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value, 10))}
                className="w-full rounded-lg border border-border/70 bg-background/80 p-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <Button onClick={handleGenerate} className="w-full md:w-auto">
              <RefreshCw className="w-4 h-4 mr-2" /> Generate UUIDs
            </Button>
          </div>
        </CardContent>
      </Card>

      {uuids.length > 0 && (
        <Card className={cardClass}>
          <CardHeader className={headerClass}>
            <CardTitle className={titleClass}>
              <Fingerprint className="w-4 h-4 text-primary" /> Generated UUIDs ({uuids.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 space-y-3">
            <div className="space-y-2">
              {uuids.map((uuid, idx) => (
                <div
                  key={uuid}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 rounded-lg border border-border/60 bg-background/60 p-3"
                >
                  <span className="text-xs text-muted-foreground w-6 shrink-0">#{idx + 1}</span>
                  <code className="font-mono text-sm break-all flex-1">{uuid}</code>
                  <CopyButton getText={() => uuid} label="Copy" />
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-2">
              <Button onClick={handleCopyAll} variant="outline">
                <Hash className="w-4 h-4 mr-2" /> Copy All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Choose Quantity", description: "Select how many UUIDs you need, from 1 to 10 at a time.", icon: Hash },
          { step: "02", title: "Generate", description: "Click the button to create RFC 4122 v4 UUIDs using your browser's secure random source.", icon: RefreshCw },
          { step: "03", title: "Copy", description: "Copy individual UUIDs or the entire list at once for use in your project.", icon: Fingerprint },
        ]}
        badges={["100% Free", "Client-Side", "Secure"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: Fingerprint, title: "RFC 4122 v4", description: "Generates standards-compliant version 4 UUIDs with correct version and variant bits." },
          { icon: Hash, title: "Batch Generation", description: "Create up to 10 UUIDs in a single click for bulk seeding or testing." },
          { icon: Zap, title: "CSPRNG", description: "Uses crypto.randomUUID() or crypto.getRandomValues() for true randomness." },
          { icon: RefreshCw, title: "Private", description: "All generation happens in your browser. No network calls, no logging." },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>A Universally Unique Identifier (UUID) is a 128-bit value used to identify information in computer systems without requiring a central authority. The probability of generating two identical UUIDs is so vanishingly small — roughly one in 2^122 for version 4 — that they can be treated as globally unique for all practical purposes. This makes them ideal for database primary keys, distributed system identifiers, API tokens, and file names.</p>
          <p>Version 4 UUIDs are generated from random (or pseudo-random) numbers. Of the 128 bits, 122 are random, while 6 bits are reserved for the version number (4, encoded as <code>0100</code>) and the variant identifier (<code>10</code> for the standard RFC 4122 variant). The textual representation uses 32 hexadecimal digits grouped as 8-4-4-4-12 with hyphens, producing strings like <code>f47ac10b-58cc-4372-a567-0e02b2c3d479</code>.</p>
          <p>UUIDs are widely supported across programming languages and databases. PostgreSQL has a native <code>uuid</code> type, MySQL supports them as <code>BINARY(16)</code>, and most application frameworks provide standard libraries for generation. While version 4 (random) is the most common choice, version 7 (time-ordered) is gaining popularity in modern databases because it preserves insertion order and improves index locality, reducing write amplification in B-tree indexes.</p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "Can two UUIDs ever collide?", answer: "The probability is astronomically small. You would need to generate roughly 2^61 UUIDs to have a 50% chance of a single collision. In practice, collisions are effectively impossible." },
          { question: "What is the difference between UUID v4 and v7?", answer: "v4 is fully random and great for general use. v7 embeds a Unix timestamp in the first 48 bits, making UUIDs sortable by time — useful for database performance." },
          { question: "Can I use UUIDs as database primary keys?", answer: "Yes, they are widely used as PKs, especially in distributed systems. Consider storing them as BINARY(16) instead of strings to save space and improve index performance." },
          { question: "Is crypto.randomUUID() supported everywhere?", answer: "It is supported in all modern browsers. For older environments, this tool includes a fallback using crypto.getRandomValues()." },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/developer/uuid-generator" max={6} />
    </div>
  );
}
