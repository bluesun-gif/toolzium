"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Keyboard, Code, Copy, History } from "lucide-react";
import toast from "react-hot-toast";

type KeyEventData = {
  key: string;
  code: string;
  keyCode: number;
  location: number;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  metaKey: boolean;
  repeat: boolean;
  isComposing: boolean;
  timestamp: number;
};

export function KeycodeInfoClient() {
  const [lastEvent, setLastEvent] = useState<KeyEventData | null>(null);
  const [history, setHistory] = useState<KeyEventData[]>([]);
  const [recording, setRecording] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!recording) return;
      e.preventDefault();
      
      const newEvent: KeyEventData = {
        key: e.key,
        code: e.code,
        keyCode: e.keyCode,
        location: e.location,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
        metaKey: e.metaKey,
        repeat: e.repeat,
        isComposing: e.isComposing,
        timestamp: Date.now(),
      };
      
      setLastEvent(newEvent);
      setHistory(prev => [newEvent, ...prev].slice(0, 50));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [recording]);

  const clearHistory = () => {
    setHistory([]);
    setLastEvent(null);
    toast.success("History cleared");
  };
  
  const getSnippet = () => {
    if (!lastEvent) return "";
    return "window.addEventListener('keydown', (e) => {\n  if (e.key === '" + lastEvent.key + "') {\n    console.log('Key pressed');\n  }\n});";
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader 
        icon={Keyboard} 
        title="Keycode & Keyboard Event Viewer" 
        description="Press any key to inspect JavaScript keyboard event properties." 
        actions={
          <React.Fragment>
            <ActionButton onClick={() => setRecording(!recording)} icon={Code} label={recording ? "Stop Recording" : "Start Recording"} />
            <ResetButton onClick={clearHistory} label="Clear History" />
          </React.Fragment>
        } 
      />
      
      <GlassCard>
        <CardHeader>
          <CardTitle>Main Event Properties</CardTitle>
          <CardDescription>Press any key inside or outside the input</CardDescription>
        </CardHeader>
        <CardContent>
          {!lastEvent ? (
             <div className="flex items-center justify-center h-48 border-2 border-dashed rounded-xl">
               <p className="text-muted-foreground text-lg">Press any key to begin</p>
             </div>
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
               <div className="p-6 bg-primary/10 rounded-xl">
                 <p className="text-sm text-muted-foreground mb-2">e.key</p>
                 <p className="text-4xl font-bold">{lastEvent.key === " " ? "(Space)" : lastEvent.key}</p>
               </div>
               <div className="p-6 bg-primary/10 rounded-xl">
                 <p className="text-sm text-muted-foreground mb-2">e.code</p>
                 <p className="text-4xl font-bold">{lastEvent.code}</p>
               </div>
               <div className="p-6 bg-primary/10 rounded-xl">
                 <p className="text-sm text-muted-foreground mb-2">e.keyCode (Deprecated)</p>
                 <p className="text-4xl font-bold">{lastEvent.keyCode}</p>
               </div>
             </div>
          )}
          
          {lastEvent && (
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">e.location</p>
                <p className="font-mono">{lastEvent.location}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Modifiers</p>
                <div className="flex gap-2 font-mono text-sm">
                  <span className={lastEvent.ctrlKey ? "text-primary font-bold" : "text-muted-foreground"}>Ctrl</span>
                  <span className={lastEvent.shiftKey ? "text-primary font-bold" : "text-muted-foreground"}>Shift</span>
                  <span className={lastEvent.altKey ? "text-primary font-bold" : "text-muted-foreground"}>Alt</span>
                  <span className={lastEvent.metaKey ? "text-primary font-bold" : "text-muted-foreground"}>Meta</span>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">e.repeat</p>
                <p className="font-mono">{lastEvent.repeat ? "true" : "false"}</p>
              </div>
              <div className="p-4 border rounded-lg flex justify-between items-center">
                 <div>
                   <p className="text-xs text-muted-foreground mb-1">Code Snippet</p>
                   <p className="font-mono text-xs">addEventListener</p>
                 </div>
                 <CopyButton getText={getSnippet} label="" />
              </div>
            </div>
          )}
        </CardContent>
      </GlassCard>

      <GlassCard>
        <CardHeader>
          <CardTitle>Event History</CardTitle>
          <CardDescription>Recent keyboard events (up to 50)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                <tr>
                  <th className="px-4 py-2">Key</th>
                  <th className="px-4 py-2">Code</th>
                  <th className="px-4 py-2">KeyCode</th>
                  <th className="px-4 py-2">Modifiers</th>
                </tr>
              </thead>
              <tbody>
                {history.map((ev, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-4 py-2 font-mono">{ev.key === " " ? "Space" : ev.key}</td>
                    <td className="px-4 py-2 font-mono">{ev.code}</td>
                    <td className="px-4 py-2 font-mono">{ev.keyCode}</td>
                    <td className="px-4 py-2 font-mono text-xs">
                      {[ev.ctrlKey && "Ctrl", ev.shiftKey && "Shift", ev.altKey && "Alt", ev.metaKey && "Meta"].filter(Boolean).join(" + ") || "-"}
                    </td>
                  </tr>
                ))}
                {history.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No events recorded yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </GlassCard>
    </div>
  );
}
