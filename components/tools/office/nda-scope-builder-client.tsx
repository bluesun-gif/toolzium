"use client";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Switch } from"@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { ShieldCheck, FileText, Printer, Sparkles, Shield, Zap, Copy } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export function NdaScopeBuilderClient() {
 const [ndaType, setNdaType] = useState("mutual");
 const [disclosingParty, setDisclosingParty] = useState("");
 const [receivingParty, setReceivingParty] = useState("");
 const [term, setTerm] = useState("3");
 const [governingState, setGoverningState] = useState("");
 
 const [scopeSourceCode, setScopeSourceCode] = useState(false);
 const [scopeFinancials, setScopeFinancials] = useState(true);
 const [scopeCustomerData, setScopeCustomerData] = useState(true);
 const [scopeProductSpecs, setScopeProductSpecs] = useState(false);
 const [scopeMarketingPlans, setScopeMarketingPlans] = useState(false);

 const generateNdaText = () => {
 if (!disclosingParty || !receivingParty || !governingState) {
 return"Please fill out the Disclosing Party, Receiving Party, and Governing State to preview the agreement.";
 }

 const typeStr = ndaType ==="mutual"?"Mutual Non-Disclosure Agreement":"Unilateral Non-Disclosure Agreement";
 const dateStr = new Date().toLocaleDateString();
 let text ="NON-DISCLOSURE AGREEMENT\n\n";
 text +="This"+ typeStr +"(the \"Agreement\") is entered into as of"+ dateStr +"by and between"+ disclosingParty +"and"+ receivingParty +".\n\n";
 
 text +="1. CONFIDENTIAL INFORMATION.\n";
 const scopes = [];
 if (scopeSourceCode) scopes.push("source code and related documentation");
 if (scopeFinancials) scopes.push("financial information and projections");
 if (scopeCustomerData) scopes.push("customer data and lists");
 if (scopeProductSpecs) scopes.push("product specifications and technical details");
 if (scopeMarketingPlans) scopes.push("marketing strategies and plans");
 
 let scopeText ="Confidential Information includes all non-public information disclosed by either party.";
 if (scopes.length > 0) {
 scopeText +="In particular, it shall include:"+ scopes.join(",") +".";
 }
 text += scopeText +"\n\n";

 text +="2. EXCEPTIONS.\n";
 text +="Confidential Information does not include information that: (a) is or becomes publicly known through no lawful act of the receiving party; (b) was already known to the receiving party; or (c) is independently developed.\n\n";

 text +="3. TERM.\n";
 const termStr = term ==="perpetual"?"shall survive perpetually":"shall survive for a period of"+ term +"years from the date of disclosure";
 text +="The obligations of confidentiality under this Agreement"+ termStr +".\n\n";

 text +="4. GOVERNING LAW.\n";
 text +="This Agreement shall be governed by the laws of the state of"+ governingState +".\n\n";

 return text;
 };

 const printDocument = () => {
 toast.success("Opening print dialog...");
 window.print();
 };

 return (
 <div className={"space-y-6"}>
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={ShieldCheck}
 title="Mutual NDA Scope & Term Builder"
 description="Generate Mutual and Unilateral NDAs with custom confidentiality scope clauses."
 actions={
 <>
 <CopyButton getText={generateNdaText} label="Copy NDA"/>
 <ActionButton onClick={printDocument} icon={Printer} label="Print"/>
 <ResetButton onClick={() => {
 setDisclosingParty(""); setReceivingParty(""); setGoverningState("");
 }} label="Reset Form"/>
 </>
 }
 />
 
 <div className={"grid md:grid-cols-2 gap-6"}>
 <div className={"space-y-6"}>
 <GlassCard>
 <CardHeader>
 <CardTitle>Parties & Details</CardTitle>
 </CardHeader>
 <CardContent className={"space-y-4"}>
 <div className={"space-y-2"}>
 <Label>NDA Type</Label>
 <Select value={ndaType} onValueChange={setNdaType}>
 <SelectTrigger>
 <SelectValue placeholder="Select NDA type"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="mutual">Mutual (Both parties disclose)</SelectItem>
 <SelectItem value="unilateral">Unilateral (One party discloses)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className={"space-y-2"}>
 <Label>Disclosing Party (or Party A)</Label>
 <Input value={disclosingParty} onChange={e => setDisclosingParty(e.target.value)} placeholder="Company A LLC"/>
 </div>
 <div className={"space-y-2"}>
 <Label>Receiving Party (or Party B)</Label>
 <Input value={receivingParty} onChange={e => setReceivingParty(e.target.value)} placeholder="Consultant Inc"/>
 </div>
 <div className={"space-y-2"}>
 <Label>Governing State</Label>
 <Input value={governingState} onChange={e => setGoverningState(e.target.value)} placeholder="e.g. Delaware"/>
 </div>
 <div className={"space-y-2"}>
 <Label>Term</Label>
 <Select value={term} onValueChange={setTerm}>
 <SelectTrigger>
 <SelectValue placeholder="Select term"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="1">1 Year</SelectItem>
 <SelectItem value="2">2 Years</SelectItem>
 <SelectItem value="3">3 Years</SelectItem>
 <SelectItem value="5">5 Years</SelectItem>
 <SelectItem value="perpetual">Perpetual</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Scope Categories</CardTitle>
 <CardDescription>Select specific categories to include in the definition of Confidential Information.</CardDescription>
 </CardHeader>
 <CardContent className={"space-y-4"}>
 <div className={"flex items-center justify-between"}>
 <Label className={"cursor-pointer"}>Source Code & Technical Assets</Label>
 <Switch checked={scopeSourceCode} onCheckedChange={setScopeSourceCode} />
 </div>
 <div className={"flex items-center justify-between"}>
 <Label className={"cursor-pointer"}>Financial Information</Label>
 <Switch checked={scopeFinancials} onCheckedChange={setScopeFinancials} />
 </div>
 <div className={"flex items-center justify-between"}>
 <Label className={"cursor-pointer"}>Customer Data & Lists</Label>
 <Switch checked={scopeCustomerData} onCheckedChange={setScopeCustomerData} />
 </div>
 <div className={"flex items-center justify-between"}>
 <Label className={"cursor-pointer"}>Product Specifications</Label>
 <Switch checked={scopeProductSpecs} onCheckedChange={setScopeProductSpecs} />
 </div>
 <div className={"flex items-center justify-between"}>
 <Label className={"cursor-pointer"}>Marketing Plans</Label>
 <Switch checked={scopeMarketingPlans} onCheckedChange={setScopeMarketingPlans} />
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <GlassCard>
 <CardHeader>
 <CardTitle className={"flex items-center gap-2"}>
 <FileText className={"h-5 w-5"} />
 Document Preview
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className={"p-4 bg-muted/50 rounded-md whitespace-pre-wrap font-mono text-sm border min-h-[400px]"}>
 {generateNdaText()}
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
          <h3>Why Use Our Mutual NDA Scope & Term Builder?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Mutual NDA Scope & Term Builder provides
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

      <RelatedTools currentToolUrl="/tools/office/nda-scope-builder" max={6} />

</div>
 );
}
