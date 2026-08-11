"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/shared/action-buttons";
import toast from "react-hot-toast";
import { Repeat, PenTool, Settings, Copy } from "lucide-react";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50";

export default function TextRepeaterClient() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(10);
  const [separator, setSeparator] = useState("newline");
  const [customSep, setCustomSep] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    if (!text) {
      toast.error("Please enter some text to repeat.");
      return;
    }
    if (count < 1 || count > 10000) {
      toast.error("Count must be between 1 and 10,000.");
      return;
    }

    let sep = "";
    if (separator === "newline") sep = "\n";
    else if (separator === "space") sep = " ";
    else if (separator === "comma") sep = ", ";
    else if (separator === "custom") sep = customSep;

    const arr = Array(count).fill(text);
    const result = arr.join(sep);
    setOutput(result);
    toast.success(`Generated ${count} repetitions`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <ToolPageHeader icon={Repeat} title="Text Repeater" description="Repeat any word, phrase, or paragraph multiple times with custom separators." />
      
      <Card className={cardClass}>
        <CardHeader className={headerClass}>
          <CardTitle className={titleClass}><PenTool className="w-4 h-4 text-primary" /> Configuration</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Text to Repeat</label>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g., Hello World"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Repeat Count (1-10000)</label>
              <Input
                type="number"
                min={1}
                max={10000}
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Separator</label>
              <select
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
                className="w-full rounded-lg border border-border/70 bg-background/80 p-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="newline">New Line</option>
                <option value="space">Space</option>
                <option value="comma">Comma</option>
                <option value="custom">Custom</option>
              </select>
            </div>
          </div>

          {separator === "custom" && (
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Custom Separator</label>
              <Input
                value={customSep}
                onChange={(e) => setCustomSep(e.target.value)}
                placeholder="e.g., | or ---"
              />
            </div>
          )}

          <Button onClick={handleGenerate} className="w-full">
            <Repeat className="w-4 h-4 mr-2" /> Generate Repeated Text
          </Button>
        </CardContent>
      </Card>

      {output && (
        <Card className={cardClass}>
          <CardHeader className={headerClass}>
            <CardTitle className={titleClass}><Copy className="w-4 h-4 text-primary" /> Output ({output.length} characters)</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 space-y-3">
            <textarea value={output} readOnly rows={10} className={textareaClass} />
            <div className="flex justify-end">
              <CopyButton getText={() => output} label="Copy All" />
            </div>
          </CardContent>
        </Card>
      )}

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Enter Phrase", description: "Type the word, sentence, or emoji string you want to duplicate.", icon: PenTool },
          { step: "02", title: "Set Parameters", description: "Choose how many times to repeat it and select the separator between instances.", icon: Settings },
          { step: "03", title: "Generate & Copy", description: "Click generate to build the string and copy it to your clipboard instantly.", icon: Copy },
        ]}
        badges={["100% Free", "Client-Side", "No Signup"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: Repeat, title: "High Volume", description: "Capable of generating up to 10,000 repetitions instantly without crashing your browser." },
          { icon: Settings, title: "Custom Separators", description: "Join your repeated text with newlines, spaces, commas, or any custom string you define." },
          { icon: PenTool, title: "Emoji Support", description: "Perfect for generating long strings of emojis for social media comments or spam prevention." },
          { icon: Copy, title: "One-Click Copy", description: "Immediately copy the massive generated text block to your clipboard for pasting anywhere." },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>A text repeater is a surprisingly versatile utility for developers, marketers, and everyday internet users. Developers often use it to generate dummy data, populate test databases, or create large payload strings to stress-test API endpoints and form validations. By repeating a specific JSON structure or CSV row hundreds of times, you can quickly simulate large datasets.</p>
          <p>Marketers and social media managers use text repeaters to create visual patterns or bypass character minimums on certain platforms. Repeating specific keywords or hashtags can also be used to format large blocks of text for visual impact in comment sections or forum posts. The ability to define custom separators means you can format the output as a comma-separated list, a bulleted list, or a continuous paragraph.</p>
          <p>For everyday use, it's the fastest way to type a long string of identical characters, like a divider line (e.g., repeating "-----" fifty times) or generating a block of placeholder text when Lorem Ipsum isn't specific enough for your layout mockups. Because the generation happens entirely in your browser, it is instantaneous and completely private.</p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "Will this crash my browser if I generate 10,000 lines?", answer: "Modern browsers can easily handle strings with millions of characters. However, pasting a massive string into a basic text editor like Notepad might cause a brief freeze." },
          { question: "Can I repeat multiple lines at once?", answer: "Yes. If you paste a multi-line paragraph into the input box, the entire block will be treated as a single unit and repeated according to your count." },
          { question: "Is there a limit to the custom separator?", answer: "You can use any string as a custom separator, including HTML tags, emojis, or long phrases. The only limit is your device's memory." },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/text/text-repeater" max={6} />
    </div>
  );
}
