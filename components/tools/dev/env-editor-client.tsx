"use client";

import { useState, useMemo, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FileCode, Plus, Copy, Download, Trash2, Edit2, AlertCircle } from "lucide-react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { cn } from "@/lib/utils";

interface EnvVar {
  id: string;
  key: string;
  value: string;
  comment?: string;
  isComment: boolean;
}

export function EnvEditorClient() {
  const [envItems, setEnvItems] = useState<EnvVar[]>([]);
  const [rawText, setRawText] = useState("");
  const [isTableView, setIsTableView] = useState(true);

  // Parse raw text into structured items
  const parseEnv = (text: string) => {
    const lines = text.split('\n');
    const newItems: EnvVar[] = [];
    
    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) return;
      
      if (trimmed.startsWith('#')) {
        newItems.push({
          id: `comment-${index}`,
          key: '',
          value: '',
          comment: trimmed.substring(1).trim(),
          isComment: true
        });
      } else {
        const separatorIdx = trimmed.indexOf('=');
        if (separatorIdx !== -1) {
          let k = trimmed.substring(0, separatorIdx).trim();
          let v = trimmed.substring(separatorIdx + 1).trim();
          // Remove surrounding quotes if they exist symmetrically
          if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
             v = v.substring(1, v.length - 1);
          }
          newItems.push({
            id: `var-${index}`,
            key: k,
            value: v,
            isComment: false
          });
        }
      }
    });
    setEnvItems(newItems);
  };

  const handleRawTextChange = (val: string) => {
    setRawText(val);
    parseEnv(val);
  };

  const generateEnvText = (items: EnvVar[]) => {
    return items.map(item => {
      if (item.isComment) {
        return `# ${item.comment}`;
      }
      // Simple quoting if value contains spaces
      const safeValue = item.value.includes(' ') ? `"${item.value}"` : item.value;
      return `${item.key}=${safeValue}`;
    }).join('\n');
  };

  // Sync to raw text when items change in table view
  useEffect(() => {
    if (isTableView) {
      setRawText(generateEnvText(envItems));
    }
  }, [envItems, isTableView]);

  const handleAddItem = () => {
    setEnvItems([...envItems, { id: `var-${Date.now()}`, key: '', value: '', isComment: false }]);
  };

  const handleAddComment = () => {
    setEnvItems([...envItems, { id: `comment-${Date.now()}`, key: '', value: '', comment: '', isComment: true }]);
  };

  const handleRemoveItem = (id: string) => {
    setEnvItems(envItems.filter(item => item.id !== id));
  };

  const handleUpdateItem = (id: string, field: keyof EnvVar, value: string) => {
    setEnvItems(envItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const duplicateKeys = useMemo(() => {
    const keys = envItems.filter(i => !i.isComment && i.key.trim()).map(i => i.key.trim());
    const duplicates = new Set<string>();
    const seen = new Set<string>();
    
    keys.forEach(k => {
      if (seen.has(k)) duplicates.add(k);
      seen.add(k);
    });
    return Array.from(duplicates);
  }, [envItems]);

  const handleExportJSON = () => {
    const obj: Record<string, string> = {};
    envItems.forEach(item => {
      if (!item.isComment && item.key.trim()) {
        obj[item.key.trim()] = item.value;
      }
    });
    
    const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'env-export.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported to JSON");
  };

  const handleClear = () => {
    setEnvItems([]);
    setRawText("");
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={FileCode}
        title="Environment Variables Editor"
        description="Visual editor for .env files. Manage, validate, and format your environment variables easily."
        actions={
          <>
            <ActionButton onClick={handleExportJSON} icon={Download} label="Export JSON" />
            <ResetButton onClick={handleClear} label="Clear All" />
          </>
        }
      />

      <GlassCard>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Editor</CardTitle>
            <CardDescription>
              {duplicateKeys.length > 0 ? (
                <span className="text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> 
                  Found {duplicateKeys.length} duplicate key(s): {duplicateKeys.join(', ')}
                </span>
              ) : (
                "Manage your variables"
              )}
            </CardDescription>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Label htmlFor="view-mode">Table View</Label>
              <Switch id="view-mode" checked={isTableView} onCheckedChange={setIsTableView} />
            </div>
            <CopyButton getText={() => rawText} label="Copy .env" />
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          {!isTableView ? (
            <textarea
              className="w-full min-h-[400px] p-4 rounded-md border bg-background font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={rawText}
              onChange={(e) => handleRawTextChange(e.target.value)}
              placeholder="PORT=3000\n# Database Config\nDB_URL=postgresql://..."
            />
          ) : (
            <div className="space-y-4">
              <div className="flex gap-2 mb-4">
                <Button onClick={handleAddItem} variant="outline" size="sm" className="gap-2">
                  <Plus className="w-4 h-4" /> Add Variable
                </Button>
                <Button onClick={handleAddComment} variant="outline" size="sm" className="gap-2">
                  <Plus className="w-4 h-4" /> Add Comment
                </Button>
              </div>

              {envItems.length === 0 ? (
                <div className="text-center p-8 border border-dashed rounded-md text-muted-foreground">
                  No variables added yet. Add one or paste raw text.
                </div>
              ) : (
                <div className="space-y-2">
                  {envItems.map((item) => (
                    <div key={item.id} className="flex gap-2 items-start group">
                      {item.isComment ? (
                        <div className="flex-1 flex gap-2">
                           <div className="pt-2 text-muted-foreground font-mono">#</div>
                           <Input 
                              value={item.comment || ''} 
                              onChange={(e) => handleUpdateItem(item.id, 'comment', e.target.value)}
                              placeholder="Comment..."
                              className="text-muted-foreground border-dashed bg-muted/20"
                           />
                        </div>
                      ) : (
                        <>
                          <div className="flex-1">
                            <Input 
                              value={item.key} 
                              onChange={(e) => handleUpdateItem(item.id, 'key', e.target.value)}
                              placeholder="KEY"
                              className={cn(
                                "font-mono", 
                                duplicateKeys.includes(item.key.trim()) && item.key.trim() ? "border-destructive focus-visible:ring-destructive" : ""
                              )}
                            />
                          </div>
                          <div className="pt-2 text-muted-foreground font-mono">=</div>
                          <div className="flex-[2]">
                            <Input 
                              value={item.value} 
                              onChange={(e) => handleUpdateItem(item.id, 'value', e.target.value)}
                              placeholder="value"
                              className="font-mono"
                            />
                          </div>
                        </>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </GlassCard>
    </div>
  );
}
