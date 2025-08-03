import { FaTools } from 'react-icons/fa'; // TODO: Update import path based on icon
import { defineTool } from '../tool';
import { AiGenerateCard } from './component';

export const tool = defineTool({
  name: 'AI 生成图文卡片',
  path: '/ai-generate-card',
  description: '输入标题和描述生产公众号文章封面等图文卡片，html 形式，可编辑',
  keywords: ['AI', 'card', '图文卡片', '在线生成'],
  component: AiGenerateCard,
  icon: FaTools,
});
