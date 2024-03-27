/** @type {import('lint-staged').Config} */
const lintStagedConfig = {
  '*': ['prettier --write --ignore-unknown'],
  '*.{js,cjs,mjs,ts,tsx}': [
    (filenames) => {
      const fileOptions = filenames
        .map((filename) => `--file ${filename}`)
        .join(' ');

      return `yarn lint --fix ${fileOptions}`;
    },
  ],
};

export default lintStagedConfig;
