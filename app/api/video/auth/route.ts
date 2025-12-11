// Video Auth Route - Minting CloudFront Cookies
import { getSignedCookies } from "@aws-sdk/cloudfront-signer";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    // 1. Verify User has access (Paid Plan check)
    // const user = await getCurrentUser();
    // if (!user.hasAccess) return new Response("Upgrade Plan", { status: 403 });

    // 2. Define Policy (Allow access to all videos for 6 hours)
    const policy = JSON.stringify({
        Statement: [
            {
                Resource: "https://cdn.doctorprep.com/videos/*", // Allow all videos
                Condition: {
                    DateLessThan: { "AWS:EpochTime": Math.floor(Date.now() / 1000) + 6 * 3600 },
                },
            },
        ],
    });

    // 3. Generate Signed Cookies
    try {
        // Mock check for missing keys
        if (!process.env.CLOUDFRONT_KEY_PAIR_ID || !process.env.CLOUDFRONT_PRIVATE_KEY) {
            console.warn("Missing CloudFront keys, returning mock success for dev.");
            return new Response("Authorized (Mock Mode)", { status: 200 });
        }

        const cookieOptions = getSignedCookies({
            keyPairId: process.env.CLOUDFRONT_KEY_PAIR_ID!,
            privateKey: process.env.CLOUDFRONT_PRIVATE_KEY!,
            policy,
        });

        // 4. Set Cookies on Response
        const cookieStore = await cookies();

        if (cookieOptions["CloudFront-Policy"]) {
            cookieStore.set("CloudFront-Policy", cookieOptions["CloudFront-Policy"], { domain: ".doctorprep.com", secure: true, httpOnly: true });
        }
        if (cookieOptions["CloudFront-Signature"]) {
            cookieStore.set("CloudFront-Signature", cookieOptions["CloudFront-Signature"], { domain: ".doctorprep.com", secure: true, httpOnly: true });
        }
        if (cookieOptions["CloudFront-Key-Pair-Id"]) {
            cookieStore.set("CloudFront-Key-Pair-Id", cookieOptions["CloudFront-Key-Pair-Id"], { domain: ".doctorprep.com", secure: true, httpOnly: true });
        }

        return new Response("Authorized", { status: 200 });
    } catch (error) {
        console.error("CloudFront Sign Error", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
