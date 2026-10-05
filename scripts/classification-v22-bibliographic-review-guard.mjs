// One isolated form review; does not broaden any existing content/knowledge mode.
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
const sort=x=>Array.isArray(x)?x.map(sort):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,sort(x[k])])):x;
const hash=x=>createHash('sha256').update(JSON.stringify(sort(x))).digest('hex');
const proposalFile='research/classification-discovery-audits/classification-v22-navigation-proposal-global.json';
const proposalSha='ea386c5bd4f45fe8d7ba5cefe6c58157ce579bb091f9972868d0b754e22fb0ae';
export const isV22BibliographicFormReview=review=>review.evidence_mode==='bibliographic_form_review_without_core';
export async function validateV22BibliographicFormReview(review,{repoDir,candidate,category,original,member,work}) {
 assert(isV22BibliographicFormReview(review));
 assert.equal(review.work_id,'Q21161141');assert.equal(review.category_id,'form:fiction-nonfiction-compilation');
 assert.equal(review.candidate_id,'discovery:quick-retry2-modern-classification-candidates-r2:2');
 assert.equal(review.revision,22);assert.equal(review.review_input,proposalFile);
 const bytes=await readFile(join(repoDir,proposalFile));assert.equal(createHash('sha256').update(bytes).digest('hex'),proposalSha);
 const fixed=JSON.parse(bytes).proposals.find(p=>p.category_id===review.category_id).work_memberships.find(m=>m.id===work.id);
 assert.deepEqual(original,fixed);assert.equal(hash(candidate),'5bae7dc7da822561dd15a4078f80e47ddfb035ebfd3df353457c713686fc87a0');
 assert.equal(category.axis,'form');assert.equal(work.id,'Q21161141');assert.equal(work.issue_analysis_status,'missing');
 assert.equal(work.completion.source_verified,false);assert.equal(original.original_analysis_inputs.length,0);
 assert.equal(original.restricted_bibliography_mode,'stars-and-gods-v22-fixed-single-member');
 assert.deepEqual(original.identity,{title:work.title_zh,author:work.author});
 assert.equal(hash(work.source_search_log),original.original_log_input.record_sha256);
 const evidence=candidate.work_evidence.find(e=>e.id===work.id);
 assert.equal(evidence.discovery_source_mode,'bibliographic_candidate_no_core_analysis');
 assert.equal(evidence.actual_bibliographic_source_read,true);assert.equal(evidence.actual_content_source_read,false);
 assert.equal(evidence.knowledge_analysis,false);assert.equal(evidence.core_analysis_added,false);
 assert.equal(evidence.original_full_text_read,false);assert.equal(evidence.independently_verified,false);
 assert.deepEqual(member.sources,evidence.sources);
 for(const url of member.sources) assert(work.source_search_log.materials_checked.some(m=>
  m.url===url&&m.result==='bibliographic_candidate_no_core_analysis'&&m.actual_bibliographic_source_read===true&&
  m.actual_content_source_read===false&&m.knowledge_analysis===false&&m.reading_scope===evidence.exact_support_scope&&
  m.scope_evidence_sha256===evidence.same_return_evidence.sha256&&m.scope_record_sha256===evidence.same_return_evidence.record_sha256&&
  m.scope_actual_query===evidence.same_return_evidence.actual_query));
 assert.equal(review.core_result_unchanged,true);assert.equal(review.independent_verification_upgrade,false);
 return {mode:'bibliographic_form_review_without_core',core_result_unchanged:true,source_read_scope:'目录及混合选编形式 · 目标情节待核'};
}
