"use client";

import { useState, useEffect } from "react";
import { studentStore } from "@/lib/student-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, Eye, Mail, Calendar } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";


export default function StudentsPage() {
    const [students, setStudents] = useState(studentStore.getAll());
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newStudent, setNewStudent] = useState({
        name: "",
        email: "",
        plan: "Free" as "Free" | "Pro" | "Institutional",
        password: "student123", // Default password
    });

    // Refresh students list when component mounts or when store changes
    useEffect(() => {
        setStudents(studentStore.getAll());
    }, []);

    const filteredStudents = students.filter(
        (student) =>
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddStudent = () => {
        const student = studentStore.add({
            ...newStudent,
            progress: 0,
            joinDate: new Date().toISOString().split("T")[0],
            status: "Active",
        });
        setStudents(studentStore.getAll());
        setNewStudent({ name: "", email: "", plan: "Free", password: "student123" });
        setIsAddDialogOpen(false);
    };

    const handleDeleteStudent = (id: number) => {
        if (confirm("Are you sure you want to delete this student?")) {
            studentStore.delete(id);
            setStudents(studentStore.getAll());
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Student Management</h2>
                    <p className="text-muted-foreground">
                        Manage student accounts and track their progress
                    </p>
                </div>
                <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Student
                </Button>
            </div>

            {/* Search */}
            <Card>
                <CardContent className="pt-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search students by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Students Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Students ({filteredStudents.length})</CardTitle>
                    <CardDescription>
                        View and manage all registered students
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {filteredStudents.map((student) => (
                            <div
                                key={student.id}
                                className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                            >
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold">{student.name}</h3>
                                        <span
                                            className={`text-xs px-2 py-0.5 rounded-full ${student.status === "Active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-gray-100 text-gray-700"
                                                }`}
                                        >
                                            {student.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Mail className="h-3 w-3" />
                                            {student.email}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            Joined {student.joinDate}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-muted rounded-full h-2 max-w-xs">
                                            <div
                                                className="bg-primary h-2 rounded-full"
                                                style={{ width: `${student.progress}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-muted-foreground">
                                            {student.progress}% complete
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                                        {student.plan}
                                    </span>
                                    <Button variant="ghost" size="icon">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDeleteStudent(student.id)}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Add Student Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Student</DialogTitle>
                        <DialogDescription>
                            Create a new student account. They will receive login credentials via email.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                value={newStudent.name}
                                onChange={(e) =>
                                    setNewStudent({ ...newStudent, name: e.target.value })
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                value={newStudent.email}
                                onChange={(e) =>
                                    setNewStudent({ ...newStudent, email: e.target.value })
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="plan">Plan</Label>
                            <select
                                id="plan"
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                value={newStudent.plan}
                                onChange={(e) =>
                                    setNewStudent({ ...newStudent, plan: e.target.value as "Free" | "Pro" | "Institutional" })
                                }
                            >
                                <option value="Free">Free</option>
                                <option value="Pro">Pro</option>
                                <option value="Institutional">Institutional</option>
                            </select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddStudent}>Add Student</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
