"use server"

import { openai } from "@/lib/openai"
import { z } from "zod"

// Schema for the input data from the user
const GenerateRoadmapSchema = z.object({
    examDate: z.string().refine((date) => {
        const examDate = new Date(date)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return examDate > today
    }, {
        message: "Exam date must be in the future"
    }),
    weakAreas: z.string().min(3, "Please specify at least one weak area"),
    hoursPerDay: z.number().min(1, "Must study at least 1 hour per day").max(16, "Cannot exceed 16 hours per day"),
})

export type GenerateRoadmapState = {
    errors?: {
        examDate?: string[];
        weakAreas?: string[];
        hoursPerDay?: string[];
    };
    message?: string;
    roadmap?: any; // To be replaced with typed object
}

export async function generateRoadmap(prevState: GenerateRoadmapState, formData: FormData) {
    const validatedFields = GenerateRoadmapSchema.safeParse({
        examDate: formData.get("examDate"),
        weakAreas: formData.get("weakAreas"),
        hoursPerDay: Number(formData.get("hoursPerDay")),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Validation Failed. Please check your inputs.",
        }
    }

    const { examDate, weakAreas, hoursPerDay } = validatedFields.data

    try {
        // In a real app, we would make the API call here.
        // For Development without a real Key, we'll return a stub if the key is dummy.

        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes("dummy")) {
            console.log("Mocking OpenAI response...");
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay

            // Calculate weeks until exam
            const today = new Date()
            const exam = new Date(examDate)
            const weeksUntilExam = Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 7))

            // Parse weak areas
            const areas = weakAreas.split(',').map(a => a.trim())

            return {
                message: "Success (Mock)",
                roadmap: {
                    title: `USMLE Step 1 - ${weeksUntilExam} Week Personalized Plan`,
                    modules: [
                        {
                            title: `Week 1-2: ${areas[0] || "Foundations"}`,
                            status: "Focus on fundamentals and key concepts",
                            duration: "2 weeks"
                        },
                        {
                            title: `Week 3-4: ${areas[1] || "Systems Review"}`,
                            status: "Deep dive into system pathology",
                            duration: "2 weeks"
                        },
                        {
                            title: `Week 5-6: ${areas[2] || "Integration"}`,
                            status: "Connect concepts across systems",
                            duration: "2 weeks"
                        },
                        {
                            title: "Week 7-8: Practice Questions",
                            status: "UWorld blocks and review",
                            duration: "2 weeks"
                        },
                        {
                            title: "Week 9-10: Weak Areas Review",
                            status: `Targeted review: ${weakAreas}`,
                            duration: "2 weeks"
                        },
                        {
                            title: `Final ${Math.max(1, weeksUntilExam - 10)} Weeks: Mock Exams`,
                            status: "Full-length practice tests",
                            duration: `${Math.max(1, weeksUntilExam - 10)} weeks`
                        }
                    ]
                }
            }
        }

        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are an expert medical tutor creating a study schedule for USMLE Step 1.",
                },
                {
                    role: "user",
                    content: `Create a study roadmap ending on ${examDate}. The student struggles with: ${weakAreas}. They can study ${hoursPerDay} hours/day. Return JSON with a 'title' and an array of 'modules' where each module has a 'title' and 'description'.`,
                },
            ],
            model: "gpt-3.5-turbo",
            response_format: { type: "json_object" },
        })

        const content = completion.choices[0].message.content;
        const roadmapData = content ? JSON.parse(content) : null;

        return {
            message: "Roadmap Generated Successfully",
            roadmap: roadmapData
        }

    } catch (error) {
        console.error("OpenAI Error:", error);
        return {
            message: "Error: Failed to Generate Roadmap. Please try again.",
        }
    }
}
