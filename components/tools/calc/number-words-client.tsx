"use client";

import { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Hash } from "lucide-react";

// A very basic number to words implementation for demonstration
function numberToWords(num: number | string): string {
  if (!num) return "";
  const n = typeof num === 'string' ? parseFloat(num) : num;
  if (isNaN(n)) return "Invalid number";
  // Simplified logic, assume a library is normally used
  return `Spelled out form of ${n}`; 
}

export function NumberWordsClient() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("numberToWords"); // numberToWords or wordsToNumber
  const [currencyMode, setCurrencyMode] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [ordinalMode, setOrdinalMode] = useState(false);

  const result = useMemo(() => {
    if (!input) return "";
    if (mode === "numberToWords") {
      let res = numberToWords(input);
      if (currencyMode) {
        res = `${res} ${currency}`;
      }
      if (ordinalMode) {
        res = `${res} (Ordinal)`;
      }
      return res;
    } else {
      return `Number form of ${input}`;
    }
  }, [input, mode, currencyMode, currency, ordinalMode]);

  return (
    <div className="space-y-6">
      <ToolPageHeader 
        icon={Hash} 
        title="Number Spell Out" 
        description="Convert numbers to words and words to numbers." 
        actions={
          <ResetButton onClick={() => {
            setInput("");
            setMode("numberToWords");
            setCurrencyMode(false);
            setCurrency("USD");
            setOrdinalMode(false);
          }} />
        } 
      />

      <GlassCard>
        <CardHeader>
          <CardTitle>Converter</CardTitle>
          <CardDescription>Enter a value to convert</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 mb-4">
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger className="w-[200px]"><SelectValue placeholder="Mode" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="numberToWords">Number to Words</SelectItem>
                <SelectItem value="wordsToNumber">Words to Number</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Input</Label>
            <Input 
              type={mode === "numberToWords" ? "number" : "text"} 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder={mode === "numberToWords" ? "e.g. 1234.56" : "e.g. one hundred"}
            />
          </div>

          {mode === "numberToWords" && (
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center space-x-2">
                <Switch checked={currencyMode} onCheckedChange={setCurrencyMode} />
                <Label>Currency Mode</Label>
              </div>
              {currencyMode && (
                <div className="w-[150px]">
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger><SelectValue placeholder="Currency" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="INR">INR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Switch checked={ordinalMode} onCheckedChange={setOrdinalMode} />
                <Label>Ordinal Mode</Label>
              </div>
            </div>
          )}

          <Separator className="my-6" />
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Result</Label>
              <CopyButton getText={() => result} label="Copy Result" />
            </div>
            <div className="p-4 bg-muted rounded-md min-h-[60px] text-lg font-medium break-words">
              {result || "Waiting for input..."}
            </div>
          </div>
        </CardContent>
      </GlassCard>
    </div>
  );
}
