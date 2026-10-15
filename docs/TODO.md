# 公開までのTODO（2026-07-14整理・2026-09-11更新）

再開時はここから。完了したらチェックを付けて日付を書く。

## 現在地（2026-09-11）

**外見（デザイン・文言）はほぼ完了。** 全ページhifi・下層の作り込み・保護者の声・Flow文言・FAQ・ジオコーディング・「当社調べ」根拠まで済み。
2026-09-11の細部修正: 比較図（CompareTabs）の自動切替を廃止し、赤ペン文字「ここをタップ！」＋描かれる矢印＋タブの紺波紋で誘導する形に確定（5d212e6・本番反映済み）。

残りは **①ユーザーの材料待ち（写真・パンフ・GA4測定ID。SMSは2026-09-21に本番稼働）** と **②公開作業（総点検・noindex解除・ドメイン移行）** の2系統。コード側で先に進められるのは「フォーム2種の総点検」「全ページ最終チェック」「ドメイン移行の準備（base変更・本番判定）」。

### 気になるところ（判断待ち・小さな整理）

- [x] **比較図の誘導は図ごとに独立** — 2026-09-11 ユーザー確定: 図ごと独立・毎回表示のままでよい
- [x] **トップの料金セクションに他塾比較（M塾/E塾）が残っている** — 2026-09-11 ユーザー確定: 現状維持・金額も問題なし
- [x] **LeadForm.astro / CorporateForm.astro 冒頭コメントが古い** — 2026-10-08 整理済み（「準備中」分岐ごと削除。共通処理は src/lib/leadApi.ts）。旧メモ: 「GAS未接続・送信ボタンdisabled」と書かれているが、実際は2026-07-10から本番稼働中（`forms.ts` の `LEAD_API_URL` 設定済み）。コメントを現状に合わせて整理する（動作には影響なし）
- [ ] **依存の更新** — Astro 5.18.2 → 7.x が出ている（メジャー2つ）。公開前の大型更新はリスクがあるので**公開後に別途**。fontsource 2種のマイナー更新（5.2→5.3）は安全だが、フォントのunicode-range分割に影響しないか確認してから
- [ ] 教室詳細の「対応中学校は準備中」分岐は全教室投入済みのため発火しない（残しても害なし。写真投入時に一緒に整理してもよい）
- [x] `/styleguide`（社内用の部品カタログ・未リンク）を公開時にどうするか — 2026-09-11 ユーザー確定: **残さない**（公開前仕上げに「ビルドから除外」を追加）

### デザインシステム監査で見つかったHP側の逸脱（2026-09-27。HPを修正するときにまとめて対応）

デザインシステム（~/claude/design-system）をHPの現行に合わせて更新した際の突き合わせで検出。**HPのデザインが正**なので見た目は変えず、実装の整理だけ行う。

- [ ] **教科色の直書きが3ファイルに重複** — `src/components/home/Price.astro:10-14`・`site/PriceSimulator.astro:6-10`（styleguide.astro は削除済み）。site.css に `--subject-*` 変数を追加して参照に置き換える（design-system/tokens.css と同値）
- [ ] **site.css に無いトークンの直書き** — `--orange-pale` #FBDECB（Timetable.astro / DiagnosisPopup.astro）、`--warning-bg/--warning-text`（Timetable.astro）、`--sparkle-yellow` #FFC94A（CompareTabs.astro）。site.css に変数を足して参照に
- [ ] **罫線・面の近似色が約15値** — #E8EDF4（SiteHeader下線）、#DDE3EA（ナビ区切り）、#D8DFE8（SPメニュー）、#E3E8EF（FixedCta上線）、#DFE9F1（FAQ点線）、#E3E9F0（LeadForm未来ステップ）、#E4E9F0（Timetable講習行）、#DCE4EE/#8FA9D0/#A9B7CC（DiagnosisApp）、#C6D4DF（Voicesドット）、#F8FAFD（Roomsホバー）、#EEF1F6/#C9D2DE（PhotoGalleryプレースホルダ）。`--line`（#DBE3EE）/`--panel`/`--alt-bg`/`--blue-pale` に寄せる
- [ ] **廃止済みの旧グレー #2B3242** が `CompareTabs.astro:74`（地面の影）に残っている
- [ ] **hover が `@media (hover: hover)` で囲まれていない** — `site.css:50-51,73-74,78`、`Rooms.astro:77,109`、`FixedCta.astro:47`、`SiteFooter.astro:50,57`、`classrooms/index.astro:59`（囲まれているのは DiagnosisApp.astro:146 だけ）
- [ ] **廃止済みのカードのホバーリフト** — `pages/classrooms/index.astro:59`（translateY(-2px)）を外す
- [ ] **12px未満の文字（例外外）** — 必須バッジ 11px（`site.css:92`）、会社概要のflag 11px（`company.astro:94`）、「任意」タグ 11.5px（`price.astro:201`）、時間割 11px/11.5px（`Timetable.astro:116,162,164`）。12pxに上げるか、例外として design-system/brand-guide.md に追記済みのバッジ扱いにする
- [ ] **Zen Maru 800 の指定**（読み込みは700/900のみで、実際は900表示）— `CompareTabs.astro:156,206`、`PriceSimulator.astro:32`、`price.astro:153,158,201`、`method.astro:101`、`SectionHead.astro`/`PageHero.astro` の英字ラベル。900に書き換えて実態と揃える
- [ ] **細かい不統一** — 診断ポップアップのボタン下影が3px（他は5px、`DiagnosisPopup.astro:74`）／SP固定CTAの紺ボタンだけテキスト「→」（他は ArrowCircle、`FixedCta.astro:9`）／診断画面だけマーカーのグラデが62/94%・余白4px（共通は60/95%・2px、`DiagnosisApp.astro:81`）／方眼カードのCSSが5ファイルにコピー（Method・Flow・pages/method・price・faq。共通クラスにまとめる）
- [x] **`pages/styleguide.astro` が実装とずれている** — 2026-10-04 削除して解消（部品の見本は design-system 側に一本化）。旧記述: — 教科チップが丸ピル（実装は角丸6px）、details版FAQ（廃止済み）、教室カードの左線5px（実装は4px）、「POINT」文字入りの丸バッジ（実装に無い）、方眼14px。公開時にビルド除外する方針なので、直すか消すか
- [x] **`docs/design/README.md` が古い** — 2026-10-04 削除、CLAUDE.md の参照も修正済み。旧記述: — マーカー #FFE869、グレー #A9B2BE/#7A8598、紺フッター・紺バンド、黒系の影、淡色チップ。design-system/CLAUDE.md からは「旧仕様・参照しない」に変更済み。冒頭に「2026-07以前の旧仕様」と注記するか、site.css と CLAUDE.md を正本にして削除する。`CLAUDE.md:50` の「READMEのトークンと同期」の記述も直す

## 1. ページの作り込み（下層デザイン展開の続き）

- [x] **料金ページ（/price）本文の再設計** — 2026-08-15 完成（ユーザー宣言）。4セクション構成: 授業料（こだわり文+本棚シミュレータ）/諸経費（積み上げくらべ図）/その他オプション（タップで説明が開くアコーディオン）/お手頃価格のワケ（CompareTabs target）。他塾比較セクションは削除（比較データはトップPriceのみに残存）
- [x] **よくあるご質問（/faq）本文の再設計** — 2026-08-15 完了。3カテゴリ構成（授業・指導/料金/入塾・通塾）+方眼カード。4問追加（対象学年・季節講習・振替・教室の場所）・仮回答2問を確定し※仮を全解消
- [x] **指導方針ページ（/method）の内容ブラッシュアップ** — 2026-08-15 完成（ユーザー宣言）。4本柱+比較図はCompareTabs（インデックスタブ）に統一。積み木は「不安定な塔+ひし形落下→一斉整列」で確定

## 2. コンテンツの実データ化

- [x] **保護者さまの声** — 2026-08-12 完了。5本を掲載確定し「※仮」表記を削除（data/home.ts の voices。軸: 苦手克服/習慣・安心感/遡り学習(受験)/1対4/料金・5教科）。実施済みアンケートの内容と整合確認済み（ステマ規制対応）
- [x] **教室の写真差し替え** — 2026-10-10 全10教室完了。各教室4枚×10教室。`src/assets/classrooms/<slug>/` に置くだけで自動反映（ライトボックスも実写真に自動切替）
  - [x] 2026-09-16 4教室投入: 妙典・新検見川・稲毛海岸・稲毛（2026-09-04撮影分・各4枚=教室内3＋外観1。幅2000px/品質85にリサイズして配置）。4教室ともLightroom現像済みの正式版（`~/Downloads/2026-09-16/<教室>_pic1〜4.jpg`・01=外観）。投入時に実写真タイルが縦長に崩れる不具合（`<Image>`の height 属性で aspect-ratio が無効化）を PhotoGallery.astro の `height:auto` で修正
  - [x] 2026-09-16 深夜 5教室追加: 五井・鎌取・西千葉・蘇我・四街道（2026-09-15撮影・同じ命名 `<教室>_pic1〜4.jpg` で書き出し→同手順で配置）
  - [x] 2026-10-10 都賀を投入（01=外観は2026-10-03撮影・右端の雀荘看板をトリミングで除外、02〜04は2026-10-10撮影。02の右下の青いマットはLightroomで消去。他教室と明るさ・色味をそろえて再現像した正式版）
  - 他教室の外観：**撮り直しは今回は対応しない**（2026-09-17ユーザー決定。現状の外観で公開）。将来撮り直すなら候補: 稲毛海岸01（下の焼肉店のシャッター・提灯が主役）、新検見川01（隣の整骨院のピンク看板）、稲毛01（木が看板を隠す）、四街道01（看板が小さい）
  - [ ] 次回撮影時の小物対策（任意）: 青いゴミ箱（五井02・稲毛海岸02・蘇我02・四街道02/03）を画面外へ、自習ブースのA4注意書き（全教室04）は撮影時だけ外す、蘇我02の左手前の収納棚の中身を整える
  - [x] 色味の再現像 — 2026-09-17 完了。妙典02・新検見川03・稲毛海岸02/03・五井02/04・蘇我02 を再現像版に差し替え済み。五井04の机の色と五井02の床の青みは「このままで」（ユーザー確定）。鎌取04・四街道04の机の暖色は未対応（許容範囲）
- [x] **体験までの流れ（トップFlow）の文言確定** — 2026-08-16 完了。3ステップとも確定（資料DL=約1分のかんたんな入力・体験授業=雰囲気と相性を確かめる・無料相談=一緒にお手伝いします）。カードも方眼ノート様式に統一。※公開はSMS実装後の方針（2026-08-16ユーザー確認）のため、資料DLは「すぐに届きます」のSMS前提文言で確定
- [x] **パンフレットの正式版** — 2026-10-16 に Web 版（focus/pamphlet の `python3 build.py` → `dist/pamphlet-hp.html`）を `public/p/focus-pamphlet-2609/index.html` に置いた（SMS のリンクを開くとそのまま見える。仮の PDF とページは削除）。改訂は同じ手順で上書き（URL不変）。URLの規則は `/p/focus-pamphlet-<発行年月YYMM>`（推測しにくいが規則はある形・HP内リンクなし・noindex）

## 3. 機能

- [x] **SMS資料送付の有効化** — 2026-09-21 完了・本番稼働中（楽天CPaaS）。比較選定: `focus/lead-api/docs/2026-07-12-sms-provider-selection.md`
  - [x] 2026-09-21 lead-api の `Sms.gs` を楽天CPaaSの実仕様で確定（lead-api 4e5038d・未push）。Basic認証→JWT（10分キャッシュ）→Bearer送信・`result_code`判定。`.claspignore` に Sms.gs が無くGASに上がらない不具合も修正。単体テスト `node test/sms.test.js`
  - [x] 2026-09-21 HP文言（確認画面の注意書き・完了文言）を**ブランチ `sms-wording`** に用意（mainには未マージ＝SMS有効化前に公開されないように）
  - [x] 2026-09-21 Script Properties 設定（`SMS_API_KEY` / `SMS_API_SECRET` / `SMS_FROM`=05055382649 / `SMS_TEST_PHONE` / `SMS_PAMPHLET_URL`）。※ `SMS_PAMPHLET_URL` は setup 実行がSMS実装より前だったため未投入で、手動追加した
  - [x] 2026-09-21 clasp push → `testSms` 成功（`{"status":"sent","parts":1}`＝1通課金）。1台目のみ確認
  - [x] 2026-09-21 Web Appを**バージョン3にデプロイ更新**（Apps Script APIで version=3 を確認。`clasp deployments` の表示は @2 のまま古い値を出すので信用しない）。stagingテストで `{"ok":true}` 確認
  - [x] 2026-09-21 `sms-wording` を main にマージ（ビルドOK・**未push**）
  - [x] 2026-09-21 ユーザー確認済み: 本番フォーム（/request）から自分の番号で通し確認（SMS着信・中央管理表のSMS送信列「送信済み」・Slack通知のSMS行）
  - [x] 2026-09-21 website を push・公開サイトで新文言を確認済み
  - [x] 2026-09-21 ユーザー確認済み: 残りキャリアの実機確認
  - [ ] 中央管理表「見込み顧客（テスト）」のテスト行（デプロイ動作確認・応答時間計測の計5件）は削除してよい
  - [ ] 任意: `SMS_API_SECRET` はチャット履歴に残ったため、落ち着いたら楽天管理画面でクレデンシャルを作り直して差し替え（デプロイ不要）
- [ ] **SMSイタズラ対策＋フォーム使い勝手（2026-09-22着手・ブランチ `sms-hardening-ux`）** — 決定: URLは推測しにくい規則形＋noindex／SMS本文に「心当たりがない場合は破棄」／Slack警戒フラグは**見送り**（通知文言は後日別途見直し）／CAPTCHAは bot 由来が増えてから
  - [x] website: パンフURL移動・noindex・教室ページからの教室自動選択（?c=slug）・紙飛行機待ち短縮（5d0c078）
  - [x] lead-api: 本文3行化・「送信済み（N通分）」記録・スプレッドシートを1回だけ開く高速化（ローカルコミット済み）
  - [ ] lead-api を clasp push＋デプロイ更新（clasp再ログインで中断）→ `testSms` で parts を確認（2なら本文短縮を検討）
  - [ ] Script Property `SMS_PAMPHLET_URL` を `https://focus584jp.github.io/website/p/focus-pamphlet-2609` に変更（**website公開後に**。先に変えると旧URLしか無い状態でSMSが飛ぶ）
  - [ ] `sms-hardening-ux` を main にマージ→push→公開確認→旧 /pamphlet が404になることを確認
  - [ ] **bot対策の追加（2026-09-22検討・未着手・要判断）**: 現状はSMS費用の上限（1日30通=264円）はあるが、受付自体に上限が無く、番号ローテートのbotでシート行とSlack通知が大量に増えるのは防げない。提案: ①Cloudflare Turnstile（無料。ユーザーがCloudflareアカウント作成→サイトキー発行。フォームのトークンをGASで検証。半日）②受付全体の時間あたり上限＋超過時はSlackに「大量申込を検知」を1回だけ（1時間）。公開前に両方入れる価値あり
- [ ] **GA4導入** — 測定ID受領後。CVイベント設計とセット（CV到達点=フォーム完了画面）
- [ ] **フォーム2種の総点検** — 資料請求/無料相談を実機で通しチェック（入力→確認→送信→中央管理表の記録→Slack通知→SMS）。企業問い合わせ（/contact）も
- [ ] **見込み顧客管理への中継有効化** — 教室マスタ「CRMシートID」の記入（現在は全教室「記録のみ」運用）

## 4. 公開前の仕上げ

**公開日の手順と、SEO・AI 検索のために HP の外でやること（Google ビジネスプロフィール・Search Console・Bing）は `docs/公開とSEOの手順.md` にまとめた（2026-10-16）。** あわせて `/llms.txt`（AI 向けの要約）と教室の構造化データの料金の目安を足した。

- [x] SEOの土台 — 2026-10-08 ブランチ `seo-foundations`（未マージ）。JSON-LD（団体・サイト・教室・FAQPage・パンくず。`src/lib/structuredData.ts`）・canonical・`@astrojs/sitemap`（/styleguide・/p/ 除外）・robots.txt（`src/pages/robots.txt.ts`）・末尾スラッシュ統一（`trailingSlash: 'always'`＋`u()`）・教室ページの題名と紹介文・トップの h1・404・FAQ 2問追加
- [ ] **noindex解除** — 本番ドメインで公開するときに `src/layouts/SiteLayout.astro` の `<meta name="robots" content="noindex, nofollow" />` の1行を消すだけ（robots.txt は最初から全許可。ページ単位の noindex を持つページがあればそちらは残す）。解除後に Search Console へ `https://focus584.net/sitemap-index.xml` を登録
- [x] **`/styleguide` をビルドから除外** — 2026-10-16 ページごと削除。旧メモ:（社内用部品カタログ。公開サイトには残さない＝2026-09-11決定。ページを削除するか、`src/pages/styleguide.astro` を `_styleguide.astro` 等にしてルーティングから外す。sitemapにも出ないことを確認）
- [x] 他塾比較の金額根拠・「当社調べ」表記の確定 — 2026-08-15 完了（社内で裏どり済みとユーザー確認。記録の置き場は `docs/当社調べ根拠.md`）
- [x] 教室座標のジオコーディング — 2026-08-15 完了。国土地理院APIで10教室の住所を番地レベルでジオコーディング（classrooms.ts）。駅からの直線距離が公表の徒歩分数と整合することも確認済み（旧仮値の駅座標が誤っていただけ）
- [ ] 全ページ最終チェック（実機スマホ/PC・リンク・誤字・「※仮」表記の残りゼロ確認）

## 5. 本番ドメイン移行 — **https://focus584.net の現行サイトを置き換える形で公開**（2026-07-14決定）

- [x] 2026-10-16 GitHub Pages にカスタムドメイン focus584.net を設定・DNS 切り替え済み（手順と記録は docs/公開とSEOの手順.md）。旧メモ: GitHub Pages にカスタムドメイン focus584.net を設定（リポジトリ Settings > Pages。DNS: apexのAレコード4本を GitHub Pages のIPへ、www は CNAME。HTTPSはLet's Encryptが自動発行）
- [ ] **astro.config の `base: '/website'` を `/` に変更＋`site` を https://focus584.net に設定** — 内部リンクは全て `u()` 経由なので追従する設計（canonical・og:url・JSON-LD の @id・sitemap・robots.txt の Sitemap 行も site と base から作っている）。ビルド後に全ページの視覚回帰チェック（scripts/）を実施
- [ ] **フォームの本番判定を更新** — `src/data/forms.ts` の `PRODUCTION_HOSTS`（現在 `['focus584jp.github.io']`）に focus584.net を追加（**忘れるとフォームが全部staging扱いになる**）
- [ ] lead-api の `SMS_PAMPHLET_URL` を https://focus584.net/p/focus-pamphlet-2609/ へ変更（Script Property・デプロイ不要）
- [x] 旧サイトのURL構造の扱いを決める — 2026-10-16 旧 URL 19 本に転送ページを置いた（`src/data/legacyUrls.ts`・`src/pages/[...legacy].astro`。meta refresh＋canonical、`?`・`#` を引き継ぐ。`/about/`・`/2026sum-campaign/` はトップへ）。旧メモ:（/school 等の旧URLは新サイトに存在しない。GitHub Pagesはサーバーリダイレクト不可のため、被リンクの多い旧URLがあればmetaリフレッシュのページを用意 or 404カスタムで誘導）
  - 2026-10-08 旧サイト全21ページの対応表を作成: `docs/旧サイトURL対応表.md`（`/about/`・`/2026sum-campaign/` の行き先は要確認）。ロリポップ（Apache）なら `.htaccess` の Redirect 301 で転送し、`ErrorDocument 404 /404.html` も書く
- [ ] 旧Pages URL（focus584jp.github.io/website）はカスタムドメイン設定後、自動で focus584.net へリダイレクトされることを確認（SMS等で配布済みURLの継続性）
- [x] 現行サイトのホスティング: **ロリポップは解約しない**（homework.focus584.net・online.focus584.net が載っている。2026-10-16 判明）

## アイデア（保留）

- LINE友だち登録で資料を受け取る導線（SMSの代替・フォールバック。LINE公式アカウント運用中なので実装余地あり）
- 教室ページの講師紹介・教室長メッセージ（写真差し替えのタイミングで検討）
