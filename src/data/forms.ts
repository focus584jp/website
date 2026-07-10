// フォーム2種（資料請求 /request・無料相談 /consult）の文言・バリデーション定義。
// 表示・判定は components/site/LeadForm.astro が行う。

export const grades = ['小5', '小6', '中1', '中2', '中3', 'その他'];

/**
 * リード受付API（focus/lead-api の GAS Web App /exec URL）。
 * 空文字の間は送信ボタンが disabled＋「※準備中」表記になる（デプロイ後にURLを設定して有効化）。
 */
export const LEAD_API_URL = 'https://script.google.com/macros/s/AKfycbxRYOlfsfb0Aj12rzJj8TpjkrDryPN347mHV4vIYyuNMYJRlpGWD6-87699KluKaYDb/exec';

export type LeadFormVariant = 'request' | 'consult';

export interface LeadFormCopy {
  /** 教室セレクトのラベル（お近くの教室 / ご希望の教室） */
  classroomLabel: string;
  phoneLabel: string;
  phonePlaceholder: string;
  /** 電話番号の判定パターン。正規化後（半角数字のみ）に対して判定する */
  phonePattern: string;
  phoneError: string;
  /** 確認画面の送信ボタン（最終CTA） */
  submitLabel: string;
  /** 入力画面のボタン下の補足（不要なら省略） */
  note?: string;
  doneTitle: string;
  doneBody: string;
  theme: 'orange' | 'navy';
}

export const leadForms: Record<LeadFormVariant, LeadFormCopy> = {
  request: {
    classroomLabel: 'お近くの教室',
    phoneLabel: '携帯電話番号',
    phonePlaceholder: '例：090-0000-0000',
    phonePattern: '^0[789]0\\d{8}$', // SMS送付先のため携帯のみ（070/080/090の11桁）
    phoneError: '090などで始まる携帯電話番号（11桁）を入力してください',
    submitLabel: '資料を受け取る',
    doneTitle: '送信しました',
    // SMS自動送信は未実装（資料完成・プロバイダ選定後に対応）。当面は教室からの折り返し案内
    doneBody: 'お申し込みを受け付けました。ご入力いただいた携帯電話番号あてに、担当教室より資料のご案内をお送りします。',
    theme: 'orange',
  },
  consult: {
    classroomLabel: 'ご希望の教室',
    phoneLabel: '電話番号',
    phonePlaceholder: '例：090-0000-0000',
    phonePattern: '^0\\d{9,10}$', // 固定電話も可（市外局番からの10〜11桁）
    phoneError: '電話番号（市外局番からの10〜11桁）を入力してください',
    submitLabel: 'この内容で無料相談を申し込む',
    note: '送信後、ご希望の教室からご連絡し、日時を確定します。',
    doneTitle: 'お申し込みを受け付けました',
    doneBody: 'ご希望の教室から折り返しご連絡し、日時を確定します。今しばらくお待ちください。',
    theme: 'navy',
  },
};
