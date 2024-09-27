import { ToolCategory } from './tools.types';
import { tool as urlEncoder } from './url-encoder';
import { tool as colorConverter } from './color-converter';
import { tool as rsshubUrlConverter } from './rsshub-url-covert';

export const toolsByCategory: ToolCategory[] = [
  {
    name: 'Web',
    components: [urlEncoder, colorConverter, rsshubUrlConverter],
  },
];

export const tools = toolsByCategory.flatMap(({ components }) => components);

export const toolsRoutes = tools.map(({ path, name, component, ...config }) => ({
  path,
  name,
  component,
  meta: { isTool: true, name, ...config },
}));
