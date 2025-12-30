import { MdSubtitles } from 'react-icons/md';
import { defineTool } from '../tool';
import { Scraper } from './component';

export const tool = defineTool({
  name: '字幕爬取工具',
  path: '/scraper',
  description: '输入视频/音频链接，自动识别平台并爬取字幕和元数据。支持 YouTube，后续将支持 Bilibili、播客等平台。',
  keywords: ['subtitle', 'caption', 'scraper', 'youtube', 'bilibili', 'podcast', '字幕', '爬取', '转录'],
  component: Scraper,
  icon: MdSubtitles,
  createdAt: new Date('2024-12-30'),
});
