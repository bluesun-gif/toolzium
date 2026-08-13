"use client";

import { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Search, Globe, Filter, Sparkles, Shield, Zap, Copy } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

type PortInfo = {
 port: number;
 service: string;
 protocol: string;
 category: string;
 description: string;
};

const PORTS: PortInfo[] = [
 { port: 20, service:"FTP (Data)", protocol:"TCP", category:"File Transfer", description:"File Transfer Protocol (Data)"},
 { port: 21, service:"FTP (Control)", protocol:"TCP", category:"File Transfer", description:"File Transfer Protocol (Control)"},
 { port: 22, service:"SSH", protocol:"TCP", category:"Remote Access", description:"Secure Shell"},
 { port: 23, service:"Telnet", protocol:"TCP", category:"Remote Access", description:"Unencrypted text communications"},
 { port: 25, service:"SMTP", protocol:"TCP", category:"Email", description:"Simple Mail Transfer Protocol"},
 { port: 53, service:"DNS", protocol:"TCP/UDP", category:"Other", description:"Domain Name System"},
 { port: 67, service:"DHCP (Server)", protocol:"UDP", category:"Other", description:"Dynamic Host Configuration Protocol"},
 { port: 68, service:"DHCP (Client)", protocol:"UDP", category:"Other", description:"Dynamic Host Configuration Protocol"},
 { port: 80, service:"HTTP", protocol:"TCP", category:"Web", description:"Hypertext Transfer Protocol"},
 { port: 110, service:"POP3", protocol:"TCP", category:"Email", description:"Post Office Protocol version 3"},
 { port: 123, service:"NTP", protocol:"UDP", category:"Other", description:"Network Time Protocol"},
 { port: 143, service:"IMAP", protocol:"TCP", category:"Email", description:"Internet Message Access Protocol"},
 { port: 161, service:"SNMP", protocol:"UDP", category:"Other", description:"Simple Network Management Protocol"},
 { port: 443, service:"HTTPS", protocol:"TCP", category:"Web", description:"HTTP Secure"},
 { port: 465, service:"SMTPS", protocol:"TCP", category:"Email", description:"SMTP over SSL"},
 { port: 993, service:"IMAPS", protocol:"TCP", category:"Email", description:"IMAP over SSL"},
 { port: 995, service:"POP3S", protocol:"TCP", category:"Email", description:"POP3 over SSL"},
 { port: 1433, service:"MSSQL", protocol:"TCP", category:"Database", description:"Microsoft SQL Server"},
 { port: 1521, service:"Oracle", protocol:"TCP", category:"Database", description:"Oracle Database"},
 { port: 3306, service:"MySQL", protocol:"TCP", category:"Database", description:"MySQL Database"},
 { port: 3389, service:"RDP", protocol:"TCP", category:"Remote Access", description:"Remote Desktop Protocol"},
 { port: 5432, service:"PostgreSQL", protocol:"TCP", category:"Database", description:"PostgreSQL Database"},
 { port: 6379, service:"Redis", protocol:"TCP", category:"Database", description:"Redis Key-Value Store"},
 { port: 8080, service:"HTTP-Alt", protocol:"TCP", category:"Web", description:"HTTP Alternate"},
 { port: 27017, service:"MongoDB", protocol:"TCP", category:"Database", description:"MongoDB Database"},
];

export function PortReferenceClient() {
 const [search, setSearch] = useState("");
 const [category, setCategory] = useState("All");

 const filteredPorts = useMemo(() => {
 return PORTS.filter(p => {
 const matchSearch = p.port.toString().includes(search) || p.service.toLowerCase().includes(search.toLowerCase());
 const matchCat = category ==="All"|| p.category === category;
 return matchSearch && matchCat;
 });
 }, [search, category]);

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
 title="Port Number Reference"
 description="Searchable reference of common network ports and services."
 actions={<ResetButton onClick={() => { setSearch(""); setCategory("All"); }} label="Reset"/>}
 />

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><Filter className="w-5 h-5"/> Filters</CardTitle>
 </CardHeader>
 <CardContent className="flex flex-col md:flex-row gap-4">
 <div className="flex-1 relative">
 <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"/>
 <Input 
 placeholder="Search by port or service..."
 value={search} 
 onChange={e => setSearch(e.target.value)} 
 className="pl-9"
 />
 </div>
 <Select value={category} onValueChange={setCategory}>
 <SelectTrigger className="w-full md:w-[200px]">
 <SelectValue placeholder="Category"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="All">All Categories</SelectItem>
 <SelectItem value="Web">Web</SelectItem>
 <SelectItem value="Database">Database</SelectItem>
 <SelectItem value="Email">Email</SelectItem>
 <SelectItem value="File Transfer">File Transfer</SelectItem>
 <SelectItem value="Remote Access">Remote Access</SelectItem>
 <SelectItem value="Other">Other</SelectItem>
 </SelectContent>
 </Select>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardContent className="p-0">
 <div className="overflow-x-auto">
 <table className="w-full text-sm text-left">
 <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-medium">
 <tr>
 <th className="px-6 py-3">Port</th>
 <th className="px-6 py-3">Service</th>
 <th className="px-6 py-3">Protocol</th>
 <th className="px-6 py-3">Category</th>
 <th className="px-6 py-3">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-border">
 {filteredPorts.map((p) => (
 <tr key={p.port} className="hover:bg-muted/30 transition-colors">
 <td className="px-6 py-4 font-mono font-bold text-primary">{p.port}</td>
 <td className="px-6 py-4 font-medium">{p.service} <span className="text-xs text-muted-foreground block font-normal">{p.description}</span></td>
 <td className="px-6 py-4">{p.protocol}</td>
 <td className="px-6 py-4">{p.category}</td>
 <td className="px-6 py-4">
 <CopyButton getText={() => `${p.port} - ${p.service} (${p.protocol})`} label="Copy"/>
 </td>
 </tr>
 ))}
 {filteredPorts.length === 0 && (
 <tr>
 <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
 No ports found matching your criteria.
 </td>
 </tr>
 )}
 </tbody>
 </table>
 </div>
 </CardContent>
 </GlassCard>
 
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
          <h3>Why Use Our Port Number Reference?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Port Number Reference provides
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

      <RelatedTools currentToolUrl="/tools/network/port-reference" max={6} />

</div>
 );
}
