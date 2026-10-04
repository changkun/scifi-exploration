"""Extract only existing catalogue Work IDs from an official Open Library dump.

Bulk content uses the monthly dump, not thousands of per-book API calls.
The dump is streamed and never stored. Source descriptions are kept in the
separate private working directory for reading, not copied into public assets.
No topic or plot analysis is produced by this acquisition step.
"""
import argparse, datetime, gzip, hashlib, io, json, pathlib, time, urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
p = argparse.ArgumentParser(description=__doc__)
p.add_argument('--url', required=True)
p.add_argument('--cache-directory', required=True)
a = p.parse_args()
cache = pathlib.Path(a.cache_directory).resolve()
if not cache.is_absolute() or cache == ROOT or ROOT in cache.parents:
    raise SystemExit('Raw source descriptions must stay outside the public Site checkout.')
cache.mkdir(parents=True, exist_ok=True)
source = json.load(gzip.open(ROOT / 'research/structured-bibliography.json.gz'))
ids = {i for r in source['records'] for i in r.get('openlibrary_work_ids', [])}
keys = {('/works/' + i).encode(): i for i in ids}
manifest_path = cache / 'manifest.json'
manifest = {'provider': 'Open Library', 'method': 'official-monthly-work-dump-filter-v1',
            'request_url': a.url, 'requested_identifiers': len(ids), 'status': 'running',
            'started_at': datetime.datetime.now(datetime.UTC).isoformat(), 'documents': [],
            'note': 'Source descriptions are reading material only; identity, text grain and plot still require review. No analysis has been inferred.'}
digest = hashlib.sha256()

class CountingReader(io.RawIOBase):
    def __init__(self, response):
        self.response, self.count = response, 0
    def readable(self):
        return True
    def readinto(self, b):
        chunk = self.response.read(len(b))
        b[:len(chunk)] = chunk
        self.count += len(chunk)
        digest.update(chunk)
        return len(chunk)

lines, found, descriptions, last = 0, set(), 0, 0.0
def checkpoint(status):
    manifest.update(status=status, scanned_records=lines, returned_identifiers=len(found),
                    with_description=descriptions, compressed_bytes_read=reader.count,
                    updated_at=datetime.datetime.now(datetime.UTC).isoformat())
    temp = manifest_path.with_suffix('.tmp')
    temp.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
    temp.replace(manifest_path)
    print(json.dumps({k: manifest[k] for k in ['status', 'scanned_records', 'returned_identifiers', 'with_description', 'compressed_bytes_read']}), flush=True)

request = urllib.request.Request(a.url, headers={'User-Agent': 'scifi-exploration research (https://github.com/changkun/scifi-exploration)'})
try:
    with urllib.request.urlopen(request, timeout=60) as response:
        manifest['resolved_url'] = response.geturl()
        manifest['http_last_modified'] = response.headers.get('Last-Modified')
        manifest['compressed_content_length'] = response.headers.get('Content-Length')
        reader = CountingReader(response)
        with gzip.GzipFile(fileobj=io.BufferedReader(reader, buffer_size=1024*1024)) as data:
            for line in data:
                lines += 1
                parts = line.split(b'\t', 4)
                if len(parts) != 5:
                    raise ValueError('Monthly dump row lacks expected five columns.')
                ident = keys.get(parts[1])
                if ident:
                    if ident in found:
                        raise ValueError('Duplicate work key in monthly current-revision dump: ' + ident)
                    raw = json.loads(parts[4])
                    value = raw.get('description', '')
                    description = value.get('value', '') if isinstance(value, dict) else value
                    doc = {'provider': 'Open Library', 'external_id': ident,
                           'source_url': 'https://openlibrary.org/works/' + ident,
                           'dump_url': a.url, 'dump_revision': parts[2].decode(),
                           'dump_last_modified': parts[3].decode(), 'record': raw}
                    payload = json.dumps(doc, ensure_ascii=False, separators=(',', ':')).encode()
                    file = cache / (ident + '.json.gz')
                    file.write_bytes(gzip.compress(payload, mtime=0))
                    found.add(ident)
                    descriptions += bool(isinstance(description, str) and description.strip())
                    manifest['documents'].append({'id': ident, 'file': file.name,
                         'sha256': hashlib.sha256(file.read_bytes()).hexdigest(),
                         'has_description': bool(isinstance(description, str) and description.strip())})
                if time.monotonic() - last > 20:
                    checkpoint('running')
                    last = time.monotonic()
        manifest['compressed_stream_sha256'] = digest.hexdigest()
        manifest['not_returned_identifiers'] = sorted(ids - found)
        checkpoint('complete')
except Exception as error:
    manifest['error'] = str(error)
    if 'reader' in globals():
        checkpoint('interrupted')
    else:
        manifest['status'] = 'failed_before_reading'
        manifest['error'] = str(error)
        manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
    raise
