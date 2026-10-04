"""Index acquired source documents without publishing their description text.

The public inventory records acquisition and identity checks only. The private
reading packet contains source descriptions; neither output infers any theme.
"""
import argparse, gzip, json, pathlib, unicodedata

ROOT = pathlib.Path(__file__).resolve().parents[1]
p = argparse.ArgumentParser(description=__doc__)
p.add_argument('--cache-directory', required=True)
p.add_argument('--reading-index', required=True)
a = p.parse_args()
cache, private = pathlib.Path(a.cache_directory).resolve(), pathlib.Path(a.reading_index).resolve()
if ROOT == private or ROOT in private.parents or ROOT == cache or ROOT in cache.parents:
    raise SystemExit('Source descriptions must stay outside the public checkout.')
def read_gz(path):
    return json.load(gzip.open(path))
def norm(value):
    return ''.join(c for c in unicodedata.normalize('NFKC', value or '').casefold() if c.isalnum())
manifest = json.loads((cache / 'manifest.json').read_text())
if manifest['status'] != 'complete':
    raise SystemExit('Finish acquiring the dump before indexing its coverage.')
sources = read_gz(ROOT / 'research/structured-bibliography.json.gz')['records']
checks = {r['id']: r['checks'] for r in read_gz(ROOT / 'research/library-crosschecks.json.gz')['records']}
canonical = read_gz(ROOT / 'research/canonical-universe.json.gz')['works']
works = {w['id']: w for w in canonical}
documents = {}
for item in manifest['documents']:
    doc = read_gz(cache / item['file'])
    record = doc['record']
    value = record.get('description', '')
    text = value.get('value', '') if isinstance(value, dict) else value
    text = text if isinstance(text, str) else ''
    authors = [v.get('author', {}).get('key') for v in record.get('authors', [])]
    documents[item['id']] = dict(id=item['id'], source_url=doc['source_url'], title=record.get('title'),
        author_keys=[v for v in authors if v], has_description=bool(text.strip()),
        description_characters=len(text), record_sha256=item['sha256'],
        dump_revision=doc['dump_revision'], dump_last_modified=doc['dump_last_modified'], text=text)
rows, packet = [], []
for source in sources:
    materials = []
    for ident in source.get('openlibrary_work_ids', []):
        doc = documents.get(ident)
        if not doc:
            materials.append(dict(id=ident, source_url='https://openlibrary.org/works/' + ident,
                acquisition_status='not_returned_in_current_dump', has_description=False))
            continue
        prior = next((c for c in checks.get(source['id'], []) if c['id'] == ident), {})
        old = prior.get('library') or {}
        same_title = bool(old.get('title') and norm(doc['title']) == norm(old['title']))
        same_authors = bool(set(doc['author_keys']) & {'/authors/' + v for v in old.get('author_key', [])})
        material = {k: v for k, v in doc.items() if k != 'text'}
        material.update(acquisition_status='returned', previous_identity_status=prior.get('status'),
            same_dump_title=same_title, same_dump_authors=same_authors,
            identity_note='仅对照此次资料与先前外部书目，题名和至少一位作者相同也不等于文本粒度或整条作品已核实。')
        materials.append(material)
        work = works.get(source['id'])
        if work and work['issue_analysis_status'] == 'missing' and doc['text'].strip():
            packet.append(dict(id=work['id'], title=work['title_zh'], author=work['author'], year=work['sort_year'],
                work_id=ident, record_status=prior.get('status'), same_dump_title=same_title,
                same_dump_authors=same_authors, dump_title=doc['title'], description=doc['text'],
                description_characters=len(doc['text']), source_url=doc['source_url'], record_sha256=doc['record_sha256']))
    if materials:
        rows.append(dict(id=source['id'], materials=materials))
metadata = {k: v for k, v in manifest.items() if k not in ['documents', 'not_returned_identifiers']}
metadata.update(format='acquired-reading-materials-v1', record_count=len(rows),
    note='这是资料取得记录，不是内容已研读或议题已补全记录。书目简介可能含版本混合、转载或错误；需逐条辨明，全文不公开复制。')
public = dict(metadata=metadata, records=rows, not_returned_identifiers=manifest['not_returned_identifiers'])
payload = gzip.compress(json.dumps(public, ensure_ascii=False, separators=(',', ':')).encode(), mtime=0)
(ROOT / 'research/reading-materials.json.gz').write_bytes(payload)
private.parent.mkdir(parents=True, exist_ok=True)
private.write_text(json.dumps(dict(metadata=metadata, records=packet), ensure_ascii=False) + '\n')
print(json.dumps(dict(source_records=len(rows), returned=manifest['returned_identifiers'],
    descriptions=manifest['with_description'], pending_packets=len(packet),
    pending_old_identity_matched=sum(r['record_status']=='title_author_correspondence' and r['same_dump_title'] and r['same_dump_authors'] for r in packet))))
