// Private closed 40-record initial-research proposal; no network and no generic owner alias.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

export const DIMENSION_INPUT_FILE = 'research/knowledge-dimensions-round1.json';
export const DIMENSION_MODE = 'initial_research_dimension_extension_v1';
export const DIMENSION_FIELDS = Object.freeze(['narrative_mechanism','scientific_premise','reality_relation','story_era','expression_form']);
const PINS_FILE = 'research/dimension-input-snapshots/knowledge-dimensions-round1-guard-pins.json';
const PINS_SHA = 'bc98e5ac7326874545681304ef99fde0f083bb7d1effc20a2ad46f5da157f8aa';
const INPUT_SHA = 'e2f9005fe42336253e337852b3b2aad36074144436680431a0af594ec0c06dba';
const PROPOSAL_FILE = 'research/dimension-input-snapshots/global-breadth-selection-round1.json';
const PROPOSAL_SHA = '3b6d04777e7ff7fdd4ff4dbcc5acca7109c9d4beced9f5020209795c76089804';
const ORIGINAL_FILE = 'research/issues-since-1980.json';
const ORIGINAL_SHA = '0611838f8b04d53e85df2971eabf232f227c3c1ce6ec35c6ff2e7691db9eef58';
const trusted = new WeakMap();
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
function stable(x) {
  if (x === null || typeof x !== 'object') return JSON.stringify(x);
  if (Array.isArray(x)) return '['+x.map(stable).join(',')+']';
  return '{'+Object.keys(x).sort().map(k=>JSON.stringify(k)+':'+stable(x[k])).join(',')+'}';
}
const recordHash = x => hash(Buffer.from(stable(x)));
const equal = (a,b) => stable(a) === stable(b);
function require(ok,message) { if (!ok) throw new Error('Initial dimension guard: '+message); }
function checked(repoDir,file,digest) {
  const bytes=readFileSync(join(repoDir,file));
  require(hash(bytes)===digest,'fixed file hash '+file);
  return JSON.parse(bytes);
}

/** Reads only four fixed public files. Original missing provenance remains absent/null. */
export function createKnowledgeDimensionContext({repoDir}={}) {
  require(typeof repoDir==='string' && repoDir.length>0,'repoDir required');
  const pins=checked(repoDir,PINS_FILE,PINS_SHA);
  const input=checked(repoDir,DIMENSION_INPUT_FILE,INPUT_SHA);
  const proposal=checked(repoDir,PROPOSAL_FILE,PROPOSAL_SHA);
  const original=checked(repoDir,ORIGINAL_FILE,ORIGINAL_SHA);
  require(input.records.length===40 && pins.records.length===40 && proposal.records.length===40,'closed count');
  const records=new Map(), pinMap=new Map(), originals=new Map(), proposals=new Map();
  for (let i=0;i<input.records.length;i++) {
    const r=input.records[i], p=proposal.records[i], pin=pins.records[i];
    require(r.id===p.id && pin.id===r.id && !records.has(r.id),'closed identity order');
    require(recordHash(r)===pin.input_record_sha256 && recordHash(p)===pin.proposal_record_sha256,'input/proposal record hash '+r.id);
    require(p.source_analysis_ref.file===ORIGINAL_FILE && p.source_analysis_ref.file_sha256===ORIGINAL_SHA,'original file binding');
    const pointer=/^\$\.records\[(\d+)\]$/.exec(p.source_analysis_ref.record_pointer);
    require(pointer,'original record pointer');
    const o=original.records[Number(pointer[1])];
    require(o?.id===r.id && recordHash(o)===pin.source_analysis_record_sha256 && recordHash(o)===p.source_analysis_ref.record_sha256,'original record binding '+r.id);
    require(equal(r.identity,o.identity) && equal(r.identity,p.identity) && equal(r.identity,pin.identity),'original identity '+r.id);
    require(o.verification_status==='knowledge_added_unverified' && r.verification_status==='knowledge_added_unverified','unverified only');
    require(Object.keys(r.fields).every(k=>DIMENSION_FIELDS.includes(k)) && equal(Object.keys(r.fields),pin.fields),'five-field whitelist '+r.id);
    for (const [key,value] of Object.entries(r.fields)) {
      require(typeof value==='string' && value.length>0 && value===p.proposed_fields[key]?.proposed_value,'exact proposal value '+r.id+'/'+key);
      require(r.dimension_evidence[key].new_material_read===false && r.dimension_evidence[key].independently_verified===false,'field unverified scope');
    }
    const old=r.initial_research_provenance.original_initial_provenance;
    require(old.owner===null && old.initial_reading_log===null && old.initial_cache_reference===null && old.initial_query_count===null && old.initial_open_count===null,'original absence is unknown not zero');
    require(!('source_evidence' in r) && !('ownership_file' in r) && !('queries' in r) && !('raw_cache' in r),'no fabricated source/owner/query keys');
    require(equal(r.sources,o.sources||[]),'old source references retained exactly');
    records.set(r.id,r);pinMap.set(r.id,pin);originals.set(r.id,o);proposals.set(r.id,p);
  }
  require(input.records.reduce((n,r)=>n+Object.keys(r.fields).length,0)===141,'closed field count');
  const context=Object.freeze({mode:DIMENSION_MODE,recordCount:40,fieldCount:141,inputFile:DIMENSION_INPUT_FILE});
  trusted.set(context,{records,pinMap,originals,proposals});
  return context;
}

/** Dispatch by fixed file as well as mode, so removing the marker cannot escape validation. */
export function isKnowledgeDimensionRecord(record,context={}) {
  return context.inputFile===DIMENSION_INPUT_FILE || record?.input_file===DIMENSION_INPUT_FILE || record?.provenance_mode===DIMENSION_MODE;
}

/** pre=old missing field, post=actual canonical top-level and knowledge.fields both exact. */
export function validateKnowledgeDimensionEvidence(record,context={}) {
  const state=trusted.get(context.trustedContext);
  require(state,'trusted context must be constructed from exact public files');
  require(context.inputFile===DIMENSION_INPUT_FILE,'exact input file route');
  require(context.dimensionAdoptionPhase==='pre' || context.dimensionAdoptionPhase==='post','explicit pre/post phase');
  const r=record, expected=state.records.get(r?.id),pin=state.pinMap.get(r?.id),o=state.originals.get(r?.id);
  require(expected && pin && o,'record outside closed40');
  let body=r;
  if (Object.prototype.hasOwnProperty.call(r,'input_file')) {
    require(r.input_file===DIMENSION_INPUT_FILE,'assertion wrapper exact file');
    body={...r};delete body.input_file;
  }
  require(recordHash(body)===pin.input_record_sha256 && equal(body,expected),'entire immutable dimension record '+r.id);
  const w=context.currentWork;
  require(w && w.id===r.id && equal({title:w.title_zh,author:w.author},pin.identity),'current exact identity');
  require(equal(Object.fromEntries(['form','forms','source_entity_kind','source_types'].map(k=>[k,w[k]??null])),pin.original_grain),'current exact source grain');
  const assertions=w.knowledge?.assertions;
  require(Array.isArray(assertions),'current actual assertions');
  const active=assertions.filter(a=>a.input_file===ORIGINAL_FILE && a.fields?.issue===o.fields.issue);
  require(active.length===1 && recordHash(active[0])===pin.active_core_assertion_sha256,'exact original active issue assertion');
  for (const key of ['topics','issue','issue_facets']) require(equal(w.knowledge.fields[key],o.fields[key]),'original active core unchanged '+key);
  require(w.issue===o.fields.issue && w.issue_analysis_status==='knowledge_added_unverified','current active issue remains unverified');
  for (const [key,value] of Object.entries(expected.fields)) {
    if (context.dimensionAdoptionPhase==='pre') {
      require(!Object.prototype.hasOwnProperty.call(w.knowledge.fields,key),'no preexisting knowledge field overwritten '+key);
      if (key==='story_era') require(w.story_era===pin.original_story_era && w.story_era==='故事时代未知','old story era exact unknown');
      else require(w[key]===undefined || w[key]===null,'old dimension exact absence '+key);
    } else {
      require(w[key]===value && w.knowledge.fields[key]===value,'post explicit top-level and knowledge field '+key);
      const adopted=assertions.filter(a=>a.input_file===DIMENSION_INPUT_FILE);
      require(adopted.length===1 && equal(adopted[0],{input_file:DIMENSION_INPUT_FILE,...expected}),'post exact adopted assertion');
    }
  }
  return {mode:DIMENSION_MODE,status:'knowledge_added_unverified',field_count:Object.keys(expected.fields).length,
    phase:context.dimensionAdoptionPhase,source_analysis_record_sha256:pin.source_analysis_record_sha256,
    active_core_assertion_sha256:pin.active_core_assertion_sha256,new_material_read:false,original_provenance_missing_not_zero:true};
}
