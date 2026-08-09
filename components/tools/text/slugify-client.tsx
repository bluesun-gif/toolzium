"use client";

import { AlignLeft, BookOpen, Code2, Eraser, Globe, Hash, Info, Link, List, Shield, Type, Zap, Wand2 as Wand } from "lucide-react";
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

      {/* SECTION 3: HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Type or Paste Your Text",
            description: "Enter any title, heading, product name, or article name. Works with text in any language — accented characters (é, ü, ñ) are transliterated to ASCII equivalents.",
            icon: Type,
          },
          {
            step: "02",
            title: "Get URL-Safe Slug",
            description: "Instantly see the URL slug: lowercase, spaces replaced with hyphens, special characters removed, multiple hyphens collapsed. Updated live as you type.",
            icon: Link,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy the slug directly for use as a URL path, CMS permalink, file name, Git branch name, database key, or any other identifier needing a URL-safe string.",
            icon: BookOpen,
          },
        ]}
        badges={[
          "Unicode & accent support",
          "Instant generation",
          "SEO-friendly output",
        ]}
      />

      {/* SECTION 4: FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: Link,
            title: "URL-Safe Output",
            description: "Produces slugs that are safe for all URLs: lowercase only, hyphens instead of spaces, no special characters, no leading/trailing hyphens. Ready for direct use in routes.",
          },
          {
            icon: Globe,
            title: "Unicode & Accent Handling",
            description: "Automatically transliterates accented and special characters: é→e, ü→u, ñ→n, ø→o, ß→ss. Supports Latin, Cyrillic-to-Latin, and other common transliterations.",
          },
          {
            icon: Hash,
            title: "Separator Options",
            description: "Choose hyphens (-) for URLs and SEO (recommended by Google), underscores (_) for file names and Python variables, or other custom separators for specific use cases.",
          },
          {
            icon: Code2,
            title: "Multi-Platform Compatible",
            description: "Generated slugs work as WordPress permalinks, Next.js routes, GitHub branch names, file system paths, database slugs, and npm package names.",
          },
          {
            icon: AlignLeft,
            title: "Smart Truncation",
            description: "Optionally set a maximum slug length. Long titles are truncated at a word boundary — never cutting a word in the middle — keeping slugs readable and SEO-friendly.",
          },
          {
            icon: Shield,
            title: "Private & Client-Side",
            description: "All slug generation runs in your browser. No text is sent to any server — safe for sensitive product names, internal document titles, or confidential content.",
          },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">URL Slugs — Best Practices for SEO & Web Development</h3>
          <p>
            A <strong>URL slug</strong> is the part of a URL that identifies a specific page in a
            human-readable form. For example, in <code>example.com/blog/how-to-use-react-hooks</code>,
            the slug is <code>how-to-use-react-hooks</code>. Well-crafted slugs improve SEO, make URLs
            shareable, and help users understand the page content before clicking.
          </p>

          <h4 className="font-semibold">Slug Transformation Rules</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Input</th>
                  <th className="border p-2 text-left">Rule Applied</th>
                  <th className="border p-2 text-left">Output</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Hello World!", "Lowercase + remove punctuation", "hello-world"],
                  ["React & TypeScript", "Replace & with 'and', hyphenate", "react-and-typescript"],
                  ["Crème Brûlée", "Transliterate accents", "creme-brulee"],
                  ["  extra   spaces  ", "Trim + collapse whitespace", "extra-spaces"],
                  ["100% Free!", "Remove %, !", "100-free"],
                  ["/path/to/file.html", "Remove slashes and extension", "path-to-file-html"],
                  ["what is SEO?", "Lowercase + remove ?", "what-is-seo"],
                ].map(([input, rule, output]) => (
                  <tr key={input} className="odd:bg-muted/20">
                    <td className="border p-2 font-mono text-xs">{input}</td>
                    <td className="border p-2 text-muted-foreground text-xs">{rule}</td>
                    <td className="border p-2 font-mono text-primary text-xs">{output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold">Slug Best Practices for SEO</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Practice</th>
                  <th className="border p-2 text-left">Good Example</th>
                  <th className="border p-2 text-left">Bad Example</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Use hyphens", "/best-react-hooks", "/best_react_hooks"],
                  ["Lowercase only", "/javascript-tips", "/JavaScript-Tips"],
                  ["Include keywords", "/how-to-bake-bread", "/post-1234"],
                  ["Keep it short", "/react-hooks-guide", "/ultimate-complete-guide-to-react-hooks-2024"],
                  ["No stop words", "/react-hooks", "/a-guide-to-the-react-hooks"],
                  ["No special chars", "/creme-brulee", "/crème-brûlée"],
                ].map(([practice, good, bad]) => (
                  <tr key={practice} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{practice}</td>
                    <td className="border p-2 font-mono text-emerald-600 text-xs">{good}</td>
                    <td className="border p-2 font-mono text-red-500 text-xs">{bad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold">Hyphens vs Underscores — Google's Official Guidance</h4>
          <p>
            Google's John Mueller has confirmed that <strong>hyphens are preferred over underscores</strong>
            for URL slugs. Google treats hyphens as word separators (so <code>react-hooks</code> = two words:
            "react" and "hooks"), but treats underscores as word joiners (so <code>react_hooks</code> = one
            word: "reacthooks"). Use hyphens for all public-facing URLs. Use underscores for file names,
            Python variables, and database column names where convention dictates.
          </p>
        </div>
      </ToolFeatureGuides>

      {/* SECTION 5: FAQ + RELATED TOOLS */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "What is a URL slug?",
            answer: "A URL slug is the part of a URL that identifies a page in human-readable form. In 'example.com/blog/my-first-post', the slug is 'my-first-post'. Slugs should be lowercase, use hyphens as separators, contain no special characters, and ideally include relevant keywords for SEO.",
          },
          {
            question: "Should I use hyphens or underscores in slugs?",
            answer: "Use hyphens for URLs. Google officially recommends hyphens as word separators in URLs — they are treated as spaces in search indexing. Underscores are treated as word joiners, potentially hurting keyword matching. Use underscores only in file names, Python variables, or database column names where it's the convention.",
          },
          {
            question: "How long should a URL slug be?",
            answer: "Keep slugs under 60-75 characters. Shorter slugs are more readable and shareable. Remove stop words (the, a, an, of, in, to) to keep it concise while retaining meaning. Focus on 2-5 key words that describe the page content — both for readability and SEO.",
          },
          {
            question: "What happens to accented characters in slugs?",
            answer: "Accented characters (é, ü, ñ, ø, etc.) should be transliterated to their ASCII equivalents (e, u, n, o) for maximum URL compatibility. While modern browsers and servers handle UTF-8 URLs, percent-encoded URLs (crème becomes cr%C3%A8me) are ugly and hard to share. Transliteration keeps slugs clean.",
          },
          {
            question: "What is the difference between a slug and a URL parameter?",
            answer: "A slug is a clean path segment: /blog/my-article. A URL parameter is a query string: /blog?id=123. Slugs are better for SEO because they contain readable keywords and are indexed more favorably. URL parameters are used for dynamic content like search results, filters, and pagination.",
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
