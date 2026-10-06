import {createHash} from 'node:crypto';
import {readFileSync,existsSync} from 'node:fs';
import {join,basename} from 'node:path';
// Closed R94 route: exact eleven IDs bind even if every optional marker is deleted.
// Additional classification fields may be appended; core/form/history and all
// three adopted spatial fields remain bound. No raw web return is archived.
const PINS={
  "baseline": "7b4ac5886d4ff44d1f86d343c7213b8dc7027eacea4c85fddebcb7a5e64d8b8f",
  "inputs": {
    "quick-retry3-modern-pool2-round1-spatial.json": {
      "archive": "research/spatial-input-snapshots/quick-retry3-modern-pool2-round1-spatial.json",
      "sha256": "3b7b6747d777979266b1ad122d650e1ec0684c2b6f411578a1dc1476d453a580",
      "count": 2,
      "analysis": {
        "archive": "research/issue-input-snapshots/quick-retry3-modern-pool2-round1.json",
        "sha256": "e47f1fda883a0dc8c3d93a8d49499b4fd21029d47dc8d7e943163aa3cc389fa3"
      },
      "log": {
        "archive": "research/issue-input-snapshots/quick-retry3-modern-pool2-round1-log.json",
        "sha256": "366179576f1312a23ce0b206206a9f9960474f8875de6664f67a403f101f2cdd"
      }
    },
    "quick-retry3-modern-pool2-round2-spatial.json": {
      "archive": "research/spatial-input-snapshots/quick-retry3-modern-pool2-round2-spatial.json",
      "sha256": "a07098c27f349318b29bb41d4e6d4e5ec56ef1622a18a4bcab51effa53110f18",
      "count": 3,
      "analysis": {
        "archive": "research/issue-input-snapshots/quick-retry3-modern-pool2-round2.json",
        "sha256": "f98957c01988269bc315843e3d5101d14fb9d2324226e919dc050ad1e8568297"
      },
      "log": {
        "archive": "research/issue-input-snapshots/quick-retry3-modern-pool2-round2-log.json",
        "sha256": "ff93b8c1828a434b8356996dd70c5801389b912e8b0596ac5e9e17a3351499fa"
      }
    },
    "quick-retry3-modern-pool2-round3-spatial.json": {
      "archive": "research/spatial-input-snapshots/quick-retry3-modern-pool2-round3-spatial.json",
      "sha256": "a6fdddf910a49980d359fdfd36912e2d60f2902bd0c75c8c00560fe645c58155",
      "count": 2,
      "analysis": {
        "archive": "research/issue-input-snapshots/quick-retry3-modern-pool2-round3.json",
        "sha256": "9e6f3221ea418240a1b9ae58f5d1b4293a5ba0fc079268ae2f9962b73e6b3b7c"
      },
      "log": {
        "archive": "research/issue-input-snapshots/quick-retry3-modern-pool2-round3-log.json",
        "sha256": "c1e4af2645039b0c5e57a59f5b82b9235dc0c987b1388a52cf7436fe202da27d"
      }
    },
    "quick-retry3-modern-pool2-round5-spatial.json": {
      "archive": "research/spatial-input-snapshots/quick-retry3-modern-pool2-round5-spatial.json",
      "sha256": "8f55ec7e06414c601d065d07ede66d61c85f5d252c61beb6a6817844b2826325",
      "count": 1,
      "analysis": {
        "archive": "research/issue-input-snapshots/quick-retry3-modern-pool2-round5.json",
        "sha256": "84fb83814e7ff21b7618cb7ca45f33ac10de05904bb1200460e7c5eef264290f"
      },
      "log": {
        "archive": "research/issue-input-snapshots/quick-retry3-modern-pool2-round5-log.json",
        "sha256": "097e24fd78b9b91e65b8b0b71fcc1f596cf5dbb6b7fad18a9c23ce4e436a253c"
      }
    },
    "quick-retry3-modern-pool2-round7-spatial.json": {
      "archive": "research/spatial-input-snapshots/quick-retry3-modern-pool2-round7-spatial.json",
      "sha256": "584c4f9dcc438614422eca4e1d8c1ee309511534f1e865bb597b92f4497a0022",
      "count": 1,
      "analysis": {
        "archive": "research/issue-input-snapshots/quick-retry3-modern-pool2-round7.json",
        "sha256": "76acbdb9bc240b2a41565fcfbf0cc38a6c4328f175ac63da5339c32c19441e0b"
      },
      "log": {
        "archive": "research/issue-input-snapshots/quick-retry3-modern-pool2-round7-log.json",
        "sha256": "4fffd3c8a563c03d64f331764eea1f1e4b053893abf74485eb4c559e0f5733c8"
      }
    },
    "quick-retry3-modern-pool2-round8-spatial.json": {
      "archive": "research/spatial-input-snapshots/quick-retry3-modern-pool2-round8-spatial.json",
      "sha256": "5bf01b69f71bb6c65c4d97b60cf1b7d9650e23f31c612d587baeb57274df3d6c",
      "count": 2,
      "analysis": {
        "archive": "research/issue-input-snapshots/quick-retry3-modern-pool2-round8.json",
        "sha256": "589fec6741781793ce39346525e8f2c3bf4db79fa3a3b12b6acc88ba00a39094"
      },
      "log": {
        "archive": "research/issue-input-snapshots/quick-retry3-modern-pool2-round8-log.json",
        "sha256": "68dce6cb67a523f8192cdd7b434069f4790badd58b927abff10f97211227cd59"
      }
    }
  },
  "ids": [
    "Q101003953",
    "Q137806627",
    "Q48817839",
    "Q139955592",
    "Q131445183",
    "Q136770247",
    "Q17299798",
    "Q12169181",
    "Q3210912",
    "Q134706087",
    "Q122053162"
  ],
  "binding": {
    "archive": "research/spatial-input-snapshots/r94-fixed-samebatch-adopted-binding-context-v1-private.json",
    "sha256": "8ca093211be8fec74384cd1df845a543389bad56bc9fef589856b0fcbf3ea8d5"
  },
  "normalized": {
    "archive": "research/spatial-input-snapshots/r94-samebatch-spatial-pre-context.json",
    "sha256": "eaf875f0660c6e66456ccbc3d4cb408d76eebdf1c466cbcedef78c19ed6ba994"
  },
  "owner": {
    "archive": "research/issue-input-snapshots/quick-retry3-modern-assignment-round2.json",
    "sha256": "a6ab372379c4aa8e4320d6f92d23409a63513828d309ca7671ad3880f9dd1a79"
  },
  "parent_owner": {
    "archive": "research/issue-input-snapshots/quick-retry3-modern-assignment-round1.json",
    "sha256": "65f8cb4683efeb4e61e1329fc032279d0d98bf3dc566dd13d0c0bf06b6ec23db"
  },
  "original_owner_literal": "work/evidence/quick-retry3-modern-assignment-round2.json",
  "adapters": [
    {
      "archive": "research/issue-input-snapshots/quick-retry3-modern-pool2-round1-q135093252-scope-adapter-private.json",
      "sha256": "51901654fcbe946ff20a51491ebf5e613a1ccddba27277c71110595a4eb3e9eb"
    },
    {
      "archive": "research/issue-input-snapshots/quick-retry3-modern-pool2-round2-q139955592-source-type-adapter-private.json",
      "sha256": "a331198fb5c615f609ef7c428a55ff297b624b4a557cc9b392c8fa561b39c3cd"
    }
  ]
};
export const R94_FIXED_SAME_BATCH_SPATIAL_INPUTS=Object.freeze(PINS.inputs);
export const R94_FIXED_SPATIAL_IDS=Object.freeze(PINS.ids);
const H=b=>createHash('sha256').update(b).digest('hex');
const sorted=v=>Array.isArray(v)?v.map(sorted):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sorted(v[k])])):v;
export const r94SameBatchRecordSha=v=>H(JSON.stringify(sorted(v)));
const equal=(a,b)=>r94SameBatchRecordSha(a)===r94SameBatchRecordSha(b);
const memo=new Map();
function exactFile(pin,{repoDir,evidenceDir},kind){
 if(!repoDir||!/^research\/(issue|spatial)-input-snapshots\/[^/]+\.json$/.test(pin.archive))throw new Error('R94 exact '+kind+' path');
 const path=join(repoDir,pin.archive),b=readFileSync(path);
 if(H(b)!==pin.sha256)throw new Error('R94 exact '+kind+' file hash');
 if(evidenceDir){const f=join(evidenceDir,basename(pin.archive));if(existsSync(f)&&H(readFileSync(f))!==pin.sha256)throw new Error('R94 exact '+kind+' private/archive mismatch');}
 const key=path+pin.sha256;if(!memo.has(key))memo.set(key,JSON.parse(b));return memo.get(key);
}
function row(doc,id,kind){const rs=[...(doc.records||[]),...(doc.deferred||[])].filter(r=>r.id===id);if(rs.length!==1)throw new Error('R94 exact '+kind+' unique record');return rs[0];}
const spaceKeys=['spatial_primary','spatial_secondary','spatial_rationale'];
const scopeKeys=['id','title_zh','author','form','forms','source_entity_kind','source_types'];
const scope=w=>Object.fromEntries(scopeKeys.map(k=>[k,w[k]]));
const projection=w=>Object.fromEntries(spaceKeys.map(k=>[k,{present:Object.hasOwn(w,k),value:w[k]??null}]));
const zones=new Set(['earth','planetary','interstellar','galactic','cosmic','abstract']);
export function r94FixedSameBatchSpatialIds(){return new Set(R94_FIXED_SPATIAL_IDS);}
export function isR94FixedSameBatchSpatialRecord(r){return R94_FIXED_SPATIAL_IDS.includes(r.id)||Object.hasOwn(R94_FIXED_SAME_BATCH_SPATIAL_INPUTS,r.source_spatial_input_file);}
export function validateR94FixedSameBatchSpatialEvidence(record,{repoDir,evidenceDir,currentWork,issueAssertions,sourceSearchLog,spatialAdoptionPhase='auto'}={}){
 const reject=why=>{throw new Error('R94 fixed same-batch rejected ('+why+'): '+record.id);};
 const ctx={repoDir,evidenceDir},p=R94_FIXED_SAME_BATCH_SPATIAL_INPUTS[record.source_spatial_input_file];
 if(!R94_FIXED_SPATIAL_IDS.includes(record.id)||!p||record.source_spatial_input_sha256!==p.sha256||record.source_spatial_input_archive!==p.archive)reject('fixed ID/original S declaration');
 const sd=exactFile(p,ctx,'S'),s=row(sd,record.id,'S');
 const bind=row(exactFile(PINS.binding,ctx,'binding'),record.id,'binding');
 if(sd.records.length!==p.count||record.source_spatial_input_record_sha256!==r94SameBatchRecordSha(s)||!equal(record,bind.exact_derived_spatial_record)||bind.original_spatial_record_sha256!==r94SameBatchRecordSha(s))reject('exact original/derived S');
 const a=row(exactFile(p.analysis,ctx,'A'),record.id,'A'),l=row(exactFile(p.log,ctx,'L'),record.id,'L');
 if(r94SameBatchRecordSha(a)!==bind.original_analysis_record_sha256||r94SameBatchRecordSha(l)!==bind.original_log_record_sha256||s.source_analysis_file!==basename(p.analysis.archive)||s.source_analysis_sha256!==p.analysis.sha256||s.source_analysis_record_sha256!==r94SameBatchRecordSha(a)||record.source_analysis_file!==s.source_analysis_file||record.source_analysis_sha256!==p.analysis.sha256||record.source_analysis_record_sha256!==r94SameBatchRecordSha(a)||record.source_analysis_archive!==p.analysis.archive||s.source_log_file!==basename(p.log.archive)||s.source_log_sha256!==p.log.sha256||s.source_log_record_sha256!==r94SameBatchRecordSha(l)||record.source_log_archive!==p.log.archive||record.source_log_sha256!==p.log.sha256||record.source_log_record_sha256!==r94SameBatchRecordSha(l))reject('original A/L exact file/record declarations');
 // Immutable scope/type adapters are separate from the old raw A/L/S files.
 for(const pin of PINS.adapters)exactFile(pin,ctx,'scope adapter');
 const n=row(exactFile(PINS.normalized,ctx,'normalized pre-context'),record.id,'normalized context');
 const old=n.original_work,adopted=n.adopted_core,expected=n.expected_normalized_source_log;
 if(r94SameBatchRecordSha(old)!==bind.original_full_work_record_sha256||!equal(adopted,bind.exact_adopted_core)||!equal(expected,bind.exact_expected_normalized_source_log)||old.issue_analysis_status!=='missing'||old.spatial_primary!=='unknown')reject('baseline full work/adopted core/new process');
 const od=exactFile(PINS.owner,ctx,'assignment');
 if(od.metadata.status!=='frozen_private_assignment'||od.metadata.delegate!=='modern_history'||od.records.length!==128||od.metadata.target_round!==94||od.metadata.source_snapshot_sha256!==PINS.baseline||od.metadata.source_publication_pending!==true)reject('immutable original assignment phase');
 const parent=exactFile(PINS.parent_owner,ctx,'original parent assignment');
 const i=record.original_ownership_index,own=od.records[i];
 if(!Number.isInteger(i)||i<0||i>=128||!od.metadata.ownership_indices.includes(i)||own?.id!==record.id||own.ownership_index!==i||own.parent_ownership_index!==i+80||l.parent_ownership_index!==i+80||s.parent_ownership_index!==i+80||record.parent_ownership_index!==i+80||!equal(own.parent_assignment_record,parent.records[i+80])||l.parent_assignment_record_sha256!==r94SameBatchRecordSha(parent.records[i+80])||l.ownership_index!==i||s.original_ownership_index!==i||s.original_ownership_file!==PINS.original_owner_literal||record.original_ownership_file!==PINS.original_owner_literal||s.original_ownership_sha256!==PINS.owner.sha256||record.original_ownership_sha256!==PINS.owner.sha256||!equal(own.prior_source_log,l.prior_source_log)||!equal(old.source_search_log,own.prior_source_log))reject('exact delegate/index/full prior');
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
