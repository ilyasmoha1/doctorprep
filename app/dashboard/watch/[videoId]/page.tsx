"use client";

import { CoursePlayer } from "@/components/course-player";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation"; // Correct hook for App Router params

export default function WatchPage() {
    const params = useParams();
    const videoId = params?.videoId as string || "demo";

    // In a real app, fetch video metadata by ID
    const demoVideo = {
        title: "Cardiovascular Physiology: Deep Dive",
        description: "Understanding the cardiac cycle, pressure-volume loops, and murmurs.",
        url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", // Public HLS test stream for demo
    };

    return (
        <div className="container mx-auto py-6 px-4 md:px-6 max-w-screen-xl space-y-6">
            <div className="flex items-center gap-4 mb-4">
                <Link href="/dashboard">
                    <Button variant="ghost" size="sm" className="pl-0 hover:pl-2 transition-all">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
                    </Button>
                </Link>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content: Player */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{demoVideo.title}</h1>
                        <p className="text-muted-foreground">{demoVideo.description}</p>
                    </div>

                    <CoursePlayer
                        videoId={videoId}
                        videoUrl={demoVideo.url}
                        initialProgress={0}
                    />

                    <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                        <div className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-primary" />
                            <span className="font-semibold text-sm">Associated Reading</span>
                        </div>
                        <Button variant="outline" size="sm">Open Module Notes</Button>
                    </div>
                </div>

                {/* Sidebar: Course Content / Playlist */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Up Next</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className={`flex gap-3 items-start p-3 rounded-lg transition-colors ${i === 1 ? 'bg-primary/5 border border-primary/20' : 'hover:bg-muted'}`}>
                                    <div className="mt-1">
                                        {i === 1 ? <div className="h-2 w-2 rounded-full bg-primary animate-pulse" /> : <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />}
                                    </div>
                                    <div className="space-y-1">
                                        <p className={`text-sm font-medium ${i === 1 ? 'text-primary' : 'text-foreground'}`}>
                                            {i === 1 ? "Current: Cardiac Cycle" : i === 2 ? "Heart Failure Mechanisms" : "Pharmacology: Anti-arrhythmics"}
                                        </p>
                                        <p className="text-xs text-muted-foreground">12:45 • Dr. Smith</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
