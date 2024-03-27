import { preset } from '@itigoore01.dev/ui/tailwindcss';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  presets: [preset],
};
export default config;
