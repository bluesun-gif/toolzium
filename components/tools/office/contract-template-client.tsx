"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { FileText, AlertTriangle } from "lucide-react";

export function ContractTemplateClient() {
  const [contractType, setContractType] = useState("nda");
  const [partyA, setPartyA] = useState("");
  const [partyB, setPartyB] = useState("");
  const [date, setDate] = useState("");
  const [extraTerms, setExtraTerms] = useState("");

  const generateContract = () => {
    let title = "Non-Disclosure Agreement";
    if (contractType === "service") title = "Service Agreement";
    if (contractType === "freelance") title = "Freelance Contract";
    if (contractType === "rental") title = "Rental Agreement";
    if (contractType === "employment") title = "Employment Agreement";

    const pA = partyA || "[Party A Name]";
    const pB = partyB || "[Party B Name]";
    const d = date || "[Date]";

    return title + "\n\n" +
      "This agreement is made on " + d + " between " + pA + " and " + pB + ".\n\n" +
      "1. Terms and Conditions\n" +
      "The parties agree to the terms specified herein for the " + title + ".\n\n" +
      "2. Obligations\n" +
      pA + " and " + pB + " shall adhere to all obligations outlined.\n\n" +
      "3. Additional Terms\n" +
      (extraTerms || "None specified.") + "\n\n" +
      "Signatures:\n\n" +
      "____________________\n" + pA + "\n\n" +
      "____________________\n" + pB + "\n";
  };

  const handleReset = () => {
    setContractType("nda");
    setPartyA("");
    setPartyB("");
    setDate("");
    setExtraTerms("");
  };

  return (
    <div className={"space-y-6"}>
      <ToolPageHeader
        icon={FileText}
        title="Contract Template Generator"
        description="Generate basic contract templates. Not legal advice."
        actions={<ResetButton onClick={handleReset} label="Reset All" />}
      />

      <div className={"grid gap-6 md:grid-cols-2"}>
        <GlassCard>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className={"space-y-4"}>
            <div className={"space-y-2"}>
              <Label>Contract Type</Label>
              <Select value={contractType} onValueChange={setContractType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nda">Non-Disclosure Agreement</SelectItem>
                  <SelectItem value="service">Service Agreement</SelectItem>
                  <SelectItem value="freelance">Freelance Contract</SelectItem>
                  <SelectItem value="rental">Rental Agreement</SelectItem>
                  <SelectItem value="employment">Employment Agreement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className={"space-y-2"}>
              <Label>Party A</Label>
              <Input value={partyA} onChange={(e) => setPartyA(e.target.value)} placeholder="Company / Person A" />
            </div>
            <div className={"space-y-2"}>
              <Label>Party B</Label>
              <Input value={partyB} onChange={(e) => setPartyB(e.target.value)} placeholder="Company / Person B" />
            </div>
            <div className={"space-y-2"}>
              <Label>Date</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className={"space-y-2"}>
              <Label>Extra Terms</Label>
              <Input value={extraTerms} onChange={(e) => setExtraTerms(e.target.value)} placeholder="Additional terms..." />
            </div>
            
            <div className={"p-4 bg-yellow-500/10 text-yellow-600 rounded-md flex items-center gap-2 mt-4"}>
              <AlertTriangle className={"w-5 h-5"} />
              <p className={"text-sm"}>Disclaimer: This is not legal advice. Please consult a lawyer before signing any contract.</p>
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader className={"flex flex-row items-center justify-between"}>
            <CardTitle>Generated Contract</CardTitle>
            <CopyButton getText={generateContract} label="Copy" />
          </CardHeader>
          <Separator />
          <CardContent className={"pt-4"}>
            <pre className={"whitespace-pre-wrap font-sans text-sm p-4 bg-muted/50 rounded-md min-h-[400px]"}>
              {generateContract()}
            </pre>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
