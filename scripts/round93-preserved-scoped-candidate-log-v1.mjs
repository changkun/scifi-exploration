import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {join,basename} from 'node:path';
import {fileURLToPath} from 'node:url';
import {resolveR89PreservedScopedCandidateLog} from './round89-preserved-scoped-candidate-log.mjs';
// Append-only single-ID historical resolver. The old R89 module is unchanged.
// Creator production/format disclosure remains a pending candidate, never plot.
const PIN={
  "candidate_id": "discovery:quick-retry2-early-classification-candidates-round11:Q140031394-scoped-form-r11",
  "id": "Q140031394",
  "candidate_record_sha256": "d37c3dc6f81f07571740a0f3b6581f8546ca87cd4cd18d746a5b7af01d525cb4",
  "evidence_record_sha256": "7a510e687d903a5ffb63311f3af7af7cf098dcd0a8237e8a88e1da2d998258aa",
  "original_log": {
    "archive": "research/issue-input-snapshots/quick-retry2-early-round11-log.json",
    "sha256": "2b6c783f2611e74bd3ac805e4b66198c0714592145712b7c7eaceb5330424b85",
    "private_file": "work/evidence/quick-retry2-early-round11-log.json"
  },
  "original_candidate": {
    "archive": "research/classification-discovery-inputs/quick-retry2-early-classification-candidates-round11.json",
    "sha256": "d3f744ef46c9654f6a470dc73f7bf4c2002d80d30b037505c1838ceed4149c11",
    "private_file": "work/evidence/quick-retry2-early-classification-candidates-round11.json"
  },
  "original_analysis": {
    "archive": "research/issue-input-snapshots/quick-retry2-early-round11.json",
    "sha256": "70e8e33479a073ba3f3bd7307b98c21a6836fe9a39ac9eedbcb93921d178a180",
    "private_file": "work/evidence/quick-retry2-early-round11.json"
  },
  "original_log_record_sha256": "8efbffb82ef4e8717d6c0e223bf230bcde30cc19f984540291c051260aab79ea",
  "original_candidate_record_sha256": "4a1d7321fd50fa6bc3f6338c8c18b5f2cc8b9e3f9020cf7a3123b3d5c835539b",
  "original_candidate_record_index": 1,
  "original_history_node_sha256": "fa2863cd523c949851a48a5a0f52603246a12bf4d84404387efd059ed72f7f82",
  "scoped_material_record_sha256": "9f05b8e60124feb4e9c8980e6cae19f2e73b72968de39cc813c4cc5d8103bd0c",
  "current_identity_scope": {
    "id": "Q140031394",
    "title_zh": "The Great Parade",
    "author": "作者未知",
    "form": "长篇（来源描述候选）",
    "forms": [
      "文学作品",
      "长篇（来源描述候选）"
    ],
    "source_entity_kind": "work_or_unspecified",
    "source_types": [
      {
        "id": "Q7725634",
        "label": "文学作品"
      }
    ]
  },
  "private_raw_source": {
    "private_raw_file": "work/evidence/quick-retry2-early-r11-responses-b-private.json",
    "sha256": "a87ffeb7ff4bd5a9685c4c12e6aef6a49c0b54fa2ce743cd349193a3de8c86d7",
    "container": "records",
    "record_index": 11,
    "record_sha256": "8e260b7183550bca3e4e99063d5e35e7e2080d7881d3bb7aba76f37ec1845a29",
    "actual_query": "\"The Great Parade\" \"Celestus Anarchus\" story",
    "provenance": "actual_search_return",
    "new_queries": 0,
    "new_opens": 0
  },
  "raw_ref": {
    "file": "quick-retry2-early-r11-responses-b-private.json",
    "sha256": "a87ffeb7ff4bd5a9685c4c12e6aef6a49c0b54fa2ce743cd349193a3de8c86d7",
    "section": "records",
    "index": 11,
    "record_sha256": "8e260b7183550bca3e4e99063d5e35e7e2080d7881d3bb7aba76f37ec1845a29"
  }
};
const hash=b=>createHash('sha256').update(b).digest('hex');
const sorted=v=>Array.isArray(v)?v.map(sorted):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sorted(v[k])])):v;
const rh=v=>hash(JSON.stringify(sorted(v))),equal=(a,b)=>rh(a)===rh(b);
function nodes(v,p='$'){return !v?[]:[{value:v,path:p},...(v.previous_attempts||[]).flatMap((x,i)=>nodes(x,p+'.previous_attempts['+i+']'))];}
function archived(pin,repoDir){
 if(!repoDir||!/^research\/(issue-input-snapshots|classification-discovery-inputs)\/[^/]+\.json$/.test(pin.archive))throw Error('R93 preserved candidate archive path');
 const b=readFileSync(join(repoDir instanceof URL?fileURLToPath(repoDir):repoDir,pin.archive));
 if(hash(b)!==pin.sha256)throw Error('R93 preserved candidate archive bytes');return JSON.parse(b);
}
export function resolveR93PreservedScopedCandidateLog(candidate,evidence,work,{repoDir}={}){
 if(candidate.id!==PIN.candidate_id&&work?.id!==PIN.id&&evidence?.id!==PIN.id)return resolveR89PreservedScopedCandidateLog(candidate,evidence,work,{repoDir});
 const fail=why=>{throw Error('R93 exact preserved candidate history rejected: '+candidate.id+' ('+why+')');};
 const scope=Object.fromEntries(Object.keys(PIN.current_identity_scope).map(k=>[k,work?.[k]??null]));
 if(candidate.id!==PIN.candidate_id||rh(candidate)!==PIN.candidate_record_sha256||rh(evidence)!==PIN.evidence_record_sha256||candidate.work_evidence.length!==1||!equal(candidate.work_evidence[0],evidence)||work.id!==PIN.id||evidence.id!==PIN.id||!equal(scope,PIN.current_identity_scope)||!equal(evidence.identity,{title:work.title_zh,author:work.author})||candidate.review_status!=='pending_further_comparison'||evidence.discovery_source_mode!=='scoped_candidate_no_core_analysis'||evidence.actual_content_source_read!==true||evidence.actual_bibliographic_source_read!==false||evidence.target_work_content_read!==false||evidence.knowledge_analysis!==false||evidence.core_analysis_added!==false||evidence.independently_verified!==false||work.issue_analysis_status!=='missing'||work.completion.source_verified!==false||(work.classification_assignments||[]).some(x=>x.label===candidate.proposed_label))fail('exact candidate/evidence/current identity and no-core status');
 const ld=archived(PIN.original_log,repoDir),ls=['records','attempts','deferred'].flatMap(k=>ld[k]||[]).filter(r=>r.id===PIN.id);
 if(ls.length!==1||rh(ls[0])!==PIN.original_log_record_sha256||!equal(ls[0].identity,evidence.identity))fail('unique original L/file/record');
 const log=ls[0],cd=archived(PIN.original_candidate,repoDir),original=cd.records[PIN.original_candidate_record_index];
 if(rh(original)!==PIN.original_candidate_record_sha256||original.work_id!==PIN.id||original.source_reading_log_file!==basename(PIN.original_log.archive)||original.source_reading_log_sha256!==PIN.original_log.sha256||original.source_reading_log_record_sha256!==PIN.original_log_record_sha256||!equal(original.sources,evidence.sources)||!equal(original.source_evidence,evidence.original_source_evidence)||original.basis!==evidence.basis||original.scope_boundary!==candidate.definition_boundary||original.ownership_index!==log.ownership_index)fail('original C/L exact support scope');
 const ad=archived(PIN.original_analysis,repoDir);
 if((ad.records||[]).some(r=>r.id===PIN.id)||evidence.frozen_analysis_input.record_absent!==true||evidence.frozen_analysis_input.absent_id!==PIN.id||evidence.frozen_analysis_input.file!==PIN.original_analysis.archive||evidence.frozen_analysis_input.sha256!==PIN.original_analysis.sha256)fail('no original A core inherited');
 const proof=evidence.private_raw_source;
 if(!equal(proof,PIN.private_raw_source)||proof.provenance!=='actual_search_return'||proof.new_queries!==0||proof.new_opens!==0||!Number.isInteger(proof.record_index)||!proof.actual_query||!log.queries.includes(proof.actual_query)||!work.source_search_log.queries.includes(proof.actual_query)||log.actual_search_performed!==true||log.actual_search_count!==1||log.actual_open_count!==0||log.full_original_text_read!==false||!equal(original.source_cache_references,[PIN.raw_ref])||!equal(log.response_cache_references,[PIN.raw_ref])||PIN.raw_ref.sha256!==proof.sha256||PIN.raw_ref.record_sha256!==proof.record_sha256||PIN.raw_ref.index!==proof.record_index||PIN.raw_ref.file!==basename(proof.private_raw_file))fail('exact old actual query/cache reference, no new read');
 const found=nodes(work.source_search_log).filter(({value})=>value.attempt_input===basename(PIN.original_log.archive)&&equal(value.raw_reading_log,log));
 if(found.length!==1||rh(found[0].value)!==PIN.original_history_node_sha256)fail('unique exact original history, latest retry never substituted');
 for(const url of evidence.sources){
  if(!log.materials_checked.some(m=>m.url===url))fail('original L source URL');
  const mats=work.source_search_log.materials_checked.filter(m=>m.url===url&&m.scope_actual_query===proof.actual_query&&m.scope_record_sha256===proof.record_sha256&&m.scope_evidence_sha256===proof.sha256);
  if(mats.length!==1||rh(mats[0])!==PIN.scoped_material_record_sha256||mats[0].actual_content_source_read!==true||mats[0].actual_bibliographic_source_read!==false||mats[0].target_work_content_read!==false||mats[0].knowledge_analysis!==false||mats[0].core_analysis_added!==false||mats[0].reading_scope!==evidence.exact_support_scope)fail('exact old scoped form material, no target plot claim');
 }
 return {log,proof:{candidate_id:PIN.candidate_id,id:PIN.id,candidate_record_sha256:PIN.candidate_record_sha256,original_log_archive:PIN.original_log.archive,original_log_file_sha256:PIN.original_log.sha256,original_log_record_sha256:PIN.original_log_record_sha256,exact_history_pointer:found[0].path+'.raw_reading_log',exact_history_node_sha256:PIN.original_history_node_sha256,original_candidate_archive:PIN.original_candidate.archive,original_candidate_record_sha256:PIN.original_candidate_record_sha256,source_mode_unchanged:true,target_plot_still_missing:true,new_query_count:0,new_open_count:0,new_core_count:0,original_fulltext_claim_added:false,independent_verification_upgrade:false}};
}
