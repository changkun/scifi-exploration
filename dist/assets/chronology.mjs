const ERAS = [
  { id: 'before1800', label: '1800 年以前', short: '前史', min: 0, max: 1799 },
  { id: '1800', label: '1800—1899', short: '工业与远航', min: 1800, max: 1899 },
  { id: '1900', label: '1900—1939', short: '现代类型成形', min: 1900, max: 1939 },
  { id: '1940', label: '1940—1959', short: '太空与系统', min: 1940, max: 1959 },
  { id: '1960', label: '1960—1979', short: '社会与意识', min: 1960, max: 1979 },
  { id: '1980', label: '1980—1999', short: '网络与后人类', min: 1980, max: 1999 },
  { id: '2000', label: '2000—2009', short: '技术与风险', min: 2000, max: 2009 },
  { id: '2010', label: '2010—2019', short: '多元文明', min: 2010, max: 2019 },
  { id: '2020', label: '2020—2025', short: '当代情境', min: 2020, max: 2025 }
];
const START_YEAR = 1900, END_YEAR = 2025, GRAPH_WIDTH = 1260, GRAPH_HEIGHT = 270;
let instanceCounter = 0;
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const yearOf = work => Number(work.sort_year ?? work.first_year);
const displayYear = work => work.year_display || (yearOf(work) < 1800 ? '早期作品（纪年见版本备注）' : String(yearOf(work)));
const pointX = year => 42 + (year - START_YEAR) / (END_YEAR - START_YEAR) * (GRAPH_WIDTH - 84);

function prepareWorks(input) {
  const ids = new Set();
  return (Array.isArray(input) ? input : []).filter(work => {
    if (!work || typeof work.id !== 'string' || !Number.isFinite(yearOf(work)) || ids.has(work.id)) return false;
    ids.add(work.id);
    return true;
  }).slice().sort((a, b) => yearOf(a) - yearOf(b) || a.id.localeCompare(b.id));
}

/**
 * Mount a self-contained publication chronology; no build step or dependency.
 * `works` may be the entire catalog or the current subset. Callbacks are optional.
 * Range endpoints are inclusive numbers or null (unbounded).
 */
export function mountChronology(container, { works = [], onWork = () => {}, onRange = () => {} } = {}) {
  if (!container || typeof container.appendChild !== 'function') throw new TypeError('mountChronology requires a container element');
  const document = container.ownerDocument;
  const uid = `chronology-${++instanceCounter}`;
  const root = document.createElement('section');
  root.className = 'chronology';
  root.setAttribute('aria-labelledby', `${uid}-heading`);
  root.innerHTML = `
    <header class="chronology-header">
      <div><span class="chronology-kicker">PUBLICATION CHRONOLOGY / 09 ERAS</span><h2 id="${uid}-heading">科幻的时间长廊</h2><p>发表时间，非故事发生时间。沿着作品诞生的年代，追踪问题如何变化。</p></div>
      <div class="chronology-readout"><strong data-role="count">0</strong><span>条当前目录记录</span><small data-role="extent"></small></div>
    </header>
    <div class="chronology-era-guide"><span>01 / 时代导航</span><p>九段分期等宽展示，小点表示当前样本记录；点击时代可筛选。阶段名称只作导览，不替代语言传统或作品分支。</p></div>
    <div class="chronology-era-scroll" tabindex="0" aria-label="九个时代，可横向滚动"><div class="chronology-eras" data-role="eras"></div></div>
    <form class="chronology-range" data-role="range-form">
      <div class="chronology-range-title"><span>时间范围</span><small>留空表示不设边界</small></div>
      <label for="${uid}-from">从<input id="${uid}-from" data-role="from" type="number" min="0" max="9999" step="1" inputmode="numeric" placeholder="不限" aria-describedby="${uid}-range-help"></label>
      <span class="chronology-range-separator" aria-hidden="true">→</span>
      <label for="${uid}-to">至<input id="${uid}-to" data-role="to" type="number" min="0" max="9999" step="1" inputmode="numeric" placeholder="不限" aria-describedby="${uid}-range-help"></label>
      <button class="chronology-primary" type="submit">应用范围</button><button type="button" data-action="clear-range">清除范围</button>
      <p id="${uid}-range-help" class="chronology-range-help">按目录排序年份筛选；连载、单行本与约年差异见作品版本备注。</p>
      <p class="chronology-range-status" data-role="range-status" role="status"></p>
    </form>
    <div class="chronology-plot-heading"><div><span>02 / 年度光点</span><h3>1900—2025 · 年份等距</h3></div><div class="chronology-scroll-buttons"><button type="button" data-action="scroll-left" aria-label="时间图向较早年份滚动">←</button><button type="button" data-action="scroll-right" aria-label="时间图向较晚年份滚动">→</button></div></div>
    <p class="chronology-plot-help" id="${uid}-plot-help">横向滚动查看各年。每个光点是一条记录，同年作品向上叠放；选中光点后可用方向键移动，回车打开作品。</p>
    <div class="chronology-plot-scroll" data-role="plot-scroll" tabindex="0" role="region" aria-label="1900至2025年的作品发表时间图" aria-describedby="${uid}-plot-help"><div class="chronology-plot" data-role="plot"></div></div>
    <div class="chronology-legend"><span><i></i>一条记录</span><span><i class="chronology-legend-selected"></i>当前选中</span><p>光点密度只来自这份代表样本，不表示全球科幻作品数量或分支分布。1900 年以前的作品见时代导航与下方列表。</p></div>
    <section class="chronology-list-section" aria-labelledby="${uid}-list-heading"><div class="chronology-list-heading"><div><span>03 / 依次阅读</span><h3 id="${uid}-list-heading">按发表时间排列</h3></div><p data-role="list-count"></p></div><ol class="chronology-list" data-role="list"></ol><button class="chronology-more" data-action="more" type="button">继续展开作品 ↓</button></section>`;
  container.appendChild(root);
  const el = role => root.querySelector(`[data-role="${role}"]`);
  let source = prepareWorks(works), range = { min: null, max: null }, listLimit = 12, selectedId = '', focusId = '', destroyed = false;
  const visibleWorks = () => source.filter(work => (range.min === null || yearOf(work) >= range.min) && (range.max === null || yearOf(work) <= range.max));
  const reducedMotion = () => document.defaultView?.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const rangeLabel = () => range.min === null && range.max === null ? '当前未限制发表时间' : `${range.min === null ? '不限开始' : range.min + ' 年'} — ${range.max === null ? '不限结束' : range.max + ' 年'}`;

  function renderEras(records) {
    el('eras').innerHTML = ERAS.map((era, index) => {
      const members = records.filter(work => yearOf(work) >= era.min && yearOf(work) <= era.max);
      const active = (range.min ?? 0) === era.min && range.max === era.max;
      const sparks = members.map(() => '<i></i>').join('');
      return `<article class="chronology-era${active ? ' is-active' : ''}"><button type="button" data-era="${era.id}" aria-pressed="${active}" aria-label="筛选 ${era.label}，当前 ${members.length} 条记录"><span class="chronology-era-number">${String(index + 1).padStart(2, '0')}</span><strong>${era.label}</strong><span>${era.short}</span><div class="chronology-era-sparks" aria-hidden="true">${sparks}</div><small><b>${members.length}</b> 条记录</small></button></article>`;
    }).join('');
  }

  function renderPlot(records) {
    const modern = records.filter(work => yearOf(work) >= START_YEAR && yearOf(work) <= END_YEAR);
    const perYear = new Map();
    for (const work of modern) perYear.set(yearOf(work), (perYear.get(yearOf(work)) || 0) + 1);
    const baseY = GRAPH_HEIGHT - 52;
    const maxStack = Math.max(1, ...perYear.values());
    const spacing = Math.min(17, (baseY - 40) / maxStack);
    const ticks = Array.from({ length: 13 }, (_, i) => 1900 + i * 10).concat(2025);
    const grid = ticks.map(year => `<line x1="${pointX(year)}" y1="25" x2="${pointX(year)}" y2="${baseY + 7}" class="chronology-grid-line"/><text x="${pointX(year)}" y="${baseY + 34}" text-anchor="middle">${year}</text>`).join('');
    const density = [...perYear].map(([year, count]) => `<line x1="${pointX(year)}" y1="${baseY}" x2="${pointX(year)}" y2="${baseY - count * spacing}" class="chronology-density-line"/>`).join('');
    let keyboardId = modern.some(work => work.id === focusId) ? focusId : modern.some(work => work.id === selectedId) ? selectedId : modern[0]?.id;
    const depth = new Map();
    const nodes = modern.map(work => {
      const year = yearOf(work), stack = (depth.get(year) || 0) + 1;
      depth.set(year, stack);
      const left = pointX(year) / GRAPH_WIDTH * 100, top = baseY - stack * spacing;
      const side = left < 15 ? ' tooltip-left' : left > 85 ? ' tooltip-right' : '';
      return `<button type="button" class="chronology-node${selectedId === work.id ? ' is-selected' : ''}${side}" data-point="${escapeHTML(work.id)}" data-work="${escapeHTML(work.id)}" tabindex="${work.id === keyboardId ? 0 : -1}" style="left:${left}%;top:${top}px" aria-label="${escapeHTML(displayYear(work))}，${escapeHTML(work.title_zh)}，${escapeHTML(work.author)}，打开作品详情"><i aria-hidden="true"></i><span class="chronology-tooltip" aria-hidden="true"><strong>${escapeHTML(work.title_zh)}</strong><small>${escapeHTML(displayYear(work))} · ${escapeHTML(work.author)}</small></span></button>`;
    }).join('');
    el('plot').innerHTML = `<svg class="chronology-axis" viewBox="0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="${uid}-axis-glow"><stop stop-color="#59dce5"/><stop offset="1" stop-color="#9584f3"/></linearGradient></defs>${grid}${density}<line x1="42" y1="${baseY}" x2="${GRAPH_WIDTH - 42}" y2="${baseY}" class="chronology-baseline" style="stroke:url(#${uid}-axis-glow)"/></svg>${nodes}${modern.length ? '' : '<p class="chronology-plot-empty">当前范围没有 1900—2025 年的记录。早期作品仍可从下方列表打开。</p>'}`;
  }

  function renderList(records) {
    const displayed = records.slice(0, listLimit);
    el('list-count').textContent = `显示 ${displayed.length} / ${records.length} 条`;
    el('list').innerHTML = displayed.length ? displayed.map((work, index) => `<li><button type="button" data-work="${escapeHTML(work.id)}"><span class="chronology-list-index">${String(index + 1).padStart(2, '0')}</span><span class="chronology-list-year">${escapeHTML(displayYear(work))}</span><span class="chronology-list-title"><strong>${escapeHTML(work.title_zh)}</strong><small>${escapeHTML(work.author)}</small></span><span class="chronology-list-open" aria-hidden="true">↗</span></button></li>`).join('') : '<li class="chronology-list-empty">当前时间范围没有记录；可清除范围，或调整作品库筛选。</li>';
    root.querySelector('[data-action="more"]').hidden = displayed.length >= records.length;
  }

  function render() {
    if (destroyed) return;
    const records = visibleWorks();
    el('count').textContent = records.length;
    el('extent').textContent = records.length ? `${displayYear(records[0])} → ${displayYear(records[records.length - 1])}` : '等待新的坐标';
    el('range-status').textContent = rangeLabel();
    renderEras(records); renderPlot(records); renderList(records);
  }

  function applyRange(min, max, notify = true) {
    range = { min, max };
    listLimit = 12;
    el('from').value = min === null ? '' : String(min);
    el('to').value = max === null ? '' : String(max);
    el('to').setCustomValidity('');
    render();
    if (notify) onRange(min, max);
  }

  function handleSubmit(event) {
    event.preventDefault();
    el('to').setCustomValidity('');
    const min = el('from').value.trim() === '' ? null : Number(el('from').value);
    const max = el('to').value.trim() === '' ? null : Number(el('to').value);
    if (min !== null && max !== null && min > max) el('to').setCustomValidity('结束年份不能早于开始年份');
    if (el('range-form').reportValidity()) applyRange(min, max);
  }

  function handleClick(event) {
    const button = event.target.closest('button');
    if (!button || !root.contains(button)) return;
    if (button.dataset.work) {
      selectedId = button.dataset.work;
      if (button.dataset.point) focusId = selectedId;
      root.querySelectorAll('[data-point]').forEach(node => {
        node.classList.toggle('is-selected', node.dataset.point === selectedId);
        if (button.dataset.point) node.tabIndex = node.dataset.point === selectedId ? 0 : -1;
      });
      onWork(selectedId);
    } else if (button.dataset.era) {
      const era = ERAS.find(item => item.id === button.dataset.era);
      applyRange(era.min === 0 ? null : era.min, era.max);
    } else if (button.dataset.action === 'clear-range') applyRange(null, null);
    else if (button.dataset.action === 'more') {
      const nextIndex = listLimit;
      listLimit += 24;
      renderList(visibleWorks());
      el('list').querySelectorAll('button')[nextIndex]?.focus();
    } else if (button.dataset.action === 'scroll-left' || button.dataset.action === 'scroll-right') {
      el('plot-scroll').scrollBy({ left: (button.dataset.action === 'scroll-left' ? -1 : 1) * 320, behavior: reducedMotion() ? 'auto' : 'smooth' });
    }
  }

  function handleKeydown(event) {
    const node = event.target.closest('[data-point]');
    if (!node) return;
    const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const nodes = [...el('plot').querySelectorAll('[data-point]')];
    const current = nodes.indexOf(node);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? nodes.length - 1 : Math.max(0, Math.min(nodes.length - 1, current + (['ArrowLeft', 'ArrowDown'].includes(event.key) ? -1 : 1)));
    nodes.forEach((item, index) => { item.tabIndex = index === next ? 0 : -1; });
    focusId = nodes[next].dataset.point;
    nodes[next].focus({ preventScroll: true });
    nodes[next].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reducedMotion() ? 'auto' : 'smooth' });
  }

  function handleFocus(event) {
    const node = event.target.closest('[data-point]');
    if (node) {
      focusId = node.dataset.point;
      el('plot').querySelectorAll('[data-point]').forEach(item => { item.tabIndex = item === node ? 0 : -1; });
    }
  }
  function handleRangeInput() { el('to').setCustomValidity(''); }

  el('range-form').addEventListener('submit', handleSubmit);
  el('range-form').addEventListener('input', handleRangeInput);
  root.addEventListener('click', handleClick);
  root.addEventListener('keydown', handleKeydown);
  root.addEventListener('focusin', handleFocus);
  render();
  return {
    update(nextWorks) { if (!destroyed) { source = prepareWorks(nextWorks); render(); } },
    setRange(min, max, { silent = true } = {}) {
      if (destroyed) return;
      const from = min == null ? null : Number(min), to = max == null ? null : Number(max);
      if ((from !== null && !Number.isFinite(from)) || (to !== null && !Number.isFinite(to)) || (from !== null && to !== null && from > to)) throw new RangeError('Invalid chronology range');
      applyRange(from, to, !silent);
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      el('range-form').removeEventListener('submit', handleSubmit);
      el('range-form').removeEventListener('input', handleRangeInput);
      root.removeEventListener('click', handleClick);
      root.removeEventListener('keydown', handleKeydown);
      root.removeEventListener('focusin', handleFocus);
      root.remove();
    }
  };
}
