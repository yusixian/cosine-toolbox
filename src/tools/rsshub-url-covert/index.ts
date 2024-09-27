import { IoLogoRss } from "react-icons/io";
import { defineTool } from '../tool';
import { RSSHubUrlConverter } from './component';

export const tool = defineTool({
  name: 'RSSHub URL 转换器',
  path: '/rsshub-url-converter',
  description: '填入自建 RSSHub 的 ACCESS_KEY，转换为带访问码的 可订阅url:\nhttps://docs.rsshub.app/zh/deploy/config#%E8%AE%BF%E9%97%AE%E6%8E%A7%E5%88%B6%E9%85%8D%E7%BD%AE',
  keywords: ['rss', 'converter', 'md5'],
  component: RSSHubUrlConverter,
  icon: IoLogoRss,
});
