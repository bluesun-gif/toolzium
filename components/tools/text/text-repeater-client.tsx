"use client"

import React, { useState, useEffect } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CopyButton, ResetButton } from "@/components/shared/action-buttons"
import TextareaField from "@/components/shared/form-fields/textarea-field"
import InputField from "@/components/shared/form-fields/input-field"
import SwitchRow from "@/components/shared/form-fields/switch-row"
import Stat from "@/components/shared/stat"

import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Repeat, Copy, Settings2, Hash, AlignLeft, FileText } from "lucide-react";

export default function TextRepeaterClient() {
    const [text, setText] = useState("Repeat this text");
    const [count, setCount] = useState<number | "">(3);
    const [separatorType, setSeparatorType] = useState("newline");
    const [customSeparator, setCustomSeparator] = useState("");
    const [addLineNumbers, setAddLineNumbers] = useState(false);
    const [output, setOutput] = useState("");

    useEffect(() => {
        if (!text) {
            setOutput("");
            return;
        }

        let sep = "";
        if (separatorType === "newline") sep = "\n";
        else if (separatorType === "space") sep = " ";
        else if (separatorType === "comma") sep = ", ";
        else if (separatorType === "custom") sep = customSeparator;

        const parsedCount = typeof count === "number" ? count : 1;
        const limitCount = Math.min(Math.max(1, parsedCount), 10000);
        
        let newOutput = "";
        for (let i = 0; i < limitCount; i++) {
            let currentText = text;
            if (addLineNumbers) {
                currentText = (i + 1) + ". " + currentText;
            }
            newOutput += currentText;
            if (i < limitCount - 1) {
                newOutput += sep;
            }
        }
        setOutput(newOutput);
    }, [text, count, separatorType, customSeparator, addLineNumbers]);

    const handleReset = () => {
        setText("");
        setCount(3);
        setSeparatorType("newline");
        setCustomSeparator("");
        setAddLineNumbers(false);
    };

    const charCount = output.length;
    const lineCount = output.length > 0 ? output.split("\n").length : 0;

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
                <GlassCard>
                    <CardHeader>
                        <CardTitle>Configuration</CardTitle>
                        <CardDescription>Set the text and how you want it repeated</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <TextareaField
                            label="Text to Repeat"
                            placeholder="Enter text here..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            rows={4}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                                label="Repeat Count (Max: 10,000)"
                                type="number"
                                min={1}
                                max={10000}
                                value={count}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setCount(val === "" ? "" : Number(val));
                                }}
                            />
                            
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Separator</label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={separatorType}
                                    onChange={(e) => setSeparatorType(e.target.value)}
                                >
                                    <option value="newline">New Line</option>
                                    <option value="space">Space</option>
                                    <option value="comma">Comma</option>
                                    <option value="none">None</option>
                                    <option value="custom">Custom...</option>
                                </select>
                            </div>
                        </div>

                        {separatorType === "custom" && (
                            <InputField
                                label="Custom Separator"
                                placeholder="Enter custom separator..."
                                value={customSeparator}
                                onChange={(e) => setCustomSeparator(e.target.value)}
                            />
                        )}

                        <SwitchRow
                            label="Add Line Numbers"
                            hint="Prefix each repetition with its number"
                            checked={addLineNumbers}
                            onCheckedChange={setAddLineNumbers}
                        />
                    </CardContent>
                </GlassCard>
            </div>

            <div className="space-y-6">
                <GlassCard>
                    <CardHeader>
                        <CardTitle>Output</CardTitle>
                        <CardDescription>Your repeated text preview</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <TextareaField
                            label="Preview"
                            value={output}
                            readOnly
                            rows={10}
                            className="font-mono text-sm"
                        />
                        
                        <div className="flex flex-wrap gap-2">
                            <CopyButton getText={output} />
                            <ResetButton onClick={handleReset} />
                        </div>

                        <Separator />

                        <div className="flex gap-6">
                            <Stat label="Characters" value={charCount} />
                            <Stat label="Lines" value={lineCount} />
                        </div>
                    </CardContent>
                </GlassCard>
            </div>
            </div>

            {/* SECTION 3: HOW IT WORKS */}
            <ToolHowItWorks
              steps={[
                { step: "01", title: "Enter Your Text", description: "Type or paste the text, word, phrase, or character you want to repeat. Can be a single character, a word, a sentence, or multiple lines.", icon: FileText },
                { step: "02", title: "Set Repeat Options", description: "Choose how many times to repeat (1-10,000), the separator between repetitions (newline, comma, space, custom), and whether to add line numbers.", icon: Settings2 },
                { step: "03", title: "Copy the Result", description: "See the repeated text instantly in the output area. Copy all with one click or download as a text file for use in spreadsheets, code, or test data.", icon: Copy },
              ]}
              badges={["Up to 10,000 repeats", "Custom separator", "Instant output"]}
            />

            {/* SECTION 4: FEATURE GUIDES */}
            <ToolFeatureGuides
              features={[
                { icon: Repeat, title: "High-Volume Repetition", description: "Repeat text up to 10,000 times in milliseconds. Output appears instantly regardless of repeat count or text length." },
                { icon: Settings2, title: "Flexible Separators", description: "Choose newline, comma, space, tab, pipe, or any custom character as the separator between each repetition." },
                { icon: Hash, title: "Line Numbers", description: "Optionally add line numbers (1., 2., 3...) to each repeated item for numbered lists and structured output." },
                { icon: AlignLeft, title: "Multi-Line Support", description: "Repeat entire paragraphs or multi-line blocks. The entire input block is repeated as a unit with separator between repetitions." },
                { icon: Copy, title: "One-Click Copy", description: "Copy the entire repeated output to clipboard with one click or download as a .txt file for large outputs." },
                { icon: FileText, title: "Private and Client-Side", description: "All text processing happens in your browser. Your text is never sent to any server." },
              ]}
            >
              <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
                <h3 className="text-lg font-semibold">Text Repeater Use Cases</h3>
                <p>A text repeater is useful for generating test data, filling UI mockups, stress testing inputs, creating numbered lists, and language learning exercises.</p>
                <h4 className="font-semibold">Common Use Cases</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead><tr className="bg-muted/50"><th className="border p-2 text-left">Use Case</th><th className="border p-2 text-left">Example</th></tr></thead>
                    <tbody>
                      {[["Test data generation","Repeat 'test-user-' 100 times"],["UI mockup fill","Repeat a product card template"],["QA stress testing","Repeat 'A' 10,000 times to test max input"],["CSV data fill","Repeat a category value for many rows"],["Language learning","Repeat a vocabulary word 50 times"]].map(([use, ex]) => (
                        <tr key={use} className="odd:bg-muted/20"><td className="border p-2 font-medium text-xs">{use}</td><td className="border p-2 text-muted-foreground text-xs">{ex}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </ToolFeatureGuides>

            {/* SECTION 5: FAQ + RELATED TOOLS */}
            <ToolFaqAccordion
              faqs={[
                { question: "What is a text repeater used for?", answer: "Text repeaters are used to quickly generate repeated text for test data generation, UI mockups, stress testing inputs (repeat a character 10,000 times to test field length limits), creating lists, and language learning." },
                { question: "Can I repeat multiple lines of text?", answer: "Yes. Enter your multi-line text and the entire block is repeated as a unit. The separator is inserted between each full repetition of the block." },
                { question: "What is the maximum number of repetitions?", answer: "This tool supports up to 10,000 repetitions. For very large outputs, the download button saves the result as a .txt file to prevent browser performance issues." },
                { question: "How do I create a numbered list?", answer: "Enable the 'Add line numbers' option. Each repeated item will be prefixed with its sequence number (1., 2., 3...). Set the separator to newline for a numbered list format." },
                { question: "Can I use a custom separator?", answer: "Yes. Select 'Custom' separator and type any character or string to use between each repetition - including multi-character separators, HTML tags, or any other text." },
              ]}
            />
            <RelatedTools currentToolUrl="/tools/text/text-repeater" max={6} />
        </div>
    )
}
