"use client";

import { AlignLeft, BookOpen, Code2, Eraser, Globe, Hash, Info, Link, List, Shield, Type, Zap, Wand2 as Wand, Link2, Settings2, Copy, FileText } from "lucide-react";
import * as React from "react";
import toast from "react-hot-toast";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import InputField from "@/components/shared/form-fields/input-field";
import SelectField from "@/components/shared/form-fields/select-field";
import SwitchRow from "@/components/shared/form-fields/switch-row";
import TextareaField from "@/components/shared/form-fields/textarea-field";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { delimiterFromKey, slugify } from "@/lib/utils/text/slugify";

export default function SlugifyClient() {
  const [mode, setMode] = React.useState<SlugifyMode>("single");
  const [input, setInput] = React.useState<string>("");
  const [batchInput, setBatchInput] = React.useState<string>("");
  const [output, setOutput] = React.useState<string>("");
  const [batchOutput, setBatchOutput] = React.useState<string>("");
  const [live, setLive] = React.useState<boolean>(true);

  const [delimiterKey, setDelimiterKey] = React.useState<DelimiterKey>("dash");
  const [lowercase, setLowercase] = React.useState(true);
  const [trim, setTrim] = React.useState(true);
  const [transliterate, setTransliterate] = React.useState(true);
  const [collapse, setCollapse] = React.useState(true);
  const [preserveUnderscore, setPreserveUnderscore] = React.useState(false);
  const [keepNumbers, setKeepNumbers] = React.useState(true);
  const [maxLen, setMaxLen] = React.useState<number>(0);
  const [stopwordText, setStopwordText] = React.useState<string>(
    "a, an, the, and, or, of, for, with",
  );
  const [customMapText, setCustomMapText] = React.useState<string>("™ =>\n& => and\n@ => at");

  const opts: Options = React.useMemo(
    () => ({
      delimiter: delimiterFromKey(delimiterKey),
      lowercase,
      trim,
      transliterate,
      collapse,
      preserveUnderscore,
      keepNumbers,
      maxLen,
      stopwords: parseStopwords(stopwordText),
      customMap: parseCustomMap(customMapText),
    }),
    [
      delimiterKey,
      lowercase,
      trim,
      transliterate,
      collapse,
      preserveUnderscore,
      keepNumbers,
      maxLen,
      stopwordText,
      customMapText,
    ],
  );

  const runSingle = React.useCallback(() => {
    setOutput(slugify(input, opts));
  }, [input, opts]);

  const runBatch = React.useCallback(() => {
    const lines = (batchInput || "").split(/\r?\n/);
    const slugs = lines.map((l) => slugify(l, opts));
    setBatchOutput(slugs.join("\n"));
  }, [batchInput, opts]);

  const runCurrent = React.useCallback(() => {
    if (mode === "single") runSingle();
    else runBatch();
  }, [mode, runSingle, runBatch]);

  React.useEffect(() => {
    if (!live) return;
    runCurrent();
  }, [live, runCurrent]);

  const resetAll = () => {
    setInput("");
    setBatchInput("");
    setOutput("");
    setBatchOutput("");
    setDelimiterKey("dash");
    setLowercase(true);
    setTrim(true);
    setTransliterate(true);
    setCollapse(true);
    setPreserveUnderscore(false);
    setKeepNumbers(true);
    setMaxLen(0);
    setStopwordText("a, an, the, and, or, of, for, with");
    setCustomMapText("™ =>\n& => and\n@ => at");
    toast.success("Reset complete");
  };

  const applyPreset = (key: "seo" | "github" | "id" | "raw") => {
    if (key === "seo") {
      setDelimiterKey("dash");
      setLowercase(true);
      setTransliterate(true);
      setCollapse(true);
      setMaxLen(80);
    } else if (key === "github") {
      setDelimiterKey("dash");
      setLowercase(true);
      setTransliterate(true);
      setCollapse(true);
      setPreserveUnderscore(false);
      setMaxLen(100);
    } else if (key === "id") {
      setDelimiterKey("none");
      setLowercase(true);
      setTransliterate(true);
      setCollapse(true);
      setKeepNumbers(true);
      setMaxLen(32);
    } else {
      setDelimiterKey("dash");
      setLowercase(false);
      setTransliterate(false);
      setCollapse(true);
      setMaxLen(0);
    }
  };

  const presetButtons: { label: string; preset: PresetKey }[] = [
    { label: "SEO Blog", preset: "seo" },
    { label: "GitHub Anchor", preset: "github" },
    { label: "Compact ID", preset: "id" },
    { label: "Raw", preset: "raw" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <ToolPageHeader
        icon={Type}
        title="Slugify"
        description="Convert titles and phrases into clean, URL-safe slugs."
      />

      {/* Presets + Controls */}
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <GlassCard className="p-5">
          <div className="flex flex-wrap items-center gap-2">
            {presetButtons.map((item) => (
              <ActionButton
                key={item.preset}
                size="sm"
                variant="outline"
                label={item.label}
                onClick={() => applyPreset(item.preset)}
              />
            ))}

            <ResetButton className="ml-auto" onClick={resetAll} />
          </div>

          <div className="flex items-end gap-4 flex-wrap">
            <SelectField
              label="Delimiter"
              placeholder="Choose"
              value={delimiterKey}
              onValueChange={(v) => setDelimiterKey(v as DelimiterKey)}
              options={[
                { label: "Dash (-)", value: "dash" },
                { label: "Underscore (_)", value: "underscore" },
                { label: "None (concat)", value: "none" },
              ]}
            />

            <InputField
              id="maxLen"
              label="Max length (0 = off)"
              type="number"
              min={0}
              max={200}
              value={maxLen || ""}
              onChange={(e) => setMaxLen(Math.max(0, Number(e.target.value) || 0))}
            />

            <SwitchRow
              className="ml-auto w-full sm:w-auto"
              label="Live mode"
              hint="Apply changes as you type."
              checked={live}
              onCheckedChange={setLive}
            />

            <div className="grid sm:grid-cols-2 gap-3 w-full">
              <SwitchRow label="Lowercase" checked={lowercase} onCheckedChange={setLowercase} />
              <SwitchRow label="Trim edges" checked={trim} onCheckedChange={setTrim} />
              <SwitchRow
                label="Transliterate"
                hint="Remove accents/diacritics"
                checked={transliterate}
                onCheckedChange={setTransliterate}
              />
              <SwitchRow
                label="Collapse repeats"
                checked={collapse}
                onCheckedChange={setCollapse}
              />
              <SwitchRow
                label="Keep numbers"
                checked={keepNumbers}
                onCheckedChange={setKeepNumbers}
              />
              <SwitchRow
                label="Preserve _"
                checked={preserveUnderscore}
                onCheckedChange={setPreserveUnderscore}
              />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="grid gap-4">
            <InputField
              label="Stopwords (comma-separated)"
              value={stopwordText}
              onChange={(e) => setStopwordText(e.target.value)}
              placeholder="a, an, the, and…"
            />

            <TextareaField
              label="Custom replacements (one per line, “from - to”)"
              textareaClassName="min-h-[175px]"
              value={customMapText}
              onValueChange={setCustomMapText}
              placeholder={`™ => \n& => and\n@ => at`}
              autoResize
              trimOnBlur
            />
          </div>
        </GlassCard>
      </div>

      <Separator />

      {/* Tabs: Single / Batch */}
      <Tabs value={mode} onValueChange={(v) => setMode(v as SlugifyMode)} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="single" className="gap-2">
            <Type className="h-4 w-4" /> Single
          </TabsTrigger>
          <TabsTrigger value="batch" className="gap-2">
            <List className="h-4 w-4" /> Batch
          </TabsTrigger>
        </TabsList>

        {/* Single */}
        <TabsContent value="single">
          <div className="grid gap-4 md:grid-cols-2">
            <GlassCard className="p-5">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Input</Label>
                <div className="flex gap-2">
                  <ResetButton icon={Eraser} label="Clear" onClick={() => setInput("")} />
                  <CopyButton variant="default" getText={() => input} />
                </div>
              </div>

              <TextareaField
                value={input}
                onValueChange={setInput}
                onKeyUp={(e) => {
                  if (!live && e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                    runSingle();
                  }
                }}
                placeholder={
                  live ? "Write a title to slugify…" : "Write a title… (Ctrl/Cmd + Enter to run)"
                }
                textareaClassName="min-h-[250px]"
              />

              {/* Show run button ONLY in Manual mode */}
              {!live && (
                <ActionButton variant="default" icon={Wand} onClick={runSingle} label="Slugify" />
              )}
            </GlassCard>

            <GlassCard className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium">Output</Label>
                  <Badge variant="secondary" className="gap-1">
                    <Info className="h-3.5 w-3.5" />
                    {live ? "Live" : "Manual"}
                  </Badge>
                </div>
                <CopyButton getText={() => output} />
              </div>

              <TextareaField
                readOnly
                value={output}
                placeholder="Result will appear here…"
                textareaClassName="min-h-[200px]"
                autoResize
              />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>
                  Length: <code className="rounded bg-muted px-1">{output.length}</code>
                </span>
                <span>
                  Delimiter:{" "}
                  <code className="rounded bg-muted px-1">
                    {(() => {
                      const d = delimiterFromKey(delimiterKey);
                      return d || "(none)";
                    })()}
                  </code>
                </span>
              </div>
            </GlassCard>
          </div>
        </TabsContent>

        {/* Batch */}
        <TabsContent value="batch">
          <div className="grid gap-4 md:grid-cols-2">
            <GlassCard className="p-5">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Input (one title per line)</Label>
                <div className="flex gap-2">
                  <ResetButton icon={Eraser} onClick={() => setBatchInput("")} label="Clear" />
                  <CopyButton variant="default" getText={() => batchInput} />
                </div>
              </div>

              <TextareaField
                value={batchInput}
                onValueChange={setBatchInput}
                placeholder={
                  live
                    ? "My First Post\n10 Tips for SEO\nবাংলা শিরোনামও সমর্থিত"
                    : "My First Post\n10 Tips for SEO\nবাংলা শিরোনামও সমর্থিত\n(Ctrl/Cmd + Enter to run)"
                }
                onKeyUp={(e) => {
                  if (!live && e.key === "Enter" && (e.ctrlKey || e.metaKey)) runBatch();
                }}
                textareaClassName="min-h-[250px]"
                autoResize
              />

              {/* Show run button ONLY in Manual mode */}
              {!live && (
                <ActionButton
                  variant="default"
                  icon={Wand}
                  label="Slugify List"
                  onClick={runBatch}
                />
              )}
            </GlassCard>

            <GlassCard className="p-5">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Output (one slug per line)</Label>
                <CopyButton variant="default" getText={() => batchOutput} />
              </div>

              <TextareaField
                readOnly
                value={batchOutput}
                placeholder="result-one\nresult-two\nresult-three"
                textareaClassName="min-h-[200px]"
                autoResize
              />

              <div className="text-xs text-muted-foreground">
                Lines:{" "}
                <code className="rounded bg-muted px-1">
                  {batchOutput ? batchOutput.split("\n").length : 0}
                </code>
              </div>
            </GlassCard>
          </div>
        </TabsContent>
      </Tabs>

      {/* HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Enter Your Title or Text",
            description: "Type or paste any title, headline, product name, or article heading. The tool processes Unicode, diacritics, special characters, and symbols from any language.",
            icon: FileText,
          },
          {
            step: "02",
            title: "Configure Slug Options",
            description: "Choose separator (hyphen, underscore, dot), case (lowercase, uppercase), max length, and whether to strip stop words. Preview updates live as you type.",
            icon: Settings2,
          },
          {
            step: "03",
            title: "Copy and Use",
            description: "Copy the generated slug with one click. Use it in your CMS URL field, file system, API route, or database key. The slug is already URL-safe and ready to use.",
            icon: Copy,
          },
        ]}
        badges={["Unicode support", "Real-time preview", "CMS-ready output"]}
      />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: Link2,
            title: "URL-Safe Output",
            description: "Every generated slug uses only characters safe in URLs without encoding: a-z, 0-9, and the chosen separator (- _ .). No percent-encoding needed, no broken links.",
          },
          {
            icon: Globe,
            title: "Unicode & Diacritics",
            description: "Converts accented characters to ASCII equivalents: é→e, ñ→n, ü→u, ø→o, ß→ss. Handles Arabic, Chinese, Japanese via transliteration. Works with emoji removal.",
          },
          {
            icon: Settings2,
            title: "Configurable Separator",
            description: "Choose hyphen (-), underscore (_), or dot (.) as word separator. Hyphens are standard for URLs (Google recommends). Underscores are conventional for file names and Python variables.",
          },
          {
            icon: Code2,
            title: "Stop Word Removal",
            description: "Optionally strips common English stop words (a, an, the, and, or, but, in, on, at, to, for) to produce shorter, more keyword-dense slugs for better SEO.",
          },
          {
            icon: Zap,
            title: "Max Length Control",
            description: "Set a maximum character limit (commonly 60-75 chars for SEO). Slug is truncated at a word boundary, never mid-word, ensuring readable and complete output.",
          },
          {
            icon: Shield,
            title: "Client-Side Processing",
            description: "All slugification happens instantly in your browser. Your content is never sent to any server — safe for confidential titles, internal product names, and draft content.",
          },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">Slug Generator — Complete Technical Guide</h3>
          <p>
            A <strong>URL slug</strong> is the human-readable part of a URL that identifies a specific page.
            In <code>https://example.com/blog/how-to-make-coffee</code>, the slug is
            <code>how-to-make-coffee</code>. Slugs are critical for SEO, user experience, and
            system interoperability. A well-formed slug is lowercase, uses hyphens as word separators,
            contains only ASCII alphanumeric characters, and is concise (under 75 characters).
          </p>

          <h3 className="text-lg font-semibold">Slug Format Standards by Platform</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Platform</th>
                  <th className="border p-2 text-left">Separator</th>
                  <th className="border p-2 text-left">Case</th>
                  <th className="border p-2 text-left">Max Length</th>
                  <th className="border p-2 text-left">Example</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["WordPress", "Hyphen (-)", "Lowercase", "~200 chars", "my-post-title"],
                  ["Shopify", "Hyphen (-)", "Lowercase", "255 chars", "blue-running-shoes"],
                  ["GitHub repos", "Hyphen (-)", "Lowercase", "100 chars", "my-awesome-project"],
                  ["Python files", "Underscore (_)", "Lowercase", "No limit", "my_module_name"],
                  ["Django URLs", "Hyphen (-)", "Lowercase", "~50 chars", "article-detail"],
                  ["Next.js routes", "Hyphen (-)", "Lowercase", "No limit", "blog-post-slug"],
                  ["AWS S3 keys", "Hyphen (-)", "Any", "1024 bytes", "uploads/user-avatar"],
                  ["PostgreSQL cols", "Underscore (_)", "Lowercase", "63 chars", "created_at"],
                ].map(([platform, sep, cas, len, ex]) => (
                  <tr key={platform} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{platform}</td>
                    <td className="border p-2 font-mono text-primary text-xs">{sep}</td>
                    <td className="border p-2 text-xs">{cas}</td>
                    <td className="border p-2 text-xs">{len}</td>
                    <td className="border p-2 font-mono text-muted-foreground text-xs">{ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold">Google's Official Slug Recommendations</h3>
          <p>
            Google's John Mueller and the Search Central documentation explicitly recommend:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>Use hyphens, not underscores</strong> — Google treats hyphens as word separators, underscores as word joiners. <code>word-count</code> ranks for "word count"; <code>word_count</code> only ranks for "word_count".</li>
            <li><strong>Keep slugs short and descriptive</strong> — Include your target keyword, drop filler words (a, the, and, for).</li>
            <li><strong>Avoid keyword stuffing</strong> — <code>best-seo-tips-seo-guide-seo-2025</code> is worse than <code>seo-tips-2025</code>.</li>
            <li><strong>Use 301 redirects when changing slugs</strong> — Changing a slug without redirecting loses all backlink equity built to the old URL.</li>
            <li><strong>Avoid dates in slugs</strong> for evergreen content — <code>/best-laptops</code> ages better than <code>/best-laptops-2024</code>.</li>
          </ul>

          <h3 className="text-lg font-semibold">Unicode Transliteration Reference</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Character</th>
                  <th className="border p-2 text-left">Language</th>
                  <th className="border p-2 text-left">Slug Output</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["é, è, ê, ë", "French", "e"],
                  ["ñ", "Spanish", "n"],
                  ["ü, ö, ä", "German", "u, o, a"],
                  ["ß", "German", "ss"],
                  ["ø, å", "Danish/Norwegian", "o, a"],
                  ["ç", "French/Turkish", "c"],
                  ["ğ, ş, ı", "Turkish", "g, s, i"],
                  ["ą, ę, ó, ś", "Polish", "a, e, o, s"],
                  ["č, š, ž", "Czech/Slovak", "c, s, z"],
                  ["中文 (Chinese)", "Chinese", "zhong-wen (pinyin)"],
                ].map(([char, lang, out]) => (
                  <tr key={char} className="odd:bg-muted/20">
                    <td className="border p-2 font-mono text-primary text-xs">{char}</td>
                    <td className="border p-2 text-xs">{lang}</td>
                    <td className="border p-2 font-mono text-xs">{out}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ToolFeatureGuides>

      {/* FAQ */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "Should I use hyphens or underscores in URL slugs?",
            answer: "Use hyphens for URL slugs. Google explicitly recommends hyphens over underscores because Google's crawlers treat hyphens as word separators (so 'word-count' ranks for the query 'word count') but treat underscores as word joiners (so 'word_count' only matches the exact string 'word_count'). Use underscores only for file names, Python variables, and database column names where that convention is standard.",
          },
          {
            question: "How long should a URL slug be?",
            answer: "Aim for 3-5 words (roughly 20-60 characters) for optimal SEO. Google can handle longer URLs but shorter slugs are easier to share, remember, and fit in search result snippets without truncation. Include your primary keyword near the beginning of the slug. Avoid keyword stuffing — 'best-seo-tips-2025' is better than 'best-top-ultimate-seo-tips-guide-strategies-2025'.",
          },
          {
            question: "Does changing a URL slug affect SEO?",
            answer: "Yes — changing a slug changes the URL, which means any existing backlinks, social shares, and indexed pages for the old URL will lead to a 404 unless you set up a 301 redirect. Always implement a 301 redirect from the old URL to the new one when changing slugs. This passes ~90-99% of link equity to the new URL. Without a redirect, you lose all accumulated SEO authority.",
          },
          {
            question: "How does the slug generator handle special characters and accents?",
            answer: "The slug generator transliterates accented and special characters to their ASCII equivalents: é→e, ñ→n, ü→u, ß→ss, ç→c. Chinese, Japanese, and Arabic text is transliterated using standard romanization (pinyin for Chinese). Emoji, symbols, and characters with no ASCII equivalent are removed. This ensures the slug is valid in all browsers and server environments without URL encoding.",
          },
          {
            question: "What are stop words and should I remove them from slugs?",
            answer: "Stop words are common English words (a, an, the, and, or, but, in, on, at, to, for, of, with) that carry little keyword value. Removing them makes slugs shorter and more keyword-dense: 'the-best-way-to-make-coffee' → 'best-way-make-coffee'. Whether to remove stop words depends on your use case — for blog posts and articles, removal is generally recommended for SEO. For product names or proper nouns where the stop word is part of the name, keep it.",
          },
        ]}
      />
      <RelatedTools currentToolUrl="/tools/text/slugify" max={6} />
    </div>
  );
}

/* Parsers */

function parseStopwords(text: string): string[] {
  return text
    .split(",")
    .map((w) => w.trim())
    .filter(Boolean);
}

function parseCustomMap(text: string): Record<string, string> {
  const map: Record<string, string> = {};
  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^(.*?)(?:\s*=>\s*)(.*)$/);
    if (!m) continue;
    const from = (m[1] ?? "").trim();
    const to = (m[2] ?? "").trim();
    if (from.length) map[from] = to;
  }
  return map;
}
