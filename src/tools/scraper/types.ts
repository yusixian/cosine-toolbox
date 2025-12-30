export type Platform = 'youtube' | 'bilibili' | 'apple-podcast' | 'xiaoyuzhou';

export interface SubtitleEntry {
  start: number; // 开始时间 (秒)
  end: number; // 结束时间 (秒)
  text: string;
}

export interface VideoMetadata {
  title: string;
  author: string;
  description?: string;
  duration?: number; // 秒
  thumbnail?: string;
}

export interface ScrapedResult {
  platform: Platform;
  metadata: VideoMetadata;
  subtitles: SubtitleEntry[];
  rawUrl: string;
  language?: string;
  availableLanguages?: string[];
}

export interface DetectResult {
  valid: boolean;
  id: string | null;
}

// 平台适配器接口 - 插件化架构核心
export interface PlatformAdapter {
  name: Platform;
  displayName: string;
  // 检测 URL 是否属于该平台，并提取 ID
  detect(url: string): DetectResult;
  // 根据 ID 获取字幕和元数据
  fetch(id: string, lang?: string): Promise<ScrapedResult>;
}

// API 请求/响应类型
export interface ScraperRequest {
  url: string;
  lang?: string;
}

export interface ScraperResponse {
  success: boolean;
  data?: ScrapedResult;
  error?: string;
}
