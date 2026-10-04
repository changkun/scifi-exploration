const unique = values => [...new Set(values.filter(Boolean))];
const labels = values => (values || []).map(value => typeof value === 'string' ? value : value.label || value.id).filter(Boolean);
export const UNKNOWN = '待分类';
export function buildCanonicalUniverse(sourceRecords, researchWorks, spatial, links) {
  const source = new Map(sourceRecords.map(record => [record.id, record]));
  const research = new Map(researchWorks.map(record => [record.id, record]));
  const places = new Map((spatial.works || []).map(record => [record.id, record]));
  const aliases = new Map(), enrichment = new Map();
  for (const link of links.links) {
    if (!research.has(link.research_id)) throw new Error('实体链接指向不存在的研究记录');
    if (link.status === 'linked' && !source.has(link.canonical_id)) throw new Error('实体链接指向不存在的来源记录');
    if (enrichment.has(link.canonical_id)) throw new Error('研究记录链接发生未经处理的冲突');
    enrichment.set(link.canonical_id, { work: research.get(link.research_id), link });
    aliases.set(link.research_id, link.canonical_id);
  }
  if (aliases.size !== research.size) throw new Error('实体链接没有覆盖全部研究记录');
  const ids = unique([...source.keys(), ...enrichment.keys()]);
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
      issue: detail?.issue || (topics.length ? `来源标签给出议题候选：${topics.join('、')}。需继续研究。` : '底层议题待研究'),
      series_name: detail?.series_name || '',
      inclusion_status: detail?.inclusion_status || '来源科幻文学候选',
      research_level: detail ? 'researched' : topics.length ? 'candidate' : 'bibliographic',
      spatial_primary: place?.primary || 'unknown', spatial_evidence: place || null, original_spatial_evidence: originalPlace || null,
      source_entity_kind: index?.source_entity_kind || 'local_research_record',
      sources: unique([...(detail?.sources || []), index?.source_url]),
      evidence_note: detail?.evidence_note || '公共来源书目尚未逐条人工核查；规则分类是候选，未读取作品全文。',
      research: detail || null, entity_link: layer?.link || null, source_index: index || null
    };
    w.search_text = [title, w.title_original, w.author, detail?.series_name, detail?.issue, detail?.story_era, detail?.language_tradition, index?.title_en, index?.title_zh, ...(index?.title_aliases || []), ...(index?.author_names_en || []), ...(index?.author_names_zh || []), ...topics, ...branches].filter(Boolean).join(' ').normalize('NFKC').toLocaleLowerCase();
    return w;
  });
  return { works, aliases, spatial: { ...spatial, works: works.map(w => ({ ...(w.spatial_evidence || { primary: 'unknown', secondary: [], confidence: '未知', rationale: '没有足够的空间分类证据，保留待分类。' }), id: w.id })) } };
}
export function coverageOf(works) {
  return { total: works.length, researched: works.filter(w => w.research).length,
    topic_known: works.filter(w => w.topics.length).length, topic_unknown: works.filter(w => !w.topics.length).length,
    year_unknown: works.filter(w => w.sort_year == null).length,
    space_unknown: works.filter(w => w.spatial_primary === 'unknown').length };
}
