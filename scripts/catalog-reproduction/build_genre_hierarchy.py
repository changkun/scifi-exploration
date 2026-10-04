import json,collections,sys,gzip
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

ids=read_json(BASE/'genre-ids.json')
rows=read_json(BASE/'genre-ancestry.json')['results']['bindings']
nodes={};ancestors=collections.defaultdict(set)
def qid(v):return v['value'].rsplit('/',1)[-1]
def order(v):return (0,int(v[1:])) if v.startswith('Q') and v[1:].isdigit() else (1,v)
for r in rows:
 g=qid(r['genre']);a=qid(r['ancestor']);ancestors[g].add(a)
 n=nodes.setdefault(a,{'id':a,'labels':{},'parents':set(),'source_url':'https://www.wikidata.org/wiki/'+a})
 if r.get('parent'):n['parents'].add(qid(r['parent']))
 if r.get('label'):n['labels'][r['label'].get('xml:lang','')]=r['label']['value']
for n in nodes.values():n['parents']=sorted(n['parents'],key=order)
genres=[]
for g in ids:
 n=nodes.get(g,{'id':g,'labels':{},'parents':[]})
 genres.append({'id':g,'labels':n['labels'],'parents':n['parents'],'ancestors':sorted(ancestors[g],key=order),'source_url':'https://www.wikidata.org/wiki/'+g})
d={'metadata':{'source':'Wikidata','retrieved_at':datetime.now(timezone.utc).isoformat(),'scope':'当前完整科幻文学查询集合所有直接P136 genre的P279*祖先闭包及闭包内直接P279边；源分类关系，非人工内容分析。','genre_count':len(ids),'node_count':len(nodes),'direct_edge_count':sum(len(n['parents']) for n in nodes.values()),'raw_row_count':len(rows),'reflexive_ancestor_path':True,'generic_ancestors_retained':True,'license':'CC0','query_file':'research/source-export/queries/genre-ancestry.executed.sparql','endpoint':'https://query.wikidata.org/sparql','classification_note':'上级路径含自身和泛类；展示时可折叠，但不能据此把所有上级词当成该作品已经人工核定的议题。'},'genres':genres,'nodes':[nodes[i] for i in sorted(nodes,key=order)]}
(OUTPUT/'expanded-genre-hierarchy.json').write_text(json.dumps(d,ensure_ascii=False,separators=(',',':'))+'\n')
print(json.dumps(d['metadata'],ensure_ascii=False))
