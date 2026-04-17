import { NextResponse } from 'next/server';
import { renderLandingPageHtml } from '@/lib/render-landing-page';

export async function POST(request) {
  try {
    const { idea, copy } = await request.json();
    if (!idea?.trim() || !copy) {
      return NextResponse.json({ error: 'Idea and copy are required' }, { status: 400 });
    }

    const html = renderLandingPageHtml({ idea, copy });
    return NextResponse.json({ html });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Render failed' }, { status: 500 });
  }
}
