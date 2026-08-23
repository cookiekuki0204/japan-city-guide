/**
 * 콘텐츠 JSON은 이미지를 `images/ueno_1.jpg` 같은 문자열 경로로 들고 있다.
 * 빌드 시 최적화(리사이즈·WebP 변환)를 받으려면 그 문자열을 실제 모듈로 이어줘야 한다.
 *
 * 원본에는 파일이 없는 경로도 섞여 있어서, 없으면 null 을 돌려주고
 * 호출하는 쪽이 깨진 이미지 대신 아무것도 그리지 않도록 한다.
 */
import type { ImageMetadata } from 'astro';

/**
 * eager 로 불러오면 참조되지 않는 이미지까지 전부 번들에 들어가
 * 최적화되지 않은 원본이 그대로 배포된다. 실제로 쓰는 것만 불러온다.
 */
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}'
);

/** `images/foo.jpg` → `/src/assets/images/foo.jpg` */
function toModuleKey(contentPath: string): string {
  const clean = contentPath.replace(/^\.?\//, '');
  return `/src/assets/${clean}`;
}

export async function resolveImage(
  contentPath: string | undefined
): Promise<ImageMetadata | null> {
  if (!contentPath) return null;
  // 외부 URL은 최적화 대상이 아니다
  if (/^https?:\/\//i.test(contentPath)) return null;

  const load = modules[toModuleKey(contentPath)];
  if (!load) return null; // 원본 데이터에 파일이 없는 경로가 섞여 있다

  const mod = await load();
  return mod.default;
}

/** 최적화할 수 없는 외부 URL인지 */
export function isRemote(contentPath: string | undefined): boolean {
  return Boolean(contentPath && /^https?:\/\//i.test(contentPath));
}
