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
  const { name, description, component } = tool;
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">{name}</h1>
      <div className="h-px w-full bg-foreground" />
      <p className="mb-4 text-base text-muted-foreground">{description}</p>
      {createElement(component)}
    </div>
  );
}
