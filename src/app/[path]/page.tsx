import { tools } from '@/tools';
import React, { createElement } from 'react';

export async function generateStaticParams() {
  return tools.map((tool) => ({
    path: tool.path,
  }));
}

export default function ToolPage({ params }: { params: { path: string } }) {
  const { path } = params;
  const tool = tools.find((tool) => tool.path === `/${path}`);
  if (!tool) return null;
  const { name, component } = tool;
  return (
    <div>
      {name}
      <div>{createElement(component)}</div>
    </div>
  );
}
