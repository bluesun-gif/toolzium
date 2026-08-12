"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Truck, Plus, Copy, FileText } from"lucide-react";
import { toast } from"react-hot-toast";

interface HandlingUnit {
 qty: string;
 pkgType: string;
 weight: string;
 hm: boolean;
 desc: string;
}

export function BolGeneratorClient() {
 const [bolNumber, setBolNumber] = useState("");
 const [date, setDate] = useState("");
 const [shipper, setShipper] = useState("");
 const [consignee, setConsignee] = useState("");
 const [billTo, setBillTo] = useState("");
 const [carrier, setCarrier] = useState("");
 const [trailer, setTrailer] = useState("");
 const [seal, setSeal] = useState("");
 const [nmfc, setNmfc] = useState("");
 
 const [units, setUnits] = useState<HandlingUnit[]>([{ qty:"", pkgType:"", weight:"", hm: false, desc:""}]);

 const handleAddUnit = () => {
 setUnits([...units, { qty:"", pkgType:"", weight:"", hm: false, desc:""}]);
 };

 const handleUnitChange = (index: number, field: keyof HandlingUnit, value: any) => {
 const newUnits = [...units];
 newUnits[index] = { ...newUnits[index], [field]: value };
 setUnits(newUnits);
 };

 const getBolText = () => {
 return"BILL OF LADING\n"+
"BOL Number:"+ bolNumber +"\n"+
"Date:"+ date +"\n\n"+
"SHIPPER:\n"+ shipper +"\n\n"+
"CONSIGNEE:\n"+ consignee +"\n\n"+
"BILL TO:\n"+ billTo +"\n\n"+
"CARRIER INFO:\n"+
"Carrier:"+ carrier +"\n"+
"Trailer #:"+ trailer +"\n"+
"Seal #:"+ seal +"\n"+
"NMFC:"+ nmfc +"\n\n"+
"HANDLING UNITS:\n"+
 units.map(u =>"Qty:"+ u.qty +", Type:"+ u.pkgType +", Weight:"+ u.weight +", HM:"+ (u.hm ?"Yes":"No") +", Desc:"+ u.desc).join("\n");
 };

 const handleReset = () => {
 setBolNumber("");
 setDate("");
 setShipper("");
 setConsignee("");
 setBillTo("");
 setCarrier("");
 setTrailer("");
 setSeal("");
 setNmfc("");
 setUnits([{ qty:"", pkgType:"", weight:"", hm: false, desc:""}]);
 toast.success("Reset successful");
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Truck}
 title="Bill of Lading Generator"
 description="Generate official Bill of Lading (BOL) logistics shipping documents."
 actions={
 <>
 <CopyButton getText={getBolText} label="Copy BOL"/>
 <ResetButton onClick={handleReset} label="Reset"/>
 </>
 }
 />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Shipment Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>BOL Number</Label>
 <Input value={bolNumber} onChange={e => setBolNumber(e.target.value)} placeholder="e.g. BOL123456"/>
 </div>
 <div className="space-y-2">
 <Label>Date</Label>
 <Input type="date"value={date} onChange={e => setDate(e.target.value)} />
 </div>
 </div>
 
 <div className="space-y-2">
 <Label>Shipper Name & Address</Label>
 <Input value={shipper} onChange={e => setShipper(e.target.value)} placeholder="Shipper info..."/>
 </div>
 <div className="space-y-2">
 <Label>Consignee / Deliver-To</Label>
 <Input value={consignee} onChange={e => setConsignee(e.target.value)} placeholder="Consignee info..."/>
 </div>
 <div className="space-y-2">
 <Label>Third-Party Freight Charge Bill-To</Label>
 <Input value={billTo} onChange={e => setBillTo(e.target.value)} placeholder="Bill-To info..."/>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Carrier Information</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Carrier Name</Label>
 <Input value={carrier} onChange={e => setCarrier(e.target.value)} placeholder="Carrier name..."/>
 </div>
 <div className="space-y-2">
 <Label>Trailer #</Label>
 <Input value={trailer} onChange={e => setTrailer(e.target.value)} placeholder="Trailer number"/>
 </div>
 <div className="space-y-2">
 <Label>Seal #</Label>
 <Input value={seal} onChange={e => setSeal(e.target.value)} placeholder="Seal number"/>
 </div>
 <div className="space-y-2">
 <Label>NMFC Freight Class</Label>
 <Input value={nmfc} onChange={e => setNmfc(e.target.value)} placeholder="e.g. 50, 70"/>
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <GlassCard>
 <CardHeader>
 <CardTitle>Itemized Handling Units</CardTitle>
 <CardDescription>Enter details of the items being shipped.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 {units.map((unit, i) => (
 <div key={i} className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-end">
 <div className="space-y-2">
 <Label>Qty</Label>
 <Input value={unit.qty} onChange={e => handleUnitChange(i, 'qty', e.target.value)} placeholder="e.g. 2"/>
 </div>
 <div className="space-y-2">
 <Label>Pkg Type</Label>
 <Input value={unit.pkgType} onChange={e => handleUnitChange(i, 'pkgType', e.target.value)} placeholder="e.g. Pallet"/>
 </div>
 <div className="space-y-2">
 <Label>Weight</Label>
 <Input value={unit.weight} onChange={e => handleUnitChange(i, 'weight', e.target.value)} placeholder="e.g. 500 lbs"/>
 </div>
 <div className="space-y-2">
 <Label>Commodity Description</Label>
 <Input value={unit.desc} onChange={e => handleUnitChange(i, 'desc', e.target.value)} placeholder="Description"/>
 </div>
 <div className="space-y-2 flex items-center h-10">
 <Label className="flex items-center gap-2 cursor-pointer">
 <input type="checkbox"checked={unit.hm} onChange={e => handleUnitChange(i, 'hm', e.target.checked)} className="h-4 w-4"/>
 H.M.
 </Label>
 </div>
 </div>
 ))}
 <Button variant="outline"onClick={handleAddUnit} className="w-full mt-4">
 <Plus className="w-4 h-4 mr-2"/> Add Handling Unit
 </Button>
 </CardContent>
 </GlassCard>
 
 <GlassCard>
 <CardHeader>
 <CardTitle>Print-ready Preview</CardTitle>
 </CardHeader>
 <CardContent>
 <pre className="whitespace-pre-wrap bg-muted p-4 rounded-md text-sm">
 {getBolText()}
 </pre>
 </CardContent>
 </GlassCard>
 </div>
 );
}
