"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Input } from"@/components/ui/input";
import { DollarSign, Clock, Briefcase, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export default function FreelanceRateCalcClient() {
 const [targetIncome, setTargetIncome] = useState<number>(85000);
 const [annualExpenses, setAnnualExpenses] = useState<number>(12000);
 const [billableHoursPerWeek, setBillableHoursPerWeek] = useState<number>(25);
 const [vacationWeeks, setVacationWeeks] = useState<number>(4);
 const [taxPercent, setTaxPercent] = useState<number>(25);

 const totalRequiredRevenue = (targetIncome + annualExpenses) / (1 - taxPercent / 100);
 const workingWeeks = 52 - vacationWeeks;
 const totalAnnualBillableHours = workingWeeks * billableHoursPerWeek;

 const minHourlyRate = totalAnnualBillableHours > 0 ? (totalRequiredRevenue / totalAnnualBillableHours).toFixed(2) :"0.00";
 const dayRate = (Number(minHourlyRate) * 8).toFixed(0);

 return (
      <div className="relative space-y-6 max-w-4xl mx-auto px-4">
      <GridPattern />

 <ToolPageHeader
 icon={Briefcase}
 title="Freelance Hourly Rate & Project Pricing Calculator"
 description="Calculate your minimum required hourly rate, day rate, and project pricing based on target annual income, taxes, and overhead."
 />

 <GlassCard className="p-6 space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-semibold text-foreground">Target Annual Take-Home Income ($):</label>
 <Input
 type="number"
 value={targetIncome}
 onChange={(e) => setTargetIncome(Number(e.target.value))}
 className="h-11 font-bold text-base"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-semibold text-foreground">Annual Business Overhead / Expenses ($):</label>
 <Input
 type="number"
 value={annualExpenses}
 onChange={(e) => setAnnualExpenses(Number(e.target.value))}
 className="h-11 font-bold text-base"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-semibold text-foreground">Billable Hours Per Week:</label>
 <Input
 type="number"
 value={billableHoursPerWeek}
 onChange={(e) => setBillableHoursPerWeek(Number(e.target.value))}
 className="h-11 font-bold text-base"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-semibold text-foreground">Vacation & Time Off (Weeks/Year):</label>
 <Input
 type="number"
 value={vacationWeeks}
 onChange={(e) => setVacationWeeks(Number(e.target.value))}
 className="h-11 font-bold text-base"
 />
 </div>

 <div className="space-y-2 sm:col-span-2">
 <label className="text-xs font-semibold text-foreground">Estimated Tax Rate (%):</label>
 <Input
 type="number"
 value={taxPercent}
 onChange={(e) => setTaxPercent(Number(e.target.value))}
 className="h-11 font-bold text-base"
 />
 </div>
 </div>
 </GlassCard>

 {/* Results Cards */}
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 <GlassCard className="p-5 space-y-2 text-center border-emerald-500/30 bg-emerald-500/5">
 <div className="flex justify-center text-emerald-500">
 <Clock className="h-6 w-6"/>
 </div>
 <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Min Hourly Rate</p>
 <p className="text-3xl font-extrabold text-emerald-500">${minHourlyRate}/hr</p>
 </GlassCard>

 <GlassCard className="p-5 space-y-2 text-center border-blue-500/30 bg-blue-500/5">
 <div className="flex justify-center text-primary">
 <Briefcase className="h-6 w-6"/>
 </div>
 <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recommended Day Rate</p>
 <p className="text-3xl font-extrabold text-primary">${dayRate}/day</p>
 </GlassCard>

 <GlassCard className="p-5 space-y-2 text-center border-primary/50/30 bg-purple-500/5">
 <div className="flex justify-center text-primary">
 <DollarSign className="h-6 w-6"/>
 </div>
 <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Gross Target</p>
 <p className="text-3xl font-extrabold text-primary">${Math.round(totalRequiredRevenue).toLocaleString()}</p>
 </GlassCard>
 </div>
 
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Input Your Data",
            description: "Enter your information in the input field above and configure any options.",
            icon: Sparkles,
          },
          {
            step: "02",
            title: "Process & Generate",
            description: "The tool processes your input instantly and displays the results.",
            icon: Zap,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy the output with one click and use it wherever you need.",
            icon: Copy,
          },
        ]}
        badges={["100% Free", "Instant Results", "Privacy-First"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: Sparkles,
            title: "Lightning Fast",
            description: "Get results in milliseconds with our optimized client-side processing engine.",
          },
          {
            icon: Shield,
            title: "Completely Private",
            description: "All processing happens in your browser. Your data never leaves your device.",
          },
          {
            icon: Zap,
            title: "No Signup Required",
            description: "Use this tool instantly without creating an account or providing any personal information.",
          },
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Freelance Hourly Rate & Project Pricing Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Freelance Hourly Rate & Project Pricing Calculator provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "Is this tool free to use?",
            answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits.",
          },
          {
            question: "Is my data secure?",
            answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server.",
          },
          {
            question: "Do I need to create an account?",
            answer: "No account or registration is required. Simply open the tool and start using it immediately.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/finance/freelance-rate-calc" max={6} />

</div>
 );
}
