"use client";

import { usePathname } from "next/navigation";
import { ShareTool } from "@/components/shared/share-tool";
import { ToolsData } from "@/data/tools";
import { Separator } from "@/components/ui/separator";
import { AdSlot } from "@/components/shared/ad-slot";
import { ToolErrorBoundary } from "@/components/shared/tool-error-boundary";
import { EmbedButton } from "@/components/shared/embed-modal";

type ToolPageWrapperProps = {
  children: React.ReactNode;
  /** Override title for share buttons (defaults to auto-detect) */
  title?: string;
};

/**
 * Wrap any tool page's client component with this to automatically
 * add AdSlot + Share buttons at the bottom.
 * Auto-detects the current tool from the URL.
 * AdSlot is hidden for premium users automatically.
 */
export function ToolPageWrapper({ children, title }: ToolPageWrapperProps) {
  const pathname = usePathname();

  // Auto-detect tool title from ToolsData
  const detectedTitle =
    title ??
    ToolsData.flatMap((cat) => cat.items).find((item) => item.url === pathname)
      ?.title ??
    "Tool";

  const fullUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://toolzium.com${pathname}`;

  // Don't show on the main /tools listing page
  const isToolPage = pathname !== "/tools" && pathname.startsWith("/tools/");

  return (
    <div className="w-full max-w-full overflow-hidden">
      <ToolErrorBoundary toolName={detectedTitle}>
        {children}
      </ToolErrorBoundary>

      {isToolPage && (
        <div className="max-w-full overflow-hidden">
          <Separator className="my-8" />

          <div className="flex flex-col gap-6 max-w-full overflow-hidden">
            {/* Ad Slot — auto-hidden for premium users */}
            <AdSlot />

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-card/60 border border-border/70">
              <ShareTool title={detectedTitle} url={fullUrl} />
              <div className="flex items-center gap-2">
                <EmbedButton toolPath={pathname} toolTitle={detectedTitle} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
