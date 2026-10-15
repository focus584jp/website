# 旧サイト（focus584.net・WordPress）→ 新HP のURL対応表

2026-10-08 調査。出典: https://focus584.net/sitemap.xml（All in One SEO）→ `page-sitemap.xml` の全21ページ、`sitemap.rss`、トップのリンク。
投稿（post-sitemap.xml）・カテゴリのサイトマップは存在しない（404）。固定ページだけのサイト。

**転送（301）の実装はサーバーが決まってから。** ここは表だけ。新HPのパスは base を `/` にした本番（https://focus584.net/）での形。

| 旧URL | 旧ページの題名 | 新URL | 備考 |
| --- | --- | --- | --- |
| `/` | トップページ | `/` | 同じ |
| `/about/` | フォーカスを知る | `/` | **要確認**: 新HPに同じページはない。中身（選ばれる理由など）はトップにある。`/method/` にする案も |
| `/teaching/` | 指導方針 | `/method/` | |
| `/fee/` | 授業料 | `/price/` | |
| `/school/` | 教室を探す | `/classrooms/` | |
| `/school/nishichiba/` | 西千葉教室 | `/classrooms/nishichiba/` | 旧サイトと同じ名前（2026-10-10 にハイフンなしへ変更） |
| `/school/inage/` | 稲毛教室 | `/classrooms/inage/` | |
| `/school/shinkemigawa/` | 新検見川教室 | `/classrooms/shinkemigawa/` | 旧サイトと同じ名前（2026-10-10 にハイフンなしへ変更） |
| `/school/inagekaigan/` | 稲毛海岸教室 | `/classrooms/inagekaigan/` | 旧サイトと同じ名前（2026-10-10 にハイフンなしへ変更） |
| `/school/tsuga/` | 都賀教室 | `/classrooms/tsuga/` | |
| `/school/soga/` | 蘇我教室 | `/classrooms/soga/` | |
| `/school/kamatori/` | 鎌取教室 | `/classrooms/kamatori/` | |
| `/school/yotsukaido/` | 四街道教室 | `/classrooms/yotsukaido/` | |
| `/school/goi/` | 五井教室 | `/classrooms/goi/` | |
| `/school/myoden/` | 妙典教室 | `/classrooms/myoden/` | |
| `/company/` | 会社情報 | `/company/` | 同じ |
| `/privacy-policy/` | プライバシーポリシー | `/company/#privacy` | 転送先に `#` は付けられるが、サーバーによっては付かない。付かなくても `/company/` で可 |
| `/soudan/` | 無料相談 | `/consult/` | |
| `/seikyu/` | 資料請求 | `/request/` | |
| `/sitemap/` | サイトマップ | `/` | 新HPにHTMLのサイトマップはない（XMLは `/sitemap-index.xml`） |
| `/2026sum-campaign/` | 夏期体験キャンペーン | `/` | **要確認**: 期間限定ページ。転送せず404（新HPの404ページから案内）でもよい |

## WordPress 特有のURL（転送しない・404でよい）

`/feed/`・`/comments/feed/`・`/sitemap.xml`・`/sitemap.rss`・`/page-sitemap.xml`・`/wp-json/...`・`/xmlrpc.php`・`/wp-admin/`・`/wp-content/uploads/...`（画像）。
旧サイトマップ（`/sitemap.xml`）だけは、Search Console に登録済みなら新しい `/sitemap-index.xml` を登録し直す。

## 転送を書くときのメモ（ロリポップ＝Apache の場合）

- `.htaccess` に `Redirect 301 /teaching/ /method/` のように1行ずつ。`/school/` は個別の教室の行より後に書くか、`RedirectMatch 301 ^/school/$ /classrooms/` で完全一致にする（前方一致だと `/school/goi/` まで巻き込む）
- 404ページは `ErrorDocument 404 /404.html`（Astro が `dist/404.html` を出している）
