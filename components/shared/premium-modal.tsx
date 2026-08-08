"use client";

import { useState } from "react";
import { usePremium } from "@/components/providers/premium-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Crown,
  Zap,
  Shield,
  Ban,
  Sparkles,
  Star,
  ArrowRight,
} from "lucide-react";

const PREMIUM_FEATURES = [
  { icon: Ban, text: "100% Ad-Free Experience" },
  { icon: Zap, text: "Priority Tool Loading Speed" },
  { icon: Shield, text: "No Data Tracking / Full Privacy" },
  { icon: Sparkles, text: "Early Access to New Tools" },
  { icon: Star, text: "Premium Badge in Community" },
];

const PLANS = [
  {
    id: "monthly",
    name: "Monthly",
    price: "$4.99",
    period: "/month",
    badge: null,
    highlight: false,
  },
  {
    id: "yearly",
    name: "Yearly",
    price: "$2.99",
    period: "/month",
    badge: "Save 40%",
    highlight: true,
  },
  {
    id: "lifetime",
    name: "Lifetime",
    price: "$29",
    period: " one-time",
    badge: "Best Value",
    highlight: false,
  },
];

interface PremiumModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PremiumModal({ open, onOpenChange }: PremiumModalProps) {
  const { isPremium, activatePremium, deactivatePremium } = usePremium();
  const [selectedPlan, setSelectedPlan] = useState("yearly");

  function handleActivate() {
    activatePremium();
    onOpenChange(false);
  }

  function handleDeactivate() {
    deactivatePremium();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border-0 bg-gradient-to-br from-background via-background to-primary/5 p-0 shadow-2xl overflow-hidden">
        {/* Glassmorphism top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-primary to-cyan-500" />

        <div className="p-6 pb-8">
          <DialogHeader className="mb-6">
            <div className="flex items-center justify-center mb-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl scale-150" />
                <div className="relative rounded-full bg-gradient-to-br from-violet-500 to-primary p-3">
                  <Crown className="h-7 w-7 text-white" />
                </div>
              </div>
            </div>
            <DialogTitle className="text-center text-2xl font-bold tracking-tight">
              {isPremium ? "Premium Active 👑" : "Upgrade to Premium"}
            </DialogTitle>
            <DialogDescription className="text-center text-sm">
              {isPremium
                ? "You're enjoying an ad-free, full-speed Toolzium experience."
                : "Support Toolzium and unlock a cleaner, faster experience for everyone."}
            </DialogDescription>
          </DialogHeader>

          {!isPremium ? (
            <>
              {/* Feature checklist */}
              <div className="mb-6 rounded-xl border bg-card/50 p-4 backdrop-blur-sm">
                <ul className="space-y-2.5">
                  {PREMIUM_FEATURES.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-3 text-sm">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Icon className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className="text-foreground">{text}</span>
                      <Check className="ml-auto h-4 w-4 shrink-0 text-primary" />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Plan selector */}
              <div className="mb-6 grid grid-cols-3 gap-2">
                {PLANS.map((plan) => (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative rounded-xl border p-3 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      selectedPlan === plan.id
                        ? "border-primary bg-primary/10 shadow-sm shadow-primary/20"
                        : "border-border bg-card hover:border-primary/50 hover:bg-card/80"
                    }`}
                  >
                    {plan.badge && (
                      <Badge
                        className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] px-1.5 py-0 bg-primary text-primary-foreground"
                      >
                        {plan.badge}
                      </Badge>
                    )}
                    <div className="mt-1 text-[11px] font-medium text-muted-foreground">
                      {plan.name}
                    </div>
                    <div className="text-lg font-bold text-foreground">
                      {plan.price}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {plan.period}
                    </div>
                  </button>
                ))}
              </div>

              {/* CTA */}
              <Button
                className="w-full h-11 gap-2 bg-gradient-to-r from-violet-500 to-primary hover:opacity-90 transition-opacity font-semibold"
                onClick={handleActivate}
              >
                <Crown className="h-4 w-4" />
                Activate Premium
                <ArrowRight className="h-4 w-4" />
              </Button>

              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                🔒 Demo mode — activation is stored locally, no payment required.
                <br />
                Real payment integration coming soon.
              </p>
            </>
          ) : (
            <>
              {/* Already premium state */}
              <div className="mb-6 rounded-xl border border-primary/30 bg-primary/5 p-5 text-center">
                <div className="text-4xl mb-2">👑</div>
                <p className="font-semibold text-primary mb-1">Thank you for supporting Toolzium!</p>
                <p className="text-sm text-muted-foreground">
                  You have an ad-free, full-speed experience across all {" "}
                  <span className="font-medium">540+ tools</span>.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-10" onClick={() => onOpenChange(false)}>
                  Continue Using
                </Button>
                <Button
                  variant="ghost"
                  className="h-10 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  onClick={handleDeactivate}
                >
                  Deactivate
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
