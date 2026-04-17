import { NextResponse } from 'next/server';
import { improveSystemPrompt } from '@/lib/prompts';
import { improveCopy } from '@/lib/openai';

export async function POST(request) {
  try {
    const { copy, instruction } = await request.json();
    if (!copy || !instruction?.trim()) {
      return NextResponse.json({ error: 'Copy and instruction are required' }, { status: 400 });
    }

    const improvedRaw = await improveCopy({ copy, instruction, improveSystemPrompt });
    const improved = {
      headline: improvedRaw.headline || copy.headline,
      subheadline: improvedRaw.subheadline || copy.subheadline,
      benefits: Array.isArray(improvedRaw.benefits) ? improvedRaw.benefits.slice(0, 3) : copy.benefits,
      cta: improvedRaw.cta || copy.cta,
      faq: Array.isArray(improvedRaw.faq) ? improvedRaw.faq.slice(0, 2) : copy.faq
    };

    return NextResponse.json({ copy: improved });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Improve failed' }, { status: 500 });
  }
}
