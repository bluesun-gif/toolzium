"use client";
import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Type } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";

const blockFont: Record<string, string[]> = {
  'A': [" █████ ", "██   ██", "███████", "██   ██", "██   ██"],
  'B': ["██████ ", "██   ██", "██████ ", "██   ██", "██████ "],
  'C': [" ██████", "██     ", "██     ", "██     ", " ██████"],
  'D': ["██████ ", "██   ██", "██   ██", "██   ██", "██████ "],
  'E': ["███████", "██     ", "█████  ", "██     ", "███████"],
  'F': ["███████", "██     ", "█████  ", "██     ", "██     "],
  'G': [" ██████", "██     ", "██  ███", "██   ██", " ██████"],
  'H': ["██   ██", "██   ██", "███████", "██   ██", "██   ██"],
  'I': ["███", " ██", " ██", " ██", "███"],
  'J': ["     ██", "     ██", "     ██", "██   ██", " █████ "],
  'K': ["██   ██", "██  ██ ", "█████  ", "██  ██ ", "██   ██"],
  'L': ["██     ", "██     ", "██     ", "██     ", "███████"],
  'M': ["███   ███", "████ ████", "██ ███ ██", "██     ██", "██     ██"],
  'N': ["███    ██", "████   ██", "██ ██  ██", "██  ██ ██", "██   ████"],
  'O': [" █████ ", "██   ██", "██   ██", "██   ██", " █████ "],
  'P': ["██████ ", "██   ██", "██████ ", "██     ", "██     "],
  'Q': [" █████ ", "██   ██", "██   ██", "██  ███", " █████ "],
  'R': ["██████ ", "██   ██", "██████ ", "██  ██ ", "██   ██"],
  'S': [" ██████", "██     ", " █████ ", "     ██", "██████ "],
  'T': ["███████", "  ██   ", "  ██   ", "  ██   ", "  ██   "],
  'U': ["██   ██", "██   ██", "██   ██", "██   ██", " █████ "],
  'V': ["██   ██", "██   ██", "██   ██", " ██ ██ ", "  ███  "],
  'W': ["██     ██", "██     ██", "██  █  ██", "██ ███ ██", " ███ ███ "],
  'X': ["██   ██", " ██ ██ ", "  ███  ", " ██ ██ ", "██   ██"],
  'Y': ["██   ██", " ██ ██ ", "  ███  ", "   ██  ", "   ██  "],
  'Z': ["███████", "    ██ ", "  ███  ", " ██    ", "███████"],
  ' ': ["       ", "       ", "       ", "       ", "       "]
};

const bannerFont: Record<string, string[]> = {
  'A': ["#    #", "##  ##", "# ## #", "#    #", "#    #"],
  'B': ["####  ", "#   # ", "####  ", "#   # ", "####  "],
  'C': [" #### ", "#    #", "#     ", "#    #", " #### "],
  'D': ["####  ", "#   # ", "#   # ", "#   # ", "####  "],
  'E': ["######", "#     ", "##### ", "#     ", "######"],
  'F': ["######", "#     ", "##### ", "#     ", "#     "],
  'G': [" #### ", "#     ", "#  ###", "#    #", " #### "],
  'H': ["#    #", "#    #", "######", "#    #", "#    #"],
  'I': ["###", " # ", " # ", " # ", "###"],
  'J': ["    #", "    #", "    #", "#   #", " ### "],
  'K': ["#   #", "#  # ", "###  ", "#  # ", "#   #"],
  'L': ["#    ", "#    ", "#    ", "#    ", "#####"],
  'M': ["#    #", "##  ##", "# ## #", "#    #", "#    #"],
  'N': ["#    #", "##   #", "# #  #", "#  # #", "#   ##"],
  'O': [" #### ", "#    #", "#    #", "#    #", " #### "],
  'P': ["##### ", "#    #", "##### ", "#     ", "#     "],
  'Q': [" #### ", "#    #", "#  # #", " ## ##", "      "],
  'R': ["##### ", "#    #", "##### ", "#   # ", "#    #"],
  'S': [" #### ", "#     ", " ###  ", "    # ", "####  "],
  'T': ["#####", "  #  ", "  #  ", "  #  ", "  #  "],
  'U': ["#    #", "#    #", "#    #", "#    #", " #### "],
  'V': ["#    #", "#    #", "#    #", " #  # ", "  ##  "],
  'W': ["#    #", "#    #", "# ## #", "##  ##", "#    #"],
  'X': ["#    #", " #  # ", "  ##  ", " #  # ", "#    #"],
  'Y': ["#    #", " #  # ", "  ##  ", "  #   ", "  #   "],
  'Z': ["######", "    # ", "   #  ", "  #   ", "######"],
  ' ': ["      ", "      ", "      ", "      ", "      "]
};

const standardFont: Record<string, string[]> = {
  'A': [" /\\ ", "/  \\", "|__|", "|  |"],
  'B': ["__  ", "|__) ", "|__) "],
  'C': [" __ ", "/  `", "\\__,"],
  'D': ["__  ", "| \\ ", "|__/"],
  'E': ["___ ", "|__ ", "|___"],
  'F': ["___ ", "|__ ", "|   "],
  'G': [" __ ", "/ _`", "\\__>"],
  'H': ["|__|", "|  |", "|  |"],
  'I': ["|", "|", "|"],
  'J': ["   |", "\\__/"],
  'K': ["|/ ", "|\\ ", "| \\"],
  'L': ["|   ", "|   ", "|___"],
  'M': ["|\\/|", "|  |", "|  |"],
  'N': ["|\\ |", "| \\|", "|  |"],
  'O': [" __ ", "/  \\", "\\__/"],
  'P': ["__  ", "|__) ", "|   "],
  'Q': [" __ ", "/  \\", "\\__X"],
  'R': ["__  ", "|__) ", "| \\ "],
  'S': ["__ ", "(__ ", "__)"],
  'T': ["___", " | ", " | "],
  'U': ["|  |", "|  |", "\\__/"],
  'V': ["\\  /", " \\/ "],
  'W': ["|  |", "|/\\|", "|  |"],
  'X': ["\\/ ", "/\\ ", "   "],
  'Y': ["\\/ ", " | ", " | "],
  'Z': ["__ ", " / ", "/_ "],
  ' ': ["    ", "    ", "    "]
};


const fonts = {
  block: blockFont,
  banner: bannerFont,
  standard: standardFont
};

export function AsciiArtClient() {
  const [text, setText] = useState("HELLO");
  const [font, setFont] = useState<"block" | "banner" | "standard">("block");

  const generateAscii = (input: string, fontType: "block" | "banner" | "standard") => {
    const chars = input.toUpperCase().split('');
    const fontData = fonts[fontType];
    const height = fontData['A'].length;
    let result = '';

    for (let i = 0; i < height; i++) {
      let line = '';
      for (const char of chars) {
        if (fontData[char]) {
          line += fontData[char][i] || ' '.repeat(fontData['A'][i].length);
        } else {
          line += '   ';
        }
        line += ' ';
      }
      result += line + '\n';
    }
    return result;
  };

  const asciiResult = useMemo(() => generateAscii(text.substring(0, 20), font), [text, font]);

  return (
    <div className="space-y-6">
      <ToolPageHeader
        title="ASCII Art Generator"
        description="Convert your text into awesome multi-line ASCII art."
        icon={Type}
        actions={
          <>
            <ResetButton onClick={() => setText("")} label="Clear" />
            <CopyButton getText={() => asciiResult} label="Copy Art" />
          </>
        }
      />

      <GlassCard>
        <CardHeader>
          <CardTitle>Generator Settings</CardTitle>
          <CardDescription>Enter up to 20 characters.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Text (Max 20 chars)</Label>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value.substring(0, 20))}
                placeholder="HELLO"
                maxLength={20}
              />
            </div>
            <div className="space-y-2">
              <Label>Font Style</Label>
              <Select value={font} onValueChange={(val: "block" | "banner" | "standard") => setFont(val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="block">Block</SelectItem>
                  <SelectItem value="banner">Banner</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </GlassCard>

      <GlassCard>
        <CardHeader>
          <CardTitle>Result</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="p-4 bg-muted/50 rounded-lg overflow-x-auto text-xs sm:text-sm font-mono whitespace-pre">
            {asciiResult || "Enter text to generate art"}
          </pre>
        </CardContent>
      </GlassCard>
    </div>
  );
}
