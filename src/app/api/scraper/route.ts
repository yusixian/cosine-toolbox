import { fetchSubtitles } from '@/tools/scraper/adapters';
import type { ScraperRequest, ScraperResponse } from '@/tools/scraper/types';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body: ScraperRequest = await request.json();

    if (!body.url) {
      return NextResponse.json<ScraperResponse>({
        success: false,
        error: '请提供视频/音频链接',
      });
    }

    const result = await fetchSubtitles(body.url, body.lang);

    return NextResponse.json<ScraperResponse>({
      success: true,
      data: result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : '未知错误';
    return NextResponse.json<ScraperResponse>({
      success: false,
      error: message,
    });
  }
}
