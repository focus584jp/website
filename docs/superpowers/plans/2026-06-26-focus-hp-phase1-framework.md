# FOCUS HP Phase 1（フレームワーク）Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** FOCUS公式HPの全ページ構成（セクションの並び・役割・CV位置）と教室10ページの自動生成を、Astroのワイヤーフレームとして固める。

**Architecture:** Astro静的サイト。共通レイアウト（ヘッダー／フッター／追従CTA）＋ワイヤー用部品（セクション枠・CTA群・アンカーナビ）でページを組む。教室10校舎はデータ配列＋動的ルート `[slug]` から生成。見た目はデザインしないが、**最低限のブランド色・基本書体だけ先に当てる**：design-systemの正本 `tokens.css` をコピー同期して取り込み、ワイヤーCSSがその変数（色・font-baseのみ）を参照する。コンポーネントCSS（focus-ui.css）はPhase 3で当てるため本フェーズでは読み込まない。

**Tech Stack:** Astro 5 / Node.js 22 / 素のHTML・CSS（ワイヤーCSS）。テストフレームワークは導入しない（YAGNI）。各タスクの検証は `npm run build` の成功と、生成物 `dist/` への `ls`/`grep` アサーション、必要箇所はヘッドレスChromeのスクショで行う。

## Global Constraints

- Node.js 22 / Astro 5 系を使用。
- **本フェーズはワイヤーフレーム**: 中身は見出し・プレースホルダーレベル。実コピー（Phase 2）・実デザイン（Phase 3）は作らない。
- **最低限のブランド色・書体のみ先に当てる**: design-systemの `tokens.css` を `src/styles/tokens.css` にコピー同期し、ワイヤーCSSがその変数（`--navy-logo` 等の色・`--font-base`）を参照。**コンポーネントCSS（focus-ui.css）は読み込まない**（Phase 3で適用）。tokens.cssは正本（`design-system/tokens.css`）からの同期コピーである旨をコメントに残す。
- **絵文字禁止**（design-systemルール）。アイコンは `[アイコン:〜]` のテキストプレースホルダーで表現。
- 教室は10校舎・スラッグはASCII: `inage / myoden / nishi-chiba / tsuga / shin-kemigawa / inage-kaigan / soga / goi / yotsukaido / kamatori`（稲毛・妙典・西千葉・都賀・新検見川・稲毛海岸・蘇我・五井・四街道・鎌取）。
- **CV導線の順序固定**: 資料請求（デジパン即送付）＞無料相談＞電話。**LINE相談は保留**（差し込み余地のコメントのみ残し、主CVに含めない）。
- ルート構成（URL）:
  - `/`（トップ）, `/reason`（選ばれる理由）, `/choose`（塾の選び方＝相性診断）, `/method`（指導方針）, `/price`（料金）, `/results`（合格実績・声）, `/classrooms`（教室一覧）, `/classrooms/[slug]`（各教室×10）, `/faq`, `/company`（会社概要）, `/contact`（資料請求/無料相談/お問い合わせ）。

---

## File Structure（このフェーズで作るファイル）

- `package.json` / `astro.config.mjs` / `tsconfig.json` — プロジェクト土台
- `src/styles/tokens.css` — design-system `tokens.css` のコピー同期（ブランド色・書体の変数）
- `src/styles/wireframe.css` — ワイヤー用最小CSS（tokens.cssの変数を参照）
- `src/layouts/BaseLayout.astro` — 全ページ共通の外枠（ヘッダー／main／フッター／追従CTA）
- `src/components/Header.astro` / `Footer.astro` / `StickyCta.astro` — 共通パーツ
- `src/components/Wf.astro` — セクション枠（ラベル付き）
- `src/components/CtaGroup.astro` — CV3点セット（資料請求＞無料相談＞電話）
- `src/components/AnchorNav.astro` — トップのページ内アンカーナビ
- `src/data/classrooms.ts` — 教室10校舎データ＋型
- `src/pages/index.astro` — トップ（長尺・全体像）
- `src/pages/reason.astro` / `choose.astro` / `method.astro` / `price.astro` / `results.astro` / `faq.astro` / `company.astro` / `contact.astro` — 下層ページ
- `src/pages/classrooms/index.astro` — 教室一覧
- `src/pages/classrooms/[slug].astro` — 各教室（動的生成）

---

### Task 1: Astroプロジェクトの土台を作る

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro`（仮）

**Interfaces:**
- Consumes: なし
- Produces: `npm run dev` / `npm run build` が動くAstroプロジェクト。

- [ ] **Step 1: package.json を作成**

`package.json`:
```json
{
  "name": "focus-website",
  "type": "module",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^5.0.0"
  }
}
```

- [ ] **Step 2: astro.config.mjs を作成**

`astro.config.mjs`（`site`/`base` はGitHub Pages公開前=Phase後半に設定するため今は空）:
```js
import { defineConfig } from 'astro/config';

export default defineConfig({});
```

- [ ] **Step 3: tsconfig.json を作成**

`tsconfig.json`:
```json
{
  "extends": "astro/tsconfigs/strict"
}
```

- [ ] **Step 4: 仮のトップページを作成**

`src/pages/index.astro`:
```astro
<!doctype html>
<html lang="ja">
  <head><meta charset="utf-8" /><title>FOCUS（仮）</title></head>
  <body><h1>FOCUS scaffold OK</h1></body>
</html>
```

- [ ] **Step 5: 依存をインストール**

Run: `npm install`
Expected: `astro` が `node_modules/` に入り、エラーなく完了。

- [ ] **Step 6: ビルドして生成物を確認（検証）**

Run: `npm run build && ls dist/`
Expected: `dist/index.html` が生成される。

Run: `grep -c "scaffold OK" dist/index.html`
Expected: `1`

- [ ] **Step 7: Commit**

```bash
git add package.json astro.config.mjs tsconfig.json src/pages/index.astro package-lock.json
git commit -m "chore: Astroプロジェクトの土台を作成"
```

---

### Task 2: 共通レイアウトとワイヤーCSS・共通パーツ

**Files:**
- Create: `src/styles/tokens.css`（design-systemから同期）, `src/styles/wireframe.css`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/StickyCta.astro`, `src/components/CtaGroup.astro`, `src/components/Wf.astro`, `src/layouts/BaseLayout.astro`
- Modify: `src/pages/index.astro`（レイアウト利用に置き換え）

**Interfaces:**
- Produces:
  - `BaseLayout.astro` — props `title: string`。ヘッダー／`<main>`内に `<h1>{title}</h1>` ＋ `<slot />`／フッター／追従CTAを描画。
  - `Wf.astro` — props `tag: string`（セクションのラベル）, `id?: string`。`<section class="wf-section" id={id}>` ＋ ラベル ＋ `<slot />`。
  - `CtaGroup.astro` — propsなし。資料請求（primary・`/contact#document`）＞無料相談（`/contact#consult`）＞電話（`/contact#tel`）の3リンク。

- [ ] **Step 1a: design-systemのトークンをコピー同期**

Run（`focus/website` リポジトリ直下で実行）:
```bash
mkdir -p src/styles
cp ../../design-system/tokens.css src/styles/tokens.css
```
Expected: `src/styles/tokens.css` が作られる（`--navy-logo:#143778` 等のブランド変数を含む）。
※これは正本 `design-system/tokens.css` からの**同期コピー**。色変更時は正本→ここへ同期する。

Run: `grep -c "\-\-navy-logo" src/styles/tokens.css`
Expected: `1`

- [ ] **Step 1b: ワイヤーCSSを作成（tokensの変数を参照）**

`src/styles/wireframe.css`（色・書体は `tokens.css` の変数を参照。最低限のブランド色のみ適用し、コンポーネントデザインはしない）:
```css
/* 色・書体は design-system のトークンを参照（同期コピー）。本フェーズはワイヤー用の最小スタイルのみ。 */
@import "./tokens.css";

* { box-sizing: border-box; }
body { font-family: var(--font-base); margin: 0; color: var(--ink); background: var(--bg-base); padding-bottom: 72px; }
.wf-main { max-width: var(--content-width); margin: 0 auto; padding: 16px 20px 40px; }
.wf-h1 { font-size: 20px; color: var(--navy-logo); border-bottom: 2px solid var(--navy-line); padding-bottom: 8px; }
.wf-section { border: 1px dashed var(--navy-line); border-radius: 6px; margin: 10px 0; padding: 14px 16px; background: var(--bg-base); }
.wf-section > .wf-tag { display: inline-block; font: 600 11px/1.4 ui-monospace, monospace; color: var(--navy-logo); background: var(--navy-bg); padding: 4px 8px; border-radius: 4px; margin-bottom: 8px; }
.wf-note { color: var(--muted); font-size: 13px; margin: 4px 0; }
.wf-list { margin: 4px 0; padding-left: 20px; }
.wf-cta-group { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
.wf-cta { display: inline-block; border: 1.5px solid var(--navy-logo); border-radius: var(--radius-button); padding: 8px 14px; font-size: 13px; text-decoration: none; color: var(--navy-logo); background: var(--bg-base); }
.wf-cta.primary { background: var(--orange-logo); border-color: var(--orange-logo); color: #fff; }
.wf-header { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; padding: 10px 20px; border-bottom: 1px solid var(--border); background: var(--bg-base); }
.wf-nav { display: flex; gap: 12px; flex-wrap: wrap; font-size: 13px; }
.wf-nav a { color: var(--navy-logo); text-decoration: none; }
.wf-header-cta { display: flex; gap: 8px; margin-left: auto; align-items: center; }
.wf-logo { font-weight: 700; color: var(--navy-logo); text-decoration: none; }
.wf-icon { font-size: 12px; color: var(--muted); text-decoration: none; }
.wf-footer { background: var(--navy-logo); color: #fff; padding: 16px 20px; margin-top: 24px; }
.wf-footer a { color: #fff; margin-right: 12px; font-size: 13px; }
.wf-anchor-nav { display: flex; gap: 10px; flex-wrap: wrap; font-size: 13px; }
.wf-anchor-nav a { color: var(--navy-logo); }
.wf-sticky { position: fixed; left: 0; right: 0; bottom: 0; display: flex; gap: 8px; justify-content: center; background: var(--bg-base); border-top: 1px solid var(--border); padding: 10px; z-index: 50; }
```

- [ ] **Step 2: CtaGroup を作成**

`src/components/CtaGroup.astro`:
```astro
---
// CV導線3点セット（順序固定：資料請求＞無料相談＞電話）。LINE相談は保留。
---
<div class="wf-cta-group">
  <a class="wf-cta primary" href="/contact#document">資料請求（デジパン即送付）</a>
  <a class="wf-cta" href="/contact#consult">無料相談</a>
  <a class="wf-cta" href="/contact#tel">電話</a>
  {/* LINE相談は保留：採用時はここに差し込む */}
</div>
```

- [ ] **Step 3: Wf（セクション枠）を作成**

`src/components/Wf.astro`:
```astro
---
const { tag, id } = Astro.props;
---
<section class="wf-section" id={id}>
  <span class="wf-tag">{tag}</span>
  <slot />
</section>
```

- [ ] **Step 4: Header を作成**

`src/components/Header.astro`:
```astro
---
const nav = [
  { href: '/reason', label: '選ばれる理由' },
  { href: '/choose', label: '塾の選び方' },
  { href: '/method', label: '指導方針' },
  { href: '/price', label: '料金' },
  { href: '/results', label: '実績・声' },
  { href: '/classrooms', label: '教室一覧' },
  { href: '/faq', label: 'よくある質問' },
];
---
<header class="wf-header">
  <a class="wf-logo" href="/">[FOCUSロゴ]</a>
  <nav class="wf-nav">
    {nav.map((n) => <a href={n.href}>{n.label}</a>)}
  </nav>
  <div class="wf-header-cta">
    <a class="wf-icon" href="/classrooms" aria-label="教室を探す">[アイコン:教室を探す]</a>
    <a class="wf-cta primary" href="/contact#document">資料請求</a>
    <a class="wf-cta" href="/contact#consult">無料相談</a>
  </div>
</header>
```

- [ ] **Step 5: Footer を作成**

`src/components/Footer.astro`:
```astro
---
// 会社概要はフッター導線で控えめに。プライバシーポリシー/特商法は会社概要内に置く想定。
---
<footer class="wf-footer">
  <nav>
    <a href="/company">会社概要</a>
    <a href="/contact">お問い合わせ</a>
  </nav>
  <p class="wf-note" style="color:#fff;">© FOCUS（仮）</p>
</footer>
```

- [ ] **Step 6: StickyCta を作成**

`src/components/StickyCta.astro`:
```astro
---
// 全ページ追従CTA（スマホ下部固定＋PC常設）。参考サイトで最も支持された要素。
---
<div class="wf-sticky">
  <a class="wf-cta primary" href="/contact#document">資料請求</a>
  <a class="wf-cta" href="/contact#consult">無料相談</a>
  <a class="wf-cta" href="/contact#tel">電話</a>
</div>
```

- [ ] **Step 7: BaseLayout を作成**

`src/layouts/BaseLayout.astro`:
```astro
---
import '../styles/wireframe.css';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import StickyCta from '../components/StickyCta.astro';
const { title } = Astro.props;
---
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title} | FOCUS（仮）</title>
  </head>
  <body>
    <Header />
    <main class="wf-main">
      <h1 class="wf-h1">{title}</h1>
      <slot />
    </main>
    <Footer />
    <StickyCta />
  </body>
</html>
```

- [ ] **Step 8: index.astro をレイアウト利用に差し替え（仮）**

`src/pages/index.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Wf from '../components/Wf.astro';
import CtaGroup from '../components/CtaGroup.astro';
---
<BaseLayout title="トップ（仮）">
  <Wf tag="ヒーロー（仮）">
    <p class="wf-note">レイアウト確認用プレースホルダー</p>
    <CtaGroup />
  </Wf>
</BaseLayout>
```

- [ ] **Step 9: ビルドして検証**

Run: `npm run build`
Expected: エラーなく完了。

Run: `grep -c "wf-sticky" dist/index.html && grep -c "wf-header" dist/index.html`
Expected: それぞれ `1` 以上（ヘッダーと追従CTAが全ページ外枠に入っている）。

- [ ] **Step 10: Commit**

```bash
git add src/styles src/components src/layouts src/pages/index.astro
git commit -m "feat: 共通レイアウト・ワイヤーCSS・共通パーツ（ヘッダー/フッター/追従CTA/CTA群）"
```

---

### Task 3: 教室データと型

**Files:**
- Create: `src/data/classrooms.ts`

**Interfaces:**
- Produces: `classrooms: Classroom[]`（10件）。`Classroom` 型は `{ slug, name, area, nearestStation, address, tel, schools: string[], managerName, hours }`。後続のTask 4・6が import する。

- [ ] **Step 1: 教室データを作成（10校舎・中身はダミー）**

`src/data/classrooms.ts`:
```ts
export interface Classroom {
  slug: string;
  name: string;
  area: string;
  nearestStation: string;
  address: string;
  tel: string;
  schools: string[];
  managerName: string;
  hours: string;
}

const dummy = {
  address: '（住所ダミー）',
  tel: '043-000-0000',
  schools: ['（対応中学ダミー1）', '（対応中学ダミー2）', '（対応中学ダミー3）'],
  managerName: '（教室責任者ダミー）',
  hours: '（開校時間ダミー）',
};

export const classrooms: Classroom[] = [
  { slug: 'inage',        name: '稲毛校',     area: '千葉市稲毛区',   nearestStation: 'JR稲毛駅',     ...dummy },
  { slug: 'myoden',       name: '妙典校',     area: '市川市',         nearestStation: '東京メトロ妙典駅', ...dummy },
  { slug: 'nishi-chiba',  name: '西千葉校',   area: '千葉市中央区',   nearestStation: 'JR西千葉駅',   ...dummy },
  { slug: 'tsuga',        name: '都賀校',     area: '千葉市若葉区',   nearestStation: 'JR都賀駅',     ...dummy },
  { slug: 'shin-kemigawa',name: '新検見川校', area: '千葉市花見川区', nearestStation: 'JR新検見川駅', ...dummy },
  { slug: 'inage-kaigan', name: '稲毛海岸校', area: '千葉市美浜区',   nearestStation: 'JR稲毛海岸駅', ...dummy },
  { slug: 'soga',         name: '蘇我校',     area: '千葉市中央区',   nearestStation: 'JR蘇我駅',     ...dummy },
  { slug: 'goi',          name: '五井校',     area: '市原市',         nearestStation: 'JR五井駅',     ...dummy },
  { slug: 'yotsukaido',   name: '四街道校',   area: '四街道市',       nearestStation: 'JR四街道駅',   ...dummy },
  { slug: 'kamatori',     name: '鎌取校',     area: '千葉市緑区',     nearestStation: 'JR鎌取駅',     ...dummy },
];
```

- [ ] **Step 2: 型チェック（検証）**

Run: `npx astro check 2>&1 | tail -5 || true`
Expected: `classrooms.ts` 起因の型エラーが出ない（`astro check` 未導入で実行できない場合は次のビルドで担保するためスキップ可）。

Run: `npm run build`
Expected: エラーなく完了（importはまだ無いがビルドが壊れていないことを確認）。

- [ ] **Step 3: Commit**

```bash
git add src/data/classrooms.ts
git commit -m "feat: 教室10校舎のデータと型を追加（中身はダミー）"
```

---

### Task 4: トップページ（全セクションのワイヤー）

**Files:**
- Create: `src/components/AnchorNav.astro`
- Modify: `src/pages/index.astro`（仮から本構成へ）

**Interfaces:**
- Consumes: `BaseLayout`, `Wf`, `CtaGroup`（Task 2）, `classrooms`（Task 3）
- Produces: `AnchorNav.astro` — props `items: { id: string; label: string }[]`。各 `#id` へのリンクを描画。

- [ ] **Step 1: AnchorNav を作成**

`src/components/AnchorNav.astro`:
```astro
---
const { items } = Astro.props;
---
<nav class="wf-anchor-nav">
  {items.map((i) => <a href={`#${i.id}`}>{i.label}</a>)}
</nav>
```

- [ ] **Step 2: トップページを本構成に差し替え**

`src/pages/index.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Wf from '../components/Wf.astro';
import CtaGroup from '../components/CtaGroup.astro';
import AnchorNav from '../components/AnchorNav.astro';
import { classrooms } from '../data/classrooms';

const anchors = [
  { id: 'reason', label: '選ばれる理由' },
  { id: 'choose', label: '塾の選び方' },
  { id: 'price', label: '料金' },
  { id: 'results', label: '実績・声' },
  { id: 'classrooms', label: '教室' },
];
---
<BaseLayout title="トップ（広告着地点）">
  <Wf tag="ヒーロー（苦手専門の宣言＋母親への添え書き／斜め大型キャッチ・写真orイラスト予定）" id="hero">
    <p class="wf-note">大型キャッチ／手書き添え書き／資料請求・無料相談CTA</p>
    <CtaGroup />
  </Wf>
  <Wf tag="ページ内アンカーナビ（伊藤塾LPの学び）">
    <AnchorNav items={anchors} />
  </Wf>
  <Wf tag="こんな悩みありませんか？（チェックリストで自分ごと化／北斗LPの学び）">
    <ul class="wf-list"><li>勉強しない</li><li>勉強のやり方が分からない</li><li>平均点が取れない</li></ul>
  </Wf>
  <Wf tag="選ばれる理由 3本柱（苦手専門→価格→千葉大生）" id="reason">
    <p class="wf-note">3本柱ダイジェスト → /reason</p>
  </Wf>
  <Wf tag="塾の選び方（相性診断）ダイジェスト" id="choose">
    <p class="wf-note">通信→集団→個別1対2→1対4 → /choose</p>
  </Wf>
  <Wf tag="料金ダイジェスト（5,980円を大きく／5教科でも集団塾並み）" id="price">
    <p class="wf-note">大きな数字での提示 → /price</p>
    <CtaGroup />
  </Wf>
  <Wf tag="指導方針ダイジェスト（勉強のやり方を教える＝自立）">
    <p class="wf-note">→ /method</p>
  </Wf>
  <Wf tag="合格実績・生徒/保護者の声" id="results">
    <p class="wf-note">定期テスト・内申UP事例／公立高合格 → /results</p>
  </Wf>
  <Wf tag="教室マップ＋一覧" id="classrooms">
    <ul class="wf-list">{classrooms.map((c) => <li><a href={`/classrooms/${c.slug}`}>{c.name}（{c.nearestStation}）</a></li>)}</ul>
  </Wf>
  <Wf tag="入塾までの流れ（01→02→…）">
    <p class="wf-note">資料請求/相談 → 体験授業 → 入塾</p>
  </Wf>
  <Wf tag="FAQ（抜粋）">
    <p class="wf-note">→ /faq</p>
  </Wf>
  <Wf tag="CTAバンド（資料請求・無料相談・電話）">
    <CtaGroup />
  </Wf>
</BaseLayout>
```

- [ ] **Step 3: ビルドして検証**

Run: `npm run build`
Expected: エラーなく完了。

Run: `grep -o 'id="reason"\|id="choose"\|id="price"\|id="results"\|id="classrooms"' dist/index.html | sort -u | wc -l`
Expected: `5`（アンカー対象セクションが5つ存在）。

Run: `grep -c '/classrooms/inage' dist/index.html`
Expected: `1` 以上（教室一覧の生成リンクが入っている）。

- [ ] **Step 4: Commit**

```bash
git add src/components/AnchorNav.astro src/pages/index.astro
git commit -m "feat: トップページのワイヤー（全セクション・アンカーナビ・教室リンク）"
```

---

### Task 5: 教室一覧と各教室ページ（動的生成）

**Files:**
- Create: `src/pages/classrooms/index.astro`, `src/pages/classrooms/[slug].astro`

**Interfaces:**
- Consumes: `BaseLayout`, `Wf`, `CtaGroup`（Task 2）, `classrooms`（Task 3）
- Produces: `/classrooms`（一覧）と `/classrooms/<slug>`（10ページ）。

- [ ] **Step 1: 教室一覧ページを作成**

`src/pages/classrooms/index.astro`:
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Wf from '../../components/Wf.astro';
import CtaGroup from '../../components/CtaGroup.astro';
import { classrooms } from '../../data/classrooms';
---
<BaseLayout title="教室一覧（千葉市中心10校舎）">
  <Wf tag="教室マップ（千葉市に10校舎プロット予定）">
    <p class="wf-note">[マッププレースホルダー]</p>
  </Wf>
  <Wf tag="教室リスト（10校舎）">
    <ul class="wf-list">
      {classrooms.map((c) => <li><a href={`/classrooms/${c.slug}`}>{c.name}（{c.area} / {c.nearestStation}）</a></li>)}
    </ul>
  </Wf>
  <Wf tag="CV">
    <CtaGroup />
  </Wf>
</BaseLayout>
```

- [ ] **Step 2: 各教室ページ（テンプレート）を作成**

`src/pages/classrooms/[slug].astro`:
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Wf from '../../components/Wf.astro';
import CtaGroup from '../../components/CtaGroup.astro';
import { classrooms } from '../../data/classrooms';

export function getStaticPaths() {
  return classrooms.map((c) => ({ params: { slug: c.slug }, props: { classroom: c } }));
}
const { classroom } = Astro.props;
---
<BaseLayout title={classroom.name}>
  <Wf tag="教室基本情報">
    <p class="wf-note">{classroom.area} / {classroom.nearestStation} / {classroom.address} / TEL {classroom.tel}</p>
  </Wf>
  <Wf tag="地図（Googleマップ埋め込み予定）">
    <p class="wf-note">[地図プレースホルダー]</p>
  </Wf>
  <Wf tag="対応中学校（ローカルSEOの要）">
    <p class="wf-note">{classroom.schools.join(' / ')}</p>
  </Wf>
  <Wf tag="教室責任者（顔写真・ひとこと）">
    <p class="wf-note">{classroom.managerName}</p>
  </Wf>
  <Wf tag="教室写真（複数）">
    <p class="wf-note">[写真プレースホルダー]</p>
  </Wf>
  <Wf tag="開校時間・対応学年・空き状況">
    <p class="wf-note">{classroom.hours}</p>
  </Wf>
  <Wf tag="CV（この教室で相談・電話）">
    <CtaGroup />
  </Wf>
</BaseLayout>
```

- [ ] **Step 3: ビルドして検証（10ページ生成）**

Run: `npm run build`
Expected: エラーなく完了。

Run: `ls dist/classrooms/`
Expected: `index.html` ＋ 10個のディレクトリ（`inage myoden nishi-chiba tsuga shin-kemigawa inage-kaigan soga goi yotsukaido kamatori`）。

Run: `ls -d dist/classrooms/*/ | wc -l`
Expected: `10`

Run: `grep -c "対応中学校" dist/classrooms/inage/index.html`
Expected: `1`

- [ ] **Step 4: Commit**

```bash
git add src/pages/classrooms
git commit -m "feat: 教室一覧と各教室ページ（データから10ページ自動生成）"
```

---

### Task 6: 下層ページ群（選ばれる理由・相性診断・指導方針・料金・実績）

**Files:**
- Create: `src/pages/reason.astro`, `src/pages/choose.astro`, `src/pages/method.astro`, `src/pages/price.astro`, `src/pages/results.astro`

**Interfaces:**
- Consumes: `BaseLayout`, `Wf`, `CtaGroup`

- [ ] **Step 1: 選ばれる理由ページ**

`src/pages/reason.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Wf from '../components/Wf.astro';
import CtaGroup from '../components/CtaGroup.astro';
---
<BaseLayout title="フォーカスが選ばれる理由">
  <Wf tag="① 苦手な子“専門”（偏差値45〜55・分からないが当たり前）"><p class="wf-note">対象を絞るから寄り添える</p></Wf>
  <Wf tag="② 通いやすい価格・明朗会計（1教科5,980円）"><p class="wf-note">5教科でも集団塾並み</p></Wf>
  <Wf tag="③ 講師の質（全員千葉大生）"><p class="wf-note">低価格でも質の不安を払拭</p></Wf>
  <Wf tag="補強：勉強のやり方を教える／地域密着"><p class="wf-note">→ /method・/classrooms</p></Wf>
  <Wf tag="CV"><CtaGroup /></Wf>
</BaseLayout>
```

- [ ] **Step 2: 塾の選び方（相性診断）ページ**

`src/pages/choose.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Wf from '../components/Wf.astro';
import CtaGroup from '../components/CtaGroup.astro';
---
<BaseLayout title="塾の選び方（お子様に合う塾は？）">
  <Wf tag="導入：売り込みでなく“合う塾を一緒に考える”"><p class="wf-note">警戒心を解く</p></Wf>
  <Wf tag="選択肢1：通信教育・自学（自分で続けられるか）"><p class="wf-note">継続の難しさ</p></Wf>
  <Wf tag="選択肢2：集団塾（平均点を超えているか）"><p class="wf-note">基礎がないと厳しい</p></Wf>
  <Wf tag="選択肢3：個別1対1/1対2（1教科月2万円前後）"><p class="wf-note">苦手1科目ならアリ</p></Wf>
  <Wf tag="だから：個別1対4（広く苦手・複数科目に最適）"><p class="wf-note">FOCUSの解</p></Wf>
  <Wf tag="比較表（通信／集団／1対2／1対4）"><p class="wf-note">[比較表プレースホルダー]</p></Wf>
  <Wf tag="CV（無料相談）"><CtaGroup /></Wf>
</BaseLayout>
```

- [ ] **Step 3: 指導方針ページ**

`src/pages/method.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Wf from '../components/Wf.astro';
import CtaGroup from '../components/CtaGroup.astro';
---
<BaseLayout title="指導方針">
  <Wf tag="Teaching vs Coaching（解き方でなく“勉強のやり方”を教える）"><p class="wf-note">図解予定</p></Wf>
  <Wf tag="1対4だからこそ：教わる時間と自分で考える時間"><p class="wf-note">自立する力</p></Wf>
  <Wf tag="基礎から積み上げ（中1最初の単元から抜け漏れなく）"><p class="wf-note">何年生から入っても</p></Wf>
  <Wf tag="CV"><CtaGroup /></Wf>
</BaseLayout>
```

- [ ] **Step 4: 料金ページ**

`src/pages/price.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Wf from '../components/Wf.astro';
import CtaGroup from '../components/CtaGroup.astro';
---
<BaseLayout title="授業料">
  <Wf tag="通常授業料（1講座5,980円・3講座＝週3の例）"><p class="wf-note">大きな数字で提示</p></Wf>
  <Wf tag="5教科でも集団塾並み（3〜3.5万）"><p class="wf-note">総額比較で安さを語る</p></Wf>
  <Wf tag="講習（夏冬春：各講座+4回／料金は2倍タイミング）"><p class="wf-note">年3回</p></Wf>
  <Wf tag="諸経費（入会金・管理費なし／教材費＋システム料 月1,250円のみ）"><p class="wf-note">明朗会計</p></Wf>
  <Wf tag="柔軟な受け方（苦手科目を週2回／テスト前ピンポイント）"><p class="wf-note">週4回勉強体制</p></Wf>
  <Wf tag="他塾比較（大手の約半額）"><p class="wf-note">[比較プレースホルダー]</p></Wf>
  <Wf tag="CV（資料請求＝デジパン即送付）"><CtaGroup /></Wf>
</BaseLayout>
```

- [ ] **Step 5: 合格実績・声ページ**

`src/pages/results.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Wf from '../components/Wf.astro';
import CtaGroup from '../components/CtaGroup.astro';
---
<BaseLayout title="合格実績・生徒の声">
  <Wf tag="定期テスト・内申UP事例（数値）"><p class="wf-note">大きな数字</p></Wf>
  <Wf tag="公立高校合格実績"><p class="wf-note">[実績プレースホルダー]</p></Wf>
  <Wf tag="保護者の声"><p class="wf-note">[声プレースホルダー]</p></Wf>
  <Wf tag="生徒の声"><p class="wf-note">[声プレースホルダー]</p></Wf>
  <Wf tag="CV"><CtaGroup /></Wf>
</BaseLayout>
```

- [ ] **Step 6: ビルドして検証**

Run: `npm run build`
Expected: エラーなく完了。

Run: `for p in reason choose method price results; do test -f dist/$p/index.html && echo "$p OK"; done`
Expected: `reason OK` / `choose OK` / `method OK` / `price OK` / `results OK` の5行。

- [ ] **Step 7: Commit**

```bash
git add src/pages/reason.astro src/pages/choose.astro src/pages/method.astro src/pages/price.astro src/pages/results.astro
git commit -m "feat: 下層ページ（選ばれる理由/相性診断/指導方針/料金/実績）のワイヤー"
```

---

### Task 7: FAQ・会社概要・お問い合わせ＋最終検証

**Files:**
- Create: `src/pages/faq.astro`, `src/pages/company.astro`, `src/pages/contact.astro`

**Interfaces:**
- Consumes: `BaseLayout`, `Wf`, `CtaGroup`

- [ ] **Step 1: FAQページ**

`src/pages/faq.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Wf from '../components/Wf.astro';
import CtaGroup from '../components/CtaGroup.astro';
const faqs = ['1対4で大丈夫？', '部活と両立できる？', '途中入塾でも追いつける？', '先生は選べる？', '料金以外に費用は？'];
---
<BaseLayout title="よくあるご質問">
  <Wf tag="FAQ（アコーディオン＝details/summaryで実装予定）">
    {faqs.map((q) => (
      <details>
        <summary>{q}</summary>
        <p class="wf-note">[回答プレースホルダー]</p>
      </details>
    ))}
  </Wf>
  <Wf tag="CV"><CtaGroup /></Wf>
</BaseLayout>
```

- [ ] **Step 2: 会社概要ページ**

`src/pages/company.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Wf from '../components/Wf.astro';
---
<BaseLayout title="会社概要">
  <Wf tag="会社情報（運営会社・所在地・設立）"><p class="wf-note">[情報プレースホルダー]</p></Wf>
  <Wf tag="代表挨拶"><p class="wf-note">[挨拶プレースホルダー]</p></Wf>
  <Wf tag="講師採用方針（千葉大生のみ）"><p class="wf-note">信頼に転用</p></Wf>
  <Wf tag="プライバシーポリシー"><p class="wf-note">[ポリシープレースホルダー]</p></Wf>
  <Wf tag="特定商取引法に基づく表記"><p class="wf-note">[表記プレースホルダー]</p></Wf>
</BaseLayout>
```

- [ ] **Step 3: お問い合わせ（CV受け皿）ページ**

`src/pages/contact.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Wf from '../components/Wf.astro';
---
<BaseLayout title="資料請求・無料相談・お問い合わせ">
  <Wf tag="資料請求（デジタルパンフをメール即送付）" id="document"><p class="wf-note">[フォームプレースホルダー]</p></Wf>
  <Wf tag="無料相談（来塾1時間）予約" id="consult"><p class="wf-note">[予約フォームプレースホルダー]</p></Wf>
  <Wf tag="電話（各教室直通）" id="tel"><p class="wf-note">[電話番号プレースホルダー]</p></Wf>
  <Wf tag="LINE相談（保留：採用時に差し込む）"><p class="wf-note">FOCUS LINE公式へ送る導線。Phase 1では主CVに含めない</p></Wf>
</BaseLayout>
```

- [ ] **Step 4: 全ページのビルド検証**

Run: `npm run build`
Expected: エラーなく完了。

Run: `for p in index reason choose method price results faq company contact classrooms; do test -f dist/$p/index.html || test -f dist/$p.html && echo "$p OK" || echo "$p MISSING"; done; ls -d dist/classrooms/*/ | wc -l`
Expected: 全ページ `OK` ＋ 末尾に `10`（教室ページ数）。
（注: Astroの既定では `index` は `dist/index.html`、他は `dist/<name>/index.html`。`contact` の `#document/#consult/#tel` アンカーが `CtaGroup` のリンク先と一致していることも担保される。）

Run: `grep -c 'href="/contact#document"' dist/index.html`
Expected: `1` 以上（CTAの主導線がトップに存在）。

- [ ] **Step 5: 見た目（ワイヤー）をスマホ幅でスクショ確認**

Run（preview起動→スクショ→停止）:
```bash
npm run preview &
PREVIEW_PID=$!
sleep 3
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --hide-scrollbars --window-size=500,3000 --screenshot=/tmp/focus-top-wf.png "http://localhost:4321/" >/dev/null 2>&1
kill $PREVIEW_PID 2>/dev/null
ls -la /tmp/focus-top-wf.png
```
Expected: `/tmp/focus-top-wf.png` が生成される。画像を開き、トップのセクションが**仕様の並び順（ヒーロー→アンカーナビ→悩み→選ばれる理由→相性診断→料金→指導方針→実績→教室→流れ→FAQ→CTAバンド）**で縦に並び、下部に追従CTAが出ていることを目視確認する。
（`astro preview` の既定ポートは4321。起動ログのURLが異なる場合はそれに合わせる。）

- [ ] **Step 6: Commit**

```bash
git add src/pages/faq.astro src/pages/company.astro src/pages/contact.astro
git commit -m "feat: FAQ/会社概要/お問い合わせのワイヤー＋全ページ構成を確定（Phase 1完了）"
```

---

## Self-Review（記入済み）

**1. Spec coverage:**
- サイト構成（仕様§5）→ Task 4（トップ）／Task 5（教室）／Task 6・7（下層8ページ）で全ルートを実装。
- トップのセクション並び（仕様§6）→ Task 4 で15相当のブロックを順序通り。
- CV導線の順序・追従CTA（仕様§7）→ Task 2（CtaGroup/StickyCta）で固定、全ページに適用。
- 教室データモデル（仕様§8）→ Task 3（型＋10件）＋ Task 5（動的生成）。
- 技術構成（仕様§10）→ Task 1（Astro土台）。design-system非読み込み・絵文字禁止は Global Constraints で明記。
- LINE保留・会社概要のフッター導線（仕様§7・§11）→ CtaGroupコメント・Footer・contactの保留セクションで反映。
- デザイン（Phase 3）・コピー（Phase 2）は本フェーズ対象外（仕様§0）。

**2. Placeholder scan:** ワイヤーの「[〜プレースホルダー]」は意図的な仕様（中身はPhase 2/3）。計画上の手順・コードは実体を持ち、TODO/TBD/「後で実装」は無い。

**3. Type consistency:** `Classroom` の各プロパティ名（`slug/name/area/nearestStation/address/tel/schools/managerName/hours`）は Task 3 定義と Task 4・5 の参照で一致。`CtaGroup` のリンク先（`/contact#document|#consult|#tel`）は Task 7 の `contact.astro` のアンカーid（`document/consult/tel`）と一致。`AnchorNav` の `items` 形 `{id,label}` は Task 4 の `anchors` と一致。

---

## 次フェーズ（参考・本計画の対象外）
- **Phase 2**: 面談トークスクリプトから各セクションの実コピーを起こす。
- **Phase 3**: design-systemを吟味し、Claude Design＋Claude Codeでデザインを当てて反復。GitHub Pages公開設定（`astro.config` の `site`/`base`）・独自ドメイン判断。
