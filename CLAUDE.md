# FOCUS公式HP（focus/website）

勉強が苦手な中学生専門の個別指導塾「フォーカス」の集客サイト。Astro 5静的サイト。
GitHub Pages公開（`focus584jp/website`、base `/website`、https://focus584jp.github.io/website/ 、公開前のためnoindex）。

## いまの段階

- **全ページhifi実装済み・公開済み**（2026-07-07。トップ＝`docs/design/トップページ.dc.html`、相性診断＝`docs/design/相性診断.dc.html` が正。下層は2026-07-10〜11にデザイン展開済み: PageHero方眼ノート地＋ページ別アイコン・指導方針・教室一覧・沿革・診断モーダル化）
- **フォーム送信は本番稼働中**（2026-07-10〜。資料請求 /request・無料相談 /consult＝LeadForm.astro 3ステップ、企業問い合わせ /contact＝CorporateForm.astro。送信先は focus/lead-api の GAS Web App。設計は docs/superpowers/specs/2026-07-10-form-confirm-step-design.md。DEVは ?step=confirm|busy|done で画面確認可）
- ワイヤーフレーム層（components/wireframe・WireframeLayout・wireframe.css・tokens.css）は廃止済み（git履歴に残っている）
- 次のタスク: **`docs/TODO.md` が正本**（2026-07-14整理。ページ作り込み／実データ化／機能／公開前仕上げの4分類）
- 成果物の形: Astroビルドが `index.html`＋分離されたCSS/JSを出力する（メインページ=index.html、css/js別ファイルの要件はビルドで担保）

## 正本ドキュメント（docs/design/）

Claude Designプロジェクト「フォーカス公式サイト リニューアル」からのハンドオフ一式。**デザイン判断はまずここを読む。**

- `README.md` — ハンドオフ全仕様（画面仕様・トークン・インタラクション・公開前TODO）
- `トップページ.dc.html` — トップのhifi（実装済み）
- `相性診断.dc.html` — 診断ページのhifi＋配点ロジック（未実装）
- `ワイヤーフレーム.dc.html` — 下層ページの構造ガイド
- `設計メモ.md` — ワイヤー段階の確定事項
- `support.js` — .dc.htmlを動かすランタイム（参照用。移植対象ではない）

`.dc.html` の読み方: `{{ }}`=テンプレートホール、`sc-if`/`sc-for`=分岐/繰返し、`style-hover`等=擬似クラス。

## 構成

```
src/
  pages/            ルーティング（全ページhifi）
  layouts/
    SiteLayout.astro  共通レイアウト（フォント読込・ヘッダー/フッター・OGP。props: popup / fixedCta で診断ポップアップと固定CTAをページ単位で無効化できる）
  components/
    site/           全ページ共通（SiteHeader/SiteFooter/PageHero/CtaBand/FixedCta/DiagnosisPopup/DiagnosisApp/
                    SectionHead/FaqList/LeadForm/CorporateForm/MethodCompare/Icon/ArrowCircle）
    home/           トップ専用セクション（Hero/Reasons/Method/Price/Voices/Rooms/Flow/Faq）
    classroom/      教室詳細用（PhotoGallery=タップ拡大ライトボックス）
  styles/
    site.css        デザイントークン＋共有ボタン＋フォーム（正。docs/design/README.mdのトークンと同期）
  data/             コンテンツデータ（classrooms.ts / home.ts / faqs.ts / diagnosis.ts / forms.ts）。文言・数値・配点はここに集約
  assets/home/      画像（astro:assetsで最適化される）
```

## 規約

- フォントは自己ホスト（fontsource。Noto Sans JP Variable＋Zen Maru Gothic 700/900）。Google Fonts外部CSSはレンダリングブロックするため使わない
- GA4等の計測タグは未設置（測定ID入手後にCVイベント設計とセットで導入）
- 内部リンクは必ず `u()`（`src/lib/path.ts`）を通す（GitHub Pagesのbase `/website` 対応）
- 文言・教室・料金などのデータはコンポーネントに直書きせず `src/data/` に置く
- デザイントークンは `src/styles/site.css` のCSS変数を使う。新しい色を発明しない（ブランド正本は `~/claude/design-system/`）
- 絵文字禁止。アイコンはインラインSVG（Lucide線画準拠）。**共通アイコンは components/site/Icon.astro に集約**（arrow-right/download/phone。新規アイコンはここへ追加）。白丸＋紺矢印は ArrowCircle.astro。例外: 親のscoped CSSがsvgを直接触る箇所（LeadForm送信アニメ・教室詳細info-ic等）はインラインのまま
- ブレークポイント: <768 SP / 768–1024 タブレット / >1024 PC
- **読ませる本文は15px標準（clamp下限も14px以上）・色は var(--ink) #333333**。ターゲット（40代保護者・スマホ）の可読性基準。#8A96A8（gray-1）は装飾的な補足のみ（駅・徒歩など実用情報にはmuted以上を使う）
- **最低フォントサイズ 12px**（clampの下限も12px以上）。例外は「高密度な比較カード内の補足（税込等）」「装飾英字ラベル」「アイコン補助ラベル（ハンバーガーのメニュー等）」のみ最低10px
- **仮データの扱い**: 保護者の声・徒歩分数・教室座標・他塾比較金額・FAQ一部は仮。差し替えまで「※仮」表記を消さない（一覧は docs/design/README.md 末尾の公開前TODO）

## 運用

- 基本ローカル確認（`npm run dev`）。**pushはユーザーの指示があったときのみ**（push→GitHub Actionsで自動デプロイ）
- 公開ローンチ時: noindex解除（SiteLayout）・仮データ差し替え・法務表記（当社調べ等）を確認
- **視覚回帰チェック（scripts/）**: リファクタなど「見た目を変えない」変更の検証に使う
  1. 変更前に `npm run build && bash scripts/screenshot-pages.sh <before>` でベースライン撮影（全ページ×SP500px/PC1280px）
  2. 変更後に再ビルド→ `bash scripts/screenshot-pages.sh <after>` → `python3 scripts/compare-shots.py <before> <after>`
  3. 教室ページのGoogleマップ・フォント微差は撮影ノイズ。疑わしければ同じビルドを2回撮って切り分ける
- devサーバーは編集を重ねるとscoped CSSがHMRで古くなることがある→表示が怪しいときは再起動、最終確認はビルド出力で
