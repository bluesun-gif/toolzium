"use client";

import { useState, useEffect, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { BookOpen, Plus, Star, Search, Download, Trash2, Edit } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface ReadingItem {
  id: string;
  title: string;
  author: string;
  type: string;
  status: string;
  rating: number;
  notes: string;
  dateAdded: string;
}

export function ReadingListClient() {
  const [items, setItems] = useState<ReadingItem[]>([]);
  
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [type, setType] = useState("Book");
  const [status, setStatus] = useState("To Read");
  const [rating, setRating] = useState("0");
  const [notes, setNotes] = useState("");

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("Date Added");

  useEffect(() => {
    const saved = localStorage.getItem("toolzium_reading_list");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveToLocal = (data: ReadingItem[]) => {
    setItems(data);
    localStorage.setItem("toolzium_reading_list", JSON.stringify(data));
  };

  const handleAdd = () => {
    if (!title) {
      toast.error("Please enter a title");
      return;
    }
    const newItem: ReadingItem = {
      id: Math.random().toString(36).substring(7),
      title,
      author,
      type,
      status,
      rating: parseInt(rating),
      notes,
      dateAdded: new Date().toISOString(),
    };
    saveToLocal([newItem, ...items]);
    setTitle("");
    setAuthor("");
    setNotes("");
    setRating("0");
    toast.success("Item added to list");
  };

  const handleDelete = (id: string) => {
    saveToLocal(items.filter(i => i.id !== id));
    toast.success("Item deleted");
  };
  
  const handleStatusChange = (id: string, newStatus: string) => {
    saveToLocal(items.map(i => i.id === id ? { ...i, status: newStatus } : i));
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to delete all items?")) {
      saveToLocal([]);
      toast.success("List cleared");
    }
  };

  const handleExport = () => {
    if (items.length === 0) {
      toast.error("No data to export");
      return;
    }
    const text = items.map(i => `${i.title} by ${i.author || "Unknown"}\nType: ${i.type}\nStatus: ${i.status}\nRating: ${i.rating}/5\nNotes: ${i.notes}\n`).join("\n---\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reading-list.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported to text file");
  };

  const filteredItems = useMemo(() => {
    let result = items;
    if (filterStatus !== "All") {
      result = result.filter(i => i.status === filterStatus);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(i => i.title.toLowerCase().includes(q) || i.author.toLowerCase().includes(q));
    }
    return [...result].sort((a, b) => {
      if (sortOrder === "Title") return a.title.localeCompare(b.title);
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    });
  }, [items, filterStatus, search, sortOrder]);

  const stats = useMemo(() => {
    const total = items.length;
    const completed = items.filter(i => i.status === "Completed").length;
    const reading = items.filter(i => i.status === "Reading").length;
    return { total, completed, reading };
  }, [items]);

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={BookOpen}
        title="Reading List Manager"
        description="Track your books, articles, and reading progress."
        actions={
          <>
            <ActionButton onClick={handleExport} icon={Download} label="Export" />
            <ResetButton onClick={handleReset} label="Clear All" />
          </>
        }
      />

      <div className="grid md:grid-cols-3 gap-6">
        <GlassCard className="md:col-span-1">
          <CardHeader>
            <CardTitle>Add New Item</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input placeholder="Book or article title" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Author</Label>
              <Input placeholder="Author name" value={author} onChange={e => setAuthor(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Book">Book</SelectItem>
                    <SelectItem value="Article">Article</SelectItem>
                    <SelectItem value="Paper">Paper</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="To Read">To Read</SelectItem>
                    <SelectItem value="Reading">Reading</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {status === "Completed" && (
              <div className="space-y-2">
                <Label>Rating (0-5)</Label>
                <Select value={rating} onValueChange={setRating}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[0,1,2,3,4,5].map(n => (
                      <SelectItem key={n} value={n.toString()}>{n} Star{n!==1&&"s"}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="space-y-2">
              <Label>Notes (Optional)</Label>
              <Input placeholder="Thoughts, quotes..." value={notes} onChange={e => setNotes(e.target.value)} />
            </div>
            <Button onClick={handleAdd} className="w-full gap-2">
              <Plus className="w-4 h-4" /> Add to List
            </Button>
          </CardContent>
        </GlassCard>

        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <GlassCard>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{stats.total}</span>
                <span className="text-sm text-muted-foreground">Total Items</span>
              </CardContent>
            </GlassCard>
            <GlassCard>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-amber-500">{stats.reading}</span>
                <span className="text-sm text-muted-foreground">In Progress</span>
              </CardContent>
            </GlassCard>
            <GlassCard>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-green-500">{stats.completed}</span>
                <span className="text-sm text-muted-foreground">Completed</span>
              </CardContent>
            </GlassCard>
          </div>

          <GlassCard>
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <CardTitle>My List</CardTitle>
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <div className="relative flex-1 md:w-48">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="To Read">To Read</SelectItem>
                      <SelectItem value="Reading">Reading</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Date Added">Latest</SelectItem>
                      <SelectItem value="Title">Title</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredItems.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">No items match your criteria.</div>
              ) : (
                <div className="space-y-4">
                  {filteredItems.map(item => (
                    <div key={item.id} className="p-4 rounded-lg border bg-card flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-lg">{item.title}</h4>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            {item.type}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">by {item.author || "Unknown"}</p>
                        {item.status === "Completed" && item.rating > 0 && (
                          <div className="flex items-center gap-1 text-amber-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={cn("w-3 h-3", i < item.rating ? "fill-current" : "opacity-30")} />
                            ))}
                          </div>
                        )}
                        {item.notes && <p className="text-sm mt-2 p-2 bg-muted rounded-md">{item.notes}</p>}
                      </div>
                      <div className="flex sm:flex-col items-center gap-2">
                        <Select value={item.status} onValueChange={(val) => handleStatusChange(item.id, val)}>
                          <SelectTrigger className="h-8 w-[110px] text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="To Read">To Read</SelectItem>
                            <SelectItem value="Reading">Reading</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="h-8 w-8 text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
