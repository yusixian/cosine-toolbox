import { MdOutlineColorLens } from 'react-icons/md';
import { defineTool } from '../tool';
import { ColorConverter } from './component';

export const tool = defineTool({
  name: 'Color 颜色转换器',
  path: '/color-converter',
  description: '在不同格式（十六进制、rgb、hsl和css名称）之间转换颜色',
  keywords: ['color', 'converter', 'hex', 'rgb', 'hsl', 'css'],
  component: ColorConverter,
  icon: MdOutlineColorLens,
});
