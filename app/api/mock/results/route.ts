
import { NextResponse } from 'next/server';
import { SAMPLE_RESULTS, delay } from '@/lib/mock/data';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');

    if (!jobId) {
        return NextResponse.json({ error: 'Missing jobId' }, { status: 400 });
    }

    await delay(800); // Simulate fetch delay

    // Return the sample results with the requested jobId
    return NextResponse.json({
        ...SAMPLE_RESULTS,
        jobId
    });
}
