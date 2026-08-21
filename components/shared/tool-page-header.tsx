"use client";

import { type LucideIcon, Sparkles } from "lucide-react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { CoolMode } from "@/components/ui/cool-mode";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import React, { useEffect } from "react";
import { ToolFavoriteButton } from "./tool-favorite-button";
import { ToolShareButton } from "./tool-share-button";

type ToolPageHeaderProps = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actions?: React.ReactNode;
  badgeText?: string;
  className?: string;
  showBuiltinActions?: boolean;
};

export default function ToolPageHeader({
  title,
  description,
  icon: Icon,
  actions,
  badgeText = "✨ Fast • Free • Privacy-Friendly",
  className = "",
  showBuiltinActions = true,
}: ToolPageHeaderProps) {
  const LeftIcon: LucideIcon = Icon ?? Sparkles;

  // Track recently used tool in localStorage
  useEffect(() => {
    if (typeof window === "undefined" || !title) return;
    try {
      const url = window.location.pathname;
      if (!url.startsWith("/tools/") || url === "/tools") return;

      const stored = localStorage.getItem("toolzium:recent-items-v1");
      let list = stored ? JSON.parse(stored) : [];
      list = list.filter((item: { url: string }) => item.url !== url);
      list.unshift({ title, url, description, timestamp: Date.now() });
      localStorage.setItem("toolzium:recent-items-v1", JSON.stringify(list.slice(0, 12)));
    } catch {}
  }, [title, description]);

  // Spotlight mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlight = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, hsl(var(--primary) / 0.07), transparent 80%)`;

  const toolData = {
    title,
    url: typeof window !== "undefined" ? window.location.pathname : "",
    description,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div
        onMouseMove={handleMouseMove}
        className={`mb-6 relative overflow-hidden rounded-2xl border border-border/80 bg-background/60 backdrop-blur-md shadow-xl ${className}`}
      >
        {/* Spotlight overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 hover:opacity-100"
          style={{ background: spotlight }}
          aria-hidden="true"
        />

        {/* Ambient corner glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl -z-10" />
        <div className="pointer-events-none absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-primary/8 blur-2xl -z-10" />

        <div className="p-4 sm:px-8 sm:py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2 min-w-0 max-w-full">
              {/* Animated Gradient Badge */}
              {badgeText && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-muted/60 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-semibold shadow-sm max-w-full"
                >
                  <AnimatedGradientText
                    className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold break-words"
                    colorFrom="#a78bfa"
                    colorTo="#38bdf8"
                    speed={0.8}
                  >
                    {badgeText}
                  </AnimatedGradientText>
                </motion.div>
              )}

              <div className="flex items-center gap-2.5 sm:gap-3">
                {/* Animated icon container with particles */}
                <CoolMode>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="h-9 w-9 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 shadow-sm cursor-pointer"
                  >
                    <LeftIcon className="h-4.5 w-4.5 sm:h-6 sm:w-6" />
                  </motion.div>
                </CoolMode>

                {/* Title */}
                <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground leading-tight py-0 break-words">
                  {title}
                </h1>
              </div>

              {description && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-3xl"
                >
                  {description}
                </motion.p>
              )}
            </div>

            {/* Actions: Builtin Favorites + Share + Custom Actions */}
            <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0 shrink-0">
              {showBuiltinActions && (
                <>
                  <ToolFavoriteButton tool={toolData} />
                  <ToolShareButton toolTitle={title} />
                </>
              )}
              {actions}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
