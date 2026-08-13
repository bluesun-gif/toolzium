"use client";

import React, { useState, useRef } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Button } from"@/components/ui/button";
import { Label } from"@/components/ui/label";
import { Switch } from"@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { Wifi, QrCode, Download, Printer, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export function WifiQrClient() {
 const [ssid, setSsid] = useState("");
 const [password, setPassword] = useState("");
 const [encryption, setEncryption] = useState("WPA");
 const [hidden, setHidden] = useState(false);
 const printRef = useRef<HTMLDivElement>(null);

 const getWifiString = () => {
 const escSsid = ssid.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/:/g, '\\:');
 const escPwd = password.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/:/g, '\\:');
 
 let str = `WIFI:T:${encryption};S:${escSsid};`;
 if (encryption !=="nopass") {
 str += `P:${escPwd};`;
 }
 if (hidden) {
 str += `H:true;`;
 }
 str += `;`;
 return str;
 };

 const qrUrl = ssid ? `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(getWifiString())}&margin=10` :"";

 const handleDownload = async () => {
 if (!qrUrl) return;
 try {
 const response = await fetch(qrUrl);
 const blob = await response.blob();
 const url = URL.createObjectURL(blob);
 const link = document.createElement('a');
 link.href = url;
 link.download = `wifi-${ssid || 'network'}-qrcode.png`;
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);
 URL.revokeObjectURL(url);
 toast.success("QR Code downloaded!");
 } catch (error) {
 toast.error("Failed to download QR code. Try opening image in new tab.");
 }
 };

 const handlePrint = () => {
 if (!qrUrl || !printRef.current) return;
 
 const printContent = printRef.current.innerHTML;
 const printWindow = window.open('', '', 'width=800,height=600');
 if (!printWindow) {
 toast.error("Pop-up blocked. Please allow pop-ups to print.");
 return;
 }
 
 printWindow.document.write(`
 <html>
 <head>
 <title>Print WiFi QR</title>
 <style>
 body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
 .print-card { border: 2px dashed #ccc; padding: 40px; border-radius: 16px; text-align: center; }
 img { max-width: 300px; margin-bottom: 20px; }
 h1 { margin: 0 0 10px 0; font-size: 24px; }
 p { color: #666; margin: 0; }
 </style>
 </head>
 <body>
 <div class="print-card">
 ${printContent}
 </div>
 <script>
 setTimeout(() => {
 window.print();
 window.close();
 }, 500);
 </script>
 </body>
 </html>
 `);
 printWindow.document.close();
 };

 const handleReset = () => {
 setSsid("");
 setPassword("");
 setEncryption("WPA");
 setHidden(false);
 };

 return (
 <div className="space-y-6">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={Wifi}
 title="WiFi QR Code Generator"
 description="Create a QR code that lets guests connect to your WiFi network by simply scanning it."
 />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Network Details</CardTitle>
 <CardDescription>Enter your WiFi connection information</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Network Name (SSID)</Label>
 <Input
 placeholder="e.g. My Home Network"
 value={ssid}
 onChange={(e) => setSsid(e.target.value)}
 />
 </div>

 <div className="space-y-2">
 <Label>Security Type</Label>
 <Select value={encryption} onValueChange={setEncryption}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="WPA">WPA/WPA2/WPA3</SelectItem>
 <SelectItem value="WEP">WEP</SelectItem>
 <SelectItem value="nopass">None (Open Network)</SelectItem>
 </SelectContent>
 </Select>
 </div>

 {encryption !=="nopass"&& (
 <div className="space-y-2">
 <Label>Password</Label>
 <Input
 type="password"
 placeholder="Network password"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 />
 </div>
 )}

 <div className="flex items-center space-x-2 pt-2">
 <Switch
 id="hidden-network"
 checked={hidden}
 onCheckedChange={setHidden}
 />
 <Label htmlFor="hidden-network">Hidden Network</Label>
 </div>

 <div className="pt-4 flex justify-end">
 <ResetButton onClick={handleReset} />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Generated QR Code</CardTitle>
 <CardDescription>Scan this code to connect</CardDescription>
 </CardHeader>
 <CardContent className="flex flex-col items-center justify-center space-y-6">
 <div 
 ref={printRef}
 className="bg-background p-6 rounded-xl shadow-sm border flex flex-col items-center"
 >
 {qrUrl ? (
 <>
 <img src={qrUrl} alt="WiFi QR Code"className="w-48 h-48 sm:w-64 sm:h-64 object-contain mb-4"crossOrigin="anonymous"/>
 <h3 className="font-bold text-lg text-center text-foreground">{ssid}</h3>
 <p className="text-sm text-muted-foreground text-center">Scan to connect to WiFi</p>
 </>
 ) : (
 <div className="w-48 h-48 sm:w-64 sm:h-64 bg-muted flex items-center justify-center rounded-lg text-muted-foreground mb-4 flex-col">
 <QrCode className="w-12 h-12 mb-2 opacity-20"/>
 <span className="text-sm">Enter SSID to generate</span>
 </div>
 )}
 </div>

 <div className="flex flex-wrap gap-2 w-full justify-center">
 <ActionButton 
 onClick={handleDownload} 
 icon={Download} 
 label="Download PNG"
 disabled={!qrUrl}
 variant="default"
 />
 <ActionButton 
 onClick={handlePrint} 
 icon={Printer} 
 label="Print Code"
 disabled={!qrUrl}
 />
 </div>
 </CardContent>
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
          <h3>Why Use Our WiFi QR Code Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our WiFi QR Code Generator provides
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

      <RelatedTools currentToolUrl="/tools/network/wifi-qr" max={6} />

</div>
 );
}
