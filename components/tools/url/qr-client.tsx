"use client";

import {
  ArrowDownToLine,
  Image as ImageIcon,
  Key,
  RefreshCw,
  ScanLine,
  Upload,
  QrCode,
  Sparkles,
  ShieldCheck,
  Download,
  Paintbrush,
  BookOpen,
  Shield,
  Link,
  Smartphone,
  Globe,
  Zap,
  Settings2,
} from "lucide-react";
import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import ColorField from "@/components/shared/color-field";
import InputField from "@/components/shared/form-fields/input-field";
import SelectField from "@/components/shared/form-fields/select-field";
import TextareaField from "@/components/shared/form-fields/textarea-field";
import { QRCodeBox } from "@/components/shared/qr-code";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { GlassCard } from "@/components/ui/glass-card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { qrCodeData } from "@/data/data";
import { useQrExport } from "@/hooks/use-qr-export";
import { trackToolConversion, trackToolUsage } from "@/lib/gtm";
import { buildPayload } from "@/lib/utils/url/qr-code";
import toast from "react-hot-toast";

export default function QRClient() {
  const [size, setSize] = React.useState<number>(320);
  const [margin, setMargin] = React.useState<number>(2);
  const [fg, setFg] = React.useState<string>("#0f172a");
  const [bg, setBg] = React.useState<string>("#ffffff");
  const [exportScale, setExportScale] = React.useState<number>(2);
  const [quietZone, setQuietZone] = React.useState<boolean>(true);
  const [logoEnabled, setLogoEnabled] = React.useState<boolean>(false);
  const [logoDataUrl, setLogoDataUrl] = React.useState<string | null>(null);
  const [logoSizePct, setLogoSizePct] = React.useState<number>(20);
  const [genTick, setGenTick] = React.useState<number>(0);
  const [form, setForm] = React.useState<FormState>(qrCodeData as FormState);

  const controlForm = useForm<ControlValues>({
    defaultValues: { kind: "url", ecl: "M", format: "png", wifiAuth: "WPA" },
  });

  const kind = useWatch({ control: controlForm.control, name: "kind" });
  const ecl = useWatch({ control: controlForm.control, name: "ecl" });
  const format = useWatch({ control: controlForm.control, name: "format" });
  const wifiAuth = useWatch({ control: controlForm.control, name: "wifiAuth" });

  React.useEffect(() => {
    if (kind) {
      setForm((s) => (s.kind === kind ? s : { ...s, kind }));
    }
  }, [kind]);

  React.useEffect(() => {
    if (wifiAuth) {
      setForm((s) => (s.wifiAuth === wifiAuth ? s : { ...s, wifiAuth }));
    }
  }, [wifiAuth]);

  const payload = React.useMemo(() => buildPayload(form), [form]);

  const { downloadPNG, downloadSVG, getPngDataUrl } = useQrExport({
    value: payload || "Scan me",
    size,
    margin,
    ecl: (ecl ?? "M") as ECL,
    fg,
    bg,
    quietZone,
    logo: logoEnabled && logoDataUrl ? { src: logoDataUrl, sizePct: logoSizePct } : null,
  });

  const resetAll = () => {
    setForm((s) => ({
      ...s,
      kind: "url",
      url: "https://toolzium.com",
      wifiAuth: "WPA",
      wifiHidden: false,
      text: "Scan me",
    }));
    setSize(320);
    setMargin(2);
    setFg("#0f172a");
    setBg("#ffffff");
    setExportScale(2);
    setLogoEnabled(false);
    setLogoDataUrl(null);
    setLogoSizePct(20);
    setQuietZone(true);

    controlForm.reset({ kind: "url", ecl: "M", format: "png", wifiAuth: "WPA" });
    toast.success("QR Generator reset!");
  };

  const runGenerate = () => {
    trackToolUsage("QR Code", "URL");
    setGenTick((t) => t + 1);
    trackToolConversion("QR Code", "generated");
    toast.success("QR Code updated!");
  };

  const steps = [
    {
      step: "01",
      title: "Choose Data Type",
      description: "Select URL, Wi-Fi password, vCard contact info, Email, SMS, WhatsApp link, or plain text.",
      icon: QrCode,
    },
    {
      step: "02",
      title: "Customize & Add Logo",
      description: "Personalize brand colors, adjust quiet zone padding, and upload a center brand logo overlay.",
      icon: Paintbrush,
    },
    {
      step: "03",
      title: "Export High-Res Image",
      description: "Download vector SVG or high-resolution PNG up to 6x scaling for print, packaging, and screens.",
      icon: Download,
    },
  ];

  const features = [
    {
      title: "Multi-Format Payload Support",
      description: "Create QR codes for websites, Wi-Fi credentials, business vCards, WhatsApp direct chat, SMS, and Email.",
      icon: QrCode,
    },
    {
      title: "Center Logo & Branding Overlay",
      description: "Place your company or personal logo right in the center of the QR code with smart error correction.",
      icon: ImageIcon,
    },
    {
      title: "Custom Brand Colors & Styling",
      description: "Pick custom foreground and background colors to match your brand palette while maintaining scan contrast.",
      icon: Paintbrush,
    },
    {
      title: "Vector SVG & High-Res PNG Export",
      description: "Export high-density PNG files up to 6x resolution or scalable vector SVG for print production.",
      icon: ArrowDownToLine,
    },
    {
      title: "4 Levels of Error Correction",
      description: "Adjust error correction from Low (7%) to High (30%) to guarantee readability even if damaged or covered.",
      icon: Sparkles,
    },
    {
      title: "Privacy-First Local Generation",
      description: "All QR codes are rendered 100% inside your browser canvas. No URLs or passwords are sent to any server.",
      icon: ShieldCheck,
    },
  ];

  const faqs = [
    {
      question: "Which content types can I encode in a QR code?",
      answer: "You can generate QR codes for URLs, Plain Text, Wi-Fi Network auto-connect, vCard contact business cards, Email messages, SMS text messages, and WhatsApp direct chat links.",
    },
    {
      question: "Will my QR code expire?",
      answer: "No! All QR codes generated on Toolzium are static QR codes containing the direct raw payload. They work forever and never expire.",
    },
    {
      question: "Why should I use higher Error Correction (Q or H) with a logo?",
      answer: "Placing a logo over the center covers some QR data blocks. Using High (30%) or Quality (25%) Error Correction ensures camera scanners can recover the obscured data and scan reliably.",
    },
    {
      question: "Is my Wi-Fi password or private data sent to your server?",
      answer: "Never. Toolzium generates QR codes client-side in your browser using JavaScript. Your network credentials and private data never leave your computer.",
    },
    {
      question: "What format should I use for printing on banners or business cards?",
      answer: "Use SVG vector format for print production or high-resolution PNG with Export Scale set to 4x or 6x to ensure crisp lines on printed materials.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* SECTION 1: HEADER */}
      <ToolPageHeader
        title="Free QR Code Generator & Logo Customizer"
        description="Create custom QR codes for URLs, Wi-Fi networks, vCard contacts, WhatsApp, and SMS. Add logos, pick custom colors, and export SVG or high-res PNG."
        actions={
          <>
            <ResetButton onClick={resetAll} />
            <ActionButton variant="default" icon={Key} onClick={runGenerate} label="Generate QR" />
          </>
        }
      />

      {/* SECTION 2: PRIMARY WORKSPACE */}
      <GlassCard className="p-4 sm:p-5">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-base font-semibold">Select QR Content & Data Type</CardTitle>
          <CardDescription>Select a content type and enter your details. The QR code updates live below.</CardDescription>
        </CardHeader>
        <CardContent className="px-0 grid gap-4">
          <Form {...controlForm}>
            <form className="grid gap-4 sm:grid-cols-3">
              <SelectField
                name="kind"
                label="Content Type"
                options={[
                  { label: "Website URL", value: "url" },
                  { label: "Plain Text", value: "text" },
                  { label: "Wi-Fi Network", value: "wifi" },
                  { label: "vCard Contact Card", value: "vcard" },
                  { label: "Email Address", value: "email" },
                  { label: "SMS Message", value: "sms" },
                  { label: "WhatsApp Direct", value: "whatsapp" },
                ]}
                placeholder="Select type"
              />

              <SelectField
                name="ecl"
                label="Error Correction Level"
                options={[
                  { label: "L — Low (7% recovery)", value: "L" },
                  { label: "M — Medium (15% recovery)", value: "M" },
                  { label: "Q — Quality (25% recovery)", value: "Q" },
                  { label: "H — High (30% recovery - best for logos)", value: "H" },
                ]}
                placeholder="ECL"
              />

              <SelectField
                name="format"
                label="Render Format"
                options={[
                  { label: "PNG (Raster Canvas)", value: "png" },
                  { label: "SVG (Vector Graphic)", value: "svg" },
                ]}
                placeholder="Format"
              />
            </form>
          </Form>

          <DynamicFields form={form} setForm={setForm} controlForm={controlForm} />
        </CardContent>
      </GlassCard>

      {/* Appearance & Export */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
        <GlassCard className="p-4 sm:p-5">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-base font-semibold">Appearance & Styling</CardTitle>
            <CardDescription>Adjust size, border padding, brand colors, and center logo overlay.</CardDescription>
          </CardHeader>
          <CardContent className="px-0 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <SettingSlider
                label={`QR Size: ${size}px`}
                min={128}
                max={1024}
                step={16}
                value={[size]}
                onValueChange={(v) => setSize(v[0])}
              />
              <SettingSlider
                label={`Border Margin: ${margin}px`}
                min={0}
                max={16}
                step={1}
                value={[margin]}
                onValueChange={(v) => setMargin(v[0])}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ColorField id="fg" label="Foreground Color" value={fg} onChange={setFg} />
              <ColorField id="bg" label="Background Color" value={bg} onChange={setBg} />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3 bg-muted/20">
              <div className="space-y-0.5">
                <p className="text-sm font-medium leading-none">Quiet Zone (Border Padding)</p>
                <p className="text-xs text-muted-foreground">
                  Preserve border margin required for smartphone camera scanning.
                </p>
              </div>
              <Switch checked={quietZone} onCheckedChange={setQuietZone} />
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium leading-none">Center Logo Overlay</p>
                  <p className="text-xs text-muted-foreground">
                    Embed custom brand logo (recommended with ECL Q or H).
                  </p>
                </div>
                <Switch checked={logoEnabled} onCheckedChange={setLogoEnabled} />
              </div>

              <div className="grid gap-3 sm:grid-cols-2 items-center">
                <div className="space-y-2">
                  <Label htmlFor="logo-upload" className="text-xs">Upload Logo (PNG/SVG/JPG)</Label>
                  <div className="flex gap-2">
                    <InputField
                      id="logo-upload"
                      accept="image/*"
                      type="file"
                      onFilesChange={async (files) => {
                        const f = files?.[0];
                        if (!f) return;
                        const reader = new FileReader();
                        reader.onload = () => {
                          setLogoDataUrl(reader.result as string);
                          setLogoEnabled(true);
                          toast.success(`Logo uploaded: ${f.name}`);
                        };
                        reader.readAsDataURL(f);
                      }}
                    />
                    <ResetButton
                      onClick={() => {
                        setLogoDataUrl(null);
                        toast.success("Logo cleared");
                      }}
                      disabled={!logoDataUrl}
                      icon={RefreshCw}
                      label="Clear"
                    />
                  </div>
                </div>
                <SettingSlider
                  label={`Logo Scale: ${logoSizePct}%`}
                  min={10}
                  max={40}
                  step={1}
                  value={[logoSizePct]}
                  onValueChange={(v) => setLogoSizePct(v[0])}
                  disabled={!logoEnabled}
                />
              </div>
            </div>
          </CardContent>
        </GlassCard>

        {/* Live Preview & Export */}
        <GlassCard className="p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-base font-semibold">Live Preview & Export</CardTitle>
              <CardDescription>Instant live preview. Export vector SVG or high-resolution PNG.</CardDescription>
            </CardHeader>
            <CardContent className="px-0 space-y-4">
              <div className="flex items-center justify-center rounded-xl border bg-muted/40 p-6">
                <QRCodeBox
                  key={genTick}
                  value={payload}
                  format={(format ?? "png") as RenderFormat}
                  size={size}
                  margin={margin}
                  ecl={(ecl ?? "M") as ECL}
                  fg={fg}
                  bg={bg}
                  quietZone={quietZone}
                  logo={
                    logoEnabled && logoDataUrl
                      ? { src: logoDataUrl, sizePct: logoSizePct, roundedPct: 20, pad: 4 }
                      : null
                  }
                  className="rounded-lg bg-white p-2 shadow-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <SmallStat
                  icon={<ScanLine className="h-4 w-4 text-primary" />}
                  label="Type"
                  value={form.kind.toUpperCase()}
                />
                <SmallStat
                  icon={<ImageIcon className="h-4 w-4 text-primary" />}
                  label="Size"
                  value={`${size}px`}
                />
                <SmallStat
                  icon={<Upload className="h-4 w-4 text-primary" />}
                  label="Logo"
                  value={logoEnabled ? "Active" : "None"}
                />
              </div>

              <Separator />

              <SettingSlider
                label={`Export Resolution Scale: ${exportScale}x`}
                min={1}
                max={6}
                step={1}
                value={[exportScale]}
                onValueChange={(v) => setExportScale(v[0])}
              />
            </CardContent>
          </div>

          <div className="pt-4 space-y-2">
            <div className="grid gap-2 sm:grid-cols-2">
              <ActionButton
                icon={ArrowDownToLine}
                label="Download PNG"
                variant="default"
                onClick={() => {
                  downloadPNG("qrcode.png", exportScale);
                  toast.success("Downloading PNG QR Code...");
                }}
              />
              <ActionButton
                icon={ArrowDownToLine}
                label="Download SVG"
                variant="outline"
                onClick={() => {
                  downloadSVG("qrcode.svg");
                  toast.success("Downloading SVG Vector QR Code...");
                }}
                disabled={(format ?? "png") !== "svg"}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <CopyButton
                getText={() => {
                  toast.success("Copied PNG Data URL to clipboard!");
                  return getPngDataUrl(exportScale);
                }}
                label="Copy PNG Data URL"
              />
            </div>
          </div>
        </GlassCard>
      </div>

      {/* SECTION 3: HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Enter Your Content",
            description: "Type or paste a URL, text, phone number, email, WiFi credentials, vCard, or any text. The QR code generates instantly as you type.",
            icon: Link,
          },
          {
            step: "02",
            title: "Customize Style",
            description: "Adjust the QR code size, foreground color, background color, and error correction level. Preview updates in real-time.",
            icon: Settings2,
          },
          {
            step: "03",
            title: "Download & Share",
            description: "Download your QR code as PNG or SVG. Use it in print materials, business cards, menus, product packaging, or digital marketing.",
            icon: Download,
          },
        ]}
        badges={[
          "PNG & SVG export",
          "Custom colors",
          "Instant generation",
        ]}
      />

      {/* SECTION 4: FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: QrCode,
            title: "Any Content Type",
            description: "Generate QR codes for URLs, plain text, phone numbers (tel:), email addresses (mailto:), SMS, WiFi networks (WIFI:), vCards, and geographic coordinates.",
          },
          {
            icon: Download,
            title: "PNG & SVG Export",
            description: "Download as high-resolution PNG for digital use, or scalable SVG for print materials. SVG QR codes stay crisp at any size — ideal for business cards and posters.",
          },
          {
            icon: Settings2,
            title: "Error Correction Levels",
            description: "Choose error correction: L (7%), M (15%), Q (25%), H (30%). Higher levels allow the QR to be scanned even if partially damaged or covered — essential for branded QR codes with logos.",
          },
          {
            icon: Smartphone,
            title: "Mobile Scannable",
            description: "Generated QR codes are tested to be scannable by all major QR scanner apps on iOS and Android. Size recommendations ensure reliable scanning in real-world conditions.",
          },
          {
            icon: Globe,
            title: "Custom Colors",
            description: "Change foreground (module) and background colors to match your brand. Ensure sufficient contrast (dark modules on light background) for reliable scanning.",
          },
          {
            icon: Shield,
            title: "Client-Side & Private",
            description: "All QR code generation runs in your browser. Your URLs and data are never sent to any server — safe for internal links, private content, and sensitive data.",
          },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">QR Code Guide — Formats, Sizes, and Best Practices</h3>
          <p>
            <strong>QR codes (Quick Response codes)</strong> were invented by Denso Wave in 1994 for
            tracking automotive parts. Today they are one of the most versatile tools for connecting
            physical and digital worlds — appearing on restaurant menus, product packaging, business
            cards, event tickets, and marketing materials worldwide.
          </p>

          <h4 className="font-semibold">QR Code Content Types Reference</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Content Type</th>
                  <th className="border p-2 text-left">Format</th>
                  <th className="border p-2 text-left">Use Case</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Website URL", "https://example.com", "Link to any web page"],
                  ["Phone number", "tel:+1234567890", "Tap to call button"],
                  ["Email", "mailto:user@example.com", "Open email client"],
                  ["SMS", "sms:+1234567890?body=Hello", "Pre-filled text message"],
                  ["WiFi", "WIFI:T:WPA;S:NetworkName;P:Password;;", "Connect to WiFi automatically"],
                  ["vCard", "BEGIN:VCARD...END:VCARD", "Save contact to phone"],
                  ["Plain text", "Any text content", "Notes, codes, instructions"],
                  ["Geo location", "geo:48.8566,2.3522", "Open in maps app"],
                ].map(([type, format, use]) => (
                  <tr key={type} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{type}</td>
                    <td className="border p-2 font-mono text-primary text-xs">{format}</td>
                    <td className="border p-2 text-muted-foreground text-xs">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold">QR Code Size Guide for Print</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Print Use</th>
                  <th className="border p-2 text-left">Min Size</th>
                  <th className="border p-2 text-left">Scan Distance</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Business card", "2 × 2 cm (0.8\")", "Up to 20 cm (8\")"],
                  ["Brochure / flyer", "3 × 3 cm (1.2\")", "Up to 30 cm (12\")"],
                  ["Magazine / poster A4", "4 × 4 cm (1.6\")", "Up to 40 cm (16\")"],
                  ["Poster A1 (large)", "6 × 6 cm (2.4\")", "Up to 60 cm (24\")"],
                  ["Billboard / outdoor", "20 × 20 cm+", "From meters away"],
                ].map(([use, size, dist]) => (
                  <tr key={use} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{use}</td>
                    <td className="border p-2 text-primary text-xs">{size}</td>
                    <td className="border p-2 text-xs">{dist}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold">Error Correction Levels Explained</h4>
          <p>
            QR codes have built-in error correction that allows them to be read even when partially
            damaged or obscured. Higher correction levels create more complex (denser) QR codes but
            enable more damage tolerance. Use <strong>H (High, 30%)</strong> when placing a logo
            in the center of the QR code.
          </p>
        </div>
      </ToolFeatureGuides>

      {/* SECTION 5: FAQ + RELATED TOOLS */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "What types of content can a QR code contain?",
            answer: "QR codes can encode URLs, plain text, phone numbers (tel:), email addresses (mailto:), SMS messages, WiFi credentials (WIFI: format), vCard contacts, and geographic coordinates. The most common use is URL linking, but any text up to ~3,000 characters can be encoded.",
          },
          {
            question: "What is the best QR code size for print?",
            answer: "The minimum recommended size is 2 × 2 cm (0.8 inches) for a business card scanned from 20 cm. For reliable scanning, use at least 3 × 3 cm for brochures. The rule of thumb: minimum size = 1/10 of the expected scanning distance. A QR code on a billboard 10 meters away needs to be at least 1 meter wide.",
          },
          {
            question: "What is error correction in QR codes?",
            answer: "Error correction allows QR codes to be scanned even when partially damaged, dirty, or covered. Four levels: L (7% damage tolerance), M (15%), Q (25%), H (30%). Use H level when adding a logo to the center of the QR code — the logo can cover up to 30% of the code and it will still scan.",
          },
          {
            question: "Do QR codes expire?",
            answer: "Static QR codes (like those generated here) never expire — they encode content directly and work forever. Dynamic QR codes (from paid services like Bitly or QR Tiger) redirect through a URL that can be changed or can expire. For permanent links like website URLs, static QR codes are completely reliable.",
          },
          {
            question: "Can I customize the color of a QR code?",
            answer: "Yes, but with constraints. Always use a dark color for modules (dots) on a light background. Avoid red modules on white or green modules on red — phones cameras struggle with low-contrast QR codes. A safe rule: the foreground should be at least 4:1 contrast ratio against the background.",
          },
        ]}
      />
      <RelatedTools currentToolUrl="/tools/url/qr" max={6} />
    </div>
  );
}

/* Sub-Components */

function DynamicFields({
  form,
  setForm,
  controlForm,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  controlForm: ReturnType<typeof useForm<ControlValues>>;
}) {
  if (form.kind === "url") {
    return (
      <div className="space-y-2">
        <InputField
          id="url"
          label="Website URL"
          placeholder="https://example.com"
          value={form.url}
          onChange={(e) => setForm((s) => ({ ...s, url: e.target.value }))}
        />
      </div>
    );
  }

  if (form.kind === "text") {
    return (
      <TextareaField
        id="text"
        label="Plain Text Message"
        placeholder="Enter your message or text..."
        value={form.text}
        onValueChange={(v) => setForm((s) => ({ ...s, text: v }))}
        rows={3}
        autoResize
        showCount
        maxLength={1000}
      />
    );
  }

  if (form.kind === "wifi") {
    return (
      <Form {...controlForm}>
        <form className="grid gap-4 sm:grid-cols-2">
          <InputField
            id="ssid"
            label="Network SSID (Name)"
            placeholder="MyNetworkName"
            value={form.wifiSsid}
            onChange={(e) => setForm((s) => ({ ...s, wifiSsid: e.target.value }))}
          />

          <SelectField
            name="wifiAuth"
            label="Authentication Security"
            options={[
              { label: "WPA / WPA2 / WPA3", value: "WPA" },
              { label: "WEP", value: "WEP" },
              { label: "Open (No Password)", value: "nopass" },
            ]}
            placeholder="Auth"
          />

          {form.wifiAuth !== "nopass" && (
            <InputField
              id="wifipw"
              label="Wi-Fi Password"
              placeholder="Enter wireless password"
              value={form.wifiPassword}
              onChange={(e) => setForm((s) => ({ ...s, wifiPassword: e.target.value }))}
            />
          )}

          <div className="col-span-2 flex items-center justify-between rounded-lg border p-3 bg-muted/20">
            <div className="space-y-0.5">
              <p className="text-sm font-medium leading-none">Hidden Network</p>
              <p className="text-xs text-muted-foreground">Check if your router SSID is hidden.</p>
            </div>
            <Switch
              checked={form.wifiHidden}
              onCheckedChange={(v) => setForm((s) => ({ ...s, wifiHidden: v }))}
            />
          </div>
        </form>
      </Form>
    );
  }

  if (form.kind === "vcard") {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          id="vcfirst"
          label="First Name"
          value={form.vcFirst}
          onChange={(e) => setForm((s) => ({ ...s, vcFirst: e.target.value }))}
        />
        <InputField
          id="vclast"
          label="Last Name"
          value={form.vcLast}
          onChange={(e) => setForm((s) => ({ ...s, vcLast: e.target.value }))}
        />
        <InputField
          id="vcorg"
          label="Organization / Company"
          value={form.vcOrg}
          onChange={(e) => setForm((s) => ({ ...s, vcOrg: e.target.value }))}
        />
        <InputField
          id="vctitle"
          label="Job Title"
          value={form.vcTitle}
          onChange={(e) => setForm((s) => ({ ...s, vcTitle: e.target.value }))}
        />
        <InputField
          id="vcphone"
          label="Phone Number"
          value={form.vcPhone}
          onChange={(e) => setForm((s) => ({ ...s, vcPhone: e.target.value }))}
        />
        <InputField
          id="vcemail"
          type="email"
          label="Email Address"
          value={form.vcEmail}
          onChange={(e) => setForm((s) => ({ ...s, vcEmail: e.target.value }))}
        />
        <div className="col-span-2">
          <InputField
            id="vcurl"
            label="Website URL"
            value={form.vcUrl}
            onChange={(e) => setForm((s) => ({ ...s, vcUrl: e.target.value }))}
          />
        </div>
      </div>
    );
  }

  if (form.kind === "email") {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          id="mailto"
          type="email"
          label="Send To Email"
          placeholder="hello@example.com"
          value={form.emailTo}
          onChange={(e) => setForm((s) => ({ ...s, emailTo: e.target.value }))}
        />
        <InputField
          id="mailsub"
          label="Email Subject"
          placeholder="Inquiry regarding..."
          value={form.emailSubject}
          onChange={(e) => setForm((s) => ({ ...s, emailSubject: e.target.value }))}
        />
        <TextareaField
          id="mailbody"
          label="Email Body Text"
          placeholder="Pre-populated message body..."
          value={form.emailBody}
          onValueChange={(v) => setForm((s) => ({ ...s, emailBody: v }))}
          rows={3}
          autoResize
          showCount
          maxLength={1000}
        />
      </div>
    );
  }

  if (form.kind === "sms") {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          id="smsto"
          label="Phone Number"
          placeholder="+1234567890"
          value={form.smsTo}
          onChange={(e) => setForm((s) => ({ ...s, smsTo: e.target.value }))}
        />
        <TextareaField
          id="smsbody"
          label="Message Body"
          placeholder="Enter your message..."
          value={form.smsBody}
          onValueChange={(v) => setForm((s) => ({ ...s, smsBody: v }))}
          rows={3}
          autoResize
          showCount
          maxLength={1000}
        />
      </div>
    );
  }

  // whatsapp
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <InputField
        id="wato"
        label="WhatsApp Phone Number (with country code, no +)"
        placeholder="14155552671"
        value={form.waTo}
        onChange={(e) => setForm((s) => ({ ...s, waTo: e.target.value }))}
      />
      <TextareaField
        id="watext"
        label="Pre-filled Chat Message"
        placeholder="Hi! I am interested in..."
        value={form.waText}
        onValueChange={(v) => setForm((s) => ({ ...s, waText: v }))}
        rows={3}
        autoResize
        showCount
        maxLength={1000}
      />
    </div>
  );
}

function SmallStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-2.5 bg-muted/20">
      <div className="flex items-center gap-1.5 text-xs">
        {icon}
        <span className="text-muted-foreground">{label}</span>
      </div>
      <span className="text-xs font-semibold">{value}</span>
    </div>
  );
}

function SettingSlider({
  label,
  value,
  onValueChange,
  min,
  max,
  step,
  disabled,
}: {
  label: string;
  value: number[];
  onValueChange: (v: number[]) => void;
  min: number;
  max: number;
  step: number;
  disabled?: boolean;
}) {
  return (
    <div className={disabled ? "opacity-60 pointer-events-none" : ""}>
      <Label className="mb-1 block text-xs font-medium">{label}</Label>
      <Slider value={value} onValueChange={onValueChange} min={min} max={max} step={step} />
    </div>
  );
}
