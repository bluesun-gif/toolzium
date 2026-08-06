import { type LucideIcon, ScanFace } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

type ToolPageHeaderProps = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actions?: React.ReactNode;
  className?: string;
};

export default function ToolPageHeader({
  title,
  description,
  icon: Icon,
  actions,
  className = "",
}: ToolPageHeaderProps) {
  const LeftIcon: LucideIcon = Icon ?? ScanFace;

  return (
    <GlassCard
      className={`mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-4 sm:px-6 sm:py-5 max-w-full overflow-hidden ${className}`}
    >
      <div className="min-w-0 max-w-full space-y-1">
        <h1 className="flex items-center gap-2 text-xl sm:text-2xl font-bold tracking-tight text-foreground truncate max-w-full">
          <LeftIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary shrink-0" />
          <span className="truncate">{title}</span>
        </h1>
        {description ? (
          <p className="text-xs sm:text-sm text-muted-foreground break-words max-w-full">
            {description}
          </p>
        ) : null}
      </div>

      {actions ? (
        <div className="flex flex-wrap items-center gap-2 max-w-full pt-1 sm:pt-0 shrink-0">
          {actions}
        </div>
      ) : null}
    </GlassCard>
  );
}
