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
  const raw = sourceSearchLog?.raw_reading_log;
  if (record.analysis_basis !== 'existing_knowledge_unverified' || record.verification_status !== 'knowledge_added_unverified' || record.sources.length || !record.field_notes?.spatial_primary?.includes('existing knowledge')) fail();
  if (!sourceSearchLog || !sameIdentity(sourceSearchLog) || sourceSearchLog.analysis_basis !== 'existing_work_specific_knowledge_unverified' || sourceSearchLog.actual_search_performed !== false || sourceSearchLog.queries.length || sourceSearchLog.materials_checked.length) fail();
  if (!raw || !sameIdentity(raw) || raw.analysis_basis !== 'existing_work_specific_knowledge_unverified' || raw.queries?.length || raw.sources?.length || raw.actual_search_performed === true) fail();
  if (!issueAssertions.some(assertion => sameIdentity(assertion) && assertion.fields?.issue && Array.isArray(assertion.sources) && !assertion.sources.length && assertion.field_notes?.issue?.includes('existing knowledge') && assertion.verification_status === 'knowledge_added_unverified')) fail();
  return 'existing_knowledge_unverified';
}
