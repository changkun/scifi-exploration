import assert from 'node:assert/strict';
import {mkdtemp, mkdir, writeFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {gzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import {readProcessLog, PROCESS_LOGICAL_PATH, PROCESS_GZIP_PATH, PROCESS_STORAGE_MANIFEST} from './process-log-storage.mjs';

const directory = await mkdtemp(join(tmpdir(), 'scifi-process-storage-'));
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const sample = {records: [{id: 'storage-test', queries: [], previous_attempts: [{queries: ['old query'], materials_checked: [{scope: 'identity only'}]}]}]};
const raw = Buffer.from(JSON.stringify(sample, null, 2) + '\n');
const packed = gzipSync(raw, {level: 9});
const proof = {format: 'lossless-json-storage-v1', logical_path: PROCESS_LOGICAL_PATH, storage_path: PROCESS_GZIP_PATH, codec: 'gzip', raw_bytes: raw.length, raw_sha256: sha(raw), storage_bytes: packed.length, storage_sha256: sha(packed)};
const bundle = {[PROCESS_GZIP_PATH]: packed, [PROCESS_STORAGE_MANIFEST]: JSON.stringify(proof)};
let checks = 0;
async function fixture(name, files) {
 const root = join(directory, name);
 await mkdir(join(root, 'research'), {recursive: true});
 for (const [path, bytes] of Object.entries(files)) await writeFile(join(root, path), bytes);
 return root;
}
try {
 for (const [name, files] of Object.entries({legacy: {[PROCESS_LOGICAL_PATH]: raw}, compressed: bundle, dual: {...bundle, [PROCESS_LOGICAL_PATH]: raw}})) {
  const record = await readProcessLog(await fixture(name, files));
  assert.deepEqual(record.data, sample);
  assert.ok(record.rawBytes.equals(raw));
  assert.ok(!('actual_query_count' in record.data.records[0]));
  checks++;
 }
 const invalid = {
  conflict: {...bundle, [PROCESS_LOGICAL_PATH]: Buffer.from('{"records":[]}')},
  corrupt: {...bundle, [PROCESS_GZIP_PATH]: Buffer.from('bad gzip'), [PROCESS_LOGICAL_PATH]: raw},
  missingManifest: {[PROCESS_GZIP_PATH]: packed},
  invalidJSON: {[PROCESS_LOGICAL_PATH]: Buffer.from('{bad')},
  invalidRecords: {[PROCESS_LOGICAL_PATH]: Buffer.from('{"records":{}}')}
 };
 for (const key of ['format', 'logical_path', 'storage_path', 'raw_sha256', 'storage_sha256', 'raw_bytes', 'storage_bytes']) {
  invalid['manifest-' + key] = {...bundle, [PROCESS_STORAGE_MANIFEST]: JSON.stringify({...proof, [key]: typeof proof[key] === 'number' ? proof[key] + 1 : 'invalid'})};
 }
 for (const [name, files] of Object.entries(invalid)) {
  await assert.rejects(readProcessLog(await fixture(name, files)));
  checks++;
 }
 for (const bytes of ['{}', '{invalid']) {
  const orphan = await fixture('orphan-' + checks, {[PROCESS_STORAGE_MANIFEST]: bytes});
  for (const optional of [false, true]) {
   await assert.rejects(readProcessLog(orphan, {optional}), error => /Orphan/.test(error.message) && error.code !== 'ENOENT');
   checks++;
  }
 }
 const absent = await fixture('absent', {});
 assert.equal(await readProcessLog(absent, {optional: true}), null);
 await assert.rejects(readProcessLog(absent), {code: 'ENOENT'});
 checks++;
 const actual = await readProcessLog(new URL('../', import.meta.url));
 assert.equal(actual.logical_path, PROCESS_LOGICAL_PATH);
 assert.equal(new Set(actual.data.records.map(record => record.id)).size, actual.data.records.length);
 console.log(JSON.stringify({status: 'passed', integrityChecks: checks, records: actual.data.records.length, rawSHA256: actual.raw_sha256, storageSHA256: actual.storage_sha256}));
} finally {
 await rm(directory, {recursive: true, force: true});
}
