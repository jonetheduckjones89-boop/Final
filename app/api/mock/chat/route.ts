
import { NextResponse } from 'next/server';
import { MOCK_CHATS, delay } from '@/lib/mock/data';

export async function POST(request: Request) {
    const body = await request.json();
    const { jobId, message } = body;

    if (!jobId || !message) {
        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    await delay(1200); // Simulate AI thinking time

    // Pick a random response from mock chats
    const randomResponse = MOCK_CHATS[Math.floor(Math.random() * MOCK_CHATS.length)];

    return NextResponse.json(randomResponse);
}
