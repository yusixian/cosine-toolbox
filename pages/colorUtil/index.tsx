import { motion } from 'framer-motion';
import { RouterType } from '../../constants';
import { Rgba2Hex } from '../../components/colorUtil/Rgba2Hex';
import { Hex2Rgba } from '../../components/colorUtil/Hex2Rgba';

export default function ColorUtil() {
  return (
    <motion.div layoutId={RouterType.COLOR_UTIL} className="grid h-full w-full gap-8 px-4 md:grid-cols-1">
      <Rgba2Hex />
      <Hex2Rgba />
    </motion.div>
  );
}
