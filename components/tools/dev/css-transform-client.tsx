"use client";

import React, { useState } from"react";
import { Box, Sliders, Copy, RefreshCw } from"lucide-react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";

export function CssTransformClient() {
 const [rotateX, setRotateX] = useState("0");
 const [rotateY, setRotateY] = useState("0");
 const [rotateZ, setRotateZ] = useState("0");
 const [scaleX, setScaleX] = useState("1");
 const [scaleY, setScaleY] = useState("1");
 const [scaleZ, setScaleZ] = useState("1");
 const [skewX, setSkewX] = useState("0");
 const [skewY, setSkewY] = useState("0");
 const [translateX, setTranslateX] = useState("0");
 const [translateY, setTranslateY] = useState("0");
 const [translateZ, setTranslateZ] = useState("0");
 const [perspective, setPerspective] = useState("1000");
 const [transformOrigin, setTransformOrigin] = useState("center");

 const resetAll = () => {
 setRotateX("0");
 setRotateY("0");
 setRotateZ("0");
 setScaleX("1");
 setScaleY("1");
 setScaleZ("1");
 setSkewX("0");
 setSkewY("0");
 setTranslateX("0");
 setTranslateY("0");
 setTranslateZ("0");
 setPerspective("1000");
 setTransformOrigin("center");
 };

 const transformStyle ="perspective("+ perspective +"px) rotateX("+ rotateX +"deg) rotateY("+ rotateY +"deg) rotateZ("+ rotateZ +"deg) scaleX("+ scaleX +") scaleY("+ scaleY +") scaleZ("+ scaleZ +") skewX("+ skewX +"deg) skewY("+ skewY +"deg) translateX("+ translateX +"px) translateY("+ translateY +"px) translateZ("+ translateZ +"px)";
 
 const cssCode ="transform:"+ transformStyle +";\ntransform-origin:"+ transformOrigin +";";

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Box}
 title="CSS 3D Transform Generator"
 description="Interactive 3D CSS transform generator with live preview."
 actions={<ResetButton onClick={resetAll} label="Reset"/>}
 />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Controls</CardTitle>
 <CardDescription>Adjust sliders to see 3D transforms</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-3 gap-4">
 <div className="space-y-2">
 <Label>Rotate X (deg)</Label>
 <Input type="range"min="-360"max="360"value={rotateX} onChange={(e) => setRotateX(e.target.value)} />
 <div className="text-xs text-center">{rotateX}</div>
 </div>
 <div className="space-y-2">
 <Label>Rotate Y (deg)</Label>
 <Input type="range"min="-360"max="360"value={rotateY} onChange={(e) => setRotateY(e.target.value)} />
 <div className="text-xs text-center">{rotateY}</div>
 </div>
 <div className="space-y-2">
 <Label>Rotate Z (deg)</Label>
 <Input type="range"min="-360"max="360"value={rotateZ} onChange={(e) => setRotateZ(e.target.value)} />
 <div className="text-xs text-center">{rotateZ}</div>
 </div>
 </div>

 <div className="grid grid-cols-3 gap-4">
 <div className="space-y-2">
 <Label>Scale X</Label>
 <Input type="range"min="0"max="3"step="0.1"value={scaleX} onChange={(e) => setScaleX(e.target.value)} />
 <div className="text-xs text-center">{scaleX}</div>
 </div>
 <div className="space-y-2">
 <Label>Scale Y</Label>
 <Input type="range"min="0"max="3"step="0.1"value={scaleY} onChange={(e) => setScaleY(e.target.value)} />
 <div className="text-xs text-center">{scaleY}</div>
 </div>
 <div className="space-y-2">
 <Label>Scale Z</Label>
 <Input type="range"min="0"max="3"step="0.1"value={scaleZ} onChange={(e) => setScaleZ(e.target.value)} />
 <div className="text-xs text-center">{scaleZ}</div>
 </div>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Skew X (deg)</Label>
 <Input type="range"min="-180"max="180"value={skewX} onChange={(e) => setSkewX(e.target.value)} />
 <div className="text-xs text-center">{skewX}</div>
 </div>
 <div className="space-y-2">
 <Label>Skew Y (deg)</Label>
 <Input type="range"min="-180"max="180"value={skewY} onChange={(e) => setSkewY(e.target.value)} />
 <div className="text-xs text-center">{skewY}</div>
 </div>
 </div>

 <div className="grid grid-cols-3 gap-4">
 <div className="space-y-2">
 <Label>Translate X (px)</Label>
 <Input type="range"min="-200"max="200"value={translateX} onChange={(e) => setTranslateX(e.target.value)} />
 <div className="text-xs text-center">{translateX}</div>
 </div>
 <div className="space-y-2">
 <Label>Translate Y (px)</Label>
 <Input type="range"min="-200"max="200"value={translateY} onChange={(e) => setTranslateY(e.target.value)} />
 <div className="text-xs text-center">{translateY}</div>
 </div>
 <div className="space-y-2">
 <Label>Translate Z (px)</Label>
 <Input type="range"min="-200"max="200"value={translateZ} onChange={(e) => setTranslateZ(e.target.value)} />
 <div className="text-xs text-center">{translateZ}</div>
 </div>
 </div>
 
 <div className="space-y-2">
 <Label>Perspective (px)</Label>
 <Input type="range"min="100"max="2000"value={perspective} onChange={(e) => setPerspective(e.target.value)} />
 <div className="text-xs text-center">{perspective}</div>
 </div>
 
 <div className="space-y-2">
 <Label>Transform Origin</Label>
 <Select value={transformOrigin} onValueChange={setTransformOrigin}>
 <SelectTrigger>
 <SelectValue placeholder="Select origin"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="center">Center</SelectItem>
 <SelectItem value="top">Top</SelectItem>
 <SelectItem value="bottom">Bottom</SelectItem>
 <SelectItem value="left">Left</SelectItem>
 <SelectItem value="right">Right</SelectItem>
 <SelectItem value="top left">Top Left</SelectItem>
 <SelectItem value="top right">Top Right</SelectItem>
 <SelectItem value="bottom left">Bottom Left</SelectItem>
 <SelectItem value="bottom right">Bottom Right</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Live Preview</CardTitle>
 </CardHeader>
 <CardContent className="flex justify-center items-center min-h-[300px] overflow-hidden">
 <div className="w-40 h-40 bg-primary/20 border-2 border-primary rounded-xl flex items-center justify-center shadow-lg transition-transform"style={{ transform: transformStyle, transformOrigin: transformOrigin }}>
 <span className="font-bold text-primary">Toolzium</span>
 </div>
 </CardContent>
 </GlassCard>
 
 <GlassCard>
 <CardHeader>
 <CardTitle>CSS Code</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="bg-muted p-4 rounded-md font-mono text-sm whitespace-pre-wrap">
 {cssCode}
 </div>
 <div className="flex justify-end">
 <CopyButton getText={() => cssCode} label="Copy CSS"/>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 </div>
 );
}
