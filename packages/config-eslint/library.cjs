require('@rushstack/eslint-patch/modern-module-resolution');

/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'turbo',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  parserOptions: {
    project: true,
    sourceType: 'module',
  },
  rules: {
    'import/no-anonymous-default-export': 'warn',
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowNumber: true,
      },
    ],
  },
  overrides: [
    {
      files: ['*.js', '*.mjs', '*.cjs'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
  ],
};
