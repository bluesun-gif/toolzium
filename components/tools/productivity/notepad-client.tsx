"use client";

import React, { useState, useEffect, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, X, Download, Copy, Trash2, Type, FileText, CheckCircle2, Clock, Shield, BookOpen, Layers } from"lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface Note {
  id: string;
  name: string;
  content: string;
  updatedAt: number;
}

const DEFAULT_NOTE: Note = {
  id: "note-1",
  name: "Welcome Note",
  content: "Welcome to Toolzium Online Notepad!\n\nThis is a free, secure, and private browser-based text editor with tab management and real-time auto-save.\n\nKey Features:\n- Multi-tab document editing\n- Real-time word, character, and line counting\n- Monospace vs Sans-serif font switching\n- Local storage persistence and text file export",
  updatedAt: Date.now(),
};

export function NotepadClient() {
  const [notes, setNotes] = useState<Note[]>([DEFAULT_NOTE]);
  const [activeNoteId, setActiveNoteId] = useState<string>("note-1");
  const [isMonospace, setIsMonospace] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [saveStatus, setSaveStatus] = useState<"Saved" | "Saving..." | "Unsaved">("Saved");
  const [mounted, setMounted] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("toolflux_notepad_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setNotes(parsed);
          setActiveNoteId(parsed[0].id);
        }
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (!mounted || notes.length === 0) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    setSaveStatus("Saving...");
    saveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem("toolflux_notepad_data", JSON.stringify(notes));
      setSaveStatus("Saved");
    }, 1200);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [notes]);

  const createNewNote = () => {
    const newNote: Note = {
      id: Math.random().toString(),
      name: `Untitled ${notes.length + 1}`,
      content: "",
      updatedAt: Date.now(),
    };
    setNotes((prev) => [...prev, newNote]);
    setActiveNoteId(newNote.id);
    toast.success("Created new note tab!");
  };

  const closeNote = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newNotes = notes.filter((n) => n.id !== id);
    if (newNotes.length === 0) {
      const freshNote: Note = {
        id: Math.random().toString(),
        name: "Untitled Note",
        content: "",
        updatedAt: Date.now(),
      };
      setNotes([freshNote]);
      setActiveNoteId(freshNote.id);
    } else {
      setNotes(newNotes);
      if (activeNoteId === id) {
        setActiveNoteId(newNotes[newNotes.length - 1].id);
      }
    }
    toast.success("Closed note tab.");
  };

  const updateContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSaveStatus("Unsaved");
    setNotes((prev) =>
      prev.map((note) =>
        note.id === activeNoteId ? { ...note, content: e.target.value, updatedAt: Date.now() } : note
      )
    );
  };

  const updateNoteName = (id: string, newName: string) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, name: newName || "Untitled Note" } : note))
    );
  };

  const activeNote = notes.find((n) => n.id === activeNoteId) || notes[0];

  const getWordCount = (text: string) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  const getCharCount = (text: string) => {
    return text.length;
  };

  const getLineCount = (text: string) => {
    return text === "" ? 0 : text.split("\n").length;
  };

  const handleDownload = () => {
    if (!activeNote) return;
    const blob = new Blob([activeNote.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeNote.name.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded text file!");
  };

  const handleCopy = () => {
    if (!activeNote) return;
    navigator.clipboard.writeText(activeNote.content);
    toast.success("Copied note text to clipboard!");
  };

  const handleClear = () => {
    if (!activeNote || activeNote.content === "") return;
    setNotes((prev) =>
      prev.map((note) => (note.id === activeNoteId ? { ...note, content: "", updatedAt: Date.now() } : note))
    );
    textareaRef.current?.focus();
    toast.success("Cleared note content.");
  };
  return (
    <div className="relative max-w-6xl mx-auto space-y-8">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

      <ToolPageHeader
        icon={FileText}
        title="Online Notepad & Multi-Tab Text Editor Studio"
        description="Free, secure online text editor with multi-tab support, real-time auto-save, monospace code view, and instant TXT file downloads."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleDownload} className="font-bold gap-1.5">
              <Download className="h-4 w-4" /> Download .txt
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopy} className="font-bold gap-1.5">
              <Copy className="h-4 w-4" /> Copy All
            </Button>
          </div>
        }
      />

      <GlassCard className="overflow-hidden flex flex-col min-h-[580px]">
        {/* TOOLBAR */}
        <div className="bg-muted/40 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-border/60">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleDownload} className="h-8 px-2.5 text-xs font-bold gap-1.5">
              <Download className="h-3.5 w-3.5" /> Download
            </Button>
            <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 px-2.5 text-xs font-bold gap-1.5">
              <Copy className="h-3.5 w-3.5" /> Copy
            </Button>
            <Button variant="ghost" size="sm" onClick={handleClear} className="h-8 px-2.5 text-xs font-bold text-destructive hover:bg-destructive/10 gap-1.5">
              <Trash2 className="h-3.5 w-3.5" /> Clear
            </Button>
          </div>

          <div className="flex items-center gap-4 border-l border-border/60 pl-4">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setFontSize(Math.max(12, fontSize - 2))} title="Decrease Font Size">
                <Type className="h-3 w-3" />
              </Button>
              <span className="text-xs font-mono font-bold text-muted-foreground w-5 text-center">{fontSize}</span>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setFontSize(Math.min(32, fontSize + 2))} title="Increase Font Size">
                <Type className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="monospace" className="text-xs font-bold cursor-pointer">Mono</Label>
              <Switch id="monospace" checked={isMonospace} onCheckedChange={setIsMonospace} className="scale-75" />
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="flex items-center overflow-x-auto bg-muted/20 border-b border-border/60">
          {notes.map((note) => (
            <div
              key={note.id}
              className={cn(
                "group flex items-center min-w-[140px] max-w-[200px] h-10 px-3 cursor-pointer border-r border-border/60 transition-colors border-t-2",
                activeNoteId === note.id
                  ? "bg-background border-t-primary text-foreground font-bold"
                  : "bg-transparent border-t-transparent text-muted-foreground hover:bg-muted/30"
              )}
              onClick={() => setActiveNoteId(note.id)}
            >
              <FileText className="h-3.5 w-3.5 mr-2 opacity-70 shrink-0 text-primary" />
              <input
                className="bg-transparent border-none outline-none text-xs truncate w-full cursor-pointer focus:cursor-text font-bold"
                value={note.name}
                onChange={(e) => updateNoteName(note.id, e.target.value)}
                onClick={(e) => {
                  if (activeNoteId !== note.id) e.preventDefault();
                }}
              />
              <button
                className="ml-1 opacity-0 group-hover:opacity-100 p-1 hover:bg-muted rounded-md transition-all shrink-0"
                onClick={(e) => closeNote(e, note.id)}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <button
            className="h-10 px-3 text-muted-foreground hover:bg-muted/40 hover:text-foreground transition-colors border-r border-border/60 flex items-center justify-center shrink-0"
            onClick={createNewNote}
            title="New Note Tab"
          >
            <Plus className="h-4 w-4 text-primary" />
          </button>
        </div>

        {/* EDITOR AREA */}
        <CardContent className="p-0 flex-1 flex flex-col relative bg-background">
          <textarea
            ref={textareaRef}
            className={cn(
              "w-full flex-1 p-6 resize-none outline-none bg-transparent text-foreground leading-relaxed",
              isMonospace ? "font-mono" : "font-sans"
            )}
            style={{ fontSize: `${fontSize}px` }}
            value={activeNote?.content || ""}
            onChange={updateContent}
            placeholder="Start typing your note here..."
            spellCheck={false}
          />
        </CardContent>

        {/* STATUS FOOTER */}
        <div className="bg-muted/40 text-muted-foreground text-xs px-4 py-2 border-t border-border/60 flex flex-wrap items-center justify-between gap-4 font-mono font-medium">
          <div className="flex items-center gap-4">
            <span>{getWordCount(activeNote?.content || "")} words</span>
            <span>{getCharCount(activeNote?.content || "")} chars</span>
            <span>{getLineCount(activeNote?.content || "")} lines</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-bold">
              {saveStatus === "Saved" ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              ) : saveStatus === "Saving..." ? (
                <Clock className="h-3.5 w-3.5 text-primary animate-spin" />
              ) : (
                <div className="h-2 w-2 rounded-full bg-amber-500 mx-1" />
              )}
              {saveStatus}
            </span>
            <span className="opacity-40">|</span>
            <span className="hidden sm:inline">
              Last saved: {activeNote ? new Date(activeNote.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
            </span>
          </div>
        </div>
      </GlassCard>

      {/* HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Multi-Tab Editing",
            description: "Click the + button to open multiple document tabs simultaneously.",
            icon: FileText,
          },
          {
            step: "02",
            title: "Real-Time Auto Save",
            description: "Changes persist automatically to local storage as you type.",
            icon: CheckCircle2,
          },
          {
            step: "03",
            title: "Download & Export",
            description: "Download your notes as formatted .txt files anytime with one click.",
            icon: Download,
          },
        ]}
        badges={["Multi-Tab Notes", "Real-Time Auto-Save", "TXT Export"]}
      />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: FileText,
            title: "Multi-Document Tab Interface",
            description: "Manage multiple notes side-by-side with tab rename and close controls.",
          },
          {
            icon: Type,
            title: "Custom Monospace & Font Sizing",
            description: "Adjust editor font size and toggle monospace code formatting.",
          },
          {
            icon: Shield,
            title: "100% Private Browser Storage",
            description: "All document text remains strictly in local browser storage.",
          },
        ]}
      />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "Are my notes saved automatically?",
            answer: "Yes, changes are auto-saved to local browser storage 1 second after you stop typing.",
          },
          {
            question: "Can I export my notes as files?",
            answer: "Yes, click the 'Download .txt' button to save the current note as a text file.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/productivity/notepad" max={6} />
    </div>
  );
}
