"use client";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import TextareaField from "@/components/shared/form-fields/textarea-field";
import Stat from "@/components/shared/stat";
import { ResetButton, CopyButton } from "@/components/shared/action-buttons";
import { Button } from "@/components/ui/button";
import { Type, Copy, RefreshCcw } from "lucide-react";

export default function CaseConverterClient() {
  const [text, setText] = useState<string>(
    "Toolzium is an high-performance online tool suite designed for developers and creators!"
  );

  const getWords = (str: string) => {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[_\-]+/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  };

  const toUppercase = (str: string) => str.toUpperCase();
  const toLowercase = (str: string) => str.toLowerCase();

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  };

  const toSentenceCase = (str: string) => {
    return str
      .toLowerCase()
      .replace(/(^\s*|\.\s*)([a-z])/g, (_, p1, p2) => p1 + p2.toUpperCase());
  };

  const toCamelCase = (str: string) => {
    const words = getWords(str);
    if (words.length === 0) return "";
    return words[0].toLowerCase() + words.slice(1).map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("");
  };

  const toPascalCase = (str: string) => {
    const words = getWords(str);
    return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("");
  };

  const toSnakeCase = (str: string) => {
    const words = getWords(str);
    return words.map((w) => w.toLowerCase()).join("_");
  };

  const toKebabCase = (str: string) => {
    const words = getWords(str);
    return words.map((w) => w.toLowerCase()).join("-");
  };

  const toConstantCase = (str: string) => {
    const words = getWords(str);
    return words.map((w) => w.toUpperCase()).join("_");
  };

  const toAlternatingCase = (str: string) => {
    return str
      .split("")
      .map((char, i) => (i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
      .join("");
  };

  const formats = [
    { label: "UPPERCASE", value: toUppercase(text) },
    { label: "lowercase", value: toLowercase(text) },
    { label: "Title Case", value: toTitleCase(text) },
    { label: "Sentence case", value: toSentenceCase(text) },
    { label: "camelCase", value: toCamelCase(text) },
    { label: "PascalCase", value: toPascalCase(text) },
    { label: "snake_case", value: toSnakeCase(text) },
    { label: "kebab-case (URL Slug)", value: toKebabCase(text) },
    { label: "CONSTANT_CASE", value: toConstantCase(text) },
    { label: "aLtErNaTiNg cAsE", value: toAlternatingCase(text) },
  ];

  const handleReset = () => {
    setText("");
  };

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lineCount = text ? text.split("\n").length : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ToolPageHeader
        title="Case Converter & URL Slugify"
        description="Transform text into UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, and URL slugs instantly. Free online text converter."
        icon={Type}
      />

      {/* Main Input Textarea */}
      <GlassCard>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Input Text</CardTitle>
            <CardDescription>Type or paste your text to convert instantly</CardDescription>
          </div>
          <div className="flex gap-2">
            <CopyButton getText={text} />
            <ResetButton onClick={handleReset} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <TextareaField
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste text here..."
            rows={5}
          />

          <div className="grid grid-cols-3 gap-4 pt-2">
            <Stat label="Total Characters" value={charCount.toLocaleString()} />
            <Stat label="Total Words" value={wordCount.toLocaleString()} />
            <Stat label="Line Count" value={lineCount.toLocaleString()} />
          </div>
        </CardContent>
      </GlassCard>

      {/* Transformed Case Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formats.map((fmt) => (
          <GlassCard key={fmt.label}>
            <CardHeader className="flex flex-row items-center justify-between py-3 px-6 border-b">
              <span className="text-sm font-semibold">{fmt.label}</span>
              <CopyButton getText={fmt.value} size="sm" />
            </CardHeader>
            <CardContent className="p-4">
              <div className="p-3 border rounded-lg bg-muted/20 font-mono text-xs max-h-32 overflow-y-auto break-all select-all">
                {fmt.value || <span className="text-muted-foreground italic">Empty string</span>}
              </div>
            </CardContent>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
