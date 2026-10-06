import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {gunzipSync} from 'node:zlib';
import {fileURLToPath} from 'node:url';
import {createDimensionEvidenceContext,validateDimensionEvidence} from './dimension-evidence.mjs';
import {DIMENSION_LABELS,FIELD_LABELS} from '../dist/assets/canonical.mjs';
import {DEFAULT_STATE,filterWorks,stateFromURL,searchFromState} from '../dist/assets/model.mjs';

const root=new URL('../',import.meta.url);
const canonical=JSON.parse(gunzipSync(await readFile(new URL('research/canonical-universe.json.gz',root))));
const context=createDimensionEvidenceContext({repoDir:fileURLToPath(root)});
const byId=new Map(canonical.works.map(w=>[w.id,w]));
const allIds=new Set();
for(const [inputFile,expectedRecords,expectedFields] of [['research/knowledge-dimensions-round1.json',40,141],['research/knowledge-dimensions-round2.json',100,311],['research/knowledge-dimensions-round3.json',200,648],['research/knowledge-dimensions-round4.json',300,992],['research/knowledge-dimensions-round5.json',600,1946]]){
 const input=JSON.parse(await readFile(new URL(inputFile,root),'utf8'));
 let fields=0;
 for(const record of input.records){
 assert(!allIds.has(record.id));allIds.add(record.id);
 const work=byId.get(record.id);
 const result=validateDimensionEvidence(record,{context,currentWork:work,inputFile,dimensionAdoptionPhase:'post'});
 fields+=result.field_count;
 assert.equal(work.completion.source_verified,false);
 for(const [key,value] of Object.entries(record.fields))assert(work.search_text.includes(value.normalize('NFKC').toLocaleLowerCase()));
 }
 assert.equal(input.records.length,expectedRecords);
 assert.equal(fields,expectedFields);
}
assert.equal(allIds.size,1240);
for(const [key,label] of Object.entries(DIMENSION_LABELS)){
 const expected={narrative_mechanism:1240,scientific_premise:934,reality_relation:1240,expression_form:405}[key];
 const known=filterWorks(canonical.works,{...DEFAULT_STATE,boundary:true,dimension:key});
 const missing=filterWorks(canonical.works,{...DEFAULT_STATE,boundary:true,missing:key});
 assert.equal(known.length,expected,label);
 assert.equal(missing.length,canonical.works.length-expected,label);
 const knownIds=new Set(known.map(w=>w.id));
 assert(missing.every(w=>!knownIds.has(w.id)));
 for(const state of [{...DEFAULT_STATE,boundary:true,dimension:key},{...DEFAULT_STATE,boundary:true,missing:key}])assert.deepEqual(stateFromURL('?'+searchFromState(state),canonical.works),state);
 for(const work of canonical.works){
  assert.deepEqual(Object.keys(work.completion.field_statuses).sort(),Object.keys(FIELD_LABELS).sort());
  assert.equal(work.completion.extended_dimension_statuses[key],work[key]?'knowledge_added_unverified':'missing');
 }
}
const scopeWork=byId.get('Q3881194');
assert.equal(scopeWork.spatial_primary,'earth');
assert(scopeWork.spatial_scope_annotation.scope_note.includes('后续跨越'));
assert.deepEqual(scopeWork.spatial_scope_annotation.original_spatial_fields,{
 spatial_primary:scopeWork.spatial_primary,
 spatial_secondary:scopeWork.spatial_evidence.secondary,
 spatial_rationale:scopeWork.spatial_evidence.rationale
});
console.log('PASS independently guarded 40/141, 100/311, 200/648, 300/992 and 600/1946 actual adopted records/fields; four-dimension coverage, search and URL filters; 17 baseline fields retained; scoped spatial boundary note');
