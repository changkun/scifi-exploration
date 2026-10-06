import {createHash} from 'node:crypto';
import {readFileSync,existsSync} from 'node:fs';
import {join,basename} from 'node:path';
// Only these exact R92 IDs and original S files enter this route. Earlier guard
// branches remain byte-preserved. No marker removal permits a generic fallback.
export const R92_FIXED_SAME_BATCH_SPATIAL_INPUTS=Object.freeze({
  "quick-retry2-root-round11-global-part1-spatial.json": {
    "archive": "research/spatial-input-snapshots/quick-retry2-root-round11-global-part1-spatial.json",
    "sha256": "2731812b0a903959eb56764aa74a54879994ffe5c05e59121954ce0928bf11d3",
    "count": 1,
    "analysis": {
      "archive": "research/issue-input-snapshots/quick-retry2-root-round11-global-part1.json",
      "sha256": "ffaa6c05fcaf8ab20cfd7ba364b66c455d5721dd6bbeffbdb467f7c7083fad01"
    },
    "log": {
      "archive": "research/issue-input-snapshots/quick-retry2-root-round11-global-part1-log.json",
      "sha256": "2491fc8ac62d653fb49675e713100c55b6601612bf4be878fd592284d4d1995f"
    },
    "original_analysis_record_hash_algorithm": "python-indent-2-newline-v1",
    "original_declared_ownership_file": "quick-retry2-lane-0.json",
    "derived_ownership_file": "quick-retry2-lane-0.json"
  },
  "quick-retry2-root-round11-global-part2-spatial.json": {
    "archive": "research/spatial-input-snapshots/quick-retry2-root-round11-global-part2-spatial.json",
    "sha256": "9e073080bcf43e3cbd24f72068369965a2fc85a72e974eaa7018e7c67af45ffb",
    "count": 1,
    "analysis": {
      "archive": "research/issue-input-snapshots/quick-retry2-root-round11-global-part2.json",
      "sha256": "754a6d21d90b361ac0265bcece7b191aed602c6bc1547a7a6a9271bb9340eb96"
    },
    "log": {
      "archive": "research/issue-input-snapshots/quick-retry2-root-round11-global-part2-log.json",
      "sha256": "1ed5ea91865eb55272df6cb63d4b2bd8b36eb2cc98ddac8d33951d1ed85fc7d4"
    },
    "original_analysis_record_hash_algorithm": "python-indent-2-newline-v1",
    "original_declared_ownership_file": "quick-retry2-lane-0.json",
    "derived_ownership_file": "quick-retry2-lane-0.json"
  },
  "quick-retry2-root-round12-modern-spatial-part1.json": {
    "archive": "research/spatial-input-snapshots/quick-retry2-root-round12-modern-spatial-part1.json",
    "sha256": "d024b9399b905986a1d85c5a12d8236b69a92becc75a179c1a6718b2e6f31152",
    "count": 3,
    "analysis": {
      "archive": "research/issue-input-snapshots/quick-retry2-root-round12-modern-part1.json",
      "sha256": "0f70242b307dedcac9cd23c3a12dafe027cf098b9ff611cae51312274394dada"
    },
    "log": {
      "archive": "research/issue-input-snapshots/quick-retry2-root-round12-modern-part1-log.json",
      "sha256": "0322da776a67bc4661513e121329f46c416b6957822859386585e6f3e0aeea99"
    },
    "original_analysis_record_hash_algorithm": "sortedcompact-json-v1",
    "original_declared_ownership_file": "work/evidence/quick-retry2-lane-0.json",
    "derived_ownership_file": "quick-retry2-lane-0.json"
  },
  "quick-retry2-root-round12-modern-spatial-part2.json": {
    "archive": "research/spatial-input-snapshots/quick-retry2-root-round12-modern-spatial-part2.json",
    "sha256": "ce00feaed5f2bc27768592311d2ee2196fd62a3c9cbccea93d42af813fb6a420",
    "count": 3,
    "analysis": {
      "archive": "research/issue-input-snapshots/quick-retry2-root-round12-modern-part2.json",
      "sha256": "a4ba08de1437061b70a821b431aa6869e855b447eed98e834f3d2d629142da95"
    },
    "log": {
      "archive": "research/issue-input-snapshots/quick-retry2-root-round12-modern-part2-log.json",
      "sha256": "861176ba07cc415f92b24f67561c67ed261d0fcba02ee9402121411b6f03964d"
    },
    "original_analysis_record_hash_algorithm": "sortedcompact-json-v1",
    "original_declared_ownership_file": "work/evidence/quick-retry2-lane-0.json",
    "derived_ownership_file": "quick-retry2-lane-0.json"
  },
  "round92-root-survival-spatial-derived.json": {
    "archive": "research/spatial-input-snapshots/round92-root-survival-spatial-derived.json",
    "sha256": "b6b8f712afd3eed1397be7e3b21010647a22c81095ca98d5e624e94719d190db",
    "count": 1,
    "analysis": {
      "archive": "research/issue-input-snapshots/quick-retry2-root-round11-global-part2.json",
      "sha256": "754a6d21d90b361ac0265bcece7b191aed602c6bc1547a7a6a9271bb9340eb96"
    },
    "log": {
      "archive": "research/issue-input-snapshots/quick-retry2-root-round11-global-part2-log.json",
      "sha256": "1ed5ea91865eb55272df6cb63d4b2bd8b36eb2cc98ddac8d33951d1ed85fc7d4"
    },
    "original_analysis_record_hash_algorithm": "sortedcompact-json-v1",
    "original_declared_ownership_file": "quick-retry2-lane-0.json",
    "derived_ownership_file": "quick-retry2-lane-0.json"
  }
});
export const R92_FIXED_SPATIAL_IDS=Object.freeze([
  "Q141132932",
  "Q54942528",
  "Q54984239",
  "Q55162711",
  "Q64706145",
  "Q72820259",
  "Q7728475",
  "Q90831606",
  "Q54800519"
]);
const ORIGINAL_CONTEXT={
  "archive": "research/spatial-input-snapshots/r92-fixed-samebatch-original-canonical-context-v2.json",
  "sha256": "74ace50dab2fbc1cfe4d572d73b8dc0fbcd05f8d2ffb9719f0baa8b1fcf907a8"
};
const NORMALIZED_CONTEXT={
  "archive": "research/spatial-input-snapshots/r92-samebatch-spatial-pre-adoption-context-v1.json",
  "sha256": "a3246f8334ab1533355b799e2bd16e8786ac9f9516e6821259f84aad457c3c2c"
};
const ADOPTED_CONTEXT={
  "archive": "research/spatial-input-snapshots/r92-fixed-samebatch-adopted-binding-context-v1.json",
  "sha256": "b7eea03e9a39602a126e1554fa325ec1d0126dcd70b69a1db800172f0861f37e"
};
const SIBLING_ADAPTER={
  "archive": "research/issue-input-snapshots/round92-q90831606-sibling-count-exact-field-adapter-modern-private.json",
  "sha256": "c8f4be6c9ad75a047fc96f081ec0da2aa2fad3cd1cf1a32a54ed3d129905cec2"
};
const OWNER=Object.freeze({archive:'research/issue-input-snapshots/quick-retry2-lane-0.json',sha256:'63042ce16ccdf6f42ce33b78c52284ce82e0efb2cb84e1ac6b7b2faf4b65c1f7'});
const H=b=>createHash('sha256').update(b).digest('hex');
const sorted=v=>Array.isArray(v)?v.map(sorted):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sorted(v[k])])):v;
export const r92SameBatchRecordSha=v=>H(JSON.stringify(sorted(v)));
const equal=(a,b)=>r92SameBatchRecordSha(a)===r92SameBatchRecordSha(b);
const clone=v=>JSON.parse(JSON.stringify(v));
const memo=new Map();
function exactFile(pin,{repoDir,evidenceDir},kind){
 if(!repoDir||!/^research\/(issue|spatial)-input-snapshots\/[^/]+\.json$/.test(pin.archive))throw new Error('R92 fixed '+kind+' archive path');
 const path=join(repoDir,pin.archive),bytes=readFileSync(path);
 if(H(bytes)!==pin.sha256)throw new Error('R92 fixed '+kind+' archive hash');
 if(evidenceDir){const f=join(evidenceDir,basename(pin.archive));if(existsSync(f)&&H(readFileSync(f))!==pin.sha256)throw new Error('R92 fixed '+kind+' private/archive mismatch');}
 const key=path+pin.sha256;if(!memo.has(key))memo.set(key,JSON.parse(bytes));return memo.get(key);
}
function row(doc,id,kind){const rows=[...(doc.records||[]),...(doc.deferred||[])].filter(x=>x.id===id);if(rows.length!==1)throw new Error('R92 fixed '+kind+' unique row');return rows[0];}
const spatialKeys=['spatial_primary','spatial_secondary','spatial_rationale'];
const scopeKeys=['id','title_zh','author','form','forms','source_entity_kind','source_types'];
const scope=w=>Object.fromEntries(scopeKeys.map(k=>[k,w[k]]));
const spatialProjection=w=>Object.fromEntries(spatialKeys.map(k=>[k,{present:Object.hasOwn(w,k),value:w[k]??null}]));
const zones=new Set(['earth','planetary','interstellar','galactic','cosmic','abstract']);
export function r92FixedSameBatchSpatialIds(){return new Set(R92_FIXED_SPATIAL_IDS);}
export function isR92FixedSameBatchSpatialRecord(record){return R92_FIXED_SPATIAL_IDS.includes(record.id)||Object.hasOwn(R92_FIXED_SAME_BATCH_SPATIAL_INPUTS,record.source_spatial_input_file);}
export function validateR92FixedSameBatchSpatialEvidence(record,{repoDir,evidenceDir,currentWork,issueAssertions,sourceSearchLog,spatialAdoptionPhase='auto'}={}){
 const reject=why=>{throw new Error('R92 fixed same-batch rejected ('+why+'): '+record.id);};
 const ctx={repoDir,evidenceDir},p=R92_FIXED_SAME_BATCH_SPATIAL_INPUTS[record.source_spatial_input_file];
 if(!R92_FIXED_SPATIAL_IDS.includes(record.id)||!p||record.source_spatial_input_sha256!==p.sha256||record.source_spatial_input_archive!==p.archive)reject('fixed ID/S declaration');
 const sdoc=exactFile(p,ctx,'original S'),s=row(sdoc,record.id,'original S');
 if(sdoc.records.length!==p.count||record.source_spatial_input_record_sha256!==r92SameBatchRecordSha(s))reject('original S exact row/count');
 const adoptedDoc=exactFile(ADOPTED_CONTEXT,ctx,'adopted binding context'),f=row(adoptedDoc,record.id,'adopted binding context');
 if(!equal(record,f.exact_derived_spatial_record)||f.original_spatial_record_sha256!==r92SameBatchRecordSha(s))reject('exact original-derived S payload');
 const ad=exactFile(p.analysis,ctx,'original A'),ld=exactFile(p.log,ctx,'original L'),a=row(ad,record.id,'original A'),l=row(ld,record.id,'original L');
 if(f.original_analysis_record_sha256!==r92SameBatchRecordSha(a)||f.original_log_record_sha256!==r92SameBatchRecordSha(l)||record.source_analysis_archive!==p.analysis.archive||record.source_analysis_sha256!==p.analysis.sha256||record.source_log_archive!==p.log.archive||record.source_log_sha256!==p.log.sha256||record.source_log_record_sha256!==r92SameBatchRecordSha(l))reject('exact original A/L');
 if(s.source_analysis_file!==basename(p.analysis.archive)||s.source_analysis_sha256!==p.analysis.sha256||record.source_analysis_file!==s.source_analysis_file)reject('original A declaration');
 const legacy=p.original_analysis_record_hash_algorithm==='python-indent-2-newline-v1'?H(JSON.stringify(a,null,2)+'\n'):r92SameBatchRecordSha(a);
 if(s.source_analysis_record_sha256!==legacy||record.source_analysis_record_sha256!==r92SameBatchRecordSha(a))reject('specific original legacy record hash');
 const od=exactFile(OWNER,ctx,'original owner');if(od.metadata.status!=='frozen_retry_assignment'||od.metadata.lane!==0)reject('owner phase');
 const own=od.records[record.original_ownership_index];
 if(!own||own.id!==record.id||s.original_ownership_file!==p.original_declared_ownership_file||record.original_ownership_file!=='quick-retry2-lane-0.json'||record.original_ownership_sha256!==OWNER.sha256||record.ownership_index!==record.original_ownership_index||l.ownership_index!==record.original_ownership_index||!equal(l.prior_source_log,own.prior_source_log))reject('exact owner index/full original prior');
 const cdoc=exactFile(ORIGINAL_CONTEXT,ctx,'original canonical'),cr=row(cdoc,record.id,'original canonical'),old=cr.pre_canonical_work;
 if(cr.pre_canonical_record_sha256!==r92SameBatchRecordSha(old)||old.issue_analysis_status!=='missing'||old.spatial_primary!=='unknown'||!equal(old.source_search_log,own.prior_source_log))reject('frozen exact original missing/unknown fullwork');
 const nd=exactFile(NORMALIZED_CONTEXT,ctx,'exact normalized context'),n=row(nd,record.id,'normalized context');
 if(!equal(n.identity_scope,scope(old))||!equal(n.prior_source_log,own.prior_source_log)||!equal(n.prior_spatial,spatialProjection(old))||!equal(n.prior_knowledge_spatial,spatialProjection(old.knowledge?.fields||{})))reject('original normalized context binding');
 if(!currentWork||currentWork.id!==record.id||!equal(scope(currentWork),scope(old))||!equal(record.identity,{title:old.title_zh,author:old.author})||!equal(record.identity,a.identity)||!equal(record.identity,l.identity))reject('exact current identity/form/grain');
 const survivalUrl='https://files.eric.ed.gov/fulltext/ED384916.pdf';
 const expectedSpaceSources=record.id==='Q54800519'?a.sources.filter(url=>url===survivalUrl):a.sources;
 // S keeps its exact original setting-specific support text; A keeps its exact
 // original issue text. A scoped setting note may be longer than the A note.
 const expectedSpaceEvidence=s.source_evidence;
 if(!equal(Object.keys(a.fields).sort(),['issue','issue_facets','topics'])||a.fields.issue_facets.length<2||a.verification_status!=='knowledge_added_unverified'||record.verification_status!=='knowledge_added_unverified'||record.integration_relation!=='same_batch_core'||!equal(record.sources,expectedSpaceSources)||!equal(record.source_evidence,expectedSpaceEvidence))reject('unverified scoped core/provenance');
 const adoptedA=clone(a);
 if(record.id==='Q90831606'){
  const adapter=exactFile(SIBLING_ADAPTER,ctx,'specific sibling-count adapter');if(adapter.metadata.change_count!==1||adapter.changes.length!==1)reject('single exact adapter');
  const x=adapter.changes[0];if(x.id!==record.id||x.source_analysis_sha256!==p.analysis.sha256||x.source_analysis_record_sha256!==r92SameBatchRecordSha(a)||x.field_pointer!=='$.fields.issue_facets[0].basis'||x.original_value!==a.fields.issue_facets[0].basis||x.replacement_value!==x.original_value.replace('Tsutsu三姐妹','Tsutsu与三个妹妹'))reject('exact only sibling-count replacement');
  adoptedA.fields.issue_facets[0].basis=x.replacement_value;
  if(x.adopted_analysis_record_sha256!==r92SameBatchRecordSha(adoptedA)||record.adopted_analysis_record_sha256!==r92SameBatchRecordSha(adoptedA)||record.core_scope_adapter_file!==SIBLING_ADAPTER.archive||record.core_scope_adapter_sha256!==SIBLING_ADAPTER.sha256)reject('adopted exact sibling A declaration');
 }
 if(!equal(adoptedA,f.adopted_analysis_record))reject('exact adopted A, no other changes');
 const counters=Object.fromEntries(Object.entries(l).filter(([k])=>k.endsWith('_count'))),presence=Object.fromEntries(['actual_search_performed','actual_search_count','actual_open_count','full_original_text_read'].map(k=>[k,Object.hasOwn(l,k)]));
 if(!equal(counters,f.original_counter_fields)||!equal(presence,f.original_counter_presence))reject('original counter presence');
 if(!equal(n.expected_normalized_source_log,f.exact_expected_normalized_source_log)||!equal(n.expected_normalized_source_log.raw_reading_log,l))reject('raw new log retained exactly');
 const expected=n.expected_normalized_source_log,prior=own.prior_source_log;
 if(!equal(expected.prior_source_log,l.prior_source_log)||!equal(expected.previous_attempts,(prior.previous_attempts||[]).concat([Object.fromEntries(Object.entries(prior).filter(([k])=>!['input_file','log_date','previous_attempts'].includes(k)))]))||!equal(expected.materials_checked.slice(0,prior.materials_checked.length),prior.materials_checked)||!prior.queries.every(q=>expected.queries.includes(q)))reject('entire old process prefix/previous attempts');
 if(issueAssertions!==undefined&&!equal(issueAssertions,currentWork.knowledge?.assertions)||sourceSearchLog!==undefined&&!equal(sourceSearchLog,currentWork.source_search_log))reject('current explicit assertion/process context');
 const assertions=currentWork.knowledge?.assertions||[],active=assertions.some(x=>equal(Object.fromEntries(Object.entries(x).filter(([k])=>k!=='input_file')),adoptedA));
 const before=equal(currentWork.source_search_log,prior),after=equal(currentWork.source_search_log,expected);
 if(!before&&!after)reject('exact additive source/full history');
 const oldCore=currentWork.issue_analysis_status==='missing'&&currentWork.issue===old.issue,newCore=currentWork.issue_analysis_status!=='missing'&&currentWork.issue===adoptedA.fields.issue&&equal(currentWork.issue_facets,adoptedA.fields.issue_facets);
 if(!(oldCore&&before&&!active||oldCore&&after&&active||newCore&&after&&active))reject('exact pre/staged/post core');
 if(currentWork.knowledge&&Object.hasOwn(currentWork.knowledge,'verification_status')&&currentWork.knowledge.verification_status!=='knowledge_added_unverified')reject('no verification upgrade');
 if(!equal(Object.keys(record.fields).sort(),spatialKeys.slice().sort())||!zones.has(record.fields.spatial_primary)||!Array.isArray(record.fields.spatial_secondary)||record.fields.spatial_secondary.some(x=>!zones.has(x)||x===record.fields.spatial_primary)||!record.fields.spatial_rationale?.trim())reject('three spatial fields');
 if(!['auto','pre','post'].includes(spatialAdoptionPhase))reject('phase');
 if(currentWork.spatial_primary==='unknown'){
  if(spatialAdoptionPhase==='post'||!equal(currentWork.spatial_evidence,old.spatial_evidence)||!equal(spatialProjection(currentWork),spatialProjection(old))||!equal(spatialProjection(currentWork.knowledge?.fields||{}),spatialProjection(old.knowledge?.fields||{})))reject('exact unknown pre spatial state');
 }else{
  const e=currentWork.spatial_evidence,k=currentWork.knowledge?.fields;
  if(spatialAdoptionPhase==='pre'||!newCore||!after||!active||currentWork.knowledge.verification_status!=='knowledge_added_unverified'||currentWork.spatial_primary!==record.fields.spatial_primary||!e||!['primary','secondary','rationale'].every(key=>Object.hasOwn(e,key))||e.primary!==record.fields.spatial_primary||!equal(e.secondary,record.fields.spatial_secondary)||e.rationale!==record.fields.spatial_rationale||!k||!spatialKeys.every(key=>Object.hasOwn(k,key)&&equal(k[key],record.fields[key]))||k.issue!==adoptedA.fields.issue||!equal(k.issue_facets,adoptedA.fields.issue_facets))reject('post actual core/source/three spatial locations');
 }
 return 'scoped_reading';
}
