// llms.txt: AI（ChatGPT・Claude・Perplexity など）が読む、サイトの要約（Markdown）。https://llmstxt.org/
// 値はすべて src/data から作る（料金・教室・よくあるご質問の文は公開ページの表示と同じ）。
import type { APIRoute } from 'astro';
import { classrooms } from '../data/classrooms';
import { faqs } from '../data/faqs';
import { phone } from '../data/home';
import { price, yen } from '../data/price';
import { pageNames, siteName, siteTagline } from '../data/site';
import { absUrl } from '../lib/path';

export const GET: APIRoute = () => {
  const pages = ['method', 'price', 'classrooms', 'faq', 'request', 'consult', 'company'];
  const lines = [
    `# ${siteName}`,
    '',
    `> ${siteTagline}`,
    '',
    '- 対象: 原則として中学生（中1〜中3）。勉強が苦手な子・基礎からやり直したい子。小学6年生も新中1の準備として入塾できる',
    '- 指導: 個別指導（講師1人に生徒は最大4人）。つまずいた所までさかのぼって基礎から積み上げる',
    `- 料金: 1教科 月${yen(price.tuition)}円（税込・月${price.lessons}回）。入会金0円。教材費・システム利用料 月${yen(price.fee)}円`,
    `- 問い合わせ: ${phone.display}（受付 16:00〜22:00・日曜定休）。資料は ${absUrl('/request')} から携帯番号を入れるとスマホに届く`,
    '',
    '## ページ',
    '',
    `- [トップ](${absUrl('/')}): 塾の特徴・料金・保護者の声・体験までの流れ`,
    ...pages.map((p) => `- [${pageNames[p]}](${absUrl('/' + p)})`),
    '',
    '## 教室',
    '',
    ...classrooms.map((c) => `- [${c.name}](${absUrl(`/classrooms/${c.slug}`)}): ${c.address.replace(/^〒\S+\s*/, '').replace(/　/g, ' ')}。${c.nearestStation} 徒歩${c.walkMinutes}分。電話 ${c.tel}${c.schools.length ? `。主な通塾中学校: ${c.schools.join('・')}` : ''}`),
    '',
    '## よくあるご質問',
    '',
    ...faqs.filter((f) => !f.draft).flatMap((f) => [`### ${f.q}`, '', f.a, '']),
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
