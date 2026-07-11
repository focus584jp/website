#!/bin/bash
# 全ページのフルページスクリーンショットを撮る（視覚回帰の撮影側）
#
# 使い方:
#   npm run build                          # 先にdistを作る
#   bash scripts/screenshot-pages.sh <出力ディレクトリ>
#
# - ページ一覧は dist/**/index.html から自動導出（ページが増えても修正不要）
# - SP=500px / PC=1280px の2幅で撮影（500px未満はヘッドレスChromeが無視するため500が下限）
# - 比較は scripts/compare-shots.py で行う
set -euo pipefail
cd "$(dirname "$0")/.."

OUT="${1:?出力ディレクトリを指定してください（例: /tmp/shots-before）}"
PORT="${PORT:-4399}"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
BASE="http://localhost:${PORT}/website"

[ -f dist/index.html ] || { echo "dist がありません。先に npm run build を実行してください" >&2; exit 1; }
mkdir -p "$OUT"

# astro preview をバックグラウンド起動（終了時に必ず殺す）
npx astro preview --port "$PORT" >/dev/null 2>&1 &
SERVER_PID=$!
trap 'kill $SERVER_PID 2>/dev/null || true' EXIT
for i in $(seq 1 30); do
  curl -sf -o /dev/null "$BASE/" && break
  sleep 0.5
  [ "$i" = 30 ] && { echo "previewサーバーが起動しませんでした" >&2; exit 1; }
done

# dist/**/index.html → ルート一覧（トップは "." 、下層は "method" / "classrooms/goi" など）
routes=$(cd dist && find . -name index.html | sed 's|^\./||; s|/index\.html$||; s|^index\.html$|.|' | sort)

count=0
for r in $routes; do
  if [ "$r" = "." ]; then name="index"; url="$BASE/"; else name=$(echo "$r" | tr '/' '_'); url="$BASE/$r/"; fi
  for w in 500 1280; do
    "$CHROME" --headless=new --screenshot="$OUT/${name}-${w}.png" \
      --window-size=${w},15000 --hide-scrollbars --virtual-time-budget=8000 \
      --force-device-scale-factor=1 "$url" 2>/dev/null
    count=$((count + 1))
  done
done
echo "${count}枚を ${OUT} に保存しました"
