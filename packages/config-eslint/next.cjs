require('@rushstack/eslint-patch/modern-module-resolution');

/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'next/core-web-vitals',
    'turbo',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    project: true,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.js', '*.mjs', '*.cjs'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
  ],
};
