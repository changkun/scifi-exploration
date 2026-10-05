import {createHash} from 'node:crypto';

// A spatial assertion may come from a scoped reading or explicit existing
// knowledge. The latter must never manufacture a source or a search attempt.
export function validateSpatialEvidence(record, {issueAssertions = [], sourceSearchLog} = {}) {
  const fail = () => { throw new Error('Spatial evidence or knowledge provenance absent: ' + record.id); };
  if (!Array.isArray(record.sources) || !Array.isArray(record.source_evidence)) fail();
  if (record.source_evidence.length) {
    if (record.source_evidence.some(evidence => !evidence.url?.startsWith('https://') || !evidence.support_scope?.trim() || !record.sources.includes(evidence.url))) fail();
    return 'scoped_reading';
  }
  const sameIdentity = assertion => assertion.id === record.id && JSON.stringify(assertion.identity) === JSON.stringify(record.identity);
  const sorted = value => Array.isArray(value) ? value.map(sorted) : value && typeof value === 'object' ?
    Object.fromEntries(Object.keys(value).sort().map(key => [key, sorted(value[key])])) : value;
  const matchesFrozenAssertion = assertion => {
    const {input_file, ...original} = assertion;
    // Consolidated batches use their batch path, while the provenance names
    // the archived contributor. Their exact record content must be identical.
    return createHash('sha256').update(JSON.stringify(sorted(original))).digest('hex') === record.source_analysis_record_sha256;
  };
  // A later real query can coexist with an earlier zero-query judgment.
  // It does not retroactively become support for that judgment.
  const currentRaw = sourceSearchLog?.raw_reading_log;
  if (currentRaw?.status === 'skipped_already_analyzed') {
    if (!sameIdentity(sourceSearchLog) || !sameIdentity(currentRaw) ||
        sourceSearchLog.issue_result !== 'existing_analysis_retained_no_new_core' ||
        currentRaw.analysis_basis !== 'identity_and_existing_completion_checked' ||
        !currentRaw.queries?.length || currentRaw.failure_count !== 0) fail();
    const previous = sourceSearchLog.previous_attempts?.find(attempt =>
      sameIdentity(attempt) && attempt.analysis_basis === 'existing_work_specific_knowledge_unverified' &&
      attempt.actual_search_performed === false && !attempt.queries?.length && !attempt.materials_checked?.length);
    if (!previous) fail();
    const actualQueries = currentRaw.queries.map(query => typeof query === 'string' ? query : query.query);
    if (sourceSearchLog.queries.length !== new Set(actualQueries).size ||
        !sourceSearchLog.queries.every(query => actualQueries.includes(query)) ||
        sourceSearchLog.materials_checked.length || sourceSearchLog.actual_search_performed === false) fail();
    sourceSearchLog = previous;
  }
  const raw = sourceSearchLog?.raw_reading_log;
  // A zero-query knowledge judgment can follow an unsuccessful catalogue
  // lookup. The retained history is not evidence for the new placement.
  if (sourceSearchLog?.previous_attempts?.length &&
      raw?.analysis_basis === 'existing_work_specific_knowledge_unverified' &&
      !raw.queries?.length && !raw.sources?.length && !raw.materials_checked?.length &&
      raw.actual_search_performed !== true) {
    const previous = sourceSearchLog.previous_attempts.at(-1);
    if (!sameIdentity(raw) || !sameIdentity(previous) ||
        sourceSearchLog.actual_search_performed !== false ||
        JSON.stringify(sourceSearchLog.queries) !== JSON.stringify(previous.queries) ||
        JSON.stringify(sourceSearchLog.materials_checked) !== JSON.stringify(previous.materials_checked)) fail();
    sourceSearchLog = {...sourceSearchLog, queries: [], materials_checked: []};
  }
  const note = record.field_notes?.spatial_primary || '';
  const explicitKnowledge = note.includes('existing knowledge') || /准确(?:具体作品|本篇|本书|此卷)?已有知识|明确已有知识|准确熟悉本书/.test(note);
  if (record.analysis_basis !== 'existing_knowledge_unverified' || record.verification_status !== 'knowledge_added_unverified' || record.sources.length || !explicitKnowledge) fail();
  if (record.knowledge_provenance_mode === 'existing_knowledge_from_frozen_analysis') {
    // The older frozen input used a Chinese knowledge scope rather than an
    // analysis_basis token. Preserve that raw input and its previous attempts.
    if (record.integration_relation !== 'published_core' ||
        !record.source_analysis_archive?.startsWith('research/issue-input-snapshots/') ||
        !record.source_analysis_sha256 || !record.source_analysis_record_sha256 ||
        !sourceSearchLog || !sameIdentity(sourceSearchLog) || !raw || !sameIdentity(raw) ||
        raw.attempt_state !== 'content_read_quick_retry' || raw.issue_result !== 'added_unverified' ||
        raw.actual_search_performed !== false || raw.actual_search_count !== 0 || raw.actual_open_count !== 0 ||
        raw.queries?.length || raw.materials_checked?.length || raw.sources?.length ||
        raw.reading_scope !== '确切作品既有知识；零查询、零打开、未读原作全文。' ||
        sourceSearchLog.actual_search_performed !== false) fail();
    const previous = sourceSearchLog.previous_attempts?.at(-1);
    if (!previous || !sameIdentity(previous) ||
        JSON.stringify(raw.prior_source_log?.queries) !== JSON.stringify(previous.queries) ||
        JSON.stringify(raw.prior_source_log?.materials_checked) !== JSON.stringify(previous.materials_checked) ||
        JSON.stringify(sourceSearchLog.queries) !== JSON.stringify(previous.queries) ||
        JSON.stringify(sourceSearchLog.materials_checked) !== JSON.stringify(previous.materials_checked)) fail();
    if (!issueAssertions.some(assertion => sameIdentity(assertion) && assertion.fields?.issue &&
        assertion.verification_status === 'knowledge_added_unverified' && !assertion.sources?.length &&
        assertion.field_notes?.issue?.startsWith('原创解释基于既有知识，未读本轮原作全文；'))) fail();
    return 'existing_knowledge_unverified';
  }
  if (record.knowledge_provenance_mode === 'existing_knowledge_from_original_retry') {
    // The original lane used its own explicit zero-query scope. Check it against
    // the exact archived assertion while retaining the previous failed lookup.
    if (record.integration_relation !== 'published_core' ||
        !record.source_analysis_archive?.startsWith('research/issue-input-snapshots/') ||
        !record.source_analysis_sha256 || !record.source_analysis_record_sha256 ||
        !record.frozen_knowledge_reading_scope || !record.frozen_knowledge_issue_note ||
        !sourceSearchLog || !sameIdentity(sourceSearchLog) || !raw || !sameIdentity(raw) ||
        raw.attempt_state !== 'existing_knowledge_quick_retry' || raw.issue_result !== 'added_unverified' ||
        raw.actual_search_performed !== false || raw.actual_search_count !== 0 || raw.actual_open_count !== 0 ||
        raw.queries?.length || raw.materials_checked?.length || raw.sources?.length ||
        raw.reading_scope !== record.frozen_knowledge_reading_scope ||
        sourceSearchLog.actual_search_performed !== false) fail();
    const previous = sourceSearchLog.previous_attempts?.at(-1);
    if (!previous || !sameIdentity(previous) ||
        JSON.stringify(raw.prior_source_log?.queries) !== JSON.stringify(previous.queries) ||
        JSON.stringify(raw.prior_source_log?.materials_checked) !== JSON.stringify(previous.materials_checked) ||
        JSON.stringify(sourceSearchLog.queries) !== JSON.stringify(previous.queries) ||
        JSON.stringify(sourceSearchLog.materials_checked) !== JSON.stringify(previous.materials_checked)) fail();
    if (!issueAssertions.some(assertion => sameIdentity(assertion) && assertion.fields?.issue &&
        matchesFrozenAssertion(assertion) &&
        assertion.verification_status === 'knowledge_added_unverified' && !assertion.sources?.length &&
        assertion.field_notes?.issue === record.frozen_knowledge_issue_note)) fail();
    return 'existing_knowledge_unverified';
  }
  if (record.knowledge_provenance_mode === 'existing_knowledge_from_confirmed_member') {
    if (!record.field_notes.evidence_provenance || record.integration_relation !== 'same_batch_core' ||
        !record.source_analysis_archive?.startsWith('research/issue-input-snapshots/') ||
        !record.source_analysis_sha256 || !record.source_analysis_record_sha256 ||
        !sourceSearchLog || !sameIdentity(sourceSearchLog) || !raw || !sameIdentity(raw) ||
        raw.analysis_basis !== 'existing_confirmed_collection_member_knowledge_unverified' ||
        raw.queries?.length || raw.sources?.length || raw.materials_checked?.length ||
        raw.actual_search_performed === true || sourceSearchLog.actual_search_performed !== false) fail();
    const previous = sourceSearchLog.previous_attempts?.at(-1);
    if (!previous || !sameIdentity(previous) ||
        JSON.stringify(raw.prior_source_log?.queries) !== JSON.stringify(previous.queries) ||
        JSON.stringify(raw.prior_source_log?.materials_checked) !== JSON.stringify(previous.materials_checked) ||
        JSON.stringify(sourceSearchLog.queries) !== JSON.stringify(previous.queries) ||
        JSON.stringify(sourceSearchLog.materials_checked) !== JSON.stringify(previous.materials_checked)) fail();
    if (!issueAssertions.some(assertion => sameIdentity(assertion) && assertion.fields?.issue &&
        matchesFrozenAssertion(assertion) &&
        assertion.verification_status === 'knowledge_added_unverified' && !assertion.sources?.length &&
        assertion.field_notes?.issue?.includes('existing knowledge'))) fail();
    return 'existing_knowledge_unverified';
  }
  if (record.knowledge_provenance_mode === 'existing_knowledge_after_nonadopted_query') {
    if (!record.field_notes.evidence_provenance || record.integration_relation !== 'same_batch_core' ||
        !record.source_analysis_archive?.startsWith('research/issue-input-snapshots/') ||
        !record.source_analysis_sha256 || !record.source_analysis_record_sha256 ||
        !sourceSearchLog || !sameIdentity(sourceSearchLog) || !raw || !sameIdentity(raw) ||
        raw.analysis_basis !== 'existing_work_specific_knowledge_after_nonadopted_query_unverified' ||
        !raw.queries?.length || raw.sources?.length || raw.materials_checked?.length ||
        raw.actual_search_performed === false || sourceSearchLog.actual_search_performed === false) fail();
    const previous = sourceSearchLog.previous_attempts?.at(-1);
    const queries = [...new Set([...(previous?.queries || []), ...raw.queries])];
    if (!previous || !sameIdentity(previous) ||
        JSON.stringify(raw.prior_source_log?.queries) !== JSON.stringify(previous.queries) ||
        JSON.stringify(raw.prior_source_log?.materials_checked) !== JSON.stringify(previous.materials_checked) ||
        JSON.stringify(sourceSearchLog.queries) !== JSON.stringify(queries) ||
        JSON.stringify(sourceSearchLog.materials_checked) !== JSON.stringify(previous.materials_checked)) fail();
    if (!issueAssertions.some(assertion => sameIdentity(assertion) && assertion.fields?.issue &&
        matchesFrozenAssertion(assertion) &&
        assertion.verification_status === 'knowledge_added_unverified' && !assertion.sources?.length &&
        assertion.field_notes?.issue?.startsWith('existing knowledge；'))) fail();
    return 'existing_knowledge_unverified';
  }
  if (record.knowledge_provenance_mode === 'existing_knowledge_after_scoped_lookup') {
    if (!record.field_notes.evidence_provenance || !sourceSearchLog || !sameIdentity(sourceSearchLog) || !raw || !sameIdentity(raw)) fail();
    if (!raw.queries?.length || raw.actual_search_performed === false || sourceSearchLog.actual_search_performed === false || !raw.queries.every(query => sourceSearchLog.queries.includes(typeof query === 'string' ? query : query.query))) fail();
    const materialUrls = new Set(sourceSearchLog.materials_checked.map(material => material.url));
    if (!issueAssertions.some(assertion => sameIdentity(assertion) && assertion.fields?.issue && assertion.verification_status === 'knowledge_added_unverified' && assertion.sources?.length && assertion.sources.every(url => materialUrls.has(url)))) fail();
    return 'existing_knowledge_after_scoped_lookup_unverified';
  }
  if (!sourceSearchLog || !sameIdentity(sourceSearchLog) || sourceSearchLog.analysis_basis !== 'existing_work_specific_knowledge_unverified' || sourceSearchLog.actual_search_performed !== false || sourceSearchLog.queries.length || sourceSearchLog.materials_checked.length) fail();
  if (!raw || !sameIdentity(raw) || raw.analysis_basis !== 'existing_work_specific_knowledge_unverified' || raw.queries?.length || raw.sources?.length || raw.actual_search_performed === true) fail();
  const explicitIssueKnowledge = assertion => assertion.field_notes?.issue?.includes('existing knowledge') ||
    assertion.field_notes?.issue?.startsWith('原创解释基于既有知识，未读本轮原作全文；');
  if (!issueAssertions.some(assertion => sameIdentity(assertion) && assertion.fields?.issue && Array.isArray(assertion.sources) && !assertion.sources.length && explicitIssueKnowledge(assertion) && assertion.verification_status === 'knowledge_added_unverified')) fail();
  return 'existing_knowledge_unverified';
}
