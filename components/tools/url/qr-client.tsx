"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import QRCode from "qrcode";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import {
  QrCode,
  Copy,
  Download,
  Link2,
  Wifi,
  Mail,
  Phone,
  UserCheck,
  Sparkles,
  CheckCircle2,
  Sliders,
  RefreshCcw,
  Wand2
} from "lucide-react";
import toast from "react-hot-toast";

type InputType = "url" | "text" | "email" | "phone" | "wifi" | "vcard";

export function QrClient() {
    const [inputType, setInputType] = useState<InputType>("url");
  const [urlInput, setUrlInput] = useState("https://toolzium.com");
  const [textInput, setTextInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");

  // Wi-Fi inputs
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPass, setWifiPass] = useState("");
  const [wifiEnc, setWifiEnc] = useState("WPA");

  // vCard inputs
  const [vName, setVName] = useState("");
  const [vPhone, setVPhone] = useState("");
  const [vEmail, setVEmail] = useState("");
  const [vOrg, setVOrg] = useState("");

  // Styling options
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState<number>(300);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // Generated Outputs
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [qrSvgString, setQrSvgString] = useState<string>("");

  useEffect(() => {
      }, []);

  const payload = useMemo(() => {
    if (inputType === "url") return urlInput.trim();
    if (inputType === "text") return textInput.trim();
    if (inputType === "email") return emailInput.trim() ? `mailto:${emailInput.trim()}` : "";
    if (inputType === "phone") return phoneInput.trim() ? `tel:${phoneInput.trim()}` : "";
    if (inputType === "wifi") {
      if (!wifiSsid.trim()) return "";
      return `WIFI:T:${wifiEnc};S:${wifiSsid.trim()};P:${wifiPass.trim()};;`;
    }
    if (inputType === "vcard") {
      if (!vName.trim()) return "";
      return `BEGIN:VCARD\nVERSION:3.0\nN:${vName}\nFN:${vName}\nORG:${vOrg}\nTEL:${vPhone}\nEMAIL:${vEmail}\nEND:VCARD`;
    }
    return "";
  }, [inputType, urlInput, textInput, emailInput, phoneInput, wifiSsid, wifiPass, wifiEnc, vName, vPhone, vEmail, vOrg]);

  useEffect(() => {
    if (!payload) {
      setQrDataUrl("");
      setQrSvgString("");
      return;
    }

    const generateQR = async () => {
      try {
        const dataUrl = await QRCode.toDataURL(payload, {
          width: size,
          margin: 2,
          color: { dark: fgColor, light: bgColor },
        });
        setQrDataUrl(dataUrl);

        const svgStr = await QRCode.toString(payload, {
          type: "svg",
          margin: 2,
          color: { dark: fgColor, light: bgColor },
        });
        setQrSvgString(svgStr);
      } catch (err) {
        console.error("QR Code generation error:", err);
      }
    };

    generateQR();
  }, [payload, fgColor, bgColor, size]);

  const generateAiPayload = async () => {
    setIsGeneratingAi(true);
    try {
      const prompt = `Act as a Smart Business Identity Assistant. Generate sample high-profile business vCard contact details.
      Return EXACTLY a valid JSON object with keys: name, organization, phone, email. Do not include markdown code fences, just JSON.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "json" }),
      });
      const data = await res.json();
      if (data.success && data.raw) {
        const cleanJson = data.raw.replace(/```json/g, "").replace(/```/g, "").trim();
        const obj = JSON.parse(cleanJson);
        setInputType("vcard");
        if (obj.name) setVName(obj.name);
        if (obj.organization) setVOrg(obj.organization);
        if (obj.phone) setVPhone(obj.phone);
        if (obj.email) setVEmail(obj.email);
        toast.success("AI Business Card contact loaded!");
      }
    } catch (e) {
      console.warn("AI QR error:", e);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleDownloadPNG = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `qrcode_${Date.now()}.png`;
    a.click();
    toast.success("PNG QR Code downloaded!");
  };

  const handleDownloadSVG = () => {
    if (!qrSvgString) return;
    const blob = new Blob([qrSvgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `qrcode_${Date.now()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("SVG QR Code downloaded!");
  };

  const handleCopyPayload = () => {
    if (!payload) return;
    navigator.clipboard.writeText(payload);
    toast.success("Payload copied to clipboard!");
  };
  return (
    <div className="w-full min-h-screen pb-20 relative">
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          "absolute inset-0 h-full w-full stroke-border [mask-image:linear-gradient(to_bottom,white,transparent)]"
        )}
      />

      <div className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 space-y-8 relative z-10">
        <ToolPageHeader
          icon={QrCode}
          title="High-Resolution QR Code Studio"
          description="Create scannable, high-contrast QR codes for website URLs, Wi-Fi credentials, digital vCard contact cards, emails, and phone numbers."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Input Options */}
          <GlassCard className="p-5 flex flex-col bg-background border-border shadow-sm rounded-2xl">
            <div className="flex justify-between items-center border-b border-border pb-3 mb-4">
              <Label className="text-lg font-bold text-foreground flex items-center gap-2">
                <QrCode className="w-5 h-5 text-primary" />
                Configure QR Content
              </Label>
              <button
                type="button"
                onClick={generateAiPayload}
                disabled={isGeneratingAi}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                {isGeneratingAi ? (
                  <RefreshCcw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Wand2 className="w-3.5 h-3.5" />
                )}
                <span>✨ AI Smart vCard</span>
              </button>
            </div>

            <div className="space-y-4 flex-1">
              {/* Type Selectors */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 bg-muted/40 p-1.5 rounded-xl border border-border text-xs">
                <button
                  type="button"
                  onClick={() => setInputType("url")}
                  className={cn(
                    "py-2 px-2 rounded-lg flex flex-col items-center gap-1 transition-all font-semibold",
                    inputType === "url"
                      ? "bg-primary text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Link2 className="w-3.5 h-3.5" /> URL
                </button>
                <button
                  type="button"
                  onClick={() => setInputType("text")}
                  className={cn(
                    "py-2 px-2 rounded-lg flex flex-col items-center gap-1 transition-all font-semibold",
                    inputType === "text"
                      ? "bg-primary text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Sparkles className="w-3.5 h-3.5" /> Text
                </button>
                <button
                  type="button"
                  onClick={() => setInputType("wifi")}
                  className={cn(
                    "py-2 px-2 rounded-lg flex flex-col items-center gap-1 transition-all font-semibold",
                    inputType === "wifi"
                      ? "bg-primary text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Wifi className="w-3.5 h-3.5" /> Wi-Fi
                </button>
                <button
                  type="button"
                  onClick={() => setInputType("vcard")}
                  className={cn(
                    "py-2 px-2 rounded-lg flex flex-col items-center gap-1 transition-all font-semibold",
                    inputType === "vcard"
                      ? "bg-primary text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <UserCheck className="w-3.5 h-3.5" /> vCard
                </button>
                <button
                  type="button"
                  onClick={() => setInputType("email")}
                  className={cn(
                    "py-2 px-2 rounded-lg flex flex-col items-center gap-1 transition-all font-semibold",
                    inputType === "email"
                      ? "bg-primary text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Mail className="w-3.5 h-3.5" /> Email
                </button>
                <button
                  type="button"
                  onClick={() => setInputType("phone")}
                  className={cn(
                    "py-2 px-2 rounded-lg flex flex-col items-center gap-1 transition-all font-semibold",
                    inputType === "phone"
                      ? "bg-primary text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Phone className="w-3.5 h-3.5" /> Phone
                </button>
              </div>

              {inputType === "url" && (
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">Destination URL</Label>
                  <Input
                    placeholder="https://example.com"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="bg-background border-border"
                  />
                </div>
              )}

              {inputType === "text" && (
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">Plain Text Message</Label>
                  <textarea
                    className="w-full rounded-xl border border-border bg-background p-3 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-primary/50 min-h-[120px] text-foreground font-sans"
                    placeholder="Enter any text message or instructions..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                  />
                </div>
              )}

              {inputType === "wifi" && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-muted-foreground">Network Name (SSID)</Label>
                    <Input
                      placeholder="Home_WiFi_5G"
                      value={wifiSsid}
                      onChange={(e) => setWifiSsid(e.target.value)}
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-muted-foreground">Password</Label>
                    <Input
                      type="password"
                      placeholder="WPA2 Password"
                      value={wifiPass}
                      onChange={(e) => setWifiPass(e.target.value)}
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-muted-foreground">Encryption Type</Label>
                    <select
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground font-medium outline-none focus:ring-2 focus:ring-primary/50"
                      value={wifiEnc}
                      onChange={(e) => setWifiEnc(e.target.value)}
                    >
                      <option value="WPA">WPA / WPA2 / WPA3</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">Open Network (No Password)</option>
                    </select>
                  </div>
                </div>
              )}

              {inputType === "vcard" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-muted-foreground">Full Name</Label>
                    <Input
                      placeholder="John Doe"
                      value={vName}
                      onChange={(e) => setVName(e.target.value)}
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-muted-foreground">Company / Organization</Label>
                    <Input
                      placeholder="Acme Inc."
                      value={vOrg}
                      onChange={(e) => setVOrg(e.target.value)}
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-muted-foreground">Phone Number</Label>
                    <Input
                      placeholder="+1234567890"
                      value={vPhone}
                      onChange={(e) => setVPhone(e.target.value)}
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-muted-foreground">Email Address</Label>
                    <Input
                      placeholder="john@example.com"
                      value={vEmail}
                      onChange={(e) => setVEmail(e.target.value)}
                      className="bg-background border-border"
                    />
                  </div>
                </div>
              )}

              {inputType === "email" && (
                <div className="space-y-1">
                  <Label className="text-xs font-semibold text-muted-foreground">Email Address</Label>
                  <Input
                    placeholder="contact@domain.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="bg-background border-border"
                  />
                </div>
              )}

              {inputType === "phone" && (
                <div className="space-y-1">
                  <Label className="text-xs font-semibold text-muted-foreground">Phone Number</Label>
                  <Input
                    placeholder="+1 (555) 000-0000"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="bg-background border-border"
                  />
                </div>
              )}

              {/* Customization Controls */}
              <div className="pt-4 border-t border-border space-y-3">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                  Color & Dimensions
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Foreground
                    </Label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="w-8 h-8 rounded border border-border cursor-pointer bg-transparent"
                      />
                      <span className="text-xs font-mono font-bold text-foreground">{fgColor}</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Background
                    </Label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-8 h-8 rounded border border-border cursor-pointer bg-transparent"
                      />
                      <span className="text-xs font-mono font-bold text-foreground">{bgColor}</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Resolution
                    </Label>
                    <select
                      className="w-full rounded-lg border border-border bg-background px-2 py-2 text-xs text-foreground font-medium outline-none focus:ring-2 focus:ring-primary/50"
                      value={size}
                      onChange={(e) => setSize(Number(e.target.value))}
                    >
                      <option value={200}>200 x 200px</option>
                      <option value={300}>300 x 300px</option>
                      <option value={500}>500 x 500px</option>
                      <option value={1000}>1000 x 1000px</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Right Live High-Contrast Preview Card */}
          <div className="flex flex-col space-y-4">
            <GlassCard className="p-6 flex flex-col items-center justify-center text-center space-y-5 h-full min-h-[420px] bg-background border-border shadow-sm rounded-2xl">
              {qrDataUrl ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-5 flex flex-col items-center"
                >
                  {/* High-Contrast White Card Wrapper for guaranteed scannability on all themes */}
                  <div className="p-5 rounded-2xl bg-white shadow-xl border border-slate-200 inline-block shadow-black/20">
                    <img src={qrDataUrl} alt="Scannable QR Code" className="w-56 h-56 rounded-lg" />
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center">
                    <Button onClick={handleDownloadPNG} size="sm" className="gap-1.5 text-xs bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl h-10 px-4">
                      <Download className="w-3.5 h-3.5" /> Download PNG
                    </Button>
                    <Button onClick={handleDownloadSVG} variant="outline" size="sm" className="gap-1.5 text-xs border-border font-semibold rounded-xl h-10 px-4">
                      <Download className="w-3.5 h-3.5" /> Download SVG
                    </Button>
                    <Button onClick={handleCopyPayload} variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground hover:text-foreground font-semibold rounded-xl h-10">
                      <Copy className="w-3.5 h-3.5" /> Copy Payload
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <div className="text-muted-foreground space-y-3">
                  <QrCode className="w-16 h-16 mx-auto opacity-30" />
                  <p className="text-base font-semibold text-foreground">Enter Details to Render QR Code</p>
                  <p className="text-xs max-w-xs text-muted-foreground">
                    QR codes render in real-time as you type. Test scan with your smartphone camera!
                  </p>
                </div>
              )}
            </GlassCard>
          </div>
        </div>

        <ToolHowItWorks
          steps={[
            { step: "01", title: "Select Content Preset", description: "Choose between website URL, Wi-Fi network credentials, or vCard business contact.", icon: QrCode },
            { step: "02", title: "Customize Design & Colors", description: "Pick custom foreground/background colors and output resolution.", icon: Sliders },
            { step: "03", title: "Download Vector or PNG", description: "Save high-resolution PNG or vector SVG files ready for print and web.", icon: CheckCircle2 },
          ]}
          badges={["100% Scannable", "PNG & SVG Support", "Wi-Fi & vCard Ready"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: QrCode, title: "100% Standard Compliant", description: "Generates ISO/IEC 18004 compliant QR codes guaranteed to scan on iOS and Android devices." },
            { icon: Wifi, title: "Automated Wi-Fi Join", description: "Allows mobile users to instantly connect to your Wi-Fi network without typing passwords." },
            { icon: Download, title: "Print-Ready Vector SVG", description: "Download scalable vector SVG graphics ideal for business cards, posters, and flyers." },
          ]}
        >
          <div className="prose dark:prose-invert max-w-none">
            <h3>How QR Code Technology Works</h3>
            <p>
              Quick Response (QR) codes are 2D matrix barcodes designed to encode binary, alphanumeric, and numeric data. Built-in error correction algorithms ensure that codes remain scannable even if partially damaged or dirty.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "Do these QR codes ever expire?", answer: "No! The generated QR codes encode static text directly into the matrix, so they will work forever with zero server dependency." },
            { question: "Can I use SVG files for professional printing?", answer: "Yes! SVG vector files scale infinitely without losing quality or becoming blurry." },
          ]}
        />

        <RelatedTools currentToolUrl="/tools/url/qr" max={6} />
      </div>
    </div>
  );
}

export default QrClient;
