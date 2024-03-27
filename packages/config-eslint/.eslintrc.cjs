/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['./library.cjs'],
  env: {
    node: true,
  },
};
