import { motion } from 'framer-motion';
import { UrlCode } from '../../components/urlUtil/UrlCode';
import { RouterType } from '../../constants';

export default function UrlUtil() {
  return (
    <motion.div layoutId={RouterType.URL_UTIL} className="grid h-full w-full gap-8 px-4 md:grid-cols-1">
      <UrlCode />
    </motion.div>
  );
}
