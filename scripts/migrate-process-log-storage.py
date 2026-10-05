"""Proposal-only exact-byte migration. Defaults to inspect; writes only with --write."""
from pathlib import Path
import argparse,importlib.util,json
base=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('storage',base/'process_log_storage.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);p.add_argument('--write',action='store_true');args=p.parse_args()
r=m.read_process_log(args.repo);raw=r['raw_bytes_value'];artifacts=m.encode_process_storage(raw)
proof=json.loads(artifacts[m.MANIFEST]);result={'status':'proposal_dry_run','original_storage_path':r['storage_path'],'storage':proof,'no_research_objects_modified':True,'compressed_ratio':round(proof['storage_bytes']/proof['raw_bytes'],6)}
if args.write:
 for rel,b in artifacts.items():
  path=args.repo/rel;tmp=path.with_suffix(path.suffix+'.new');tmp.write_bytes(b);tmp.replace(path)
 verified=m.read_process_log(args.repo);assert verified['raw_bytes_value']==raw
 # Removal occurs only after dual-file equality and manifest validation.
 plain=args.repo/m.LOGICAL
 if plain.exists():plain.unlink()
 assert m.read_process_log(args.repo)['raw_bytes_value']==raw
 result['status']='lossless_migration_verified'
print(json.dumps(result,ensure_ascii=False,indent=2))
