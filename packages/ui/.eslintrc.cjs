/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  ignorePatterns: ['!.storybook', 'storybook-static'],
  extends: [
    require.resolve('@itigoore01.dev/config-eslint/react-internal'),
    'plugin:storybook/recommended',
  ],
  overrides: [
    {
      files: ['*.cjs'],
      env: {
        node: true,
      },
    },
  ],
};
