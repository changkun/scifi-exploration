import {createHash} from 'node:crypto';
import {readFileSync,existsSync} from 'node:fs';
import {join,basename} from 'node:path';
// Closed R98 route: exact three IDs bind even if every optional marker is deleted.
// Additional classification fields may be appended; core/form/history and all
// three adopted spatial fields remain bound. No raw web return is archived.
const PINS={
  "baseline": "60d6f1f1d84244a01b721a1d1a3f15ff0d2b3b84c8f5d5424cb0f57474d2845c",
  "owner_baseline": "aaec0375e7b795465de5514142d1a3c423fba7a7668cde36999812fd911e7513",
  "inputs": {
    "modern-easy-core-round98-part1-spatial.json": {
      "archive": "research/spatial-input-snapshots/modern-easy-core-round98-part1-spatial.json",
      "sha256": "ad7ce71ca1e41b53fc5d2ca2a2b0f41849655fc16eb15a0367405e74431d99d3",
      "count": 1,
      "analysis": {
        "archive": "research/issue-input-snapshots/modern-easy-core-round98-part1.json",
        "sha256": "9679d78b3cf43e3c1e4b43555d41aea46a1e570799778c92c02bbedada14a73b"
      },
      "log": {
        "archive": "research/issue-input-snapshots/modern-easy-core-round98-part1-log.json",
        "sha256": "031325354baee295eb4feb9d54c040285e3ab08a7c1d44bd1f5be3921b7c2bac"
      }
    },
    "modern-easy-core-round98-part2-spatial.json": {
      "archive": "research/spatial-input-snapshots/modern-easy-core-round98-part2-spatial.json",
      "sha256": "c90552abe055436f78157c1e9e5b90f6dfbebb8e12e6f3e3d2af26bc44a42629",
      "count": 2,
      "analysis": {
        "archive": "research/issue-input-snapshots/modern-easy-core-round98-part2.json",
        "sha256": "064c09fee5376712aaf106bce94f7b8fb5e478442ac93f2706dbe1ca693caf2a"
      },
      "log": {
        "archive": "research/issue-input-snapshots/modern-easy-core-round98-part2-log.json",
        "sha256": "edda5e151575263e44f0ba9f295740052c7a195a86cdf91ff6e809b89aa129b1"
      }
    }
  },
  "ids": [
    "Q131471765",
    "Q134526868",
    "Q28419541"
  ],
  "binding": {
    "archive": "research/spatial-input-snapshots/r98-fixed-samebatch-adopted-binding-context-v1-private.json",
    "sha256": "39a91c26b71e3cc025dab5b9ad2846e7296d9a4ef973df835b2db6bb75193c18"
  },
  "normalized": {
    "archive": "research/spatial-input-snapshots/r98-samebatch-spatial-pre-context.json",
    "sha256": "2e0b93c23f419bae812cec1ef125c3dc3f01aeaf11844dc4b4ecb039cd4e1cc1"
  },
  "owner": {
    "archive": "research/issue-input-snapshots/modern-easy-core-round98-selection-private.json",
    "sha256": "e15b37b53e9ab870a3a7bc6ce207fd6f4e8830b6afe7c120b04204ba407a17d7"
  },
  "original_owner_literal": "/Users/changkun/Documents/Codex/2026-10-04/ke/work/evidence/modern-easy-core-round98-selection-private.json",
  "adapters": [],
  "receipt": {
    "archive": "research/issue-input-snapshots/round97-published-site-v2.json",
    "sha256": "33266feb912bc79fb4f7c2dddea5c3c3fa1f36bc69134c2086fc36318addc42d"
  },
  "publication_binding": {
    "archive": "research/issue-input-snapshots/round98-R97-actual-publication-binding-private.json",
    "sha256": "e25a203ce6ddb9829d307ca9862748612162705e8147a46f49ee3c1331232441"
  },
  "aggregate_core": {
    "archive": "research/issues-source-reading-round98.json",
    "sha256": "f39e5d754bb8587848ad53507be3d349e99daaf25a7d520055da62335fbcd729"
  },
  "aggregate_spatial": {
    "archive": "research/spatial-reading-round88.json",
    "sha256": "e7e45a56960ec6ce6b5a167d789d51dbab602779a1e131866919d75f1fec17fa"
  }
};
export const R98_FIXED_SAME_BATCH_SPATIAL_INPUTS=Object.freeze(PINS.inputs);
export const R98_FIXED_SPATIAL_IDS=Object.freeze(PINS.ids);
const H=b=>createHash('sha256').update(b).digest('hex');
const sorted=v=>Array.isArray(v)?v.map(sorted):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sorted(v[k])])):v;
export const r98SameBatchRecordSha=v=>H(JSON.stringify(sorted(v)));
const equal=(a,b)=>r98SameBatchRecordSha(a)===r98SameBatchRecordSha(b);
const memo=new Map();
function exactFile(pin,{repoDir,evidenceDir},kind){
 if(!repoDir||!(/^research\/(issue|spatial)-input-snapshots\/[^/]+\.json$/.test(pin.archive)||['research/issues-source-reading-round98.json','research/spatial-reading-round88.json'].includes(pin.archive)))throw new Error('R98 exact '+kind+' path');
 const path=join(repoDir,pin.archive),b=readFileSync(path);
 if(H(b)!==pin.sha256)throw new Error('R98 exact '+kind+' file hash');
 if(evidenceDir){const f=join(evidenceDir,basename(pin.archive));if(existsSync(f)&&H(readFileSync(f))!==pin.sha256)throw new Error('R98 exact '+kind+' private/archive mismatch');}
 const key=path+pin.sha256;if(!memo.has(key))memo.set(key,JSON.parse(b));return memo.get(key);
}
function row(doc,id,kind){const rs=[...(doc.records||[]),...(doc.deferred||[])].filter(r=>r.id===id);if(rs.length!==1)throw new Error('R98 exact '+kind+' unique record');return rs[0];}
const spaceKeys=['spatial_primary','spatial_secondary','spatial_rationale'];
const scopeKeys=['id','title_zh','author','form','forms','source_entity_kind','source_types'];
const scope=w=>Object.fromEntries(scopeKeys.map(k=>[k,w[k]]));
const projection=w=>Object.fromEntries(spaceKeys.map(k=>[k,{present:Object.hasOwn(w,k),value:w[k]??null}]));
const zones=new Set(['earth','planetary','interstellar','galactic','cosmic','abstract']);
export function r98FixedSameBatchSpatialIds(){return new Set(R98_FIXED_SPATIAL_IDS);}
export function isR98FixedSameBatchSpatialRecord(r){return R98_FIXED_SPATIAL_IDS.includes(r.id)||Object.hasOwn(R98_FIXED_SAME_BATCH_SPATIAL_INPUTS,r.source_spatial_input_file);}
export function validateR98FixedSameBatchSpatialEvidence(record,{repoDir,evidenceDir,currentWork,issueAssertions,sourceSearchLog,spatialAdoptionPhase='auto'}={}){
 const reject=why=>{throw new Error('R98 fixed same-batch rejected ('+why+'): '+record.id);};
 const ctx={repoDir,evidenceDir},p=R98_FIXED_SAME_BATCH_SPATIAL_INPUTS[record.source_spatial_input_file];
 const receipt=exactFile(PINS.receipt,ctx,'actual R97 publication receipt'),pub=exactFile(PINS.publication_binding,ctx,'separate actual public binding');
 if(receipt.status!=='published_terminal_succeeded'||receipt.round!==97||receipt.site?.status!=='succeeded'||receipt.canonical_sha256!==PINS.baseline||receipt.github_main_commit!=='e81ba2baeea4f8c0d28076ea54563f0d3c209439'||receipt.github_site_delivery_commit!=='5a8a8339034afe22c612df061cb5b4ba641e8c39'||pub.publication_receipt_binding.sha256!==PINS.receipt.sha256||pub.publication_receipt_binding.actual_public_canonical_sha256!==PINS.baseline||pub.metadata.original_pending_declaration_preserved!==true)reject('independent exact actual receipt binding');
 const adoptedA=row(exactFile(PINS.aggregate_core,ctx,'core aggregate'),record.id,'core aggregate'),adoptedS=row(exactFile(PINS.aggregate_spatial,ctx,'spatial aggregate'),record.id,'spatial aggregate');
 if(!equal(adoptedS,record))reject('exact aggregate adopted spatial row');
 if(!R98_FIXED_SPATIAL_IDS.includes(record.id)||!p||record.source_spatial_input_sha256!==p.sha256||record.source_spatial_input_archive!==p.archive)reject('fixed ID/original S declaration');
 const sd=exactFile(p,ctx,'S'),s=row(sd,record.id,'S');
 const bind=row(exactFile(PINS.binding,ctx,'binding'),record.id,'binding');
 if(sd.records.length!==p.count||record.source_spatial_input_record_sha256!==r98SameBatchRecordSha(s)||!equal(record,bind.exact_derived_spatial_record)||bind.original_spatial_record_sha256!==r98SameBatchRecordSha(s))reject('exact original/derived S');
 const a=row(exactFile(p.analysis,ctx,'A'),record.id,'A'),l=row(exactFile(p.log,ctx,'L'),record.id,'L');
 if(r98SameBatchRecordSha(a)!==bind.original_analysis_record_sha256||r98SameBatchRecordSha(l)!==bind.original_log_record_sha256||s.source_analysis_file!==basename(p.analysis.archive)||s.source_analysis_sha256!==p.analysis.sha256||s.source_analysis_record_sha256!==r98SameBatchRecordSha(a)||record.source_analysis_file!==s.source_analysis_file||record.source_analysis_sha256!==p.analysis.sha256||record.source_analysis_record_sha256!==r98SameBatchRecordSha(a)||record.source_analysis_archive!==p.analysis.archive||s.source_log_file!==basename(p.log.archive)||s.source_log_sha256!==p.log.sha256||s.source_log_record_sha256!==r98SameBatchRecordSha(l)||record.source_log_archive!==p.log.archive||record.source_log_sha256!==p.log.sha256||record.source_log_record_sha256!==r98SameBatchRecordSha(l))reject('original A/L exact file/record declarations');
 // Immutable scope/type adapters are separate from the old raw A/L/S files.
 for(const pin of PINS.adapters)exactFile(pin,ctx,'scope adapter');
 const n=row(exactFile(PINS.normalized,ctx,'normalized pre-context'),record.id,'normalized context');
 const old=n.original_work,adopted=n.adopted_core,expected=n.expected_normalized_source_log;
 if(r98SameBatchRecordSha(old)!==bind.original_full_work_record_sha256||!equal(adoptedA,adopted)||!equal(adopted,bind.exact_adopted_core)||!equal(expected,bind.exact_expected_normalized_source_log)||old.issue_analysis_status!=='missing'||old.spatial_primary!=='unknown')reject('baseline full work/adopted core/new process');
 const od=exactFile(PINS.owner,ctx,'assignment');
 if(od.metadata.status!=='frozen_private_exclusive_root_authorized_missing_core_selection'||od.metadata.delegate!=='modern_history'||od.records.length!==50||od.metadata.target_round!==98||od.metadata.canonical_snapshot_sha256!==PINS.owner_baseline||od.metadata.source_publication_pending!==true)reject('immutable original assignment phase');
 const i=record.original_ownership_index,own=od.records[i];
 if(!Number.isInteger(i)||i<0||i>=50||own?.id!==record.id||own.selection_index!==i||l.ownership_index!==i||s.original_ownership_index!==i||s.original_ownership_file!==PINS.original_owner_literal||record.original_ownership_file!==PINS.original_owner_literal||s.original_ownership_sha256!==PINS.owner.sha256||record.original_ownership_sha256!==PINS.owner.sha256||!equal(own.current_canonical_record,old)||own.current_canonical_record_sha256!==r98SameBatchRecordSha(old)||!equal(own.canonical_original_prior_source_search_log,l.prior_source_log)||own.canonical_original_prior_source_search_log_sha256!==r98SameBatchRecordSha(l.prior_source_log)||!equal(old.source_search_log,own.canonical_original_prior_source_search_log)||!equal(own.original_counter_presence,l.original_counter_presence))reject('exact delegate/index/full prior/counter presence');
 const presence=Object.fromEntries(Object.keys(l).map(k=>[k,true]));
 if(!equal(l.original_counter_fields,bind.original_counter_fields)||!equal(presence,bind.original_log_property_presence)||!equal(expected.raw_reading_log,l))reject('original raw log/counter presence');
 const prior=own.canonical_original_prior_source_search_log,rawPrior=own.full_prior_source_search_log;
 if(!equal(rawPrior,l.exact_current_process_prior)||r98SameBatchRecordSha(rawPrior)!==own.full_prior_source_search_log_sha256||r98SameBatchRecordSha(rawPrior)!==l.exact_current_process_prior_sha256||r98SameBatchRecordSha(rawPrior)!==bind.exact_original_raw_process_prior_sha256||!equal(l.canonical_raw_prior_differing_keys,own.canonical_raw_prior_differing_keys)||!equal(own.canonical_raw_prior_differing_keys,['input_file','log_date']))reject('both exact full original prior variants');
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
