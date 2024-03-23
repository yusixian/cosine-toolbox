import { ToolCategory } from './tools.types';
import { tool as UrlEncoder } from './url-encoder';

export const toolsByCategory: ToolCategory[] = [
  {
    name: 'Web',
    components: [UrlEncoder],
  },
];

export const tools = toolsByCategory.flatMap(({ components }) => components);

export const toolsRoutes = tools.map(({ path, name, component, ...config }) => ({
  path,
  name,
  component,
  meta: { isTool: true, name, ...config },
}));
