/** @type {import('lint-staged').Config} */
const lintStagedConfig = {
  '*': ['prettier --write --ignore-unknown'],
  '*.{js,cjs,mjs,ts,tsx}': [
    'eslint --report-unused-disable-directives --max-warnings 0 --fix .',
  ],
};

export default lintStagedConfig;
