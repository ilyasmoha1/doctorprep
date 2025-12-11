import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
// import { auth } from "@/auth"; // Mocking auth for now as per frontend-only mode if needed, but structure is here

const s3 = new S3Client({
    region: process.env.AWS_REGION || "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "mock-key",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "mock-secret",
    },
});

export async function POST(req: Request) {
    // 1. Verify Admin (Mock)
    // const session = await auth();
    // if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { filename, fileType } = await req.json();

    // 2. Generate a unique key for the file
    const fileKey = `uploads/${Date.now()}-${filename}`;

    // 3. Create the Presigned URL
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_RAW || "doctorprep-raw-uploads",
        Key: fileKey,
        ContentType: fileType,
    });

    // URL valid for 5 minutes
    try {
        const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
        return NextResponse.json({ uploadUrl, fileKey });
    } catch (error) {
        console.error("S3 Error:", error);
        // Fallback for demo/mock environment
        return NextResponse.json({ uploadUrl: "https://mock-s3-upload-url.com", fileKey });
    }
}
