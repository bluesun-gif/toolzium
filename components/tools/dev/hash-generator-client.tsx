"use client";

import {
  ActionButton,
  CopyButton,
  ExportTextButton,
  ResetButton,
} from "@/components/shared/action-buttons";
import InputField from "@/components/shared/form-fields/input-field";
import SwitchRow from "@/components/shared/form-fields/switch-row";
import TextareaField from "@/components/shared/form-fields/textarea-field";
import Stat from "@/components/shared/stat";
import ToolPageHeader from "@/components/shared/tool-page-header";
import {
  Check,
  Code2,
  DownloadCloud,
  Globe,
  Hash,
  Lock,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  TimerReset as Timer,
  Upload,
  Zap,
} from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import { RelatedTools } from "@/components/shared/related-tools";

import { Badge } from "@/components/ui/badge";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { Separator } from "@/components/ui/separator";
import { base64, digest, hex, hmac } from "@/lib/utils/dev/hash-generator";

// Helpers: bytes / encoders
const enc = new TextEncoder();

function toBytes(s: string) {
  return enc.encode(s);
}

const ALL_ALGOS: AlgoKey[] = ["MD5", "SHA-1", "SHA-256", "SHA-384", "SHA-512"];

export default function HashGeneratorClient() {
  const [mode, setMode] = useState<"text" | "file">("text");
  const [text, setText] = useState<string>("Hello, World!");
  const [fileName, setFileName] = useState<string>("");
  const [fileBytes, setFileBytes] = useState<Uint8Array | null>(null);

  const [algos, setAlgos] = useState<Record<AlgoKey, boolean>>({
    MD5: true,
    "SHA-1": true,
    "SHA-256": true,
    "SHA-384": false,
    "SHA-512": false,
  });
  const [useHmac, setUseHmac] = useState<boolean>(false);
  const [hmacKey, setHmacKey] = useState<string>("");
  const [salt, setSalt] = useState<string>("");
  const [saltBefore, setSaltBefore] = useState<boolean>(true);

  const [encoding, setEncoding] = useState<"hex" | "base64">("hex");
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [autoRun, setAutoRun] = useState<boolean>(true);

  const [results, setResults] = useState<ResultRow[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [perf, setPerf] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedAlgoList = useMemo(
    () => ALL_ALGOS.filter((a) => algos[a]),
    [algos]
  );

  const sourceBytes = useMemo(() => {
    const payload =
      mode === "text" ? toBytes(text) : fileBytes ?? new Uint8Array();
    const s = toBytes(salt);
    if (s.length === 0) return payload;
    return saltBefore
      ? new Uint8Array([...s, ...payload])
      : new Uint8Array([...payload, ...s]);
  }, [mode, text, fileBytes, salt, saltBefore]);

  const run = useCallback(async () => {
    setError(null);
    const start = performance.now();
    try {
      const list: ResultRow[] = [];
      for (const algo of selectedAlgoList) {
        let outBytes: Uint8Array;
        if (useHmac) {
          const keyBytes = toBytes(hmacKey);
          outBytes = await hmac(algo, keyBytes, sourceBytes);
        } else {
          outBytes = await digest(algo, sourceBytes);
        }
        const str =
          encoding === "hex" ? hex(outBytes, uppercase) : base64(outBytes);
        list.push({ name: algo, value: str });
      }
      setResults(list);
      setPerf(performance.now() - start);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to hash input.");
      setResults([]);
      setPerf(null);
    }
  }, [selectedAlgoList, useHmac, hmacKey, sourceBytes, encoding, uppercase]);

  useEffect(() => {
    if (autoRun) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      void run();
    }
  }, [autoRun, run]);

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    const reader = new FileReader();
    reader.onload = () => {
      const ab = reader.result as ArrayBuffer;
      setFileBytes(new Uint8Array(ab));
    };
    reader.readAsArrayBuffer(f);
  }

  function resetAll() {
    setMode("text");
    setText("Hello, World!");
    setFileName("");
    setFileBytes(null);
    setAlgos({
      MD5: true,
      "SHA-1": true,
      "SHA-256": true,
      "SHA-384": false,
      "SHA-512": false,
    });
    setUseHmac(false);
    setHmacKey("");
    setSalt("");
    setSaltBefore(true);
    setEncoding("hex");
    setUppercase(false);
    setAutoRun(true);
    setResults([]);
    setPerf(null);
    setError(null);
    toast.success("Reset successfully!");
  }

  const steps = [
    {
      step: "Step 1",
      title: "Input Data",
      description: "Enter your text or upload a file you want to hash.",
      icon: Code2,
    },
    {
      step: "Step 2",
      title: "Select Algorithms",
      description: "Choose one or more hash algorithms like MD5, SHA-256, or SHA-512.",
      icon: ShieldCheck,
    },
    {
      step: "Step 3",
      title: "Generate Hash",
      description: "Instantly generate and copy your hashes in Hex or Base64 format.",
      icon: Sparkles,
    },
  ];

  const features = [
    {
      title: "Multiple Algorithms",
      description: "Supports MD5, SHA-1, SHA-256, SHA-384, and SHA-512 simultaneously.",
      icon: ShieldCheck,
    },
    {
      title: "Text & File Hashing",
      description: "Easily hash short text strings or verify large files locally.",
      icon: Code2,
    },
    {
      title: "HMAC Support",
      description: "Compute Hash-based Message Authentication Codes with a secret key.",
      icon: Lock,
    },
    {
      title: "Custom Salting",
      description: "Add a custom salt (prefix or suffix) to protect against rainbow tables.",
      icon: Zap,
    },
    {
      title: "Local Processing",
      description: "All hashing is done entirely in your browser for maximum privacy.",
      icon: Globe,
    },
    {
      title: "Instant Export",
      description: "Export all computed hashes in JSON format instantly.",
      icon: RefreshCw,
    },
  ];

  const faqs = [
    {
      question: "What is a cryptographic hash?",
      answer: "A cryptographic hash is a one-way mathematical function that converts input data of any size into a fixed-size string of characters, usually represented in hexadecimal or Base64.",
    },
    {
      question: "Is hashing the same as encryption?",
      answer: "No. Hashing is a one-way process designed to be irreversible, whereas encryption is a two-way process designed to be decrypted using a secret key.",
    },
    {
      question: "What is an HMAC?",
      answer: "An HMAC (Hash-based Message Authentication Code) is a specific type of message authentication code involving a cryptographic hash function and a secret cryptographic key, ensuring both data integrity and authenticity.",
    },
    {
      question: "How does salting work?",
      answer: "Salting involves adding a random string of characters (a salt) to an input before hashing it. This prevents attackers from using precomputed rainbow tables to crack the hash.",
    },
    {
      question: "Are MD5 and SHA-1 secure?",
      answer: "No. Both MD5 and SHA-1 have known cryptographic vulnerabilities and collisions, making them unsafe for security-critical applications like password hashing or digital signatures. Use SHA-256 or SHA-512 instead.",
    },
  ];

  return (
    <>
      <ToolPageHeader
        icon={Hash}
        title="Hash Generator"
        description="MD5, SHA‑1, SHA‑256/384/512 • Text or File • Hex/Base64 • Optional HMAC & Salt."
        actions={
          <>
            <ResetButton onClick={resetAll} icon={RotateCcw} />
            <ExportTextButton
              variant="outline"
              label="Export JSON"
              filename="hash-results.json"
              icon={DownloadCloud}
              getText={() =>
                JSON.stringify(
                  {
                    mode,
                    fileName,
                    algorithms: selectedAlgoList,
                    hmac: useHmac,
                    encoding,
                    uppercase,
                    salt,
                    saltBefore,
                    generatedAt: new Date().toISOString(),
                    results,
                  },
                  null,
                  2
                )
              }
            />
          </>
        }
      />

      {/* Top stats */}
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <Stat
          label="Input bytes"
          value={
            mode === "text" ? toBytes(text).length : fileBytes?.length ?? 0
          }
          hint={mode === "file" ? fileName || "No file" : "UTF‑8 length"}
        />
        <Stat
          label="Algorithms"
          value={selectedAlgoList.length}
          hint={selectedAlgoList.join(", ") || "None"}
        />
        <Stat
          label="Last run"
          value={perf ? `${perf.toFixed(2)} ms` : "—"}
          hint={autoRun ? "Auto‑run on" : "Manual"}
          Icon={Timer}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Left: Settings */}
        <GlassCard>
          <CardHeader>
            <CardTitle className="text-base">Input & Settings</CardTitle>
            <CardDescription>
              Choose input type, algorithms and output format.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Mode */}
            <div className="grid grid-cols-2 gap-2">
              <ActionButton
                label="Text"
                variant={mode === "text" ? "default" : "outline"}
                onClick={() => setMode("text")}
              />
              <ActionButton
                label="File"
                variant={mode === "file" ? "default" : "outline"}
                onClick={() => setMode("file")}
              />
            </div>

            {/* Algorithms */}
            <div className="space-y-2">
              <div className="text-sm font-medium">Algorithms</div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {ALL_ALGOS.map((name) => (
                  <ActionButton
                    key={name}
                    size="sm"
                    variant={algos[name] ? "default" : "outline"}
                    label={name}
                    onClick={() =>
                      setAlgos((p) => ({ ...p, [name]: !p[name] }))
                    }
                  />
                ))}
              </div>
            </div>

            {/* Output encoding */}
            <div className="grid grid-cols-2 gap-3">
              <ActionButton
                label="Hex"
                variant={encoding === "hex" ? "default" : "outline"}
                onClick={() => setEncoding("hex")}
              />
              <ActionButton
                label="Base64"
                variant={encoding === "base64" ? "default" : "outline"}
                onClick={() => setEncoding("base64")}
              />
            </div>

            <SwitchRow
              label="Uppercase"
              hint="Applied for hex output"
              checked={uppercase}
              onCheckedChange={(v) => setUppercase(Boolean(v))}
            />

            <Separator />

            {/* HMAC */}
            <SwitchRow
              label={
                (
                  <span className="inline-flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    HMAC
                  </span>
                ) as unknown as string
              }
              hint={`Compute HMAC over the input using ${
                selectedAlgoList.length
                  ? selectedAlgoList.join(", ")
                  : "selected algos"
              }.`}
              checked={useHmac}
              onCheckedChange={(v) => setUseHmac(Boolean(v))}
            />
            <InputField
              label="Secret key (UTF‑8)"
              value={hmacKey}
              onChange={(e) => setHmacKey(e.target.value)}
              disabled={!useHmac}
              placeholder="Enter HMAC key"
            />

            {/* Salt */}
            <InputField
              label="Salt (optional)"
              value={salt}
              onChange={(e) => setSalt(e.target.value)}
              placeholder="Salt string"
            />
            <SwitchRow
              label="Prefix salt"
              hint="Off = suffix"
              checked={saltBefore}
              onCheckedChange={(v) => setSaltBefore(Boolean(v))}
            />

            {/* Perf & autorun */}
            <SwitchRow
              label="Auto‑run"
              hint="Re-run on every change"
              checked={autoRun}
              onCheckedChange={(v) => setAutoRun(Boolean(v))}
            />

            {error && (
              <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-destructive">
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex gap-2">
            <ActionButton
              label="Hash"
              onClick={() => {
                void run();
                toast.success("Hashed successfully!");
              }}
              icon={Hash}
            />
            <ActionButton
              label="Reset"
              variant="outline"
              onClick={resetAll}
              icon={RotateCcw}
            />
          </CardFooter>
        </GlassCard>

        {/* Right: Input & Results */}
        <GlassCard className="shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">
              {mode === "text" ? "Text Input" : "File Input"}
            </CardTitle>
            <CardDescription>
              Paste text or pick a file to hash.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mode === "text" ? (
              <TextareaField
                label="Text"
                value={text}
                onValueChange={setText}
                textareaClassName="min-h-[140px] font-mono"
                placeholder="Type or paste text here..."
              />
            ) : (
              <div className="space-y-2">
                <div className="text-sm font-medium">Pick a file</div>
                <div className="relative inline-flex items-center">
                  <input
                    type="file"
                    className="absolute inset-0 z-10 cursor-pointer opacity-0"
                    onChange={onPickFile}
                  />
                  <ActionButton
                    variant="outline"
                    label="Choose file"
                    icon={Upload}
                    className="pointer-events-none"
                  />
                </div>

                {/* <InputField type="file" /> */}

                <p className="text-xs text-muted-foreground">
                  {fileName ? `Selected: ${fileName}` : "No file selected."}
                </p>
              </div>
            )}

            <Separator />

            <div className="space-y-2">
              <div className="text-sm font-medium">Results</div>
              <div className="grid gap-2 md:grid-cols-2">
                {results.length === 0 && (
                  <div className="rounded-md border p-3 text-sm text-muted-foreground">
                    No results yet. Click <em>Hash</em> or enable Auto‑run.
                  </div>
                )}
                {results.map((r) => (
                  <div
                    key={r.name}
                    className="flex flex-col gap-2 rounded-md border p-3"
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">
                        {useHmac ? `HMAC-${r.name}` : r.name}
                      </Badge>
                      <CopyButton
                        variant="outline"
                        size="sm"
                        label={copiedKey === r.name ? "Copied" : "Copy"}
                        icon={copiedKey === r.name ? Check : undefined}
                        getText={() => r.value}
                        onCopied={() => {
                          setCopiedKey(r.name);
                          setTimeout(() => setCopiedKey(null), 1200);
                        }}
                      />
                    </div>
                    <TextareaField
                      rows={1}
                      readOnly
                      value={r.value}
                      autoResize
                      textareaClassName="h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </GlassCard>
      </div>

      <ToolHowItWorks
        title="How It Works"
        subtitle="Generate cryptographic hashes in three simple steps"
        steps={steps}
      />

      <ToolFeatureGuides
        title="Hash Generator Features"
        subtitle="Advanced cryptographic capabilities running securely in your browser"
        features={features}
      >
        <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none mt-8">
          <h3>What Is a Cryptographic Hash?</h3>
          <p>
            A cryptographic hash function is a one-way deterministic algorithm that takes input data of any size and produces a fixed-length string of characters, typically representing a sequence of bytes. A core property of a robust hash function is the <strong>avalanche effect</strong>: changing even a single bit in the input completely changes the resulting hash output. Because hashing is a one-way process, it is mathematically infeasible to reverse-engineer the original input from the hash alone.
          </p>

          <h3>Hashing vs Encryption vs Encoding</h3>
          <p>
            These three concepts are commonly confused, but they serve entirely different purposes:
          </p>
          <ul>
            <li><strong>Hashing:</strong> A one-way, irreversible process. Used for validating data integrity and securely storing passwords.</li>
            <li><strong>Encryption:</strong> A two-way process. Data is scrambled using a cryptographic key and can be decrypted back to its original form using the corresponding key. Used for confidentiality.</li>
            <li><strong>Encoding:</strong> A reversible data representation process (like Base64 or URL encoding) that requires no secret key. Used to ensure data can be safely transmitted across different systems, not for security.</li>
          </ul>

          <h3>Comparison Table of Hash Algorithms</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="p-2 border border-border">Algorithm</th>
                  <th className="p-2 border border-border">Output Length</th>
                  <th className="p-2 border border-border">Speed</th>
                  <th className="p-2 border border-border">Security Level</th>
                  <th className="p-2 border border-border">Common Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-border"><strong>MD5</strong></td>
                  <td className="p-2 border border-border">128-bit</td>
                  <td className="p-2 border border-border">Very Fast</td>
                  <td className="p-2 border border-border text-destructive">Broken</td>
                  <td className="p-2 border border-border">Legacy file checksums, fast non-cryptographic hashing.</td>
                </tr>
                <tr>
                  <td className="p-2 border border-border"><strong>SHA-1</strong></td>
                  <td className="p-2 border border-border">160-bit</td>
                  <td className="p-2 border border-border">Fast</td>
                  <td className="p-2 border border-border text-destructive">Weak</td>
                  <td className="p-2 border border-border">Git commits, legacy systems.</td>
                </tr>
                <tr>
                  <td className="p-2 border border-border"><strong>SHA-256</strong></td>
                  <td className="p-2 border border-border">256-bit</td>
                  <td className="p-2 border border-border">Moderate</td>
                  <td className="p-2 border border-border text-primary">Strong</td>
                  <td className="p-2 border border-border">SSL certificates, blockchain, modern data integrity.</td>
                </tr>
                <tr>
                  <td className="p-2 border border-border"><strong>SHA-512</strong></td>
                  <td className="p-2 border border-border">512-bit</td>
                  <td className="p-2 border border-border">Moderate</td>
                  <td className="p-2 border border-border text-primary">Strong</td>
                  <td className="p-2 border border-border">High-security applications, systems with 64-bit architectures.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>HMAC Explained</h3>
          <p>
            An <strong>HMAC</strong> (Hash-based Message Authentication Code) is a mechanism that combines a cryptographic hash function with a secret cryptographic key. It is used to verify both the <em>data integrity</em> and the <em>authenticity</em> of a message. Even if an attacker intercepts and alters a message, they cannot generate a valid HMAC without the secret key, ensuring the tampering is detected.
          </p>

          <h3>Salt and Key Stretching</h3>
          <p>
            When storing user passwords, simply hashing them with MD5 or SHA-256 is highly insecure. Attackers can use precomputed databases called <strong>rainbow tables</strong> to instantly look up the original password for a given hash. 
          </p>
          <p>
            To prevent this, a unique random string called a <strong>salt</strong> is appended to each password before hashing. This ensures that even if two users have the same password, their hashes will be different. For modern password storage, specialized key-stretching algorithms like <code>bcrypt</code>, <code>Argon2</code>, or <code>PBKDF2</code> are preferred because they intentionally slow down the hashing process, making brute-force attacks economically infeasible.
          </p>

          <h3>File Integrity Checks</h3>
          <p>
            Hashing is widely used to verify that a file has not been corrupted or tampered with during transmission. When you download a large file, such as a Linux ISO, the provider often publishes an MD5 or SHA-256 checksum. By hashing the downloaded file locally and comparing the output to the published checksum, you can guarantee the file&apos;s integrity.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        title="Frequently Asked Questions"
        subtitle="Learn more about cryptographic hashing and how to use this tool"
        faqs={faqs}
      />

      <RelatedTools currentToolUrl="/tools/dev/hash-generator" max={6} />
    </>
  );
}
