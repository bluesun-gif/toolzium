"use client";

import React, { useState, useMemo, useCallback } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { LayoutGrid, Copy, RotateCcw, ChevronDown, ChevronUp } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass ="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

interface GridConfig {
 columns: number;
 rows: number;
 columnGap: number;
 rowGap: number;
 templateColumns: string;
 templateRows: string;
 templateAreas: string;
 justifyItems: string;
 alignItems: string;
 justifyContent: string;
 alignContent: string;
}

interface CellSpan {
 colSpan: number;
 rowSpan: number;
}

const presets = {
"Holy Grail": { columns: 3, rows: 3, templateColumns:"200px 1fr 200px", templateRows:"auto 1fr auto", templateAreas: '"header header header"\n"nav main aside"\n"footer footer footer"' },
"Dashboard": { columns: 4, rows: 3, templateColumns:"repeat(4, 1fr)", templateRows:"auto 1fr 1fr", templateAreas: '"h h h h"\n"s1 s2 m m"\n"s3 s4 m m"' },
"Gallery": { columns: 4, rows: 4, templateColumns:"repeat(4, 1fr)", templateRows:"repeat(4, 1fr)", templateAreas:""},
"Blog": { columns: 3, rows: 2, templateColumns:"1fr 2fr 1fr", templateRows:"auto 1fr", templateAreas: '"h h h"\n"s m a"' }
};

export default function CssGridClient() {
 const [config, setConfig] = useState<GridConfig>({
 columns: 3,
 rows: 3,
 columnGap: 10,
 rowGap: 10,
 templateColumns:"1fr 1fr 1fr",
 templateRows:"1fr 1fr 1fr",
 templateAreas:"",
 justifyItems:"stretch",
 alignItems:"stretch",
 justifyContent:"stretch",
 alignContent:"stretch"
 });

 const [cellSpans, setCellSpans] = useState<{ [key: string]: CellSpan }>({});
 const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['layout', 'spacing']));

 const updateConfig = (key: keyof GridConfig, value: any) => {
 setConfig(prev => ({ ...prev, [key]: value }));
 };

 const applyPreset = (presetName: keyof typeof presets) => {
 const preset = presets[presetName];
 setConfig(prev => ({ ...prev, ...preset }));
 toast.success(`Applied ${presetName} preset`);
 };

 const updateCellSpan = (cellIdx: number, type: 'colSpan' | 'rowSpan', value: number) => {
 const key = `cell-${cellIdx}`;
 setCellSpans(prev => ({
 ...prev,
 [key]: { ...prev[key], [type]: value, colSpan: prev[key]?.colSpan || 1, rowSpan: prev[key]?.rowSpan || 1 }
 }));
 };

 const resetGrid = () => {
 setConfig({
 columns: 3,
 rows: 3,
 columnGap: 10,
 rowGap: 10,
 templateColumns:"1fr 1fr 1fr",
 templateRows:"1fr 1fr 1fr",
 templateAreas:"",
 justifyItems:"stretch",
 alignItems:"stretch",
 justifyContent:"stretch",
 alignContent:"stretch"
 });
 setCellSpans({});
 toast.success('Grid reset');
 };

 const generatedCSS = useMemo(() => {
 let css = `.grid-container {\n`;
 css += ` display: grid;\n`;
 css += ` grid-template-columns: ${config.templateColumns};\n`;
 css += ` grid-template-rows: ${config.templateRows};\n`;
 if (config.columnGap > 0) css += ` column-gap: ${config.columnGap}px;\n`;
 if (config.rowGap > 0) css += ` row-gap: ${config.rowGap}px;\n`;
 if (config.templateAreas) css += ` grid-template-areas:\n ${config.templateAreas};\n`;
 if (config.justifyItems !== 'stretch') css += ` justify-items: ${config.justifyItems};\n`;
 if (config.alignItems !== 'stretch') css += ` align-items: ${config.alignItems};\n`;
 if (config.justifyContent !== 'stretch') css += ` justify-content: ${config.justifyContent};\n`;
 if (config.alignContent !== 'stretch') css += ` align-content: ${config.alignContent};\n`;
 css += `}`;

 Object.entries(cellSpans).forEach(([key, span]) => {
 if (span.colSpan > 1 || span.rowSpan > 1) {
 const idx = parseInt(key.split('-')[1]);
 css += `\n\n.grid-item-${idx} {\n`;
 if (span.colSpan > 1) css += ` grid-column: span ${span.colSpan};\n`;
 if (span.rowSpan > 1) css += ` grid-row: span ${span.rowSpan};\n`;
 css += `}`;
 }
 });

 return css;
 }, [config, cellSpans]);

 const toggleSection = (section: string) => {
 const newExpanded = new Set(expandedSections);
 if (newExpanded.has(section)) {
 newExpanded.delete(section);
 } else {
 newExpanded.add(section);
 }
 setExpandedSections(newExpanded);
 };

 const totalCells = config.columns * config.rows;
 const cells = Array.from({ length: totalCells }, (_, i) => i);

 const copyCSS = () => {
 navigator.clipboard.writeText(generatedCSS);
 toast.success('CSS copied to clipboard!');
 };

 return (
      <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern />

 <ToolPageHeader
 icon={LayoutGrid}
 title="CSS Grid Generator"
 description="Build complex CSS Grid layouts visually with live preview and instant code generation"
 />

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <div className="lg:col-span-1 space-y-4">
 <GlassCard>
 <CardHeader className={`${headerClass} cursor-pointer`} onClick={() => toggleSection('presets')}>
 <CardTitle className={titleClass}>
 <LayoutGrid className="w-4 h-4 text-primary"/>
 Preset Layouts
 {expandedSections.has('presets') ? <ChevronUp className="w-3 h-3 ml-auto text-muted-foreground"/> : <ChevronDown className="w-3 h-3 ml-auto text-muted-foreground"/>}
 </CardTitle>
 </CardHeader>
 {expandedSections.has('presets') && (
 <CardContent className="p-4 space-y-2">
 {Object.keys(presets).map(name => (
 <Button key={name} variant="outline"className="w-full justify-start text-xs font-semibold"onClick={() => applyPreset(name as keyof typeof presets)}>
 {name}
 </Button>
 ))}
 </CardContent>
 )}
 </GlassCard>

 <GlassCard>
 <CardHeader className={`${headerClass} cursor-pointer`} onClick={() => toggleSection('layout')}>
 <CardTitle className={titleClass}>
 <LayoutGrid className="w-4 h-4 text-primary"/>
 Grid Dimensions
 {expandedSections.has('layout') ? <ChevronUp className="w-3 h-3 ml-auto text-muted-foreground"/> : <ChevronDown className="w-3 h-3 ml-auto text-muted-foreground"/>}
 </CardTitle>
 </CardHeader>
 {expandedSections.has('layout') && (
 <CardContent className="p-4 space-y-4">
 <div className="space-y-1">
 <Label className="text-xs">Columns: {config.columns}</Label>
 <Input type="range"min="1"max="12"value={config.columns} onChange={(e) => {
 const val = parseInt(e.target.value);
 updateConfig('columns', val);
 updateConfig('templateColumns', Array(val).fill('1fr').join(' '));
 }} />
 </div>
 <div className="space-y-1">
 <Label className="text-xs">Rows: {config.rows}</Label>
 <Input type="range"min="1"max="12"value={config.rows} onChange={(e) => {
 const val = parseInt(e.target.value);
 updateConfig('rows', val);
 updateConfig('templateRows', Array(val).fill('1fr').join(' '));
 }} />
 </div>
 <div className="space-y-1">
 <Label className="text-xs">Template Columns</Label>
 <Input className="h-9 text-xs"value={config.templateColumns} onChange={(e) => updateConfig('templateColumns', e.target.value)} placeholder="1fr 1fr 1fr"/>
 </div>
 <div className="space-y-1">
 <Label className="text-xs">Template Rows</Label>
 <Input className="h-9 text-xs"value={config.templateRows} onChange={(e) => updateConfig('templateRows', e.target.value)} placeholder="1fr 1fr 1fr"/>
 </div>
 </CardContent>
 )}
 </GlassCard>

 <GlassCard>
 <CardHeader className={`${headerClass} cursor-pointer`} onClick={() => toggleSection('spacing')}>
 <CardTitle className={titleClass}>
 <LayoutGrid className="w-4 h-4 text-primary"/>
 Spacing
 {expandedSections.has('spacing') ? <ChevronUp className="w-3 h-3 ml-auto text-muted-foreground"/> : <ChevronDown className="w-3 h-3 ml-auto text-muted-foreground"/>}
 </CardTitle>
 </CardHeader>
 {expandedSections.has('spacing') && (
 <CardContent className="p-4 space-y-4">
 <div className="space-y-1">
 <Label className="text-xs">Column Gap: {config.columnGap}px</Label>
 <Input type="range"min="0"max="50"value={config.columnGap} onChange={(e) => updateConfig('columnGap', parseInt(e.target.value))} />
 </div>
 <div className="space-y-1">
 <Label className="text-xs">Row Gap: {config.rowGap}px</Label>
 <Input type="range"min="0"max="50"value={config.rowGap} onChange={(e) => updateConfig('rowGap', parseInt(e.target.value))} />
 </div>
 </CardContent>
 )}
 </GlassCard>

 <GlassCard>
 <CardHeader className={`${headerClass} cursor-pointer`} onClick={() => toggleSection('areas')}>
 <CardTitle className={titleClass}>
 <LayoutGrid className="w-4 h-4 text-primary"/>
 Grid Areas
 {expandedSections.has('areas') ? <ChevronUp className="w-3 h-3 ml-auto text-muted-foreground"/> : <ChevronDown className="w-3 h-3 ml-auto text-muted-foreground"/>}
 </CardTitle>
 </CardHeader>
 {expandedSections.has('areas') && (
 <CardContent className="p-4">
 <textarea
 className={textareaClass}
 rows={5}
 value={config.templateAreas}
 onChange={(e) => updateConfig('templateAreas', e.target.value)}
 placeholder={'"header header"\n"main sidebar"\n"footer footer"'}
 />
 </CardContent>
 )}
 </GlassCard>

 <GlassCard>
 <CardHeader className={`${headerClass} cursor-pointer`} onClick={() => toggleSection('alignment')}>
 <CardTitle className={titleClass}>
 <LayoutGrid className="w-4 h-4 text-primary"/>
 Alignment
 {expandedSections.has('alignment') ? <ChevronUp className="w-3 h-3 ml-auto text-muted-foreground"/> : <ChevronDown className="w-3 h-3 ml-auto text-muted-foreground"/>}
 </CardTitle>
 </CardHeader>
 {expandedSections.has('alignment') && (
 <CardContent className="p-4 space-y-3">
 <div className="space-y-1">
 <Label className="text-xs">Justify Items</Label>
 <select className="w-full p-2 text-xs rounded border border-border bg-background outline-none"value={config.justifyItems} onChange={(e) => updateConfig('justifyItems', e.target.value)}>
 <option value="stretch">Stretch</option>
 <option value="start">Start</option>
 <option value="end">End</option>
 <option value="center">Center</option>
 </select>
 </div>
 <div className="space-y-1">
 <Label className="text-xs">Align Items</Label>
 <select className="w-full p-2 text-xs rounded border border-border bg-background outline-none"value={config.alignItems} onChange={(e) => updateConfig('alignItems', e.target.value)}>
 <option value="stretch">Stretch</option>
 <option value="start">Start</option>
 <option value="end">End</option>
 <option value="center">Center</option>
 </select>
 </div>
 </CardContent>
 )}
 </GlassCard>

 <Button variant="outline"className="w-full text-xs font-semibold"onClick={resetGrid}>
 <RotateCcw className="w-4 h-4 mr-2"/>
 Reset Grid
 </Button>
 </div>

 <div className="lg:col-span-2 space-y-6">
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <LayoutGrid className="w-4 h-4 text-primary"/>
 Live Preview
 </CardTitle>
 </CardHeader>
 <CardContent className="p-6">
 <div
 className="grid bg-muted/30 p-4 rounded-lg min-h-[400px]"
 style={{
 gridTemplateColumns: config.templateColumns,
 gridTemplateRows: config.templateRows,
 columnGap: `${config.columnGap}px`,
 rowGap: `${config.rowGap}px`,
 gridTemplateAreas: config.templateAreas || undefined,
 justifyItems: config.justifyItems,
 alignItems: config.alignItems
 } as any}
 >
 {cells.map(idx => {
 const span = cellSpans[`cell-${idx}`];
 return (
 <div
 key={idx}
 className="bg-primary/20 border-2 border-primary/40 rounded-lg flex items-center justify-center text-sm font-bold text-primary cursor-pointer hover:bg-primary/30 transition-colors relative group min-h-[60px]"
 style={{
 gridColumn: span?.colSpan && span.colSpan > 1 ? `span ${span.colSpan}` : undefined,
 gridRow: span?.rowSpan && span.rowSpan > 1 ? `span ${span.rowSpan}` : undefined
 }}
 onClick={() => {
 const currentColSpan = span?.colSpan || 1;
 const newColSpan = currentColSpan >= config.columns ? 1 : currentColSpan + 1;
 updateCellSpan(idx, 'colSpan', newColSpan);
 }}
 >
 {idx + 1}
 <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
 <span className="text-[10px] bg-background/80 px-1.5 py-0.5 rounded">
 Span
 </span>
 </div>
 </div>
 );
 })}
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Copy className="w-4 h-4 text-primary"/>
 Generated CSS
 </CardTitle>
 <button
 onClick={copyCSS}
 className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
 >
 <Copy className="w-3.5 h-3.5"/> Copy
 </button>
 </CardHeader>
 <CardContent className="p-4">
 <pre className="p-4 bg-muted/30 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
 <code className="text-foreground">{generatedCSS}</code>
 </pre>
 </CardContent>
 </GlassCard>
 </div>
 </div>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Configure Grid", description:"Set columns, rows, and spacing using controls", icon: LayoutGrid },
 { step:"02", title:"Visualize Layout", description:"See your grid update in real-time", icon: LayoutGrid },
 { step:"03", title:"Copy CSS", description:"Grab the generated code for your project", icon: Copy }
 ]}
 badges={["Live Preview","Preset Layouts","Cell Spanning"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: LayoutGrid, title:"Visual Builder", description:"See your grid layout update in real-time"},
 { icon: LayoutGrid, title:"Preset Layouts", description:"Start with Holy Grail, Dashboard, and more"},
 { icon: LayoutGrid, title:"Cell Spanning", description:"Click cells to make them span multiple columns/rows"},
 { icon: LayoutGrid, title:"Grid Areas", description:"Define named areas for complex layouts"}
 ]}
 >
 <div className="prose max-w-none dark:prose-invert">
 <h3>Professional CSS Grid Layout Builder</h3>
 <p>CSS Grid is the most powerful layout system available in CSS, but its syntax can be intimidating. Our visual grid generator eliminates the guesswork by letting you build layouts visually while seeing the exact CSS code that makes it work.</p>
 
 <h3>Intuitive Visual Controls</h3>
 <p>The left panel provides organized control sections for every aspect of your grid. Adjust columns and rows with sliders, fine-tune spacing with gap controls, and customize alignment properties. Each change updates the preview instantly, so you can iterate quickly until your layout looks perfect.</p>
 
 <h3>Professional Presets</h3>
 <p>Don't start from scratch. Our preset library includes battle-tested layouts used by professional developers. The Holy Grail layout provides a classic three-column design with header and footer. The Dashboard preset creates a data-heavy layout perfect for admin panels. The Gallery preset offers a uniform grid for image collections, and the Blog preset provides a content-focused layout with sidebars.</p>
 
 <h3>Advanced Features</h3>
 <p>Beyond basic grids, this tool supports all advanced CSS Grid features. Define named grid areas for semantic layouts. Make cells span multiple columns or rows with a single click. Control alignment at both the container and item level. The generated CSS includes all these features with proper syntax and helpful comments.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"Can I make cells span multiple columns?", answer:"Yes! Click any cell in the preview to cycle through column spans. The cell will expand to cover multiple columns, and the generated CSS will include the proper grid-column property."},
 { question:"What are grid template areas?", answer:"Grid template areas let you name regions of your grid for semantic layouts. You define a pattern like 'header header' / 'main sidebar' and then assign items to those named areas."},
 { question:"Does it support responsive grids?", answer:"The generated CSS works perfectly with media queries. You can wrap the grid container in @media rules to change the template columns at different breakpoints."}
 ]}
 />

 <RelatedTools currentToolUrl="/tools/dev/css-grid" max={6} />
 </div>
 );
}
