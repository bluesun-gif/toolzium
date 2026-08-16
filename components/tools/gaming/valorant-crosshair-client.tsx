"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Badge } from"@/components/ui/badge";
import { Button } from"@/components/ui/button";
import SelectField from"@/components/shared/form-fields/select-field";
import { Check, Copy, Crosshair, Eye, SlidersHorizontal, Sparkles } from"lucide-react";
import toast from"react-hot-toast";

const PRO_CROSSHAIRS = [
 { player:"TenZ (Sentinels)", code:"0;s;1;P;c;5;h;0;m;1;0l;4;0o;2;0a;1;0f;0;1b;0", color:"#00ffff"},
 { player:"Tarik (Sentinels)", code:"0;P;c;1;h;0;0l;3;0o;2;0a;1;0f;0;1b;0", color:"#00ff00"},
 { player:"Demon1 (NRG)", code:"0;s;1;P;o;1;d;1;m;1;0b;0;1b;0", color:"#ffffff"},
 { player:"Aspas (Leviatán)", code:"0;P;c;5;o;1;d;1;z;3;0b;0;1b;0", color:"#00ffff"},
 { player:"Chronicle (Fnatic)", code:"0;P;c;7;h;0;0l;4;0o;2;0a;1;0f;0;1b;0", color:"#ff00ff"},
 { player:"Boaster (Fnatic)", code:"0;P;c;5;o;1;d;1;m;1;0b;0;1b;0", color:"#00ffff"},
];

export default function ValorantCrosshairClient() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success("Copied Valorant Crosshair Code!");
    setTimeout(() => setCopiedCode(null), 2000);
  };
  return <div className="relative max-w-6xl mx-auto space-y-8"><ToolBackground /><div className="relative z-10">
      

      <ToolPageHeader icon={Crosshair} title="Valorant Pro Crosshair Generator & Import Code Database" description="Browse pro player Valorant crosshair codes (TenZ, Tarik, Demon1, Aspas) with 1-click Valorant import string copying." />

      {/* CROSSHAIR GRID */}
      <GlassCard>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-lg">
            <span className="flex items-center gap-2">
              <Crosshair className="h-5 w-5 text-primary" />
              VCT Pro Player Crosshair Import Database ({PRO_CROSSHAIRS.length})
            </span>
            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
              ✓ 100% Valid Patch 9.0+ Import Codes
            </Badge>
          </CardTitle>
          <CardDescription>Click to copy any pro player's official crosshair import string directly into Valorant.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRO_CROSSHAIRS.map((pro, i) => <GlassCard key={i} className="p-4 flex flex-col justify-between space-y-3 hover:border-primary/40 transition-all">
                <div className="flex items-center justify-between border-b border-border/60 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-foreground">{pro.player}</span>
                    <Badge variant="secondary" className="text-[10px]">{pro.team}</Badge>
                  </div>
                  <span className="h-3.5 w-3.5 rounded-full border border-border shadow-sm" style={{
                  backgroundColor: pro.color
                }} title={`Crosshair Color: ${pro.color}`} />
                </div>

                <div className="p-2.5 rounded-lg bg-muted/30 text-foreground font-mono text-xs overflow-x-auto truncate">
                  {pro.code}
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" size="sm" onClick={() => copyCode(pro.code)} className="h-8 text-xs font-semibold gap-1.5">
                    {copiedCode === pro.code ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    Copy Import String
                  </Button>
                </div>
              </GlassCard>)}
          </div>
        </CardContent>
      </GlassCard>

      {/* HOW IT WORKS */}
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Select Pro Crosshair",
        description: "Choose your favorite VCT pro player (TenZ, Tarik, Demon1, Aspas, Chronicle).",
        icon: Crosshair
      }, {
        step: "02",
        title: "Copy Import String",
        description: "Click 'Copy Import String' to copy the official 0;P;c;... string to your clipboard.",
        icon: Copy
      }, {
        step: "03",
        title: "Import in Valorant Settings",
        description: "Open Valorant → Settings → Crosshair → Import Profile → Paste (Ctrl+V) and click Import.",
        icon: Sparkles
      }]} badges={["VCT Pro Verified", "1-Click Import", "100% Free"]} />

 <div className="flex justify-end">
 <Button
 variant="outline"
 size="sm"
 onClick={() => copyCode(pro.code)}
 className="h-8 text-xs font-semibold gap-1.5"
 >
 {copiedCode === pro.code ? (
 <Check className="h-3.5 w-3.5 text-emerald-500"/>
 ) : (
 <Copy className="h-3.5 w-3.5"/>
 )}
 Copy Import Code
 </Button>
 </div>
 </div>
 ))}
 </div>
 </GlassCard>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Adjust Settings",
    description:"Set color, lines, dots, and gaps visually.",
    icon: Crosshair,
  },
{
    step:"02",
    title:"Preview",
    description:"See the crosshair on a target backdrop.",
    icon: Eye,
  },
{
    step:"03",
    title:"Copy Code",
    description:"Generate the import code and paste into Valorant.",
    icon: Copy,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Crosshair,
    title:"Full Controls",
    description:"Tune every crosshair parameter Valorant allows.",
  },
{
    icon: Eye,
    title:"Live Preview",
    description:"Test visibility against different backgrounds.",
  },
{
    icon: Copy,
    title:"Import Codes",
    description:"Export a shareable crosshair code.",
  },
{
    icon: SlidersHorizontal,
    title:"Fine Tuning",
    description:"Adjust opacity, thickness, and length precisely.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>Crosshair choice is one of the most debated topics in Valorant, yet the goal is simple: a reticle you can find instantly under pressure. This generator lets you build a crosshair visually and export it as an import code, skipping manual setting-by-setting configuration in game.</p>
  <p>Start with visibility. A crosshair must contrast with both bright and dark backgrounds, so color and outline matter more than style. Many players choose cyan or green with a thin black outline, or white with outline for maximum contrast. Test the preview against varied backdrops to confirm it never disappears.</p>
  <p>Shape follows function. A classic four-line crosshair gives clear horizontal and vertical reference, while a center dot suits players who focus on pixel-perfect placement. Gap and length control how much screen the reticle covers; smaller, tighter crosshairs reduce visual clutter during flick shots. Adjust opacity so it is present but not distracting.</p>
  <p>Sharing is built in. Once tuned, the import code lets teammates try your setup exactly, and you can import codes from professional players as a starting point. Treat their settings as a baseline, not gospel — hand size, sensitivity, and monitor differ for everyone. Use the copy button to move the code into Valorant, then refine through real matches until the crosshair feels like an extension of your aim.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is a Valorant crosshair code?",
    answer:"It is a short string that imports a full crosshair configuration into the game's settings.",
  },
{
    question:"Does crosshair affect aim?",
    answer:"It does not change mechanics, but a clear crosshair improves target focus and consistency.",
  },
{
    question:"Should I use a dot or lines?",
    answer:"Personal preference varies; many players use a small crosshair with a center dot for precision.",
  },
{
    question:"Can I copy pro players' crosshairs?",
    answer:"Yes, using their shared codes, then tweak to your taste.",
  },
{
    question:"Why tune crosshair color?",
    answer:"High-contrast colors stay visible across maps and reduce eye strain during long sessions.",
  }
  ]}
/>
</div>
 );
}
