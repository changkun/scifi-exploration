import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {gunzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import {FIELD_LABELS,buildCanonicalUniverse} from '../dist/assets/canonical.mjs';
import {loadBibliographySource,loadCompletionSource,loadLibraryDetail} from '../dist/assets/data-loader.mjs';
import {filterWorks,DEFAULT_STATE,stateFromURL,searchFromState} from '../dist/assets/model.mjs';
import {listSpatialInputs} from './issue-inputs.mjs';
import {validateSpatialEvidence} from './spatial-evidence.mjs';
import {completionChunks,completionDelivery,LOCAL_COMPLETION_DOWNLOAD,REPOSITORY_COMPLETION_DOWNLOAD} from './completion-delivery.mjs';
const root=new URL('../',import.meta.url),read=async p=>JSON.parse(await readFile(new URL(p,root),'utf8'));
const fetcher=async p=>({ok:true,json:()=>read('dist/'+p)});
const gz=async p=>JSON.parse(gunzipSync(await readFile(new URL(p,root))));
const [source,completion,catalog,spatial,links,baseline,crosschecks]=await Promise.all([loadBibliographySource(fetcher),loadCompletionSource(fetcher),read('dist/assets/catalog.json'),read('dist/assets/spatial.json'),read('dist/assets/research-links.json'),gz('research/audit-baseline-universe.json.gz'),gz('research/library-crosschecks.json.gz')]);
const {works}=buildCanonicalUniverse(source.records,catalog.works,spatial,links,completion.records),before=new Map(baseline.works.map(w=>[w.id,w]));
let passed=0;function check(name,f){f();passed++;console.log('PASS '+name);}
check('all canonical identities have all 17 field statuses and remain pending independent review',()=>{assert.equal(completion.records.length,works.length);for(const w of works){assert(w.completion.structural_checked);assert.equal(w.completion.structural_result,'pass');assert.equal(w.completion.source_verified,false);assert.deepEqual(Object.keys(w.completion.field_statuses).sort(),Object.keys(FIELD_LABELS).sort());assert.deepEqual(w.source_index,before.get(w.id).source_index);assert(w.completion.missing_fields.every(k=>k in FIELD_LABELS));}});
check('knowledge does not overwrite original research or source layers',()=>{for(const w of works.filter(w=>w.knowledge)){assert.equal(w.knowledge.verification_status,'knowledge_added_unverified');const prior=before.get(w.id).research?{...before.get(w.id).research}:null;if(prior)delete prior.report_index;assert.deepEqual(w.research,prior);}});
// Research report_index is present only in the generated archival snapshot.
check('semantic placement requires actual knowledge, not external subject guesses',()=>{for(const w of works.filter(w=>!w.research&&!w.knowledge)){assert.equal(w.spatial_primary,'unknown');assert.equal(w.duration,'待分类');assert.equal(w.science_class,'待分类');}});
check('missing dates can only acquire a candidate from a corresponding single-grain reference',()=>{for(const w of works.filter(w=>before.get(w.id).sort_year==null&&w.sort_year!=null)){assert.equal(w.source_first_year,null);assert(w.library_checks.some(c=>c.status==='title_author_correspondence'&&c.scope_ok&&c.year_comparison.library===w.sort_year));assert(w.year_display.includes('候选'));}});
check('shared short story, expanded novel and collection identifiers never inherit metadata',()=>{for(const q of ['Q837934','Q122463813','Q7749973','Q3055720']){const w=works.find(w=>w.id===q);assert(w);assert(w.library_checks.every(c=>c.status!=='title_author_correspondence'));assert.equal(w.library_topic_candidates.length,0);}const dune=works.find(w=>w.id==='Q190192');assert(dune.completion.has_identity_review);assert(!dune.completion.has_conflict);});
check('original language is never copied from Open Library edition language',()=>{for(const w of works.filter(w=>!w.research&&!w.knowledge))assert.equal(w.original_language,undefined);});
check('actual Chinese titles containing unknown are not mistaken for missing',()=>{const r=source.records.find(r=>r.id==='Q721');const modified={...r,title:'未知世界'};const sub=completion.records.find(s=>s.id===r.id);const result=buildCanonicalUniverse([modified],[],{works:[]},{links:[]},[{...sub,knowledge:null}]).works[0];assert(!result.completion.missing_fields.includes('title'));assert.equal(result.title_zh,'未知世界');});
check('supplement identities must exactly cover the canonical universe',()=>{assert.throws(()=>buildCanonicalUniverse(source.records,catalog.works,spatial,links,completion.records.slice(1)),/完整统一底库/);const wrong=completion.records.map((r,i)=>i===0?{...r,id:'Q999999999999999'}:r);assert.throws(()=>buildCanonicalUniverse(source.records,catalog.works,spatial,links,wrong),/完整统一底库/);});
check('generic literary entity type does not masquerade as a confirmed text form',()=>{for(const w of works.filter(w=>!w.research&&!w.form_candidate)){assert(w.completion.missing_fields.includes('form'));assert.equal(w.completion.field_statuses.form,'missing');}});
check('missing language and identity-review filters match their field/state flags',()=>{for(const value of ['language_statements','relationships','external_identifiers'])assert.equal(filterWorks(works,{...DEFAULT_STATE,boundary:true,missing:value}).length,works.filter(w=>w.completion.missing_fields.includes(value)).length);assert(filterWorks(works,{...DEFAULT_STATE,boundary:true,missing:'language_statements'}).length>1300);assert.equal(filterWorks(works,{...DEFAULT_STATE,boundary:true,audit:'identity'}).length,works.filter(w=>w.completion.has_identity_review).length);});
check('knowledge and review state is shareable across views',()=>{const state={...DEFAULT_STATE,boundary:true,audit:'knowledge',missing:'publication_date',level:'enriched'};assert.deepEqual(stateFromURL('?'+searchFromState(state),works),state);});
const spatialFiles=await listSpatialInputs(root),spatialInputs=await Promise.all(spatialFiles.map(read));
for(const input of spatialInputs){
 const preserved=input.metadata.preserved_scope_original;
 if(!preserved)continue;
 const original=await readFile(new URL(preserved.file,root));
 assert.equal(createHash('sha256').update(original).digest('hex'),preserved.sha256);
 assert.deepEqual(JSON.parse(original).records,input.records);
}
const spatialKeys=['spatial_primary','spatial_secondary','spatial_rationale'],spatialIds=new Set(spatialInputs.flatMap(d=>d.records.map(r=>r.id)));
const noSpatial=completion.records.map(s=>{
 if(!spatialIds.has(s.id))return s;
 const fields={...s.knowledge.fields};
 for(const key of spatialKeys){
  const original=s.knowledge.assertions.find(a=>!spatialFiles.includes(a.input_file)&&Object.hasOwn(a.fields,key));
  if(original)fields[key]=original.fields[key];else delete fields[key];
 }
 return {...s,knowledge:{...s.knowledge,fields}};
});
const priorSpatial=new Map(buildCanonicalUniverse(source.records,catalog.works,spatial,links,noSpatial).works.map(w=>[w.id,w]));
check('spatial batches preserve exact assertions, scoped evidence and field isolation',()=>{
 for(let i=0;i<spatialInputs.length;i++)for(const r of spatialInputs[i].records){
  const w=works.find(w=>w.id===r.id);assert(w);
  assert(w.knowledge.assertions.some(a=>{const {input_file,...raw}=a;return input_file===spatialFiles[i]&&JSON.stringify(raw)===JSON.stringify(r);}));
  assert(Object.keys(r.fields).every(k=>spatialKeys.includes(k)));
  assert.notEqual(r.fields.spatial_primary,'unknown');assert(r.fields.spatial_rationale.trim());
  validateSpatialEvidence(r,{issueAssertions:w.knowledge.assertions,sourceSearchLog:w.source_search_log});
  assert.equal(r.verification_status,'knowledge_added_unverified');
 }
});
check('existing spatial knowledge separates zero-query and scoped-lookup provenance and rejects invented support',()=>{
 const records=spatialInputs.flatMap(input=>input.records).filter(record=>record.analysis_basis==='existing_knowledge_unverified');
 assert(records.some(record=>record.id==='Q5619311'));
 for(const record of records){
  const work=works.find(work=>work.id===record.id),context={issueAssertions:work.knowledge.assertions,sourceSearchLog:work.source_search_log};
  const afterLookup=record.knowledge_provenance_mode==='existing_knowledge_after_scoped_lookup';
  assert.equal(validateSpatialEvidence(record,context),afterLookup?'existing_knowledge_after_scoped_lookup_unverified':'existing_knowledge_unverified');
  assert.equal(work.completion.source_verified,false);
  assert.throws(()=>validateSpatialEvidence({...record,analysis_basis:undefined},context));
  assert.throws(()=>validateSpatialEvidence(record,{...context,issueAssertions:[]}));
  assert.throws(()=>validateSpatialEvidence(record,{...context,sourceSearchLog:{...context.sourceSearchLog,queries:['unperformed search']}}));
  assert.throws(()=>validateSpatialEvidence({...record,sources:['https://example.invalid/unread']},context));
  if(afterLookup){
    assert.throws(()=>validateSpatialEvidence({...record,field_notes:{...record.field_notes,evidence_provenance:''}},context));
    assert.throws(()=>validateSpatialEvidence(record,{...context,sourceSearchLog:{...context.sourceSearchLog,actual_search_performed:false}}));
    assert.throws(()=>validateSpatialEvidence(record,{...context,sourceSearchLog:{...context.sourceSearchLog,raw_reading_log:{...context.sourceSearchLog.raw_reading_log,queries:[]}}}));
  }
 }
});
check('a repeated real query preserves the earlier zero-query spatial provenance',()=>{
 const record=spatialInputs.flatMap(input=>input.records).find(record=>record.id==='Q131471966');
 const work=works.find(work=>work.id===record.id), log=work.source_search_log;
 assert.equal(log.raw_reading_log.status,'skipped_already_analyzed');
 assert(log.queries.length>0);
 const context={issueAssertions:work.knowledge.assertions,sourceSearchLog:log};
 assert.equal(validateSpatialEvidence(record,context),'existing_knowledge_unverified');
 assert.throws(()=>validateSpatialEvidence(record,{...context,sourceSearchLog:{...log,previous_attempts:[]}}));
 assert.throws(()=>validateSpatialEvidence(record,{...context,sourceSearchLog:{...log,queries:['unperformed search']}}));
 assert.throws(()=>validateSpatialEvidence(record,{...context,sourceSearchLog:{...log,actual_search_performed:false}}));
 assert.throws(()=>validateSpatialEvidence(record,{...context,sourceSearchLog:{...log,raw_reading_log:{...log.raw_reading_log,id:'different-work'}}}));
});
check('spatial judgments fill missing placement and preserve every original known placement',()=>{
 for(const w of works){
  const old=priorSpatial.get(w.id);
  if(old.spatial_primary!=='unknown'||!spatialIds.has(w.id)){assert.equal(w.spatial_primary,old.spatial_primary,w.id);assert.deepEqual(w.spatial_evidence,old.spatial_evidence,w.id);continue;}
  const first=spatialInputs.flatMap(d=>d.records).find(r=>r.id===w.id);
  assert.equal(w.spatial_primary,first.fields.spatial_primary,w.id);
  assert.equal(w.spatial_evidence.rationale,first.fields.spatial_rationale,w.id);
  assert.equal(w.completion.field_statuses.spatial,'knowledge_added_unverified');
  assert(!w.completion.missing_fields.includes('spatial'));assert.equal(w.completion.source_verified,false);
 }
});
check('spatial supplementation preserves identity, dates, issues and temporal or science fields',()=>{
 for(const w of works)for(const key of ['id','source_index','research','first_year','sort_year','source_first_year','title_zh','title_original','author','issue','issue_facets','topics','branches','duration','story_era','reach','science_class','science_note','original_language','languages','forms','entity_link'])assert.deepEqual(w[key],priorSpatial.get(w.id)[key],w.id+' '+key);
});
check('spatial filters and shareable state count the same universe as the map',()=>{
 for(const space of ['earth','planetary','interstellar','galactic','cosmic','abstract','unknown']){
  const state={...DEFAULT_STATE,boundary:true,space};
  assert.deepEqual(stateFromURL('?'+searchFromState(state),works),state);
  assert.equal(filterWorks(works,state).length,works.filter(w=>w.spatial_primary===space).length);
 }
});
const referenced=works.find(w=>w.library_detail_url),detail=await loadLibraryDetail(referenced,fetcher);assert.deepEqual(detail,crosschecks.records.find(r=>r.id===referenced.id));passed++;console.log('PASS full external metadata and subject detail preserved');
const manifest=await read('dist/assets/completion.json');await assert.rejects(loadCompletionSource(async p=>p===manifest.chunks[0]?{ok:false}:fetcher(p)),/未完整载入/);passed++;console.log('PASS incomplete completion overlay rejects partial loading');
check('completion shards stay within asset limits without losing or reordering records',()=>{
 const sample=completion.records.slice(0,10),limit=Math.max(...sample.map(r=>Buffer.byteLength(JSON.stringify(r))))+Buffer.byteLength('{"records":[]}');
 const parts=completionChunks(sample,limit);
 assert(parts.length>1);assert.deepEqual(parts.flat(),sample);
 for(const records of parts)assert(Buffer.byteLength(JSON.stringify({records}))<=limit);
 assert.throws(()=>completionChunks(sample,1),/exceeds the shard size limit/);
});
const completeArchive=await gz('research/completion-overlay.json.gz');
check('large completion downloads retain the full exact archive in the public repository',()=>{
 assert.deepEqual(completeArchive,{metadata:manifest.metadata,records:completion.records});
 const fallback=completionDelivery(manifest.metadata,completion.records.slice(0,2),1);
 assert.equal(fallback.local,false);assert.equal(fallback.metadata.full_download_url,REPOSITORY_COMPLETION_DOWNLOAD);
 assert.deepEqual(JSON.parse(gunzipSync(fallback.bytes)).records,completion.records.slice(0,2));
 const local=completionDelivery(manifest.metadata,completion.records.slice(0,2));
 assert.equal(local.local,true);assert.equal(local.metadata.full_download_url,LOCAL_COMPLETION_DOWNLOAD);
});
console.log(`${passed} completion checks passed.`);
