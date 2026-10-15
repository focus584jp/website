# 2026 冬期チラシ用 QR（教室ごと）

飛び先は旧サイトの資料請求ページの URL `/seikyu/` に、教室（`classroom`）とチラシの目印（`from`）を付けたもの。
- 旧サイト（WordPress）のうちは `/seikyu/` の資料請求フォームが開く（引数は無視される）。
- 新 HP に切り替えた後は `/seikyu/` → `/request/` の 301 転送で資料ダウンロードのフォームが開き、`classroom` でその教室が選ばれた状態になる（転送は引数を引き継ぐこと。Apache の `Redirect` は引き継ぐ）。
- つまり切り替えの前後どちらでも壊れない。GitHub Pages の URL は入れない。

| 教室 | URL | PNG | SVG |
|---|---|---|---|
| 西千葉教室 | `https://focus584.net/seikyu/?classroom=nishichiba&from=flyer-2026win-nishichiba` | qr-nishichiba.png | qr-nishichiba.svg |
| 稲毛教室 | `https://focus584.net/seikyu/?classroom=inage&from=flyer-2026win-inage` | qr-inage.png | qr-inage.svg |
| 新検見川教室 | `https://focus584.net/seikyu/?classroom=shinkemigawa&from=flyer-2026win-shinkemigawa` | qr-shinkemigawa.png | qr-shinkemigawa.svg |
| 稲毛海岸教室 | `https://focus584.net/seikyu/?classroom=inagekaigan&from=flyer-2026win-inagekaigan` | qr-inagekaigan.png | qr-inagekaigan.svg |
| 都賀教室 | `https://focus584.net/seikyu/?classroom=tsuga&from=flyer-2026win-tsuga` | qr-tsuga.png | qr-tsuga.svg |
| 蘇我教室 | `https://focus584.net/seikyu/?classroom=soga&from=flyer-2026win-soga` | qr-soga.png | qr-soga.svg |
| 鎌取教室 | `https://focus584.net/seikyu/?classroom=kamatori&from=flyer-2026win-kamatori` | qr-kamatori.png | qr-kamatori.svg |
| 四街道教室 | `https://focus584.net/seikyu/?classroom=yotsukaido&from=flyer-2026win-yotsukaido` | qr-yotsukaido.png | qr-yotsukaido.svg |
| 五井教室 | `https://focus584.net/seikyu/?classroom=goi&from=flyer-2026win-goi` | qr-goi.png | qr-goi.svg |
| 妙典教室 | `https://focus584.net/seikyu/?classroom=myoden&from=flyer-2026win-myoden` | qr-myoden.png | qr-myoden.svg |

印刷前の確認: スマホで読み、旧サイトなら資料請求ページ、新 HP なら資料ダウンロードのフォームで「教室」がその教室になっているか見る。
