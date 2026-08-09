"use client";

import { Hash, Play, Shuffle, BookOpen, Shield, Key, Copy, Code2, Zap, Settings2, Database } from "lucide-react";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { useMemo, useState } from "react";
import {
  ActionButton,
  CopyButton,
  ExportCSVButton,
  ExportTextButton,
  ResetButton,
} from "@/components/shared/action-buttons";
import InputField from "@/components/shared/form-fields/input-field";
import SelectField from "@/components/shared/form-fields/select-field";
import SwitchRow from "@/components/shared/form-fields/switch-row";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { Separator } from "@/components/ui/separator";

type Mode = "uuid" | "ulid" | "nanoid" | "hex" | "order";

function pad(n: number, w = 2) {
  return n.toString().padStart(w, "0");
}
function todayYmd() {
  const d = new Date();
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
}

/** Generators */
function uuidV4({ upper = false, noHyphen = false }: { upper?: boolean; noHyphen?: boolean } = {}) {
  let s = typeof crypto.randomUUID === "function" ? crypto.randomUUID() : fallbackUuidV4();
  if (noHyphen) s = s.replace(/-/g, "");
  if (upper) s = s.toUpperCase();
  return s;
}
function fallbackUuidV4() {
  const a = new Uint8Array(16);
  crypto.getRandomValues(a);
  a[6] = (a[6] & 0x0f) | 0x40;
  a[8] = (a[8] & 0x3f) | 0x80;
  const s = Array.from(a)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${s.slice(0, 8)}-${s.slice(8, 12)}-${s.slice(12, 16)}-${s.slice(16, 20)}-${s.slice(20)}`;
}

function ulid({ upper = true }: { upper?: boolean } = {}) {
  const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
  const time = Date.now();
  const timeChars = new Array(10);
  let t = time;
  for (let i = 9; i >= 0; i--) {
    timeChars[i] = ENCODING[t % 32];
    t = Math.floor(t / 32);
  }
  const rand = new Uint8Array(16);
  crypto.getRandomValues(rand);
  const randChars = new Array(16);
  let acc = 0;
  let bits = 0;
  let idx = 0;
  for (let i = 0; i < 10; i++) {
    acc = (acc << 8) | rand[i];
    bits += 8;
    while (bits >= 5 && idx < 16) {
      bits -= 5;
      randChars[idx++] = ENCODING[(acc >> bits) & 31];
    }
  }
  const out = (timeChars.join("") + randChars.join("")) as string;
  return upper ? out : out.toLowerCase();
}

function nanoId(
  len = 12,
  alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
) {
  const a = new Uint8Array(len);
  crypto.getRandomValues(a);
  const al = alphabet.length;
  return Array.from(a, (b) => alphabet[b % al]).join("");
}

function randomHex(len = 16) {
  const bytes = new Uint8Array(Math.ceil(len / 2));
  crypto.getRandomValues(bytes);
  let hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  if (len % 2) hex = hex.slice(0, len);
  return hex;
}

function makeOrderId({
  prefix = "ORD",
  includeDate = true,
}: {
  prefix?: string;
  includeDate?: boolean;
} = {}) {
  const ts = includeDate ? todayYmd() : Date.now().toString();
  const tail = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `${prefix}-${ts}-${tail}`;
}

export default function IdGeneratorClient() {
  const [mode, setMode] = useState<Mode>("uuid");

  // batch/options
  const [count, setCount] = useState(6);
  const [ensureUnique, setEnsureUnique] = useState(true);
  const [sortOut, setSortOut] = useState(false);

  // global post-processing
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [separator, setSeparator] = useState<"newline" | "comma" | "space">("newline");

  // per-mode options
  const [uuidUpper, setUuidUpper] = useState(false);
  const [uuidNoHyphen, setUuidNoHyphen] = useState(false);

  const [ulidUpper, setUlidUpper] = useState(true);

  const [nanoLen, setNanoLen] = useState(12);
  const [nanoAlphabet, setNanoAlphabet] = useState(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  );

  const [hexLen, setHexLen] = useState(16);

  const [orderPrefix, setOrderPrefix] = useState("ORD");
  const [orderIncludeDate, setOrderIncludeDate] = useState(true);

  const [rows, setRows] = useState<string[]>([]);

  const sepStr = separator === "newline" ? "\n" : separator === "comma" ? "," : " ";
  const processed = useMemo(() => {
    let out = rows;
    if (ensureUnique) {
      const seen = new Set<string>();
      out = out.filter((x) => {
        if (seen.has(x)) {
          return false;
        }
        seen.add(x);
        return true;
      });
    }
    if (sortOut) {
      out = [...out].sort();
    }
    if (prefix || suffix) {
      out = out.map((x) => `${prefix}${x}${suffix}`);
    }
    return out;
  }, [rows, ensureUnique, sortOut, prefix, suffix]);

  const generate = () => {
    const res: string[] = [];
    for (let i = 0; i < Math.max(1, Math.min(1000, count)); i++) {
      switch (mode) {
        case "uuid":
          res.push(uuidV4({ upper: uuidUpper, noHyphen: uuidNoHyphen }));
          break;
        case "ulid":
          res.push(ulid({ upper: ulidUpper }));
          break;
        case "nanoid":
          res.push(
            nanoId(
              Math.max(4, Math.min(64, nanoLen)),
              nanoAlphabet || "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
            ),
          );
          break;
        case "hex":
          res.push(randomHex(Math.max(4, Math.min(128, hexLen))));
          break;
        case "order":
          res.push(
            makeOrderId({
              prefix: orderPrefix || "ORD",
              includeDate: orderIncludeDate,
            }),
          );
          break;
      }
    }
    setRows(res);
  };

  const resetAll = () => {
    setMode("uuid");
    setCount(5);
    setEnsureUnique(true);
    setSortOut(false);
    setPrefix("");
    setSuffix("");
    setSeparator("newline");

    setUuidUpper(false);
    setUuidNoHyphen(false);

    setUlidUpper(true);

    setNanoLen(12);
    setNanoAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");

    setHexLen(16);

    setOrderPrefix("ORD");
    setOrderIncludeDate(true);

    setRows([]);
  };

  const isSeparator = (v: unknown) => v === "newline" || v === "comma" || v === "space";

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ToolPageHeader
        icon={Hash}
        title="GUID / Order ID"
        description="Generate UUIDs, ULIDs, NanoIDs, HEX strings, and readable order IDs."
        actions={
          <>
            <ResetButton onClick={resetAll} />
            <ExportCSVButton
              filename="ids.csv"
              getRows={() => processed.map((x, i) => [i + 1, x])}
              label="Export CSV"
              disabled={processed.length === 0}
            />
            <ExportTextButton
              variant="default"
              filename="ids.txt"
              getText={() => processed.join("\n")}
              label="Export TXT"
              disabled={processed.length === 0}
            />
          </>
        }
      />

      {/* Settings */}
      <GlassCard>
        <CardHeader>
          <CardTitle className="text-base">Settings</CardTitle>
          <CardDescription>Pick the ID type and customize generation.</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <SelectField
            label="Type"
            value={mode}
            onValueChange={(v) => setMode((v as Mode) ?? "uuid")}
            options={[
              { label: "UUID v4", value: "uuid" },
              { label: "ULID", value: "ulid" },
              { label: "NanoID", value: "nanoid" },
              { label: "HEX", value: "hex" },
              { label: "Order ID", value: "order" },
            ]}
          />
          <InputField
            label="Count"
            type="number"
            min={1}
            max={1000}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(1000, Number(e.target.value) || 1)))}
          />
          <SelectField
            label="Copy All Separator"
            value={separator}
            onValueChange={(v) => setSeparator(isSeparator(v) ? v : "newline")}
            options={[
              { label: "New line", value: "newline" },
              { label: "Comma", value: "comma" },
              { label: "Space", value: "space" },
            ]}
          />

          {/* Global post-processing */}
          <InputField
            label="Add Prefix"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
          />
          <InputField
            label="Add Suffix"
            value={suffix}
            onChange={(e) => setSuffix(e.target.value)}
          />
          <div className="grid gap-2">
            <SwitchRow
              label="Ensure unique (within batch)"
              checked={ensureUnique}
              onCheckedChange={setEnsureUnique}
            />
            <SwitchRow label="Sort output" checked={sortOut} onCheckedChange={setSortOut} />
          </div>

          {/* Per-mode options */}
          {mode === "uuid" && (
            <div className="grid gap-2">
              <SwitchRow label="Uppercase" checked={uuidUpper} onCheckedChange={setUuidUpper} />
              <SwitchRow
                label="Remove hyphens"
                checked={uuidNoHyphen}
                onCheckedChange={setUuidNoHyphen}
              />
            </div>
          )}

          {mode === "ulid" && (
            <div className="grid gap-2">
              <SwitchRow label="Uppercase" checked={ulidUpper} onCheckedChange={setUlidUpper} />
            </div>
          )}

          {mode === "nanoid" && (
            <>
              <InputField
                label="Length"
                type="number"
                min={4}
                max={64}
                value={nanoLen}
                onChange={(e) => setNanoLen(Math.max(4, Math.min(64, Number(e.target.value) || 4)))}
              />
              <InputField
                label="Alphabet"
                value={nanoAlphabet}
                onChange={(e) => setNanoAlphabet(e.target.value)}
                hint="Leave blank to use default A–Z, a–z, 0–9"
              />
            </>
          )}

          {mode === "hex" && (
            <InputField
              label="Length (chars)"
              type="number"
              min={4}
              max={128}
              value={hexLen}
              onChange={(e) => setHexLen(Math.max(4, Math.min(128, Number(e.target.value) || 16)))}
            />
          )}

          {mode === "order" && (
            <>
              <InputField
                label="Prefix"
                value={orderPrefix}
                onChange={(e) => setOrderPrefix(e.target.value)}
              />
              <div className="grid gap-2">
                <SwitchRow
                  label="Include YYYYMMDD date"
                  checked={orderIncludeDate}
                  onCheckedChange={setOrderIncludeDate}
                />
              </div>
            </>
          )}

          <div className="flex items-end gap-2">
            <ActionButton icon={Play} label="Generate" onClick={generate} variant="default" />
            <ActionButton icon={Shuffle} label="Regenerate" onClick={generate} />
          </div>
        </CardContent>
      </GlassCard>

      <Separator />

      {/* Results */}
      <GlassCard>
        <CardHeader>
          <CardTitle className="text-base">Generated IDs</CardTitle>
          <CardDescription>Copy individual IDs or use “Copy All”.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="secondary">{rows.length} raw</Badge>
            <Badge variant="secondary">{processed.length} after filters</Badge>
          </div>

          <div className="flex gap-2">
            <CopyButton label="Copy All" getText={() => processed.join(sepStr)} />
            <ExportTextButton
              variant="default"
              filename="ids.txt"
              getText={() => processed.join("\n")}
              label="Export TXT"
              disabled={processed.length === 0}
            />
          </div>

          {processed.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No IDs yet. Configure settings and click Generate.
            </p>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {processed.map((id) => (
                <div key={id} className="flex items-center justify-between rounded-md border p-3">
                  <span className="font-mono text-sm break-all">{id}</span>
                  <CopyButton size="sm" getText={() => id} />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </GlassCard>

      {/* SECTION 3: HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Choose ID Format",
            description: "Select UUID v4 (random), UUID v1 (timestamp-based), CUID, ULID, NanoID, or custom format with your own character set and length.",
            icon: Settings2,
          },
          {
            step: "02",
            title: "Set Quantity",
            description: "Generate 1 to 1,000 unique IDs at once. Bulk generation is useful for database seeding, test data creation, and migration scripts.",
            icon: Hash,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy all IDs to clipboard or download as a text file. Use directly in code, SQL INSERT statements, API payloads, or configuration files.",
            icon: Copy,
          },
        ]}
        badges={[
          "UUID v4 & v1",
          "ULID & NanoID",
          "Bulk generation",
        ]}
      />

      {/* SECTION 4: FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: Key,
            title: "UUID v4 (Random)",
            description: "128-bit random UUID with 5.3×10³⁶ possible values. The most widely used ID format — supported by all major databases, languages, and frameworks as a primary key type.",
          },
          {
            icon: Hash,
            title: "UUID v1 (Timestamp)",
            description: "UUID that encodes the current timestamp, MAC address, and random bits. Sortable by creation time but exposes system information — use v4 for privacy-sensitive contexts.",
          },
          {
            icon: Database,
            title: "ULID (Sortable UUID)",
            description: "Universally Unique Lexicographically Sortable Identifier. 128-bit, URL-safe, and monotonically sortable. Better than UUID v4 for database indexes.",
          },
          {
            icon: Code2,
            title: "NanoID (URL-Safe Short ID)",
            description: "URL-safe, compact alternative to UUID. Default 21 characters with a collision probability lower than UUID v4. Widely used in web apps for user-facing IDs.",
          },
          {
            icon: Settings2,
            title: "Custom Format",
            description: "Define your own character set (alphanumeric, hex, numeric) and length. Generate sequential IDs, prefix-based IDs, or any custom format for your specific use case.",
          },
          {
            icon: Shield,
            title: "Cryptographically Secure",
            description: "All ID generation uses crypto.getRandomValues() — the same API used by browsers for cryptographic operations. No server call needed; works fully offline.",
          },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">ID Format Guide — UUID, ULID, NanoID, CUID Compared</h3>
          <p>
            Choosing the right ID format for your application affects database performance, URL
            readability, sortability, and collision probability. Here's a comparison of the most
            popular unique ID formats used in modern software development.
          </p>

          <h4 className="font-semibold">ID Format Comparison</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Format</th>
                  <th className="border p-2 text-left">Length</th>
                  <th className="border p-2 text-left">Sortable?</th>
                  <th className="border p-2 text-left">URL Safe?</th>
                  <th className="border p-2 text-left">Best For</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["UUID v4", "36 chars", "No", "No (has hyphens)", "Database PKs, most use cases"],
                  ["UUID v1", "36 chars", "Yes (time-based)", "No", "Time-ordered records"],
                  ["ULID", "26 chars", "Yes (monotonic)", "Yes", "DB indexes, event logs"],
                  ["NanoID", "21 chars", "No", "Yes", "URL slugs, user-facing IDs"],
                  ["CUID", "25+ chars", "Yes (time-prefix)", "Yes", "Distributed systems"],
                  ["CUID2", "24 chars", "No", "Yes", "Secure distributed IDs"],
                  ["ObjectID (MongoDB)", "24 hex chars", "Yes", "Yes", "MongoDB primary keys"],
                ].map(([fmt, len, sort, url, best]) => (
                  <tr key={fmt} className="odd:bg-muted/20">
                    <td className="border p-2 font-mono text-primary text-xs">{fmt}</td>
                    <td className="border p-2 text-xs">{len}</td>
                    <td className="border p-2 text-xs">{sort}</td>
                    <td className="border p-2 text-xs">{url}</td>
                    <td className="border p-2 text-muted-foreground text-xs">{best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold">UUID v4 vs Auto-Increment — When to Use Each</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Property</th>
                  <th className="border p-2 text-left">Auto-Increment (1, 2, 3...)</th>
                  <th className="border p-2 text-left">UUID v4</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Uniqueness", "Unique within one table", "Globally unique across systems"],
                  ["Sortability", "Naturally sortable", "Not sortable by insertion time"],
                  ["Security", "Enumerable (predictable)", "Non-enumerable (unpredictable)"],
                  ["Distributed systems", "Requires central counter", "Generated client-side"],
                  ["Database size", "4 bytes (int)", "16 bytes"],
                  ["URL exposure", "Reveals record count", "No information exposed"],
                ].map(([prop, auto, uuid]) => (
                  <tr key={prop} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{prop}</td>
                    <td className="border p-2 text-xs">{auto}</td>
                    <td className="border p-2 text-primary text-xs">{uuid}</td>
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
            question: "What is a UUID?",
            answer: "UUID (Universally Unique Identifier) is a 128-bit label used to uniquely identify information in computer systems. Formatted as 8-4-4-4-12 hexadecimal digits (e.g., 550e8400-e29b-41d4-a716-446655440000). UUID v4 is randomly generated with 5.3×10³⁶ possible values — practically impossible to generate two identical UUIDs.",
          },
          {
            question: "What is the difference between UUID v1 and UUID v4?",
            answer: "UUID v1 uses the current timestamp, machine MAC address, and random bits. It's time-sortable but exposes your MAC address (a privacy concern). UUID v4 is entirely random with no timing or location information. For most applications, UUID v4 is preferred for its simplicity, privacy, and unpredictability.",
          },
          {
            question: "What is ULID and when should I use it?",
            answer: "ULID (Universally Unique Lexicographically Sortable Identifier) is a 128-bit ID that encodes the current timestamp in the first 10 characters, then 16 random characters. It's URL-safe, sortable by creation time, and has better database index performance than random UUIDs. Use ULID when you need both global uniqueness and time-ordering.",
          },
          {
            question: "Can two UUIDs ever be the same?",
            answer: "Theoretically yes, but practically impossible. UUID v4 has 2¹²² possible values (≈5.3×10³⁶). To have a 50% chance of collision, you'd need to generate approximately 2.7×10¹⁸ UUIDs — that's 2.7 quintillion. At 1 billion UUIDs per second, this would take 85 years. UUID collision in practice is effectively impossible.",
          },
          {
            question: "Should I use UUID or auto-increment for database primary keys?",
            answer: "Auto-increment: simpler, smaller storage, better index performance, naturally ordered. Use for single-database apps. UUID: globally unique without central coordination, non-enumerable (doesn't expose record counts), better for distributed systems and APIs. Use for multi-database systems, APIs where IDs are public, or when you generate IDs client-side before insert.",
          },
        ]}
      />
      <RelatedTools currentToolUrl="/tools/util/id-generator" max={6} />
    </div>
  );
}
