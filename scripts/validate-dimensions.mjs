import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {gunzipSync} from 'node:zlib';
import {fileURLToPath} from 'node:url';
import {createKnowledgeDimensionContext,validateKnowledgeDimensionEvidence,DIMENSION_INPUT_FILE} from './knowledge-dimensions-evidence.mjs';
import {DIMENSION_LABELS,FIELD_LABELS} from '../dist/assets/canonical.mjs';
import {DEFAULT_STATE,filterWorks,stateFromURL,searchFromState} from '../dist/assets/model.mjs';

const root=new URL('../',import.meta.url);
const canonical=JSON.parse(gunzipSync(await readFile(new URL('research/canonical-universe.json.gz',root))));
const input=JSON.parse(await readFile(new URL(DIMENSION_INPUT_FILE,root),'utf8'));
const trustedContext=createKnowledgeDimensionContext({repoDir:fileURLToPath(root)});
const byId=new Map(canonical.works.map(w=>[w.id,w]));
let fields=0;
for(const record of input.records){
 const work=byId.get(record.id);
 const result=validateKnowledgeDimensionEvidence(record,{trustedContext,currentWork:work,inputFile:DIMENSION_INPUT_FILE,dimensionAdoptionPhase:'post'});
 fields+=result.field_count;
 assert.equal(work.completion.source_verified,false);
 for(const [key,value] of Object.entries(record.fields))assert(work.search_text.includes(value.normalize('NFKC').toLocaleLowerCase()));
}
assert.equal(input.records.length,40);
assert.equal(fields,141);
for(const [key,label] of Object.entries(DIMENSION_LABELS)){
 const expected=key==='expression_form'?4:40;
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
console.log('PASS 40 actual adopted records / 141 fields; separate four-dimension coverage, search and URL filters; 17 baseline fields retained; scoped spatial boundary note');
