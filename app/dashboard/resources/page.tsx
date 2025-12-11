import { Card } from "@/components/ui/card";
import { Book, Video, FileText } from "lucide-react";

const modules = [
    { title: "Cardiology", type: "System", count: 24 },
    { title: "Neurology", type: "System", count: 18 },
    { title: "Immunology", type: "General Principles", count: 12 },
    { title: "Pathology", type: "General Principles", count: 35 },
    { title: "Pharmacology", type: "General Principles", count: 28 },
    { title: "Gastrointestinal", type: "System", count: 15 },
];

export default function ResourcesPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Resources & Modules</h1>
                <p className="text-muted-foreground mt-1">Access all study materials and Q-Banks.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((mod, i) => (
                    <Card key={i} className="p-6 hover:border-primary/50 transition-colors cursor-pointer">
                        <div className="flex items-start justify-between mb-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <Book className="h-5 w-5" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                                {mod.type}
                            </span>
                        </div>
                        <h3 className="font-semibold text-lg">{mod.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{mod.count} Lessons</p>
                    </Card>
                ))}
            </div>
        </div>
    )
}
