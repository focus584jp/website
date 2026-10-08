// 内部リンクを base（/website）対応にするヘルパー。
// 例: u('/request') → '/website/request/'（本番） / '/request/'（base未設定時）
// ページへのリンクは末尾スラッシュ付きにそろえる（astro.config の trailingSlash: 'always' と同じ。
// スラッシュなしだとサーバーが毎回301で付け直す）。ファイル（拡張子あり）は付けない。
// #・? は手前のパス部分にだけ付ける（'/company#privacy' → '/website/company/#privacy'）。
const base = import.meta.env.BASE_URL; // 末尾スラッシュ付き（例: '/website/'）

export function u(path: string): string {
  if (!path.startsWith('/')) return path; // 外部URL・アンカー単体などはそのまま
  const cut = path.search(/[?#]/);
  const pathname = cut === -1 ? path : path.slice(0, cut);
  const rest = cut === -1 ? '' : path.slice(cut);
  const lastSegment = pathname.slice(pathname.lastIndexOf('/') + 1);
  const isFile = lastSegment.includes('.');
  const withSlash = isFile || pathname.endsWith('/') ? pathname : `${pathname}/`;
  return base.replace(/\/$/, '') + withSlash + rest;
}

/** サイト内パスを絶対URLにする（canonical・og:url・JSON-LD 用）。site と base は astro.config から */
export function absUrl(path: string): string {
  return new URL(u(path), import.meta.env.SITE).href;
}
