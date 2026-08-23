/**
 * 일본 공휴일(国民の祝日) 계산.
 *
 * 날짜를 손으로 적지 않고 법에 정해진 규칙에서 계산한다.
 *  1. 고정일 축일
 *  2. 해피먼데이 — 특정 주의 월요일로 옮겨진 축일
 *  3. 춘분·추분 — 천문 계산으로 정해져 매년 다르므로 표로 관리
 *  4. 대체공휴일(振替休日) — 축일이 일요일이면 다음 평일이 쉬는 날
 *  5. 국민의 휴일(国民の休日) — 축일 사이에 낀 평일 하루도 쉬는 날
 */

export interface Holiday {
  /** YYYY-MM-DD */
  date: string;
  name: string;
  nameJa: string;
  /** 대체공휴일·국민의 휴일처럼 규칙으로 파생된 휴일 */
  derived?: 'substitute' | 'bridge';
}

const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'] as const;

export function weekdayOf(date: string): string {
  return WEEKDAY[new Date(`${date}T00:00:00`).getDay()];
}

const FIXED: Array<{ month: number; day: number; name: string; nameJa: string }> = [
  { month: 1, day: 1, name: '설날', nameJa: '元日' },
  { month: 2, day: 11, name: '건국기념의 날', nameJa: '建国記念の日' },
  { month: 2, day: 23, name: '천황탄생일', nameJa: '天皇誕生日' },
  { month: 4, day: 29, name: '쇼와의 날', nameJa: '昭和の日' },
  { month: 5, day: 3, name: '헌법기념일', nameJa: '憲法記念日' },
  { month: 5, day: 4, name: '녹색의 날', nameJa: 'みどりの日' },
  { month: 5, day: 5, name: '어린이날', nameJa: 'こどもの日' },
  { month: 8, day: 11, name: '산의 날', nameJa: '山の日' },
  { month: 11, day: 3, name: '문화의 날', nameJa: '文化の日' },
  { month: 11, day: 23, name: '근로감사의 날', nameJa: '勤労感謝の日' },
];

const HAPPY_MONDAY: Array<{ month: number; nth: number; name: string; nameJa: string }> = [
  { month: 1, nth: 2, name: '성인의 날', nameJa: '成人の日' },
  { month: 7, nth: 3, name: '바다의 날', nameJa: '海の日' },
  { month: 9, nth: 3, name: '경로의 날', nameJa: '敬老の日' },
  { month: 10, nth: 2, name: '스포츠의 날', nameJa: 'スポーツの日' },
];

/**
 * 춘분·추분은 천문 계산으로 정해지고 전년도 2월에 관보로 확정된다.
 * 계산으로 근사할 수는 있지만 공식 발표가 기준이므로 표로 둔다.
 */
const EQUINOX: Record<number, { vernal: number; autumnal: number }> = {
  2026: { vernal: 20, autumnal: 23 },
  2027: { vernal: 21, autumnal: 23 },
  2028: { vernal: 20, autumnal: 22 },
  2029: { vernal: 20, autumnal: 23 },
  2030: { vernal: 20, autumnal: 23 },
};

const iso = (y: number, m: number, d: number) =>
  `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

function nthMondayOf(year: number, month: number, nth: number): number {
  const first = new Date(year, month - 1, 1);
  const offset = (8 - first.getDay()) % 7; // 첫 월요일까지 며칠
  return 1 + offset + (nth - 1) * 7;
}

function addDays(date: string, days: number): string {
  const d = new Date(`${date}T00:00:00`);
  d.setDate(d.getDate() + days);
  return iso(d.getFullYear(), d.getMonth() + 1, d.getDate());
}

const isSunday = (date: string) => new Date(`${date}T00:00:00`).getDay() === 0;

/** 해당 연도의 공휴일 전체를 날짜순으로 */
export function holidaysOf(year: number): Holiday[] {
  const equinox = EQUINOX[year];

  const base: Holiday[] = [
    ...FIXED.map((h) => ({ date: iso(year, h.month, h.day), name: h.name, nameJa: h.nameJa })),
    ...HAPPY_MONDAY.map((h) => ({
      date: iso(year, h.month, nthMondayOf(year, h.month, h.nth)),
      name: h.name,
      nameJa: h.nameJa,
    })),
  ];

  if (equinox) {
    base.push({ date: iso(year, 3, equinox.vernal), name: '춘분의 날', nameJa: '春分の日' });
    base.push({ date: iso(year, 9, equinox.autumnal), name: '추분의 날', nameJa: '秋分の日' });
  }

  base.sort((a, b) => a.date.localeCompare(b.date));

  const all = [...base];
  const taken = new Set(all.map((h) => h.date));

  // 대체공휴일 — 일요일과 겹치면 다음 '축일이 아닌 날'로 밀린다
  for (const h of base) {
    if (!isSunday(h.date)) continue;
    let candidate = addDays(h.date, 1);
    while (taken.has(candidate)) candidate = addDays(candidate, 1);
    all.push({ date: candidate, name: `대체공휴일 (${h.name})`, nameJa: '振替休日', derived: 'substitute' });
    taken.add(candidate);
  }

  // 국민의 휴일 — 축일 사이에 낀 평일 하루
  for (const h of [...all]) {
    const gap = addDays(h.date, 1);
    const after = addDays(h.date, 2);
    if (taken.has(gap) || !taken.has(after)) continue;
    if (isSunday(gap)) continue;
    all.push({ date: gap, name: '국민의 휴일', nameJa: '国民の休日', derived: 'bridge' });
    taken.add(gap);
  }

  return all.sort((a, b) => a.date.localeCompare(b.date));
}

export interface TravelPeriod {
  name: string;
  range: string;
  summary: string;
  /** 여행자에게 미치는 영향 */
  impact: 'high' | 'medium';
  advice: string;
}

/**
 * 공휴일 하나하나보다 여행자에게 실제로 영향이 큰 건 연휴 구간이다.
 * 오봉은 법정 공휴일이 아니지만 이동량이 가장 많은 시기라 함께 다룬다.
 */
export const TRAVEL_PERIODS_2026: TravelPeriod[] = [
  {
    name: '연말연시',
    range: '2025.12.27 ~ 2026.1.4',
    summary: '설날(1/1)을 낀 최대 명절 연휴. 귀성 이동이 집중된다.',
    impact: 'high',
    advice:
      '신칸센과 국내선이 가장 붐비는 시기입니다. 개인 상점과 식당은 12/31~1/3에 문을 닫는 곳이 많으니 영업 여부를 미리 확인하세요. 반대로 신사·사찰은 하쓰모데로 붐빕니다.',
  },
  {
    name: '골든위크',
    range: '2026.4.29 ~ 5.6',
    summary: '쇼와의 날부터 시작해 5/2(토)~5/6(수)이 5일 연휴로 이어진다.',
    impact: 'high',
    advice:
      '2026년은 헌법기념일(5/3)이 일요일이라 5/6이 대체공휴일이 되어 연휴가 길어집니다. 항공·숙박 요금이 연중 최고 수준이니 두세 달 전 예약을 권합니다.',
  },
  {
    name: '오봉',
    range: '2026.8.13 ~ 8.16',
    summary: '법정 공휴일은 아니지만 대부분의 회사가 쉬는 최대 귀성 시즌.',
    impact: 'high',
    advice:
      '공휴일이 아니어서 달력에는 빨간 날이 없지만 실제로는 연중 가장 붐빕니다. 신칸센 지정석은 한 달 전 발매 직후 매진되는 구간이 많습니다.',
  },
  {
    name: '실버위크',
    range: '2026.9.19 ~ 9.23',
    summary: '경로의 날(9/21)과 추분(9/23) 사이에 낀 9/22가 국민의 휴일이 되어 5일 연휴.',
    impact: 'medium',
    advice:
      '이 연휴는 매년 생기지 않고 요일이 맞아떨어지는 해에만 나타납니다. 2026년이 그 해라 가을 초입 여행 수요가 몰립니다.',
  },
];
