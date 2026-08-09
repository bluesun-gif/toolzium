"use client";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import InputField from "@/components/shared/form-fields/input-field";
import Stat from "@/components/shared/stat";
import { ResetButton, CopyButton } from "@/components/shared/action-buttons";
import { Percent, ArrowUpRight, ArrowDownRight, Tag, TrendingUp, Calculator, BookOpen, Shield, Zap, Globe } from "lucide-react";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";

export default function PercentageCalculatorClient() {
  // Calc 1: What is X% of Y?
  const [c1X, setC1X] = useState<string>("15");
  const [c1Y, setC1Y] = useState<string>("250");

  // Calc 2: X is what percent of Y?
  const [c2X, setC2X] = useState<string>("45");
  const [c2Y, setC2Y] = useState<string>("300");

  // Calc 3: % Increase / Decrease from X to Y
  const [c3X, setC3X] = useState<string>("100");
  const [c3Y, setC3Y] = useState<string>("175");

  // Calc 4: Discount (Original Price & Discount %)
  const [c4Price, setC4Price] = useState<string>("120");
  const [c4Discount, setC4Discount] = useState<string>("20");

  // Calc 1 Result
  const num1X = parseFloat(c1X) || 0;
  const num1Y = parseFloat(c1Y) || 0;
  const res1 = (num1X / 100) * num1Y;

  // Calc 2 Result
  const num2X = parseFloat(c2X) || 0;
  const num2Y = parseFloat(c2Y) || 0;
  const res2 = num2Y !== 0 ? (num2X / num2Y) * 100 : 0;

  // Calc 3 Result
  const num3X = parseFloat(c3X) || 0;
  const num3Y = parseFloat(c3Y) || 0;
  const diff3 = num3Y - num3X;
  const pct3 = num3X !== 0 ? ((num3Y - num3X) / Math.abs(num3X)) * 100 : 0;

  // Calc 4 Result
  const price = parseFloat(c4Price) || 0;
  const discPct = parseFloat(c4Discount) || 0;
  const savings = (price * discPct) / 100;
  const finalPrice = price - savings;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ToolPageHeader
        title="Percentage Calculator"
        description="Free online percentage calculator. Solve percentage problems, percent difference, percentage increase/decrease, and discount savings instantly."
        icon={Percent}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Calc 1: What is X% of Y? */}
        <GlassCard>
          <CardHeader>
            <CardTitle>What is X% of Y?</CardTitle>
            <CardDescription>Calculate the percentage value of any number</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Percentage (X%)"
                type="number"
                value={c1X}
                onChange={(e) => setC1X(e.target.value)}
                placeholder="e.g. 15"
              />
              <InputField
                label="Of Value (Y)"
                type="number"
                value={c1Y}
                onChange={(e) => setC1Y(e.target.value)}
                placeholder="e.g. 250"
              />
            </div>
            <div className="p-4 border rounded-xl bg-muted/20 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Result</p>
                <p className="text-2xl font-bold text-primary">{res1.toLocaleString()}</p>
              </div>
              <CopyButton getText={res1.toString()} size="sm" />
            </div>
          </CardContent>
        </GlassCard>

        {/* Calc 2: X is what % of Y? */}
        <GlassCard>
          <CardHeader>
            <CardTitle>X is what % of Y?</CardTitle>
            <CardDescription>Find the percentage ratio between two numbers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Value (X)"
                type="number"
                value={c2X}
                onChange={(e) => setC2X(e.target.value)}
                placeholder="e.g. 45"
              />
              <InputField
                label="Total (Y)"
                type="number"
                value={c2Y}
                onChange={(e) => setC2Y(e.target.value)}
                placeholder="e.g. 300"
              />
            </div>
            <div className="p-4 border rounded-xl bg-muted/20 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Result</p>
                <p className="text-2xl font-bold text-primary">{res2.toFixed(2)}%</p>
              </div>
              <CopyButton getText={`${res2.toFixed(2)}%`} size="sm" />
            </div>
          </CardContent>
        </GlassCard>

        {/* Calc 3: Percentage Change */}
        <GlassCard>
          <CardHeader>
            <CardTitle>Percentage Increase / Decrease</CardTitle>
            <CardDescription>Calculate percent change from initial to final value</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="From Value (X)"
                type="number"
                value={c3X}
                onChange={(e) => setC3X(e.target.value)}
                placeholder="e.g. 100"
              />
              <InputField
                label="To Value (Y)"
                type="number"
                value={c3Y}
                onChange={(e) => setC3Y(e.target.value)}
                placeholder="e.g. 175"
              />
            </div>
            <div className="p-4 border rounded-xl bg-muted/20 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Percent Change</p>
                <p className={`text-2xl font-bold flex items-center gap-1 ${pct3 >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                  {pct3 >= 0 ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                  {Math.abs(pct3).toFixed(2)}% {pct3 >= 0 ? "Increase" : "Decrease"}
                </p>
              </div>
              <CopyButton getText={`${pct3 >= 0 ? "+" : ""}${pct3.toFixed(2)}%`} size="sm" />
            </div>
          </CardContent>
        </GlassCard>

        {/* Calc 4: Discount Calculator */}
        <GlassCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-primary" /> Discount & Sale Price
            </CardTitle>
            <CardDescription>Calculate final price after discount percentage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Original Price ($)"
                type="number"
                value={c4Price}
                onChange={(e) => setC4Price(e.target.value)}
                placeholder="e.g. 120"
              />
              <InputField
                label="Discount (% off)"
                type="number"
                value={c4Discount}
                onChange={(e) => setC4Discount(e.target.value)}
                placeholder="e.g. 20"
              />
            </div>
            <div className="p-4 border rounded-xl bg-muted/20 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Final Price (You save ${savings.toFixed(2)})</p>
                <p className="text-2xl font-bold text-emerald-500">${finalPrice.toFixed(2)}</p>
              </div>
              <CopyButton getText={`$${finalPrice.toFixed(2)}`} size="sm" />
            </div>
          </CardContent>
        </GlassCard>
      </div>

      {/* SECTION 3: HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Choose a Calculation Type",
            description: "Select from 4 modes: What is X% of Y, What percentage is X of Y, percentage change between two numbers, or discount finder.",
            icon: Calculator,
          },
          {
            step: "02",
            title: "Enter Your Numbers",
            description: "Type in the values. The result updates instantly as you type — no need to click a Calculate button. Decimal precision is handled automatically.",
            icon: Percent,
          },
          {
            step: "03",
            title: "Copy the Result",
            description: "Click the copy icon next to any result to copy it directly to your clipboard. Useful for pasting into spreadsheets, reports, or messages.",
            icon: BookOpen,
          },
        ]}
        badges={[
          "4 calculation modes",
          "Instant results",
          "No signup required",
        ]}
      />

      {/* SECTION 4: FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: Percent,
            title: "What is X% of Y?",
            description: "The most common percentage calculation. Enter a rate and a base value to find the actual amount. E.g., 15% of 250 = 37.50.",
          },
          {
            icon: ArrowUpRight,
            title: "Percentage of Total",
            description: "Find what percentage one number is of another. E.g., 37.5 is what % of 250? Answer: 15%. Essential for data analysis and reporting.",
          },
          {
            icon: TrendingUp,
            title: "Percentage Change",
            description: "Calculate the percentage increase or decrease between two values. Shows direction (increase/decrease) and the exact percentage change.",
          },
          {
            icon: Tag,
            title: "Discount & Sale Price Finder",
            description: "Enter an original price and discount percentage to instantly see the discount amount, final price, and how much you save.",
          },
          {
            icon: Calculator,
            title: "Instant Live Calculation",
            description: "Results update in real time as you type — no button clicks needed. Handles edge cases like 0%, 100%, and negative percentage changes.",
          },
          {
            icon: Shield,
            title: "Client-Side & Private",
            description: "All calculations run in your browser. Nothing is sent to a server. Works fully offline once the page has loaded.",
          },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">How Percentages Work — A Practical Reference Guide</h3>
          <p>
            A <strong>percentage</strong> is a number expressed as a fraction of 100. The word comes from the Latin
            <em>per centum</em> ("by the hundred"). Percentages are fundamental to finance, statistics, science,
            retail, and everyday decision-making. This guide covers the four core percentage operations you will
            encounter most often.
          </p>

          <h4 className="font-semibold">The 4 Core Percentage Formulas</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Question</th>
                  <th className="border p-2 text-left">Formula</th>
                  <th className="border p-2 text-left">Example</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["What is X% of Y?", "Result = (X / 100) × Y", "15% of 200 = 30"],
                  ["X is what % of Y?", "Result = (X / Y) × 100", "30 is 15% of 200"],
                  ["% increase from A to B", "Result = ((B − A) / A) × 100", "200→230 = +15%"],
                  ["% decrease from A to B", "Result = ((A − B) / A) × 100", "200→170 = −15%"],
                ].map(([q, f, ex]) => (
                  <tr key={q} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{q}</td>
                    <td className="border p-2 font-mono text-primary text-xs">{f}</td>
                    <td className="border p-2 text-muted-foreground text-xs">{ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold">Common Percentage Calculations by Industry</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Industry</th>
                  <th className="border p-2 text-left">Common Use</th>
                  <th className="border p-2 text-left">Formula Type</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Retail / E-commerce", "Discount price, savings amount", "X% of Y + Percentage change"],
                  ["Finance / Banking", "Interest calculation, loan rate", "X% of Y (simple/compound)"],
                  ["Data Analysis", "Growth rate, market share", "Percentage change, X is what % of Y"],
                  ["Health / Nutrition", "Daily value %, body fat %", "X is what % of Y"],
                  ["Tax / Government", "Tax amount, VAT/GST", "X% of Y (tax on price)"],
                  ["Education", "Grade %, pass mark", "X is what % of Y (score/total)"],
                ].map(([ind, use, formula]) => (
                  <tr key={ind} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{ind}</td>
                    <td className="border p-2 text-muted-foreground text-xs">{use}</td>
                    <td className="border p-2 text-xs">{formula}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold">Discount Calculator — How Retail Pricing Works</h4>
          <p>
            When a product is on sale, you need to know three things: the <strong>original price</strong>, the
            <strong>discount percentage</strong>, and the resulting <strong>final price</strong>. The math is:
            Discount Amount = Original Price × (Discount% ÷ 100); Final Price = Original Price − Discount Amount.
            For example, a ৳2,500 item at 20% off: discount = ৳500; final price = ৳2,000.
          </p>

          <h4 className="font-semibold">Percentage Change vs Percentage Points — Know the Difference</h4>
          <p>
            These are commonly confused. If interest rates rise from 4% to 5%, that is a <strong>1 percentage point</strong>
            increase — but a <strong>25% percentage change</strong> (because 1 is 25% of 4). In financial and political
            contexts, this distinction is critical. Always clarify which measure is being used.
          </p>

          <h4 className="font-semibold">Quick Reference: Common Percentage Equivalents</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
            {[
              ["10%", "= 1/10 = 0.1"],
              ["25%", "= 1/4 = 0.25"],
              ["33.3%", "≈ 1/3 = 0.333"],
              ["50%", "= 1/2 = 0.5"],
              ["66.7%", "≈ 2/3 = 0.667"],
              ["75%", "= 3/4 = 0.75"],
              ["100%", "= 1 = whole"],
              ["200%", "= 2 = double"],
            ].map(([pct, eq]) => (
              <div key={pct} className="flex flex-col items-center rounded-md border bg-muted/30 p-2">
                <span className="text-primary font-bold text-sm">{pct}</span>
                <span className="text-muted-foreground text-xs">{eq}</span>
              </div>
            ))}
          </div>
        </div>
      </ToolFeatureGuides>

      {/* SECTION 5: FAQ + RELATED TOOLS */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "How do I calculate what percentage X is of Y?",
            answer: "Divide X by Y and multiply by 100. Formula: (X ÷ Y) × 100. For example, 45 out of 60 = (45 ÷ 60) × 100 = 75%.",
          },
          {
            question: "What is the difference between percentage and percentage point?",
            answer: "A percentage point is an absolute difference between two percentages. If a rate goes from 10% to 15%, that is a 5 percentage point increase, but a 50% percentage change. The distinction is important in finance and statistics.",
          },
          {
            question: "How do I calculate percentage increase or decrease?",
            answer: "Percentage change = ((New Value − Old Value) ÷ Old Value) × 100. A positive result is an increase; a negative result is a decrease.",
          },
          {
            question: "How is a discount calculated?",
            answer: "Discount Amount = Original Price × (Discount Percentage ÷ 100). Final Price = Original Price − Discount Amount. For example, 20% off ৳1,500 = ৳300 discount, so final price = ৳1,200.",
          },
          {
            question: "Can I use this calculator offline?",
            answer: "Yes. All percentage calculations run entirely in your browser using JavaScript. No internet connection is required once the page has loaded.",
          },
        ]}
      />
      <RelatedTools currentToolUrl="/tools/calc/percentage-calculator" max={6} />
    </div>
  );
}
