"use client";

import { useEffect, useState } from "react";

export function GitHubStars() {
  const [stars, setStars] = useState<number>(0);
  const [loading, setLoading] = useState(true);

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
      } catch (error) {
        console.error("Error fetching GitHub profile:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStars();
  }, []);

  if (loading) {
    return <span className="text-xs font-semibold opacity-50">GitHub</span>;
  }

  return (
    <span className="text-xs font-semibold">
      {stars > 0 ? `@bluesun-gif` : "GitHub"}
    </span>
  );
}
