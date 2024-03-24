'use client';

import { Card } from '@/components/ui/card';
import { colord, extend } from 'colord';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { HexColorInput, RgbaStringColorPicker } from 'react-colorful';
import CopyableResult from '../components/CopyableResult';
import cmykPlugin from 'colord/plugins/cmyk';
import hwbPlugin from 'colord/plugins/hwb';
import lchPlugin from 'colord/plugins/lch';
import namesPlugin from 'colord/plugins/names';

extend([cmykPlugin, hwbPlugin, lchPlugin, namesPlugin]);

export function ColorConverter() {
  const [color, setColor] = useState('#ff0000');
  return (
    <motion.div layoutId="/color-converter" className="flex flex-col gap-4">
      <Card className="flex flex-wrap items-center justify-center gap-12">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="h-8 w-8 rounded border border-background" style={{ backgroundColor: color }} />
            <HexColorInput
              className="w-40 flex-grow rounded border border-border px-2 py-1"
              color={color}
              onChange={setColor}
              prefixed
              alpha
            />
          </div>
          <RgbaStringColorPicker color={color} onChange={setColor} />
        </div>
        <div className="flex flex-wrap gap-4 text-sm/5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 ">
              rgba: <CopyableResult copyText={colord(color).toRgbString()} />
            </div>
            <div className="flex items-center gap-2">
              hsl: <CopyableResult copyText={colord(color).toHslString()} />
            </div>
            <div className="flex items-center gap-2">
              hwb: <CopyableResult copyText={colord(color).toHwbString()} />
            </div>
            <div className="flex items-center gap-2">
              cmyk: <CopyableResult className="w-76" copyText={colord(color).toCmykString()} />
            </div>
            <div className="flex items-center gap-2">
              lch: <CopyableResult className="w-76" copyText={colord(color).toLchString()} />
            </div>
            <div className="flex items-center gap-2">
              name(closest): <CopyableResult copyText={colord(color).toName({ closest: true })} />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
