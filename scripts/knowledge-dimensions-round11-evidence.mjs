import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

export const DIMENSION_ROUND11_INPUT_FILE = 'research/knowledge-dimensions-round11.json';
export const DIMENSION_ROUND11_MODE = 'exact_existing_core_dimension_extension_round11_v1';
export const DIMENSION_ROUND11_FIELDS = Object.freeze(['narrative_mechanism','scientific_premise','reality_relation','story_era','expression_form']);
const PINS_FILE = 'research/dimension-input-snapshots/knowledge-dimensions-round11-guard-pins.json';
const PINS_SHA = 'ce92f2c0acc02771096e1426f0c46438b6e65000a0dd7d30b6b3c213482e3cad';
const INPUT_SHA = '7da9d7cf2a0898ce4c6817fa611cdffd8efb7743398ce12ecd1331ab32b9b014';
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
function require(ok,message) { if (!ok) throw new Error('Round11 dimension guard: '+message); }
function checked(repoDir,file,digest,format='json',packetDir=null) {
  const path=packetDir && existsSync(join(packetDir,file)) ? join(packetDir,file) : join(repoDir,file);
  const bytes=readFileSync(path);
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
export function createKnowledgeDimensionRound11Context({repoDir,packetDir=null}={}) {
  require(typeof repoDir==='string' && repoDir.length>0,'repoDir required');
  const pins=checked(repoDir,PINS_FILE,PINS_SHA,'json',packetDir);
  const input=checked(repoDir,DIMENSION_ROUND11_INPUT_FILE,INPUT_SHA,'json',packetDir);
  const dependencies=new Map();
  for (const dep of pins.dependencies) dependencies.set(dep.file,checked(repoDir,dep.file,dep.sha256,dep.format||'json',packetDir));
  const selection=dependencies.get(pins.selection_file);
  require(selection.records.length===1000 && input.records.length===1000 && pins.records.length===1000,'closed1000');
  const records=new Map(), pinMap=new Map(), selections=new Map();
  let missingSlots=0;
  const presence=(x,keys)=>Object.fromEntries(keys.map(k=>[k,{present:has(x||{},k),value:x?.[k]??null}]));
  const counts=Object.fromEntries(DIMENSION_ROUND11_FIELDS.map(k=>[k,0]));
  for (let i=0;i<1000;i++) {
    const r=input.records[i],pin=pins.records[i],s=selection.records[i];
    require(r.id===pin.id && s.id===r.id && r.selection_index===i && !records.has(r.id),'exact ID/order');
    require(recordHash(r)===pin.input_record_sha256 && recordHash(s)===pin.selection_record_sha256,'exact input/selection record');
    const p=at(dependencies.get(pin.proposal_file),pin.proposal_pointer);
    const original=at(dependencies.get(pin.original_analysis_archive),s.source_analysis_ref.record_pointer);
    require(recordHash(p)===pin.proposal_record_sha256 && recordHash(original)===s.source_analysis_ref.record_sha256,'exact original/proposal record');
    require(equal(original,s.source_analysis_record),'full original record retained');
    const originalPublic=dependencies.get(s.source_analysis_ref.file);
    require(equal(at(originalPublic,s.source_analysis_ref.record_pointer),original),'current public original record exact');
    const archivedMetadata=dependencies.get(pin.original_analysis_archive).metadata;
    require(equal(archivedMetadata??null,s.source_analysis_metadata??null),'actual original metadata retained');
    require(equal(presence(original,Object.keys(s.original_record_provenance_presence)),s.original_record_provenance_presence),'source-derived original record presence including real counts');
    require(equal(presence(archivedMetadata,Object.keys(s.original_metadata_provenance_presence)),s.original_metadata_provenance_presence),'source-derived original metadata presence including real counts');
    require(equal(r.dimension_provenance.original_metadata_presence_reference,{file:pins.selection_file,pointer:`$.records[${i}].original_metadata_provenance_presence`,record_sha256:recordHash(s.original_metadata_provenance_presence)}),'metadata missing/present retained');
    require(equal(r.dimension_provenance.original_record_presence_reference,{file:pins.selection_file,pointer:`$.records[${i}].original_record_provenance_presence`,record_sha256:recordHash(s.original_record_provenance_presence)}),'record missing/present retained');
    require(equal(r.identity,s.identity) && equal(r.identity,p.identity) && equal(r.identity,pin.identity),'identity binding');
    require(equal(r.dimension_provenance.selection_reference,{file:pins.selection_file,record_pointer:`$.records[${i}]`,record_sha256:recordHash(s)}),'exact shared selection pointer');
    require(equal(r.dimension_provenance.source_proposal_reference,{file:pin.proposal_file,record_pointer:pin.proposal_pointer,record_sha256:recordHash(p)}),'exact shared proposal pointer');
    require(equal(r.dimension_provenance.source_analysis_ref,s.source_analysis_ref) && r.dimension_provenance.active_core_assertion_sha256===s.active_core_assertion_sha256 && r.dimension_provenance.source_index_sha256===s.current_source_index_sha256 && r.dimension_provenance.original_urls_are_not_new_reads===true,'source/core/history role binding');
    require(equal(r.sources,original.sources||[]),'old identity/material references only');
    require(r.verification_status==='knowledge_added_unverified' && r.provenance_mode===DIMENSION_ROUND11_MODE,'strict unverified mode');
    require(!has(r,'source_evidence') && !has(r,'ownership_file') && !has(r,'queries') && !has(r,'raw_cache'),'no invented new-reading or owner fields');
    require(equal(r.dimension_provenance.whole_prior_reference,{file:pins.selection_file,pointer:`$.records[${i}].current_source_search_log`,record_sha256:s.current_source_search_log_sha256}),'complete actual history retained');
    require(recordHash(s.current_source_search_log)===s.current_source_search_log_sha256,'full history hash');
    require(equal(s.original_record_provenance_presence,pin.original_record_presence),'real original provenance presence');
    require(equal(Object.keys(r.fields),pin.fields) && Object.keys(r.fields).every(k=>DIMENSION_ROUND11_FIELDS.includes(k)),'closed five-field whitelist');
    const expectedMissing={...p.missing_fields},expectedUnproposed={...p.unproposed_fields};
    require(equal(r.dimension_provenance.scope_omissions,pin.scope_omissions),'closed semantic omission pointers');
    for (const [key,ref] of Object.entries(pin.scope_omissions)) {
      const a=dependencies.get(ref.file).omissions[ref.omission_index];
      require(recordHash(a)===ref.omission_sha256 && a.id===r.id && a.field===key && a.operation==='omit_proposed_field','exact closed semantic omissions');
      require(a.original_proposal_record_sha256===hash(Buffer.from(JSON.stringify(p))) && a.old_value===p.proposed_fields[key].proposed_value && equal(a.original_field_payload,p.proposed_fields[key]),'exact omitted original field');
      require(equal(a.source_analysis_ref,s.source_analysis_ref) && a.active_core_assertion_sha256===s.active_core_assertion_sha256 && equal(a.pre_presence,s.pre_dimension_fields[key]),'omission original core and absence binding');
      expectedMissing[key]=a.reason;expectedUnproposed[key]={status:'actual_missing',reason:a.reason,pre_presence:a.pre_presence};
    }
    require(equal(r.missing_fields,expectedMissing),'original1081 plus exact closed omitted fields stay missing');
    require(equal(r.unproposed_fields,expectedUnproposed) && equal(r.preserved_known_fields,p.preserved_known_fields),'exact derived unproposed-versus-missing partition');
    require(equal(Object.keys(r.fields).concat(Object.keys(r.unproposed_fields)).sort(),[...DIMENSION_ROUND11_FIELDS].sort()),'all five slots accounted once');
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
        require(a.old_value===expected && a.original_proposal_record_sha256===hash(Buffer.from(JSON.stringify(p))) && equal(a.source_analysis_ref,s.source_analysis_ref) && a.active_core_assertion_sha256===s.active_core_assertion_sha256,'adapter exact original');
        expected=a.new_value;
      }
      require(value===expected,'exact original or conservatively adapted value '+r.id+'/'+key);
      require(equal(evidence.original_proposed_field_reference,{file:pin.proposal_file,pointer:pin.proposal_pointer+'.proposed_fields.'+key,record_sha256:recordHash(proposal)}),'entire old field rationale and scope retained');
      require(equal(evidence.scope_adapter,pin.scope_adapters[key]??null),'exact adapter presence and binding');
      require(evidence.new_material_read===false && evidence.independently_verified===false,'no evidence upgrade');
      require(evidence.active_core_assertion_sha256===s.active_core_assertion_sha256,'active core binding');
      counts[key]++;
    }
    records.set(r.id,r);pinMap.set(r.id,pin);selections.set(r.id,s);
  }
  require(equal(counts,{narrative_mechanism:1000,scientific_premise:801,reality_relation:1000,story_era:219,expression_form:897}),'closed3917 field counts');
  require(missingSlots===1083 && input.metadata.actual_missing_field_slots===1083 && input.metadata.unproposed_field_slots===1083,'closed1083 missing/unproposed slots');
  require(input.metadata.new_query_count===0 && input.metadata.new_open_count===0 && input.metadata.new_core_count===0 && input.metadata.new_original_fulltext_read_count===0 && input.metadata.independently_verified_count===0,'no new read/core/verification claims');
  const context=Object.freeze({mode:DIMENSION_ROUND11_MODE,inputFile:DIMENSION_ROUND11_INPUT_FILE,recordCount:1000,fieldCount:3917});
  trusted.set(context,{records,pinMap,selections});
  return context;
}

export function isKnowledgeDimensionRound11Record(record,context={}) {
  return context.inputFile===DIMENSION_ROUND11_INPUT_FILE || record?.input_file===DIMENSION_ROUND11_INPUT_FILE || record?.provenance_mode===DIMENSION_ROUND11_MODE;
}

/** pre checks real missing values; post requires actual fields and exact adopted assertion. */
export function validateKnowledgeDimensionRound11Evidence(record,context={}) {
  const state=trusted.get(context.trustedContext);
  require(state,'trusted fixed-archive context required');
  require(context.inputFile===DIMENSION_ROUND11_INPUT_FILE,'explicit round11 input routing');
  require(context.dimensionAdoptionPhase==='pre' || context.dimensionAdoptionPhase==='post','explicit pre/post phase');
  const pin=state.pinMap.get(record?.id),expected=state.records.get(record?.id),s=state.selections.get(record?.id);
  require(pin && expected && s,'outside closed1000');
  let body=record;
  if (has(record,'input_file')) {
    require(record.input_file===DIMENSION_ROUND11_INPUT_FILE,'exact assertion input wrapper');
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
  require(equal(assertions.slice(0,pin.original_assertion_prefix_sha256.length).map(recordHash),pin.original_assertion_prefix_sha256),'all old assertions remain an exact ordered prefix');
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
      const adopted=assertions.filter(a=>a.input_file===DIMENSION_ROUND11_INPUT_FILE);
      require(adopted.length===1 && equal(adopted[0],{input_file:DIMENSION_ROUND11_INPUT_FILE,...expected}),'exact actual adopted round11 assertion');
    }
  }
  return {mode:DIMENSION_ROUND11_MODE,status:'knowledge_added_unverified',phase:context.dimensionAdoptionPhase,field_count:Object.keys(expected.fields).length,active_core_assertion_sha256:s.active_core_assertion_sha256,new_material_read:false,original_provenance_preserved_as_recorded:true};
}
