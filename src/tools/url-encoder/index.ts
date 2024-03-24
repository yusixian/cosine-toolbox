import { FaTools } from 'react-icons/fa';
import { defineTool } from '../tool';
import { UrlEncoder } from './component';

export const tool = defineTool({
  name: 'URL 编解码工具',
  path: '/url-encoder',
  description: '编码为 url 编码格式（又称“Percent Encoding”）或从中解码。可选择解码 query 部分还是所有部分。',
  keywords: ['url', 'encode', 'decode', 'percent', '%20', 'format'],
  component: UrlEncoder,
  icon: FaTools,
});
