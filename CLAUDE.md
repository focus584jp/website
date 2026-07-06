# FOCUS公式HP（focus/website）

勉強が苦手な中学生専門の個別指導塾「フォーカス」の集客サイト。Astro 5静的サイト。
GitHub Pages公開（`focus584jp/website`、base `/website`、https://focus584jp.github.io/website/ 、公開前のためnoindex）。

## いまの段階

- **トップページ（/）と全体の見た目はhifi実装済み**（`docs/design/トップページ.dc.html` が正）
- **下層ページはワイヤーフレーム段階**（/reason /method /price /faq /classrooms /document /consult /company /diagnosis）
- 次のタスク: 下層ページのhifi化（構造ガイドは `docs/design/ワイヤーフレーム.dc.html`、スタイルはトップのトークンを適用）と相性診断（`docs/design/相性診断.dc.html`、配点ロジック込み）のhifi化

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
  pages/            ルーティング（index=hifi、他はワイヤー）
  layouts/
    SiteLayout.astro       hifi用（フォント読込・ヘッダー/フッター/固定CTA/診断ポップアップ込み）
    WireframeLayout.astro  ワイヤー用（hifi化が終わったページから順次 SiteLayout へ移行）
  components/
    site/           hifi共通（SiteHeader/SiteFooter/CtaBand/FixedCta/DiagnosisPopup/SectionHead）
    home/           トップ専用セクション（Hero/Reasons/Method/Price/Voices/Rooms/Flow/Faq）
    wireframe/      ワイヤー用パーツ（hifi化完了後に廃止予定）
  styles/
    site.css        hifiのデザイントークン＋共有ボタン（正。docs/design/README.mdのトークンと同期）
    wireframe.css + tokens.css   ワイヤー用（tokens.cssはdesign-systemの旧同期コピー。凍結）
  data/             コンテンツデータ（classrooms.ts / home.ts）。文言・数値はここに集約
  assets/home/      画像（astro:assetsで最適化される）
  fonts/            ローカル限定（gitignore済み。あんずもじ等）
public/preview/     デザイン共有用のバンドル（デザイン確定・実装完了後に削除してよい）
```

## 規約

- 内部リンクは必ず `u()`（`src/lib/path.ts`）を通す（GitHub Pagesのbase `/website` 対応）
- 文言・教室・料金などのデータはコンポーネントに直書きせず `src/data/` に置く
- デザイントークンは `src/styles/site.css` のCSS変数を使う。新しい色を発明しない（ブランド正本は `~/claude/design-system/`）
- 絵文字禁止。アイコンはインラインSVG（Lucide線画準拠）
- ブレークポイント: <768 SP / 768–1024 タブレット / >1024 PC
- **仮データの扱い**: 保護者の声・徒歩分数・教室座標・他塾比較金額・FAQ一部は仮。差し替えまで「※仮」表記を消さない（一覧は docs/design/README.md 末尾の公開前TODO）

## 運用

- 基本ローカル確認（`npm run dev`）。**pushはユーザーの指示があったときのみ**（push→GitHub Actionsで自動デプロイ）
- 公開ローンチ時: noindex解除（SiteLayout）・仮データ差し替え・法務表記（当社調べ等）を確認
