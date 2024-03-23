export interface Tool {
  name: string;
  path: string;
  description: string;
  keywords: string[];
  component: () => JSX.Element;
  icon: Component;
  isNew: boolean;
  createdAt?: Date;
}

export interface ToolCategory {
  name: string;
  components: Tool[];
}

export type ToolWithCategory = Tool & { category: string };
