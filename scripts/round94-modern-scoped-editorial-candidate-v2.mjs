import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
// Fixed two editorial directions and four precise volumes. Bibliographic-only,
// target plot remains missing. No private web text is copied into these archives.
const P={
  "candidates": {
    "archive": "research/classification-discovery-inputs/round94-modern-two-form-pending-candidates.json",
    "sha256": "fac5065d8dacbf7744ae5861c3f81fdada488e6cbae4244c809577cc8236d04b"
  },
  "binding": {
    "archive": "research/classification-discovery-inputs/round94-modern-form-pending-exact-binding-context.json",
    "sha256": "d41cfd511a5e01db0a1413f2f3a9eb4f4827f234aa492d9ed867a894e7efe5fe"
  },
  "original_C": {
    "archive": "research/classification-discovery-inputs/quick-retry3-modern-pool2-round3-classification-candidates.json",
    "sha256": "e3791718a45840f69a0d04a9b273e5f2092f1ff2b466c1519f19d4a23445e51a"
  },
  "original_L": {
    "archive": "research/issue-input-snapshots/quick-retry3-modern-pool2-round3-log.json",
    "sha256": "c1e4af2645039b0c5e57a59f5b82b9235dc0c987b1388a52cf7436fe202da27d"
  },
  "original_A": {
    "archive": "research/issue-input-snapshots/quick-retry3-modern-pool2-round3.json",
    "sha256": "9e6f3221ea418240a1b9ae58f5d1b4293a5ba0fc079268ae2f9962b73e6b3b7c"
  },
  "owner": {
    "archive": "research/issue-input-snapshots/quick-retry3-modern-assignment-round2.json",
    "sha256": "a6ab372379c4aa8e4320d6f92d23409a63513828d309ca7671ad3880f9dd1a79"
  },
  "scope_adapter": {
    "archive": "research/classification-discovery-inputs/round94-modern-form-pending-material-scope-adapter.json",
    "sha256": "b4f5d3c48fd27d0f532efc80c574716d32e585723532ce509a699f98ffeec80f"
  },
  "candidate_ids": [
    "pending:round94-modern-author-creation-order-collected-volumes",
    "pending:round94-modern-variant-and-unfinished-literary-remains"
  ],
  "work_ids": [
    "Q18424396",
    "Q18424650",
    "Q18430220",
    "Q18433856"
  ]
};
const H=b=>createHash('sha256').update(b).digest('hex');
const sort=v=>Array.isArray(v)?v.map(sort):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sort(v[k])])):v;
const rh=v=>H(JSON.stringify(sort(v))),eq=(a,b)=>rh(a)===rh(b);
function file(pin,repoDir){
 const b=readFileSync(join(repoDir instanceof URL?fileURLToPath(repoDir):repoDir,pin.archive));
 if(!/^research\/(classification-discovery-inputs|issue-input-snapshots)\/[^/]+\.json$/.test(pin.archive)||H(b)!==pin.sha256)throw Error('R94 editorial exact archive');return JSON.parse(b);
}
function nodes(v,path='$'){return !v?[]:[{value:v,path},...(v.previous_attempts||[]).flatMap((n,i)=>nodes(n,path+'.previous_attempts['+i+']'))];}
function one(d,id){const rs=(d.records||[]).filter(r=>r.id===id);if(rs.length!==1)throw Error('R94 editorial unique exact row');return rs[0];}
const withoutHistory=v=>Object.fromEntries(Object.entries(v).filter(([k])=>!['previous_attempts','input_file','log_date'].includes(k)));
const scope=v=>Object.fromEntries(['id','title_zh','author','form','forms','source_entity_kind','source_types'].map(k=>[k,v[k]??null]));
export function validateR94ModernScopedEditorialCandidate(candidate,evidence,work,{repoDir}={}){
 if(!P.candidate_ids.includes(candidate.id)&&!P.work_ids.includes(evidence.id)&&!P.work_ids.includes(work?.id))return false;
 const reject=why=>{throw Error('R94 fixed bibliographic pending rejected '+evidence.id+': '+why);};
 const entry=file(P.candidates,repoDir).records.find(c=>c.id===candidate.id),bind=one(file(P.binding,repoDir),evidence.id);
 if(!entry||!eq(entry,candidate)||!eq(evidence,bind.evidence_record)||rh(candidate)!==bind.candidate_entry_record_sha256||candidate.review_status!=='pending_further_comparison'||candidate.dimension!=='form'||!candidate.work_evidence.some(e=>eq(e,evidence)))reject('exact two candidates/four supports');
 const l=one(file(P.original_L,repoDir),evidence.id),original=file(P.original_C,repoDir).records[bind.original_candidate_index],ad=file(P.original_A,repoDir),own=file(P.owner,repoDir).records[l.ownership_index];file(P.scope_adapter,repoDir);
 if(!eq(l,bind.original_log_record)||!eq(original,bind.original_candidate_record)||original.work_id!==evidence.id||!eq(original.identity,evidence.identity)||!eq(original.sources,evidence.sources)||!eq(original.source_evidence,evidence.original_source_evidence)||l.parent_ownership_index!==l.ownership_index+80||l.prior_source_log!==undefined&&!eq(l.prior_source_log,own.prior_source_log)||!eq(l.prior_source_log,bind.original_work.source_search_log)||!eq(l.original_counter_fields,bind.original_counter_fields)||!eq(Object.fromEntries(Object.keys(l).map(k=>[k,true])),bind.original_property_presence))reject('exact original C/L/owner/full prior/counter presence');
 if(ad.records.some(r=>r.id===evidence.id)||evidence.frozen_analysis_input.record_absent!==true||work.issue_analysis_status!=='missing'||work.completion?.source_verified!==false||!eq(scope(work),scope(bind.original_work))||!eq(evidence.identity,{title:work.title_zh,author:work.author})||work.id!==evidence.id||(work.classification_assignments||[]).some(a=>a.label===candidate.proposed_label))reject('exact identity/form; no target core/automatic membership');
 if(evidence.discovery_source_mode!=='bibliographic_candidate_no_core_analysis'||evidence.actual_bibliographic_source_read!==true||evidence.actual_content_source_read!==false||evidence.target_work_content_read!==false||evidence.knowledge_analysis!==false||evidence.core_analysis_added!==false||evidence.independently_verified!==false||l.actual_search_count!==1||l.actual_open_count!==0||l.full_original_text_read!==false)reject('bibliographic versus plot reading boundary');
 const ref=original.source_cache_references[0],proof=evidence.private_raw_source;
 if(original.source_cache_references.length!==1||proof.provenance!=='actual_search_return'||proof.new_queries!==0||proof.new_opens!==0||proof.sha256!==ref.sha256||proof.record_sha256!==ref.record_sha256||proof.record_index!==ref.index||proof.container!==ref.section||!proof.private_raw_file.endsWith('/'+ref.file)||!l.queries.includes(proof.actual_query)||!work.source_search_log?.queries.includes(proof.actual_query)||!eq(l.response_cache_references,[ref]))reject('exact original query/cache metadata, not a new request');
 const found=nodes(work.source_search_log).filter(({value})=>value.attempt_input===P.original_L.archive.split('/').pop()&&eq(value.raw_reading_log,l));
 if(found.length!==1||!eq(withoutHistory(found[0].value),withoutHistory(bind.exact_expected_normalized_source_log)))reject('unique exact current/preserved normalized history');
 const expected=bind.exact_expected_normalized_source_log,now=work.source_search_log;
 if(!Array.isArray(now.previous_attempts)||!eq(now.previous_attempts.slice(0,expected.previous_attempts.length),expected.previous_attempts)||!eq(now.materials_checked.slice(0,expected.materials_checked.length),expected.materials_checked)||!eq(now.queries.slice(0,expected.queries.length),expected.queries))reject('complete preserved query/material/history prefixes');
 for(const url of evidence.sources){
  const ms=work.source_search_log.materials_checked.filter(m=>m.url===url&&m.scope_actual_query===proof.actual_query&&m.scope_record_sha256===proof.record_sha256&&m.scope_evidence_sha256===proof.sha256);
  const expected=bind.exact_expected_normalized_source_log.materials_checked.filter(m=>m.url===url&&m.scope_actual_query===proof.actual_query&&m.scope_record_sha256===proof.record_sha256&&m.scope_evidence_sha256===proof.sha256);
  if(ms.length!==1||expected.length!==1||!eq(ms[0],expected[0])||ms[0].actual_bibliographic_source_read!==true||ms[0].actual_content_source_read!==false||ms[0].target_work_content_read!==false||ms[0].knowledge_analysis!==false||ms[0].core_analysis_added!==false||ms[0].reading_scope!==evidence.exact_support_scope)reject('exact new suffix bibliographic material scope');
 }
 return true;
}
