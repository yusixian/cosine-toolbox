import { motion } from 'framer-motion';
import { Base64Code } from '../../components/base64/Base64Code';
import { Base64Download } from '../../components/base64/Base64Download';
import { RouterType } from '../../constants';

export default function Base64Util() {
  return (
    <motion.div layoutId={RouterType.BASE64_UTIL} className="grid h-full w-full grid-cols-2 gap-4 px-4 md:grid-cols-1">
      <Base64Code />
      <Base64Download />
    </motion.div>
  );
}
