"use client";

import { Card } from "@/components/ui/card";

import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import QRCode from "qrcode";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ModelSelector } from "@/components/shared/model-selector";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import { QrCode, Copy, Download, Link2, Wifi, Mail, Phone, UserCheck, Sparkles, CheckCircle2, Sliders, RefreshCcw, Wand2, Type, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { ShareResultButton } from "@/components/shared/share-result-modal";
import { EmbedButton } from "@/components/shared/embed-modal";

type InputType = "url" | "text" | "email" | "phone" | "wifi" | "vcard";

const QR_TYPES: { id: InputType; label: string; icon: any }[] = [
  { id: "url", label: "URL", icon: Link2 },
  { id: "text", label: "Text", icon: Sparkles },
  { id: "wifi", label: "Wi-Fi", icon: Wifi },
  { id: "vcard", label: "vCard", icon: UserCheck },
  { id: "email", label: "Email", icon: Mail },
  { id: "phone", label: "Phone", icon: Phone },
];
export function QrClient() {
  const [inputType, setInputType] = useState<InputType>("url");
  const [model, setModel] = useState("gpt4o");
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
  useEffect(() => {}, []);
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
          color: {
            dark: fgColor,
            light: bgColor
          }
        });
        setQrDataUrl(dataUrl);
        const svgStr = await QRCode.toString(payload, {
          type: "svg",
          margin: 2,
          color: {
            dark: fgColor,
            light: bgColor
          }
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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt,
            model,
          type: "json"
        })
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
    const blob = new Blob([qrSvgString], {
      type: "image/svg+xml"
    });
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
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

      <div className="max-w-full max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 space-y-8 relative z-10">
        <ToolPageHeader icon={QrCode} title="High-Resolution QR Code Studio" description="Create scannable, high-contrast QR codes for website URLs, Wi-Fi credentials, digital vCard contact cards, emails, and phone numbers." />

        <div className="space-y-6 relative z-10">
          

          <ModelSelector value={model} onChange={setModel} />


          <GlassCard className="p-5 flex flex-col bg-background border-border shadow-sm rounded-2xl">
            <div className="flex justify-between items-center border-b border-border pb-3 mb-4">
              <Label className="text-lg font-bold text-foreground flex items-center gap-2">
                <QrCode className="w-5 h-5 text-primary" />
                Configure QR Content
              </Label>
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={generateAiPayload}
                disabled={isGeneratingAi}
                className="text-xs font-semibold text-primary border-primary/30 hover:bg-primary/10 gap-1.5 rounded-xl h-8"
              >
                {isGeneratingAi ? (
                  <RefreshCcw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Wand2 className="w-3.5 h-3.5" />
                )}
                <span>AI Smart Contact</span>
              </Button>
            </div>

            <div className="space-y-4 flex-1">
              {/* Responsive Type Selectors: Dropdown on mobile, clean segmented bar on tablet/desktop */}
              <div className="space-y-1.5 sm:hidden">
                <Label className="text-xs font-semibold text-muted-foreground">Select QR Code Type</Label>
                <div className="relative">
                  <select
                    value={inputType}
                    onChange={(e) => setInputType(e.target.value as InputType)}
                    className="w-full bg-background border border-border text-foreground font-semibold text-xs rounded-xl h-11 px-3.5 appearance-none pr-10 focus:ring-2 focus:ring-primary/50 outline-none cursor-pointer"
                  >
                    <option value="url">🔗 Website URL</option>
                    <option value="text">📝 Plain Text Message</option>
                    <option value="wifi">📶 Wi-Fi Network Login</option>
                    <option value="vcard">📇 Digital vCard Contact</option>
                    <option value="email">✉️ Send Email</option>
                    <option value="phone">📞 Phone Number</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-3.5 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div className="hidden sm:grid sm:grid-cols-6 gap-1.5 bg-muted/60 p-1.5 rounded-xl border border-border">
                {QR_TYPES.map((t) => {
                  const Icon = t.icon;
                  const isActive = inputType === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setInputType(t.id)}
                      className={cn(
                        "py-2.5 px-2 rounded-lg flex flex-col items-center justify-center gap-1 text-xs font-bold transition-all cursor-pointer",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-background/80"
                      )}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>

              {inputType === "url" && <div className="space-y-1.5">
                  <Label htmlFor="qr-url-input" className="text-xs font-semibold text-muted-foreground">Destination URL</Label>
                  <Input id="qr-url-input" type="text" placeholder="https://example.com" value={urlInput} onChange={e => setUrlInput(e.target.value)} className="bg-background border-border" />
                </div>}

              {inputType === "text" && <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">Plain Text Message</Label>
                  <textarea className="w-full rounded-xl border border-border bg-background p-3 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-primary/50 min-h-[120px] text-foreground font-sans" placeholder="Enter any text message or instructions..." value={textInput} onChange={e => setTextInput(e.target.value)} />
                </div>}

              {inputType === "wifi" && <div className="space-y-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-muted-foreground">Network Name (SSID)</Label>
                    <Input placeholder="Home_WiFi_5G" value={wifiSsid} onChange={e => setWifiSsid(e.target.value)} className="bg-background border-border" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-muted-foreground">Password</Label>
                    <Input type="password" placeholder="WPA2 Password" value={wifiPass} onChange={e => setWifiPass(e.target.value)} className="bg-background border-border" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-muted-foreground">Encryption Type</Label>
                    <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground font-medium outline-none focus:ring-2 focus:ring-primary/50" value={wifiEnc} onChange={e => setWifiEnc(e.target.value)}>
                      <option value="WPA">WPA / WPA2 / WPA3</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">Open Network (No Password)</option>
                    </select>
                  </div>
                </div>}

              {inputType === "vcard" && <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-muted-foreground">Full Name</Label>
                    <Input placeholder="John Doe" value={vName} onChange={e => setVName(e.target.value)} className="bg-background border-border" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-muted-foreground">Company / Organization</Label>
                    <Input placeholder="Acme Inc." value={vOrg} onChange={e => setVOrg(e.target.value)} className="bg-background border-border" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-muted-foreground">Phone Number</Label>
                    <Input placeholder="+1234567890" value={vPhone} onChange={e => setVPhone(e.target.value)} className="bg-background border-border" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-muted-foreground">Email Address</Label>
                    <Input placeholder="john@example.com" value={vEmail} onChange={e => setVEmail(e.target.value)} className="bg-background border-border" />
                  </div>
                </div>}

              {inputType === "email" && <div className="space-y-1">
                  <Label className="text-xs font-semibold text-muted-foreground">Email Address</Label>
                  <Input placeholder="contact@domain.com" value={emailInput} onChange={e => setEmailInput(e.target.value)} className="bg-background border-border" />
                </div>}

              {inputType === "phone" && <div className="space-y-1">
                  <Label className="text-xs font-semibold text-muted-foreground">Phone Number</Label>
                  <Input placeholder="+1 (555) 000-0000" value={phoneInput} onChange={e => setPhoneInput(e.target.value)} className="bg-background border-border" />
                </div>}

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
                      <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} className="w-8 h-8 rounded border border-border cursor-pointer bg-transparent" />
                      <span className="text-xs font-mono font-bold text-foreground">{fgColor}</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Background
                    </Label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-8 h-8 rounded border border-border cursor-pointer bg-transparent" />
                      <span className="text-xs font-mono font-bold text-foreground">{bgColor}</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Resolution
                    </Label>
                    <select className="w-full rounded-lg border border-border bg-background px-2 py-2 text-xs text-foreground font-medium outline-none focus:ring-2 focus:ring-primary/50" value={size} onChange={e => setSize(Number(e.target.value))}>
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
              {qrDataUrl ? <motion.div initial={{
                scale: 0.9,
                opacity: 0
              }} animate={{
                scale: 1,
                opacity: 1
              }} className="space-y-5 flex flex-col items-center">
                  {/* High-Contrast White Card Wrapper for guaranteed scannability on all themes */}
                  <div className="p-5 rounded-2xl bg-white shadow-xl border border-slate-200 inline-block shadow-black/20">
                    <img src={qrDataUrl} alt="Scannable QR Code" className="w-56 h-56 rounded-lg" />
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center w-full max-w-sm pt-2">
                    <Button onClick={handleDownloadPNG} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-10 px-5 rounded-xl shadow-md shadow-primary/20 gap-1.5 text-xs">
                      <Download className="w-4 h-4" /> Download PNG
                    </Button>
                    <Button onClick={handleDownloadSVG} variant="outline" size="sm" className="gap-1.5 text-xs border-border font-semibold rounded-xl h-10 px-4">
                      <Download className="w-3.5 h-3.5" /> Download SVG
                    </Button>
                    <ShareResultButton
                      toolTitle="QR Code Studio"
                      resultTitle={`Custom QR Code (${inputType.toUpperCase()})`}
                      resultSummary={`Scannable QR code generated for ${payload.slice(0, 40)}...`}
                      resultMetrics={[
                        { label: "Type", value: inputType.toUpperCase() },
                        { label: "Dimensions", value: `${size}x${size} px` },
                        { label: "Quality", value: "High Contrast" },
                      ]}
                      variant="secondary"
                      className="h-10 px-4"
                    />
                    <EmbedButton
                      toolPath="/tools/url/qr"
                      toolTitle="QR Code Studio"
                      className="h-10 px-4"
                    />
                    <Button onClick={handleCopyPayload} variant="ghost" size="sm" className="gap-1.5 text-xs text-foreground hover:text-primary hover:bg-muted/50 font-semibold rounded-xl h-10">
                      <Copy className="w-3.5 h-3.5" /> Copy Payload
                    </Button>
                  </div>
                </motion.div> : <div className="text-muted-foreground space-y-3">
                  <QrCode className="w-16 h-16 mx-auto opacity-30" />
                  <p className="text-base font-semibold text-foreground">Enter Details to Render QR Code</p>
                  <p className="text-xs max-w-xs text-muted-foreground">
                    QR codes render in real-time as you type. Test scan with your smartphone camera!
                  </p>
                </div>}
            </GlassCard>
          </div>
        </div>

        </div>
<ToolHowItWorks steps={[{
          step: "01",
          title: "Select Content Preset",
          description: "Choose between website URL, Wi-Fi network credentials, or vCard business contact.",
          icon: QrCode
        }, {
          step: "02",
          title: "Customize Design & Colors",
          description: "Pick custom foreground/background colors and output resolution.",
          icon: Sliders
        }, {
          step: "03",
          title: "Download Vector or PNG",
          description: "Save high-resolution PNG or vector SVG files ready for print and web.",
          icon: CheckCircle2
        }]} badges={["100% Scannable", "PNG & SVG Support", "Wi-Fi & vCard Ready"]} />

        <ToolFeatureGuides features={[{
          icon: QrCode,
          title: "100% Standard Compliant",
          description: "Generates ISO/IEC 18004 compliant QR codes guaranteed to scan on iOS and Android devices."
        }, {
          icon: Wifi,
          title: "Automated Wi-Fi Join",
          description: "Allows mobile users to instantly connect to your Wi-Fi network without typing passwords."
        }, {
          icon: Download,
          title: "Print-Ready Vector SVG",
          description: "Download scalable vector SVG graphics ideal for business cards, posters, and flyers."
        }]}>
          <div className="prose dark:prose-invert max-w-none">
            <h3>How QR Code Technology Works</h3>
            <p>
              Quick Response (QR) codes are 2D matrix barcodes designed to encode binary, alphanumeric, and numeric data. Built-in error correction algorithms ensure that codes remain scannable even if partially damaged or dirty.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion faqs={[{
          question: "Do the QR codes generated here ever expire?",
          answer: "No — they never expire. Every QR code generated by Toolzium encodes data statically directly into the visual matrix pattern. There are no servers, tracking redirects, or link shorteners involved. The QR code will scan and work perfectly forever as long as the destination URL remains accessible."
        }, {
          question: "Can I use the SVG file for large-format professional printing?",
          answer: "Absolutely! SVG (Scalable Vector Graphics) files are resolution-independent, meaning they can be scaled to any size — from a business card to a billboard — without any quality loss or pixelation. SVG is the recommended format for professional print applications. PNG is best for digital web use where a fixed pixel size is sufficient."
        }, {
          question: "What is the maximum amount of data a QR code can store?",
          answer: "A standard QR code can encode up to 7,089 numeric characters, 4,296 alphanumeric characters, or 2,953 bytes of binary data. However, more data = denser QR pattern = harder to scan. For best scannability, keep URLs under 100 characters and use a URL shortener for very long links. vCards and Wi-Fi credentials are typically within the optimal range."
        }, {
          question: "What is a vCard QR code and how does it work?",
          answer: "A vCard QR code encodes contact information (name, phone, email, organization) in the vCard 3.0 standard format. When scanned with iOS or Android, the phone automatically offers to save the contact to the address book — no manual typing required. This makes vCard QR codes ideal for business cards, conference badges, and networking events."
        }, {
          question: "How does the Wi-Fi QR code feature work?",
          answer: "The Wi-Fi QR code encodes your network SSID, password, and encryption type into the WIFI: URI scheme (e.g., WIFI:T:WPA;S:MyNetwork;P:MyPassword;;). When scanned with Android 10+ or iOS 11+, the device automatically prompts to join the Wi-Fi network — no password typing needed. Perfect for guest networks at homes, hotels, and cafés."
        }, {
          question: "Is my URL or personal data saved when I generate a QR code?",
          answer: "No data is ever sent to Toolzium servers. All QR code generation runs entirely in your browser using the open-source 'qrcode' JavaScript library. Your URLs, Wi-Fi passwords, and vCard contact details are never logged, stored, or transmitted. You can verify this by checking that the page works completely offline after it has initially loaded."
        }]} />
    </div>
    </div>
);
}

export default QrClient;
