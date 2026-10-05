// R88 public-only integration proposal, delivered privately. No public source is edited.
import {createHash} from 'node:crypto';
import {readFileSync,realpathSync} from 'node:fs';
import {join,sep} from 'node:path';
import {gunzipSync} from 'node:zlib';
import {validateSpatialEvidence as validateV5} from './initial-research-spatial-v5-public-baseline.mjs';

export const INITIAL_MODE='initial_research_exact_public_record_knowledge_unverified';
export const INITIAL_INPUT_KIND='r88_initial_public_research_exact_knowledge_derived127';
export const PINS=Object.freeze({
  publicAnalysis:{file:'research/issues-since-1980.json',sha:'0611838f8b04d53e85df2971eabf232f227c3c1ce6ec35c6ff2e7691db9eef58',count:275},
  originalSpatial:{name:'global-published-spatial-expansion-round1.json',file:'research/spatial-input-snapshots/global-published-spatial-expansion-round1.json',sha:'3060cc2f234609daa7b2555a1a281d9ecf11d9a0ad464bac874535a3c8019d45',count:128},
  derivedSpatial:{name:'global-published-spatial-expansion-round1-derived127.json',file:'research/spatial-input-snapshots/global-published-spatial-expansion-round1-derived127.json',sha:'cd2b1a764cdea1c0ccd5fe0c2e8b8e36657307f9073b7e717547b50aca0564e3',count:127},
  adapter:{name:'global-published-spatial-expansion-round1-scope-adapter.json',file:'research/spatial-input-snapshots/global-published-spatial-expansion-round1-scope-adapter.json',sha:'fcce36a7670a09f6dc30605d2b49608c7e5126402fdca8e70cc1ef4f3c942134'},
  originalSelection:{name:'global-published-spatial-expansion-selection-round1-private.json',file:'research/spatial-input-snapshots/global-published-spatial-expansion-selection-round1-private.json',sha:'c779b5fae38abda75ada346c005cdb5070fff92dff4a589fb44706781566d3df',count:150},
  v5Baseline:{name:'initial-research-spatial-v5-baseline-private.mjs',file:'scripts/initial-research-spatial-v5-public-baseline.mjs',sha:'864c918ec652737c092bdec5270e03f8f7cea2a07e309e0d6f9d2ca197bd2a20'},
});
for(const pin of Object.values(PINS))Object.freeze(pin);
const contexts=new WeakMap();
const sorted=v=>Array.isArray(v)?v.map(sorted):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sorted(v[k])])):v;
export const recordSha=v=>createHash('sha256').update(JSON.stringify(sorted(v))).digest('hex');
export const byteSha=v=>createHash('sha256').update(v).digest('hex');
const equal=(a,b)=>JSON.stringify(sorted(a))===JSON.stringify(sorted(b));
const empty=v=>Array.isArray(v)&&v.length===0;
const reject=(why,id)=>{throw new Error(`Initial research knowledge rejected (${why}): ${id??'context'}`);};
export function verifyPinnedBytes(bytes,pin){if(byteSha(bytes)!==pin.sha)reject(`pinned file hash ${pin.file}`);return bytes;}
function readPinned(root,pin){
  const realRoot=realpathSync(root),file=realpathSync(join(realRoot,pin.file));
  if(!file.startsWith(realRoot+sep))reject('pinned path outside trusted root');
  const bytes=verifyPinnedBytes(readFileSync(file),pin);
  return pin.file.endsWith('.json')?JSON.parse(bytes.toString('utf8')):bytes;
}
function unique(doc,pin){
  if(!Array.isArray(doc.records)||doc.records.length!==pin.count)reject(`record count ${pin.file}`);
  const map=new Map(doc.records.map(r=>[r.id,r]));if(map.size!==pin.count)reject(`duplicate id ${pin.file}`);return map;
}
const grain=w=>({id:w.id,title_zh:w.title_zh,author:w.author,form:w.form??null,
  source_entity_kind:w.source_index?.source_entity_kind??null,source_types:w.source_index?.source_types??null});

// Only trusted integration calls this constructor. It reads actual public A,
// current canonical, and immutable public archives; callers cannot fabricate
// a context by supplying similarly shaped objects or claimed digests.
export function createInitialResearchSpatialContext({repoDir,evidenceDir,stage='pre_adoption'}={}){
  if(!repoDir||!['pre_adoption','post_adoption'].includes(stage))reject('trusted roots/stage');
  const loadedV5Bytes=readFileSync(new URL('./initial-research-spatial-v5-public-baseline.mjs',import.meta.url));
  verifyPinnedBytes(loadedV5Bytes,PINS.v5Baseline);
  readPinned(repoDir,PINS.v5Baseline);
  if(evidenceDir){
    for(const pin of [PINS.originalSpatial,PINS.derivedSpatial,PINS.adapter,PINS.originalSelection,PINS.v5Baseline])
      readPinned(evidenceDir,{...pin,file:pin.name});
  }
  const aDoc=readPinned(repoDir,PINS.publicAnalysis),a=unique(aDoc,PINS.publicAnalysis);
  const oDoc=readPinned(repoDir,PINS.originalSpatial),original=unique(oDoc,PINS.originalSpatial);
  const dDoc=readPinned(repoDir,PINS.derivedSpatial),derived=unique(dDoc,PINS.derivedSpatial);
  const selectionDoc=readPinned(repoDir,PINS.originalSelection),selection=unique(selectionDoc,PINS.originalSelection);
  const adapter=readPinned(repoDir,PINS.adapter);
  if(dDoc.metadata.initial_public_source_sha256!==PINS.publicAnalysis.sha||
     !equal(dDoc.metadata.original_source_metadata,aDoc.metadata)||
     dDoc.metadata.original_frozen_input_sha256!==PINS.originalSpatial.sha||
     !equal(dDoc.metadata.excluded_ids,['Q130237223'])||
     !equal(adapter.metadata.excluded_ids,['Q130237223'])||
     !equal(adapter.metadata.revised_ids,['Q2291295','Q2301398','Q22074947']))reject('sealed derivation declarations');
  const removed=[...original.keys()].filter(id=>!derived.has(id));
  if(!equal(removed,['Q130237223'])||adapter.excluded_records.length!==1||
     !equal(adapter.excluded_records[0].original_record,original.get('Q130237223')))reject('excluded source record retained');
  for(const [id,row] of derived){
    const old=original.get(id),change=adapter.changes.find(r=>r.id===id);
    if(!old||!a.has(id)||!selection.has(id)||row.source_spatial_original_record_sha256!==recordSha(old))reject('source membership/original spatial record',id);
    if(change){if(change.original_record_sha256!==recordSha(old)||!equal(change.original_fields,old.fields)||!equal(change.proposed_fields,row.fields))reject('exact revised fields',id);}
    else if(!equal(row.fields,old.fields))reject('unreviewed changed placement',id);
  }
  const canonicalBytes=readFileSync(join(repoDir,'research/canonical-universe.json.gz'));
  const canonical=JSON.parse(gunzipSync(canonicalBytes).toString('utf8'));
  const works=new Map(canonical.works.map(w=>[w.id,w]));
  const context=Object.freeze({inputKind:INITIAL_INPUT_KIND,stage,
    canonical_sha256:byteSha(canonicalBytes),public_analysis_sha256:PINS.publicAnalysis.sha,
    derived_spatial_sha256:PINS.derivedSpatial.sha,record_count:127});
  contexts.set(context,{a,derived,original,selection,works,aDoc,repoDir,evidenceDir,stage});
  return context;
}

// Deep clones are only convenient caller arguments; validation always compares
// them with the independently loaded public archive context, not with these copies.
export function getInitialResearchCanonicalArguments(context,id){
  const data=contexts.get(context),work=data?.works.get(id);
  if(!work)reject('canonical snapshot id missing',id);
  return {initialResearchContext:context,currentWork:structuredClone(work),
    issueAssertions:structuredClone(work.knowledge?.assertions),sourceSearchLog:structuredClone(work.source_search_log)};
}

export function validateInitialResearchKnowledge(record,{initialResearchContext,currentWork,issueAssertions,sourceSearchLog}={}){
  const data=contexts.get(initialResearchContext),id=record?.id;
  if(!data||initialResearchContext.inputKind!==INITIAL_INPUT_KIND)reject('trusted initial input context missing',id);
  const expected=data.derived.get(id),original=data.original.get(id),a=data.a.get(id),selected=data.selection.get(id),work=data.works.get(id);
  if(!expected||!a||!selected||!work)reject('id outside adopted127',id);
  if(record.knowledge_provenance_mode!==INITIAL_MODE||record.initial_research_provenance!==true)reject('explicit initial mode missing',id);
  if(record.verification_status!=='knowledge_added_unverified'||record.analysis_basis!=='existing_knowledge_unverified'||
     record.spatial_basis_mode!=='exact_existing_knowledge'||record.integration_relation!=='published_core'||record.independently_verified!==false)reject('unverified knowledge labels',id);
  if(!empty(record.sources)||!empty(record.source_evidence)||!empty(record.source_cache_references))reject('pretend new source/cache reading',id);
  for(const k of ['original_ownership_file','original_ownership_sha256','original_ownership_index','original_reading_log','original_actual_search_count','original_actual_open_count'])
    if(!Object.hasOwn(record,k)||record[k]!==null)reject(`unrecorded original fact must remain null: ${k}`,id);
  if(record.original_operation_count_state!=='unknown_not_recorded'||record.original_owner_log_cache_state!=='not_recorded_preserved_absence')reject('unknown original operation state',id);
  for(const k of ['ownership_file','ownership_sha256','ownership_index','source_log_file','source_log_archive','source_log_sha256','delegation_file','actual_search_performed','actual_search_count','actual_open_count'])
    if(Object.hasOwn(record,k))reject(`invented original operation/owner: ${k}`,id);
  for(const k of ['new_actual_search_count','new_actual_open_count','new_complete_original_text_reads'])
    if(record[k]!==0)reject(`this new knowledge-only operation changed: ${k}`,id);
  if(record.source_analysis_file!==PINS.publicAnalysis.file||record.source_analysis_sha256!==PINS.publicAnalysis.sha||
     record.source_core_assertion_file!==PINS.publicAnalysis.file||record.original_source_record_count!==275||
     record.source_analysis_record_sha256!==recordSha(a)||!equal(record.original_analysis_record,a))reject('exact initial public A binding',id);
  if(!equal(record.original_sources,a.sources)||!equal(record.original_source_evidence,a.source_evidence??[]))reject('original URL/evidence loss or promotion',id);
  if(record.source_spatial_original_file!==PINS.originalSpatial.name||record.source_spatial_original_sha256!==PINS.originalSpatial.sha||
     record.source_spatial_original_record_sha256!==recordSha(original))reject('original128 binding',id);
  if(!equal(record.identity,a.identity)||!equal(record.current_identity,{title:work.title_zh,author:work.author})||
     !equal(record.identity,selected.current_identity)||!equal(grain(work),grain(selected.canonical_record)))reject('current identity/grain',id);
  if(!equal(currentWork,work)||!equal(issueAssertions,work.knowledge?.assertions)||!equal(sourceSearchLog,work.source_search_log))reject('actual canonical context mismatch',id);
  const active=(work.knowledge?.assertions??[]).filter(r=>r.input_file===PINS.publicAnalysis.file&&r.id===id);
  if(active.length!==1||recordSha(active[0])!==record.source_core_assertion_record_sha256||
     !equal(active[0],selected.canonical_assertion))reject('active exact initial assertion',id);
  const {input_file,...unwrapped}=active[0];
  if(!equal(unwrapped,a)||active[0].verification_status!=='knowledge_added_unverified'||
     !active[0].field_notes?.issue?.trim()||!data.aDoc.metadata.method.includes('已有作品知识')||
     !record.field_notes?.spatial_primary?.includes('已有知识'))reject('original/placement explicit unverified basis',id);
  // Two original A records describe limited primary-source reading. Their
  // exact old notes/URLs stay intact; the NEW placement is still knowledge,
  // and no unrecorded old request/cache count is guessed or converted to zero.
  if(!equal(record.field_notes,expected.field_notes)||record.source_scope!==expected.source_scope)reject('changed scope/narrative-unit note',id);
  if(!equal(record.fields,expected.fields)||!Object.keys(record.fields).every(k=>['spatial_primary','spatial_secondary','spatial_rationale'].includes(k)))reject('changed frozen location/scale',id);
  if(data.stage==='pre_adoption'&&![null,undefined,'unknown'].includes(work.spatial_primary))reject('current placement already known',id);
  if(data.stage==='post_adoption')validateCanonicalPostPlacement(work,expected.fields,expected);
  // No unbound extra key is ignored. Integration bookkeeping must be handled
  // outside this immutable input, not added to a record before validation.
  if(recordSha(record)!==recordSha(expected))reject('changed exact derived127 record',id);
  return 'initial_research_existing_knowledge_unverified';
}


// Canonical carries normalized secondary/rationale in spatial_evidence rather
// than necessarily at the top level. All three asserted fields are required;
// duplicate knowledge fields must agree exactly, and rationale is never ignored.
export function canonicalSpatialFields(work){
  if(!work||typeof work.spatial_primary!=='string'||!work.spatial_evidence||
     work.spatial_evidence.primary!==work.spatial_primary||
     !Array.isArray(work.spatial_evidence.secondary)||
     typeof work.spatial_evidence.rationale!=='string'||!work.spatial_evidence.rationale.trim())
    reject('canonical normalized spatial fields missing/conflicting',work?.id);
  const fields={spatial_primary:work.spatial_primary,
    spatial_secondary:work.spatial_evidence.secondary,spatial_rationale:work.spatial_evidence.rationale};
  for(const [key,value] of Object.entries(fields)){
    if(Object.hasOwn(work,key)&&!equal(work[key],value))reject('canonical top-level spatial disagreement: '+key,work.id);
    if(Object.hasOwn(work.knowledge?.fields??{},key)&&!equal(work.knowledge.fields[key],value))reject('canonical knowledge spatial disagreement: '+key,work.id);
  }
  return structuredClone(fields);
}
export function validateCanonicalPostPlacement(work,expectedFields,expectedRecord){
  const actual=canonicalSpatialFields(work);
  // Missing secondary in the original assertion does not mean arbitrary later
  // secondary fields are permitted. Its normalized default must remain [].
  if(!equal(actual.spatial_primary,expectedFields.spatial_primary)||
     !equal(actual.spatial_secondary,expectedFields.spatial_secondary??[])||
     !equal(actual.spatial_rationale,expectedFields.spatial_rationale))
    reject('post-adoption full normalized placement mismatch',work.id);
  for(const [key,value] of Object.entries(expectedFields))
    if(!Object.hasOwn(work.knowledge?.fields??{},key)||!equal(work.knowledge.fields[key],value))
      reject('post-adoption exact knowledge spatial field missing/conflicting: '+key,work.id);
  if(expectedRecord && !(work.knowledge?.assertions??[]).some(assertion=>{
    const {input_file,...raw}=assertion;
    return typeof input_file==='string'&&equal(raw,expectedRecord);
  }))reject('post-adoption exact derived127 spatial assertion missing',work.id);
  return true;
}

// Input-kind dispatch happens first, ahead of V5's generic source_evidence
// early return. A stripped mode cannot downgrade a trusted initial batch.
export function validateSpatialEvidenceProposed(record,options={}){
  if(options.initialResearchContext!==undefined||options.inputKind===INITIAL_INPUT_KIND)
    return validateInitialResearchKnowledge(record,options);
  if(record?.knowledge_provenance_mode===INITIAL_MODE||Object.hasOwn(record??{},'initial_research_provenance')||
     record?.source_analysis_file===PINS.publicAnalysis.file||record?.source_spatial_original_file===PINS.originalSpatial.name)
    reject('initial assertion cannot fall back to generic source reading',record?.id);
  return validateV5(record,options);
}
