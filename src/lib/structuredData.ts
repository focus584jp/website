// 構造化データ（JSON-LD）の組み立て。値はすべて src/data から作り、公開ページの表示と一致させる。
// URL・@id は absUrl()（astro.config の site と base）から作るので、本番ドメインへ移ってもそのまま追従する。
// ※営業曜日は教室ごとに違うため openingHoursSpecification は入れない（受付時間の文言しかデータにない）
import type { Classroom } from '../data/classrooms';
import type { Faq } from '../data/faqs';
import { organization, siteName, siteTagline } from '../data/site';
import { phone } from '../data/home';
import { absUrl } from './path';

type Node = Record<string, unknown>;

export const orgId = () => `${absUrl('/')}#organization`;
const websiteId = () => `${absUrl('/')}#website`;

/** 「〒263-0022 千葉県千葉市稲毛区弥生町2-21　〇〇ビル3階」→ PostalAddress に分解する */
export function postalAddress(address: string): Node {
  const m = address.match(/^〒(\d{3}-\d{4})\s*(東京都|北海道|(?:京都|大阪)府|.{2,3}県)(.+?[市町村](?:[^\d\s　]{1,4}区)?)(.+)$/);
  if (!m) throw new Error(`住所を分解できません: ${address}`);
  const [, postalCode, addressRegion, addressLocality, streetAddress] = m;
  return {
    '@type': 'PostalAddress',
    postalCode,
    addressRegion,
    addressLocality,
    streetAddress: streetAddress.trim(),
    addressCountry: 'JP',
  };
}

/** 全ページ共通: 運営団体（学習塾フォーカス）とサイト */
export function siteNodes(logoUrl: string): Node[] {
  return [
    {
      '@type': 'EducationalOrganization',
      '@id': orgId(),
      name: siteName,
      legalName: organization.legalName,
      alternateName: organization.alternateName,
      description: siteTagline,
      url: absUrl('/'),
      logo: { '@type': 'ImageObject', url: logoUrl },
      telephone: phone.display,
      address: postalAddress(organization.address),
    },
    {
      '@type': 'WebSite',
      '@id': websiteId(),
      name: siteName,
      url: absUrl('/'),
      inLanguage: 'ja',
      publisher: { '@id': orgId() },
    },
  ];
}

/** 教室ページ: 教室（EducationalOrganization＋LocalBusiness）。image は教室写真があるときだけ */
export function classroomNode(c: Classroom, imageUrl?: string): Node {
  const url = absUrl(`/classrooms/${c.slug}/`);
  return {
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    '@id': `${url}#classroom`,
    name: `${siteName} ${c.name}`,
    url,
    telephone: c.tel,
    address: postalAddress(c.address),
    geo: { '@type': 'GeoCoordinates', latitude: c.lat, longitude: c.lng },
    ...(imageUrl ? { image: imageUrl } : {}),
    parentOrganization: { '@id': orgId() },
  };
}

/** FAQPage: 回答はHTMLと同じ文（FaqList が表示する f.a）。仮の回答は載せない */
export function faqPageNode(faqs: Faq[], pagePath: string): Node {
  return {
    '@type': 'FAQPage',
    '@id': `${absUrl(pagePath)}#faq`,
    mainEntity: faqs.filter((f) => !f.draft).map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** パンくず: トップ →（中間）→ 現在のページ。crumbs はトップを除いたもの */
export function breadcrumbNode(crumbs: { name: string; path: string }[]): Node {
  const items = [{ name: siteName, path: '/' }, ...crumbs];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absUrl(c.path),
    })),
  };
}

/** <script type="application/ld+json"> に入れる文字列（</script> で閉じられないよう < をエスケープ） */
export function toJsonLd(nodes: Node[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(/</g, '\\u003c');
}
