// R89 isolated form/publication-history mode. No target plot or core promotion.
import assert from 'node:assert/strict';
import {readFileSync, realpathSync} from 'node:fs';
import {join,sep} from 'node:path';
import {createHash} from 'node:crypto';
const MODE='scoped_form_history_without_core_analysis';
const sorted=v=>Array.isArray(v)?v.map(sorted):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sorted(v[k])])):v;
const rs=v=>createHash('sha256').update(JSON.stringify(sorted(v))).digest('hex');
const sha=b=>createHash('sha256').update(b).digest('hex');
const same=(a,b)=>rs(a)===rs(b);
const PINS={
  "adapters": [
    "research/classification-discovery-audits/round89-classification-candidate-adapters.json",
    "4f2fda6c1bcb45aada79ae9d23a4546d6a7ef40c410c36d952275872090b5269"
  ],
  "preflight": [
    "research/classification-discovery-audits/round89-classification-preflight.json",
    "4c7cf63ec6488f854ca9b465a9eef610f9067027c4d66a07adb075b5135fddd1"
  ],
  "candidates": {
    "research/classification-discovery-inputs/quick-retry2-global-classification-candidates-round10.json": "59b21afcbbb94fbea3ba1c9815aa050575c9d31b0ebbc233365c29dc93ee64c9",
    "research/classification-discovery-inputs/quick-retry2-modern-classification-candidates-r9.json": "5b6428ef8b714ca45af4cfc878e6507aa0dfc92f739257547aa47de6e6bff4b5",
    "research/classification-discovery-inputs/quick-retry2-modern-classification-candidates-r10.json": "c112fa1dfdbdd2a5f53d73eed1bc1a4738833927764cb3b781bec648f254b667",
    "research/classification-discovery-inputs/quick-retry2-modern-classification-candidates-r11.json": "54e90a42e92804e00329a89487102078922628f1912a94bf59fa8107a07aa4a3"
  },
  "analyses": {
    "research/issue-input-snapshots/quick-retry2-modern-round9.json": "7411a40af690612b98df067d1e03e8d90ded8a70288b94b25cd001b329f5a327",
    "research/issue-input-snapshots/quick-retry2-modern-round10.json": "7b7b4dbd142733c0d9ad4bd0361dd791e648940c7bc24c605b0dd53abed8528f",
    "research/issue-input-snapshots/quick-retry2-modern-round11.json": "70732f5aac0181d239c136bb776bfbb3483dfd7a1bfafc9ad4a3cb00ca6ca75f"
  },
  "logs": {
    "research/issue-input-snapshots/quick-retry2-modern-round9-log.json": "e85feb376bf7698f5db2262dc9e89504c630f6fd721a7044b7dd5111c0304516",
    "research/issue-input-snapshots/quick-retry2-modern-round10-log.json": "2517a9cdac578304dcd2bdd131eb89d4ebbd36422a7a64d3c5ed02471c1fa1ed",
    "research/issue-input-snapshots/quick-retry2-modern-round11-log.json": "929c4346fcad11e60b82bea9fbac492710956b71e3198d2d49f5c9b7e4b145a6"
  },
  "owner": [
    "research/issue-input-snapshots/quick-retry2-lane-2.json",
    "1d0623bb95ec95be038d68eeeda5404a04ebc150f86e82133086b36d194428ae"
  ]
};
const FIXED_IDS=new Set(['Q11296447','Q138661885','Q140738749','Q97312554']);
const load=(repo,ref,digest)=>{const root=realpathSync(repo),p=realpathSync(join(root,ref));assert(p.startsWith(root+sep));const bytes=readFileSync(p);assert.equal(sha(bytes),digest,ref+' exact bytes');return JSON.parse(bytes);};
export function validateR89FormHistoryCandidate(candidate,evidence,work,{repoDir,evidenceDir}={}){
  const routed=Object.hasOwn(PINS.candidates,candidate.discovery_input)&&FIXED_IDS.has(work.id);
  if(!routed&&evidence.discovery_source_mode!==MODE)return false;
  assert(routed,'new mode needs exact fixed input/ID');assert.equal(evidence.discovery_source_mode,MODE);assert(repoDir);
  const adapters=load(repoDir,...PINS.adapters),preflight=load(repoDir,...PINS.preflight);
  const ar=adapters.records.filter(x=>x.record.id===candidate.id);assert.equal(ar.length,1);assert(same(candidate,ar[0].record));assert.equal(rs(candidate),ar[0].derived_record_sha256);
  const doc=load(repoDir,candidate.discovery_input,PINS.candidates[candidate.discovery_input]);const original=doc.records[ar[0].source_record_index];assert.equal(rs(original),ar[0].original_candidate_record_sha256);assert.equal(candidate.original_candidate_input.record_sha256,rs(original));
  assert.equal(candidate.dimension,'form');assert.equal(candidate.review_status,'pending_further_comparison');assert.equal(candidate.work_evidence.length,1);assert(same(candidate.work_evidence[0],evidence));
  assert(same(evidence.identity,{title:work.title_zh,author:work.author}));assert.equal(work.issue_analysis_status,'missing');assert(!work.knowledge?.assertions?.some(x=>x.fields?.issue));assert.equal(work.completion.source_verified,false);
  const p=preflight.proofs.filter(x=>x.id===work.id&&x.candidate_id===candidate.id);assert.equal(p.length,1);const proof=p[0];assert.equal(proof.core_added_in_checkpoint,false);assert.equal(proof.target_sort_year_preserved,work.sort_year);assert.equal(evidence.target_sort_year_at_preview,work.sort_year);
  const af=evidence.frozen_analysis_input,lf=evidence.frozen_log_input;
  assert(PINS.analyses[af.file]&&PINS.logs[lf.file]);assert.equal(af.sha256,PINS.analyses[af.file]);assert.equal(lf.sha256,PINS.logs[lf.file]);
  const a=load(repoDir,af.file,af.sha256),l=load(repoDir,lf.file,lf.sha256);assert(!a.records.some(x=>x.id===work.id));assert.equal(af.work_record_present,false);assert.equal(af.record_sha256,null);
  const logs=[...(l.records||[]),...(l.deferred||[]),...(l.attempts||[])].filter(x=>x.id===work.id);assert.equal(logs.length,1);const raw=logs[0];assert.equal(rs(raw),lf.record_sha256);assert(same(work.source_search_log.raw_reading_log,raw));assert(same(raw.identity,evidence.identity));
  const owner=load(repoDir,...PINS.owner);assert.equal(owner.records[raw.ownership_index].id,work.id);assert.equal(evidence.original_ownership_index,raw.ownership_index);assert.equal(evidence.original_ownership_sha256,PINS.owner[1]);assert(same(raw.prior_source_log,owner.records[raw.ownership_index].prior_source_log));
  assert.equal(raw.queries.length,1);assert.equal(raw.queries[0],proof.raw_query.actual_query);assert(same(proof.raw_query,evidence.search_return_evidence));assert(same(evidence.same_return_evidence,evidence.search_return_evidence));assert(same(evidence.private_raw_source,evidence.search_return_evidence));
  assert.equal(raw.raw_search_artifact,proof.raw_query.private_raw_file);assert.equal(raw.raw_search_sha256,proof.raw_query.sha256);assert.equal(raw.raw_search_record_sha256,proof.raw_query.record_sha256);
  assert.equal(evidence.core_analysis_added,false);assert.equal(evidence.core_result_unchanged,true);assert.equal(evidence.target_work_content_read,false);assert.equal(evidence.bibliographic_scope_only,true);assert.equal(evidence.knowledge_analysis,false);assert.equal(evidence.independent_verification_upgrade,false);assert.equal(evidence.new_core_count,0);assert.equal(evidence.original_full_text_read,false);assert.equal(evidence.no_new_request,true);
  assert.equal(evidence.source_document_kind,'scoped_form_adaptation_platform_or_publication_history');assert.equal(evidence.exact_support_scope,original.work_evidence[0].exact_support_scope);assert(same(evidence.sources,original.work_evidence[0].sources));assert.equal(evidence.actual_content_source_read,original.work_evidence[0].actual_content_source_read);
  const previous=work.source_search_log.previous_attempts.at(-1);assert(previous);const offset=previous.materials_checked.length;assert(same(work.source_search_log.materials_checked.slice(0,offset),previous.materials_checked));
  for(const url of evidence.sources){
    const ms=work.source_search_log.materials_checked.slice(offset).filter(m=>m.url===url);assert(ms.length,'URL annotation only on new exact material');
    for(const m of ms){assert.equal(m.discovery_source_mode,MODE);assert.equal(m.source_scope_role,'form_publication_history_not_target_plot');assert.equal(m.source_document_kind,evidence.source_document_kind);assert.equal(m.target_work_content_read,false);assert.equal(m.actual_bibliographic_source_read,true);assert.equal(m.actual_content_source_read,evidence.actual_content_source_read);assert.equal(m.knowledge_analysis,false);assert.equal(m.reading_scope,evidence.exact_support_scope);assert.equal(m.scope_evidence_sha256,proof.raw_query.sha256);assert.equal(m.scope_record_sha256,proof.raw_query.record_sha256);assert.equal(m.scope_actual_query,raw.queries[0]);assert.equal(m.scope_raw_origin,'actual_search_return');}
  }
  if(evidenceDir){const bytes=readFileSync(join(evidenceDir,proof.raw_query.private_raw_file.split('/').at(-1)));assert.equal(sha(bytes),proof.raw_query.sha256);const rr=JSON.parse(bytes)[proof.raw_query.record_index];assert.equal(rs(rr),proof.raw_query.record_sha256);assert.equal(rr.id,work.id);assert.equal(rr.query,raw.queries[0]);assert(evidence.sources.every(url=>JSON.stringify(rr).includes(url)));}
  return true;
}
