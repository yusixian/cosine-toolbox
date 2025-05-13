'use client';

import Button from '@/components/ui/button/Button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaPause, FaPlay } from 'react-icons/fa';
import ParticleGL from './gl/ParticleGL';

export function ParticleImg() {
  const [active, setActive] = useState(true);
  const [imageIdx, setImageIdx] = useState(0);
  return (
    <motion.div layoutId="/gl-particle-img" className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button onClick={() => setActive(!active)}>{active ? <FaPause /> : <FaPlay />}</Button>
        <Button
          onClick={() => {
            if (imageIdx > 0) {
              setImageIdx(imageIdx - 1);
            } else {
              setImageIdx(2);
            }
          }}
        >
          <FaArrowLeft />
        </Button>
        <span>{imageIdx}</span>
        <Button
          onClick={() => {
            if (imageIdx < 3) {
              // TODO: imgs info 从组件中拆出来
              setImageIdx(imageIdx + 1);
            } else {
              setImageIdx(0);
            }
          }}
        >
          <FaArrowRight />
        </Button>
      </div>
      <ParticleGL activeAnim={active} imageIdx={imageIdx} />
      <div id="particle-gl">
        <div id="particle-container" className={cn({ active })}></div>
      </div>
    </motion.div>
  );
}
