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
    <>
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
        title="How to Generate a Custom QR Code"
        subtitle="Create professional, branded QR codes for print and web in 3 simple steps."
        steps={steps}
      />

      {/* SECTION 4: FEATURE HIGHLIGHTS & DEEP SEO GUIDE */}
      <ToolFeatureGuides features={features}>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              What Is a QR Code?
            </h3>
            <p className="mb-4">
              A Quick Response (QR) code is a two-dimensional matrix barcode invented in 1994 by Masahiro Hara at the Japanese company Denso Wave. Initially designed to track vehicles during manufacturing, QR codes quickly gained global popularity due to their rapid readability and significantly larger storage capacity compared to standard UPC barcodes. While traditional linear barcodes hold information horizontally, QR codes encode data both vertically and horizontally, allowing them to store up to 7,089 numeric characters or 4,296 alphanumeric characters.
            </p>
            <p className="mb-4">
              When a smartphone camera or scanner reads a QR code, it uses the three large squares at the corners (positioning markers) to determine the orientation and scale of the code. The device then analyzes the binary grid of black and white modules to decode the underlying information. This data can be instantly translated into actionable tasks on your device, such as opening a website, joining a Wi-Fi network, saving a contact, or sending a pre-filled text message.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              QR Code Types & Use Cases
            </h3>
            <p className="mb-4">
              Not all QR codes are used for the same purpose. Depending on the data format you select, the scanning device will trigger a different native application. Here are the most common formats and when to use them:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4 text-sm sm:text-base">
              <li>
                <strong>Website URL:</strong> The most common type. Encodes an <code>http://</code> or <code>https://</code> link. Use this to direct customers to your homepage, landing page, social media profile, or promotional campaign.
              </li>
              <li>
                <strong>Wi-Fi Auto-Connect:</strong> Encodes your network SSID, encryption type, and password. When scanned, the smartphone will prompt the user to join the network immediately, eliminating the need to type complex passwords. Ideal for cafes, hotels, and guest networks.
              </li>
              <li>
                <strong>vCard Contact Info:</strong> Stores comprehensive contact details (name, organization, title, phone, email, website) in a standard format. When scanned, it prompts the user to add you directly to their phone's address book. Perfect for digital and printed business cards.
              </li>
              <li>
                <strong>SMS Message:</strong> Pre-populates a destination phone number and a message body. Use this for opt-in marketing, customer support requests, or quick feedback channels. The user only needs to hit <code>send</code> after scanning.
              </li>
              <li>
                <strong>Email Address:</strong> Pre-fills the destination email, subject line, and body text. Excellent for initiating customer support tickets, RSVPs, or specialized inquiries.
              </li>
              <li>
                <strong>WhatsApp Direct:</strong> Creates a <code>wa.me</code> link that opens the WhatsApp application with a specific phone number and pre-written message ready to send. A powerful tool for international customer service and conversational marketing.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Error Correction Levels Explained
            </h3>
            <p className="mb-4">
              One of the most robust features of QR codes is the Reed-Solomon error correction algorithm, which allows the code to be read even if it is partially obscured, damaged, or poorly printed. The algorithm adds backup data to the QR matrix, meaning you can literally cover up parts of the code and it will still scan perfectly. However, higher error correction means a denser, more complex code grid.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full text-sm border-collapse border border-muted">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-muted p-2 text-left">Level</th>
                    <th className="border border-muted p-2 text-left">Recovery Rate</th>
                    <th className="border border-muted p-2 text-left">Best Used For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-muted p-2 font-semibold">L (Low)</td>
                    <td className="border border-muted p-2">Up to 7%</td>
                    <td className="border border-muted p-2">Clean, minimal codes on screens. Allows for the simplest, least dense grid. Do not use if adding a logo.</td>
                  </tr>
                  <tr>
                    <td className="border border-muted p-2 font-semibold">M (Medium)</td>
                    <td className="border border-muted p-2">Up to 15%</td>
                    <td className="border border-muted p-2">Standard default. Good for most general use cases like simple URL links on printed materials.</td>
                  </tr>
                  <tr>
                    <td className="border border-muted p-2 font-semibold">Q (Quality)</td>
                    <td className="border border-muted p-2">Up to 25%</td>
                    <td className="border border-muted p-2">Recommended when adding a medium-sized center logo or placing codes in environments where slight damage might occur.</td>
                  </tr>
                  <tr>
                    <td className="border border-muted p-2 font-semibold">H (High)</td>
                    <td className="border border-muted p-2">Up to 30%</td>
                    <td className="border border-muted p-2">Essential when embedding large custom logo overlays or printing on rough surfaces (like fabric or corrugated cardboard).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Best Practices for QR Codes
            </h3>
            <p className="mb-4">
              To ensure your audience actually scans your code and has a seamless experience, follow these fundamental design and deployment guidelines:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4 text-sm sm:text-base">
              <li>
                <strong>Minimum Size Requirements:</strong> For printed materials, a QR code should generally be no smaller than 2cm x 2cm (0.8 x 0.8 inches). If placed on a billboard or poster, calculate the size by dividing the scanning distance by 10. For example, a code meant to be scanned from 10 meters away should be at least 1 meter wide.
              </li>
              <li>
                <strong>High Contrast is Crucial:</strong> Always maintain high contrast between the foreground (the dark modules) and the background. A black code on a white background is the gold standard. While custom colors are great for branding, avoid light colors (like yellow or pastel blue) for the foreground, and never invert the code (white modules on a black background), as many older barcode scanners cannot read inverted matrices.
              </li>
              <li>
                <strong>Preserve the Quiet Zone:</strong> The "Quiet Zone" is the empty margin surrounding the QR code. This space tells the scanner where the code begins and ends. Never let text, graphics, or borders overlap this safe padding area, or the code will fail to scan.
              </li>
              <li>
                <strong>Always Test Before Printing:</strong> Before sending a design to a professional printer, print a sample on a standard office printer at the exact final size. Test it using multiple devices (iOS and Android native cameras, plus third-party scanner apps) under various lighting conditions.
              </li>
              <li>
                <strong>Add a Clear Call to Action (CTA):</strong> Don't leave your users guessing. Place a brief instruction near the code, such as &quot;Scan to see our menu,&quot; &quot;Scan to connect to Wi-Fi,&quot; or &quot;Scan to RSVP.&quot; A clear CTA significantly increases scan rates.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              QR Codes for Business
            </h3>
            <p className="mb-4">
              Integrating QR technology into your business operations can streamline customer interactions and bridge the gap between offline physical spaces and online digital assets.
            </p>
            <p className="mb-4">
              <strong>Restaurant Menus & Ordering:</strong> Replace printed menus with a QR code placed on each table. This reduces printing costs, allows for instant menu updates, and offers a more hygienic, contactless experience. Advanced integrations can even allow users to order and pay directly from their phones.
            </p>
            <p className="mb-4">
              <strong>Event Tickets & Check-in:</strong> Generate unique QR codes for event attendees to accelerate the door check-in process. Scanning a digital ticket on a smartphone is exponentially faster than cross-referencing physical guest lists.
            </p>
            <p className="mb-4">
              <strong>Product Packaging & Manuals:</strong> Space on physical packaging is often limited. Use a QR code to link customers to comprehensive digital user manuals, assembly video tutorials, warranty registration forms, or sustainability and sourcing information.
            </p>
            <p className="mb-4">
              <strong>Marketing Campaigns & Analytics:</strong> By using trackable URL parameters (like UTM codes) within the QR payload, marketers can measure exactly how many offline interactions converted to online traffic, allowing for precise ROI calculations on print advertising, direct mail, and out-of-home campaigns.
            </p>
          </div>
        </div>
      </ToolFeatureGuides>

      {/* SECTION 5: FAQ & RELATED TOOLS */}
      <ToolFaqAccordion faqs={faqs} />

      <RelatedTools currentToolUrl="/tools/url/qr" max={6} />
    </>
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
