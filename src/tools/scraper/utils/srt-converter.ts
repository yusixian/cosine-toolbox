import type { SubtitleEntry } from '../types';

// 格式化时间为 SRT 格式 (HH:MM:SS,mmm)
function formatSrtTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')},${ms.toString().padStart(3, '0')}`;
}

// 将字幕数组转换为 SRT 格式字符串
export function toSrt(subtitles: SubtitleEntry[]): string {
  return subtitles
    .map((sub, index) => {
      const startTime = formatSrtTime(sub.start);
      const endTime = formatSrtTime(sub.end);
      return `${index + 1}\n${startTime} --> ${endTime}\n${sub.text}`;
    })
    .join('\n\n');
}

// 将字幕数组转换为纯文本 (不含时间戳)
export function toPlainText(subtitles: SubtitleEntry[]): string {
  return subtitles.map((sub) => sub.text).join('\n');
}

// 下载文件辅助函数
export function downloadFile(content: string, filename: string, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
