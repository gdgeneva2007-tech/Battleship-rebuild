import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';
import jestPlugin from 'eslint-plugin-jest';

export default defineConfig([
  // Don't lint generated output or dependencies
  {
    ignores: ['dist/**', 'node_modules/**'],
  },

  // Base rules for all JS files
  {
    files: ['**/*.{js,mjs,cjs}'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
  },

  // Node/tooling files (webpack/postcss/etc.)
  {
    files: [
      'eslint.config.{js,mjs,cjs}',
      'webpack.config.{js,mjs,cjs}',
      'postcss.config.{js,mjs,cjs}',
      'babel.config.{js,mjs,cjs}',
      '*.config.{js,mjs,cjs}',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
  },

  // Jest test files
  {
    files: ['**/*.test.js', '**/*.spec.js', '**/__tests__/**/*.js'],
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.jest,
        ...globals.node,
      },
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
    },
  },

  // IMPORTANT: Prettier compatibility must be LAST
  eslintConfigPrettier,
]);
