module.exports = function (plop) {
  // Tool generator
  plop.setGenerator('tool', {
    description: 'Create a new tool',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Tool name (e.g., "Base64编解码工具"): ',
        validate: (input) => {
          if (!input) return 'Tool name is required';
          return true;
        },
      },
      {
        type: 'input',
        name: 'path',
        message: 'Tool path (e.g., "base64-encoder"): ',
        validate: (input) => {
          if (!input) return 'Tool path is required';
          if (!/^[a-z0-9-]+$/.test(input)) return 'Path must be lowercase letters, numbers, and hyphens only';
          return true;
        },
      },
      {
        type: 'input',
        name: 'description',
        message: 'Tool description: ',
        validate: (input) => {
          if (!input) return 'Tool description is required';
          return true;
        },
      },
      {
        type: 'input',
        name: 'keywords',
        message: 'Keywords (comma-separated): ',
        validate: (input) => {
          if (!input) return 'Keywords are required';
          return true;
        },
      },
      {
        type: 'list',
        name: 'category',
        message: 'Tool category: ',
        choices: ['Converter', 'WebGL Effect', 'Utility', 'Generator', 'Custom (自定义)'],
        default: 'Converter',
      },
      {
        type: 'input',
        name: 'customCategory',
        message: 'Enter custom category name: ',
        when: (answers) => answers.category === 'Custom (自定义)',
        validate: (input) => {
          if (!input) return 'Custom category name is required';
          return true;
        },
      },
      {
        type: 'input',
        name: 'iconName',
        message: 'React Icon name (e.g., "FaTools"): ',
        default: 'FaTools',
      },
      {
        type: 'confirm',
        name: 'needsService',
        message: 'Does this tool need a service file? ',
        default: false,
      },
      {
        type: 'confirm',
        name: 'needsExample',
        message: 'Does this tool need an example file? ',
        default: false,
      },
    ],
    actions: function (data) {
      // Process keywords
      data.keywords = data.keywords.split(',').map((k) => k.trim());

      // Use custom category if selected
      if (data.category === 'Custom (自定义)') {
        data.category = data.customCategory;
      }

      const actions = [];

      // Create tool directory and component
      actions.push({
        type: 'add',
        path: '../src/tools/{{kebabCase path}}/component.tsx',
        templateFile: './templates/component.tsx.hbs',
      });

      // Create tool index
      actions.push({
        type: 'add',
        path: '../src/tools/{{kebabCase path}}/index.ts',
        templateFile: './templates/index.ts.hbs',
      });

      // Add service file if needed
      if (data.needsService) {
        actions.push({
          type: 'add',
          path: '../src/tools/{{kebabCase path}}/service.ts',
          templateFile: './templates/service.ts.hbs',
        });
      }

      // Add example file if needed
      if (data.needsExample) {
        actions.push({
          type: 'add',
          path: '../src/tools/{{kebabCase path}}/example.ts',
          templateFile: './templates/example.ts.hbs',
        });
      }

      // Update tools index to register the new tool
      actions.push({
        type: 'modify',
        path: '../src/tools/index.ts',
        pattern: /import { tool as glParticleImg } from '\.\/gl-particle-img';/,
        template: `import { tool as glParticleImg } from './gl-particle-img';
import { tool as {{camelCase path}} } from './{{kebabCase path}}';`,
      });

      // Update toolsByCategory based on category

      // For other categories (Utility, Generator, Custom)
      // Use a unified approach with transform function
      actions.push({
        type: 'modify',
        path: '../src/tools/index.ts',
        transform: function (fileContent, data) {
          const categoryRegex = new RegExp(
            `(\\s*{\\s*name:\\s*'${data.category.replace(
              /[.*+?^${}()|[\]\\]/g,
              '\\$&',
            )}',[\\s\\S]*?components:\\s*\\[)([\\s\\S]*?)(\\],?\\s*})`,
          );
          const categoryMatch = fileContent.match(categoryRegex);

          // Convert path to camelCase
          const camelCasePath = data.path.replace(/-([a-z])/g, function (g) {
            return g[1].toUpperCase();
          });

          if (categoryMatch) {
            // Category exists, add to it
            const existingComponents = categoryMatch[2].trim();
            const updatedComponents = existingComponents ? `${existingComponents}, ${camelCasePath}` : camelCasePath;
            return fileContent.replace(categoryRegex, `$1${updatedComponents}$3`);
          } else {
            // Category doesn't exist, add new category
            return fileContent.replace(
              /(\];)/,
              `  {
    name: '${data.category}',
    components: [${camelCasePath}],
  },
$1`,
            );
          }
        },
      });

      return actions;
    },
  });

  // Helper to convert path to camelCase variable name
  plop.setHelper('camelCase', function (str) {
    return str.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    });
  });

  plop.setHelper('kebabCase', function (str) {
    return str.toLowerCase().replace(/\s+/g, '-');
  });

  plop.setHelper('pascalCase', function (str) {
    return str.replace(/(?:^|-)([a-z])/g, function (g) {
      return g[1] ? g[1].toUpperCase() : g[0].toUpperCase();
    });
  });
};
