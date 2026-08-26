"use client";

import { ChevronRight, ChevronsUpDown, FolderClosed, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();
  const [openCategories, setOpenCategories] = React.useState<Record<string, boolean>>({});

  // Auto-expand only the currently active category based on URL
  React.useEffect(() => {
    const activeState: Record<string, boolean> = {};
    items.forEach((item) => {
      const isCurrentCategory =
        pathname === item.url ||
        item.items?.some((sub) => sub.url !== "/tools" && pathname.startsWith(sub.url));
      if (isCurrentCategory) {
        activeState[item.title] = true;
      }
    });
    setOpenCategories(activeState);
  }, [pathname, items]);

  const toggleCategory = (title: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isActiveItems = (url: string) =>
    url === "/tools" ? pathname === url : pathname.startsWith(url);

  return (
    <SidebarGroup>
      <div className="flex items-center justify-between px-2 py-1 mb-1">
        <SidebarGroupLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Tool Categories
        </SidebarGroupLabel>
      </div>

      <SidebarMenu>
        {items.map((item) => {
          const isOpen = !!openCategories[item.title];
          const hasActiveChild = item.items?.some((sub) => isActiveItems(sub.url));

          return (
            <Collapsible
              key={item.title}
              open={isOpen}
              onOpenChange={() => toggleCategory(item.title)}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`rounded-xl transition-colors font-medium text-xs sm:text-sm ${
                      hasActiveChild ? "bg-primary/10 text-primary font-semibold" : ""
                    }`}
                  >
                    {item.icon ? <item.icon className="h-4 w-4 shrink-0" /> : <FolderClosed className="h-4 w-4 shrink-0" />}
                    <span className="truncate flex-1">{item.title}</span>
                    <span className="text-[11px] text-muted-foreground tabular-nums px-1.5 py-0.5 rounded-full bg-muted/60">
                      {item.items?.length ?? 0}
                    </span>
                    <ChevronRight
                      className={`ml-1 h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-90 text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="my-1 border-l-2 border-primary/20 ml-3.5 pl-2 space-y-0.5">
                    {item.items?.map((subItem) => {
                      const active = isActiveItems(subItem.url);
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild isActive={active} className="rounded-lg h-7 text-xs">
                            <Link href={subItem.url} className="w-full min-w-0 flex items-center">
                              <span className="truncate w-full min-w-0 block">{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
