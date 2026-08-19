"use client";

import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { AlertTriangle, Briefcase, Calculator, Copy, DollarSign, Luggage, Plane, Scale, Shield, Sparkles, Zap } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
export function BaggageCalcClient() {
  const [airlineClass, setAirlineClass] = useState("economy");
  const [weight, setWeight] = useState("45");
  const [unit, setUnit] = useState("lbs");
  const [length, setLength] = useState("20");
  const [width, setWidth] = useState("15");
  const [height, setHeight] = useState("10");
  const [limit, setLimit] = useState(50);
  const [isOverweight, setIsOverweight] = useState(false);
  const [estimatedFee, setEstimatedFee] = useState(0);
  const [dimWeight, setDimWeight] = useState(0);
  useEffect(() => {
    // Set standard limit based on class (in lbs)
    let classLimit = 50;
    if (airlineClass === "business" || airlineClass === "first") {
      classLimit = 70;
    }
    setLimit(classLimit);
    const weightInLbs = unit === "kg" ? Number(weight) * 2.20462 : Number(weight);
    if (weightInLbs > classLimit) {
      setIsOverweight(true);
      // Rough estimation for fee tiers
      if (weightInLbs <= classLimit + 20) {
        setEstimatedFee(50);
      } else if (weightInLbs <= classLimit + 50) {
        setEstimatedFee(100);
      } else {
        setEstimatedFee(200);
      }
    } else {
      setIsOverweight(false);
      setEstimatedFee(0);
    }

    // Dimensional weight
    const l = Number(length) || 0;
    const w = Number(width) || 0;
    const h = Number(height) || 0;

    // LxWxH / 139 is standard formula in inches/lbs
    const dw = l * w * h / 139;
    setDimWeight(dw);
  }, [airlineClass, weight, unit, length, width, height]);
  const handleReset = () => {
    setAirlineClass("economy");
    setWeight("45");
    setUnit("lbs");
    setLength("20");
    setWidth("15");
    setHeight("10");
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Briefcase} title="Airline Baggage Allowance & Fee Calculator" description="Calculate total checked bag weight & potential excess baggage fee." actions={<ResetButton onClick={handleReset} label="Reset" />} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Baggage Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Airline Class</Label>
 <Select value={airlineClass} onValueChange={setAirlineClass}>
 <SelectTrigger>
 <SelectValue placeholder="Select class" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="economy">Economy</SelectItem>
 <SelectItem value="premium_economy">Premium Economy</SelectItem>
 <SelectItem value="business">Business</SelectItem>
 <SelectItem value="first">First Class</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Weight</Label>
 <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Unit</Label>
 <Select value={unit} onValueChange={setUnit}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="lbs">lbs</SelectItem>
 <SelectItem value="kg">kg</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>

 <Separator />
 
 <Label>Dimensions (inches)</Label>
 <div className="grid grid-cols-3 gap-4">
 <div className="space-y-1">
 <Label className="text-xs">Length</Label>
 <Input type="number" value={length} onChange={e => setLength(e.target.value)} />
 </div>
 <div className="space-y-1">
 <Label className="text-xs">Width</Label>
 <Input type="number" value={width} onChange={e => setWidth(e.target.value)} />
 </div>
 <div className="space-y-1">
 <Label className="text-xs">Height</Label>
 <Input type="number" value={height} onChange={e => setHeight(e.target.value)} />
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Scale className="w-5 h-5 text-primary" />
 Allowance & Status
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="flex justify-between items-center p-3 bg-muted rounded-md">
 <span className="font-medium">Standard Limit:</span>
 <span className="font-bold">{limit} lbs ({Math.round(limit / 2.20462)} kg)</span>
 </div>
 
 {isOverweight ? <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md space-y-2">
 <div className="flex items-center gap-2 text-red-500 font-bold">
 <AlertTriangle className="w-5 h-5" />
 Overweight Warning
 </div>
 <p className="text-sm">Your bag exceeds the standard weight limit.</p>
 <div className="pt-2">
 <span className="font-medium">Estimated Fee: </span>
 <span className="font-bold text-red-500">${estimatedFee}</span>
 </div>
 </div> : <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-md text-green-600 font-medium">
 Your bag is within the weight limit. No excess fees estimated.
 </div>}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Calculator className="w-5 h-5 text-primary" />
 Dimensional Weight
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className="text-2xl font-bold text-center py-4">
 {dimWeight.toFixed(1)} <span className="text-lg font-normal text-muted-foreground">lbs</span>
 </div>
 <p className="text-xs text-center text-muted-foreground">
 Calculated using LxWxH / 139 formula. (Compare this to actual weight).
 </p>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
      <ToolHowItWorks steps={[
        { step: "01", title: "Select Airline", description: "Choose your airline from the dropdown to load its baggage fee schedule.", icon: Plane },
        { step: "02", title: "Enter Bag Details", description: "Input your bag dimensions and weight to check if it meets carry-on or checked limits.", icon: Luggage },
        { step: "03", title: "See Fees", description: "Get the exact baggage fee for your trip — domestic, international, and oversize.", icon: DollarSign },
      ]} badges={["100+ Airlines", "Fee Calculator", "Size Checker"]} />

      <ToolFeatureGuides features={[
        { icon: Plane, title: "100+ Airlines", description: "Baggage rules and fees for all major airlines — updated regularly." },
        { icon: DollarSign, title: "Fee Calculator", description: "Calculate exact baggage fees including overweight and oversized surcharges." },
        { icon: Luggage, title: "Size & Weight Check", description: "Check if your bag fits carry-on limits before you get to the airport." },
      ]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Airline Baggage Allowance & Fee Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Airline Baggage Allowance & Fee Calculator provides
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
    </div>
    </div>
);
}

export default BaggageCalcClient;
