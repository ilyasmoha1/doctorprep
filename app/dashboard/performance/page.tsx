"use client";

import { Card } from "@/components/ui/card";
import { Activity, BarChart3, TrendingUp, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function PerformancePage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Performance Analytics</h1>
                <p className="text-muted-foreground mt-1">Track your progress and identify areas for improvement.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Overall Score" value="72%" sub="Top 15%" icon={Activity} />
                <StatsCard title="Questions Done" value="1,240" sub="+120 this week" icon={Target} />
                <StatsCard title="Study Hours" value="48h" sub="+5h vs last week" icon={BarChart3} />
                <StatsCard title="Predicted Step 1" value="235" sub="Passing Probability: 92%" icon={TrendingUp} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Subject Weaknesses</h3>
                    <div className="space-y-4">
                        <SkillProgress label="Pharmacology" value={45} />
                        <SkillProgress label="Biochemistry" value={52} />
                        <SkillProgress label="Microbiology" value={68} />
                    </div>
                </Card>
                <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {/* Mock list */}
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                                <div>
                                    <p className="text-sm font-medium">Cardiology Block {i}</p>
                                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                                </div>
                                <span className="text-sm font-bold text-green-600">80%</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}

function StatsCard({ title, value, sub, icon: Icon }: any) {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">{title}</span>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground mt-1">{sub}</p>
        </Card>
    );
}

function SkillProgress({ label, value }: { label: string, value: number }) {
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-sm">
                <span>{label}</span>
                <span className="text-muted-foreground">{value}%</span>
            </div>
            <Progress value={value} className="h-2" />
        </div>
    );
}
