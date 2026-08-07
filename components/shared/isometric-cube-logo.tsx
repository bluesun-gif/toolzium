"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface IsometricCubeLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export default function IsometricCubeLogo({
  size = 32,
  showText = true,
  className,
}: IsometricCubeLogoProps) {
  const half = Math.round(size / 2);

  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2.5 font-bold tracking-tight group shrink-0", className)}
    >
      {/* 3D Scene Viewport */}
      <div
        className="relative flex items-center justify-center shrink-0"
        style={{ width: size, height: size, perspective: "600px" }}
      >
        {/* 3D Rotating Cube Container */}
        <div
          className="relative preserve-3d animate-isometric-orbit group-hover:[animation-duration:2.5s] transition-all"
          style={{
            width: size,
            height: size,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Front Face */}
          <div
            className="absolute inset-0 rounded-lg border-2 border-purple-400/90 bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 shadow-[0_0_12px_rgba(168,85,247,0.6)] flex items-center justify-center"
            style={{ transform: `translateZ(${half}px)` }}
          >
            <div className="w-2.5 h-2.5 rounded-xs bg-white/90 shadow-xs animate-pulse" />
          </div>

          {/* Back Face */}
          <div
            className="absolute inset-0 rounded-lg border-2 border-indigo-400/90 bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-900 shadow-[0_0_12px_rgba(129,140,248,0.6)]"
            style={{ transform: `rotateY(180deg) translateZ(${half}px)` }}
          />

          {/* Right Face */}
          <div
            className="absolute inset-0 rounded-lg border-2 border-purple-300/90 bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-700 shadow-[0_0_12px_rgba(192,132,252,0.6)]"
            style={{ transform: `rotateY(90deg) translateZ(${half}px)` }}
          />

          {/* Left Face */}
          <div
            className="absolute inset-0 rounded-lg border-2 border-violet-400/90 bg-gradient-to-br from-violet-600 via-indigo-700 to-purple-900 shadow-[0_0_12px_rgba(139,92,246,0.6)]"
            style={{ transform: `rotateY(-90deg) translateZ(${half}px)` }}
          />

          {/* Top Face */}
          <div
            className="absolute inset-0 rounded-lg border-2 border-fuchsia-300/90 bg-gradient-to-br from-fuchsia-500 via-purple-500 to-violet-600 shadow-[0_0_12px_rgba(232,121,249,0.6)]"
            style={{ transform: `rotateX(90deg) translateZ(${half}px)` }}
          />

          {/* Bottom Face */}
          <div
            className="absolute inset-0 rounded-lg border-2 border-indigo-500/90 bg-gradient-to-br from-indigo-800 via-purple-900 to-slate-950 shadow-[0_0_12px_rgba(99,102,241,0.6)]"
            style={{ transform: `rotateX(-90deg) translateZ(${half}px)` }}
          />

          {/* Inner Glowing Core */}
          <div
            className="absolute inset-2.5 rounded-sm bg-white/90 border border-purple-200 shadow-[0_0_10px_#ffffff]"
            style={{ transform: "translateZ(0px)" }}
          />
        </div>
      </div>

      {showText && (
        <span className="text-base font-bold bg-gradient-to-r from-foreground via-foreground/90 to-primary bg-clip-text">
          Toolzium
        </span>
      )}
    </Link>
  );
}
