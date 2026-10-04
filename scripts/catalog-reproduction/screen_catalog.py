import json,re,collections,sys
from pathlib import Path
OUTPUT=Path(sys.argv[1]) if len(sys.argv)>1 else Path('data')
p=OUTPUT/'expanded-catalog.json';n=OUTPUT/'expanded-catalog-notes.json'
d=json.loads(p.read_text());notes=json.loads(n.read_text());kept=[];excluded=[];excluded_full=[];boundary=[]
for r in d['works']:
 description=(r.get('description_en') or '').lower()
 reason=None
 if re.search(r'non[- ]?fiction (?:work|book|guide|collection|anthology)',description):
  reason='来源英文说明明确标为非虚构作品；不作为科幻虚构书目收录。'
 elif description.startswith('encyclopedia of ') and 'fictional' not in description:
  reason='来源说明明确为主题百科全书，属于非虚构参考书。'
 if reason:
  excluded_full.append(r)
  excluded.append({'id':r['id'],'title':r['title'],'source_url':r['source_url'],'description_en':r.get('description_en'),'reason':reason})
 else:
  if any(w in description for w in ['literary criticism','criticism and','non-fiction','nonfiction']):
   boundary.append({'id':r['id'],'title':r['title'],'source_url':r['source_url'],'reason':'来源说明含评论或非虚构与虚构混合；未凭此整条排除。'})
  kept.append(r)
notes.update({'source_entity_kind_counts':dict(collections.Counter(r['source_entity_kind'] for r in kept)),'future_publication_year_candidates':[{'id':r['id'],'title':r['title'],'year':r['first_year'],'source_url':r['source_url']} for r in kept if r['publication_year_status']=='future_year_in_source'],'kind_note':'source_entity_kind依据直接P31区分版本/章节/系列边界；默认保留所有源实体，不能把源记录总量当独立小说部数。','status':'full source query export completed; bibliographic fields and exclusions reported','included_record_count':len(kept),'exclusions':excluded,'exclusion_count':len(excluded),'mixed_or_unclear_boundaries':boundary,'searchable_title_record_count':sum(not r['title_missing'] for r in kept),'unresolved_title_record_count':sum(r['title_missing'] for r in kept),'unresolved_title_ids':[r['id'] for r in kept if r['title_missing']], 'screening_rule':'仅排除来源说明明确的非虚构参考作品；评论与虚构混合、体裁未定条目保留边界说明。不由题名相似合并或猜测内容。','source_genre_counts':dict(collections.Counter(g['label'] for r in kept for g in r['source_subject'])),'minimum_publication_year_candidate':min((r['first_year'] for r in kept if r['first_year'] is not None),default=None),'maximum_publication_year_candidate':max((r['first_year'] for r in kept if r['first_year'] is not None),default=None)})
(OUTPUT/'expanded-excluded-records.json').write_text(json.dumps({'metadata':{'source':'Wikidata','scope':'从完整查询成员中因明确非虚构说明而排除的实体，完整字段保留；相关标签由expanded-catalog.json的related_entities关联。','record_count':len(excluded_full),'license':'CC0'},'records':excluded_full,'related_entities':{qid:d['related_entities'][qid] for qid in {v['id'] for r in excluded_full for field in ['author_entities','language_statements','source_types','source_subject'] for v in r[field]} if qid in d.get('related_entities',{})},'exclusions':excluded},ensure_ascii=False,separators=(',',':'))+'\n')
d['works']=kept
d['metadata'].update({'status':'complete stated source query export; bibliographic fields unverified','record_count':len(kept),'searchable_title_record_count':notes['searchable_title_record_count'],'exclusion_count':len(excluded),'source_entity_kind_counts':notes['source_entity_kind_counts'],'metadata_entity_count':notes['metadata_record_count'],'unresolved_title_count':notes['unresolved_title_record_count'],'metadata_coverage_note':'完整查询成员均已读取请求字段；字段缺失、原题、原语和初刊仍未逐条核验。','spatial_classification':'未进行','deep_topic_classification':'未进行'})
p.write_text(json.dumps(d,ensure_ascii=False,separators=(',',':'))+'\n')
n.write_text(json.dumps(notes,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'source_members':notes['source_entity_count'],'metadata_records':notes['metadata_record_count'],'included':len(kept),'searchable_titles':notes['searchable_title_record_count'],'unresolved_titles':notes['unresolved_title_record_count'],'excluded':excluded,'boundaries':boundary},ensure_ascii=False))
