import { dirname } from 'path';
import { fileURLToPath } from 'url';
// import { FlatCompat } from '@eslint/eslintrc';
import prettier from 'eslint-plugin-prettier';
import js from '@eslint/js';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
//   recommendedConfig: js.configs.recommended,
// });

export default tseslint.config([
    /**
     * Global Ignores
     * https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores
     */
    {
      name: "Global Ignores",
      ignores: [
        'node_modules/',
        'out/',
      ]
    },
    // Base ESLint recommended config
    js.configs.recommended,

  // TypeScript configuration
  {
    files: ['src/**/*.ts', 'src/**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      globals: {
        // ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs['recommended'].rules,
      ...typescriptPlugin.configs['strict-type-checked'].rules,
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false,
        },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-unnecessary-type-parameters': 'warn'
    },
  },

  // Custom rules
  {
    files: ['src/**/*.ts', 'src/**/*.ts'],
    rules: {
      'no-console': ['warn', { allow: ['debug', 'warn', 'error'] }],
      'arrow-body-style': ['error', 'as-needed'],
    },
  },

  // Test file overrides
  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },

  // Prettier integration
  {
    files: ['src/**/*.ts', 'src/**/*.ts'],
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': "error",
    },
  },
]);
