// robots.txt: 全ページのクロールを許可し、サイトマップの場所を知らせる。
// Sitemap の URL は astro.config の site と base から作る（本番ドメインへ移っても追従）。
// /p/（配布用パンフレット）は Disallow にしない: ページ側の noindex をクローラーに読ませるため。
// ※公開前の検索除外は各ページの <meta name="robots" content="noindex"> が担う（ここでブロックすると noindex が読まれない）
import type { APIRoute } from 'astro';
import { absUrl } from '../lib/path';

export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${absUrl('/sitemap-index.xml')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
