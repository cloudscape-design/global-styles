// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import path from 'node:path';
import eslint from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import tseslint from 'typescript-eslint';
import eslintPrettier from 'eslint-plugin-prettier/recommended';
import unicornPlugin from 'eslint-plugin-unicorn';
import headerPlugin from 'eslint-plugin-header';

// https://github.com/Stuk/eslint-plugin-header/issues/57
headerPlugin.rules.header.meta.schema = false;

export default tseslint.config(
  includeIgnoreFile(path.resolve('.gitignore')),
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintPrettier,
  {
    files: ['**/*.{js,mjs,ts}'],
    languageOptions: {
      globals: {
        console: true,
      },
    },
    plugins: {
      unicorn: unicornPlugin,
      header: headerPlugin,
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'unicorn/filename-case': 'error',
      curly: 'error',
      eqeqeq: 'error',
      'no-return-await': 'error',
      'require-await': 'error',
      'header/header': [
        'error',
        'line',
        [' Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.', ' SPDX-License-Identifier: Apache-2.0'],
      ],
    },
  },
);
