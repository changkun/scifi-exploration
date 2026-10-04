#!/usr/bin/env python3
"""Reproduce the stated Wikidata query set; reuse .json.gz caches by default.
Run from the repository root. Uses only Python's standard library.
"""
import argparse,collections,gzip,json,time,urllib.request,urllib.parse,urllib.error,subprocess,sys
from pathlib import Path
from datetime import datetime,timezone

parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output-dir',default='research/reproduced')
parser.add_argument('--cache-dir',default='research/source-export')
parser.add_argument('--fresh',action='store_true',help='Use an empty cache directory to query the current source; does not erase existing files.')
args=parser.parse_args()
OUTPUT=Path(args.output_dir);CACHE=Path(args.cache_dir);OUTPUT.mkdir(parents=True,exist_ok=True);CACHE.mkdir(parents=True,exist_ok=True)
HELPERS=Path(__file__).parent/'catalog-reproduction'
if args.fresh and any(CACHE.glob('*.json*')):raise SystemExit('--fresh requires an empty --cache-dir; preserve the existing snapshot.')
QUERY_DIR=CACHE/'queries';QUERY_DIR.mkdir(parents=True,exist_ok=True)
ENDPOINT='https://query.wikidata.org/sparql'
HEADERS={'User-Agent':'ScienceFictionLiteratureMap/1.0 (public literary bibliography research)','Accept':'application/sparql-results+json','Accept-Encoding':'gzip,deflate','Content-Type':'application/x-www-form-urlencoded'}
last_completed=0.0
log=[]
def load_file(path):
 path=Path(path)
 if not path.exists() and Path(str(path)+'.gz').exists():path=Path(str(path)+'.gz')
 return json.loads(gzip.decompress(path.read_bytes()) if path.suffix=='.gz' else path.read_bytes())
def has_file(name):return (CACHE/(name+'.json')).exists() or (CACHE/(name+'.json.gz')).exists()
def save_file(name,data):
 raw=json.dumps(data,ensure_ascii=False,separators=(',',':')).encode()
 (CACHE/(name+'.json.gz')).write_bytes(gzip.compress(raw,compresslevel=9,mtime=0))
def wait_gap(seconds):
 while seconds>0:
  print('Service cooldown:',round(seconds,1),'seconds',flush=True)
  time.sleep(min(seconds,30));seconds=max(0,65-(time.time()-last_completed))
def fetch(name,query):
 global last_completed
 if has_file(name):
  print('Cached:',name,flush=True);return load_file(CACHE/(name+'.json'))
 (QUERY_DIR/(name+'.sparql')).write_text(query)
 for attempt in range(2):
  wait_gap(max(0,65-(time.time()-last_completed)))
  (QUERY_DIR/(name+'.executed.sparql')).write_text(query)
  started=time.time()
  body=urllib.parse.urlencode({'query':query,'format':'json'}).encode()
  try:
   with urllib.request.urlopen(urllib.request.Request(ENDPOINT,data=body,headers=HEADERS),timeout=85) as response:
    raw=response.read()
    if response.headers.get('Content-Encoding')=='gzip':raw=gzip.decompress(raw)
   data=json.loads(raw);save_file(name,data);last_completed=time.time()
   log.append({'query':name,'retrieved_at':datetime.now(timezone.utc).isoformat(),'seconds':round(last_completed-started,2),'row_count':len(data.get('results',{}).get('bindings',[]))})
   save_file('reproduction-request-log',log)
   print('Fetched:',name,log[-1]['row_count'],'rows',flush=True);return data
  except urllib.error.HTTPError as error:
   last_completed=time.time();retry_after=error.headers.get('Retry-After')
   log.append({'query':name,'retrieved_at':datetime.now(timezone.utc).isoformat(),'seconds':round(last_completed-started,2),'error':str(error),'retry_after':retry_after})
   save_file('reproduction-request-log',log)
   if error.code==429 and attempt==0:
    try:delay=max(65,float(retry_after or 65))
    except ValueError:delay=65
    print('Rate limited; respecting Retry-After:',delay,flush=True)
    while delay>0:
     step=min(delay,30);time.sleep(step);delay-=step
    continue
   raise
 raise RuntimeError('Query did not complete')

membership='?work wdt:P136/wdt:P279* wd:Q24925 . ?work wdt:P31/wdt:P279* wd:Q7725634 .'
rows=fetch('membership','SELECT DISTINCT ?work WHERE { '+membership+' }')['results']['bindings']
ids=sorted({r['work']['value'].rsplit('/',1)[-1] for r in rows},key=lambda v:int(v[1:]));
if not has_file('work-ids'):save_file('work-ids',ids)
fields=collections.defaultdict(lambda:collections.defaultdict(list))
for start in range(0,len(ids),3000):
 values=' '.join('wd:'+i for i in ids[start:start+3000])
 query='''SELECT ?work ?field ?value WHERE {
 VALUES ?work { '''+values+''' }
 { { VALUES ?prop { wdt:P50 wdt:P2093 wdt:P577 wdt:P407 wdt:P31 wdt:P136 wdt:P1476 wdt:P648 }
 ?work ?prop ?value . BIND(STRAFTER(STR(?prop),"/direct/") AS ?field) }
 UNION { ?work rdfs:label ?value . FILTER(LANG(?value) IN ("zh","zh-hans","en")) BIND(CONCAT("label_",LANG(?value)) AS ?field) }
 UNION { ?work schema:description ?value . FILTER(LANG(?value) IN ("zh","en")) BIND(CONCAT("description_",LANG(?value)) AS ?field) }
 } }'''
 for r in fetch('fields-large-'+str(start),query)['results']['bindings']:
  i=r['work']['value'].rsplit('/',1)[-1];f=r['field']['value'];v=r['value']
  if v not in fields[i][f]:fields[i][f].append(v)
values=' '.join('wd:'+i for i in ids)
query='''SELECT ?work ?field ?value ?targetLabel WHERE {
 VALUES ?work { '''+values+''' }
 { { ?work rdfs:label ?value . BIND(CONCAT("label_",LANG(?value)) AS ?field) }
 UNION { ?work skos:altLabel ?value . BIND(CONCAT("alias_",LANG(?value)) AS ?field) }
 UNION { VALUES ?prop { wdt:P179 wdt:P361 wdt:P155 wdt:P156 wdt:P144 wdt:P747 }
 ?work ?prop ?value . BIND(STRAFTER(STR(?prop),"/direct/") AS ?field)
 OPTIONAL { ?value rdfs:label ?targetLabel . FILTER(LANG(?targetLabel) IN ("zh","zh-hans","en")) } } } }'''
fetch('source-extra',query)
related=sorted({v['value'].rsplit('/',1)[-1] for fs in fields.values() for prop in ['P50','P407','P31','P136'] for v in fs.get(prop,[]) if v.get('type')=='uri' and '/entity/Q' in v['value']},key=lambda v:int(v[1:]))
query='SELECT ?entity ?label WHERE { VALUES ?entity { '+' '.join('wd:'+i for i in related)+' } ?entity rdfs:label ?label . }'
fetch('related-full',query)
# The published snapshot includes a second all-language response; reuse it when present.
if has_file('related-all-labels'):load_file(CACHE/'related-all-labels.json')
genres=sorted({v['value'].rsplit('/',1)[-1] for fs in fields.values() for v in fs.get('P136',[])},key=lambda v:int(v[1:]));
if not has_file('genre-ids'):save_file('genre-ids',genres)
query='''SELECT DISTINCT ?genre ?ancestor ?parent ?label WHERE {
 VALUES ?genre { '''+' '.join('wd:'+i for i in genres)+''' }
 ?genre wdt:P279* ?ancestor . OPTIONAL { ?ancestor wdt:P279 ?parent . }
 OPTIONAL { ?ancestor rdfs:label ?label . FILTER(LANG(?label) IN ("zh","zh-hans","en")) } }'''
fetch('genre-ancestry',query)
seed=json.loads((HELPERS/'seed_notes.json').read_text());seed.update({'retrieved_date':datetime.now(timezone.utc).date().isoformat(),'source':'Wikidata Query Service','raw_cache_dir':'research/source-export','reproduction_script':'scripts/reproduce-wikidata.py','query_directory':'research/source-export/queries','source_export_archive_note':'完整相关实体标签集中于related_entities，通过QID关联；raw响应可复现。'})
(OUTPUT/'expanded-catalog-notes.json').write_text(json.dumps(seed,ensure_ascii=False,indent=2)+'\n')
for helper in ['normalize_wikidata.py','screen_catalog.py','build_genre_hierarchy.py']:
 subprocess.run([sys.executable,str(HELPERS/helper),str(OUTPUT),str(CACHE)],check=True)
print('Complete:',len(ids),'source entities; outputs in',str(OUTPUT),flush=True)
