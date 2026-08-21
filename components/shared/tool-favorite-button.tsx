"use client";

import React from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites, FavoriteTool } from "@/lib/hooks/use-favorites";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface ToolFavoriteButtonProps {
  tool: FavoriteTool;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "icon";
}

export function ToolFavoriteButton({
  tool,
  className,
  variant = "outline",
  size = "sm",
}: ToolFavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  const active = isLoaded && isFavorite(tool.url);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleFavorite(tool);
    if (added) {
      toast.success(`Added ${tool.title} to favorites! ⭐`);
    } else {
      toast(`Removed ${tool.title} from favorites`, { icon: "ℹ️" });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      aria-label={active ? `Remove ${tool.title} from favorites` : `Star ${tool.title} to favorites`}
      className={cn(
        "transition-all duration-200 gap-1.5 h-8.5 px-3 rounded-xl border-border/80",
        active
          ? "bg-amber-500/10 border-amber-500/30 text-amber-500 hover:bg-amber-500/20 hover:text-amber-400 dark:text-amber-400"
          : "hover:border-primary/50 text-muted-foreground hover:text-foreground",
        className
      )}
    >
      <Star
        className={cn(
          "w-4 h-4 transition-transform duration-200",
          active ? "fill-amber-400 text-amber-400 scale-110" : ""
        )}
      />
      <span className="text-xs font-semibold hidden sm:inline">
        {active ? "Starred" : "Star"}
      </span>
    </Button>
  );
}
