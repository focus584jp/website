// 教室ページの時間割（全教室共通）。例の生徒A〜Dで「通う曜日・時間帯を選べる」ことを見せる。
// 見た目は components/classroom/Timetable.astro。

export interface TimetableRow {
  time: string;
  /** 講習期間中のみ開講の時間帯（グレー表示） */
  seasonal?: boolean;
  /** 月〜金の例の生徒キー（'' = 空き） */
  cells: string[];
}

export const timetableDays = ['月', '火', '水', '木', '金'];

export const timetableRows: TimetableRow[] = [
  { time: '14:00〜', seasonal: true, cells: ['', '', '', '', ''] },
  { time: '15:00〜', seasonal: true, cells: ['', '', '', '', ''] },
  { time: '16:00〜', cells: ['', '', '', '', ''] },
  { time: '17:00〜', cells: ['', 'B', 'B', 'B', 'B'] },
  { time: '18:00〜', cells: ['A', '', 'A', '', 'D'] },
  { time: '19:00〜', cells: ['A', 'D', 'A', '', 'D'] },
  { time: '20:00〜', cells: ['C', 'D', '', 'D', ''] },
  { time: '21:00〜', cells: ['C', '', 'D', 'C', 'C'] },
];

/** 例の生徒（色は Timetable.astro の .p-a〜.p-d と対応） */
export const timetablePersonas = [
  { key: 'A', label: '他の習い事と勉強を両立したい' },
  { key: 'B', label: '学習習慣をしっかり身に付けたい' },
  { key: 'C', label: '中学2年生で部活を第一に考えたい' },
  { key: 'D', label: '中学3年生で高校受験に向けて頑張りたい' },
];

export const timetableNotes = [
  '毎学期、予定調査表によるスケジュール確認を行いますので、通塾可能な時間帯に授業をお受けいただくことができます。',
  '14:00〜、15:00〜は講習期間中のみ開講となります。',
];
