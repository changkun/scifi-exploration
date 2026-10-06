import {readFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {createKnowledgeDimensionRound7Context,validateKnowledgeDimensionRound7Evidence,DIMENSION_ROUND7_INPUT_FILE} from './knowledge-dimensions-round7-evidence.mjs';
export const ROUND97_GLOBAL_CANDIDATE_INPUT='research/classification-discovery-inputs/round97-global-knowledge-dimension-candidates.json';
const INPUT_SHA='68d8c55d6a3230c865bfaeedcebc0df17cf63d0de293a67c882fc5d7dfe4307c';
const RAW_FILE='research/classification-discovery-audits/global-breadth-round7-classification-candidates-private.json';
const RAW_SHA='06809a0d486ab6d04abeb9bfed6d8977a24c73f1ab614a52516d2722444f6195';
const PINS_FILE='research/dimension-input-snapshots/knowledge-dimensions-round7-guard-pins.json';
const PINS_SHA='221a5a0c78fbc9139a5a100232029fb88b07966a8f43e65d0646b3e4d23bb129';
const DIM_SHA='2d64284e218aa88b3284e4e7310a629fe83db014e9ca20a10591e02001520bc8';
const REVIEW_FILE='research/classification-discovery-audits/round97-root-R7-C5-scoped-review-private.json';
const REVIEW_SHA='5a971e7652b215f6f037f4653d9aa589f0239f2aa8580471d215d9d598e588ce';
const IDS=Object.freeze(['pending:round97-global-manufactured-threat-narratives-and-consequences','pending:round97-global-genealogical-deletion-and-remembering-holder','pending:round97-global-captive-volitional-being-as-vessel-power','pending:round97-global-tradable-personal-equity-and-refusal','pending:round97-global-body-eligibility-for-disaster-refuge']);
const MEMBER_IDS=Object.freeze(['Q3236508','Q80594518','Q105069974','Q7736902','Q7771525','Q8042750']);
const states=new WeakMap(),contexts=new Map();
const hash=b=>createHash('sha256').update(b).digest('hex');
function stable(x){if(x===null||typeof x!=='object')return JSON.stringify(x);if(Array.isArray(x))return '['+x.map(stable).join(',')+']';return '{'+Object.keys(x).sort().map(k=>JSON.stringify(k)+':'+stable(x[k])).join(',')+'}';}
const same=(a,b)=>stable(a)===stable(b),rh=x=>hash(Buffer.from(stable(x))),has=(x,k)=>Object.prototype.hasOwnProperty.call(x||{},k);
function require(ok,msg){if(!ok)throw Error('Fixed R97 global C5 guard: '+msg);}
function read(repo,file,digest,packet=null){const path=packet&&existsSync(join(packet,file))?join(packet,file):join(repo,file);const b=readFileSync(path);require(hash(b)===digest,'exact original/input bytes '+file);return JSON.parse(b);}
function at(d,p){const m=/^\$\.records\[(\d+)\]$/.exec(p);require(m,'exact original record pointer');return d.records[Number(m[1])];}
const presence=(x,keys)=>Object.fromEntries(keys.map(k=>[k,{present:has(x,k),value:x?.[k]??null}]));
/** Only five pinned pending rows and six original-core members. Empty old references remain empty. */
export function createRound97GlobalKnowledgeDimensionCandidateContext({repoDir,packetDir=null}={}){
 require(typeof repoDir==='string'&&repoDir,'repoDir required');
 const input=read(repoDir,ROUND97_GLOBAL_CANDIDATE_INPUT,INPUT_SHA,packetDir),raw=read(repoDir,RAW_FILE,RAW_SHA,packetDir);
 read(repoDir,REVIEW_FILE,REVIEW_SHA,packetDir);
 require(same(input.discovery_candidates,raw.discovery_candidates),'all original candidate rows immutable');
 const dim=read(repoDir,DIMENSION_ROUND7_INPUT_FILE,DIM_SHA,packetDir),pins=read(repoDir,PINS_FILE,PINS_SHA,packetDir);
 const seldep=pins.dependencies.find(d=>d.file===pins.selection_file);require(seldep,'fixed R7 selection');const selection=read(repoDir,seldep.file,seldep.sha256,packetDir);
 require(same(input.discovery_candidates.map(c=>c.id),IDS),'closed five candidate ID/order');
 require(same(input.discovery_candidates.flatMap(c=>c.work_evidence.map(e=>e.id)),MEMBER_IDS),'closed six member ID/order');
 require(input.metadata.new_query_count===0&&input.metadata.new_open_count===0&&input.metadata.new_core_count===0&&input.metadata.independent_verification_upgrade_count===0,'derivative 0 operations only');
 const dimensionContext=createKnowledgeDimensionRound7Context({repoDir,packetDir});
 const rows=new Map(),members=new Map(),files=new Map();
 for(const c of input.discovery_candidates){
  require(c.review_status==='pending_further_comparison'&&c.verification_status==='knowledge_added_unverified','pending and unverified');rows.set(c.id,c);
  for(const e of c.work_evidence){
   const s=selection.records[e.selection_index],d=dim.records[e.selection_index];require(s?.id===e.id&&d?.id===e.id,'exact selection index/adopted R7 member');
   require(same(e.identity,s.identity)&&same(e.identity,d.identity),'original identity');
   require(e.selection_reference.file_sha256===seldep.sha256&&e.selection_reference.pointer===`$.records[${e.selection_index}]`&&rh(s)===e.selection_reference.record_sha256,'fixed whole selection pointer');
   require(same(e.source_identity_grain,s.current_grain_and_date)&&same(e.original_analysis,s.source_analysis_ref),'exact source identity/grain/date and original A reference');
   let original=files.get(e.original_analysis.file);if(!original){original=read(repoDir,e.original_analysis.file,e.original_analysis.file_sha256,packetDir);files.set(e.original_analysis.file,original);}
   const a=at(original,e.original_analysis.record_pointer);require(rh(a)===e.original_analysis.record_sha256&&same(a,e.original_analysis_record)&&same(a,s.source_analysis_record),'entire original A record');
   require(same(e.original_core_basis,s.current_core_fields)&&same(e.original_material_scope,s.original_material_scope),'exact current core and original declared scope');
   require(same(e.sources,a.sources||[])&&same(e.sources,s.retained_source_urls),'original URLs/empty refs preserved');
   require(same(e.active_core_assertion,s.active_core_assertion)&&rh(e.active_core_assertion)===e.active_core_assertion_sha256&&e.active_core_assertion_sha256===s.active_core_assertion_sha256,'exact active original core assertion');
   require(same(e.whole_prior,s.current_source_search_log)&&rh(e.whole_prior)===e.whole_prior_sha256&&e.whole_prior_sha256===s.current_source_search_log_sha256,'entire previous chain and original roles');
   require(e.source_index_sha256===s.current_source_index_sha256&&rh(s.current_source_index)===e.source_index_sha256,'complete source identity');
   require(same(e.original_record_presence,s.original_record_provenance_presence)&&same(e.original_record_presence,presence(a,Object.keys(e.original_record_presence))),'actual original record absence/counts');
   require(same(e.original_metadata_presence,s.original_metadata_provenance_presence)&&same(e.original_metadata_presence,presence(original.metadata,Object.keys(e.original_metadata_presence))),'actual original metadata absence/counts');
   require(same(e.original_metadata_reference,s.source_analysis_metadata_reference)&&e.original_metadata_reference.metadata_sha256===rh(original.metadata??null),'exact original metadata');
   const pr=d.dimension_provenance.source_proposal_reference,pdep=pins.dependencies.find(x=>x.file===pr.file);require(pdep&&pdep.sha256===e.dimension_proposal_reference.file_sha256,'fixed original proposal bytes');
   const p=at(read(repoDir,pdep.file,pdep.sha256,packetDir),pr.record_pointer);require(rh(p)===pr.record_sha256&&e.dimension_proposal_reference.record_pointer===pr.record_pointer&&e.dimension_proposal_reference.record_sha256===rh(p),'full original proposal record');
   require(same(e.dimension_proposed_values,Object.fromEntries(Object.entries(p.proposed_fields).map(([k,v])=>[k,v.proposed_value])))&&same(e.dimension_proposed_evidence,p.proposed_fields),'original draft scope is provenance, not a post-value claim');
   require(same(e.exact_derived_dimension_record,d)&&same(e.exact_derived_dimension_reference,{file:DIMENSION_ROUND7_INPUT_FILE,file_sha256:DIM_SHA,record_pointer:`$.records[${e.selection_index}]`,record_sha256:rh(d)}),'exact adopted scoped R7 descriptor record');
   require(e.discovery_source_mode==='knowledge_dimension_analysis_derivative'&&e.new_material_read===false&&e.actual_content_source_read_this_batch===false&&e.new_query_count===0&&e.new_open_count===0&&e.new_core_count===0&&e.independently_verified===false,'no fabricated new reading/owner/count claims');
   require(!members.has(e.id),'closed unique member');members.set(e.id,{candidateId:c.id,e,d});
  }
 }
 const context=Object.freeze({inputFile:ROUND97_GLOBAL_CANDIDATE_INPUT,candidateCount:5,memberCount:6});states.set(context,{rows,members,dimensionContext});return context;
}
/** Returns false only outside fixed IDs; forged known candidate/member always throws. */
export function validateRound97GlobalKnowledgeDimensionCandidate(candidate,evidence,currentWork,context={}){
 if(!IDS.includes(candidate?.id))return false;
 let trusted=context.trustedContext;
 if(!trusted){require(typeof context.repoDir==='string'&&context.repoDir,'repoDir or closed trusted context');if(!contexts.has(context.repoDir))contexts.set(context.repoDir,createRound97GlobalKnowledgeDimensionCandidateContext({repoDir:context.repoDir}));trusted=contexts.get(context.repoDir);}
 const state=states.get(trusted);require(state,'trusted fixed C5 context');const expected=state.rows.get(candidate.id),m=state.members.get(evidence?.id);
 require(same(candidate,expected)&&m&&m.candidateId===candidate.id&&same(evidence,m.e),'entire exact candidate/member');
 const w=currentWork,e=m.e;require(w?.id===e.id&&same(e.identity,{title:w.title_zh,author:w.author}),'current exact identity');
 require(same(w.source_search_log,e.whole_prior)&&rh(w.source_search_log)===e.whole_prior_sha256,'whole current source history unchanged');
 require(rh(w.source_index)===e.source_index_sha256,'full source identity unchanged');
 require(w.knowledge?.assertions?.filter(a=>rh(a)===e.active_core_assertion_sha256&&same(a,e.active_core_assertion)).length===1,'active exact core assertion remains');
 require(e.sources.every(u=>w.knowledge?.sources?.includes(u)),'actual original references retained without invented URL');
 const phase=context.candidateAdoptionPhase??'post';require(phase==='pre'||phase==='post','explicit allowed adoption phase');
 validateKnowledgeDimensionRound7Evidence(m.d,{trustedContext:state.dimensionContext,inputFile:DIMENSION_ROUND7_INPUT_FILE,dimensionAdoptionPhase:phase,currentWork:w});
 require(w.completion?.source_verified===false&&w.issue_analysis_status==='knowledge_added_unverified','no verification upgrade');
 require(!w.classification_assignments?.some(a=>a.label===candidate.proposed_label),'no automatic classification assignment');return true;
}
