import {execFileSync} from 'node:child_process';
import {mkdir, readdir, readFile, rm, writeFile} from 'node:fs/promises';
import {resolve, join} from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';

const REMOTE_DIRECTORIES = ['bibliography-index', 'completion-index', 'bibliography-details', 'library-details'];

export async function buildSiteDelivery(repository, commit, output) {
  if (!/^[a-f0-9]{40}$/.test(commit)) throw new Error('Use an exact, published GitHub commit');
  const resolved = execFileSync('git', ['rev-parse', `${commit}^{commit}`], {cwd: repository, encoding: 'utf8'}).trim();
  if (resolved !== commit) throw new Error('Dataset commit mismatch');
  await mkdir(output, {recursive: true});
  if ((await readdir(output)).length) throw new Error('Delivery output must be empty');
  const archive = execFileSync('git', ['archive', commit, 'dist'], {cwd: repository, maxBuffer: 256 * 1024 * 1024});
  execFileSync('tar', ['-xf', '-', '-C', output], {input: archive, maxBuffer: 1024 * 1024});
  const dist = join(output, 'dist');
  const origin = `https://raw.githubusercontent.com/changkun/scifi-exploration/${commit}/dist/`;
  const processLogicalFile = 'research/issue-source-searches.json';
  const processMainURL = `https://raw.githubusercontent.com/changkun/scifi-exploration/main/${processLogicalFile}`;
  const processSnapshotURL = `https://raw.githubusercontent.com/changkun/scifi-exploration/${commit}/${processLogicalFile}`;
  const processSnapshotBytes = execFileSync('git', ['show', `${commit}:${processLogicalFile}`], {cwd: repository, maxBuffer: 256 * 1024 * 1024});
  const processSnapshotSHA = createHash('sha256').update(processSnapshotBytes).digest('hex');
  const sourceHashes = {};
  async function fingerprint(directory, prefix = '') {
    for (const entry of await readdir(directory, {withFileTypes: true})) {
      const relative = prefix + entry.name;
      if (entry.isDirectory()) await fingerprint(join(directory, entry.name), relative + '/');
      else if (entry.isFile()) sourceHashes[relative] = createHash('sha256').update(await readFile(join(directory, entry.name))).digest('hex');
      else throw new Error('Unsupported source asset');
    }
  }
  await fingerprint(dist);
  const loaderPath = join(dist, 'assets/data-loader.mjs');
  let loader = await readFile(loaderPath, 'utf8');
  let mapped = 0;
  loader = loader.replace(/fetcher\(([^()]*)\)/g, (call, argument) => {
    if (!['\'./assets/bibliography.json\'', '\'./assets/completion.json\'', 'chunk', 'path', 'relative'].includes(argument)) throw new Error(`Unexpected fetch boundary: ${call}`);
    mapped++;
    return `fetcher(datasetURL(${argument}))`;
  });
  if (mapped !== 6) throw new Error('The data-loader interface changed; review the delivery mapping');
  loader = `// Complete data is served from this immutable, published repository commit.\nconst DATASET_ORIGIN = ${JSON.stringify(origin)};\nfunction datasetURL(relative) {\n if(typeof relative !== 'string' || !/^\\.\\/assets\\/[A-Za-z0-9_/-]+\\.json$/.test(relative) || relative.includes('..')) throw new Error('Dataset path is invalid');\n return DATASET_ORIGIN + relative.slice(2);\n}\n` + loader;
  await writeFile(loaderPath, loader);
  const tag = `delivery-${commit.slice(0, 12)}`;
  const appPath = join(dist, 'assets/app.js');
  const app = await readFile(appPath, 'utf8');
  if ((app.match(/from '\.\/data-loader\.mjs(?:\?[^']*)?'/g) || []).length !== 1) throw new Error('Data-loader import changed');
  await writeFile(appPath, app.replace(/from '\.\/data-loader\.mjs(?:\?[^']*)?'/, `from './data-loader.mjs?v=${tag}'`));
  const indexPath = join(dist, 'index.html');
  const index = await readFile(indexPath, 'utf8');
  if ((index.match(/src="\.\/assets\/app\.js\?v=[^"]*"/g) || []).length !== 1) throw new Error('Application script tag changed');
  await writeFile(indexPath, index.replace(/src="\.\/assets\/app\.js\?v=[^"]*"/, `src="./assets/app.js?v=${tag}"`));
  // Compressed exports duplicate the same full dataset. Keep them at the fixed
  // commit as well, and preserve their download links in the generated site.
  const remoteFiles = Object.keys(sourceHashes).filter(file => file.endsWith('.json.gz'));
  for (const file of ['index.html', 'assets/completion.mjs', 'assets/issues.mjs']) {
    const path = join(dist, file);
    let text = await readFile(path, 'utf8');
    for (const remote of remoteFiles) text = text.replaceAll('./' + remote, origin + remote);
    if (file === 'assets/completion.mjs') {
      if (text.split(processMainURL).length !== 2) throw new Error('Complete process archive download boundary changed');
      text = text.replace(processMainURL, processSnapshotURL);
    }
    await writeFile(path, text);
  }
  const manifestPath = join(dist, 'assets/canonical-universe-manifest.json');
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  const mapExports = value => {
    if (typeof value === 'string' && remoteFiles.includes(value.slice(2)) && value.startsWith('./')) return origin + value.slice(2);
    if (Array.isArray(value)) return value.map(mapExports);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, mapExports(child)]));
    return value;
  };
  await writeFile(manifestPath, JSON.stringify(mapExports(manifest), null, 2) + '\n');
  for (const directory of REMOTE_DIRECTORIES) await rm(join(dist, 'assets', directory), {recursive: true});
  for (const file of remoteFiles) await rm(join(dist, file));
  const metadata = {
    format: 'immutable-github-site-delivery-v1',
    dataset_commit: commit,
    dataset_origin: origin,
    remote_directories: REMOTE_DIRECTORIES.map(name => `assets/${name}/`),
    remote_files: remoteFiles,
    source_sha256: sourceHashes,
    research_source_sha256: {[processLogicalFile]: processSnapshotSHA},
    research_source_bytes: {[processLogicalFile]: processSnapshotBytes.length},
    process_archive_download_url: processSnapshotURL,
    note: 'All record fields, detail shards and complete compressed exports remain at dataset_origin. Resolve relative shard paths against that origin. Export links use the exact commit. The pre-existing main-branch full-corpus download link is the evolving corpus, not this frozen snapshot.'
  };
  await writeFile(join(dist, 'assets/site-delivery.json'), JSON.stringify(metadata, null, 2) + '\n');
  return metadata;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const commit = args[args.indexOf('--dataset-commit') + 1];
  const output = args[args.indexOf('--output') + 1];
  if (!args.includes('--dataset-commit') || !args.includes('--output') || !output) throw new Error('Usage: --dataset-commit <published 40-character SHA> --output <empty directory>');
  const metadata = await buildSiteDelivery(process.cwd(), commit, resolve(output));
  console.log(JSON.stringify({dataset_commit: metadata.dataset_commit, output: resolve(output), source_files: Object.keys(metadata.source_sha256).length}));
}
