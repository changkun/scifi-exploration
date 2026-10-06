from pathlib import Path
import collections,hashlib,json
P=Path(__file__).resolve().parent
S=P/'global-breadth-selection-round4.json';sb=S.read_bytes()
sha=lambda b:hashlib.sha256(b).hexdigest()
rs=lambda o:sha(json.dumps(o,ensure_ascii=False,sort_keys=True,separators=(',',':')).encode())
assert sha(sb)=='7099068f045d7d332fe4ed8051cfe3c10015b4afe1fdd718344becf28c712a0b'
s=json.loads(sb);FIELDS=['narrative_mechanism','scientific_premise','reality_relation','story_era','expression_form']
counts=collections.Counter();files=[];ids=set();actualmissing=known=0
for part in range(1,7):
 f=P/f'global-breadth-round4-part{part}-proposals.json';raw=f.read_bytes();a=json.loads(raw);m=a['metadata']
 assert m['status']=='frozen_private_dimension_proposal_checkpoint' and m['source_publication_pending'] is True
 assert m['canonical_snapshot_sha256']==s['metadata']['canonical_sha256'] and m['last_published_separate']==s['metadata']['last_published_separate']
 assert all(m[k]==0 for k in ['new_query_count','new_open_count','new_core_count','new_material_read_count','new_original_fulltext_read_count','independently_verified_count'])
 assert m['selection_indices']==list(range((part-1)*50,part*50))
 c=collections.Counter()
 for r in a['records']:
  i=r['selection_index'];o=s['records'][i];assert r['id']==o['id'] and r['id'] not in ids;ids.add(r['id'])
  assert r['identity']==o['identity'] and r['current_grain_and_date']==o['current_grain_and_date']
  assert r['source_index_sha256']==o['current_source_index_sha256'] and r['source_analysis_ref']==o['source_analysis_ref']
  assert r['active_core_assertion_sha256']==o['active_core_assertion_sha256']==rs(o['active_core_assertion'])
  assert r['selection_reference']['record_sha256']==rs(o) and r['selection_reference']['file_sha256']==sha(sb)
  assert r['whole_prior_reference']['record_sha256']==o['current_source_search_log_sha256']==rs(o['current_source_search_log'])
  assert r['original_provenance_scope']['record_presence']==o['original_record_provenance_presence']
  assert r['original_provenance_scope']['metadata_presence']==o['original_metadata_provenance_presence']
  assert r['original_provenance_scope']['original_metadata_reference']==o['source_analysis_metadata_reference']
  assert r['sources']==o['retained_source_urls'] and r['verification_status']=='knowledge_added_unverified'
  assert set(r['proposed_fields'])|set(r['unproposed_fields'])==set(FIELDS) and not set(r['proposed_fields'])&set(r['unproposed_fields'])
  assert set(r['missing_fields'])|set(r['preserved_known_fields'])==set(r['unproposed_fields'])
  for k,v in r['proposed_fields'].items():
   assert isinstance(v['proposed_value'],str) and v['proposed_value']
   assert v['basis']['issue']==o['current_core_fields']['issue']
   assert v['basis']['facet_bases']==[t['basis'] for t in o['current_core_fields']['issue_facets'] or []]
   assert v['original_material_scope']==o['original_material_scope'] and v['retained_sources']==o['retained_source_urls']
   assert v['new_material_read'] is False and v['independently_verified'] is False
   assert v['source_analysis_ref']==o['source_analysis_ref'] and v['active_core_assertion_sha256']==o['active_core_assertion_sha256']
   c[k]+=1
  for k,v in r['unproposed_fields'].items():
   assert v['pre_presence']==o['pre_dimension_fields'][k]
   if v['status']=='actual_missing':assert k in r['missing_fields'];actualmissing+=1
   elif v['status']=='existing_known_preserved':assert k in r['preserved_known_fields'];known+=1
   else:raise AssertionError('unknown slot status')
 assert sum(c.values())==m['proposed_field_count'] and dict(c)=={k:v for k,v in m['field_counts'].items() if v}
 counts.update(c);files.append({'file':str(f.relative_to(P.parent.parent)),'sha256':sha(raw),'records':len(a['records']),'fields':sum(c.values()),'field_counts':dict(c)})
assert len(ids)==300 and sum(counts.values())+actualmissing+known==1500
out=P/'global-breadth-round4-proposal-selfcheck-private.json';assert not out.exists()
proof={'metadata':{'status':'frozen_private_proposal_structural_and_provenance_check','date':'2026-10-06','not_independent_literary_verification':True,'source_publication_pending_as_originally_recorded':True,'no_public_write':True,'no_new_query_or_material_read':True,'no_actual_post_adoption_claim':True},'selection_file':str(S.relative_to(P.parent.parent)),'selection_sha256':sha(sb),'canonical_source_sha256':s['metadata']['canonical_sha256'],'input_files':files,'record_count':len(ids),'proposed_field_count':sum(counts.values()),'field_counts':dict(counts),'unproposed_slot_count':actualmissing+known,'actual_missing_slot_count':actualmissing,'existing_known_preserved_slot_count':known,'checks':{'five_field_whitelist_and_partition':True,'selection_identity_grain_and_source_index_exact':True,'active_core_assertion_exact':True,'original_A_refs_and_record_hash_exact':True,'whole_prior_hash_and_original_presence_exact':True,'old_URLs_and_material_scope_not_new_read':True,'source_pending_and_last_published_separate':True,'all_operations_new_query_open_core_verification_zero':True,'no_space_lock_in_grain':all('spatial_primary' not in r['current_grain_and_date'] and 'spatial_evidence' not in r['current_grain_and_date'] for r in s['records'])}}
raw=(json.dumps(proof,ensure_ascii=False,indent=2)+'\n').encode();out.write_bytes(raw);print(json.dumps({'file':str(out),'sha256':sha(raw),'records':len(ids),'fields':sum(counts.values()),'counts':dict(counts),'missing':actualmissing,'known_preserved':known},ensure_ascii=False))
