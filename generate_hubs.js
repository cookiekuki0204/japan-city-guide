const fs = require('fs');

const cities = [
  { id: 'tokyo',      name: '도쿄',       nameJa: '東京',   emoji: '🏙️', desc: '일본의 심장, 도심 속 꽃구경부터 성대한 마쓰리까지',       color: '#e11d48', matsuriRegion: '간토',    hanabiRegion: '간토'    },
  { id: 'osaka',      name: '오사카',     nameJa: '大阪',   emoji: '🏯', desc: '먹방과 축제가 넘치는 일본 최고의 엔터테인먼트 도시',     color: '#ea580c', matsuriRegion: '간사이',  hanabiRegion: '간사이'  },
  { id: 'kyoto',      name: '교토',       nameJa: '京都',   emoji: '⛩️', desc: '천년 고도에서 만나는 일본 전통의 정수',                   color: '#0ea5e9', matsuriRegion: '간사이',  hanabiRegion: '간사이'  },
  { id: 'fukuoka',    name: '후쿠오카',   nameJa: '福岡',   emoji: '🌊', desc: '규슈의 관문, 박력 넘치는 하카타 마쓰리의 본고장',         color: '#0d9488', matsuriRegion: '규슈',    hanabiRegion: '규슈'    },
  { id: 'sapporo',    name: '삿포로',     nameJa: '札幌',   emoji: '❄️', desc: '홋카이도의 중심, 4계절 내내 즐기는 축제의 도시',          color: '#4338ca', matsuriRegion: '홋카이도', hanabiRegion: '홋카이도' },
  { id: 'nakameguro', name: '나카메구로', nameJa: '中目黒', emoji: '🌿', desc: '도쿄에서 가장 낭만적인 동네, 메구로강 벚꽃 산책로',       color: '#e11d48', matsuriRegion: '간토',    hanabiRegion: '간토'    },
];

function generateHub(city) {
  return `<!DOCTYPE html>
<html lang="ko" class="light scroll-smooth">
<head>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6682864237624164" crossorigin="anonymous"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="google-site-verification" content="311s4klorBInl8fo1Dllf1GAdZAtMaM2Aemj4R_Ge-w">
    <meta name="description" content="${city.name} 여행 가이드. 벚꽃 명소부터 마쓰리, 하나비까지 ${city.name}의 모든 것.">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${city.emoji}</text></svg>">
    <title>${city.name} 여행 가이드 | Japan City Guide</title>
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
        .app-gradient { background: linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%); background-attachment: fixed; min-height: 100vh; }
        .dark .app-gradient { background: linear-gradient(180deg, #0f172a 0%, #020617 100%); }
        .glass-effect { background: rgba(255,255,255,0.25); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.35); }
        .dark .glass-effect { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); }
        .hub-card { transition: transform .3s ease, box-shadow .3s ease; }
        .hub-card:hover { transform: translateY(-8px); }
        #mainHeader.scrolled { background-color: rgba(248,250,252,0.9); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(0,0,0,0.06); padding-top: .75rem; padding-bottom: .75rem; }
        .dark #mainHeader.scrolled { background-color: rgba(15,23,42,0.9); border-bottom-color: rgba(255,255,255,0.06); }
    </style>
</head>
<body class="app-gradient text-slate-950 dark:text-white transition-colors duration-500">

    <header id="mainHeader" class="fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-500">
        <nav class="mx-auto max-w-6xl py-4 flex justify-between items-center">
            <a href="/" class="flex items-center gap-3 group cursor-pointer no-underline shrink-0">
                <span class="text-2xl font-black tracking-tighter text-rose-400 uppercase">Japan City <span class="text-rose-500">Guide</span></span>
                <div class="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 dark:bg-white/10 group-hover:rotate-12 transition-transform duration-500 shadow-sm border border-white/30">
                    <span class="text-xl">${city.emoji}</span>
                </div>
            </a>
            <div class="hidden md:flex items-center gap-1 bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-full px-2 py-1.5 border border-white/50 dark:border-white/10 shadow-sm">
                <a href="sakura" class="flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-wider text-rose-500 hover:bg-rose-500/10 transition-all no-underline">🌸 Sakura</a>
                <a href="matsuri" class="flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-wider text-sky-500 hover:bg-sky-500/10 transition-all no-underline">🎆 Matsuri</a>
                <a href="hanabi" class="flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-wider text-indigo-500 hover:bg-indigo-500/10 transition-all no-underline">🎇 Hanabi</a>
            </div>
            <div class="flex items-center gap-2">
                <div class="flex md:hidden items-center gap-1.5">
                    <a href="sakura" class="w-9 h-9 flex items-center justify-center rounded-full bg-white/30 dark:bg-white/5 border border-white/40 text-base no-underline" title="Sakura">🌸</a>
                    <a href="matsuri" class="w-9 h-9 flex items-center justify-center rounded-full bg-white/30 dark:bg-white/5 border border-white/40 text-base no-underline" title="Matsuri">🎆</a>
                    <a href="hanabi" class="w-9 h-9 flex items-center justify-center rounded-full bg-white/30 dark:bg-white/5 border border-white/40 text-base no-underline" title="Hanabi">🎇</a>
                </div>
                <button id="themeToggle" class="size-11 rounded-full border border-slate-200 dark:border-white/10 bg-white/30 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 flex items-center justify-center transition-all duration-300 shadow-sm active:scale-90">
                    <i id="themeIcon" class="fa-solid fa-moon text-indigo-600 dark:text-yellow-300 text-lg"></i>
                </button>
            </div>
        </nav>
    </header>

    <main class="relative z-10 pt-52 pb-16 px-6 text-center max-w-3xl mx-auto">
        <div class="text-7xl mb-6">${city.emoji}</div>
        <div class="inline-block glass-effect px-5 py-2 rounded-full mb-6 shadow-sm">
            <span class="text-[10px] font-black tracking-[0.3em] uppercase" style="color:${city.color}">${city.nameJa} · Japan City Guide</span>
        </div>
        <h1 class="text-5xl md:text-7xl font-[900] tracking-tight mb-4 text-slate-900 dark:text-white">
            ${city.name}
            <span class="block text-2xl md:text-3xl font-black mt-2 text-slate-400 dark:text-slate-500">${city.nameJa}</span>
        </h1>
        <p class="text-lg text-slate-500 dark:text-slate-400 font-bold leading-relaxed max-w-xl mx-auto mt-6">
            ${city.desc}
        </p>
    </main>

    <section class="relative z-10 px-6 pb-32 max-w-4xl mx-auto">
        <p class="text-center text-[10px] font-black tracking-[0.3em] uppercase text-slate-400 mb-10">EXPLORE ${city.nameJa}</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

            <a href="sakura_${city.id}" class="hub-card no-underline rounded-[2.5rem] p-8 bg-white dark:bg-white/5 border-2 border-rose-100 dark:border-white/10 shadow-lg hover:shadow-2xl hover:border-rose-300 dark:hover:border-rose-500/40 block text-center">
                <div class="text-5xl mb-5">🌸</div>
                <p class="text-[9px] font-black text-rose-400 uppercase tracking-widest mb-2">Sakura Guide</p>
                <h2 class="text-xl font-black text-slate-800 dark:text-white mb-3">벚꽃 가이드</h2>
                <p class="text-sm text-slate-400 font-bold leading-relaxed mb-6">개화 일정, 하나미 명소,<br/>벚꽃 시즌 완벽 정리</p>
                <span class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black text-white" style="background:#e11d48">
                    보러가기 <i class="fa-solid fa-arrow-right-long"></i>
                </span>
            </a>

            <a href="matsuri" class="hub-card no-underline rounded-[2.5rem] p-8 bg-white dark:bg-white/5 border-2 border-sky-100 dark:border-white/10 shadow-lg hover:shadow-2xl hover:border-sky-300 dark:hover:border-sky-500/40 block text-center">
                <div class="text-5xl mb-5">🎆</div>
                <p class="text-[9px] font-black text-sky-500 uppercase tracking-widest mb-2">Matsuri Guide</p>
                <h2 class="text-xl font-black text-slate-800 dark:text-white mb-3">마쓰리 가이드</h2>
                <p class="text-sm text-slate-400 font-bold leading-relaxed mb-6">${city.matsuriRegion} 지역 마쓰리<br/>일정 & 하이라이트</p>
                <span class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black text-white" style="background:#0ea5e9">
                    보러가기 <i class="fa-solid fa-arrow-right-long"></i>
                </span>
            </a>

            <a href="hanabi" class="hub-card no-underline rounded-[2.5rem] p-8 bg-white dark:bg-white/5 border-2 border-indigo-100 dark:border-white/10 shadow-lg hover:shadow-2xl hover:border-indigo-300 dark:hover:border-indigo-500/40 block text-center">
                <div class="text-5xl mb-5">🎇</div>
                <p class="text-[9px] font-black text-indigo-500 uppercase tracking-widest mb-2">Hanabi Guide</p>
                <h2 class="text-xl font-black text-slate-800 dark:text-white mb-3">하나비 가이드</h2>
                <p class="text-sm text-slate-400 font-bold leading-relaxed mb-6">${city.hanabiRegion} 지역 불꽃놀이<br/>대회 & 관람 포인트</p>
                <span class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black text-white" style="background:#6366f1">
                    보러가기 <i class="fa-solid fa-arrow-right-long"></i>
                </span>
            </a>

        </div>
    </section>

    <footer class="relative z-10 py-16 px-6 text-center border-t border-slate-200 dark:border-white/10">
        <p class="text-[10px] font-medium tracking-widest text-slate-400/60 dark:text-slate-500/50 mb-6 uppercase">
            &copy; 2026 Japan City Guide. All rights reserved.
        </p>
        <div class="flex gap-4 justify-center text-sm text-gray-400">
            <a href="/" class="hover:text-rose-500 transition-colors no-underline">Home</a>
            <a href="/about.html" class="hover:text-gray-600 no-underline">About</a>
            <a href="/contact.html" class="hover:text-gray-600 no-underline">Contact</a>
            <a href="/privacy.html" class="hover:text-gray-600 no-underline">Privacy</a>
        </div>
    </footer>

    <script>
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon   = document.getElementById('themeIcon');
        const html        = document.documentElement;
        const header      = document.getElementById('mainHeader');

        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 20);
        });

        function applyTheme(theme) {
            if (theme === 'dark') {
                html.classList.add('dark');
                themeIcon.className = 'fa-solid fa-sun text-yellow-300 text-lg';
            } else {
                html.classList.remove('dark');
                themeIcon.className = 'fa-solid fa-moon text-indigo-600 text-lg';
            }
        }

        themeToggle.onclick = () => {
            const newTheme = html.classList.contains('dark') ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        };

        applyTheme(localStorage.getItem('theme') || 'light');
    </script>
</body>
</html>`;
}

cities.forEach(city => {
  fs.writeFileSync(`/Users/cookie/Documents/japan-city-guide/${city.id}.html`, generateHub(city));
  console.log('생성됨:', city.id + '.html');
});
