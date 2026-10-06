import {createHash} from 'node:crypto';
import {readFileSync,existsSync} from 'node:fs';
import {join,basename} from 'node:path';
// Closed R96 route: exact eight IDs bind even if every optional marker is deleted.
// Additional classification fields may be appended; core/form/history and all
// three adopted spatial fields remain bound. No raw web return is archived.
const PINS={
  "baseline": "7196660ba1ba4e72a3225740703bf10392f551873303f970e43acccea662a02f",
  "inputs": {
    "modern-easy-core-round96-part1-spatial.json": {
      "archive": "research/spatial-input-snapshots/modern-easy-core-round96-part1-spatial.json",
      "sha256": "3ea960c32778f62497df04e61ce25c566da425f103d1cd2b186a0b10363cdab1",
      "count": 5,
      "analysis": {
        "archive": "research/issue-input-snapshots/modern-easy-core-round96-part1.json",
        "sha256": "20c384b488dd87aca49c06cca7dac84b7fac683d779831856fc0e7130218ed8d"
      },
      "log": {
        "archive": "research/issue-input-snapshots/modern-easy-core-round96-part1-log.json",
        "sha256": "08d880e29af4456418f98f7a6b57b7b9c6df760d72804a3f908b4c7909c2e40c"
      }
    },
    "modern-easy-core-round96-part2-spatial.json": {
      "archive": "research/spatial-input-snapshots/modern-easy-core-round96-part2-spatial.json",
      "sha256": "766a4d57c14e0aaa0e0a951d37caae4e39105e1e9ae657f18445281827bf4596",
      "count": 3,
      "analysis": {
        "archive": "research/issue-input-snapshots/modern-easy-core-round96-part2.json",
        "sha256": "f52bcf5deed77ed2a146502384779167083fba13438f2c0e07b590a42cafcdd6"
      },
      "log": {
        "archive": "research/issue-input-snapshots/modern-easy-core-round96-part2-log.json",
        "sha256": "5c41401086f311decbd8c868e06c42dca34bb1d4e2254ec8e5b4c704ba274e6f"
      }
    }
  },
  "ids": [
    "Q3208001",
    "Q134609001",
    "Q74632358",
    "Q131471843",
    "Q134715430",
    "Q3206706",
    "Q130737809",
    "Q131461562"
  ],
  "binding": {
    "archive": "research/spatial-input-snapshots/r96-fixed-samebatch-adopted-binding-context-v1-private.json",
    "sha256": "ae7c57a13ec0065fe3ff644016b25cd980db480340462040c268a46c6d4e2f29"
  },
  "normalized": {
    "archive": "research/spatial-input-snapshots/r96-samebatch-spatial-pre-context.json",
    "sha256": "5895a0eccdb83d1994328dd0bab1e14a8ac02f923c58d6ab2324855ebbbd6cfa"
  },
  "owner": {
    "archive": "research/issue-input-snapshots/modern-easy-core-round96-selection-private.json",
    "sha256": "5126884a15a96666efadb7a813f501dafbd4cca25a8077d52f80da2453119b66"
  },
  "original_owner_literal": "/Users/changkun/Documents/Codex/2026-10-04/ke/work/evidence/modern-easy-core-round96-selection-private.json",
  "adapters": [
    {
      "archive": "research/issue-input-snapshots/round96-q130737809-version-scope-clarification-private.json",
      "sha256": "e7c97e2e026793ec92ad766b857434dd080f2008ae00dfe0865b8c3319eccdb9"
    }
  ]
};
export const R96_FIXED_SAME_BATCH_SPATIAL_INPUTS=Object.freeze(PINS.inputs);
export const R96_FIXED_SPATIAL_IDS=Object.freeze(PINS.ids);
const H=b=>createHash('sha256').update(b).digest('hex');
const sorted=v=>Array.isArray(v)?v.map(sorted):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sorted(v[k])])):v;
export const r96SameBatchRecordSha=v=>H(JSON.stringify(sorted(v)));
const equal=(a,b)=>r96SameBatchRecordSha(a)===r96SameBatchRecordSha(b);
const memo=new Map();
function exactFile(pin,{repoDir,evidenceDir},kind){
 if(!repoDir||!/^research\/(issue|spatial)-input-snapshots\/[^/]+\.json$/.test(pin.archive))throw new Error('R96 exact '+kind+' path');
 const path=join(repoDir,pin.archive),b=readFileSync(path);
 if(H(b)!==pin.sha256)throw new Error('R96 exact '+kind+' file hash');
 if(evidenceDir){const f=join(evidenceDir,basename(pin.archive));if(existsSync(f)&&H(readFileSync(f))!==pin.sha256)throw new Error('R96 exact '+kind+' private/archive mismatch');}
 const key=path+pin.sha256;if(!memo.has(key))memo.set(key,JSON.parse(b));return memo.get(key);
}
function row(doc,id,kind){const rs=[...(doc.records||[]),...(doc.deferred||[])].filter(r=>r.id===id);if(rs.length!==1)throw new Error('R96 exact '+kind+' unique record');return rs[0];}
const spaceKeys=['spatial_primary','spatial_secondary','spatial_rationale'];
const scopeKeys=['id','title_zh','author','form','forms','source_entity_kind','source_types'];
const scope=w=>Object.fromEntries(scopeKeys.map(k=>[k,w[k]]));
const projection=w=>Object.fromEntries(spaceKeys.map(k=>[k,{present:Object.hasOwn(w,k),value:w[k]??null}]));
const zones=new Set(['earth','planetary','interstellar','galactic','cosmic','abstract']);
export function r96FixedSameBatchSpatialIds(){return new Set(R96_FIXED_SPATIAL_IDS);}
export function isR96FixedSameBatchSpatialRecord(r){return R96_FIXED_SPATIAL_IDS.includes(r.id)||Object.hasOwn(R96_FIXED_SAME_BATCH_SPATIAL_INPUTS,r.source_spatial_input_file);}
export function validateR96FixedSameBatchSpatialEvidence(record,{repoDir,evidenceDir,currentWork,issueAssertions,sourceSearchLog,spatialAdoptionPhase='auto'}={}){
 const reject=why=>{throw new Error('R96 fixed same-batch rejected ('+why+'): '+record.id);};
 const ctx={repoDir,evidenceDir},p=R96_FIXED_SAME_BATCH_SPATIAL_INPUTS[record.source_spatial_input_file];
 if(!R96_FIXED_SPATIAL_IDS.includes(record.id)||!p||record.source_spatial_input_sha256!==p.sha256||record.source_spatial_input_archive!==p.archive)reject('fixed ID/original S declaration');
 const sd=exactFile(p,ctx,'S'),s=row(sd,record.id,'S');
 const bind=row(exactFile(PINS.binding,ctx,'binding'),record.id,'binding');
 if(sd.records.length!==p.count||record.source_spatial_input_record_sha256!==r96SameBatchRecordSha(s)||!equal(record,bind.exact_derived_spatial_record)||bind.original_spatial_record_sha256!==r96SameBatchRecordSha(s))reject('exact original/derived S');
 const a=row(exactFile(p.analysis,ctx,'A'),record.id,'A'),l=row(exactFile(p.log,ctx,'L'),record.id,'L');
 if(r96SameBatchRecordSha(a)!==bind.original_analysis_record_sha256||r96SameBatchRecordSha(l)!==bind.original_log_record_sha256||s.source_analysis_file!==basename(p.analysis.archive)||s.source_analysis_sha256!==p.analysis.sha256||s.source_analysis_record_sha256!==r96SameBatchRecordSha(a)||record.source_analysis_file!==s.source_analysis_file||record.source_analysis_sha256!==p.analysis.sha256||record.source_analysis_record_sha256!==r96SameBatchRecordSha(a)||record.source_analysis_archive!==p.analysis.archive||s.source_log_file!==basename(p.log.archive)||s.source_log_sha256!==p.log.sha256||s.source_log_record_sha256!==r96SameBatchRecordSha(l)||record.source_log_archive!==p.log.archive||record.source_log_sha256!==p.log.sha256||record.source_log_record_sha256!==r96SameBatchRecordSha(l))reject('original A/L exact file/record declarations');
 // Immutable scope/type adapters are separate from the old raw A/L/S files.
 for(const pin of PINS.adapters)exactFile(pin,ctx,'scope adapter');
 const n=row(exactFile(PINS.normalized,ctx,'normalized pre-context'),record.id,'normalized context');
 const old=n.original_work,adopted=n.adopted_core,expected=n.expected_normalized_source_log;
 if(r96SameBatchRecordSha(old)!==bind.original_full_work_record_sha256||!equal(adopted,bind.exact_adopted_core)||!equal(expected,bind.exact_expected_normalized_source_log)||old.issue_analysis_status!=='missing'||old.spatial_primary!=='unknown')reject('baseline full work/adopted core/new process');
 const od=exactFile(PINS.owner,ctx,'assignment');
 if(od.metadata.status!=='frozen_private_exclusive_root_authorized_missing_core_selection'||od.metadata.delegate!=='modern_history'||od.records.length!==50||od.metadata.target_round!==96||od.metadata.canonical_snapshot_sha256!==PINS.baseline||od.metadata.source_publication_pending!==true)reject('immutable original assignment phase');
 const i=record.original_ownership_index,own=od.records[i];
 if(!Number.isInteger(i)||i<0||i>=50||own?.id!==record.id||own.selection_index!==i||l.ownership_index!==i||s.original_ownership_index!==i||s.original_ownership_file!==PINS.original_owner_literal||record.original_ownership_file!==PINS.original_owner_literal||s.original_ownership_sha256!==PINS.owner.sha256||record.original_ownership_sha256!==PINS.owner.sha256||!equal(own.current_canonical_record,old)||own.current_canonical_record_sha256!==r96SameBatchRecordSha(old)||!equal(own.full_prior_source_search_log,l.prior_source_log)||own.full_prior_source_search_log_sha256!==r96SameBatchRecordSha(l.prior_source_log)||!equal(old.source_search_log,own.full_prior_source_search_log)||!equal(own.original_counter_presence,l.original_counter_presence))reject('exact delegate/index/full prior/counter presence');
 const presence=Object.fromEntries(Object.keys(l).map(k=>[k,true]));
 if(!equal(l.original_counter_fields,bind.original_counter_fields)||!equal(presence,bind.original_log_property_presence)||!equal(expected.raw_reading_log,l))reject('original raw log/counter presence');
 const prior=own.full_prior_source_search_log,history=(prior.previous_attempts||[]).concat([Object.fromEntries(Object.entries(prior).filter(([k])=>!['input_file','log_date','previous_attempts'].includes(k)))]);
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
