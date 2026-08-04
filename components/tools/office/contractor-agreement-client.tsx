"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { FileText, ShieldCheck, Printer, Copy } from "lucide-react";
import { toast } from "react-hot-toast";

export function ContractorAgreementClient() {
  const [clientName, setClientName] = useState("");
  const [contractorName, setContractorName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [feeType, setFeeType] = useState("hourly");
  const [feeAmount, setFeeAmount] = useState("");
  const [scope, setScope] = useState("");
  const [ipRights, setIpRights] = useState("client");
  const [nonCompete, setNonCompete] = useState(false);

  const generateAgreement = () => {
    return [
      "INDEPENDENT CONTRACTOR AGREEMENT",
      "==================================",
      "",
      "This Independent Contractor Agreement (the \"Agreement\") is made and entered into as of " + (startDate || "[Start Date]") + ", by and between:",
      "",
      "Client: " + (clientName || "[Client Name]"),
      "Contractor: " + (contractorName || "[Contractor Name]"),
      "",
      "1. SCOPE OF WORK",
      "The Contractor agrees to perform the following services for the Client:",
      (scope || "[Insert scope of work details here]"),
      "",
      "2. TERM",
      "This Agreement will commence on " + (startDate || "[Start Date]") + " and will end on " + (endDate || "[End Date]") + " unless terminated earlier by mutual agreement.",
      "",
      "3. COMPENSATION",
      "The Client will pay the Contractor " + (feeType === "hourly" ? "an hourly rate of " : "a flat project fee of ") + (feeAmount ? "$" + feeAmount : "[$Amount]") + " for the services rendered.",
      "",
      "4. INDEPENDENT CONTRACTOR STATUS",
      "The Contractor is an independent contractor, not an employee of the Client. The Contractor is responsible for all taxes and benefits.",
      "",
      "5. INTELLECTUAL PROPERTY",
      ipRights === "client" 
        ? "All work product created by the Contractor under this Agreement will be the exclusive property of the Client (Work for Hire)."
        : "The Contractor retains all intellectual property rights to the work product, and grants the Client a non-exclusive license to use it.",
      "",
      nonCompete ? "6. NON-COMPETE / NON-SOLICITATION\nDuring the term of this Agreement and for 12 months thereafter, the Contractor shall not directly or indirectly compete with the Client's business or solicit its employees.\n" : "",
      nonCompete ? "7. ENTIRE AGREEMENT" : "6. ENTIRE AGREEMENT",
      "This Agreement contains the entire agreement between the parties.",
      "",
      "IN WITNESS WHEREOF, the parties have executed this Agreement.",
      "",
      "Client Signature: _______________________ Date: ____________",
      "",
      "Contractor Signature: ___________________ Date: ____________"
    ].join("\n");
  };

  const agreementText = generateAgreement();

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write("<html><head><title>Print Agreement</title></head><body><pre style='white-space: pre-wrap; font-family: sans-serif;'>" + agreementText + "</pre></body></html>");
      printWindow.document.close();
      printWindow.print();
    }
  };

  const resetForm = () => {
    setClientName("");
    setContractorName("");
    setStartDate("");
    setEndDate("");
    setFeeType("hourly");
    setFeeAmount("");
    setScope("");
    setIpRights("client");
    setNonCompete(false);
    toast.success("Form reset");
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader 
        icon={FileText}
        title="Contractor Agreement Builder"
        description="Generate formal Independent Contractor & Freelance Agreements."
        actions={
          <div className="flex gap-2">
            <ActionButton onClick={handlePrint} icon={Printer} label="Print" variant="outline" />
            <ResetButton onClick={resetForm} label="Reset" />
          </div>
        }
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Agreement Details</CardTitle>
            <CardDescription>Enter the details for the contract</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Client Company Name</Label>
              <Input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Acme Corp" />
            </div>
            <div className="space-y-2">
              <Label>Contractor Name</Label>
              <Input value={contractorName} onChange={(e) => setContractorName(e.target.value)} placeholder="John Doe" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>End Date / Project Completion</Label>
                <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fee Type</Label>
                <Select value={feeType} onValueChange={setFeeType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly Rate</SelectItem>
                    <SelectItem value="flat">Flat Project Fee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Amount ($)</Label>
                <Input type="number" value={feeAmount} onChange={(e) => setFeeAmount(e.target.value)} placeholder="100" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Scope of Work Details</Label>
              <Input value={scope} onChange={(e) => setScope(e.target.value)} placeholder="Develop a responsive website..." />
            </div>

            <div className="space-y-2">
              <Label>IP Ownership Rights</Label>
              <Select value={ipRights} onValueChange={setIpRights}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">Client owns all work (Work for Hire)</SelectItem>
                  <SelectItem value="contractor">Contractor retains IP (License given)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-md mt-4">
              <div className="space-y-0.5">
                <Label>Non-Compete / Non-Solicitation</Label>
                <p className="text-sm text-muted-foreground">Add a 12-month restriction clause</p>
              </div>
              <Switch checked={nonCompete} onCheckedChange={setNonCompete} />
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Document Preview</CardTitle>
                <CardDescription>Review the agreement text below</CardDescription>
              </div>
              <CopyButton getText={() => agreementText} label="Copy text" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-md h-[550px] overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans text-sm">{agreementText}</pre>
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
