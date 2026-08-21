"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { socialIcons } from "./icons";

export function GitHubStars() {
  const [stars, setStars] = useState<number>(0);
  const githubSvg = socialIcons.find((icon) => icon.name === "Github")?.svg;

  useEffect(() => {
    async function fetchStars() {
      try {
        const res = await fetch("https://api.github.com/users/bluesun-gif", {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        });
        if (res.ok) {
          const data = await res.json();
          setStars(data.public_repos || 0);
        }
      } catch {}
    }
    fetchStars();
  }, []);

  return (
    <Button
      variant="outline"
      asChild
      size="icon"
      className="hidden sm:flex h-9 w-9 rounded-xl border-border/80"
    >
      <Link
        href="https://github.com/bluesun-gif"
        rel="noopener noreferrer"
        target="_blank"
        aria-label="GitHub Profile"
      >
        {githubSvg}
      </Link>
    </Button>
  );
}
