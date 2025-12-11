"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud, CheckCircle, Loader2 } from "lucide-react";

export function VideoUploader() {
    const [uploading, setUploading] = useState(false);
    const [complete, setComplete] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setComplete(false);

        try {
            // 1. Get the Presigned URL from our API
            const res = await fetch("/api/admin/upload", {
                method: "POST",
                body: JSON.stringify({ filename: file.name, fileType: file.type }),
            });
            const { uploadUrl, fileKey } = await res.json();

            // 2. Upload directly to AWS S3 (bypassing our server)
            console.log("Uploading to:", uploadUrl);

            // Note: This will fail in mock mode if uploadUrl is invalid, so we wrap in try/catch or assume success for demo
            if (uploadUrl.includes("mock-s3")) {
                await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate upload
            } else {
                await fetch(uploadUrl, {
                    method: "PUT",
                    body: file,
                    headers: { "Content-Type": file.type },
                });
            }

            // 3. Notify our DB that upload is done
            // await saveVideoToDb(fileKey); 
            console.log("File uploaded:", fileKey);
            setComplete(true);
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="border-2 border-dashed border-border p-8 rounded-xl text-center hover:bg-secondary/20 transition-colors">
            <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                id="video-upload"
                className="hidden"
                disabled={uploading}
            />
            <label htmlFor="video-upload" className="cursor-pointer flex flex-col items-center gap-4">
                {uploading ? (
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                ) : complete ? (
                    <CheckCircle className="h-10 w-10 text-green-500" />
                ) : (
                    <UploadCloud className="h-10 w-10 text-muted-foreground" />
                )}

                <div className="space-y-1">
                    <h3 className="font-semibold text-lg">
                        {uploading ? "Uploading to S3..." : complete ? "Upload Complete" : "Click to Upload Video"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {uploading ? "Please wait, do not close this tab." : "MP4 files only. Direct secure upload."}
                    </p>
                </div>
            </label>
        </div>
    );
}
