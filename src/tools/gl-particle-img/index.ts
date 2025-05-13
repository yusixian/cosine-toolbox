import { FaAward } from 'react-icons/fa';
import { defineTool } from '../tool';
import { ParticleImg } from './component';

export const tool = defineTool({
  name: '图像转粒子特效 (react + p5.js)',
  path: '/gl-particle-img',
  description:
    '将图片转换为粒子特效，改良自 https://openprocessing.org/sketch/2097742\nTODO: 上传图片进行转换 & Resize 优化 & 参数可视化调整',
  keywords: ['gl', 'particle', 'effect', 'image', 'react', 'p5.js'],
  component: ParticleImg,
  icon: FaAward,
});
