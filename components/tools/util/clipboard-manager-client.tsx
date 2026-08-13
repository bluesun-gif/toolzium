"use client";

import { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { cn } from"@/lib/utils";
import { Clipboard, Search, Star, FolderOpen, Plus, Trash2, ArrowUp, ArrowDown, Download, Upload } from"lucide-react";
import toast from"react-hot-toast";

interface Snippet {
 id: string;
 title: string;
 content: string;
 folder: string;
 isPinned: boolean;
 timestamp: number;
}

export function ClipboardManagerClient() {
 const [snippets, setSnippets] = useState<Snippet[]>([]);
 const [search, setSearch] = useState("");
 const [title, setTitle] = useState("");
 const [content, setContent] = useState("");
 const [folder, setFolder] = useState("");
 const [isClient, setIsClient] = useState(false);

 useEffect(() => {
 setIsClient(true);
 const saved = localStorage.getItem("tz-clipboard-manager");
 if (saved) {
 try {
 setSnippets(JSON.parse(saved));
 } catch (e) {
 console.error(e);
 }
 }
 }, []);

 useEffect(() => {
 if (typeof window !== "undefined") {
 localStorage.setItem("tz-clipboard-manager", JSON.stringify(snippets));
 }
 }, [snippets]);

 const addSnippet = () => {
 if (!content.trim()) {
 toast.error("Content is required");
 return;
 }
 const newSnippet: Snippet = {
 id: crypto.randomUUID(),
 title: title.trim() ||"Untitled",
 content,
 folder: folder.trim() ||"Uncategorized",
 isPinned: false,
 timestamp: Date.now()
 };
 setSnippets([newSnippet, ...snippets]);
 setTitle("");
 setContent("");
 toast.success("Snippet added");
 };

 const deleteSnippet = (id: string) => {
 setSnippets(snippets.filter(s => s.id !== id));
 toast.success("Snippet deleted");
 };

 const togglePin = (id: string) => {
 setSnippets(snippets.map(s => s.id === id ? { ...s, isPinned: !s.isPinned } : s));
 };

 const moveUp = (index: number) => {
 if (index === 0) return;
 const newSnippets = [...snippets];
 const temp = newSnippets[index];
 newSnippets[index] = newSnippets[index - 1];
 newSnippets[index - 1] = temp;
 setSnippets(newSnippets);
 };

 const moveDown = (index: number) => {
 if (index === snippets.length - 1) return;
 const newSnippets = [...snippets];
 const temp = newSnippets[index];
 newSnippets[index] = newSnippets[index + 1];
 newSnippets[index + 1] = temp;
 setSnippets(newSnippets);
 };

 const exportData = () => {
 const blob = new Blob([JSON.stringify(snippets, null, 2)], { type:"application/json"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download ="clipboard-snippets.json";
 a.click();
 URL.revokeObjectURL(url);
 toast.success("Exported");
 };

 const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
 const file = e.target.files?.[0];
 if (!file) return;
 const reader = new FileReader();
 reader.onload = (event) => {
 try {
 const imported = JSON.parse(event.target?.result as string);
 if (Array.isArray(imported)) {
 setSnippets(imported);
 toast.success("Imported successfully");
 }
 } catch (err) {
 toast.error("Invalid JSON file");
 }
 };
 reader.readAsText(file);
 };

 const filteredSnippets = snippets.filter(s => 
 s.title.toLowerCase().includes(search.toLowerCase()) || 
 s.content.toLowerCase().includes(search.toLowerCase()) ||
 s.folder.toLowerCase().includes(search.toLowerCase())
 ).sort((a, b) => {
 if (a.isPinned === b.isPinned) return 0;
 return a.isPinned ? -1 : 1;
 });

 return (
 <div className="space-y-6">
 <ToolPageHeader 
 icon={Clipboard} 
 title="Clipboard Manager"
 description="Save, manage, and organize clipboard snippets"
 actions={
 <>
 <ActionButton onClick={() => document.getElementById("import-file")?.click()} icon={Upload} label="Import"/>
 <input id="import-file"type="file"accept=".json"className="hidden"onChange={importData} />
 <ActionButton onClick={exportData} icon={Download} label="Export"/>
 <ResetButton onClick={() => setSnippets([])} label="Clear All"/>
 </>
 }
 />
 
 <div className="grid md:grid-cols-3 gap-6">
 <GlassCard className="md:col-span-1">
 <CardHeader>
 <CardTitle>Add Snippet</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Title</Label>
 <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Email Signature"/>
 </div>
 <div className="space-y-2">
 <Label>Folder / Category</Label>
 <Input value={folder} onChange={(e) => setFolder(e.target.value)} placeholder="e.g. Work"/>
 </div>
 <div className="space-y-2">
 <Label>Content</Label>
 <textarea 
 className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
 value={content} 
 onChange={(e) => setContent(e.target.value)} 
 placeholder="Paste text here..."
 />
 </div>
 <Button className="w-full"onClick={addSnippet}><Plus className="w-4 h-4 mr-2"/> Add Snippet</Button>
 </CardContent>
 </GlassCard>

 <GlassCard className="md:col-span-2">
 <CardHeader>
 <CardTitle>Your Snippets</CardTitle>
 <div className="relative">
 <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
 <Input 
 className="pl-9"
 placeholder="Search snippets..."
 value={search} 
 onChange={(e) => setSearch(e.target.value)} 
 />
 </div>
 </CardHeader>
 <CardContent className="space-y-4">
 {filteredSnippets.length === 0 ? (
 <p className="text-muted-foreground text-center py-8">No snippets found.</p>
 ) : (
 filteredSnippets.map((snippet, idx) => (
 <div key={snippet.id} className="p-4 border rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
 <div className="flex justify-between items-start mb-2">
 <div className="flex items-center gap-2">
 <Button variant="ghost"size="icon"className="h-8 w-8"onClick={() => togglePin(snippet.id)}>
 <Star className={cn("w-4 h-4", snippet.isPinned ?"fill-primary text-primary":"text-muted-foreground")} />
 </Button>
 <div>
 <h4 className="font-medium">{snippet.title}</h4>
 <div className="flex items-center gap-2 text-xs text-muted-foreground">
 <span className="flex items-center gap-1"><FolderOpen className="w-3 h-3"/> {snippet.folder}</span>
 <span>•</span>
 <span>{snippet.content.length} chars</span>
 <span>•</span>
 <span>{new Date(snippet.timestamp).toLocaleDateString()}</span>
 </div>
 </div>
 </div>
 <div className="flex items-center gap-1">
 <Button variant="ghost"size="icon"className="h-8 w-8"onClick={() => moveUp(idx)} disabled={search !==""|| idx === 0}><ArrowUp className="w-4 h-4"/></Button>
 <Button variant="ghost"size="icon"className="h-8 w-8"onClick={() => moveDown(idx)} disabled={search !==""|| idx === filteredSnippets.length - 1}><ArrowDown className="w-4 h-4"/></Button>
 <CopyButton getText={() => snippet.content} label=""/>
 <Button variant="ghost"size="icon"className="h-8 w-8 text-destructive"onClick={() => deleteSnippet(snippet.id)}><Trash2 className="w-4 h-4"/></Button>
 </div>
 </div>
 <pre className="text-sm bg-muted/50 p-2 rounded whitespace-pre-wrap font-sans mt-2 line-clamp-3">
 {snippet.content}
 </pre>
 </div>
 ))
 )}
 </CardContent>
 </GlassCard>
 </div>
 </div>
 );
}
