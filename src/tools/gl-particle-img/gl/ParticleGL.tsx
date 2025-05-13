import dynamic from 'next/dynamic';
import { ParticleGLProps } from './DynamicParticleGL';

// 使用动态导入确保 ReactP5Wrapper 只在客户端加载
const DynamicReactP5Wrapper = dynamic<ParticleGLProps>(() => import('./DynamicParticleGL').then((mod) => mod.default), {
  ssr: false,
});

const ParticleGL = ({ activeAnim, imageIdx, id }: { activeAnim?: boolean; imageIdx: number; id?: string }) => {
  return <DynamicReactP5Wrapper activeAnim={activeAnim} imageIdx={imageIdx} id={id} />;
};

export default ParticleGL;
