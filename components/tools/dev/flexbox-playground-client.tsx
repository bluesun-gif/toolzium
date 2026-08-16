"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState } from"react";
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
import { AlignVerticalSpaceAround, Code, Code2, Copy, Layout, LayoutGrid, MousePointerClick, Plus, RotateCcw, Trash2 } from"lucide-react";
import { toast } from"react-hot-toast";

=======
import { ToolBackground } from"@/components/shared/tool-background";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { cn } from "@/lib/utils";
import { Layout, Code, Copy, RotateCcw, Plus, Trash2, Sparkles, Shield, Zap } from "lucide-react";
import { toast } from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
type FlexItem = {
  id: number;
  width: string;
  height: string;
  flexGrow: string;
  flexShrink: string;
  flexBasis: string;
  order: string;
  alignSelf: string;
};
export function FlexboxPlaygroundClient() {
  const [flexDirection, setFlexDirection] = useState("row");
  const [justifyContent, setJustifyContent] = useState("flex-start");
  const [alignItems, setAlignItems] = useState("stretch");
  const [flexWrap, setFlexWrap] = useState("nowrap");
  const [gap, setGap] = useState("10px");
  const [items, setItems] = useState<FlexItem[]>([{
    id: 1,
    width: "100px",
    height: "100px",
    flexGrow: "0",
    flexShrink: "1",
    flexBasis: "auto",
    order: "0",
    alignSelf: "auto"
  }, {
    id: 2,
    width: "100px",
    height: "100px",
    flexGrow: "0",
    flexShrink: "1",
    flexBasis: "auto",
    order: "0",
    alignSelf: "auto"
  }, {
    id: 3,
    width: "100px",
    height: "100px",
    flexGrow: "0",
    flexShrink: "1",
    flexBasis: "auto",
    order: "0",
    alignSelf: "auto"
  }]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const handleReset = () => {
    setFlexDirection("row");
    setJustifyContent("flex-start");
    setAlignItems("stretch");
    setFlexWrap("nowrap");
    setGap("10px");
    setItems([{
      id: 1,
      width: "100px",
      height: "100px",
      flexGrow: "0",
      flexShrink: "1",
      flexBasis: "auto",
      order: "0",
      alignSelf: "auto"
    }, {
      id: 2,
      width: "100px",
      height: "100px",
      flexGrow: "0",
      flexShrink: "1",
      flexBasis: "auto",
      order: "0",
      alignSelf: "auto"
    }, {
      id: 3,
      width: "100px",
      height: "100px",
      flexGrow: "0",
      flexShrink: "1",
      flexBasis: "auto",
      order: "0",
      alignSelf: "auto"
    }]);
    setSelectedItemId(null);
    toast.success("Reset to defaults");
  };
  const addItem = () => {
    setItems([...items, {
      id: Date.now(),
      width: "100px",
      height: "100px",
      flexGrow: "0",
      flexShrink: "1",
      flexBasis: "auto",
      order: "0",
      alignSelf: "auto"
    }]);
  };
  const removeItem = (id: number) => {
    if (selectedItemId === id) setSelectedItemId(null);
    setItems(items.filter(i => i.id !== id));
  };
  const updateItem = (id: number, key: keyof FlexItem, value: string) => {
    setItems(items.map(item => item.id === id ? {
      ...item,
      [key]: value
    } : item));
  };
  const selectedItem = items.find(i => i.id === selectedItemId);
  const generateCSS = () => {
    return `.container {
 display: flex;
 flex-direction: ${flexDirection};
 justify-content: ${justifyContent};
 align-items: ${alignItems};
 flex-wrap: ${flexWrap};
 gap: ${gap};
}`;
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Layout} title="CSS Flexbox Playground" description="Interactive CSS Flexbox layout builder. Visually create flexbox layouts and generate CSS code." actions={<>
 <CopyButton getText={generateCSS} label="Copy CSS" />
 <ResetButton onClick={handleReset} label="Reset" />
 </>} />

 <div className="grid md:grid-cols-3 gap-6">
 <GlassCard className="md:col-span-1">
 <CardHeader>
 <CardTitle>Container Properties</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>flex-direction</Label>
 <Select value={flexDirection} onValueChange={setFlexDirection}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="row">row</SelectItem>
 <SelectItem value="row-reverse">row-reverse</SelectItem>
 <SelectItem value="column">column</SelectItem>
 <SelectItem value="column-reverse">column-reverse</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>justify-content</Label>
 <Select value={justifyContent} onValueChange={setJustifyContent}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="flex-start">flex-start</SelectItem>
 <SelectItem value="flex-end">flex-end</SelectItem>
 <SelectItem value="center">center</SelectItem>
 <SelectItem value="space-between">space-between</SelectItem>
 <SelectItem value="space-around">space-around</SelectItem>
 <SelectItem value="space-evenly">space-evenly</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>align-items</Label>
 <Select value={alignItems} onValueChange={setAlignItems}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="stretch">stretch</SelectItem>
 <SelectItem value="flex-start">flex-start</SelectItem>
 <SelectItem value="flex-end">flex-end</SelectItem>
 <SelectItem value="center">center</SelectItem>
 <SelectItem value="baseline">baseline</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>flex-wrap</Label>
 <Select value={flexWrap} onValueChange={setFlexWrap}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="nowrap">nowrap</SelectItem>
 <SelectItem value="wrap">wrap</SelectItem>
 <SelectItem value="wrap-reverse">wrap-reverse</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>gap</Label>
 <Input value={gap} onChange={e => setGap(e.target.value)} />
 </div>
 <Button className="w-full mt-4" onClick={addItem}><Plus className="w-4 h-4 mr-2" /> Add Item</Button>
 </CardContent>
 </GlassCard>

 <GlassCard className="md:col-span-2 flex flex-col h-[500px]">
 <CardHeader>
 <CardTitle>Preview</CardTitle>
 </CardHeader>
 <CardContent className="flex-1 overflow-auto bg-muted/30 p-4 relative">
 <div className="border-2 border-dashed border-primary/50 h-full w-full p-2 bg-background/50 rounded flex transition-all" style={{
              flexDirection: flexDirection as any,
              justifyContent: justifyContent as any,
              alignItems: alignItems as any,
              flexWrap: flexWrap as any,
              gap: gap
            }}>
 {items.map((item, index) => <div key={item.id} className={cn("flex items-center justify-center font-bold text-lg bg-primary/20 text-primary border-2 cursor-pointer transition-colors relative group", selectedItemId === item.id ? "border-primary bg-primary/40" : "border-primary/30")} style={{
                width: item.width,
                height: item.height,
                flexGrow: item.flexGrow,
                flexShrink: item.flexShrink,
                flexBasis: item.flexBasis,
                order: item.order as any,
                alignSelf: item.alignSelf as any
              }} onClick={() => setSelectedItemId(item.id)}>
 {index + 1}
 <Button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-destructive text-destructive-foreground rounded-full p-1 transition-opacity" onClick={e => {
                  e.stopPropagation();
                  removeItem(item.id);
                }}>
 <Trash2 className="w-3 h-3" />
 </Button>
 </div>)}
 </div>
 </CardContent>
 </GlassCard>

 {selectedItem && <GlassCard className="md:col-span-3">
 <CardHeader>
 <CardTitle>Item Properties (Item {items.findIndex(i => i.id === selectedItemId) + 1})</CardTitle>
 </CardHeader>
 <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
 <div className="space-y-2">
 <Label>flex-grow</Label>
 <Input type="number" value={selectedItem.flexGrow} onChange={e => updateItem(selectedItemId!, 'flexGrow', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>flex-shrink</Label>
 <Input type="number" value={selectedItem.flexShrink} onChange={e => updateItem(selectedItemId!, 'flexShrink', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>flex-basis</Label>
 <Input value={selectedItem.flexBasis} onChange={e => updateItem(selectedItemId!, 'flexBasis', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>order</Label>
 <Input type="number" value={selectedItem.order} onChange={e => updateItem(selectedItemId!, 'order', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>align-self</Label>
 <Select value={selectedItem.alignSelf} onValueChange={val => updateItem(selectedItemId!, 'alignSelf', val)}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="auto">auto</SelectItem>
 <SelectItem value="flex-start">flex-start</SelectItem>
 <SelectItem value="flex-end">flex-end</SelectItem>
 <SelectItem value="center">center</SelectItem>
 <SelectItem value="baseline">baseline</SelectItem>
 <SelectItem value="stretch">stretch</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>width</Label>
 <Input value={selectedItem.width} onChange={e => updateItem(selectedItemId!, 'width', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>height</Label>
 <Input value={selectedItem.height} onChange={e => updateItem(selectedItemId!, 'height', e.target.value)} />
 </div>
 </CardContent>
 </GlassCard>}
 </div>
 
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><Code className="w-5 h-5" /> Generated CSS</CardTitle>
 </CardHeader>
 <CardContent>
 <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm font-mono whitespace-pre-wrap">
 {generateCSS()}
 </pre>
 </CardContent>
 </GlassCard>
 
<<<<<<< HEAD
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Open the Sandbox",
    description:"Load the live flex container with sample items.",
    icon: LayoutGrid,
  },
{
    step:"02",
    title:"Toggle Properties",
    description:"Click property chips to apply flex-direction, wrap, and alignment.",
    icon: MousePointerClick,
  },
{
    step:"03",
    title:"Inspect CSS",
    description:"Read the generated CSS and copy it to your project.",
    icon: Code2,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: LayoutGrid,
    title:"Live Sandbox",
    description:"Experiment with a real flex container and visible items.",
  },
{
    icon: MousePointerClick,
    title:"One-Click Properties",
    description:"Apply common flex values without writing code.",
  },
{
    icon: AlignVerticalSpaceAround,
    title:"Alignment Preview",
    description:"See justify and align effects update instantly.",
  },
{
    icon: Code2,
    title:"Copy CSS",
    description:"Grab the exact CSS for your stylesheet.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A flexbox playground is the fastest way to learn flex layout because it turns abstract properties into immediate visual feedback. Instead of guessing values, you toggle a chip and watch items reflow. That instant loop builds intuition far faster than reading specifications.</p>
  <p>Start with the container. Setting display:flex establishes the flex context, and every direct child becomes a flex item. The flex-direction property chooses the main axis: row lays items horizontally, column stacks them vertically. Changing it flips how justify-content and align-items behave, which is the single most confusing part for beginners — keep the axis in mind and the rest follows.</p>
  <p>Justify-content works along the main axis. flex-start packs items to the start, center groups them in the middle, and space-between pushes the first and last to the edges with equal gaps between. Align-items works across the cross axis, controlling vertical positioning in a row or horizontal in a column. The value center is the classic trick for perfectly centered content.</p>
  <p>Wrapping unlocks multi-line layouts. With flex-wrap: wrap, items that would overflow drop to a new line, ideal for tag clouds, chip lists, and responsive galleries. You can then use align-content to space those lines. For individual control, flex-grow, flex-shrink, and flex-basis decide how each item shares free space.</p>
  <p>Use the playground to prototype a navbar, a card row, or a footer, then copy the CSS it produces. Pair flexbox with gap to avoid margin hacks, and remember it shines for one-dimensional flows while Grid handles full page structure. Practice here until the properties feel automatic, and your layouts will become faster and cleaner.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is the flex container?",
    answer:"The flex container is the parent element with display:flex. Its direct children become flex items that the flex properties arrange.",
  },
{
    question:"What is the main axis?",
    answer:"The main axis follows flex-direction: row runs left to right, column runs top to bottom. justify-content aligns items along it.",
  },
{
    question:"How do I center an item both ways?",
    answer:"Use justify-content: center and align-items: center on the container to center along both axes.",
  },
{
    question:"Why are my items not wrapping?",
    answer:"By default flex items stay on one line. Add flex-wrap: wrap to let them move to the next line when space runs out.",
  },
{
    question:"Is flexbox responsive?",
    answer:"Flexbox adapts well, but for full two-dimensional control combine it with media queries or use CSS Grid for page layout.",
  }
  ]}
/>
</div>
 );
}
=======
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Input Your Data",
        description: "Enter your information in the input field above and configure any options.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Process & Generate",
        description: "The tool processes your input instantly and displays the results.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy & Use",
        description: "Copy the output with one click and use it wherever you need.",
        icon: Copy
      }]} badges={["100% Free", "Instant Results", "Privacy-First"]} />

      <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Lightning Fast",
        description: "Get results in milliseconds with our optimized client-side processing engine."
      }, {
        icon: Shield,
        title: "Completely Private",
        description: "All processing happens in your browser. Your data never leaves your device."
      }, {
        icon: Zap,
        title: "No Signup Required",
        description: "Use this tool instantly without creating an account or providing any personal information."
      }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our CSS Flexbox Playground?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our CSS Flexbox Playground provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[{
        question: "Is this tool free to use?",
        answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits."
      }, {
        question: "Is my data secure?",
        answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server."
      }, {
        question: "Do I need to create an account?",
        answer: "No account or registration is required. Simply open the tool and start using it immediately."
      }]} />

      <RelatedTools currentToolUrl="/tools/dev/flexbox-playground" max={6} />

  </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
