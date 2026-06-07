// components.js — Japan City Guide 공유 UI 컴포넌트

// ─── RegionFilter CSS ─────────────────────────────────────────────────────────
let _rfStylesInjected = false;

function _injectStyles() {
  if (_rfStylesInjected) return;
  _rfStylesInjected = true;
  const s = document.createElement('style');
  s.id = 'jcg-component-styles';
  s.textContent = `
/* ── RegionFilter ── */
.rf-wrap { display:flex; flex-wrap:wrap; gap:8px; }
.rf-btn {
  display:inline-flex; align-items:center; gap:5px;
  padding:7px 16px; border-radius:9999px;
  border:1.5px solid #e2e8f0; background:#fff; color:#94a3b8;
  font-size:11px; font-weight:900; letter-spacing:.06em; text-transform:uppercase;
  cursor:pointer; white-space:nowrap; transition:all .2s; user-select:none;
  -webkit-tap-highlight-color:transparent;
}
.rf-btn:hover:not([aria-checked="true"]) { border-color:#cbd5e1; color:#475569; }
.dark .rf-btn { background:rgba(255,255,255,.04); color:#64748b; border-color:rgba(255,255,255,.1); }
.dark .rf-btn:hover:not([aria-checked="true"]) { border-color:rgba(255,255,255,.2); color:#94a3b8; }

/* active — light */
.rf-btn[aria-checked="true"][data-color="slate"]  { background:#f8fafc; color:#334155; border-color:#94a3b8;  box-shadow:0 1px 5px rgba(0,0,0,.08); }
.rf-btn[aria-checked="true"][data-color="rose"]   { background:#fff1f2; color:#e11d48; border-color:#fca5a5;  box-shadow:0 1px 5px rgba(225,29,72,.12); }
.rf-btn[aria-checked="true"][data-color="sky"]    { background:#f0f9ff; color:#0284c7; border-color:#7dd3fc;  box-shadow:0 1px 5px rgba(2,132,199,.12); }
.rf-btn[aria-checked="true"][data-color="teal"]   { background:#f0fdfa; color:#0d9488; border-color:#5eead4;  box-shadow:0 1px 5px rgba(13,148,136,.12); }
.rf-btn[aria-checked="true"][data-color="indigo"] { background:#eef2ff; color:#4338ca; border-color:#a5b4fc;  box-shadow:0 1px 5px rgba(67,56,202,.12); }
.rf-btn[aria-checked="true"][data-color="orange"] { background:#fff7ed; color:#c2410c; border-color:#fdba74;  box-shadow:0 1px 5px rgba(194,65,12,.12); }
.rf-btn[aria-checked="true"][data-color="violet"] { background:#f5f3ff; color:#6d28d9; border-color:#c4b5fd;  box-shadow:0 1px 5px rgba(109,40,217,.12); }

/* active — dark */
.dark .rf-btn[aria-checked="true"][data-color="slate"]  { background:rgba(255,255,255,.1);  color:#94a3b8; border-color:rgba(255,255,255,.25); }
.dark .rf-btn[aria-checked="true"][data-color="rose"]   { background:rgba(244,63,94,.15);   color:#fb7185; border-color:rgba(244,63,94,.4);  }
.dark .rf-btn[aria-checked="true"][data-color="sky"]    { background:rgba(14,165,233,.15);  color:#38bdf8; border-color:rgba(14,165,233,.4); }
.dark .rf-btn[aria-checked="true"][data-color="teal"]   { background:rgba(20,184,166,.15);  color:#2dd4bf; border-color:rgba(20,184,166,.4); }
.dark .rf-btn[aria-checked="true"][data-color="indigo"] { background:rgba(99,102,241,.15);  color:#818cf8; border-color:rgba(99,102,241,.4); }
.dark .rf-btn[aria-checked="true"][data-color="orange"] { background:rgba(249,115,22,.15);  color:#fb923c; border-color:rgba(249,115,22,.4); }
.dark .rf-btn[aria-checked="true"][data-color="violet"] { background:rgba(139,92,246,.15);  color:#a78bfa; border-color:rgba(139,92,246,.4); }

/* ── MatsuriCard ── */
.matsuri-card {
  display:flex; flex-direction:column;
  background:#fff; border-radius:2.5rem; overflow:hidden;
  border:1.5px solid #f1f5f9;
  box-shadow:0 2px 14px rgba(0,0,0,.06);
  transition:transform .3s ease, box-shadow .3s ease;
}
.matsuri-card:hover { transform:translateY(-6px); box-shadow:0 20px 50px rgba(0,0,0,.13); }
.dark .matsuri-card { background:rgba(255,255,255,.05); border-color:rgba(255,255,255,.08); }
.dark .matsuri-card:hover { box-shadow:0 20px 50px rgba(0,0,0,.45); }

@media (min-width:768px) { .matsuri-card { flex-direction:row; } }

/* Image column */
.mc-img {
  position:relative; flex-shrink:0; overflow:hidden;
  height:240px;
}
@media (min-width:768px) { .mc-img { width:42%; height:auto; min-height:300px; } }

.mc-img img {
  width:100%; height:100%; object-fit:cover;
  transition:transform .7s ease;
}
.matsuri-card:hover .mc-img img { transform:scale(1.06); }

.mc-overlay {
  position:absolute; inset:0;
  background:linear-gradient(to top, rgba(0,0,0,.6) 0%, transparent 55%);
}
@media (min-width:768px) {
  .mc-overlay {
    background:linear-gradient(to right, transparent 35%, rgba(0,0,0,.1) 100%),
               linear-gradient(to top, rgba(0,0,0,.5) 0%, transparent 50%);
  }
}

/* Rank badge on image */
.mc-rank-badge {
  position:absolute; top:16px; left:16px;
  width:34px; height:34px; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  font-size:10px; font-weight:900; letter-spacing:-.5px; color:#fff;
}

/* Mobile: name overlay on image (hidden on md+) */
.mc-mobile-title {
  position:absolute; bottom:16px; left:18px; right:18px;
}
@media (min-width:768px) { .mc-mobile-title { display:none; } }

/* Body column */
.mc-body {
  flex:1; display:flex; flex-direction:column; justify-content:space-between;
  padding:24px; position:relative; overflow:hidden;
}
@media (min-width:768px) { .mc-body { padding:32px 36px; } }

/* JP name watermark */
.mc-jp-wm {
  position:absolute; right:12px; top:50%; transform:translateY(-50%);
  font-size:4.5rem; font-weight:900; line-height:1;
  writing-mode:vertical-rl; text-orientation:upright; letter-spacing:4px;
  color:rgba(0,0,0,.04); pointer-events:none; user-select:none;
}
.dark .mc-jp-wm { color:rgba(255,255,255,.04); }

/* Badge row */
.mc-badges { display:flex; flex-wrap:wrap; gap:7px; margin-bottom:14px; }
.mc-badge {
  font-size:10px; font-weight:900; padding:4px 11px; border-radius:9999px;
  letter-spacing:.04em; text-transform:uppercase;
}
.mc-badge-date { background:#f1f5f9; color:#64748b; }
.dark .mc-badge-date { background:rgba(255,255,255,.1); color:#94a3b8; }
.mc-badge-highlight { background:rgba(251,191,36,.12); color:#92400e; }
.dark .mc-badge-highlight { background:rgba(251,191,36,.15); color:#fbbf24; }

/* Desktop-only title block */
.mc-title-block { margin-bottom:12px; }
@media (max-width:767px) { .mc-title-block { display:none; } }
.mc-subtitle { font-size:10px; font-weight:900; letter-spacing:.1em; text-transform:uppercase; color:#94a3b8; margin-bottom:3px; }
.mc-name { font-size:1.55rem; font-weight:900; color:#0f172a; line-height:1.2; margin-bottom:2px; }
.dark .mc-name { color:#f1f5f9; }
.mc-name-jp { font-size:.82rem; color:#94a3b8; font-weight:700; }

/* Description */
.mc-desc { font-size:.82rem; font-weight:700; line-height:1.75; color:#475569; margin-bottom:14px; }
.dark .mc-desc { color:#94a3b8; }

/* Tags */
.mc-tags { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:18px; }
.mc-tag {
  font-size:10px; font-weight:900; padding:3px 10px; border-radius:9999px;
  background:#f1f5f9; color:#64748b;
}
.dark .mc-tag { background:rgba(255,255,255,.08); color:#94a3b8; }

/* Footer */
.mc-footer {
  display:flex; align-items:center; justify-content:space-between;
  flex-wrap:wrap; gap:8px; padding-top:14px;
  border-top:1.5px solid #f1f5f9;
  position:relative; z-index:1;
}
.dark .mc-footer { border-top-color:rgba(255,255,255,.08); }
.mc-location { font-size:11px; font-weight:700; color:#94a3b8; display:flex; align-items:center; gap:5px; }
.mc-cta {
  display:inline-flex; align-items:center; gap:7px;
  padding:8px 18px; border-radius:9999px;
  font-size:11px; font-weight:900; color:#fff;
  text-decoration:none; transition:opacity .2s, transform .15s;
}
.mc-cta:hover { opacity:.88; transform:translateY(-1px); }
.mc-cta:active { transform:scale(.97); }
  `;
  document.head.appendChild(s);
}


// ─── RegionFilter ─────────────────────────────────────────────────────────────

class RegionFilter {
  /**
   * @param {Object}   opts
   * @param {string}   opts.containerId   ID of the wrapper <div>
   * @param {Array}    opts.regions       [{id, label, emoji, color}]  — '전체/all' prepended automatically
   * @param {string}   opts.cardSelector  CSS selector for filterable cards (must have data-region attr)
   * @param {Function} [opts.onSelect]    callback(activeId)
   */
  constructor({ containerId, regions, cardSelector, onSelect }) {
    _injectStyles();
    this.el = document.getElementById(containerId);
    if (!this.el) {
      console.warn('RegionFilter: container #' + containerId + ' not found');
      return;
    }
    this.regions = [{ id: 'all', label: '전체', emoji: '🗾', color: 'slate' }, ...regions];
    this.cardSelector = cardSelector;
    this.onSelect = onSelect || null;
    this.active = 'all';
    this._render();
    this.el.addEventListener('click', e => {
      const btn = e.target.closest('.rf-btn');
      if (btn) this._select(btn.dataset.rid);
    });
  }

  _render() {
    const wrap = document.createElement('div');
    wrap.className = 'rf-wrap';
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', '지역 필터');
    this.regions.forEach(r => {
      const btn = document.createElement('button');
      btn.className = 'rf-btn';
      btn.dataset.rid = r.id;
      btn.dataset.color = r.color;
      btn.type = 'button';
      btn.setAttribute('aria-checked', r.id === this.active ? 'true' : 'false');
      btn.textContent = r.emoji + ' ' + r.label;
      wrap.appendChild(btn);
    });
    this.el.innerHTML = '';
    this.el.appendChild(wrap);
  }

  _select(id) {
    if (!id || this.active === id) return;
    this.active = id;
    this.el.querySelectorAll('.rf-btn').forEach(btn => {
      btn.setAttribute('aria-checked', btn.dataset.rid === id ? 'true' : 'false');
    });
    this._filter();
    if (this.onSelect) this.onSelect(id);
  }

  _filter() {
    document.querySelectorAll(this.cardSelector).forEach(card => {
      const show = this.active === 'all' || card.dataset.region === this.active;
      if (show) {
        card.hidden = false;
        requestAnimationFrame(() => {
          card.style.transition = 'opacity .28s ease, transform .28s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      } else {
        card.style.transition = 'opacity .18s ease, transform .18s ease';
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        setTimeout(() => { card.hidden = true; }, 200);
      }
    });
  }
}


// ─── MatsuriCard renderer ──────────────────────────────────────────────────────

/**
 * Color palette for matsuri/event cards.
 * Each key maps to a set of CSS values used in badge and CTA elements.
 */
const CARD_COLORS = {
  sky:    { accent: '#0ea5e9', badgeBg: 'rgba(14,165,233,.12)' },
  rose:   { accent: '#e11d48', badgeBg: 'rgba(225,29,72,.1)'   },
  teal:   { accent: '#0d9488', badgeBg: 'rgba(13,148,136,.1)'  },
  orange: { accent: '#ea580c', badgeBg: 'rgba(234,88,12,.1)'   },
  violet: { accent: '#7c3aed', badgeBg: 'rgba(124,58,237,.1)'  },
};

/**
 * Renders a responsive horizontal Matsuri detail card into `container`.
 *
 * @param {HTMLElement} container  Wrapper element (receives .matsuri-card class + data-region)
 * @param {Object}      d          Card data:
 *   { region, regionLabel, regionEmoji, color,
 *     rank, subtitle, name, nameJP,
 *     date, highlight, desc, tags, city, image, link }
 */
function renderMatsuriCard(container, d) {
  _injectStyles();
  const c = CARD_COLORS[d.color] || CARD_COLORS.sky;
  container.className = 'matsuri-card';
  container.dataset.region = d.region;

  const highlightBadge = d.highlight
    ? `<span class="mc-badge mc-badge-highlight">⭐ ${d.highlight}</span>`
    : '';

  container.innerHTML = `
    <div class="mc-img">
      <img src="${d.image}" alt="${d.name}" loading="lazy">
      <div class="mc-overlay"></div>
      <div class="mc-rank-badge" style="background:${c.accent};">#${d.rank}</div>
      <div class="mc-mobile-title">
        <p style="font-size:9px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:2px;">${d.subtitle || ''}</p>
        <h3 style="font-size:1.15rem;font-weight:900;color:#fff;line-height:1.25;margin-bottom:2px;">${d.name}</h3>
        <p style="font-size:.75rem;color:rgba(255,255,255,.4);">${d.nameJP}</p>
      </div>
    </div>
    <div class="mc-body">
      <div class="mc-jp-wm">${d.nameJP}</div>
      <div style="position:relative;z-index:1;">
        <div class="mc-badges">
          <span class="mc-badge" style="background:${c.badgeBg};color:${c.accent};">${d.regionEmoji} ${d.regionLabel}</span>
          <span class="mc-badge mc-badge-date">📅 ${d.date}</span>
          ${highlightBadge}
        </div>
        <div class="mc-title-block">
          <p class="mc-subtitle">${d.subtitle || ''}</p>
          <h3 class="mc-name">${d.name}</h3>
          <p class="mc-name-jp">${d.nameJP}</p>
        </div>
        <p class="mc-desc">${d.desc}</p>
        <div class="mc-tags">${d.tags.map(t => `<span class="mc-tag">${t}</span>`).join('')}</div>
      </div>
      <div class="mc-footer">
        <span class="mc-location">
          <i class="fa-solid fa-location-dot" style="color:${c.accent};"></i>
          ${d.city}
        </span>
        ${d.link ? `<a href="${d.link}" class="mc-cta" style="background:${c.accent};">가이드 보기&nbsp;<i class="fa-solid fa-arrow-right-long"></i></a>` : ''}
      </div>
    </div>
  `;
}
