import {createHash} from 'node:crypto';
import {readFileSync,realpathSync} from 'node:fs';
import {basename,join,sep} from 'node:path';

// Fixed S7 provenance branch. It never broadens the older spatial validators.
export const EARLY_S7_FILE='early-published-spatial-expansion-round7.json';
export const EARLY_S7_SHA='91b6749e4a05a9be0b2ddcde7305beaf2781835e0f939b727ba93247c61e48c3';
export const EARLY_S7_PINS_FILE='early-s7-spatial-guard-pins.json';
export const EARLY_S7_PINS_SHA='ffdf053fce500cc6697d5a8245ed84db0417dd98950739ee5348603cc87d3891';
const hash=b=>createHash('sha256').update(b).digest('hex');
const sorted=v=>Array.isArray(v)?v.map(sorted):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sorted(v[k])])):v;
export const earlyS7RecordSha=v=>hash(JSON.stringify(sorted(v)));
const equal=(a,b)=>JSON.stringify(sorted(a))===JSON.stringify(sorted(b));
const frozen=d=>['frozen','frozen_checkpoint'].includes(d.metadata?.status);
const knowledgeNote=v=>typeof v==='string'&&/existing knowledge|既有知识|已有知识/.test(v);
const counters=['actual_search_performed','actual_search_count','actual_open_count'];
const counterFields=l=>Object.fromEntries(counters.filter(k=>Object.hasOwn(l,k)).map(k=>[k,l[k]]));
const identityScope=w=>Object.fromEntries(['id','title_zh','author','form','forms','source_entity_kind','source_types'].map(k=>[k,w[k]??null]));
const spatialKeys=['spatial_primary','spatial_secondary','spatial_rationale'];
const spatialProjection=w=>({spatial_primary:{present:Object.hasOwn(w,'spatial_primary'),value:w.spatial_primary??null},spatial_evidence:{present:Object.hasOwn(w,'spatial_evidence'),value:w.spatial_evidence??null},knowledge_fields:Object.fromEntries(spatialKeys.map(k=>[k,{present:Object.hasOwn(w.knowledge?.fields||{},k),value:w.knowledge?.fields?.[k]??null}]))});
const historyNodes=l=>!l?[]:[l,...(l.previous_attempts||[]).flatMap(historyNodes)];
const docCache=new Map();
function exactFile(archive,sha,{repoDir,evidenceDir},kind){
 if(!repoDir||!/^research\/(issue|spatial)-input-snapshots\/[^/]+\.json$/.test(archive))throw Error('S7 fixed archive path rejected: '+kind);
 const root=realpathSync(repoDir),path=realpathSync(join(root,archive));
 if(!path.startsWith(root+sep+'research'+sep+archive.split('/')[1]+sep))throw Error('S7 archive traversal: '+kind);
 const bytes=readFileSync(path);if(hash(bytes)!==sha)throw Error('S7 archive byte hash: '+kind);
 if(evidenceDir){const privateRoot=realpathSync(evidenceDir),p=realpathSync(join(privateRoot,basename(archive)));if(!p.startsWith(privateRoot+sep)||!readFileSync(p).equals(bytes))throw Error('S7 private/archive bytes: '+kind);}
 if(!docCache.has(path+sha))docCache.set(path+sha,JSON.parse(bytes));return docCache.get(path+sha);
}
function row(d,id,kind){const r=d.records?.filter(x=>x.id===id)||[];if(r.length!==1)throw Error('S7 exact row cardinality: '+kind+'/'+id);return r[0];}
function pins(ctx){const d=exactFile('research/spatial-input-snapshots/'+EARLY_S7_PINS_FILE,EARLY_S7_PINS_SHA,ctx,'pins');if(!frozen(d)||d.metadata.source_spatial_sha256!==EARLY_S7_SHA||d.records.length!==60)throw Error('S7 pinned manifest');return d;}
export function isEarlyS7SpatialRecord(record,ctx={}){
 return record?.source_spatial_input_file===EARLY_S7_FILE||record?.source_spatial_input_sha256===EARLY_S7_SHA||record?.source_spatial_input_archive==='research/spatial-input-snapshots/'+EARLY_S7_FILE||pins(ctx).records.some(x=>x.id===record?.id||x.id===ctx.currentWork?.id||x.original_spatial_record_sha256===record?.source_spatial_input_record_sha256)||exactFile('research/spatial-input-snapshots/'+EARLY_S7_FILE,EARLY_S7_SHA,ctx,'route').records.some(x=>x.source_analysis_record_sha256===record?.source_analysis_record_sha256);
}
function linkStatus(type){
 if(['publisher_edition_contents_page','publisher_bibliographic_search_excerpt','bibliography_search_excerpt','edition_serial_contents_opened','publisher_author_bibliography_only','contents_or_identity_only_plot_existing_knowledge','community_comics_bibliography_search_excerpt','publisher_bibliographic_page_only','bibliography_or_collection_membership_only'].includes(type))return 'identity_or_contents_only_lookup';
 if(type==='platform_episode_description_and_existing_knowledge')return 'limited_episode_identity_and_premise_search_return';
 if(type==='community_work_description_local_dump')return 'saved_community_work_description_as_recorded';return 'original_scoped_material_as_recorded';
}
const allowedNewKeys=['source_spatial_input_file','source_spatial_input_sha256','source_spatial_input_archive','source_spatial_input_record_sha256','original_counter_fields','frozen_canonical_identity_scope','preserved_source_search_log','preserved_source_search_log_sha256','preserved_prior_archive_proofs'];
export function validateEarlyS7SpatialEvidence(record,{repoDir,evidenceDir,currentWork,issueAssertions,sourceSearchLog,spatialAdoptionPhase='auto'}={}){
 const fail=why=>{throw Error('Early S7 spatial rejected ('+why+'): '+record.id);};const ctx={repoDir,evidenceDir};
 if(record.source_spatial_input_file!==EARLY_S7_FILE||record.source_spatial_input_sha256!==EARLY_S7_SHA||record.source_spatial_input_archive!=='research/spatial-input-snapshots/'+EARLY_S7_FILE)fail('fixed spatial declaration');
 const sd=exactFile(record.source_spatial_input_archive,EARLY_S7_SHA,ctx,'spatial');if(!frozen(sd))fail('frozen input');const raw=row(sd,record.id,'spatial');const pin=row(pins(ctx),record.id,'pin');
 if(earlyS7RecordSha(raw)!==record.source_spatial_input_record_sha256||record.source_spatial_input_record_sha256!==pin.original_spatial_record_sha256)fail('fixed spatial record digest');
 for(const k of Object.keys(raw)){
  const expected=k==='source_evidence'&&raw.spatial_basis_mode==='exact_existing_knowledge'?raw[k].map(e=>({...e,type:'existing_knowledge_spatial_with_original_scoped_lookup',supports_spatial_independently:false,new_read_performed:false,original_link_read_status:linkStatus(e.original_source_evidence?.type)})):raw[k];
  if(!equal(record[k],expected))fail('changed frozen spatial payload '+k);
 }
 if(Object.keys(record).some(k=>!Object.hasOwn(raw,k)&&!allowedNewKeys.includes(k)))fail('unexpected derived key');
 if(!equal(Object.keys(record.fields).sort(),spatialKeys.slice().sort())||!['earth','planetary','interstellar','galactic','cosmic','abstract'].includes(record.fields.spatial_primary)||!Array.isArray(record.fields.spatial_secondary)||record.fields.spatial_secondary.some(x=>!['earth','planetary','interstellar','galactic','cosmic','abstract'].includes(x))||!record.fields.spatial_rationale?.trim())fail('exact three spatial fields');
 if(!currentWork||currentWork.id!==record.id||currentWork.issue_analysis_status==='missing'||record.integration_relation!=='published_core'||record.verification_status!=='knowledge_added_unverified'||!equal(identityScope(currentWork),pin.canonical_identity_scope)||!equal(record.frozen_canonical_identity_scope,pin.canonical_identity_scope)||!equal(record.current_identity,{title:currentWork.title_zh,author:currentWork.author}))fail('current identity grain/core');
 if(issueAssertions!==undefined&&!equal(issueAssertions,currentWork.knowledge?.assertions))fail('assertion context');
 if(sourceSearchLog!==undefined&&!equal(sourceSearchLog,currentWork.source_search_log))fail('process context');
 const pair=kind=>{
  const file=record['source_'+kind+'_file'];if(typeof file!=='string'||basename(file)!==file||record['source_'+kind+'_archive']!=='research/issue-input-snapshots/'+file)fail(kind+' declaration');
  const d=exactFile(record['source_'+kind+'_archive'],record['source_'+kind+'_sha256'],ctx,kind);if(!frozen(d))fail(kind+' not frozen');const r=row(d,record.id,kind);if(earlyS7RecordSha(r)!==record['source_'+kind+'_record_sha256'])fail(kind+' record digest');return r;
 };
 const a=pair('analysis'),l=pair('log');
 if(!equal(a.identity,record.identity)||!equal(l.identity,record.identity)||a.verification_status!=='knowledge_added_unverified'||!a.fields?.issue||!Array.isArray(a.fields.issue_facets)||a.fields.issue_facets.length<2||!a.field_notes?.issue?.trim())fail('original analysis identity/scope');
 const assertions=currentWork.knowledge?.assertions?.filter(x=>{const {input_file,...rr}=x;return input_file===record.source_core_assertion_file&&equal(rr,a);})||[];
 if(currentWork.issue!==a.fields.issue||assertions.length!==1||earlyS7RecordSha(assertions[0])!==pin.canonical_core_assertion_sha256)fail('exact current displayed core assertion');
 if(!equal(record.identity_caveat,a.identity_caveat)||!equal(record.original_reading_log,l)||record.original_analysis_basis!==(a.analysis_basis??null)||record.source_scope!==l.reading_scope||record.frozen_knowledge_reading_scope!==l.reading_scope||record.frozen_knowledge_issue_note!==a.field_notes.issue||!l.reading_scope?.trim())fail('original scope/caveat');
 if(!equal(record.original_counter_fields,counterFields(l)))fail('counter presence/value');
 if(!equal(record.preserved_source_search_log,currentWork.source_search_log)||earlyS7RecordSha(currentWork.source_search_log)!==pin.source_process_sha256||record.preserved_source_search_log_sha256!==pin.source_process_sha256)fail('full canonical history');
 const nodes=historyNodes(currentWork.source_search_log);if(!nodes.some(n=>n.attempt_input===record.source_log_file&&equal(n.raw_reading_log,l)))fail('raw original log absent');
 if(!Array.isArray(record.preserved_prior_archive_proofs)||!equal(l.previous_attempts_preserved||[],record.preserved_prior_archive_proofs.map(p=>p.file)))fail('prior archive list');
 for(const p of record.preserved_prior_archive_proofs){
  if(p.archive!=='research/issue-input-snapshots/'+p.file)fail('prior archive declaration');const pd=exactFile(p.archive,p.sha256,ctx,'prior');if(!frozen(pd))fail('prior not frozen');const pl=row(pd,record.id,'prior');
  if(earlyS7RecordSha(pl)!==p.record_sha256||!equal(pl.identity,a.identity)||!nodes.some(n=>n.attempt_input===p.file&&equal(n.raw_reading_log,pl)))fail('prior raw history');
 }
 const owners=Object.fromEntries((sd.metadata.source_owner_manifests||[]).map(x=>[x.file,x.sha256]));const ownerName=record.original_ownership_file;
 if(!owners||owners[ownerName]!==record.original_ownership_sha256||!Number.isInteger(record.original_ownership_index)||record.original_ownership_index!==record.ownership_index)fail('original owner declaration');
 const od=exactFile('research/issue-input-snapshots/'+ownerName,record.original_ownership_sha256,ctx,'owner');const own=od.records?.[record.original_ownership_index];if(!own||own.id!==record.id||earlyS7RecordSha(own)!==pin.original_owner_record_sha256)fail('original owner row/prior');
 if(!Array.isArray(record.sources)||!equal(record.sources,a.sources)||!Array.isArray(a.source_evidence)||!Array.isArray(record.source_evidence)||!Array.isArray(l.queries)||!Array.isArray(l.materials_checked)||l.issue_result!=='added_unverified')fail('original source/query/material arrays');
 if(record.spatial_basis_mode==='exact_existing_knowledge'){
  if(record.analysis_basis!=='existing_knowledge_unverified'||!record.field_notes?.spatial_primary?.includes('existing knowledge')||!record.field_notes?.evidence_provenance?.trim())fail('explicit knowledge boundary');
  if(record.knowledge_provenance_mode==='existing_knowledge_from_original_first_pass'){
   const z=record.zero_query_provenance;
   if(a.analysis_basis!=='existing_knowledge_unverified'||!knowledgeNote(a.field_notes.issue)||!knowledgeNote(l.reading_scope)||l.attempt_state!=='existing_knowledge_first_pass'||l.queries.length||l.materials_checked.length||a.sources.length||a.source_evidence.length||record.source_evidence.length||!z||!equal(Object.keys(z).sort(),['note','original_attempt_state','original_materials_checked','original_queries','original_sources','source_scope'])||!equal(z.original_queries,l.queries)||!equal(z.original_materials_checked,l.materials_checked)||!equal(z.original_sources,a.sources)||z.original_attempt_state!==l.attempt_state||z.source_scope!==l.reading_scope||!knowledgeNote(z.note))fail('original zero-query proof');
   for(const k of counters)if(Object.hasOwn(l,k)&&l[k]!==({'actual_search_performed':false,'actual_search_count':0,'actual_open_count':0})[k])fail('original nonzero counter');
   if(Object.hasOwn(l,'sources')&&(!Array.isArray(l.sources)||l.sources.length))fail('original zero-query source list');
  }else if(record.knowledge_provenance_mode==='existing_knowledge_with_original_scoped_material'){
   // Two fixed stories retained a real, nonadopted identity lookup and no A URLs.
   if(!['content_read_first_pass','existing_knowledge_first_pass','source_read_analysis_added','existing_knowledge_after_bibliographic_lookup'].includes(l.attempt_state)||!l.materials_checked.length||record.source_evidence.length!==a.source_evidence.length||a.source_evidence.some(e=>!l.materials_checked.some(m=>m.url===e.url)))fail('original limited lookup boundary');
   if(!a.sources.length&&(!['Q102126984','Q130706637'].includes(record.id)||a.analysis_basis!=='existing_knowledge_unverified'||a.source_evidence.length||!l.queries.length||!knowledgeNote(a.field_notes.issue)||!knowledgeNote(l.reading_scope)))fail('exact nonadopted identity lookup');
   for(const e of record.source_evidence)if(!e.url?.startsWith('https://')||!record.sources.includes(e.url)||!a.source_evidence.some(o=>equal(o,e.original_source_evidence))||e.supports_spatial_independently!==false||e.new_read_performed!==false||e.no_new_network_read!==true||e.original_link_read_status!==linkStatus(e.original_source_evidence?.type)||!knowledgeNote(e.support_scope))fail('old lookup promoted to spatial reading');
  }else fail('knowledge mode');
 }else if(record.spatial_basis_mode==='saved_scoped_material'){
  if(record.analysis_basis!=='frozen_analysis_scoped_setting_unverified'||record.knowledge_provenance_mode!==undefined||!record.sources.length||!['content_read_first_pass','source_read_analysis_added'].includes(l.attempt_state)||record.source_evidence.length!==a.source_evidence.length)fail('saved scoped material mode');
  for(const e of record.source_evidence)if(!e.url?.startsWith('https://')||!record.sources.includes(e.url)||!a.source_evidence.some(o=>equal(o,e.original_source_evidence))||!l.materials_checked.some(m=>m.url===e.url)||e.type!=='saved_frozen_analysis_material_spatial_scope'||!e.support_scope?.trim()||e.spatial_basis!=='saved_scoped_material'||e.no_new_network_read!==true||e.original_read_scope!==e.original_source_evidence?.support_scope||e.original_source_type!==e.original_source_evidence?.type||e.original_read_date!==e.original_source_evidence?.read_date)fail('actual saved URL/scope');
 }else fail('spatial mode');
 if(!['auto','pre','post'].includes(spatialAdoptionPhase))fail('adoption phase');
 if(currentWork.spatial_primary==='unknown'){
  if(spatialAdoptionPhase==='post'||!equal(spatialProjection(currentWork),pin.pre_spatial_projection))fail('changed pre-adoption unknown projection');
 }else{
  if(spatialAdoptionPhase==='pre'||currentWork.spatial_primary!==record.fields.spatial_primary)fail('adopted primary');
  const e=currentWork.spatial_evidence,f=currentWork.knowledge?.fields;
  if(!e||!['primary','secondary','rationale'].every(k=>Object.hasOwn(e,k))||e.primary!==record.fields.spatial_primary||!equal(e.secondary,record.fields.spatial_secondary)||e.rationale!==record.fields.spatial_rationale)fail('adopted canonical evidence fields');
  if(!f||!spatialKeys.every(k=>Object.hasOwn(f,k)&&equal(f[k],record.fields[k])))fail('adopted canonical knowledge fields');
 }
 return record.spatial_basis_mode==='exact_existing_knowledge'?'existing_knowledge_unverified':'scoped_reading';
}
