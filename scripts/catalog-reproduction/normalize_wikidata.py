import json,re,collections,sys,gzip
from pathlib import Path
from datetime import datetime,timezone
OUTPUT=Path(sys.argv[1]) if len(sys.argv)>1 else Path('data')
BASE=Path(sys.argv[2]) if len(sys.argv)>2 else OUTPUT/'wikidata-export'
def read_json(path):
 path=Path(path)
 if not path.exists() and Path(str(path)+'.gz').exists():path=Path(str(path)+'.gz')
 raw=gzip.decompress(path.read_bytes()) if path.suffix=='.gz' else path.read_bytes()
 return json.loads(raw)
def available_json(pattern):
 candidates=list(BASE.glob(pattern))+list(BASE.glob(pattern+'.gz'))
 unique={str(p)[:-3] if p.suffix=='.gz' else str(p):p for p in candidates}
 return [unique[k] for k in sorted(unique)]
def has_json(path):return Path(path).exists() or Path(str(path)+'.gz').exists()

ids=read_json(BASE/'work-ids.json')
all_fields=collections.defaultdict(lambda:collections.defaultdict(list))
for raw_path in available_json('fields-large-*.json')+available_json('source-extra.json'):
 for r in read_json(raw_path)['results']['bindings']:
  i=r['work']['value'].rsplit('/',1)[-1];f=r['field']['value'];v=r['value']
  if v not in all_fields[i][f]:all_fields[i][f].append(v)
labels={}
for related_path in [BASE/'related-full.json']+available_json('related-all-labels.json'):
 for r in read_json(related_path)['results']['bindings']:
  i=r['entity']['value'].rsplit('/',1)[-1]
  labels.setdefault(i,{})[r['label'].get('xml:lang','')]=r['label']['value']
related=set(labels)
membership='?work wdt:P136/wdt:P279* wd:Q24925 . ?work wdt:P31/wdt:P279* wd:Q7725634 .'
relationship_labels=collections.defaultdict(dict)
if has_json(BASE/'source-extra.json'):
 for r in read_json(BASE/'source-extra.json')['results']['bindings']:
  if r.get('targetLabel'):
   relationship_labels[r['value']['value']][r['targetLabel'].get('xml:lang','')]=r['targetLabel']['value']
records=[]
def get_label(qid):
 l=labels.get(qid,{})
 return l.get('zh-hans') or l.get('zh') or l.get('en') or next(iter(l.values()),None) or qid
def val(fs,f):
 vs=fs.get(f,[])
 return vs[0]['value'] if vs else None
for i in ids:
 fs=all_fields.get(i,{})
 title_en=val(fs,'label_en'); title_zh=val(fs,'label_zh-hans') or val(fs,'label_zh')
 title_claims=[{'value':v['value'],'language':v.get('xml:lang')} for v in fs.get('P1476',[])]
 dates=sorted({v['value'] for v in fs.get('P577',[])})
 years=[]
 for s in dates:
  m=re.match(r'^([+-]?\d+)-',s)
  if m: years.append(int(m.group(1)))
 first=min(years) if years else None
 authors=[]; author_entities=[]
 for v in fs.get('P50',[]):
  qid=v['value'].rsplit('/',1)[-1]
  l=labels.get(qid,{})
  name=l.get('zh-hans') or l.get('zh') or l.get('en') or next(iter(l.values()),None) or qid
  if name not in authors: authors.append(name)
  author_entities.append({'id':qid,'name':name,'label_en':l.get('en'),'label_zh':l.get('zh-hans') or l.get('zh'),'url':'https://www.wikidata.org/wiki/'+qid})
 for v in fs.get('P2093',[]):
  if v['value'] not in authors: authors.append(v['value'])
 def entities(p):
  out=[]
  for v in fs.get(p,[]):
   qid=v['value'].rsplit('/',1)[-1]
   out.append({'id':qid,'label':get_label(qid)})
  return out
 genres=entities('P136'); types=entities('P31'); langs=entities('P407')
 source_labels={k[6:]:[v['value'] for v in vs] for k,vs in fs.items() if k.startswith('label_')}
 source_aliases={k[6:]:[v['value'] for v in vs] for k,vs in fs.items() if k.startswith('alias_')}
 relationships={}
 for prop in ['P179','P361','P155','P156','P144','P747']:
  relationships[prop]=[{'id':v['value'].rsplit('/',1)[-1] if v.get('type')=='uri' else None,'value':v['value'],'labels':relationship_labels.get(v['value'],{}),'url':'https://www.wikidata.org/wiki/'+v['value'].rsplit('/',1)[-1] if v.get('type')=='uri' and '/entity/Q' in v['value'] else v['value']} for v in fs.get(prop,[])]
 label_fallback=next((vs[0]['value'] for k,vs in fs.items() if k.startswith('label_') and vs),None)
 display=title_zh or title_en or (title_claims[0]['value'] if title_claims else None) or label_fallback or i
 display_language='zh' if title_zh else 'en' if title_en else title_claims[0].get('language') if title_claims else next((k[6:] for k in fs if k.startswith('label_')),None)
 url='https://www.wikidata.org/wiki/'+i
 type_ids={t['id'] for t in types}
 type_names_en=[labels.get(t['id'],{}).get('en','').lower() for t in types]
 entity_kind='edition_or_translation' if 'Q3331189' in type_ids else 'chapter_or_serial_part' if 'Q1980247' in type_ids else 'series' if any('series' in name for name in type_names_en) else 'work_or_unspecified'
 records.append({
  'id':i,'source_entity_kind':entity_kind,'publication_year_status':'future_year_in_source' if first is not None and first>datetime.now(timezone.utc).year else 'candidate_year' if first is not None else 'unknown','key':'http://www.wikidata.org/entity/'+i,'wikidata_id':i,
  'title':display,'source_labels':source_labels,'source_aliases':source_aliases,'relationships':relationships,'display_title_language':display_language,'title_missing':display==i,'title_zh':title_zh,'title_en':title_en,'title_original':None,'title_statements':title_claims,
  'authors':authors,'author_entities':author_entities,
  'first_year':first,'first_publish_year':first,'first_publish_year_candidate':first,'publication_dates':dates,
  'original_language':None,'language_statements':langs,
  'source_url':url,'sources':[url],'source_subject':genres,'subjects':[g['label'] for g in genres],
  'source_types':types,'edition_count':None,
  'description_en':val(fs,'description_en'),'description_zh':val(fs,'description_zh'),
  'author_names_en':[a['label_en'] for a in author_entities if a['label_en']],
  'author_names_zh':[a['label_zh'] for a in author_entities if a['label_zh']],
  'openlibrary_work_ids':[v['value'] for v in fs.get('P648',[]) if v['value'].endswith('W')],
  'verification_status':'源书目未逐条核验','analysis_status':'未进行主题、空间和全文分析',
 })

notes_path=OUTPUT/'expanded-catalog-notes.json'; notes=read_json(notes_path)
notes.update({
 'status':'all query members and requested metadata fetched; screening pending',
 'retrieved_at':datetime.now(timezone.utc).isoformat(),
 'source':'Wikidata Query Service',
 'source_entity_count':len(ids),
 'count_probe':notes.get('count_probe'),
 'member_count_matches_probe':len(ids)==notes.get('count_probe') if notes.get('count_probe') is not None else None,
 'metadata_record_count':len(records),
 'membership_query':'SELECT DISTINCT ?work WHERE { '+membership+' }',
 'endpoint':'https://query.wikidata.org/sparql',
 'retrieval_method':'无LIMIT取得完整成员集合；按已缓存QID分不超过3000条的顺序批次导出元数据；每请求至少65秒间隔；一次作者/语言/类型相关实体标签导出；按QID去重。',
 'metadata_batches':(len(ids)+2999)//3000,'related_entity_count':len(related),
 'source_relation_properties':{'P179':'part of the series','P361':'part of','P155':'follows','P156':'followed by','P144':'based on','P747':'has edition or translation'},
 'relation_counts':{prop:sum(len(r['relationships'][prop]) for r in records) for prop in ['P179','P361','P155','P156','P144','P747']},
 'related_labels_note':'所有相关实体已有语言标签集中保存在related_entities，作品以作者/语言/类型/genre的QID关联，不重复复制泛类型标签。',
 'related_label_languages':len({lang for l in labels.values() for lang in l}),
 'unresolved_author_label_record_count':sum(any(a['name']==a['id'] for a in r['author_entities']) for r in records),
 'source_aliases_note':'完整保留此次查询所得所有语言rdfs:label和skos:altLabel；标签及别名是来源显示名，不保证原题。',
 'source_types_counts':dict(collections.Counter(t['label'] for r in records for t in r['source_types'])),
 'missing_first_publish_year_count':sum(r['first_year'] is None for r in records),
 'missing_authors_count':sum(not r['authors'] for r in records),
 'missing_language_statement_count':sum(not r['language_statements'] for r in records),
 'missing_zh_title_count':sum(not r['title_zh'] for r in records),
 'publication_year_note':'first_year为该实体直接P577时间值中最小年份，不等于已核原语初刊或首版；RDF日期的01-01可能是精度占位，不作精确日。',
 'original_title_note':'原题未独立核验，title_original为null；P1476标题及语言标签完整保留，zh/en实体标签只用于显示。',
 'original_language_note':'原语未独立核验，original_language为null；仅保留P407语言声明，不能由英语显示标签推断原语。',
 'edition_count_note':'Wikidata本查询没有全量版次数，edition_count保留null；P648仅保留已有work标识，不在Open Library追加批量访问。',
 'raw_cache_dir':'research/source-export',
 'source_documents':['https://www.wikidata.org/wiki/Q24925','https://www.wikidata.org/wiki/Q7725634','https://www.wikidata.org/wiki/Q8261','https://www.wikidata.org/wiki/Q49084','https://www.wikidata.org/wiki/Property:P407','https://www.wikidata.org/wiki/Property:P577','https://www.wikidata.org/wiki/Wikidata:Licensing'],
 'warnings':['查询集合受Wikidata缺失genre、类型路径和地域/语言覆盖偏差影响，不能代表所有全球科幻。','作品、系列、组篇、漫画、剧本等可能同时存在；来源类型不等于统一小说体裁。','同一作品可能存在多个实体；本次只按QID去重，不按题名误合并。','不将源genre词自动转换为深度议题、空间或科学匹配分类。'],
})
(OUTPUT/'expanded-catalog.json').write_text(json.dumps({'metadata':{'source':'Wikidata','scope':notes['scope'],'source_entity_count':len(ids),'record_count':len(records),'status':'source bibliographic index; screening pending','license':'CC0','source_url':'https://query.wikidata.org/'},'works':records,'related_entities':{i:{'id':i,'labels':l,'source_url':'https://www.wikidata.org/wiki/'+i} for i,l in labels.items()}},ensure_ascii=False,separators=(',',':'))+'\n')
notes_path.write_text(json.dumps(notes,ensure_ascii=False,indent=2)+'\n')
print('COMPLETE',len(records),'records;',len(related),'related label entities',flush=True)
