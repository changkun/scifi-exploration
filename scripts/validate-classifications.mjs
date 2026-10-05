import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {gunzipSync} from 'node:zlib';
import {CLASSIFICATION_REGISTRY,classificationDetail,renderClassifications} from '../dist/assets/classifications.mjs';
import {DEFAULT_STATE,filterWorks,stateFromURL,searchFromState} from '../dist/assets/model.mjs';
const works=JSON.parse(gunzipSync(await readFile(new URL('../research/canonical-universe.json.gz',import.meta.url)))).works;
const byId=new Map(works.map(work=>[work.id,work]));
const registry=JSON.parse(await readFile(new URL('../research/classification-registry.json',import.meta.url),'utf8'));
assert.deepEqual(CLASSIFICATION_REGISTRY,registry);
assert.equal(works.length,14564);
assert.equal(registry.axes.length,8);
for(const category of registry.categories){
  const state={...DEFAULT_STATE,boundary:true,classification:category.id};
  const expected=category.members.map(member=>member.work_id).sort();
  assert.deepEqual(filterWorks(works,state).map(work=>work.id).sort(),expected);
  assert.deepEqual(stateFromURL('?'+searchFromState(state),works),state);
  for(const member of category.members){const work=byId.get(member.work_id);assert.equal(work.title_zh,member.title_at_review);assert(work.classification_assignments.some(assignment=>assignment.id===category.id&&assignment.basis===member.basis));assert(work.search_text.includes(category.label.toLocaleLowerCase()));assert.equal(work.completion.source_verified,false);if(category.axis==='topic')assert(work.topics.includes(category.label));if(category.axis==='branch')assert(work.branches.includes(category.label));}
}
const intersection={...DEFAULT_STATE,boundary:true,classification:'topic:memory|form:performance'};
assert.deepEqual(filterWorks(works,intersection).map(work=>work.id),['Q18152802']);
assert.deepEqual(stateFromURL('?'+searchFromState(intersection),works),intersection);
assert.equal(stateFromURL('?classification=topic:memory%7Cmissing:key',works).classification,'');
const synthetic=[{...works[0],duration:'新的跨度类别',science_class:'新的科学关系类别'}];
const added={...DEFAULT_STATE,boundary:true,duration:synthetic[0].duration,science:synthetic[0].science_class};
assert.deepEqual(stateFromURL('?'+searchFromState(added),synthetic),added);
assert.equal(filterWorks(synthetic,added).length,1);
for(const id of ['Q1012716','Q108806401']){const work=byId.get(id),correction=work.knowledge.corrections.find(item=>item.id===id);assert.equal(work.issue,correction.fields.issue);assert.deepEqual(work.knowledge_topics,correction.fields.topics);assert(work.knowledge.superseded_issue_fields.length);assert.equal(work.completion.source_verified,false);assert(!work.issue.includes(id==='Q1012716'?'Jomy':'First Sister'));}
const sample=works.find(work=>work.classification_assignments.length);
assert(classificationDetail(sample).includes('新增分类'));
for(const c of registry.categories)assert(renderClassifications(works).includes('data-value="'+c.id+'"'));
assert(renderClassifications(works).includes('未按新维度整理'));
assert(!classificationDetail({...sample,classification_assignments:[{...sample.classification_assignments[0],basis:'<script>bad</script>'}]}).includes('<script>'));
console.log('PASS versioned registry, exact evidence, multi-axis intersections, shareable URLs, extensible values, identity corrections and escaped UI');
