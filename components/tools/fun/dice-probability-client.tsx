"use client";

import { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResetButton } from "@/components/shared/action-buttons";
import { Separator } from "@/components/ui/separator";
import { Dices, BarChart3, Calculator, Percent } from "lucide-react";

export function DiceProbabilityClient() {
  const [numDice, setNumDice] = useState(2);
  const [sides, setSides] = useState(6);
  const [condition, setCondition] = useState("exact");
  const [targetVal, setTargetVal] = useState(7);
  const [targetValMax, setTargetValMax] = useState(8);

  const calculateDistribution = (n: number, s: number) => {
    let dp = new Array(n * s + 1).fill(0);
    dp[0] = 1;

    for (let i = 1; i <= n; i++) {
      const nextDp = new Array(n * s + 1).fill(0);
      for (let j = 1; j <= i * s; j++) {
        for (let k = 1; k <= s; k++) {
          if (j - k >= 0) {
            nextDp[j] += dp[j - k];
          }
        }
      }
      dp = nextDp;
    }
    return dp;
  };

  const distribution = useMemo(() => calculateDistribution(numDice, sides), [numDice, sides]);
  const totalOutcomes = Math.pow(sides, numDice);

  let favorableOutcomes = 0;
  if (condition === "exact") {
    favorableOutcomes = distribution[targetVal] || 0;
  } else if (condition === "at_least") {
    for (let i = targetVal; i < distribution.length; i++) {
      favorableOutcomes += distribution[i] || 0;
    }
  } else if (condition === "at_most") {
    for (let i = 0; i <= targetVal; i++) {
      favorableOutcomes += distribution[i] || 0;
    }
  } else if (condition === "between") {
    for (let i = targetVal; i <= targetValMax; i++) {
      favorableOutcomes += distribution[i] || 0;
    }
  }

  const probability = favorableOutcomes / totalOutcomes;
  
  const expectedValue = numDice * ((sides + 1) / 2);
  const variance = numDice * ((sides * sides - 1) / 12);
  const stdDev = Math.sqrt(variance);

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Dices}
        title="Dice Probability Calculator"
        description="Calculate probabilities for dice rolls. See the distribution of outcomes and odds."
        actions={
          <ResetButton onClick={() => {
            setNumDice(2);
            setSides(6);
            setCondition("exact");
            setTargetVal(7);
          }} label="Reset" />
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4 space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Number of Dice (1-10)</Label>
                <Input type="number" min="1" max="10" value={numDice} onChange={(e) => setNumDice(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))} />
              </div>
              <div className="space-y-2">
                <Label>Sides per Die</Label>
                <Select value={sides.toString()} onValueChange={(val) => setSides(parseInt(val))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[4, 6, 8, 10, 12, 20, 100].map((s) => (
                      <SelectItem key={s} value={s.toString()}>d{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Condition</Label>
                <Select value={condition} onValueChange={setCondition}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exact">Exact Sum</SelectItem>
                    <SelectItem value="at_least">At Least (≥)</SelectItem>
                    <SelectItem value="at_most">At Most (≤)</SelectItem>
                    <SelectItem value="between">Between (Inclusive)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Target Value</Label>
                <Input type="number" value={targetVal} onChange={(e) => setTargetVal(parseInt(e.target.value) || 0)} />
              </div>
              {condition === "between" && (
                <div className="space-y-2">
                  <Label>Max Target Value</Label>
                  <Input type="number" value={targetValMax} onChange={(e) => setTargetValMax(parseInt(e.target.value) || 0)} />
                </div>
              )}
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader>
              <CardTitle>Presets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="justify-start" onClick={() => { setNumDice(2); setSides(20); setCondition("at_least"); setTargetVal(15); }}>D&D Advantage (approx)</Button>
                <Button variant="outline" className="justify-start" onClick={() => { setNumDice(2); setSides(6); setCondition("exact"); setTargetVal(7); }}>Monopoly (2d6)</Button>
                <Button variant="outline" className="justify-start" onClick={() => { setNumDice(5); setSides(6); setCondition("at_least"); setTargetVal(15); }}>Yahtzee (5d6)</Button>
              </div>
            </CardContent>
          </GlassCard>
        </div>

        <div className="md:col-span-8 space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Probability Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="bg-primary/10 p-4 rounded-xl border border-primary/20 flex flex-col justify-center items-center">
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Probability
                  </div>
                  <div className="text-4xl font-bold text-primary">{((probability || 0) * 100).toFixed(2)}%</div>
                  <div className="text-xs mt-1 text-muted-foreground">{favorableOutcomes} / {totalOutcomes}</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 rounded bg-muted/50">
                    <span className="text-muted-foreground">Expected Value (Mean)</span>
                    <span className="font-medium">{expectedValue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-muted/50">
                    <span className="text-muted-foreground">Standard Deviation</span>
                    <span className="font-medium">{stdDev.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
