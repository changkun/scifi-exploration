import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {validateV22BibliographicFormReview} from './classification-v22-bibliographic-review-guard.mjs';
// Exactly one old V22 review. Validate real current history separately, then pass
// only its immutable original log to the unchanged legacy guard.
const P={
  "id": "Q21161141",
  "review_record_sha256": "c430db937405c9eba3594d5bc0d1224d0f86eca2b4817ce49693e9a14f80e725",
  "candidate_id": "discovery:quick-retry2-modern-classification-candidates-r2:2",
  "candidate_record_sha256": "5bae7dc7da822561dd15a4078f80e47ddfb035ebfd3df353457c713686fc87a0",
  "evidence_record_sha256": "02be43dd2d38c70b9903de4f46e4f082cfe6f851aa964fa8ebcce79b84d93d2c",
  "category_id": "form:fiction-nonfiction-compilation",
  "member_record_sha256": "3b05f259f0d957c8049604d71af44b33fb0f0cc055b516889356a38684df948e",
  "original_membership_record_sha256": "74d61fb2e0419e29697f87d42aa4bcffa626dc41cb01bba609e28907e51d34ee",
  "original_log": {
    "file": "research/classification-discovery-audits/classification-v22-navigation-current-context.json",
    "file_sha256": "92b69bc00b810b94758953bd648fa0e8db57cd59cf83d475d3511e8c9c9b00f4",
    "record_pointer": "$.records[24].source_search_log",
    "record_sha256": "c614ad23956f354ed0c36ac76ad3b0e5da16b0e02565941ad7f2cb2731b9a0b5",
    "scope": "Exact current preserved source-search log, including history; original counters/absence unchanged. Snapshot extraction is not a new operation."
  },
  "original_proposal": {
    "archive": "research/classification-discovery-audits/classification-v22-navigation-proposal-global.json",
    "sha256": "ea386c5bd4f45fe8d7ba5cefe6c58157ce579bb091f9972868d0b754e22fb0ae"
  },
  "latest_log": {
    "archive": "research/issue-input-snapshots/quick-retry3-modern-pool2-round4-log.json",
    "sha256": "3cc7141b58d49e8cdd0a01a1cd3c42bd1e9e2886b38cb17eaa8e9570ea982741"
  },
  "owner": {
    "archive": "research/issue-input-snapshots/quick-retry3-modern-assignment-round2.json",
    "sha256": "a6ab372379c4aa8e4320d6f92d23409a63513828d309ca7671ad3880f9dd1a79"
  },
  "binding": {
    "archive": "research/classification-discovery-audits/round94-stars-gods-historical-form-review-binding-private.json",
    "sha256": "2a817bc936e9ad2e40dd2d1b6a46a871d72e19cac0503cb52f2b93cf78601f31"
  },
  "legacy_module_sha256": "6615cc4217bde0edd4673d47bcc274b105d9fbf83b36e56b372bea33296cdf71"
};
const H=b=>createHash('sha256').update(b).digest('hex'),sort=v=>Array.isArray(v)?v.map(sort):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sort(v[k])])):v;
const rh=v=>H(JSON.stringify(sort(v))),eq=(a,b)=>rh(a)===rh(b);
const minusHistory=v=>Object.fromEntries(Object.entries(v).filter(([k])=>!['input_file','log_date','previous_attempts'].includes(k)));
function nodes(v,p='$'){return !v?[]:[{value:v,path:p},...(v.previous_attempts||[]).flatMap((x,i)=>nodes(x,p+'.previous_attempts['+i+']'))];}
function archived(pin,repoDir){const b=readFileSync(join(repoDir,pin.archive||pin.file));if(H(b)!==(pin.sha256||pin.file_sha256))throw Error('R94 preserved V22 exact archive');return JSON.parse(b);}
export function isR94StarsGodsHistoricalFormReview(review){return review.work_id===P.id||review.candidate_id===P.candidate_id;}
export async function validateR94PreservedV22BibliographicFormReview(review,options){
 if(!isR94StarsGodsHistoricalFormReview(review))return validateV22BibliographicFormReview(review,options);
 const {candidate,category,original,member,work}=options,repoDir=options.repoDir instanceof URL?fileURLToPath(options.repoDir):options.repoDir,reject=why=>{throw Error('R94 single preserved V22 review rejected: '+why);};
 if(rh(review)!==P.review_record_sha256||candidate.id!==P.candidate_id||rh(candidate)!==P.candidate_record_sha256||category.id!==P.category_id||rh(original)!==P.original_membership_record_sha256||rh(member)!==P.member_record_sha256||work.id!==P.id||work.issue_analysis_status!=='missing'||work.completion?.source_verified!==false)reject('fixed review/candidate/member and missing unverified core');
 const bd=archived(P.binding,repoDir),b=bd.records[0],od=archived(P.original_log,repoDir),old=od.records[24].source_search_log;
 if(bd.records.length!==1||b.id!==P.id||rh(old)!==P.original_log.record_sha256||!eq(old,b.original_full_log)||rh(old)!==b.original_full_log_sha256||rh(b.actual_r94_full_log)!==b.actual_r94_full_log_sha256)reject('immutable original/current full logs');
 const evidence=candidate.work_evidence.find(e=>e.id===P.id);if(rh(evidence)!==P.evidence_record_sha256||!eq(Object.fromEntries(Object.keys(b.identity_scope).map(k=>[k,work[k]??null])),b.identity_scope))reject('exact evidence/identity/form scope');
 const ld=archived(P.latest_log,repoDir),ls=ld.records.filter(l=>l.id===P.id),owner=archived(P.owner,repoDir);
 if(ls.length!==1||!eq(ls[0],b.actual_r94_original_log)||rh(ls[0])!==b.actual_r94_original_log_sha256||!eq(ls[0].original_counter_fields,b.original_counter_fields)||!eq(Object.fromEntries(Object.keys(ls[0]).map(k=>[k,true])),b.original_property_presence)||ls[0].ownership_index!==63||ls[0].parent_ownership_index!==143||!eq(ls[0].prior_source_log,old)||owner.records[63].id!==P.id||!eq(owner.records[63].prior_source_log,old))reject('actual R94 original L/owner/full prior/counter presence');
 const current=work.source_search_log,expected=b.actual_r94_full_log;
 if(!current||!eq(current.previous_attempts?.slice(0,expected.previous_attempts.length),expected.previous_attempts)||!eq(current.queries?.slice(0,expected.queries.length),expected.queries)||!eq(current.materials_checked?.slice(0,expected.materials_checked.length),expected.materials_checked))reject('complete real cumulative query/material/history prefix');
 const found=nodes(current).filter(({value})=>value.attempt_input===P.latest_log.archive.split('/').pop()&&eq(value.raw_reading_log,ls[0]));
 if(found.length!==1||!eq(minusHistory(found[0].value),minusHistory(expected))||!eq(expected.prior_source_log,old)||!eq(expected.previous_attempts.slice(0,-1),old.previous_attempts)||!eq(expected.previous_attempts.at(-1),minusHistory(old)))reject('unique real current/historical R94 node preserves original V22 log');
 if(H(readFileSync(join(repoDir,'scripts/classification-v22-bibliographic-review-guard.mjs')))!==P.legacy_module_sha256)reject('unchanged legacy module bytes');
 archived(P.original_proposal,repoDir);
 // This clone is used only for the old fixed-log validator. Actual current history
 // and all current semantic states were checked above; the work/log is not written.
 return validateV22BibliographicFormReview(review,{...options,repoDir,work:{...work,source_search_log:old}});
}
