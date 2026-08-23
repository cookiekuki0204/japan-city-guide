import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const cities = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/cities' }),
  schema: z.object({
    name: z.string(),
    nameJa: z.string(),
    order: z.number(),
    region: z.enum(['kanto', 'kansai', 'kyushu', 'hokkaido', 'chubu']),
    emoji: z.string(),
    color: z.string(),
    description: z.string(),
  }),
});

/** 스팟 근처의 볼거리 / 먹을거리 — 이름과 한 줄 설명은 공통, 평점·링크는 식당류만 갖는다 */
const placeSchema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string().optional(),
});

const eaterySchema = z.object({
  name: z.string(),
  description: z.string(),
  score: z.string().optional(),
  /** 리뷰 페이지(주로 타베로그)가 있는 경우 */
  link: z.url().optional(),
  /** 리뷰 링크가 없으면 구글맵에서 찾을 검색어 — 도시명은 렌더링 시 붙인다 */
  mapQuery: z.string().optional(),
});

const spotSchema = z.object({
  id: z.string(),
  /** best = 대표 명소, famous = 유명 명소, suburb = 근교 */
  tier: z.enum(['best', 'famous', 'suburb']),
  name: z.string(),
  area: z.string(),
  tagline: z.string().default(''),
  image: z.string().default(''),
  vibe: z.string().default(''),
  crowd: z.string().default(''),
  description: z.string().default(''),
  tips: z.array(z.string()).default([]),
  /** 벚꽃·단풍처럼 개화/절정 시기가 있는 시즌에만 존재 */
  bloom: z
    .object({
      start: z.string(),
      peak: z.string(),
      end: z.string(),
    })
    .optional(),
  station: z.string().optional(),
  attractions: z.array(placeSchema).default([]),
  cafes: z.array(eaterySchema).default([]),
  restaurants: z.array(eaterySchema).default([]),
});

/**
 * 마쓰리·하나비는 '명소'가 아니라 열리는 날짜가 있는 '행사'라
 * 스팟과 필드가 다르다. 억지로 합치지 않고 따로 둔다.
 */
const eventSchema = z.object({
  id: z.string(),
  category: z.enum(['matsuri', 'hanabi', 'snow', 'illumination', 'tradition']),
  name: z.string(),
  nameJa: z.string().optional(),
  /** 사람이 읽는 일정 — 예: "7월 25일 19:00~" */
  dateLabel: z.string(),
  /** 정렬용 */
  month: z.number(),
  note: z.string().optional(),
  venue: z.object({
    name: z.string(),
    nameJa: z.string().optional(),
    address: z.string().optional(),
    access: z.string().optional(),
  }),
  /** 규모 — 마쓰리는 "대규모", 하나비는 "20,000발 · 90분" 식으로 정리된 문자열 */
  scale: z.string().optional(),
  highlights: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  unescoHeritage: z.boolean().default(false),

  // ── 아래는 가이드 상세(matsuri_guide_detail.json)에서 온다 ──
  summary: z.string().optional(),
  tips: z.array(z.string()).default([]),
  crowd: z.string().optional(),
  bestSpots: z.array(placeSchema).default([]),
  food: z.array(placeSchema).default([]),
  whatToWear: z.string().optional(),
  budget: z.string().optional(),
  officialUrl: z.url().optional(),
});

const seasonGuides = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/season-guides' }),
  schema: z.object({
    cityId: z.string(),
    type: z.enum(['sakura', 'matsuri', 'koyo', 'winter']),
    title: z.string(),
    updated: z.string(),
    timeline: z
      .array(
        z.object({
          label: z.string(),
          date: z.string(),
        })
      )
      .optional(),
    /** 시기가 예측치일 때 근거를 밝힌다 — 예: "평년 기준, 그해 기온에 따라 차이" */
    timelineNote: z.string().optional(),
    /** 사쿠라·단풍처럼 '명소'를 다루는 시즌 */
    spots: z.array(spotSchema).default([]),
    /** 마쓰리·하나비처럼 '행사'를 다루는 시즌 */
    events: z.array(eventSchema).default([]),
  }),
});

/**
 * 동네 딥다이브는 시즌 가이드와 성격이 다르다.
 * '명소 목록'이 아니라 한 동네를 걸어서 훑는 코스와 사진이 중심이다.
 */
const neighborhoods = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/neighborhoods' }),
  schema: z.object({
    cityId: z.string(),
    title: z.string(),
    nameJa: z.string().optional(),
    nameEn: z.string().optional(),
    description: z.string(),
    /** 도입부 — 이 동네가 어떤 곳인지 두세 문단 */
    intro: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    /** 상단 요약 — 접근성, 분위기, 추천 시간대 같은 한눈 정보 */
    facts: z
      .array(z.object({ label: z.string(), value: z.string() }))
      .default([]),
    /** 걸어서 도는 순서 — 시간이 붙어 있어 그대로 따라갈 수 있다 */
    route: z
      .array(
        z.object({
          name: z.string(),
          description: z.string(),
          time: z.string().optional(),
          badge: z.string().optional(),
        })
      )
      .default([]),
    /** 계절별로 얼굴이 달라지는 동네를 위해 */
    seasons: z
      .array(z.object({ season: z.string(), note: z.string() }))
      .default([]),
    cafes: z.array(eaterySchema).default([]),
    restaurants: z.array(eaterySchema).default([]),
    /** 있는 그대로의 사진 — 정사각으로 잘라 격자에 넣는다 */
    gallery: z.array(z.string()).default([]),
    /**
     * 글자가 얹힌 카드뉴스 이미지.
     * 사진과 달리 잘라내면 글이 잘리므로 원래 비율 그대로 가로 스크롤로 보여준다.
     */
    cards: z.array(z.string()).default([]),
  }),
});

export const collections = { cities, seasonGuides, neighborhoods };
