// Private R88 validator proposal. Add this dispatch BEFORE bibliography/form
// or generic core evidence; author autobiography is a distinct source mode.
import assert from 'node:assert/strict';
import {readFileSync,realpathSync} from 'node:fs';
import {join,sep} from 'node:path';
import {createHash} from 'node:crypto';
const MODE='scoped_author_creation_history_without_core_analysis';
const sorted=v=>Array.isArray(v)?v.map(sorted):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sorted(v[k])])):v;
const rs=v=>createHash('sha256').update(JSON.stringify(sorted(v))).digest('hex');
const sha=v=>createHash('sha256').update(v).digest('hex');
const same=(a,b)=>JSON.stringify(sorted(a))===JSON.stringify(sorted(b));
const PINS={
 candidate:['research/classification-discovery-inputs/quick-retry2-modern-classification-candidates-r8.json','b5b46e251512ee6e31320d2bf218ced553fb858da34b0dab084338934c6f8e94'],
 analysis:['research/issue-input-snapshots/quick-retry2-modern-round8.json','29f25473f42bde46cb9444021556a4c7967d9aa9c55a31cd997397ce3bf40f2a'],
 log:['research/issue-input-snapshots/quick-retry2-modern-round8-log.json','2dd9e486fc6bcb13e5eb7f3880af966c8b749d6b519445b3a32c0756d05c5133'],
 owner:['research/issue-input-snapshots/quick-retry2-lane-2.json','1d0623bb95ec95be038d68eeeda5404a04ebc150f86e82133086b36d194428ae'],
 adapters:['research/classification-discovery-audits/round88-classification-candidate-adapters.json','fe586354600d4f860ef207b2167c4e4ce2c2acd02e69b5718fab4f1d778d0a3d'],
 preflight:['research/classification-discovery-audits/round88-classification-preflight.json','b14e2abf6fae265100625632f0d5e2803e005cbe7620d19e50f9f6588795c24b'],
};
function load(repoDir,pin){
 const root=realpathSync(repoDir),file=realpathSync(join(root,pin[0]));assert(file.startsWith(root+sep));
 const b=readFileSync(file);assert.equal(sha(b),pin[1],pin[0]+' fixed byte SHA');return JSON.parse(b);
}
export function validateR88AuthorCreationHistoryCandidate(candidate,evidence,work,{repoDir,evidenceDir}={}){
 if(evidence.discovery_source_mode!==MODE)return false;
 assert(repoDir,'trusted public archive root');
 const cDoc=load(repoDir,PINS.candidate),aDoc=load(repoDir,PINS.analysis),lDoc=load(repoDir,PINS.log),owner=load(repoDir,PINS.owner),adapters=load(repoDir,PINS.adapters),preflight=load(repoDir,PINS.preflight);
 const originals=cDoc.records.filter(c=>c.work_evidence.some(e=>e.id===work.id));assert.equal(originals.length,1);
 const original=originals[0];assert.equal(work.id,'Q20991243');assert.equal(rs(original),'c745de210c1ae3e815b3a0a122881ad62c8d6cff6e557759ae5970a34f0f047e');
 const adapted=adapters.records.filter(a=>a.record.id===candidate.id);assert.equal(adapted.length,1);
 assert.equal(adapted[0].original_candidate_record_sha256,rs(original));assert.equal(adapted[0].derived_record_sha256,rs(candidate));assert(same(candidate,adapted[0].record));
 assert.equal(candidate.dimension,'reality');assert(candidate.proposed_dimension.includes('历史脉络'));
 assert.equal(candidate.review_status,'pending_further_comparison');assert.equal(candidate.work_evidence.length,1);assert(same(evidence,candidate.work_evidence[0]));
 assert.equal(work.title_zh,'De goden gaan naar huis');assert.equal(work.author,'Bob Spoelstra');assert(same(evidence.identity,{title:work.title_zh,author:work.author}));
 assert.equal(work.issue_analysis_status,'missing');assert.equal(work.completion.source_verified,false);
 assert(!work.knowledge?.assertions?.some(a=>a.fields?.issue),'target final novel has no adopted core analysis');
 assert.equal(aDoc.records.filter(a=>a.id===work.id).length,0,'author chapter never becomes target A');
 const lr=[...lDoc.records,...lDoc.deferred].filter(r=>r.id===work.id);assert.equal(lr.length,1);const log=lr[0];
 assert(same(log.identity,evidence.identity));assert.equal(log.ownership_index,245);assert.equal(owner.records[245].id,work.id);assert(same(log.prior_source_log,owner.records[245].prior_source_log));
 assert(same(work.source_search_log.raw_reading_log,log),'raw frozen L unchanged');
 assert.equal(evidence.frozen_analysis_input.record_sha256,null);assert.equal(evidence.frozen_analysis_input.work_record_present,false);assert.equal(evidence.frozen_log_input.record_sha256,rs(log));
 assert(same(log.queries,['"De goden gaan naar huis" site:dbnl.org']));
 const proof=preflight.proofs.filter(p=>p.id===work.id&&p.candidate_id===candidate.id);assert.equal(proof.length,1);const p=proof[0];assert.equal(p.core_added_in_checkpoint,false);
 assert(same(evidence.search_return_evidence,p.raw_query));assert.equal(p.raw_query.sha256,'89e23b4fc5874de09457bb8a19e82a636c88f0b04a242f4e5b6fab726c40962b');assert.equal(p.raw_query.record_sha256,'f5cc58972acf36e027c3435648b73a9d5a5150d90f86b441f6ee3c88392ab99c');
 assert.equal(log.raw_search_sha256,p.raw_query.sha256);assert.equal(log.raw_search_record_sha256,p.raw_query.record_sha256);assert.equal(log.raw_search_artifact,p.raw_query.private_raw_file);
 assert.equal(evidence.actual_content_source_read,true,'content refers only to author autobiography');assert.equal(evidence.target_work_content_read,false);assert.equal(evidence.bibliographic_scope_only,false);assert.equal(evidence.knowledge_analysis,false);
 assert.equal(evidence.evidence_mode,MODE);assert.equal(evidence.source_document_kind,'author_autobiography_creation_history');assert.equal(evidence.source_document_year_as_recorded_in_scope,1971);assert.equal(evidence.source_author_name_as_recorded_in_frozen_scope,'A. den Doolaard');
 assert.equal(evidence.final_work_plot_used,false);assert.equal(evidence.draft_treated_as_final_plot,false);assert.equal(evidence.core_analysis_added,false);assert.equal(evidence.core_result_unchanged,true);assert.equal(evidence.independent_verification_upgrade,false);assert.equal(evidence.new_core_count,0);
 assert.equal(evidence.target_sort_year_at_preview,p.target_sort_year_preserved);assert.equal(work.sort_year,p.target_sort_year_preserved);
 assert.equal(evidence.sources.length,1);const url=evidence.sources[0];assert.equal(url,'https://www.dbnl.org/tekst/dool001ogen01_01/dool001ogen01_01_0012.php');assert.equal(evidence.exact_support_scope,original.work_evidence[0].exact_support_scope);
 assert.equal(p.actual_direct_page_proofs.length,1);const open=p.actual_direct_page_proofs[0];assert(same(evidence.private_raw_source,open));assert.equal(open.sha256,'fcdb6d1af946ec1cf390df453671b24f96cda713dc3de2dc2a188ffe73a4b707');
 assert.equal(open.url,url);assert.equal(open.outcome,'content_read');assert.equal(open.provenance,'actual_direct_page_return');assert.equal(open.new_queries,0);assert.equal(open.new_opens,0);
 assert.equal(log.actual_open_count,1);assert(log.opens.some(o=>o.url===url&&o.outcome==='content_read'&&o.raw_open_sha256===open.sha256&&o.raw_open_artifact===open.private_raw_file));
 const previous=work.source_search_log.previous_attempts.at(-1);assert(previous);const offset=previous.materials_checked.length;
 assert(same(work.source_search_log.materials_checked.slice(0,offset),previous.materials_checked));
 const materials=work.source_search_log.materials_checked.slice(offset).filter(m=>m.url===url);assert(materials.length);
 for(const m of materials){
  assert.equal(m.discovery_source_mode,MODE);assert.equal(m.source_document_kind,'author_autobiography_creation_history');assert.equal(m.source_scope_role,'author_creation_history_not_target_novel');assert.equal(m.actual_content_source_read,true);assert.equal(m.target_work_content_read,false);assert.equal(m.knowledge_analysis,false);
  assert.equal(m.scope_evidence_sha256,open.sha256);assert.equal(m.scope_record_sha256,open.record_sha256);assert.equal(m.scope_actual_query,log.queries[0]);assert.equal(m.scope_raw_origin,'actual_direct_page_return');assert(m.reading_scope.startsWith(evidence.exact_support_scope));
 }
 if(evidenceDir){
  for(const ref of [p.raw_query,open]){
   const b=readFileSync(join(evidenceDir,ref.private_raw_file.split('/').at(-1)));assert.equal(sha(b),ref.sha256);
   const row=JSON.parse(b)[ref.record_index];assert.equal(rs(row),ref.record_sha256);assert.equal(row.id,work.id);
   if(ref.provenance==='actual_search_return')assert.equal(row.query,log.queries[0]);else assert.equal(row.url,url);
  }
 }
 return true;
}
// Suggested current-validator dispatch:
// if (validateR88AuthorCreationHistoryCandidate(candidate,evidence,work,{repoDir})) {
//   /* mode handled, no generic bibliography/form/target-content fallback */
// } else if (evidence.discovery_source_mode === 'bibliographic_candidate_no_core_analysis') {
//   ...existing branches, unchanged...
// }
