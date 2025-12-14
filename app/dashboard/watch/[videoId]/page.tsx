import { prisma } from "@/lib/prisma";
import { CoursePlayer } from "@/components/course-player";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Define params type for Next.js 15+ (Promise)
type Params = Promise<{ videoId: string }>;

export default async function WatchPage(props: { params: Params }) {
    const params = await props.params;
    const { videoId } = params;

    // 1. Try to fetch from DB
    let video;
    try {
        video = await prisma.video.findUnique({
            where: { id: videoId },
        });
    } catch (e) {
        // ID might be invalid format (not MongoId), ignore
    }

    // 2. Fallback to Demo/Mock data if not found or if ID is "demo"
    if (!video) {
        video = {
            id: "demo",
            title: "Cardiovascular Physiology: Deep Dive (Demo)",
            description: "Understanding the cardiac cycle, pressure-volume loops, and murmurs. (This is a demo video)",
            hlsUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
        };
    }

    // In a real app, we would also fetch the user's progress here
    // const progress = ...

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
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{video.title}</h1>
                        <p className="text-muted-foreground">{video.description || "No description available."}</p>
                    </div>

                    <CoursePlayer
                        videoId={video.id} // Ensure we pass the ID we are using (demo or real)
                        videoUrl={video.hlsUrl || ""}
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
                            {/* Mock "Up Next" list for now, as we don't have module structure logic yet */}
                            <div className="text-sm text-muted-foreground">
                                Course content list will appear here.
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
