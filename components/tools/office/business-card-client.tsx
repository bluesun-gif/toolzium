"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState, useRef, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { CreditCard, Download, Eye, Palette, Scan, Smartphone, User } from"lucide-react";
import { cn } from"@/lib/utils";
import toast from"react-hot-toast";

const COLORS = [
 { name:"Slate", bg:"bg-[#0f172a] text-[#f8fafc]", text:"text-foreground", accent:"text-muted-foreground"},
 { name:"Blue", bg:"bg-blue-900", text:"text-primary", accent:"text-primary"},
 { name:"Emerald", bg:"bg-emerald-900", text:"text-emerald-100", accent:"text-emerald-300"},
 { name:"Rose", bg:"bg-rose-900", text:"text-rose-100", accent:"text-rose-300"},
 { name:"Purple", bg:"bg-purple-900", text:"text-primary", accent:"text-primary"},
 { name:"Minimal", bg:"bg-background", text:"text-foreground", accent:"text-muted-foreground", border:"border border-border"}
];

=======
import { ToolBackground } from"@/components/shared/tool-background";

import { useState, useRef, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { CreditCard, Eye, Download, Scan, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
const COLORS = [{
  name: "Slate",
  bg: "bg-[#0f172a] text-[#f8fafc]",
  text: "text-foreground",
  accent: "text-muted-foreground"
}, {
  name: "Blue",
  bg: "bg-blue-900",
  text: "text-primary",
  accent: "text-primary"
}, {
  name: "Emerald",
  bg: "bg-emerald-900",
  text: "text-emerald-100",
  accent: "text-emerald-300"
}, {
  name: "Rose",
  bg: "bg-rose-900",
  text: "text-rose-100",
  accent: "text-rose-300"
}, {
  name: "Purple",
  bg: "bg-purple-900",
  text: "text-primary",
  accent: "text-primary"
}, {
  name: "Minimal",
  bg: "bg-background",
  text: "text-foreground",
  accent: "text-muted-foreground",
  border: "border border-border"
}];
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export function BusinessCardClient() {
  const [details, setDetails] = useState({
    name: "John Doe",
    title: "Software Engineer",
    company: "Tech Corp",
    email: "john@example.com",
    phone: "+1 234 567 8900",
    website: "www.johndoe.com",
    address: "123 Tech Lane, NY 10001"
  });
  const [design, setDesign] = useState({
    theme: 0,
    layout: "horizontal",
    template: "corporate"
  });
  const cardRef = useRef<HTMLDivElement>(null);
  const handleInputChange = (field: string, value: string) => {
    setDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const getVCardText = () => {
    return `BEGIN:VCARD\nVERSION:3.0\nFN:${details.name}\nORG:${details.company}\nTITLE:${details.title}\nTEL:${details.phone}\nEMAIL:${details.email}\nURL:${details.website}\nADR:;;${details.address}\nEND:VCARD`;
  };
  const downloadPNG = () => {
    toast("Download feature would use html2canvas in production.");
  };
  const resetForm = () => {
    setDetails({
      name: "",
      title: "",
      company: "",
      email: "",
      phone: "",
      website: "",
      address: ""
    });
  };
  const activeTheme = COLORS[design.theme];
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={CreditCard} title="Business Card Generator" description="Design and download custom digital business cards with QR codes." actions={<>
 <CopyButton getText={getVCardText} label="Copy vCard" />
 <ResetButton onClick={resetForm} label="Reset" />
 </>} />

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Name</Label>
 <Input value={details.name} onChange={e => handleInputChange("name", e.target.value)} placeholder="Full Name" />
 </div>
 <div className="space-y-2">
 <Label>Title</Label>
 <Input value={details.title} onChange={e => handleInputChange("title", e.target.value)} placeholder="Job Title" />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Company</Label>
 <Input value={details.company} onChange={e => handleInputChange("company", e.target.value)} placeholder="Company Name" />
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Email</Label>
 <Input value={details.email} onChange={e => handleInputChange("email", e.target.value)} placeholder="Email Address" />
 </div>
 <div className="space-y-2">
 <Label>Phone</Label>
 <Input value={details.phone} onChange={e => handleInputChange("phone", e.target.value)} placeholder="Phone Number" />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Website</Label>
 <Input value={details.website} onChange={e => handleInputChange("website", e.target.value)} placeholder="Website URL" />
 </div>
 <div className="space-y-2">
 <Label>Address</Label>
 <Input value={details.address} onChange={e => handleInputChange("address", e.target.value)} placeholder="Physical Address" />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Design</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Theme Color</Label>
 <div className="flex gap-2 flex-wrap">
 {COLORS.map((c, i) => <div key={c.name} onClick={() => setDesign(d => ({
                    ...d,
                    theme: i
                  }))} className={cn("w-8 h-8 rounded-full cursor-pointer border-2", c.bg, design.theme === i ? "border-primary ring-2 ring-primary ring-offset-2" : "border-transparent")} title={c.name} />)}
 </div>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Layout</Label>
 <Select value={design.layout} onValueChange={v => setDesign(d => ({
                    ...d,
                    layout: v
                  }))}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="horizontal">Horizontal</SelectItem>
 <SelectItem value="vertical">Vertical</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Template</Label>
 <Select value={design.template} onValueChange={v => setDesign(d => ({
                    ...d,
                    template: v
                  }))}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="corporate">Corporate</SelectItem>
 <SelectItem value="creative">Creative</SelectItem>
 <SelectItem value="minimal">Minimal</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader className="flex flex-row items-center justify-between">
 <CardTitle className="flex items-center gap-2"><Eye className="w-5 h-5" /> Preview</CardTitle>
 <ActionButton icon={Download} label="Download PNG" onClick={downloadPNG} />
 </CardHeader>
 <CardContent className="flex justify-center items-center bg-muted/30 p-8 rounded-lg min-h-[400px]">
 <div ref={cardRef} className={cn("p-8 shadow-xl transition-all duration-300 flex flex-col justify-between", activeTheme.bg, activeTheme.text, activeTheme.border, design.layout === "horizontal" ? "w-[400px] h-[225px]" : "w-[250px] h-[400px]", design.template === "creative" && "rounded-2xl", design.template !== "creative" && "rounded-none")}>
 <div className={cn("flex", design.layout === "horizontal" ? "justify-between items-start" : "flex-col gap-4 text-center items-center")}>
 <div>
 <h2 className={cn("font-bold", design.layout === "horizontal" ? "text-2xl" : "text-xl")}>{details.name || "Your Name"}</h2>
 <p className={cn("font-medium", activeTheme.accent)}>{details.title || "Your Title"}</p>
 </div>
 {design.template !== "minimal" && <div className="flex flex-col items-end">
 <Scan className="w-12 h-12 opacity-80" />
 </div>}
 </div>

 <div className={cn("flex flex-col gap-1 text-sm mt-4", design.layout === "vertical" && "items-center text-center")}>
 {details.company && <p className="font-semibold">{details.company}</p>}
 {details.phone && <p className="opacity-90">{details.phone}</p>}
 {details.email && <p className="opacity-90">{details.email}</p>}
 {details.website && <p className="opacity-90">{details.website}</p>}
 {details.address && <p className="opacity-70 text-xs mt-1 max-w-[200px] truncate">{details.address}</p>}
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<<<<<<< HEAD
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Info",
    description:"Add name, title, contact.",
    icon: User,
  },
{
    step:"02",
    title:"Style",
    description:"Pick a layout and color.",
    icon: Palette,
  },
{
    step:"03",
    title:"Export",
    description:"Download print-ready file.",
    icon: Download,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: User,
    title:"Contact",
    description:"Your details.",
  },
{
    icon: Palette,
    title:"Design",
    description:"Themes and layouts.",
  },
{
    icon: Download,
    title:"Export",
    description:"Print-ready.",
  },
{
    icon: Smartphone,
    title:"Digital",
    description:"Also save as image.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A business card generator turns your contact details into a polished, print-ready card without design software. Correct dimensions and clean layouts make a professional first impression. This tool handles the format and styling.</p>
  <p>Digital export extends utility; a card image works in email signatures and profiles. Styling options keep branding consistent.</p>
  <p>Use it when networking or rebranding. The tool's value is a professional card from simple inputs, ready to print or share.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Sizes?",
    answer:"Standard 3.5 x 2 inches.",
  },
{
    question:"Print ready?",
    answer:"Yes, correct dimensions.",
  },
{
    question:"Digital use?",
    answer:"Export an image too.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Private?",
    answer:"Local.",
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
          <h3>Why Use Our c.name?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our c.name provides
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

      <RelatedTools currentToolUrl="/tools/office/business-card" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
