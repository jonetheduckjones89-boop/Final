
import { NextResponse } from 'next/server';
import { delay } from '@/lib/mock/data';

export async function POST(request: Request) {
    const body = await request.json();
    const { tool, selection } = body;

    await delay(1000);

    let rewrittenText = selection;
    if (tool === 'simplify') {
        rewrittenText = "The patient has chest pain. It started 2 hours ago. He also feels short of breath.";
    } else if (tool === 'professional') {
        rewrittenText = "The patient presents with substernal chest discomfort of 2 hours duration, accompanied by dyspnea.";
    } else if (tool === 'remove-jargon') {
        rewrittenText = "The patient has heart pain and trouble breathing.";
    }

    return NextResponse.json({ rewritten: rewrittenText });
}
