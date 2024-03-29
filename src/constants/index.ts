import areaData from 'china-area-data';

export enum RouterType {
  JSON_UTIL = 'jsonUtil',
  BASE64_UTIL = 'base64Util',
  URL_UTIL = 'urlUtil',
  MUSIC_UTIL = 'musicUtil',
  COLOR_UTIL = 'colorUtil',
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
    type: RouterType.JSON_UTIL,
    title: 'JSON 通用工具',
    pageTitle: 'JSON 通用工具\n在线转换文档文件',
    desc: `CSV转JSON：可将CSV格式转换为json对象数组
JS对象转JSON: 可将JS对象转换为JSON字符串`,
    exampleImage: '/img/examples/jsonUtil.webp',
  },
  {
    type: RouterType.BASE64_UTIL,
    title: 'base64 通用工具',
    pageTitle: 'Base64 通用工具',
    desc: '包括 Base64编码解码 、 Base64图片批量下载等功能',
    exampleImage: '/img/examples/base64Util.webp',
  },
  {
    type: RouterType.URL_UTIL,
    title: 'URL通用工具',
    pageTitle: 'URL通用工具',
    desc: '包括 UrlDecode解码/UrlEncode编码',
    exampleImage: '/img/examples/urlUtil.webp',
  },
  {
    type: RouterType.COLOR_UTIL,
    title: '颜色通用工具',
    pageTitle: '颜色通用工具',
    desc: '包括 rgba/rgb 与 hex 值的相互转换',
    // exampleImage: '/img/examples/musicUtil.webp',
  },
  {
    type: RouterType.MUSIC_UTIL,
    title: '♪ 音乐通用工具',
    pageTitle: '♪ 音乐通用工具',
    desc: '包括 某wyy音乐外链生成',
    exampleImage: '/img/examples/musicUtil.webp',
  },
];

export const toolsMap = tools.reduce((prev, curr) => {
  prev[curr.type] = curr;
  return prev;
}, {} as Record<RouterType, ToolType>);

export const CityMap: { [key: string]: string } = (function () {
  const CityMap: { [key: string]: string } = {};
  const provinces = areaData['86'];
  for (let i = 11; i <= 71; ++i) {
    const proNum = i * 10000;
    const cites = areaData[proNum];
    const keys = Object.keys(cites ?? {});
    keys.forEach((key) => {
      const city = cites[key];
      if (city === '市辖区') CityMap[provinces[proNum]] = provinces[proNum];
      else CityMap[city] = provinces[proNum];
    });
  }
  return CityMap;
})();
