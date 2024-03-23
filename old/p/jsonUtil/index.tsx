import { motion } from 'framer-motion';
import Csv2Json from '../../components/jsonUtil/Csv2Json';
import JsObj2Json from '../../components/jsonUtil/JsObj2Json';
import { RouterType } from '../../constants';

export default function JsonUtil() {
  return (
    <motion.div layoutId={RouterType.JSON_UTIL} className="grid h-full w-full grid-cols-2 gap-8 px-4 md:grid-cols-1">
      <Csv2Json />
      <JsObj2Json />
    </motion.div>
  );
}
