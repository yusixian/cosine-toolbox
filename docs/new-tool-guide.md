# 新建工具指南

使用 `pnpm new` 命令可以快速创建新的工具。

## 使用方法

```bash
pnpm new
```

脚本会询问以下信息：

1. **Tool name**: 工具名称（如："Base64 编解码工具"）
2. **Tool path**: 工具路径（如："base64-encoder"，只能包含小写字母、数字和连字符）
3. **Tool description**: 工具描述
4. **Keywords**: 关键词（用逗号分隔）
5. **Tool category**: 工具分类
   - Converter（转换器）
   - WebGL Effect（WebGL 效果）
   - Utility（实用工具）
   - Generator（生成器）
6. **React Icon name**: 图标名称（如："FaTools"） 可以从 https://react-icons.github.io/react-icons/ 中查询
7. **需要 service 文件?**: 是否需要独立的服务文件
8. **需要 example 文件?**: 是否需要示例文件

## 生成的文件结构

```
src/tools/your-tool-name/
├── component.tsx    # React 组件
├── index.ts         # 工具配置
├── service.ts       # 服务文件（可选）
└── example.ts       # 示例文件（可选）
```

## 注意事项

1. 工具路径必须是唯一的
2. 图标导入路径需要手动调整（生成后检查 `index.ts` 中的 import）
3. 生成后需要实现具体的业务逻辑
4. 新工具会自动注册到 `src/tools/index.ts`

## 示例

创建一个 JSON 格式化工具：

- Tool name: `JSON 格式化工具`
- Tool path: `json-formatter`
- Description: `格式化和压缩 JSON 数据`
- Keywords: `json, format, pretty, minify`
- Category: `Converter`
- Icon: `FaCode`
