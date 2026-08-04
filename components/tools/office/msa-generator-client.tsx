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
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { cn } from "@/lib/utils";
import { FileText, ShieldCheck, Printer } from "lucide-react";
import toast from "react-hot-toast";

export function MSAGeneratorClient() {
  const [providerName, setProviderName] = useState("");
  const [providerType, setProviderType] = useState("LLC");
  const [clientName, setClientName] = useState("");
  const [clientType, setClientType] = useState("LLC");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [servicesOverview, setServicesOverview] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("Net 30");
  const [liabilityCap, setLiabilityCap] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [msaText, setMsaText] = useState("");

  const handleGenerate = () => {
    if (!providerName || !clientName || !effectiveDate || !servicesOverview || !liabilityCap || !jurisdiction) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const text = "MASTER SERVICES AGREEMENT\n\n" +
      "This Master Services Agreement (\"Agreement\") is entered into as of " + effectiveDate + " (\"Effective Date\"), by and between " + providerName + ", a " + providerType + " (\"Provider\"), and " + clientName + ", a " + clientType + " (\"Client\").\n\n" +
      "1. SERVICES\nProvider agrees to provide the following services to Client: " + servicesOverview + ".\n\n" +
      "2. PAYMENT TERMS\nClient agrees to pay Provider within " + paymentTerms + " days of receipt of an invoice.\n\n" +
      "3. LIABILITY CAP\nIn no event shall Provider's aggregate liability under this Agreement exceed $" + liabilityCap + ".\n\n" +
      "4. GOVERNING LAW\nThis Agreement shall be governed by and construed in accordance with the laws of the State of " + jurisdiction + ".\n\n" +
      "IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the Effective Date.\n\n" +
      "PROVIDER: __________________\n" +
      "CLIENT: __________________";
    setMsaText(text);
    toast.success("MSA generated successfully!");
  };

  const handleReset = () => {
    setProviderName("");
    setProviderType("LLC");
    setClientName("");
    setClientType("LLC");
    setEffectiveDate("");
    setServicesOverview("");
    setPaymentTerms("Net 30");
    setLiabilityCap("");
    setJurisdiction("");
    setMsaText("");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={FileText}
        title="MSA Generator"
        description="Generate formal Master Services Agreements for corporate contracts & client retainers."
        actions={
          <>
            <ResetButton onClick={handleReset} label="Reset" />
          </>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Contract Details</CardTitle>
            <CardDescription>Enter the agreement information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Provider Name</Label>
                <Input value={providerName} onChange={(e) => setProviderName(e.target.value)} placeholder="e.g. Acme Corp" />
              </div>
              <div className="space-y-2">
                <Label>Provider Type</Label>
                <Select value={providerType} onValueChange={setProviderType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LLC">LLC</SelectItem>
                    <SelectItem value="Inc.">Inc.</SelectItem>
                    <SelectItem value="Corp.">Corp.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Client Name</Label>
                <Input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="e.g. Globex" />
              </div>
              <div className="space-y-2">
                <Label>Client Type</Label>
                <Select value={clientType} onValueChange={setClientType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LLC">LLC</SelectItem>
                    <SelectItem value="Inc.">Inc.</SelectItem>
                    <SelectItem value="Corp.">Corp.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Effective Date</Label>
              <Input type="date" value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Services Overview</Label>
              <Input value={servicesOverview} onChange={(e) => setServicesOverview(e.target.value)} placeholder="e.g. Software development" />
            </div>
            <div className="space-y-2">
              <Label>Payment Terms</Label>
              <Select value={paymentTerms} onValueChange={setPaymentTerms}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Net 15">Net 15</SelectItem>
                  <SelectItem value="Net 30">Net 30</SelectItem>
                  <SelectItem value="Net 60">Net 60</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Liability Cap ($)</Label>
                <Input type="number" value={liabilityCap} onChange={(e) => setLiabilityCap(e.target.value)} placeholder="e.g. 50000" />
              </div>
              <div className="space-y-2">
                <Label>Jurisdiction (State)</Label>
                <Input value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)} placeholder="e.g. California" />
              </div>
            </div>
            <Button className="w-full" onClick={handleGenerate}>
              <ShieldCheck className="mr-2 h-4 w-4" /> Generate MSA
            </Button>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle>Generated Document</CardTitle>
            <CardDescription>Review and copy your MSA</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {msaText ? (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-md whitespace-pre-wrap font-mono text-sm h-[400px] overflow-y-auto">
                  {msaText}
                </div>
                <div className="flex gap-2">
                  <CopyButton getText={() => msaText} label="Copy text" />
                  <ActionButton onClick={handlePrint} icon={Printer} label="Print" variant="outline" />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[400px] text-muted-foreground border-2 border-dashed rounded-md">
                Fill in the details to generate the MSA.
              </div>
            )}
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
