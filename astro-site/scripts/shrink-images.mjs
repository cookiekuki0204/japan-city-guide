/**
 * 소스 이미지를 웹에 맞는 크기로 줄인다.
 *
 * 원본에는 4000px 이상, 5MB짜리 사진이 섞여 있었다. 카드와 썸네일에 쓰는 용도라
 * 그대로 두면 Astro가 원본 해상도 변형까지 만들어 출력이 오히려 커진다.
 *
 * 원본은 git 히스토리에 그대로 남아 있으므로 되돌릴 수 있다.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const DIR = new URL('../src/assets/images/', import.meta.url).pathname;
const MAX_WIDTH = 1600;
const JPEG_QUALITY = 82;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    return e.isDirectory() ? walk(full) : [full];
  });
}

const files = walk(DIR).filter((f) => /\.(jpe?g|png)$/i.test(f));

let before = 0;
let after = 0;
let resized = 0;
let skipped = 0;

for (const file of files) {
  const originalSize = fs.statSync(file).size;
  before += originalSize;

  const image = sharp(file);
  const meta = await image.metadata();

  // 이미 충분히 작으면 건드리지 않는다
  if ((meta.width ?? 0) <= MAX_WIDTH && originalSize < 400 * 1024) {
    after += originalSize;
    skipped++;
    continue;
  }

  const isPng = /\.png$/i.test(file);
  const pipeline = sharp(file).rotate().resize({
    width: MAX_WIDTH,
    withoutEnlargement: true,
  });

  // PNG는 사진인 경우가 많아 JPEG로 바꾸면 훨씬 작아지지만,
  // 콘텐츠 JSON이 파일명을 참조하므로 확장자는 유지한다.
  const buffer = await (isPng
    ? pipeline.png({ compressionLevel: 9, palette: true }).toBuffer()
    : pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer());

  // 줄어들지 않았다면 원본을 유지한다
  if (buffer.length >= originalSize) {
    after += originalSize;
    skipped++;
    continue;
  }

  fs.writeFileSync(file, buffer);
  after += buffer.length;
  resized++;
}

const mb = (n) => (n / 1024 / 1024).toFixed(1);
console.log(`이미지 ${files.length}개 검사 — 축소 ${resized}개, 유지 ${skipped}개`);
console.log(`${mb(before)} MB → ${mb(after)} MB (${(100 - (after / before) * 100).toFixed(0)}% 감소)`);
