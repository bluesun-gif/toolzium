"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck, RefreshCw, KeyRound, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function SecretAdminTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret Hotkey Trigger: Ctrl + Shift + A  OR  Cmd + Shift + A
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;

    setIsVerifying(true);
    try {
      const res = await fetch("/api/admin/verify-passcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      const data = await res.json();
      if (data.ok) {
        localStorage.setItem("toolzium_admin_authenticated", "true");
        toast.success("Owner Verified! Accessing Secret Control Panel...");
        setIsOpen(false);
        setPasscode("");
        router.push("/admin");
      } else {
        toast.error("Access Denied: Incorrect Master Passcode");
      }
    } catch {
      toast.error("Authentication failed");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm bg-card border border-primary/30 rounded-2xl p-5 shadow-2xl space-y-4">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-foreground p-1 rounded-lg"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 text-primary font-bold text-sm">
          <ShieldCheck className="h-5 w-5" />
          <span>Secret Owner Portal Authentication</span>
        </div>

        <p className="text-xs text-muted-foreground">
          Enter your Master Passcode to open the Admin Control Panel.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Master Passcode..."
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              autoFocus
              className="pl-9 text-xs h-10 rounded-xl bg-muted/20"
            />
          </div>

          <Button
            type="submit"
            disabled={isVerifying || !passcode.trim()}
            className="w-full h-10 gap-2 font-semibold text-xs shadow-md rounded-xl"
          >
            {isVerifying ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <span>Unlock Admin Panel</span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
