import { toast } from 'react-toastify';

export enum UrlEncodeMode {
  QUERY = 'query',
  ALL = 'all',
}

export const encodeUrl = (url: string, mode: UrlEncodeMode = UrlEncodeMode.ALL) => {
  try {
    const queryIdx = url.search(/\?/);
    let resUrl = '';

    if (mode === UrlEncodeMode.QUERY && queryIdx !== -1) {
      resUrl = url.slice(0, queryIdx + 1) + encodeURIComponent(url.slice(queryIdx + 1));
    } else resUrl = encodeURIComponent(url);

    toast('🦄 URL 编码成功！');
    return { res: resUrl, isSuccess: true };
  } catch (e) {
    toast.error('❌ URL 编码发生了点小错误！');
    console.error('encodeUrl error', e);
    return { res: '', isSuccess: false };
  }
};

export const decodeUrl = (url: string, mode: UrlEncodeMode = UrlEncodeMode.ALL) => {
  try {
    let resUrl = '';

    if (mode === UrlEncodeMode.QUERY) {
      const idx = url.search(/\?/);
      resUrl = url.slice(0, idx + 1) + decodeURIComponent(url.slice(idx + 1));
    } else resUrl = decodeURIComponent(url);

    toast('🦄 URL 解码成功！');
    return { res: resUrl, isSuccess: true };
  } catch (e) {
    toast.error('❌ URL 解码发生了点小错误！');
    console.error('decodeUrl error', e);
    return { res: '', isSuccess: false };
  }
};
