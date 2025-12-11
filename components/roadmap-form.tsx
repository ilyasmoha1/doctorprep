"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { generateRoadmap, GenerateRoadmapState } from "@/app/actions/generate-roadmap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Generating Plan..." : "Generate My Roadmap"}
        </Button>
    )
}

export function RoadmapForm() {
    const initialState: GenerateRoadmapState = { message: "", errors: {} }
    // @ts-ignore - types for useActionState might differ in React 19 / Canary compared to standard
    const [state, dispatch] = useActionState(generateRoadmap, initialState)

    return (
        <div className="space-y-8">
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Create Your Study Plan</CardTitle>
                    <CardDescription>
                        Tell us about your exam goals and schedule.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={dispatch} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="examDate">Exam Date</Label>
                            <Input id="examDate" name="examDate" type="date" required />
                            {state.errors?.examDate && (
                                <p className="text-sm text-red-500">{state.errors.examDate}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="hoursPerDay">Study Hours Per Day</Label>
                            <Input
                                id="hoursPerDay"
                                name="hoursPerDay"
                                type="number"
                                min="1"
                                max="16"
                                defaultValue="4"
                                required
                            />
                            {state.errors?.hoursPerDay && (
                                <p className="text-sm text-red-500">{state.errors.hoursPerDay}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="weakAreas">Target Weak Areas</Label>
                            <Input
                                id="weakAreas"
                                name="weakAreas"
                                placeholder="e.g. Cardiology, Biochemistry, Ethics"
                                required
                            />
                            {state.errors?.weakAreas && (
                                <p className="text-sm text-red-500">{state.errors.weakAreas}</p>
                            )}
                        </div>

                        <div className="pt-4">
                            <SubmitButton />
                        </div>

                        {state.message && (
                            <div className="p-3 bg-blue-50 text-blue-700 rounded-md text-sm">
                                {state.message}
                            </div>
                        )}
                    </form>
                </CardContent>
            </Card>

            {state.roadmap && (
                <div className="max-w-4xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    <h2 className="text-2xl font-bold">{state.roadmap.title}</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {state.roadmap.modules.map((mod: any, i: number) => (
                            <Card key={i}>
                                <CardHeader>
                                    <CardTitle className="text-lg">{mod.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{mod.status}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
