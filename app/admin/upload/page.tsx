"use client";

import { VideoUploader } from "@/components/video-uploader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminUploadPage() {
    return (
        <div className="container mx-auto py-10 max-w-4xl space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/dashboard">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
                    <p className="text-muted-foreground">Upload and manage course videos.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Upload New Video</CardTitle>
                    <CardDescription>
                        Files are uploaded directly to the secure raw storage bucket.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <VideoUploader />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Uploads</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-sm text-muted-foreground py-8 text-center border rounded-lg border-dashed">
                        No recent uploads found (Mock).
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
