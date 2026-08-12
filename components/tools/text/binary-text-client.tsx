"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { CopyButton } from"@/components/shared/action-buttons";
import toast from"react-hot-toast";
import { Binary, ArrowRightLeft, Copy } from"lucide-react";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

export default function BinaryTextClient() {
 const [input, setInput] = useState("");
 const [mode, setMode] = useState<"text-to-binary"|"binary-to-text">("text-to-binary");

 const output = useMemo(() => {
 if (!input.trim()) return"";
 
 if (mode ==="text-to-binary") {
 return input
 .split("")
 .map((char) => char.charCodeAt(0).toString(2).padStart(8,"0"))
 .join("");
 } else {
 const groups = input.trim().split(/\s+/);
 return groups
 .map((bin) => {
 const num = parseInt(bin, 2);
 return isNaN(num) ?"": String.fromCharCode(num);
 })
 .join("");
 }
 }, [input, mode]);

 const handleModeToggle = () => {
 setMode(mode ==="text-to-binary"?"binary-to-text":"text-to-binary");
 setInput("");
 toast.success(`Switched to ${mode ==="text-to-binary"?"Binary to Text":"Text to Binary"}`);
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
 <ToolPageHeader
 icon={Binary}
 title="Binary Text Converter"
 description="Convert text to binary representation and decode binary back to readable text instantly."
 />

 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Binary className="w-4 h-4 text-primary"/> Input
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <textarea
 value={input}
 onChange={(e) => setInput(e.target.value)}
 rows={6}
 className="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50"
 placeholder={mode ==="text-to-binary"?"Enter text to convert to binary...":"Enter binary (e.g., 01001000 01100101 01101100 01101100 01101111)..."}
 />
 <Button onClick={handleModeToggle} variant="outline"className="w-full">
 <ArrowRightLeft className="w-4 h-4 mr-2"/>
 Switch to {mode ==="text-to-binary"?"Binary to Text":"Text to Binary"}
 </Button>
 </CardContent>
 </Card>

 {output && (
 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Copy className="w-4 h-4 text-primary"/> Output
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <textarea
 value={output}
 readOnly
 rows={6}
 className="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50"
 />
 <CopyButton getText={() => output} label="Copy Output"/>
 </CardContent>
 </Card>
 )}

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Enter Text or Binary", description:"Type your text message or paste binary code into the input field.", icon: Binary },
 { step:"02", title:"Select Conversion Mode", description:"Choose between converting text to binary or decoding binary back to text.", icon: ArrowRightLeft },
 { step:"03", title:"Copy Result", description:"Get the converted output instantly and copy it with a single click.", icon: Copy },
 ]}
 badges={["100% Free","Client-Side","No Signup"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: Binary, title:"8-Bit Encoding", description:"Each character is converted to its 8-bit binary representation using ASCII/UTF-8 encoding."},
 { icon: ArrowRightLeft, title:"Bidirectional Conversion", description:"Seamlessly switch between text-to-binary and binary-to-text modes."},
 { icon: Copy, title:"Instant Copy", description:"Copy the converted binary string or decoded text with one click."},
 { icon: Binary, title:"Real-Time Processing", description:"See the conversion results update live as you type."},
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Binary is the fundamental language of computers, representing all data as sequences of 0s and 1s. Every character you type on your keyboard is ultimately stored as binary code in memory. This tool makes it easy to visualize and work with binary representations of text.</p>
 <p>When converting text to binary, each character is encoded using its ASCII or UTF-8 value, then represented as an 8-bit binary number. For example, the letter"A"(ASCII 65) becomes"01000001". Spaces between binary groups make the output readable and easy to parse.</p>
 <p>Binary-to-text conversion reverses this process by parsing space-separated binary groups, converting each 8-bit sequence back to its decimal ASCII value, and then to the corresponding character. This is useful for educational purposes, debugging, cryptography exercises, and understanding how computers represent text data at the lowest level.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"What encoding does this tool use?", answer:"This tool uses standard ASCII/UTF-8 encoding. Each character is represented as an 8-bit binary number."},
 { question:"Can I convert emojis to binary?", answer:"Yes, but emojis require multiple bytes in UTF-8 encoding. Each byte will be shown as a separate 8-bit binary group."},
 { question:"Is the binary output compatible with other tools?", answer:"Yes, the space-separated 8-bit format is widely compatible with other binary conversion tools and educational resources."},
 ]}
 />

 <RelatedTools currentToolUrl="/tools/text/binary-text"max={6} />
 </div>
 );
}
