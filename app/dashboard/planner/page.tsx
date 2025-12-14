import { RoadmapForm } from "@/components/roadmap-form";

export default function PlannerPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Study Planner</h1>
                <p className="text-muted-foreground mt-1">Create your personalized AI-powered study roadmap.</p>
            </div>

            <RoadmapForm />
        </div>
    )
}
