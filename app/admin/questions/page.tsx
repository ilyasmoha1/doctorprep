"use client";

import { useState } from "react";
import { questionStore } from "@/lib/question-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, HelpCircle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function AdminQuestionsPage() {
    const [questions, setQuestions] = useState(questionStore.getAll());
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newQuestion, setNewQuestion] = useState({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "A" as "A" | "B" | "C" | "D",
        category: "Anatomy",
        difficulty: "Easy" as "Easy" | "Medium" | "Hard",
        explanation: "",
    });

    const handleAddQuestion = () => {
        questionStore.add({
            question: newQuestion.question,
            options: {
                A: newQuestion.optionA,
                B: newQuestion.optionB,
                C: newQuestion.optionC,
                D: newQuestion.optionD,
            },
            correctAnswer: newQuestion.correctAnswer,
            category: newQuestion.category,
            difficulty: newQuestion.difficulty,
            explanation: newQuestion.explanation,
        });
        setQuestions(questionStore.getAll());
        setNewQuestion({
            question: "",
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: "",
            correctAnswer: "A",
            category: "Anatomy",
            difficulty: "Easy",
            explanation: "",
        });
        setIsAddDialogOpen(false);
    };

    const handleDeleteQuestion = (id: number) => {
        if (confirm("Are you sure you want to delete this question?")) {
            questionStore.delete(id);
            setQuestions(questionStore.getAll());
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Question Bank</h2>
                    <p className="text-muted-foreground">
                        Manage practice questions for students
                    </p>
                </div>
                <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Question
                </Button>
            </div>

            <div className="grid gap-4">
                {questions.map((q) => (
                    <Card key={q.id}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <CardTitle className="text-lg">{q.question}</CardTitle>
                                    <CardDescription className="flex items-center gap-2 mt-2">
                                        <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                                            {q.category}
                                        </span>
                                        <span className={`px-2 py-1 rounded text-xs ${q.difficulty === "Easy" ? "bg-green-100 text-green-700" :
                                                q.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700" :
                                                    "bg-red-100 text-red-700"
                                            }`}>
                                            {q.difficulty}
                                        </span>
                                    </CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDeleteQuestion(q.id)}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className={`p-2 rounded ${q.correctAnswer === "A" ? "bg-green-100 border-2 border-green-500" : "bg-muted"}`}>
                                    <strong>A:</strong> {q.options.A}
                                </div>
                                <div className={`p-2 rounded ${q.correctAnswer === "B" ? "bg-green-100 border-2 border-green-500" : "bg-muted"}`}>
                                    <strong>B:</strong> {q.options.B}
                                </div>
                                <div className={`p-2 rounded ${q.correctAnswer === "C" ? "bg-green-100 border-2 border-green-500" : "bg-muted"}`}>
                                    <strong>C:</strong> {q.options.C}
                                </div>
                                <div className={`p-2 rounded ${q.correctAnswer === "D" ? "bg-green-100 border-2 border-green-500" : "bg-muted"}`}>
                                    <strong>D:</strong> {q.options.D}
                                </div>
                            </div>
                            {q.explanation && (
                                <div className="mt-3 p-3 bg-blue-50 rounded text-sm">
                                    <strong>Explanation:</strong> {q.explanation}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add New Question</DialogTitle>
                        <DialogDescription>
                            Create a new practice question for students
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="question">Question</Label>
                            <Input
                                id="question"
                                value={newQuestion.question}
                                onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                                placeholder="Enter the question..."
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="optionA">Option A</Label>
                                <Input
                                    id="optionA"
                                    value={newQuestion.optionA}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, optionA: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="optionB">Option B</Label>
                                <Input
                                    id="optionB"
                                    value={newQuestion.optionB}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, optionB: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="optionC">Option C</Label>
                                <Input
                                    id="optionC"
                                    value={newQuestion.optionC}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, optionC: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="optionD">Option D</Label>
                                <Input
                                    id="optionD"
                                    value={newQuestion.optionD}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, optionD: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="correctAnswer">Correct Answer</Label>
                                <select
                                    id="correctAnswer"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    value={newQuestion.correctAnswer}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value as "A" | "B" | "C" | "D" })}
                                >
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <select
                                    id="category"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    value={newQuestion.category}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                                >
                                    <option value="Anatomy">Anatomy</option>
                                    <option value="Physiology">Physiology</option>
                                    <option value="Pharmacology">Pharmacology</option>
                                    <option value="Pathology">Pathology</option>
                                    <option value="Cardiology">Cardiology</option>
                                    <option value="Gastroenterology">Gastroenterology</option>
                                    <option value="Immunology">Immunology</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="difficulty">Difficulty</Label>
                                <select
                                    id="difficulty"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    value={newQuestion.difficulty}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value as "Easy" | "Medium" | "Hard" })}
                                >
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="explanation">Explanation (Optional)</Label>
                            <Input
                                id="explanation"
                                value={newQuestion.explanation}
                                onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
                                placeholder="Explain why this is the correct answer..."
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddQuestion}>Add Question</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
