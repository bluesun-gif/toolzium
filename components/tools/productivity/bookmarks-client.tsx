"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton } from "@/components/shared/action-buttons";
import { Bookmark, Plus, Search, Download, ArrowUp, ArrowDown, Star, Link as LinkIcon, Trash2, Upload } from "lucide-react";
import { toast } from "react-hot-toast";

interface BookmarkItem {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
  favorite: boolean;
  dateAdded: number;
}

export function BookmarksClient() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [categories, setCategories] = useState<string[]>(["General", "Work", "Personal"]);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarks-items");
    const savedCategories = localStorage.getItem("bookmarks-categories");
    if (savedBookmarks) {
      try { setBookmarks(JSON.parse(savedBookmarks)); } catch (e) { console.error(e); }
    }
    if (savedCategories) {
      try { setCategories(JSON.parse(savedCategories)); } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarks-items", JSON.stringify(bookmarks));
    localStorage.setItem("bookmarks-categories", JSON.stringify(categories));
  }, [bookmarks, categories]);

  const addBookmark = () => {
    if (!url || !title) {
      toast.error("URL and Title are required");
      return;
    }
    const newB: BookmarkItem = { id: Date.now().toString(), url, title, description, category, favorite: false, dateAdded: Date.now() };
    setBookmarks([...bookmarks, newB]);
    setUrl("");
    setTitle("");
    setDescription("");
    toast.success("Bookmark added");
  };

  const removeBookmark = (id: string) => {
    setBookmarks(bookmarks.filter(b => b.id !== id));
    toast.success("Bookmark removed");
  };

  const toggleFav = (id: string) => {
    setBookmarks(bookmarks.map(b => b.id === id ? { ...b, favorite: !b.favorite } : b));
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
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bookmarks));
    const dlAnchorElem = document.createElement("a");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "bookmarks.json");
    dlAnchorElem.click();
    toast.success("Exported bookmarks");
  };

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
      <ToolPageHeader icon={Bookmark} title="Bookmark Manager" description="Organize your links" actions={
        <div className="flex gap-2">
          <ActionButton onClick={exportJSON} icon={Download} label="Export" />
          <div className="relative">
            <input type="file" accept=".json" className="absolute inset-0 opacity-0 cursor-pointer" onChange={importJSON} />
            <ActionButton onClick={() => {}} icon={Upload} label="Import" variant="outline" />
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
              <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Website Name" />
            </div>
            <div className="space-y-2">
              <Label>URL</Label>
              <Input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Optional description" />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={addBookmark} className="w-full"><Plus className="w-4 h-4 mr-2" /> Add</Button>
          </CardContent>
        </GlassCard>

        <GlassCard className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>My Bookmarks</CardTitle>
              <div className="relative w-48">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="pl-8" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {filtered.map((b, idx) => (
                <div key={b.id} className={"flex items-center justify-between p-4 border rounded-lg " + (b.favorite ? "bg-secondary/30" : "")}>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">
                      <a href={b.url} target="_blank" rel="noreferrer" className="hover:underline">{b.title}</a>
                    </h4>
                    <p className="text-xs text-muted-foreground truncate">{b.url}</p>
                    {b.description && <p className="text-sm mt-1 text-muted-foreground">{b.description}</p>}
                    <span className="inline-block mt-2 text-xs bg-secondary px-2 py-1 rounded">{b.category}</span>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="ghost" size="icon" onClick={() => moveUp(idx)}><ArrowUp className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => moveDown(idx)}><ArrowDown className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => toggleFav(b.id)}>
                      <Star className={"h-4 w-4 " + (b.favorite ? "fill-yellow-400 text-yellow-400" : "")} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => { navigator.clipboard.writeText(b.url); toast.success("Copied!"); }}><LinkIcon className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => removeBookmark(b.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && <p className="text-center text-muted-foreground py-8">No bookmarks found.</p>}
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
