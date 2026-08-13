"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { BookOpen, Plus, Trash2 } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

const scale4: Record<string, number> = {"A": 4.0,"B": 3.0,"C": 2.0,"D": 1.0,"F": 0.0 };
const scale5: Record<string, number> = {"A": 5.0,"B": 4.0,"C": 3.0,"D": 2.0,"E": 1.0,"F": 0.0 };

interface Course {
 id: string;
 name: string;
 credits: string;
 grade: string;
}

export default function GpaCalculatorClient() {
 const [courses, setCourses] = useState<Course[]>([
 { id:"1", name:"", credits:"", grade:"A"}
 ]);
 const [scale, setScale] = useState<"4.0"|"5.0">("4.0");

 const currentScale = scale ==="4.0"? scale4 : scale5;
 const maxGpa = scale ==="4.0"?"4.00":"5.00";

 const addCourse = () => {
 setCourses([...courses, { id: Date.now().toString(), name:"", credits:"", grade:"A"}]);
 };

 const removeCourse = (id: string) => {
 if (courses.length > 1) {
 setCourses(courses.filter(c => c.id !== id));
 }
 };

 const updateCourse = (id: string, field: keyof Course, value: string) => {
 setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
 };

 const gpa = useMemo(() => {
 let totalPoints = 0;
 let totalCredits = 0;
 courses.forEach(c => {
 const cred = parseFloat(c.credits);
 if (!isNaN(cred) && cred > 0 && currentScale[c.grade] !== undefined) {
 totalPoints += cred * currentScale[c.grade];
 totalCredits += cred;
 }
 });
 return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) :"0.00";
 }, [courses, currentScale]);

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader icon={BookOpen} title="GPA Calculator"description="Calculate your semester GPA with support for both 4.0 and 5.0 grading scales."/>
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Semester Courses</CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-4">
 <div className="flex gap-2 mb-4">
 <Button variant={scale ==="4.0"?"default":"outline"} onClick={() => setScale("4.0")}>4.0 Scale</Button>
 <Button variant={scale ==="5.0"?"default":"outline"} onClick={() => setScale("5.0")}>5.0 Scale</Button>
 </div>

 <div className="space-y-3">
 {courses.map((course) => (
 <div key={course.id} className="grid grid-cols-12 gap-2 items-center">
 <Input 
 className="col-span-5"
 placeholder="Course Name"
 value={course.name} 
 onChange={e => updateCourse(course.id,"name", e.target.value)} 
 />
 <Input 
 className="col-span-2"
 type="number"
 placeholder="Credits"
 value={course.credits} 
 onChange={e => updateCourse(course.id,"credits", e.target.value)} 
 />
 <select 
 className="col-span-3 rounded-lg border border-border/70 bg-background/80 p-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
 value={course.grade}
 onChange={e => updateCourse(course.id,"grade", e.target.value)}
 >
 {Object.keys(currentScale).map(g => <option key={g} value={g}>{g} ({currentScale[g]})</option>)}
 </select>
 <Button 
 variant="ghost"
 size="icon"
 className="col-span-2 text-destructive hover:bg-destructive/10"
 onClick={() => removeCourse(course.id)}
 disabled={courses.length === 1}
 >
 <Trash2 className="w-4 h-4"/>
 </Button>
 </div>
 ))}
 </div>
 
 <Button variant="outline"onClick={addCourse} className="w-full sm:w-auto">
 <Plus className="w-4 h-4 mr-2"/> Add Course
 </Button>

 <div className="mt-6 p-6 rounded-xl bg-primary/10 border border-primary/20 text-center">
 <div className="text-sm text-muted-foreground mb-1">Semester GPA</div>
 <div className="text-5xl font-bold text-primary">{gpa}</div>
 <div className="text-xs text-muted-foreground mt-2">out of {maxGpa}</div>
 </div>
 </CardContent>
 </GlassCard>

 <ToolHowItWorks 
 steps={[
 { step:"01", title:"Select Scale", description:"Toggle between the standard 4.0 scale or the 5.0 scale used by some institutions.", icon: BookOpen },
 { step:"02", title:"Enter Courses", description:"Input your course names, credit hours, and the grades achieved.", icon: BookOpen },
 { step:"03", title:"Get GPA", description:"View your calculated semester GPA instantly updated on the screen.", icon: BookOpen }
 ]} 
 badges={["100% Free","Client-Side","Instant"]} 
 />

 <ToolFeatureGuides features={[
 { icon: BookOpen, title:"Dual Scales", description:"Supports both the traditional 4.0 GPA scale and the 5.0 weighted scale."},
 { icon: BookOpen, title:"Simple Grading", description:"Uses standard A-F letter grades without plus/minus variations for straightforward calculation."},
 { icon: BookOpen, title:"Credit Weighting", description:"Automatically applies the correct mathematical weight to each course based on its credits."},
 { icon: BookOpen, title:"Privacy First", description:"Your grades and course names are never saved or transmitted to any server."}
 ]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Different educational systems around the world utilize different GPA scales. While the 4.0 scale is standard in the US, many international and specialized systems use a 5.0 scale to account for advanced or honors coursework.</p>
 <p>This GPA calculator allows you to quickly model your semester performance by inputting your credits and letter grades. It is an excellent tool for projecting your final grades before the semester officially concludes.</p>
 <p>By keeping the interface clean and focused on semester-by-semester calculation, you can easily evaluate how a single term impacts your overall academic trajectory.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[
 { question:"What is the difference between 4.0 and 5.0 scales?", answer:"The 4.0 scale typically caps an 'A' at 4.0 points, while a 5.0 scale often assigns 5.0 points to an 'A' in advanced, honors, or AP/IB courses."},
 { question:"Does this include plus and minus grades?", answer:"This specific tool uses whole letter grades (A, B, C, D, F) to align with standard 5.0 scale reporting. For plus/minus precision, use our CGPA Calculator."},
 { question:"Can I use this for high school?", answer:"Yes, it is perfectly suited for high school students tracking their semester grades on either a standard or weighted scale."}
 ]} />

 <RelatedTools currentToolUrl="/tools/calc/gpa-calculator" max={6} />
 </div>
 );
}
