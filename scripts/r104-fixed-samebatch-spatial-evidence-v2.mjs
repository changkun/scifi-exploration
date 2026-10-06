import {createHash} from 'node:crypto';
import {readFileSync,existsSync} from 'node:fs';
import {join,basename} from 'node:path';
// Closed R104 route: exact one ID bind even if every optional marker is deleted.
// Additional classification fields may be appended; core/form/history and all
// three adopted spatial fields remain bound. No raw web return is archived.
const PINS={
  "baseline": "a15dacb0b305936403ce1c25c1fd458366adf4fa6cd1e61d9b1498cb791f119a",
  "owner_baseline": "a15dacb0b305936403ce1c25c1fd458366adf4fa6cd1e61d9b1498cb791f119a",
  "inputs": {
    "modern-easy-core-round104-spatial-part1.json": {
      "archive": "research/spatial-input-snapshots/modern-easy-core-round104-spatial-part1.json",
      "sha256": "ef2c7b54f4f98220a32eef81e11df70d8c2293b8229a0eec0f7723780f776f2d",
      "count": 1,
      "analysis": {
        "archive": "research/issue-input-snapshots/modern-easy-core-round104-part1.json",
        "sha256": "d6ea4807e67baba7725549344eaa24d5ee48d34c04a2613e90fd885f8bf1cf5a"
      },
      "log": {
        "archive": "research/issue-input-snapshots/modern-easy-core-round104-part1-log.json",
        "sha256": "85f01ef115329b8618137f3bb00db77fe7cdb1a15ae6993cd6a6c62369669a45"
      }
    }
  },
  "ids": [
    "Q125913273"
  ],
  "binding": {
    "archive": "research/spatial-input-snapshots/r104-fixed-samebatch-adopted-binding-context-private.json",
    "sha256": "c8bc431b0e879a15acd180a7eff7511b54ff6f320f54d62c34aff55d0bb6e52e"
  },
  "normalized": {
    "archive": "research/spatial-input-snapshots/r104-samebatch-spatial-pre-context-private.json",
    "sha256": "6cb7c80e1b1efd6ac2e22439ce96437e31bfbe609947beb5b435c0e7dba5a624"
  },
  "owner": {
    "archive": "research/issue-input-snapshots/modern-easy-core-round104-selection-private.json",
    "sha256": "a8c87cc21152b2ee8c413971577ee3aca5c87afd9ffc84e0ed297a362fb50f79"
  },
  "original_owner_literal": "/Users/changkun/Documents/Codex/2026-10-04/ke/work/evidence/modern-easy-core-round104-selection-private.json",
  "adapters": [
    {
      "archive": "research/issue-input-snapshots/round104-modern-two-exact-core-scope-adapter-private.json",
      "sha256": "b463ddb150829e656a88ca83f19df57f1d06d2c80b19528da11fe21f4b509a29"
    }
  ],
  "receipt": {
    "archive": "research/issue-input-snapshots/round103-published-site.json",
    "sha256": "9b88cc9a36adacfc16418cba4767f2dee3240156f93c1702adbc7be52686bdba"
  },
  "publication_binding": {
    "archive": "research/issue-input-snapshots/round104-modern20-later-R103-actual-publication-binding-private.json",
    "sha256": "68697b71cc67e89e7bafdd28f5f5921f180d384d2f60acf7b00c0577561742fb"
  },
  "aggregate_core": {
    "archive": "research/issues-source-reading-round104.json",
    "sha256": "cd9b4eb466633a4f83227a98b54b4f5e5f67392d55866e9dda1e38549ce68df2"
  },
  "aggregate_spatial": {
    "archive": "research/spatial-reading-round96.json",
    "sha256": "97c0b3b992f750ae761c5b7e7873de249a678487ab0356631e6fd28f51554cac"
  },
  "derived_analysis": {
    "archive": "research/issue-input-snapshots/modern-easy-core-round104-part1-derived-scoped.json",
    "sha256": "622664440fab7fb1b6427777e4728ded3c158eadb4c79f24bbf4439cf9b59313"
  }
};
export const R104_FIXED_SAME_BATCH_SPATIAL_INPUTS=Object.freeze(PINS.inputs);
export const R104_FIXED_SPATIAL_IDS=Object.freeze(PINS.ids);
const H=b=>createHash('sha256').update(b).digest('hex');
const sorted=v=>Array.isArray(v)?v.map(sorted):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sorted(v[k])])):v;
export const r104SameBatchRecordSha=v=>H(JSON.stringify(sorted(v)));
const equal=(a,b)=>r104SameBatchRecordSha(a)===r104SameBatchRecordSha(b);
const memo=new Map();
function exactFile(pin,{repoDir,evidenceDir},kind){
 if(!repoDir||!(/^research\/(issue|spatial)-input-snapshots\/[^/]+\.json$/.test(pin.archive)||['research/issues-source-reading-round104.json','research/spatial-reading-round96.json'].includes(pin.archive)))throw new Error('R104 exact '+kind+' path');
 const path=join(repoDir,pin.archive),b=readFileSync(path);
 if(H(b)!==pin.sha256)throw new Error('R104 exact '+kind+' file hash');
 if(evidenceDir){const f=join(evidenceDir,basename(pin.archive));if(existsSync(f)&&H(readFileSync(f))!==pin.sha256)throw new Error('R104 exact '+kind+' private/archive mismatch');}
 const key=path+pin.sha256;if(!memo.has(key))memo.set(key,JSON.parse(b));return memo.get(key);
}
function row(doc,id,kind){const rs=[...(doc.records||[]),...(doc.deferred||[])].filter(r=>r.id===id);if(rs.length!==1)throw new Error('R104 exact '+kind+' unique record');return rs[0];}
const spaceKeys=['spatial_primary','spatial_secondary','spatial_rationale'];
const scopeKeys=['id','title_zh','author','form','forms','source_entity_kind','source_types'];
const scope=w=>Object.fromEntries(scopeKeys.map(k=>[k,w[k]]));
const projection=w=>Object.fromEntries(spaceKeys.map(k=>[k,{present:Object.hasOwn(w,k),value:w[k]??null}]));
const zones=new Set(['earth','planetary','interstellar','galactic','cosmic','abstract']);
export function r104FixedSameBatchSpatialIds(){return new Set(R104_FIXED_SPATIAL_IDS);}
export function isR104FixedSameBatchSpatialRecord(r){return R104_FIXED_SPATIAL_IDS.includes(r.id)||Object.hasOwn(R104_FIXED_SAME_BATCH_SPATIAL_INPUTS,r.source_spatial_input_file);}
export function validateR104FixedSameBatchSpatialEvidence(record,{repoDir,evidenceDir,currentWork,issueAssertions,sourceSearchLog,spatialAdoptionPhase='auto'}={}){
 const reject=why=>{throw new Error('R104 fixed same-batch rejected ('+why+'): '+record.id);};
 const ctx={repoDir,evidenceDir},p=R104_FIXED_SAME_BATCH_SPATIAL_INPUTS[record.source_spatial_input_file];
 const receipt=exactFile(PINS.receipt,ctx,'actual R103 publication receipt'),pub=exactFile(PINS.publication_binding,ctx,'separate actual public binding');
 if(receipt.status!=='published_native_terminal_succeeded_actual_refs_verified'||receipt.round!==103||receipt.site?.status!=='succeeded'||receipt.canonical_sha256!==PINS.baseline||receipt.github_main_commit!=='93c20a87f169a4783dd18d1ec124604c7ec85379'||receipt.github_site_delivery_commit!=='01d93397b0a6859b93187910b29290037b36579a'||pub.metadata.actual_later_publication_receipt_sha256!==PINS.receipt.sha256||pub.metadata.actual_canonical_sha256!==PINS.baseline||pub.metadata.original_publication_pending!==true)reject('independent exact actual receipt binding');
 const adoptedA=row(exactFile(PINS.aggregate_core,ctx,'core aggregate'),record.id,'core aggregate'),adoptedS=row(exactFile(PINS.aggregate_spatial,ctx,'spatial aggregate'),record.id,'spatial aggregate');
 if(!equal(adoptedS,record))reject('exact aggregate adopted spatial row');
 if(!R104_FIXED_SPATIAL_IDS.includes(record.id)||!p||record.source_spatial_input_sha256!==p.sha256||record.source_spatial_input_archive!==p.archive)reject('fixed ID/original S declaration');
 const sd=exactFile(p,ctx,'S'),s=row(sd,record.id,'S');
 const bind=row(exactFile(PINS.binding,ctx,'binding'),record.id,'binding');
 if(sd.records.length!==p.count||record.source_spatial_input_record_sha256!==r104SameBatchRecordSha(s)||!equal(record,bind.exact_derived_spatial_record)||bind.original_spatial_record_sha256!==r104SameBatchRecordSha(s))reject('exact original/derived S');
 const a=row(exactFile(p.analysis,ctx,'A'),record.id,'A'),l=row(exactFile(p.log,ctx,'L'),record.id,'L');
 if(r104SameBatchRecordSha(a)!==bind.original_analysis_record_sha256||r104SameBatchRecordSha(l)!==bind.original_log_record_sha256||s.source_analysis_file!==basename(p.analysis.archive)||s.source_analysis_sha256!==p.analysis.sha256||s.source_analysis_record_sha256!==r104SameBatchRecordSha(a)||record.source_analysis_file!==s.source_analysis_file||record.source_analysis_sha256!==PINS.derived_analysis.sha256||record.source_analysis_record_sha256!==r104SameBatchRecordSha(row(exactFile(PINS.derived_analysis,ctx,'derived A'),record.id,'derived A'))||record.source_analysis_archive!==PINS.derived_analysis.archive||s.source_log_file!==basename(p.log.archive)||s.source_log_sha256!==p.log.sha256||s.source_log_record_sha256!==r104SameBatchRecordSha(l)||record.source_log_archive!==p.log.archive||record.source_log_sha256!==p.log.sha256||record.source_log_record_sha256!==r104SameBatchRecordSha(l))reject('original A/L exact file/record declarations');
 // Immutable scope/type adapters are separate from the old raw A/L/S files.
 for(const pin of PINS.adapters)exactFile(pin,ctx,'scope adapter');
 const n=row(exactFile(PINS.normalized,ctx,'normalized pre-context'),record.id,'normalized context');
 const old=n.original_work,adopted=n.adopted_core,expected=n.expected_normalized_source_log;
 if(r104SameBatchRecordSha(old)!==bind.original_full_work_record_sha256||!equal(adoptedA,adopted)||!equal(adopted,bind.exact_adopted_core)||!equal(expected,bind.exact_expected_normalized_source_log)||old.issue_analysis_status!=='missing'||old.spatial_primary!=='unknown')reject('baseline full work/adopted core/new process');
 const od=exactFile(PINS.owner,ctx,'assignment');
 if(od.metadata.status!=='frozen_private_exclusive_root_authorized_missing_core_selection'||od.metadata.delegate!=='modern_history'||od.records.length!==20||od.metadata.target_round!==104||od.metadata.canonical_snapshot_sha256!==PINS.owner_baseline||od.metadata.source_publication_pending!==true)reject('immutable original assignment phase');
 const i=record.original_ownership_index,own=od.records[i];
 if(!Number.isInteger(i)||i<0||i>=20||own?.id!==record.id||own.selection_index!==i||l.ownership_index!==i||s.original_ownership_index!==i||s.original_ownership_file!==PINS.original_owner_literal||record.original_ownership_file!==PINS.original_owner_literal||s.original_ownership_sha256!==PINS.owner.sha256||record.original_ownership_sha256!==PINS.owner.sha256||!equal(own.current_canonical_record,old)||own.current_canonical_record_sha256!==r104SameBatchRecordSha(old)||!equal(own.canonical_original_prior_source_search_log,l.canonical_original_prior_source_search_log)||own.canonical_original_prior_source_search_log_sha256!==r104SameBatchRecordSha(l.canonical_original_prior_source_search_log)||!equal(old.source_search_log,own.canonical_original_prior_source_search_log)||!equal(own.original_counter_presence,l.original_counter_presence))reject('exact delegate/index/full prior/counter presence');
 const presence=Object.fromEntries(Object.keys(l).map(k=>[k,true]));
 if(!equal(l.original_counter_fields,bind.original_counter_fields)||!equal(presence,bind.original_log_property_presence)||!equal(expected.raw_reading_log,l))reject('original raw log/counter presence');
 const prior=own.canonical_original_prior_source_search_log,rawPrior=own.full_prior_source_search_log;
 if(!equal(rawPrior,l.prior_source_log)||r104SameBatchRecordSha(rawPrior)!==own.full_prior_source_search_log_sha256||r104SameBatchRecordSha(rawPrior)!==l.prior_source_log_sha256||r104SameBatchRecordSha(rawPrior)!==bind.exact_original_raw_process_prior_sha256||!equal(l.canonical_raw_prior_differing_keys,own.canonical_raw_prior_differing_keys)||!equal(own.canonical_raw_prior_differing_keys,['input_file','log_date']))reject('both exact full original prior variants');
 const history=(rawPrior.previous_attempts||[]).concat([Object.fromEntries(Object.entries(rawPrior).filter(([k])=>k!=='previous_attempts'))]);
 if(!equal(expected.prior_source_log,rawPrior)||!equal(expected.previous_attempts,history)||!equal(expected.materials_checked.slice(0,(rawPrior.materials_checked||[]).length),rawPrior.materials_checked||[])||!(rawPrior.queries||[]).every(q=>expected.queries.includes(q)))reject('full cumulative history/old prefix');
 if(!currentWork||!equal(scope(currentWork),scope(old))||!equal(record.identity,{title:old.title_zh,author:old.author})||!equal(record.identity,a.identity)||!equal(record.identity,l.identity)||!equal(record.identity,adopted.identity))reject('exact identity/form/grain');
 if(!equal(Object.keys(a.fields).sort(),['issue','issue_facets','topics'])||!equal(Object.keys(adopted.fields).sort(),['issue','issue_facets','topics'])||adopted.fields.issue_facets.length<2||a.verification_status!=='knowledge_added_unverified'||adopted.verification_status!=='knowledge_added_unverified'||record.verification_status!=='knowledge_added_unverified'||record.integration_relation!=='same_batch_core'||!equal(record.fields,s.fields)||!equal(record.sources,s.sources))reject('unverified exact core/three original spatial values');
 if(issueAssertions!==undefined&&!equal(issueAssertions,currentWork.knowledge?.assertions)||sourceSearchLog!==undefined&&!equal(sourceSearchLog,currentWork.source_search_log))reject('explicit builder context');
 const assertions=currentWork.knowledge?.assertions||[];
 const active=assertions.some(x=>equal(Object.fromEntries(Object.entries(x).filter(([k])=>k!=='input_file')),adopted));
 // The frozen expected record is the raw process row. Both canonical wrappers
 // are copied from the exact old canonical prior; no history or counter changes.
 const canonicalExpected={input_file:prior.input_file,log_date:prior.log_date,...expected};
 const before=equal(currentWork.source_search_log,prior),after=equal(currentWork.source_search_log,canonicalExpected);
 const oldCore=currentWork.issue_analysis_status==='missing'&&currentWork.issue===old.issue;
 const newCore=currentWork.issue_analysis_status!=='missing'&&currentWork.issue===adopted.fields.issue&&equal(currentWork.issue_facets,adopted.fields.issue_facets);
 if(!(oldCore&&before&&!active||oldCore&&after&&active||newCore&&after&&active))reject('exact pre/staged/post core and additive source');
 if(currentWork.knowledge&&Object.hasOwn(currentWork.knowledge,'verification_status')&&currentWork.knowledge.verification_status!=='knowledge_added_unverified')reject('verification upgrade');
 if(!equal(Object.keys(record.fields).sort(),spaceKeys.slice().sort())||!zones.has(record.fields.spatial_primary)||!Array.isArray(record.fields.spatial_secondary)||record.fields.spatial_secondary.some(z=>!zones.has(z)||z===record.fields.spatial_primary)||!record.fields.spatial_rationale?.trim()||!['auto','pre','post'].includes(spatialAdoptionPhase))reject('fields/phase');
 if(currentWork.spatial_primary==='unknown'){
  if(spatialAdoptionPhase==='post'||!equal(currentWork.spatial_evidence,old.spatial_evidence)||!equal(projection(currentWork),projection(old))||!equal(projection(currentWork.knowledge?.fields||{}),projection(old.knowledge?.fields||{})))reject('exact unknown pre spatial state');
 }else{
  const e=currentWork.spatial_evidence,k=currentWork.knowledge?.fields;
  if(spatialAdoptionPhase==='pre'||!newCore||!after||!active||currentWork.spatial_primary!==record.fields.spatial_primary||!e||!['primary','secondary','rationale'].every(x=>Object.hasOwn(e,x))||e.primary!==record.fields.spatial_primary||!equal(e.secondary,record.fields.spatial_secondary)||e.rationale!==record.fields.spatial_rationale||!k||!spaceKeys.every(x=>Object.hasOwn(k,x)&&equal(k[x],record.fields[x]))||k.issue!==adopted.fields.issue||!equal(k.issue_facets,adopted.fields.issue_facets))reject('actual post three spatial locations/core');
 }
 return 'scoped_reading';
}
