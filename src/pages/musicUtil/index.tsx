import { motion } from 'framer-motion';
import { RouterType } from '../../constants';
import { NeteaseOuter } from '../../components/musicUtil/NeteaseOuter';

export default function MusicUtil() {
  return (
    <motion.div layoutId={RouterType.MUSIC_UTIL} className="grid h-full w-full gap-8 px-4 md:grid-cols-1">
      <NeteaseOuter />
    </motion.div>
  );
}
