import {createHash} from 'node:crypto';
import {readFileSync,existsSync} from 'node:fs';
import {join,basename} from 'node:path';
// Closed R105 route: exact one ID bind even if every optional marker is deleted.
// Additional classification fields may be appended; core/form/history and all
// three adopted spatial fields remain bound. No raw web return is archived.
const PINS={
  "baseline": "cc9fb459087d95fc86b5b321fd532897f3632bb7043e5acd50aebd8864eab159",
  "owner_baseline": "a15dacb0b305936403ce1c25c1fd458366adf4fa6cd1e61d9b1498cb791f119a",
  "inputs": {
    "modern-easy-core-round105-spatial-part1-corrected.json": {
      "archive": "research/spatial-input-snapshots/modern-easy-core-round105-spatial-part1-corrected.json",
      "sha256": "2e12614d389c505ebc7157934ef5403ffc7b0c4f483f6d156b731805ffdab5e7",
      "count": 1,
      "analysis": {
        "archive": "research/issue-input-snapshots/modern-easy-core-round105-part2-corrected.json",
        "sha256": "e47d5ae16142c90fb64ae87550e4dbd40a2b907711056afd39221089bc9b829b"
      },
      "log": {
        "archive": "research/issue-input-snapshots/modern-easy-core-round105-part2-corrected-log.json",
        "sha256": "4f2e5c5e07e01bf40fc5ff06c83ff3d753dcdfb1360a2f69fb7e1f7c8ce98eb6"
      }
    }
  },
  "ids": [
    "Q131471943"
  ],
  "binding": {
    "archive": "research/spatial-input-snapshots/r105-fixed-samebatch-adopted-binding-context-private.json",
    "sha256": "126c80dfef92f3d8030528a254e98e25413c61b5670f1fd77db023a488ccbecc"
  },
  "normalized": {
    "archive": "research/spatial-input-snapshots/r105-samebatch-spatial-pre-context-private.json",
    "sha256": "397dd76e933f14ebc10a109357c69b112898f0e9849db506f875428062c67051"
  },
  "owner": {
    "archive": "research/issue-input-snapshots/modern-easy-core-round105-selection-private.json",
    "sha256": "02ea0b872176cf4c409d35376a12a47a53502f460629c0e88e8d87f54811e5b1"
  },
  "original_owner_literal": "/Users/changkun/Documents/Codex/2026-10-04/ke/work/evidence/modern-easy-core-round105-selection-private.json",
  "adapters": [
    {
      "archive": "research/issue-input-snapshots/round105-root-two-exact-core-scope-adapter-private.json",
      "sha256": "8be518b2d9e0d4745309617988626a0631618529ef87561b0b263ce56e251353"
    },
    {
      "archive": "research/issue-input-snapshots/round105-shipwright-exact-source-scope-adapter-private.json",
      "sha256": "32590c94719cbee22080a845938d779a3350d981e91e7ccc2b89aa877b8e4732"
    }
  ],
  "receipt": {
    "archive": "research/issue-input-snapshots/round104-published-site.json",
    "sha256": "0f1d4397369e30394ac659f6f05cd8fbe840aa0ec58e5cf10939499aca37d0c5"
  },
  "publication_binding": {
    "archive": "research/issue-input-snapshots/round105-modern40-later-R104-publication-binding-private.json",
    "sha256": "2fb3cb5f2687a873442c6f1fdc7549ce9473b298756ff0677e261a59398404aa"
  },
  "aggregate_core": {
    "archive": "research/issues-source-reading-round105.json",
    "sha256": "95b59b9831a4d12613ddfa39f36774f08e015fa74fe040b7d912e3cc86a58b38"
  },
  "aggregate_spatial": {
    "archive": "research/spatial-reading-round98.json",
    "sha256": "1866e91b78bff6fd10189135e958296a7d15dac1033092cc8a6577fe8a6d38c9"
  },
  "derived_analysis": {
    "archive": "research/issue-input-snapshots/modern-easy-core-round105-derived12-root-scoped.json",
    "sha256": "1a4442937915183b53d68389bc39ae7085a82ae1689289a8913c75215982e256"
  }
};
export const R105_FIXED_SAME_BATCH_SPATIAL_INPUTS=Object.freeze(PINS.inputs);
export const R105_FIXED_SPATIAL_IDS=Object.freeze(PINS.ids);
const H=b=>createHash('sha256').update(b).digest('hex');
const sorted=v=>Array.isArray(v)?v.map(sorted):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sorted(v[k])])):v;
export const r105SameBatchRecordSha=v=>H(JSON.stringify(sorted(v)));
const equal=(a,b)=>r105SameBatchRecordSha(a)===r105SameBatchRecordSha(b);
const memo=new Map();
function exactFile(pin,{repoDir,evidenceDir},kind){
 if(!repoDir||!(/^research\/(issue|spatial)-input-snapshots\/[^/]+\.json$/.test(pin.archive)||['research/issues-source-reading-round105.json','research/spatial-reading-round98.json'].includes(pin.archive)))throw new Error('R105 exact '+kind+' path');
 const publicPath=join(repoDir,pin.archive);
 const privatePreOverlay={'research/spatial-reading-round98.json':'modern-easy-core-round105-derived-samebatch-spatial-private.json','research/spatial-input-snapshots/r105-samebatch-spatial-pre-context-private.json':'r105-samebatch-spatial-pre-context-private.json','research/spatial-input-snapshots/r105-fixed-samebatch-adopted-binding-context-private.json':'r105-fixed-samebatch-adopted-binding-context-private.json'};
 const overlay=evidenceDir&&privatePreOverlay[pin.archive]&&join(evidenceDir,privatePreOverlay[pin.archive]);
 const path=existsSync(publicPath)?publicPath:overlay&&existsSync(overlay)?overlay:null;
 if(!path)throw new Error('R105 exact '+kind+' missing public archive');const b=readFileSync(path);
 if(H(b)!==pin.sha256)throw new Error('R105 exact '+kind+' file hash');
 if(evidenceDir){const f=join(evidenceDir,basename(pin.archive));if(existsSync(f)&&H(readFileSync(f))!==pin.sha256)throw new Error('R105 exact '+kind+' private/archive mismatch');}
 const key=path+pin.sha256;if(!memo.has(key))memo.set(key,JSON.parse(b));return memo.get(key);
}
function row(doc,id,kind){const rs=[...(doc.records||[]),...(doc.deferred||[])].filter(r=>r.id===id);if(rs.length!==1)throw new Error('R105 exact '+kind+' unique record');return rs[0];}
const spaceKeys=['spatial_primary','spatial_secondary','spatial_rationale'];
const scopeKeys=['id','title_zh','author','form','forms','source_entity_kind','source_types'];
const scope=w=>Object.fromEntries(scopeKeys.map(k=>[k,w[k]]));
const projection=w=>Object.fromEntries(spaceKeys.map(k=>[k,{present:Object.hasOwn(w,k),value:w[k]??null}]));
const zones=new Set(['earth','planetary','interstellar','galactic','cosmic','abstract']);
export function r105FixedSameBatchSpatialIds(){return new Set(R105_FIXED_SPATIAL_IDS);}
export function isR105FixedSameBatchSpatialRecord(r){return R105_FIXED_SPATIAL_IDS.includes(r.id)||Object.hasOwn(R105_FIXED_SAME_BATCH_SPATIAL_INPUTS,r.source_spatial_input_file);}
export function validateR105FixedSameBatchSpatialEvidence(record,{repoDir,evidenceDir,currentWork,issueAssertions,sourceSearchLog,spatialAdoptionPhase='auto'}={}){
 const reject=why=>{throw new Error('R105 fixed same-batch rejected ('+why+'): '+record.id);};
 const ctx={repoDir,evidenceDir},p=R105_FIXED_SAME_BATCH_SPATIAL_INPUTS[record.source_spatial_input_file];
 const receipt=exactFile(PINS.receipt,ctx,'actual R104 publication receipt'),pub=exactFile(PINS.publication_binding,ctx,'separate actual public binding');
 if(receipt.status!=='published_native_terminal_succeeded_actual_refs_verified'||receipt.round!==104||receipt.site?.status!=='succeeded'||receipt.canonical_sha256!==PINS.baseline||receipt.github_main_commit!=='90aa9ba7a355260476ed261d6c79d6fb7c862a4b'||receipt.github_site_delivery_commit!=='1f8f8d09bb221198eed52ccc3b5031fd8b47d8b6'||pub.metadata.actual_R104_publication_receipt_sha256!==PINS.receipt.sha256||pub.metadata.actual_R104_published_canonical_sha256!==PINS.baseline||pub.metadata.original_pending_metadata_not_rewritten!==true||pub.records?.length!==40)reject('independent exact actual receipt binding');
 const adoptedA=row(exactFile(PINS.aggregate_core,ctx,'core aggregate'),record.id,'core aggregate'),adoptedS=row(exactFile(PINS.aggregate_spatial,ctx,'spatial aggregate'),record.id,'spatial aggregate');
 if(!equal(adoptedS,record))reject('exact aggregate adopted spatial row');
 if(!R105_FIXED_SPATIAL_IDS.includes(record.id)||!p||record.source_spatial_input_sha256!==p.sha256||record.source_spatial_input_archive!==p.archive)reject('fixed ID/original S declaration');
 const sd=exactFile(p,ctx,'S'),s=row(sd,record.id,'S');
 const bind=row(exactFile(PINS.binding,ctx,'binding'),record.id,'binding');
 if(sd.records.length!==p.count||record.source_spatial_input_record_sha256!==r105SameBatchRecordSha(s)||!equal(record,bind.exact_derived_spatial_record)||bind.original_spatial_record_sha256!==r105SameBatchRecordSha(s))reject('exact original/derived S');
 const a=row(exactFile(p.analysis,ctx,'A'),record.id,'A'),l=row(exactFile(p.log,ctx,'L'),record.id,'L');
 if(r105SameBatchRecordSha(a)!==bind.original_analysis_record_sha256||r105SameBatchRecordSha(l)!==bind.original_log_record_sha256||s.source_analysis_file!==basename(p.analysis.archive)||s.source_analysis_sha256!==p.analysis.sha256||s.source_analysis_record_sha256!==r105SameBatchRecordSha(a)||record.source_analysis_file!==s.source_analysis_file||record.source_analysis_sha256!==PINS.derived_analysis.sha256||record.source_analysis_record_sha256!==r105SameBatchRecordSha(row(exactFile(PINS.derived_analysis,ctx,'derived A'),record.id,'derived A'))||record.source_analysis_archive!==PINS.derived_analysis.archive||s.source_log_file!==basename(p.log.archive)||s.source_log_sha256!==p.log.sha256||s.source_log_record_sha256!==r105SameBatchRecordSha(l)||record.source_log_archive!==p.log.archive||record.source_log_sha256!==p.log.sha256||record.source_log_record_sha256!==r105SameBatchRecordSha(l))reject('original A/L exact file/record declarations');
 // Immutable scope/type adapters are separate from the old raw A/L/S files.
 for(const pin of PINS.adapters)exactFile(pin,ctx,'scope adapter');
 const n=row(exactFile(PINS.normalized,ctx,'normalized pre-context'),record.id,'normalized context');
 const old=n.original_work,adopted=n.adopted_core,expected=n.expected_normalized_source_log;
 if(r105SameBatchRecordSha(old)!==bind.original_full_work_record_sha256||!equal(adoptedA,adopted)||!equal(adopted,bind.exact_adopted_core)||!equal(expected,bind.exact_expected_normalized_source_log)||old.issue_analysis_status!=='missing'||old.spatial_primary!=='unknown')reject('baseline full work/adopted core/new process');
 const od=exactFile(PINS.owner,ctx,'assignment');
 if(od.metadata.status!=='frozen_private_exclusive_root_authorized_missing_core_selection'||od.metadata.delegate!=='modern_history'||od.records.length!==40||od.metadata.target_round!==105||od.metadata.canonical_snapshot_sha256!==PINS.owner_baseline||od.metadata.source_publication_pending!==true)reject('immutable original assignment phase');
 const i=record.original_ownership_index,own=od.records[i];
 const published=row(pub,record.id,'later exact R104 row');
 if(published.selection_index!==i||published.original_selected_record_sha256!==r105SameBatchRecordSha(own?.current_canonical_record)||published.current_selected_record_sha256!==published.original_selected_record_sha256||published.full_selected_row_exact!==true||published.full_original_source_log_exact!==true)reject('later published original fullrow/history');
 if(!Number.isInteger(i)||i<0||i>=40||own?.id!==record.id||own.selection_index!==i||l.ownership_index!==i||s.original_ownership_index!==i||s.original_ownership_file!==PINS.original_owner_literal||record.original_ownership_file!==PINS.original_owner_literal||s.original_ownership_sha256!==PINS.owner.sha256||record.original_ownership_sha256!==PINS.owner.sha256||!equal(own.current_canonical_record,old)||own.current_canonical_record_sha256!==r105SameBatchRecordSha(old)||!equal(own.canonical_original_prior_source_search_log,l.canonical_original_prior_source_search_log)||own.canonical_original_prior_source_search_log_sha256!==r105SameBatchRecordSha(l.canonical_original_prior_source_search_log)||!equal(old.source_search_log,own.canonical_original_prior_source_search_log)||!equal(own.original_counter_presence,l.original_counter_presence))reject('exact delegate/index/full prior/counter presence');
 const presence=Object.fromEntries(Object.keys(l).map(k=>[k,true]));
 if(!equal(l.original_counter_fields,bind.original_counter_fields)||!equal(presence,bind.original_log_property_presence)||!equal(expected.raw_reading_log,l))reject('original raw log/counter presence');
 const prior=own.canonical_original_prior_source_search_log,rawPrior=own.full_prior_source_search_log;
 if(!equal(rawPrior,l.prior_source_log)||r105SameBatchRecordSha(rawPrior)!==own.full_prior_source_search_log_sha256||r105SameBatchRecordSha(rawPrior)!==l.prior_source_log_sha256||r105SameBatchRecordSha(rawPrior)!==bind.exact_original_raw_process_prior_sha256||!equal(l.canonical_raw_prior_differing_keys,own.canonical_raw_prior_differing_keys)||!equal(own.canonical_raw_prior_differing_keys,['input_file','log_date']))reject('both exact full original prior variants');
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
