"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Award, Target, Flame, Settings, User, Bell, Moon, Calendar, HelpCircle } from "lucide-react";
import { useAuth } from "@/components/auth-context";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

// Mock Data
const stats = [
    {
        label: "Daily Streak",
        value: "1 Day", // Updated for new user feel
        icon: Flame,
        color: "text-orange-500",
        bg: "bg-orange-500/10",
    },
    {
        label: "Questions Solved",
        value: "0",
        icon: Target,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        label: "Accuracy",
        value: "--",
        icon: Award,
        color: "text-green-500",
        bg: "bg-green-500/10",
    },
];

const continueLearning = [
    {
        title: "Cardiovascular System",
        subtitle: "Module 4 • Physiology",
        progress: 0,
        image: "from-blue-600 to-indigo-600",
    },
    {
        title: "Neurology Basics",
        subtitle: "Module 2 • Anatomy",
        progress: 0,
        image: "from-emerald-600 to-teal-600",
    },
];

export default function DashboardPage() {
    const { user, settings, updateSettings, logout } = useAuth();
    const [localSettings, setLocalSettings] = useState(settings);
    const [open, setOpen] = useState(false);

    const handleSaveSettings = () => {
        updateSettings(localSettings);
        setOpen(false);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header / Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/40 pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name.split(' ')[0]}</h1>
                    <p className="text-muted-foreground mt-1">Ready to crush your goals today?</p>
                </div>
                <div className="flex items-center gap-3">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="icon" aria-label="Settings">
                                <Settings className="h-5 w-5" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Settings</DialogTitle>
                                <DialogDescription>
                                    Manage your study preferences.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="flex items-center justify-between space-x-2">
                                    <Label htmlFor="notifications" className="flex flex-col space-y-1">
                                        <span>Notifications</span>
                                        <span className="font-normal text-xs text-muted-foreground">Receive daily study reminders.</span>
                                    </Label>
                                    <Switch
                                        id="notifications"
                                        checked={localSettings.notifications}
                                        onCheckedChange={(c) => setLocalSettings({ ...localSettings, notifications: c })}
                                    />
                                </div>
                                <div className="flex items-center justify-between space-x-2">
                                    <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
                                        <span>Dark Mode</span>
                                        <span className="font-normal text-xs text-muted-foreground">Easier on the eyes at night.</span>
                                    </Label>
                                    <Switch
                                        id="dark-mode"
                                        checked={localSettings.darkMode}
                                        onCheckedChange={(c) => setLocalSettings({ ...localSettings, darkMode: c })}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                                <Button onClick={handleSaveSettings}>Save Changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Button variant="outline" onClick={logout}>Sign Out</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {stats.map((stat, i) => (
                            <Card key={i} className="p-4 flex items-center space-x-4 border-border/60 shadow-sm hover:shadow-md transition-all">
                                <div className={`p-3 rounded-full ${stat.bg} ${stat.color}`}>
                                    <stat.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                                    <h3 className="text-xl font-bold">{stat.value}</h3>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Continue Learning */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center"><PlayCircle className="mr-2 h-5 w-5 text-primary" /> Continue Learning</h2>
                            <Button variant="link" className="text-primary">View All Modules</Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {continueLearning.map((item, i) => (
                                <Link href={`/dashboard/watch/${i === 0 ? 'cardio-101' : 'neuro-basics'}`} key={i}>
                                    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-border/50 cursor-pointer h-full">
                                        <div className={`h-32 bg-gradient-to-r ${item.image} relative p-6 flex items-end`}>
                                            <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm p-1.5 rounded-full text-white/80 group-hover:bg-white group-hover:text-primary transition-all">
                                                <PlayCircle className="h-6 w-6" />
                                            </div>
                                            <div className="text-white">
                                                <span className="text-xs font-medium bg-black/30 px-2 py-1 rounded backdrop-blur-md">
                                                    {item.subtitle}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                                            <div className="space-y-2 mt-4">
                                                <div className="flex justify-between text-xs text-muted-foreground font-medium">
                                                    <span>Progress</span>
                                                    <span>{item.progress}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary transition-all duration-1000 ease-out" style={{ width: `${item.progress > 5 ? item.progress : 5}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Widget Area */}
                <div className="space-y-6">
                    {/* Plan Widget */}
                    <Card className="bg-primary text-primary-foreground border-none shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" /> Student Profile
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="mb-4">
                                <p className="text-blue-100 text-sm">Create your personalized study plan to reach your target score.</p>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium opacity-80">Current Plan</span>
                                <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold">{user?.plan} Trial</span>
                            </div>
                            <div className="mt-6">
                                <Button variant="secondary" className="w-full font-bold text-primary hover:bg-white" onClick={() => setOpen(true)}>
                                    Complete Profile
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-2">
                            <Link href="/dashboard/planner">
                                <Button variant="ghost" className="w-full justify-start">
                                    <Calendar className="mr-2 h-4 w-4" /> Study Planner
                                </Button>
                            </Link>
                            <Link href="/questions">
                                <Button variant="ghost" className="w-full justify-start">
                                    <HelpCircle className="mr-2 h-4 w-4" /> Practice Questions
                                </Button>
                            </Link>
                            <Link href="/dashboard/resources">
                                <Button variant="ghost" className="w-full justify-start">
                                    <PlayCircle className="mr-2 h-4 w-4" /> Study Resources
                                </Button>
                            </Link>
                            <Button variant="ghost" className="w-full justify-start" onClick={() => setOpen(true)}>
                                <Settings className="mr-2 h-4 w-4" /> Settings
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
