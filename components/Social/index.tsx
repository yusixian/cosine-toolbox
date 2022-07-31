import React from 'react';
import { SocialType } from '../../constants';
import SocialIcon from './SocialIcon';

export default function SocialBar() {
  return (
    <div className="flex items-center gap-4 text-5xl text-white">
      <SocialIcon type={SocialType.Github} />
      <SocialIcon type={SocialType.Juejin} />
    </div>
  );
}
