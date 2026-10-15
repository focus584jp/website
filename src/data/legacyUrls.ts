// 旧サイト（focus584.net・WordPress）の URL → 新 HP の URL。正本は docs/旧サイトURL対応表.md。
// 本番ドメインを新 HP に切り替えた後も、旧 URL（検索結果・ブックマーク・チラシ・Google ビジネスプロフィール）から
// 新しいページへ飛ばす。GitHub Pages はサーバーの 301 を書けないので、旧 URL に転送用の小さなページを置く
// （src/pages/[...legacy].astro。即時の meta refresh は Google が恒久的な転送として扱う）。
import { classrooms } from './classrooms';

export const legacyUrls: Record<string, string> = {
  'about': '/', // フォーカスを知る（同じページはない。選ばれる理由などはトップ）
  'teaching': '/method',
  'fee': '/price',
  'school': '/classrooms',
  ...Object.fromEntries(classrooms.map((c) => [`school/${c.slug}`, `/classrooms/${c.slug}`])),
  'privacy-policy': '/company#privacy',
  'soudan': '/consult',
  'seikyu': '/request',
  'sitemap': '/',
  '2026sum-campaign': '/', // 期間限定ページ
  // 2026-09-21〜の SMS で送ったパンフレットの URL（旧 /pamphlet/。github.io の URL は切り替え後に focus584.net の同じパスへ転送される）
  'pamphlet': '/p/focus-pamphlet-2609',
};
