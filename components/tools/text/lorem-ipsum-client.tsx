"use client";

import { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import InputField from "@/components/shared/form-fields/input-field";
import TextareaField from "@/components/shared/form-fields/textarea-field";
import SwitchRow from "@/components/shared/form-fields/switch-row";
import Stat from "@/components/shared/stat";
import { ResetButton, CopyButton, ActionButton } from "@/components/shared/action-buttons";
import { Button } from "@/components/ui/button";
import { AlignLeft, RefreshCw, Copy } from "lucide-react";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do",
  "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim",
  "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut",
  "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit",
  "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "excepteur",
  "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum"
];

export default function LoremIpsumClient() {
  const [count, setCount] = useState<number>(5);
  const [unit, setUnit] = useState<"paragraphs" | "sentences" | "words" | "list">("paragraphs");
  const [startWithLorem, setStartWithLorem] = useState<boolean>(true);
  const [includeHtml, setIncludeHtml] = useState<boolean>(false);
  const [seed, setSeed] = useState<number>(1);

  const generatedText = useMemo(() => {
    let result = "";

    const getRandomWord = () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];

    const generateSentence = (minWords = 6, maxWords = 14) => {
      const len = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
      const words: string[] = [];
      for (let i = 0; i < len; i++) {
        words.push(getRandomWord());
      }
      let sentence = words.join(" ");
      return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
    };

    const generateParagraph = (minSentences = 3, maxSentences = 6) => {
      const len = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences;
      const sents: string[] = [];
      for (let i = 0; i < len; i++) {
        sents.push(generateSentence());
      }
      return sents.join(" ");
    };

    if (unit === "words") {
      const words: string[] = [];
      for (let i = 0; i < count; i++) {
        words.push(getRandomWord());
      }
      if (startWithLorem && words.length >= 5) {
        words[0] = "lorem";
        words[1] = "ipsum";
        words[2] = "dolor";
        words[3] = "sit";
        words[4] = "amet";
      }
      result = words.join(" ");
    } else if (unit === "sentences") {
      const sentences: string[] = [];
      for (let i = 0; i < count; i++) {
        sentences.push(generateSentence());
      }
      if (startWithLorem && sentences.length > 0) {
        sentences[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
      }
      result = sentences.join(" ");
    } else if (unit === "list") {
      const items: string[] = [];
      for (let i = 0; i < count; i++) {
        const itemText = generateSentence(4, 10);
        items.push(includeHtml ? `  <li>${itemText}</li>` : `• ${itemText}`);
      }
      result = includeHtml ? `<ul>\n${items.join("\n")}\n</ul>` : items.join("\n");
    } else {
      // Paragraphs
      const paras: string[] = [];
      for (let i = 0; i < count; i++) {
        let p = generateParagraph();
        if (i === 0 && startWithLorem) {
          p = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " + p;
        }
        paras.push(includeHtml ? `<p>${p}</p>` : p);
      }
      result = includeHtml ? paras.join("\n\n") : paras.join("\n\n");
    }

    return result;
  }, [count, unit, startWithLorem, includeHtml, seed]);

  const wordCount = generatedText.trim() ? generatedText.trim().split(/\s+/).length : 0;
  const charCount = generatedText.length;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ToolPageHeader
        title="Lorem Ipsum Generator"
        description="Generate custom placeholder dummy text for design mockups, wireframes, and layouts. Choose paragraphs, sentences, words, or lists with optional HTML tags."
        icon={AlignLeft}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Generator Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium">Type of Content</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "paragraphs", label: "Paragraphs" },
                    { id: "sentences", label: "Sentences" },
                    { id: "words", label: "Words" },
                    { id: "list", label: "Bullet List" },
                  ].map((item) => (
                    <Button
                      key={item.id}
                      type="button"
                      variant={unit === item.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setUnit(item.id as any)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Quantity ({unit})</span>
                  <span>{count}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <SwitchRow
                label="Start with 'Lorem ipsum...'"
                hint="Begin text with classic Latin phrase"
                checked={startWithLorem}
                onCheckedChange={setStartWithLorem}
              />

              <SwitchRow
                label="Include HTML Tags"
                hint="Wrap output with <p> or <ul><li> tags"
                checked={includeHtml}
                onCheckedChange={setIncludeHtml}
              />

              <div className="flex gap-3 pt-2">
                <ActionButton
                  icon={RefreshCw}
                  label="Regenerate Text"
                  onClick={() => setSeed((s) => s + 1)}
                  variant="default"
                  className="flex-1"
                />
              </div>
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <Stat label="Total Words" value={wordCount.toLocaleString()} />
                <Stat label="Total Characters" value={charCount.toLocaleString()} />
              </div>
            </CardContent>
          </GlassCard>
        </div>

        {/* Generated Result */}
        <div className="lg:col-span-7 space-y-6">
          <GlassCard className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
              <div>
                <CardTitle>Generated Text</CardTitle>
                <CardDescription>Instant copy-ready placeholder text</CardDescription>
              </div>
              <CopyButton getText={generatedText} label="Copy Text" />
            </CardHeader>
            <CardContent className="pt-6 flex-1 flex flex-col">
              <TextareaField
                value={generatedText}
                readOnly
                rows={16}
                className="font-sans text-sm flex-1 leading-relaxed"
              />
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
