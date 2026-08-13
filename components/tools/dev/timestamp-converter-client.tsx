"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import { CalendarClock, Clock3, RefreshCw, Timer, TimerReset, BookOpen, Shield, Clock, Globe, Calendar, Zap, Code2, AlignLeft } from "lucide-react";
import React from "react";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ActionButton, CopyButton, ExportCSVButton, ExportTextButton, ResetButton } from "@/components/shared/action-buttons";
import InputField from "@/components/shared/form-fields/input-field";
import SelectField from "@/components/shared/form-fields/select-field";
import SwitchRow from "@/components/shared/form-fields/switch-row";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { CardContent } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { Separator } from "@/components/ui/separator";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { clampIntString, detectUnit, fmtInTz, isPresetTz, safeDate, shareUrl, TZ_PRESETS, toMsFromEpoch, UNITS } from "@/lib/utils/dev/timestamp-converter";
export default function TimestampConverterClient() {
  // direction
  const [dir, setDir] = React.useState<Direction>("toDate");

  // inputs
  const [stamp, setStamp] = React.useState("");
  const [dateText, setDateText] = React.useState("");
  const [tz, setTz] = React.useState<PresetTz>("local");
  const [customTz, setCustomTz] = React.useState("");
  const [unit, setUnit] = React.useState<Unit>("seconds");
  const [autoDetect, setAutoDetect] = React.useState(true);
  const [autoTick, setAutoTick] = React.useState(true);

  // results
  const [result, setResult] = React.useState<Record<string, string>>({});
  const [error, setError] = React.useState<string | null>(null);

  // hydrate from URL once
  React.useEffect(() => {
    try {
      const sp = new URLSearchParams(location.search);
      const _dir = sp.get("dir") as Direction || undefined;
      const _t = sp.get("t") || "";
      const _u = sp.get("u") as Unit || undefined;
      const _tz = sp.get("tz") || undefined;
      if (_dir) setDir(_dir);
      if (_t) {
        if (_dir === "toEpoch") setDateText(_t);else setStamp(_t);
      }
      if (_u && UNITS.some(x => x.value === _u)) setUnit(_u);
      if (_tz) {
        if (isPresetTz(_tz)) {
          setTz(_tz);
        } else {
          setTz("local");
          setCustomTz(_tz);
        }
      }
    } catch {
      // ignore
    }
  }, []);
  const run = React.useCallback((_dir = dir, _stamp = stamp, _unit = unit, _tz = tz, _customTz = customTz, _dateText = dateText) => {
    setError(null);
    const zone = _tz === "local" ? _customTz.trim() ? _customTz.trim() : "local" : _tz;
    try {
      if (_dir === "toDate") {
        const chosenUnit = autoDetect ? detectUnit(_stamp) ?? _unit : _unit;
        const ms = toMsFromEpoch(_stamp, chosenUnit);
        const dt = safeDate(ms);
        if (!dt) throw new Error("Invalid timestamp.");
        const iso = dt.toISOString();
        const locale = fmtInTz(dt, zone);
        const utc = dt.toUTCString();
        const s = Math.floor(dt.getTime() / 1000);
        const msPrec = dt.getTime();
        const micros = msPrec * 1000;
        const nanos = msPrec * 1_000_000;
        setResult({
          "Detected unit": chosenUnit,
          "Local/Zone": locale,
          UTC: utc,
          "ISO 8601": iso,
          "Epoch (s)": String(s),
          "Epoch (ms)": String(msPrec),
          "Epoch (μs)": String(micros),
          "Epoch (ns)": String(nanos)
        });
      } else {
        const raw = _dateText.trim();
        if (!raw) throw new Error("Enter a date/time (prefer ISO 8601).");
        const dt = safeDate(new Date(raw));
        if (!dt) throw new Error("Unrecognized date/time.");
        const ms = dt.getTime();
        setResult({
          "Input (parsed)": dt.toString(),
          "ISO 8601": dt.toISOString(),
          "Epoch (s)": String(Math.floor(ms / 1000)),
          "Epoch (ms)": String(ms),
          "Epoch (μs)": String(ms * 1000),
          "Epoch (ns)": String(ms * 1_000_000),
          "Rendered (zone)": fmtInTz(dt, zone)
        });
      }
    } catch (e: unknown) {
      setResult({});
      setError(e instanceof Error ? e.message : "Conversion failed.");
    }
  }, [dir, stamp, unit, tz, customTz, dateText, autoDetect]);

  // auto-tick"Now"
  React.useEffect(() => {
    if (!autoTick) return;
    const id = setInterval(() => {
      const now = new Date();
      if (dir === "toDate") {
        const nowSec = Math.floor(now.getTime() / 1000);
        setStamp(String(nowSec));
        run("toDate", String(nowSec), unit, tz, customTz, dateText);
      } else {
        const iso = now.toISOString();
        setDateText(iso);
        run("toEpoch", stamp, unit, tz, customTz, iso);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [autoTick, dir, unit, tz, customTz, dateText, stamp, run]);
  const unitOptions = UNITS.map(u => ({
    label: u.label,
    value: u.value
  }));
  const tzOptions = TZ_PRESETS.map(z => ({
    label: z === "local" ? "Local time" : z,
    value: z
  })) as Array<{
    label: string;
    value: string;
  }>;
  function resetAll() {
    setStamp("");
    setDateText("");
    setTz("local");
    setCustomTz("");
    setUnit("seconds");
    setAutoDetect(true);
    setAutoTick(true);
    setResult({});
    setError(null);
    setDir("toDate");
  }
  return <div className="relative max-w-6xl mx-auto space-y-8"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader title="Timestamp Converter" description="Convert UNIX timestamps to human-readable dates" icon={CalendarClock} actions={<>
 <ResetButton onClick={resetAll} />
 <CopyButton getText={() => shareUrl({
          dir,
          t: dir === "toDate" ? stamp : dateText,
          u: unit,
          tz: tz === "local" ? customTz || "local" : tz
        })} />
 <ExportCSVButton variant="default" filename="timestamp-conversion.csv" getRows={() => Object.entries(result)} disabled={!Object.keys(result).length} />
 </>} />

 <GlassCard>
 <CardContent className="grid grid-cols-1 gap-4 lg:grid-cols-2">
 {/* Left: Inputs */}
 <div className="rounded-xl border p-4 space-y-4">
 <div className="grid gap-3 sm:grid-cols-2">
 <SelectField id="direction" label="Mode" value={dir} onValueChange={v => setDir(v as Direction)} options={[{
                label: "Epoch → Date",
                value: "toDate"
              }, {
                label: "Date → Epoch",
                value: "toEpoch"
              }]} icon={Timer} />
 <SelectField id="unit" label="Unit" value={unit} onValueChange={v => setUnit(v as Unit)} options={unitOptions} disabled={dir !== "toDate" || autoDetect} icon={TimerReset} />
 </div>

 {dir === "toDate" ? <div className="flex items-end gap-4">
 <InputField className="w-full" id="epoch" label="UNIX Timestamp" placeholder="e.g. 1704067200 (seconds), 1704067200000 (ms)…" value={stamp} onChange={v => setStamp(clampIntString(String(v ?? "")))} />
 <div className="flex items-center gap-1">
 <ActionButton label="Now" onClick={() => setStamp(String(Math.floor(Date.now() / 1000)))} icon={Clock3} variant="default" />
 <CopyButton getText={stamp} disabled={!stamp} />
 </div>
 </div> : <div className="flex items-end gap-4">
 <InputField id="date" label="Date / Time" placeholder="ISO preferred (e.g., 2025-09-07T14:10:00Z or 2025-09-07 20:10)" value={dateText} onChange={e => setDateText(e.target.value)} className="w-full" />
 <div className="flex items-center gap-1">
 <ActionButton label="Now" onClick={() => setDateText(new Date().toISOString())} icon={Clock3} variant="default" />
 <CopyButton getText={dateText} disabled={!dateText} />
 </div>
 </div>}

 <div className="grid gap-3 sm:grid-cols-2">
 <SelectField id="tz" label="Time Zone (for rendering)" value={tz} onValueChange={v => {
                const val = String(v);
                if (isPresetTz(val)) setTz(val);
              }} options={tzOptions} icon={RefreshCw} />
 <InputField id="custom-tz" label="Custom TZ (optional)" placeholder="e.g., Asia/Dhaka" value={customTz} onChange={v => setCustomTz(String(v ?? ""))} disabled={tz !== "local"} hint={tz !== "local" ? "Disabled (using preset)" : "Overrides Local for display"} />
 </div>

 <Separator />

 <div className="grid gap-3 sm:grid-cols-1">
 <SwitchRow label="Auto-detect unit" checked={autoDetect} onCheckedChange={setAutoDetect} hint="10=sec, 13=ms, 16=μs, 19=ns" disabled={dir !== "toDate"} />
 <SwitchRow label="Tick 'Now' every second" checked={autoTick} onCheckedChange={setAutoTick} hint={dir === "toDate" ? "Fills current epoch seconds" : "Fills current ISO time"} />
 </div>

 <div className="flex flex-wrap gap-2">
 <ActionButton variant="default" label="Convert" onClick={() => run()} icon={CalendarClock} />
 <ExportTextButton filename="timestamp-conversion.txt" getText={() => Object.entries(result).map(([k, v]) => `${k}: ${v}`).join("\n")} disabled={!Object.keys(result).length} />
 </div>
 </div>

 {/* Right: Results */}
 <div className="rounded-xl border overflow-auto p-4">
 <h3 className="mb-2 text-sm font-medium tracking-wide uppercase text-muted-foreground">
 Result
 </h3>

 {!error && !Object.keys(result).length ? <div className="rounded-md border p-3 text-sm text-muted-foreground">
 Enter a value and click <b>Convert</b>. Use <b>Now</b> for quick checks.
 </div> : null}

 {error ? <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
 {error}
 </div> : <div className="grid gap-2">
 {Object.entries(result).map(([k, v]) => <div key={k} className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2">
 <div className="min-w-[160px] text-xs text-muted-foreground">{k}</div>
 <div className="flex-1 truncate font-mono text-sm">{v}</div>
 <CopyButton size="sm" getText={v} />
 </div>)}
 </div>}
 </div>
 </CardContent>
 </GlassCard>
 {/* SECTION 3: HOW IT WORKS */}
 <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter a Timestamp or Date",
        description: "Paste a Unix timestamp (seconds or milliseconds), an ISO 8601 string, or pick a date from the date picker. The tool auto-detects the format.",
        icon: Clock
      }, {
        step: "02",
        title: "See All Formats Instantly",
        description: "Instantly see the equivalent Unix timestamp, ISO 8601, UTC, local time, and relative time (e.g., \"3 hours ago\"). All conversions update in real time.",
        icon: Globe
      }, {
        step: "03",
        title: "Copy Any Format",
        description: "Click the copy button next to any output format to copy it to clipboard. Use the current timestamp button to capture the exact current time.",
        icon: BookOpen
      }]} badges={["Auto-detects format", "Seconds & milliseconds", "Works offline"]} />

 {/* SECTION 4: FEATURE GUIDES */}
 <ToolFeatureGuides features={[{
        icon: Timer,
        title: "Unix Timestamp Conversion",
        description: "Convert any Unix/POSIX timestamp (seconds since 1970-01-01 00:00:00 UTC) to human-readable date and time in any timezone."
      }, {
        icon: Calendar,
        title: "ISO 8601 Support",
        description: "Parse and generate ISO 8601 strings (e.g., 2024-03-15T10:30:00Z) — the standard format used by APIs, databases, and web services globally."
      }, {
        icon: Globe,
        title: "Timezone Awareness",
        description: "Shows both UTC and your local browser timezone. Understand the difference between a timestamp (absolute moment) and a local time display."
      }, {
        icon: Clock,
        title: "Relative Time Display",
        description: "Shows how long ago or how far in the future the timestamp is — \"3 hours ago\", \"in 2 days\"— useful for log analysis and event scheduling."
      }, {
        icon: Code2,
        title: "Millisecond Precision",
        description: "Handles both second-precision (10-digit) and millisecond-precision (13-digit) Unix timestamps — auto-detected from the input length."
      }, {
        icon: Shield,
        title: "Client-Side & Private",
        description: "All timestamp conversions run in your browser using JavaScript's Date API. No data is sent to any server. Works fully offline."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <h3 className="text-lg font-semibold">Unix Timestamps — A Complete Developer Reference</h3>
 <p>
 A <strong>Unix timestamp</strong> (also called POSIX time or Epoch time) is the number of seconds
 that have elapsed since <strong>January 1, 1970, 00:00:00 UTC</strong> — called the Unix Epoch.
 It is the most universal way to represent a specific moment in time across all programming languages,
 databases, and operating systems because it is timezone-independent and always unambiguous.
 </p>

 <h4 className="font-semibold">Timestamp Format Reference</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Format</th>
 <th className="border p-2 text-left">Example</th>
 <th className="border p-2 text-left">Precision</th>
 <th className="border p-2 text-left">Common Use</th>
 </tr>
 </thead>
 <tbody>
 {[["Unix (seconds)", "1710499200", "1 second", "Unix/Linux, databases, APIs"], ["Unix (ms)", "1710499200000", "1 millisecond", "JavaScript Date.now(), Java"], ["ISO 8601 (UTC)", "2024-03-15T10:00:00Z", "1 second", "REST APIs, JSON, XML"], ["ISO 8601 (offset)", "2024-03-15T16:00:00+06:00", "1 second", "Localized API responses"], ["RFC 2822", "Fri, 15 Mar 2024 10:00:00 +0000", "1 second", "Email headers, HTTP dates"], ["RFC 3339", "2024-03-15T10:00:00.000Z", "1 ms", "Internet protocols, IETF"]].map(([fmt, ex, prec, use]) => <tr key={fmt} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{fmt}</td>
 <td className="border p-2 font-mono text-primary text-xs">{ex}</td>
 <td className="border p-2 text-xs">{prec}</td>
 <td className="border p-2 text-muted-foreground text-xs">{use}</td>
 </tr>)}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">Getting the Current Timestamp in Major Languages</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Language</th>
 <th className="border p-2 text-left">Seconds</th>
 <th className="border p-2 text-left">Milliseconds</th>
 </tr>
 </thead>
 <tbody>
 {[["JavaScript", "Math.floor(Date.now() / 1000)", "Date.now()"], ["Python", "import time; time.time()", "time.time() * 1000"], ["PHP", "time()", "microtime(true) * 1000"], ["Go", "time.Now().Unix()", "time.Now().UnixMilli()"], ["Rust", "SystemTime::UNIX_EPOCH.elapsed().unwrap().as_secs()", ".as_millis()"], ["SQL (PostgreSQL)", "EXTRACT(EPOCH FROM NOW())", "... * 1000"]].map(([lang, secs, ms]) => <tr key={lang} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{lang}</td>
 <td className="border p-2 font-mono text-xs text-primary">{secs}</td>
 <td className="border p-2 font-mono text-xs">{ms}</td>
 </tr>)}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">The Year 2038 Problem (Y2K38)</h4>
 <p>
 Systems using 32-bit signed integers to store Unix timestamps will overflow on
 <strong> January 19, 2038 at 03:14:07 UTC</strong> — wrapping to negative values.
 Modern 64-bit systems are not affected. If you work with legacy C code, embedded systems,
 or old databases using INT columns for timestamps, this is a real concern to audit.
 </p>

 <h4 className="font-semibold">UTC vs Local Time — Why It Matters</h4>
 <p>
 Always store timestamps in <strong>UTC</strong> in your database and convert to local time only for
 display. Storing local time creates ambiguity during DST transitions and makes cross-timezone queries
 error-prone. A Unix timestamp is inherently UTC — it is the most unambiguous format for storage.
 </p>
 </div>
 </ToolFeatureGuides>

 {/* SECTION 5: FAQ + RELATED TOOLS */}
 <ToolFaqAccordion faqs={[{
        question: "What is a Unix timestamp?",
        answer: "A Unix timestamp is the number of seconds elapsed since January 1, 1970, 00:00:00 UTC (the Unix Epoch). It is timezone-independent and universally supported across all programming languages, making it the standard way to store and transmit time in software."
      }, {
        question: "What is the difference between a 10-digit and 13-digit timestamp?",
        answer: "A 10-digit timestamp is in seconds (Unix time). A 13-digit timestamp is in milliseconds (used by JavaScript's Date.now() and Java's System.currentTimeMillis()). This converter auto-detects the format based on the digit count."
      }, {
        question: "How do I convert a timestamp to a human-readable date?",
        answer: "Paste the timestamp into the input field. The tool instantly shows it in ISO 8601, UTC, local time, and relative format. In JavaScript: new Date(timestamp * 1000).toISOString() for second timestamps, or new Date(timestamp).toISOString() for millisecond timestamps."
      }, {
        question: "What is ISO 8601 and why is it used in APIs?",
        answer: "ISO 8601 is the international standard for date/time representation (e.g., 2024-03-15T10:30:00Z). APIs use it because it is unambiguous, sortable alphabetically, and timezone-aware via the Z suffix (UTC) or offset (+06:00). It avoids the DD/MM/YYYY vs MM/DD/YYYY ambiguity."
      }, {
        question: "Should I store timestamps as Unix time or ISO 8601 in my database?",
        answer: "For most databases, store as UTC datetime (ISO 8601 format) in a TIMESTAMP or TIMESTAMPTZ column — this is human-readable and supported by built-in date functions. Unix integers work well for high-volume time-series data where storage size matters."
      }]} />
 <RelatedTools currentToolUrl="/tools/dev/timestamp-converter" max={6} />
 </div></div>;
}