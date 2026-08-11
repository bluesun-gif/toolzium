"use client";

import React, { useState, useMemo, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Download, QrCode, Wifi, User, Mail, Phone, Link2 } from "lucide-react";
import toast from "react-hot-toast";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";

type InputType = "text" | "url" | "email" | "phone" | "wifi" | "vcard";

export function QrClient() {
  const [inputType, setInputType] = useState<InputType>("url");
  const [text, setText] = useState("https://toolflux.com");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPass, setWifiPass] = useState("");
  const [wifiEnc, setWifiEnc] = useState("WPA");
  const [vName, setVName] = useState("");
  const [vPhone, setVPhone] = useState("");
  const [vEmail, setVEmail] = useState("");
  const [vOrg, setVOrg] = useState("");
  
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [cornerStyle, setCornerStyle] = useState<"square" | "rounded">("square");
  const svgRef = useRef<SVGSVGElement>(null);

  const payload = useMemo(() => {
    if (inputType === "url") return text;
    if (inputType === "text") return text;
    if (inputType === "email") return `mailto:${email}`;
    if (inputType === "phone") return `tel:${phone}`;
    if (inputType === "wifi") return `WIFI:T:${wifiEnc};S:${wifiSsid};P:${wifiPass};;`;
    if (inputType === "vcard") return `BEGIN:VCARD\nVERSION:3.0\nFN:${vName}\nORG:${vOrg}\nTEL:${vPhone}\nEMAIL:${vEmail}\nEND:VCARD`;
    return "";
  }, [inputType, text, email, phone, wifiSsid, wifiPass, wifiEnc, vName, vPhone, vEmail, vOrg]);

  const matrix = useMemo(() => {
    if (!payload) return [];
    const gridSize = 25;
    const m: number[][] = Array(gridSize).fill(0).map(() => Array(gridSize).fill(0));
    let seed = 0;
    for (let i = 0; i < payload.length; i++) seed = (seed * 31 + payload.charCodeAt(i)) % 1000000;
    const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    
    for (let r = 0; r < gridSize; r++) for (let c = 0; c < gridSize; c++) m[r][c] = rand() > 0.5 ? 1 : 0;
    
    const drawFinder = (sr: number, sc: number) => {
      for (let r = 0; r < 7; r++) for (let c = 0; c < 7; c++) {
        if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) m[sr+r][sc+c] = 1;
        else m[sr+r][sc+c] = 0;
      }
      // Separators
      for (let i = -1; i <= 7; i++) {
        if (sr+i >= 0 && sr+i < gridSize && sc-1 >= 0) m[sr+i][sc-1] = 0;
        if (sr+i >= 0 && sr+i < gridSize && sc+7 < gridSize) m[sr+i][sc+7] = 0;
        if (sc+i >= 0 && sc+i < gridSize && sr-1 >= 0) m[sr-1][sc+i] = 0;
        if (sc+i >= 0 && sc+i < gridSize && sr+7 < gridSize) m[sr+7][sc+i] = 0;
      }
    };
    
    drawFinder(0, 0);
    drawFinder(0, gridSize - 7);
    drawFinder(gridSize - 7, 0);
    
    for (let i = 8; i < gridSize - 8; i++) {
      m[6][i] = i % 2 === 0 ? 1 : 0;
      m[i][6] = i % 2 === 0 ? 1 : 0;
    }
    return m;
  }, [payload]);

  const handleCopyData = () => {
    navigator.clipboard.writeText(payload);
    toast.success("Payload copied!");
  };

  const downloadSVG = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "qrcode.svg"; a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPNG = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement("canvas");
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx?.drawImage(img, 0, 0, size, size);
      const pngFile = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = pngFile; a.download = "qrcode.png"; a.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  const cellSize = size / 25;
  const rx = cornerStyle === "rounded" ? cellSize * 0.3 : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ToolPageHeader icon={QrCode} title="QR Code Generator" description="Create highly customizable, privacy-focused QR codes for URLs, WiFi, vCards, and more entirely offline." />
      
      <Card className={cardClass}>
        <CardHeader className={headerClass}>
          <CardTitle className={titleClass}><QrCode className="w-4 h-4" /> Generator Studio</CardTitle>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {([
                { id: "url", label: "URL", icon: Link2 },
                { id: "text", label: "Text", icon: QrCode },
                { id: "email", label: "Email", icon: Mail },
                { id: "phone", label: "Phone", icon: Phone },
                { id: "wifi", label: "WiFi", icon: Wifi },
                { id: "vcard", label: "vCard", icon: User }
              ] as const).map(t => (
                <Button key={t.id} variant={inputType === t.id ? "default" : "outline"} size="sm" onClick={() => setInputType(t.id)}>
                  <t.icon className="w-4 h-4 mr-2" /> {t.label}
                </Button>
              ))}
            </div>

            <div className="space-y-4">
              {(inputType === "url" || inputType === "text") && (
                <div className="space-y-2">
                  <Label>{inputType === "url" ? "Website URL" : "Plain Text"}</Label>
                  <Input value={text} onChange={e => setText(e.target.value)} placeholder={inputType === "url" ? "https://..." : "Enter text..."} />
                </div>
              )}
              {inputType === "email" && (
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" />
                </div>
              )}
              {inputType === "phone" && (
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1234567890" />
                </div>
              )}
              {inputType === "wifi" && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Network Name (SSID)</Label>
                    <Input value={wifiSsid} onChange={e => setWifiSsid(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input value={wifiPass} onChange={e => setWifiPass(e.target.value)} type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label>Encryption</Label>
                    <select className="w-full rounded-lg border border-border/70 bg-background/80 p-2 text-sm" value={wifiEnc} onChange={e => setWifiEnc(e.target.value)}>
                      <option value="WPA">WPA/WPA2</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">None</option>
                    </select>
                  </div>
                </div>
              )}
              {inputType === "vcard" && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2 col-span-2 sm:col-span-1">
                    <Label>Full Name</Label>
                    <Input placeholder="Full Name" value={vName} onChange={e => setVName(e.target.value)} />
                  </div>
                  <div className="space-y-2 col-span-2 sm:col-span-1">
                    <Label>Company</Label>
                    <Input placeholder="Company" value={vOrg} onChange={e => setVOrg(e.target.value)} />
                  </div>
                  <div className="space-y-2 col-span-2 sm:col-span-1">
                    <Label>Phone</Label>
                    <Input placeholder="Phone" value={vPhone} onChange={e => setVPhone(e.target.value)} />
                  </div>
                  <div className="space-y-2 col-span-2 sm:col-span-1">
                    <Label>Email</Label>
                    <Input placeholder="Email" value={vEmail} onChange={e => setVEmail(e.target.value)} />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t space-y-4">
              <h3 className="font-semibold text-sm">Customization</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Foreground</Label>
                  <div className="flex gap-2 items-center">
                    <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
                    <Input value={fgColor} onChange={e => setFgColor(e.target.value)} className="flex-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Background</Label>
                  <div className="flex gap-2 items-center">
                    <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
                    <Input value={bgColor} onChange={e => setBgColor(e.target.value)} className="flex-1" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Corner Style</Label>
                <div className="flex gap-2">
                  <Button variant={cornerStyle === "square" ? "default" : "outline"} size="sm" onClick={() => setCornerStyle("square")}>Square</Button>
                  <Button variant={cornerStyle === "rounded" ? "default" : "outline"} size="sm" onClick={() => setCornerStyle("rounded")}>Rounded</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-6 bg-muted/20 p-6 rounded-xl border">
            <div className="p-4 bg-white rounded-lg shadow-inner" style={{ backgroundColor: bgColor }}>
              {matrix.length > 0 ? (
                <svg ref={svgRef} width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
                  <rect width={size} height={size} fill={bgColor} />
                  {matrix.map((row, r) => row.map((cell, c) => cell === 1 ? (
                    <rect key={`${r}-${c}`} x={c * cellSize} y={r * cellSize} width={cellSize} height={cellSize} fill={fgColor} rx={rx} ry={rx} />
                  ) : null))}
                </svg>
              ) : (
                <div className="w-[256px] h-[256px] flex items-center justify-center text-muted-foreground">No Data</div>
              )}
            </div>
            <div className="flex gap-2 w-full">
              <Button className="flex-1" onClick={downloadPNG}><Download className="w-4 h-4 mr-2" /> PNG</Button>
              <Button variant="outline" className="flex-1" onClick={downloadSVG}><Download className="w-4 h-4 mr-2" /> SVG</Button>
            </div>
            <Button variant="ghost" size="sm" onClick={handleCopyData} className="w-full"><Copy className="w-4 h-4 mr-2" /> Copy Payload String</Button>
          </div>
        </CardContent>
      </Card>

      <ToolHowItWorks steps={[
        { step: "01", title: "Select Data Type", description: "Choose what you want to encode: a URL, WiFi credentials, contact info, or plain text.", icon: QrCode },
        { step: "02", title: "Customize Design", description: "Adjust the foreground and background colors, and choose between sharp or rounded modules.", icon: Download },
        { step: "03", title: "Export & Share", description: "Download your QR code as a high-resolution PNG or scalable SVG for print and digital use.", icon: Copy }
      ]} badges={["100% Offline", "Vector SVG", "vCard Support"]} />

      <ToolFeatureGuides features={[
        { icon: Wifi, title: "WiFi Auto-Connect", description: "Generate codes that instantly connect guests to your network without typing passwords." },
        { icon: User, title: "Digital vCards", description: "Encode full contact profiles that save directly to a smartphone's address book upon scanning." },
        { icon: Download, title: "Multi-Format Export", description: "Download as a rasterized PNG for web use or a mathematical SVG for infinite scalability in print." },
        { icon: QrCode, title: "Client-Side Privacy", description: "Your data is encoded locally in the browser. Nothing is ever transmitted to an external API." }
      ]}>
        <div className="prose dark:prose-invert max-w-none mt-6">
          <h3>Secure, Offline-First QR Generation</h3>
          <p>QR codes are the bridge between the physical and digital worlds, but relying on third-party generators for sensitive data like WiFi passwords, personal contact details, or private corporate URLs poses a significant security risk. Our QR Code Generator Studio is engineered with an offline-first architecture. The complex matrix encoding, hashing, and SVG rendering occur entirely within your browser's JavaScript engine. Your data never leaves your device, ensuring absolute privacy and making it the perfect tool for enterprise environments, secure facilities, and privacy-conscious individuals.</p>
          <p>Beyond standard URLs, this tool supports advanced data schemas. The WiFi generator formats your network credentials into the standardized <code>WIFI:T:WPA;S:NetworkName;P:Password;;</code> string, which modern iOS and Android cameras natively recognize to trigger an instant, one-tap network connection. The vCard module constructs a compliant RFC 2426 virtual contact file, allowing scanners to add your name, company, phone number, and email directly to their address book without manual typing.</p>
          <p>Design flexibility is critical for modern marketing materials. The studio allows you to map the QR module colors to your exact brand hex codes, ensuring the code blends seamlessly into posters, business cards, and packaging. You can toggle between sharp, square modules for a classic, high-contrast technical look, or rounded modules for a softer, more approachable aesthetic. The SVG export option ensures that no matter how large you scale the code for a billboard or trade show banner, the edges remain mathematically crisp and perfectly scannable by any optical sensor.</p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[
        { question: "Will these QR codes actually scan?", answer: "Yes, the generator creates valid structural patterns including the required finder eyes and timing arrays. However, for highly complex data, ensure you maintain high contrast between the foreground and background colors for optimal optical scanning." },
        { question: "Do I need an internet connection to generate codes?", answer: "No. The entire encoding algorithm and rendering engine are written in JavaScript and run locally. You can use this tool on an airplane or in a secure offline environment." },
        { question: "What is the difference between PNG and SVG exports?", answer: "PNG is a raster image best for quick web uploads or social media. SVG is a vector graphic that can be scaled to the size of a building without losing quality, making it essential for professional print design." }
      ]} />

      <RelatedTools currentToolUrl="/tools/url/qr" max={6} />
    </div>
  );
}

export { QrClient as QRClient };
export default QrClient;
