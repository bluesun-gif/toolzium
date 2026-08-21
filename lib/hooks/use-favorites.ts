"use client";

import { useState, useEffect, useCallback } from "react";

export interface FavoriteTool {
  title: string;
  url: string;
  description?: string;
  category?: string;
}

const FAVORITES_KEY = "toolzium:favorites";
const EVENT_NAME = "toolzium:favorites_changed";

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteTool[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadFavorites = useCallback(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      } else {
        setFavorites([]);
      }
    } catch {
      setFavorites([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    loadFavorites();

    const handleStorage = () => loadFavorites();
    window.addEventListener(EVENT_NAME, handleStorage);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(EVENT_NAME, handleStorage);
      window.removeEventListener("storage", handleStorage);
    };
  }, [loadFavorites]);

  const isFavorite = useCallback(
    (url: string) => {
      return favorites.some((f) => f.url === url);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (tool: FavoriteTool) => {
      try {
        const stored = localStorage.getItem(FAVORITES_KEY);
        let list: FavoriteTool[] = stored ? JSON.parse(stored) : [];

        const exists = list.some((f) => f.url === tool.url);
        if (exists) {
          list = list.filter((f) => f.url !== tool.url);
        } else {
          list.unshift(tool);
        }

        localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
        setFavorites(list);
        window.dispatchEvent(new Event(EVENT_NAME));
        return !exists;
      } catch {
        return false;
      }
    },
    []
  );

  return { favorites, isLoaded, isFavorite, toggleFavorite };
}
