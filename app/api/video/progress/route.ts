import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const { videoId, playedSeconds, percentComplete, isCompleted } = await req.json();

    // verify user
    // const session = await auth();

    console.log(`[Progress Sync] Video: ${videoId}, Played: ${playedSeconds}s, Done: ${isCompleted}`);

    // In real app:
    // await prisma.videoProgress.upsert(...)

    return NextResponse.json({ success: true });
}
