"""Future integrator helper; exact raw bytes survive storage compression."""
import gzip,hashlib,json
from pathlib import Path
LOGICAL='research/issue-source-searches.json'
GZIP=LOGICAL+'.gz'
MANIFEST='research/issue-source-searches.storage.json'
def sha(b):return hashlib.sha256(b).hexdigest()
def read_process_log(repo, optional=False):
 repo=Path(repo);plain=(repo/LOGICAL).read_bytes() if (repo/LOGICAL).exists() else None
 packed=(repo/GZIP).read_bytes() if (repo/GZIP).exists() else None
 manifest_bytes=(repo/MANIFEST).read_bytes() if (repo/MANIFEST).exists() else None
 if plain is None and packed is None:
  if manifest_bytes is not None:raise ValueError('Orphan process storage manifest: archive is missing')
  if optional:return None
  raise FileNotFoundError(LOGICAL)
 raw=gzip.decompress(packed) if packed is not None else plain
 if plain is not None and packed is not None and raw!=plain:raise ValueError('Conflicting process JSON and gzip bytes')
 storage=packed if packed is not None else plain
 proof={'logical_path':LOGICAL,'storage_path':GZIP if packed is not None else LOGICAL,'codec':'gzip' if packed is not None else 'identity','raw_bytes':len(raw),'raw_sha256':sha(raw),'storage_bytes':len(storage),'storage_sha256':sha(storage)}
 if packed is not None and manifest_bytes is None:raise ValueError('Missing compressed process storage manifest')
 if manifest_bytes is not None:
  m=json.loads(manifest_bytes)
  if m.get('format')!='lossless-json-storage-v1' or any(m.get(k)!=v for k,v in proof.items()):raise ValueError('Process storage integrity mismatch')
 data=json.loads(raw)
 if not isinstance(data.get('records'),list):raise ValueError('Invalid complete process archive')
 return dict(proof,raw_bytes_value=raw,storage_bytes_value=storage,data=data)
def encode_process_storage(raw):
 """Accept exact serialization bytes from integration; never reserialize legacy input."""
 json.loads(raw)
 packed=gzip.compress(raw,compresslevel=9,mtime=0)
 manifest={'format':'lossless-json-storage-v1','logical_path':LOGICAL,'storage_path':GZIP,'codec':'gzip','raw_bytes':len(raw),'raw_sha256':sha(raw),'storage_bytes':len(packed),'storage_sha256':sha(packed)}
 assert gzip.decompress(packed)==raw
 return {GZIP:packed,MANIFEST:(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n').encode('utf-8')}
def artifact_json(rel,b):
 return json.loads(gzip.decompress(b) if rel.endswith('.gz') else b)
