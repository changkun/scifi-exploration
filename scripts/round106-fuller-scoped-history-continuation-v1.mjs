import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {join,basename} from 'node:path';
import {fileURLToPath} from 'node:url';
import {resolveR93PreservedScopedCandidateLog} from './round93-preserved-scoped-candidate-log-v1.mjs';
// One immutable form candidate predates a separate, explicitly unverified
// nonfiction knowledge analysis. Neither its historical no-core scope nor the
// old resolver changes. Later dimensions/process attempts may be appended.
const ID='Q7096686';
const CID='discovery:quick-retry2-early-classification-candidates-round8:Q7096686-scoped-form-r8';
const PFILE='research/classification-discovery-audits/round106-fuller-scoped-history-continuation-pins-v1.json';
const PSHA='390e2b582bfc1fa24880b59b954264b9860e98ab3955df92b7dcb4f90a2c6a8b';
const hash=b=>createHash('sha256').update(b).digest('hex');
const sorted=v=>Array.isArray(v)?v.map(sorted):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sorted(v[k])])):v;
const rh=v=>hash(JSON.stringify(sorted(v))),equal=(a,b)=>rh(a)===rh(b);
const rows=d=>['records','attempts','deferred'].flatMap(k=>d[k]||[]);
const omit=(v,keys)=>Object.fromEntries(Object.entries(v).filter(([k])=>!keys.includes(k)));
function nodes(v,path='$'){return !v?[]:[{value:v,path},...(v.previous_attempts||[]).flatMap((x,i)=>nodes(x,path+'.previous_attempts['+i+']'))];}
function archived(pin,repoDir){
 if(!repoDir||!/^research\/(?:classification-discovery-audits|classification-discovery-inputs|classification-registry-history|issue-input-snapshots)\/[^/]+\.json$/.test(pin.file)&&pin.file!=='research/issues-source-reading-round106.json')throw Error('R106 Fuller archive path');
 const b=readFileSync(join(repoDir instanceof URL?fileURLToPath(repoDir):repoDir,pin.file));
 if(hash(b)!==pin.sha256)throw Error('R106 Fuller exact archive bytes: '+pin.file);
 return JSON.parse(b);
}
function one(d,id,sha,fail,label){const r=rows(d).filter(x=>x.id===id);if(r.length!==1||rh(r[0])!==sha)fail(label);return r[0];}
function prefix(current,old,fail,label){if(!Array.isArray(current)||current.length<old.length||!equal(current.slice(0,old.length),old))fail(label);}
export function resolveR106PreservedScopedCandidateLog(candidate,evidence,work,{repoDir}={}){
 if(candidate?.id!==CID)return resolveR93PreservedScopedCandidateLog(candidate,evidence,work,{repoDir});
 const fail=why=>{throw Error('R106 exact Fuller historical continuation rejected: '+why);};
 const p=archived({file:PFILE,sha256:PSHA},repoDir);
 if(candidate?.id!==CID||work?.id!==ID||evidence?.id!==ID||p.id!==ID||p.candidate_id!==CID||rh(candidate)!==p.candidate_record_sha256||rh(evidence)!==p.evidence_record_sha256||candidate.work_evidence.length!==1||!equal(candidate.work_evidence[0],evidence)||candidate.review_status!=='pending_further_comparison'||evidence.discovery_source_mode!=='scoped_candidate_no_core_analysis'||evidence.core_analysis_added!==false||evidence.knowledge_analysis!==false||evidence.actual_content_source_read!==true||evidence.target_work_content_read!==false||evidence.independently_verified!==false||evidence.target_original_text_read!==false||evidence.new_core_count!==0||work.completion?.source_verified!==false||(work.classification_assignments||[]).some(x=>x.label===candidate.proposed_label))fail('fixed candidate/current identity/scope/verification');
 const identity=Object.fromEntries(Object.keys(p.identity_scope).map(k=>[k,work[k]??null]));
 if(!equal(identity,p.identity_scope)||!equal(evidence.identity,{title:work.title_zh,author:work.author}))fail('exact identity/year/grain');
 const before=archived(p.before_snapshot,repoDir).work;
 if(rh(before)!==p.before_work_sha256||before.id!==ID||before.issue_analysis_status!=='missing'||before.knowledge!==null||before.completion.source_verified!==false)fail('historical missing before');
 const baseline=archived(p.baseline_registry,repoDir).discovery_candidates.filter(x=>x.id===CID);
 if(baseline.length!==1||!equal(baseline[0],candidate))fail('immutable original registry candidate');
 const log=one(archived(p.original_log,repoDir),ID,p.original_log_record_sha256,fail,'original L exact/unique');
 const original=archived(p.original_candidate,repoDir).records[p.original_candidate_record_index];
 if(rh(original)!==p.original_candidate_record_sha256||original.work_id!==ID||!equal(original.identity,evidence.identity)||original.source_reading_log_file!==basename(p.original_log.file)||original.source_reading_log_sha256!==p.original_log.sha256||original.source_reading_log_record_sha256!==p.original_log_record_sha256||original.ownership_index!==evidence.ownership_index||original.ownership_index!==log.ownership_index||!equal(original.sources,evidence.sources)||!equal(original.source_evidence,evidence.original_source_evidence)||original.basis!==evidence.basis||original.scope_boundary!==candidate.definition_boundary)fail('original C/L exact scope and owner');
 const oldA=archived(p.original_analysis,repoDir);
 if(rows(oldA).some(x=>x.id===ID)||evidence.frozen_analysis_input.record_absent!==true||evidence.frozen_analysis_input.absent_id!==ID||evidence.frozen_analysis_input.file!==p.original_analysis.file||evidence.frozen_analysis_input.sha256!==p.original_analysis.sha256||evidence.frozen_log_input.file!==p.original_log.file||evidence.frozen_log_input.sha256!==p.original_log.sha256)fail('no original core inherited');
 const raw=evidence.private_raw_source;
 if(!equal(raw,p.original_private_source_proof)||!equal(evidence.same_return_evidence,raw)||raw.provenance!=='actual_search_return'||raw.new_queries!==0||raw.new_opens!==0||!log.queries.includes(raw.actual_query)||log.actual_search_performed!==true||log.actual_search_count!==1||log.actual_open_count!==0||log.full_original_text_read!==false)fail('actual old query/return scope');
 const refs=log.response_cache_references;
 if(!equal(refs,original.source_cache_references)||refs.length!==1||refs[0].file!==basename(raw.private_raw_file)||refs[0].sha256!==raw.sha256||refs[0].record_sha256!==raw.record_sha256||refs[0].index!==raw.record_index)fail('private cache pointer exact');
 const a=one(archived(p.new_analysis,repoDir),ID,p.new_analysis_record_sha256,fail,'new independent A106');
 const rawA=one(archived(p.new_original_analysis,repoDir),ID,p.new_original_analysis_record_sha256,fail,'new original A exact');
 const newL=one(archived(p.new_original_log,repoDir),ID,p.new_original_log_record_sha256,fail,'new original zero-query L');
 const d=one(archived(p.delta,repoDir),ID,p.delta_record_sha256,fail,'exact selected delta49');
 if(!equal(d.canonical_prior_full_wrapper,before.source_search_log)||d.original_current_work_sha256!==p.before_work_sha256||rh(d.canonical_prior_full_wrapper)!==d.canonical_prior_full_wrapper_sha256||d.original_log.archive!==p.new_original_log.file||d.original_log.sha256!==p.new_original_log.sha256||d.original_log.record_sha256!==p.new_original_log_record_sha256||!equal(d.after.raw_reading_log,newL)||!equal(a.fields,rawA.fields)||a.verification_status!=='knowledge_added_unverified'||rawA.verification_status!=='knowledge_added_unverified'||a.sources.length!==0||newL.queries.length!==0||newL.materials_checked.length!==0||newL.actual_search_count!==0||newL.actual_open_count!==0||newL.actual_content_source_read!==false||newL.original_full_text_read!==false||newL.independently_verified!==false||newL.new_unsuccessful_attempts!==0)fail('separate knowledge analysis, zero requests/no verification');
 if(work.issue_analysis_status!=='knowledge_added_unverified'||work.knowledge?.verification_status!=='knowledge_added_unverified'||work.issue!==a.fields.issue||!equal(work.issue_facets,a.fields.issue_facets)||!equal(work.topics,a.fields.topics))fail('actual adopted core scope');
 for(const [k,v]of Object.entries(a.fields))if(!equal(work.knowledge?.fields?.[k],v))fail('actual core field '+k);
 const assertions=work.knowledge?.assertions||[],currentA=assertions.filter(x=>x.input_file===p.new_analysis.file&&rh(omit(x,['input_file']))===p.new_analysis_record_sha256);
 if(currentA.length!==1||!equal(assertions.slice(0,(before.knowledge?.assertions||[]).length),before.knowledge?.assertions||[]))fail('new exact assertion with old prefix');
 const source=work.source_search_log;
 if(!source||source.input_file!==p.expected_canonical_wrapper_fields.input_file)fail('current source wrapper');
 prefix(source.queries,d.after.queries,fail,'full query prefix');prefix(source.materials_checked,d.after.materials_checked,fail,'full material prefix');
 const tree=nodes(source),payload=v=>omit(v,['previous_attempts','input_file','log_date']);
 // Preserve every original history node exactly while allowing later attempts
 // to add new outer nodes or flatten the same immutable historical chain.
 let last=-1;
 for(const expected of p.historical_source_prefix_node_sha256){const hits=tree.map((x,i)=>({x,i})).filter(({x})=>rh(payload(x.value))===expected);if(hits.length!==1||hits[0].i<=last)fail('old complete ordered history');last=hits[0].i;}
 const later=tree.filter(({value})=>rh(payload(value))===p.historical_source_after_payload_sha256);
 if(later.length!==1)fail('unique exact independent knowledge process node');
 const historical=tree.filter(({value})=>value.attempt_input===basename(p.original_log.file)&&equal(value.raw_reading_log,log));
 if(historical.length!==1||rh(payload(historical[0].value))!==p.original_history_node_sha256||!equal(d.before.raw_reading_log,log)||!equal(d.after.previous_attempts.slice(0,-1),d.before.previous_attempts)||!equal(d.after.previous_attempts.at(-1),omit(d.before,['previous_attempts'])))fail('unique exact original L/full before chain');
 for(const url of evidence.sources){
  const material=source.materials_checked.filter(x=>x.url===url&&x.scope_actual_query===raw.actual_query&&x.scope_evidence_sha256===raw.sha256&&x.scope_record_sha256===raw.record_sha256);
  if(!log.materials_checked.some(x=>x.url===url)||material.length!==1||rh(material[0])!==p.scoped_material_record_sha256||material[0].reading_scope!==evidence.exact_support_scope||material[0].knowledge_analysis!==false||material[0].core_analysis_added!==false||material[0].actual_content_source_read!==true||material[0].target_work_content_read!==false)fail('old scoped form material unchanged');
 }
 return {log,later_separate_core_added_unverified:true,proof:{candidate_id:CID,id:ID,original_log_archive:p.original_log.file,original_log_record_sha256:p.original_log_record_sha256,historical_history_pointer:historical[0].path+'.raw_reading_log',new_independent_analysis_archive:p.new_analysis.file,new_analysis_record_sha256:p.new_analysis_record_sha256,historical_missing_before:true,current_core_status:'knowledge_added_unverified',candidate_source_mode_unchanged:true,candidate_core_analysis_added_unchanged:false,new_queries:0,new_opens:0,new_core:0,new_independent_verification:false}};
}
