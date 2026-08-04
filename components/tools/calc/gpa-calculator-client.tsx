"use client";
import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Download, RotateCcw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const GRADE_SCALE: Record<string, number> = {
  "A+": 4.0,
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
  "F": 0.0,
};

type Course = {
  id: string;
  name: string;
  grade: string;
  credits: string;
};

type Semester = {
  id: string;
  name: string;
  courses: Course[];
};

const generateId = () => Math.random().toString(36).substring(2, 9);

const createEmptyCourse = (): Course => ({
  id: generateId(),
  name: "",
  grade: "A",
  credits: "3",
});

const createEmptySemester = (index: number): Semester => ({
  id: generateId(),
  name: `Semester ${index}`,
  courses: [createEmptyCourse(), createEmptyCourse(), createEmptyCourse()],
});

export default function GpaCalculatorClient() {
  const [semesters, setSemesters] = useState<Semester[]>([createEmptySemester(1)]);

  const addSemester = () => {
    setSemesters([...semesters, createEmptySemester(semesters.length + 1)]);
  };

  const removeSemester = (id: string) => {
    setSemesters(semesters.filter((s) => s.id !== id));
  };

  const updateSemesterName = (id: string, name: string) => {
    setSemesters(semesters.map((s) => (s.id === id ? { ...s, name } : s)));
  };

  const addCourse = (semesterId: string) => {
    setSemesters(
      semesters.map((s) =>
        s.id === semesterId ? { ...s, courses: [...s.courses, createEmptyCourse()] } : s
      )
    );
  };

  const removeCourse = (semesterId: string, courseId: string) => {
    setSemesters(
      semesters.map((s) =>
        s.id === semesterId
          ? { ...s, courses: s.courses.filter((c) => c.id !== courseId) }
          : s
      )
    );
  };

  const updateCourse = (semesterId: string, courseId: string, field: keyof Course, value: string) => {
    setSemesters(
      semesters.map((s) =>
        s.id === semesterId
          ? {
              ...s,
              courses: s.courses.map((c) =>
                c.id === courseId ? { ...c, [field]: value } : c
              ),
            }
          : s
      )
    );
  };

  const resetAll = () => {
    setSemesters([createEmptySemester(1)]);
  };

  const calculateGpa = (courses: Course[]) => {
    let totalPoints = 0;
    let totalCredits = 0;
    courses.forEach((c) => {
      const credits = parseFloat(c.credits) || 0;
      const points = GRADE_SCALE[c.grade] ?? 0;
      if (credits > 0) {
        totalPoints += credits * points;
        totalCredits += credits;
      }
    });
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  };

  const { totalCredits, cgpa } = useMemo(() => {
    let tPoints = 0;
    let tCredits = 0;
    semesters.forEach((s) => {
      s.courses.forEach((c) => {
        const credits = parseFloat(c.credits) || 0;
        const points = GRADE_SCALE[c.grade] ?? 0;
        if (credits > 0) {
          tPoints += credits * points;
          tCredits += credits;
        }
      });
    });
    return {
      totalCredits: tCredits,
      cgpa: tCredits > 0 ? (tPoints / tCredits).toFixed(2) : "0.00",
    };
  }, [semesters]);

  const getGpaColor = (gpaStr: string) => {
    const gpa = parseFloat(gpaStr);
    if (gpa >= 3.5) return "text-green-600";
    if (gpa >= 2.5) return "text-yellow-600";
    return "text-red-600";
  };

  const exportResults = () => {
    let text = "GPA Calculator Results\n\n";
    text += `Total CGPA: ${cgpa}\n`;
    text += `Total Credits: ${totalCredits}\n\n`;

    semesters.forEach((s) => {
      text += `--- ${s.name} ---\n`;
      text += `Semester GPA: ${calculateGpa(s.courses)}\n`;
      s.courses.forEach((c) => {
        text += `${c.name || "Course"}: Grade ${c.grade}, Credits ${c.credits}\n`;
      });
      text += "\n";
    });

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gpa_results.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        title="GPA Calculator"
        description="Calculate your semester GPA and cumulative GPA (CGPA) easily."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {semesters.map((semester, sIndex) => {
            const semesterGpa = calculateGpa(semester.courses);
            return (
              <Card key={semester.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <div className="flex-1 mr-4">
                    <Input
                      value={semester.name}
                      onChange={(e) => updateSemesterName(semester.id, e.target.value)}
                      className="font-semibold text-lg border-transparent hover:border-border focus:border-ring transition-colors px-2 py-1 h-auto"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Semester GPA</div>
                      <div className={"text-xl font-bold " + (getGpaColor(semesterGpa))}>
                        {semesterGpa}
                      </div>
                    </div>
                    {semesters.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => removeSemester(semester.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground px-2">
                      <div className="col-span-5">Course Name</div>
                      <div className="col-span-3">Grade</div>
                      <div className="col-span-3">Credits</div>
                      <div className="col-span-1"></div>
                    </div>
                    {semester.courses.map((course) => (
                      <div key={course.id} className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-5">
                          <Input
                            placeholder="e.g. Math 101"
                            value={course.name}
                            onChange={(e) =>
                              updateCourse(semester.id, course.id, "name", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-span-3">
                          <Select
                            value={course.grade}
                            onValueChange={(val) =>
                              updateCourse(semester.id, course.id, "grade", val)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Grade" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.keys(GRADE_SCALE).map((grade) => (
                                <SelectItem key={grade} value={grade}>
                                  {grade} ({GRADE_SCALE[grade].toFixed(1)})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-3">
                          <Input
                            type="number"
                            min="0"
                            step="0.5"
                            value={course.credits}
                            onChange={(e) =>
                              updateCourse(semester.id, course.id, "credits", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-span-1 flex justify-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-destructive"
                            onClick={() => removeCourse(semester.id, course.id)}
                            disabled={semester.courses.length <= 1}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => addCourse(semester.id)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Course
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          <Button variant="secondary" className="w-full" onClick={addSemester}>
            <Plus className="w-4 h-4 mr-2" />
            Add Semester
          </Button>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-6 bg-muted/50 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Cumulative GPA</div>
                <div className={"text-6xl font-bold " + (getGpaColor(cgpa))}>{cgpa}</div>
                <div className="text-sm text-muted-foreground mt-2">
                  Total Credits: {totalCredits}
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full" onClick={exportResults}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Results
                </Button>
                <Button variant="outline" className="w-full" onClick={resetAll}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset All
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Grade Scale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {Object.entries(GRADE_SCALE).map(([grade, points]) => (
                  <div key={grade} className="flex justify-between border-b pb-1">
                    <span className="font-medium">{grade}</span>
                    <span className="text-muted-foreground">{points.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
