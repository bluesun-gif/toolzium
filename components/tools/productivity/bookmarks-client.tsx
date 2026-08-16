"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Button } from"@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton } from"@/components/shared/action-buttons";
import { ArrowDown, ArrowUp, Bookmark, Download, FolderTree, Link as LinkIcon, Plus, Search, ShieldCheck, Star, Trash2, Upload } from"lucide-react";
import { toast } from"react-hot-toast";

interface BookmarkItem {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
  favorite: boolean;
  dateAdded: number;
}
const DEFAULT_BOOKMARKS: BookmarkItem[] = [{
  id: "1",
  url: "https://toolzium.com",
  title: "Toolzium Web Utilities",
  description: "100+ Free Online Web Tools & Generators",
  category: "Work",
  favorite: true,
  dateAdded: Date.now()
}, {
  id: "2",
  url: "https://github.com",
  title: "GitHub Developer Portal",
  description: "Source Code Management & Version Control",
  category: "Work",
  favorite: false,
  dateAdded: Date.now()
}, {
  id: "3",
  url: "https://nextjs.org",
  title: "Next.js Documentation",
  description: "React Framework for Web Development",
  category: "Personal",
  favorite: true,
  dateAdded: Date.now()
}];
export function BookmarksClient() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(DEFAULT_BOOKMARKS);
  const [categories, setCategories] = useState<string[]>(["General", "Work", "Personal", "Research"]);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const savedBookmarks = localStorage.getItem("bookmarks-items");
    const savedCategories = localStorage.getItem("bookmarks-categories");
    if (savedBookmarks) {
      try {
        const parsed = JSON.parse(savedBookmarks);
        if (Array.isArray(parsed) && parsed.length > 0) setBookmarks(parsed);
      } catch (e) {}
    }
    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories));
      } catch (e) {}
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("bookmarks-items", JSON.stringify(bookmarks));
      localStorage.setItem("bookmarks-categories", JSON.stringify(categories));
    }
  }, [bookmarks, categories]);
  const addBookmark = () => {
    if (!url.trim() || !title.trim()) {
      toast.error("Website title and URL are required.");
      return;
    }
    let finalUrl = url.trim();
    if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
      finalUrl = "https://" + finalUrl;
    }
    const newB: BookmarkItem = {
      id: Date.now().toString(),
      url: finalUrl,
      title: title.trim(),
      description: description.trim(),
      category,
      favorite: false,
      dateAdded: Date.now()
    };
    setBookmarks([newB, ...bookmarks]);
    setUrl("");
    setTitle("");
    setDescription("");
    toast.success("Bookmark saved!");
  };
  const removeBookmark = (id: string) => {
    setBookmarks(bookmarks.filter(b => b.id !== id));
    toast.success("Bookmark removed.");
  };
  const toggleFav = (id: string) => {
    setBookmarks(bookmarks.map(b => b.id === id ? {
      ...b,
      favorite: !b.favorite
    } : b));
  };
  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const newB = [...bookmarks];
    [newB[idx - 1], newB[idx]] = [newB[idx], newB[idx - 1]];
    setBookmarks(newB);
  };
  const moveDown = (idx: number) => {
    if (idx === bookmarks.length - 1) return;
    const newB = [...bookmarks];
    [newB[idx + 1], newB[idx]] = [newB[idx], newB[idx + 1]];
    setBookmarks(newB);
  };
  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bookmarks, null, 2));
    const dlAnchorElem = document.createElement("a");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "toolzium_bookmarks.json");
    dlAnchorElem.click();
    toast.success("Exported bookmarks JSON!");
  };
  const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          setBookmarks(parsed);
          toast.success("Imported bookmarks JSON!");
        }
      } catch (err) {
        toast.error("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
  };
  const handleReset = () => {
    setBookmarks(DEFAULT_BOOKMARKS);
    localStorage.removeItem("bookmarks-items");
    toast.success("Reset bookmarks to defaults!");
  };
  const filtered = bookmarks.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.url.toLowerCase().includes(search.toLowerCase()) || b.category.toLowerCase().includes(search.toLowerCase()));
  return <div className="relative max-w-6xl mx-auto space-y-8"><ToolBackground /><div className="relative z-10">
      

      <ToolPageHeader icon={Bookmark} title="Local Bookmark Manager Studio" description="Organize favorite web links, categorize URLs, reorder lists, and export/import offline JSON bookmark collections." actions={<div className="flex gap-2">
            <ActionButton onClick={exportJSON} icon={Download} label="Export JSON" />
            <div className="relative">
              <input type="file" accept=".json" className="absolute inset-0 opacity-0 cursor-pointer w-full" onChange={importJSON} />
              <ActionButton onClick={() => {}} icon={Upload} label="Import JSON" variant="outline" />
            </div>
            <ResetButton onClick={handleReset} label="Reset" />
          </div>} />

      <div className="grid md:grid-cols-3 gap-6">
        {/* ADD BOOKMARK CARD */}
        <GlassCard className="md:col-span-1 space-y-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Plus className="w-5 h-5 text-primary" /> Add Web Bookmark
            </CardTitle>
            <CardDescription>Save link title, destination URL, and tag category.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="b-title" className="text-xs font-bold">Website Title</Label>
              <Input id="b-title" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Toolzium Home..." className="h-11 font-medium" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="b-url" className="text-xs font-bold">URL Address</Label>
              <Input id="b-url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://toolzium.com" className="h-11 font-mono text-xs" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="b-desc" className="text-xs font-semibold">Description (Optional)</Label>
              <Input id="b-desc" value={description} onChange={e => setDescription(e.target.value)} placeholder="Brief website notes..." className="h-10 text-xs" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Category Tag</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-10 text-xs font-semibold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={addBookmark} className="w-full h-11 font-bold gap-2">
              <Plus className="w-4 h-4" /> Save Bookmark
            </Button>
          </CardContent>
        </GlassCard>

        {/* BOOKMARKS LIST */}
        <GlassCard className="md:col-span-2 space-y-4">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bookmark className="w-5 h-5 text-primary" /> Bookmark Collection ({filtered.length})
              </CardTitle>
              <div className="relative w-full sm:w-56">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter bookmarks..." className="pl-9 h-10 text-xs font-medium" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
              {filtered.map((b, idx) => <div key={b.id} className={cn("flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-xl transition-all gap-3", b.favorite ? "bg-amber-500/10 border-amber-500/30" : "bg-muted/20 border-border/60 hover:bg-muted/40")}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-foreground truncate">
                        <a href={b.url} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1.5">
                          {b.title} <ExternalLink className="w-3.5 h-3.5 opacity-60 shrink-0" />
                        </a>
                      </h4>
                    </div>
                    <p className="text-[11px] font-mono text-muted-foreground truncate mt-0.5">{b.url}</p>
                    {b.description && <p className="text-xs mt-1 text-muted-foreground">{b.description}</p>}
                    <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-md">
                      {b.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => moveUp(idx)} className="h-8 w-8 text-muted-foreground">
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => moveDown(idx)} className="h-8 w-8 text-muted-foreground">
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => toggleFav(b.id)} className="h-8 w-8">
                      <Star className={cn("h-4 w-4", b.favorite ? "fill-amber-400 text-amber-400" : "text-muted-foreground")} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => {
                    navigator.clipboard.writeText(b.url);
                    toast.success("Copied URL to clipboard!");
                  }}>
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => removeBookmark(b.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>)}
              {filtered.length === 0 && <div className="text-center text-muted-foreground text-xs italic py-10 border border-dashed border-border/80 rounded-xl">
                  No bookmarks matching filter query.
                </div>}
            </div>
          </CardContent>
        </GlassCard>
      </div>

      {/* HOW IT WORKS */}
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Add Web Bookmarks",
        description: "Enter title, destination URL, and select custom categories (Work, Personal, Research).",
        icon: Bookmark
      }, {
        step: "02",
        title: "Star & Reorder Links",
        description: "Click the Star icon to pin favorite links to top or use arrow controls to reorder.",
        icon: Star
      }, {
        step: "03",
        title: "Export & Import Backup",
        description: "Download JSON backup files to restore your bookmark manager across browsers.",
        icon: Download
      }]} badges={["JSON Export / Import", "Category Tagging", "Favorite Stars"]} />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides features={[{
        icon: Bookmark,
        title: "Local Bookmark Categorization",
        description: "Sort links into Work, Personal, or Research categories with instant keyword search."
      }, {
        icon: Download,
        title: "JSON Backup & Restore",
        description: "Export and import JSON bookmark collections to transfer links between computers."
      }, {
        icon: Shield,
        title: "100% Confidential Local Storage",
        description: "All link data remains stored in your browser's private local storage."
      }]} />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion faqs={[{
        question: "How do I back up my bookmarks?",
        answer: "Click the 'Export JSON' button at the top to download your complete bookmark library as a .json backup file."
      }, {
        question: "Are my links synced online?",
        answer: "No, all bookmarks are saved strictly in your local browser storage for maximum security."
      }]} />

 const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
 const file = e.target.files?.[0];
 if (!file) return;
 const reader = new FileReader();
 reader.onload = (event) => {
 try {
 const parsed = JSON.parse(event.target?.result as string);
 setBookmarks(parsed);
 toast.success("Imported bookmarks");
 } catch (err) {
 toast.error("Failed to parse JSON");
 }
 };
 reader.readAsText(file);
 };

 const filtered = bookmarks.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.url.toLowerCase().includes(search.toLowerCase()));

 return (
 <div className="space-y-6">
 <ToolPageHeader icon={Bookmark} title="Bookmark Manager"description="Organize your links"actions={
 <div className="flex gap-2">
 <ActionButton onClick={exportJSON} icon={Download} label="Export"/>
 <div className="relative">
 <input type="file"accept=".json"className="absolute inset-0 opacity-0 cursor-pointer"onChange={importJSON} />
 <ActionButton onClick={() => {}} icon={Upload} label="Import"variant="outline"/>
 </div>
 </div>
 } />
 
 <div className="grid md:grid-cols-3 gap-6">
 <GlassCard className="md:col-span-1">
 <CardHeader>
 <CardTitle>Add Bookmark</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Title</Label>
 <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Website Name"/>
 </div>
 <div className="space-y-2">
 <Label>URL</Label>
 <Input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..."/>
 </div>
 <div className="space-y-2">
 <Label>Description</Label>
 <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Optional description"/>
 </div>
 <div className="space-y-2">
 <Label>Category</Label>
 <Select value={category} onValueChange={setCategory}>
 <SelectTrigger>
 <SelectValue placeholder="Category"/>
 </SelectTrigger>
 <SelectContent>
 {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 <Button onClick={addBookmark} className="w-full"><Plus className="w-4 h-4 mr-2"/> Add</Button>
 </CardContent>
 </GlassCard>

 <GlassCard className="md:col-span-2">
 <CardHeader>
 <div className="flex justify-between items-center">
 <CardTitle>My Bookmarks</CardTitle>
 <div className="relative w-48">
 <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
 <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."className="pl-8"/>
 </div>
 </div>
 </CardHeader>
 <CardContent>
 <div className="space-y-4 max-h-[600px] overflow-y-auto">
 {filtered.map((b, idx) => (
 <div key={b.id} className={"flex items-center justify-between p-4 border rounded-lg"+ (b.favorite ?"bg-secondary/30":"")}>
 <div className="flex-1 min-w-0">
 <h4 className="font-semibold truncate">
 <a href={b.url} target="_blank"rel="noreferrer"className="hover:underline">{b.title}</a>
 </h4>
 <p className="text-xs text-muted-foreground truncate">{b.url}</p>
 {b.description && <p className="text-sm mt-1 text-muted-foreground">{b.description}</p>}
 <span className="inline-block mt-2 text-xs bg-secondary px-2 py-1 rounded">{b.category}</span>
 </div>
 <div className="flex items-center gap-2 ml-4">
 <Button variant="ghost"size="icon"onClick={() => moveUp(idx)}><ArrowUp className="h-4 w-4"/></Button>
 <Button variant="ghost"size="icon"onClick={() => moveDown(idx)}><ArrowDown className="h-4 w-4"/></Button>
 <Button variant="ghost"size="icon"onClick={() => toggleFav(b.id)}>
 <Star className={"h-4 w-4"+ (b.favorite ?"fill-yellow-400 text-yellow-400":"")} />
 </Button>
 <Button variant="ghost"size="icon"onClick={() => { navigator.clipboard.writeText(b.url); toast.success("Copied!"); }}><LinkIcon className="h-4 w-4"/></Button>
 <Button variant="ghost"size="icon"onClick={() => removeBookmark(b.id)}><Trash2 className="h-4 w-4 text-red-500"/></Button>
 </div>
 </div>
 ))}
 {filtered.length === 0 && <p className="text-center text-muted-foreground py-8">No bookmarks found.</p>}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Add Link",
    description:"Save a URL with notes.",
    icon: Bookmark,
  },
{
    step:"02",
    title:"Organize",
    description:"Group into folders.",
    icon: FolderTree,
  },
{
    step:"03",
    title:"Search",
    description:"Find saved links fast.",
    icon: Search,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Bookmark,
    title:"Save",
    description:"Quick add.",
  },
{
    icon: FolderTree,
    title:"Folders",
    description:"Structure links.",
  },
{
    icon: Search,
    title:"Find",
    description:"Instant lookup.",
  },
{
    icon: ShieldCheck,
    title:"Private",
    description:"Local storage.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A bookmark manager organizes saved links beyond the browser's limited bar, with folders and search so nothing is lost. Heavy readers accumulate hundreds of bookmarks; structure makes them usable. This tool handles saving, grouping, and finding.</p>
  <p>Search is the payoff. Recalling a link by topic beats scrolling a long list. Local storage keeps data private without accounts.</p>
  <p>Use it as your link hub. The tool's value is a searchable, private bookmark system.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why a manager?",
    answer:"Tames browser bookmark chaos.",
  },
{
    question:"Sync?",
    answer:"Local, no account.",
  },
{
    question:"Search?",
    answer:"Yes, by text.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Private?",
    answer:"On device.",
  }
  ]}
/>
</div>
 );
}
