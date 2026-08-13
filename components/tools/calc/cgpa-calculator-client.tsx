"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GraduationCap, Plus, Trash2 } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const gradePoints: Record<string, number> = {
  "A": 4.0,
  "A-": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "B-": 2.7,
  "C+": 2.3,
  "C": 2.0,
  "C-": 1.7,
  "D+": 1.3,
  "D": 1.0,
  "F": 0.0
};
interface Course {
  id: string;
  name: string;
  credits: string;
  grade: string;
}
export default function CgpaCalculatorClient() {
  const [courses, setCourses] = useState<Course[]>([{
    id: "1",
    name: "",
    credits: "",
    grade: "A"
  }]);
  const addCourse = () => {
    setCourses([...courses, {
      id: Date.now().toString(),
      name: "",
      credits: "",
      grade: "A"
    }]);
  };
  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };
  const updateCourse = (id: string, field: keyof Course, value: string) => {
    setCourses(courses.map(c => c.id === id ? {
      ...c,
      [field]: value
    } : c));
  };
  const cgpa = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;
    courses.forEach(c => {
      const cred = parseFloat(c.credits);
      if (!isNaN(cred) && cred > 0 && gradePoints[c.grade] !== undefined) {
        totalPoints += cred * gradePoints[c.grade];
        totalCredits += cred;
      }
    });
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  }, [courses]);
  return <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={GraduationCap} title="CGPA Calculator" description="Calculate your Cumulative Grade Point Average based on course credits and grades." />
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Course Details</CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-4">
 <div className="space-y-3">
 {courses.map(course => <div key={course.id} className="grid grid-cols-12 gap-2 items-center">
 <Input className="col-span-5" placeholder="Course Name" value={course.name} onChange={e => updateCourse(course.id, "name", e.target.value)} />
 <Input className="col-span-2" type="number" placeholder="Credits" value={course.credits} onChange={e => updateCourse(course.id, "credits", e.target.value)} />
 <select className="col-span-3 rounded-lg border border-border/70 bg-background/80 p-2 text-sm outline-none focus:ring-2 focus:ring-primary/50" value={course.grade} onChange={e => updateCourse(course.id, "grade", e.target.value)}>
 {Object.keys(gradePoints).map(g => <option key={g} value={g}>{g} ({gradePoints[g]})</option>)}
 </select>
 <Button variant="ghost" size="icon" className="col-span-2 text-destructive hover:bg-destructive/10" onClick={() => removeCourse(course.id)} disabled={courses.length === 1}>
 <Trash2 className="w-4 h-4" />
 </Button>
 </div>)}
 </div>
 
 <Button variant="outline" onClick={addCourse} className="w-full sm:w-auto">
 <Plus className="w-4 h-4 mr-2" /> Add Course
 </Button>

 <div className="mt-6 p-6 rounded-xl bg-primary/10 border border-primary/20 text-center">
 <div className="text-sm text-muted-foreground mb-1">Your CGPA</div>
 <div className="text-5xl font-bold text-primary">{cgpa}</div>
 <div className="text-xs text-muted-foreground mt-2">out of 4.00</div>
 </div>
 </CardContent>
 </GlassCard>

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Add Courses",
        description: "Enter the name and credit hours for each course you have taken.",
        icon: GraduationCap
      }, {
        step: "02",
        title: "Select Grades",
        description: "Choose the letter grade you received for each respective course.",
        icon: GraduationCap
      }, {
        step: "03",
        title: "View CGPA",
        description: "Instantly see your calculated Cumulative Grade Point Average.",
        icon: GraduationCap
      }]} badges={["100% Free", "Client-Side", "Instant"]} />

 <ToolFeatureGuides features={[{
        icon: GraduationCap,
        title: "Dynamic Rows",
        description: "Easily add or remove course rows to match your exact academic transcript."
      }, {
        icon: GraduationCap,
        title: "Weighted Average",
        description: "Accurately calculates CGPA by weighting each grade by its credit hours."
      }, {
        icon: GraduationCap,
        title: "Standard Grading",
        description: "Uses the standard 4.0 GPA scale with plus and minus variations."
      }, {
        icon: GraduationCap,
        title: "Real-Time Updates",
        description: "Your CGPA updates instantly as you modify credits or grades."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Calculating your CGPA manually can be tedious and prone to errors, especially when dealing with varying credit hours and plus/minus grading scales. This tool automates the weighted average calculation for you.</p>
 <p>Whether you are a high school student preparing for college admissions or a university undergraduate tracking your academic standing, having an accurate CGPA is essential for scholarships and grad school applications.</p>
 <p>All calculations are performed locally in your browser, ensuring your academic records remain completely private.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "What scale does this calculator use?",
        answer: "This tool uses the standard 4.0 unweighted GPA scale, incorporating plus and minus grades (e.g., A- = 3.7, B+ = 3.3)."
      }, {
        question: "How do I handle lab credits?",
        answer: "If your lab is graded separately, add it as a distinct course row with its own credit value and grade."
      }, {
        question: "Can I calculate my GPA for just one semester?",
        answer: "Yes, simply clear the existing rows and enter only the courses from the specific semester you wish to evaluate."
      }]} />

 <RelatedTools currentToolUrl="/tools/calc/cgpa-calculator" max={6} />
 </div></div>;
}