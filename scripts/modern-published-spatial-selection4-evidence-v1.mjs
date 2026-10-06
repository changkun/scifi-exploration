import {createHash} from 'node:crypto';
import {readFileSync, existsSync} from 'node:fs';
import {basename,join} from 'node:path';

// Private, isolated guard for exactly the 100 frozen modern selection4 spatial inputs.
// It deliberately does not alter or delegate to any existing spatial route.
export const MODERN_SELECTION4_PUBLISHED_SPATIAL_INPUTS = Object.freeze({
  'modern-published-spatial-expansion-round7.json':'a09165b0afc492a5ef8608264ef8722add3a546f6166ec4a5246a005c1b328aa',
  'modern-published-spatial-expansion-round8.json':'6a17bdcef5824e48851a000e8653cc990fb43d17fcfd1201968590b9338dd5f8'
});
export const MODERN_SELECTION4_SPATIAL_SELECTION_FILE='modern-published-spatial-expansion-selection4.json';
export const MODERN_SELECTION4_SPATIAL_SELECTION_SHA256='233adfeac079c40dde4953f07030e5b7900eb0d720d654404903e9990de3d105';
const hash=b=>createHash('sha256').update(b).digest('hex');
const sorted=v=>Array.isArray(v)?v.map(sorted):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sorted(v[k])])):v;
export const modernSelection4RecordSha=v=>hash(JSON.stringify(sorted(v)));
const equal=(a,b)=>modernSelection4RecordSha(a)===modernSelection4RecordSha(b);
const loaded=new Map();
function exactFile(archive,sha,{repoDir,evidenceDir},kind){
  if(!repoDir||!/^research\/(issue|spatial)-input-snapshots\/[^/]+\.json$/.test(archive))throw new Error('Modern selection4 fixed archive path rejected: '+kind);
  const p=join(repoDir,archive);let doc;
  const bytes=readFileSync(p);if(hash(bytes)!==sha)throw new Error('Modern selection4 fixed archive hash mismatch: '+kind);
  if(loaded.has(p+sha))doc=loaded.get(p+sha);else{doc=JSON.parse(bytes);loaded.set(p+sha,doc);}
  if(evidenceDir){const privateFile=join(evidenceDir,basename(archive));if(existsSync(privateFile)&&hash(readFileSync(privateFile))!==sha)throw new Error('Modern selection4 private/archive hash mismatch: '+kind);}
  return doc;
}
function exactRow(doc,id,kind){const rows=[...(doc.records||[]),...(doc.deferred||[])].filter(x=>x.id===id);if(rows.length!==1)throw new Error('Modern selection4 exact row cardinality: '+kind+'/'+id);return rows[0];}
const nodes=log=>!log?[]:[log,...(log.previous_attempts||[]).flatMap(nodes)];
const canonicalScope=w=>Object.fromEntries(['id','title_zh','author','form','forms','source_entity_kind','source_types'].map(k=>[k,w[k]??null]));
// The exact-ID selector lets an outer composed guard reject deletion of all
// new mode/filename markers instead of falling through to old URL-only logic.
// The caller supplies the immutable selection document, not inferred IDs.
export function modernSelection4PublishedSpatialIds({repoDir,evidenceDir}={}){
  const ids=[];for(const [file,sha] of Object.entries(MODERN_SELECTION4_PUBLISHED_SPATIAL_INPUTS)){
    const d=exactFile('research/spatial-input-snapshots/'+file,sha,{repoDir,evidenceDir},'spatial');ids.push(...d.records.map(x=>x.id));
  }return new Set(ids);
}
export function isModernSelection4PublishedSpatialRecord(record,context={}){
  return Object.hasOwn(MODERN_SELECTION4_PUBLISHED_SPATIAL_INPUTS,record.source_spatial_input_file)||
    record.spatial_selection_sha256===MODERN_SELECTION4_SPATIAL_SELECTION_SHA256||
    modernSelection4PublishedSpatialIds(context).has(record.id);
}
export function validateModernSelection4PublishedSpatialEvidence(record,{repoDir,evidenceDir,currentWork,issueAssertions,sourceSearchLog,verifyPrivateCaches=false,spatialAdoptionPhase='auto'}={}){
  const fail=why=>{throw new Error('Modern selection4 published space rejected ('+why+'): '+record.id);};
  const ctx={repoDir,evidenceDir};const file=record.source_spatial_input_file;const sha=MODERN_SELECTION4_PUBLISHED_SPATIAL_INPUTS[file];
  if(!sha||record.source_spatial_input_sha256!==sha||record.source_spatial_input_archive!=='research/spatial-input-snapshots/'+file)fail('fixed spatial declaration');
  const d=exactFile(record.source_spatial_input_archive,sha,ctx,'spatial');if(d.metadata?.status!=='frozen_checkpoint')fail('frozen checkpoint');
  const original=exactRow(d,record.id,'spatial');if(modernSelection4RecordSha(original)!==record.source_spatial_input_record_sha256)fail('frozen spatial record');
  for(const k of Object.keys(original))if(!equal(record[k],original[k]))fail('changed frozen payload '+k);
  if(record.scope_adapter_file||record.scope_adapter_archive||record.scope_adapter_sha256)fail('unauthorized adapter');
  const selection=exactFile('research/spatial-input-snapshots/'+MODERN_SELECTION4_SPATIAL_SELECTION_FILE,MODERN_SELECTION4_SPATIAL_SELECTION_SHA256,ctx,'selection');
  if(selection.metadata?.canonical_sha256!==record.source_canonical_snapshot_sha256||selection.metadata?.status!=='frozen_spatial_assignment'||record.spatial_selection_sha256!==MODERN_SELECTION4_SPATIAL_SELECTION_SHA256)fail('selection pin');
  const row=selection.records[record.spatial_selection_index];if(!row||row.id!==record.id||!equal(row.identity,record.identity)||row.canonical_record.spatial_primary!=='unknown')fail('selection row');
  const old=row.canonical_record;
  if(!currentWork||currentWork.id!==record.id||currentWork.issue_analysis_status==='missing'||currentWork.issue!==old.issue||!equal(canonicalScope(currentWork),record.frozen_canonical_identity_scope))fail('current identity form type/core');
  if(issueAssertions!==undefined&&!equal(issueAssertions,currentWork.knowledge?.assertions))fail('assertion context');
  if(sourceSearchLog!==undefined&&!equal(sourceSearchLog,currentWork.source_search_log))fail('process context');
  if(!equal(record.preserved_source_search_log,old.source_search_log)||!equal(old.source_search_log,currentWork.source_search_log)||modernSelection4RecordSha(old.source_search_log)!==record.preserved_source_search_log_sha256)fail('full process history');
  if(modernSelection4RecordSha(old)!==record.source_canonical_record_sha256)fail('frozen canonical row');
  const ad=exactFile(record.source_analysis_archive,record.source_analysis_sha256,ctx,'analysis');const a=exactRow(ad,record.id,'analysis');
  const ld=exactFile(record.source_log_archive,record.source_log_sha256,ctx,'log');const l=exactRow(ld,record.id,'log');
  if(record.source_analysis_file!==record.source_analysis_archive||record.source_log_file!==record.source_log_archive||modernSelection4RecordSha(a)!==record.source_analysis_record_sha256||modernSelection4RecordSha(l)!==record.source_log_record_sha256||!equal(a,record.original_analysis_record)||!equal(l,record.original_reading_log)||!equal(a,row.original_analysis_record))fail('exact original A/L');
  if(!equal(a.identity,record.identity)||!equal(l.identity,record.identity)||a.fields?.issue!==currentWork.issue||a.verification_status!=='knowledge_added_unverified'||!equal(ad.metadata,record.original_analysis_metadata)||!equal(ld.metadata,record.original_log_metadata))fail('original identity/scope/metadata');
  const assertion=currentWork.knowledge?.assertions?.find(x=>x.input_file===record.source_core_assertion_file&&equal(Object.fromEntries(Object.entries(x).filter(([k])=>k!=='input_file')),a));
  if(!assertion||modernSelection4RecordSha(assertion)!==record.source_core_assertion_record_sha256||!equal(assertion,row.canonical_assertion))fail('exact active displayed assertion');
  if(!nodes(currentWork.source_search_log).some(n=>equal(n.raw_reading_log,l)))fail('exact raw original log absent from full history');
  const counters=Object.fromEntries(Object.entries(l).filter(([k])=>k.endsWith('_count')));
  if(!equal(counters,record.original_counter_fields)||record.original_actual_search_count!==(l.actual_search_count??null)||record.original_actual_open_count!==(l.actual_open_count??null))fail('original counter presence/value');
  const presence=Object.fromEntries(['actual_search_count','actual_query_count','actual_open_count','actual_content_source_read'].map(k=>[k,Object.hasOwn(l,k)]));if(!equal(presence,record.original_counter_presence))fail('original presence flags');
  // This fixed batch includes 79 earlier A files that never declared ownership.
  // Absence is proved by the exact pinned original A metadata and fixed S row;
  // it is not a permission to omit an originally declared owner or history.
  if(ad.metadata.ownership_file){
    const ownArchive=record.original_ownership_archive;if(!ownArchive||record.original_ownership_sha256!==ad.metadata.ownership_sha256||record.original_ownership_file!==ad.metadata.ownership_file)fail('original ownership declaration');
    const owner=exactFile(ownArchive,record.original_ownership_sha256,ctx,'owner');const own=owner.records[record.original_ownership_index];
    if(!own||own.id!==record.id||!equal(own,record.original_ownership_record)||record.original_prior_source_log_present!==Object.hasOwn(own,'prior_source_log')||!equal(record.prior_source_log,own.prior_source_log??null))fail('exact original owner row/prior');
  }else{
    if(['original_ownership_file','original_ownership_sha256','original_ownership_index','original_ownership_record','prior_source_log'].some(k=>record[k]!==null)||Object.hasOwn(record,'original_ownership_archive')||Object.hasOwn(record,'original_prior_source_log_present'))fail('fabricated original owner declaration');
  }
  if(!equal(Object.keys(record.fields).sort(),['spatial_primary','spatial_rationale','spatial_secondary'])||!['earth','planetary','interstellar','galactic','cosmic','abstract'].includes(record.fields.spatial_primary)||!Array.isArray(record.fields.spatial_secondary)||record.fields.spatial_secondary.some(x=>!['earth','planetary','interstellar','galactic','cosmic','abstract'].includes(x))||!record.fields.spatial_rationale?.trim())fail('exact three spatial fields');
  if(record.verification_status!=='knowledge_added_unverified'||record.integration_relation!=='published_core'||record.independently_verified!==false||record.new_actual_search_count!==0||record.new_actual_open_count!==0||record.new_core_count!==0)fail('no upgrade/no new request');
  const mode=record.spatial_basis_mode;if(record.analysis_basis!==mode||!['saved_scoped_material','exact_existing_knowledge'].includes(mode))fail('explicit basis');
  if(mode==='exact_existing_knowledge'){
    if(record.sources.length||record.original_reading_scope!=='existing_knowledge_unverified'||!record.field_notes.spatial_primary.includes('准确已有知识'))fail('knowledge boundary');
    if(record.source_evidence.some(e=>e.type!=='existing_knowledge_spatial_with_original_scoped_lookup'||e.supports_spatial_independently!==false||e.new_read_performed!==false))fail('lookup promoted to space reading');
  }else{
    if(!record.sources.length||record.original_reading_scope!==l.exact_support_scope||record.source_evidence.some(e=>!record.sources.includes(e.url)||e.type!=='saved_scoped_material'||!e.support_scope?.trim()||e.original_support_scope!==l.exact_support_scope||e.new_read_performed!==false)||!record.source_cache_references.length)fail('scoped saved return boundary');
  }
  if(verifyPrivateCaches){
    for(const ref of record.source_cache_references){
      const bytes=readFileSync(ref.private_cache_file);if(hash(bytes)!==ref.file_sha256)fail('private cache file');
      let rr=JSON.parse(bytes);rr=Array.isArray(rr)?rr:rr.records||[];rr=rr.map(x=>x.value??x);
      if(!rr.some(x=>x.id===record.id&&modernSelection4RecordSha(x)===ref.record_sha256))fail('private exact cache record');
    }
  }
  if(!['auto','pre','post'].includes(spatialAdoptionPhase))fail('spatial adoption phase');
  const keys=['spatial_primary','spatial_secondary','spatial_rationale'];
  const spatialProjection=w=>Object.fromEntries(keys.map(k=>[k,{present:Object.hasOwn(w.knowledge?.fields||{},k),value:w.knowledge?.fields?.[k]??null}]));
  if(currentWork.spatial_primary==='unknown'){
    // A true pre-adoption object retains the exact original unknown evidence
    // and the presence/absence of all old knowledge spatial fields. Merely
    // flipping an adopted primary to unknown cannot enter this branch.
    if(spatialAdoptionPhase==='post'||!equal(currentWork.spatial_evidence,old.spatial_evidence)||!equal(spatialProjection(currentWork),spatialProjection(old)))fail('changed unknown pre-adoption projection');
  }else{
    if(spatialAdoptionPhase==='pre'||currentWork.spatial_primary!==record.fields.spatial_primary)fail('adopted canonical primary');
    const e=currentWork.spatial_evidence;
    if(!e||!['primary','secondary','rationale'].every(k=>Object.hasOwn(e,k))||e.primary!==record.fields.spatial_primary||!equal(e.secondary,record.fields.spatial_secondary)||e.rationale!==record.fields.spatial_rationale)fail('adopted canonical evidence three fields');
    const f=currentWork.knowledge?.fields;
    if(!f||!keys.every(k=>Object.hasOwn(f,k)&&equal(f[k],record.fields[k])))fail('adopted canonical knowledge three fields');
  }
  return mode==='exact_existing_knowledge'?'existing_knowledge_unverified':'scoped_reading';
}
