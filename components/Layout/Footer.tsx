import { SocialType } from '../../constants';
import SocialIcon from '../Social/SocialIcon';

export function Footer() {
  return (
    <footer className="flex items-center justify-center gap-2 py-4 text-xl">
      Powered by{' '}
      <a className="text-blue-400" href="https://github.com/yusixian">
        cosine
      </a>
      <SocialIcon className="text-4xl" type={SocialType.Github} url="https://github.com/yusixian" />
    </footer>
  );
}
