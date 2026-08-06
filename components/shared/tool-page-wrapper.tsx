"use client";

import { usePathname } from "next/navigation";
import { RelatedTools } from "@/components/shared/related-tools";
import { ShareTool } from "@/components/shared/share-tool";
import { ToolsData } from "@/data/tools";
import { Separator } from "@/components/ui/separator";

type ToolPageWrapperProps = {
  children: React.ReactNode;
  /** Override title for share buttons (defaults to auto-detect) */
  title?: string;
};

/**
 * Wrap any tool page's client component with this to automatically
 * add Share buttons + Related Tools section at the bottom.
 * Auto-detects the current tool from the URL.
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
      {children}

      {isToolPage && (
        <div className="max-w-full overflow-hidden">
          <Separator className="my-8" />

          <div className="flex flex-col gap-6 max-w-full overflow-hidden">
            <ShareTool title={detectedTitle} url={fullUrl} />
            <RelatedTools currentToolUrl={pathname} max={6} />
          </div>
        </div>
      )}
    </div>
  );
}
