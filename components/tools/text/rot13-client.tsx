"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Shield, RefreshCw } from "lucide-react";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { Separator } from "@/components/ui/separator";

export function Rot13Client() {
  const [inputText, setInputText] = useState("");
  const [shiftAmount, setShiftAmount] = useState<number>(13);
  const [isBruteForce, setIsBruteForce] = useState(false);

  // Apply Caesar cipher with a specific shift
  const applyCaesar = useCallback((text: string, shift: number) => {
    return text
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          // Uppercase
          return String.fromCharCode(((code - 65 + shift) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
          // Lowercase
          return String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }
        return char; // Non-alphabetic characters remain unchanged
      })
      .join("");
  }, []);

  const outputText = useMemo(() => {
    if (isBruteForce) return "";
    return applyCaesar(inputText, shiftAmount);
  }, [inputText, shiftAmount, isBruteForce, applyCaesar]);

  const bruteForceResults = useMemo(() => {
    if (!isBruteForce || !inputText) return [];
    const results = [];
    for (let i = 1; i < 26; i++) {
      results.push({ shift: i, text: applyCaesar(inputText, i) });
    }
    return results;
  }, [inputText, isBruteForce, applyCaesar]);

  const frequencyAnalysis = useMemo(() => {
    if (!inputText) return [];
    const counts: Record<string, number> = {};
    let totalAlpha = 0;
    
    for (const char of inputText.toLowerCase()) {
      if (/[a-z]/.test(char)) {
        counts[char] = (counts[char] || 0) + 1;
        totalAlpha++;
      }
    }
    
    if (totalAlpha === 0) return [];
    
    return Object.entries(counts)
      .map(([char, count]) => ({
        char,
        count,
        percentage: ((count / totalAlpha) * 100).toFixed(1)
      }))
      .sort((a, b) => b.count - a.count);
  }, [inputText]);

  const handleReset = () => {
    setInputText("");
    setShiftAmount(13);
    setIsBruteForce(false);
  };

  return (
    <div className="w-full">
      <ToolPageHeader
        title="ROT13 / Caesar Cipher"
        description="Encode and decode text using ROT13 or a custom Caesar cipher shift. Includes brute-force mode and frequency analysis."
        icon={Shield}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Input Text</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to encode or decode..."
                className="w-full min-h-[200px] p-4 rounded-md border border-input bg-background resize-y"
              />
              
              <div className="mt-4 flex flex-wrap gap-4 items-center">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium mb-2">
                    Shift Amount: {shiftAmount}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    value={shiftAmount}
                    onChange={(e) => setShiftAmount(Number(e.target.value))}
                    disabled={isBruteForce}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1</span>
                    <span>13 (ROT13)</span>
                    <span>25</span>
                  </div>
                </div>
                
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setShiftAmount(13);
                      setIsBruteForce(false);
                    }}
                    className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                      shiftAmount === 13 && !isBruteForce
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background hover:bg-muted"
                    }`}
                  >
                    ROT13
                  </button>
                  <button
                    onClick={() => setIsBruteForce(!isBruteForce)}
                    className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                      isBruteForce
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background hover:bg-muted"
                    }`}
                  >
                    Brute Force
                  </button>
                  <ResetButton onClick={handleReset} />
                </div>
              </div>
            </CardContent>
          </GlassCard>

          {frequencyAnalysis.length > 0 && (
            <GlassCard>
              <CardHeader>
                <CardTitle>Character Frequency Analysis (Input)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {frequencyAnalysis.map(({ char, count, percentage }) => (
                    <div
                      key={char}
                      className="flex flex-col items-center p-2 rounded-md bg-muted min-w-[3rem]"
                    >
                      <span className="text-lg font-bold uppercase">{char}</span>
                      <span className="text-xs">{count}</span>
                      <span className="text-[10px] text-muted-foreground">{percentage}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </GlassCard>
          )}
        </div>

        <div className="space-y-6">
          {!isBruteForce ? (
            <GlassCard>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Result (Shift +{shiftAmount})</CardTitle>
                {outputText && <CopyButton getText={() => outputText} />}
              </CardHeader>
              <CardContent>
                <div className="w-full min-h-[200px] p-4 rounded-md border border-input bg-muted whitespace-pre-wrap break-words">
                  {outputText || <span className="text-muted-foreground">Output will appear here...</span>}
                </div>
                
                <div className="mt-4 p-4 rounded-md bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900">
                  <h4 className="text-sm font-semibold mb-1">How to reverse this?</h4>
                  <p className="text-sm text-muted-foreground">
                    To decode this text, {shiftAmount === 13 ? "apply ROT13 again." : `apply a shift of ${26 - shiftAmount}.`}
                  </p>
                </div>
              </CardContent>
            </GlassCard>
          ) : (
            <GlassCard>
              <CardHeader>
                <CardTitle>Brute Force Results (All Shifts)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {bruteForceResults.length > 0 ? (
                    bruteForceResults.map(({ shift, text }) => (
                      <div key={shift} className="p-3 rounded-md border border-input bg-background">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-sm">Shift +{shift} {shift === 13 && "(ROT13)"}</span>
                          <CopyButton getText={() => text} size="sm" />
                        </div>
                        <div className="whitespace-pre-wrap break-words text-sm bg-muted p-2 rounded">
                          {text}
                        </div>
                      </div>
                    ))
                  ) : (
                    <span className="text-muted-foreground">Enter text to see all possible shifts...</span>
                  )}
                </div>
              </CardContent>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
