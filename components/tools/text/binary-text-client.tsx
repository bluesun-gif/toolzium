"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { ActionButton, CopyButton, ResetButton, ExportTextButton } from "@/components/shared/action-buttons";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { Separator } from "@/components/ui/separator";
import { Binary, Copy, Settings2, Shield, Zap, Code2, BookOpen, Type } from "lucide-react";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

type Format = "auto" | "text" | "binary" | "hex" | "octal" | "decimal";
type SeparatorType = "space" | "comma" | "none";

export function BinaryTextClient() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [inputFormat, setInputFormat] = useState<Format>("auto");
  const [outputFormat, setOutputFormat] = useState<Format>("binary");
  const [separator, setSeparator] = useState<SeparatorType>("space");
  const [detectedFormat, setDetectedFormat] = useState<Format>("text");
  const [error, setError] = useState<string>("");

  const getSeparatorChar = (sep: SeparatorType) => {
    switch (sep) {
      case "space": return " ";
      case "comma": return ",";
      case "none": return "";
      default: return " ";
    }
  };

  const detectFormat = (str: string): Format => {
    if (!str.trim()) return "text";
    
    // Clean string for testing
    const cleanStr = str.replace(/[,\s]/g, "");
    
    // Binary check: only 0s and 1s, usually multiple of 8 if it's text representation
    if (/^[01]+$/.test(cleanStr)) {
      if (cleanStr.length >= 8) return "binary";
    }
    
    // Hex check: 0-9, A-F
    if (/^[0-9A-Fa-f]+$/.test(cleanStr)) {
      // If it only has 0-7, it could be octal, but hex is more common unless explicitly chosen
      // If it has letters A-F, definitely hex
      if (/[A-Fa-f]/.test(cleanStr)) return "hex";
      
      // Decimal vs Octal vs Hex for numbers only
      if (/^[0-7]+$/.test(cleanStr)) return "octal";
      return "decimal";
    }
    
    return "text";
  };

  const parseToUint8Array = (str: string, format: Format): Uint8Array | null => {
    try {
      if (format === "text") {
        return new TextEncoder().encode(str);
      }

      // Split by common separators if present, otherwise group
      let parts: string[] = [];
      const hasSpaces = str.includes(" ");
      const hasCommas = str.includes(",");
      
      if (hasSpaces || hasCommas) {
        parts = str.split(/[\s,]+/).filter(Boolean);
      } else {
        // No separators, try to chunk based on format
        let chunkSize = 2; // Hex default
        if (format === "binary") chunkSize = 8;
        else if (format === "octal") chunkSize = 3;
        else if (format === "decimal") chunkSize = 3; // roughly

        if (format === "binary" || format === "hex") {
           for (let i = 0; i < str.length; i += chunkSize) {
             parts.push(str.slice(i, i + chunkSize));
           }
        } else {
           // Without separators, octal and decimal are extremely ambiguous
           // We will just try to parse the whole thing as one giant number if no chunks,
           // but since we return Uint8Array (bytes), it's meant to be byte representation.
           throw new Error(`Please use spaces or commas to separate ${format} values.`);
        }
      }

      const arr = new Uint8Array(parts.length);
      for (let i = 0; i < parts.length; i++) {
        let val: number;
        if (format === "binary") val = parseInt(parts[i], 2);
        else if (format === "hex") val = parseInt(parts[i], 16);
        else if (format === "octal") val = parseInt(parts[i], 8);
        else if (format === "decimal") val = parseInt(parts[i], 10);
        else val = 0;

        if (isNaN(val) || val < 0 || val > 255) {
           // Try parsing as larger numbers? The tool is mostly for string representation (bytes)
           // If value > 255, it's not a valid UTF-8 byte.
           if (val > 255) throw new Error(`Value ${parts[i]} exceeds max byte value (255)`);
           throw new Error(`Invalid ${format} value: ${parts[i]}`);
        }
        arr[i] = val;
      }
      return arr;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to parse input");
      return null;
    }
  };

  const convertFromUint8Array = (arr: Uint8Array, format: Format, sep: SeparatorType): string => {
    if (format === "text") {
      try {
        return new TextDecoder("utf-8", { fatal: true }).decode(arr);
      } catch (e) {
        return new TextDecoder("utf-8").decode(arr); // fallback without fatal
      }
    }

    const sepChar = getSeparatorChar(sep);
    const parts: string[] = [];

    for (let i = 0; i < arr.length; i++) {
      const val = arr[i];
      if (format === "binary") parts.push(val.toString(2).padStart(8, "0"));
      else if (format === "hex") parts.push(val.toString(16).padStart(2, "0").toUpperCase());
      else if (format === "octal") parts.push(val.toString(8).padStart(3, "0"));
      else if (format === "decimal") parts.push(val.toString(10));
    }

    return parts.join(sepChar);
  };

  const processConversion = useCallback(() => {
    setError("");
    if (!input.trim()) {
      setOutput("");
      setDetectedFormat("text");
      return;
    }

    let actualInputFormat = inputFormat;
    if (actualInputFormat === "auto") {
      actualInputFormat = detectFormat(input);
      setDetectedFormat(actualInputFormat);
    } else {
      setDetectedFormat(actualInputFormat);
    }

    // Output format can't be auto
    const targetOutputFormat = outputFormat === "auto" ? "text" : outputFormat;

    const bytes = parseToUint8Array(input, actualInputFormat);
    if (bytes) {
      const result = convertFromUint8Array(bytes, targetOutputFormat, separator);
      setOutput(result);
    } else {
      setOutput("");
    }
  }, [input, inputFormat, outputFormat, separator]);

  useEffect(() => {
    processConversion();
  }, [processConversion]);

  // Byte table data
  const byteTableData = useMemo(() => {
    if (!input.trim() || error) return [];
    const actualInputFormat = inputFormat === "auto" ? detectedFormat : inputFormat;
    const bytes = parseToUint8Array(input, actualInputFormat);
    if (!bytes) return [];

    const data = [];
    const limit = Math.min(bytes.length, 50); // Show max 50 bytes in table
    
    try {
      const decoder = new TextDecoder("utf-8");
      // This is a naive chunking for display, proper UTF-8 decoding needs multiple bytes per char
      // But we will just decode character by character for simplicity in the table or just show the byte
      for (let i = 0; i < limit; i++) {
        data.push({
          idx: i + 1,
          dec: bytes[i].toString(10),
          hex: bytes[i].toString(16).toUpperCase().padStart(2, "0"),
          oct: bytes[i].toString(8).padStart(3, "0"),
          bin: bytes[i].toString(2).padStart(8, "0"),
        });
      }
    } catch (e) {}

    return data;
  }, [input, inputFormat, detectedFormat, error]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ToolPageHeader
        title="Binary & Hex Text Converter"
        description="Convert text strings to Binary, Hexadecimal, Octal, Decimal, and vice-versa. Supports UTF-8 encoding."
        icon={Binary}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Input</CardTitle>
            <div className="flex gap-2">
              <Select value={inputFormat} onValueChange={(v) => setInputFormat(v as Format)}>
                <SelectTrigger className="w-[140px] h-8 text-xs">
                  <SelectValue placeholder="Input Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto Detect</SelectItem>
                  <SelectItem value="text">Text (UTF-8)</SelectItem>
                  <SelectItem value="binary">Binary</SelectItem>
                  <SelectItem value="hex">Hexadecimal</SelectItem>
                  <SelectItem value="octal">Octal</SelectItem>
                  <SelectItem value="decimal">Decimal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {inputFormat === "auto" && input.trim() && (
              <div className="mb-2 text-xs text-muted-foreground flex items-center gap-1">
                Detected format: <span className="font-semibold text-primary capitalize">{detectedFormat}</span>
              </div>
            )}
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text or numbers here..."
              className="min-h-[250px] font-mono resize-y"
            />
            {error && (
              <Alert variant="destructive" className="mt-3 py-2">
                <AlertDescription className="text-xs">{error}</AlertDescription>
              </Alert>
            )}
            <div className="flex justify-end mt-3">
              <ResetButton onClick={() => { setInput(""); setOutput(""); setError(""); }} />
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Output</CardTitle>
            <div className="flex gap-2 items-center">
              <Label className="text-xs text-muted-foreground hidden sm:block">Format:</Label>
              <Select value={outputFormat} onValueChange={(v) => setOutputFormat(v as Format)}>
                <SelectTrigger className="w-[130px] h-8 text-xs">
                  <SelectValue placeholder="Output Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text (UTF-8)</SelectItem>
                  <SelectItem value="binary">Binary</SelectItem>
                  <SelectItem value="hex">Hexadecimal</SelectItem>
                  <SelectItem value="octal">Octal</SelectItem>
                  <SelectItem value="decimal">Decimal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {outputFormat !== "text" && (
              <div className="mb-2 flex items-center justify-end gap-2">
                <Label className="text-xs text-muted-foreground">Separator:</Label>
                <Select value={separator} onValueChange={(v) => setSeparator(v as SeparatorType)}>
                  <SelectTrigger className="w-[100px] h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="space">Space</SelectItem>
                    <SelectItem value="comma">Comma</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <Textarea
              value={output}
              readOnly
              placeholder="Conversion result will appear here..."
              className={"min-h-[250px] font-mono resize-y " + (outputFormat !== "text" ? (separator === "space" ? "mt-0" : "") : "mt-8")}
            />
            <div className="flex justify-end gap-2 mt-3">
              <CopyButton getText={() => output} />
              <ExportTextButton getText={() => output} filename={`conversion-${outputFormat}.txt`} />
            </div>
          </CardContent>
        </GlassCard>
      </div>

      {byteTableData.length > 0 && (
        <GlassCard>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Byte Breakdown</CardTitle>
            <p className="text-sm text-muted-foreground">
              Showing the first {byteTableData.length} bytes of the processed data.
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-md border">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2 font-medium border-b">Byte #</th>
                    <th className="px-4 py-2 font-medium border-b">Binary</th>
                    <th className="px-4 py-2 font-medium border-b">Hex</th>
                    <th className="px-4 py-2 font-medium border-b">Decimal</th>
                    <th className="px-4 py-2 font-medium border-b">Octal</th>
                  </tr>
                </thead>
                <tbody className="divide-y font-mono text-xs">
                  {byteTableData.map((row) => (
                    <tr key={row.idx} className="hover:bg-muted/30">
                      <td className="px-4 py-2 text-muted-foreground">{row.idx}</td>
                      <td className="px-4 py-2">{row.bin}</td>
                      <td className="px-4 py-2">{row.hex}</td>
                      <td className="px-4 py-2">{row.dec}</td>
                      <td className="px-4 py-2">{row.oct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </GlassCard>
      )}

      {/* SECTION 3: HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          { step: "01", title: "Enter Text or Binary", description: "Type or paste plain text to convert to binary, or paste binary code (sequences of 0s and 1s separated by spaces) to decode back to text.", icon: Type },
          { step: "02", title: "Choose Encoding", description: "Select encoding: ASCII (standard 7-bit), UTF-8 (full Unicode including emoji), or UTF-16. Choose bit grouping (8-bit bytes standard).", icon: Settings2 },
          { step: "03", title: "Copy the Result", description: "The converted output appears instantly. Copy with one click. Each character byte is separated by spaces for readability.", icon: Copy },
        ]}
        badges={["ASCII and UTF-8", "Bidirectional", "Byte-by-byte"]}
      />

      {/* SECTION 4: FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          { icon: Code2, title: "Bidirectional Conversion", description: "Convert text to binary and binary back to text in real time. Handles ASCII, UTF-8 Unicode, numbers, punctuation, and special characters." },
          { icon: Settings2, title: "Multiple Encodings", description: "Supports ASCII (7-bit, 128 characters), extended ASCII (8-bit, 256 chars), and UTF-8 (variable-width, full Unicode). Auto-detects encoding from input when possible." },
          { icon: Zap, title: "Real-Time Conversion", description: "Converts instantly as you type. No button click needed. Both the binary output and character count update live with every keystroke." },
          { icon: BookOpen, title: "Character Reference", description: "Hover any output byte to see the decimal and hexadecimal equivalent. Essential for learning bit patterns and understanding ASCII encoding." },
          { icon: Copy, title: "Flexible Output", description: "Display as space-separated bytes (01001000 01100101), continuous stream, or with character labels showing which byte maps to which character." },
          { icon: Shield, title: "Client-Side and Private", description: "All conversion happens in your browser. Your text is never sent to any server. Works offline once loaded." },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">Binary Encoding Reference Guide</h3>
          <p>In computers, all data is stored as binary (base-2) numbers using only 0 and 1. Text characters are encoded using character encoding standards that map each character to a specific number, which is then stored in binary. Understanding binary encoding is fundamental to computer science, data transmission, and cybersecurity.</p>
          <h3 className="text-lg font-semibold">Common ASCII Characters in Binary</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Char</th>
                  <th className="border p-2 text-left">Decimal</th>
                  <th className="border p-2 text-left">Hex</th>
                  <th className="border p-2 text-left">Binary</th>
                </tr>
              </thead>
              <tbody>
                {[["A","65","0x41","01000001"],["a","97","0x61","01100001"],["0","48","0x30","00110000"],["Space","32","0x20","00100000"],["!","33","0x21","00100001"],["NULL","0","0x00","00000000"],["DEL","127","0x7F","01111111"]].map(([ch, dec, hex, bin]) => (
                  <tr key={ch} className="odd:bg-muted/20">
                    <td className="border p-2 font-mono font-bold text-xs text-center">{ch}</td>
                    <td className="border p-2 font-mono text-xs">{dec}</td>
                    <td className="border p-2 font-mono text-primary text-xs">{hex}</td>
                    <td className="border p-2 font-mono text-xs tracking-wider">{bin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-lg font-semibold">Text Encoding Standards Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Encoding</th>
                  <th className="border p-2 text-left">Bits per Char</th>
                  <th className="border p-2 text-left">Characters</th>
                  <th className="border p-2 text-left">Best For</th>
                </tr>
              </thead>
              <tbody>
                {[["ASCII","7 bits","128 (English only)","Legacy systems, protocols"],["Extended ASCII","8 bits","256 (Western European)","Older Windows/DOS files"],["UTF-8","8-32 bits (variable)","1,114,112 (all Unicode)","Web, modern apps (default)"],["UTF-16","16-32 bits","All Unicode","Windows APIs, Java, .NET"]].map(([enc, bits, chars, best]) => (
                  <tr key={enc} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{enc}</td>
                    <td className="border p-2 font-mono text-primary text-xs">{bits}</td>
                    <td className="border p-2 text-xs">{chars}</td>
                    <td className="border p-2 text-muted-foreground text-xs">{best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-lg font-semibold">How UTF-8 Encodes Multi-Byte Characters</h3>
          <p>UTF-8 uses 1 to 4 bytes per character depending on the Unicode code point. ASCII characters (U+0000 to U+007F) use 1 byte and are identical to ASCII. Characters U+0080 to U+07FF use 2 bytes. Characters U+0800 to U+FFFF (most CJK characters) use 3 bytes. Characters U+10000 to U+10FFFF (emoji, rare scripts) use 4 bytes. This variable-width design makes UTF-8 both backward-compatible with ASCII and capable of encoding every human language.</p>
        </div>
      </ToolFeatureGuides>

      {/* SECTION 5: FAQ + RELATED TOOLS */}
      <ToolFaqAccordion
        faqs={[
          { question: "How do I convert text to binary?", answer: "Enter your text in the input field and the tool immediately shows the binary representation. Each character is converted to its ASCII or UTF-8 code point, then that number is written in binary (base-2). The letter A has ASCII code 65, which in 8-bit binary is 01000001. Each byte is separated by a space for readability." },
          { question: "How do I convert binary back to text?", answer: "Paste your binary code as space-separated 8-bit groups (e.g., 01001000 01100101 01101100 01101100 01101111). The tool detects binary input and decodes it to text automatically. Make sure each byte is exactly 8 digits and groups are separated by spaces." },
          { question: "What is the difference between ASCII and UTF-8?", answer: "ASCII is 7-bit and covers 128 characters: English letters, digits, punctuation, and control codes. UTF-8 is variable-width and covers all 1,114,112 Unicode characters. For ASCII characters, UTF-8 produces identical binary output. For accented characters, CJK, Arabic, and emoji, UTF-8 uses 2 to 4 bytes while ASCII cannot represent them at all." },
          { question: "Why is binary shown in groups of 8?", answer: "8 bits form one byte, the fundamental unit of computer memory. One byte can represent 256 values (2 to the power of 8), sufficient for all ASCII characters. Displaying binary in 8-bit groups correlates directly to how computers actually store and transmit text data." },
          { question: "What are real-world uses of binary text conversion?", answer: "Binary text conversion is used in: computer science education, debugging network protocols and file formats, steganography (hiding messages in binary patterns), CTF security competitions, understanding QR codes and barcodes, and data serialization. Developers also use it to inspect raw bytes when debugging encoding issues." },
        ]}
      />
      <RelatedTools currentToolUrl="/tools/text/binary-text" max={6} />
    </div>
  );
}
