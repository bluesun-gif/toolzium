"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Calculator } from"lucide-react";
import toast from"react-hot-toast";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

export default function ScientificCalculatorClient() {
 const [expression, setExpression] = useState("");
 const [result, setResult] = useState("");

 const handleButtonClick = (val: string) => {
 setExpression(prev => prev + val);
 };

 const handleClear = () => {
 setExpression("");
 setResult("");
 };

 const handleBackspace = () => {
 setExpression(prev => prev.slice(0, -1));
 };

 const handleCalculate = () => {
 try {
 let evalExpr = expression
 .replace(/sin\(/g,"Math.sin(")
 .replace(/cos\(/g,"Math.cos(")
 .replace(/tan\(/g,"Math.tan(")
 .replace(/sqrt\(/g,"Math.sqrt(")
 .replace(/log\(/g,"Math.log10(")
 .replace(/ln\(/g,"Math.log(")
 .replace(/pi/g,"Math.PI")
 .replace(/e/g,"Math.E")
 .replace(/\^/g,"**");
 
 if (/[^0-9+\-*/().%\s\w]/.test(evalExpr.replace(/Math\.\w+/g,""))) {
 throw new Error("Invalid characters");
 }

 const res = Function(`"use strict"; return (${evalExpr})`)();
 setResult(String(res));
 } catch (err) {
 toast.error("Invalid expression");
 setResult("Error");
 }
 };

 const buttons = [
"sin(","cos(","tan(","sqrt(","C","DEL",
"log(","ln(","pi","e","(",")",
"7","8","9","/","^","%",
"4","5","6","*","1","2",
"3","-","0",".","=","+"
 ];

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
 <ToolPageHeader icon={Calculator} title="Scientific Calculator"description="Perform advanced mathematical calculations with trigonometric, logarithmic, and exponential functions."/>
 
 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Calculator Display</CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-4">
 <div className="p-4 rounded-xl bg-background text-right min-h-[100px] flex flex-col justify-end">
 <div className="text-muted-foreground text-sm h-6 overflow-x-auto whitespace-nowrap">{expression ||"0"}</div>
 <div className="text-white text-4xl font-bold overflow-x-auto whitespace-nowrap">{result ||"0"}</div>
 </div>
 
 <div className="grid grid-cols-6 gap-2">
 {buttons.map((btn) => {
 let className ="h-12 rounded-lg font-semibold text-sm transition-colors";
 if (btn ==="=") className +="bg-primary text-primary-foreground hover:bg-primary/90 col-span-2";
 else if (btn ==="C"|| btn ==="DEL") className +="bg-destructive/20 text-destructive hover:bg-destructive/30";
 else if (["+","-","*","/","^","%","(",")"].includes(btn)) className +="bg-muted hover:bg-muted/80 text-foreground";
 else if (["sin(","cos(","tan(","sqrt(","log(","ln(","pi","e"].includes(btn)) className +="bg-primary/10 text-primary hover:bg-primary/20 text-xs";
 else className +="bg-card border border-border/50 hover:bg-muted/50 text-foreground";

 return (
 <Button 
 key={btn} 
 variant="ghost"
 className={className}
 onClick={() => {
 if (btn ==="C") handleClear();
 else if (btn ==="DEL") handleBackspace();
 else if (btn ==="=") handleCalculate();
 else handleButtonClick(btn);
 }}
 >
 {btn}
 </Button>
 );
 })}
 </div>
 </CardContent>
 </Card>

 <ToolHowItWorks 
 steps={[
 { step:"01", title:"Input Expression", description:"Use the keypad to type your mathematical expression, including scientific functions.", icon: Calculator },
 { step:"02", title:"Review Formula", description:"Check the top line of the display to ensure your formula is entered correctly.", icon: Calculator },
 { step:"03", title:"Calculate", description:"Press the equals button to instantly compute the final result.", icon: Calculator }
 ]} 
 badges={["100% Free","Client-Side","No Signup"]} 
 />

 <ToolFeatureGuides features={[
 { icon: Calculator, title:"Scientific Functions", description:"Includes sin, cos, tan, log, ln, square root, and constants like pi and e."},
 { icon: Calculator, title:"Expression Editing", description:"Use the backspace button to correct typos without clearing the entire formula."},
 { icon: Calculator, title:"Operator Support", description:"Supports standard arithmetic, exponents (^), and modulo (%) operations."},
 { icon: Calculator, title:"Error Handling", description:"Displays a clear error toast if the mathematical expression is invalid."}
 ]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>A scientific calculator is indispensable for students, engineers, and scientists dealing with complex equations. This web-based tool brings the power of a physical scientific calculator directly to your browser.</p>
 <p>Unlike basic calculators, this tool supports nested parentheses, trigonometric functions (in radians), logarithmic bases, and exponential notation. The dual-line display lets you see both your input expression and the computed result simultaneously.</p>
 <p>All computations are executed locally via JavaScript's math engine, meaning you can use it offline and your calculations remain entirely private.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[
 { question:"Are trigonometric functions in degrees or radians?", answer:"This calculator uses radians for sin, cos, and tan functions, which is the standard in higher mathematics and programming."},
 { question:"How do I calculate exponents?", answer:"Use the ^ symbol. For example, to calculate 2 to the power of 8, type 2^8."},
 { question:"What does the 'ln' button do?", answer:"The 'ln' button calculates the natural logarithm (base e), while 'log' calculates the common logarithm (base 10)."}
 ]} />

 <RelatedTools currentToolUrl="/tools/calc/scientific-calculator"max={6} />
 </div>
 );
}
