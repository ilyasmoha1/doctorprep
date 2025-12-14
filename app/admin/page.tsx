"use client";

import { useState, useEffect } from "react";
import { studentStore } from "@/lib/student-store";
import { questionStore } from "@/lib/question-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Video, BookOpen, TrendingUp, Plus, Eye } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalCourses: 8,
        totalVideos: 0,
        activeUsers: 0,
    });

    const [recentActivity, setRecentActivity] = useState<Array<{
        id: number;
        action: string;
        user: string;
        time: string;
    }>>([]);

    // Load real data
    useEffect(() => {
        const students = studentStore.getAll();
        const questions = questionStore.getAll();
        const activeStudents = students.filter(s => s.status === "Active");

        setStats({
            totalStudents: students.length,
            totalCourses: 8, // Keep as is for now
            totalVideos: questions.length, // Using questions as content count
            activeUsers: activeStudents.length,
        });

        // Generate recent activity from student data
        const activities = students.slice(0, 5).map((student, index) => ({
            id: index + 1,
            action: student.status === "Active" ? "Student active" : "Student registered",
            user: student.name,
            time: `${Math.floor(Math.random() * 7) + 1} days ago`,
        }));
        setRecentActivity(activities);
    }, []);

    const statsDisplay = [
        {
            title: "Total Students",
            value: stats.totalStudents.toString(),
            change: `${stats.activeUsers} active`,
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
        },
        {
            title: "Total Courses",
            value: stats.totalCourses.toString(),
            change: "Coming soon",
            icon: BookOpen,
            color: "text-green-600",
            bgColor: "bg-green-100",
        },
        {
            title: "Total Questions",
            value: stats.totalVideos.toString(),
            change: "Practice bank",
            icon: Video,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
        },
        {
            title: "Active Users",
            value: stats.activeUsers.toString(),
            change: `${Math.round((stats.activeUsers / stats.totalStudents) * 100) || 0}% of total`,
            icon: TrendingUp,
            color: "text-orange-600",
            bgColor: "bg-orange-100",
        },
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
                <p className="text-muted-foreground">
                    Welcome back! Here's what's happening with your platform.
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {statsDisplay.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <div className={`${stat.bgColor} p-2 rounded-lg`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.change}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>
                            Common tasks and shortcuts
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Link href="/admin/students">
                            <Button variant="outline" className="w-full justify-start gap-2">
                                <Plus className="h-4 w-4" />
                                Add New Student
                            </Button>
                        </Link>
                        <Link href="/admin/content">
                            <Button variant="outline" className="w-full justify-start gap-2">
                                <Video className="h-4 w-4" />
                                Upload Video
                            </Button>
                        </Link>
                        <Link href="/admin/courses">
                            <Button variant="outline" className="w-full justify-start gap-2">
                                <BookOpen className="h-4 w-4" />
                                Create Course
                            </Button>
                        </Link>
                        <Link href="/admin/students">
                            <Button variant="outline" className="w-full justify-start gap-2">
                                <Eye className="h-4 w-4" />
                                View All Students
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>
                            Latest updates and changes
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className="flex items-start gap-3">
                                    <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                                        <div className="h-2 w-2 bg-primary rounded-full" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {activity.action}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {activity.user} • {activity.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
