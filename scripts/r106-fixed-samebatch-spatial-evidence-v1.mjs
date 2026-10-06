import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {join} from 'node:path';

// Closed to the five exact R106 same-batch proposals and their original bytes.
// New rounds require a separate route; deleting a marker cannot bypass this one.
const PINS = {
  "canonical_sha256": "e52831d456da2b550be1dc138c1788a564cd19245880d8c7360a54a2aa20dacc",
  "ids": [
    "Q7773411",
    "Q123134989",
    "Q3819702",
    "Q100375840",
    "Q7741764"
  ],
  "core": {
    "archive": "research/issues-source-reading-round106.json",
    "private_file": "work/evidence/round106-core19-combined-private.json",
    "sha256": "9f6c66aef3ded6d72323ca8c7051b0c6a6ae45afeebea841ed2d076368216f62"
  },
  "delta": {
    "private_file": "work/evidence/round106-process49-exact-delta-private.json",
    "archive": "research/issue-input-snapshots/round106-process49-exact-delta-private.json",
    "sha256": "0f62dd9c16d2765750307742353fa205289a521d0dcc279bf818ee2056045f13"
  },
  "context": {
    "private_file": "work/evidence/round106-spatial5-exact-current-context-root-private.json",
    "archive": "research/spatial-input-snapshots/round106-spatial5-exact-current-context-root-private.json",
    "sha256": "9192f5b0c19e72fa806b3cc8c03e9c77f68adefa99a28eb7b6eb176378a92e08"
  },
  "spatial": {
    "archive": "research/spatial-reading-round100.json",
    "private_file": "work/evidence/round106-spatial5-derived-private.json",
    "sha256": "779b6aba447f86bea7172027ab3494368889cf4502c1e492469013d1a5d5f039"
  },
  "copy_files": [
    {
      "private_file": "work/evidence/modern-easy-core-round106-spatial-part1.json",
      "archive": "research/spatial-input-snapshots/modern-easy-core-round106-spatial-part1.json",
      "sha256": "d3d3bd4974420e2654825e5fc9b91a10ad1890b0377c492bfc2a50f6c7984790"
    },
    {
      "private_file": "work/evidence/modern-easy-core-round106-spatial-part2.json",
      "archive": "research/spatial-input-snapshots/modern-easy-core-round106-spatial-part2.json",
      "sha256": "be33bbbe4747384b97bc0eb2b3f8aecd6fede081a1295e38f59160836293485a"
    },
    {
      "private_file": "work/evidence/round106-root-old4-samebatch-spatial3-provisional-private.json",
      "archive": "research/spatial-input-snapshots/round106-root-old4-samebatch-spatial3-provisional-private.json",
      "sha256": "30c9dec916f677c32f6a904c2192597fba7668dfa3380b346657ff9fd91eb338"
    },
    {
      "private_file": "work/evidence/round106-spatial5-exact-current-context-root-private.json",
      "archive": "research/spatial-input-snapshots/round106-spatial5-exact-current-context-root-private.json",
      "sha256": "9192f5b0c19e72fa806b3cc8c03e9c77f68adefa99a28eb7b6eb176378a92e08"
    }
  ]
};
const H = value => createHash('sha256').update(value).digest('hex');
const sorted = value => Array.isArray(value) ? value.map(sorted) : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(key => [key, sorted(value[key])])) : value;
const C = value => H(JSON.stringify(sorted(value)));
const equal = (a, b) => C(a) === C(b);
const cache = new Map();
function file(pin, {repoDir, evidenceDir}, kind) {
  if (!repoDir || !/^research\/(?:issue-input-snapshots\/|spatial-input-snapshots\/|issues-source-reading-round106\.json$|spatial-reading-round100\.json$)/.test(pin.archive)) throw new Error('R106 ' + kind + ' path');
  const archived = join(repoDir, pin.archive);
  const privatePath = evidenceDir && join(evidenceDir, pin.private_file.split('/').at(-1));
  const path = existsSync(archived) ? archived : privatePath && existsSync(privatePath) ? privatePath : null;
  if (!path) throw new Error('R106 ' + kind + ' missing');
  const bytes = readFileSync(path);
  if (H(bytes) !== pin.sha256) throw new Error('R106 ' + kind + ' hash');
  const key = path + pin.sha256;
  if (!cache.has(key)) cache.set(key, JSON.parse(bytes));
  return cache.get(key);
}
function row(doc, id, kind) {
  const rows = (doc.records || []).filter(value => value.id === id);
  if (rows.length !== 1) throw new Error('R106 ' + kind + ' unique ID');
  return rows[0];
}
const spatialKeys = ['spatial_primary', 'spatial_secondary', 'spatial_rationale'];
const identityKeys = ['id', 'title_zh', 'title_original', 'author', 'form', 'forms', 'source_entity_kind', 'source_types', 'first_year', 'sort_year', 'source_first_year', 'year_display'];
const identity = work => Object.fromEntries(identityKeys.map(key => [key, {present: Object.hasOwn(work, key), value: work[key] ?? null}]));
const spatial = work => Object.fromEntries(spatialKeys.map(key => [key, {present: Object.hasOwn(work, key), value: work[key] ?? null}]));
const zones = new Set(['earth', 'planetary', 'interstellar', 'galactic', 'cosmic', 'abstract']);
export function isR106FixedSameBatchSpatialRecord(record) {
  return PINS.ids.includes(record.id) || PINS.copy_files.some(pin => pin.archive === record.source_spatial_input_archive);
}
export function validateR106FixedSameBatchSpatialEvidence(record, {repoDir, evidenceDir, currentWork, issueAssertions, sourceSearchLog, spatialAdoptionPhase = 'auto'} = {}) {
  const reject = why => { throw new Error('R106 same-batch spatial rejected (' + why + '): ' + record.id); };
  const ctx = {repoDir, evidenceDir};
  const aggregate = file(PINS.spatial, ctx, 'spatial aggregate');
  const coreDoc = file(PINS.core, ctx, 'core aggregate');
  const deltaDoc = file(PINS.delta, ctx, 'process delta');
  const contextDoc = file(PINS.context, ctx, 'before context');
  if (!PINS.ids.includes(record.id) || aggregate.records.length !== 5 || coreDoc.records.length !== 19 || deltaDoc.records.length !== 49 || contextDoc.records.length !== 5 || contextDoc.metadata.canonical_sha256 !== PINS.canonical_sha256) reject('closed counts/current baseline');
  const adopted = row(aggregate, record.id, 'spatial aggregate');
  const core = row(coreDoc, record.id, 'core aggregate');
  const delta = row(deltaDoc, record.id, 'process delta');
  const binding = row(contextDoc, record.id, 'before context');
  const originalWork = binding.original_work;
  const pin = PINS.copy_files.find(value => value.archive === record.source_spatial_input_archive);
  if (!pin || record.source_spatial_input_sha256 !== pin.sha256 || !equal(record, adopted)) reject('exact adopted/original S declaration');
  const original = row(file(pin, ctx, 'original S'), record.id, 'original S');
  if (C(original) !== record.source_spatial_input_record_sha256 || C(original) !== binding.original_spatial_record_sha256 || !equal(record.fields, original.fields) || !equal(record.field_notes, original.field_notes) || !equal(record.sources, original.sources)) reject('original spatial fields/sources/scope');
  if (C(originalWork) !== binding.original_work_sha256 || C(delta) !== binding.process_delta_record_sha256 || C(delta.after) !== binding.expected_after_process_record_sha256 || C(core) !== binding.adopted_core_record_sha256 || record.adopted_analysis_record_sha256 !== C(core) || record.source_core_aggregate_sha256 !== PINS.core.sha256 || record.source_process_delta_sha256 !== PINS.delta.sha256 || record.source_process_after_record_sha256 !== C(delta.after)) reject('exact core/process/full prior binding');
  if (originalWork.issue_analysis_status !== 'missing' || originalWork.spatial_primary !== 'unknown' || C(delta.before) !== delta.before_sha256 || C(delta.after) !== delta.after_sha256) reject('missing-before scope/exact complete process');
  const oldHistory = delta.before.previous_attempts || [];
  const oldTail = Object.fromEntries(Object.entries(delta.before).filter(([key]) => key !== 'previous_attempts'));
  if (!equal(delta.after.previous_attempts, oldHistory.concat([oldTail])) || !equal(delta.after.materials_checked.slice(0, (delta.before.materials_checked || []).length), delta.before.materials_checked || []) || !(delta.before.queries || []).every(query => delta.after.queries.includes(query))) reject('complete old history/material/query preservation');
  if (!currentWork || !equal(identity(currentWork), identity(originalWork)) || !equal(record.identity, {title: originalWork.title_zh, author: originalWork.author}) || !equal(core.identity, record.identity)) reject('identity/form/date/grain');
  if (!equal(Object.keys(core.fields).sort(), ['issue', 'issue_facets', 'topics']) || core.fields.issue_facets.length < 2 || !equal(Object.keys(record.fields).sort(), spatialKeys.slice().sort()) || core.verification_status !== 'knowledge_added_unverified' || record.verification_status !== 'knowledge_added_unverified' || record.integration_relation !== 'same_batch_core') reject('core/space field scope or verification');
  if (!zones.has(record.fields.spatial_primary) || !Array.isArray(record.fields.spatial_secondary) || record.fields.spatial_secondary.some(zone => !zones.has(zone) || zone === record.fields.spatial_primary) || !record.fields.spatial_rationale?.trim() || !['auto', 'pre', 'post'].includes(spatialAdoptionPhase)) reject('zones/phase');
  if (issueAssertions !== undefined && !equal(issueAssertions, currentWork.knowledge?.assertions) || sourceSearchLog !== undefined && !equal(sourceSearchLog, currentWork.source_search_log)) reject('explicit builder context');
  const oldLog = originalWork.source_search_log;
  const newLog = {input_file: oldLog.input_file, log_date: oldLog.log_date, ...delta.after};
  const beforeLog = equal(currentWork.source_search_log, oldLog);
  const afterLog = equal(currentWork.source_search_log, newLog);
  const active = (currentWork.knowledge?.assertions || []).some(value => equal(Object.fromEntries(Object.entries(value).filter(([key]) => key !== 'input_file')), core));
  const beforeCore = currentWork.issue_analysis_status === 'missing' && currentWork.issue === originalWork.issue;
  const afterCore = currentWork.issue_analysis_status !== 'missing' && currentWork.issue === core.fields.issue && equal(currentWork.issue_facets, core.fields.issue_facets);
  if (!(beforeCore && beforeLog && !active || beforeCore && afterLog && active || afterCore && afterLog && active)) reject('actual before/staged/after core and source');
  if (currentWork.spatial_primary === 'unknown') {
    if (spatialAdoptionPhase === 'post' || !equal(spatial(currentWork), spatial(originalWork)) || !equal(currentWork.spatial_evidence, originalWork.spatial_evidence) || !equal(spatial(currentWork.knowledge?.fields || {}), spatial(originalWork.knowledge?.fields || {}))) reject('unknown before spatial bundle');
  } else {
    const evidence = currentWork.spatial_evidence;
    const knowledge = currentWork.knowledge?.fields;
    if (spatialAdoptionPhase === 'pre' || !afterCore || !afterLog || !active || currentWork.spatial_primary !== record.fields.spatial_primary || !evidence || evidence.primary !== record.fields.spatial_primary || !equal(evidence.secondary, record.fields.spatial_secondary) || evidence.rationale !== record.fields.spatial_rationale || !knowledge || !spatialKeys.every(key => Object.hasOwn(knowledge, key) && equal(knowledge[key], record.fields[key]))) reject('actual three adopted spatial locations');
  }
  return 'scoped_reading';
}
