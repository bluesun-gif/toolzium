"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, DollarSign, Globe, Copy, Sparkles, Shield, Zap } from "lucide-react";
import { ResetButton } from "@/components/shared/action-buttons";
import { toast } from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
const MOCK_RATES: Record<string, Record<string, {
  rate: number;
  high30: number;
  low30: number;
}>> = {
  "USD": {
    "EUR": {
      rate: 0.92,
      high30: 0.94,
      low30: 0.90
    },
    "GBP": {
      rate: 0.79,
      high30: 0.81,
      low30: 0.77
    },
    "JPY": {
      rate: 150.2,
      high30: 151.5,
      low30: 147.8
    },
    "CAD": {
      rate: 1.35,
      high30: 1.37,
      low30: 1.34
    },
    "AUD": {
      rate: 1.52,
      high30: 1.55,
      low30: 1.49
    }
  },
  "EUR": {
    "USD": {
      rate: 1.09,
      high30: 1.11,
      low30: 1.06
    },
    "GBP": {
      rate: 0.86,
      high30: 0.88,
      low30: 0.84
    },
    "JPY": {
      rate: 163.5,
      high30: 165.0,
      low30: 161.2
    },
    "CAD": {
      rate: 1.47,
      high30: 1.49,
      low30: 1.45
    },
    "AUD": {
      rate: 1.65,
      high30: 1.68,
      low30: 1.62
    }
  },
  "GBP": {
    "USD": {
      rate: 1.27,
      high30: 1.29,
      low30: 1.25
    },
    "EUR": {
      rate: 1.16,
      high30: 1.18,
      low30: 1.14
    },
    "JPY": {
      rate: 190.1,
      high30: 192.0,
      low30: 188.5
    },
    "CAD": {
      rate: 1.71,
      high30: 1.73,
      low30: 1.69
    },
    "AUD": {
      rate: 1.92,
      high30: 1.95,
      low30: 1.89
    }
  },
  "AUD": {
    "USD": {
      rate: 0.66,
      high30: 0.68,
      low30: 0.65
    },
    "EUR": {
      rate: 0.61,
      high30: 0.63,
      low30: 0.60
    },
    "GBP": {
      rate: 0.52,
      high30: 0.54,
      low30: 0.51
    },
    "JPY": {
      rate: 98.8,
      high30: 100.5,
      low30: 97.2
    },
    "CAD": {
      rate: 0.89,
      high30: 0.91,
      low30: 0.88
    }
  },
  "CAD": {
    "USD": {
      rate: 0.74,
      high30: 0.76,
      low30: 0.73
    },
    "EUR": {
      rate: 0.68,
      high30: 0.70,
      low30: 0.67
    },
    "GBP": {
      rate: 0.58,
      high30: 0.60,
      low30: 0.57
    },
    "JPY": {
      rate: 111.3,
      high30: 113.0,
      low30: 110.0
    },
    "AUD": {
      rate: 1.12,
      high30: 1.14,
      low30: 1.10
    }
  }
};
const BASE_CURRENCIES = ["USD", "EUR", "GBP", "AUD", "CAD"];
const BUDGET_BRACKETS = [50, 100, 250, 500, 1000];
export function ExchangeTrendClient() {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  useEffect(() => {
    const saved = localStorage.getItem("exchange-trend-base");
    if (saved && BASE_CURRENCIES.includes(saved)) {
      setBaseCurrency(saved);
    }
  }, []);
  const handleBaseChange = (val: string) => {
    setBaseCurrency(val);
    localStorage.setItem("exchange-trend-base", val);
  };
  const handleReset = () => {
    setBaseCurrency("USD");
    localStorage.removeItem("exchange-trend-base");
    toast.success("Preferences reset");
  };
  const currentRates = MOCK_RATES[baseCurrency] || MOCK_RATES["USD"];
  return <div className={"space-y-6"}><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={TrendingUp} title="Currency Rate Trend Comparison Table" description="Compare travel currency exchange rates and historical trend rates." actions={<div className={"flex space-x-2"}>
 <ResetButton onClick={handleReset} label="Reset" />
 </div>} />
 
 <GlassCard>
 <CardHeader>
 <div className={"flex flex-col sm:flex-row sm:items-center justify-between gap-4"}>
 <div>
 <CardTitle className={"flex items-center gap-2"}><Globe className={"w-5 h-5"} /> Live Trends</CardTitle>
 <CardDescription>Select a base currency to view equivalent rates</CardDescription>
 </div>
 <div className={"w-full sm:w-48"}>
 <Select value={baseCurrency} onValueChange={handleBaseChange}>
 <SelectTrigger>
 <SelectValue placeholder="Base Currency" />
 </SelectTrigger>
 <SelectContent>
 {BASE_CURRENCIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 </div>
 </CardHeader>
 <CardContent>
 <div className={"overflow-x-auto"}>
 <table className={"w-full text-sm text-left"}>
 <thead className={"text-xs text-muted-foreground uppercase bg-secondary/50"}>
 <tr>
 <th className={"px-4 py-3"}>Target</th>
 <th className={"px-4 py-3"}>Rate ({baseCurrency} 1)</th>
 <th className={"px-4 py-3"}>30d High</th>
 <th className={"px-4 py-3"}>30d Low</th>
 {BUDGET_BRACKETS.map(b => <th key={b} className={"px-4 py-3"}>{baseCurrency} {b}</th>)}
 </tr>
 </thead>
 <tbody>
 {Object.entries(currentRates).map(([target, data]) => <tr key={target} className={"border-b border-border/50 hover:bg-secondary/20"}>
 <td className={"px-4 py-3 font-medium flex items-center gap-2"}>
 <DollarSign className={"w-4 h-4 text-muted-foreground"} /> {target}
 </td>
 <td className={"px-4 py-3 font-semibold"}>{data.rate.toFixed(4)}</td>
 <td className={"px-4 py-3 text-emerald-500"}>{data.high30.toFixed(4)}</td>
 <td className={"px-4 py-3 text-red-500"}>{data.low30.toFixed(4)}</td>
 {BUDGET_BRACKETS.map(b => <td key={b} className={"px-4 py-3"}>
 {(b * data.rate).toFixed(2)}
 </td>)}
 </tr>)}
 </tbody>
 </table>
 </div>
 <div className={"mt-4 text-xs text-muted-foreground"}>
 Note: Exchange rates are simulated for demonstration purposes. In a production environment, this would connect to a live currency API.
 </div>
 </CardContent>
 </GlassCard>
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Input Your Data",
        description: "Enter your information in the input field above and configure any options.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Process & Generate",
        description: "The tool processes your input instantly and displays the results.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy & Use",
        description: "Copy the output with one click and use it wherever you need.",
        icon: Copy
      }]} badges={["100% Free", "Instant Results", "Privacy-First"]} />

      <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Lightning Fast",
        description: "Get results in milliseconds with our optimized client-side processing engine."
      }, {
        icon: Shield,
        title: "Completely Private",
        description: "All processing happens in your browser. Your data never leaves your device."
      }, {
        icon: Zap,
        title: "No Signup Required",
        description: "Use this tool instantly without creating an account or providing any personal information."
      }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Currency Rate Trend Comparison Table?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Currency Rate Trend Comparison Table provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[{
        question: "Is this tool free to use?",
        answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits."
      }, {
        question: "Is my data secure?",
        answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server."
      }, {
        question: "Do I need to create an account?",
        answer: "No account or registration is required. Simply open the tool and start using it immediately."
      }]} />

      <RelatedTools currentToolUrl="/tools/travel/exchange-trend" max={6} />

    </div></div>;
}