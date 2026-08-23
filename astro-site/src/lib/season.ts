/**
 * 사이트가 다루는 시즌 콘텐츠 종류.
 * 하나비는 여름에 마쓰리와 함께 찾는 경우가 많아 'matsuri' 안에서 같이 다룬다.
 */
export type SeasonType = 'sakura' | 'matsuri' | 'koyo' | 'winter';

export interface SeasonMeta {
  type: SeasonType;
  label: string;
  emoji: string;
  accent: string;
  blurb: string;
}

/** 시즌 타입별 표시 정보 */
export const SEASON_META: Record<SeasonType, SeasonMeta> = {
  sakura: {
    type: 'sakura',
    label: '사쿠라',
    emoji: '🌸',
    accent: '#e11d48',
    blurb: '도시별 벚꽃 개화 시기와 명소를 비교해 보세요.',
  },
  matsuri: {
    type: 'matsuri',
    label: '여름 마쓰리',
    emoji: '🎆',
    accent: '#0ea5e9',
    blurb: '마쓰리의 열기와 하나비의 밤하늘까지, 일본의 여름 축제.',
  },
  koyo: {
    type: 'koyo',
    label: '단풍',
    emoji: '🍁',
    accent: '#f97316',
    blurb: '가을 단풍 절정 시기와 명소를 도시별로.',
  },
  winter: {
    type: 'winter',
    label: '겨울',
    emoji: '❄️',
    accent: '#3b82f6',
    blurb: '눈축제와 겨울 세일, 그리고 일본 공휴일 정보까지.',
  },
};

export const SEASON_TYPES = Object.keys(SEASON_META) as SeasonType[];

/**
 * 절정 시기 3단계의 이름은 시즌마다 다르다.
 * 단풍에 '개화'라고 쓰면 틀리므로 시즌별로 따로 둔다.
 */
export const PEAK_LABELS: Partial<Record<SeasonType, [string, string, string]>> = {
  sakura: ['개화', '만개', '엔딩'],
  koyo: ['물들기 시작', '절정', '낙엽'],
};

export interface SeasonPeriod {
  /** 이 기간에 대표로 보여줄 시즌 */
  type: SeasonType;
  /** 시작일 — [월, 일], 월은 1부터 */
  from: [number, number];
  /** 종료일 (해당일 포함) */
  to: [number, number];
}

/**
 * 연중 시즌 달력.
 * 경계가 서로 맞닿아 있어 어느 날짜든 정확히 하나의 기간에 속한다.
 */
export const SEASON_CALENDAR: SeasonPeriod[] = [
  { type: 'winter', from: [12, 8], to: [2, 29] },
  { type: 'sakura', from: [3, 1], to: [6, 14] },
  { type: 'matsuri', from: [6, 15], to: [9, 7] },
  { type: 'koyo', from: [9, 8], to: [12, 7] },
];

/** (월, 일)을 비교 가능한 정수로 — 3월 1일 → 301 */
function toKey(month: number, day: number): number {
  return month * 100 + day;
}

/**
 * 주어진 날짜가 속한 시즌을 돌려준다.
 * 겨울처럼 연말을 넘어가는 구간도 처리한다.
 */
export function getSeasonFor(date: Date): SeasonMeta {
  const key = toKey(date.getMonth() + 1, date.getDate());

  for (const period of SEASON_CALENDAR) {
    const start = toKey(...period.from);
    const end = toKey(...period.to);

    const matches =
      start <= end
        ? key >= start && key <= end
        : key >= start || key <= end; // 연말을 넘어가는 구간

    if (matches) return SEASON_META[period.type];
  }

  // 달력이 연중을 빠짐없이 덮으므로 여기 도달하지 않는다
  return SEASON_META.sakura;
}
