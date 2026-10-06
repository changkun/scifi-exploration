import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';

// Only the nine reviewed current-suffix annotations can extend the R91
// process guard. Their full before/after records are fixed, including raw logs.
const FILE='research/classification-discovery-audits/round91-candidate-layer-independent-delta-proof-v1-private.json';
const SHA='f873bce3580243b7a86b0897fd57ea006838b7ef166042696ba2401d0f1009ee';
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const sorted=value=>Array.isArray(value)?value.map(sorted):value&&typeof value==='object'?Object.fromEntries(Object.keys(value).sort().map(key=>[key,sorted(value[key])])):value;
const recordHash=value=>hash(JSON.stringify(sorted(Object.fromEntries(Object.entries(value||{}).filter(([key])=>!['input_file','log_date'].includes(key))))));
export function matchesR91CandidateProcessAdapter(actual,expected,{repoDir}={}){
  if(!actual?.id||actual.id!==expected?.id)return false;
  for(const key of ['input_file','log_date'])if(Object.hasOwn(actual,key)!==Object.hasOwn(expected,key)||actual[key]!==expected[key])return false;
  const bytes=readFileSync(join(repoDir,FILE));
  if(hash(bytes)!==SHA)throw new Error('R91 candidate process delta proof changed');
  const proof=JSON.parse(bytes),rows=proof.records.filter(row=>row.id===actual.id);
  if(proof.records.length!==9||new Set(proof.records.map(row=>row.id)).size!==9)throw new Error('R91 candidate process closed count changed');
  return rows.length===1&&recordHash(expected)===rows[0].original_full_process_record_sha256&&recordHash(actual)===rows[0].derived_full_process_record_sha256;
}
