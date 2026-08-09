"use client";

import {
  Calculator,
  Download,
  Hash,
  Info,
  RefreshCw,
  Settings2,
  BookOpen,
  Shield,
  Binary,
  Code2,
  ArrowLeftRight,
  Globe,
  Cpu,
} from "lucide-react";
import React from "react";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import {
  ActionButton,
  CopyButton,
  ExportTextButton,
  ResetButton,
} from "@/components/shared/action-buttons";
import InputField from "@/components/shared/form-fields/input-field";
import SelectField from "@/components/shared/form-fields/select-field";
import SwitchRow from "@/components/shared/form-fields/switch-row";
import TextareaField from "@/components/shared/form-fields/textarea-field";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { Separator } from "@/components/ui/separator";

/* Types */

type ResultRow = { base: number; label: string; value: string };

/* BigInt-safe constants (no 1n) */
const B0 = BigInt(0);
const B1 = BigInt(1);
type Sign = bigint;

/* Conversion Utilities */
const DIGITS = "0123456789abcdefghijklmnopqrstuvwxyz";
const DIGIT_VAL: Record<string, number> = Object.fromEntries(
  Array.from(DIGITS).map((c, i) => [c, i]),
);

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

function stripPrefix(raw: string) {
  let s = raw.trim();
  const sign = s.startsWith("-") ? "-" : s.startsWith("+") ? "+" : "";
  if (sign) s = s.slice(1);

  let baseFromPrefix: number | undefined;
  if (/^0b/i.test(s)) {
    baseFromPrefix = 2;
    s = s.slice(2);
  } else if (/^0o/i.test(s)) {
    baseFromPrefix = 8;
    s = s.slice(2);
  } else if (/^0x/i.test(s)) {
    baseFromPrefix = 16;
    s = s.slice(2);
  }
  return { sign, body: s, baseFromPrefix };
}

function charToVal(ch: string) {
  const v = DIGIT_VAL[ch.toLowerCase()];
  return v ?? -1;
}

function sanitize(body: string) {
  return body.replace(/[_\s]/g, "");
}

function parseToRational(
  input: string,
  base: number,
): { sign: Sign; int: bigint; fracNum: bigint; fracDen: bigint } {
  const s = sanitize(input);
  const sign: Sign = s.startsWith("-") ? -B1 : B1;
  const clean = s.startsWith("-") || s.startsWith("+") ? s.slice(1) : s;

  const [intStr, fracStr = ""] = clean.split(".");
  const B = BigInt(base);

  // integer
  let int = B0;
  for (const ch of intStr || "0") {
    const v = charToVal(ch);
    if (v < 0 || v >= base) throw new Error(`Invalid digit "${ch}" for base ${base}.`);
    int = int * B + BigInt(v);
  }

  // fraction → numerator/denominator over B^n
  let num = B0;
  let den = B1;
  if (fracStr.length) {
    den = B ** BigInt(fracStr.length);
    for (const ch of fracStr) {
      const v = charToVal(ch);
      if (v < 0 || v >= base) throw new Error(`Invalid digit "${ch}" for base ${base}.`);
      num = num * B + BigInt(v);
    }
  }

  return { sign, int, fracNum: num, fracDen: den };
}

function groupDigits(s: string, size: number, sep = " ") {
  if (size <= 0) return s;
  const neg = s.startsWith("-");
  const x = neg ? s.slice(1) : s;
  if (x.length <= size) return s;
  const chunks: string[] = [];
  for (let i = x.length; i > 0; i -= size) chunks.unshift(x.slice(Math.max(0, i - size), i));
  return (neg ? "-" : "") + chunks.join(sep);
}

function toBaseString(
  sign: Sign,
  int: bigint,
  fracNum: bigint,
  fracDen: bigint,
  targetBase: number,
  precision: number,
  opt: { uppercase: boolean; showPrefix: boolean; groupSize?: number },
): string {
  const T = BigInt(targetBase);
  const toDigit = (n: number) => (opt.uppercase ? DIGITS[n].toUpperCase() : DIGITS[n]);

  // integer part
  let n = int;
  const d: string[] = [];
  if (n === B0) d.push("0");
  while (n > B0) {
    d.push(toDigit(Number(n % T)));
    n = n / T;
  }
  d.reverse();
  let head = d.join("");
  head = groupDigits(head, opt.groupSize ?? 0, " ");

  // fractional part
  const frac: string[] = [];
  let num = fracNum;
  for (let i = 0; i < precision && num !== B0; i++) {
    num *= T;
    const q = num / fracDen;
    num %= fracDen;
    frac.push(toDigit(Number(q)));
  }
  const tail = frac.length ? `.${frac.join("")}` : "";

  const isNegative = sign < B0 && (int !== B0 || fracNum !== B0);
  const signStr = isNegative ? "-" : "";
  const prefix =
    opt.showPrefix && (targetBase === 2 || targetBase === 8 || targetBase === 16)
      ? targetBase === 2
        ? "0b"
        : targetBase === 8
          ? "0o"
          : "0x"
      : "";

  return `${signStr}${prefix}${head}${tail}`;
}

function toDecimalString(
  sign: Sign,
  int: bigint,
  fracNum: bigint,
  fracDen: bigint,
  precision: number,
) {
  const intStr = int.toString();
  if (fracNum === B0 || precision <= 0) return (sign < B0 ? "-" : "") + intStr;

  const digits: string[] = [];
  let num = fracNum;
  for (let i = 0; i < precision && num !== B0; i++) {
    num *= BigInt(10);
    const q = num / fracDen;
    num %= fracDen;
    digits.push(q.toString());
  }
  while (digits.length && digits[digits.length - 1] === "0") digits.pop();
  const signStr = sign < B0 && (int !== B0 || fracNum !== B0) ? "-" : "";
  return digits.length ? `${signStr}${intStr}.${digits.join("")}` : `${signStr}${intStr}`;
}

function detectBase(raw: string): number | undefined {
  const { baseFromPrefix } = stripPrefix(raw);
  return baseFromPrefix;
}

export default function BaseConverterClient() {
  // Inputs (multi-output mode)
  const [raw, setRaw] = React.useState("");
  const [fromBase, setFromBase] = React.useState(10);
  const [autoDetect, setAutoDetect] = React.useState(true);

  // Output formatting
  const [precision, setPrecision] = React.useState(16);
  const [uppercase, setUppercase] = React.useState(true);
  const [showPrefix, setShowPrefix] = React.useState(true);
  const [grouping, setGrouping] = React.useState(true);
  const [groupSize, setGroupSize] = React.useState(4);

  // Extra target base card
  const [customBase, setCustomBase] = React.useState(7);

  // Quick “from → to” converter
  const [qValue, setQValue] = React.useState("10");
  const [qFrom, setQFrom] = React.useState(10);
  const [qTo, setQTo] = React.useState(16);
  const [qShowPrefix, setQShowPrefix] = React.useState(true);
  const [qUpper, setQUpper] = React.useState(true);
  const [qPrecision, setQPrecision] = React.useState(16);

  const [error, setError] = React.useState<string | null>(null);

  // Main cards (Binary / Octal / Decimal / Hex / extra)
  const results = React.useMemo<ResultRow[]>(() => {
    setError(null);
    if (!raw.trim()) return [];

    try {
      const { sign: signTxt, body, baseFromPrefix } = stripPrefix(raw);
      const base = autoDetect && baseFromPrefix ? baseFromPrefix : fromBase;
      if (base < 2 || base > 36) throw new Error("Base must be between 2 and 36.");

      // IMPORTANT: use the parsed sign from parseToRational
      const { sign: sgn, int, fracNum, fracDen } = parseToRational(`${signTxt}${body}`, base);
      const opts = { uppercase, showPrefix, groupSize: grouping ? groupSize : 0 };

      const core: ResultRow[] = [
        {
          base: 2,
          label: "Binary",
          value: toBaseString(sgn, int, fracNum, fracDen, 2, precision, opts),
        },
        {
          base: 8,
          label: "Octal",
          value: toBaseString(sgn, int, fracNum, fracDen, 8, precision, opts),
        },
        {
          base: 10,
          label: "Decimal",
          value: toDecimalString(sgn, int, fracNum, fracDen, precision),
        },
        {
          base: 16,
          label: "Hex",
          value: toBaseString(sgn, int, fracNum, fracDen, 16, precision, opts),
        },
      ];

      const extra =
        customBase && ![2, 8, 10, 16].includes(customBase)
          ? [
              {
                base: customBase,
                label: `Base ${customBase}`,
                value: toBaseString(sgn, int, fracNum, fracDen, customBase, precision, opts),
              } as ResultRow,
            ]
          : [];

      return [...core, ...extra];
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Conversion failed.");
      return [];
    }
  }, [
    raw,
    fromBase,
    autoDetect,
    precision,
    uppercase,
    showPrefix,
    grouping,
    groupSize,
    customBase,
  ]);

  // Quick converter value
  const quickOut = React.useMemo(() => {
    if (!qValue.trim()) return "";
    try {
      const { sign: signTxt, body, baseFromPrefix } = stripPrefix(qValue);
      const base = baseFromPrefix ?? qFrom;
      if (base < 2 || base > 36 || qTo < 2 || qTo > 36) return "";
      const { sign: sgn, int, fracNum, fracDen } = parseToRational(`${signTxt}${body}`, base);
      return toBaseString(sgn, int, fracNum, fracDen, qTo, qPrecision, {
        uppercase: qUpper,
        showPrefix: qShowPrefix,
        groupSize: 0,
      });
    } catch {
      return "";
    }
  }, [qValue, qFrom, qTo, qPrecision, qUpper, qShowPrefix]);

  const exportPayload = React.useMemo(
    () => ({
      input: raw,
      fromBase: autoDetect ? (detectBase(raw) ?? fromBase) : fromBase,
      precision,
      uppercase,
      showPrefix,
      grouping,
      groupSize,
      generatedAt: new Date().toISOString(),
      results,
    }),
    [raw, fromBase, autoDetect, precision, uppercase, showPrefix, grouping, groupSize, results],
  );

  const resetAll = () => {
    setRaw("");
    setFromBase(10);
    setAutoDetect(true);
    setPrecision(16);
    setUppercase(true);
    setShowPrefix(true);
    setGrouping(true);
    setGroupSize(4);
    setCustomBase(7);

    setQValue("10");
    setQFrom(10);
    setQTo(16);
    setQShowPrefix(true);
    setQUpper(true);
    setQPrecision(16);

    setError(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ToolPageHeader
        title="Number Base Converter"
        description="Convert between binary, octal, decimal, hex — plus any base 2–36. Fractions supported."
        icon={Calculator}
        actions={
          <div className="flex flex-wrap gap-2">
            <ActionButton
              icon={RefreshCw}
              label="Normalize"
              onClick={() => setRaw((v) => v.trim())}
            />
            <ExportTextButton
              icon={Download}
              label="Export JSON"
              filename="base-converter.json"
              getText={() => JSON.stringify(exportPayload, null, 2)}
            />
            <ResetButton onClick={resetAll} />
          </div>
        }
      />

      {/* Quick “From → To” converter */}
      <GlassCard>
        <CardHeader>
          <CardTitle>Quick Convert</CardTitle>
          <CardDescription>Instantly convert one number between any two bases.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <InputField
                id="qvalue"
                label="Value"
                placeholder="Examples: 10 (dec), 0x10 (hex), 1111_1111 (bin), 7.2"
                value={qValue}
                onChange={(e) => setQValue(e.target.value)}
              />
              <div className="mt-2 grid grid-cols-2 gap-3">
                <SelectField
                  id="qfrom"
                  label="From base"
                  value={String(qFrom)}
                  onValueChange={(v) => setQFrom(Number(v))}
                  options={Array.from({ length: 35 }, (_, i) => ({
                    value: String(i + 2),
                    label: String(i + 2),
                  }))}
                />
                <SelectField
                  id="qto"
                  label="To base"
                  value={String(qTo)}
                  onValueChange={(v) => setQTo(Number(v))}
                  options={Array.from({ length: 35 }, (_, i) => ({
                    value: String(i + 2),
                    label: String(i + 2),
                  }))}
                />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <SwitchRow
                  label="Uppercase letters (A–F)"
                  checked={qUpper}
                  onCheckedChange={setQUpper}
                />
                <SwitchRow
                  label="Show prefixes (0b/0o/0x)"
                  checked={qShowPrefix}
                  onCheckedChange={setQShowPrefix}
                />
              </div>

              <div className="mt-2 grid grid-cols-2 gap-3">
                <InputField
                  id="qprec"
                  type="number"
                  label="Fraction precision (digits)"
                  min={0}
                  max={64}
                  value={String(qPrecision)}
                  onChange={(e) => setQPrecision(clamp(Number(e.target.value) || 0, 0, 64))}
                />
                <div className="flex items-end">
                  <CopyButton getText={() => quickOut} />
                </div>
              </div>
            </div>

            {/* Output card */}
            <div className="rounded-lg border p-3">
              <div className="mb-2 text-sm font-medium">Converted</div>
              <div className="rounded-md border bg-muted/30 p-2">
                <code className="block max-h-[140px] overflow-auto break-words text-xs">
                  {quickOut || "—"}
                </code>
              </div>

              {/* Presets */}
              <div className="mt-3">
                <div className="text-xs text-muted-foreground mb-1">Examples</div>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => {
                      setQValue("10");
                      setQFrom(10);
                      setQTo(16);
                      setQUpper(true);
                      setQShowPrefix(false);
                    }}
                  >
                    10 (dec) → hex = A
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => {
                      setQValue("10");
                      setQFrom(16);
                      setQTo(10);
                      setQUpper(true);
                      setQShowPrefix(true);
                    }}
                  >
                    0x10 → dec = 16
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => {
                      setQValue("77");
                      setQFrom(8);
                      setQTo(2);
                    }}
                  >
                    77 (oct) → bin
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => {
                      setQValue("z");
                      setQFrom(36);
                      setQTo(2);
                    }}
                  >
                    z (base36) → bin
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </GlassCard>

      <Separator className="my-4" />

      {/* Multi-output (cards) */}
      <GlassCard>
        <CardHeader>
          <CardTitle>Multi-Output</CardTitle>
          <CardDescription>
            Enter one number and view it in common bases and one extra base.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Input & options */}
            <div className="lg:col-span-2">
              <TextareaField
                id="input"
                label="Input number"
                placeholder="Examples: 255, 0xff, 0b1111_1111, -101.101, 7.2"
                value={raw}
                onChange={(e) => setRaw(e.target.value)}
                autoResize
                className="min-h-[120px]"
              />
              <div className="mt-2 grid grid-cols-2 gap-3">
                <SelectField
                  id="from"
                  label="From base"
                  value={String(fromBase)}
                  onValueChange={(v) => setFromBase(Number(v))}
                  options={Array.from({ length: 35 }, (_, i) => ({
                    value: String(i + 2),
                    label: String(i + 2),
                  }))}
                  disabled={autoDetect && !!detectBase(raw)}
                />
                <SwitchRow
                  label="Auto-detect base from prefix (0b / 0o / 0x)"
                  checked={autoDetect}
                  onCheckedChange={setAutoDetect}
                />
              </div>

              {error && (
                <div className="mt-3 flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-2 text-destructive">
                  <Info className="mt-0.5 h-4 w-4" />
                  <div className="text-sm">{error}</div>
                </div>
              )}
            </div>

            {/* Output settings */}
            <div className="rounded-lg border p-3">
              <div className="mb-2 flex items-center gap-2">
                <Settings2 className="h-4 w-4" />
                <div className="text-sm font-medium">Output options</div>
              </div>
              <div className="grid gap-2">
                <InputField
                  id="precision"
                  type="number"
                  label="Fraction precision (digits)"
                  min={0}
                  max={64}
                  value={String(precision)}
                  onChange={(e) => setPrecision(clamp(Number(e.target.value) || 0, 0, 64))}
                />
                <SwitchRow
                  label="Uppercase letters (A–F)"
                  checked={uppercase}
                  onCheckedChange={setUppercase}
                />
                <SwitchRow
                  label="Show prefixes (0b / 0o / 0x)"
                  checked={showPrefix}
                  onCheckedChange={setShowPrefix}
                />
                <SwitchRow
                  label="Group integer digits"
                  checked={grouping}
                  onCheckedChange={setGrouping}
                />
                <InputField
                  id="groupSize"
                  type="number"
                  label="Group size"
                  min={2}
                  max={8}
                  value={String(groupSize)}
                  onChange={(e) => setGroupSize(clamp(Number(e.target.value) || 0, 0, 8))}
                  disabled={!grouping}
                />
              </div>

              <Separator className="my-3" />

              <SelectField
                id="extra"
                label="Extra target base"
                value={String(customBase)}
                onValueChange={(v) => setCustomBase(Number(v))}
                options={Array.from({ length: 35 }, (_, i) => ({
                  value: String(i + 2),
                  label: String(i + 2),
                }))}
              />
              <div className="text-xs text-muted-foreground mt-1">
                Standard cards show bases 2/8/10/16; add any one extra base here.
              </div>
            </div>
          </div>
        </CardContent>
      </GlassCard>

      <Separator className="my-4" />

      {/* Results cards */}
      <GlassCard>
        <CardHeader>
          <CardTitle>Results</CardTitle>
          <CardDescription>Copy any representation with one click.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3 p-1">
            {results.length === 0 ? (
              <div className="rounded-md border p-3 text-sm text-muted-foreground col-span-full">
                Enter a number above to see conversions. Tips:
                <ul className="mt-1 list-disc pl-4">
                  <li>
                    Use <code>0b</code>, <code>0o</code>, <code>0x</code> to auto-detect base.
                  </li>
                  <li>
                    Underscores/spaces are ignored: <code>1111_0000</code>.
                  </li>
                  <li>
                    Fractions work: <code>101.101</code>, <code>0xA.F</code>.
                  </li>
                </ul>
              </div>
            ) : (
              results.map((r) => (
                <ResultCard
                  key={r.label}
                  label={r.label}
                  base={r.base}
                  value={r.value}
                  onCopyText={r.value}
                />
              ))
            )}
          </div>
        </CardContent>
      </GlassCard>

      {/* SECTION 3: HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Enter a Number",
            description: "Type a number in any base: decimal (base 10), binary (base 2), hexadecimal (base 16), or octal (base 8). The tool detects the input format automatically.",
            icon: Calculator,
          },
          {
            step: "02",
            title: "See All Conversions Instantly",
            description: "All four bases update simultaneously: binary, octal, decimal, and hexadecimal. No need to convert twice — see all representations at once.",
            icon: ArrowLeftRight,
          },
          {
            step: "03",
            title: "Copy Any Format",
            description: "Click to copy any representation — binary for bit manipulation, hex for color codes and memory addresses, decimal for human-readable values.",
            icon: BookOpen,
          },
        ]}
        badges={[
          "Binary, Octal, Decimal, Hex",
          "Instant conversion",
          "Works offline",
        ]}
      />

      {/* SECTION 4: FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: Binary,
            title: "Binary (Base 2)",
            description: "Uses only 0 and 1. The fundamental language of computers — every number, letter, and pixel is ultimately stored as binary in digital memory and processors.",
          },
          {
            icon: Hash,
            title: "Hexadecimal (Base 16)",
            description: "Uses digits 0-9 and letters A-F. Compact representation of binary data — each hex digit represents exactly 4 binary bits. Used in color codes (#FF5733), memory addresses, and bytecode.",
          },
          {
            icon: Code2,
            title: "Octal (Base 8)",
            description: "Uses digits 0-7. Used in Unix/Linux file permissions (chmod 755), older computer systems, and some low-level programming contexts.",
          },
          {
            icon: Cpu,
            title: "Decimal (Base 10)",
            description: "The standard human number system using digits 0-9. All other bases convert to/from decimal as the universal reference point.",
          },
          {
            icon: ArrowLeftRight,
            title: "All-Direction Conversion",
            description: "Convert in any direction: binary to hex, octal to decimal, hex to binary, and more. All four bases are shown simultaneously for any input.",
          },
          {
            icon: Shield,
            title: "Client-Side & Accurate",
            description: "All conversions use JavaScript's native Number and parseInt functions for accuracy up to 53-bit integers. Larger numbers are handled with BigInt for arbitrary precision.",
          },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">Number Bases Explained — Binary, Octal, Decimal, Hexadecimal</h3>
          <p>
            Computers store and process all information as binary (base 2) — sequences of 0s and 1s.
            Other number bases are used as convenient shorthand: hexadecimal compresses binary data
            into compact notation, octal was common in older systems, and decimal is the human-readable
            format. Understanding all four bases is fundamental to low-level programming, networking,
            and computer science.
          </p>

          <h4 className="font-semibold">Number Base Comparison Reference</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Decimal</th>
                  <th className="border p-2 text-left">Binary (Base 2)</th>
                  <th className="border p-2 text-left">Octal (Base 8)</th>
                  <th className="border p-2 text-left">Hex (Base 16)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["0", "0000", "0", "0"],
                  ["1", "0001", "1", "1"],
                  ["5", "0101", "5", "5"],
                  ["8", "1000", "10", "8"],
                  ["10", "1010", "12", "A"],
                  ["15", "1111", "17", "F"],
                  ["16", "10000", "20", "10"],
                  ["255", "11111111", "377", "FF"],
                  ["256", "100000000", "400", "100"],
                  ["1024", "10000000000", "2000", "400"],
                ].map(([dec, bin, oct, hex]) => (
                  <tr key={dec} className="odd:bg-muted/20">
                    <td className="border p-2 font-mono text-xs">{dec}</td>
                    <td className="border p-2 font-mono text-primary text-xs">{bin}</td>
                    <td className="border p-2 font-mono text-xs">{oct}</td>
                    <td className="border p-2 font-mono text-emerald-500 text-xs">{hex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold">Real-World Use Cases by Base</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Base</th>
                  <th className="border p-2 text-left">Common Use Cases</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Binary (2)", "Bit flags, bitwise operations, networking masks, CPU registers, low-level protocols"],
                  ["Octal (8)", "Linux file permissions (chmod 755), older C/Unix systems, some escape sequences"],
                  ["Decimal (10)", "All human-readable numbers, user interfaces, business logic"],
                  ["Hex (16)", "CSS/HTML colors (#FF5733), memory addresses, MAC addresses, SHA/MD5 hashes, bytecode"],
                ].map(([base, uses]) => (
                  <tr key={base} className="odd:bg-muted/20">
                    <td className="border p-2 font-mono text-primary font-medium text-xs">{base}</td>
                    <td className="border p-2 text-muted-foreground text-xs">{uses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ToolFeatureGuides>

      {/* SECTION 5: FAQ + RELATED TOOLS */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "How do I convert binary to decimal?",
            answer: "Multiply each binary digit by its positional power of 2 and sum the results. Example: 1011 = (1×2³) + (0×2²) + (1×2¹) + (1×2⁰) = 8 + 0 + 2 + 1 = 11. Or use this tool to convert instantly without manual calculation.",
          },
          {
            question: "Why do programmers use hexadecimal?",
            answer: "Hexadecimal provides a compact representation of binary data. Each hex digit represents exactly 4 binary bits, so a byte (8 bits) is always two hex digits (0x00 to 0xFF). This makes hex ideal for memory addresses, color codes, hash values, and bytecode — all situations where binary would be too long to read.",
          },
          {
            question: "What does 0x mean in hexadecimal?",
            answer: "The '0x' prefix is a programming convention that indicates the following number is in hexadecimal. For example, 0xFF = 255 in decimal, 0x1A = 26 in decimal. It's used in C, C++, JavaScript, Python, and most programming languages. In CSS color codes, # serves the same purpose (#FF5733).",
          },
          {
            question: "What is binary used for in real programming?",
            answer: "Binary is used for: bitwise operations (AND, OR, XOR, NOT, bit shifts) in systems programming; network subnet masks (255.255.255.0 = 11111111.11111111.11111111.00000000); bit flags to store multiple booleans in one integer; low-level hardware and embedded system programming; and understanding CPU registers and memory layout.",
          },
          {
            question: "Why is hexadecimal used for colors?",
            answer: "CSS colors use 6-digit hex (#RRGGBB) because each color channel (Red, Green, Blue) has 256 possible values (0-255), which maps perfectly to two hex digits (00-FF). So #FF0000 = rgb(255, 0, 0) = pure red. Hex is more compact than decimal RGB and more readable than binary, making it the universal standard for web colors.",
          },
        ]}
      />
      <RelatedTools currentToolUrl="/tools/dev/base-converter" max={6} />
    </div>
  );
}

/* Small UI piece */

function ResultCard({
  label,
  base,
  value,
  onCopyText,
}: {
  label: string;
  base: number;
  value: string;
  onCopyText: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-md border p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Hash className="h-4 w-4 text-muted-foreground" />
          <div className="text-sm font-medium">{label}</div>
          <Badge variant="outline" className="text-[10px]">
            base {base}
          </Badge>
        </div>
        <CopyButton size="sm" getText={() => onCopyText} />
      </div>
      <div className="rounded-md border bg-muted/30 p-2">
        <code className="block max-h-[140px] overflow-auto break-words text-xs">{value}</code>
      </div>
    </div>
  );
}
