"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Network, Plus, Trash2, Download, MousePointerClick, Shield, BookOpen, Layers, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

type MindMapNode = {
  id: string;
  text: string;
  color: string;
  children: MindMapNode[];
  isExpanded: boolean;
};

const DEFAULT_MAP: MindMapNode = {
  id: "root",
  text: "Central Business Strategy",
  color: "#3b82f6",
  isExpanded: true,
  children: [
    {
      id: "child-1",
      text: "Product Development",
      color: "#10b981",
      isExpanded: true,
      children: [
        { id: "child-1-1", text: "UX Overhaul", color: "#10b981", children: [], isExpanded: true },
        { id: "child-1-2", text: "API Integration", color: "#10b981", children: [], isExpanded: true },
      ],
    },
    {
      id: "child-2",
      text: "Marketing & Growth",
      color: "#ec4899",
      isExpanded: true,
      children: [
        { id: "child-2-1", text: "SEO Optimization", color: "#ec4899", children: [], isExpanded: true },
        { id: "child-2-2", text: "Social Campaigns", color: "#ec4899", children: [], isExpanded: true },
      ],
    },
  ],
};

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#64748b"];

export function MindMapClient() {
  const [root, setRoot] = useState<MindMapNode>(DEFAULT_MAP);
  const [selectedId, setSelectedId] = useState<string>("root");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const saved = localStorage.getItem("mindmap_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id) setRoot(parsed);
      } catch (e) {}
    }
  }, []);

  const saveToLocal = (newRoot: MindMapNode) => {
    setRoot(newRoot);
    localStorage.setItem("mindmap_data", JSON.stringify(newRoot));
  };

  const updateNode = (node: MindMapNode, id: string, updater: (n: MindMapNode) => void): boolean => {
    if (node.id === id) {
      updater(node);
      return true;
    }
    for (const child of node.children) {
      if (updateNode(child, id, updater)) return true;
    }
    return false;
  };

  const findAndAddChild = (node: MindMapNode, targetId: string): boolean => {
    if (node.id === targetId) {
      const newChild: MindMapNode = {
        id: "node_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
        text: "New Sub-Topic",
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        children: [],
        isExpanded: true,
      };
      node.children.push(newChild);
      node.isExpanded = true;
      return true;
    }
    for (const child of node.children) {
      if (findAndAddChild(child, targetId)) return true;
    }
    return false;
  };

  const findAndDelete = (node: MindMapNode, targetId: string): boolean => {
    const index = node.children.findIndex((c) => c.id === targetId);
    if (index !== -1) {
      node.children.splice(index, 1);
      return true;
    }
    for (const child of node.children) {
      if (findAndDelete(child, targetId)) return true;
    }
    return false;
  };

  const findNode = (node: MindMapNode, targetId: string): MindMapNode | null => {
    if (node.id === targetId) return node;
    for (const child of node.children) {
      const found = findNode(child, targetId);
      if (found) return found;
    }
    return null;
  };

  const handleAddChild = () => {
    const newRoot = JSON.parse(JSON.stringify(root));
    if (findAndAddChild(newRoot, selectedId)) {
      saveToLocal(newRoot);
      toast.success("Added sub-topic node!");
    }
  };

  const handleDelete = () => {
    if (selectedId === "root") {
      toast.error("Cannot delete root node.");
      return;
    }
    const newRoot = JSON.parse(JSON.stringify(root));
    if (findAndDelete(newRoot, selectedId)) {
      saveToLocal(newRoot);
      setSelectedId("root");
      toast.success("Node deleted.");
    }
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRoot = JSON.parse(JSON.stringify(root));
    updateNode(newRoot, selectedId, (n) => {
      n.text = e.target.value;
    });
    saveToLocal(newRoot);
  };

  const handleChangeColor = (c: string) => {
    const newRoot = JSON.parse(JSON.stringify(root));
    updateNode(newRoot, selectedId, (n) => {
      n.color = c;
    });
    saveToLocal(newRoot);
  };

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newRoot = JSON.parse(JSON.stringify(root));
    updateNode(newRoot, id, (n) => {
      n.isExpanded = !n.isExpanded;
    });
    saveToLocal(newRoot);
  };

  const generateOutline = (node: MindMapNode, depth: number = 0): string => {
    let out = "  ".repeat(depth) + "- " + node.text + "\n";
    if (node.isExpanded) {
      for (const child of node.children) {
        out += generateOutline(child, depth + 1);
      }
    }
    return out;
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(root, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mindmap_export.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported Mind Map JSON!");
  };

  const renderNode = (node: MindMapNode) => {
    const isSelected = node.id === selectedId;
    return (
      <div key={node.id} className="flex flex-col items-center">
        <div className="flex items-center gap-4">
          <div
            onClick={() => setSelectedId(node.id)}
            className={cn(
              "relative p-3 rounded-xl cursor-pointer border-2 transition-all min-w-[140px] text-center shadow-md font-bold text-xs select-none",
              isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105" : "hover:scale-102"
            )}
            style={{ backgroundColor: `${node.color}25`, borderColor: node.color, color: "var(--foreground)" }}
          >
            <div className="truncate max-w-[200px] leading-tight text-foreground font-semibold">{node.text || "Empty Node"}</div>
            {node.children.length > 0 && (
              <button
                onClick={(e) => toggleExpand(node.id, e)}
                className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background border flex items-center justify-center text-xs font-black shadow-md hover:bg-muted text-foreground"
                style={{ borderColor: node.color }}
                title={node.isExpanded ? "Collapse" : "Expand"}
              >
                {node.isExpanded ? "-" : "+"}
              </button>
            )}
          </div>
        </div>

        {node.isExpanded && node.children.length > 0 && (
          <div className="flex gap-6 mt-8 relative pt-4">
            <div className="absolute top-0 left-1/2 w-px h-4 -translate-x-1/2" style={{ backgroundColor: node.color }} />
            <div className="absolute top-4 left-0 right-0 h-px" style={{ backgroundColor: node.color }} />
            {node.children.map((child) => (
              <div key={child.id} className="relative pt-4">
                <div className="absolute top-0 left-1/2 w-px h-4 -translate-x-1/2" style={{ backgroundColor: node.color }} />
                {renderNode(child)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const selectedNode = findNode(root, selectedId);
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
        icon={Network}
        title="Interactive Mind Map Builder Studio"
        description="Visualize ideas, brain-storm business structures, and map out project nodes in a canvas interface."
        actions={
          <div className="flex gap-2">
            <ActionButton onClick={exportJson} icon={Download} label="Export JSON" variant="outline" />
            <ResetButton onClick={() => saveToLocal(DEFAULT_MAP)} label="Clear All" />
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* CANVAS DISPLAY */}
        <GlassCard className="lg:col-span-3 overflow-hidden flex flex-col min-h-[550px]">
          <CardHeader className="pb-3 border-b border-border/60">
            <CardTitle className="flex justify-between items-center text-sm font-bold text-muted-foreground">
              <span>Interactive Mind Map Canvas (Click node to edit)</span>
              <span className="text-xs text-primary font-bold">Selected: {selectedNode?.text || "Root"}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto bg-muted/20 relative p-8 cursor-grab active:cursor-grabbing rounded-b-xl border-t border-border/60">
            <div className="min-w-max min-h-max p-8 flex justify-center items-start">
              {renderNode(root)}
            </div>
          </CardContent>
        </GlassCard>

        {/* NODE EDITOR PANEL */}
        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MousePointerClick className="w-5 h-5 text-primary" /> Node Inspector
              </CardTitle>
              <CardDescription>Edit text, change color tags, or add sub-topics.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedNode ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="node-text">Node Text</Label>
                    <Input
                      id="node-text"
                      value={selectedNode.text}
                      onChange={handleChangeText}
                      placeholder="Enter node text..."
                      className="h-10 text-xs font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Node Color Tag</Label>
                    <div className="flex flex-wrap gap-2">
                      {COLORS.map((c) => (
                        <button
                          key={c}
                          onClick={() => handleChangeColor(c)}
                          className={cn(
                            "w-7 h-7 rounded-full border-2 transition-transform hover:scale-110",
                            selectedNode.color === c ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110" : ""
                          )}
                          style={{ backgroundColor: c, borderColor: c }}
                          title={`Color ${c}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-3 border-t border-border/60">
                    <Button onClick={handleAddChild} className="w-full justify-start gap-2 font-bold h-10" variant="secondary">
                      <Plus className="w-4 h-4 text-primary" /> Add Sub-Topic Node
                    </Button>
                    <Button
                      onClick={handleDelete}
                      className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 h-10 font-bold"
                      variant="ghost"
                      disabled={selectedId === "root"}
                    >
                      <Trash2 className="w-4 h-4" /> Delete Node
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-xs text-muted-foreground text-center py-4">Click a node on the canvas to edit.</div>
              )}
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold">Text Outline Export</CardTitle>
            </CardHeader>
            <CardContent>
              <CopyButton getText={() => generateOutline(root)} label="Copy as Markdown Outline" />
            </CardContent>
          </GlassCard>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Select Any Node",
            description: "Click on any node in the interactive canvas to open its Inspector panel.",
            icon: MousePointerClick,
          },
          {
            step: "02",
            title: "Add & Edit Sub-Topics",
            description: "Edit titles, assign custom colors, and click 'Add Sub-Topic Node' to expand your tree.",
            icon: Plus,
          },
          {
            step: "03",
            title: "Export & Collapse",
            description: "Collapse sub-branches or export your mind map to JSON / Markdown text outlines.",
            icon: Network,
          },
        ]}
        badges={["Interactive Canvas", "Color-Coded Nodes", "Markdown Outline Export"]}
      />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: Network,
            title: "Visual Tree Representation",
            description: "Renders hierarchical connector lines and expanding/collapsing node branches.",
          },
          {
            icon: MousePointerClick,
            title: "Real-Time Node Inspector",
            description: "Edit text and color palettes instantly with instant live canvas updates.",
          },
          {
            icon: Shield,
            title: "Local Storage Save",
            description: "Saves mind map structures automatically to local storage with offline JSON export.",
          },
        ]}
      />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "Can I expand or collapse mind map branches?",
            answer: "Yes! Click the +/- icon on any parent node to collapse or expand its sub-tree branches.",
          },
          {
            question: "Is my mind map data saved?",
            answer: "Yes, all mind maps persist in your browser's local storage and can be exported as JSON or Markdown outline files.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/productivity/mind-map" max={6} />
    </div>
  );
}
