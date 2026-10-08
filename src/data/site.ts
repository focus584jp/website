// サイト全体の名前・説明文・ページ名（構造化データ・パンくず・フッターで共用）
import { classrooms } from './classrooms';
import { companyInfo } from './company';

/** 表記ルール: テキストでは「学習塾フォーカス」（FOCUSはロゴのみ） */
export const siteName = '学習塾フォーカス';

/** 検索・AIに引用されやすい一文（フッター・構造化データの description で共用） */
export const siteTagline = `千葉市を中心に${classrooms.length}教室。勉強が苦手な中学生専門の個別指導塾です。`;

const companyValue = (label: string) => companyInfo.find((r) => r.label === label)?.value ?? '';

/** 運営会社（構造化データ EducationalOrganization 用）。正式名・所在地は会社概要（company.ts）が正 */
export const organization = {
  name: siteName,
  legalName: companyValue('会社名'),
  alternateName: ['個別指導塾フォーカス', 'フォーカス', 'FOCUS'], // 個別指導塾フォーカス＝旧サイト（focus584.net）の題名で検索に出ている名前
  address: companyValue('所在地'),
};

/** パンくず（BreadcrumbList）に出すページ名。URLの1段目 → 名前。教室ページは classrooms.ts の教室名を使う */
export const pageNames: Record<string, string> = {
  method: '指導方針',
  price: '料金',
  classrooms: '教室一覧',
  faq: 'よくあるご質問',
  diagnosis: '塾タイプ診断',
  request: '資料ダウンロード',
  consult: '無料相談のお申し込み',
  contact: 'お問い合わせ',
  company: '会社概要',
  pamphlet: 'デジタルパンフレット',
};
