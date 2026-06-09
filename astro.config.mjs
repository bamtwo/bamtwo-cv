import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://bamtwo.io',
  base: process.env.SITE_BASE,
  integrations: [sitemap()],
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  vite: {
    resolve: {
      alias: {
        '@components': '/src/components',
        '@content': '/src/content',
        '@scripts': '/src/scripts',
        '@styles': '/src/styles',
        '@layouts': '/src/layouts',
      },
    },
  },
});
