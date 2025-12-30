'use client';

import Button from '@/components/ui/button/Button';
import { Card, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { detectPlatform, getSupportedPlatforms } from './adapters';
import type { Platform, ScrapedResult, SubtitleEntry } from './types';
import { downloadFile, toPlainText, toSrt } from './utils/srt-converter';

// 平台 logo/颜色配置
const platformConfig: Record<Platform, { color: string; label: string }> = {
  youtube: { color: '#FF0000', label: 'YouTube' },
  bilibili: { color: '#00A1D6', label: 'Bilibili' },
  'apple-podcast': { color: '#9933FF', label: 'Apple Podcasts' },
  xiaoyuzhou: { color: '#FF6B6B', label: '小宇宙' },
};

export function Scraper() {
  const [url, setUrl] = useState('');
  const [lang, setLang] = useState('zh-Hans');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScrapedResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 实时检测平台
  const detected = url.trim() ? detectPlatform(url.trim()) : null;

  const handleFetch = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/scraper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim(), lang }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || '获取失败');
      }

      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (format: 'json' | 'srt' | 'txt') => {
    if (!result) return;

    const filename = `${result.metadata.title || 'subtitles'}`;

    switch (format) {
      case 'json':
        downloadFile(JSON.stringify(result, null, 2), `${filename}.json`, 'application/json');
        break;
      case 'srt':
        downloadFile(toSrt(result.subtitles), `${filename}.srt`, 'text/srt');
        break;
      case 'txt':
        downloadFile(toPlainText(result.subtitles), `${filename}.txt`, 'text/plain');
        break;
    }
  };

  const reset = () => {
    setUrl('');
    setResult(null);
    setError(null);
  };

  return (
    <motion.div layoutId="/scraper" className="flex flex-col gap-4">
      {/* 输入区域 */}
      <Card className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="flex-1 rounded border border-border bg-transparent px-3 py-2"
            placeholder="粘贴视频/音频链接..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
          />
          {detected && (
            <span
              className="rounded-full px-2 py-1 text-xs text-white"
              style={{ backgroundColor: platformConfig[detected.platform]?.color || '#666' }}
            >
              {platformConfig[detected.platform]?.label || detected.platform}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            className="w-28 rounded border border-border bg-transparent px-2 py-2 text-sm"
            placeholder="语言代码"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          />
          <Button onClick={handleFetch} disabled={!detected || loading} className="flex-1">
            {loading ? '获取中...' : '获取字幕'}
          </Button>
          <Button onClick={reset} variant="bordered">
            重置
          </Button>
        </div>

        {/* 支持的平台提示 */}
        <p className="text-xs text-gray-500">
          支持平台:{' '}
          {getSupportedPlatforms()
            .map((p) => p.displayName)
            .join(', ')}{' '}
          | 语言: zh-Hans, en, ja, ko...
        </p>
      </Card>

      {/* 错误提示 */}
      {error && (
        <Card className="border-red-500 bg-red-50 dark:bg-red-900/20">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </Card>
      )}

      {/* 结果展示 */}
      {result && (
        <>
          {/* 元数据卡片 */}
          <Card>
            <CardTitle>{result.metadata.title}</CardTitle>
            {result.metadata.author && <p className="mt-1 text-sm text-gray-500">作者: {result.metadata.author}</p>}
            {result.metadata.description && (
              <p className="mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">{result.metadata.description}</p>
            )}
            <div className="mt-3 flex gap-2">
              <span className="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">{result.subtitles.length} 条字幕</span>
              {result.language && (
                <span className="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">语言: {result.language}</span>
              )}
            </div>
          </Card>

          {/* 导出按钮 */}
          <Card className="flex flex-wrap gap-2">
            <Button onClick={() => handleExport('json')} variant="bordered" className="flex-1">
              导出 JSON
            </Button>
            <Button onClick={() => handleExport('srt')} variant="bordered" className="flex-1">
              导出 SRT
            </Button>
            <Button onClick={() => handleExport('txt')} variant="bordered" className="flex-1">
              导出纯文本
            </Button>
          </Card>

          {/* 字幕列表 */}
          <Card>
            <CardTitle>字幕内容</CardTitle>
            <div className="mt-3 max-h-96 overflow-y-auto">
              {result.subtitles.map((sub, index) => (
                <SubtitleRow key={index} entry={sub} />
              ))}
            </div>
          </Card>
        </>
      )}
    </motion.div>
  );
}

function SubtitleRow({ entry }: { entry: SubtitleEntry }) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex gap-3 border-b border-border py-2 last:border-b-0">
      <span className="w-20 shrink-0 text-xs text-gray-400">
        {formatTime(entry.start)} - {formatTime(entry.end)}
      </span>
      <span className="text-sm">{entry.text}</span>
    </div>
  );
}
