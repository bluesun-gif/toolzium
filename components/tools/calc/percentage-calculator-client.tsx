"use client";

import { ToolBackground } from"@/components/shared/tool-background";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Percent, Copy, Calculator } from "lucide-react";
import { CopyButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
type Mode = "percent-of" | "what-percent" | "percent-change";
export default function PercentageCalculatorClient() {
  const [mode, setMode] = useState<Mode>("percent-of");
  const [value1, setValue1] = useState<number>(0);
  const [value2, setValue2] = useState<number>(0);
  const result = useMemo(() => {
    switch (mode) {
      case "percent-of":
        return value1 && value2 ? value1 / 100 * value2 : null;
      case "what-percent":
        return value1 && value2 ? value1 / value2 * 100 : null;
      case "percent-change":
        return value1 && value2 !== 0 ? (value2 - value1) / Math.abs(value1) * 100 : null;
      default:
        return null;
    }
  }, [mode, value1, value2]);
  const modeLabels = {
    "percent-of": "What is X% of Y?",
    "what-percent": "X is what % of Y?",
    "percent-change": "% change from X to Y"
  };
  const inputLabels = {
    "percent-of": {
      v1: "Percentage (%)",
      v2: "Of Value"
    },
    "what-percent": {
      v1: "Value",
      v2: "Total"
    },
    "percent-change": {
      v1: "Original Value",
      v2: "New Value"
    }
  };
  const formatResult = () => {
    if (result === null) return "—";
    if (mode === "percent-of") return result.toFixed(2);
    return `${result.toFixed(2)}%`;
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Percent} title="Percentage Calculator" description="Calculate percentages, percentage changes, and find what percent one number is of another." />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Percent className="w-4 h-4 text-primary" /> Calculation Mode
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <div className="flex gap-2 flex-wrap">
 {(Object.keys(modeLabels) as Mode[]).map(m => <Button key={m} onClick={() => {
              setMode(m);
              setValue1(0);
              setValue2(0);
            }} className={cn(`px-4 py-2 text-sm rounded-lg transition-colors ${mode === m ? "bg-primary text-primary-foreground" : "bg-muted/40 hover:bg-muted/60"}`)}>
 {modeLabels[m]}
 </Button>)}
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="text-xs font-medium text-muted-foreground mb-2 block">
 {inputLabels[mode].v1}
 </label>
 <Input type="number" value={value1 || ""} onChange={e => setValue1(Number(e.target.value))} placeholder="Enter value" />
 </div>
 <div>
 <label className="text-xs font-medium text-muted-foreground mb-2 block">
 {inputLabels[mode].v2}
 </label>
 <Input type="number" value={value2 || ""} onChange={e => setValue2(Number(e.target.value))} placeholder="Enter value" />
 </div>
 </div>

 {result !== null && <div className="p-6 bg-primary/10 border border-primary/30 rounded-lg text-center">
 <div className="text-sm text-muted-foreground mb-2">Result</div>
 <div className="text-4xl font-bold">{formatResult()}</div>
 <div className="mt-3">
 <CopyButton getText={() => formatResult()} label="Copy Result" />
 </div>
 </div>}
 </CardContent>
 </GlassCard>

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Select Mode",
        description: "Choose the type of percentage calculation you need.",
        icon: Percent
      }, {
        step: "02",
        title: "Enter Values",
        description: "Input the numbers for your calculation.",
        icon: Percent
      }, {
        step: "03",
        title: "View Result",
        description: "Get your answer instantly with the option to copy it.",
        icon: Copy
      }]} badges={["100% Free", "Client-Side", "Instant"]} />

 <ToolFeatureGuides features={[{
        icon: Percent,
        title: "Three Calculation Modes",
        description: "Find X% of Y, what % X is of Y, or percentage change between values."
      }, {
        icon: Copy,
        title: "Instant Results",
        description: "Calculations update in real-time as you type your values."
      }, {
        icon: Percent,
        title: "Clear Labels",
        description: "Input fields are clearly labeled based on your selected calculation mode."
      }, {
        icon: Copy,
        title: "Copy Functionality",
        description: "Copy results with one click for use in documents or spreadsheets."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Percentage calculations are fundamental to everyday life, from calculating tips and discounts to analyzing financial data and statistical changes. This calculator provides three essential modes to handle the most common percentage problems you'll encounter.</p>
 <p>The"What is X% of Y?"mode finds a percentage of a value — useful for calculating sales tax, tips, or discounts. For example, 15% of $200 equals $30. The"X is what % of Y?"mode determines what percentage one number represents of another — perfect for understanding proportions like"45 is what percent of 180?"(answer: 25%).</p>
 <p>The percentage change mode calculates growth or decline between two values, essential for tracking stock performance, price changes, or progress metrics. A change from 50 to 75 represents a 50% increase, while a change from 100 to 80 is a 20% decrease. This tool handles both positive and negative changes, making it versatile for financial analysis, business metrics, and academic calculations.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "How do I calculate a tip?",
        answer: "Use 'What is X% of Y?' mode. Enter the tip percentage (e.g., 15) and the bill amount to get the tip value."
      }, {
        question: "Can I calculate percentage decrease?",
        answer: "Yes, the percentage change mode handles both increases and decreases. A negative result indicates a decrease."
      }, {
        question: "What if I divide by zero?",
        answer: "The calculator prevents division by zero errors and will show '—' for invalid calculations."
      }]} />
    </div>
    </div>
);
}
