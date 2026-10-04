import { atlas, subscribe, setControl } from './atlas-store.mjs';

/**
 * Jump palette (⌘K / Ctrl+K): one field that searches every record and also jumps to an
 * era, topic, branch, author or view. It changes nothing in app.js: opening a record or
 * applying a filter goes through the same data-work / data-filter buttons and form
 * controls the rest of the page already uses.
 */

const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const number = value => Number(value).toLocaleString('zh-CN');
const normalize = value => String(value ?? '').normalize('NFKC').toLocaleLowerCase().replace(/\s+/g, ' ').trim();
const yearOf = work => Number.isFinite(work.sort_year) ? work.sort_year : Number.isFinite(work.first_year) ? work.first_year : null;
const mac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

const VIEWS = [
  ['universe', '宇宙图景', '三维星图：尺度、时间、议题三种排列'],
  ['chronology', '时间长廊', '年代导航与逐年数量'],
  ['themes', '议题地图', '底层问题与细分议题'],
  ['taxonomy', '分支谱系', '来源分类的父子关系'],
  ['library', '作品库', '多维筛选，卡片或表格'],
  ['bibliography', '全景书目', '全量索引与来源字段'],
  ['history', '历史', '九个时期的脉络'],
  ['routes', '路线', '交叉阅读路径'],
  ['completion', '补全进度', '缺口与核对状态'],
  ['method', '方法', '分类方法与证据边界']
];
const ERAS = [
  ['before1800', '1800 年以前', null, 1799], ['1800', '1800—1899', 1800, 1899], ['1900', '1900—1939', 1900, 1939],
  ['1940', '1940—1959', 1940, 1959], ['1960', '1960—1979', 1960, 1979], ['1980', '1980—1999', 1980, 1999],
  ['2000', '2000—2009', 2000, 2009], ['2010', '2010—2019', 2010, 2019], ['2020', '2020 年及以后', 2020, null]
];
const LEVEL_RANK = { researched: 3, enriched: 2, candidate: 1, bibliographic: 0 };
const LEVEL_NAME = { researched: '已有研究', enriched: '知识补充', candidate: '议题候选', bibliographic: '基础书目' };

// A hidden button with the right data attributes is how any module asks app.js to act.
const proxy = document.createElement('div');
proxy.hidden = true;
document.body.append(proxy);
function press(data) {
  const button = document.createElement('button');
  for (const [key, value] of Object.entries(data)) button.dataset[key] = value;
  proxy.append(button); button.click(); button.remove();
}
const go = view => { if (location.hash !== `#${view}`) location.hash = view; };

// app.js handles a data-filter click by setting the filter and then switching to the library.
// That hash change makes the browser fire popstate at once, app.js answers popstate by
// re-reading the filters from the URL, and the URL does not have the new filter yet — so from
// any view but the library the click lands on an unfiltered list. Switching view before app.js
// sees the click keeps the filter.
document.addEventListener('click', event => {
  if (event.target.closest?.('button[data-filter]') && location.hash !== '#library') location.hash = 'library';
}, true);

const dialog = document.createElement('dialog');
dialog.className = 'jump';
dialog.setAttribute('aria-label', '搜索与跳转');
dialog.innerHTML = `
  <div class="jump-field"><svg width="18" height="18" viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="4.6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10.6 10.6L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg><input type="text" role="combobox" aria-expanded="true" aria-controls="jump-results" aria-autocomplete="list" aria-label="搜索记录，或跳到年代、议题、作者、视图" placeholder="搜索记录，或跳到年代、议题、作者、视图…" autocomplete="off" spellcheck="false"></div>
  <div class="jump-results" id="jump-results" role="listbox" aria-label="结果"></div>
  <div class="jump-foot"><span><kbd>↑</kbd><kbd>↓</kbd>选择</span><span><kbd>↵</kbd>打开</span><span><kbd>⇧</kbd><kbd>↵</kbd>在星图中定位</span><span><kbd>esc</kbd>关闭</span><span class="jump-count"></span></div>`;
document.body.append(dialog);
const input = dialog.querySelector('input'), results = dialog.querySelector('.jump-results'), count = dialog.querySelector('.jump-count');

const trigger = document.createElement('button');
trigger.type = 'button';
trigger.className = 'jump-trigger';
trigger.setAttribute('aria-keyshortcuts', 'Meta+K Control+K');
trigger.innerHTML = `<span>搜索与跳转</span><kbd>${mac ? '⌘K' : 'Ctrl K'}</kbd>`;
const header = document.querySelector('.site-header');
header?.insertBefore(trigger, header.querySelector('.report-link'));

// ----- index, built on first use and rebuilt when the record list changes -----
let index = null;
function buildIndex() {
  const works = atlas.works, tally = () => new Map(), bump = (map, key) => map.set(key, (map.get(key) || 0) + 1);
  const authors = tally(), topics = tally(), branches = tally(), facets = tally(), eras = ERAS.map(() => 0), years = tally();
  const texts = works.map(work => `${work.search_text || normalize([work.title_zh, work.author].join(' '))} ${work.id.toLowerCase()}`);
  const titles = works.map(work => normalize(work.title_zh)), names = works.map(work => normalize(work.author));
  for (const work of works) {
    if (work.author && work.author !== '作者未知') bump(authors, work.author);
    for (const topic of work.topics || []) bump(topics, topic);
    for (const branch of work.branches || []) bump(branches, branch);
    for (const label of new Set((work.issue_facets || []).map(facet => facet.label))) bump(facets, label);
    const year = yearOf(work);
    if (year !== null) { bump(years, year); const e = ERAS.findIndex(([, , min, max]) => (min === null || year >= min) && (max === null || year <= max)); if (e >= 0) eras[e]++; }
  }
  index = { works, texts, titles, names, authors, topics, branches, facets, eras, years };
}
subscribe(() => { if (index && index.works !== atlas.works) index = null; if (dialog.open) render(); });

// ----- results -----
let items = [], active = 0;
const row = (kind, glyph, title, sub, hint, action, extra = {}) => ({ kind, glyph, title, sub, hint, action, ...extra });
const mark = (text, needle) => {
  const at = needle ? normalize(text).indexOf(needle) : -1;
  // normalisation can change length; only mark when the slice still lines up
  if (at < 0 || normalize(text).length !== String(text).length) return escapeHTML(text);
  return `${escapeHTML(text.slice(0, at))}<mark>${escapeHTML(text.slice(at, at + needle.length))}</mark>${escapeHTML(text.slice(at + needle.length))}`;
};
function workRow(work, needle) {
  return row('work', '✦', mark(work.title_zh, needle), `${escapeHTML(work.author)} · ${LEVEL_NAME[work.research_level] || '基础书目'}`, escapeHTML(work.year_display || ''), () => press({ work: work.id }), { id: work.id, html: true });
}
function matchLabels(map, needle, limit) {
  return [...map].filter(([label]) => normalize(label).includes(needle)).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'zh-CN')).slice(0, limit);
}
function compute(raw) {
  const groups = [], needle = normalize(raw), terms = needle.split(' ').filter(Boolean);
  if (!index) buildIndex();
  const { works, texts, titles, names } = index;
  if (!terms.length) {
    groups.push(['去往', VIEWS.map(([id, name, note]) => row('view', '→', name, note, '', () => go(id)))]);
    groups.push(['年代', ERAS.map(([id, name], e) => row('era', '◷', name, '', `${number(index.eras[e])} 条`, () => press({ filter: 'era', value: id })))]);
    groups.push(['底层议题', [...index.topics].sort((a, b) => b[1] - a[1]).map(([topic, n]) => row('topic', '◇', topic, '', `${number(n)} 条`, () => press({ filter: 'topic', value: topic })))]);
    const pool = atlas.current?.length ? atlas.current : works;
    if (pool.length) groups.push(['漫游', [row('random', '⚄', '随机打开一条记录', pool.length === works.length ? '从全部记录中抽取' : `从当前筛选的 ${number(pool.length)} 条中抽取`, '', () => press({ work: pool[Math.floor(Math.random() * pool.length)].id }))]]);
    return { groups, total: works.length, label: `${number(works.length)} 条记录` };
  }
  const scored = [];
  for (let i = 0; i < works.length; i++) {
    const text = texts[i]; let hit = true;
    for (const term of terms) if (!text.includes(term)) { hit = false; break; }
    if (!hit) continue;
    const title = titles[i];
    const base = title === needle ? 100 : title.startsWith(needle) ? 80 : title.includes(needle) ? 60 : terms.every(term => title.includes(term)) ? 50 : terms.every(term => names[i].includes(term)) ? 40 : works[i].id.toLowerCase() === needle ? 90 : 35;
    scored.push([base + (LEVEL_RANK[works[i].research_level] || 0) * 10 - Math.min(title.length, 60) / 30, i]);
  }
  scored.sort((a, b) => b[0] - a[0] || (yearOf(works[a[1]]) ?? 9e9) - (yearOf(works[b[1]]) ?? 9e9));
  const list = scored.slice(0, 12).map(([, i]) => workRow(works[i], terms.length === 1 ? needle : ''));
  if (scored.length > list.length) list.push(row('all', '→', `在作品库中查看全部 ${number(scored.length)} 条结果`, '', '', () => { setControl('global-search', raw.trim()); go('library'); }));
  if (list.length) groups.push(['记录', list]);

  // Authors are shown under their Chinese names, but records also carry names in other scripts.
  // When nearly everything by one author matches, the query was that author's name.
  const single = ([author]) => author.split(' / ').length <= 2;
  const byName = matchLabels(index.authors, needle, 4).filter(single).map(([author, n]) => row('author', '✎', mark(author, needle), '作者', `${number(n)} 条`, () => { setControl('global-search', author); go('library'); }, { html: true }));
  const credited = new Map();
  for (const [, i] of scored) if (!titles[i].includes(needle)) credited.set(works[i].author, (credited.get(works[i].author) || 0) + 1);
  const byAlias = [...credited].filter(entry => single(entry) && entry[1] >= 2 && entry[1] >= index.authors.get(entry[0]) * .6 && !normalize(entry[0]).includes(needle)).sort((a, b) => b[1] - a[1]).slice(0, 3)
    .map(([author, n]) => row('author', '✎', author, `作者 · 按“${raw.trim()}”匹配`, `${number(n)} 条`, () => { setControl('global-search', raw.trim()); go('library'); }));
  const authors = [...byName, ...byAlias].slice(0, 5);
  if (authors.length) groups.push(['作者', authors]);
  const topics = matchLabels(index.topics, needle, 6).map(([topic, n]) => row('topic', '◇', mark(topic, needle), '底层议题', `${number(n)} 条`, () => press({ filter: 'topic', value: topic }), { html: true }));
  const facets = matchLabels(index.facets, needle, 4).map(([label, n]) => row('facet', '◇', mark(label, needle), '细分议题', `${number(n)} 条`, () => press({ filter: 'facet', value: label }), { html: true }));
  if (topics.length || facets.length) groups.push(['议题', [...topics, ...facets]]);
  const branches = matchLabels(index.branches, needle, 5).map(([branch, n]) => row('branch', '⑂', mark(branch, needle), '科幻分支', `${number(n)} 条`, () => press({ filter: 'branch', value: branch }), { html: true }));
  if (branches.length) groups.push(['分支', branches]);

  const times = [];
  if (/^\d{3,4}$/.test(needle)) {
    const year = Number(needle), n = index.years.get(year) || 0;
    if (n) times.push(row('year', '◷', `${year} 年`, '只看这一年发表的记录', `${number(n)} 条`, () => { press({ filter: 'yearMin', value: String(year) }); press({ filter: 'yearMax', value: String(year) }); }));
    const e = ERAS.findIndex(([, , min, max]) => (min === null || year >= min) && (max === null || year <= max));
    if (e >= 0) times.push(row('era', '◷', ERAS[e][1], '所在年代', `${number(index.eras[e])} 条`, () => press({ filter: 'era', value: ERAS[e][0] })));
  }
  ERAS.forEach(([id, name], e) => { if (normalize(name).includes(needle) && !times.some(item => item.title === name)) times.push(row('era', '◷', name, '年代', `${number(index.eras[e])} 条`, () => press({ filter: 'era', value: id }))); });
  if (times.length) groups.push(['时间', times]);
  const views = VIEWS.filter(([id, name, note]) => normalize(`${name} ${note} ${id}`).includes(needle)).map(([id, name, note]) => row('view', '→', name, note, '', () => go(id)));
  if (views.length) groups.push(['去往', views]);
  return { groups, total: scored.length, label: scored.length ? `${number(scored.length)} 条记录匹配` : '没有匹配的记录' };
}
function render() {
  if (!atlas.works.length) { results.innerHTML = '<p class="jump-empty">正在载入完整底库…</p>'; items = []; count.textContent = ''; return; }
  const { groups, label } = compute(input.value);
  items = groups.flatMap(([, rows]) => rows); active = Math.min(active, Math.max(0, items.length - 1));
  let i = 0;
  results.innerHTML = groups.map(([name, rows]) => `<p class="jump-group" role="presentation">${name}</p>` + rows.map(item => { const at = i++; return `<button type="button" class="jump-item" role="option" id="jump-option-${at}" data-at="${at}" data-kind="${item.kind}" aria-selected="${at === active}" tabindex="-1"><span class="jump-glyph" aria-hidden="true">${item.glyph}</span><span><span class="jump-title">${item.html ? item.title : escapeHTML(item.title)}</span>${item.sub ? `<span class="jump-sub">${item.html ? item.sub : escapeHTML(item.sub)}</span>` : ''}</span><span class="jump-hint">${item.hint}</span></button>`; }).join('')).join('') || '<p class="jump-empty">没有匹配的记录、作者、议题或视图。换一个更短的词试试。</p>';
  count.textContent = label;
  input.setAttribute('aria-activedescendant', items.length ? `jump-option-${active}` : '');
}
function move(next) {
  if (!items.length) return;
  active = (next + items.length) % items.length;
  results.querySelectorAll('.jump-item').forEach(element => element.setAttribute('aria-selected', String(Number(element.dataset.at) === active)));
  results.querySelector(`[data-at="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  input.setAttribute('aria-activedescendant', `jump-option-${active}`);
}
function activate(at, onMap = false) {
  const item = items[at]; if (!item) return;
  dialog.close();
  if (onMap && item.id && atlas.locate) { go('universe'); atlas.locate(item.id); }
  else item.action();
}

let timer = 0;
input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => { active = 0; render(); results.scrollTop = 0; }, 60); });
input.addEventListener('keydown', event => {
  if (event.isComposing) return;
  if (event.key === 'ArrowDown') { event.preventDefault(); move(active + 1); }
  else if (event.key === 'ArrowUp') { event.preventDefault(); move(active - 1); }
  else if (event.key === 'Enter') { event.preventDefault(); clearTimeout(timer); render(); activate(active, event.shiftKey); }
});
results.addEventListener('click', event => { const element = event.target.closest('.jump-item'); if (element) activate(Number(element.dataset.at), event.shiftKey); });
results.addEventListener('pointermove', event => { const element = event.target.closest('.jump-item'); if (element && Number(element.dataset.at) !== active) move(Number(element.dataset.at)); });
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

function open() {
  if (dialog.open) return;
  input.value = ''; active = 0; render(); dialog.showModal(); results.scrollTop = 0; input.focus();
}
trigger.addEventListener('click', open);
document.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && !event.altKey && event.key.toLowerCase() === 'k') { event.preventDefault(); dialog.open ? dialog.close() : open(); }
});
