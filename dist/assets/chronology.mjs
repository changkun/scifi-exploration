const ERAS = [
  { id: 'before1800', label: '1800 年以前', short: '早期与前史', min: null, max: 1799 },
  { id: '1800', label: '1800—1899', short: '工业与远航', min: 1800, max: 1899 },
  { id: '1900', label: '1900—1939', short: '现代类型成形', min: 1900, max: 1939 },
  { id: '1940', label: '1940—1959', short: '太空与系统', min: 1940, max: 1959 },
  { id: '1960', label: '1960—1979', short: '社会与意识', min: 1960, max: 1979 },
  { id: '1980', label: '1980—1999', short: '网络与后人类', min: 1980, max: 1999 },
  { id: '2000', label: '2000—2009', short: '技术与风险', min: 2000, max: 2009 },
  { id: '2010', label: '2010—2019', short: '多元文明', min: 2010, max: 2019 },
  { id: '2020', label: '2020 年及以后', short: '当代与未来年份', min: 2020, max: null }
];
const PAGE_SIZE = 60;
const GRAPH_HEIGHT = 268;
const GRAPH_PADDING = 42;
let instanceCounter = 0;
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const numberOrNull = value => {
  if (value === null || value === undefined || (typeof value !== 'number' && typeof value !== 'string') || String(value).trim() === '') return null;
  const number = Number(value);
  return Number.isFinite(number) && Number.isInteger(number) ? number : null;
};
const yearOf = work => numberOrNull(work.sort_year) ?? numberOrNull(work.first_year);
const yearLabel = year => year === null ? '年份未知' : year < 0 ? `公元前 ${Math.abs(year)} 年` : `${year} 年`;
const titleOf = work => work.title_zh || work.title || work.title_original || work.id;
const authorOf = work => Array.isArray(work.author) ? work.author.join('、') : work.author || (Array.isArray(work.authors) ? work.authors.join('、') : '') || '作者未知';
const displayYear = work => yearOf(work) === null ? '年份未知' : work.year_display || yearLabel(yearOf(work));

function prepareWorks(input) {
  const ids = new Set();
  return (Array.isArray(input) ? input : []).filter(work => {
    if (!work || typeof work.id !== 'string' || !work.id || ids.has(work.id)) return false;
    ids.add(work.id);
    return true;
  }).map(work => ({ work, year: yearOf(work) })).sort((a, b) => {
    if (a.year === null && b.year !== null) return 1;
    if (a.year !== null && b.year === null) return -1;
    return (a.year === null ? 0 : a.year - b.year) || a.work.id.localeCompare(b.work.id);
  });
}

export function chronologyEraCounts(works) {
  const counts = Array(ERAS.length).fill(0);
  for (const { year } of prepareWorks(works)) {
    if (year === null) continue;
    const index = ERAS.findIndex(era => (era.min === null || year >= era.min) && (era.max === null || year <= era.max));
    if (index >= 0) counts[index]++;
  }
  return counts;
}

/**
 * Publication chronology for the complete canonical catalog or a current subset.
 * Annual density uses all dated records supplied to this instance; unknown dates
 * stay separate. Empty years are folded, so horizontal distance is not elapsed time.
 * onRange(min, max) receives inclusive endpoints; null is an unbounded endpoint.
 * onUnknownYear() is optional and requests the host's global unknown-year filter.
 */
export function mountChronology(container, { works = [], onWork = () => {}, onRange = () => {}, onUnknownYear = () => {} } = {}) {
  if (!container || typeof container.appendChild !== 'function') throw new TypeError('mountChronology requires a container element');
  const document = container.ownerDocument;
  const view = document.defaultView;
  const uid = `chronology-${++instanceCounter}`;
  const root = document.createElement('section');
  root.className = 'chronology';
  root.setAttribute('aria-labelledby', `${uid}-heading`);
  root.innerHTML = `
    <header class="chronology-header">
      <div><span class="chronology-kicker">PUBLICATION CHRONOLOGY / 09 ERAS</span><h2 id="${uid}-heading">科幻的时间长廊</h2><p>按来源发表年与研究纪年浏览。这里展示作品被发表或登记的时间；连载、版本和约年差异见详情。</p></div>
      <div class="chronology-readout"><strong data-role="count">0</strong><span>条当前记录</span><small data-role="extent"></small></div>
    </header>
    <div class="chronology-era-guide"><span>01 / 时代导航</span><p>每段同时显示当前条件匹配数与底库数。0 个匹配只表示当前条件没有命中；空间待分类的记录不进入具体空间筛选。末段包含全部较晚年份，未知年单独列出。</p></div>
    <p class="chronology-scope" data-role="scope" role="status"></p>
    <div class="chronology-era-scroll" tabindex="0" aria-label="九个时代，可横向滚动"><div class="chronology-eras" data-role="eras"></div></div>
    <div class="chronology-unknown"><button type="button" data-action="unknown-year" aria-pressed="false"><span>年份未知</span><strong data-role="unknown-count">0</strong><small>条</small></button><p data-role="known-summary"></p></div>
    <form class="chronology-range" data-role="range-form">
      <div class="chronology-range-title"><span>时间范围</span><small>留空表示不设边界</small></div>
      <label for="${uid}-from">从<input id="${uid}-from" data-role="from" type="number" step="1" inputmode="numeric" placeholder="不限" aria-describedby="${uid}-range-help"></label>
      <span class="chronology-range-separator" aria-hidden="true">→</span>
      <label for="${uid}-to">至<input id="${uid}-to" data-role="to" type="number" step="1" inputmode="numeric" placeholder="不限" aria-describedby="${uid}-range-help"></label>
      <button class="chronology-primary" type="submit">应用范围</button><button type="button" data-action="clear-range">清除范围</button>
      <p id="${uid}-range-help" class="chronology-range-help">按所收录记录的纪年筛选，不统一等同于全球首发年。指定年份范围时不混入未知年。</p>
      <p class="chronology-range-status" data-role="range-status" role="status"></p>
    </form>
    <div class="chronology-plot-heading"><div><span>02 / 年度数量密度</span><h3 data-role="plot-heading">等待年份记录</h3></div><div class="chronology-scroll-buttons"><button type="button" data-action="scroll-left" aria-label="时间图向较早年份滚动">←</button><button type="button" data-action="scroll-right" aria-label="时间图向较晚年份滚动">→</button></div></div>
    <p class="chronology-plot-help" id="${uid}-plot-help">每柱代表一个有记录年份，柱高与记录数成正比；空白年份折叠，横向距离不表示经过时长。点击柱筛选该年。聚焦图表后可用方向键、Home / End 选年，回车应用。</p>
    <div class="chronology-plot-scroll" data-role="plot-scroll" tabindex="0" role="region" aria-label="全部有年份记录的年度数量图" aria-describedby="${uid}-plot-help"><canvas class="chronology-density-canvas" data-role="canvas" height="${GRAPH_HEIGHT}" tabindex="0" role="slider" aria-orientation="horizontal" aria-label="选择发表年份" aria-describedby="${uid}-plot-help">年度数量图</canvas></div>
    <div class="chronology-year-selection"><div data-role="year-readout" aria-live="polite"></div><div><button type="button" data-action="previous-year" aria-label="选择上一个有记录年份">上一年</button><button class="chronology-primary" type="button" data-action="select-year">筛选所选年份</button><button type="button" data-action="next-year" aria-label="选择下一个有记录年份">下一年</button></div></div>
    <div class="chronology-legend"><span><i></i>年度记录数</span><span><i class="chronology-legend-selected"></i>所选年份</span><p>数量来自当前载入的来源与筛选结果，不能当作全球各年度出版量。来源未来年份可能属于预告或待核日期。</p></div>
    <section class="chronology-list-section" aria-labelledby="${uid}-list-heading"><div class="chronology-list-heading"><div><span>03 / 依次阅读</span><h3 id="${uid}-list-heading">按发表时间排列</h3></div><p data-role="list-count" role="status"></p></div><ol class="chronology-list" data-role="list"></ol><nav class="chronology-pagination" aria-label="时间列表分页"><button type="button" data-action="first-page">首页</button><button type="button" data-action="previous-page">上一页</button><span data-role="page-count"></span><button type="button" data-action="next-page">下一页</button><button type="button" data-action="last-page">末页</button></nav></section>`;
  container.appendChild(root);
  const el = role => root.querySelector(`[data-role="${role}"]`);
  const action = name => root.querySelector(`[data-action="${name}"]`);
  let source = prepareWorks(works), range = { min: null, max: null }, unknownOnly = false, page = 0, selectedId = '', destroyed = false;
  let contextWorks = works, scopeLabel = '全部记录';
  let visible = [], annual = [], focusYear = null, hoverYear = null, graphWidth = 0, frame = null;
  const reducedMotion = () => view?.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const visibleWorks = () => source.filter(({ year }) => {
    if (unknownOnly) return year === null;
    if (range.min === null && range.max === null) return true;
    return year !== null && (range.min === null || year >= range.min) && (range.max === null || year <= range.max);
  });
  const rangeLabel = () => unknownOnly ? '仅显示年份未知的记录' : range.min === null && range.max === null ? '当前未限制发表时间；未知年份保留在列表末尾' : `${range.min === null ? '不限开始' : yearLabel(range.min)} — ${range.max === null ? '不限结束' : yearLabel(range.max)}；未知年不在范围内`;

  function renderEras() {
    const counts = chronologyEraCounts(source.map(item => item.work));
    const totals = chronologyEraCounts(contextWorks);
    el('scope').textContent = `${scopeLabel} · 底库数仅沿用“包含前史与边界参照”的选择，移除其余筛选；记录数不代表全球出版总量。`;
    const maximum = Math.max(1, ...counts);
    el('eras').innerHTML = ERAS.map((era, index) => {
      const active = !unknownOnly && range.min === era.min && range.max === era.max;
      return `<article class="chronology-era${active ? ' is-active' : ''}"><button type="button" data-era="${era.id}" aria-pressed="${active}" aria-label="筛选 ${era.label}，当前条件匹配 ${counts[index]} 条，底库 ${totals[index]} 条"><span class="chronology-era-number">${String(index + 1).padStart(2, '0')}</span><strong>${era.label}</strong><span>${era.short}</span><div class="chronology-era-meter" aria-hidden="true"><i style="width:${counts[index] / maximum * 100}%"></i></div><small><b>${counts[index].toLocaleString('zh-CN')}</b> 条匹配<br>底库 ${totals[index].toLocaleString('zh-CN')} 条</small></button></article>`;
    }).join('');
  }

  function updateYearReadout() {
    const current = annual.find(item => item.year === (hoverYear ?? focusYear));
    el('year-readout').textContent = current ? `${yearLabel(current.year)} · ${current.count.toLocaleString('zh-CN')} 条记录${current.year > new Date().getUTCFullYear() ? ' · 未来来源年份，待核' : ''}` : '当前没有可绘制的已知年份；未知记录可从列表打开。';
    for (const name of ['previous-year', 'select-year', 'next-year', 'scroll-left', 'scroll-right']) action(name).disabled = !annual.length;
    const index = annual.findIndex(item => item.year === focusYear);
    action('previous-year').disabled = index <= 0;
    action('next-year').disabled = index < 0 || index >= annual.length - 1;
    const canvas = el('canvas');
    if (annual.length) {
      canvas.setAttribute('role', 'slider');
      canvas.tabIndex = 0;
      canvas.setAttribute('aria-valuemin', String(annual[0].year));
      canvas.setAttribute('aria-valuemax', String(annual[annual.length - 1].year));
      canvas.setAttribute('aria-valuenow', String(focusYear));
      const focused = annual[index];
      canvas.setAttribute('aria-valuetext', `${yearLabel(focusYear)}，${focused?.count || 0} 条记录；回车筛选`);
    } else {
      canvas.setAttribute('role', 'img');
      canvas.tabIndex = -1;
      for (const attribute of ['aria-valuemin', 'aria-valuemax', 'aria-valuenow', 'aria-valuetext']) canvas.removeAttribute(attribute);
    }
  }

  function drawPlot() {
    if (destroyed) return;
    const canvas = el('canvas');
    const available = Math.max(1, el('plot-scroll').clientWidth || 800);
    // Each occupied year gets a column; a canvas keeps DOM size independent of works.
    // Cap the bitmap, while retaining every annual column even in unusual datasets.
    graphWidth = Math.max(available, Math.min(16000, annual.length * 28 + GRAPH_PADDING * 2));
    canvas.style.width = `${graphWidth}px`;
    const ratio = Math.min(view?.devicePixelRatio || 1, 2, 16000 / graphWidth);
    canvas.width = Math.max(1, Math.round(graphWidth * ratio));
    canvas.height = Math.round(GRAPH_HEIGHT * ratio);
    const context = canvas.getContext('2d');
    if (!context) return;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, graphWidth, GRAPH_HEIGHT);
    context.font = '11px ui-monospace, SFMono-Regular, Consolas, monospace';
    context.textAlign = 'left';
    if (!annual.length) {
      context.fillStyle = '#a4b9d1';
      context.fillText('当前没有已知年份记录。', 22, 90);
      canvas.textContent = '当前没有已知年份记录。';
      return;
    }
    const baseY = GRAPH_HEIGHT - 49, usableHeight = baseY - 38;
    const maxCount = Math.max(1, ...annual.map(item => item.count));
    const step = (graphWidth - GRAPH_PADDING * 2) / annual.length;
    const barWidth = Math.max(1, Math.min(17, step * 0.68));
    for (let fraction = 0; fraction <= 1; fraction += 0.5) {
      const y = baseY - usableHeight * fraction;
      context.strokeStyle = 'rgba(124,177,214,.15)';
      context.beginPath(); context.moveTo(GRAPH_PADDING, y); context.lineTo(graphWidth - GRAPH_PADDING, y); context.stroke();
      context.fillStyle = '#a4b9d1';
      context.fillText(String(Math.round(maxCount * fraction)), 7, y - 5);
    }
    const labelStride = Math.max(1, Math.ceil(52 / step));
    annual.forEach((item, index) => {
      const x = GRAPH_PADDING + (index + 0.5) * step;
      const height = Math.max(2, item.count / maxCount * usableHeight);
      const focused = item.year === focusYear;
      context.fillStyle = focused ? '#9584f3' : item.year === hoverYear ? '#b9faff' : '#59dce5';
      context.globalAlpha = focused || item.year === hoverYear ? 1 : 0.75;
      context.fillRect(x - barWidth / 2, baseY - height, barWidth, height);
      context.globalAlpha = 1;
      if (focused) {
        context.strokeStyle = '#d8d0ff'; context.lineWidth = 1;
        context.strokeRect(x - barWidth / 2 - 3, baseY - height - 4, barWidth + 6, height + 8);
      }
      if (index % labelStride === 0 || index === annual.length - 1) {
        context.fillStyle = '#a4b9d1'; context.textAlign = 'center';
        context.fillText(String(item.year), x, baseY + 26);
      }
    });
    const total = annual.reduce((sum, item) => sum + item.count, 0);
    canvas.textContent = `${annual.length} 个有记录年份，覆盖 ${total} 条已知年份记录；最早 ${yearLabel(annual[0].year)}，最晚 ${yearLabel(annual[annual.length - 1].year)}。`;
    canvas.dataset.knownCount = String(total);
    canvas.dataset.yearCount = String(annual.length);
  }

  function schedulePlot() {
    if (frame !== null) return;
    const request = view?.requestAnimationFrame?.bind(view) || (callback => setTimeout(callback, 0));
    frame = request(() => { frame = null; drawPlot(); });
  }

  function renderList() {
    const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
    page = Math.max(0, Math.min(page, totalPages - 1));
    const start = page * PAGE_SIZE;
    const displayed = visible.slice(start, start + PAGE_SIZE);
    el('list-count').textContent = visible.length ? `${start + 1}—${start + displayed.length} / ${visible.length.toLocaleString('zh-CN')} 条` : '0 条记录';
    el('list').start = start + 1;
    el('list').innerHTML = displayed.length ? displayed.map(({ work }) => `<li><button type="button" data-work="${escapeHTML(work.id)}"${selectedId === work.id ? ' class="is-selected"' : ''}><span class="chronology-list-year">${escapeHTML(displayYear(work))}</span><span class="chronology-list-title"><strong>${escapeHTML(titleOf(work))}</strong><small>${escapeHTML(authorOf(work))}</small><small>${work.knowledge?'已有知识补充 · ':''}待独立核对</small></span><span class="chronology-list-open" aria-hidden="true">↗</span></button></li>`).join('') : '<li class="chronology-list-empty">当前没有记录；可清除范围，或调整作品库筛选。</li>';
    el('page-count').textContent = `第 ${page + 1} / ${totalPages} 页 · 每页最多 ${PAGE_SIZE} 条`;
    action('first-page').disabled = action('previous-page').disabled = page === 0;
    action('last-page').disabled = action('next-page').disabled = page >= totalPages - 1;
  }

  function render() {
    if (destroyed) return;
    visible = visibleWorks();
    const sourceUnknown = source.reduce((count, record) => count + (record.year === null ? 1 : 0), 0);
    const known = visible.filter(record => record.year !== null);
    const counts = new Map();
    for (const { year } of known) counts.set(year, (counts.get(year) || 0) + 1);
    annual = [...counts].map(([year, count]) => ({ year, count })).sort((a, b) => a.year - b.year);
    if (!annual.some(item => item.year === focusYear)) focusYear = annual[0]?.year ?? null;
    hoverYear = null;
    el('count').textContent = visible.length.toLocaleString('zh-CN');
    el('extent').textContent = annual.length ? `${yearLabel(annual[0].year)} → ${yearLabel(annual[annual.length - 1].year)}${visible.length > known.length ? ` · 另有 ${visible.length - known.length} 条年份未知` : ''}` : visible.length ? `${visible.length} 条年份未知` : '当前没有记录';
    el('unknown-count').textContent = sourceUnknown.toLocaleString('zh-CN');
    action('unknown-year').setAttribute('aria-pressed', String(unknownOnly));
    action('unknown-year').disabled = sourceUnknown === 0;
    el('known-summary').textContent = `输入数据共 ${source.length.toLocaleString('zh-CN')} 条：${(source.length - sourceUnknown).toLocaleString('zh-CN')} 条有纪年，${sourceUnknown.toLocaleString('zh-CN')} 条未知。`;
    el('range-status').textContent = rangeLabel();
    el('plot-heading').textContent = annual.length ? `${yearLabel(annual[0].year)}—${yearLabel(annual[annual.length - 1].year)} · ${annual.length} 个年份` : '年份未知区 / 暂无已知年份';
    el('canvas').dataset.knownCount = String(known.length);
    el('canvas').dataset.yearCount = String(annual.length);
    renderEras(); renderList(); updateYearReadout(); schedulePlot();
  }

  function applyRange(min, max, notify = true) {
    range = { min, max }; unknownOnly = false; page = 0;
    el('from').value = min === null ? '' : String(min);
    el('to').value = max === null ? '' : String(max);
    el('to').setCustomValidity('');
    render();
    if (notify && typeof onRange === 'function') onRange(min, max);
  }

  function applyUnknown(notify = true) {
    range = { min: null, max: null }; unknownOnly = true; page = 0;
    el('from').value = el('to').value = '';
    el('to').setCustomValidity('');
    render();
    if (notify && typeof onUnknownYear === 'function') onUnknownYear();
  }

  function selectFocusYear(index, scroll = true) {
    if (!annual.length) return;
    focusYear = annual[Math.max(0, Math.min(annual.length - 1, index))].year;
    hoverYear = null; updateYearReadout(); drawPlot();
    if (scroll) {
      const position = annual.findIndex(item => item.year === focusYear);
      const viewport = el('plot-scroll');
      const x = GRAPH_PADDING + (position + 0.5) * (graphWidth - GRAPH_PADDING * 2) / annual.length;
      if (x < viewport.scrollLeft + 30 || x > viewport.scrollLeft + viewport.clientWidth - 30) viewport.scrollTo({ left: Math.max(0, x - viewport.clientWidth / 2), behavior: reducedMotion() ? 'auto' : 'smooth' });
    }
  }

  function indexAt(event) {
    if (!annual.length) return -1;
    const rectangle = el('canvas').getBoundingClientRect();
    const x = event.clientX - rectangle.left;
    if (x < GRAPH_PADDING || x > graphWidth - GRAPH_PADDING) return -1;
    return Math.max(0, Math.min(annual.length - 1, Math.floor((x - GRAPH_PADDING) / (graphWidth - GRAPH_PADDING * 2) * annual.length)));
  }

  function handleSubmit(event) {
    event.preventDefault(); el('to').setCustomValidity('');
    const fromText = el('from').value.trim(), toText = el('to').value.trim();
    const min = fromText === '' ? null : numberOrNull(fromText), max = toText === '' ? null : numberOrNull(toText);
    if ((fromText && min === null) || (toText && max === null)) el('to').setCustomValidity('请输入整数年份，或留空');
    else if (min !== null && max !== null && min > max) el('to').setCustomValidity('结束年份不能早于开始年份');
    if (el('range-form').reportValidity()) applyRange(min, max);
  }

  function handleClick(event) {
    const button = event.target.closest?.('button');
    if (!button || !root.contains(button) || button.disabled) return;
    const { work, era, action: name } = button.dataset;
    if (work) { selectedId = work; renderList(); if (typeof onWork === 'function') onWork(work); }
    else if (era) { const period = ERAS.find(item => item.id === era); applyRange(period.min, period.max); }
    else if (name === 'clear-range') applyRange(null, null);
    else if (name === 'unknown-year') applyUnknown();
    else if (name === 'select-year' && focusYear !== null) applyRange(focusYear, focusYear);
    else if (name === 'previous-year' || name === 'next-year') selectFocusYear(annual.findIndex(item => item.year === focusYear) + (name === 'previous-year' ? -1 : 1));
    else if (name === 'scroll-left' || name === 'scroll-right') el('plot-scroll').scrollBy({ left: (name === 'scroll-left' ? -1 : 1) * 320, behavior: reducedMotion() ? 'auto' : 'smooth' });
    else if (name.endsWith('-page')) {
      const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
      page = name === 'first-page' ? 0 : name === 'last-page' ? totalPages - 1 : page + (name === 'previous-page' ? -1 : 1);
      renderList(); el('list').querySelector('button')?.focus();
    }
  }

  function handleCanvasClick(event) { const index = indexAt(event); if (index >= 0) { selectFocusYear(index, false); applyRange(focusYear, focusYear); } }
  function handlePointerMove(event) { const index = indexAt(event); const year = index >= 0 ? annual[index].year : null; if (year !== hoverYear) { hoverYear = year; updateYearReadout(); schedulePlot(); } }
  function handlePointerLeave() { hoverYear = null; updateYearReadout(); schedulePlot(); }
  function handleKeydown(event) {
    const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'Enter', ' '];
    if (event.target !== el('canvas') || !annual.length || !keys.includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Enter' || event.key === ' ') { applyRange(focusYear, focusYear); return; }
    const current = annual.findIndex(item => item.year === focusYear);
    selectFocusYear(event.key === 'Home' ? 0 : event.key === 'End' ? annual.length - 1 : current + (['ArrowLeft', 'ArrowDown'].includes(event.key) ? -1 : 1));
  }
  function handleRangeInput() { el('to').setCustomValidity(''); }
  el('range-form').addEventListener('submit', handleSubmit);
  el('range-form').addEventListener('input', handleRangeInput);
  root.addEventListener('click', handleClick);
  root.addEventListener('keydown', handleKeydown);
  el('canvas').addEventListener('click', handleCanvasClick);
  el('canvas').addEventListener('pointermove', handlePointerMove);
  el('canvas').addEventListener('pointerleave', handlePointerLeave);
  const resizeObserver = view?.ResizeObserver ? new view.ResizeObserver(schedulePlot) : null;
  resizeObserver?.observe(el('plot-scroll'));
  if (!resizeObserver) view?.addEventListener('resize', schedulePlot);
  render();
  return {
    update(nextWorks, context = {}) { if (!destroyed) { source = prepareWorks(nextWorks); contextWorks = context.works ?? nextWorks; scopeLabel = context.label || '全部记录'; render(); } },
    setRange(min, max, { silent = true } = {}) {
      if (destroyed) return;
      const from = min == null ? null : numberOrNull(min), to = max == null ? null : numberOrNull(max);
      if ((min != null && from === null) || (max != null && to === null) || (from !== null && to !== null && from > to)) throw new RangeError('Invalid chronology range');
      applyRange(from, to, !silent);
    },
    clearRange({ silent = true } = {}) { if (!destroyed) applyRange(null, null, !silent); },
    setUnknown({ silent = true } = {}) { if (!destroyed) applyUnknown(!silent); },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      if (frame !== null) { if (view?.cancelAnimationFrame) view.cancelAnimationFrame(frame); else clearTimeout(frame); }
      resizeObserver?.disconnect();
      view?.removeEventListener('resize', schedulePlot);
      el('range-form').removeEventListener('submit', handleSubmit);
      el('range-form').removeEventListener('input', handleRangeInput);
      root.removeEventListener('click', handleClick);
      root.removeEventListener('keydown', handleKeydown);
      el('canvas').removeEventListener('click', handleCanvasClick);
      el('canvas').removeEventListener('pointermove', handlePointerMove);
      el('canvas').removeEventListener('pointerleave', handlePointerLeave);
      root.remove();
    }
  };
}
