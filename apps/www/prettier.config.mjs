/** @type {import('prettier').Config} */
const prettierConfig = {
  plugins: [
    import.meta.resolve('prettier-plugin-organize-imports'),
    import.meta.resolve('prettier-plugin-tailwindcss'),
  ],
  singleQuote: true,
};

export default prettierConfig;
