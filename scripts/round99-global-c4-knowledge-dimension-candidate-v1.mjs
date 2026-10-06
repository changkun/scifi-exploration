import {readFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {createKnowledgeDimensionRound8Context,validateKnowledgeDimensionRound8Evidence,DIMENSION_ROUND8_INPUT_FILE} from './knowledge-dimensions-round8-evidence.mjs';
export const ROUND99_GLOBAL_CANDIDATE_INPUT='research/classification-discovery-inputs/round99-global-four-pending-directions.json';
const INPUT_SHA='a9b2e409cb299f7e94c83e1c38c388fa3b375013fbf49bff2a717ed8e20d9bd5';
const RAW_FILE='research/classification-discovery-audits/round99-root-four-pending-directions-global-private.json';
const RAW_SHA='2b5044c00b617368325c83d4aac3caa2a095e06289a0a62d9df0331da661f8a5';
const REVIEW_FILE='research/classification-discovery-audits/round99-root-four-pending-directions-semantic-review-private.json';
const REVIEW_SHA='b74e3f6ada1692cbb6518c7cc7b26d257806c275ea7c89d8bd04a74aaccb9623';
const RECEIPT_FILE='research/classification-discovery-audits/round99-C4-round98-published-site.json';
const RECEIPT_SHA='f88b03207064b5bfbcce68c592a2bb0da122b3ff62d87d90c6f59580ffa7817f';
const PINS_FILE='research/dimension-input-snapshots/knowledge-dimensions-round8-guard-pins.json';
const PINS_SHA='0b6be936729fd9df5eaf34bd95b6f0bf7f20d33cb9cc22024cd126eb00b1fbc9';
const DIM_SHA='82a33563000f82c667d218fdca5696236624ccd8e530db7fbdbd7126572de9a1';
const IDS=Object.freeze(['pending:round99-global-collaborative-non-unified-fictional-archive','pending:round99-global-fictional-assassination-targeting-narrative-creator','pending:round99-global-drug-mediated-parallel-timeline-performance','pending:round99-global-age-threshold-disappearance-and-child-governance']);
const MEMBERS=Object.freeze(['Q17439649','Q1817920','Q105942406','Q105550560','Q20655794']);
const states=new WeakMap(),contexts=new Map();
const hash=b=>createHash('sha256').update(b).digest('hex');
function stable(x){if(x===null||typeof x!=='object')return JSON.stringify(x);if(Array.isArray(x))return '['+x.map(stable).join(',')+']';return '{'+Object.keys(x).sort().map(k=>JSON.stringify(k)+':'+stable(x[k])).join(',')+'}';}
const same=(a,b)=>stable(a)===stable(b),rh=x=>hash(Buffer.from(stable(x))),has=(x,k)=>Object.prototype.hasOwnProperty.call(x||{},k);
function require(ok,msg){if(!ok)throw Error('Fixed R99 global C4 guard: '+msg);}
function read(repo,file,digest,packet=null){const path=packet&&existsSync(join(packet,file))?join(packet,file):join(repo,file);const b=readFileSync(path);require(hash(b)===digest,'exact input/archive bytes '+file);return JSON.parse(b);}
function at(doc,pointer){const m=/^\$\.records\[(\d+)\]$/.exec(pointer);require(m,'closed record pointer');return doc.records[Number(m[1])];}
const presence=(x,keys)=>Object.fromEntries(keys.map(k=>[k,{present:has(x,k),value:x?.[k]??null}]));
const extraKeys=Object.freeze(['discovery_source_mode','exact_support_scope','new_material_read','actual_content_source_read_this_batch','new_query_count','new_open_count','new_core_count','independently_verified']);
/** Four fixed pending directions only; original empty references and actual absence remain intact. */
export function createRound99GlobalKnowledgeDimensionCandidateContext({repoDir,packetDir=null}={}){
 require(typeof repoDir==='string'&&repoDir,'repoDir required');
 const input=read(repoDir,ROUND99_GLOBAL_CANDIDATE_INPUT,INPUT_SHA,packetDir),raw=read(repoDir,RAW_FILE,RAW_SHA,packetDir);
 read(repoDir,REVIEW_FILE,REVIEW_SHA,packetDir);read(repoDir,RECEIPT_FILE,RECEIPT_SHA,packetDir);
 const pins=read(repoDir,PINS_FILE,PINS_SHA,packetDir),dim=read(repoDir,DIMENSION_ROUND8_INPUT_FILE,DIM_SHA,packetDir);
 const sd=pins.dependencies.find(d=>d.file===pins.selection_file);require(sd&&sd.sha256==='52171262b5d9034946f1b9ac591b3807d4ec3c1a2787818deb78b1d79e0df5e0','fixed original R8 selection');
 const selection=read(repoDir,sd.file,sd.sha256,packetDir);
 require(same(input.discovery_candidates.map(c=>c.id),IDS)&&same(raw.records.map(c=>c.id),IDS),'closed four candidate order');
 require(same(input.discovery_candidates.flatMap(c=>c.work_evidence.map(e=>e.id)),MEMBERS),'closed five member order');
 require(input.metadata.new_query_count===0&&input.metadata.new_open_count===0&&input.metadata.new_material_read_count===0&&input.metadata.new_core_count===0&&input.metadata.independent_verification_count===0,'zero new operations, not original unknown counters');
 const rows=new Map(),members=new Map(),files=new Map();
 for(let ci=0;ci<4;ci++){
  const c=input.discovery_candidates[ci],originalCandidate=raw.records[ci],stripped=structuredClone(c);
  for(const e of stripped.work_evidence)for(const k of extraKeys)delete e[k];
  require(same(stripped,originalCandidate),'original whole candidate and member payload retained');
  require(c.review_status==='pending_further_comparison'&&c.verification_status==='knowledge_added_unverified'&&c.independent_project_count===1,'pending/unverified; Gone two identities count one project');rows.set(c.id,c);
  for(const e of c.work_evidence){
   const i=e.r8_selection_index,s=selection.records[i],d=dim.records[i];require(s?.id===e.id&&d?.id===e.id,'closed source/adopted index');
   require(same(e.identity,s.identity)&&same(e.identity,d.identity),'exact original identity');
   require(e.selection_reference.sha256===sd.sha256&&e.selection_reference.pointer===`$.records[${i}]`&&e.selection_reference.record_sha256===rh(s),'whole shared original selection binding');
   require(same(e.source_identity_grain,s.current_grain_and_date)&&same(e.original_analysis,s.source_analysis_ref),'exact original grain/date and source reference');
   let aDoc=files.get(e.original_analysis.file);if(!aDoc){aDoc=read(repoDir,e.original_analysis.file,e.original_analysis.file_sha256,packetDir);files.set(e.original_analysis.file,aDoc);}
   const a=at(aDoc,e.original_analysis.record_pointer);require(rh(a)===e.original_analysis.record_sha256&&same(a,e.original_analysis_record)&&same(a,s.source_analysis_record),'full immutable original A');
   require(same(e.original_scope,a.field_notes||{})&&same(e.sources,a.sources||[])&&same(e.sources,d.sources),'exact original URL scope/roles, empty references preserved');
   require(same(e.active_core_assertion,s.active_core_assertion)&&rh(e.active_core_assertion)===e.active_core_assertion_sha256&&e.active_core_assertion_sha256===s.active_core_assertion_sha256,'full active core assertion');
   require(e.whole_prior_reference.file===e.selection_reference.file&&e.whole_prior_reference.pointer===`$.records[${i}].current_source_search_log`&&e.whole_prior_reference.record_sha256===rh(s.current_source_search_log),'whole original history reference, no fake zero counts');
   require(same(e.original_record_provenance_presence,s.original_record_provenance_presence)&&same(e.original_record_provenance_presence,presence(a,Object.keys(e.original_record_provenance_presence))),'real original record provenance presence');
   require(same(e.original_metadata_provenance_presence,s.original_metadata_provenance_presence)&&same(e.original_metadata_provenance_presence,presence(aDoc.metadata,Object.keys(e.original_metadata_provenance_presence))),'real original metadata presence');
   require(same(e.adopted_dimension_record,d)&&same(e.adopted_dimension_reference,{file:DIMENSION_ROUND8_INPUT_FILE,sha256:DIM_SHA,bytes:6789630,pointer:`$.records[${i}]`,record_sha256:rh(d)}),'exact actually adopted R8 descriptor');
   require(e.discovery_source_mode==='knowledge_dimension_analysis_derivative'&&typeof e.exact_support_scope==='string'&&e.exact_support_scope&&e.new_material_read===false&&e.actual_content_source_read_this_batch===false&&e.new_query_count===0&&e.new_open_count===0&&e.new_core_count===0&&e.independently_verified===false,'strict derivative role and no new-read claim');
   require(!members.has(e.id),'closed unique entity member');members.set(e.id,{candidateId:c.id,e,d,s});
  }
 }
 const dimensionContext=createKnowledgeDimensionRound8Context({repoDir,packetDir});
 const context=Object.freeze({inputFile:ROUND99_GLOBAL_CANDIDATE_INPUT,candidateCount:4,memberCount:5,independentProjectCount:4});states.set(context,{rows,members,dimensionContext});return context;
}
/** Returns false outside fixed IDs; a forged fixed row throws, without broad URL exceptions. */
export function validateRound99GlobalKnowledgeDimensionCandidate(candidate,evidence,currentWork,context={}){
 if(!IDS.includes(candidate?.id))return false;
 let t=context.trustedContext;if(!t){require(typeof context.repoDir==='string'&&context.repoDir,'repoDir or trusted context');if(!contexts.has(context.repoDir))contexts.set(context.repoDir,createRound99GlobalKnowledgeDimensionCandidateContext({repoDir:context.repoDir}));t=contexts.get(context.repoDir);}
 const state=states.get(t);require(state,'trusted fixed context');const c=state.rows.get(candidate.id),m=state.members.get(evidence?.id);
 require(same(candidate,c)&&m&&m.candidateId===candidate.id&&same(evidence,m.e),'entire fixed candidate/member exact');
 const w=currentWork,e=m.e;require(w?.id===e.id&&same(e.identity,{title:w.title_zh,author:w.author}),'exact current identity');
 require(same(w.source_search_log,m.s.current_source_search_log)&&rh(w.source_search_log)===e.whole_prior_reference.record_sha256,'full current prior/history exact');
 require(same(w.source_index,m.s.current_source_index),'source identity exact');
 require(w.knowledge?.assertions?.filter(a=>rh(a)===e.active_core_assertion_sha256&&same(a,e.active_core_assertion)).length===1,'active original core preserved');
 require(e.sources.every(u=>w.knowledge?.sources?.includes(u)),'old references retained, not new readings');
 validateKnowledgeDimensionRound8Evidence(m.d,{trustedContext:state.dimensionContext,inputFile:DIMENSION_ROUND8_INPUT_FILE,dimensionAdoptionPhase:'post',currentWork:w});
 require(w.completion?.source_verified===false&&w.issue_analysis_status==='knowledge_added_unverified','no verification upgrade');
 require(!w.classification_assignments?.some(a=>a.label===candidate.proposed_label),'pending does not auto assign');return true;
}
