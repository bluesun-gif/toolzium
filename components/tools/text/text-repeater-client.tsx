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
    )
}
