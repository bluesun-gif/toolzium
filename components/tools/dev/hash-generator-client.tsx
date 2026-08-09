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
  BookOpen,
  Shield,
  Key,
  Copy,
  AlertTriangle,
  CheckCircle,
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

  return (
    <div className="max-w-6xl mx-auto space-y-8">
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

      {/* SECTION 3: HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Enter Text or Data",
            description: "Type or paste any text, password, file content, or data you want to hash. The hash updates instantly as you type for real-time feedback.",
            icon: Hash,
          },
          {
            step: "02",
            title: "Choose Hash Algorithm",
            description: "Select from MD5, SHA-1, SHA-256, SHA-384, SHA-512, or SHA-3. Each produces a fixed-length fingerprint unique to the input — impossible to reverse.",
            icon: Lock,
          },
          {
            step: "03",
            title: "Copy & Verify",
            description: "Copy the hash output for use in checksums, data integrity verification, API authentication, or password storage systems.",
            icon: BookOpen,
          },
        ]}
        badges={[
          "MD5, SHA-256, SHA-512",
          "Client-side only",
          "Instant hashing",
        ]}
      />

      {/* SECTION 4: FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: Hash,
            title: "Multiple Hash Algorithms",
            description: "Supports MD5, SHA-1, SHA-256, SHA-384, SHA-512, and SHA-3 — covering legacy checksum verification (MD5) through modern cryptographic hashing (SHA-256+).",
          },
          {
            icon: Lock,
            title: "One-Way Function",
            description: "Hash functions are one-way: given a hash, you cannot recover the original input. Even a single character change produces a completely different hash (avalanche effect).",
          },
          {
            icon: CheckCircle,
            title: "File Checksum Verification",
            description: "Verify downloaded files haven't been tampered with by comparing their SHA-256 hash against the publisher's expected hash. A mismatch means the file is corrupted or modified.",
          },
          {
            icon: Key,
            title: "HMAC Support",
            description: "Generate HMAC (Hash-based Message Authentication Code) by combining a secret key with your message — producing a hash that proves both authenticity and integrity.",
          },
          {
            icon: AlertTriangle,
            title: "MD5 & SHA-1 Deprecation Warning",
            description: "MD5 and SHA-1 are cryptographically broken and should not be used for security-sensitive purposes. They're shown for legacy compatibility only. Use SHA-256 or higher for security.",
          },
          {
            icon: Shield,
            title: "100% Client-Side",
            description: "All hashing runs in your browser using the Web Crypto API. Your text and data never leave your device — safe for hashing sensitive content.",
          },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">Hash Functions Explained — A Security Developer's Guide</h3>
          <p>
            A <strong>cryptographic hash function</strong> takes any input and produces a fixed-length
            output (the hash or digest) with these properties: deterministic (same input always produces
            same output), one-way (cannot reverse the hash to get the input), and avalanche effect
            (tiny input changes produce completely different hashes). These properties make hash
            functions essential for data integrity, password storage, and digital signatures.
          </p>

          <h4 className="font-semibold">Hash Algorithm Comparison</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Algorithm</th>
                  <th className="border p-2 text-left">Output Length</th>
                  <th className="border p-2 text-left">Security Status</th>
                  <th className="border p-2 text-left">Use Case</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["MD5", "128 bits (32 hex)", "⚠️ Broken", "Legacy checksums only"],
                  ["SHA-1", "160 bits (40 hex)", "⚠️ Deprecated", "Legacy Git commits, avoid for security"],
                  ["SHA-256", "256 bits (64 hex)", "✅ Secure", "TLS, Bitcoin, code signing, passwords"],
                  ["SHA-384", "384 bits (96 hex)", "✅ Secure", "High-security TLS certificates"],
                  ["SHA-512", "512 bits (128 hex)", "✅ Secure", "Maximum security, slower than SHA-256"],
                  ["SHA-3-256", "256 bits (64 hex)", "✅ Secure", "Future-proof, quantum-resistant design"],
                ].map(([algo, output, status, use]) => (
                  <tr key={algo} className="odd:bg-muted/20">
                    <td className="border p-2 font-mono text-primary text-xs">{algo}</td>
                    <td className="border p-2 text-xs">{output}</td>
                    <td className="border p-2 text-xs">{status}</td>
                    <td className="border p-2 text-muted-foreground text-xs">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold">Common Use Cases for Hash Functions</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Use Case</th>
                  <th className="border p-2 text-left">Algorithm</th>
                  <th className="border p-2 text-left">How It Works</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["File integrity check", "SHA-256", "Publisher shares SHA-256; you verify download matches"],
                  ["Password storage", "bcrypt / Argon2", "Hash + salt stored; never store plain passwords"],
                  ["Digital signatures", "SHA-256 + RSA/ECDSA", "Hash the document, sign the hash"],
                  ["Git commits", "SHA-1 (legacy) / SHA-256", "Each commit is identified by hash of content"],
                  ["API request signing", "HMAC-SHA256", "Hash message + secret key to prove authenticity"],
                  ["Blockchain", "SHA-256 (Bitcoin)", "Each block contains hash of previous block"],
                ].map(([use, algo, how]) => (
                  <tr key={use} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{use}</td>
                    <td className="border p-2 font-mono text-primary text-xs">{algo}</td>
                    <td className="border p-2 text-muted-foreground text-xs">{how}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold">Why You Should Never Use MD5 for Passwords</h4>
          <p>
            MD5 was designed for speed — it can compute billions of hashes per second on modern GPUs.
            This makes it trivial to brute-force: all 6-character passwords can be cracked in under a
            second. For password storage, use <strong>bcrypt</strong>, <strong>Argon2</strong>, or
            <strong>scrypt</strong> — these are deliberately slow algorithms designed to be computationally
            expensive, making brute-force attacks impractical even with modern hardware.
          </p>
        </div>
      </ToolFeatureGuides>

      {/* SECTION 5: FAQ + RELATED TOOLS */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "What is a hash function?",
            answer: "A hash function takes any input (text, file, data) and produces a fixed-length output called a hash or digest. The same input always produces the same hash, but the hash cannot be reversed to recover the original input. Even a single character change in the input produces a completely different hash (the avalanche effect).",
          },
          {
            question: "What is the difference between MD5, SHA-1, and SHA-256?",
            answer: "MD5 (128-bit) and SHA-1 (160-bit) are cryptographically broken — collision attacks have been demonstrated, meaning two different inputs can produce the same hash. SHA-256 (256-bit) is part of the SHA-2 family and remains cryptographically secure. Use SHA-256 or SHA-512 for any security-sensitive application.",
          },
          {
            question: "Can a hash be reversed or decrypted?",
            answer: "No. Hash functions are one-way by design — it is computationally infeasible to reverse a proper cryptographic hash. What appears to be 'decryption' of MD5 hashes online works through rainbow tables (precomputed hash databases for common passwords), not actual reversal. This is why salting passwords before hashing defeats rainbow table attacks.",
          },
          {
            question: "What is SHA-256 used for?",
            answer: "SHA-256 is used extensively: TLS/HTTPS certificate signatures, Bitcoin mining and transaction verification, code signing certificates, file integrity verification (checksums), HMAC-based API authentication, and as the basis for many cryptographic protocols.",
          },
          {
            question: "Is it safe to hash passwords with SHA-256?",
            answer: "No. SHA-256 is too fast for password hashing — attackers can compute billions per second. Use bcrypt, Argon2id, or scrypt instead. These are purpose-built password hashing functions with configurable cost factors that make brute-force attacks impractically slow, even with modern GPU hardware.",
          },
        ]}
      />
      <RelatedTools currentToolUrl="/tools/dev/hash-generator" max={6} />
    </div>
  );
}
