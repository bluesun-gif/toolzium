"use client";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import InputField from "@/components/shared/form-fields/input-field";
import Stat from "@/components/shared/stat";
import { ResetButton, CopyButton } from "@/components/shared/action-buttons";
import { Percent, ArrowUpRight, ArrowDownRight, Tag } from "lucide-react";

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
    </div>
  );
}
