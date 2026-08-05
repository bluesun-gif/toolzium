export const dynamic = "force-dynamic";

import { SidebarProvider } from "@/components/ui/sidebar";
import ToolsHeader from "@/components/ui/tools-header";
import { ToolsSidebar } from "@/components/ui/tools-sidebar";
import { ToolPageWrapper } from "@/components/shared/tool-page-wrapper";
import type { ChildrenProps } from "@/types";

function BackgroundFX() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute left-1/2 top-[-10%] h-220 w-220 -translate-x-1/2 rounded-full bg-linear-to-b from-primary/30 via-primary/10 to-transparent blur-3xl" />
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,var(--color-muted)/10_1px,transparent_1px)] bg-size-[24px_24px]" />
    </div>
  );
}

export default function DashboardLayout({ children }: ChildrenProps) {
  return (
    <SidebarProvider>
      <div className="relative flex min-h-screen w-full overflow-hidden">
        <BackgroundFX />
        <ToolsSidebar />
        <div className="flex flex-1 flex-col">
          <ToolsHeader />
          <main className="flex-1 py-6 px-4 max-w-6xl mx-auto w-full">
            <ToolPageWrapper>{children}</ToolPageWrapper>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
