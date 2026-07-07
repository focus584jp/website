import { defineConfig } from 'astro/config';

// GitHub Pages（プロジェクトページ）配信。URL: https://focus584jp.github.io/website/
export default defineConfig({
  site: 'https://focus584jp.github.io',
  base: '/website',
  // 画面内に入った内部リンクを先読みして遷移を体感ゼロに近づける（静的サイトなのでコスト小）
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
});
