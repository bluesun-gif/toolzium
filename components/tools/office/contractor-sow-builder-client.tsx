"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { FileText, ShieldCheck, Copy, Printer, Plus, Trash } from "lucide-react";
import toast from "react-hot-toast";

interface Deliverable {
  id: string;
  description: string;
  dueDate: string;
  payment: string;
}

export function ContractorSowBuilderClient() {
  const [clientCompany, setClientCompany] = useState("");
  const [contractorName, setContractorName] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [scopeSummary, setScopeSummary] = useState("");
  const [changeOrderTerms, setChangeOrderTerms] = useState("Any changes to the scope of work will require a written change order signed by both parties.");
  const [governingLaw, setGoverningLaw] = useState("");
  const [deliverables, setDeliverables] = useState<Deliverable[]>([
    { id: "1", description: "", dueDate: "", payment: "" },
  ]);

  const addDeliverable = () => {
    setDeliverables([...deliverables, { id: Date.now().toString(), description: "", dueDate: "", payment: "" }]);
  };

  const updateDeliverable = (id: string, field: keyof Deliverable, value: string) => {
    setDeliverables(
      deliverables.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );
  };

  const removeDeliverable = (id: string) => {
    if (deliverables.length > 1) {
      setDeliverables(deliverables.filter((d) => d.id !== id));
    }
  };

  const getDocumentText = () => {
    let text = "STATEMENT OF WORK (SOW)\n\n";
    text += "PROJECT TITLE: " + (projectTitle || "[Project Title]") + "\n";
    text += "CLIENT: " + (clientCompany || "[Client Company]") + "\n";
    text += "CONTRACTOR: " + (contractorName || "[Contractor Name]") + "\n\n";
    text += "1. SCOPE OF WORK\n";
    text += (scopeSummary || "[Scope Summary goes here]") + "\n\n";
    text += "2. DELIVERABLES & MILESTONES\n";
    
    deliverables.forEach((d, index) => {
      text += "Milestone " + (index + 1) + ":\n";
      text += "- Description: " + (d.description || "[Description]") + "\n";
      text += "- Due Date: " + (d.dueDate || "[Date]") + "\n";
      text += "- Payment: " + (d.payment || "[$0]") + "\n\n";
    });
    
    text += "3. CHANGE ORDERS\n";
    text += changeOrderTerms + "\n\n";
    
    text += "4. GOVERNING LAW\n";
    text += "This Agreement shall be governed by the laws of " + (governingLaw || "[Jurisdiction]") + ".\n\n";
    
    text += "SIGNATURES\n\n";
    text += "Client Signature: ______________________ Date: _________\n\n";
    text += "Contractor Signature: __________________ Date: _________\n";
    
    return text;
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      const formattedText = getDocumentText().replace(/\n/g, "<br>");
      printWindow.document.write("<html><head><title>Print SOW</title>");
      printWindow.document.write("<style>body{font-family:serif;padding:40px;line-height:1.6;}</style>");
      printWindow.document.write("</head><body>");
      printWindow.document.write(formattedText);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    } else {
      toast.error("Popup blocked. Cannot print.");
    }
  };

  const resetForm = () => {
    setClientCompany("");
    setContractorName("");
    setProjectTitle("");
    setScopeSummary("");
    setChangeOrderTerms("Any changes to the scope of work will require a written change order signed by both parties.");
    setGoverningLaw("");
    setDeliverables([{ id: "1", description: "", dueDate: "", payment: "" }]);
    toast.success("Form reset");
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={FileText}
        title="Contractor SOW Builder"
        description="Generate formal Statement of Work documents for freelance and independent contractor projects."
        actions={
          <div className="flex gap-2">
            <CopyButton getText={getDocumentText} label="Copy SOW" />
            <ActionButton onClick={handlePrint} icon={Printer} label="Print" />
            <ResetButton onClick={resetForm} label="Reset" />
          </div>
        }
      />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Project Title</Label>
                <Input
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g., Website Redesign"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Client Company</Label>
                  <Input
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    placeholder="Company LLC"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Contractor Name</Label>
                  <Input
                    value={contractorName}
                    onChange={(e) => setContractorName(e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Scope Summary</Label>
                <textarea
                  className="w-full flex min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={scopeSummary}
                  onChange={(e) => setScopeSummary(e.target.value)}
                  placeholder="Describe the main objectives and scope..."
                />
              </div>
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Deliverables & Milestones</CardTitle>
              <Button size="sm" variant="outline" onClick={addDeliverable}>
                <Plus className="w-4 h-4 mr-2" /> Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {deliverables.map((d, index) => (
                <div key={d.id} className="p-4 border rounded-md relative space-y-3">
                  <h4 className={"text-sm font-semibold"}>Milestone " + (index + 1) + "</h4>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input
                      value={d.description}
                      onChange={(e) => updateDeliverable(d.id, "description", e.target.value)}
                      placeholder="e.g., Wireframes delivery"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Due Date</Label>
                      <Input
                        type="date"
                        value={d.dueDate}
                        onChange={(e) => updateDeliverable(d.id, "dueDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Payment Amount</Label>
                      <Input
                        value={d.payment}
                        onChange={(e) => updateDeliverable(d.id, "payment", e.target.value)}
                        placeholder="e.g., $1,000"
                      />
                    </div>
                  </div>
                  {deliverables.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-destructive"
                      onClick={() => removeDeliverable(d.id)}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader>
              <CardTitle>Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Change Order Terms</Label>
                <textarea
                  className="w-full flex min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={changeOrderTerms}
                  onChange={(e) => setChangeOrderTerms(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Governing Law (Jurisdiction)</Label>
                <Input
                  value={governingLaw}
                  onChange={(e) => setGoverningLaw(e.target.value)}
                  placeholder="e.g., State of California, USA"
                />
              </div>
            </CardContent>
          </GlassCard>
        </div>

        <div>
          <GlassCard className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" /> Document Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-muted/30 rounded-md border text-sm font-mono whitespace-pre-wrap">
                {getDocumentText()}
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
