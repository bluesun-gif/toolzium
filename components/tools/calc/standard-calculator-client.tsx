"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Delete } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
export default function StandardCalculatorClient() {
  const [display, setDisplay] = useState("0");
  const [evaluated, setEvaluated] = useState(false);
  const handleBtn = (val: string) => {
    if (val === "C") {
      setDisplay("0");
      setEvaluated(false);
      return;
    }
    if (val === "DEL") {
      setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : "0");
      return;
    }
    if (val === "=") {
      try {
        const expr = display.replace(/×/g, "*").replace(/÷/g, "/");
        if (/[^0-9+\-*/.()]/.test(expr)) throw new Error("Invalid");
        const res = Function(`"use strict"; return (${expr})`)();
        setDisplay(String(res));
        setEvaluated(true);
      } catch {
        setDisplay("Error");
        toast.error("Invalid expression");
      }
      return;
    }
    if (val === "+/-") {
      if (!isNaN(parseFloat(display)) && isFinite(parseFloat(display))) {
        setDisplay(String(parseFloat(display) * -1));
      }
      return;
    }
    if (evaluated && !isNaN(val as any)) {
      setDisplay(val);
      setEvaluated(false);
    } else {
      setDisplay(prev => prev === "0" && val !== "." ? val : prev + val);
    }
  };
  const buttons = ["C", "DEL", "+/-", "÷", "7", "8", "9", "×", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="];
  return <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Calculator} title="Standard Calculator" description="A clean, simple 4-function calculator for everyday math tasks." />
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Display</CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-4">
 <div className="p-6 rounded-xl bg-background text-right min-h-[80px] flex items-center justify-end overflow-x-auto">
 <span className="text-primary-foreground text-4xl font-bold font-mono whitespace-nowrap">{display}</span>
 </div>
 
 <div className="grid grid-cols-4 gap-3">
 {buttons.map(btn => {
              let className = "h-14 rounded-xl font-semibold text-lg transition-colors";
              if (btn === "=") className += "bg-primary text-primary-foreground hover:bg-primary/90 col-span-2";else if (btn === "C" || btn === "DEL") className += "bg-destructive/20 text-destructive hover:bg-destructive/30";else if (["+", "-", "×", "÷", "+/-"].includes(btn)) className += "bg-muted hover:bg-muted/80 text-foreground";else className += "bg-card border border-border/50 hover:bg-muted/50 text-foreground";
              return <Button key={btn} variant="ghost" className={className} onClick={() => handleBtn(btn)}>
 {btn === "DEL" ? <Delete className="w-5 h-5" /> : btn}
 </Button>;
            })}
 </div>
 </CardContent>
 </GlassCard>

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Input Numbers",
        description: "Use the numeric keypad to enter your first value.",
        icon: Calculator
      }, {
        step: "02",
        title: "Select Operator",
        description: "Choose addition, subtraction, multiplication, or division.",
        icon: Calculator
      }, {
        step: "03",
        title: "Calculate",
        description: "Enter the second value and press equals to see the result.",
        icon: Calculator
      }]} badges={["100% Free", "Client-Side", "No Signup"]} />

 <ToolFeatureGuides features={[{
        icon: Calculator,
        title: "Four Functions",
        description: "Supports standard addition, subtraction, multiplication, and division."
      }, {
        icon: Calculator,
        title: "Error Handling",
        description: "Safely catches invalid mathematical expressions and prevents browser crashes."
      }, {
        icon: Calculator,
        title: "Sign Toggle",
        description: "Quickly switch between positive and negative numbers with the +/- button."
      }, {
        icon: Calculator,
        title: "Backspace Support",
        description: "Easily correct typos by deleting the last entered character."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Sometimes you don't need complex scientific formulas; you just need a reliable tool to add up groceries or split a bill. This standard calculator provides a familiar, no-nonsense interface for basic arithmetic.</p>
 <p>The interface is optimized for both mouse clicks and quick visual scanning, with distinct colors for operators, numbers, and utility functions like Clear and Delete.</p>
 <p>Like all Toolzium utilities, this calculator operates entirely offline in your browser, ensuring instantaneous results and total privacy.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "Does it support order of operations (PEMDAS)?",
        answer: "Yes, the underlying evaluation engine respects standard mathematical precedence, so multiplication and division are calculated before addition and subtraction."
      }, {
        question: "Can I use parentheses?",
        answer: "This standard interface does not include parenthesis buttons, but it evaluates standard linear expressions correctly. For complex nested equations, use our Scientific Calculator."
      }, {
        question: "Why does it say 'Error'?",
        answer: "An error occurs if you attempt to divide by zero or if the expression is mathematically invalid."
      }]} />

 <RelatedTools currentToolUrl="/tools/calc/standard-calculator" max={6} />
 </div></div>;
}