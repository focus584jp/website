#!/usr/bin/env python3
"""スクショ2セットのピクセル比較（視覚回帰の比較側）

使い方:
    python3 scripts/compare-shots.py <beforeディレクトリ> <afterディレクトリ> [--diff-dir DIR]

- screenshot-pages.sh で撮った同名PNGどうしを比較する
- 差分があったファイルは名前・範囲・差分ピクセル数を表示（--diff-dir指定で差分画像も保存）
- 既知の許容差分: Googleマップ埋め込み（教室ページ）のタイル読み込み、フォントの微細な
  アンチエイリアス。数ピクセル程度の差はまず撮影ノイズ。疑わしいときは同じビルドを
  2回撮って比較し、そこに出る差分＝ノイズとして切り分ける
"""
import argparse
import os
import sys

from PIL import Image, ImageChops


def main() -> int:
    p = argparse.ArgumentParser(description='スクショ2セットをピクセル比較する')
    p.add_argument('before')
    p.add_argument('after')
    p.add_argument('--diff-dir', help='差分画像の保存先（省略時は保存しない）')
    args = p.parse_args()

    if args.diff_dir:
        os.makedirs(args.diff_dir, exist_ok=True)

    names = sorted(n for n in os.listdir(args.before) if n.endswith('.png'))
    missing = [n for n in names if not os.path.exists(os.path.join(args.after, n))]
    for n in missing:
        print(f'afterに存在しない: {n}')

    ok = ng = 0
    for name in names:
        if name in missing:
            continue
        a = Image.open(os.path.join(args.before, name)).convert('RGB')
        b = Image.open(os.path.join(args.after, name)).convert('RGB')
        if a.size != b.size:
            print(f'NG(サイズ) {name}: {a.size} -> {b.size}')
            ng += 1
            continue
        diff = ImageChops.difference(a, b)
        bbox = diff.getbbox()
        if bbox is None:
            ok += 1
            continue
        changed = sum(diff.convert('L').histogram()[1:])
        print(f'NG {name}: 範囲={bbox} 差分px={changed}')
        if args.diff_dir:
            diff.save(os.path.join(args.diff_dir, name))
        ng += 1

    print(f'\n一致 {ok} / 不一致 {ng}' + (f' / 欠落 {len(missing)}' if missing else ''))
    return 1 if (ng or missing) else 0


if __name__ == '__main__':
    sys.exit(main())
