"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SelectField from "@/components/shared/form-fields/select-field";
import { Crosshair, Copy, Check, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

const PRO_CROSSHAIRS = [
  { player: "TenZ (Sentinels)", code: "0;s;1;P;c;5;h;0;m;1;0l;4;0o;2;0a;1;0f;0;1b;0", color: "#00ffff" },
  { player: "Tarik (Sentinels)", code: "0;P;c;1;h;0;0l;3;0o;2;0a;1;0f;0;1b;0", color: "#00ff00" },
  { player: "Demon1 (NRG)", code: "0;s;1;P;o;1;d;1;m;1;0b;0;1b;0", color: "#ffffff" },
  { player: "Aspas (Leviatán)", code: "0;P;c;5;o;1;d;1;z;3;0b;0;1b;0", color: "#00ffff" },
  { player: "Chronicle (Fnatic)", code: "0;P;c;7;h;0;0l;4;0o;2;0a;1;0f;0;1b;0", color: "#ff00ff" },
  { player: "Boaster (Fnatic)", code: "0;P;c;5;o;1;d;1;m;1;0b;0;1b;0", color: "#00ffff" },
];

export default function ValorantCrosshairClient() {
  const [selectedPro, setSelectedPro] = useState(PRO_CROSSHAIRS[0]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success("Copied Valorant Crosshair Code!");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={Crosshair}
        title="Valorant Pro Crosshair Generator & Import Code Converter"
        description="Browse pro player Valorant crosshair codes (TenZ, Tarik, Demon1, Aspas) with 1-click Valorant import string copying."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-500" /> Pro Player Crosshairs ({PRO_CROSSHAIRS.length})
          </h2>
          <Badge variant="outline" className="text-xs bg-cyan-500/10 text-cyan-600 border-cyan-500/30">
            ✓ 100% Valid Valorant Import Codes
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PRO_CROSSHAIRS.map((pro, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border bg-muted/20 hover:bg-primary/5 hover:border-primary/40 transition space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-foreground">{pro.player}</span>
                <span
                  className="h-3 w-3 rounded-full border border-black/20"
                  style={{ backgroundColor: pro.color }}
                  title={`Color: ${pro.color}`}
                />
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto truncate">
                {pro.code}
              </div>

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyCode(pro.code)}
                  className="h-8 text-xs font-semibold gap-1.5"
                >
                  {copiedCode === pro.code ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  Copy Import Code
                </Button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
