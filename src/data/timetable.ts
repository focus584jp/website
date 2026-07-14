// 教室ページの時間割（全教室共通）。例の生徒A〜Dをタップで切り替え、その生徒の受講例（科目つき）を表示する。
// 同じコマに複数の生徒が重なってよい（1対4の個別指導なので現実もそう。表示は選択中の生徒のみ）。
// 見た目は components/classroom/Timetable.astro。

export const timetableDays = ['月', '火', '水', '木', '金'];

/** 行（時間帯）。seasonal = 講習期間中のみ開講（グレー表示） */
export const timetableTimes: { time: string; seasonal?: boolean }[] = [
  { time: '14:00〜', seasonal: true },
  { time: '15:00〜', seasonal: true },
  { time: '16:00〜' },
  { time: '17:00〜' },
  { time: '18:00〜' },
  { time: '19:00〜' },
  { time: '20:00〜' },
  { time: '21:00〜' },
];

export interface PersonaSlot { day: string; time: string; subject: string }
export interface TimetablePersona { key: string; label: string; slots: PersonaSlot[] }

/** 例の生徒（色は Timetable.astro の .p-a〜.p-d と対応） */
export const timetablePersonas: TimetablePersona[] = [
  {
    key: 'A',
    label: '初めての塾でまずはペースをつかみたい',
    slots: [
      { day: '月', time: '18:00〜', subject: '国語' },
      { day: '木', time: '18:00〜', subject: '数学' },
      { day: '木', time: '19:00〜', subject: '英語' },
    ],
  },
  {
    key: 'B',
    label: '習い事やクラブと勉強を両立したい',
    slots: [
      { day: '月', time: '17:00〜', subject: '数学' },
      { day: '月', time: '18:00〜', subject: '英語' },
      { day: '木', time: '17:00〜', subject: '数学' },
      { day: '木', time: '18:00〜', subject: '英語' },
    ],
  },
  {
    key: 'C',
    label: '部活帰りに塾で頑張りたい',
    slots: [
      { day: '月', time: '20:00〜', subject: '数学' },
      { day: '水', time: '20:00〜', subject: '英語' },
      { day: '金', time: '20:00〜', subject: '理科' },
      { day: '金', time: '21:00〜', subject: '社会' },
    ],
  },
  {
    key: 'D',
    label: '高校受験に向けてしっかり対策したい',
    slots: [
      { day: '月', time: '19:00〜', subject: '数学' },
      { day: '月', time: '20:00〜', subject: '英語' },
      { day: '水', time: '20:00〜', subject: '国語' },
      { day: '水', time: '21:00〜', subject: '理科' },
      { day: '木', time: '19:00〜', subject: '数学' },
      { day: '金', time: '20:00〜', subject: '社会' },
    ],
  },
];

export const timetableNotes = [
  '毎学期、予定調査表でご予定を確認し、授業日程の見直しを行います。',
  '14:00〜、15:00〜は講習期間中のみ開講となります。',
];
