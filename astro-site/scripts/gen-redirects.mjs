/**
 * 개편 전 URL → 새 URL 리디렉트 페이지를 public/ 에 생성한다.
 *
 * GitHub Pages는 서버 리디렉트(301)를 지원하지 않아 경유 페이지를 두는 수밖에 없다.
 * 대신 GitHub Pages는 `foo.html` 파일 하나로 `/foo.html` 과 `/foo` 를 모두 응답하므로
 * `.html` 파일만 만들면 확장자 없는 옛 주소까지 함께 처리된다.
 *
 * 주의: 새 사이트가 이미 같은 경로를 제공하는 주소(`/tokyo`, `/sakura`, `/about` 등)에는
 * 파일을 만들지 않는다. `tokyo.html` 을 두면 `/tokyo` 요청이 새 도시 허브 대신
 * 이 경유 페이지로 갈 수 있기 때문이다.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(new URL('../', import.meta.url)));
const PUBLIC = path.join(ROOT, 'astro-site', 'public');
const SITE = 'https://japan-city-guide.com';

const CITIES = ['tokyo', 'osaka', 'kyoto', 'fukuoka', 'sapporo', 'nagoya'];
const NAKAMEGURO = '/neighborhoods/nakameguro';

/** 사라진 주소만 등록한다 — 살아 있는 경로에는 절대 파일을 만들지 않는다 */
const redirects = {};

for (const city of CITIES) {
  redirects[`sakura_${city}`] = `/${city}/sakura`;
  redirects[`matsuri_${city}`] = `/${city}/matsuri`;
  // 하나비는 여름 마쓰리 가이드로 흡수됐다
  redirects[`hanabi_${city}`] = `/${city}/matsuri`;
}

// 하나비 허브 자체가 없어졌다
redirects['hanabi'] = '/matsuri';

// 나카메구로는 도시가 아니라 동네 딥다이브가 됐다 — 관련 4개 주소를 한 곳으로 모은다
redirects['nakameguro'] = NAKAMEGURO;
redirects['sakura_nakameguro'] = NAKAMEGURO;
redirects['matsuri_nakameguro'] = NAKAMEGURO;
redirects['hanabi_nakameguro'] = NAKAMEGURO;

redirects['kagurazaka'] = '/neighborhoods/kagurazaka';

// 어디에서도 링크되지 않던 도쿄 여름 페이지
redirects['summer-matsuri'] = '/tokyo/matsuri';

function page(target) {
  const url = `${SITE}${target}`;
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>페이지가 이동했습니다</title>
<link rel="canonical" href="${url}">
<meta http-equiv="refresh" content="0; url=${target}">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>location.replace(${JSON.stringify(target)});</script>
<style>
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;
display:flex;min-height:100vh;margin:0;align-items:center;justify-content:center;
background:#f8fafc;color:#0f172a;text-align:center;padding:24px}
a{color:#e11d48;font-weight:700}
</style>
</head>
<body>
<div>
<p>이 페이지는 새 주소로 이동했습니다.</p>
<p><a href="${target}">자동으로 넘어가지 않으면 여기를 눌러주세요</a></p>
</div>
</body>
</html>
`;
}

fs.mkdirSync(PUBLIC, { recursive: true });

let written = 0;
for (const [from, target] of Object.entries(redirects)) {
  fs.writeFileSync(path.join(PUBLIC, `${from}.html`), page(target), 'utf8');
  written++;
}

console.log(`리디렉트 페이지 ${written}개 생성 → public/`);
