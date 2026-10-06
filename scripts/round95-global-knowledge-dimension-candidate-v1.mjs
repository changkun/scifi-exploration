import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { createKnowledgeDimensionRound5Context, validateKnowledgeDimensionRound5Evidence, DIMENSION_ROUND5_INPUT_FILE } from './knowledge-dimensions-round5-evidence.mjs';

export const ROUND95_GLOBAL_CANDIDATE_INPUT = 'research/classification-discovery-inputs/round95-global-knowledge-dimension-candidates.json';
const INPUT_SHA = 'bb954923cb18622a8e10aaa783dfb87a49e735aa46fa6cf1f2ca8b8917abb23a';
const R5_SHA = '619fe0a41458c9f572151ef4885de7bc1bc5af1b318512e3ee509c907818a0e8';
const PINS_FILE = 'research/dimension-input-snapshots/knowledge-dimensions-round5-guard-pins.json';
const PINS_SHA = '7f506c757df9684991bfd0b88fd0f6fbc43caad6c3cddd75286c950b4fdeb534';
const IDS = Object.freeze([
  'pending:round95-global-temporary-evidence-world-rights',
  'pending:round95-global-retrieval-and-refused-contact',
  'pending:round95-global-moving-habitable-band-and-city-rebuilding',
  'pending:round95-global-military-technology-and-labour-dependence',
  'pending:round95-global-editorial-footnotes-and-retained-testimony',
  'pending:round95-global-implanted-conscious-evidence-and-unlocking'
]);
const MEMBER_IDS = Object.freeze(['Q134477758','Q105560010','Q131382775','Q137806588','Q124021681','Q65119231','Q131382746','Q65016942','Q131382743']);
const states = new WeakMap();
const cachedContexts = new Map();
const hash = b => createHash('sha256').update(b).digest('hex');
function stable(x) {
  if (x === null || typeof x !== 'object') return JSON.stringify(x);
  if (Array.isArray(x)) return '['+x.map(stable).join(',')+']';
  return '{'+Object.keys(x).sort().map(k=>JSON.stringify(k)+':'+stable(x[k])).join(',')+'}';
}
const same = (a,b) => stable(a) === stable(b);
const rh = x => hash(Buffer.from(stable(x)));
const has = (x,k) => Object.prototype.hasOwnProperty.call(x||{},k);
function require(ok,msg) { if (!ok) throw new Error('Fixed round95 global C6 guard: '+msg); }
function read(repo,file,digest) {
  const bytes = readFileSync(join(repo,file));
  require(hash(bytes)===digest,'exact public/archive bytes '+file);
  return JSON.parse(bytes);
}
function at(doc,pointer) {
  const m=/^\$\.records\[(\d+)\]$/.exec(pointer);
  require(m,'exact original record pointer');
  return doc.records[Number(m[1])];
}
const presence=(x,keys)=>Object.fromEntries(keys.map(k=>[k,{present:has(x,k),value:x?.[k]??null}]));

/** Fixed six pending rows, nine members. No URLs, owners or old counts are supplied. */
export function createRound95GlobalKnowledgeDimensionCandidateContext({repoDir}={}) {
  require(typeof repoDir==='string' && repoDir,'repoDir required');
  const input=read(repoDir,ROUND95_GLOBAL_CANDIDATE_INPUT,INPUT_SHA);
  const r5=read(repoDir,DIMENSION_ROUND5_INPUT_FILE,R5_SHA);
  const pins=read(repoDir,PINS_FILE,PINS_SHA);
  const selectionDep=pins.dependencies.find(d=>d.file===pins.selection_file);
  require(selectionDep,'fixed R5 selection archive');
  const selection=read(repoDir,selectionDep.file,selectionDep.sha256);
  require(same(input.discovery_candidates.map(c=>c.id),IDS),'closed six exact candidate IDs/order');
  require(same(input.discovery_candidates.flatMap(c=>c.work_evidence.map(e=>e.id)),MEMBER_IDS),'closed nine exact member IDs/order');
  require(input.metadata.new_query_count===0 && input.metadata.new_open_count===0 && input.metadata.new_core_count===0 && input.metadata.independent_verification_upgrade_count===0,'zero derivative operations only');
  const dimensionContext=createKnowledgeDimensionRound5Context({repoDir});
  const rows=new Map(),members=new Map(),originalFiles=new Map();
  for (const c of input.discovery_candidates) {
    require(c.review_status==='pending_further_comparison' && c.verification_status==='knowledge_added_unverified','pending and unverified candidate');
    rows.set(c.id,c);
    for (const e of c.work_evidence) {
      const s=selection.records[e.selection_index],d=r5.records[e.selection_index];
      require(s?.id===e.id && d?.id===e.id,'exact selection index and adopted R5 member');
      require(same(e.identity,s.identity) && same(e.identity,d.identity),'exact original identity');
      require(e.selection_reference.file_sha256===selectionDep.sha256 && rh(s)===e.selection_reference.record_sha256,'fixed selection bytes/record');
      require(e.selection_reference.pointer==='$.records['+e.selection_index+']','exact selection pointer');
      require(same(e.source_identity_grain,s.current_grain_and_date),'original source grain/date retained');
      require(same(e.original_analysis,s.source_analysis_ref),'exact original A reference');
      let original=originalFiles.get(e.original_analysis.file);
      if (!original) { original=read(repoDir,e.original_analysis.file,e.original_analysis.file_sha256);originalFiles.set(e.original_analysis.file,original); }
      const a=at(original,e.original_analysis.record_pointer);
      require(rh(a)===e.original_analysis.record_sha256 && same(a,e.original_analysis_record) && same(a,s.source_analysis_record),'full exact original A record');
      require(same(e.original_core_basis,s.current_core_fields) && same(e.original_material_scope,s.original_material_scope),'exact original active canonical core and material scope; original A remains separately exact');
      require(same(e.sources,a.sources||[]) && same(e.sources,s.retained_source_urls),'actual original references including empty knowledge references');
      require(same(e.active_core_assertion,s.active_core_assertion) && rh(e.active_core_assertion)===e.active_core_assertion_sha256 && e.active_core_assertion_sha256===s.active_core_assertion_sha256,'exact full active core assertion');
      require(same(e.whole_prior,s.current_source_search_log) && rh(e.whole_prior)===e.whole_prior_sha256 && e.whole_prior_sha256===s.current_source_search_log_sha256,'entire original prior/history including actual source roles');
      require(e.source_index_sha256===s.current_source_index_sha256 && rh(s.current_source_index)===e.source_index_sha256,'exact complete source index');
      require(same(e.original_record_presence,s.original_record_provenance_presence) && same(e.original_record_presence,presence(a,Object.keys(e.original_record_presence))),'actual original record absence/presence and counters');
      require(same(e.original_metadata_presence,s.original_metadata_provenance_presence) && same(e.original_metadata_presence,presence(original.metadata,Object.keys(e.original_metadata_presence))),'actual original metadata absence/presence and counters');
      require(e.original_metadata_reference.file===e.original_analysis.file && e.original_metadata_reference.file_sha256===e.original_analysis.file_sha256 && e.original_metadata_reference.pointer==='$.metadata' && rh(original.metadata??null)===e.original_metadata_reference.metadata_sha256,'exact original metadata reference');
      const proposalDep=pins.dependencies.find(x=>x.file===d.dimension_provenance.source_proposal_file);
      require(proposalDep && proposalDep.sha256===e.dimension_proposal_reference.file_sha256,'original proposal file bytes bound via R5 pins');
      require(d.dimension_provenance.source_proposal_record_pointer===e.dimension_proposal_reference.pointer && d.dimension_provenance.source_proposal_record_sha256===e.dimension_proposal_reference.record_sha256,'whole original proposal record binding');
      require(same(e.dimension_proposed_values,Object.fromEntries(Object.keys(e.dimension_proposed_values).map(k=>[k,d.fields[k]]))),'only exact adopted R5 descriptor subset cited by the fixed candidate');
      for (const [field,old] of Object.entries(e.dimension_proposed_evidence)) require(same(old,d.dimension_evidence[field]?.original_proposed_field),'exact original descriptor basis/scope '+field);
      require(same(Object.keys(e.dimension_proposed_evidence),Object.keys(e.dimension_proposed_values)),'closed member cited field set');
      require(e.discovery_source_mode==='knowledge_dimension_analysis_derivative' && e.new_material_read===false && e.actual_content_source_read_this_batch===false && e.new_query_count===0 && e.new_open_count===0 && e.new_core_count===0 && e.independently_verified===false,'no new reading/request/core/verification claims');
      require(!members.has(e.id),'no duplicate closed member');
      members.set(e.id,{candidateId:c.id,e,d});
    }
  }
  const context=Object.freeze({inputFile:ROUND95_GLOBAL_CANDIDATE_INPUT,candidateCount:6,memberCount:9});
  states.set(context,{repoDir,rows,members,dimensionContext});
  return context;
}

/** False only outside this fixed route. A forged known candidate always throws. */
export function validateRound95GlobalKnowledgeDimensionCandidate(candidate,evidence,currentWork,context={}) {
  if (!IDS.includes(candidate?.id)) return false;
  let trustedContext=context.trustedContext;
  if (!trustedContext) {
    require(typeof context.repoDir==='string' && context.repoDir,'fixed route requires repoDir or trusted context');
    if (!cachedContexts.has(context.repoDir)) cachedContexts.set(context.repoDir,createRound95GlobalKnowledgeDimensionCandidateContext({repoDir:context.repoDir}));
    trustedContext=cachedContexts.get(context.repoDir);
  }
  const state=states.get(trustedContext);
  require(state,'trusted closed C6 context');
  const expected=state.rows.get(candidate.id),member=state.members.get(evidence?.id);
  require(same(candidate,expected),'entire candidate row unchanged');
  require(member && member.candidateId===candidate.id && same(evidence,member.e),'exact original member row and membership');
  const w=currentWork,e=member.e;
  require(w?.id===e.id && same(e.identity,{title:w.title_zh,author:w.author}),'current original identity');
  require(same(w.source_search_log,e.whole_prior) && rh(w.source_search_log)===e.whole_prior_sha256,'current complete prior unchanged');
  require(rh(w.source_index)===e.source_index_sha256,'current complete source identity unchanged');
  require(w.knowledge?.assertions?.filter(a=>rh(a)===e.active_core_assertion_sha256 && same(a,e.active_core_assertion)).length===1,'original exact active assertion remains');
  require(e.sources.every(url=>w.knowledge?.sources?.includes(url)),'old references retained without invented URLs');
  validateKnowledgeDimensionRound5Evidence(member.d,{trustedContext:state.dimensionContext,inputFile:DIMENSION_ROUND5_INPUT_FILE,dimensionAdoptionPhase:'post',currentWork:w});
  require(w.completion?.source_verified===false && w.issue_analysis_status==='knowledge_added_unverified','no independent verification upgrade');
  require(!w.classification_assignments?.some(a=>a.label===candidate.proposed_label),'candidate is not automatically assigned');
  return true;
}
