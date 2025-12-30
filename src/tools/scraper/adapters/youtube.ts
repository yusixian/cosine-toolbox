import type { DetectResult, PlatformAdapter, ScrapedResult, SubtitleEntry } from '../types';

// YouTube 视频 ID 正则
const YOUTUBE_PATTERNS = [
  /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
  /^([a-zA-Z0-9_-]{11})$/, // 直接输入 ID
];

function extractVideoId(url: string): string | null {
  for (const pattern of YOUTUBE_PATTERNS) {
    const match = url.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }
  return null;
}

export const youtubeAdapter: PlatformAdapter = {
  name: 'youtube',
  displayName: 'YouTube',

  detect(url: string): DetectResult {
    const id = extractVideoId(url);
    return {
      valid: id !== null,
      id,
    };
  },

  async fetch(videoId: string, lang = 'zh'): Promise<ScrapedResult> {
    // 动态导入避免 SSR 问题
    const { getVideoDetails } = await import('youtube-caption-extractor');

    const details = await getVideoDetails({ videoID: videoId, lang });

    if (!details) {
      throw new Error('无法获取视频信息');
    }

    // 转换字幕格式
    const subtitles: SubtitleEntry[] = (details.subtitles || []).map((sub) => {
      const start = Number.parseFloat(sub.start);
      const dur = Number.parseFloat(sub.dur);
      return {
        start,
        end: start + dur,
        text: sub.text,
      };
    });

    return {
      platform: 'youtube',
      metadata: {
        title: details.title || '未知标题',
        author: '', // youtube-caption-extractor 不返回作者信息
        description: details.description,
      },
      subtitles,
      rawUrl: `https://www.youtube.com/watch?v=${videoId}`,
      language: lang,
    };
  },
};
