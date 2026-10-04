const PAGE_SIZE = 50;
let instanceCounter = 0;
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const normalize = value => String(value ?? '').normalize('NFKC').toLocaleLowerCase().replace(/\s+/g, ' ').trim();
const finiteYear = value => typeof value === 'number' && Number.isFinite(value) && Number.isInteger(value) ? value : null;
const textArray = value => Array.isArray(value) ? value.filter(item => typeof item === 'string' && item.trim()).map(item => item.trim()) : [];
const labelsOf = value => Array.isArray(value) ? [...new Set(value.map(item => typeof item === 'string' ? item : item && typeof item === 'object' ? item.label ?? item.name ?? item.value ?? item.id : '').filter(item => typeof item === 'string' && item.trim()).map(item => item.trim()))] : [];
const uniqueText = values => [...new Set(values.filter(value => typeof value === 'string' && value.trim()).map(value => value.trim()))];
const displayValue = value => value == null || value === '' ? '未提供' : typeof value === 'string' ? value : JSON.stringify(value);
const rawJSON = value => { try { return JSON.stringify(value, null, 2); } catch { return '原始对象无法序列化；请打开来源词条查看。'; } };
const UNCLASSIFIED = '__unclassified__';
const countOf = (object, keys) => {
  for (const key of keys) {
    const value = object?.[key];
    if (value !== '' && value !== null && value !== undefined && Number.isSafeInteger(Number(value)) && Number(value) >= 0) return Number(value);
  }
  return null;
};
const safeURL = value => {
  try { const url = new URL(String(value)); return ['https:', 'http:'].includes(url.protocol) ? url.href : ''; } catch { return ''; }
};
const number = value => Number(value).toLocaleString('zh-CN');
const yearLabel = year => year === null ? '年份未知' : year < 0 ? `公元前 ${Math.abs(year)} 年（待核）` : `${year} 年（待核）`;
const decadeOf = year => year === null ? 'unknown' : year < 1800 ? 'before1800' : String(Math.floor(year / 10) * 10);
const sourceLink = (url, label = '打开来源书目 ↗') => {
  const clean = safeURL(url);
  return clean ? `<a href="${escapeHTML(clean)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)}</a>` : '<span class="bibliography-unavailable">来源链接未知</span>';
};

function prepareRecords(input) {
  return (Array.isArray(input) ? input : []).filter(item => item && typeof item === 'object').map((item, index) => {
    const title = item.title_missing === true ? '标题未知' : typeof item.title === 'string' && item.title.trim() ? item.title.trim() : '标题未知';
    const authors = textArray(item.authors);
    const titleStatements = (Array.isArray(item.title_statements) ? item.title_statements : []).map(statement => typeof statement === 'string' ? { value: statement, language: null } : statement && typeof statement === 'object' ? { ...statement, value: statement.value ?? statement.text ?? statement.title ?? '' } : null).filter(statement => statement && typeof statement.value === 'string' && statement.value.trim());
    const titleVariants = uniqueText([title, item.title_zh, item.title_en, item.title_original, ...textArray(item.title_aliases), ...titleStatements.map(statement => statement.value)]);
    const authorVariants = uniqueText([...authors, ...textArray(item.author_names_en), ...textArray(item.author_names_zh), ...(Array.isArray(item.author_entities) ? item.author_entities.flatMap(entity => [entity?.name, entity?.label_en, entity?.label_zh]) : [])]);
    const subjects = uniqueText([...labelsOf(item.subjects), ...labelsOf(item.source_subject)]);
    const types = labelsOf(item.source_types), languages = labelsOf(item.language_statements);
    const topicCandidates = (Array.isArray(item.topic_candidates) ? item.topic_candidates : []).filter(candidate => candidate && typeof candidate === 'object' && typeof candidate.topic === 'string' && candidate.topic.trim()).map(candidate => ({ ...candidate, topic: candidate.topic.trim() }));
    const titleText = normalize(title), authorText = normalize(authorVariants.join(' '));
    return { id: String(item.id ?? index), key: index, title, authors, first_year: finiteYear(item.first_year), source_url: safeURL(item.source_url), subjects, types, languages, topicCandidates, topicLabels: uniqueText(topicCandidates.map(candidate => candidate.topic)), titleStatements, titleVariants, publicationDates: Array.isArray(item.publication_dates) ? item.publication_dates : [], edition_count: countOf(item, ['edition_count']), titleText, authorText, searchText: `${normalize(titleVariants.join(' '))}\n${authorText}`, raw: item };
  });
}

function matchesRecord(record, filters) {
  const contains = (values, selected) => !selected || (selected === UNCLASSIFIED ? values.length === 0 : values.includes(selected));
  return (filters.decade === 'all' || decadeOf(record.first_year) === filters.decade)
    && (!filters.authorQuery || record.authorText.includes(filters.authorQuery))
    && filters.query.split(' ').filter(Boolean).every(token => record.searchText.includes(token))
    && contains(record.subjects, filters.genre) && contains(record.types, filters.type)
    && contains(record.languages, filters.language) && contains(record.topicLabels, filters.topic);
}

const labelsHTML = (labels, empty = '待分类') => labels.length ? labels.map(label => `<span>${escapeHTML(label)}</span>`).join('') : `<span class="bibliography-unclassified">${empty}</span>`;
function classificationsHTML(record) {
  return `<div class="bibliography-classification-groups"><div><strong>来源分支 / genre</strong><div class="bibliography-subjects">${labelsHTML(record.subjects)}</div></div><div><strong>来源文本形态 / P31</strong><div class="bibliography-subjects">${labelsHTML(record.types)}</div></div><div><strong>来源语言声明 / P407</strong><div class="bibliography-subjects">${labelsHTML(record.languages)}</div></div><div><strong>候选底层议题</strong><div class="bibliography-subjects">${labelsHTML(record.topicLabels)}</div></div></div>`;
}

function prepareCurated(input) {
  const lookup = new Map();
  for (const work of Array.isArray(input) ? input : []) {
    if (!work || work.id === null || work.id === undefined) continue;
    const titles = [work.title_zh, work.title_original, work.title].filter(title => typeof title === 'string');
    for (const title of titles.flatMap(title => [title, ...title.split(' / ')])) {
      const key = normalize(title);
      if (!key) continue;
      if (!lookup.has(key)) lookup.set(key, []);
      const matches = lookup.get(key);
      if (!matches.some(match => match.id === work.id)) matches.push(work);
    }
  }
  return lookup;
}

/**
 * Independent candidate-bibliography browser. Records are external metadata,
 * never promoted to researched works. Null/undefined records mean loading;
 * an empty array means a successfully loaded, empty result.
 * Callback follows the main catalog convention: onWork(curatedId).
 * Metadata: coverage, source_total, fetched_count, excluded_count, sources.
 * Facets preserve direct source labels; no genre-ancestor membership is inferred.
 * setFacet accepts genre, shape/type, language or topic; null/empty clears one axis.
 */
export function mountBibliography(container, { records = null, metadata = {}, curatedWorks = [], onWork = () => {} } = {}) {
  if (!container || typeof container.appendChild !== 'function') throw new TypeError('mountBibliography requires a container element');
  const document = container.ownerDocument, view = document.defaultView;
  const uid = `bibliography-${++instanceCounter}`;
  const root = document.createElement('section');
  root.className = 'bibliography';
  root.setAttribute('aria-labelledby', `${uid}-heading`);
  root.innerHTML = `
    <header class="bibliography-header">
      <div><span class="bibliography-kicker">BIBLIOGRAPHIC EXPLORER</span><h2 id="${uid}-heading">沿着书目继续探索</h2><p>公开主题索引中的候选书目。来源分支、文本形态与语言声明原样保留；候选分类不等于逐条人工核查，也不自动确认作品为科幻小说。</p></div>
      <div class="bibliography-readout"><strong data-role="count">—</strong><span>已载入候选书目</span></div>
    </header>
    <p class="bibliography-coverage" data-role="coverage"></p>
    <form class="bibliography-controls" data-role="form" aria-label="筛选候选书目">
      <label class="bibliography-search" for="${uid}-search">标题或作者<input type="search" id="${uid}-search" data-role="search" placeholder="搜索标题、作者姓名" autocomplete="off" maxlength="300"></label>
      <label for="${uid}-author">作者筛选<input type="search" id="${uid}-author" data-role="author" placeholder="包含作者姓名" autocomplete="off" maxlength="200"></label>
      <label for="${uid}-decade">来源所记发表年代<select id="${uid}-decade" data-role="decade"><option value="all">全部年代（含不详）</option><option value="unknown">年份不详</option></select></label>
      <label for="${uid}-sort">排列方式<select id="${uid}-sort" data-role="sort"><option value="year-asc">年份由早到晚</option><option value="year-desc">年份由晚到早</option><option value="title-asc">标题 A → Z</option><option value="title-desc">标题 Z → A</option></select></label>
      <label for="${uid}-genre">来源分支 / genre<select id="${uid}-genre" data-role="genre"><option value="">全部来源分支</option></select></label>
      <label for="${uid}-type">来源文本形态<select id="${uid}-type" data-role="type"><option value="">全部来源形态</option></select></label>
      <label for="${uid}-language">来源语言声明<select id="${uid}-language" data-role="language"><option value="">全部语言声明</option></select></label>
      <label for="${uid}-topic">候选底层议题<select id="${uid}-topic" data-role="topic"><option value="">全部候选议题</option></select></label>
      <button type="button" data-action="reset">清除筛选</button>
      <p class="bibliography-year-help">按来源所记首版年筛选，年份未逐条核查；它不等同于已确认的初刊年，也不是故事发生时间。按年份排序时，未知年份排在末尾。</p>
      <p class="bibliography-classification-help">各筛选条件取交集。来源 genre 与类型声明按原标签筛选，不合并细分分支；语言声明不等于已核原语。候选议题保留依据与置信声明，缺失项显示“待分类”。</p>
    </form>
    <div class="bibliography-result-bar"><p data-role="status" role="status" aria-live="polite" aria-atomic="true">正在等待书目数据…</p><span>每页 50 条</span></div>
    <div class="bibliography-column-guide" aria-hidden="true"><span>书目 / 作者</span><span>来源年份</span><span>研究状态</span><span>资料入口</span></div>
    <ol class="bibliography-list" data-role="list" aria-label="候选书目列表"></ol>
    <nav class="bibliography-pagination" aria-label="书目分页" data-role="pagination" hidden>
      <button type="button" data-action="first" aria-label="第一页">首页</button><button type="button" data-action="previous">上一页</button>
      <label for="${uid}-page">第<input id="${uid}-page" data-role="page" type="number" min="1" step="1" inputmode="numeric" aria-label="跳转到页码">页 / <span data-role="pages">1</span></label>
      <button type="button" data-action="jump">跳转</button><button type="button" data-action="next">下一页</button><button type="button" data-action="last" aria-label="最后一页">末页</button>
    </nav>
    <details class="bibliography-metadata"><summary>来源覆盖与导入统计</summary><div data-role="metadata"></div></details>
    <dialog class="bibliography-dialog" data-role="dialog" aria-labelledby="${uid}-detail-title"><button class="bibliography-close" type="button" data-action="close" aria-label="关闭书目详情">关闭 ×</button><div data-role="detail"></div></dialog>`;
  container.appendChild(root);
  const el = role => root.querySelector(`[data-role="${role}"]`);
  const curated = prepareCurated(curatedWorks);
  const collator = new Intl.Collator('zh-CN', { numeric: true, sensitivity: 'base' });
  let source = [], info = {}, loaded = false, filtered = [], page = 1, destroyed = false, debounce = null, opener = null;
  let query = '', authorQuery = '', decade = 'all', order = 'year-asc', sortedCache = new Map();
  let facets = { genre: '', type: '', language: '', topic: '' };
  let detailTicket = 0, dataRevision = 0;
  const shardCache = new Map(), completeCache = new Map(), requests = new Set();

  function sortedRecords() {
    if (sortedCache.has(order)) return sortedCache.get(order);
    const sorted = source.slice().sort((a, b) => {
      if (order.startsWith('year-')) {
        if (a.first_year === null && b.first_year !== null) return 1;
        if (b.first_year === null && a.first_year !== null) return -1;
        if (a.first_year !== b.first_year) return (a.first_year - b.first_year) * (order === 'year-desc' ? -1 : 1);
      }
      const compare = collator.compare(a.title, b.title) * (order === 'title-desc' ? -1 : 1);
      return compare || a.key - b.key;
    });
    sortedCache.set(order, sorted);
    return sorted;
  }

  function renderMetadata() {
    const sourceTotal = countOf(info, ['source_total', 'source_total_count', 'total_count', 'total']);
    const fetched = countOf(info, ['fetched_count', 'fetch_count', 'fetched', 'raw_count']);
    const excluded = countOf(info, ['excluded_count', 'excluded', 'filtered_out_count']);
    const display = value => value === null ? '未知' : number(value);
    const links = [];
    const sources = Array.isArray(info.sources) ? info.sources : info.source && typeof info.source === 'object' ? [info.source] : [];
    for (const item of sources) {
      if (typeof item === 'string') links.push(sourceLink(item, item));
      else if (item && typeof item === 'object') links.push(sourceLink(item.url ?? item.source_url, item.name ?? item.title ?? '来源网站'));
    }
    if (!links.length && info.source_url) links.push(sourceLink(info.source_url, info.source_name ?? '来源网站'));
    el('metadata').innerHTML = `<dl class="bibliography-stats"><div><dt>来源返回总量</dt><dd>${display(sourceTotal)}</dd></div><div><dt>实际抓取计数</dt><dd>${display(fetched)}</dd></div><div><dt>导入时排除计数</dt><dd>${display(excluded)}</dd></div><div><dt>本页实际载入</dt><dd>${loaded ? number(source.length) : '加载中'}</dd></div></dl><p>上述统计属于这次来源查询与导入，不是全球科幻作品总量。不同主题索引可能重叠；未提供的统计显示未知。</p>${info.classification_note ? `<p>${escapeHTML(info.classification_note)}</p>` : ''}${info.note || info.notes ? `<p>${escapeHTML(Array.isArray(info.notes) ? info.notes.join('；') : info.note ?? info.notes)}</p>` : ''}<div class="bibliography-source-links">${links.length ? links.join('') : '<span>来源网址未知</span>'}</div>`;
  }

  function renderHeader() {
    el('count').textContent = loaded ? number(source.length) : '—';
    el('coverage').textContent = typeof info.coverage === 'string' && info.coverage.trim() ? info.coverage : '覆盖范围：当前导入的外部候选索引；来源覆盖尚未提供，不能视为穷尽书目。';
    const decades = [...new Set(source.map(record => decadeOf(record.first_year)).filter(value => !['unknown', 'before1800'].includes(value)))].sort((a, b) => Number(a) - Number(b));
    el('decade').innerHTML = `<option value="all">全部年代（含不详）</option>${source.some(record => record.first_year !== null && record.first_year < 1800) ? '<option value="before1800">1800 年以前</option>' : ''}${decades.map(value => `<option value="${value}">${value}—${Number(value) + 9}</option>`).join('')}<option value="unknown">年份不详</option>`;
    if (![...el('decade').options].some(option => option.value === decade)) decade = 'all';
    el('decade').value = decade;
    const facetFields = { genre: 'subjects', type: 'types', language: 'languages', topic: 'topicLabels' };
    const facetTitles = { genre: '全部来源分支', type: '全部来源形态', language: '全部语言声明', topic: '全部候选议题' };
    for (const [key, field] of Object.entries(facetFields)) {
      const counts = new Map();
      source.forEach(record => record[field].forEach(label => counts.set(label, (counts.get(label) || 0) + 1)));
      const missing = source.filter(record => record[field].length === 0).length;
      const unmatched = facets[key] && facets[key] !== UNCLASSIFIED && !counts.has(facets[key]) ? `<option value="${escapeHTML(facets[key])}">${escapeHTML(facets[key])}（0 条直接记录）</option>` : '';
      el(key).innerHTML = `<option value="">${facetTitles[key]}</option><option value="${UNCLASSIFIED}">待分类（${number(missing)}）</option>${[...counts.keys()].sort(collator.compare).map(label => `<option value="${escapeHTML(label)}">${escapeHTML(label)}（${number(counts.get(label))}）</option>`).join('')}${unmatched}`;
      el(key).value = facets[key];
    }
    for (const control of el('form').querySelectorAll('input, select, button')) control.disabled = !loaded;
    renderMetadata();
  }

  function renderPage() {
    if (destroyed) return;
    const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    page = Math.max(1, Math.min(page, pages));
    const start = (page - 1) * PAGE_SIZE, rows = filtered.slice(start, start + PAGE_SIZE);
    el('status').textContent = !loaded ? '正在等待书目数据…' : filtered.length ? `符合筛选 ${number(filtered.length)} 条 · 显示 ${number(start + 1)}—${number(start + rows.length)} 条` : source.length ? '没有符合筛选的候选书目。可清除筛选或尝试其他标题、作者。' : '书目已加载，本次导入没有候选记录。';
    el('list').setAttribute('aria-busy', String(!loaded));
    el('list').start = start + 1;
    el('list').innerHTML = rows.length ? rows.map(record => `<li class="bibliography-row"><div class="bibliography-title"><button type="button" data-record="${record.key}" aria-label="查看书目详情：${escapeHTML(record.title)}">${escapeHTML(record.title)}</button><span>${escapeHTML(record.authors.join(' / ') || '作者未知')}</span></div><span class="bibliography-year">${escapeHTML(yearLabel(record.first_year))}</span><div class="bibliography-state"><span>书目待核</span><small>来源分类候选 · 原语未核</small></div><div class="bibliography-row-links"><button type="button" data-record="${record.key}">书目详情</button>${sourceLink(record.source_url, '来源 ↗')}</div><details class="bibliography-row-classification"><summary>展开全部来源分类与候选议题 <span>${record.subjects.length} 分支 · ${record.types.length} 形态 · ${record.languages.length} 语言声明 · ${record.topicLabels.length} 议题</span></summary>${classificationsHTML(record)}</details></li>`).join('') : `<li class="bibliography-empty">${!loaded ? '<span class="bibliography-loading-mark" aria-hidden="true"></span>书目数据加载后，将在这里按每页 50 条展示。' : '这里还没有可展示的候选书目。'}</li>`;
    el('pagination').hidden = !loaded || !filtered.length;
    el('page').value = String(page); el('page').max = String(pages); el('page').setCustomValidity('');
    el('pages').textContent = number(pages);
    root.querySelector('[data-action="first"]').disabled = page <= 1;
    root.querySelector('[data-action="previous"]').disabled = page <= 1;
    root.querySelector('[data-action="next"]').disabled = page >= pages;
    root.querySelector('[data-action="last"]').disabled = page >= pages;
  }

  function applyFilters(resetPage = true) {
    if (destroyed) return;
    filtered = sortedRecords().filter(record => matchesRecord(record, { query, authorQuery, decade, ...facets }));
    if (resetPage) page = 1;
    renderPage();
  }

  function readFilters() {
    query = normalize(el('search').value); authorQuery = normalize(el('author').value);
    decade = el('decade').value; order = el('sort').value;
    for (const key of Object.keys(facets)) facets[key] = el(key).value;
    applyFilters();
  }

  function closeDetail() {
    detailTicket++;
    const dialog = el('dialog');
    if (typeof dialog.close === 'function' && dialog.open) dialog.close();
    else dialog.removeAttribute('open');
    opener?.focus?.();
  }

  function renderCompleteDetail(record) {
    const matches = [...new Map(record.titleVariants.flatMap(title => curated.get(normalize(title)) || []).map(work => [work.id, work])).values()];
    const descriptions = [['中文来源描述', record.raw.description_zh], ['英文来源描述', record.raw.description_en], ['来源描述', record.raw.source_description], ['来源描述字段', record.raw.description]].filter(([, value]) => value != null && value !== '');
    const sources = uniqueText([record.source_url, ...(Array.isArray(record.raw.sources) ? record.raw.sources.map(source => typeof source === 'string' ? source : source?.url ?? source?.source_url ?? '') : [])]);
    const topicDetails = record.topicCandidates.length ? `<ul class="bibliography-topic-candidates">${record.topicCandidates.map(candidate => {
      const basis = Array.isArray(candidate.basis) ? candidate.basis : candidate.basis != null ? [candidate.basis] : [];
      return `<li><strong>${escapeHTML(candidate.topic)}</strong><small>来源所附置信声明：${escapeHTML(displayValue(candidate.confidence))}</small><details><summary>查看全部匹配依据（${basis.length} 条）</summary>${basis.length ? `<ol>${basis.map(entry => typeof entry === 'object' && entry !== null ? `<li><dl><dt>来源字段</dt><dd>${escapeHTML(displayValue(entry.field))}</dd><dt>来源值</dt><dd>${escapeHTML(displayValue(entry.value))}</dd><dt>匹配文本</dt><dd>${escapeHTML(displayValue(entry.matched_text))}</dd><dt>实体编号</dt><dd>${escapeHTML(displayValue(entry.entity_id))}</dd></dl>${entry.source_url ? sourceLink(entry.source_url, '查看这条依据的来源 ↗') : ''}</li>` : `<li>${escapeHTML(displayValue(entry))}</li>`).join('')}</ol>` : '<p>依据未提供，保留待核。</p>'}</details></li>`;
    }).join('')}</ul>` : '<p class="bibliography-unavailable">待分类，来源未提供候选底层议题。</p>';
    el('detail').innerHTML = `
      <span class="bibliography-kicker">书目待核 / EXTERNAL RECORD</span><h3 id="${uid}-detail-title">${escapeHTML(record.title)}</h3>
      <p class="bibliography-detail-author">${escapeHTML(record.authors.join(' / ') || '作者未知')}</p>
      <dl class="bibliography-detail-facts"><div><dt>来源所记最早发表年份</dt><dd>${escapeHTML(yearLabel(record.first_year))}</dd></div><div><dt>原始语种核查状态</dt><dd>未逐条核查；来源语言声明见下方</dd></div><div><dt>文本形态核查状态</dt><dd>未逐条核查；来源类型标签见下方</dd></div><div><dt>来源所记版本数</dt><dd>${record.edition_count === null ? '未知' : number(record.edition_count) + '（待核）'}</dd></div><div><dt>来源记录编号</dt><dd>${escapeHTML(record.id)}</dd></div></dl>
      <p class="bibliography-detail-warning">这是来源书目与候选分类，未逐条人工核查题材、原始语种、初刊和文本内容。来源分支保持细分原标签；候选议题仅展示导入数据所附判断，不替代对小说的全文研究。</p>
      <h4>完整来源分类与语言声明</h4>${classificationsHTML(record)}
      <h4>候选底层议题与依据</h4>${topicDetails}
      <h4>全部发表日期声明 / P577</h4><p class="bibliography-field-note">原样保留来源时间值；01-01 可能是年份精度的占位，不能据此认定准确的出版日。</p>
      ${record.publicationDates.length ? `<ul class="bibliography-statement-list">${record.publicationDates.map(date => `<li>${escapeHTML(displayValue(date))}</li>`).join('')}</ul>` : '<p class="bibliography-unavailable">来源未提供发表日期声明。</p>'}
      <h4>标题声明 / P1476</h4><p class="bibliography-field-note">来源标题与语言标签原样保留；这些声明未独立核验为作品原题。中文、英文实体显示标签也不等同于原题。</p>
      <dl class="bibliography-title-labels"><dt>中文显示标签</dt><dd>${escapeHTML(displayValue(record.raw.title_zh))}</dd><dt>英文显示标签</dt><dd>${escapeHTML(displayValue(record.raw.title_en))}</dd></dl>
      ${record.titleStatements.length ? `<ul class="bibliography-statement-list">${record.titleStatements.map(statement => `<li><strong>${escapeHTML(statement.value)}</strong><small>来源语言标记：${escapeHTML(displayValue(statement.language))}</small></li>`).join('')}</ul>` : '<p class="bibliography-unavailable">来源未提供 P1476 标题声明。</p>'}
      <h4>来源描述</h4>${descriptions.length ? descriptions.map(([label, value]) => `<div class="bibliography-description"><strong>${label}</strong><p>${escapeHTML(displayValue(value))}</p></div>`).join('') : '<p class="bibliography-unavailable">来源未提供描述。</p>'}
      <div class="bibliography-detail-source">${sources.length ? sources.map(url => sourceLink(url)).join('') : sourceLink('')}</div>
      ${matches.length ? `<div class="bibliography-curated"><h4>已研究目录中的同名记录</h4><p>按来源标题与显示标签匹配；同名不保证为同一作品，请核对作者与版本。</p>${matches.map(work => `<button type="button" data-curated="${escapeHTML(work.id)}">打开已研究详情：${escapeHTML(work.title_zh ?? work.title ?? work.title_original)} · ${escapeHTML(work.author ?? '')}</button>`).join('')}</div>` : ''}
      <details class="bibliography-raw-fields"><summary>完整来源字段 / 结构化记录</summary><p>完整保留导入对象，包含未单独展示的别名、分类层级、系列与前后作关联；字段缺失仍属于未知。</p><pre>${escapeHTML(rawJSON(record.raw))}</pre></details>`;
  }

  function detailURL(record) {
    const relative = record.raw.detail_url;
    if (typeof relative !== 'string' || !/^\.\/assets\/bibliography-details\/[A-Za-z0-9_-]+\.json$/.test(relative)) throw new Error('详情路径未通过校验；只读取同源 bibliography-details JSON 分片。');
    const url = new URL(relative, document.baseURI || view?.location?.href);
    if (url.origin !== view?.location?.origin) throw new Error('详情来源与当前网站不同，已停止载入。');
    return url;
  }

  async function loadComplete(record) {
    const url = detailURL(record), key = `${url.href}#${record.id}`, revision = dataRevision;
    if (completeCache.has(key)) return completeCache.get(key);
    let pending = shardCache.get(url.href);
    if (!pending) {
      const controller = typeof AbortController === 'function' ? new AbortController() : null;
      if (controller) requests.add(controller);
      const fetcher = typeof view?.fetch === 'function' ? view.fetch.bind(view) : globalThis.fetch;
      pending = (async () => {
        try {
          const response = await fetcher(url.href, { credentials: 'same-origin', ...(controller ? { signal: controller.signal } : {}) });
          if (!response.ok) throw new Error(`详情分片载入失败（${response.status}）`);
          const data = await response.json();
          if (!data || !Array.isArray(data.records)) throw new Error('详情分片缺少 records 数组。');
          const entries = new Map();
          for (const item of data.records) {
            if (!item || typeof item.id !== 'string' || entries.has(item.id)) throw new Error('详情分片含无效或重复记录编号。');
            entries.set(item.id, item);
          }
          return entries;
        } finally { if (controller) requests.delete(controller); }
      })();
      shardCache.set(url.href, pending);
    }
    try {
      const entries = await pending, item = entries.get(record.id);
      if (!item) throw new Error('详情分片未包含当前书目记录。');
      const complete = prepareRecords([item])[0];
      if (!destroyed && revision === dataRevision) completeCache.set(key, complete);
      return complete;
    } catch (error) {
      if (shardCache.get(url.href) === pending) shardCache.delete(url.href);
      throw error;
    }
  }

  function renderIndexDetail(record, error = null) {
    el('detail').innerHTML = `<span class="bibliography-kicker">基础检索索引 / BASIC INDEX</span><h3 id="${uid}-detail-title">${escapeHTML(record.title)}</h3><p class="bibliography-detail-author">${escapeHTML(record.authors.join(' / ') || '作者未知')}</p><p class="bibliography-detail-warning">${error ? '完整来源字段未载入。当前只展示基础检索索引，不能据此判断来源缺少日期、描述、依据或关联数据。' : '正在载入完整来源字段…基础索引仍可查看；日期、标题声明、描述与关联字段将在详情载入后展示。'}</p>${error ? `<p class="bibliography-field-note">${escapeHTML(error.message)}</p><button type="button" data-record="${record.key}">重试载入完整详情</button>` : '<p class="bibliography-field-note" role="status">完整详情载入中…</p>'}<h4>索引保留的来源分类</h4>${classificationsHTML(record)}<div class="bibliography-detail-source">${sourceLink(record.source_url)}</div>`;
  }

  async function openDetail(record, button) {
    opener = button;
    const ticket = ++detailTicket, dialog = el('dialog');
    if (record.raw.detail_url != null) renderIndexDetail(record);
    else renderCompleteDetail(record);
    if (typeof dialog.showModal === 'function') { if (!dialog.open) dialog.showModal(); }
    else dialog.setAttribute('open', '');
    root.querySelector('[data-action="close"]').focus();
    if (record.raw.detail_url == null) return;
    try {
      const complete = await loadComplete(record);
      if (destroyed || ticket !== detailTicket || !dialog.open) return;
      renderCompleteDetail(complete);
    } catch (error) {
      if (destroyed || ticket !== detailTicket || !dialog.open) return;
      renderIndexDetail(record, error);
    }
  }

  function handleInput(event) {
    if (!['search', 'author'].includes(event.target.dataset.role)) return;
    view?.clearTimeout(debounce); debounce = view?.setTimeout(readFilters, 160) ?? setTimeout(readFilters, 160);
  }
  function handleChange(event) {
    if (['decade', 'sort', ...Object.keys(facets)].includes(event.target.dataset.role)) { view?.clearTimeout(debounce); readFilters(); }
  }
  function jumpToPage() {
    const field = el('page'), value = Number(field.value);
    field.setCustomValidity(Number.isInteger(value) && value >= 1 && value <= Number(field.max) ? '' : `请输入 1 至 ${field.max} 之间的页码`);
    if (field.reportValidity()) { page = value; renderPage(); }
  }
  function handleKeydown(event) {
    if (event.key === 'Enter' && event.target === el('page')) { event.preventDefault(); jumpToPage(); }
    if (event.key === 'Escape' && el('dialog').open) closeDetail();
  }
  function handleSubmit(event) { if (event.target === el('form')) { event.preventDefault(); view?.clearTimeout(debounce); readFilters(); } }
  function handleClick(event) {
    const button = event.target.closest('button');
    if (!button || !root.contains(button)) return;
    if (button.dataset.record !== undefined) { const record = source[Number(button.dataset.record)]; if (record) openDetail(record, button); return; }
    if (button.dataset.curated !== undefined) { closeDetail(); if (typeof onWork === 'function') onWork(button.dataset.curated); return; }
    const action = button.dataset.action;
    if (action === 'close') closeDetail();
    else if (action === 'reset') { el('search').value = ''; el('author').value = ''; el('decade').value = 'all'; el('sort').value = 'year-asc'; for (const key of Object.keys(facets)) el(key).value = ''; view?.clearTimeout(debounce); readFilters(); }
    else if (action === 'jump') jumpToPage();
    else if (['first', 'previous', 'next', 'last'].includes(action)) { page = action === 'first' ? 1 : action === 'last' ? Math.ceil(filtered.length / PAGE_SIZE) : page + (action === 'next' ? 1 : -1); renderPage(); }
  }
  const handleDialogClick = event => { if (event.target === el('dialog')) closeDetail(); };
  const handleCancel = event => { event.preventDefault(); closeDetail(); };
  root.addEventListener('input', handleInput); root.addEventListener('change', handleChange); root.addEventListener('click', handleClick); root.addEventListener('submit', handleSubmit); root.addEventListener('keydown', handleKeydown);
  el('dialog').addEventListener('click', handleDialogClick); el('dialog').addEventListener('cancel', handleCancel);

  function update(nextRecords, nextMetadata = info) {
    if (destroyed) return;
    view?.clearTimeout(debounce); closeDetail();
    dataRevision++;
    requests.forEach(controller => controller.abort()); requests.clear(); shardCache.clear(); completeCache.clear();
    query = normalize(el('search').value); authorQuery = normalize(el('author').value);
    loaded = Array.isArray(nextRecords); source = prepareRecords(nextRecords);
    info = nextMetadata && typeof nextMetadata === 'object' ? nextMetadata : {};
    sortedCache = new Map(); page = 1;
    renderHeader(); applyFilters();
  }
  update(records, metadata);
  return {
    update,
    setFacet(key, value) {
      if (destroyed) return;
      const field = key === 'shape' ? 'type' : key;
      if (!Object.hasOwn(facets, field)) throw new TypeError(`Unknown bibliography facet: ${key}`);
      view?.clearTimeout(debounce);
      facets[field] = value == null ? '' : String(value).trim();
      renderHeader();
      readFilters();
    },
    destroy() {
      if (destroyed) return;
      view?.clearTimeout(debounce); closeDetail(); destroyed = true;
      detailTicket++;
      requests.forEach(controller => controller.abort()); requests.clear(); shardCache.clear(); completeCache.clear();
      root.removeEventListener('input', handleInput); root.removeEventListener('change', handleChange); root.removeEventListener('click', handleClick); root.removeEventListener('submit', handleSubmit); root.removeEventListener('keydown', handleKeydown);
      el('dialog').removeEventListener('click', handleDialogClick); el('dialog').removeEventListener('cancel', handleCancel); root.remove();
      source = []; filtered = []; sortedCache.clear();
    }
  };
}
