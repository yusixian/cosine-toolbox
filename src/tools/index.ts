import { ToolCategory } from './tools.types';
import { tool as urlEncoder } from './url-encoder';
import { tool as colorConverter } from './color-converter';
import { tool as rsshubUrlConverter } from './rsshub-url-covert';
import { tool as glParticleImg } from './gl-particle-img';
import { tool as scraper } from './scraper';

export const toolsByCategory: ToolCategory[] = [
  {
    name: 'Converter',
    components: [urlEncoder, colorConverter, rsshubUrlConverter],
  },
  {
    name: 'WebGL Effect',
    components: [glParticleImg],
  },
  {
    name: 'Utility',
    components: [scraper],
  },
];

export const tools = toolsByCategory.flatMap(({ components }) => components);

export const toolsRoutes = tools.map(({ path, name, component, ...config }) => ({
  path,
  name,
  component,
  meta: { isTool: true, name, ...config },
}));
