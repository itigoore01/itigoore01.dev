/** @type {import('prettier').Config} */
const lintStagedConfig = {
  plugins: [import.meta.resolve('prettier-plugin-organize-imports')],
  singleQuote: true,
};

export default lintStagedConfig;
