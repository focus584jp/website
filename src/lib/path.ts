// 内部リンクを base（/website）対応にするヘルパー。
// 例: u('/request') → '/website/request'（本番） / '/request'（base未設定時）
const base = import.meta.env.BASE_URL; // 末尾スラッシュ付き（例: '/website/'）

export function u(path: string): string {
  if (!path.startsWith('/')) return path; // 外部URL・アンカー単体などはそのまま
  const joined = base.replace(/\/$/, '') + path;
  return joined === '' ? '/' : joined;
}
