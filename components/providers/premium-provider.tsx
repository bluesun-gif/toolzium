"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

type PremiumContextType = {
  isPremium: boolean;
  togglePremium: () => void;
  activatePremium: () => void;
  deactivatePremium: () => void;
};

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export function PremiumProvider({ children }: { children: React.ReactNode }) {
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("toolzium_premium_enabled");
    if (saved === "true") {
      setIsPremium(true);
    }
  }, []);

  const activatePremium = () => {
    setIsPremium(true);
    localStorage.setItem("toolzium_premium_enabled", "true");
    toast.success("Premium membership activated! Thank you for your support. 👑", {
      duration: 5000,
      icon: "🎉",
    });
  };

  const deactivatePremium = () => {
    setIsPremium(false);
    localStorage.setItem("toolzium_premium_enabled", "false");
    toast.success("Premium membership deactivated. Ads have been re-enabled.");
  };

  const togglePremium = () => {
    if (isPremium) {
      deactivatePremium();
    } else {
      activatePremium();
    }
  };

  // Prevent hydration mismatch by rendering children without context checks until mounted
  return (
    <PremiumContext.Provider value={{ isPremium: mounted ? isPremium : false, togglePremium, activatePremium, deactivatePremium }}>
      {children}
    </PremiumContext.Provider>
  );
}

export function usePremium() {
  const context = useContext(PremiumContext);
  if (context === undefined) {
    throw new Error("usePremium must be used within a PremiumProvider");
  }
  return context;
}
