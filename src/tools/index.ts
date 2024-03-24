import { ToolCategory } from './tools.types';
import { tool as urlEncoder } from './url-encoder';
import { tool as colorConverter } from './color-converter';

export const toolsByCategory: ToolCategory[] = [
  {
    name: 'Web',
    components: [urlEncoder, colorConverter],
  },
];

export const tools = toolsByCategory.flatMap(({ components }) => components);

export const toolsRoutes = tools.map(({ path, name, component, ...config }) => ({
  path,
  name,
  component,
  meta: { isTool: true, name, ...config },
}));
