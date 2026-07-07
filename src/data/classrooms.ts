export interface Classroom {
  slug: string;
  name: string;       // 「○○教室」（社内呼称に統一。「○○校」とは呼ばない）
  region: string;     // 市レベルのグルーピング用（千葉市/市川市/市原市/四街道市）。教室増加時の一覧整理に使う
  area: string;       // 区などの詳細エリア
  nearestStation: string;
  walkMinutes: number; // 最寄り駅からの徒歩分数（2026-07-07 全教室実値反映）
  lat: number;         // 「現在地から最寄りの教室」用の座標 ※駅座標の仮値。公開前に教室所在地へ差し替え
  lng: number;
  address: string;
  tel: string;
  schools: string[];
  managerName: string;
  hours: string;
}

const dummy = {
  address: '（住所ダミー）',
  tel: '043-000-0000',
  schools: ['（対応中学ダミー1）', '（対応中学ダミー2）', '（対応中学ダミー3）'],
  managerName: '（教室責任者ダミー）',
  hours: '（開校時間ダミー）',
};

export const classrooms: Classroom[] = [
  { slug: 'inage',        name: '稲毛教室',     region: '千葉市', area: '千葉市稲毛区',   nearestStation: 'JR稲毛駅',     walkMinutes: 3, lat: 35.6363, lng: 140.0868, ...dummy },
  { slug: 'nishi-chiba',  name: '西千葉教室',   region: '千葉市', area: '千葉市中央区',   nearestStation: 'JR西千葉駅',   walkMinutes: 1, lat: 35.6218, lng: 140.1015, ...dummy },
  { slug: 'tsuga',        name: '都賀教室',     region: '千葉市', area: '千葉市若葉区',   nearestStation: 'JR都賀駅',     walkMinutes: 1, lat: 35.6322, lng: 140.1428, ...dummy },
  { slug: 'shin-kemigawa',name: '新検見川教室', region: '千葉市', area: '千葉市花見川区', nearestStation: 'JR新検見川駅', walkMinutes: 1, lat: 35.6624, lng: 140.0641, ...dummy },
  { slug: 'inage-kaigan', name: '稲毛海岸教室', region: '千葉市', area: '千葉市美浜区',   nearestStation: 'JR稲毛海岸駅', walkMinutes: 2, lat: 35.6331, lng: 140.0645, ...dummy },
  { slug: 'soga',         name: '蘇我教室',     region: '千葉市', area: '千葉市中央区',   nearestStation: 'JR蘇我駅',     walkMinutes: 1, lat: 35.5817, lng: 140.1313, ...dummy },
  { slug: 'kamatori',     name: '鎌取教室',     region: '千葉市', area: '千葉市緑区',     nearestStation: 'JR鎌取駅',     walkMinutes: 3, lat: 35.5543, lng: 140.1962, ...dummy },
  { slug: 'myoden',       name: '妙典教室',     region: '市川市', area: '市川市',         nearestStation: '東京メトロ妙典駅', walkMinutes: 6, lat: 35.6789, lng: 139.9273, ...dummy },
  { slug: 'goi',          name: '五井教室',     region: '市原市', area: '市原市',         nearestStation: 'JR五井駅',     walkMinutes: 1, lat: 35.5115, lng: 140.0850, ...dummy },
  { slug: 'yotsukaido',   name: '四街道教室',   region: '四街道市', area: '四街道市',     nearestStation: 'JR四街道駅',   walkMinutes: 3, lat: 35.6700, lng: 140.1682, ...dummy },
];

/** 「稲毛駅」のような表示用の駅名（事業者プレフィックスを除いたもの） */
export function stationLabel(c: Classroom): string {
  return c.nearestStation.replace(/^(JR|東京メトロ|京成|小湊鉄道)\s*/, '');
}
