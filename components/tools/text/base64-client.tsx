"use client";

import {
  ArrowLeftRight,
  Code2,
  File as FileIcon,
  FileText,
  Globe,
  Image as ImageIcon,
  Lock,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Zap,
} from "lucide-react";
import * as React from "react";
import toast from "react-hot-toast";
import { RelatedTools } from "@/components/shared/related-tools";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import {
  ActionButton,
  CopyButton,
  ExportFromUrlButton,
  ExportTextButton,
  LinkButton,
  ResetButton,
} from "@/components/shared/action-buttons";
import InputField from "@/components/shared/form-fields/input-field";
import SwitchRow from "@/components/shared/form-fields/switch-row";
import TextareaField from "@/components/shared/form-fields/textarea-field";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  base64ToU8,
  fileToU8,
  fromUrlSafe,
  inferPreviewKind,
  toUrlSafe,
  u8ToBase64,
  u8ToBlob,
  wrapLines,
} from "@/lib/utils/text/base64";

type TabKey = "text" | "file";
type Base64Mode = "encode" | "decode";
type FileInfo = {
  name: string;
  size: number;
  type: string;
};

export default function Base64Client() {
  const [tab, setTab] = React.useState<TabKey>("text");
  const [mode, setMode] = React.useState<Base64Mode>("encode");
  const [urlSafe, setUrlSafe] = React.useState<boolean>(false);
  const [noPadding, setNoPadding] = React.useState<boolean>(false);
  const [wrapCol, setWrapCol] = React.useState<number>(0);
  const [inputText, setInputText] = React.useState<string>("");
  const [outputText, setOutputText] = React.useState<string>("");
  const [inFile, setInFile] = React.useState<File | null>(null);
  const [inInfo, setInInfo] = React.useState<FileInfo | null>(null);
  const [outFileInfo, setOutFileInfo] = React.useState<FileInfo | null>(null);
  const [outBlobUrl, setOutBlobUrl] = React.useState<string>("");
  const [previewText, setPreviewText] = React.useState<string>("");
  const dropRef = React.useRef<HTMLLabelElement | null>(null);
  const previewRef = React.useRef<HTMLTextAreaElement | null>(null);

  React.useEffect(() => {
    return () => {
      if (outBlobUrl) URL.revokeObjectURL(outBlobUrl);
    };
  }, [outBlobUrl]);

  React.useEffect(() => {
    try {
      if (!inputText) {
        setOutputText("");
        return;
      }

      if (mode === "encode") {
        const u8 = new TextEncoder().encode(inputText);
        let b64 = u8ToBase64(u8);
        if (urlSafe) b64 = toUrlSafe(b64, noPadding);
        setOutputText(wrapCol > 0 ? wrapLines(b64, wrapCol) : b64);
      } else {
        const cleaned = inputText.replace(/\s+/g, "");
        const restored = urlSafe ? fromUrlSafe(cleaned) : cleaned;
        const u8 = base64ToU8(restored);
        setOutputText(new TextDecoder().decode(u8));
      }
    } catch {
      setOutputText("Failed to process. Check your input.");
    }
  }, [inputText, mode, urlSafe, noPadding, wrapCol]);

  const resetAll = () => {
    setMode("encode");
    setUrlSafe(false);
    setNoPadding(false);
    setWrapCol(0);
    setInputText("");
    setOutputText("");
    setInFile(null);
    setInInfo(null);
    setOutFileInfo(null);
    setPreviewText("");
    if (outBlobUrl) {
      URL.revokeObjectURL(outBlobUrl);
      setOutBlobUrl("");
    }
    toast.success("Reset!");
  };

  const encodeFile = async () => {
    if (!inFile) return;
    const data = await fileToU8(inFile);
    let b64 = u8ToBase64(data);
    if (urlSafe) b64 = toUrlSafe(b64, noPadding);
    const wrapped = wrapCol > 0 ? wrapLines(b64, wrapCol) : b64;

    const out = new Blob([wrapped], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(out);
    if (outBlobUrl) URL.revokeObjectURL(outBlobUrl);
    setOutBlobUrl(url);
    setOutFileInfo({
      name: `${inFile.name}.base64.txt`,
      size: out.size,
      type: "text/plain",
    });

    if (out.size < 200 * 1024) {
      const preview = await out.text();
      setPreviewText(preview.slice(0, 20_000));
    } else {
      setPreviewText("");
    }
    toast.success("File encoded successfully!");
  };

  const decodeFile = async () => {
    if (!inFile) return;
    const text = await inFile.text();
    const cleaned = text.replace(/\s+/g, "");
    const restored = urlSafe ? fromUrlSafe(cleaned) : cleaned;

    try {
      const u8 = base64ToU8(restored);
      let type = "";
      if (u8[0] === 0x89 && String.fromCharCode(...u8.slice(1, 4)) === "PNG") type = "image/png";
      else if (u8[0] === 0xff && u8[1] === 0xd8) type = "image/jpeg";
      else if (String.fromCharCode(...u8.slice(0, 3)) === "GIF") type = "image/gif";
      else if (String.fromCharCode(...u8.slice(0, 4)) === "%PDF") type = "application/pdf";
      else {
        const sample = new TextDecoder().decode(u8.slice(0, 64));
        if (/^[\t\n\r\u0020-\u007E]/.test(sample)) {
          type = "text/plain";
        }
      }

      const out = u8ToBlob(u8, type || "application/octet-stream");
      const url = URL.createObjectURL(out);
      if (outBlobUrl) URL.revokeObjectURL(outBlobUrl);
      setOutBlobUrl(url);
      setOutFileInfo({
        name: inFile.name.replace(/\.base64(\.txt)?$/i, "") || "decoded.bin",
        size: out.size,
        type: type || "application/octet-stream",
      });

      if (
        type &&
        (type.startsWith("text/") || type === "application/json") &&
        out.size < 200 * 1024
      ) {
        const preview = await out.text();
        setPreviewText(preview.slice(0, 20_000));
      } else {
        setPreviewText("");
      }
      toast.success("File decoded successfully!");
    } catch {
      if (outBlobUrl) {
        URL.revokeObjectURL(outBlobUrl);
        setOutBlobUrl("");
      }
      setOutFileInfo({
        name: "decode-error.txt",
        size: 0,
        type: "text/plain",
      });
      setPreviewText("");
      toast.error("Decode failed. Check your input.");
    }
  };

  const onDropFiles: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setInFile(f);
    setInInfo({ name: f.name, size: f.size, type: f.type || "application/octet-stream" });
    setOutFileInfo(null);
    setPreviewText("");
    if (outBlobUrl) {
      URL.revokeObjectURL(outBlobUrl);
      setOutBlobUrl("");
    }
  };

  const steps = [
    {
      step: "Step 1",
      title: "Input Data",
      description: "Paste your text or drop a file into the tool.",
      icon: FileIcon,
    },
    {
      step: "Step 2",
      title: "Select Options",
      description: "Choose to encode or decode, and configure URL-safe or no padding options.",
      icon: RefreshCw,
    },
    {
      step: "Step 3",
      title: "Get Result",
      description: "Copy your output text or download the decoded/encoded file instantly.",
      icon: Sparkles,
    },
  ];

  const features = [
    {
      title: "Text & File Support",
      description: "Encode text snippets or complete files including images and PDFs seamlessly.",
      icon: FileText,
    },
    {
      title: "URL-Safe Encoding",
      description: "Generate URL-safe Base64 strings for use in web applications and APIs.",
      icon: Globe,
    },
    {
      title: "Lightning Fast",
      description: "All processing happens locally in your browser for instant results.",
      icon: Zap,
    },
    {
      title: "Privacy First",
      description: "No data is sent to our servers. Your files remain on your device.",
      icon: ShieldCheck,
    },
    {
      title: "Developer Tools",
      description: "Perfect for decoding JWTs or generating Data URIs for embedded assets.",
      icon: Code2,
    },
    {
      title: "Not Encryption",
      description: "Remember, Base64 is encoding, not encryption. Do not use for passwords.",
      icon: Lock,
    },
  ];

  const faqs = [
    {
      question: "What is Base64 encoding used for?",
      answer: "Base64 encodes binary data (like images and files) into ASCII text. It is commonly used in data URIs, email MIME attachments, JWT tokens, and HTTP Basic Authentication headers.",
    },
    {
      question: "Can I encode files and images to Base64?",
      answer: "Yes. Switch to the File tab, upload any file, and click Encode. The tool generates the full Base64 string with automatic MIME type detection and optional data URL output.",
    },
    {
      question: "Is Base64 encoding secure?",
      answer: "No. Base64 is an encoding scheme, not encryption. It is fully reversible and provides zero confidentiality. Never use Base64 to hide passwords or sensitive data.",
    },
    {
      question: "What is the difference between Base64 and Base64URL?",
      answer: "Standard Base64 uses + and / characters, which conflict with URLs. Base64URL replaces them with - and _, and optionally omits the = padding, making it safe for URLs, filenames, and JWT tokens.",
    },
    {
      question: "Does Base64 increase file size?",
      answer: "Yes. Base64 encoding increases data size by approximately 33% because it represents every 3 bytes of binary data as 4 ASCII characters.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <ToolPageHeader
        icon={ArrowLeftRight}
        title="Base64 Encoder / Decoder"
        description="Encode or decode strings & files in Base64"
        actions={<ResetButton variant="default" onClick={resetAll} />}
      />

      {/* Mode + Options */}
      <GlassCard className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <ActionButton
                label="Encode"
                variant={mode === "encode" ? "default" : "outline"}
                size="sm"
                onClick={() => setMode("encode")}
              />
              <ActionButton
                label="Decode"
                variant={mode === "decode" ? "default" : "outline"}
                size="sm"
                onClick={() => setMode("decode")}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <SwitchRow
              label="URL-safe"
              hint="Use - and _ instead of +//."
              className="w-full sm:w-auto"
              checked={urlSafe}
              onCheckedChange={setUrlSafe}
            />

            <SwitchRow
              hint="Remove trailing &gt;= signs."
              label="No padding"
              className="w-full sm:w-auto"
              checked={noPadding}
              onCheckedChange={setNoPadding}
            />

            <InputField
              label="Line wrap"
              id="wrap"
              type="number"
              min={0}
              placeholder="0 (off)"
              value={wrapCol || ""}
              onChange={(e) => setWrapCol(Math.max(0, Number(e.target.value) || 0))}
              className="w-full sm:w-28"
            />
          </div>
        </div>
      </GlassCard>

      <Separator />

      {/* Tabs: Text / File */}
      <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text" className="gap-2">
            <FileText className="h-4 w-4" /> Text
          </TabsTrigger>
          <TabsTrigger value="file" className="gap-2">
            <FileIcon className="h-4 w-4" /> File
          </TabsTrigger>
        </TabsList>

        {/* TEXT */}
        <TabsContent value="text" className="grid gap-4 md:grid-cols-2">
          <GlassCard className="p-5 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium">Input</Label>
              <CopyButton getText={() => inputText} />
            </div>
            <TextareaField
              value={inputText}
              onValueChange={setInputText}
              placeholder={mode === "encode" ? "Type text to encode…" : "Paste Base64 to decode…"}
              textareaClassName="min-h-[250px]"
              autoResize
            />
          </GlassCard>

          <GlassCard className="p-5 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium">Output</Label>
              <div className="flex gap-2">
                <CopyButton getText={() => outputText} />
                <ExportTextButton
                  variant="default"
                  filename="encoded-base64.txt"
                  getText={() => outputText}
                  disabled={!outputText}
                />
              </div>
            </div>
            <TextareaField
              value={outputText}
              readOnly
              placeholder="Result appears here…"
              textareaClassName="min-h-[250px]"
              autoResize
            />
          </GlassCard>
        </TabsContent>

        {/* FILE */}
        <TabsContent value="file">
          <div className="grid gap-4 md:grid-cols-2">
            {/* LEFT: Input file */}
            <GlassCard className="p-5">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium">Input File</Label>

                <div className="flex items-center gap-2">
                  <ResetButton onClick={resetAll} />
                  <ActionButton
                    variant="default"
                    onClick={mode === "encode" ? encodeFile : decodeFile}
                    disabled={!inFile}
                    icon={ArrowLeftRight}
                    label={mode === "encode" ? "Encode" : "Decode"}
                  />
                </div>
              </div>

              <label
                ref={dropRef}
                htmlFor="file-input"
                className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed p-8 text-center transition hover:bg-muted/50 min-h-[200]"
              >
                <UploadCloud className="h-7 w-7" />
                <div className="text-sm font-medium">Drag & drop or click to upload</div>
                <div className="text-xs text-muted-foreground">
                  Any file type • Max depends on browser memory
                </div>
                <Input id="file-input" type="file" className="hidden" onChange={onDropFiles} />
              </label>

              {inInfo && (
                <div className="rounded-lg border p-3 text-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{inInfo.type || "application/octet-stream"}</Badge>
                    <span className="text-muted-foreground">
                      {(inInfo.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                  <div className="mt-1 font-mono text-xs">{inInfo.name}</div>
                </div>
              )}
            </GlassCard>

            {/* RIGHT: Output */}
            <GlassCard className="p-5">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Output</Label>

                {outFileInfo && (
                  <div className="flex flex-wrap gap-2">
                    <CopyButton getText={() => outBlobUrl || ""} disabled={!outBlobUrl} />
                    {outBlobUrl && (
                      <ExportFromUrlButton
                        filename={outFileInfo.name}
                        url={outBlobUrl}
                        label="Download"
                        variant="default"
                      />
                    )}
                    {outBlobUrl && inferPreviewKind(outFileInfo.type) === "image" && (
                      <LinkButton
                        href={outBlobUrl}
                        label="Open preview"
                        variant="default"
                        icon={ImageIcon}
                      />
                    )}
                  </div>
                )}
              </div>

              {outFileInfo && (
                <div className="flex flex-col gap-2 border p-3 rounded-md">
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <Badge variant="secondary">{outFileInfo.type}</Badge>
                    <span className="text-muted-foreground">
                      {(outFileInfo.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                  <div className="text-xs">{outFileInfo.name}</div>
                </div>
              )}

              {!outFileInfo && (
                <div className="text-xs text-muted-foreground">
                  After processing, your downloadable file will appear here.
                </div>
              )}

              {outFileInfo && (
                <div>
                  {outBlobUrl &&
                    inferPreviewKind(outFileInfo.type) === "text" &&
                    outFileInfo.size < 200 * 1024 && (
                      <>
                        <Label className="text-xs text-muted-foreground mb-1">Preview</Label>
                        <TextareaField
                          ref={previewRef}
                          readOnly
                          textareaClassName="min-h-[180px]"
                          value={previewText}
                        />
                      </>
                    )}
                </div>
              )}
            </GlassCard>
          </div>
        </TabsContent>
      </Tabs>

      <ToolHowItWorks title="How Base64 Encoding Works" steps={steps} />

      <ToolFeatureGuides title="Comprehensive Guide to Base64 Encoding" features={features}>
        <div className="space-y-6 text-muted-foreground mt-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">What Is Base64 Encoding?</h3>
            <p>
              Base64 is a widely used binary-to-text encoding scheme that translates arbitrary binary data into an ASCII string format. The alphabet consists of 64 characters: <code>A-Z</code>, <code>a-z</code>, <code>0-9</code>, plus <code>+</code> and <code>/</code>, with <code>=</code> acting as a padding character.
            </p>
            <p>
              Under the hood, Base64 works by breaking binary data into 6-bit groups. Since each 6-bit group can represent 64 different values, it maps perfectly to the 64 characters of the Base64 alphabet.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Why Base64 Exists</h3>
            <p>Base64 bridges the gap between binary data and text-based protocols. Key use cases include:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Email Attachments:</strong> Protocols like SMTP were originally designed to handle text. Base64 (via MIME) safely encodes binary attachments (like images or PDFs).</li>
              <li><strong>Data URIs in Web Development:</strong> Base64 allows embedding small images or fonts directly inside HTML and CSS files, reducing HTTP requests.</li>
              <li><strong>JWT Tokens:</strong> JSON Web Tokens heavily rely on Base64URL to securely encode JSON payloads in a compact, URL-safe manner.</li>
              <li><strong>API Authentication:</strong> HTTP Basic Auth passes credentials encoded in Base64 (e.g., <code>Authorization: Basic dXNlcjpwYXNz</code>).</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Base64 vs Base64URL</h3>
            <p>
              Standard Base64 works perfectly for most applications, but the <code>+</code> and <code>/</code> characters have special meaning in URLs. Base64URL was created to solve this conflict.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted text-foreground">
                  <tr>
                    <th className="px-4 py-2 border">Feature</th>
                    <th className="px-4 py-2 border">Standard Base64</th>
                    <th className="px-4 py-2 border">Base64URL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border font-medium">Characters</td>
                    <td className="px-4 py-2 border"><code>A-Z, a-z, 0-9, +, /</code></td>
                    <td className="px-4 py-2 border"><code>A-Z, a-z, 0-9, -, _</code></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border font-medium">Padding</td>
                    <td className="px-4 py-2 border">Required (<code>=</code>)</td>
                    <td className="px-4 py-2 border">Optional (often omitted)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border font-medium">URL Safe</td>
                    <td className="px-4 py-2 border">No (conflicts in URLs)</td>
                    <td className="px-4 py-2 border">Yes</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border font-medium">Used In</td>
                    <td className="px-4 py-2 border">Email, data URIs</td>
                    <td className="px-4 py-2 border">JWT, URL params</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Size Overhead</h3>
            <p>
              A significant drawback of Base64 is that it increases data size. Because 3 bytes (24 bits) of binary data are represented as 4 characters (24 bits = four 6-bit groups), the payload increases by approximately <strong>33%</strong>.
            </p>
            <p>
              For this reason, embedding large images via Base64 in CSS files is often discouraged. If you must send large Base64 payloads over a network, always ensure gzip or Brotli compression is applied at the transport layer to offset the bloat.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Base64 Is NOT Encryption</h3>
            <div className="p-4 bg-muted border-l-4 border-primary rounded-r-md">
              <p className="font-semibold text-foreground mb-2">Critical Security Clarification</p>
              <p>Base64 provides zero confidentiality. It is fully and easily reversible. Never use Base64 to &quot;hide&quot; or secure passwords, API keys, or sensitive PII.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Common Mistakes to Avoid</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Encoding Passwords:</strong> Passwords should always be securely hashed using algorithms like bcrypt or Argon2, not encoded in Base64.</li>
              <li><strong>Double-Encoding:</strong> Sometimes developers mistakenly Base64-encode data that is already encoded, unnecessarily inflating file sizes and complicating decoding.</li>
              <li><strong>Missing MIME Types:</strong> When building a Data URI, explicitly declare the MIME type to ensure the browser processes it correctly.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Data URI Syntax</h3>
            <p>To embed an image in a browser, use the standard data URI scheme:</p>
            <pre className="bg-muted p-3 rounded-md overflow-x-auto text-sm">
              <code>data:[&lt;mediatype&gt;][;base64],&lt;data&gt;</code>
            </pre>
            <p>Example for a PNG image:</p>
            <pre className="bg-muted p-3 rounded-md overflow-x-auto text-sm">
              <code>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...</code>
            </pre>
          </div>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={faqs} />
      
      <RelatedTools currentToolUrl="/tools/text/base64" max={6} />
    </div>
  );
}
