import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

export const DIMENSION_ROUND4_INPUT_FILE = 'research/knowledge-dimensions-round4.json';
export const DIMENSION_ROUND4_MODE = 'exact_existing_core_dimension_extension_round4_v1';
export const DIMENSION_ROUND4_FIELDS = Object.freeze(['narrative_mechanism','scientific_premise','reality_relation','story_era','expression_form']);
const PINS_FILE = 'research/dimension-input-snapshots/knowledge-dimensions-round4-guard-pins.json';
const PINS_SHA = 'bf911f9b44dc6e937787392d0f2893dd888cd97dc1dcc56bb506dc29b2ab494a';
const INPUT_SHA = '49c49da877424756585f8509f41682f2fc407c968a5c6d7b404f0de6487b6092';
const trusted = new WeakMap();
const hash = b => createHash('sha256').update(b).digest('hex');
function stable(x) {
  if (x === null || typeof x !== 'object') return JSON.stringify(x);
  if (Array.isArray(x)) return '['+x.map(stable).join(',')+']';
  return '{'+Object.keys(x).sort().map(k=>JSON.stringify(k)+':'+stable(x[k])).join(',')+'}';
}
const recordHash = x => hash(Buffer.from(stable(x)));
const equal = (a,b) => stable(a) === stable(b);
const has = (x,k) => Object.prototype.hasOwnProperty.call(x,k);
function require(ok,message) { if (!ok) throw new Error('Round4 dimension guard: '+message); }
function checked(repoDir,file,digest,format='json') {
  const bytes=readFileSync(join(repoDir,file));
  require(hash(bytes)===digest,'exact archived/public file '+file);
  return format==='json' ? JSON.parse(bytes) : bytes.toString('utf8');
}
function at(doc,pointer) {
  const m=/^\$\.records\[(\d+)\]$/.exec(pointer);
  require(m,'closed record pointer');
  return doc.records[Number(m[1])];
}
function grain(w,keys) { return Object.fromEntries(keys.map(k=>[k,w[k]??null])); }

/** Self-contained, fixed public archives. No raw-cache directory or owner aliases. */
export function createKnowledgeDimensionRound4Context({repoDir}={}) {
  require(typeof repoDir==='string' && repoDir.length>0,'repoDir required');
  const pins=checked(repoDir,PINS_FILE,PINS_SHA);
  const input=checked(repoDir,DIMENSION_ROUND4_INPUT_FILE,INPUT_SHA);
  const dependencies=new Map();
  for (const dep of pins.dependencies) dependencies.set(dep.file,checked(repoDir,dep.file,dep.sha256,dep.format||'json'));
  const selection=dependencies.get(pins.selection_file);
  require(selection.records.length===300 && input.records.length===300 && pins.records.length===300,'closed300');
  const records=new Map(), pinMap=new Map(), selections=new Map();
  let missingSlots=0;
  const presence=(x,keys)=>Object.fromEntries(keys.map(k=>[k,{present:has(x||{},k),value:x?.[k]??null}]));
  const counts=Object.fromEntries(DIMENSION_ROUND4_FIELDS.map(k=>[k,0]));
  for (let i=0;i<300;i++) {
    const r=input.records[i],pin=pins.records[i],s=selection.records[i];
    require(r.id===pin.id && s.id===r.id && r.selection_index===i && !records.has(r.id),'exact ID/order');
    require(recordHash(r)===pin.input_record_sha256 && recordHash(s)===pin.selection_record_sha256,'exact input/selection record');
    const p=at(dependencies.get(pin.proposal_file),pin.proposal_pointer);
    const original=at(dependencies.get(pin.original_analysis_archive),s.source_analysis_ref.record_pointer);
    require(recordHash(p)===pin.proposal_record_sha256 && recordHash(original)===s.source_analysis_ref.record_sha256,'exact original/proposal record');
    require(equal(original,s.source_analysis_record),'full original record retained');
    const originalPublic=checked(repoDir,s.source_analysis_ref.file,s.source_analysis_ref.file_sha256);
    require(equal(at(originalPublic,s.source_analysis_ref.record_pointer),original),'current public original record exact');
    const archivedMetadata=dependencies.get(pin.original_analysis_archive).metadata;
    require(equal(archivedMetadata??null,s.source_analysis_metadata??null),'actual original metadata retained');
    require(equal(presence(original,Object.keys(s.original_record_provenance_presence)),s.original_record_provenance_presence),'source-derived original record presence including real counts');
    require(equal(presence(archivedMetadata,Object.keys(s.original_metadata_provenance_presence)),s.original_metadata_provenance_presence),'source-derived original metadata presence including real counts');
    require(equal(r.dimension_provenance.original_metadata_presence,s.original_metadata_provenance_presence),'metadata missing/present retained');
    require(equal(r.dimension_provenance.original_record_presence,s.original_record_provenance_presence),'record missing/present retained');
    require(equal(r.identity,s.identity) && equal(r.identity,p.identity) && equal(r.identity,pin.identity),'identity binding');
    require(equal(r.sources,original.sources||[]),'old identity/material references only');
    require(r.verification_status==='knowledge_added_unverified' && r.provenance_mode===DIMENSION_ROUND4_MODE,'strict unverified mode');
    require(!has(r,'source_evidence') && !has(r,'ownership_file') && !has(r,'queries') && !has(r,'raw_cache'),'no invented new-reading or owner fields');
    require(equal(r.dimension_provenance.current_source_search_log,s.current_source_search_log),'complete actual history retained');
    require(recordHash(r.dimension_provenance.current_source_search_log)===s.current_source_search_log_sha256,'full history hash');
    require(equal(r.dimension_provenance.original_record_presence,pin.original_record_presence),'real original provenance presence');
    require(equal(Object.keys(r.fields),pin.fields) && Object.keys(r.fields).every(k=>DIMENSION_ROUND4_FIELDS.includes(k)),'closed five-field whitelist');
    require(equal(r.missing_fields,p.missing_fields),'missing508 kept as proposals');
    require(equal(r.unproposed_fields,p.unproposed_fields) && equal(r.preserved_known_fields,p.preserved_known_fields),'exact unproposed-versus-missing partition');
    require(equal(Object.keys(r.fields).concat(Object.keys(r.unproposed_fields)).sort(),[...DIMENSION_ROUND4_FIELDS].sort()),'all five slots accounted once');
    require(Object.keys(r.preserved_known_fields).length===0,'no invented preserved-known slots');
    for (const [key,slot] of Object.entries(r.unproposed_fields)) {
      require(slot.status==='actual_missing' && has(r.missing_fields,key),'genuine unknown unproposed slot');
      require(equal(slot.pre_presence,s.pre_dimension_fields[key]),'unproposed exact original presence');missingSlots++;
    }
    for (const [key,value] of Object.entries(r.fields)) {
      const evidence=r.dimension_evidence[key],proposal=p.proposed_fields[key];
      require(typeof value==='string' && value.length>0 && evidence,'nonempty proposed descriptor');
      let expected=proposal.proposed_value;
      if (pin.scope_adapters[key]) {
        const ref=pin.scope_adapters[key],a=dependencies.get(ref.file).changes[ref.change_index];
        require(recordHash(a)===ref.change_sha256 && a.id===r.id && a.field===key,'exact scope adapter');
        require(a.original_value===expected && a.source_proposal_record_sha256===pin.proposal_record_sha256,'adapter exact original');
        expected=a.replacement_value;
      }
      require(value===expected,'exact original or conservatively adapted value '+r.id+'/'+key);
      require(equal(evidence.original_proposed_field,proposal),'entire old field rationale and scope retained');
      require(evidence.new_material_read===false && evidence.independently_verified===false,'no evidence upgrade');
      require(evidence.active_core_assertion_sha256===s.active_core_assertion_sha256,'active core binding');
      counts[key]++;
    }
    records.set(r.id,r);pinMap.set(r.id,pin);selections.set(r.id,s);
  }
  require(equal(counts,{narrative_mechanism:300,scientific_premise:199,reality_relation:300,story_era:45,expression_form:148}),'closed992 field counts');
  require(missingSlots===508 && input.metadata.actual_missing_field_slots===508 && input.metadata.unproposed_field_slots===508,'closed508 missing/unproposed slots');
  require(input.metadata.new_query_count===0 && input.metadata.new_open_count===0 && input.metadata.new_core_count===0 && input.metadata.new_original_fulltext_read_count===0 && input.metadata.independently_verified_count===0,'no new read/core/verification claims');
  const context=Object.freeze({mode:DIMENSION_ROUND4_MODE,inputFile:DIMENSION_ROUND4_INPUT_FILE,recordCount:300,fieldCount:992});
  trusted.set(context,{records,pinMap,selections});
  return context;
}

export function isKnowledgeDimensionRound4Record(record,context={}) {
  return context.inputFile===DIMENSION_ROUND4_INPUT_FILE || record?.input_file===DIMENSION_ROUND4_INPUT_FILE || record?.provenance_mode===DIMENSION_ROUND4_MODE;
}

/** pre checks real missing values; post requires actual fields and exact adopted assertion. */
export function validateKnowledgeDimensionRound4Evidence(record,context={}) {
  const state=trusted.get(context.trustedContext);
  require(state,'trusted fixed-archive context required');
  require(context.inputFile===DIMENSION_ROUND4_INPUT_FILE,'explicit round4 input routing');
  require(context.dimensionAdoptionPhase==='pre' || context.dimensionAdoptionPhase==='post','explicit pre/post phase');
  const pin=state.pinMap.get(record?.id),expected=state.records.get(record?.id),s=state.selections.get(record?.id);
  require(pin && expected && s,'outside closed300');
  let body=record;
  if (has(record,'input_file')) {
    require(record.input_file===DIMENSION_ROUND4_INPUT_FILE,'exact assertion input wrapper');
    body={...record};delete body.input_file;
  }
  require(equal(body,expected) && recordHash(body)===pin.input_record_sha256,'entire immutable dimension record');
  const w=context.currentWork;
  require(w?.id===record.id && equal({title:w.title_zh,author:w.author},pin.identity),'current exact identity');
  require(equal(grain(w,pin.grain_keys),pin.original_grain),'current full source identity/date/grain');
  require(equal(w.source_index,pin.original_source_index),'original source index unchanged');
  require(equal(w.source_search_log,s.current_source_search_log),'entire current source history unchanged');
  require(equal(w.issue,pin.current_core.issue) && equal(w.issue_facets,pin.current_core.issue_facets) && equal(w.topics,pin.current_core.topics),'current top-level core unchanged');
  require(equal(Object.fromEntries(['topics','issue','issue_facets'].map(k=>[k,{present:has(w.knowledge?.fields||{},k),value:w.knowledge?.fields?.[k]??null}])),pin.current_knowledge_core_presence),'current active knowledge core exact presence/value unchanged');
  require(w.knowledge?.fields && typeof w.knowledge.fields==='object','actual knowledge fields required');
  const assertions=w.knowledge?.assertions;
  require(Array.isArray(assertions) && assertions.filter(a=>recordHash(a)===s.active_core_assertion_sha256).length===1,'exact active original assertion remains');
  require(w.issue_analysis_status===pin.original_issue_analysis_status,'current core verification level unchanged');
  for (const key of Object.keys(expected.unproposed_fields)) {
    const pre=pin.pre_fields[key];
    require(has(w,key)===pre.top_present && equal(w[key]??null,pre.top_value),'unproposed top-level original absence/value preserved '+key);
    require(has(w.knowledge.fields,key)===pre.knowledge_present && equal(w.knowledge.fields[key]??null,pre.knowledge_value),'unproposed knowledge original absence/value preserved '+key);
  }
  for (const [key,value] of Object.entries(expected.fields)) {
    if (context.dimensionAdoptionPhase==='pre') {
      require(has(w.knowledge.fields,key)===pin.pre_fields[key].knowledge_present,'exact original knowledge field presence');
      require(equal(w.knowledge.fields[key]??null,pin.pre_fields[key].knowledge_value),'exact original knowledge field value');
      require(!pin.pre_fields[key].knowledge_present,'original missing field only, no overwrite');
      require(has(w,key)===pin.pre_fields[key].top_present && equal(w[key]??null,pin.pre_fields[key].top_value),'exact original top-level missing value');
      require(key==='story_era' ? ['故事时代未知','待核','待分类',null].includes(w[key]??null) : (w[key]===null || w[key]===undefined),'only original missing field');
    } else {
      require(w[key]===value && w.knowledge.fields[key]===value,'actual post top-level and knowledge fields exact '+key);
      const adopted=assertions.filter(a=>a.input_file===DIMENSION_ROUND4_INPUT_FILE);
      require(adopted.length===1 && equal(adopted[0],{input_file:DIMENSION_ROUND4_INPUT_FILE,...expected}),'exact actual adopted round4 assertion');
    }
  }
  return {mode:DIMENSION_ROUND4_MODE,status:'knowledge_added_unverified',phase:context.dimensionAdoptionPhase,field_count:Object.keys(expected.fields).length,active_core_assertion_sha256:s.active_core_assertion_sha256,new_material_read:false,original_provenance_preserved_as_recorded:true};
}
