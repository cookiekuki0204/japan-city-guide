const fs = require('fs');

const cities = [
  { id: 'tokyo',      name: '도쿄',       nameJa: '東京',   emoji: '🏙️', region: 'tokyo',
    matsuriDesc: '간토의 중심 도쿄, 산노 마쓰리부터 아사쿠사 삼바 카니발까지',
    hanabiDesc:  '스미다강 2만발, 도쿄만 불꽃놀이 — 간토 최대 규모 불꽃 대회' },
  { id: 'osaka',      name: '오사카',     nameJa: '大阪',   emoji: '🏯', region: 'osaka',
    matsuriDesc: '텐진마쓰리의 열기, 일본 3대 마쓰리 중 하나',
    hanabiDesc:  '나니와 요도가와, PL화대예술불꽃 — 간사이 최대 규모' },
  { id: 'kyoto',      name: '교토',       nameJa: '京都',   emoji: '⛩️', region: 'kyoto',
    matsuriDesc: '기온마쓰리의 웅장함, 천년 고도가 들썩이는 여름 축제',
    hanabiDesc:  '야마시로 불꽃 — 유서 깊은 고도의 여름 불꽃놀이' },
  { id: 'fukuoka',    name: '후쿠오카',   nameJa: '福岡',   emoji: '🌊', region: 'kyushu',
    matsuriDesc: '하카타 야마카사의 역동성, 규슈 최대 여름 축제',
    hanabiDesc:  '오이타·나가사키 등 규슈의 화려한 여름 불꽃 대회' },
  { id: 'sapporo',    name: '삿포로',     nameJa: '札幌',   emoji: '❄️', region: 'hokkaido',
    matsuriDesc: '홋카이도 짧은 여름, 삿포로 맥주 가든과 요사코이 소란',
    hanabiDesc:  '홋카이도 불꽃 — 서늘한 밤하늘을 수놓는 여름의 절정' },
  { id: 'nakameguro', name: '나카메구로', nameJa: '中目黒', emoji: '🌿', region: 'tokyo',
    matsuriDesc: '도쿄 간토 지역 마쓰리 — 도심 속 여름 축제 가이드',
    hanabiDesc:  '간토 지역 불꽃놀이 — 스미다강 등 도쿄 불꽃 완벽 가이드' },
];

const TYPE_META = {
  matsuri: {
    emoji: '🎆', label: '마쓰리', labelEn: 'Matsuri Guide', color: '#0ea5e9',
    bgGrad: 'linear-gradient(180deg,#ecfeff 0%,#ffffff 50%,#f0fdf4 100%)',
    counter: 'hanabi', counterLabel: '하나비 가이드', counterEmoji: '🎇',
  },
  hanabi: {
    emoji: '🎇', label: '하나비', labelEn: 'Hanabi Guide', color: '#6366f1',
    bgGrad: 'linear-gradient(180deg,#eef2ff 0%,#ffffff 50%,#f5f3ff 100%)',
    counter: 'matsuri', counterLabel: '마쓰리 가이드', counterEmoji: '🎆',
  },
};

const REGION_META_JS = `{
            tokyo:    { color: 'sky',    image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&q=80' },
            osaka:    { color: 'rose',   image: 'https://images.unsplash.com/photo-1733693526658-a15f4c5ea7bb?w=800&q=80' },
            kyoto:    { color: 'violet', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80' },
            hokkaido: { color: 'indigo', image: 'https://images.unsplash.com/photo-1693975264425-e6d639ea27c9?w=800&q=80' },
            kyushu:   { color: 'orange', image: 'https://images.unsplash.com/photo-1679230708086-2b10acf31074?w=800&q=80' },
        }`;

function gen(city, type) {
  const t = TYPE_META[type];
  const desc = type === 'matsuri' ? city.matsuriDesc : city.hanabiDesc;

  return `<!DOCTYPE html>
<html lang="ko" class="light scroll-smooth">
<head>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6682864237624164" crossorigin="anonymous"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="google-site-verification" content="311s4klorBInl8fo1Dllf1GAdZAtMaM2Aemj4R_Ge-w">
    <meta name="description" content="2026 ${city.name} ${t.label} 가이드. ${desc}">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${t.emoji}</text></svg>">
    <title>${city.name} ${t.label} 2026 완벽 가이드 | Japan City Guide</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script>
        tailwind.config = { darkMode: 'class', theme: { extend: { fontFamily: { sans: ['Plus Jakarta Sans', 'sans-serif'] } } } }
    </script>
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; -webkit-font-smoothing: antialiased; }
        .app-gradient { background: ${t.bgGrad}; background-attachment: fixed; min-height: 100vh; }
        .dark .app-gradient { background: linear-gradient(180deg,#0f172a 0%,#020617 100%); }
        .glass-effect { background: rgba(255,255,255,0.25); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.35); }
        .dark .glass-effect { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); }
        #mainHeader.scrolled { background-color: rgba(248,250,252,0.9); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(0,0,0,0.06); padding-top:.75rem; padding-bottom:.75rem; }
        .dark #mainHeader.scrolled { background-color: rgba(15,23,42,0.9); }
        .guide-detail { border: 1.5px solid #f1f5f9; border-top: none; border-radius: 0 0 2.5rem 2.5rem; background: #f8fafc; padding: 24px 28px 28px; }
        .dark .guide-detail { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.06); }
        .guide-spot { padding-left: 12px; border-left: 2px solid #e2e8f0; margin-bottom: 12px; }
        .dark .guide-spot { border-left-color: rgba(255,255,255,0.1); }
        .guide-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
        @media (max-width: 640px) { .guide-grid { grid-template-columns: 1fr; } }
        .guide-grid-cell { background: #fff; border-radius: 1rem; padding: 14px 16px; }
        .dark .guide-grid-cell { background: rgba(255,255,255,0.05); }
        .guide-footer { display: flex; flex-wrap: wrap; gap: 16px; padding-top: 16px; border-top: 1.5px solid #f1f5f9; align-items: center; }
        .dark .guide-footer { border-top-color: rgba(255,255,255,0.08); }
    </style>
</head>
<body class="app-gradient text-slate-950 dark:text-white transition-colors duration-500">

    <header id="mainHeader" class="fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-500">
        <nav class="mx-auto max-w-6xl py-4 flex justify-between items-center">
            <a href="/" class="flex items-center gap-2 no-underline shrink-0">
                <span class="text-xl font-black tracking-tighter text-rose-400 uppercase">Japan City <span class="text-rose-500">Guide</span></span>
            </a>
            <div class="hidden md:flex items-center gap-2 text-[11px] font-black text-slate-400">
                <a href="/" class="hover:text-rose-500 transition-colors no-underline">Home</a>
                <span>›</span>
                <a href="${city.id}" class="hover:text-rose-500 transition-colors no-underline">${city.name}</a>
                <span>›</span>
                <span style="color:${t.color}">${t.emoji} ${t.label}</span>
            </div>
            <div class="flex items-center gap-2">
                <div class="flex md:hidden items-center gap-1.5">
                    <a href="${city.id}" class="w-9 h-9 flex items-center justify-center rounded-full bg-white/30 dark:bg-white/5 border border-white/40 text-base no-underline" title="${city.name}">${city.emoji}</a>
                </div>
                <button id="themeToggle" class="size-11 rounded-full border border-slate-200 dark:border-white/10 bg-white/30 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 flex items-center justify-center transition-all duration-300 shadow-sm active:scale-90">
                    <i id="themeIcon" class="fa-solid fa-moon text-indigo-600 dark:text-yellow-300 text-lg"></i>
                </button>
            </div>
        </nav>
    </header>

    <!-- Hero -->
    <main class="relative z-10 pt-48 pb-16 px-6 text-center max-w-3xl mx-auto">
        <div class="text-6xl mb-5">${city.emoji}</div>
        <div class="inline-flex items-center gap-2 glass-effect px-5 py-2 rounded-full mb-6 shadow-sm">
            <span class="text-2xl">${t.emoji}</span>
            <span class="text-[10px] font-black tracking-[0.3em] uppercase" style="color:${t.color}">${t.labelEn} · ${city.nameJa}</span>
        </div>
        <h1 class="text-4xl md:text-6xl font-[900] tracking-tight mb-4 text-slate-900 dark:text-white">
            ${city.name} <span style="color:${t.color}">${t.label}</span>
            <span class="block text-xl md:text-2xl font-black mt-2 text-slate-400 dark:text-slate-500">2026 완벽 가이드</span>
        </h1>
        <p class="text-base text-slate-500 dark:text-slate-400 font-bold leading-relaxed max-w-xl mx-auto mt-5">${desc}</p>
    </main>

    <!-- Cards -->
    <section class="relative z-10 px-6 pb-20 max-w-4xl mx-auto">
        <div id="cards" class="space-y-10"></div>
    </section>

    <!-- Counterpart CTA -->
    <section class="relative z-10 px-6 pb-32 max-w-4xl mx-auto">
        <a href="${t.counter}_${city.id}" class="flex items-center justify-between p-7 rounded-[2.5rem] bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-xl hover:scale-[1.01] transition-all group no-underline">
            <div class="flex items-center gap-5">
                <div class="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-3xl">${t.counterEmoji}</div>
                <div>
                    <p class="font-black text-xl leading-tight">${city.name} ${t.counterLabel}</p>
                    <p class="text-xs opacity-70 font-bold mt-1">${city.nameJa}의 ${t.counterEmoji} 가이드도 확인해보세요</p>
                </div>
            </div>
            <i class="fa-solid fa-arrow-right group-hover:translate-x-2 transition-transform text-2xl px-4 text-white/60"></i>
        </a>
    </section>

    <footer class="relative z-10 py-16 px-6 text-center border-t border-slate-200 dark:border-white/10">
        <p class="text-[10px] font-medium tracking-widest text-slate-400/60 dark:text-slate-500/50 mb-6 uppercase">&copy; 2026 Japan City Guide. All rights reserved.</p>
        <div class="flex gap-4 justify-center text-sm text-gray-400">
            <a href="/" class="hover:text-rose-500 transition-colors no-underline">Home</a>
            <a href="${city.id}" class="hover:text-rose-500 transition-colors no-underline">${city.name}</a>
            <a href="/privacy.html" class="hover:text-gray-600 no-underline">Privacy</a>
        </div>
    </footer>

    <script src="components.js"></script>
    <script>
        var PAGE_TYPE   = '${type}';
        var CITY_REGION = '${city.region}';
        var REGION_META = ${REGION_META_JS};
        var COLOR_HEX   = { sky: '#0ea5e9', rose: '#e11d48', violet: '#7c3aed', indigo: '#6366f1', orange: '#ea580c' };

        function renderGuideDetail(outerEl, guide, themeColor) {
            if (!guide) return;
            var el = document.createElement('div');
            el.className = 'guide-detail';
            var html = '';

            if (guide.summary) {
                html += '<p style="font-size:.82rem;font-weight:700;line-height:1.75;color:#64748b;margin-bottom:20px;">' + guide.summary + '</p>';
            }

            if (guide.bestSpots && guide.bestSpots.length) {
                html += '<div style="margin-bottom:20px;">';
                html += '<p style="font-size:10px;font-weight:900;letter-spacing:.15em;text-transform:uppercase;color:#94a3b8;margin-bottom:12px;">📍 추천 관람 포인트</p>';
                guide.bestSpots.forEach(function(spot) {
                    html += '<div class="guide-spot">';
                    html += '<p style="font-size:.82rem;font-weight:800;color:#1e293b;margin-bottom:3px;">' + spot.name + '</p>';
                    html += '<p style="font-size:.78rem;font-weight:600;line-height:1.7;color:#64748b;">' + spot.desc + '</p>';
                    html += '</div>';
                });
                html += '</div>';
            }

            if (guide.tips && guide.tips.length) {
                html += '<div style="margin-bottom:20px;">';
                html += '<p style="font-size:10px;font-weight:900;letter-spacing:.15em;text-transform:uppercase;color:#94a3b8;margin-bottom:12px;">💡 알아두면 좋은 팁</p>';
                html += '<ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;">';
                guide.tips.forEach(function(tip) {
                    html += '<li style="display:flex;gap:8px;font-size:.78rem;font-weight:600;line-height:1.7;color:#64748b;">';
                    html += '<span style="color:' + themeColor + ';flex-shrink:0;margin-top:2px;">▸</span>';
                    html += '<span>' + tip + '</span>';
                    html += '</li>';
                });
                html += '</ul></div>';
            }

            var gridItems = '';
            if (guide.crowd) {
                gridItems += '<div class="guide-grid-cell">';
                gridItems += '<p style="font-size:10px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:#94a3b8;margin-bottom:8px;">👥 혼잡도</p>';
                gridItems += '<p style="font-size:.78rem;font-weight:600;line-height:1.7;color:#64748b;">' + guide.crowd + '</p>';
                gridItems += '</div>';
            }
            if (guide.whatToWear) {
                gridItems += '<div class="guide-grid-cell">';
                gridItems += '<p style="font-size:10px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:#94a3b8;margin-bottom:8px;">👗 복장 추천</p>';
                gridItems += '<p style="font-size:.78rem;font-weight:600;line-height:1.7;color:#64748b;">' + guide.whatToWear + '</p>';
                gridItems += '</div>';
            }
            if (gridItems) {
                html += '<div class="guide-grid">' + gridItems + '</div>';
            }

            if (guide.food && guide.food.length) {
                html += '<div style="margin-bottom:20px;">';
                html += '<p style="font-size:10px;font-weight:900;letter-spacing:.15em;text-transform:uppercase;color:#94a3b8;margin-bottom:12px;">🍜 주변 먹거리</p>';
                guide.food.forEach(function(f) {
                    html += '<div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:10px;">';
                    html += '<span style="font-size:1.1rem;flex-shrink:0;margin-top:1px;">🥢</span>';
                    html += '<div>';
                    html += '<p style="font-size:.82rem;font-weight:800;color:#1e293b;margin-bottom:2px;">' + f.name + '</p>';
                    html += '<p style="font-size:.78rem;font-weight:600;line-height:1.7;color:#64748b;">' + f.desc + '</p>';
                    html += '</div></div>';
                });
                html += '</div>';
            }

            var footerItems = [];
            if (guide.budget) {
                footerItems.push('<span style="font-size:.78rem;font-weight:700;color:#94a3b8;">💰 ' + guide.budget + '</span>');
            }
            if (guide.officialUrl) {
                footerItems.push('<a href="' + guide.officialUrl + '" target="_blank" rel="noopener noreferrer" style="font-size:.78rem;font-weight:900;color:' + themeColor + ';text-decoration:none;">공식 사이트 →</a>');
            }
            if (footerItems.length) {
                html += '<div class="guide-footer">' + footerItems.join('') + '</div>';
            }

            el.innerHTML = html;
            outerEl.appendChild(el);
        }

        async function initCards() {
            var container = document.getElementById('cards');
            try {
                var responses = await Promise.all([
                    fetch('src/data/matsuriData.json'),
                    fetch('src/data/matsuri_guide_detail.json')
                ]);
                var json       = await responses[0].json();
                var detailJson = await responses[1].json();
                var guides     = detailJson.guides || {};
                var region     = json.regions.find(function(r) { return r.id === CITY_REGION; });
                if (!region) return;
                var meta       = REGION_META[CITY_REGION];
                var themeColor = COLOR_HEX[meta.color] || '#0ea5e9';
                var items      = region[PAGE_TYPE];
                items.forEach(function(item, idx) {
                    var subtitle;
                    if (PAGE_TYPE === 'matsuri') {
                        subtitle = item.unescoHeritage ? '유네스코 무형문화유산' : (item.scale || '');
                    } else {
                        var shells = (item.scale && item.scale.shells) ? item.scale.shells : 0;
                        var freq   = item.scale && item.scale.frequency;
                        subtitle   = freq
                            ? (shells.toLocaleString() + '발 · ' + freq)
                            : ('약 ' + shells.toLocaleString() + '발');
                    }
                    var outerWrapper = document.createElement('div');
                    container.appendChild(outerWrapper);

                    var cardWrapper = document.createElement('div');
                    outerWrapper.appendChild(cardWrapper);
                    renderMatsuriCard(cardWrapper, {
                        region: region.id, regionLabel: region.name, regionEmoji: region.emoji,
                        color: meta.color,
                        rank: String(idx + 1).padStart(2, '0'),
                        subtitle: subtitle,
                        name: item.name, nameJP: item.nameJa,
                        date: item.date.label,
                        highlight: item.highlights[0] || '',
                        desc: item.highlights.join(' '),
                        tags: item.tags, city: item.venue.name,
                        image: meta.image, link: '',
                    });

                    renderGuideDetail(outerWrapper, guides[item.id], themeColor);
                });
            } catch(e) {
                console.error('데이터 로드 실패:', e);
            }
        }

        document.addEventListener('DOMContentLoaded', initCards);

        var themeToggle = document.getElementById('themeToggle');
        var themeIcon   = document.getElementById('themeIcon');
        var html        = document.documentElement;
        var header      = document.getElementById('mainHeader');

        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.scrollY > 20);
        });
        function applyTheme(theme) {
            if (theme === 'dark') { html.classList.add('dark'); themeIcon.className = 'fa-solid fa-sun text-yellow-300 text-lg'; }
            else { html.classList.remove('dark'); themeIcon.className = 'fa-solid fa-moon text-indigo-600 text-lg'; }
        }
        themeToggle.onclick = function() {
            var t = html.classList.contains('dark') ? 'light' : 'dark';
            applyTheme(t); localStorage.setItem('theme', t);
        };
        applyTheme(localStorage.getItem('theme') || 'light');
    </script>
</body>
</html>`;
}

['matsuri', 'hanabi'].forEach(function(type) {
  cities.forEach(function(city) {
    var filename = __dirname + '/' + type + '_' + city.id + '.html';
    fs.writeFileSync(filename, gen(city, type));
    console.log('생성됨:', type + '_' + city.id + '.html');
  });
});
