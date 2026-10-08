// 5教科の名前と色（design-system/tokens.css の --subject-*。site.css に同期済み）。
// 料金シミュレータ・トップの料金・時間割の教科ピルで共用する。
export const subjectNames = ['国語', '数学', '英語', '理科', '社会'] as const;
export type Subject = (typeof subjectNames)[number];

/** 教科 → 面の色（濃色ベタ。白文字を載せる）・文字色 */
export const subjectColor: Record<Subject, { bg: string; text: string }> = {
  国語: { bg: 'var(--subject-ja-bg)', text: 'var(--subject-ja-text)' },
  数学: { bg: 'var(--subject-math-bg)', text: 'var(--subject-math-text)' },
  英語: { bg: 'var(--subject-en-bg)', text: 'var(--subject-en-text)' },
  理科: { bg: 'var(--subject-sci-bg)', text: 'var(--subject-sci-text)' },
  社会: { bg: 'var(--subject-soc-bg)', text: 'var(--subject-soc-text)' },
};
