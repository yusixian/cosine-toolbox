import React from 'react';
import { SocialType } from '../../constants';
import SocialIcon from './SocialIcon';

export default function SocialBar() {
  return (
    <div className="flex items-center gap-4 text-4xl">
      <SocialIcon type={SocialType.Github} />
      <SocialIcon type={SocialType.Juejin} />
      <SocialIcon type={SocialType.Blog} />
    </div>
  );
}
