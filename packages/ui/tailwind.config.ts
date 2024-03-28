import type { Config } from 'tailwindcss';
import { preset } from './src/tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  presets: [preset],
} satisfies Config;
