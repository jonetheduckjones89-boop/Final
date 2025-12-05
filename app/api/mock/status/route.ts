
import { NextResponse } from 'next/server';
import { delay } from '@/lib/mock/data';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');

    if (!jobId) {
        return NextResponse.json({ error: 'Missing jobId' }, { status: 400 });
    }

    // Simulate processing time
    // In a real app, this would check a database or queue.
    // For the mock, we'll just randomize it a bit or assume it's done quickly.

    // We can simulate a "processing" state if the client polls immediately, 
    // but for simplicity let's just say it takes a few seconds to be "processed".
    // Since we don't have real state persistence across serverless function calls in this mock setup easily without a DB,
    // we will just return "processed" to make the UX smoother for the demo, 
    // or we could use a deterministic hash of the ID to decide.

    // Let's simulate "processed" always for now to avoid getting stuck in "processing"
    // since we don't have a real backend worker.

    await delay(500);

    return NextResponse.json({
        jobId,
        status: 'processed',
        percent: 100
    });
}
