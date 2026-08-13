"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Input } from"@/components/ui/input";
import { Badge } from"@/components/ui/badge";
import { Video, Calculator, DollarSign, Heart, Eye, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export default function TiktokCalcClient() {
 const [followers, setFollowers] = useState<number>(50000);
 const [likes, setLikes] = useState<number>(5000);
 const [comments, setComments] = useState<number>(300);
 const [views, setViews] = useState<number>(100000);

 const engagementRate = views > 0 ? (((likes + comments) / views) * 100).toFixed(2) :"0.00";
 const estimatedEstFund = (views * 0.03).toFixed(2); // ~$0.02 - $0.04 per 1,000 views
 const estimatedSponsorPost = (followers * 0.01).toFixed(0); // ~$10 per 1k followers

 return (
      <div className="relative space-y-6 max-w-4xl mx-auto px-4">
      <GridPattern />

 <ToolPageHeader
 icon={Video}
 title="TikTok Engagement & Creator Fund Earnings Calculator"
 description="Calculate your TikTok engagement rate, estimated Creator Fund payouts, and sponsored post value."
 />

 <GlassCard className="p-6 space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
 Total Account Followers:
 </label>
 <Input
 type="number"
 value={followers}
 onChange={(e) => setFollowers(Number(e.target.value))}
 className="h-11 font-bold text-base"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
 Average Video Views:
 </label>
 <Input
 type="number"
 value={views}
 onChange={(e) => setViews(Number(e.target.value))}
 className="h-11 font-bold text-base"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
 Average Likes Per Video:
 </label>
 <Input
 type="number"
 value={likes}
 onChange={(e) => setLikes(Number(e.target.value))}
 className="h-11 font-bold text-base"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
 Average Comments Per Video:
 </label>
 <Input
 type="number"
 value={comments}
 onChange={(e) => setComments(Number(e.target.value))}
 className="h-11 font-bold text-base"
 />
 </div>
 </div>
 </GlassCard>

 {/* Results Cards */}
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 <GlassCard className="p-5 space-y-2 text-center border-emerald-500/30 bg-emerald-500/5">
 <div className="flex justify-center text-emerald-500">
 <Eye className="h-6 w-6"/>
 </div>
 <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Engagement Rate</p>
 <p className="text-3xl font-extrabold text-emerald-500">{engagementRate}%</p>
 </GlassCard>

 <GlassCard className="p-5 space-y-2 text-center border-primary/30 bg-primary/5">
 <div className="flex justify-center text-primary">
 <DollarSign className="h-6 w-6"/>
 </div>
 <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Creator Fund Payout</p>
 <p className="text-3xl font-extrabold text-primary">${estimatedEstFund}</p>
 </GlassCard>

 <GlassCard className="p-5 space-y-2 text-center border-primary/50/30 bg-indigo-500/5">
 <div className="flex justify-center text-primary">
 <Heart className="h-6 w-6"/>
 </div>
 <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sponsor Value / Post</p>
 <p className="text-3xl font-extrabold text-primary">${estimatedSponsorPost}</p>
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
          <h3>Why Use Our TikTok Engagement & Creator Fund Earnings Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our TikTok Engagement & Creator Fund Earnings Calculator provides
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

      <RelatedTools currentToolUrl="/tools/social/tiktok-calc" max={6} />

</div>
 );
}
