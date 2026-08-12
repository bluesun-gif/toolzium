"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Input } from"@/components/ui/input";
import { Badge } from"@/components/ui/badge";
import { Video, Calculator, DollarSign, Heart, Eye } from"lucide-react";

export default function TiktokCalcClient() {
 const [followers, setFollowers] = useState<number>(50000);
 const [likes, setLikes] = useState<number>(5000);
 const [comments, setComments] = useState<number>(300);
 const [views, setViews] = useState<number>(100000);

 const engagementRate = views > 0 ? (((likes + comments) / views) * 100).toFixed(2) :"0.00";
 const estimatedEstFund = (views * 0.03).toFixed(2); // ~$0.02 - $0.04 per 1,000 views
 const estimatedSponsorPost = (followers * 0.01).toFixed(0); // ~$10 per 1k followers

 return (
 <div className="space-y-6 max-w-4xl mx-auto px-4">
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
 </div>
 );
}
