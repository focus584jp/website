import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// URL: https://focus584.net/（2026-10-16 に旧サイトから切り替え）。配信はロリポップ（.github/workflows/deploy-lolipop.yml が focus584-hp/ へ送る）。
// GitHub Pages も同じものを出し続け、カスタムドメインを focus584.net のままにして、旧 https://focus584jp.github.io/website/ からの転送に使う
// canonical・og:url・JSON-LD の @id・sitemap・robots.txt の Sitemap 行は、すべて site と base から作っている。
export default defineConfig({
  site: 'https://focus584.net',
  base: '/',
  // URLは末尾スラッシュ付きに統一（/price → /price/ の301を出さない。内部リンクは u() が付ける）
  trailingSlash: 'always',
  // 画面内に入った内部リンクを先読みして遷移を体感ゼロに近づける（静的サイトなのでコスト小）
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  integrations: [
    sitemap({
      // 社内用の部品カタログ（/styleguide）、検索に出さない配布用ページ（/p/ 以下）、旧サイトの URL の転送ページ（src/data/legacyUrls.ts）は載せない
      filter: (page) => {
        const path = new URL(page).pathname;
        return !/\/(styleguide|p|school|about|teaching|fee|privacy-policy|soudan|seikyu|sitemap|2026sum-campaign|pamphlet)\//.test(path);
      },
    }),
  ],
});
