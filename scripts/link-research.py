#!/usr/bin/env python3
"""Conservatively link the research layer to cached source entities; no network."""
import json,gzip,re,unicodedata,collections,urllib.parse,hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent

def load(path):
 path=Path(path)
 if not path.exists() and Path(str(path)+'.gz').exists():path=Path(str(path)+'.gz')
 return json.loads(gzip.decompress(path.read_bytes()) if path.suffix=='.gz' else path.read_bytes())
def norm(value):
 return ''.join(c for c in unicodedata.normalize('NFKD',value or '').casefold() if c.isalnum() and not unicodedata.combining(c))
def namesigs(value):
 out={norm(value)}
 ts=re.findall(r'[a-z0-9]+',unicodedata.normalize('NFKD',value or '').casefold())
 latin_only=all(c.isascii() or not c.isalpha() or unicodedata.combining(c) for c in unicodedata.normalize('NFKD',value or ''))
 if latin_only and len(ts)>=2:out.add(''.join(sorted(ts)))
 if latin_only and len(ts)>=3 and all(len(x)==1 for x in ts[1:-1]):out.add(''.join(sorted([ts[0],ts[-1]])))
 # Explicitly omit a patronymic/middle name only when the same first and last
 # CJK name tokens are present. This does not transliterate unknown names.
 cs=re.split(r'[·・]',value or '')
 if len(cs)>2 and all(re.search(r'[\u3400-\u9fff]',c) for c in cs):out.add(norm(cs[0]+'·'+cs[-1]))
 return out-{''}

research=load(ROOT/'research/catalog.json')['works']
source=load(ROOT/'research/expanded-catalog.json');works=source['works'];related=source['related_entities']
source_by_id={r['id']:r for r in works}
author_ids={a['id'] for r in works for a in r['author_entities']}
author_index=collections.defaultdict(set)
for qid in author_ids:
 for label in list(related.get(qid,{}).get('labels',{}).values())+[v for vs in related.get(qid,{}).get('aliases',{}).values() for v in (vs if isinstance(vs,list) else [vs])]:
  for signature in namesigs(label):author_index[signature].add(qid)
# These equivalences cite references already attached to the research records.
# They were checked against those references and the stored source author labels.
REVIEWED_AUTHOR_ALIASES={
 '阿尔卡季与鲍里斯·斯特鲁伽茨基':{
  'ids':['Q153796','Q61699','Q59054'],
  'sources':['https://sf-encyclopedia.com/entry/strugatski_arkady'],
  'basis':'研究所引SFE条目明确为Arkady与Boris共同作者；对应源的集体作者及两位个人作者，保留Strugatski/Strugatsky拼写差异。'},
 '豪尔赫·巴拉迪特':{
  'ids':['Q5934568'],
  'sources':['https://rchd.uc.cl/index.php/alch/article/download/36455/28391/91019'],
  'basis':'研究所引学术PDF标题及首页明确列Jorge Baradit和Ygdrasil，与源作者英文标签和原题一致。'}
}

def research_author_evidence(r):
 result=collections.defaultdict(list)
 values=[r['author']]+re.split(r'[;；]',r['author'])+re.findall(r'[（(]([^）)]+)[）)]',r['author'])
 values += [re.split(r'[,，]',v)[0] for v in re.findall(r'[（(]([^）)]+)[）)]',r['author']) if '笔名' in v or '筆名' in v]
 for value in values:
  for sig in namesigs(value):
   for qid in author_index.get(sig,[]):result[qid].append({'method':'author_label','value':value})
 for url in r['sources']:
  parsed=urllib.parse.urlparse(url)
  if parsed.netloc=='sf-encyclopedia.com' and parsed.path.startswith('/entry/'):
   slug=urllib.parse.unquote(parsed.path.rsplit('/',1)[-1]).replace('_',' ')
   for sig in namesigs(slug):
    for qid in author_index.get(sig,[]):result[qid].append({'method':'cited_author_entry','value':slug,'source':url})
  # A personal author domain must match a complete stored author label.
  host=parsed.netloc.removeprefix('www.').split('.')[0]
  if len(host)>6:
   for qid in author_index.get(norm(host),[]):result[qid].append({'method':'cited_author_domain','value':host,'source':url})
 if r['author'] in REVIEWED_AUTHOR_ALIASES:
  alias=REVIEWED_AUTHOR_ALIASES[r['author']]
  if all(url in r['sources'] for url in alias['sources']):
   for qid in alias['ids']:result[qid].append({'method':'reviewed_author_equivalence',**alias})
 return dict(result)

# Propagate only an exact research author string with one independently grounded
# source author identity. A collective-author reviewed equivalence is explicit.
seeds={r['id']:research_author_evidence(r) for r in research}
by_author=collections.defaultdict(set)
for r in research:
 if len(seeds[r['id']])==1:by_author[r['author']].update(seeds[r['id']])
for r in research:
 if len(by_author[r['author']])==1:
  qid=next(iter(by_author[r['author']]))
  seeds[r['id']].setdefault(qid,[]).append({'method':'same_research_author_string','value':r['author'],'basis':'相同研究作者字串在其他记录中已有独立作者标签或引用匹配。'})

def title_variants(r):
 variants=[]
 def add(value,kind):
  value=re.sub(r'[（(](?:暂译|译名待核)[）)]','',value or '').strip()
  value=re.sub(r'^(?:英文|英语|English)[：:]\s*','',value)
  if norm(value) and not any(norm(v['value'])==norm(value) and v['kind']==kind for v in variants):variants.append({'value':value,'kind':kind})
 for value in [r['title_zh'],r['title_original']]:
  add(value,'whole_title')
  add(re.sub(r'[（(][^）)]*[）)]','',value),'whole_title')
  for inner in re.findall(r'[（(]([^）)]+)[）)]',value):add(inner,'whole_title')
  first=re.split(r'[:：;；]',value)[0];add(first,'whole_title')
  if r['form']=='系列':
   body=value.split(':',1)[-1].split('：',1)[-1]
   for part in re.split(r'[/／]',body):add(part,'component_title')
  else:
   for part in re.split(r'[/／]',value):add(part,'whole_title')
 return variants

title_index=collections.defaultdict(list)
for w in works:
 vals=[w['title'],w.get('title_en'),w.get('title_zh')]+[v for vs in w['source_labels'].values() for v in vs]+[v for vs in w['source_aliases'].values() for v in vs]+[v['value'] for v in w['title_statements']]
 seen=set()
 for value in vals:
  key=norm(value)
  if key and key not in seen:title_index[key].append((w['id'],value));seen.add(key)

def source_granularity(w):
 if w['source_entity_kind']=='edition_or_translation':return 'edition'
 if w['source_entity_kind']=='chapter_or_serial_part':return 'chapter'
 if w['source_entity_kind']=='series':return 'series'
 def classify(text):
  text=text.casefold()
  if any(term in text for term in ['short story collection','collection of short stories','story collection','anthology','fix-up','fixup','短篇小说集','短篇小說集']):return 'collection'
  if re.search(r'series of .*short stor',text):return 'collection'
  if re.search(r'novel series|book series|trilogy|series of .*novels',text):return 'series'
  if re.search(r'\bnovella\b|\bnovelette\b|short story|short fiction|中篇|短篇',text):return 'short_text'
  if re.search(r'\bnovel\b|长篇|長篇',text):return 'novel'
  return None
 # The main descriptor identifies the current text. A clause saying "based on a
 # short story" must not reclassify the expanded novel as its short-story source.
 description=w.get('description_en') or ''
 primary=re.split(r',\s*(?:based on|later|which|subsequently)|;\s*',description,maxsplit=1)[0]
 result=classify(primary)
 if result:return result
 result=classify(w.get('description_zh') or '')
 if result:return result
 forms=[related.get(v['id'],{}).get('labels',{}).get('en','') for field in ['source_types','source_subject'] for v in w[field]]
 kinds={classify(text) for text in forms}-{None}
 return next(iter(kinds)) if len(kinds)==1 else 'unspecified_work'

def check_candidate(r,w,matches):
 qids={a['id'] for a in w['author_entities']};evidence=[{'author_id':qid,'evidence':seeds[r['id']][qid]} for qid in sorted(qids & seeds[r['id']].keys())]
 granularity=source_granularity(w);warnings=[];reject=[];uncertain=[]
 if not evidence:
  reject.append('题名候选的源作者不能由研究作者标签或已核引用确认。')
 if granularity in ['edition','chapter']:reject.append('源候选为版本/章节，研究记录不是该层级实体。')
 whole=any(x['research_title_kind']=='whole_title' for x in matches)
 if not whole:reject.append('只匹配研究系列列出的组成作品题名，不能代表整个系列。')
 if r['form']=='系列' and granularity!='series':reject.append('研究为系列，源候选未明示整体系列粒度。')
 if r['form']!='系列' and granularity=='series':reject.append('研究为单部作品，源候选为系列。')
 if r['form'] in ['中篇','短篇'] and granularity in ['collection','novel']:reject.append('研究为单篇，源候选为合集或长篇。')
 if r['form'] in ['长篇','前史叙事'] and granularity in ['short_text','collection']:reject.append('研究为单部长篇/前史叙事，源候选为单篇或合集。')
 if r['form']=='组篇小说' and granularity=='short_text':reject.append('研究为组篇/书本，源候选仅为单篇。')
 if granularity=='unspecified_work':uncertain.append('源仅标文学作品，未取得足以确认相同文本粒度的说明。')
 if r['id']=='global21':uncertain.append('研究指定1938扩写长篇；源首年1925指向短篇原型阶段，未分清文本版本。')
 source_year=w['first_year']
 if source_year!=r['first_year']:
  warnings.append({'kind':'source_publication_year_missing' if source_year is None else 'publication_year_difference','research_year':r['first_year'],'source_year_candidate':source_year,'research_note':r['year_note'],'source_description':w.get('description_en')})
 # A competing short/long version is rejected by granularity above; no date-only join.
 return {'id':w['id'],'title':w['title'],'source_url':w['source_url'],'source_entity_kind':w['source_entity_kind'],'source_granularity':granularity,'source_description':w.get('description_en'),'source_type_ids':[v['id'] for v in w['source_types']],'source_genre_ids':[v['id'] for v in w['source_subject']],'source_year_candidate':source_year,'research_year':r['first_year'],'matched_titles':matches,'author_evidence':evidence,'rejection_reasons':reject,'uncertainty_reasons':uncertain,'warnings':warnings}

links=[]
for r in research:
 candidate_matches=collections.defaultdict(list)
 for variant in title_variants(r):
  for qid,source_title in title_index.get(norm(variant['value']),[]):
   match={'research_title':variant['value'],'research_title_kind':variant['kind'],'source_title':source_title,'normalization':'Unicode NFKD、大小写及标点空白规范化；不做模糊题名猜测。'}
   if match not in candidate_matches[qid]:candidate_matches[qid].append(match)
 candidates=[check_candidate(r,source_by_id[qid],matches) for qid,matches in sorted(candidate_matches.items())]
 eligible=[c for c in candidates if not c['rejection_reasons'] and not c['uncertainty_reasons']]
 plausible=[c for c in candidates if c['author_evidence']]
 if len(eligible)==1:
  status='linked';canonical=eligible[0]['id'];basis='规范化题名或来源别名一致；作者由全语言标签/已核引用确认；源文本粒度相符。'
  if eligible[0]['warnings']:basis+='源年份缺失或与研究版年不同，分别保留，不覆盖研究年份。'
 elif len(eligible)>1 or plausible:
  status='ambiguous';canonical='local:'+r['id'];basis='存在作者与题名支持的候选，但实体粒度、文本版本或多个候选尚不足以唯一确定；保留研究实体。'
 else:
  status='unlinked';canonical='local:'+r['id'];basis='完整源集合中没有通过题名、作者及粒度核对的候选；保留研究实体。'
 links.append({'research_id':r['id'],'status':status,'canonical_id':canonical,'basis':basis,'candidate_ids':[c['id'] for c in candidates],'research_title':r['title_zh'],'research_author':r['author'],'research_form':r['form'],'candidate_evidence':candidates})
# One canonical entity accepts one research layer. Never silently collapse two records.
reverse=collections.defaultdict(list)
for link in links:
 if link['status']=='linked':reverse[link['canonical_id']].append(link)
for qid,group in reverse.items():
 if len(group)>1:
  for link in group:link.update(status='ambiguous',canonical_id='local:'+link['research_id'],basis='多个研究记录指向同一源实体；暂保留各研究层，等待独立粒度复核。')
counts=dict(collections.Counter(x['status'] for x in links))
output={'metadata':{'schema_version':1,'research_record_count':len(research),'source_record_count':len(works),'status_counts':counts,'source_catalog':'research/expanded-catalog.json.gz','research_catalog':'research/catalog.json','method':'完整源题名/标签/别名＋作者全语言标签及已核引用＋文本粒度；无模糊题名自动合并；保留原始记录。','reviewed_author_equivalences':REVIEWED_AUTHOR_ALIASES,'canonical_collision_count':sum(len(v)>1 for v in reverse.values()),'research_sha256':hashlib.sha256((ROOT/'research/catalog.json').read_bytes()).hexdigest(),'source_sha256':hashlib.sha256((ROOT/'research/expanded-catalog.json.gz').read_bytes()).hexdigest()},'links':links,'by_research_id':{x['research_id']:{k:x[k] for k in ['status','canonical_id','basis','candidate_ids']} for x in links}}
path=ROOT/'dist/assets/research-links.json';path.write_text(json.dumps(output,ensure_ascii=False,separators=(',',':'))+'\n')
print(json.dumps({'status_counts':counts,'collision_count':output['metadata']['canonical_collision_count'],'unresolved':[{k:x[k] for k in ['research_id','research_title','status','candidate_ids']} for x in links if x['status']!='linked']},ensure_ascii=False,indent=2))
