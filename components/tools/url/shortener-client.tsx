"use client";

import {
  ActionButton,
  CopyButton,
  LinkButton,
  ResetButton,
} from "@/components/shared/action-buttons";
import ColorField from "@/components/shared/color-field";
import InputField from "@/components/shared/form-fields/input-field";
import { QRCodeBox } from "@/components/shared/qr-code";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQrExport } from "@/hooks/use-qr-export";
import { createShort } from "@/lib/actions/shortener.action";
import {
  trackError,
  trackProcessingTime,
  trackToolCompletion,
  trackToolConversion,
  trackToolUsage,
  trackUserEngagement,
} from "@/lib/gtm";
import { timeAgo } from "@/lib/utils/time-ago";
import {
  BarChart2,
  CalendarClock,
  Download,
  ExternalLink,
  Grip,
  Link2,
  Link as LinkIcon,
  PaintBucket,
  QrCode,
  ShieldCheck,
  Trash,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const RECENT_KEY = "Toolzium:shortener-v1";

type ECC = "L" | "M" | "Q" | "H";

interface RecentItem {
  slug: string;
  url: string;
  createdAt: number;
}

function loadRecent(): RecentItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as RecentItem[]) : [];
  } catch {
    return [];
  }
}
function saveRecent(items: RecentItem[]) {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(items));
  } catch {}
}

export default function ShortenerClient() {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">(
    "idle"
  );
  const [recent, setRecent] = useState<RecentItem[]>([]);

  // QR settings
  const [qrSize, setQrSize] = useState<number>(160);
  const [qrMargin, setQrMargin] = useState<number>(1);
  const [qrECC, setQrECC] = useState<ECC>("M");
  const [qrDark, setQrDark] = useState<string>("#000000");
  const [qrLight, setQrLight] = useState<string>("#ffffff");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecent(loadRecent());
  }, []);

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const shortUrl = useMemo(
    () => (slug ? `${origin}/${slug}` : ""),
    [origin, slug]
  );
  const qrUrl = useMemo(
    () => (slug ? `${origin}/${slug}?src=qr` : ""),
    [origin, slug]
  );
  const analyticsUrl = useMemo(
    () => (slug ? `${origin}/tools/url/shortener/analytics/${slug}` : ""),
    [origin, slug]
  );

  const { downloadPNG, downloadSVG } = useQrExport({
    value: qrUrl || "https://example.com",
    size: qrSize,
    margin: qrMargin,
    ecl: qrECC,
    fg: qrDark,
    bg: qrLight,
    quietZone: true,
    logo: null,
  });

  const removeRecent = (rowSlug: string) => {
    const next = recent.filter((i) => i.slug !== rowSlug);
    setRecent(next);
    saveRecent(next);
  };

  const onShorten = async () => {
    if (!url.trim()) return;
    setStatus("saving");

    const startTime = performance.now();
    trackToolUsage("URL Shortener", "URL");
    trackUserEngagement("URL Shortener", "url_input", url.length);

    const res = await createShort({ url });
    const endTime = performance.now();
    const processingTime = endTime - startTime;

    if (!res.ok) {
      setStatus("error");
      toast.error("Invalid URL!");
      trackError("URL Shortener", "shortening_failed", "Invalid URL");
      return;
    }
    setSlug(res.link.short);

    const item: RecentItem = {
      slug: res.link.short,
      url: res.link.targetUrl,
      createdAt: Date.now(),
    };
    const next = [
      item,
      ...loadRecent().filter((i) => i.slug !== item.slug),
    ].slice(0, 12);
    setRecent(next);
    saveRecent(next);

    trackToolConversion("URL Shortener", "completed");
    trackProcessingTime("URL Shortener", "url_shortening", processingTime);
    trackToolCompletion("URL Shortener", "URL", {
      processingTime,
      inputFormat: "long_url",
      outputFormat: "short_url",
    });

    setStatus("done");
  };

  const reset = () => {
    setUrl("");
    setSlug("");
    setStatus("idle");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 space-y-6">
      <ToolPageHeader
        icon={Link2}
        title="URL Shortener"
        description="Shorten links with custom slugs & analytics"
        actions={
          <CopyButton
            variant="default"
            getText={() =>
              typeof window !== "undefined" ? window.location.href : ""
            }
            label="Copy Link"
          />
        }
      />

      {/* Main Form */}
      <GlassCard className="p-4 sm:p-6 space-y-4">
        <Label className="font-semibold text-sm">Destination URL</Label>
        <div className="flex flex-col sm:flex-row gap-2">
          <InputField
            id="dest-url"
            type="url"
            placeholder="Enter your URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            inputClassName="bg-background/60 backdrop-blur text-xs sm:text-sm h-10"
            className="w-full sm:flex-1"
          />
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <ActionButton
              variant="default"
              icon={LinkIcon}
              label={status === "saving" ? "Shortening…" : "Shorten"}
              onClick={onShorten}
              disabled={!url || status === "saving"}
              className="flex-1 sm:flex-initial h-10"
            />
            <ResetButton label="Make another" onClick={reset} className="h-10" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          We normalize URLs automatically (adds{" "}
          <code className="rounded-md bg-muted px-2 py-0.5 text-xs font-mono">
            https://
          </code>{" "}
          if missing).
        </p>
      </GlassCard>

      {/* Result Card when generated */}
      {shortUrl && (
        <GlassCard className="p-4 sm:p-6 space-y-4 border-primary/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-primary flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" /> Short Link Ready:
            </span>
            <Badge variant="outline" className="text-emerald-500 border-emerald-500/30">
              Active
            </Badge>
          </div>

          <div className="p-3 rounded-xl border bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-3 min-w-0 max-w-full">
            <span className="font-mono text-sm font-semibold text-primary break-all max-w-full truncate">
              {shortUrl}
            </span>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <CopyButton getText={() => shortUrl} size="sm" className="h-9 px-3" />
              <LinkButton size="sm" href={shortUrl} newTab icon={ExternalLink} label="Open" className="h-9 px-3" />
            </div>
          </div>
        </GlassCard>
      )}

      {/* Recent history list - Mobile Optimized (Zero Overflow / Cuts Off) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Recent Shortened Links</span>
          {recent.length > 0 && (
            <ResetButton
              variant="ghost"
              size="sm"
              label="Clear History"
              onClick={() => {
                setRecent([]);
                saveRecent([]);
              }}
            />
          )}
        </div>

        {recent.length === 0 && (
          <div className="text-xs text-muted-foreground p-4 text-center rounded-xl border border-dashed">
            No links created yet. Paste a URL above to shorten your first link!
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2">
          {recent.slice(0, 10).map((it) => {
            const sUrl = `${origin}/${it.slug}`;
            const aUrl = `${origin}/tools/url/shortener/analytics/${it.slug}`;
            const host = (() => {
              try {
                return new URL(it.url).hostname;
              } catch {
                return it.url;
              }
            })();

            return (
              <GlassCard
                key={it.slug}
                className="p-3 sm:p-4 space-y-3 max-w-full overflow-hidden rounded-2xl"
              >
                {/* Header: Favicon & URLs */}
                <div className="flex items-center gap-3 min-w-0 max-w-full">
                  <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-xl border bg-background/50 flex items-center justify-center">
                    <img
                      alt={`${host} favicon`}
                      src={`https://www.google.com/s2/favicons?domain=${host}&sz=64`}
                      className="h-5 w-5 object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1.5 min-w-0">
                      <span className="truncate text-xs sm:text-sm font-semibold text-primary break-all max-w-full">
                        {sUrl}
                      </span>
                      <Badge variant="secondary" className="hidden sm:inline-flex text-[10px] shrink-0">
                        {timeAgo(it.createdAt)}
                      </Badge>
                    </div>
                    <p className="truncate text-[11px] text-muted-foreground break-all max-w-full mt-0.5">
                      → {it.url}
                    </p>
                  </div>
                </div>

                {/* Mobile Button Bar: Clean Grid that NEVER cuts off! */}
                <div className="grid grid-cols-5 gap-1 pt-2 border-t border-border/30 w-full items-center">
                  <CopyButton
                    getText={() => sUrl}
                    size="sm"
                    label="Copy"
                    className="w-full justify-center px-1 text-[11px] h-8"
                  />

                  <Popover>
                    <PopoverTrigger asChild>
                      <ActionButton
                        size="sm"
                        label="QR"
                        icon={QrCode}
                        className="w-full justify-center px-1 text-[11px] h-8"
                      />
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-4">
                      <div className="flex flex-col items-center gap-2">
                        <QRCodeBox
                          value={`${sUrl}?src=qr`}
                          size={140}
                          margin={1}
                          ecl="M"
                          fg="#000000"
                          bg="#ffffff"
                          quietZone
                        />
                        <span className="break-all text-center text-xs text-muted-foreground">
                          {sUrl}
                        </span>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <LinkButton
                    size="sm"
                    href={sUrl}
                    newTab
                    icon={ExternalLink}
                    label="Open"
                    className="w-full justify-center px-1 text-[11px] h-8"
                  />

                  <LinkButton
                    icon={BarChart2}
                    label="Stats"
                    href={aUrl}
                    size="sm"
                    className="w-full justify-center px-1 text-[11px] h-8"
                  />

                  <ActionButton
                    onClick={() => removeRecent(it.slug)}
                    size="sm"
                    icon={Trash}
                    variant="destructive"
                    className="w-full justify-center px-1 text-[11px] h-8"
                  />
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
