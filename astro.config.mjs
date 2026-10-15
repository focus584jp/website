import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages（カスタムドメイン）配信。URL: https://focus584.net/（2026-10 に旧サイトから切り替え。旧 https://focus584jp.github.io/website/ は GitHub が自動でここへ転送）
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
