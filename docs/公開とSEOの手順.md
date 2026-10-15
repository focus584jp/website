# 公開と SEO・AI 検索の手順（2026-10-16）

新 HP を https://focus584.net に切り替えて公開し、Google 検索と AI（ChatGPT・Gemini・Perplexity・Claude など）の回答に出るようにするための手順。
コード側は済んでいる分を「済」、公開の日にやる分を「公開日」、HP の外でやる分（ユーザー）を「外」で分ける。

## 済（コードに入っているもの）

- 各ページの題名・説明文・h1（教室ページは「都賀教室（都賀駅 徒歩1分）｜千葉市若葉区の中学生向け個別指導塾」の形）
- 構造化データ（JSON-LD）: 運営団体・サイト・パンくず・よくあるご質問（FAQPage）・教室（住所・電話・座標・写真・料金の目安）
- canonical・OGP・サイトマップ（`/sitemap-index.xml`）・robots.txt（全クローラー許可。AI のクローラーも許可している）
- `/llms.txt`: AI 向けの要約（対象・指導・料金・教室・よくあるご質問）。値は src/data から作る
- 旧サイトの URL（`/school/tsuga/`・`/seikyu/` など 19 本）から新しいページへの転送ページ。`?`・`#` も引き継ぐ（チラシの QR の目印を落とさない）。対応は `src/data/legacyUrls.ts`
- 社内用の部品カタログ（/styleguide）はビルドから外した（`src/pages/_styleguide.astro`）

## 公開日（コード。この順で）

1. `astro.config.mjs` を `site: 'https://focus584.net'`・`base: '/'` に
2. `src/data/forms.ts` の `PRODUCTION_HOSTS` に `focus584.net` を足す（忘れるとフォームが staging 扱いになる）
3. `src/layouts/SiteLayout.astro` の `<meta name="robots" content="noindex, nofollow" />` を消す
4. ビルドして全ページを目で確認 → push
5. GitHub の Settings > Pages でカスタムドメイン `focus584.net` を設定し、DNS を GitHub Pages に向ける（TTL を先に短くしておく）
6. lead-api の Script Property `SMS_PAMPHLET_URL` を `https://focus584.net/pamphlet/` に

## 外（ユーザー。効く順）

1. **Google ビジネスプロフィールを 10 教室とも整える**。地域の検索（「都賀 塾」など）と Google の AI による概要・Gemini はここを一番見る
   - 名前は「学習塾フォーカス ○○教室」、住所・電話は HP と一字一句同じに（表記ゆれは別の教室と見なされる）
   - ウェブサイト欄はその教室のページ（`https://focus584.net/classrooms/tsuga/`）。トップではなく教室ページ
   - カテゴリ「学習塾」、営業時間、写真（HP と同じ写真でよい）。口コミを保護者に頼み、返信する
2. **Google Search Console**: ドメインプロパティを DNS の TXT で確認 → サイトマップ `https://focus584.net/sitemap-index.xml` を送る。旧サイトのサイトマップが登録済みなら差し替える
3. **Bing Webmaster Tools**: Search Console から取り込む。ChatGPT の検索は Bing の索引を使うので、AI 対策として Google と同じくらい大事。**Bing Places** にも Google ビジネスプロフィールから教室を取り込む
4. **外部の掲載**: 塾の比較・口コミサイト（塾ナビなど）に教室を載せ、名前・住所・電話・HP の URL をそろえる。AI はほかのサイトでの言及も根拠にする
5. GA4 を入れる（測定 ID を受け取ってから。チラシの `from=flyer-…` もここで数える）

## 公開した後

- 2〜4 週間で `site:focus584.net` を検索し、全ページが載ったか見る。Search Console の「ページ」で載らない理由を見る
- 月に 1 回、同じ質問を ChatGPT・Gemini・Perplexity に聞いて、フォーカスが出るか、料金や教室の情報が正しいかを記録する
  - 例:「千葉市若葉区で勉強が苦手な中学生向けの個別指導塾は？」「都賀駅の近くの中学生の塾で安いところは？」「学習塾フォーカスの料金は？」
- 料金や教室を変えたら src/data を直すだけで、ページ・構造化データ・llms.txt がそろって変わる
