
import { NextResponse } from 'next/server';
import { delay } from '@/lib/mock/data';

export async function POST(request: Request) {
    await delay(1500); // Simulate upload delay

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // In a real app, we would save the file here.
    // For mock, we just generate a random ID.
    const jobId = `job_${Math.random().toString(36).substring(2, 9)}`;

    return NextResponse.json({
        jobId,
        status: 'processing',
        message: 'File uploaded successfully'
    });
}
