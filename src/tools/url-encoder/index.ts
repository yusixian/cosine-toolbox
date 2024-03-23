import { FaTools } from 'react-icons/fa';
import { defineTool } from '../tool';
import { UrlEncoder } from './UrlEncoder';

export const tool = defineTool({
  name: 'URL编解码工具',
  path: '/url-encoder',
  description: '编码为url编码格式（也称为“百分比编码”）或从中解码。可选',
  keywords: ['url', 'encode', 'decode', 'percent', '%20', 'format'],
  component: UrlEncoder,
  icon: FaTools,
});
