import {createHash} from 'node:crypto';
import {readFileSync,existsSync} from 'node:fs';
import {join,basename} from 'node:path';
// Closed R93 route: exact ten IDs bind even if every optional marker is deleted.
// Additional classification fields may be appended; core/form/history and all
// three adopted spatial fields remain bound. No raw web return is archived.
const PINS={
  "baseline": "ee3093a27e8d1ca846c751ad29460529aa08c48938f5aa43586f34e72e9b2b67",
  "inputs": {
    "quick-retry3-modern-round1-spatial.json": {
      "archive": "research/spatial-input-snapshots/quick-retry3-modern-round1-spatial.json",
      "sha256": "b4c8954f0075ea8b19af93e9a16c140c8b8d9c306cb604078b065ddda71b8480",
      "count": 3,
      "analysis": {
        "archive": "research/issue-input-snapshots/quick-retry3-modern-round1.json",
        "sha256": "00fdb338f2035184e6d355dbe7f6d9fe19cd72343231245fcb36a3f583f6c1e5"
      },
      "log": {
        "archive": "research/issue-input-snapshots/quick-retry3-modern-round1-log.json",
        "sha256": "141c47be9d5a6416255de9c7acb10f0c45cbeb6dc6952e8489fee4d092ffa8cb"
      }
    },
    "quick-retry3-modern-round2-spatial.json": {
      "archive": "research/spatial-input-snapshots/quick-retry3-modern-round2-spatial.json",
      "sha256": "1f55fb5fa70382b00931c92e0a8bb30fa0c2e92c8f62e2bdeb4387ab37b18c5e",
      "count": 4,
      "analysis": {
        "archive": "research/issue-input-snapshots/quick-retry3-modern-round2.json",
        "sha256": "09279fb9b1ccfd5edc8c7d5b62f81c26b3dfc4f06e5565e7fb1abf756cf001f5"
      },
      "log": {
        "archive": "research/issue-input-snapshots/quick-retry3-modern-round2-log.json",
        "sha256": "bf47bd0bb70c54eeef6ae26587c3f88ed6a0800b0ddfa1f39bba570a21b2f496"
      }
    },
    "quick-retry3-modern-round3-spatial.json": {
      "archive": "research/spatial-input-snapshots/quick-retry3-modern-round3-spatial.json",
      "sha256": "0fd80c9d3edcfde691aa9e551fbd56514a02c0ca1c702cce364ccc7b98a1e6dd",
      "count": 2,
      "analysis": {
        "archive": "research/issue-input-snapshots/quick-retry3-modern-round3.json",
        "sha256": "3f161dea827c25f96b23b4c28956060431abdb33c7bc8791bc3e56da2a2be84b"
      },
      "log": {
        "archive": "research/issue-input-snapshots/quick-retry3-modern-round3-log.json",
        "sha256": "be4ef7c0a6a3f0edade7503784ed46cbaa7b3fb35fc4f844357170b57cd8b043"
      }
    },
    "quick-retry3-modern-round4-spatial.json": {
      "archive": "research/spatial-input-snapshots/quick-retry3-modern-round4-spatial.json",
      "sha256": "d75b97d192b3a9fd934afe181742e2f1278411206a61a14b97abcaed416071e0",
      "count": 1,
      "analysis": {
        "archive": "research/issue-input-snapshots/quick-retry3-modern-round4.json",
        "sha256": "b48e24bfd7dd204cf1370743d2bdef85ba4dcba6c4916e3605272af59ca65c90"
      },
      "log": {
        "archive": "research/issue-input-snapshots/quick-retry3-modern-round4-log.json",
        "sha256": "0be78b736715829cc8b65a4aacc1c069be0734ba791764ad5b161d6d81a2c984"
      }
    }
  },
  "ids": [
    "Q8031780",
    "Q3233554",
    "Q133981406",
    "Q120728734",
    "Q120728714",
    "Q65131014",
    "Q25381969",
    "Q17632914",
    "Q100323431",
    "Q114674269"
  ],
  "binding": {
    "archive": "research/spatial-input-snapshots/r93-fixed-samebatch-adopted-binding-context-v1-private.json",
    "sha256": "ec7a682a0a2424398456c51d710d60977e9e25113b7bfe5a01c4a93410e68752"
  },
  "normalized": {
    "archive": "research/spatial-input-snapshots/r93-samebatch-spatial-pre-context.json",
    "sha256": "c8268eaba9004e29d6908d4d2670e3edb726a3ba0f2950c8bba5d80e08d3dbd1"
  },
  "owner": {
    "archive": "research/issue-input-snapshots/quick-retry3-modern-assignment-round1.json",
    "sha256": "65f8cb4683efeb4e61e1329fc032279d0d98bf3dc566dd13d0c0bf06b6ec23db"
  },
  "original_owner_literal": "work/evidence/quick-retry3-modern-assignment-round1.json",
  "adapters": [
    {
      "archive": "research/issue-input-snapshots/round93-q8031780-exact-core-scope-adapter-v4-root-private.json",
      "sha256": "847f3a3416e8fba0afb78b383004be037744dfb614953349d5b6f6d698d57336"
    },
    {
      "archive": "research/spatial-input-snapshots/quick-retry3-modern-round2-spatial-source-type-adapter-private.json",
      "sha256": "9a401634389892f02ef4eaa92dff6e17d2eabb2826d611f82cde7ac7e444a313"
    }
  ]
};
export const R93_FIXED_SAME_BATCH_SPATIAL_INPUTS=Object.freeze(PINS.inputs);
export const R93_FIXED_SPATIAL_IDS=Object.freeze(PINS.ids);
const H=b=>createHash('sha256').update(b).digest('hex');
const sorted=v=>Array.isArray(v)?v.map(sorted):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sorted(v[k])])):v;
export const r93SameBatchRecordSha=v=>H(JSON.stringify(sorted(v)));
const equal=(a,b)=>r93SameBatchRecordSha(a)===r93SameBatchRecordSha(b);
const memo=new Map();
function exactFile(pin,{repoDir,evidenceDir},kind){
 if(!repoDir||!/^research\/(issue|spatial)-input-snapshots\/[^/]+\.json$/.test(pin.archive))throw new Error('R93 exact '+kind+' path');
 const path=join(repoDir,pin.archive),b=readFileSync(path);
 if(H(b)!==pin.sha256)throw new Error('R93 exact '+kind+' file hash');
 if(evidenceDir){const f=join(evidenceDir,basename(pin.archive));if(existsSync(f)&&H(readFileSync(f))!==pin.sha256)throw new Error('R93 exact '+kind+' private/archive mismatch');}
 const key=path+pin.sha256;if(!memo.has(key))memo.set(key,JSON.parse(b));return memo.get(key);
}
function row(doc,id,kind){const rs=[...(doc.records||[]),...(doc.deferred||[])].filter(r=>r.id===id);if(rs.length!==1)throw new Error('R93 exact '+kind+' unique record');return rs[0];}
const spaceKeys=['spatial_primary','spatial_secondary','spatial_rationale'];
const scopeKeys=['id','title_zh','author','form','forms','source_entity_kind','source_types'];
const scope=w=>Object.fromEntries(scopeKeys.map(k=>[k,w[k]]));
const projection=w=>Object.fromEntries(spaceKeys.map(k=>[k,{present:Object.hasOwn(w,k),value:w[k]??null}]));
const zones=new Set(['earth','planetary','interstellar','galactic','cosmic','abstract']);
export function r93FixedSameBatchSpatialIds(){return new Set(R93_FIXED_SPATIAL_IDS);}
export function isR93FixedSameBatchSpatialRecord(r){return R93_FIXED_SPATIAL_IDS.includes(r.id)||Object.hasOwn(R93_FIXED_SAME_BATCH_SPATIAL_INPUTS,r.source_spatial_input_file);}
export function validateR93FixedSameBatchSpatialEvidence(record,{repoDir,evidenceDir,currentWork,issueAssertions,sourceSearchLog,spatialAdoptionPhase='auto'}={}){
 const reject=why=>{throw new Error('R93 fixed same-batch rejected ('+why+'): '+record.id);};
 const ctx={repoDir,evidenceDir},p=R93_FIXED_SAME_BATCH_SPATIAL_INPUTS[record.source_spatial_input_file];
 if(!R93_FIXED_SPATIAL_IDS.includes(record.id)||!p||record.source_spatial_input_sha256!==p.sha256||record.source_spatial_input_archive!==p.archive)reject('fixed ID/original S declaration');
 const sd=exactFile(p,ctx,'S'),s=row(sd,record.id,'S');
 const bind=row(exactFile(PINS.binding,ctx,'binding'),record.id,'binding');
 if(sd.records.length!==p.count||record.source_spatial_input_record_sha256!==r93SameBatchRecordSha(s)||!equal(record,bind.exact_derived_spatial_record)||bind.original_spatial_record_sha256!==r93SameBatchRecordSha(s))reject('exact original/derived S');
 const a=row(exactFile(p.analysis,ctx,'A'),record.id,'A'),l=row(exactFile(p.log,ctx,'L'),record.id,'L');
 if(r93SameBatchRecordSha(a)!==bind.original_analysis_record_sha256||r93SameBatchRecordSha(l)!==bind.original_log_record_sha256||s.source_analysis_file!==basename(p.analysis.archive)||s.source_analysis_sha256!==p.analysis.sha256||s.source_analysis_record_sha256!==r93SameBatchRecordSha(a)||record.source_analysis_file!==s.source_analysis_file||record.source_analysis_sha256!==p.analysis.sha256||record.source_analysis_record_sha256!==r93SameBatchRecordSha(a)||record.source_analysis_archive!==p.analysis.archive||s.source_log_file!==basename(p.log.archive)||s.source_log_sha256!==p.log.sha256||s.source_log_record_sha256!==r93SameBatchRecordSha(l)||record.source_log_archive!==p.log.archive||record.source_log_sha256!==p.log.sha256||record.source_log_record_sha256!==r93SameBatchRecordSha(l))reject('original A/L exact file/record declarations');
 // Immutable scope/type adapters are separate from the old raw A/L/S files.
 for(const pin of PINS.adapters)exactFile(pin,ctx,'scope adapter');
 const n=row(exactFile(PINS.normalized,ctx,'normalized pre-context'),record.id,'normalized context');
 const old=n.original_work,adopted=n.adopted_core,expected=n.expected_normalized_source_log;
 if(r93SameBatchRecordSha(old)!==bind.original_full_work_record_sha256||!equal(adopted,bind.exact_adopted_core)||!equal(expected,bind.exact_expected_normalized_source_log)||old.issue_analysis_status!=='missing'||old.spatial_primary!=='unknown')reject('baseline full work/adopted core/new process');
 const od=exactFile(PINS.owner,ctx,'assignment');
 if(od.metadata.status!=='frozen_third_retry_assignment'||od.metadata.phase!=='third-disjoint-fast-retry-after-completed-second-1395'||od.metadata.source_snapshot_sha256!==PINS.baseline||od.metadata.source_publication_pending!==true)reject('immutable original assignment phase');
 const i=record.original_ownership_index,own=od.records[i];
 if(!Number.isInteger(i)||i<0||i>=64||!od.metadata.delegates.modern_history.includes(i)||own?.id!==record.id||l.ownership_index!==i||s.original_ownership_index!==i||s.original_ownership_file!==PINS.original_owner_literal||record.original_ownership_file!==PINS.original_owner_literal||s.original_ownership_sha256!==PINS.owner.sha256||record.original_ownership_sha256!==PINS.owner.sha256||!equal(own.prior_source_log,l.prior_source_log)||!equal(old.source_search_log,own.prior_source_log))reject('exact delegate/index/full prior');
 const presence=Object.fromEntries(Object.keys(l).map(k=>[k,true]));
 if(!equal(l.original_counter_fields,bind.original_counter_fields)||!equal(presence,bind.original_log_property_presence)||!equal(expected.raw_reading_log,l))reject('original raw log/counter presence');
 const prior=own.prior_source_log,history=(prior.previous_attempts||[]).concat([Object.fromEntries(Object.entries(prior).filter(([k])=>!['input_file','log_date','previous_attempts'].includes(k)))]);
 if(!equal(expected.prior_source_log,prior)||!equal(expected.previous_attempts,history)||!equal(expected.materials_checked.slice(0,(prior.materials_checked||[]).length),prior.materials_checked||[])||!(prior.queries||[]).every(q=>expected.queries.includes(q)))reject('full cumulative history/old prefix');
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
