"use client";

import React, { useState, useMemo, useEffect, useRef } from"react";
import { motion } from"framer-motion";
import QRCode from"qrcode";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { QrCode, Copy, Download, Link2, Wifi, Mail, Phone, UserCheck, Sparkles, CheckCircle2, Sliders, RefreshCcw } from"lucide-react";
import toast from"react-hot-toast";

type InputType ="url"|"text"|"email"|"phone"|"wifi"|"vcard";

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

 // Generated Outputs
 const [qrDataUrl, setQrDataUrl] = useState<string>("");
 const [qrSvgString, setQrSvgString] = useState<string>("");

 const payload = useMemo(() => {
 if (inputType ==="url") return urlInput.trim();
 if (inputType ==="text") return textInput.trim();
 if (inputType ==="email") return emailInput.trim() ? `mailto:${emailInput.trim()}` :"";
 if (inputType ==="phone") return phoneInput.trim() ? `tel:${phoneInput.trim()}` :"";
 if (inputType ==="wifi") {
 if (!wifiSsid.trim()) return"";
 return `WIFI:T:${wifiEnc};S:${wifiSsid.trim()};P:${wifiPass.trim()};;`;
 }
 if (inputType ==="vcard") {
 if (!vName.trim()) return"";
 return `BEGIN:VCARD\nVERSION:3.0\nN:${vName}\nFN:${vName}\nORG:${vOrg}\nTEL:${vPhone}\nEMAIL:${vEmail}\nEND:VCARD`;
 }
 return"";
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
 color: { dark: fgColor, light: bgColor }
 });
 setQrDataUrl(dataUrl);

 const svgStr = await QRCode.toString(payload, {
 type:"svg",
 margin: 2,
 color: { dark: fgColor, light: bgColor }
 });
 setQrSvgString(svgStr);
 } catch (err) {
 console.error("QR Code generation error:", err);
 }
 };

 generateQR();
 }, [payload, fgColor, bgColor, size]);

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
 const blob = new Blob([qrSvgString], { type:"image/svg+xml"});
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
 <div className="max-w-6xl mx-auto space-y-8 p-4">
 <ToolPageHeader
 icon={QrCode}
 title="High-Resolution QR Code Generator"
 description="Create real, scannable QR codes for website URLs, Wi-Fi passwords, digital business cards (vCard), emails, and phone numbers."
 />

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <GlassCard className="p-0">
 <CardHeader className="border-b border-border/40 bg-muted/20 p-4">
 <CardTitle className="text-sm font-semibold flex items-center gap-2">
 <QrCode className="w-4 h-4 text-primary"/>
 Configure QR Code Content
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-4">
 {/* Input Type Selector Tabs */}
 <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 bg-muted/40 p-1 rounded-lg border border-border/40 text-xs">
 <button
 onClick={() => setInputType("url")}
 className={`py-1.5 px-2 rounded flex flex-col items-center gap-1 transition-all ${
 inputType ==="url"?"bg-primary text-primary-foreground font-bold shadow":"text-muted-foreground hover:text-foreground"
 }`}
 >
 <Link2 className="w-3.5 h-3.5"/> URL
 </button>
 <button
 onClick={() => setInputType("text")}
 className={`py-1.5 px-2 rounded flex flex-col items-center gap-1 transition-all ${
 inputType ==="text"?"bg-primary text-primary-foreground font-bold shadow":"text-muted-foreground hover:text-foreground"
 }`}
 >
 <Sparkles className="w-3.5 h-3.5"/> Text
 </button>
 <button
 onClick={() => setInputType("wifi")}
 className={`py-1.5 px-2 rounded flex flex-col items-center gap-1 transition-all ${
 inputType ==="wifi"?"bg-primary text-primary-foreground font-bold shadow":"text-muted-foreground hover:text-foreground"
 }`}
 >
 <Wifi className="w-3.5 h-3.5"/> Wi-Fi
 </button>
 <button
 onClick={() => setInputType("vcard")}
 className={`py-1.5 px-2 rounded flex flex-col items-center gap-1 transition-all ${
 inputType ==="vcard"?"bg-primary text-primary-foreground font-bold shadow":"text-muted-foreground hover:text-foreground"
 }`}
 >
 <UserCheck className="w-3.5 h-3.5"/> vCard
 </button>
 <button
 onClick={() => setInputType("email")}
 className={`py-1.5 px-2 rounded flex flex-col items-center gap-1 transition-all ${
 inputType ==="email"?"bg-primary text-primary-foreground font-bold shadow":"text-muted-foreground hover:text-foreground"
 }`}
 >
 <Mail className="w-3.5 h-3.5"/> Email
 </button>
 <button
 onClick={() => setInputType("phone")}
 className={`py-1.5 px-2 rounded flex flex-col items-center gap-1 transition-all ${
 inputType ==="phone"?"bg-primary text-primary-foreground font-bold shadow":"text-muted-foreground hover:text-foreground"
 }`}
 >
 <Phone className="w-3.5 h-3.5"/> Phone
 </button>
 </div>

 {/* Dynamic Inputs based on selected type */}
 {inputType ==="url"&& (
 <div>
 <Label className="text-xs mb-1 block">Destination URL</Label>
 <Input
 placeholder="https://example.com"
 value={urlInput}
 onChange={(e) => setUrlInput(e.target.value)}
 />
 </div>
 )}

 {inputType ==="text"&& (
 <div>
 <Label className="text-xs mb-1 block">Plain Text Content</Label>
 <textarea
 className="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px]"
 placeholder="Enter any text message or instructions..."
 value={textInput}
 onChange={(e) => setTextInput(e.target.value)}
 />
 </div>
 )}

 {inputType ==="wifi"&& (
 <div className="space-y-3">
 <div>
 <Label className="text-xs mb-1 block">Network Name (SSID)</Label>
 <Input placeholder="Home_WiFi_5G"value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} />
 </div>
 <div>
 <Label className="text-xs mb-1 block">Password</Label>
 <Input type="password"placeholder="WPA2 Password"value={wifiPass} onChange={(e) => setWifiPass(e.target.value)} />
 </div>
 <div>
 <Label className="text-xs mb-1 block">Encryption Type</Label>
 <select
 className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
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

 {inputType ==="vcard"&& (
 <div className="grid grid-cols-2 gap-3">
 <div>
 <Label className="text-xs mb-1 block">Full Name</Label>
 <Input placeholder="John Doe"value={vName} onChange={(e) => setVName(e.target.value)} />
 </div>
 <div>
 <Label className="text-xs mb-1 block">Company / Organization</Label>
 <Input placeholder="Acme Inc."value={vOrg} onChange={(e) => setVOrg(e.target.value)} />
 </div>
 <div>
 <Label className="text-xs mb-1 block">Phone Number</Label>
 <Input placeholder="+1234567890"value={vPhone} onChange={(e) => setVPhone(e.target.value)} />
 </div>
 <div>
 <Label className="text-xs mb-1 block">Email Address</Label>
 <Input placeholder="john@example.com"value={vEmail} onChange={(e) => setVEmail(e.target.value)} />
 </div>
 </div>
 )}

 {inputType ==="email"&& (
 <div>
 <Label className="text-xs mb-1 block">Email Address</Label>
 <Input placeholder="contact@domain.com"value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
 </div>
 )}

 {inputType ==="phone"&& (
 <div>
 <Label className="text-xs mb-1 block">Phone Number</Label>
 <Input placeholder="+1 (555) 000-0000"value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} />
 </div>
 )}

 {/* Customization Options */}
 <div className="pt-3 border-t border-border/40 space-y-3">
 <span className="text-xs font-semibold text-muted-foreground block">Color & Dimensions</span>
 <div className="grid grid-cols-3 gap-3">
 <div>
 <Label className="text-[11px] mb-1 block">Foreground Color</Label>
 <div className="flex items-center gap-2">
 <input type="color"value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-8 h-8 rounded border cursor-pointer"/>
 <span className="text-xs font-mono">{fgColor}</span>
 </div>
 </div>
 <div>
 <Label className="text-[11px] mb-1 block">Background Color</Label>
 <div className="flex items-center gap-2">
 <input type="color"value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-8 h-8 rounded border cursor-pointer"/>
 <span className="text-xs font-mono">{bgColor}</span>
 </div>
 </div>
 <div>
 <Label className="text-[11px] mb-1 block">Pixel Resolution</Label>
 <select
 className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs"
 value={size}
 onChange={(e) => setSize(Number(e.target.value))}
 >
 <option value={200}>200 x 200px</option>
 <option value={300}>300 x 300px</option>
 <option value={500}>500 x 500px</option>
 <option value={1000}>1000 x 1000px (Print)</option>
 </select>
 </div>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 {/* Live Preview Card */}
 <div className="space-y-4">
 <GlassCard className="p-6 flex flex-col items-center justify-center text-center space-y-4 min-h-[380px]">
 {qrDataUrl ? (
 <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-4 flex flex-col items-center">
 <div className="p-4 rounded-xl bg-background shadow-lg border border-border/40 inline-block">
 <img src={qrDataUrl} alt="Scannable QR Code"className="max-w-[240px] max-h-[240px] rounded"/>
 </div>
 <div className="flex flex-wrap gap-2 justify-center">
 <Button onClick={handleDownloadPNG} size="sm"className="gap-1.5 text-xs">
 <Download className="w-3.5 h-3.5"/> Download PNG
 </Button>
 <Button onClick={handleDownloadSVG} variant="outline"size="sm"className="gap-1.5 text-xs">
 <Download className="w-3.5 h-3.5"/> Download SVG
 </Button>
 <Button onClick={handleCopyPayload} variant="ghost"size="sm"className="gap-1.5 text-xs">
 <Copy className="w-3.5 h-3.5"/> Copy Payload
 </Button>
 </div>
 </motion.div>
 ) : (
 <div className="text-muted-foreground space-y-2">
 <QrCode className="w-16 h-16 mx-auto opacity-30"/>
 <p className="text-sm font-medium">Enter Details to Render QR Code</p>
 <p className="text-xs max-w-xs">QR codes generate in real-time as you type. Test scan with your smartphone camera!</p>
 </div>
 )}
 </GlassCard>
 </div>
 </div>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Select Content Preset", description:"Choose between website URL, Wi-Fi network credentials, or vCard business contact.", icon: QrCode },
 { step:"02", title:"Customize Design & Colors", description:"Pick custom foreground/background colors and output resolution.", icon: Sliders },
 { step:"03", title:"Download Vector or PNG", description:"Save high-resolution PNG or vector SVG files ready for print and web.", icon: CheckCircle2 }
 ]}
 badges={["100% Scannable","PNG & SVG Support","Wi-Fi & vCard Ready"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: QrCode, title:"100% Standard Compliant", description:"Generates ISO/IEC 18004 compliant QR codes guaranteed to scan on iOS and Android devices."},
 { icon: Wifi, title:"Automated Wi-Fi Join", description:"Allows mobile users to instantly connect to your Wi-Fi network without typing passwords."},
 { icon: Download, title:"Print-Ready Vector SVG", description:"Download scalable vector SVG graphics ideal for business cards, posters, and flyers."}
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
 { question:"Do these QR codes ever expire?", answer:"No! The generated QR codes encode static text directly into the matrix, so they will work forever with zero server dependency."},
 { question:"Can I use SVG files for professional printing?", answer:"Yes! SVG vector files scale infinitely without losing quality or becoming blurry."}
 ]}
 />

 <RelatedTools currentToolUrl="/tools/url/qr"max={6} />
 </div>
 );
}

export default QrClient;
