"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth-context";
import { questionStore } from "@/lib/question-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function QuestionsPage() {
    const { user } = useAuth();
    const [questions] = useState(questionStore.getAll());
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<"A" | "B" | "C" | "D" | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState<{ isCorrect: boolean; correctAnswer: string; explanation?: string } | null>(null);

    const currentQuestion = questions[currentQuestionIndex];
    const stats = user?.id ? questionStore.getStudentStats(user.id) : { questionsAnswered: 0, correctAnswers: 0, accuracy: 0 };

    const handleSubmit = () => {
        if (!selectedAnswer || !user?.id) return;

        const submitResult = questionStore.submitAnswer(user.id, currentQuestion.id, selectedAnswer);
        setResult(submitResult);
        setShowResult(true);
    };

    const handleNext = () => {
        setSelectedAnswer(null);
        setShowResult(false);
        setResult(null);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setCurrentQuestionIndex(0);
        }
    };

    return (
        <div className="container mx-auto py-8 max-w-4xl space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Practice Questions</h1>
                        <p className="text-muted-foreground">Test your knowledge</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-sm text-muted-foreground">Your Stats</p>
                    <p className="text-2xl font-bold">{stats.accuracy}% Accuracy</p>
                    <p className="text-xs text-muted-foreground">{stats.questionsAnswered} questions answered</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardDescription>
                            Question {currentQuestionIndex + 1} of {questions.length}
                        </CardDescription>
                        <div className="flex gap-2">
                            <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                                {currentQuestion.category}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs ${currentQuestion.difficulty === "Easy" ? "bg-green-100 text-green-700" :
                                    currentQuestion.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700" :
                                        "bg-red-100 text-red-700"
                                }`}>
                                {currentQuestion.difficulty}
                            </span>
                        </div>
                    </div>
                    <CardTitle className="text-xl mt-4">{currentQuestion.question}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-3">
                        {(["A", "B", "C", "D"] as const).map((option) => (
                            <button
                                key={option}
                                onClick={() => !showResult && setSelectedAnswer(option)}
                                disabled={showResult}
                                className={`p-4 text-left rounded-lg border-2 transition-all ${selectedAnswer === option
                                        ? showResult
                                            ? result?.isCorrect
                                                ? "border-green-500 bg-green-50"
                                                : "border-red-500 bg-red-50"
                                            : "border-primary bg-primary/5"
                                        : showResult && option === result?.correctAnswer
                                            ? "border-green-500 bg-green-50"
                                            : "border-border hover:border-primary/50"
                                    } ${showResult ? "cursor-not-allowed" : "cursor-pointer"}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${selectedAnswer === option
                                            ? showResult
                                                ? result?.isCorrect
                                                    ? "bg-green-500 text-white"
                                                    : "bg-red-500 text-white"
                                                : "bg-primary text-primary-foreground"
                                            : showResult && option === result?.correctAnswer
                                                ? "bg-green-500 text-white"
                                                : "bg-muted"
                                        }`}>
                                        {option}
                                    </div>
                                    <span className="flex-1">{currentQuestion.options[option]}</span>
                                    {showResult && selectedAnswer === option && (
                                        result?.isCorrect ? (
                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                        ) : (
                                            <XCircle className="h-5 w-5 text-red-500" />
                                        )
                                    )}
                                    {showResult && option === result?.correctAnswer && selectedAnswer !== option && (
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    {showResult && result?.explanation && (
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="font-semibold text-blue-900 mb-2">Explanation:</p>
                            <p className="text-blue-800 text-sm">{result.explanation}</p>
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        {!showResult ? (
                            <Button
                                onClick={handleSubmit}
                                disabled={!selectedAnswer}
                                className="flex-1"
                            >
                                Submit Answer
                            </Button>
                        ) : (
                            <Button onClick={handleNext} className="flex-1">
                                {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Start Over"}
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
