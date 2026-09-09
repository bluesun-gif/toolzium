import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Shield, Zap } from "lucide-react";

type BadgeType = "free" | "no-signup" | "anonymous" | "instant" | "secure";

interface TrustBadgeStripProps {
  badges?: BadgeType[];
  usageCount?: number;
  showSecurityNote?: boolean;
}

const badgeConfig: Record<
  BadgeType,
  { icon: typeof CheckCircle2; label: string }
> = {
  free: { icon: CheckCircle2, label: "100% Free" },
  "no-signup": { icon: CheckCircle2, label: "No Signup" },
  anonymous: { icon: Shield, label: "Anonymous" },
  instant: { icon: Zap, label: "Instant Results" },
  secure: { icon: Shield, label: "Encrypted" },
};

/**
 * Compact trust-signal strip for high-intent tool pages.
 * Renders badges + optional security note — the page H1 stays in
 * ProgrammaticSeoWrapper so we never double the heading.
 */
export function TrustBadgeStrip({
  badges = ["free", "no-signup", "anonymous"],
  usageCount,
  showSecurityNote = false,
}: TrustBadgeStripProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {badges.map((badgeType) => {
          const config = badgeConfig[badgeType];
          const Icon = config.icon;
          return (
            <Badge key={badgeType} variant="secondary" className="gap-1.5 rounded-full">
              <Icon className="w-3.5 h-3.5" />
              {config.label}
            </Badge>
          );
        })}

        {usageCount ? (
          <span className="text-xs text-muted-foreground ml-1">
            🔥 {usageCount.toLocaleString()}+ uses this month
          </span>
        ) : null}
      </div>

      {showSecurityNote && (
        <div className="bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800/60 rounded-xl p-3">
          <p className="text-sm text-green-800 dark:text-green-200 flex items-start gap-1.5">
            <Shield className="inline w-4 h-4 mt-0.5 shrink-0" />
            <span>
              <strong>Zero-knowledge architecture:</strong> All checks run locally
              or anonymously. We never see or store your data.
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default TrustBadgeStrip;
