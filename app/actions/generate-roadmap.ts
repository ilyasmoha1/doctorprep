"use server"

import { openai } from "@/lib/openai"
import { z } from "zod"

// Schema for the input data from the user
const GenerateRoadmapSchema = z.object({
    examDate: z.string(),
    weakAreas: z.string(),
    hoursPerDay: z.number().min(1).max(16),
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
            message: "Missing Fields. Failed to Generate Roadmap.",
        }
    }

    const { examDate, weakAreas, hoursPerDay } = validatedFields.data

    try {
        // In a real app, we would make the API call here.
        // For Development without a real Key, we'll return a stub if the key is dummy.

        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes("dummy")) {
            console.log("Mocking OpenAI response...");
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
            return {
                message: "Success (Mock)",
                roadmap: {
                    title: "USMLE Step 1 - Personalized Plan",
                    modules: [
                        { title: "Week 1: " + (weakAreas.split(',')[0] || "Foundations"), status: "PENDING" },
                        { title: "Week 2: Systems Review", status: "PENDING" },
                        { title: "Week 3: Pathology Integration", status: "PENDING" }
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
            message: "Database Error: Failed to Generate Roadmap.",
        }
    }
}
