// フォーム2種（LeadForm=資料請求/無料相談・CorporateForm=企業問い合わせ）の共通処理（ブラウザ側で使う）。
// 送信先は lead-api（focus/lead-api の GAS Web App。URLと本番ホストは data/forms.ts）。
import { LEAD_API_URL, PRODUCTION_HOSTS } from '../data/forms';

/** 全角数字→半角 */
export const toHalf = (s: string) => s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));

/** 全角を直してから数字だけ取り出す（判定・送信は正規化後の値で行う） */
export const digitsOf = (s: string) => toHalf(s).replace(/\D/g, '');

/** 携帯番号（070/080/090）か */
export const isMobile = (digits: string) => /^0[789]0/.test(digits);

/** 携帯番号の入力中ハイフン（3-4-4。途中までの桁にも対応） */
export const hyphenateMobile = (d: string) =>
  d.length <= 3 ? d : d.length <= 7 ? `${d.slice(0, 3)}-${d.slice(3)}` : `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;

/**
 * 電話番号欄に「入力中の自動ハイフン」を付ける。format には数字だけ（最大11桁）が渡る。
 * ハイフン直後でバックスペースしたときは、手前の数字ごと消す（ハイフンが再挿入されて消せなくなるのを防ぐ）
 */
export function attachPhoneFormat(input: HTMLInputElement, format: (digits: string) => string) {
  input.addEventListener('input', () => {
    input.value = format(digitsOf(input.value).slice(0, 11));
  });
  input.addEventListener('keydown', (e) => {
    const p = input.selectionStart ?? 0;
    if (e.key === 'Backspace' && p > 1 && input.selectionEnd === p && input.value[p - 1] === '-') {
      e.preventDefault();
      input.value = input.value.slice(0, p - 2) + input.value.slice(p);
      input.dispatchEvent(new Event('input')); // 再整形
    }
  });
}

/** 入力エラーの表示切替（枠の色・エラー文・aria-invalid）。欄は data-field="<name>" の要素 */
export function setFieldError(form: HTMLElement, name: string, on: boolean) {
  const wrap = form.querySelector<HTMLElement>(`[data-field="${name}"]`);
  wrap?.classList.toggle('is-error', on);
  const err = wrap?.querySelector<HTMLElement>('.f-err');
  if (err) err.hidden = !on;
  const input = wrap?.querySelector<HTMLElement>('input, select, textarea');
  if (on) input?.setAttribute('aria-invalid', 'true');
  else input?.removeAttribute('aria-invalid');
}

/** 送信データの env（本番ホストからの送信だけ production。それ以外は staging＝lead-api 側でテスト扱い） */
export const leadEnv = () => (PRODUCTION_HOSTS.includes(location.hostname) ? 'production' : 'staging');

export const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** 送信のタイムアウト（これを過ぎたら失敗扱い＝フォームの既存の失敗表示に） */
const TIMEOUT_MS = 15000;

/**
 * lead-api へ送信し、受け付けられたら true。通信失敗・タイムアウト・API側の拒否はすべて false。
 * text/plain は CORS プリフライト回避の定石（GAS Web App は OPTIONS に応答しないため）
 */
export async function postLead(payload: Record<string, string>): Promise<boolean> {
  try {
    const res = await fetch(LEAD_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      signal: typeof AbortSignal.timeout === 'function' ? AbortSignal.timeout(TIMEOUT_MS) : undefined,
    });
    return res.ok && (await res.json()).ok === true;
  } catch {
    return false;
  }
}
