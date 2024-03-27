/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [require.resolve('@itigoore01.dev/config-eslint/react-internal')],
  overrides: [
    {
      files: ['*.cjs'],
      env: {
        node: true,
      },
    },
  ],
};
