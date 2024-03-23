import { socialInfos, SocialType } from '../../constants';
import Icon from '../Icon';

type SocialProps = {
  type: SocialType;
  url?: string;
  className?: string;
};
const SocialIcon = ({ type, url, className }: SocialProps) => {
  const { icon, url: realUrl } = socialInfos[type];
  return <Icon className={className} type={icon} href={url || realUrl} />;
};
export default SocialIcon;
