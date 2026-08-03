"use client";
import { useState, useMemo, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, RotateCcw, Calculator, GraduationCap, ChevronRight, BookOpen } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Grade scale: A=4.0, A-=3.7, B+=3.3, B=3.0, B-=2.7, C+=2.3, C=2.0, C-=1.7, D+=1.3, D=1.0, F=0.0
const GRADE_POINTS: Record<string, number> = {
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

type SemesterSimple = {
  id: string;
  name: string;
  gpa: string;
  credits: string;
};

type Course = {
  id: string;
  name: string;
  grade: string;
  credits: string;
};

type SemesterDetailed = {
  id: string;
  name: string;
  courses: Course[];
};

export default function CgpaCalculatorClient() {
  const [mode, setMode] = useState<"simple" | "detailed">("simple");

  // Simple Mode State
  const [simpleSemesters, setSimpleSemesters] = useState<SemesterSimple[]>([
    { id: "s1", name: "Semester 1", gpa: "", credits: "" },
    { id: "s2", name: "Semester 2", gpa: "", credits: "" }
  ]);

  // Detailed Mode State
  const [detailedSemesters, setDetailedSemesters] = useState<SemesterDetailed[]>([
    {
      id: "ds1", name: "Semester 1", courses: [
        { id: "c1", name: "Course 1", grade: "", credits: "" },
        { id: "c2", name: "Course 2", grade: "", credits: "" }
      ]
    }
  ]);

  // Handlers for Simple Mode
  const addSimpleSemester = () => {
    setSimpleSemesters([...simpleSemesters, { id: `s${Date.now()}`, name: `Semester ${simpleSemesters.length + 1}`, gpa: "", credits: "" }]);
  };

  const updateSimpleSemester = (id: string, field: keyof SemesterSimple, value: string) => {
    setSimpleSemesters(simpleSemesters.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const removeSimpleSemester = (id: string) => {
    setSimpleSemesters(simpleSemesters.filter(s => s.id !== id));
  };

  // Handlers for Detailed Mode
  const addDetailedSemester = () => {
    setDetailedSemesters([...detailedSemesters, { 
      id: `ds${Date.now()}`, 
      name: `Semester ${detailedSemesters.length + 1}`, 
      courses: [{ id: `c${Date.now()}`, name: "Course 1", grade: "", credits: "" }] 
    }]);
  };

  const removeDetailedSemester = (id: string) => {
    setDetailedSemesters(detailedSemesters.filter(s => s.id !== id));
  };

  const updateDetailedSemesterName = (id: string, name: string) => {
    setDetailedSemesters(detailedSemesters.map(s => s.id === id ? { ...s, name } : s));
  };

  const addCourse = (semesterId: string) => {
    setDetailedSemesters(detailedSemesters.map(s => {
      if (s.id === semesterId) {
        return {
          ...s,
          courses: [...s.courses, { id: `c${Date.now()}`, name: `Course ${s.courses.length + 1}`, grade: "", credits: "" }]
        };
      }
      return s;
    }));
  };

  const removeCourse = (semesterId: string, courseId: string) => {
    setDetailedSemesters(detailedSemesters.map(s => {
      if (s.id === semesterId) {
        return { ...s, courses: s.courses.filter(c => c.id !== courseId) };
      }
      return s;
    }));
  };

  const updateCourse = (semesterId: string, courseId: string, field: keyof Course, value: string) => {
    setDetailedSemesters(detailedSemesters.map(s => {
      if (s.id === semesterId) {
        return {
          ...s,
          courses: s.courses.map(c => c.id === courseId ? { ...c, [field]: value } : c)
        };
      }
      return s;
    }));
  };

  const reset = () => {
    if (mode === "simple") {
      setSimpleSemesters([
        { id: "s1", name: "Semester 1", gpa: "", credits: "" },
        { id: "s2", name: "Semester 2", gpa: "", credits: "" }
      ]);
    } else {
      setDetailedSemesters([
        {
          id: "ds1", name: "Semester 1", courses: [
            { id: "c1", name: "Course 1", grade: "", credits: "" },
            { id: "c2", name: "Course 2", grade: "", credits: "" }
          ]
        }
      ]);
    }
  };

  // Calculations
  const cgpaData = useMemo(() => {
    let totalCredits = 0;
    let totalPoints = 0;

    if (mode === "simple") {
      simpleSemesters.forEach(s => {
        const gpa = parseFloat(s.gpa);
        const credits = parseFloat(s.credits);
        if (!isNaN(gpa) && !isNaN(credits) && credits > 0) {
          totalCredits += credits;
          totalPoints += gpa * credits;
        }
      });
    } else {
      detailedSemesters.forEach(s => {
        s.courses.forEach(c => {
          const gradePoint = GRADE_POINTS[c.grade];
          const credits = parseFloat(c.credits);
          if (gradePoint !== undefined && !isNaN(credits) && credits > 0) {
            totalCredits += credits;
            totalPoints += gradePoint * credits;
          }
        });
      });
    }

    const cgpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

    let classification = "";
    let colorClass = "text-muted-foreground";
    let bgClass = "bg-muted";
    let borderClass = "border-muted";

    if (totalCredits > 0) {
      if (cgpa >= 3.7) {
        classification = "First Class with Distinction";
        colorClass = "text-emerald-600 dark:text-emerald-400";
        bgClass = "bg-emerald-50 dark:bg-emerald-950/30";
        borderClass = "border-emerald-200 dark:border-emerald-800";
      } else if (cgpa >= 3.5) {
        classification = "First Class";
        colorClass = "text-green-600 dark:text-green-400";
        bgClass = "bg-green-50 dark:bg-green-950/30";
        borderClass = "border-green-200 dark:border-green-800";
      } else if (cgpa >= 3.0) {
        classification = "Second Class Upper";
        colorClass = "text-blue-600 dark:text-blue-400";
        bgClass = "bg-blue-50 dark:bg-blue-950/30";
        borderClass = "border-blue-200 dark:border-blue-800";
      } else if (cgpa >= 2.5) {
        classification = "Second Class Lower";
        colorClass = "text-yellow-600 dark:text-yellow-400";
        bgClass = "bg-yellow-50 dark:bg-yellow-950/30";
        borderClass = "border-yellow-200 dark:border-yellow-800";
      } else if (cgpa >= 2.0) {
        classification = "Third Class";
        colorClass = "text-orange-600 dark:text-orange-400";
        bgClass = "bg-orange-50 dark:bg-orange-950/30";
        borderClass = "border-orange-200 dark:border-orange-800";
      } else {
        classification = "Fail";
        colorClass = "text-red-600 dark:text-red-400";
        bgClass = "bg-red-50 dark:bg-red-950/30";
        borderClass = "border-red-200 dark:border-red-800";
      }
    }

    return {
      cgpa: cgpa.toFixed(2),
      totalCredits,
      classification,
      colorClass,
      bgClass,
      borderClass
    };
  }, [mode, simpleSemesters, detailedSemesters]);

  const calculateSemesterGpa = (semester: SemesterDetailed) => {
    let semesterCredits = 0;
    let semesterPoints = 0;
    semester.courses.forEach(c => {
      const gradePoint = GRADE_POINTS[c.grade];
      const credits = parseFloat(c.credits);
      if (gradePoint !== undefined && !isNaN(credits) && credits > 0) {
        semesterCredits += credits;
        semesterPoints += gradePoint * credits;
      }
    });
    return semesterCredits > 0 ? (semesterPoints / semesterCredits).toFixed(2) : "0.00";
  };

  return (
    <>
      <ToolPageHeader 
        title="CGPA Calculator" 
        description="Calculate your Cumulative Grade Point Average easily and accurately." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={mode} onValueChange={(v) => setMode(v as "simple" | "detailed")} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="simple">Semester Mode</TabsTrigger>
              <TabsTrigger value="detailed">Course Mode</TabsTrigger>
            </TabsList>
            
            <TabsContent value="simple" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Enter Semester GPAs
                  </CardTitle>
                  <CardDescription>
                    If you already know your GPA for each semester, use this mode to calculate your overall CGPA.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {simpleSemesters.map((semester, index) => (
                    <div key={semester.id} className="grid grid-cols-12 gap-3 items-end bg-muted/30 p-3 rounded-lg border">
                      <div className="col-span-12 sm:col-span-4">
                        <Label htmlFor={`name-${semester.id}`} className="text-xs">Semester Name</Label>
                        <Input 
                          id={`name-${semester.id}`}
                          value={semester.name}
                          onChange={(e) => updateSimpleSemester(semester.id, "name", e.target.value)}
                          placeholder="e.g. Fall 2023"
                        />
                      </div>
                      <div className="col-span-5 sm:col-span-3">
                        <Label htmlFor={`gpa-${semester.id}`} className="text-xs">GPA</Label>
                        <Input 
                          id={`gpa-${semester.id}`}
                          type="number"
                          step="0.01"
                          min="0"
                          max="4.0"
                          value={semester.gpa}
                          onChange={(e) => updateSimpleSemester(semester.id, "gpa", e.target.value)}
                          placeholder="e.g. 3.5"
                        />
                      </div>
                      <div className="col-span-5 sm:col-span-3">
                        <Label htmlFor={`credits-${semester.id}`} className="text-xs">Credits</Label>
                        <Input 
                          id={`credits-${semester.id}`}
                          type="number"
                          min="0"
                          value={semester.credits}
                          onChange={(e) => updateSimpleSemester(semester.id, "credits", e.target.value)}
                          placeholder="e.g. 15"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-2 flex justify-end">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeSimpleSemester(semester.id)}
                          disabled={simpleSemesters.length <= 1}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full mt-2 border-dashed" onClick={addSimpleSemester}>
                    <Plus className="w-4 h-4 mr-2" /> Add Semester
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="detailed" className="mt-4">
              <div className="space-y-6">
                <Alert>
                  <BookOpen className="h-4 w-4" />
                  <AlertTitle>Course by Course Calculation</AlertTitle>
                  <AlertDescription>
                    Enter your individual courses, grades, and credits for each semester to calculate your GPA and CGPA.
                  </AlertDescription>
                </Alert>

                {detailedSemesters.map((semester, sIndex) => (
                  <Card key={semester.id} className="overflow-hidden">
                    <div className="bg-muted/50 px-4 py-3 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="flex-1 w-full sm:w-auto">
                        <Input 
                          value={semester.name}
                          onChange={(e) => updateDetailedSemesterName(semester.id, e.target.value)}
                          className="font-semibold bg-transparent border-none focus-visible:ring-1 h-8 px-2 w-full max-w-[250px]"
                        />
                      </div>
                      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="text-sm font-medium whitespace-nowrap">
                          GPA: <span className="text-primary">{calculateSemesterGpa(semester)}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10 px-2"
                          onClick={() => removeDetailedSemester(semester.id)}
                          disabled={detailedSemesters.length <= 1}
                        >
                          <Trash2 className="w-4 h-4 mr-1" /> Remove
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-0">
                      <div className="hidden sm:grid grid-cols-12 gap-3 px-4 py-2 bg-muted/20 text-xs font-medium text-muted-foreground border-b">
                        <div className="col-span-5">Course Name</div>
                        <div className="col-span-3">Grade</div>
                        <div className="col-span-3">Credits</div>
                        <div className="col-span-1 text-right">Action</div>
                      </div>
                      <div className="p-4 space-y-3">
                        {semester.courses.map((course) => (
                          <div key={course.id} className="grid grid-cols-12 gap-3 items-center">
                            <div className="col-span-12 sm:col-span-5">
                              <Label className="sm:hidden text-xs mb-1 block">Course Name</Label>
                              <Input 
                                value={course.name}
                                onChange={(e) => updateCourse(semester.id, course.id, "name", e.target.value)}
                                placeholder="e.g. Calculus I"
                                className="h-9"
                              />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                              <Label className="sm:hidden text-xs mb-1 block">Grade</Label>
                              <Select 
                                value={course.grade} 
                                onValueChange={(value) => updateCourse(semester.id, course.id, "grade", value)}
                              >
                                <SelectTrigger className="h-9">
                                  <SelectValue placeholder="Grade" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.keys(GRADE_POINTS).map(grade => (
                                    <SelectItem key={grade} value={grade}>
                                      {grade} ({GRADE_POINTS[grade].toFixed(1)})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="col-span-4 sm:col-span-3">
                              <Label className="sm:hidden text-xs mb-1 block">Credits</Label>
                              <Input 
                                type="number"
                                min="0"
                                value={course.credits}
                                onChange={(e) => updateCourse(semester.id, course.id, "credits", e.target.value)}
                                placeholder="e.g. 3"
                                className="h-9"
                              />
                            </div>
                            <div className="col-span-2 sm:col-span-1 flex justify-end">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-9 w-9 text-muted-foreground hover:text-destructive"
                                onClick={() => removeCourse(semester.id, course.id)}
                                disabled={semester.courses.length <= 1}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="bg-muted/10 p-3 border-t">
                      <Button variant="ghost" size="sm" className="w-full text-primary" onClick={() => addCourse(semester.id)}>
                        <Plus className="w-4 h-4 mr-2" /> Add Course
                      </Button>
                    </CardFooter>
                  </Card>
                ))}

                <Button variant="outline" className="w-full border-dashed py-6" onClick={addDetailedSemester}>
                  <Plus className="w-5 h-5 mr-2" /> Add Another Semester
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Results Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <Card className={`border-2 transition-colors duration-300 ${cgpaData.totalCredits > 0 ? cgpaData.borderClass : ""}`}>
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl">Your CGPA</CardTitle>
                <CardDescription>Based on {cgpaData.totalCredits} total credits</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center pt-4 pb-6">
                <div className={`text-6xl font-bold tracking-tighter mb-4 ${cgpaData.colorClass}`}>
                  {cgpaData.cgpa}
                </div>
                
                {cgpaData.totalCredits > 0 ? (
                  <div className={`px-4 py-2 rounded-full text-sm font-medium text-center ${cgpaData.bgClass} ${cgpaData.colorClass}`}>
                    {cgpaData.classification}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground text-center px-4">
                    Enter your grades and credits to see your result
                  </div>
                )}
              </CardContent>
              <div className="px-6 pb-6 pt-0 space-y-4">
                <Button variant="outline" className="w-full" onClick={reset}>
                  <RotateCcw className="w-4 h-4 mr-2" /> Reset All
                </Button>
              </div>
            </Card>

            <Card className="mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Grading Scale</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  {Object.entries(GRADE_POINTS).slice(0, 6).map(([grade, points]) => (
                    <div key={grade} className="flex justify-between border-b pb-1">
                      <span className="font-medium">{grade}</span>
                      <span className="text-muted-foreground">{points.toFixed(1)}</span>
                    </div>
                  ))}
                  {Object.entries(GRADE_POINTS).slice(6).map(([grade, points]) => (
                    <div key={grade} className="flex justify-between border-b pb-1">
                      <span className="font-medium">{grade}</span>
                      <span className="text-muted-foreground">{points.toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Classifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Distinction</span>
                    <span>3.7 - 4.0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 dark:text-green-400 font-medium">First Class</span>
                    <span>3.5 - 3.69</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 dark:text-blue-400 font-medium">2nd Class Upper</span>
                    <span>3.0 - 3.49</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-600 dark:text-yellow-400 font-medium">2nd Class Lower</span>
                    <span>2.5 - 2.99</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-600 dark:text-orange-400 font-medium">Third Class</span>
                    <span>2.0 - 2.49</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-red-600 dark:text-red-400 font-medium">Fail</span>
                    <span>&lt; 2.0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
