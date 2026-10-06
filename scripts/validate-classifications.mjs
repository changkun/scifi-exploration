import {fileURLToPath} from 'node:url';
import {validateRound96FixedHistoricalUpdate} from './round96-fixed-historical-update.mjs';
import {isV23NavigationReview,validateV23NavigationReview} from './classification-v23-navigation-evidence.mjs';
import {validateRound95GlobalKnowledgeDimensionCandidate} from './round95-global-knowledge-dimension-candidate-v1.mjs';
import {validateR94PreservedV22BibliographicFormReview} from './round94-preserved-v22-stars-gods-review-v1.mjs';
import {validateR94ModernScopedEditorialCandidate} from './round94-modern-scoped-editorial-candidate-v2.mjs';
import {resolveR93PreservedScopedCandidateLog} from './round93-preserved-scoped-candidate-log-v1.mjs';
import {isV22BibliographicFormReview,validateV22BibliographicFormReview} from './classification-v22-bibliographic-review-guard.mjs';
import {resolveR89PreservedScopedCandidateLog} from './round89-preserved-scoped-candidate-log.mjs';
import {validateR89FormHistoryCandidate} from './round89-form-history-validator.mjs';
import {validateR88AuthorCreationHistoryCandidate} from './round88-author-creation-history-validator.mjs';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {gunzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import {CLASSIFICATION_REGISTRY,classificationDetail,renderClassifications} from '../dist/assets/classifications.mjs';
import {DEFAULT_STATE,filterWorks,stateFromURL,searchFromState} from '../dist/assets/model.mjs';
const works=JSON.parse(gunzipSync(await readFile(new URL('../research/canonical-universe.json.gz',import.meta.url)))).works;
const byId=new Map(works.map(work=>[work.id,work]));
const registry=JSON.parse(await readFile(new URL('../research/classification-registry.json',import.meta.url),'utf8'));
// A historical bibliography-only discovery remains immutable when separate,
// later evidence adds core analysis. Validate that continuation independently.
const historicalHash = value => {
  const sort = value => Array.isArray(value) ? value.map(sort) : value && typeof value === 'object'
    ? Object.fromEntries(Object.keys(value).sort().map(key => [key, sort(value[key])])) : value;
  return createHash('sha256').update(JSON.stringify(sort(value))).digest('hex');
};
const historicalUpdates = new Map();
const updateInputs = [];
for (const input of registry.metadata.evidence_update_inputs || []) {
  assert(input.file.startsWith('research/classification-discovery-audits/') && !input.file.includes('..'));
  const bytes = await readFile(new URL('../' + input.file, import.meta.url));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), input.sha256);
  const audit = JSON.parse(bytes);
  assert.equal(audit.new_queries_from_annotation, 0);
  assert.equal(audit.new_core_from_annotation, 0);
  updateInputs.push(...audit.updates);
}
assert.deepEqual(registry.discovery_evidence_updates || [], updateInputs);
for (const update of updateInputs) {
  const candidate = registry.discovery_candidates.find(item => item.id === update.candidate_id);
  const evidence = candidate?.work_evidence.find(item => item.id === update.work_id);
  const work = byId.get(update.work_id);
  assert(candidate && evidence && work);
  if(validateRound96FixedHistoricalUpdate(update,{candidate,evidence,work,repoDir:fileURLToPath(new URL('../',import.meta.url))})){
    const key=update.candidate_id+':'+update.work_id;assert(!historicalUpdates.has(key));historicalUpdates.set(key,update);continue;
  }
  assert.equal(historicalHash(candidate), update.original_candidate_record_sha256);
  assert.equal(historicalHash(evidence), update.original_work_evidence_sha256);
  assert.equal(evidence.discovery_source_mode, update.original_source_mode);
  assert.equal(update.status, 'later_separate_core_analysis_added_unverified');
  for (const field of ['historical_bibliographic_scope_unchanged', 'classification_still_pending']) assert.equal(update[field], true);
  for (const field of ['independent_verification_upgrade', 'original_full_text_read']) assert.equal(update[field], false);
  const records = [];
  for (const ref of [update.analysis_input, update.log_input]) {
    assert(ref.file.startsWith('research/issue-input-snapshots/') && !ref.file.includes('..'));
    const bytes = await readFile(new URL('../' + ref.file, import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'), ref.file_sha256);
    assert(Number.isInteger(ref.record_index));
    const record = JSON.parse(bytes).records[ref.record_index];
    assert.equal(historicalHash(record), ref.record_sha256);
    assert.equal(record.id, work.id);
    assert.deepEqual(record.identity, update.identity);
    records.push(record);
  }
  const [analysis, log] = records;
  assert.deepEqual(update.identity, {title: work.title_zh, author: work.author});
  assert.equal(analysis.verification_status, 'knowledge_added_unverified');
  assert(analysis.fields.issue && analysis.fields.issue_facets.length >= 2);
  assert.deepEqual(analysis.sources, update.sources);
  assert.equal(analysis.source_evidence[0].support_scope, update.support_scope);
  assert.deepEqual(log.sources, analysis.source_evidence);
  assert(log.queries.length > 0);
  assert(update.sources.every(url => !evidence.sources.includes(url)));
  assert(analysis.source_evidence.every(item => item.reading_status === 'actually_read_support_scope_only'));
  const active = work.knowledge.assertions.find(item => item.input_file === update.active_analysis_input && item.id === work.id);
  const {input_file, ...activeRecord} = active || {};
  assert.deepEqual(activeRecord, analysis);
  assert.deepEqual(work.source_search_log.raw_reading_log, log);
  assert.equal(work.issue, analysis.fields.issue);
  assert.equal(work.completion.source_verified, false);
  const key = update.candidate_id + ':' + update.work_id;
  assert(!historicalUpdates.has(key));
  historicalUpdates.set(key, update);
}
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
    // A closed six-candidate route; the generic URL requirement below stays intact.
    if(validateRound95GlobalKnowledgeDimensionCandidate(candidate,evidence,work,{repoDir:fileURLToPath(new URL('../',import.meta.url))})){
      assert(renderClassifications(works).includes('data-work="'+evidence.id+'"'));
      assert(!work.classification_assignments.some(assignment=>assignment.label===candidate.proposed_label));
      assert.equal(work.completion.source_verified,false);
      continue;
    }
    assert(evidence.basis&&evidence.exact_support_scope&&evidence.sources.length);
    if(validateR94ModernScopedEditorialCandidate(candidate,evidence,work,{repoDir:new URL('../',import.meta.url)})){
      assert.equal(work.issue_analysis_status,'missing');
    }else if(validateR89FormHistoryCandidate(candidate,evidence,work,{repoDir:new URL('../',import.meta.url)})){
      assert(renderClassifications(works).includes('媒介与出版史 · 目标情节待核'));
    }else if(validateR88AuthorCreationHistoryCandidate(candidate,evidence,work,{repoDir:new URL('../',import.meta.url)})){
      assert(renderClassifications(works).includes('作者自传与创作背景 · 目标小说情节待核'));
    }else if(evidence.discovery_source_mode==='bibliographic_candidate_no_core_analysis'){
      assert.equal(evidence.actual_bibliographic_source_read,true);
      assert.equal(evidence.actual_content_source_read,false);
      assert.equal(evidence.knowledge_analysis,false);
      if (!historicalUpdates.has(candidate.id + ':' + evidence.id)) assert.equal(work.issue_analysis_status,'missing');
      else assert.notEqual(work.issue_analysis_status,'missing');
      assert(evidence.sources.every(url=>work.source_search_log?.materials_checked.some(material=>
        material.url===url && material.actual_bibliographic_source_read===true &&
        material.actual_content_source_read===false && material.reading_scope)));
    }else if(evidence.discovery_source_mode==='scoped_candidate_no_core_analysis'){
      const scopedCandidateLog=resolveR93PreservedScopedCandidateLog(candidate,evidence,work,{repoDir:new URL('../',import.meta.url)}).log;
      assert.equal(evidence.actual_content_source_read,true);
      assert.equal(evidence.knowledge_analysis,false);
      assert.equal(work.issue_analysis_status,'missing');
      assert(evidence.private_raw_source?.sha256);
      assert(evidence.sources.every(url=>work.source_search_log?.materials_checked.some(material=>
        material.url===url && material.actual_content_source_read===true &&
        material.knowledge_analysis===false && material.reading_scope &&
        material.scope_evidence_sha256===evidence.private_raw_source.sha256)));
      if(evidence.private_raw_source.provenance==='actual_search_return'){
        const proof=evidence.private_raw_source;
        assert(proof.actual_query&&proof.record_sha256&&Number.isInteger(proof.record_index));
        assert(scopedCandidateLog.queries.includes(proof.actual_query));
        assert(evidence.sources.every(url=>work.source_search_log.materials_checked.some(material=>
          material.url===url && material.scope_actual_query===proof.actual_query &&
          material.scope_record_sha256===proof.record_sha256 &&
          material.scope_evidence_sha256===proof.sha256)));
      }else{
        assert(evidence.sources.every(url=>scopedCandidateLog.direct_page_reads?.some(read=>
          read.url===url && read.sha256===evidence.private_raw_source.sha256 &&
          read.outcome==='actually_read_limited_page_return_not_full_original')));
      }
    }else{
      assert(evidence.sources.every(url=>work.knowledge?.sources.includes(url)));
    }
    assert(renderClassifications(works).includes('data-work="'+evidence.id+'"'));
    assert(!work.classification_assignments.some(assignment=>assignment.label===candidate.proposed_label));
    assert.equal(work.completion.source_verified,false);
  }
}
assert(renderClassifications(works).includes('未按新维度整理'));
assert(!classificationDetail({...sample,classification_assignments:[{...sample.classification_assignments[0],basis:'<script>bad</script>'}]}).includes('<script>'));
console.log('PASS versioned registry, exact evidence, multi-axis intersections, shareable URLs, extensible values, identity corrections and escaped UI');

// Appended to the existing registry validator. Original candidate history and
// original promoted-discovery checks remain intact; reviews are additive.
const canonicalRecordHash = value => {
  const sorted = value => Array.isArray(value) ? value.map(sorted) : value && typeof value === 'object'
    ? Object.fromEntries(Object.keys(value).sort().map(key => [key, sorted(value[key])])) : value;
  return createHash('sha256').update(JSON.stringify(sorted(value))).digest('hex');
};
const resolveRecordPointer = (value, pointer) => {
  assert(pointer.startsWith('$'));
  for (const [, key, index] of pointer.slice(1).matchAll(/\.([A-Za-z_][A-Za-z_0-9]*)|\[(\d+)\]/g)) {
    value = key ? value[key] : value[Number(index)];
  }
  return value;
};
const reviewDocuments = new Map();
for (const input of registry.metadata.review_inputs || []) {
  const bytes = await readFile(new URL('../' + input.file, import.meta.url));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), input.sha256);
  reviewDocuments.set(input.file, JSON.parse(bytes));
}
const latestReviews = new Map();
for (const review of registry.discovery_reviews || []) {
  assert.equal(review.status, 'promoted_unverified');
  assert.equal(review.independent_verification_upgrade, false);
  assert.equal(review.core_result_unchanged, true);
  const candidate = registry.discovery_candidates.find(item => item.id === review.candidate_id);
  assert(candidate);
  assert.equal(canonicalRecordHash(candidate), review.original_candidate_record_sha256);
  const proposal = reviewDocuments.get(review.review_input)?.proposals.find(item => item.category_id === review.category_id);
  assert(proposal);
  const original = proposal.work_memberships.find(item => item.id === review.work_id && item.original_candidate_id === review.candidate_id);
  assert(original);
  const category = registry.categories.find(item => item.id === review.category_id);
  assert.equal(category.label, proposal.label);
  assert.equal(category.definition, proposal.definition);
  assert.deepEqual(category.boundaries, proposal.boundaries);
  assert.deepEqual(category.retained_subtypes, proposal.retained_subtypes);
  const member = category.members.find(item => item.work_id === review.work_id);
  const work = byId.get(review.work_id);
  assert.deepEqual(original.identity, {title: work.title_zh, author: work.author});
  assert.equal(member.title_at_review, original.identity.title);
  assert.equal(member.author_at_review, original.identity.author);
  assert.equal(member.basis, original.membership_basis);
  assert.equal(member.evidence_scope, original.adoption_support_scope);
  assert.equal(member.membership_extent, original.membership_extent);
  assert.equal(member.membership_boundary, original.membership_boundary);
  assert.deepEqual(member.sources, original.source_urls);
  assert.equal(review.support_scope, member.evidence_scope);
  assert.equal(review.membership_extent, member.membership_extent);
  assert.equal(work.issue_analysis_status, original.canonical_core_status);
  assert.equal(work.completion.source_verified, false);
  for (const ref of [...original.original_candidate_inputs, ...original.original_analysis_inputs, original.original_log_input]) {
    assert(ref.file.startsWith('research/') && !ref.file.includes('..'));
    const bytes = await readFile(new URL('../' + ref.file, import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'), ref.file_sha256);
    const record = resolveRecordPointer(JSON.parse(bytes), ref.record_pointer);
    assert.equal(canonicalRecordHash(record), ref.record_sha256);
    if (original.original_analysis_inputs.includes(ref)) {
      assert.deepEqual(record.identity, original.identity);
      assert.equal(record.fields.issue, work.issue);
    }
    if (ref === original.original_log_input) {
      assert.equal(record.id, work.id);
      assert.deepEqual(record.identity, original.identity);
    }
  }
  if (isV23NavigationReview(review)) {
    validateV23NavigationReview(review,{repoDir:new URL('../',import.meta.url).pathname,registry,worksById:byId,phase:'post'});
  } else if (isV22BibliographicFormReview(review)) {
    await validateR94PreservedV22BibliographicFormReview(review,{repoDir:new URL('../',import.meta.url).pathname,candidate,category,original,member,work});
  } else if (review.evidence_mode === 'scoped_form_source_without_core') {
    assert.equal(category.axis, 'form');
    assert.equal(work.issue_analysis_status, 'missing');
    assert.equal(original.original_analysis_inputs.length, 0);
    const evidence = candidate.work_evidence.find(item => item.id === work.id);
    assert.equal(evidence.discovery_source_mode, 'scoped_candidate_no_core_analysis');
    assert.equal(evidence.actual_content_source_read, true);
    assert.equal(evidence.knowledge_analysis, false);
    assert(member.sources.every(url => work.source_search_log.materials_checked.some(material =>
      material.url === url && material.actual_content_source_read === true &&
      material.knowledge_analysis === false && material.reading_scope &&
      material.scope_evidence_sha256 === evidence.private_raw_source.sha256)));
  } else {
    assert.equal(review.evidence_mode, 'frozen_core_scoped_interpretation');
    assert(original.original_analysis_inputs.length);
    assert(member.sources.every(url => work.knowledge.sources.includes(url)));
  }
  assert(classificationDetail(work).includes('本条适用范围'));
  assert(work.classification_assignments.some(item => item.id === category.id && item.membership_boundary === member.membership_boundary));
  latestReviews.set(review.candidate_id, review);
}
if (registry.metadata.previous_version) {
  const previous = JSON.parse(await readFile(new URL('../' + registry.metadata.previous_version.file, import.meta.url)));
  assert.deepEqual((registry.discovery_reviews || []).slice(0, (previous.discovery_reviews || []).length), previous.discovery_reviews || []);
}
const currentlyPending = registry.discovery_candidates.filter(candidate => !latestReviews.has(candidate.id));
assert(renderClassifications(works).includes(currentlyPending.length + ' 个待比较方向'));
assert(renderClassifications(works).includes('分类边界与细分机制'));
console.log('PASS additive discovery reviews, frozen public input hashes, exact memberships and visible work/member/version/project boundaries');
