"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Mail, Eye, Code, Copy, Sparkles, Shield, Zap } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { cn } from"@/lib/utils";

export function EmailSignatureClient() {
 const [data, setData] = useState({
 name:"John Doe",
 title:"Software Engineer",
 company:"Acme Corp",
 email:"john@example.com",
 phone:"+1 234 567 8900",
 website:"https://example.com",
 linkedin:"https://linkedin.com/in/johndoe",
 twitter:"https://twitter.com/johndoe",
 photoUrl:"https://via.placeholder.com/150",
 });

 const [themeColor, setThemeColor] = useState("#2563eb");
 const [layout, setLayout] = useState("horizontal");
 const [template, setTemplate] = useState("professional");

 const colors = [
 { name:"Blue", value:"#2563eb"},
 { name:"Red", value:"#dc2626"},
 { name:"Green", value:"#16a34a"},
 { name:"Purple", value:"#9333ea"},
 { name:"Orange", value:"#ea580c"},
 { name:"Slate", value:"#475569"},
 ];

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 const { name, value } = e.target;
 setData((prev) => ({ ...prev, [name]: value }));
 };

 const getSignatureHTML = (): string => {
 let fontFamily ="Arial, sans-serif";
 if (template ==="creative") fontFamily ="'Comic Sans MS', cursive, sans-serif";
 if (template ==="minimal") fontFamily ="'Helvetica Neue', Helvetica, sans-serif";

 const parts: string[] = [];

 if (layout ==="vertical") {
 parts.push('<table cellpadding="0"cellspacing="0"border="0"style="font-family: ' + fontFamily + '; font-size: 14px; color: #333333;">');
 parts.push('<tr>');
 parts.push('<td valign="top"style="padding-right: 15px; border-right: 2px solid ' + themeColor + ';">');
 parts.push('<img src="' + data.photoUrl + '"alt="' + data.name + '"width="80"height="80"style="border-radius: 50%; max-width: 80px;"/>');
 parts.push('</td>');
 parts.push('<td valign="top"style="padding-left: 15px;">');
 parts.push('<div style="font-size: 18px; font-weight: bold; color: ' + themeColor + '; margin-bottom: 2px;">' + data.name + '</div>');
 parts.push('<div style="font-size: 14px; margin-bottom: 8px;">' + data.title + (data.company ?"|"+ data.company :"") + '</div>');
 if (data.phone) parts.push('<div style="margin-bottom: 2px;">📞 <a href="tel:' + data.phone + '"style="color: #333333; text-decoration: none;">' + data.phone + '</a></div>');
 if (data.email) parts.push('<div style="margin-bottom: 2px;">✉️ <a href="mailto:' + data.email + '"style="color: ' + themeColor + '; text-decoration: none;">' + data.email + '</a></div>');
 if (data.website) parts.push('<div style="margin-bottom: 8px;">🌐 <a href="' + data.website + '"style="color: ' + themeColor + '; text-decoration: none;">' + data.website + '</a></div>');
 const socials: string[] = [];
 if (data.linkedin) socials.push('<a href="' + data.linkedin + '"style="color: ' + themeColor + '; text-decoration: none; margin-right: 8px;">LinkedIn</a>');
 if (data.twitter) socials.push('<a href="' + data.twitter + '"style="color: ' + themeColor + '; text-decoration: none;">Twitter</a>');
 if (socials.length > 0) parts.push('<div>' + socials.join("") + '</div>');
 parts.push('</td></tr></table>');
 } else {
 parts.push('<div style="font-family: ' + fontFamily + '; font-size: 14px; color: #333333; max-width: 400px;">');
 parts.push('<table cellpadding="0"cellspacing="0"border="0"width="100%"><tr>');
 parts.push('<td valign="center"style="padding-right: 15px;">');
 parts.push('<img src="' + data.photoUrl + '"alt="' + data.name + '"width="60"height="60"style="border-radius: 50%; max-width: 60px;"/>');
 parts.push('</td><td valign="center">');
 parts.push('<div style="font-size: 16px; font-weight: bold; color: ' + themeColor + ';">' + data.name + '</div>');
 parts.push('<div style="font-size: 12px; margin-bottom: 8px;">' + data.title + (data.company ?"|"+ data.company :"") + '</div>');
 parts.push('</td></tr></table>');
 parts.push('<div style="height: 2px; background-color: ' + themeColor + '; margin: 10px 0;"></div>');
 parts.push('<table cellpadding="0"cellspacing="0"border="0"width="100%"style="font-size: 12px;"><tr>');
 parts.push('<td valign="top"width="50%">');
 if (data.phone) parts.push('<div style="margin-bottom: 2px;">📞 ' + data.phone + '</div>');
 if (data.email) parts.push('<div>✉️ <a href="mailto:' + data.email + '"style="color: ' + themeColor + '; text-decoration: none;">' + data.email + '</a></div>');
 parts.push('</td><td valign="top"width="50%">');
 if (data.website) parts.push('<div style="margin-bottom: 2px;">🌐 <a href="' + data.website + '"style="color: ' + themeColor + '; text-decoration: none;">' + data.website + '</a></div>');
 const socials2: string[] = [];
 if (data.linkedin) socials2.push('<a href="' + data.linkedin + '"style="color: ' + themeColor + '; text-decoration: none; margin-right: 4px;">in</a>');
 if (data.twitter) socials2.push('<a href="' + data.twitter + '"style="color: ' + themeColor + '; text-decoration: none;">X</a>');
 if (socials2.length > 0) parts.push('<div>' + socials2.join("") + '</div>');
 parts.push('</td></tr></table></div>');
 }

 return parts.join("");
 };

 const getPlainText = () => {
 return `${data.name}\n${data.title} | ${data.company}\nPhone: ${data.phone}\nEmail: ${data.email}\nWebsite: ${data.website}\nLinkedIn: ${data.linkedin}\nTwitter: ${data.twitter}`;
 };

 return (
      <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader
 icon={Mail}
 title="Email Signature Generator"
 description="Create professional HTML email signatures for your office needs."
 actions={<ResetButton onClick={() => setData({ name:"", title:"", company:"", email:"", phone:"", website:"", linkedin:"", twitter:"", photoUrl:""})} />}
 />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Details</CardTitle>
 <CardDescription>Enter your contact information</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Full Name</Label>
 <Input name="name"value={data.name} onChange={handleInputChange} />
 </div>
 <div className="space-y-2">
 <Label>Job Title</Label>
 <Input name="title"value={data.title} onChange={handleInputChange} />
 </div>
 <div className="space-y-2">
 <Label>Company</Label>
 <Input name="company"value={data.company} onChange={handleInputChange} />
 </div>
 <div className="space-y-2">
 <Label>Email</Label>
 <Input name="email"value={data.email} onChange={handleInputChange} />
 </div>
 <div className="space-y-2">
 <Label>Phone</Label>
 <Input name="phone"value={data.phone} onChange={handleInputChange} />
 </div>
 <div className="space-y-2">
 <Label>Website</Label>
 <Input name="website"value={data.website} onChange={handleInputChange} />
 </div>
 <div className="space-y-2">
 <Label>LinkedIn URL</Label>
 <Input name="linkedin"value={data.linkedin} onChange={handleInputChange} />
 </div>
 <div className="space-y-2">
 <Label>Twitter/X URL</Label>
 <Input name="twitter"value={data.twitter} onChange={handleInputChange} />
 </div>
 <div className="space-y-2 sm:col-span-2">
 <Label>Photo URL</Label>
 <Input name="photoUrl"value={data.photoUrl} onChange={handleInputChange} />
 </div>
 </div>
 <Separator />
 <div className="space-y-4">
 <div className="space-y-2">
 <Label>Theme Color</Label>
 <div className="flex gap-2 flex-wrap">
 {colors.map((c) => (
 <button
 key={c.value}
 className={cn("w-8 h-8 rounded-full border-2", (themeColor === c.value ?"border-foreground":"border-transparent"))}
 style={{ backgroundColor: c.value }}
 onClick={() => setThemeColor(c.value)}
 title={c.name}
 />
 ))}
 </div>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Layout</Label>
 <Select value={layout} onValueChange={setLayout}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="horizontal">Horizontal Divider</SelectItem>
 <SelectItem value="vertical">Vertical Sidebar</SelectItem>
 <SelectItem value="compact">Compact</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Template</Label>
 <Select value={template} onValueChange={setTemplate}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="professional">Professional</SelectItem>
 <SelectItem value="creative">Creative</SelectItem>
 <SelectItem value="minimal">Minimal</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader className="flex flex-row items-center justify-between pb-2">
 <div>
 <CardTitle>Preview</CardTitle>
 <CardDescription>Live signature preview</CardDescription>
 </div>
 <Eye className="h-5 w-5 text-muted-foreground"/>
 </CardHeader>
 <CardContent>
 <div className="p-4 bg-background border rounded-md"dangerouslySetInnerHTML={{ __html: getSignatureHTML() }} />
 <div className="flex gap-2 mt-4 flex-wrap">
 <ActionButton onClick={() => {
 const blob = new Blob([getSignatureHTML()], { type:"text/html"});
 const clipboardItem = new ClipboardItem({"text/html": blob,"text/plain": new Blob([getPlainText()], { type:"text/plain"}) });
 navigator.clipboard.write([clipboardItem]).then(() => toast.success("Copied to clipboard!"));
 }} icon={Copy} label="Copy Signature"/>
 <CopyButton getText={getPlainText} label="Copy Plain Text"/>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className="flex flex-row items-center justify-between pb-2">
 <div>
 <CardTitle>HTML Code</CardTitle>
 <CardDescription>Raw HTML for email clients</CardDescription>
 </div>
 <Code className="h-5 w-5 text-muted-foreground"/>
 </CardHeader>
 <CardContent>
 <div className="p-4 bg-muted text-muted-foreground font-mono text-xs overflow-x-auto rounded-md h-40">
 {getSignatureHTML()}
 </div>
 <div className="mt-4">
 <CopyButton getText={getSignatureHTML} label="Copy HTML Code"/>
 </div>
 </CardContent>
 </GlassCard>
 </div>
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

      <RelatedTools currentToolUrl="/tools/office/email-signature" max={6} />

</div>
 );
}
