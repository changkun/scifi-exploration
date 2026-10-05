import assert from 'node:assert/strict';
import {readFile, readdir, stat} from 'node:fs/promises';
import {resolve, join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';

const output = resolve(process.argv[2]);
const delivery = join(output, 'dist');
const metadata = JSON.parse(await readFile(join(delivery, 'assets/site-delivery.json'), 'utf8'));
const repo = process.cwd();
const base = join(repo, 'dist');
// Complete exports can grow in the repository, but must never enter the
// hosting package or lose their exact-commit download destinations.
for (const file of ['assets/issue-analysis.json.gz', 'assets/issue-research-queue.json.gz']) {
  assert.ok(metadata.remote_files.includes(file), `${file}: complete export is not mapped`);
  assert.equal(createHash('sha256').update(await readFile(join(base, file))).digest('hex'), metadata.source_sha256[file]);
  await assert.rejects(stat(join(delivery, file)), {code: 'ENOENT'});
}
async function checkHostedSizes(directory) {
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) await checkHostedSizes(file);
    else {
      assert.ok(entry.isFile(), `Unsupported hosted asset: ${file}`);
      assert.ok((await stat(file)).size <= 5 * 1024 * 1024, `Hosted asset exceeds 5 MiB: ${file}`);
    }
  }
}
await checkHostedSizes(delivery);
const original = await import(pathToFileURL(join(base, 'assets/data-loader.mjs')));
const generated = await import(pathToFileURL(join(delivery, 'assets/data-loader.mjs')));
let requests = 0;
const localFetch = async relative => ({ok: true, json: async () => JSON.parse(await readFile(join(base, relative.slice(2)), 'utf8'))});
const remoteFetch = async url => {
  assert.ok(url.startsWith(metadata.dataset_origin), 'Every data request must use the fixed commit');
  const relative = url.slice(metadata.dataset_origin.length);
  assert.match(relative, /^assets\/[A-Za-z0-9_/-]+\.json$/);
  requests++;
  return localFetch('./' + relative);
};
const bibliography = await original.loadBibliographySource(localFetch);
const completion = await original.loadCompletionSource(localFetch);
assert.deepEqual(await generated.loadBibliographySource(remoteFetch), bibliography);
assert.deepEqual(await generated.loadCompletionSource(remoteFetch), completion);
assert.equal(bibliography.records.length, 14532);
assert.equal(completion.records.length, 14564);
let details = 0;
// Check every source and correspondence shard, including all fields and exact identities.
for (const [directory, method] of [['bibliography-details', 'loadSourceDetail'], ['library-details', 'loadLibraryDetail']]) {
  for (const file of await readdir(join(base, 'assets', directory))) {
    const records = JSON.parse(await readFile(join(base, 'assets', directory, file), 'utf8')).records;
    assert.ok(Array.isArray(records));
    assert.equal(new Set(records.map(record => record.id)).size, records.length);
    for (const record of records) {
      const relative = `./assets/${directory}/${file}`;
      const work = directory === 'bibliography-details' ? {source_id: record.id, source_index: {detail_url: relative}} : {id: record.id, library_detail_url: relative};
      assert.deepEqual(await generated[method](work, remoteFetch), record);
      details++;
    }
  }
}
for (const [file, expected] of Object.entries(metadata.source_sha256)) {
  if (metadata.remote_directories.some(directory => file.startsWith(directory))) continue;
  if (metadata.remote_files.includes(file)) continue;
  if (['assets/data-loader.mjs', 'assets/app.js', 'index.html', 'assets/completion.mjs', 'assets/issues.mjs', 'assets/canonical-universe-manifest.json'].includes(file)) continue;
  assert.equal(createHash('sha256').update(await readFile(join(delivery, file))).digest('hex'), expected, file);
}
const oldBody = (await readFile(join(base, 'index.html'), 'utf8')).split('<body>')[1];
const newBody = (await readFile(join(delivery, 'index.html'), 'utf8')).split('<body>')[1];
let expectedBody = oldBody;
for (const remote of metadata.remote_files) expectedBody = expectedBody.replaceAll('./' + remote, metadata.dataset_origin + remote);
assert.equal(newBody, expectedBody, 'Design body must remain unchanged except complete-export destinations');
for (const file of ['assets/completion.mjs', 'assets/issues.mjs']) {
  let expected = await readFile(join(base, file), 'utf8');
  for (const remote of metadata.remote_files) expected = expected.replaceAll('./' + remote, metadata.dataset_origin + remote);
  assert.equal(await readFile(join(delivery, file), 'utf8'), expected);
}
assert.ok((await readFile(join(delivery, 'assets/completion.mjs'), 'utf8')).includes(metadata.dataset_origin + 'assets/issue-research-queue.json.gz'), 'The full research queue must remain downloadable from the exact commit');
const wrongWork = {source_id: 'Q1', source_index: {detail_url: './assets/bibliography-details/../../../secret.json'}};
await assert.rejects(generated.loadSourceDetail(wrongWork, remoteFetch), /路径/);
const unavailable = async url => url.includes('/completion-index/') ? {ok: false} : remoteFetch(url);
await assert.rejects(generated.loadCompletionSource(unavailable), /未完整载入/);
console.log(JSON.stringify({all_fields_equal: true, source_records: bibliography.records.length, completion_records: completion.records.length, detail_records: details, fixed_commit_requests: requests, design_and_downloads_preserved: true, missing_shard_rejected: true}));
