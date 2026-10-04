const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const number = value => Number(value).toLocaleString('zh-CN');
const level = work => work.research ? '已有研究' : work.knowledge ? '知识补充 · 待核' : work.topics.length ? '议题候选' : '基础书目';
export function mountBibliography(container, { onWork = () => {}, onChange = () => {} } = {}) {
  let works = [], all = [], metadata = {}, state = {}, page = 1;
  container.innerHTML = `<div class="section-heading"><div><span class="eyebrow">CANONICAL / BIBLIOGRAPHY</span><h2>全量书目索引</h2></div><p>同一作品集合，同一筛选，同一详情。</p></div><div class="bibliography-metadata"></div><div class="unified-source-facets"><label>来源原始分支<select data-facet="genre"><option value="">所有原始分支</option></select></label><label>来源文本类型<select data-facet="type"><option value="">所有来源类型</option></select></label></div><p class="bibliography-status" role="status"></p><ol class="bibliography-list"></ol><div class="pagination"><button data-page="previous">← 上一页</button><span class="bibliography-pages"></span><label>跳到第 <input class="bibliography-jump" type="number" min="1" value="1" aria-label="书目页码"> 页</label><button data-page="next">下一页 →</button></div>`;
  const q = selector => container.querySelector(selector);
  function facets() {
    for (const [field, values] of [['genre', all.flatMap(w => w.source_subject)], ['type', all.flatMap(w => w.source_types)]]) {
      const options = [...new Map(values.map(v => [v.id, v.label])).entries()].sort((a,b) => a[1].localeCompare(b[1],'zh-CN'));
      q(`[data-facet="${field}"]`).innerHTML = `<option value="">所有${field === 'genre' ? '原始分支' : '来源类型'}</option>` + options.map(([id,label]) => `<option value="${escape(id)}">${escape(label)} · ${id}</option>`).join('');
      q(`[data-facet="${field}"]`).value = state[field] || '';
    }
  }
  function render() {
    const pages = Math.max(1, Math.ceil(works.length / 50)); page = Math.min(page,pages);
    q('.bibliography-status').textContent = `当前筛选 ${number(works.length)} / ${number(all.length)} 条统一记录；全站筛选同步生效。`;
    q('.bibliography-list').start = (page - 1) * 50 + 1;
    q('.bibliography-list').innerHTML = works.slice((page-1)*50,page*50).map(w => `<li class="bibliography-row"><div class="bibliography-title"><button data-entry="${escape(w.id)}">${escape(w.title_zh)}</button><span>${escape(w.author)}</span><small>${escape(w.id)}</small></div><span class="bibliography-year">${escape(w.year_display)}</span><div class="bibliography-state"><span>${level(w)}</span><small>待独立核对 · ${w.completion?.missing_fields.length||0} 个字段待补全</small><small>${w.spatial_primary === 'unknown' ? '空间待分类' : '已有空间导航'} · ${escape(w.duration)}</small></div><div class="bibliography-row-links"><button data-entry="${escape(w.id)}">统一作品详情</button></div><details class="bibliography-row-classification"><summary>全部分支与议题 · ${w.branches.length} 分支 / ${w.topics.length} 议题</summary><p><strong>原始分支：</strong>${escape(w.source_subject.map(s=>s.label).join('、') || '未提供')}</p><p><strong>研究分支：</strong>${escape(w.research?.branches?.join('、') || '待研究')}</p><p><strong>研究议题：</strong>${escape(w.research_topics.join('、') || '待研究')}</p><p><strong>已有知识补充（待核）：</strong>${escape(w.knowledge_topics.join('、')||'未补充')}</p><p><strong>来源规则候选：</strong>${escape(w.topic_candidates.map(t=>t.topic).join('、') || '无候选')}</p></details></li>`).join('') || '<li class="bibliography-empty">当前筛选没有记录，可清除条件继续浏览。</li>';
    q('.bibliography-pages').textContent = `${page} / ${pages}`;
    q('.bibliography-jump').value = page; q('.bibliography-jump').max = pages;
    q('[data-page="previous"]').disabled = page <= 1; q('[data-page="next"]').disabled = page >= pages;
  }
  const click = event => {const button = event.target.closest('button'); if(button?.dataset.entry)onWork(button.dataset.entry);if(button?.dataset.page){page += button.dataset.page === 'next' ? 1 : -1;render();}};
  const change = event => {if(event.target.dataset.facet)onChange({[event.target.dataset.facet]:event.target.value});if(event.target.matches('.bibliography-jump')){page=Math.max(1,Math.min(Math.ceil(works.length/50)||1,Math.trunc(Number(event.target.value))||1));render();}};
  container.addEventListener('click',click); container.addEventListener('change',change);
  return { update(nextWorks, info, filterState, universe) {works=nextWorks;metadata=info||metadata;state=filterState||state;if(universe && universe!==all){all=universe;facets();}else for(const key of ['genre','type'])q(`[data-facet="${key}"]`).value=state[key]||'';page=1;q('.bibliography-metadata').innerHTML=`<p>底库含 ${number(metadata.record_count || 0)} 条 Wikidata 查询记录，加上未能可靠链接到该查询的研究记录。版本、系列与章节保留来源身份；这里的数量不等于全球唯一科幻作品总量。</p>`;render(); }, destroy(){container.removeEventListener('click',click);container.removeEventListener('change',change);container.replaceChildren();} };
}
