"use client";

import React, { createContext, useContext } from "react";

// Premium is DISABLED — site is fully free until 500k users reached
type PremiumContextType = {
  isPremium: boolean;
  togglePremium: () => void;
  activatePremium: () => void;
  deactivatePremium: () => void;
};

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export function PremiumProvider({ children }: { children: React.ReactNode }) {
  // Always free — premium features disabled
  const noop = () => {};

  return (
    <PremiumContext.Provider value={{ isPremium: false, togglePremium: noop, activatePremium: noop, deactivatePremium: noop }}>
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
