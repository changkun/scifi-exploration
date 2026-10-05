import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {gunzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import {CLASSIFICATION_REGISTRY,classificationDetail,renderClassifications} from '../dist/assets/classifications.mjs';
import {DEFAULT_STATE,filterWorks,stateFromURL,searchFromState} from '../dist/assets/model.mjs';
const works=JSON.parse(gunzipSync(await readFile(new URL('../research/canonical-universe.json.gz',import.meta.url)))).works;
const byId=new Map(works.map(work=>[work.id,work]));
const registry=JSON.parse(await readFile(new URL('../research/classification-registry.json',import.meta.url),'utf8'));
assert.deepEqual(CLASSIFICATION_REGISTRY,registry);
if(registry.metadata.previous_version){
  const previousBytes=await readFile(new URL('../'+registry.metadata.previous_version.file,import.meta.url));
  assert.equal(createHash('sha256').update(previousBytes).digest('hex'),registry.metadata.previous_version.sha256);
  const previous=JSON.parse(previousBytes);
  assert(registry.metadata.version>previous.metadata.version);
  for(const old of previous.categories){
    const current=registry.categories.find(category=>category.id===old.id);
    assert(current);
    assert.equal(current.definition,old.definition);
    assert.deepEqual(current.members.slice(0,old.members.length),old.members);
  }
  assert.deepEqual(registry.discovery_candidates.slice(0,previous.discovery_candidates.length),previous.discovery_candidates);
}
for(const input of registry.metadata.discovery_inputs){assert.equal(createHash('sha256').update(await readFile(new URL('../'+input.file,import.meta.url))).digest('hex'),input.sha256);}
assert.equal(new Set(registry.discovery_candidates.map(candidate=>candidate.id)).size,registry.discovery_candidates.length);
assert.equal(works.length,14564);
assert.equal(new Set(registry.axes.map(axis=>axis.id)).size,registry.axes.length);
assert(registry.axes.every(axis=>axis.open===true&&axis.label&&axis.definition));
for(const id of ['topic','branch','narrative','time','space','science','reality','form'])assert(registry.axes.some(axis=>axis.id===id));
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
assert(classificationDetail(sample).includes('这项分类的资料范围'));
for(const c of registry.categories)assert(renderClassifications(works).includes('data-value="'+c.id+'"'));
for(const promoted of registry.promoted_discoveries||[]){
  const category=registry.categories.find(item=>item.id===promoted.category_id);
  assert(category);
  assert.equal(category.label,promoted.original_candidate.label);
  assert.equal(category.definition,promoted.original_candidate.definition);
  assert(registry.metadata.discovery_inputs.some(input=>input.file===category.discovery_input));
  for(const evidence of promoted.original_candidate.work_evidence){
    const work=byId.get(evidence.id),member=category.members.find(item=>item.work_id===evidence.id);
    assert.deepEqual(evidence.identity,{title:work.title_zh,author:work.author});
    assert.equal(member.basis,evidence.basis);
    assert.equal(member.evidence_scope,evidence.support_scope);
    assert.deepEqual(member.sources,evidence.sources);
    assert(evidence.sources.every(url=>work.knowledge.sources.includes(url)));
    assert.equal(work.completion.source_verified,false);
  }
}
for(const candidate of registry.discovery_candidates||[]){
  assert.equal(candidate.review_status,'pending_further_comparison');
  assert(candidate.definition_boundary&&candidate.work_evidence.length);
  for(const evidence of candidate.work_evidence){
    const work=byId.get(evidence.id);
    assert.deepEqual(evidence.identity,{title:work.title_zh,author:work.author});
    assert(evidence.basis&&evidence.exact_support_scope&&evidence.sources.length);
    assert(evidence.sources.every(url=>work.knowledge?.sources.includes(url)));
    assert(renderClassifications(works).includes('data-work="'+evidence.id+'"'));
    assert(!work.classification_assignments.some(assignment=>assignment.label===candidate.proposed_label));
    assert.equal(work.completion.source_verified,false);
  }
}
assert(renderClassifications(works).includes('未按新维度整理'));
assert(!classificationDetail({...sample,classification_assignments:[{...sample.classification_assignments[0],basis:'<script>bad</script>'}]}).includes('<script>'));
console.log('PASS versioned registry, exact evidence, multi-axis intersections, shareable URLs, extensible values, identity corrections and escaped UI');
