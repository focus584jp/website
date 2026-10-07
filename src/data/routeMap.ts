/** 教室のある駅の路線図（模式図。駅の位置は実際の地図とは違う）。HPトップの教室一覧とデジタルパンフレットで共用。
 *  パンフレット（focus/pamphlet/build.py）はこの書き方のまま正規表現で読むので、1件1行の形を崩さないこと。
 *  座標は viewBox の中。label は駅名の置き場所（t＝上・b＝下・r＝右・l＝左・sl＝左下）。駅は classrooms.ts の slug と対応 */
export const routeMapViewBox = '7 -8 342 206';
export const routeMapRails = [
  { d: 'M96 118H176', kind: 'sub' },
  { d: 'M176 118H238Q258 118 268 132', kind: 'main' },
  { d: 'M12 64H78', kind: 'sub thin' },
  { d: 'M78 64L35 89M78 64H268L320 18M268 64V184M268 132L316 158', kind: 'main' },
];
export const routeMapLineNames = [
  { name: '東西線', x: 68, y: 92, anchor: 'start' },
  { name: '京葉線', x: 128, y: 111, anchor: 'middle' },
  { name: '総武線', x: 246, y: 78, anchor: 'middle' },
  { name: '内房線', x: 262, y: 166, anchor: 'end' },
  { name: '外房線', x: 304, y: 138, anchor: 'middle' },
];
export const routeMapHubs = [
  { name: '西船橋', x: 78, y: 64, r: 4 },
  { name: '千葉', x: 268, y: 64, r: 5 },
];
export const routeMapStations = [
  { slug: 'myoden', x: 35, y: 89, label: 'b' },
  { slug: 'shin-kemigawa', x: 128, y: 64, label: 't' },
  { slug: 'inage', x: 176, y: 64, label: 'b' },
  { slug: 'nishi-chiba', x: 224, y: 64, label: 't' },
  { slug: 'tsuga', x: 296, y: 40, label: 'r' },
  { slug: 'yotsukaido', x: 320, y: 18, label: 't' },
  { slug: 'inage-kaigan', x: 176, y: 118, label: 'b' },
  { slug: 'soga', x: 268, y: 132, label: 'sl' },
  { slug: 'kamatori', x: 316, y: 158, label: 'b' },
  { slug: 'goi', x: 268, y: 184, label: 'l' },
];

/** 駅名の文字の位置（label の種類ごと） */
export function routeMapLabel(x: number, y: number, label: string): { x: number; y: number; anchor: 'start' | 'middle' | 'end' } {
  switch (label) {
    case 't': return { x, y: y - 11, anchor: 'middle' };
    case 'r': return { x: x + 11, y: y + 4, anchor: 'start' };
    case 'l': return { x: x - 11, y: y + 4, anchor: 'end' };
    case 'sl': return { x: x - 10, y: y + 17, anchor: 'end' };
    default: return { x, y: y + 20, anchor: 'middle' };
  }
}
