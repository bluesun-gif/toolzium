"use client";

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles } from "lucide-react";

// Model options — friendly labels, NO version numbers exposed.
// Values match the backend /api/ai/generate `model` param.
export const AI_MODELS = [
  { value: "gpt4o", label: "GPT-4o" },
  { value: "claude", label: "Claude" },
  { value: "gemini", label: "Gemini" },
  { value: "deepseek", label: "DeepSeek" },
] as const;

export type AIModelValue = (typeof AI_MODELS)[number]["value"];

interface ModelSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  label?: string;
}

export function ModelSelector({ value, onChange, className = "", label = "AI Model" }: ModelSelectorProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-primary" />
        {label}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-background border-border h-9 rounded-lg [&>span]:truncate text-left">
          <SelectValue placeholder="Select Model" />
        </SelectTrigger>
        <SelectContent>
          {AI_MODELS.map((m) => (
            <SelectItem key={m.value} value={m.value}>
              {m.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
