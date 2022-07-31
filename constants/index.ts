export enum SocialType {
  Github = 'github',
  Juejin = 'juejin',
  Blog = 'blog',
}

export type SociaInfo = {
  icon: SocialType;
  url: string;
  desc: string;
};

export const socialInfos: { [type in SocialType]: SociaInfo } = {
  [SocialType.Github]: {
    icon: SocialType.Github,
    url: 'https://github.com/yusixian/cosine-toolbox',
    desc: 'Github地址',
  },
  [SocialType.Juejin]: {
    icon: SocialType.Juejin,
    url: 'https://juejin.cn/user/1698115646132254',
    desc: '掘金账号',
  },
  [SocialType.Blog]: {
    icon: SocialType.Blog,
    url: 'https://ysx.cosine.ren/',
    desc: '博客地址',
  },
};
