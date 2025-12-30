# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

cosine-toolbox is a Next.js-based collection of web utilities and tools, featuring converter tools, WebGL effects, and various development utilities. The project uses TypeScript, Tailwind CSS, and includes tools like URL encoder/decoder, color converter, RSSHub URL converter, and WebGL particle image effects.

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production  
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint linting
- `pnpm change` - Generate changelog using git-cliff
- `pnpm new` - Create a new tool using Plop generator (interactive prompts for name, path, category, etc.)

Use `pnpm` as the package manager (not npm or yarn).

## Architecture

### Tool System
The core architecture revolves around a modular tool system:

- **Tool Definition**: Tools are defined using `defineTool()` in `src/tools/tool.ts`
- **Tool Structure**: Each tool has its own directory under `src/tools/` with:
  - `index.ts` - Tool configuration and metadata
  - `component.tsx` - React component implementation
  - Optional service/utility files
- **Tool Registration**: Tools are organized by category in `src/tools/index.ts` via `toolsByCategory`
- **Routing**: Dynamic routing handled by `src/app/[path]/page.tsx` using Next.js App Router

### State Management
- **Jotai**: Used for global state (sidebar expansion, navigation selection)
- **next-themes**: Theme management (dark/light mode)
- **Store**: Located in `src/store/app.ts` with atoms for UI state

### Styling & UI
- **Tailwind CSS**: Primary styling framework
- **Custom Components**: Reusable UI components in `src/components/ui/`
- **Animations**: Framer Motion for smooth transitions and animations
- **Icons**: React Icons library for consistent iconography

### Layout Structure
- **Root Layout**: `src/app/layout.tsx` with providers and global configuration
- **Main Layout**: `src/components/layout/root.tsx` with header and sidebar
- **Sidebar Navigation**: `src/components/layout/sider.tsx` with tool categorization
- **Responsive Design**: Mobile drawer for small screens, fixed sidebar for desktop

## Adding New Tools

1. Create tool directory under `src/tools/your-tool-name/`
2. Implement tool configuration in `index.ts`:
   ```ts
   export const tool = defineTool({
     name: 'Tool Name',
     path: '/tool-path',
     description: 'Tool description',
     keywords: ['keyword1', 'keyword2'],
     component: YourToolComponent,
     icon: IconComponent,
   });
   ```
3. Create component in `component.tsx`
4. Register tool in `src/tools/index.ts` within appropriate category
5. Static routes are auto-generated via `generateStaticParams()`

## Key Dependencies

- **Next.js 14**: App Router architecture
- **React 18**: Component framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Jotai**: State management
- **Framer Motion**: Animations
- **Antd**: Some UI components
- **p5.js & react-p5-wrapper**: WebGL/Canvas effects
- **react-icons**: Icon library
- **colord**: Color manipulation utilities

## File Structure Patterns

- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - Reusable React components organized by type
- `src/tools/` - Individual tool implementations
- `src/constants/` - Configuration, routes, theme, and static data
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility functions and helpers
- `src/store/` - Jotai atoms for state management
- `src/styles/` - Global CSS and theme definitions
- `src/utils/` - General utility functions

## Path Aliases

Use `@/` prefix for absolute imports from `src/` directory (configured in `tsconfig.json`).