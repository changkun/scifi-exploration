import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';

// Three immutable historical candidates have a later retry in R89. Bind their
// original frozen L and the exact matching raw history; never reinterpret the
// latest retry as the earlier source read. No new verification or read claim.
const pins={
 'discovery:quick-retry-global-classification-candidates-round16:1':{
  id:'Q112191441',candidate:'e0143ca02a4880a952194376efac1c2758c8e079ea2e81132712609fa0f9d296',
  file:'quick-retry-global-round16-log.json',fileSha:'989bd23487ea7a9b3ef217c740abde64549570ce9ce2a34ad656acd1c67a557b',recordSha:'6c0a5dcce36ed25c488312b217a10869d17498ffb59c50698a8ca1bb07b2e9aa'},
 'discovery:quick-retry-global-classification-candidates-round16:2':{
  id:'Q112191441',candidate:'3b3994a113e058657180069c451b3f36b82b4a6867cb71447308b5accf3aff67',
  file:'quick-retry-global-round16-log.json',fileSha:'989bd23487ea7a9b3ef217c740abde64549570ce9ce2a34ad656acd1c67a557b',recordSha:'6c0a5dcce36ed25c488312b217a10869d17498ffb59c50698a8ca1bb07b2e9aa'},
 'discovery:quick-retry-root-assist-early-classification-candidates-round1:2':{
  id:'Q138661885',candidate:'5a86eb090d4c69f6484d15cb588f9f6109d842721f08bd99525bc1f02200b334',
  file:'quick-retry-root-assist-early-round4-log.json',fileSha:'d31266fd0c1821bdc6c8cccf5c19c641cc959812fbb2f96cc35e17245271a4fc',recordSha:'c1703489142cd60c5a13e0a4690b5a1b68991c73c25941044a80d4c252bdf958'}
};
const hash=b=>createHash('sha256').update(b).digest('hex');
const sorted=v=>Array.isArray(v)?v.map(sorted):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sorted(v[k])])):v;
const recordHash=v=>hash(JSON.stringify(sorted(v)));
const equal=(a,b)=>JSON.stringify(sorted(a))===JSON.stringify(sorted(b));
function nodes(value,path='$'){return !value?[]:[{value,path},...(value.previous_attempts||[]).flatMap((p,i)=>nodes(p,path+'.previous_attempts['+i+']'))];}
export function resolveR89PreservedScopedCandidateLog(candidate,evidence,work,{repoDir}={}){
 const pin=pins[candidate.id];
 if(!pin)return {log:work.source_search_log.raw_reading_log,proof:null};
 const fail=why=>{throw Error('R89 exact preserved candidate history rejected: '+candidate.id+' ('+why+')');};
 if(recordHash(candidate)!==pin.candidate||work.id!==pin.id||evidence.id!==pin.id||candidate.work_evidence.length!==1||!equal(candidate.work_evidence[0],evidence)||!equal(evidence.identity,{title:work.title_zh,author:work.author})||evidence.discovery_source_mode!=='scoped_candidate_no_core_analysis'||evidence.knowledge_analysis!==false||work.issue_analysis_status!=='missing'||work.completion.source_verified!==false)fail('candidate/current identity/scope');
 if(!repoDir)fail('repository root');
 const archive='research/issue-input-snapshots/'+pin.file;
 const bytes=readFileSync(join(repoDir instanceof URL?fileURLToPath(repoDir):repoDir,archive));
 if(hash(bytes)!==pin.fileSha)fail('original L bytes');
 const d=JSON.parse(bytes),rows=['records','attempts','deferred'].flatMap(k=>d[k]||[]).filter(r=>r.id===pin.id);
 if(rows.length!==1||recordHash(rows[0])!==pin.recordSha||!equal(rows[0].identity,evidence.identity))fail('original L record/identity');
 const raw=rows[0],found=nodes(work.source_search_log).filter(({value})=>value.attempt_input===pin.file&&equal(value.raw_reading_log,raw));
 if(found.length!==1)fail('exact original raw/history cardinality');
 const proof=evidence.private_raw_source;
 if(proof.provenance==='actual_search_return'){
  if(!raw.queries.includes(proof.actual_query)||!proof.record_sha256||!Number.isInteger(proof.record_index))fail('old actual query');
 }else if(!evidence.sources.every(url=>raw.direct_page_reads?.some(read=>read.url===url&&read.sha256===proof.sha256&&read.outcome==='actually_read_limited_page_return_not_full_original')))fail('old direct limited read');
 return {log:raw,proof:{candidate_id:candidate.id,id:work.id,candidate_record_sha256:pin.candidate,original_log_archive:archive,original_log_file_sha256:pin.fileSha,original_log_record_sha256:pin.recordSha,exact_history_pointer:found[0].path+'.raw_reading_log',source_mode_unchanged:true,new_query_count:0,new_open_count:0,new_core_count:0,original_fulltext_claim_added:false,independent_verification_upgrade:false}};
}
