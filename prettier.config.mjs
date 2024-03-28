/** @type {import('prettier').Config} */
const prettierConfig = {
  plugins:
    typeof import.meta.resolve === 'function'
      ? [import.meta.resolve('prettier-plugin-organize-imports')]
      : [],
  singleQuote: true,
};

export default prettierConfig;
