"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { CircleDot, Download, GitBranch, Lightbulb, MousePointerClick, MoveRight, Network, Plus, Save, Trash2 } from"lucide-react";
import toast from"react-hot-toast";

type MindMapNode = {
 id: string;
 text: string;
 color: string;
 children: MindMapNode[];
 isExpanded: boolean;
};

const DEFAULT_MAP: MindMapNode = {
 id:"root",
 text:"Central Topic",
 color:"#3b82f6",
 children: [],
 isExpanded: true,
};

const COLORS = ["#3b82f6","#ef4444","#10b981","#f59e0b","#8b5cf6","#ec4899","#64748b"];

export function MindMapClient() {
 const [root, setRoot] = useState<MindMapNode>(DEFAULT_MAP);
 const [selectedId, setSelectedId] = useState<string>("root");
 
 useEffect(() => {
 const saved = localStorage.getItem("mindmap_data");
 if (saved) {
 try {
 setRoot(JSON.parse(saved));
 } catch (e) {
 // ignore
 }
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
 for (let child of node.children) {
 if (updateNode(child, id, updater)) return true;
 }
 return false;
 };

 const findAndAddChild = (node: MindMapNode, targetId: string): boolean => {
 if (node.id === targetId) {
 const newChild: MindMapNode = {
 id:"node_"+ Date.now() +"_"+ Math.floor(Math.random() * 1000),
 text:"New Node",
 color: COLORS[Math.floor(Math.random() * COLORS.length)],
 children: [],
 isExpanded: true
 };
 node.children.push(newChild);
 node.isExpanded = true;
 return true;
 }
 for (let child of node.children) {
 if (findAndAddChild(child, targetId)) return true;
 }
 return false;
 };

 const findAndDelete = (node: MindMapNode, targetId: string): boolean => {
 const index = node.children.findIndex(c => c.id === targetId);
 if (index !== -1) {
 node.children.splice(index, 1);
 return true;
 }
 for (let child of node.children) {
 if (findAndDelete(child, targetId)) return true;
 }
 return false;
 };

 const findNode = (node: MindMapNode, targetId: string): MindMapNode | null => {
 if (node.id === targetId) return node;
 for (let child of node.children) {
 const found = findNode(child, targetId);
 if (found) return found;
 }
 return null;
 };

 const handleAddChild = () => {
 const newRoot = JSON.parse(JSON.stringify(root));
 if (findAndAddChild(newRoot, selectedId)) {
 saveToLocal(newRoot);
 }
 };

 const handleDelete = () => {
 if (selectedId ==="root") {
 toast.error("Cannot delete root node");
 return;
 }
 const newRoot = JSON.parse(JSON.stringify(root));
 if (findAndDelete(newRoot, selectedId)) {
 saveToLocal(newRoot);
 setSelectedId("root");
 }
 };

 const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
 const newRoot = JSON.parse(JSON.stringify(root));
 updateNode(newRoot, selectedId, (n) => { n.text = e.target.value; });
 saveToLocal(newRoot);
 };

 const handleChangeColor = (c: string) => {
 const newRoot = JSON.parse(JSON.stringify(root));
 updateNode(newRoot, selectedId, (n) => { n.color = c; });
 saveToLocal(newRoot);
 };

 const toggleExpand = (id: string, e: React.MouseEvent) => {
 e.stopPropagation();
 const newRoot = JSON.parse(JSON.stringify(root));
 updateNode(newRoot, id, (n) => { n.isExpanded = !n.isExpanded; });
 saveToLocal(newRoot);
 };

 const generateOutline = (node: MindMapNode, depth: number = 0): string => {
 let out ="".repeat(depth) +"-"+ node.text +"\n";
 if (node.isExpanded) {
 for (let child of node.children) {
 out += generateOutline(child, depth + 1);
 }
 }
 return out;
 };

 const exportJson = () => {
 const blob = new Blob([JSON.stringify(root, null, 2)], { type:"application/json"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download ="mindmap.json";
 a.click();
 toast.success("Exported JSON");
 };

 const renderNode = (node: MindMapNode) => {
 const isSelected = node.id === selectedId;
 return (
 <div key={node.id} className="flex flex-col items-center">
 <div className="flex items-center gap-4">
 <div 
 onClick={() => setSelectedId(node.id)}
 className={"relative p-3 rounded-lg cursor-pointer border-2 transition-all min-w-[120px] text-center shadow-sm"+ (isSelected ?"ring-2 ring-ring ring-offset-2":"")}
 style={{ backgroundColor: node.color +"20", borderColor: node.color, color:"var(--foreground)"}}
 >
 <div className="font-medium truncate max-w-[200px]">{node.text ||"Empty"}</div>
 {node.children.length > 0 && (
 <button 
 onClick={(e) => toggleExpand(node.id, e)}
 className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background border flex items-center justify-center text-xs shadow-sm hover:bg-muted"
 style={{ borderColor: node.color }}
 >
 {node.isExpanded ?"-":"+"}
 </button>
 )}
 </div>
 </div>
 
 {node.isExpanded && node.children.length > 0 && (
 <div className="flex gap-4 mt-6 relative pt-4">
 <div className="absolute top-0 left-1/2 w-px h-4 -translate-x-1/2"style={{ backgroundColor: node.color }} />
 <div className="absolute top-4 left-0 right-0 h-px"style={{ backgroundColor: node.color }} />
 {node.children.map(child => (
 <div key={child.id} className="relative pt-4">
 <div className="absolute top-0 left-1/2 w-px h-4 -translate-x-1/2"style={{ backgroundColor: node.color }} />
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
 <div className="space-y-6">
 <ToolPageHeader 
 icon={Network} 
 title="Mind Map Builder"
 description="Visualize your ideas with an interactive mind map."
 actions={
 <>
 <ActionButton onClick={exportJson} icon={Download} label="Export JSON"/>
 <ResetButton onClick={() => saveToLocal(DEFAULT_MAP)} label="Clear All"/>
 </>
 }
 />

 <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
 <GlassCard className="lg:col-span-3 overflow-hidden flex flex-col h-[600px]">
 <CardHeader>
 <CardTitle className="flex justify-between items-center text-sm font-normal text-muted-foreground">
 <span>Canvas (Drag to scroll)</span>
 </CardTitle>
 </CardHeader>
 <CardContent className="flex-1 overflow-auto bg-muted/10 relative p-8 cursor-grab active:cursor-grabbing rounded-b-xl border-t">
 <div className="min-w-max min-h-max p-8 flex justify-center items-start">
 {renderNode(root)}
 </div>
 </CardContent>
 </GlassCard>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><MousePointerClick className="w-5 h-5"/> Editor</CardTitle>
 <CardDescription>Select a node to edit</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 {selectedNode ? (
 <>
 <div className="space-y-2">
 <label className="text-sm font-medium">Node Text</label>
 <Input value={selectedNode.text} onChange={handleChangeText} placeholder="Enter text..."/>
 </div>
 
 <div className="space-y-2">
 <label className="text-sm font-medium">Color</label>
 <div className="flex flex-wrap gap-2">
 {COLORS.map(c => (
 <button
 key={c}
 onClick={() => handleChangeColor(c)}
 className={"w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"+ (selectedNode.color === c ?"ring-2 ring-ring ring-offset-2":"")}
 style={{ backgroundColor: c, borderColor: c }}
 />
 ))}
 </div>
 </div>

 <div className="flex flex-col gap-2 pt-2 border-t">
 <Button onClick={handleAddChild} className="w-full justify-start"variant="secondary">
 <Plus className="w-4 h-4 mr-2"/> Add Child Node
 </Button>
 <Button onClick={handleDelete} className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-500/10"variant="ghost"disabled={selectedId ==="root"}>
 <Trash2 className="w-4 h-4 mr-2"/> Delete Node
 </Button>
 </div>
 </>
 ) : (
 <div className="text-sm text-muted-foreground text-center py-4">Click a node on the canvas</div>
 )}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Export</CardTitle>
 </CardHeader>
 <CardContent>
 <CopyButton getText={() => generateOutline(root)} label="Copy as Text Outline"/>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Add Node",
    description:"Create a central idea.",
    icon: CircleDot,
  },
{
    step:"02",
    title:"Branch",
    description:"Add connected nodes.",
    icon: GitBranch,
  },
{
    step:"03",
    title:"Arrange",
    description:"Position and link.",
    icon: MoveRight,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: CircleDot,
    title:"Nodes",
    description:"Ideas.",
  },
{
    icon: GitBranch,
    title:"Branches",
    description:"Sub-ideas.",
  },
{
    icon: MoveRight,
    title:"Arrange",
    description:"Layout freely.",
  },
{
    icon: Lightbulb,
    title:"Brainstorm",
    description:"Non-linear thinking.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A mind map builder supports non-linear thinking, linking ideas radially from a center. Unlike outlines, maps reveal relationships and spark association. This tool lets you add and arrange nodes.</p>
  <p>Branching captures related thoughts without forcing order. The visual form aids recall and planning.</p>
  <p>Use it to brainstorm or plan. The tool's value is a flexible idea map that outlines can't match.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is a mind map?",
    answer:"Radial diagram of ideas.",
  },
{
    question:"Use case?",
    answer:"Brainstorming, planning.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Private?",
    answer:"Local.",
  },
{
    question:"Export?",
    answer:"Save your map.",
  }
  ]}
/>
</div>
 );
}
