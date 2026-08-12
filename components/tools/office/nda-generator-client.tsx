"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Lock, FileText, AlertTriangle } from"lucide-react";
import { cn } from"@/lib/utils";
import toast from"react-hot-toast";

export function NdaGeneratorClient() {
 const [type, setType] = useState("Unilateral");
 const [disclosingParty, setDisclosingParty] = useState("");
 const [receivingParty, setReceivingParty] = useState("");
 const [state, setState] = useState("");
 const [effectiveDate, setEffectiveDate] = useState("");
 const [duration, setDuration] = useState("1 year");
 const [purpose, setPurpose] = useState("");

 const reset = () => {
 setType("Unilateral");
 setDisclosingParty("");
 setReceivingParty("");
 setState("");
 setEffectiveDate("");
 setDuration("1 year");
 setPurpose("");
 };

 const ndaText ="NON-DISCLOSURE AGREEMENT\n\n"+
"This"+ type +"Non-Disclosure Agreement (the 'Agreement') is entered into as of"+ effectiveDate +"(the 'Effective Date') by and between"+ disclosingParty +"('Disclosing Party') and"+ receivingParty +"('Receiving Party').\n\n"+
"1. PURPOSE\nThe parties wish to explore a potential business relationship in connection with"+ purpose +"(the 'Purpose').\n\n"+
"2. CONFIDENTIAL INFORMATION\n'Confidential Information' means any information disclosed by either party that is designated as confidential.\n\n"+
"3. TERM\nThis Agreement will remain in effect for"+ duration +".\n\n"+
"4. GOVERNING LAW\nThis Agreement shall be governed by the laws of"+ state +".\n\n"+
"Signatures:\n\n_______________________\nDisclosing Party\n\n_______________________\nReceiving Party";

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Lock}
 title="NDA Generator"
 description="Generate standard Non-Disclosure Agreements instantly."
 actions={<ResetButton onClick={reset} label="Reset"/>}
 />

 <div className={"grid gap-6 md:grid-cols-2"}>
 <GlassCard>
 <CardHeader>
 <CardTitle>Agreement Details</CardTitle>
 <CardDescription>Enter the NDA particulars.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Agreement Type</Label>
 <Select value={type} onValueChange={setType}>
 <SelectTrigger>
 <SelectValue placeholder="Select type"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="Unilateral">Unilateral (1-way)</SelectItem>
 <SelectItem value="Mutual">Mutual (2-way)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 
 <div className="space-y-2">
 <Label>Disclosing Party</Label>
 <Input value={disclosingParty} onChange={(e) => setDisclosingParty(e.target.value)} placeholder="Name or Company"/>
 </div>

 <div className="space-y-2">
 <Label>Receiving Party</Label>
 <Input value={receivingParty} onChange={(e) => setReceivingParty(e.target.value)} placeholder="Name or Company"/>
 </div>

 <div className="space-y-2">
 <Label>Jurisdiction (State)</Label>
 <Input value={state} onChange={(e) => setState(e.target.value)} placeholder="e.g. California"/>
 </div>

 <div className="space-y-2">
 <Label>Effective Date</Label>
 <Input type="date"value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} />
 </div>

 <div className="space-y-2">
 <Label>Duration</Label>
 <Select value={duration} onValueChange={setDuration}>
 <SelectTrigger>
 <SelectValue placeholder="Select duration"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="1 year">1 Year</SelectItem>
 <SelectItem value="2 years">2 Years</SelectItem>
 <SelectItem value="3 years">3 Years</SelectItem>
 <SelectItem value="5 years">5 Years</SelectItem>
 <SelectItem value="Perpetual">Perpetual</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2">
 <Label>Purpose</Label>
 <Input value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="e.g. Business Discussions"/>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <FileText className="h-5 w-5"/>
 Preview & Export
 </CardTitle>
 <CardDescription>Review your NDA and copy text.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className={"bg-yellow-500/10 text-yellow-600 p-3 rounded-md flex items-start gap-2 text-sm"}>
 <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0"/>
 <p>Disclaimer: This tool generates a generic template and does not constitute legal advice. Please consult an attorney.</p>
 </div>
 <div className={"whitespace-pre-wrap p-4 bg-muted rounded-md text-sm font-mono h-64 overflow-y-auto"}>
 {ndaText}
 </div>
 <CopyButton getText={() => ndaText} label="Copy NDA Text"/>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 );
}
