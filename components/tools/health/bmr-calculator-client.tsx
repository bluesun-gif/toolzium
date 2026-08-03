"use client";

import { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ResetButton } from "@/components/shared/action-buttons";
import { Calculator, Activity, Flame } from "lucide-react";

export function BmrCalculatorClient() {
  const [age, setAge] = useState<string>("25");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [isMetric, setIsMetric] = useState<boolean>(true);
  const [weight, setWeight] = useState<string>("70");
  const [heightCm, setHeightCm] = useState<string>("175");
  const [heightFt, setHeightFt] = useState<string>("5");
  const [heightIn, setHeightIn] = useState<string>("9");
  const [equation, setEquation] = useState<"mifflin" | "harris">("mifflin");

  const bmr = useMemo(() => {
    const ageNum = parseFloat(age);
    let weightKg = parseFloat(weight);
    let heightCmNum = parseFloat(heightCm);

    if (!isMetric) {
      weightKg = parseFloat(weight) * 0.453592;
      heightCmNum = (parseFloat(heightFt) * 12 + (parseFloat(heightIn) || 0)) * 2.54;
    }

    if (!ageNum || !weightKg || !heightCmNum) return null;

    if (equation === "mifflin") {
      if (gender === "male") {
        return 10 * weightKg + 6.25 * heightCmNum - 5 * ageNum + 5;
      } else {
        return 10 * weightKg + 6.25 * heightCmNum - 5 * ageNum - 161;
      }
    } else {
      if (gender === "male") {
        return 88.362 + 13.397 * weightKg + 4.799 * heightCmNum - 5.677 * ageNum;
      } else {
        return 447.593 + 9.247 * weightKg + 3.098 * heightCmNum - 4.33 * ageNum;
      }
    }
  }, [age, gender, isMetric, weight, heightCm, heightFt, heightIn, equation]);

  const reset = () => {
    setAge("25");
    setGender("male");
    setIsMetric(true);
    setWeight("70");
    setHeightCm("175");
    setHeightFt("5");
    setHeightIn("9");
    setEquation("mifflin");
  };

  const bmrValue = bmr ? Math.round(bmr) : 0;

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Calculator}
        title="BMR Calculator"
        description="Calculate your Basal Metabolic Rate and daily calorie needs."
        actions={<ResetButton onClick={reset} label="Reset" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Your Details</CardTitle>
            <CardDescription>Enter your physical details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Unit System</Label>
              <div className="flex items-center gap-2">
                <span className={`text-sm ${!isMetric ? "font-bold" : "text-muted-foreground"}`}>Imperial</span>
                <Switch checked={isMetric} onCheckedChange={setIsMetric} />
                <span className={`text-sm ${isMetric ? "font-bold" : "text-muted-foreground"}`}>Metric</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Age (years)</Label>
                <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} min="15" max="100" />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select value={gender} onValueChange={(v: "male" | "female") => setGender(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Weight ({isMetric ? "kg" : "lbs"})</Label>
              <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>

            {isMetric ? (
              <div className="space-y-2">
                <Label>Height (cm)</Label>
                <Input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Height (ft)</Label>
                  <Input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Height (in)</Label>
                  <Input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Equation</Label>
              <Select value={equation} onValueChange={(v: "mifflin" | "harris") => setEquation(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Equation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mifflin">Mifflin-St Jeor</SelectItem>
                  <SelectItem value="harris">Harris-Benedict</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Flame className="w-5 h-5 text-orange-500" /> BMR Result</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <div className="text-5xl font-bold text-primary">{bmrValue > 0 ? bmrValue : "---"}</div>
                <div className="text-muted-foreground mt-2">Calories / Day</div>
              </div>
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Activity className="w-5 h-5 text-blue-500" /> Daily Needs by Activity Level</CardTitle>
            </CardHeader>
            <CardContent>
              {bmrValue > 0 ? (
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Sedentary (Little/no exercise)</span>
                    <span>{Math.round(bmrValue * 1.2)} kcal</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Lightly Active (1-3 days/week)</span>
                    <span>{Math.round(bmrValue * 1.375)} kcal</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Moderately Active (3-5 days/week)</span>
                    <span>{Math.round(bmrValue * 1.55)} kcal</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Very Active (6-7 days/week)</span>
                    <span>{Math.round(bmrValue * 1.725)} kcal</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Extra Active (Physical job)</span>
                    <span>{Math.round(bmrValue * 1.9)} kcal</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  Enter your details to see calorie needs
                </div>
              )}
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
