import {applyClassifications} from './classifications.mjs?v=registry14';
const unique = values => [...new Set(values.filter(Boolean))];
const labels = values => (values || []).map(value => typeof value === 'string' ? value : value.label || value.id).filter(Boolean);
export const UNKNOWN = '待分类';
export function buildCanonicalUniverse(sourceRecords, researchWorks, spatial, links, completionRecords = []) {
  const source = new Map(sourceRecords.map(record => [record.id, record]));
  const research = new Map(researchWorks.map(record => [record.id, record]));
  const places = new Map((spatial.works || []).map(record => [record.id, record]));
  const aliases = new Map(), enrichment = new Map();
  const supplements = new Map(completionRecords.map(r => [r.id,r]));
  if(supplements.size!==completionRecords.length)throw new Error('补充记录编号重复');
  for (const link of links.links) {
    if (!research.has(link.research_id)) throw new Error('实体链接指向不存在的研究记录');
    if (link.status === 'linked' && !source.has(link.canonical_id)) throw new Error('实体链接指向不存在的来源记录');
    if (enrichment.has(link.canonical_id)) throw new Error('研究记录链接发生未经处理的冲突');
    enrichment.set(link.canonical_id, { work: research.get(link.research_id), link });
    aliases.set(link.research_id, link.canonical_id);
  }
  if (aliases.size !== research.size) throw new Error('实体链接没有覆盖全部研究记录');
  const ids = unique([...source.keys(), ...enrichment.keys()]);
  if(completionRecords.length&&(supplements.size!==ids.length||ids.some(id=>!supplements.has(id))))throw new Error('补全状态未覆盖完整统一底库');
  const works = ids.map(id => {
    const index = source.get(id), layer = enrichment.get(id), detail = layer?.work;
    const originalPlace = detail ? places.get(detail.id) : null;
    const place = originalPlace?.primary === 'abstract' && originalPlace.confidence === '暂定' ? { ...originalPlace, primary: 'unknown', original_primary: originalPlace.primary, confidence: '未知', rationale: '旧版抽象/未定标签中的空间证据不足，现独立保留为待分类。原理由：'+originalPlace.rationale } : originalPlace;
    const sourceTopics = (index?.topic_candidates || []).map(candidate => candidate.topic);
    const topics = unique([...(detail?.topics || []), ...sourceTopics]);
    const sourceGenres = labels(index?.source_subject);
    const branches = unique([...sourceGenres, ...(detail?.branches || [])]);
    const languages = unique([...labels(index?.language_statements), ...(detail ? [detail.language_tradition.split(/[·／]/)[0]] : [])]);
    if (!languages.length) languages.push('语言未知');
    const forms = unique([...(detail ? [detail.form] : []), ...labels(index?.source_types)]);
    if (!forms.length) forms.push('形态未知');
    const year = detail?.sort_year ?? detail?.first_year ?? index?.first_year ?? null;
    const title = detail?.title_zh || index?.title || '标题未知';
    const w = {
      id, research_id: detail?.id || null, source_id: index?.id || null,
      title_zh: title, title_original: detail?.title_original || '原题待核（见来源标题声明）',
      author: detail?.author || index?.authors?.join(' / ') || '作者未知',
      first_year: detail?.first_year ?? index?.first_year ?? null, sort_year: year,
      source_first_year: index?.first_year ?? null,
      year_display: detail?.year_display || (year == null ? '年份未知' : `${year}（来源待核）`),
      year_note: detail?.year_note || '来源 P577 最早年份候选；初刊、版本与日期精度尚待核查。',
      language_tradition: detail?.language_tradition || languages.join(' / ') || '语言未知', languages, forms,
      form: detail?.form || forms.join(' / ') || '形态未知',
      topics, research_topics: detail?.topics || [], topic_candidates: index?.topic_candidates || [],
      branches, source_subject: index?.source_subject || [], source_types: index?.source_types || [],
      duration: detail?.duration || UNKNOWN, science_class: detail?.science_class || UNKNOWN,
      science_note: detail?.science_note || '尚未进行科学前提分析。',
      story_era: detail?.story_era || '故事时代未知', reach: detail?.reach || '最大时间视野未知',
      issue: detail?.issue || (topics.length ? `议题分析尚未补充。来源标签给出分类候选：${topics.join('、')}。` : '议题分析尚未补充'),
      issue_facets: [], knowledge_identity_notes: [], issue_analysis_status: detail?.issue ? 'research_interpreted' : 'missing',
      series_name: detail?.series_name || '',
      inclusion_status: detail?.inclusion_status || '来源科幻文学候选',
      research_level: detail ? 'researched' : topics.length ? 'candidate' : 'bibliographic',
      spatial_primary: place?.primary || 'unknown', spatial_evidence: place || null, original_spatial_evidence: originalPlace || null,
      source_entity_kind: index?.source_entity_kind || 'local_research_record',
      sources: unique([...(detail?.sources || []), index?.source_url]),
      evidence_note: detail?.evidence_note || '公共来源书目尚未逐条人工核查；规则分类是候选，未读取作品全文。',
      research: detail || null, entity_link: layer?.link || null, source_index: index || null
    };
    const supplement=supplements.get(id);
    if(supplement)applySupplement(w,supplement);
    applyClassifications(w);
    w.search_text = [w.title_zh, w.title_original, w.author, detail?.series_name, w.issue, ...w.issue_facets.flatMap(f=>[f.label,f.question,f.basis]), ...(w.issue_alternatives||[]).map(a=>a.value), w.story_era, w.language_tradition, index?.title_en, index?.title_zh, ...(index?.title_aliases || []), ...(index?.author_names_en || []), ...(index?.author_names_zh || []), ...(w.library_checks||[]).flatMap(c=>[c.title,...(c.authors||[])]), ...w.topics, ...w.branches].flat().filter(Boolean).join(' ').normalize('NFKC').toLocaleLowerCase();
    w.search_text += ' ' + w.classification_assignments.map(assignment=>assignment.label).join(' ');
    return w;
  });
  return { works, aliases, spatial: { ...spatial, works: works.map(w => ({ ...(w.spatial_evidence || { primary: 'unknown', secondary: [], confidence: '未知', rationale: '没有足够的空间分类证据，保留待分类。' }), id: w.id })) } };
}
const unknown = v => v==null || v==='' || /^(待分类|待核|年份未知|作者未知|标题未知|形态未知|语言未知|故事时代未知|最大时间视野未知|原题待核)/.test(String(v));
export const FIELD_LABELS={title:'展示题名',original_title:'原题',author:'作者',publication_date:'发表时间',original_language:'原语',language_statements:'来源语言',form:'文本形态',spatial:'空间范围',story_era:'故事时代',story_duration:'主体叙事跨度',temporal_reach:'最大时间视野',science:'科学前提',topics:'底层议题',issue:'核心问题',branches:'分支',relationships:'系列与版本关系',external_identifiers:'外部标识'};
const knowledgeKeys={title_zh:'title',title_original:'original_title',original_language:'original_language',author:'author',spatial_primary:'spatial',duration:'story_duration',story_era:'story_era',reach:'temporal_reach',science_class:'science',issue:'issue',topics:'topics',branches:'branches'};
function applySupplement(w,s){
  w.knowledge=s.knowledge||null;w.knowledge_topics=s.knowledge?.fields?.topics||[];
  w.issue_facets=s.knowledge?.fields?.issue_facets||[];
  w.knowledge_identity_notes=unique((s.knowledge?.assertions||[]).map(a=>a.identity_caveat));
  w.issue_evidence_notes=unique((s.knowledge?.assertions||[]).map(a=>a.evidence_scope));
  w.reading_materials=s.reading_materials||[];
  w.source_search_log=s.source_search_log||null;
  w.issue_facets_status=w.issue_facets.length?'knowledge_added_unverified':'missing';
  w.issue_alternatives=s.knowledge?.issue_alternatives||[];
  if(w.research?.issue&&s.knowledge?.fields.issue&&w.research.issue!==s.knowledge.fields.issue)w.issue_alternatives=[...w.issue_alternatives,{value:s.knowledge.fields.issue,note:s.knowledge.field_notes.issue,input_file:s.knowledge.assertions?.find(a=>a.fields.issue===s.knowledge.fields.issue)?.input_file}];
  w.issue_analysis_status=w.research?.issue?'research_interpreted':s.knowledge?.fields?.issue?'knowledge_added_unverified':'missing';
  w.library_checks=s.library_checks||[];w.library_detail_url=s.library_detail_url||null;
  w.library_topic_candidates=s.topic_candidates||[];
  w.topic_candidates=[...w.topic_candidates,...w.library_topic_candidates];
  w.topics=unique([...w.topics,...w.library_topic_candidates.map(t=>t.topic),...w.knowledge_topics]);
  w.branches=unique([...w.branches,...(w.source_index?.branch_candidates||[]).map(b=>b.branch),...(s.branch_candidates||[]).map(b=>b.branch),...(s.knowledge?.fields?.branches||[])]);
  const fields={...s.field_statuses},applied=[];
  w.form_candidate=s.form_candidate;w.form_basis=s.form_basis;
  if(!w.research&&s.form_candidate){w.form=s.form_candidate;w.forms=unique([...w.forms,s.form_candidate]);fields.form='rule_candidate_unverified';}
  if(s.knowledge){
    const k=s.knowledge.fields;
    for(const key of ['title_zh','title_original','author','duration','story_era','reach','science_class','issue']){
      if(k[key] && (unknown(w[key])||['duration','story_era','reach'].includes(key)&&/待核|无可核|未明确/.test(w[key])||key==='issue'&&!w.research)){
        w[key]=k[key];applied.push(key);fields[knowledgeKeys[key]]='knowledge_added_unverified';
      }
    }
    if(k.original_language){w.original_language=k.original_language;w.languages=unique([...w.languages.filter(l=>l!=='语言未知'),k.original_language]);if(!w.research)w.language_tradition=w.languages.join(' / ');fields.original_language='knowledge_added_unverified';applied.push('original_language');}
    if(w.spatial_primary==='unknown'&&k.spatial_primary&&k.spatial_primary!=='unknown'){
      w.spatial_primary=k.spatial_primary;w.spatial_evidence={primary:k.spatial_primary,secondary:k.spatial_secondary||[],rationale:k.spatial_rationale||s.knowledge.field_notes?.spatial_primary||'已有剧情知识补充；待独立核对。',confidence:'已有知识补充 · 待独立核对'};fields.spatial='knowledge_added_unverified';applied.push('spatial_primary');
    }
    if(k.science_note&&applied.includes('science_class'))w.science_note=k.science_note;
    if(k.topics?.length)fields.topics=w.research_topics.length?fields.topics:'knowledge_added_unverified';
    if(k.branches?.length&&!w.research)fields.branches='knowledge_added_unverified';
  }
  if(w.library_topic_candidates.length&&!w.research_topics.length&&!w.knowledge_topics.length)fields.topics='rule_candidate_unverified';
  for(const c of w.library_checks.filter(c=>c.status==='title_author_correspondence')){
    fields.title='cross_source_correspondence';fields.author='cross_source_correspondence';fields.external_identifiers='cross_source_correspondence';
    if(c.year_comparison.status==='agree')fields.publication_date='cross_source_correspondence';
    else if(c.year_comparison.status==='missing_source' && w.sort_year==null && Number.isSafeInteger(c.year_comparison.library)){
      w.first_year=c.year_comparison.library;w.sort_year=c.year_comparison.library;w.year_display=`${w.sort_year}（外部书目候选）`;w.year_note='Open Library 作品索引的 first_publish_year 候选；题名及作者相符，初刊与版本角色仍待核。来源日期缺失原样保留。';fields.publication_date='external_candidate_unverified';
    }
  }
  const conflicts=w.library_checks.filter(c=>c.status==='title_author_correspondence'&&c.year_comparison?.status==='different');
  if(conflicts.length||s.research_source_comparisons?.some(c=>c.comparison==='different_year_values'))fields.publication_date='conflict_needs_review';
  w.content_corrections=s.content_corrections||[];
  for(const c of w.content_corrections){
    if(c.field==='publication_year'){
      if(w.source_first_year!==c.original_source_value)throw new Error('日期更正不对应原始来源值：'+w.id);
      w.first_year=c.proposed_value;w.sort_year=c.proposed_value;
      w.year_display=`${c.primary_date||c.proposed_value}（原刊依据）`;
      w.year_note=`来源纪年 ${c.original_source_value} 原样保留；${c.support_scope} ${c.note}`;
      fields.publication_date='primary_date_correction';
      w.sources=unique([...w.sources,c.source_url]);
    }
  }
  const missing=Object.entries({title:w.title_zh,original_title:w.title_original,author:w.author,publication_date:w.sort_year,original_language:w.original_language||w.research?.language_tradition,language_statements:labels(w.source_index?.language_statements).length||null,form:(w.research||s.form_candidate)?w.form:null,spatial:w.spatial_primary==='unknown'?null:w.spatial_primary,story_era:w.story_era,story_duration:w.duration,temporal_reach:w.reach,science:w.science_class,topics:w.topics.length||null,issue:(w.research||w.knowledge?.fields?.issue)?w.issue:null,branches:w.branches.length||null,external_identifiers:w.source_id||null}).filter(([,v])=>unknown(v)).map(([key])=>key);
  if(!w.source_id&&!w.series_name)missing.push('relationships');
  for(const f of missing)fields[f]=['original_title','original_language'].includes(f)?'unconfirmed':'missing';
  w.completion={structural_checked:true,structural_result:s.structural_result,source_verified:false,field_statuses:fields,missing_fields:missing,knowledge_applied_fields:applied,has_knowledge:!!s.knowledge,has_library_correspondence:w.library_checks.some(c=>c.status==='title_author_correspondence'),has_conflict:w.content_corrections.length>0||conflicts.length>0||fields.publication_date==='conflict_needs_review',has_identity_review:w.library_checks.some(c=>c.status==='identity_or_scope_needs_review'||c.status==='not_returned'),issues:s.issues||[],research_source_comparisons:s.research_source_comparisons||[]};
  if(s.knowledge&&!w.research)w.research_level='enriched';
  else if(!w.research&&w.topics.length)w.research_level='candidate';
  w.sources=unique([...w.sources,...(s.knowledge?.sources||[]),...w.library_checks.map(c=>c.source_url)]);
  if(w.knowledge&&!w.research)w.evidence_note='已有知识补充，尚未独立逐字段核对。来源书目、规则候选与知识解释分别保留；链接不代表所有字段已经验证。';
  const described=w.reading_materials.filter(m=>m.has_description),matched=described.filter(m=>m.previous_identity_status==='title_author_correspondence'&&m.same_dump_title&&m.same_dump_authors);
  w.issue_research_task=w.issue_analysis_status!=='missing'
    ?{stage:'analysis_present',label:'已有分析，继续核对',reason:'核心问题已整理；需继续核对情节、文本范围与各项来源，保留可修订解释。',next_action:'逐字段核对现有分析及未确认属性。'}
    :matched.length
      ?{stage:'content_reading_next',label:'内容资料待研读',reason:'已取得简介，且与先前对应书目的题名及至少一位作者相同；简介尚未逐条研读，内容和文本粒度仍需确认。',next_action:'阅读简介并查原作、作者或出版社资料，提炼有情节依据的问题。'}
      :described.length
        ?{stage:'identity_then_content',label:'先确认资料对应对象',reason:'已有内容资料，但书目身份、文本粒度或此次题名作者对照尚未满足阅读优先条件。',next_action:'先区分同名、系列、合集、短篇、版本，再阅读对应文本资料。'}
        :{stage:'source_search_next',label:'继续寻找内容资料',reason:'此次定向取得的资料中没有可用简介；这不代表作品或资料不存在。',next_action:'查找原作目录、作者与出版社介绍、图书馆摘要，记录可读内容及身份疑点。'};
}
export function coverageOf(works) {
  return { total: works.length, researched: works.filter(w => w.research).length,
    topic_known: works.filter(w => w.topics.length).length, topic_unknown: works.filter(w => !w.topics.length).length,
    issue_analyzed:works.filter(w=>w.issue_analysis_status!=='missing').length,
    issue_missing:works.filter(w=>w.issue_analysis_status==='missing').length,
    issue_facet_records:works.filter(w=>w.issue_facets.length).length,
    issue_facets:works.reduce((n,w)=>n+w.issue_facets.length,0),
    year_unknown: works.filter(w => w.sort_year == null).length,
    space_unknown: works.filter(w => w.spatial_primary === 'unknown').length,
    knowledge_added:works.filter(w=>w.knowledge).length,
    library_correspondence:works.filter(w=>w.completion?.has_library_correspondence).length,
    conflicts:works.filter(w=>w.completion?.has_conflict).length,
    with_missing:works.filter(w=>w.completion?.missing_fields.length).length };
}
