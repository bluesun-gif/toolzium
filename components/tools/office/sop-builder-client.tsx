"use client";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { cn } from"@/lib/utils";
import { FileText, ListOrdered, AlertTriangle, Download, Plus, Trash2, Sparkles, Shield, Zap, Copy } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

interface Step {
 id: string;
 description: string;
 responsible: string;
 warning?: string;
 substeps: string[];
}

export function SopBuilderClient() {
 const [title, setTitle] = useState("Standard Operating Procedure");
 const [department, setDepartment] = useState("");
 const [version, setVersion] = useState("1.0");
 const [effectiveDate, setEffectiveDate] = useState("");
 const [author, setAuthor] = useState("");
 const [purpose, setPurpose] = useState("");
 const [scope, setScope] = useState("");
 const [steps, setSteps] = useState<Step[]>([]);

 const templates = {
 empty: { title:"", dep:"", ver:"1.0", pur:"", scp:"", steps: [] },
 it: {
 title:"IT Employee Onboarding", dep:"IT", ver:"1.0", pur:"To ensure new employees receive necessary hardware and access.", scp:"All new hires.",
 steps: [{ id:"1", description:"Create user accounts", responsible:"IT Admin", substeps: ["Email account","Active Directory"] }]
 },
 safety: {
 title:"Fire Evacuation Procedure", dep:"Facilities", ver:"1.1", pur:"Safe evacuation during a fire alarm.", scp:"All building occupants.",
 steps: [{ id:"1", description:"Sound the alarm", responsible:"Anyone", warning:"Do not use elevators", substeps: ["Pull nearest fire alarm"] }]
 },
 equipment: {
 title:"Coffee Machine Maintenance", dep:"Office Management", ver:"2.0", pur:"Daily cleaning of the espresso machine.", scp:"Kitchen staff.",
 steps: [{ id:"1", description:"Empty drip tray", responsible:"Cleaner", substeps: ["Remove tray carefully","Wash with warm water"] }]
 }
 };

 const loadTemplate = (key: keyof typeof templates) => {
 const t = templates[key];
 setTitle(t.title);
 setDepartment(t.dep);
 setVersion(t.ver);
 setPurpose(t.pur);
 setScope(t.scp);
 setSteps(t.steps as Step[]);
 toast.success("Template loaded");
 };

 const addStep = () => {
 setSteps([...steps, { id: crypto.randomUUID(), description:"", responsible:"", substeps: [] }]);
 };

 const updateStep = (index: number, field: keyof Step, value: any) => {
 const newSteps = [...steps];
 newSteps[index] = { ...newSteps[index], [field]: value };
 setSteps(newSteps);
 };

 const removeStep = (index: number) => {
 setSteps(steps.filter((_, i) => i !== index));
 };

 const generateMarkdown = () => {
 return `# ${title ||"Standard Operating Procedure"}

**Department:** ${department ||"N/A"} | **Version:** ${version} | **Effective Date:** ${effectiveDate ||"N/A"} | **Author:** ${author ||"N/A"}

## 1. Purpose
${purpose ||"N/A"}

## 2. Scope
${scope ||"N/A"}

## 3. Procedure Steps
${steps.map((step, idx) => `
### Step ${idx + 1}: ${step.description ||"Untitled Step"}
**Responsible Role/Person:** ${step.responsible ||"N/A"}
${step.warning ? `> **WARNING:** ${step.warning}` :""}
${step.substeps && step.substeps.length > 0 ? step.substeps.map((sub, sidx) => `- ${sidx + 1}. ${sub}`).join('\n') :""}
`).join('\n')}
`;
 };

 const exportMarkdown = () => {
 const blob = new Blob([generateMarkdown()], { type:"text/markdown"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download = `${title.replace(/\s+/g, '-').toLowerCase()}-sop.md`;
 a.click();
 URL.revokeObjectURL(url);
 toast.success("Exported to Markdown");
 };

 return (
      <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader 
 icon={FileText} 
 title="SOP Template Builder"
 description="Create Standard Operating Procedure documents"
 actions={
 <>
 <ActionButton onClick={exportMarkdown} icon={Download} label="Export MD"/>
 <CopyButton getText={generateMarkdown} label="Copy SOP"/>
 <ResetButton onClick={() => loadTemplate("empty")} label="Reset"/>
 </>
 }
 />

 <div className="flex gap-2 flex-wrap">
 <Button variant="outline"size="sm"onClick={() => loadTemplate("it")}>IT Onboarding</Button>
 <Button variant="outline"size="sm"onClick={() => loadTemplate("safety")}>Safety Procedure</Button>
 <Button variant="outline"size="sm"onClick={() => loadTemplate("equipment")}>Equipment Maintenance</Button>
 </div>

 <div className="grid md:grid-cols-2 gap-6">
 <div className="space-y-6">
 <GlassCard>
 <CardHeader><CardTitle>Metadata</CardTitle></CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2"><Label>Title</Label><Input value={title} onChange={e => setTitle(e.target.value)} /></div>
 <div className="space-y-2"><Label>Department</Label><Input value={department} onChange={e => setDepartment(e.target.value)} /></div>
 <div className="space-y-2"><Label>Version</Label><Input value={version} onChange={e => setVersion(e.target.value)} /></div>
 <div className="space-y-2"><Label>Effective Date</Label><Input type="date"value={effectiveDate} onChange={e => setEffectiveDate(e.target.value)} /></div>
 <div className="space-y-2"><Label>Author</Label><Input value={author} onChange={e => setAuthor(e.target.value)} /></div>
 </div>
 <div className="space-y-2"><Label>Purpose</Label><textarea className="w-full min-h-[80px] p-2 rounded-md border bg-background"value={purpose} onChange={e => setPurpose(e.target.value)} /></div>
 <div className="space-y-2"><Label>Scope</Label><textarea className="w-full min-h-[80px] p-2 rounded-md border bg-background"value={scope} onChange={e => setScope(e.target.value)} /></div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex justify-between items-center">
 <span>Procedure Steps</span>
 <Button size="sm"onClick={addStep}><Plus className="w-4 h-4 mr-2"/> Add Step</Button>
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 {steps.map((step, idx) => (
 <div key={step.id} className="p-4 border rounded-lg space-y-4 bg-muted/20 relative group">
 <Button variant="ghost"size="icon"className="absolute right-2 top-2 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"onClick={() => removeStep(idx)}>
 <Trash2 className="w-4 h-4"/>
 </Button>
 <div className="font-semibold">Step {idx + 1}</div>
 <div className="space-y-2">
 <Label>Description</Label>
 <Input value={step.description} onChange={e => updateStep(idx,"description", e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Responsible Role/Person</Label>
 <Input value={step.responsible} onChange={e => updateStep(idx,"responsible", e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-500"/> Warning / Note (Optional)</Label>
 <Input value={step.warning ||""} onChange={e => updateStep(idx,"warning", e.target.value)} placeholder="Safety warnings or critical notes"/>
 </div>
 <div className="space-y-2">
 <Label>Sub-steps (one per line)</Label>
 <textarea 
 className="w-full min-h-[80px] p-2 rounded-md border bg-background text-sm"
 value={step.substeps?.join('\n') ||""} 
 onChange={e => updateStep(idx,"substeps", e.target.value.split('\n').filter(s => s.trim()))} 
 />
 </div>
 </div>
 ))}
 {steps.length === 0 && <p className="text-muted-foreground text-sm text-center">No steps added yet.</p>}
 </CardContent>
 </GlassCard>
 </div>

 <GlassCard className="h-fit sticky top-4">
 <CardHeader><CardTitle>Preview</CardTitle></CardHeader>
 <CardContent>
 <div className="prose prose-sm dark:prose-invert max-w-none">
 <h1>{title ||"Standard Operating Procedure"}</h1>
 <p className="text-muted-foreground text-sm">
 <strong>Department:</strong> {department ||"N/A"} | <strong>Version:</strong> {version} | <strong>Effective Date:</strong> {effectiveDate ||"N/A"} | <strong>Author:</strong> {author ||"N/A"}
 </p>
 
 <Separator className="my-4"/>
 
 <h3>1. Purpose</h3>
 <p>{purpose ||"N/A"}</p>
 
 <h3>2. Scope</h3>
 <p>{scope ||"N/A"}</p>
 
 <h3>3. Procedure Steps</h3>
 <div className="space-y-4">
 {steps.map((step, idx) => (
 <div key={step.id}>
 <h4 className="flex items-center gap-2 mb-1">
 <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 inline-flex items-center justify-center text-xs">{idx + 1}</span>
 {step.description ||"Untitled Step"}
 </h4>
 <div className="text-sm text-muted-foreground ml-7 mb-2"><strong>Responsible:</strong> {step.responsible ||"N/A"}</div>
 {step.warning && (
 <div className="ml-7 mb-2 p-2 bg-amber-500/10 border-l-2 border-amber-500 text-amber-600 dark:text-amber-400 text-sm flex gap-2">
 <AlertTriangle className="w-4 h-4 shrink-0"/> {step.warning}
 </div>
 )}
 {step.substeps && step.substeps.length > 0 && (
 <ul className="list-disc ml-11 text-sm">
 {step.substeps.map((sub, sidx) => (
 <li key={sidx}>{sub}</li>
 ))}
 </ul>
 )}
 </div>
 ))}
 </div>
 </div>
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
          <h3>Why Use Our SOP Template Builder?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our SOP Template Builder provides
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

      <RelatedTools currentToolUrl="/tools/office/sop-builder" max={6} />

</div>
 );
}
