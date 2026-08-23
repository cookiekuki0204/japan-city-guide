/**
 * 광고 · 애널리틱스 설정.
 *
 * 기존 사이트는 광고 슬롯 ID가 22개 중 21개가 `XXXXXXXXXX` 플레이스홀더인 채로
 * 배포되어 있었다. 슬롯 ID가 유효하지 않으면 AdSense가 해당 단위를 아예 처리하지 않아
 * 광고가 한 번도 노출되지 않는다. 같은 일이 반복되지 않도록 슬롯을 여기 한 곳에 모으고,
 * 값이 비어 있으면 광고 단위를 렌더링하지 않는다(빈 자리만 남기고 조용히 실패하지 않게).
 */

/** AdSense 퍼블리셔 ID */
export const ADSENSE_CLIENT = 'ca-pub-6682864237624164';

/** Google Analytics 4 측정 ID */
export const GA_MEASUREMENT_ID = 'G-KZJWPBP1RY';

export const SITE_VERIFICATION = {
  google: '311s4klorBInl8fo1Dllf1GAdZAtMaM2Aemj4R_Ge-w',
  impact: 'da570fb4-fd59-4dab-8c71-9ec48a894bc2',
};

/**
 * 광고 위치별 슬롯 ID.
 *
 * AdSense 관리 화면에서 광고 단위를 만들면 나오는 숫자 ID를 넣는다.
 * 빈 문자열이면 그 위치에는 광고가 렌더링되지 않는다.
 */
export const AD_SLOTS: Record<string, string> = {
  /** 홈 도시 목록 위 — 기존 사이트에서 유일하게 실제 ID가 있던 단위 */
  home: '5823515468',

  // 아래는 AdSense에서 광고 단위를 새로 만든 뒤 ID를 채워야 한다.
  /** 도시 허브 페이지 하단 */
  city: '',
  /** 시즌 가이드 본문 중간 */
  seasonInline: '',
};

export function slotFor(name: keyof typeof AD_SLOTS | string): string | null {
  const slot = AD_SLOTS[name];
  return slot && slot.trim() ? slot : null;
}
