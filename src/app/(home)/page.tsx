'use client';

import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { toolsByCategory } from '@/tools';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

export default function Home() {
  const router = useRouter();
  return (
    <div>
      {toolsByCategory.map(({ name, components }, categoryIndex) => (
        <Fragment key={categoryIndex}>
          <h1 className="text-xl font-bold tracking-wide">{name}</h1>
          <div className="grid grid-cols-4 md:grid-cols-3 xs:grid-cols-2">
            {components.map((tool) => {
              return (
                <motion.div layoutId={tool.path} key={tool.path}>
                  <Card onClick={() => router.push(tool.path)} className="flex flex-col gap-2">
                    <CardTitle>{tool.name}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Fragment>
      ))}
      {/* {toolsByCategory.map(({ name, components }) => (
        <Fragment key={name}>
          <div>{name}</div>
          {components.map((tool) => createElement(tool.component, { key: `${name}-${tool.name}` }))}
        </Fragment>
      ))} */}
    </div>
  );
}
