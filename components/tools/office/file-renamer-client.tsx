"use client";
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
