// 相性診断の設問・配点・結果タイプ（正: docs/design/相性診断.dc.html のロジッククラス）
// scores: [A, B, C, D, E]  A=通信/映像 B=難関集団 C=一般集団 D=1対少数個別 E=1対多数個別(FOCUS)

export interface Choice { label: string; s: [number, number, number, number, number] }
export interface Question { q: string; choices: Choice[] }

export const questions: Question[] = [
  {
    q: 'お子さまは、家で勉強していますか？',
    choices: [
      { label: 'ほとんどしない', s: [0, 0, 0, 1, 2] },
      { label: 'テスト前だけ、あわてて', s: [0, 0, 1, 0, 2] },
      { label: '毎日すこしはしている', s: [0, 1, 2, 0, 1] },
    ],
  },
  {
    q: '学校の授業は、どのくらい分かっていそうですか？',
    choices: [
      { label: '分からないところが多い', s: [0, 0, 0, 2, 2] },
      { label: '分かる時と分からない時が半々', s: [0, 0, 1, 1, 2] },
      { label: 'だいたい分かっている', s: [1, 2, 2, 0, 1] },
    ],
  },
  {
    q: '「勉強のやり方」については、どうですか？',
    choices: [
      { label: 'やり方が分かっていない', s: [0, 0, 0, 1, 2] },
      { label: '教わればできるが、ひとりだと止まる', s: [0, 0, 1, 1, 2] },
      { label: '自分で計画して進められる', s: [2, 2, 1, 0, 0] },
    ],
  },
  {
    q: 'どんな教わり方が合いそうですか？',
    choices: [
      { label: '分からない所を、その場で質問したい', s: [0, 0, 0, 2, 2] },
      { label: '自分のペースで進めて、見守ってほしい', s: [1, 0, 0, 0, 2] },
      { label: 'みんなと一緒に、競い合いたい', s: [0, 2, 2, 0, 0] },
    ],
  },
  {
    q: '塾に通うとしたら、なにを大事にしたいですか？',
    choices: [
      { label: '無理なく続けられる費用', s: [1, 0, 1, 0, 2] },
      { label: '費用よりも、とにかく手厚さ', s: [0, 0, 0, 2, 1] },
      { label: '決まった時間に通うのがむずかしい', s: [2, 0, 0, 0, 1] },
    ],
  },
];

export interface DiagnosisType {
  name: string;
  mark: string;
  fit: boolean; // true = FOCUSのタイプ（E）
  points: string[];
  note?: string; // 非FOCUSタイプに添える前向きな一言
}

export const types: Record<string, DiagnosisType> = {
  A: {
    name: '通信教育 / 映像授業', mark: '○', fit: false,
    points: ['「多忙で決まった時間に通塾が難しい」お子さま向け', '自分のペースで、好きな時間に学習できる'],
    note: '通いやすさが心配な場合も、フォーカスは千葉市を中心に全10教室。お近くの教室をぜひ一度のぞいてみてください。',
  },
  B: {
    name: '難関校向け集団指導塾', mark: '○', fit: false,
    points: ['「学習意欲が高く、主体的に勉強ができる」お子さま向け', 'ハイレベルな授業で、応用力や思考力を養える'],
    note: '基礎に不安が出てきたときは、基礎さかのぼり専門のフォーカスにもご相談ください。',
  },
  C: {
    name: '一般集団指導塾', mark: '○', fit: false,
    points: ['「基本的な学習習慣が身についている」お子さま向け', '学習内容を先取りして学ぶことができる'],
    note: '集団のペースが合わないと感じたら、一人ひとりに合わせるフォーカスの無料相談へどうぞ。',
  },
  D: {
    name: '1対少数の個別指導塾', mark: '◎', fit: false,
    points: ['「手取り足取り指導を受けたい」お子さま向け', '分からない部分をすぐに質問できる', 'オーダーメイドで学習を進められるが、授業料も高い'],
    note: 'フォーカス（最大1対4の個別指導）なら、質問しやすさはそのままに、月6,578円（税込）で続けられます。',
  },
  E: {
    name: '1対多数の個別指導塾', mark: '◎', fit: true,
    points: ['「自分のペースで学習を進めたい」お子さま向け', '必要なときにサポートが受けられるので、主体的に学ぶ習慣がつく', '授業料が比較的リーズナブルで、無理なく継続できる'],
  },
};

/** 合計点から結果タイプを判定（同点は E > D > C > A > B 優先） */
export function resultType(answers: number[]): string {
  const total = [0, 0, 0, 0, 0];
  answers.forEach((a, i) => {
    questions[i].choices[a].s.forEach((v, k) => { total[k] += v; });
  });
  const order = [4, 3, 2, 0, 1];
  let best = order[0];
  order.forEach((k) => { if (total[k] > total[best]) best = k; });
  return 'ABCDE'[best];
}
