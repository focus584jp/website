export interface Classroom {
  slug: string;
  name: string;       // 「○○教室」（社内呼称に統一。「○○校」とは呼ばない）
  region: string;     // 市レベルのグルーピング用（千葉市/市川市/市原市/四街道市）。教室増加時の一覧整理に使う
  area: string;       // 区などの詳細エリア
  nearestStation: string;
  walkMinutes: number; // 最寄り駅からの徒歩分数（2026-07-07 全教室実値反映）
  lat: number;         // 「現在地から最寄りの教室」用の座標 ※駅座標の仮値。公開前に教室所在地でジオコーディングして差し替え
  lng: number;
  address: string;    // 〒＋住所（2026-07-08 現行サイトより実データ反映。ビル名の前は全角スペース）
  tel: string;        // 教室直通番号（050）。共通フリーダイヤルは 0120-267-140
  schools: string[];  // 対応中学校（未掲載の教室は空。掲載時にセクションが自動表示される）
  hours: string;      // 受付時間
}

const HOURS = '16:00〜22:00（日曜定休）';

// 並び順（2026-07-09）: 千葉市は西千葉を中心に近い順、千葉市以外は 四街道→五井→妙典
export const classrooms: Classroom[] = [
  {
    slug: 'nishi-chiba', name: '西千葉教室', region: '千葉市', area: '千葉市稲毛区',
    nearestStation: 'JR西千葉駅', walkMinutes: 1, lat: 35.6218, lng: 140.1015,
    address: '〒263-0022 千葉県千葉市稲毛区弥生町2-21　ポップスクエア西千葉ビル3階',
    tel: '050-5358-4457', schools: ['轟町中', '緑町中', '都賀中', '新宿中', '千葉大学教育学部附属中'], hours: HOURS,
  },
  {
    slug: 'inage', name: '稲毛教室', region: '千葉市', area: '千葉市稲毛区',
    nearestStation: 'JR稲毛駅', walkMinutes: 3, lat: 35.6363, lng: 140.0868,
    address: '〒263-0043 千葉県千葉市稲毛区小仲台6-2-16　統葉第二ビル3階',
    tel: '050-5370-0360', schools: ['稲毛中', '小中台中', '緑が丘中', '朝日ヶ丘中', '千草台中', '草野中', '千葉大学教育学部附属中'], hours: HOURS,
  },
  {
    slug: 'shin-kemigawa', name: '新検見川教室', region: '千葉市', area: '千葉市花見川区',
    nearestStation: 'JR新検見川駅', walkMinutes: 1, lat: 35.6624, lng: 140.0641,
    address: '〒262-0022 千葉県千葉市花見川区南花園2-2-24　篠田ビル2階',
    tel: '050-5526-1648', schools: ['花園中', '幕張中', '朝日ヶ丘中', '真砂中'], hours: HOURS,
  },
  {
    slug: 'inage-kaigan', name: '稲毛海岸教室', region: '千葉市', area: '千葉市美浜区',
    nearestStation: 'JR稲毛海岸駅', walkMinutes: 2, lat: 35.6331, lng: 140.0645,
    address: '〒261-0004 千葉県千葉市美浜区高洲3-14-4　第二水野谷ビル2階',
    tel: '050-5526-9164', schools: ['高洲中', '磯辺中', '高浜中', '稲浜中', '幸町第一中', '真砂中'], hours: HOURS,
  },
  {
    slug: 'tsuga', name: '都賀教室', region: '千葉市', area: '千葉市若葉区',
    nearestStation: 'JR都賀駅', walkMinutes: 1, lat: 35.6322, lng: 140.1428,
    address: '〒264-0026 千葉県千葉市若葉区西都賀3-1-7　海浜不動産第3ビル2階',
    tel: '050-5490-8247', schools: ['若松中', 'みつわ台中', '貝塚中', '山王中', '千城台南中', '千城台西中', '加曽利中', '椿森中', '旭中'], hours: HOURS,
  },
  {
    slug: 'soga', name: '蘇我教室', region: '千葉市', area: '千葉市中央区',
    nearestStation: 'JR蘇我駅', walkMinutes: 1, lat: 35.5817, lng: 140.1313,
    address: '〒260-0842 千葉県千葉市中央区南町2-15-3　第三山一ビル4階',
    tel: '050-5526-9165', schools: ['蘇我中', '星久喜中', '松ヶ丘中', '末広中', '生浜中', '葛城中'], hours: HOURS,
  },
  {
    slug: 'kamatori', name: '鎌取教室', region: '千葉市', area: '千葉市緑区',
    nearestStation: 'JR鎌取駅', walkMinutes: 3, lat: 35.5543, lng: 140.1962,
    address: '〒266-0031 千葉県千葉市緑区おゆみ野3-6-2　YSビル3階',
    tel: '050-5530-2760', schools: ['有吉中', '泉谷中', 'おゆみ野南中', '生浜中', '誉田中', '白井中', '川戸中', 'ちはら台南中'], hours: HOURS,
  },
  {
    slug: 'yotsukaido', name: '四街道教室', region: '四街道市', area: '四街道市',
    nearestStation: 'JR四街道駅', walkMinutes: 3, lat: 35.6700, lng: 140.1682,
    address: '〒284-0044 千葉県四街道市和良比256-102　ラインビル21 3階',
    tel: '050-5530-0960', schools: ['四街道中', '四街道北中', '四街道西中', '旭中', '山王中', '若松中', '千代田中'], hours: HOURS,
  },
  {
    slug: 'goi', name: '五井教室', region: '市原市', area: '市原市',
    nearestStation: 'JR五井駅', walkMinutes: 1, lat: 35.5115, lng: 140.0850,
    address: '〒290-0081 千葉県市原市五井中央西2-2-5　サンパークビル5階',
    tel: '050-5526-9166', schools: ['五井中', '千種中', '若葉中', '国分寺台中', '国分寺台西中', '八幡中', '東海中'], hours: HOURS,
  },
  {
    slug: 'myoden', name: '妙典教室', region: '市川市', area: '市川市',
    nearestStation: '東京メトロ妙典駅', walkMinutes: 6, lat: 35.6789, lng: 139.9273,
    address: '〒272-0114 千葉県市川市塩焼2-2-65　櫻井ビル3階',
    tel: '050-5370-0359', schools: ['妙典中', '第七中', '福栄中', '塩浜学園中'], hours: HOURS,
  },
];

/** 「稲毛駅」のような表示用の駅名（事業者プレフィックスを除いたもの） */
export function stationLabel(c: Classroom): string {
  return c.nearestStation.replace(/^(JR|東京メトロ|京成|小湊鉄道)\s*/, '');
}
