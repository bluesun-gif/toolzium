"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

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
import { Textarea } from"@/components/ui/textarea";
import { Copy, FileText, FolderOpen, List, Regex, RotateCcw, ShieldCheck, Wand2 } from"lucide-react";

=======
import { ToolBackground } from"@/components/shared/tool-background";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Textarea } from "@/components/ui/textarea";
import { FileText, List, Copy, RotateCcw, Sparkles, Shield, Zap } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export function FileRenamerClient() {
  const [input, setInput] = useState("");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [caseType, setCaseType] = useState("none");
  const [seqStart, setSeqStart] = useState("");
  const getRenamedFiles = () => {
    if (!input.trim()) return [];
    let files = input.split("\n").filter(f => f.trim());
    return files.map((file, idx) => {
      let newName = file;
      const lastDotIndex = newName.lastIndexOf(".");
      let namePart = lastDotIndex !== -1 ? newName.substring(0, lastDotIndex) : newName;
      const extPart = lastDotIndex !== -1 ? newName.substring(lastDotIndex) : "";
      if (findText) {
        namePart = namePart.split(findText).join(replaceText);
      }
      if (caseType === "upper") namePart = namePart.toUpperCase();
      if (caseType === "lower") namePart = namePart.toLowerCase();
      if (prefix) namePart = prefix + namePart;
      if (suffix) namePart = namePart + suffix;
      if (seqStart) {
        const num = parseInt(seqStart) + idx;
        namePart += `_${num.toString().padStart(3, "0")}`;
      }
      return {
        original: file,
        renamed: namePart + extPart
      };
    });
  };
  const results = getRenamedFiles();
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={FileText} title="Batch File Renamer" description="Preview file rename patterns without actually renaming." actions={<>
 <CopyButton getText={() => results.map(r => r.renamed).join("\n")} label="Copy Results" />
 <ResetButton onClick={() => {
          setInput("");
          setPrefix("");
          setSuffix("");
          setFindText("");
          setReplaceText("");
          setCaseType("none");
          setSeqStart("");
        }} label="Reset All" />
 </>} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Original Files</CardTitle>
 <CardDescription>Enter one filename per line</CardDescription>
 </CardHeader>
 <CardContent>
 <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="document1.txt&#10;image2.jpg" className="h-64 font-mono" />
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Rename Rules</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Prefix</Label>
 <Input value={prefix} onChange={e => setPrefix(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Suffix</Label>
 <Input value={suffix} onChange={e => setSuffix(e.target.value)} />
 </div>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Find</Label>
 <Input value={findText} onChange={e => setFindText(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Replace</Label>
 <Input value={replaceText} onChange={e => setReplaceText(e.target.value)} />
 </div>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Change Case</Label>
 <Select value={caseType} onValueChange={setCaseType}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="none">None</SelectItem>
 <SelectItem value="upper">UPPERCASE</SelectItem>
 <SelectItem value="lower">lowercase</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Add Sequence (Start)</Label>
 <Input type="number" value={seqStart} onChange={e => setSeqStart(e.target.value)} placeholder="e.g. 1" />
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <GlassCard>
 <CardHeader>
 <CardTitle>Preview</CardTitle>
 </CardHeader>
 <CardContent>
 {results.length === 0 ? <p className="text-muted-foreground text-center py-8">Enter files to see preview</p> : <div className="space-y-2 max-h-96 overflow-y-auto font-mono text-sm">
 {results.map((r, i) => <div key={i} className="flex justify-between items-center p-2 rounded bg-muted/50">
 <span className="text-muted-foreground line-through max-w-[45%] truncate">{r.original}</span>
 <span className="max-w-[45%] truncate text-primary">{r.renamed}</span>
 </div>)}
 </div>}
 </CardContent>
 </GlassCard>
 
<<<<<<< HEAD
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Add Files",
    description:"Load a set of files.",
    icon: FolderOpen,
  },
{
    step:"02",
    title:"Set Pattern",
    description:"Define rename rules.",
    icon: Regex,
  },
{
    step:"03",
    title:"Apply",
    description:"Rename in bulk.",
    icon: Wand2,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: FolderOpen,
    title:"Batch",
    description:"Many files at once.",
  },
{
    icon: Regex,
    title:"Patterns",
    description:"Find and replace rules.",
  },
{
    icon: Wand2,
    title:"Preview",
    description:"See results first.",
  },
{
    icon: ShieldCheck,
    title:"Safe",
    description:"Local processing.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A batch file renamer applies consistent naming across many files at once, saving tedious manual edits. Photographers, accountants, and developers all face messy filenames. This tool defines rules — add a prefix, replace spaces, number sequentially — and previews the result.</p>
  <p>Preview prevents mistakes. Seeing the new names before applying avoids accidental overwrites. Local processing keeps files private.</p>
  <p>Use it to impose order on any file set. The tool's value is consistent, instant renaming across hundreds of files.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What can it do?",
    answer:"Add, remove, replace text in names.",
  },
{
    question:"Preview?",
    answer:"Yes, review before applying.",
  },
{
    question:"Safe?",
    answer:"Local, no upload.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Patterns?",
    answer:"Supports rules and regex.",
  }
  ]}
/>
</div>
 );
}
=======
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Input Your Data",
        description: "Enter your information in the input field above and configure any options.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Process & Generate",
        description: "The tool processes your input instantly and displays the results.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy & Use",
        description: "Copy the output with one click and use it wherever you need.",
        icon: Copy
      }]} badges={["100% Free", "Instant Results", "Privacy-First"]} />

      <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Lightning Fast",
        description: "Get results in milliseconds with our optimized client-side processing engine."
      }, {
        icon: Shield,
        title: "Completely Private",
        description: "All processing happens in your browser. Your data never leaves your device."
      }, {
        icon: Zap,
        title: "No Signup Required",
        description: "Use this tool instantly without creating an account or providing any personal information."
      }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Batch File Renamer?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Batch File Renamer provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[{
        question: "Is this tool free to use?",
        answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits."
      }, {
        question: "Is my data secure?",
        answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server."
      }, {
        question: "Do I need to create an account?",
        answer: "No account or registration is required. Simply open the tool and start using it immediately."
      }]} />

      <RelatedTools currentToolUrl="/tools/office/file-renamer" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
