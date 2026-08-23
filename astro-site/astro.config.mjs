// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://japan-city-guide.com',
  // 개편 전 URL 리디렉트는 scripts/gen-redirects.mjs 가 public/ 에 정적 파일로 만든다.
  // Astro의 redirects 옵션은 디렉터리 형식(`/about.html/index.html`)으로 출력해
  // 확장자가 붙은 옛 주소를 그대로 받지 못한다.
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
