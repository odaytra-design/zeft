import { NextResponse } from 'next/server';
import { copySystemPrompt, strategySystemPrompt } from '@/lib/prompts';
import { generateCopy, generateStrategy } from '@/lib/openai';

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    if (!prompt?.trim()) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const strategyRaw = await generateStrategy(prompt, strategySystemPrompt);
    const strategy = {
      goal: strategyRaw.goal || 'lead',
      businessType: strategyRaw.businessType || '',
      audience: strategyRaw.audience || '',
      location: strategyRaw.location || '',
      tone: strategyRaw.tone || '',
      angle: strategyRaw.angle || '',
      painPoints: Array.isArray(strategyRaw.painPoints) ? strategyRaw.painPoints.slice(0, 4) : [],
      desires: Array.isArray(strategyRaw.desires) ? strategyRaw.desires.slice(0, 4) : [],
      objections: Array.isArray(strategyRaw.objections) ? strategyRaw.objections.slice(0, 4) : [],
      ctaType: strategyRaw.ctaType || ''
    };

    const copyRaw = await generateCopy({ prompt, strategy, copySystemPrompt });
    const copy = {
      headline: copyRaw.headline || 'عنوان غير متوفر',
      subheadline: copyRaw.subheadline || 'وصف غير متوفر',
      benefits: Array.isArray(copyRaw.benefits) ? copyRaw.benefits.slice(0, 3) : [],
      cta: copyRaw.cta || 'ابدأ الآن',
      faq: Array.isArray(copyRaw.faq) ? copyRaw.faq.slice(0, 2) : []
    };

    return NextResponse.json({ strategy, copy });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Generation failed' }, { status: 500 });
  }
}
