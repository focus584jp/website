export interface Classroom {
  slug: string;
  name: string;       // 「○○教室」（社内呼称に統一。「○○校」とは呼ばない）
  region: string;     // 市レベルのグルーピング用（千葉市/市川市/市原市/四街道市）。教室増加時の一覧整理に使う
  area: string;       // 区などの詳細エリア
  nearestStation: string;
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
  { slug: 'inage',        name: '稲毛教室',     region: '千葉市', area: '千葉市稲毛区',   nearestStation: 'JR稲毛駅',     ...dummy },
  { slug: 'nishi-chiba',  name: '西千葉教室',   region: '千葉市', area: '千葉市中央区',   nearestStation: 'JR西千葉駅',   ...dummy },
  { slug: 'tsuga',        name: '都賀教室',     region: '千葉市', area: '千葉市若葉区',   nearestStation: 'JR都賀駅',     ...dummy },
  { slug: 'shin-kemigawa',name: '新検見川教室', region: '千葉市', area: '千葉市花見川区', nearestStation: 'JR新検見川駅', ...dummy },
  { slug: 'inage-kaigan', name: '稲毛海岸教室', region: '千葉市', area: '千葉市美浜区',   nearestStation: 'JR稲毛海岸駅', ...dummy },
  { slug: 'soga',         name: '蘇我教室',     region: '千葉市', area: '千葉市中央区',   nearestStation: 'JR蘇我駅',     ...dummy },
  { slug: 'kamatori',     name: '鎌取教室',     region: '千葉市', area: '千葉市緑区',     nearestStation: 'JR鎌取駅',     ...dummy },
  { slug: 'myoden',       name: '妙典教室',     region: '市川市', area: '市川市',         nearestStation: '東京メトロ妙典駅', ...dummy },
  { slug: 'goi',          name: '五井教室',     region: '市原市', area: '市原市',         nearestStation: 'JR五井駅',     ...dummy },
  { slug: 'yotsukaido',   name: '四街道教室',   region: '四街道市', area: '四街道市',     nearestStation: 'JR四街道駅',   ...dummy },
];
