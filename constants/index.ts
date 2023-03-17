import { IconType } from '../components/Icon/type';

export enum RouterType {
  CSV2JSON = 'csv2json',
  BASE64_UTIL = 'base64util',
}
export type ToolType = {
  type: RouterType;
  title: string; // unique
  pageTitle?: string;
  desc?: string;
  exampleImage?: string;
};
export const tools: ToolType[] = [
  {
    type: RouterType.CSV2JSON,
    title: 'CSV转JSON数组',
    pageTitle: 'CSV转JSON数组 - 在线转换文档文件',
    desc: '可将CSV文件转换为json对象数组，也可手动输入',
    exampleImage: '/img/examples/csv2json.webp',
  },
  {
    type: RouterType.BASE64_UTIL,
    title: 'base64 通用工具',
    pageTitle: 'Base64 通用工具',
    desc: '包括Base64编码解码、Base64图片批量下载等功能',
    exampleImage: '/img/examples/base64Util.webp',
  },
];

export const toolsMap = tools.reduce((prev, curr) => {
  prev[curr.type] = curr;
  return prev;
}, {} as Record<RouterType, ToolType>);

export enum SocialType {
  Github = 'github',
  Juejin = 'juejin',
  Blog = 'blog',
}

export type SociaInfo = {
  icon: IconType;
  url: string;
  desc: string;
};

export const socialInfos: { [type in SocialType]: SociaInfo } = {
  [SocialType.Github]: {
    icon: IconType.GITHUB,
    url: 'https://github.com/yusixian/cosine-toolbox',
    desc: 'Github地址',
  },
  [SocialType.Juejin]: {
    icon: IconType.JUEJIN,
    url: 'https://juejin.cn/user/1698115646132254',
    desc: '掘金账号',
  },
  [SocialType.Blog]: {
    icon: IconType.USER,
    url: 'https://ysx.cosine.ren/',
    desc: '博客地址',
  },
};
