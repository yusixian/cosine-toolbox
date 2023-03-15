import { IconType } from '../components/Icon/type';

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
