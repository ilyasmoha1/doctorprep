export default function PlannerPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Study Planner</h1>
                <p className="text-muted-foreground mt-1">Your AI-generated schedule for the week.</p>
            </div>

            <div className="border border-dashed border-border rounded-xl h-[500px] flex items-center justify-center bg-muted/20">
                <div className="text-center text-muted-foreground">
                    <p className="text-lg font-medium">Interactive Calendar Mockup</p>
                    <p className="text-sm">Visualize your roadmap here.</p>
                </div>
            </div>
        </div>
    )
}
