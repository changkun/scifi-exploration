import {CLASSIFICATION_REGISTRY} from './classification-data.mjs?v=registry22-round93';
export {CLASSIFICATION_REGISTRY};
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const displayBasis = value => esc(String(value ?? '').replaceAll('primary unknown', '空间位置待确认').replaceAll('spatial_primary=unknown', '空间位置待确认'));
const byId = new Map(CLASSIFICATION_REGISTRY.categories.map(category => [category.id, category]));
const reviewByCandidate = new Map((CLASSIFICATION_REGISTRY.discovery_reviews || []).map(review => [review.candidate_id, review]));
const evidenceUpdates = new Map((CLASSIFICATION_REGISTRY.discovery_evidence_updates || []).map(update => [update.candidate_id + ':' + update.work_id, update]));
const byWork = new Map();
for (const category of byId.values()) for (const member of category.members) {
  if (!byWork.has(member.work_id)) byWork.set(member.work_id, []);
  byWork.get(member.work_id).push({...member, id: category.id, axis: category.axis, label: category.label, revision: category.revision});
}
export const classificationLabel = value => value.split('|').map(id => byId.get(id)?.label || id).join(' ∩ ');
export const registeredValues = axis => CLASSIFICATION_REGISTRY.categories.filter(category => category.axis === axis).map(category => category.label);
export function applyClassifications(work) {
  work.classification_assignments = (byWork.get(work.id) || []).map(assignment => ({...assignment}));
  for (const axis of ['topic', 'branch']) {
    const field = axis === 'topic' ? 'topics' : 'branches';
    work[field] = [...new Set([...work[field], ...work.classification_assignments.filter(assignment => assignment.axis === axis).map(assignment => assignment.label)])];
  }
}
export function classificationDetail(work) {
  if (!work.classification_assignments?.length) return '';
  return `<section class="detail-section"><h3>新增分类与跨维度关联</h3><p>研究分类 · 暂定待核。每个入口保留具体依据；不替代原来源标签。</p>${work.classification_assignments.map(assignment => `<article><button class="tag" data-filter="classification" data-value="${esc(assignment.id)}">${esc(assignment.label)} ↗</button><p>${displayBasis(assignment.basis)}</p>${assignment.membership_boundary ? `<p class="issue-scope"><strong>本条适用范围：</strong>${esc(assignment.membership_boundary)}</p>` : ''}<details><summary>这项分类的资料范围</summary><p>${esc(assignment.evidence_scope)}</p>${(assignment.sources || []).map(url => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">支持材料 ↗</a>`).join(' · ')}</details></article>`).join('')}</section>`;
}
function renderDiscoveries(works) {
  const byId = new Map(works.map(work => [work.id, work]));
  const dimensionLabel = candidate => CLASSIFICATION_REGISTRY.axes.find(axis => axis.id === (candidate.dimension || candidate.axis))?.label || candidate.proposed_dimension || candidate.dimension || candidate.axis || '待比较维度';
  const candidates = (CLASSIFICATION_REGISTRY.discovery_candidates || []).filter(candidate => reviewByCandidate.get(candidate.id)?.status !== 'promoted_unverified' && candidate.work_evidence.some(evidence => byId.has(evidence.id)));
  if (!candidates.length) return '';
  return `<details><summary>新发现 · ${candidates.length} 个待比较方向</summary><p>已有具体作品依据，尚未形成正式分类。现有维度也可以继续增加；每项保留提出时的维度、定义边界和资料范围。</p><div class="issue-example-grid">${candidates.map(candidate => `<article><h4>${esc(candidate.proposed_label)}</h4><p class="issue-scope">${esc(dimensionLabel(candidate))} · 发现候选 · 待比较与核对</p><p>${esc(candidate.definition_boundary)}</p>${candidate.work_evidence.filter(evidence => byId.has(evidence.id)).map(evidence => `<button class="tag" data-work="${esc(evidence.id)}">${esc(byId.get(evidence.id).title_zh)} ↗</button><p>${esc(evidence.basis)}</p>${evidence.discovery_source_mode === 'knowledge_dimension_analysis_derivative' ? '<p class="issue-scope">已有分析提炼 · 文学解释待核 · 本轮未重读原链接</p>' : evidence.discovery_source_mode === 'scoped_author_creation_history_without_core_analysis' ? '<p class="issue-scope">作者自传与创作背景 · 目标小说情节待核</p>' : evidence.discovery_source_mode === 'scoped_form_history_without_core_analysis' ? '<p class="issue-scope">媒介与出版史 · 目标情节待核</p>' : ''}<details><summary>这条发现的资料范围</summary><p>${esc(evidence.exact_support_scope)}</p>${evidenceUpdates.has(candidate.id + ':' + evidence.id) ? `<p>${esc(evidenceUpdates.get(candidate.id + ':' + evidence.id).note)}</p>` : ''}${evidence.sources.map(url => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${evidence.discovery_source_mode === 'knowledge_dimension_analysis_derivative' ? '原分析引用（本轮未重读）↗' : evidence.discovery_source_mode === 'scoped_author_creation_history_without_core_analysis' ? '作者自传资料 ↗' : evidence.discovery_source_mode === 'scoped_form_history_without_core_analysis' ? '形式与出版资料 ↗' : '所读材料 ↗'}</a>`).join(' · ')}</details>`).join('')}</article>`).join('')}</div></details>`;
}
export function renderClassifications(works) {
  const covered = works.filter(work => work.classification_assignments?.length).length;
  return `<section class="detail-section"><span class="eyebrow">OPEN CLASSIFICATION / V${CLASSIFICATION_REGISTRY.metadata.version}</span><h3>从作品中生长的新分类</h3><p>所有研究维度均可扩展，也可增加新的维度。当前 ${CLASSIFICATION_REGISTRY.axes.length} 个维度、${CLASSIFICATION_REGISTRY.categories.length} 个暂定入口；当前范围 ${covered.toLocaleString('zh-CN')} 条有人工种子关联，其余尚未按新维度整理。一部作品可跨类，点击不同入口可叠加筛选，旧分类与细分问题保留。</p>${CLASSIFICATION_REGISTRY.axes.map(axis => `<details><summary>${esc(axis.label)} · ${CLASSIFICATION_REGISTRY.categories.filter(category => category.axis === axis.id).length} 个新增入口</summary><p>${esc(axis.definition)}</p><div class="issue-example-grid">${CLASSIFICATION_REGISTRY.categories.filter(category => category.axis === axis.id).map(category => {const members = works.filter(work => work.classification_assignments?.some(assignment => assignment.id === category.id)); return `<article><h4>${esc(category.label)}</h4><p>${esc(category.definition)}</p>${category.boundaries?.length ? `<details><summary>分类边界与细分机制</summary>${category.boundaries.map(boundary => `<p>${esc(boundary)}</p>`).join('')}${(category.retained_subtypes || []).map(subtype => `<p><strong>${esc(subtype.label)}</strong></p>`).join('')}</details>` : ''}<p>${members.length} 条当前记录 · ${esc(category.status)}</p><div class="tag-list">${members.slice(0,4).map(work => `<button class="tag" data-work="${esc(work.id)}">${esc(work.title_zh)}</button>`).join('')}</div><button class="browse-button" data-filter="classification" data-value="${esc(category.id)}">按此分类浏览 →</button></article>`;}).join('')}</div></details>`).join('')}${renderDiscoveries(works)}<p class="issue-scope">这是研究提出的组织方式，不宣称它们都是文学史上已命名的流派。保留版本、定义、相关议题、逐作品依据和撤销空间；分组不提高补全度或核验等级。</p><a href="./assets/classification-registry.json" download>下载可扩展分类与逐作品依据 ↓</a></section>`;
}
