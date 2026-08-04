"use client";

import React, { useState, useEffect } from "react";
import { Eraser } from "lucide-react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import TextareaField from "@/components/shared/form-fields/textarea-field";
import SwitchRow from "@/components/shared/form-fields/switch-row";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Separator } from "@/components/ui/separator";
import Stat from "@/components/shared/stat";

export default function WhitespaceRemoverClient() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  
  const [options, setOptions] = useState({
    removeLeading: true,
    removeTrailing: true,
    collapseSpaces: true,
    removeBlankLines: true,
    trimEachLine: true,
    removeAll: false,
  });

  const handleOptionChange = (key: keyof typeof options) => (checked: boolean) => {
    setOptions(prev => {
      const newOptions = { ...prev, [key]: checked };
      if (key === "removeAll" && checked) {
        newOptions.removeLeading = true;
        newOptions.removeTrailing = true;
        newOptions.collapseSpaces = true;
        newOptions.removeBlankLines = true;
        newOptions.trimEachLine = true;
      }
      return newOptions;
    });
  };

  useEffect(() => {
    let result = inputText;
    
    if (result) {
      if (options.removeAll) {
        result = result.replace(/\s+/g, "");
      } else {
        if (options.removeBlankLines) {
          result = result.replace(/^\s*[\r\n]/gm, "");
        }
        if (options.trimEachLine) {
          result = result.replace(/^[ \t]+|[ \t]+$/gm, "");
        }
        if (options.collapseSpaces) {
          // Collapse multiple spaces/tabs into a single space, but leave newlines alone
          result = result.replace(/[ \t]{2,}/g, " ");
        }
        if (options.removeLeading) {
          result = result.replace(/^\s+/, "");
        }
        if (options.removeTrailing) {
          result = result.replace(/\s+$/, "");
        }
      }
    }
    
    setOutputText(result);
  }, [inputText, options]);

  const handleReset = () => {
    setInputText("");
    setOptions({
      removeLeading: true,
      removeTrailing: true,
      collapseSpaces: true,
      removeBlankLines: true,
      trimEachLine: true,
      removeAll: false,
    });
  };

  const charsRemoved = Math.max(0, inputText.length - outputText.length);
  const linesBefore = inputText ? inputText.split("\n").length : 0;
  const linesAfter = outputText ? outputText.split("\n").length : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <ToolPageHeader
        title="Whitespace Remover"
        description="Remove extra spaces, blank lines, and unnecessary whitespace from your text."
        icon={Eraser}
      />

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Input Text</CardTitle>
              <CardDescription>Paste your text here to remove whitespace</CardDescription>
            </CardHeader>
            <CardContent>
              <TextareaField
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your text here..."
                rows={8}
                className="font-mono text-sm"
              />
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Output Text</CardTitle>
                <CardDescription>Your clean, trimmed text</CardDescription>
              </div>
              <div className="flex gap-2">
                <CopyButton getText={outputText} />
                <ResetButton onClick={handleReset} />
              </div>
            </CardHeader>
            <CardContent>
              <TextareaField
                value={outputText}
                readOnly
                placeholder="Cleaned text will appear here..."
                rows={8}
                className="font-mono text-sm bg-muted/50"
              />
            </CardContent>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SwitchRow
                id="removeLeading"
                label="Remove leading whitespace"
                checked={options.removeLeading}
                onCheckedChange={handleOptionChange("removeLeading")}
                disabled={options.removeAll}
              />
              <SwitchRow
                id="removeTrailing"
                label="Remove trailing whitespace"
                checked={options.removeTrailing}
                onCheckedChange={handleOptionChange("removeTrailing")}
                disabled={options.removeAll}
              />
              <SwitchRow
                id="trimEachLine"
                label="Trim each line"
                checked={options.trimEachLine}
                onCheckedChange={handleOptionChange("trimEachLine")}
                disabled={options.removeAll}
              />
              <SwitchRow
                id="collapseSpaces"
                label="Collapse multiple spaces"
                checked={options.collapseSpaces}
                onCheckedChange={handleOptionChange("collapseSpaces")}
                disabled={options.removeAll}
              />
              <SwitchRow
                id="removeBlankLines"
                label="Remove blank lines"
                checked={options.removeBlankLines}
                onCheckedChange={handleOptionChange("removeBlankLines")}
                disabled={options.removeAll}
              />
              <Separator />
              <SwitchRow
                id="removeAll"
                label="Remove ALL whitespace"
                checked={options.removeAll}
                onCheckedChange={handleOptionChange("removeAll")}
              />
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Stat
                  label="Chars Removed"
                  value={charsRemoved.toString()}
                />
                <Stat
                  label="Lines Changed"
                  value={linesBefore === linesAfter ? linesBefore.toString() : linesBefore + " → " + linesAfter}
                />
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
