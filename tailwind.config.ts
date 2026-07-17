import { type Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const defineConfig = (config: Config) => config

export default defineConfig({
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,mjs}'],
  darkMode: 'class', // allows toggling dark mode manually
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
})
