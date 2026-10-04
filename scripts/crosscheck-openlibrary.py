"""Targeted batched lookup of existing P648 work identifiers; never scrape HTML.
Use --fetch once to acquire missing batches, otherwise reproduce offline.
Preserve library facts separately; language is edition language, not original.
"""
import argparse,collections,gzip,hashlib,json,re,time,unicodedata,urllib.parse,urllib.request
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser(description=__doc__);p.add_argument('--fetch',action='store_true');args=p.parse_args()
def read(path):return json.loads(gzip.decompress(path.read_bytes()) if path.suffix=='.gz' else path.read_bytes())
def write(path,value):path.write_bytes(gzip.compress(json.dumps(value,ensure_ascii=False,separators=(',',':')).encode(),mtime=0) if path.suffix=='.gz' else (json.dumps(value,ensure_ascii=False,indent=2)+'\n').encode())
source=read(ROOT/'research/structured-bibliography.json.gz');records=source['records'];related=source['related_entities']
ids=sorted({i for r in records for i in r.get('openlibrary_work_ids',[]) if re.fullmatch(r'OL[1-9]\d*W',i)})
identifier_uses=collections.Counter(i for r in records for i in set(r.get('openlibrary_work_ids',[])))
cache=ROOT/'research/external-source/openlibrary';cache.mkdir(parents=True,exist_ok=True)
fields='key,title,author_name,author_key,first_publish_year,language,edition_count,subject,place,time'
responses=[];errors=[];requests=[]
for offset in range(0,len(ids),75):
 batch=ids[offset:offset+75];q='key:('+ ' OR '.join('"/works/'+i+'"' for i in batch)+')'
 url='https://openlibrary.org/search.json?'+urllib.parse.urlencode({'q':q,'fields':fields,'limit':len(batch)})
 key=hashlib.sha256(url.encode()).hexdigest()[:16];file=cache/(f'{offset//75:03}-{key}.json.gz')
 if file.exists():data=read(file)
 elif args.fetch:
  result=None
  for attempt in range(3):
   try:
    request=urllib.request.Request(url,headers={'User-Agent':'scifi-exploration research (https://github.com/changkun/scifi-exploration)','Accept':'application/json'})
    with urllib.request.urlopen(request,timeout=45) as response: raw=response.read();result=json.loads(raw)
    if not isinstance(result.get('docs'),list):raise ValueError('search response lacks docs')
    break
   except Exception as e:
    if attempt==2:errors.append({'batch':offset//75,'error':str(e),'url':url})
    else:time.sleep(min(60,int(getattr(e,'headers',{}).get('Retry-After',5*(attempt+1)) or 5)))
  if result is None:continue
  data={'provider':'Open Library','requested_ids':batch,'request_url':url,'retrieved_at':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),'response':result}
  write(file,data);time.sleep(1.1)
 else:errors.append({'batch':offset//75,'error':'cache missing; run --fetch','url':url});continue
 responses.append(data);requests.append({'file':file.name,'sha256':hashlib.sha256(file.read_bytes()).hexdigest(),'request_url':url,'requested':len(batch),'returned':len(data['response']['docs'])})
 if (offset//75)%8==0:print(f'batches {len(responses)}/{(len(ids)+74)//75}',flush=True)
works={d['key'].split('/')[-1]:d for page in responses for d in page['response']['docs']}
def normal(s):return ''.join(c for c in unicodedata.normalize('NFKC',str(s)).casefold() if c.isalnum())
def all_names(entity):
 if not entity:return []
 result=list(entity.get('labels',{}).values())
 for values in entity.get('aliases',{}).values():result+=values
 return result
out=[]
for r in records:
 external_ids=r.get('openlibrary_work_ids',[])
 if not external_ids:continue
 titles=set(normal(t) for t in list(r.get('source_labels',{}).values())+[v.get('value','') for v in r.get('title_statements',[])])
 for values in r.get('source_aliases',{}).values():titles.update(normal(t) for t in values)
 author_names=list(r.get('authors',[]))+list(r.get('author_names_en',[]))+list(r.get('author_names_zh',[]))
 for author in r.get('author_entities',[]):author_names+=all_names(related.get(author['id']))
 authors={normal(a) for a in author_names if a}
 checks=[]
 for ident in external_ids:
  d=works.get(ident)
  if d is None:checks.append({'id':ident,'status':'not_returned','source_url':'https://openlibrary.org/works/'+ident});continue
  title_match=normal(d.get('title','')) in titles
  matched_authors=[name for name in d.get('author_name',[]) if normal(name) in authors]
  author_match=bool(matched_authors)
  description=r.get('description_en') or ''
  # A work key shared by a short story, expanded novel or collection is not a
  # reliable edition/grain link. Non-novel or unknown grains stay in review.
  novel_candidate=bool(re.search(r'\bnovel\b',description,re.I)) and not re.search(r'\bnovella\b|\bnovelette\b|\bcollection\b|\bseries\b|\banthology\b',description,re.I)
  scope_ok=r['source_entity_kind']=='work_or_unspecified' and len(external_ids)==1 and identifier_uses[ident]==1 and novel_candidate
  status='title_author_correspondence' if title_match and author_match and scope_ok else 'identity_or_scope_needs_review'
  source_year=r.get('first_year');library_year=d.get('first_publish_year')
  year_status='agree' if source_year is not None and source_year==library_year else 'different' if source_year is not None and library_year is not None else 'missing_source' if source_year is None and library_year is not None else 'missing_library'
  checks.append({'id':ident,'status':status,'source_url':'https://openlibrary.org/works/'+ident,'title_match':title_match,'author_match':author_match,'matched_authors':matched_authors,'scope_ok':scope_ok,'scope_basis':{'source_entity_kind':r['source_entity_kind'],'source_description':description,'novel_candidate':novel_candidate,'identifier_source_entity_count':identifier_uses[ident],'identifier_count':len(external_ids),'note':'仅候选单部小说的题名与至少一位作者对应；原语、初刊、版本限定及全部共同作者未独立证实。短篇、合集、系列、共享ID或未知粒度待核，不从其继承年份和主题候选。'},'year_comparison':{'source':source_year,'library':library_year,'status':year_status},'library':d})
 out.append({'id':r['id'],'checks':checks})
metadata={'provider':'Open Library','method':'existing-P648-batched-search-v1','source_records_with_ids':len(out),'unique_identifiers':len(ids),'returned_identifiers':len(works),'batch_count':len(responses),'failed_batches':len(errors),'fields':fields.split(','),'identity_matched_records':sum(any(c['status']=='title_author_correspondence' for c in r['checks']) for r in out),'scope_note':'既有作品标识定向批量核对；题名和作者一致仅确认部分书目字段，不等于原语、初刊、故事或文学分类完成核验。版本语言不可作原语。日期差异原样保留。','docs_url':'https://openlibrary.org/dev/docs/api/search','usage_url':'https://openlibrary.org/developers/api'}
write(ROOT/'research/library-crosschecks.json.gz',{'metadata':metadata,'records':out})
write(cache/'manifest.json',{'metadata':metadata,'requests':requests,'errors':errors})
print(json.dumps(metadata,ensure_ascii=False),flush=True)
