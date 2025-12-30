import type { Platform, PlatformAdapter, ScrapedResult } from '../types';
import { youtubeAdapter } from './youtube';

// 注册所有平台适配器
const adapters: PlatformAdapter[] = [
  youtubeAdapter,
  // 后续添加更多适配器:
  // bilibiliAdapter,
  // applePodcastAdapter,
  // xiaoyuzhouAdapter,
];

// 根据 URL 自动检测平台
export function detectPlatform(url: string): { platform: Platform; id: string } | null {
  for (const adapter of adapters) {
    const result = adapter.detect(url);
    if (result.valid && result.id) {
      return { platform: adapter.name, id: result.id };
    }
  }
  return null;
}

// 获取指定平台的适配器
export function getAdapter(platform: Platform): PlatformAdapter | undefined {
  return adapters.find((a) => a.name === platform);
}

// 根据 URL 自动获取字幕
export async function fetchSubtitles(url: string, lang?: string): Promise<ScrapedResult> {
  const detected = detectPlatform(url);
  if (!detected) {
    throw new Error('无法识别的平台或链接格式');
  }

  const adapter = getAdapter(detected.platform);
  if (!adapter) {
    throw new Error(`平台 ${detected.platform} 暂不支持`);
  }

  return adapter.fetch(detected.id, lang);
}

// 获取所有支持的平台信息
export function getSupportedPlatforms(): { name: Platform; displayName: string }[] {
  return adapters.map((a) => ({ name: a.name, displayName: a.displayName }));
}

export { adapters };
