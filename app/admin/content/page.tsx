"use client";

import { VideoUploader } from "@/components/video-uploader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminContentPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Content Management</h2>
                <p className="text-muted-foreground">
                    Upload and manage course videos and learning materials
                </p>
            </div>

            {/* Upload Section */}
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

            {/* Content Library */}
            <Card>
                <CardHeader>
                    <CardTitle>Content Library</CardTitle>
                    <CardDescription>
                        Manage existing videos and learning materials
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-sm text-muted-foreground py-8 text-center border rounded-lg border-dashed">
                        No content found. Upload your first video to get started.
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
