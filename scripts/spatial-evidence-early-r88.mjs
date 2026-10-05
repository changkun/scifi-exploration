import {createHash} from 'node:crypto';

// A spatial assertion may come from a scoped reading or explicit existing
// knowledge. The latter must never manufacture a source or a search attempt.
export function validateSpatialEvidence(record, {issueAssertions = [], sourceSearchLog, currentWork, evidenceDir, repoDir, requireFrozenSpatialArchive = false} = {}) {
  // R88 is an isolated extension bound to exactly three newly frozen inputs.
  // The R87 whitelist, modes and every old branch below remain unchanged.
  if (Object.hasOwn(ROUND88_SPATIAL_INPUTS, record.source_spatial_input_file)) {
    if (!currentWork || !equal(issueAssertions,currentWork.knowledge?.assertions) ||
        !equal(sourceSearchLog,currentWork.source_search_log)) throw new Error('R88 canonical context mismatch: '+record.id);
    const basis=validateRound88BoundFrozenSpatialInput(record,{evidenceDir,repoDir});
    if (basis==='exact_existing_knowledge') return validateRound88Knowledge(record,{currentWork,evidenceDir,repoDir});
    return validateRound88ScopedMaterial(record,{currentWork,evidenceDir,repoDir});
  }
  // Isolated new modes: old branches below remain byte-for-byte unchanged.
  if (ORIGINAL_FIRST_PASS_MODES.has(record.knowledge_provenance_mode) ||
      Object.hasOwn(ROUND87_SPATIAL_INPUTS,record.source_spatial_input_file) ||
      (record.integration_relation==='published_core' && (record.spatial_basis_mode!==undefined ||
       record.source_evidence?.some(e=>e.type==='existing_knowledge_spatial_with_original_scoped_lookup')))) {
    if (!currentWork || !equal(issueAssertions,currentWork.knowledge?.assertions) ||
        !equal(sourceSearchLog,currentWork.source_search_log)) throw new Error('New-mode canonical context mismatch: '+record.id);
    const boundBasis=validateBoundFrozenSpatialInput(record,{evidenceDir,repoDir,requireFrozenSpatialArchive});
    if (boundBasis==='exact_existing_knowledge') return validateOriginalFirstPassKnowledge(record,{currentWork,evidenceDir,repoDir});
    if (record.knowledge_provenance_mode!==undefined) throw new Error('Unexpected mode on bound scoped material: '+record.id);
  }
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

// Private proposal only. No change to scripts/spatial-evidence.mjs or old modes.
// Dispatch these explicit modes BEFORE the generic source_evidence early return.
import {readFileSync, realpathSync} from 'node:fs';
import {join, basename, sep} from 'node:path';

export const ORIGINAL_FIRST_PASS_MODES = new Set([
  'existing_knowledge_from_original_first_pass',
  'existing_knowledge_after_nonadopted_first_pass_query',
  'existing_knowledge_with_original_scoped_material',
]);
const OWNERS = {
  'recent-first-lane-3.json':'b71a463b87febbb5321b5644a08b5f2464d7138ebafb2f3ceeea9a8d0a37fbdc',
  'undated-first-lane-3.json':'0abff0eb8d244017f248d695384df09678939f77caf2c2b3bef9d27991afd49a',
  'known-year-first-pass-lane-3.json':'b193cb6e5cbf290ee699db0a540b6b05c6c1855dccf59651ecb3eacfaa865e0c',
  'quick-retry-lane-3.json':'ac16324a0ef149c7042828b0988fb133af9f30d08c6b8bc5b1a3e5be26af026c',
};
export const sorted = value => Array.isArray(value) ? value.map(sorted) :
  value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(k => [k, sorted(value[k])])) : value;
export const recordSha = value => createHash('sha256').update(JSON.stringify(sorted(value))).digest('hex');
const byteSha = bytes => createHash('sha256').update(bytes).digest('hex');
const equal = (a,b) => JSON.stringify(sorted(a)) === JSON.stringify(sorted(b));
const isEmptyArray = v => Array.isArray(v) && v.length===0;
const knowledgeNote = v => typeof v==='string' && /existing knowledge|既有知识|已有知识/.test(v);
const counters = ['actual_search_performed','actual_search_count','actual_open_count'];
const counterFields = r => Object.fromEntries(counters.filter(k => Object.hasOwn(r,k)).map(k => [k,r[k]]));
const frozenState = d => ['frozen','frozen_checkpoint'].includes(d.metadata?.status);
const canonicalScope = w => ({id:w.id,title_zh:w.title_zh,author:w.author,form:w.form ?? null});
const historyNodes = log => !log ? [] : [log,...(log.previous_attempts || []).flatMap(historyNodes)];

// The archive/private files are read by this guard, rather than trusting a
// caller-provided object or claimed digest. Trusted roots come from integration.
function frozenPair(record, kind, evidenceDir, repoDir, fail) {
  const file = record[`source_${kind}_file`];
  if (typeof file!=='string' || basename(file)!==file || !file.endsWith('.json')) fail(`${kind} filename`);
  const archive = `research/issue-input-snapshots/${file}`;
  if (record[`source_${kind}_archive`]!==archive) fail(`${kind} archive path`);
  const repo=realpathSync(repoDir), archivePath=realpathSync(join(repo,archive));
  if (!archivePath.startsWith(repo+sep+'research'+sep+'issue-input-snapshots'+sep)) fail(`${kind} archive path traversal`);
  const bytes=readFileSync(archivePath);
  if (byteSha(bytes)!==record[`source_${kind}_sha256`]) fail(`${kind} archive byte hash`);
  if (evidenceDir) {
    const root=realpathSync(evidenceDir), sourcePath=realpathSync(join(root,file));
    if (!sourcePath.startsWith(root+sep)) fail(`${kind} private path traversal`);
    if (!readFileSync(sourcePath).equals(bytes)) fail(`${kind} private/archive byte mismatch`);
  }
  const doc = JSON.parse(bytes.toString('utf8'));
  if (!frozenState(doc) || !Array.isArray(doc.records)) fail(`${kind} not frozen`);
  const matches = doc.records.filter(r => r.id===record.id);
  if (matches.length!==1 || recordSha(matches[0])!==record[`source_${kind}_record_sha256`]) fail(`${kind} record hash`);
  return {raw:matches[0],doc};
}

export function validateOriginalFirstPassKnowledge(record, {currentWork,evidenceDir,repoDir}={}) {
  const fail = reason => {throw new Error(`Original first-pass knowledge rejected (${reason}): ${record.id}`);};
  if (!ORIGINAL_FIRST_PASS_MODES.has(record.knowledge_provenance_mode)) fail('mode');
  if (!currentWork || currentWork.id!==record.id || record.integration_relation!=='published_core' ||
      currentWork.issue_analysis_status==='missing' || !repoDir) fail('published core');
  if (record.analysis_basis!=='existing_knowledge_unverified' || record.spatial_basis_mode!=='exact_existing_knowledge' ||
      record.verification_status!=='knowledge_added_unverified' || !record.field_notes?.spatial_primary?.includes('existing knowledge') ||
      !record.field_notes?.evidence_provenance?.trim()) fail('explicit unverified knowledge');
  if (!equal(record.current_identity,{title:currentWork.title_zh,author:currentWork.author}) ||
      !equal(record.frozen_canonical_identity_scope,canonicalScope(currentWork))) fail('current identity/grain');
  if (record.delegation_file || record.delegation_sha256) fail('invented delegation');
  const {raw:a} = frozenPair(record,'analysis',evidenceDir,repoDir,fail);
  const {raw:l} = frozenPair(record,'log',evidenceDir,repoDir,fail);
  if (!equal(a.identity,record.identity) || !equal(l.identity,record.identity) ||
      a.verification_status!=='knowledge_added_unverified' || !a.fields?.issue ||
      !Array.isArray(a.fields.issue_facets) || a.fields.issue_facets.length<2 ||
      typeof a.field_notes?.issue!=='string' || !a.field_notes.issue.trim()) fail('original analysis identity/scoped explanation');
  if (currentWork.issue!==a.fields.issue || !currentWork.knowledge?.assertions?.some(x => {
    const {input_file,...raw} = x;
    return input_file===record.source_core_assertion_file && equal(raw,a);
  })) fail('exact active scoped assertion');
  if (!equal(record.identity_caveat,a.identity_caveat) || !equal(record.original_reading_log,l) ||
      record.original_analysis_basis!==(a.analysis_basis ?? null) || record.source_scope!==l.reading_scope ||
      record.frozen_knowledge_reading_scope!==l.reading_scope || record.frozen_knowledge_issue_note!==a.field_notes.issue ||
      typeof l.reading_scope!=='string' || !l.reading_scope.trim()) fail('original scope/caveat');
  if (!equal(record.original_counter_fields,counterFields(l))) fail('counter presence/value changed');
  if (!equal(record.preserved_source_search_log,currentWork.source_search_log) ||
      record.preserved_source_search_log_sha256!==recordSha(currentWork.source_search_log)) fail('deleted/changed current history');
  const nodes = historyNodes(currentWork.source_search_log);
  if (!nodes.some(n => n.attempt_input===record.source_log_file && equal(n.raw_reading_log,l))) fail('raw log absent from canonical history');
  const refs = l.previous_attempts_preserved || [];
  if (!Array.isArray(refs) || !Array.isArray(record.preserved_prior_archive_proofs) ||
      !equal(refs,record.preserved_prior_archive_proofs.map(p=>p.file))) fail('prior-reference loss');
  for (const p of record.preserved_prior_archive_proofs) {
    const previous = frozenPair({id:record.id,source_log_file:p.file,source_log_archive:p.archive,
      source_log_sha256:p.sha256,source_log_record_sha256:p.record_sha256},'log',evidenceDir,repoDir,fail).raw;
    if (!equal(previous.identity,a.identity) || !nodes.some(n => n.attempt_input===p.file && equal(n.raw_reading_log,previous))) fail('prior raw history changed');
  }
  const ownerName=record.original_ownership_file;
  if (!OWNERS[ownerName] || record.original_ownership_sha256!==OWNERS[ownerName] ||
      !Number.isInteger(record.original_ownership_index) || record.original_ownership_index!==record.ownership_index) fail('ownership declaration');
  const ownerBytes=readFileSync(join(repoDir,'research/issue-input-snapshots',ownerName));
  if (evidenceDir && !readFileSync(join(evidenceDir,ownerName)).equals(ownerBytes)) fail('ownership private/archive byte mismatch');
  if (byteSha(ownerBytes)!==OWNERS[ownerName] ||
      JSON.parse(ownerBytes.toString('utf8')).records[record.original_ownership_index]?.id!==record.id) fail('ownership exact row');
  if (!Array.isArray(record.sources) || !equal(record.sources,a.sources) || !Array.isArray(record.source_evidence) ||
      !Array.isArray(a.source_evidence) || !Array.isArray(l.queries) || !Array.isArray(l.materials_checked)) fail('source/query/material arrays');
  if (l.issue_result!=='added_unverified') fail('original issue result');
  if (record.knowledge_provenance_mode==='existing_knowledge_from_original_first_pass') {
    if (!['existing_knowledge_unverified','existing_knowledge'].includes(a.analysis_basis) || !knowledgeNote(a.field_notes.issue) || !knowledgeNote(l.reading_scope)) fail('original explicit zero-query knowledge');
    const z=record.zero_query_provenance;
    if (!z || !equal(Object.keys(z).sort(),['note','original_attempt_state','original_materials_checked','original_queries','original_sources','source_scope']) ||
        !equal(z.original_queries,l.queries) || !equal(z.original_materials_checked,l.materials_checked) ||
        !equal(z.original_sources,a.sources) || z.original_attempt_state!==l.attempt_state ||
        z.source_scope!==l.reading_scope || !knowledgeNote(z.note)) fail('duplicated zero-query scope/counters');
    if (!['existing_knowledge_first_pass','existing_knowledge_after_deferred','existing_knowledge_added'].includes(l.attempt_state) ||
        !isEmptyArray(l.queries) || !isEmptyArray(l.materials_checked) || !isEmptyArray(a.sources) ||
        !isEmptyArray(a.source_evidence) || !isEmptyArray(record.source_evidence) ||
        (Object.hasOwn(l,'sources') && !isEmptyArray(l.sources)) ||
        (Object.hasOwn(l,'actual_search_performed') && l.actual_search_performed!==false) ||
        (Object.hasOwn(l,'actual_search_count') && l.actual_search_count!==0) ||
        (Object.hasOwn(l,'actual_open_count') && l.actual_open_count!==0)) fail('original zero-query state');
  } else if (record.knowledge_provenance_mode==='existing_knowledge_after_nonadopted_first_pass_query') {
    if (a.analysis_basis!=='existing_knowledge_unverified' || !knowledgeNote(a.field_notes.issue) || !knowledgeNote(l.reading_scope)) fail('original explicit nonadopted-query knowledge');
    if (l.attempt_state!=='existing_knowledge_after_exact_query' || !l.queries.length ||
        !isEmptyArray(l.materials_checked) || !isEmptyArray(a.sources) || !isEmptyArray(a.source_evidence) ||
        !isEmptyArray(record.source_evidence) || l.actual_search_performed===false ||
        !a.field_notes.issue.includes('本轮查询没有采用剧情来源')) fail('nonadopted query boundary');
  } else {
    // Preserved old identity/premise links never bypass the knowledge guard.
    if (!['content_read_first_pass','existing_knowledge_with_bibliographic_lookup','content_read_quick_retry','existing_knowledge_first_pass','source_read_analysis_added','metadata_read_existing_knowledge_analysis_added'].includes(l.attempt_state) || !l.materials_checked.length ||
        record.source_evidence.length!==a.source_evidence.length ||
        a.source_evidence.some(e => !l.materials_checked.some(m=>m.url===e.url))) fail('limited old lookup boundary');
    if (!a.sources.length && (a.source_evidence.length || record.source_evidence.length ||
        l.attempt_state!=='existing_knowledge_first_pass' || !l.queries.length ||
        a.analysis_basis!=='existing_knowledge_unverified' || !knowledgeNote(a.field_notes.issue) ||
        !knowledgeNote(l.reading_scope))) fail('nonadopted material retained without adopted source');
    for (const e of record.source_evidence) {
      if (!e.url?.startsWith('https://') || !record.sources.includes(e.url) ||
          !a.source_evidence.some(original => equal(original,e.original_source_evidence)) ||
          e.type!=='existing_knowledge_spatial_with_original_scoped_lookup' ||
          e.supports_spatial_independently!==false || e.new_read_performed!==false || e.no_new_network_read!==true ||
          e.original_link_read_status!==originalLinkReadStatus(e.original_source_evidence?.type) ||
          e.spatial_basis!=='exact_existing_knowledge' || !knowledgeNote(e.support_scope)) fail('old URL promoted to spatial reading');
    }
  }
  // No missing counter is synthesized, including in normalized history. The
  // original canonical aggregate may retain earlier catalogue-only material.
  return 'existing_knowledge_unverified';
}


const ROUND87_SPATIAL_INPUTS = {
  'early-published-spatial-expansion-round1.json':'f21277401e96b44bd5a57cc8beb5d5391f9c788caf4c97dd97b7006c2f3f5a04',
  'early-published-spatial-expansion-round2.json':'ff11ce2759823d1c7e57f354f0643b2ff58a7d38e016f742f14c588bbdc661b0',
  'early-published-spatial-expansion-round3.json':'c85e15d14b0565f33d3a84f0346bb9a2cfc17803c07f18c9ac8f5286868b87bf',
};
const SCOPE_ADAPTER_FILE='early-published-spatial-scope-adapter-round1.json';
const SCOPE_ADAPTER_SHA='cc46c468acfd76750c038f20334f4d947ed91cbbf75606a5c19fc65590b81df2';
const CORRECTED_SCOPE_IDS=new Set(['Q103749522','Q15731773','Q28127814','Q4635159','Q2061455','Q7744376','Q107366124']);
export function originalLinkReadStatus(type) {
  if (type==='platform_episode_description_and_existing_knowledge') return 'limited_episode_identity_and_premise_search_return';
  if (['publisher_author_bibliography_only','contents_or_identity_only_plot_existing_knowledge','community_comics_bibliography_search_excerpt'].includes(type)) return 'identity_or_contents_only_lookup';
  if (type==='community_work_description_local_dump') return 'saved_community_work_description_as_recorded';
  return 'original_scoped_material_as_recorded';
}
function deriveKnowledgeEvidence(evidence) {
  return evidence.map(e=>({...e,type:'existing_knowledge_spatial_with_original_scoped_lookup',
    supports_spatial_independently:false,new_read_performed:false,
    original_link_read_status:originalLinkReadStatus(e.original_source_evidence?.type)}));
}
function validateBoundFrozenSpatialInput(record,{evidenceDir,repoDir,requireFrozenSpatialArchive}) {
  const fail=reason=>{throw new Error('Frozen spatial/scope binding rejected ('+reason+'): '+record.id);};
  const file=record.source_spatial_input_file;
  if (!ROUND87_SPATIAL_INPUTS[file] || record.source_spatial_input_sha256!==ROUND87_SPATIAL_INPUTS[file]) fail('spatial input declaration');
  if (!repoDir) fail('public repository root required');
  const archive=`research/spatial-input-snapshots/${file}`;
  if (record.source_spatial_input_archive!==archive) fail('spatial archive declaration');
  const bytes=readFileSync(join(repoDir,archive));
  if (evidenceDir && !readFileSync(join(evidenceDir,file)).equals(bytes)) fail('spatial private/archive byte mismatch');
  if (byteSha(bytes)!==ROUND87_SPATIAL_INPUTS[file]) fail('spatial input byte hash');
  const doc=JSON.parse(bytes.toString('utf8'));
  if (!frozenState(doc)) fail('spatial input not frozen');
  const originals=doc.records.filter(r=>r.id===record.id);
  if (originals.length!==1 || recordSha(originals[0])!==record.source_spatial_input_record_sha256) fail('spatial input record hash');
  const original=originals[0];let expected=original;
  if (record.source_spatial_input_archive!==`research/spatial-input-snapshots/${file}`) fail('spatial archive declaration');
  // Archive bytes are mandatory in both public-only and optional dual-byte modes.
  if (CORRECTED_SCOPE_IDS.has(record.id)) {
    if (record.scope_adapter_file!==SCOPE_ADAPTER_FILE || record.scope_adapter_sha256!==SCOPE_ADAPTER_SHA) fail('scope adapter declaration');
    const adapterArchive=`research/spatial-input-snapshots/${SCOPE_ADAPTER_FILE}`;
    if (record.scope_adapter_archive!==adapterArchive) fail('scope adapter archive declaration');
    const adapterBytes=readFileSync(join(repoDir,adapterArchive));
    if (evidenceDir && !readFileSync(join(evidenceDir,SCOPE_ADAPTER_FILE)).equals(adapterBytes)) fail('scope adapter private/archive byte mismatch');
    if (byteSha(adapterBytes)!==SCOPE_ADAPTER_SHA) fail('scope adapter byte hash');
    const ad=JSON.parse(adapterBytes.toString('utf8'));
    if (!frozenState(ad)) fail('scope adapter not frozen');
    const corrections=ad.records.filter(r=>r.id===record.id);
    if (corrections.length!==1) fail('scope correction identity');
    const correction=corrections[0];
    if (recordSha(correction)!==record.scope_adapter_record_sha256 ||
        correction.corrects.input_file!==file || correction.corrects.input_sha256!==ROUND87_SPATIAL_INPUTS[file] ||
        correction.corrects.record_sha256!==recordSha(original) || !correction.corrects.scope_only ||
        !equal(correction.identity,original.identity) || !equal(correction.unchanged_fields,original.fields) ||
        recordSha(correction.derived_record)!==correction.derived_record_sha256 ||
        correction.derived_record_sha256!==record.scope_adapter_derived_record_sha256) fail('scope correction exact digest/grain');
    expected=correction.derived_record;
    if (!equal(expected.fields,original.fields) || !equal(expected.sources,original.sources)) fail('scope correction changed spatial fields/URLs');
  } else if (record.scope_adapter_file || record.scope_adapter_sha256 || record.scope_adapter_record_sha256 || record.scope_adapter_derived_record_sha256 || record.scope_adapter_archive) fail('unexpected scope correction');
  // Existing material remains opaque and exact inside original_source_evidence.
  // Only its derived spatial use gains explicit knowledge/non-independent flags.
  for (const k of Object.keys(expected)) {
    const value=k==='source_evidence' && expected.spatial_basis_mode==='exact_existing_knowledge'?deriveKnowledgeEvidence(expected[k]):expected[k];
    if (!equal(record[k],value)) fail('changed frozen spatial payload: '+k);
  }
  return expected.spatial_basis_mode;
}

// Private R88 proposal: no public source or old frozen input is rewritten.
// The R87 three-file whitelist above remains exact and unchanged.
export const ROUND88_SPATIAL_INPUTS = {
  "early-published-spatial-expansion-round4.json": "04b0061b08b12783dadc7166ab5a28f40cec486c5ee709973e13bbe82207178f",
  "early-published-spatial-expansion-round5.json": "9fe5f74484a1a0ce6ed4b6f990dfad92c4e52cc65930afabdd0af383b64ca032",
  "early-published-spatial-expansion-round6.json": "6176dd108d44b433484fbb2151e8963d0edcf3503a6026773de72f6ab61c3dbf"
};
function round88OriginalLinkReadStatus(type) {
  if (['publisher_edition_contents_page','publisher_bibliographic_search_excerpt','bibliography_search_excerpt','edition_serial_contents_opened'].includes(type)) return 'identity_or_contents_only_lookup';
  return originalLinkReadStatus(type);
}
const ROUND88_COALESCED_READING = {
  Q105728336: {
    url:'https://futurismic.com/tag/identity/page/7/',type:'primary_original_excerpt',
    analysis_record_sha256:'e83cbf956866b08c34b949ee2e1388c45d8232776a05df33692d03e811ce57ba',
    log_record_sha256:'4b13bc1a06f45bda7363a2262e76129fef290f0c0b542b310e800856f39054e2',
    log_scope:'实际检索读取Exit Without Saving独立评论段；另读Futurismic索引返回的本篇开篇片段，未读全文。'
  },
  Q7774841: {
    url:'https://en.wikipedia.org/wiki/The_Wild_Boy',type:'community_plot_summary_search_excerpt',
    analysis_record_sha256:'54218988dea26a397154a125827747a0a5ec6aa471fd61fe71d80e2e49233fa1',
    log_record_sha256:'1fa71e7851049795121c51ad38e53604486d69dc86b4cb2c1beeab2f82d34938',
    log_scope:'实际检索读取本书评论前段；另读本书社区Plot overview对伊洛克追问历史的说明；未读正文。'
  }
};
function round88CoalescedOriginalReading(record,a,l,e) {
  const c=ROUND88_COALESCED_READING[record.id];
  // The exact original analysis enumerates the second actual reading URL;
  // the exact original log already names both scopes in one first-URL row.
  // No missing URL, new reading claim, inferred counter or generic fallback.
  return !!c && recordSha(a)===c.analysis_record_sha256 && recordSha(l)===c.log_record_sha256 &&
    l.reading_scope===c.log_scope && l.materials_checked.some(m=>m.scope===c.log_scope && m.result==='read') &&
    e.url===c.url && e.original_source_evidence?.url===c.url &&
    e.original_source_evidence?.type===c.type &&
    a.source_evidence.some(x=>equal(x,e.original_source_evidence));
}
function deriveRound88KnowledgeEvidence(evidence) {
  return evidence.map(e=>({...e,type:'existing_knowledge_spatial_with_original_scoped_lookup',
    supports_spatial_independently:false,new_read_performed:false,
    original_link_read_status:round88OriginalLinkReadStatus(e.original_source_evidence?.type)}));
}
function validateRound88BoundFrozenSpatialInput(record,{evidenceDir,repoDir}) {
  const fail=reason=>{throw new Error('R88 frozen spatial binding rejected ('+reason+'): '+record.id);};
  const file=record.source_spatial_input_file;
  if (!ROUND88_SPATIAL_INPUTS[file] || record.source_spatial_input_sha256!==ROUND88_SPATIAL_INPUTS[file] || !repoDir) fail('fixed input declaration');
  const archive=`research/spatial-input-snapshots/${file}`;
  if (record.source_spatial_input_archive!==archive) fail('fixed archive declaration');
  const bytes=readFileSync(join(repoDir,archive));
  if (byteSha(bytes)!==ROUND88_SPATIAL_INPUTS[file]) fail('fixed input byte hash');
  if (evidenceDir && !readFileSync(join(evidenceDir,file)).equals(bytes)) fail('private/archive mismatch');
  const doc=JSON.parse(bytes.toString('utf8'));
  if (!frozenState(doc)) fail('input not frozen');
  const originals=doc.records.filter(r=>r.id===record.id);
  if (originals.length!==1 || recordSha(originals[0])!==record.source_spatial_input_record_sha256) fail('fixed record digest');
  const original=originals[0];
  if (record.scope_adapter_file || record.scope_adapter_sha256 || record.scope_adapter_record_sha256 ||
      record.scope_adapter_derived_record_sha256 || record.scope_adapter_archive) fail('unexpected scope correction');
  // No scope correction is authorized for these 149 inputs. Only explicit
  // derived knowledge/non-independent URL flags are deterministic metadata.
  for (const k of Object.keys(original)) {
    const value=k==='source_evidence' && original.spatial_basis_mode==='exact_existing_knowledge'?
      deriveRound88KnowledgeEvidence(original[k]):original[k];
    if (!equal(record[k],value)) fail('changed frozen spatial payload: '+k);
  }
  return original.spatial_basis_mode;
}

function validateRound88Knowledge(record, {currentWork,evidenceDir,repoDir}={}) {
  const fail = reason => {throw new Error(`R88 exact knowledge rejected (${reason}): ${record.id}`);};
  if (!ORIGINAL_FIRST_PASS_MODES.has(record.knowledge_provenance_mode)) fail('mode');
  if (!currentWork || currentWork.id!==record.id || record.integration_relation!=='published_core' ||
      currentWork.issue_analysis_status==='missing' || !repoDir) fail('published core');
  if (record.analysis_basis!=='existing_knowledge_unverified' || record.spatial_basis_mode!=='exact_existing_knowledge' ||
      record.verification_status!=='knowledge_added_unverified' || !record.field_notes?.spatial_primary?.includes('existing knowledge') ||
      !record.field_notes?.evidence_provenance?.trim()) fail('explicit unverified knowledge');
  if (!equal(record.current_identity,{title:currentWork.title_zh,author:currentWork.author}) ||
      !equal(record.frozen_canonical_identity_scope,canonicalScope(currentWork))) fail('current identity/grain');
  if (record.delegation_file || record.delegation_sha256) fail('invented delegation');
  const {raw:a} = frozenPair(record,'analysis',evidenceDir,repoDir,fail);
  const {raw:l} = frozenPair(record,'log',evidenceDir,repoDir,fail);
  if (!equal(a.identity,record.identity) || !equal(l.identity,record.identity) ||
      a.verification_status!=='knowledge_added_unverified' || !a.fields?.issue ||
      !Array.isArray(a.fields.issue_facets) || a.fields.issue_facets.length<2 ||
      typeof a.field_notes?.issue!=='string' || !a.field_notes.issue.trim()) fail('original analysis identity/scoped explanation');
  if (currentWork.issue!==a.fields.issue || !currentWork.knowledge?.assertions?.some(x => {
    const {input_file,...raw} = x;
    return input_file===record.source_core_assertion_file && equal(raw,a);
  })) fail('exact active scoped assertion');
  if (!equal(record.identity_caveat,a.identity_caveat) || !equal(record.original_reading_log,l) ||
      record.original_analysis_basis!==(a.analysis_basis ?? null) || record.source_scope!==l.reading_scope ||
      record.frozen_knowledge_reading_scope!==l.reading_scope || record.frozen_knowledge_issue_note!==a.field_notes.issue ||
      typeof l.reading_scope!=='string' || !l.reading_scope.trim()) fail('original scope/caveat');
  if (!equal(record.original_counter_fields,counterFields(l))) fail('counter presence/value changed');
  if (!equal(record.preserved_source_search_log,currentWork.source_search_log) ||
      record.preserved_source_search_log_sha256!==recordSha(currentWork.source_search_log)) fail('deleted/changed current history');
  const nodes = historyNodes(currentWork.source_search_log);
  if (!nodes.some(n => n.attempt_input===record.source_log_file && equal(n.raw_reading_log,l))) fail('raw log absent from canonical history');
  const refs = l.previous_attempts_preserved || [];
  if (!Array.isArray(refs) || !Array.isArray(record.preserved_prior_archive_proofs) ||
      !equal(refs,record.preserved_prior_archive_proofs.map(p=>p.file))) fail('prior-reference loss');
  for (const p of record.preserved_prior_archive_proofs) {
    const previous = frozenPair({id:record.id,source_log_file:p.file,source_log_archive:p.archive,
      source_log_sha256:p.sha256,source_log_record_sha256:p.record_sha256},'log',evidenceDir,repoDir,fail).raw;
    if (!equal(previous.identity,a.identity) || !nodes.some(n => n.attempt_input===p.file && equal(n.raw_reading_log,previous))) fail('prior raw history changed');
  }
  const ownerName=record.original_ownership_file;
  if (!OWNERS[ownerName] || record.original_ownership_sha256!==OWNERS[ownerName] ||
      !Number.isInteger(record.original_ownership_index) || record.original_ownership_index!==record.ownership_index) fail('ownership declaration');
  const ownerBytes=readFileSync(join(repoDir,'research/issue-input-snapshots',ownerName));
  if (evidenceDir && !readFileSync(join(evidenceDir,ownerName)).equals(ownerBytes)) fail('ownership private/archive byte mismatch');
  if (byteSha(ownerBytes)!==OWNERS[ownerName] ||
      JSON.parse(ownerBytes.toString('utf8')).records[record.original_ownership_index]?.id!==record.id) fail('ownership exact row');
  if (!Array.isArray(record.sources) || !equal(record.sources,a.sources) || !Array.isArray(record.source_evidence) ||
      !Array.isArray(a.source_evidence) || !Array.isArray(l.queries) || !Array.isArray(l.materials_checked)) fail('source/query/material arrays');
  if (l.issue_result!=='added_unverified') fail('original issue result');
  if (record.knowledge_provenance_mode==='existing_knowledge_from_original_first_pass') {
    if (!['existing_knowledge_unverified','existing_knowledge'].includes(a.analysis_basis) || !knowledgeNote(a.field_notes.issue) || !knowledgeNote(l.reading_scope)) fail('original explicit zero-query knowledge');
    const z=record.zero_query_provenance;
    if (!z || !equal(Object.keys(z).sort(),['note','original_attempt_state','original_materials_checked','original_queries','original_sources','source_scope']) ||
        !equal(z.original_queries,l.queries) || !equal(z.original_materials_checked,l.materials_checked) ||
        !equal(z.original_sources,a.sources) || z.original_attempt_state!==l.attempt_state ||
        z.source_scope!==l.reading_scope || !knowledgeNote(z.note)) fail('duplicated zero-query scope/counters');
    if (!(['existing_knowledge_first_pass','existing_knowledge_after_deferred','existing_knowledge_added'].includes(l.attempt_state) || (record.id==='Q17006023' && record.source_analysis_file==='early-recent-round20.json' && l.attempt_state==='knowledge_first_pass')) ||
        !isEmptyArray(l.queries) || !isEmptyArray(l.materials_checked) || !isEmptyArray(a.sources) ||
        !isEmptyArray(a.source_evidence) || !isEmptyArray(record.source_evidence) ||
        (Object.hasOwn(l,'sources') && !isEmptyArray(l.sources)) ||
        (Object.hasOwn(l,'actual_search_performed') && l.actual_search_performed!==false) ||
        (Object.hasOwn(l,'actual_search_count') && l.actual_search_count!==0) ||
        (Object.hasOwn(l,'actual_open_count') && l.actual_open_count!==0)) fail('original zero-query state');
  } else if (record.knowledge_provenance_mode==='existing_knowledge_after_nonadopted_first_pass_query') {
    if (a.analysis_basis!=='existing_knowledge_unverified' || !knowledgeNote(a.field_notes.issue) || !knowledgeNote(l.reading_scope)) fail('original explicit nonadopted-query knowledge');
    if (l.attempt_state!=='existing_knowledge_after_exact_query' || !l.queries.length ||
        !isEmptyArray(l.materials_checked) || !isEmptyArray(a.sources) || !isEmptyArray(a.source_evidence) ||
        !isEmptyArray(record.source_evidence) || l.actual_search_performed===false ||
        !a.field_notes.issue.includes('本轮查询没有采用剧情来源')) fail('nonadopted query boundary');
  } else {
    // Preserved old identity/premise links never bypass the knowledge guard.
    if (!['content_read_first_pass','existing_knowledge_with_bibliographic_lookup','content_read_quick_retry','existing_knowledge_first_pass','source_read_analysis_added','metadata_read_existing_knowledge_analysis_added'].includes(l.attempt_state) || !l.materials_checked.length ||
        record.source_evidence.length!==a.source_evidence.length ||
        a.source_evidence.some(e => !l.materials_checked.some(m=>m.url===e.url))) fail('limited old lookup boundary');
    if (!a.sources.length && (a.source_evidence.length || record.source_evidence.length ||
        l.attempt_state!=='existing_knowledge_first_pass' || !l.queries.length ||
        a.analysis_basis!=='existing_knowledge_unverified' || !knowledgeNote(a.field_notes.issue) ||
        !knowledgeNote(l.reading_scope))) fail('nonadopted material retained without adopted source');
    for (const e of record.source_evidence) {
      if (!e.url?.startsWith('https://') || !record.sources.includes(e.url) ||
          !a.source_evidence.some(original => equal(original,e.original_source_evidence)) ||
          e.type!=='existing_knowledge_spatial_with_original_scoped_lookup' ||
          e.supports_spatial_independently!==false || e.new_read_performed!==false || e.no_new_network_read!==true ||
          e.original_link_read_status!==round88OriginalLinkReadStatus(e.original_source_evidence?.type) ||
          e.spatial_basis!=='exact_existing_knowledge' || !knowledgeNote(e.support_scope)) fail('old URL promoted to spatial reading');
    }
  }
  // No missing counter is synthesized, including in normalized history. The
  // original canonical aggregate may retain earlier catalogue-only material.
  return 'existing_knowledge_unverified';
}
function validateRound88ScopedMaterial(record,{currentWork,evidenceDir,repoDir}={}) {
  const fail=reason=>{throw new Error(`R88 scoped material rejected (${reason}): ${record.id}`);};
  if (!currentWork || currentWork.id!==record.id || record.integration_relation!=='published_core' ||
      currentWork.issue_analysis_status==='missing' || !repoDir) fail('published core');
  if (record.analysis_basis!=='frozen_analysis_scoped_setting_unverified' || record.spatial_basis_mode!=='saved_scoped_material' ||
      record.verification_status!=='knowledge_added_unverified' || record.knowledge_provenance_mode!==undefined ||
      !record.field_notes?.evidence_provenance?.trim()) fail('explicit unverified scoped material');
  if (!equal(record.current_identity,{title:currentWork.title_zh,author:currentWork.author}) ||
      !equal(record.frozen_canonical_identity_scope,canonicalScope(currentWork))) fail('current identity/grain');
  if (record.delegation_file || record.delegation_sha256) fail('invented delegation');
  const {raw:a} = frozenPair(record,'analysis',evidenceDir,repoDir,fail);
  const {raw:l} = frozenPair(record,'log',evidenceDir,repoDir,fail);
  if (!equal(a.identity,record.identity) || !equal(l.identity,record.identity) ||
      a.verification_status!=='knowledge_added_unverified' || !a.fields?.issue ||
      !Array.isArray(a.fields.issue_facets) || a.fields.issue_facets.length<2 ||
      typeof a.field_notes?.issue!=='string' || !a.field_notes.issue.trim()) fail('original analysis identity/scoped explanation');
  if (currentWork.issue!==a.fields.issue || !currentWork.knowledge?.assertions?.some(x => {
    const {input_file,...raw} = x;
    return input_file===record.source_core_assertion_file && equal(raw,a);
  })) fail('exact active scoped assertion');
  if (!equal(record.identity_caveat,a.identity_caveat) || !equal(record.original_reading_log,l) ||
      record.original_analysis_basis!==(a.analysis_basis ?? null) || record.source_scope!==l.reading_scope ||
      record.frozen_knowledge_reading_scope!==l.reading_scope || record.frozen_knowledge_issue_note!==a.field_notes.issue ||
      typeof l.reading_scope!=='string' || !l.reading_scope.trim()) fail('original scope/caveat');
  if (!equal(record.original_counter_fields,counterFields(l))) fail('counter presence/value changed');
  if (!equal(record.preserved_source_search_log,currentWork.source_search_log) ||
      record.preserved_source_search_log_sha256!==recordSha(currentWork.source_search_log)) fail('deleted/changed current history');
  const nodes = historyNodes(currentWork.source_search_log);
  if (!nodes.some(n => n.attempt_input===record.source_log_file && equal(n.raw_reading_log,l))) fail('raw log absent from canonical history');
  const refs = l.previous_attempts_preserved || [];
  if (!Array.isArray(refs) || !Array.isArray(record.preserved_prior_archive_proofs) ||
      !equal(refs,record.preserved_prior_archive_proofs.map(p=>p.file))) fail('prior-reference loss');
  for (const p of record.preserved_prior_archive_proofs) {
    const previous = frozenPair({id:record.id,source_log_file:p.file,source_log_archive:p.archive,
      source_log_sha256:p.sha256,source_log_record_sha256:p.record_sha256},'log',evidenceDir,repoDir,fail).raw;
    if (!equal(previous.identity,a.identity) || !nodes.some(n => n.attempt_input===p.file && equal(n.raw_reading_log,previous))) fail('prior raw history changed');
  }
  const ownerName=record.original_ownership_file;
  if (!OWNERS[ownerName] || record.original_ownership_sha256!==OWNERS[ownerName] ||
      !Number.isInteger(record.original_ownership_index) || record.original_ownership_index!==record.ownership_index) fail('ownership declaration');
  const ownerBytes=readFileSync(join(repoDir,'research/issue-input-snapshots',ownerName));
  if (evidenceDir && !readFileSync(join(evidenceDir,ownerName)).equals(ownerBytes)) fail('ownership private/archive byte mismatch');
  if (byteSha(ownerBytes)!==OWNERS[ownerName] ||
      JSON.parse(ownerBytes.toString('utf8')).records[record.original_ownership_index]?.id!==record.id) fail('ownership exact row');
  if (!Array.isArray(record.sources) || !equal(record.sources,a.sources) || !record.sources.length ||
      !Array.isArray(record.source_evidence) || !Array.isArray(a.source_evidence) ||
      record.source_evidence.length!==a.source_evidence.length ||
      !Array.isArray(l.queries) || !Array.isArray(l.materials_checked) ||
      !['content_read_first_pass','source_read_analysis_added'].includes(l.attempt_state) ||
      l.issue_result!=='added_unverified') fail('actual original scoped material boundary');
  for (const e of record.source_evidence) {
    if (!e.url?.startsWith('https://') || !record.sources.includes(e.url) ||
        !a.source_evidence.some(original=>equal(original,e.original_source_evidence)) ||
        !(l.materials_checked.some(m=>m.url===e.url) || round88CoalescedOriginalReading(record,a,l,e)) ||
        e.type!=='saved_frozen_analysis_material_spatial_scope' || !e.support_scope?.trim() ||
        e.spatial_basis!=='saved_scoped_material' || e.no_new_network_read!==true ||
        e.original_read_scope!==e.original_source_evidence?.support_scope ||
        e.original_source_type!==e.original_source_evidence?.type ||
        e.original_read_date!==e.original_source_evidence?.read_date) fail('original scoped URL/scope altered');
  }
  return 'scoped_reading';
}
