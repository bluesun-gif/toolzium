"use client";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Label } from"@/components/ui/label";
import { Input } from"@/components/ui/input";
import { Switch } from"@/components/ui/switch";
import { Shield, Sparkles, Zap, Copy } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export function CorsHeadersClient() {
 const [allowOrigin, setAllowOrigin] = useState("*");
 const [allowMethods, setAllowMethods] = useState("GET, POST, OPTIONS");
 const [allowHeaders, setAllowHeaders] = useState("Content-Type, Authorization");
 const [maxAge, setMaxAge] = useState("86400");
 const [allowCredentials, setAllowCredentials] = useState(false);

 const generateHttpHeaders = () => {
 let headers = `Access-Control-Allow-Origin: ${allowOrigin}\n`;
 headers += `Access-Control-Allow-Methods: ${allowMethods}\n`;
 headers += `Access-Control-Allow-Headers: ${allowHeaders}\n`;
 headers += `Access-Control-Max-Age: ${maxAge}\n`;
 if (allowCredentials) {
 headers += `Access-Control-Allow-Credentials: true\n`;
 }
 return headers;
 };

 const generateNginx = () => {
 let config = `add_header 'Access-Control-Allow-Origin' '${allowOrigin}' always;\n`;
 config += `add_header 'Access-Control-Allow-Methods' '${allowMethods}' always;\n`;
 config += `add_header 'Access-Control-Allow-Headers' '${allowHeaders}' always;\n`;
 config += `add_header 'Access-Control-Max-Age' ${maxAge} always;\n`;
 if (allowCredentials) {
 config += `add_header 'Access-Control-Allow-Credentials' 'true' always;\n`;
 }
 return config;
 };

 const generateExpress = () => {
 return `const cors = require('cors');\n\napp.use(cors({\n origin: '${allowOrigin}',\n methods: ['${allowMethods.split(', ').join("', '")}'],\n allowedHeaders: ['${allowHeaders.split(', ').join("', '")}'],\n maxAge: ${maxAge},\n credentials: ${allowCredentials}\n}));`;
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
 icon={Shield} 
 title="CORS Header Generator"
 description="Generate Cross-Origin Resource Sharing headers for various servers."
 actions={
 <ResetButton onClick={() => {
 setAllowOrigin("*");
 setAllowMethods("GET, POST, OPTIONS");
 setAllowHeaders("Content-Type, Authorization");
 setMaxAge("86400");
 setAllowCredentials(false);
 }} />
 } 
 />

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Configuration</CardTitle>
 <CardDescription>Set your CORS policies</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Access-Control-Allow-Origin</Label>
 <Input value={allowOrigin} onChange={(e) => setAllowOrigin(e.target.value)} placeholder="*, http://example.com"/>
 </div>
 <div className="space-y-2">
 <Label>Access-Control-Allow-Methods</Label>
 <Input value={allowMethods} onChange={(e) => setAllowMethods(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Access-Control-Allow-Headers</Label>
 <Input value={allowHeaders} onChange={(e) => setAllowHeaders(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Access-Control-Max-Age (seconds)</Label>
 <Input type="number"value={maxAge} onChange={(e) => setMaxAge(e.target.value)} />
 </div>
 <div className="flex items-center space-x-2 pt-2">
 <Switch checked={allowCredentials} onCheckedChange={setAllowCredentials} />
 <Label>Access-Control-Allow-Credentials</Label>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Generated Output</CardTitle>
 <CardDescription>Copy the configuration for your environment</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-2">
 <div className="flex justify-between items-center">
 <Label className="text-md font-semibold">Raw HTTP Headers</Label>
 <CopyButton getText={generateHttpHeaders} label="Copy Headers"/>
 </div>
 <pre className="p-4 bg-muted rounded-md text-sm overflow-x-auto">
 {generateHttpHeaders()}
 </pre>
 </div>
 <Separator />
 <div className="space-y-2">
 <div className="flex justify-between items-center">
 <Label className="text-md font-semibold">Nginx Configuration</Label>
 <CopyButton getText={generateNginx} label="Copy Nginx"/>
 </div>
 <pre className="p-4 bg-muted rounded-md text-sm overflow-x-auto">
 {generateNginx()}
 </pre>
 </div>
 <Separator />
 <div className="space-y-2">
 <div className="flex justify-between items-center">
 <Label className="text-md font-semibold">Express.js Middleware</Label>
 <CopyButton getText={generateExpress} label="Copy Express"/>
 </div>
 <pre className="p-4 bg-muted rounded-md text-sm overflow-x-auto">
 {generateExpress()}
 </pre>
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
          <h3>Why Use Our CORS Header Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our CORS Header Generator provides
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

      <RelatedTools currentToolUrl="/tools/network/cors-headers" max={6} />

</div>
 );
}
