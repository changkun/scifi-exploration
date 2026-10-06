import {createHash} from 'node:crypto';
import {readFileSync,existsSync} from 'node:fs';
import {join,basename} from 'node:path';
// Closed R99 route: exact two IDs bind even if every optional marker is deleted.
// Additional classification fields may be appended; core/form/history and all
// three adopted spatial fields remain bound. No raw web return is archived.
const PINS={
  "baseline": "9ffe1180ea19ab6b26f1f1549636757babb05956e9aa2f562b1576cb263637fc",
  "owner_baseline": "9ffe1180ea19ab6b26f1f1549636757babb05956e9aa2f562b1576cb263637fc",
  "inputs": {
    "modern-easy-core-round99-part1-spatial.json": {
      "archive": "research/spatial-input-snapshots/modern-easy-core-round99-part1-spatial.json",
      "sha256": "3a4072260681a610a77e98c1de4439aae10d064b899c9e192eb364e915ca16e6",
      "count": 1,
      "analysis": {
        "archive": "research/issue-input-snapshots/modern-easy-core-round99-part1.json",
        "sha256": "1d30c9fbae795fb6bdd122577229bffc23ea7226c36957b66531cc3f602e7807"
      },
      "log": {
        "archive": "research/issue-input-snapshots/modern-easy-core-round99-part1-log.json",
        "sha256": "8aec40c2cd63e46777778c39372b4423c6faf51d9a55d621b812396eb086ee33"
      }
    },
    "modern-easy-core-round99-part2-spatial.json": {
      "archive": "research/spatial-input-snapshots/modern-easy-core-round99-part2-spatial.json",
      "sha256": "db9fabaa18fddd567a8f09de40821c7702776e8e9d397a78654fd85e43a1c73c",
      "count": 2,
      "analysis": {
        "archive": "research/issue-input-snapshots/modern-easy-core-round99-part2.json",
        "sha256": "605509169620cb854f46914cd1bb2bf2550c755d61de28f53d64a7bea891ed33"
      },
      "log": {
        "archive": "research/issue-input-snapshots/modern-easy-core-round99-part2-log.json",
        "sha256": "687e01384a79978610a73cf2edeb722595b62cb8b5cca06bfe9d6272da5792f0"
      }
    }
  },
  "ids": [
    "Q133800935",
    "Q7769416"
  ],
  "binding": {
    "archive": "research/spatial-input-snapshots/r99-fixed-samebatch-adopted-binding-context-v1-private.json",
    "sha256": "2297b8c3792952683311a091f38dfee9f5b6d9d9280445585c55762e1db8f038"
  },
  "normalized": {
    "archive": "research/spatial-input-snapshots/r99-samebatch-spatial-pre-context.json",
    "sha256": "461ffd99e3df44cd337aebc6ebe9703d86f6fdc76d81a654a3c2c0c651ee477e"
  },
  "owner": {
    "archive": "research/issue-input-snapshots/modern-easy-core-round99-selection-private.json",
    "sha256": "7b43ce15d583fa4270024f7e9fb9d9abc7f618a91d3778673db8fb6d4648424e"
  },
  "original_owner_literal": "/Users/changkun/Documents/Codex/2026-10-04/ke/work/evidence/modern-easy-core-round99-selection-private.json",
  "adapters": [
    {
      "archive": "research/issue-input-snapshots/round99-symphony-spatial-omission-adapter-private.json",
      "sha256": "4699c29744add867d6f58729fde8e6b9ac91ae0ba8cbbc5e52193dbd9627f39a"
    }
  ],
  "receipt": {
    "archive": "research/issue-input-snapshots/round98-published-site.json",
    "sha256": "f88b03207064b5bfbcce68c592a2bb0da122b3ff62d87d90c6f59580ffa7817f"
  },
  "publication_binding": {
    "archive": "research/issue-input-snapshots/round99-R98-actual-publication-binding-private.json",
    "sha256": "b92e0b6d42ffb8ad86a714a64f7c5bfd9d966033cbdd87f9c10ff20eddecbf8e"
  },
  "aggregate_core": {
    "archive": "research/issues-source-reading-round99.json",
    "sha256": "a7eec99af029264b1e792a83e72783a5b8ca3617b7a7b484a0be34f768c32942"
  },
  "aggregate_spatial": {
    "archive": "research/spatial-reading-round91.json",
    "sha256": "37583f412934b947e3adda28a3916eb4d222c591487ca02e120486dfd50e4696"
  }
};
export const R99_FIXED_SAME_BATCH_SPATIAL_INPUTS=Object.freeze(PINS.inputs);
export const R99_FIXED_SPATIAL_IDS=Object.freeze(PINS.ids);
const H=b=>createHash('sha256').update(b).digest('hex');
const sorted=v=>Array.isArray(v)?v.map(sorted):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sorted(v[k])])):v;
export const r99SameBatchRecordSha=v=>H(JSON.stringify(sorted(v)));
const equal=(a,b)=>r99SameBatchRecordSha(a)===r99SameBatchRecordSha(b);
const memo=new Map();
function exactFile(pin,{repoDir,evidenceDir},kind){
 if(!repoDir||!(/^research\/(issue|spatial)-input-snapshots\/[^/]+\.json$/.test(pin.archive)||['research/issues-source-reading-round99.json','research/spatial-reading-round91.json'].includes(pin.archive)))throw new Error('R99 exact '+kind+' path');
 const path=join(repoDir,pin.archive),b=readFileSync(path);
 if(H(b)!==pin.sha256)throw new Error('R99 exact '+kind+' file hash');
 if(evidenceDir){const f=join(evidenceDir,basename(pin.archive));if(existsSync(f)&&H(readFileSync(f))!==pin.sha256)throw new Error('R99 exact '+kind+' private/archive mismatch');}
 const key=path+pin.sha256;if(!memo.has(key))memo.set(key,JSON.parse(b));return memo.get(key);
}
function row(doc,id,kind){const rs=[...(doc.records||[]),...(doc.deferred||[])].filter(r=>r.id===id);if(rs.length!==1)throw new Error('R99 exact '+kind+' unique record');return rs[0];}
const spaceKeys=['spatial_primary','spatial_secondary','spatial_rationale'];
const scopeKeys=['id','title_zh','author','form','forms','source_entity_kind','source_types'];
const scope=w=>Object.fromEntries(scopeKeys.map(k=>[k,w[k]]));
const projection=w=>Object.fromEntries(spaceKeys.map(k=>[k,{present:Object.hasOwn(w,k),value:w[k]??null}]));
const zones=new Set(['earth','planetary','interstellar','galactic','cosmic','abstract']);
export function r99FixedSameBatchSpatialIds(){return new Set(R99_FIXED_SPATIAL_IDS);}
export function isR99FixedSameBatchSpatialRecord(r){return R99_FIXED_SPATIAL_IDS.includes(r.id)||Object.hasOwn(R99_FIXED_SAME_BATCH_SPATIAL_INPUTS,r.source_spatial_input_file);}
export function validateR99FixedSameBatchSpatialEvidence(record,{repoDir,evidenceDir,currentWork,issueAssertions,sourceSearchLog,spatialAdoptionPhase='auto'}={}){
 const reject=why=>{throw new Error('R99 fixed same-batch rejected ('+why+'): '+record.id);};
 const ctx={repoDir,evidenceDir},p=R99_FIXED_SAME_BATCH_SPATIAL_INPUTS[record.source_spatial_input_file];
 const receipt=exactFile(PINS.receipt,ctx,'actual R98 publication receipt'),pub=exactFile(PINS.publication_binding,ctx,'separate actual public binding');
 if(receipt.status!=='published_native_terminal_succeeded_actual_refs_verified'||receipt.round!==98||receipt.site?.status!=='succeeded'||receipt.canonical_sha256!==PINS.baseline||receipt.github_main_commit!=='85f8e3a2937e0b59f970891ba61344fe429bcc7d'||receipt.github_site_delivery_commit!=='89b7f2e6dee1ab3b6e4551cc71f255b265345a7f'||pub.publication_receipt_binding.sha256!==PINS.receipt.sha256||pub.publication_receipt_binding.actual_public_canonical_sha256!==PINS.baseline||pub.metadata.original_pending_declaration_preserved!==true)reject('independent exact actual receipt binding');
 const adoptedA=row(exactFile(PINS.aggregate_core,ctx,'core aggregate'),record.id,'core aggregate'),adoptedS=row(exactFile(PINS.aggregate_spatial,ctx,'spatial aggregate'),record.id,'spatial aggregate');
 if(!equal(adoptedS,record))reject('exact aggregate adopted spatial row');
 if(!R99_FIXED_SPATIAL_IDS.includes(record.id)||!p||record.source_spatial_input_sha256!==p.sha256||record.source_spatial_input_archive!==p.archive)reject('fixed ID/original S declaration');
 const sd=exactFile(p,ctx,'S'),s=row(sd,record.id,'S');
 const bind=row(exactFile(PINS.binding,ctx,'binding'),record.id,'binding');
 if(sd.records.length!==p.count||record.source_spatial_input_record_sha256!==r99SameBatchRecordSha(s)||!equal(record,bind.exact_derived_spatial_record)||bind.original_spatial_record_sha256!==r99SameBatchRecordSha(s))reject('exact original/derived S');
 const a=row(exactFile(p.analysis,ctx,'A'),record.id,'A'),l=row(exactFile(p.log,ctx,'L'),record.id,'L');
 if(r99SameBatchRecordSha(a)!==bind.original_analysis_record_sha256||r99SameBatchRecordSha(l)!==bind.original_log_record_sha256||s.source_analysis_file!==basename(p.analysis.archive)||s.source_analysis_sha256!==p.analysis.sha256||s.source_analysis_record_sha256!==r99SameBatchRecordSha(a)||record.source_analysis_file!==s.source_analysis_file||record.source_analysis_sha256!==p.analysis.sha256||record.source_analysis_record_sha256!==r99SameBatchRecordSha(a)||record.source_analysis_archive!==p.analysis.archive||s.source_log_file!==basename(p.log.archive)||s.source_log_sha256!==p.log.sha256||s.source_log_record_sha256!==r99SameBatchRecordSha(l)||record.source_log_archive!==p.log.archive||record.source_log_sha256!==p.log.sha256||record.source_log_record_sha256!==r99SameBatchRecordSha(l))reject('original A/L exact file/record declarations');
 // Immutable scope/type adapters are separate from the old raw A/L/S files.
 for(const pin of PINS.adapters)exactFile(pin,ctx,'scope adapter');
 const n=row(exactFile(PINS.normalized,ctx,'normalized pre-context'),record.id,'normalized context');
 const old=n.original_work,adopted=n.adopted_core,expected=n.expected_normalized_source_log;
 if(r99SameBatchRecordSha(old)!==bind.original_full_work_record_sha256||!equal(adoptedA,adopted)||!equal(adopted,bind.exact_adopted_core)||!equal(expected,bind.exact_expected_normalized_source_log)||old.issue_analysis_status!=='missing'||old.spatial_primary!=='unknown')reject('baseline full work/adopted core/new process');
 const od=exactFile(PINS.owner,ctx,'assignment');
 if(od.metadata.status!=='frozen_private_exclusive_root_authorized_missing_core_selection'||od.metadata.delegate!=='modern_history'||od.records.length!==50||od.metadata.target_round!==99||od.metadata.canonical_snapshot_sha256!==PINS.owner_baseline||od.metadata.source_publication_pending!==false)reject('immutable original assignment phase');
 const i=record.original_ownership_index,own=od.records[i];
 if(!Number.isInteger(i)||i<0||i>=50||own?.id!==record.id||own.selection_index!==i||l.ownership_index!==i||s.original_ownership_index!==i||s.original_ownership_file!==PINS.original_owner_literal||record.original_ownership_file!==PINS.original_owner_literal||s.original_ownership_sha256!==PINS.owner.sha256||record.original_ownership_sha256!==PINS.owner.sha256||!equal(own.current_canonical_record,old)||own.current_canonical_record_sha256!==r99SameBatchRecordSha(old)||!equal(own.canonical_original_prior_source_search_log,l.prior_source_log)||own.canonical_original_prior_source_search_log_sha256!==r99SameBatchRecordSha(l.prior_source_log)||!equal(old.source_search_log,own.canonical_original_prior_source_search_log)||!equal(own.original_counter_presence,l.original_counter_presence))reject('exact delegate/index/full prior/counter presence');
 const presence=Object.fromEntries(Object.keys(l).map(k=>[k,true]));
 if(!equal(l.original_counter_fields,bind.original_counter_fields)||!equal(presence,bind.original_log_property_presence)||!equal(expected.raw_reading_log,l))reject('original raw log/counter presence');
 const prior=own.canonical_original_prior_source_search_log,rawPrior=own.full_prior_source_search_log;
 if(!equal(rawPrior,l.exact_current_process_prior)||r99SameBatchRecordSha(rawPrior)!==own.full_prior_source_search_log_sha256||r99SameBatchRecordSha(rawPrior)!==l.exact_current_process_prior_sha256||r99SameBatchRecordSha(rawPrior)!==bind.exact_original_raw_process_prior_sha256||!equal(l.canonical_raw_prior_differing_keys,own.canonical_raw_prior_differing_keys)||!equal(own.canonical_raw_prior_differing_keys,['input_file','log_date']))reject('both exact full original prior variants');
 const history=(rawPrior.previous_attempts||[]).concat([Object.fromEntries(Object.entries(rawPrior).filter(([k])=>k!=='previous_attempts'))]);
 if(!equal(expected.prior_source_log,prior)||!equal(expected.previous_attempts,history)||!equal(expected.materials_checked.slice(0,(rawPrior.materials_checked||[]).length),rawPrior.materials_checked||[])||!(rawPrior.queries||[]).every(q=>expected.queries.includes(q)))reject('full cumulative history/old prefix');
 if(!currentWork||!equal(scope(currentWork),scope(old))||!equal(record.identity,{title:old.title_zh,author:old.author})||!equal(record.identity,a.identity)||!equal(record.identity,l.identity)||!equal(record.identity,adopted.identity))reject('exact identity/form/grain');
 if(!equal(Object.keys(a.fields).sort(),['issue','issue_facets','topics'])||!equal(Object.keys(adopted.fields).sort(),['issue','issue_facets','topics'])||adopted.fields.issue_facets.length<2||a.verification_status!=='knowledge_added_unverified'||adopted.verification_status!=='knowledge_added_unverified'||record.verification_status!=='knowledge_added_unverified'||record.integration_relation!=='same_batch_core'||!equal(record.fields,s.fields)||!equal(record.sources,s.sources))reject('unverified exact core/three original spatial values');
 if(issueAssertions!==undefined&&!equal(issueAssertions,currentWork.knowledge?.assertions)||sourceSearchLog!==undefined&&!equal(sourceSearchLog,currentWork.source_search_log))reject('explicit builder context');
 const assertions=currentWork.knowledge?.assertions||[];
 const active=assertions.some(x=>equal(Object.fromEntries(Object.entries(x).filter(([k])=>k!=='input_file')),adopted));
 const before=equal(currentWork.source_search_log,prior),after=equal(currentWork.source_search_log,expected);
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
