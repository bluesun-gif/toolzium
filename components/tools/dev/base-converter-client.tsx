"use client";

import React, { useState, useEffect, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Binary, Copy, RotateCcw, Sparkles, ArrowRightLeft, Hash, Layers } from "lucide-react";
import toast from "react-hot-toast";

export default function BaseConverterClient() {
  const [decimalVal, setDecimalVal] = useState<string>("255");
  const [binaryVal, setBinaryVal] = useState<string>("11111111");
  const [hexVal, setHexVal] = useState<string>("FF");
  const [octalVal, setOctalVal] = useState<string>("377");
  const [customRadix, setCustomRadix] = useState<number>(36);
  const [customVal, setCustomVal] = useState<string>("73");
  const [asciiVal, setAsciiVal] = useState<string>("ÿ");

  // Update all bases from a BigInt or Big Number
  const updateFromBigInt = useCallback((num: bigint) => {
    try {
      setDecimalVal(num.toString(10));
      setBinaryVal(num.toString(2));
      setHexVal(num.toString(16).toUpperCase());
      setOctalVal(num.toString(8));
      if (customRadix >= 2 && customRadix <= 36) {
        setCustomVal(num.toString(customRadix).toUpperCase());
      }
      if (num >= BigInt(0) && num <= BigInt(1114111)) {
        try {
          setAsciiVal(String.fromCodePoint(Number(num)));
        } catch {
          setAsciiVal("N/A");
        }
      } else {
        setAsciiVal("Out of range");
      }
    } catch {
      // Ignore conversion errors
    }
  }, [customRadix]);

  const handleDecimalChange = (val: string) => {
    setDecimalVal(val);
    const clean = val.trim();
    if (!clean || isNaN(Number(clean))) return;
    try {
      const num = BigInt(clean);
      updateFromBigInt(num);
    } catch {}
  };

  const handleBinaryChange = (val: string) => {
    setBinaryVal(val);
    const clean = val.replace(/\s+/g, "");
    if (!clean || !/^[01]+$/.test(clean)) return;
    try {
      const num = BigInt("0b" + clean);
      updateFromBigInt(num);
    } catch {}
  };

  const handleHexChange = (val: string) => {
    setHexVal(val);
    const clean = val.replace(/^0x/i, "").trim();
    if (!clean || !/^[0-9a-fA-F]+$/.test(clean)) return;
    try {
      const num = BigInt("0x" + clean);
      updateFromBigInt(num);
    } catch {}
  };

  const handleOctalChange = (val: string) => {
    setOctalVal(val);
    const clean = val.trim();
    if (!clean || !/^[0-7]+$/.test(clean)) return;
    try {
      const num = BigInt("0o" + clean);
      updateFromBigInt(num);
    } catch {}
  };

  const handleReset = () => {
    setDecimalVal("255");
    setBinaryVal("11111111");
    setHexVal("FF");
    setOctalVal("377");
    setCustomVal("73");
    setAsciiVal("ÿ");
    toast.success("Reset to default (255)");
  };

  const copyVal = (val: string, label: string) => {
    navigator.clipboard.writeText(val);
    toast.success(`Copied ${label} value!`);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <ToolPageHeader
        title="Universal Number Base & Radix Converter"
        description="Convert numbers seamlessly across Binary (Base 2), Octal (Base 8), Decimal (Base 10), Hexadecimal (Base 16), ASCII, and Custom Radix (2 to 36) with arbitrary precision."
        icon={Binary}
      />

      <GlassCard className="p-6 rounded-3xl border-border/80 space-y-6">
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">Arbitrary Precision:</span>
            <Badge variant="outline" className="text-[11px] font-mono text-primary border-primary/40">
              BigInt Native
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={handleReset} className="h-8 px-3 rounded-xl text-xs gap-1 cursor-pointer">
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
        </div>

        {/* 4 Primary Bases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Decimal (Base 10) */}
          <div className="p-4 rounded-2xl border border-border/60 bg-muted/20 space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Hash className="h-3.5 w-3.5 text-primary" /> Decimal (Base 10)
              </Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyVal(decimalVal, "Decimal")}
                className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer gap-1"
              >
                <Copy className="h-3 w-3" /> Copy
              </Button>
            </div>
            <Input
              type="text"
              value={decimalVal}
              onChange={(e) => handleDecimalChange(e.target.value)}
              className="h-11 rounded-xl font-mono text-base font-bold"
              placeholder="e.g. 255"
            />
          </div>

          {/* Hexadecimal (Base 16) */}
          <div className="p-4 rounded-2xl border border-border/60 bg-muted/20 space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-purple-400" /> Hexadecimal (Base 16)
              </Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyVal(hexVal, "Hexadecimal")}
                className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer gap-1"
              >
                <Copy className="h-3 w-3" /> Copy
              </Button>
            </div>
            <Input
              type="text"
              value={hexVal}
              onChange={(e) => handleHexChange(e.target.value)}
              className="h-11 rounded-xl font-mono text-base font-bold uppercase text-purple-400"
              placeholder="e.g. FF"
            />
          </div>

          {/* Binary (Base 2) */}
          <div className="p-4 rounded-2xl border border-border/60 bg-muted/20 space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Binary className="h-3.5 w-3.5 text-emerald-400" /> Binary (Base 2)
              </Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyVal(binaryVal, "Binary")}
                className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer gap-1"
              >
                <Copy className="h-3 w-3" /> Copy
              </Button>
            </div>
            <Input
              type="text"
              value={binaryVal}
              onChange={(e) => handleBinaryChange(e.target.value)}
              className="h-11 rounded-xl font-mono text-base font-bold text-emerald-400"
              placeholder="e.g. 11111111"
            />
          </div>

          {/* Octal (Base 8) */}
          <div className="p-4 rounded-2xl border border-border/60 bg-muted/20 space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <ArrowRightLeft className="h-3.5 w-3.5 text-amber-400" /> Octal (Base 8)
              </Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyVal(octalVal, "Octal")}
                className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer gap-1"
              >
                <Copy className="h-3 w-3" /> Copy
              </Button>
            </div>
            <Input
              type="text"
              value={octalVal}
              onChange={(e) => handleOctalChange(e.target.value)}
              className="h-11 rounded-xl font-mono text-base font-bold text-amber-400"
              placeholder="e.g. 377"
            />
          </div>
        </div>

        {/* Custom Radix & ASCII Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {/* Custom Radix Slider (2 to 36) */}
          <div className="p-4 rounded-2xl border border-border/60 bg-card space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-foreground">
                Custom Radix: <span className="text-primary font-mono font-bold">Base {customRadix}</span>
              </Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyVal(customVal, `Base ${customRadix}`)}
                className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer gap-1"
              >
                <Copy className="h-3 w-3" /> Copy
              </Button>
            </div>
            <Slider
              value={[customRadix]}
              min={2}
              max={36}
              step={1}
              onValueChange={(vals) => setCustomRadix(vals[0])}
              className="cursor-pointer"
            />
            <Input
              type="text"
              readOnly
              value={customVal}
              className="h-10 rounded-xl font-mono text-sm font-bold bg-muted/40"
            />
          </div>

          {/* ASCII / Unicode Representation */}
          <div className="p-4 rounded-2xl border border-border/60 bg-card space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-foreground">ASCII / Unicode Character</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyVal(asciiVal, "ASCII")}
                className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer gap-1"
              >
                <Copy className="h-3 w-3" /> Copy
              </Button>
            </div>
            <div className="h-16 flex items-center justify-center rounded-xl bg-muted/40 border border-border/40 font-mono text-2xl font-bold text-primary">
              {asciiVal}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
