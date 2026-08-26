"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, CheckCircle2, Flag, Loader2 } from "lucide-react";

interface ReportButtonProps {
  entity: string;
  type: "phone" | "ip" | "domain" | "username" | "general";
  buttonText?: string;
  className?: string;
  variant?: "outline" | "default" | "destructive" | "secondary" | "ghost";
}

export function ReportButton({
  entity,
  type,
  buttonText = "Report Activity",
  className = "",
  variant = "outline",
}: ReportButtonProps) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("Robocall / Scam");
  const [note, setNote] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Bot honeypot field
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent discard for bots
    if (!note.trim()) {
      setError("Please include a brief description of the suspicious activity.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entity,
          type,
          category,
          note,
          hp_field: honeypot,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit report. Please try again.");
      }

      setSuccess(true);
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
        setNote("");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size="sm"
          className={`rounded-xl text-xs font-semibold gap-1.5 ${className}`}
        >
          <Flag className="h-3.5 w-3.5" />
          <span>{buttonText}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <span>Report Suspicious Activity</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Help the Toolzium community stay safe. Reports for <strong>{entity}</strong> are anonymous and aggregated into real-time risk scores.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-2">
            <CheckCircle2 className="h-10 w-10 text-emerald-500 animate-bounce" />
            <h4 className="font-bold text-foreground">Report Submitted</h4>
            <p className="text-xs text-muted-foreground max-w-xs">
              Thank you for contributing to the community security database.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            {/* Honeypot field for bot protection */}
            <input
              type="text"
              name="company_tax_id"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Incident Type</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="rounded-xl h-10 text-xs">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="Robocall / Scam">Robocall / IRS / Bank Scam</SelectItem>
                  <SelectItem value="Telemarketer / Spam">Unsolicited Telemarketing / Spam</SelectItem>
                  <SelectItem value="Phishing / Malicious Link">Phishing SMS / Malicious Link</SelectItem>
                  <SelectItem value="Impersonation / Fake ID">Identity Theft / Impersonation</SelectItem>
                  <SelectItem value="Silent / Dropped Call">Silent / Ping / Dropped Call</SelectItem>
                  <SelectItem value="Other Suspicious Activity">Other Suspicious Activity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Details & Notes</Label>
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Describe what the caller said, voicemail transcript, or scam pattern..."
                className="rounded-xl text-xs min-h-[90px] resize-none"
                maxLength={500}
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Do not include personal sensitive data (SSN, credit card).</span>
                <span>{note.length}/500</span>
              </div>
            </div>

            {error && (
              <p className="text-xs text-destructive bg-destructive/10 p-2 rounded-lg">
                {error}
              </p>
            )}

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setOpen(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={loading}
                className="rounded-xl font-bold gap-2"
              >
                {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Submit Report
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ReportButton;
