import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages（プロジェクトページ）配信。URL: https://focus584jp.github.io/website/
// 本番（https://focus584.net/ のルート）へ移すときは site と base の2つだけを変える:
//   site: 'https://focus584.net', base: '/'
// canonical・og:url・JSON-LD の @id・sitemap・robots.txt の Sitemap 行は、すべて site と base から作っている。
export default defineConfig({
  site: 'https://focus584jp.github.io',
  base: '/website',
  // URLは末尾スラッシュ付きに統一（/price → /price/ の301を出さない。内部リンクは u() が付ける）
  trailingSlash: 'always',
  // 画面内に入った内部リンクを先読みして遷移を体感ゼロに近づける（静的サイトなのでコスト小）
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  integrations: [
    sitemap({
      // 社内用の部品カタログ（/styleguide）と、検索に出さない配布用ページ（/p/ 以下）は載せない
      filter: (page) => {
        const path = new URL(page).pathname;
        return !/\/(styleguide|p)\//.test(path);
      },
    }),
  ],
});
