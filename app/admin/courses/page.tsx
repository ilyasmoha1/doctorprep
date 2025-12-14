"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, BookOpen, Users } from "lucide-react";

// Mock courses data
const mockCourses = [
    {
        id: 1,
        title: "USMLE Step 1 Preparation",
        description: "Comprehensive preparation course for USMLE Step 1 exam",
        modules: 12,
        videos: 45,
        students: 67,
        status: "Published",
    },
    {
        id: 2,
        title: "Clinical Skills Fundamentals",
        description: "Essential clinical skills for medical students",
        modules: 8,
        videos: 32,
        students: 45,
        status: "Published",
    },
    {
        id: 3,
        title: "Anatomy Masterclass",
        description: "In-depth anatomy course with visual demonstrations",
        modules: 15,
        videos: 58,
        students: 89,
        status: "Published",
    },
    {
        id: 4,
        title: "Pharmacology Essentials",
        description: "Core pharmacology concepts and drug mechanisms",
        modules: 10,
        videos: 38,
        students: 52,
        status: "Draft",
    },
];

export default function CoursesPage() {
    const [courses] = useState(mockCourses);

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Course Management</h2>
                    <p className="text-muted-foreground">
                        Create and manage courses, modules, and lessons
                    </p>
                </div>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Course
                </Button>
            </div>

            {/* Courses Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {courses.map((course) => (
                    <Card key={course.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="space-y-1 flex-1">
                                    <CardTitle className="text-xl">{course.title}</CardTitle>
                                    <CardDescription>{course.description}</CardDescription>
                                </div>
                                <span
                                    className={`text-xs px-2 py-1 rounded-full ${course.status === "Published"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {course.status}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Course Stats */}
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold text-primary">{course.modules}</p>
                                    <p className="text-xs text-muted-foreground">Modules</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold text-primary">{course.videos}</p>
                                    <p className="text-xs text-muted-foreground">Videos</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold text-primary">{course.students}</p>
                                    <p className="text-xs text-muted-foreground">Students</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 pt-2">
                                <Button variant="outline" className="flex-1 gap-2">
                                    <BookOpen className="h-4 w-4" />
                                    View Modules
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Empty State for New Course */}
            <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                    <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Create Your First Course</h3>
                    <p className="text-sm text-muted-foreground mb-4 text-center max-w-sm">
                        Start building engaging courses with modules, lessons, and assessments
                    </p>
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Create New Course
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
