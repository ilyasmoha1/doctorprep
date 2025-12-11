"use client";
import React, { useRef, useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Dynamically import ReactPlayer to avoid SSR hydration mismatches
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface CoursePlayerProps {
    videoUrl: string;
    videoId: string;
    initialProgress?: number;
}

export function CoursePlayer({ videoUrl, videoId, initialProgress = 0 }: CoursePlayerProps) {
    // const playerRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Request auth cookies on mount
        fetch("/api/video/auth").catch(err => console.error("Auth cookie failed", err));
    }, []);

    // Send progress every 10 seconds or on pause
    const updateProgress = useCallback(async (state: { playedSeconds: number; played: number; loaded: number; loadedSeconds: number }) => {
        const { playedSeconds, played } = state;

        // throttle or simple fire-and-forget
        fetch("/api/video/progress", {
            method: "POST",
            body: JSON.stringify({
                videoId,
                playedSeconds,
                percentComplete: played * 100,
                isCompleted: played > 0.9 // Mark done at 90%
            })
        }).catch(e => console.error("Progress sync failed", e));
    }, [videoId]);

    if (!mounted) {
        return (
            <div className="w-full aspect-video bg-black flex items-center justify-center text-white">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
            <ReactPlayer
                url={videoUrl}
                controls
                width="100%"
                height="100%"
                // Start where they left off
                onReady={(player) => {
                    if (initialProgress > 0) {
                        player.seekTo(initialProgress);
                    }
                }}
                // Heartbeat
                onProgress={updateProgress}
                progressInterval={10000} // Run every 10s
                config={{
                    file: {
                        forceHLS: true, // If using .m3u8
                        attributes: {
                            crossOrigin: 'true' // needed for storage access if on different domain
                        }
                    }
                }}
            />
        </div>
    );
}
