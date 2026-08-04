"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { ActionButton, CopyButton, ResetButton, ExportTextButton } from "@/components/shared/action-buttons";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { Separator } from "@/components/ui/separator";
import { Binary } from "lucide-react";
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
    <div className="space-y-6">
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
    </div>
  );
}
