/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  ignorePatterns: ['apps/**', 'packages/**'],
  extends: [require.resolve('@itigoore01.dev/config-eslint/library')],
  env: {
    node: true,
  },
};
