"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Globe, FileText, Plus, Trash2, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { toast } from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

type DnsRecord = { id: string; type: string; name: string; value: string; ttl: string; priority?: string };

export function DnsGeneratorClient() {
 const [domain, setDomain] = useState("example.com");
 const [records, setRecords] = useState<DnsRecord[]>([]);

 const generateId = () => Math.random().toString(36).substr(2, 9);

 const addRecord = (type: string) => {
 setRecords([...records, { id: generateId(), type, name:"@", value:"", ttl:"3600", priority: type === 'MX' ?"10": undefined }]);
 };

 const removeRecord = (id: string) => {
 setRecords(records.filter(r => r.id !== id));
 };

 const updateRecord = (id: string, field: keyof DnsRecord, value: string) => {
 setRecords(records.map(r => r.id === id ? { ...r, [field]: value } : r));
 };

 const applyPreset = (preset: string) => {
 if (preset === 'email') {
 setRecords([
 { id: generateId(), type: 'MX', name: '@', value: 'mail.example.com', priority: '10', ttl: '3600' },
 { id: generateId(), type: 'TXT', name: '@', value: 'v=spf1 mx a ~all', ttl: '3600' },
 { id: generateId(), type: 'TXT', name: '_dmarc', value: 'v=DMARC1; p=none;', ttl: '3600' }
 ]);
 toast.success("Applied Email preset");
 } else if (preset === 'website') {
 setRecords([
 { id: generateId(), type: 'A', name: '@', value: '192.0.2.1', ttl: '3600' },
 { id: generateId(), type: 'CNAME', name: 'www', value: '@', ttl: '3600' }
 ]);
 toast.success("Applied Website preset");
 }
 };

 const getZoneFile = () => {
 let out = `$ORIGIN ${domain || 'example.com'}.\n$TTL 3600\n\n`;
 records.forEach(r => {
 if (r.type === 'MX') {
 out += `${r.name.padEnd(10)}\tIN\t${r.type}\t${r.priority || '10'}\t${r.value}\n`;
 } else {
 out += `${r.name.padEnd(10)}\tIN\t${r.type}\t\t${r.value}\n`;
 }
 });
 return out;
 };

 const handleReset = () => {
 setRecords([]);
 setDomain("example.com");
 toast.success("Reset generator");
 };

 return (
 <div className="space-y-6">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={Globe}
 title="DNS Record Generator"
 description="Generate DNS records and export as BIND zone file."
 actions={
 <>
 <CopyButton getText={getZoneFile} label="Copy Zone File"/>
 <ResetButton onClick={handleReset} label="Reset"/>
 </>
 }
 />
 
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Record Configuration</CardTitle>
 <CardDescription>Build your DNS records</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-2">
 <Label>Domain Name</Label>
 <Input value={domain} onChange={e => setDomain(e.target.value)} placeholder="example.com"/>
 </div>
 
 <div className="flex gap-2 flex-wrap">
 <Button variant="outline"size="sm"onClick={() => applyPreset('website')}>+ Website Preset (A, CNAME)</Button>
 <Button variant="outline"size="sm"onClick={() => applyPreset('email')}>+ Email Preset (MX, TXT)</Button>
 </div>

 <Separator />
 
 <div className="space-y-4">
 <div className="flex items-center justify-between">
 <Label>Records</Label>
 <div className="flex gap-2 flex-wrap">
 <Button variant="secondary"size="sm"onClick={() => addRecord('A')}><Plus className="h-4 w-4 mr-1"/> A</Button>
 <Button variant="secondary"size="sm"onClick={() => addRecord('CNAME')}><Plus className="h-4 w-4 mr-1"/> CNAME</Button>
 <Button variant="secondary"size="sm"onClick={() => addRecord('MX')}><Plus className="h-4 w-4 mr-1"/> MX</Button>
 <Button variant="secondary"size="sm"onClick={() => addRecord('TXT')}><Plus className="h-4 w-4 mr-1"/> TXT</Button>
 </div>
 </div>
 
 <div className="space-y-4">
 {records.map(record => (
 <div key={record.id} className="p-4 border rounded-md relative flex flex-col gap-3 bg-muted/30">
 <Button variant="ghost"size="icon"className="absolute top-2 right-2 h-6 w-6 text-destructive"onClick={() => removeRecord(record.id)}>
 <Trash2 className="h-4 w-4"/>
 </Button>
 <div className="flex items-center gap-2 font-semibold text-sm">
 <span className="bg-primary/10 text-primary px-2 py-1 rounded">{record.type}</span> Record
 </div>
 
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
 <div className="space-y-1">
 <Label className="text-xs">Name (Host)</Label>
 <Input value={record.name} onChange={e => updateRecord(record.id, 'name', e.target.value)} placeholder="@ or www"className="h-8"/>
 </div>
 <div className="space-y-1">
 <Label className="text-xs">Value (Target)</Label>
 <Input value={record.value} onChange={e => updateRecord(record.id, 'value', e.target.value)} placeholder="192.0.2.1"className="h-8"/>
 </div>
 {record.type === 'MX' && (
 <div className="space-y-1">
 <Label className="text-xs">Priority</Label>
 <Input type="number"value={record.priority} onChange={e => updateRecord(record.id, 'priority', e.target.value)} placeholder="10"className="h-8"/>
 </div>
 )}
 <div className="space-y-1">
 <Label className="text-xs">TTL</Label>
 <Input value={record.ttl} onChange={e => updateRecord(record.id, 'ttl', e.target.value)} placeholder="3600"className="h-8"/>
 </div>
 </div>
 </div>
 ))}
 {records.length === 0 && (
 <div className="text-center p-8 border border-dashed rounded-lg text-muted-foreground text-sm">
 No records added. Use presets or add manually.
 </div>
 )}
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5"/> Zone File Output</CardTitle>
 <CardDescription>Standard BIND format</CardDescription>
 </CardHeader>
 <CardContent>
 <pre className="p-4 rounded-lg bg-muted text-sm overflow-auto whitespace-pre-wrap font-mono min-h-[300px]">
 {records.length > 0 ? getZoneFile() :"; Add records to see output"}
 </pre>
 </CardContent>
 </GlassCard>
 </div>
 
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Input Your Data",
            description: "Enter your information in the input field above and configure any options.",
            icon: Sparkles,
          },
          {
            step: "02",
            title: "Process & Generate",
            description: "The tool processes your input instantly and displays the results.",
            icon: Zap,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy the output with one click and use it wherever you need.",
            icon: Copy,
          },
        ]}
        badges={["100% Free", "Instant Results", "Privacy-First"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: Sparkles,
            title: "Lightning Fast",
            description: "Get results in milliseconds with our optimized client-side processing engine.",
          },
          {
            icon: Shield,
            title: "Completely Private",
            description: "All processing happens in your browser. Your data never leaves your device.",
          },
          {
            icon: Zap,
            title: "No Signup Required",
            description: "Use this tool instantly without creating an account or providing any personal information.",
          },
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our DNS Record Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our DNS Record Generator provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "Is this tool free to use?",
            answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits.",
          },
          {
            question: "Is my data secure?",
            answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server.",
          },
          {
            question: "Do I need to create an account?",
            answer: "No account or registration is required. Simply open the tool and start using it immediately.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/network/dns-generator" max={6} />

</div>
 );
}
