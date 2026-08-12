"use client";

import React, { useState, useEffect, useRef } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { Card, CardContent } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Plus, X, Download, Copy, Trash2, Type, FileText, CheckCircle2, Clock } from"lucide-react";
import { Switch } from"@/components/ui/switch";
import { Label } from"@/components/ui/label";
import toast from"react-hot-toast";

interface Note {
 id: string;
 name: string;
 content: string;
 updatedAt: number;
}

export default function NotepadClient() {
 const [notes, setNotes] = useState<Note[]>([]);
 const [activeNoteId, setActiveNoteId] = useState<string>("");
 const [isMonospace, setIsMonospace] = useState(false);
 const [fontSize, setFontSize] = useState(16);
 const [saveStatus, setSaveStatus] = useState<"Saved"|"Saving..."|"Unsaved">("Saved");
 const [isLoaded, setIsLoaded] = useState(false);
 
 const textareaRef = useRef<HTMLTextAreaElement>(null);
 const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

 useEffect(() => {
 // Load from local storage on mount
 const saved = localStorage.getItem("toolflux_notepad_data");
 if (saved) {
 try {
 const parsed = JSON.parse(saved);
 if (parsed.length > 0) {
 setNotes(parsed);
 setActiveNoteId(parsed[0].id);
 } else {
 createNewNote();
 }
 } catch (e) {
 createNewNote();
 }
 } else {
 createNewNote();
 }
 setIsLoaded(true);
 }, []);

 useEffect(() => {
 // Auto-save effect
 if (!isLoaded || notes.length === 0) return;

 if (saveTimeoutRef.current) {
 clearTimeout(saveTimeoutRef.current);
 }
 
 setSaveStatus("Saving...");
 saveTimeoutRef.current = setTimeout(() => {
 localStorage.setItem("toolflux_notepad_data", JSON.stringify(notes));
 setSaveStatus("Saved");
 }, 1500);

 return () => {
 if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
 };
 }, [notes, isLoaded]);

 const createNewNote = () => {
 const newNote: Note = {
 id: crypto.randomUUID(),
 name:"Untitled Note",
 content:"",
 updatedAt: Date.now(),
 };
 setNotes(prev => [...prev, newNote]);
 setActiveNoteId(newNote.id);
 };

 const closeNote = (e: React.MouseEvent, id: string) => {
 e.stopPropagation();
 const note = notes.find(n => n.id === id);
 if (note && note.content.trim() !=="") {
 if (!window.confirm("This note has content. Are you sure you want to close and delete it?")) {
 return;
 }
 }

 const newNotes = notes.filter(n => n.id !== id);
 if (newNotes.length === 0) {
 // Create a fresh one if we deleted the last
 const newNote: Note = {
 id: crypto.randomUUID(),
 name:"Untitled Note",
 content:"",
 updatedAt: Date.now(),
 };
 setNotes([newNote]);
 setActiveNoteId(newNote.id);
 } else {
 setNotes(newNotes);
 if (activeNoteId === id) {
 setActiveNoteId(newNotes[newNotes.length - 1].id);
 }
 }
 };

 const updateContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
 setSaveStatus("Unsaved");
 setNotes(prev => prev.map(note => 
 note.id === activeNoteId 
 ? { ...note, content: e.target.value, updatedAt: Date.now() } 
 : note
 ));
 };

 const updateNoteName = (id: string, newName: string) => {
 setNotes(prev => prev.map(note => 
 note.id === id ? { ...note, name: newName ||"Untitled Note"} : note
 ));
 };

 const activeNote = notes.find(n => n.id === activeNoteId);

 const getWordCount = (text: string) => {
 return text.trim() ? text.trim().split(/\\s+/).length : 0;
 };

 const getCharCount = (text: string) => {
 return text.length;
 };

 const getLineCount = (text: string) => {
 return text ===""? 0 : text.split('\n').length;
 };

 const handleDownload = () => {
 if (!activeNote) return;
 const blob = new Blob([activeNote.content], { type:"text/plain"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download = `\${activeNote.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
 a.click();
 URL.revokeObjectURL(url);
 toast.success("File downloaded!");
 };

 const handleCopy = () => {
 if (!activeNote) return;
 navigator.clipboard.writeText(activeNote.content);
 toast.success("Copied to clipboard!");
 };

 const handleClear = () => {
 if (!activeNote || activeNote.content ==="") return;
 if (window.confirm("Are you sure you want to clear all text in this note?")) {
 setNotes(prev => prev.map(note => 
 note.id === activeNoteId ? { ...note, content:"", updatedAt: Date.now() } : note
 ));
 textareaRef.current?.focus();
 }
 };

 if (!isLoaded) return <div className="h-96 flex items-center justify-center">Loading...</div>;

 return (
 <div className="mx-auto max-w-5xl px-4 py-8">
 <ToolPageHeader
 title="Online Notepad"
 description="Free, secure online text editor with auto-save and tab support."
 />

 <Card className="mt-8 overflow-hidden flex flex-col border-zinc-200 dark:border-zinc-800 shadow-lg"style={{ minHeight: '600px' }}>
 
 {/* Toolbar */}
 <div className="bg-zinc-100 dark:bg-zinc-900 px-4 py-2 flex flex-wrap items-center justify-between gap-2 border-b">
 <div className="flex items-center gap-2">
 <Button variant="ghost"size="sm"onClick={handleDownload} title="Download .txt"className="h-8 px-2 text-muted-foreground hover:text-foreground">
 <Download className="h-4 w-4 mr-1.5"/> <span className="hidden sm:inline">Download</span>
 </Button>
 <Button variant="ghost"size="sm"onClick={handleCopy} title="Copy All"className="h-8 px-2 text-muted-foreground hover:text-foreground">
 <Copy className="h-4 w-4 mr-1.5"/> <span className="hidden sm:inline">Copy</span>
 </Button>
 <Button variant="ghost"size="sm"onClick={handleClear} title="Clear Text"className="h-8 px-2 text-muted-foreground hover:text-red-500">
 <Trash2 className="h-4 w-4 mr-1.5"/> <span className="hidden sm:inline">Clear</span>
 </Button>
 </div>
 
 <div className="flex items-center gap-4 border-l pl-4 dark:border-zinc-800">
 <div className="flex items-center gap-1.5">
 <Button variant="ghost"size="icon"className="h-7 w-7"onClick={() => setFontSize(Math.max(12, fontSize - 2))} title="Decrease Font Size">
 <Type className="h-3 w-3"/>
 </Button>
 <span className="text-xs text-muted-foreground w-4 text-center">{fontSize}</span>
 <Button variant="ghost"size="icon"className="h-7 w-7"onClick={() => setFontSize(Math.min(32, fontSize + 2))} title="Increase Font Size">
 <Type className="h-4 w-4"/>
 </Button>
 </div>
 <div className="flex items-center gap-2">
 <Label htmlFor="monospace"className="text-xs cursor-pointer">Mono</Label>
 <Switch id="monospace"checked={isMonospace} onCheckedChange={setIsMonospace} className="scale-75"/>
 </div>
 </div>
 </div>

 {/* Tabs */}
 <div className="flex items-center overflow-x-auto bg-zinc-50 dark:bg-zinc-950 border-b custom-scrollbar">
 {notes.map(note => (
 <div
 key={note.id}
 className={"group flex items-center min-w-[120px] max-w-[200px] h-10 px-3 cursor-pointer border-r border-t-2 transition-colors \\"+ (activeNoteId === note.id 
 ? 'bg-background dark:bg-zinc-900 border-t-primary text-foreground' 
 : 'bg-transparent border-t-transparent text-muted-foreground hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50')}
 onClick={() => setActiveNoteId(note.id)}
 >
 <FileText className="h-3.5 w-3.5 mr-2 opacity-70 shrink-0"/>
 <input
 className="bg-transparent border-none outline-none text-sm truncate w-full cursor-pointer focus:cursor-text"
 value={note.name}
 onChange={(e) => updateNoteName(note.id, e.target.value)}
 onClick={(e) => {
 if (activeNoteId !== note.id) e.preventDefault();
 }}
 />
 <button 
 className="ml-1 opacity-0 group-hover:opacity-100 p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-sm transition-all"
 onClick={(e) => closeNote(e, note.id)}
 >
 <X className="h-3.5 w-3.5"/>
 </button>
 </div>
 ))}
 <button 
 className="h-10 px-3 text-muted-foreground hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 hover:text-foreground transition-colors border-r flex items-center justify-center shrink-0"
 onClick={createNewNote}
 title="New Note"
 >
 <Plus className="h-4 w-4"/>
 </button>
 </div>

 {/* Editor */}
 <CardContent className="p-0 flex-1 flex flex-col relative bg-background dark:bg-zinc-900">
 <textarea
 ref={textareaRef}
 className={"w-full flex-1 p-6 resize-none outline-none bg-transparent \\"+ (isMonospace ? 'font-mono' : 'font-sans')}
 style={{ fontSize: `\${fontSize}px`, lineHeight: '1.6' }}
 value={activeNote?.content ||""}
 onChange={updateContent}
 placeholder="Start typing your notes here..."
 spellCheck="false"
 />
 </CardContent>

 {/* Status bar */}
 <div className="bg-zinc-100 dark:bg-zinc-950 text-muted-foreground text-xs px-4 py-2 border-t flex flex-wrap items-center justify-between">
 <div className="flex items-center gap-4">
 <span>{getWordCount(activeNote?.content ||"")} words</span>
 <span>{getCharCount(activeNote?.content ||"")} chars</span>
 <span>{getLineCount(activeNote?.content ||"")} lines</span>
 </div>
 <div className="flex items-center gap-3">
 <span className="flex items-center gap-1">
 {saveStatus ==="Saved"? (
 <CheckCircle2 className="h-3.5 w-3.5 text-green-500"/>
 ) : saveStatus ==="Saving..."? (
 <Clock className="h-3.5 w-3.5 text-primary"/>
 ) : (
 <div className="h-2 w-2 rounded-full bg-yellow-500 mx-1"/>
 )}
 {saveStatus}
 </span>
 <span className="opacity-50 hidden sm:inline">|</span>
 <span className="hidden sm:inline">
 Last updated: {activeNote ? new Date(activeNote.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
 </span>
 </div>
 </div>
 </Card>
 </div>
 );
}
