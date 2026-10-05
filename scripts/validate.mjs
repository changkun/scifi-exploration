#!/usr/bin/env node
// Run: node scripts/validate.mjs
// Development placeholder only: node scripts/validate.mjs --allow-empty-bibliography
// The default command is the publication gate: the external bibliography must be nonempty.
import assert from 'node:assert/strict';
import { readFile, stat, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { gunzipSync } from 'node:zlib';
import path from 'node:path';

const project = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(project, 'dist');
const flags = new Set(process.argv.slice(2));
if (flags.has('--help') || flags.has('-h')) {
  console.log('Usage: node scripts/validate.mjs [--allow-empty-bibliography]\nDefault validation requires a nonempty bibliography for publication.');
} else {
  const failures = [];
  let passed = 0;
  const run = async (name, check) => {
    try { await check(); passed++; console.log(`PASS ${name}`); }
    catch (error) { failures.push({ name, message: error.message }); console.error(`FAIL ${name}: ${error.message}`); }
  };
  const text = value => typeof value === 'string' && value.trim().length > 0;
  const recordObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
  const sameIds = (a, b) => assert.deepEqual([...new Set(a)].sort(), [...new Set(b)].sort());
  const idList = records => records.map(record => record.id);
  const readJSON = async name => JSON.parse(await readFile(path.join(dist, 'assets', name), 'utf8'));
  const archiveCache = new Map();
  const readArchive = async relative => {
    if (!archiveCache.has(relative)) archiveCache.set(relative, readFile(path.join(project, relative)).then(buffer => JSON.parse(gunzipSync(buffer).toString('utf8'))));
    return archiveCache.get(relative);
  };
  const flattenBibliography = async data => {
    if (data.format !== 'source-index-manifest-v1') return data;
    assert(Array.isArray(data.chunks), 'Index manifest chunks must be an array');
    assert.equal(new Set(data.chunks).size, data.chunks.length, 'Duplicate index chunk path');
    const chunks = await Promise.all(data.chunks.map(async relative => {
      assert(typeof relative === 'string' && /^\.\/assets\/bibliography-index\/[A-Za-z0-9_-]+\.json$/.test(relative), `Invalid index chunk path: ${relative}`);
      const chunk = JSON.parse(await readFile(path.join(dist, relative), 'utf8'));
      assert(Array.isArray(chunk.records), `${relative}: index chunk lacks records`);
      return chunk.records;
    }));
    const records = chunks.flat();
    assert(Number.isSafeInteger(data.metadata?.record_count) && data.metadata.record_count >= 0, 'Manifest metadata.record_count must be an integer');
    assert.equal(records.length, data.metadata.record_count, 'All index chunks must match declared record count');
    assert.equal(new Set(idList(records)).size, records.length, 'Duplicate record ID across index chunks');
    return { ...data, records };
  };
  const yearOf = work => work.sort_year ?? work.first_year;
  const https = value => {
    if (!text(value)) return false;
    try { const url = new URL(value); return url.protocol === 'https:' && !!url.hostname && !url.username && !url.password; } catch { return false; }
  };

  try {
    for (const flag of flags) assert.equal(flag, '--allow-empty-bibliography', `Unknown option: ${flag}`);
    const [catalog, content, spatial, bibliographyData] = await Promise.all(['catalog.json', 'content.json', 'spatial.json', 'bibliography.json'].map(readJSON));
    const bibliography = await flattenBibliography(bibliographyData);
    const { DEFAULT_STATE, DURATIONS, SCIENCES, filterWorks, stateFromURL, searchFromState } = await import(new URL('../dist/assets/model.mjs', import.meta.url));
    const works = catalog.works;
    assert(Array.isArray(works), 'catalog.works must be an array');
    const ids = new Set(idList(works));
    const state = values => ({ ...DEFAULT_STATE, ...values });
    const filtered = values => filterWorks(works, state(values));

    await run('catalog: 168 records and unique nonempty IDs', () => {
      assert.equal(works.length, 168); assert.equal(ids.size, works.length);
      works.forEach(work => assert(text(work.id), 'Empty catalog ID'));
      assert.equal(catalog.metadata.record_count, works.length);
    });
    await run('catalog: display, classification and year fields', () => {
      for (const work of works) {
        for (const key of ['title_zh', 'title_original', 'author', 'year_display', 'year_note', 'language_tradition', 'form']) assert(text(work[key]), `${work.id}: invalid ${key}`);
        assert(Number.isInteger(work.first_year), `${work.id}: first_year must be an integer`);
        assert(Number.isInteger(yearOf(work)), `${work.id}: sort year must be an integer`);
        for (const key of ['topics', 'branches']) assert(Array.isArray(work[key]) && work[key].length && work[key].every(text), `${work.id}: invalid ${key}`);
        assert(DURATIONS.includes(work.duration), `${work.id}: unknown duration`);
        assert(SCIENCES.includes(work.science_class), `${work.id}: unknown scientific premise`);
        assert(['科幻作品', '科幻前史', '混合与边界参照'].includes(work.inclusion_status), `${work.id}: unknown inclusion status`);
      }
      assert.equal(works.find(work => work.id === 'early01')?.year_display, '约2世纪');
    });
    await run('catalog: inclusion counts match metadata', () => {
      const counts = {};
      works.forEach(work => { counts[work.inclusion_status] = (counts[work.inclusion_status] || 0) + 1; });
      assert.deepEqual(counts, catalog.metadata.inclusion_counts);
      assert.deepEqual(counts, { '科幻前史': 5, '科幻作品': 160, '混合与边界参照': 3 });
    });
    await run('content: 9 periods, 12 topics and 5 routes', () => {
      assert.equal(content.periods.length, 9); assert.equal(content.topics.length, 12); assert.equal(content.routes.length, 5);
      for (const group of [content.periods, content.topics, content.routes]) assert.equal(new Set(idList(group)).size, group.length, 'Duplicate navigation ID');
    });
    await run('content: every work reference exists', () => {
      function visit(value, location = 'content') {
        if (Array.isArray(value)) value.forEach((item, index) => visit(item, `${location}[${index}]`));
        else if (recordObject(value)) for (const [key, item] of Object.entries(value)) {
          if (key === 'work_ids' || key === 'anchor_work_ids') {
            assert(Array.isArray(item), `${location}.${key} must be an array`);
            item.forEach(id => assert(ids.has(id), `${location}.${key}: missing catalog ID ${id}`));
          } else visit(item, `${location}.${key}`);
        }
      }
      visit(content);
      for (const route of content.routes) sameIds(route.work_ids, route.steps.flatMap(step => step.work_ids));
      const topics = new Set(works.flatMap(work => work.topics));
      content.topics.forEach(topic => assert(topics.has(topic.title), `Navigation topic not in catalog: ${topic.title}`));
    });
    await run('spatial: 168 unique IDs, no missing or additional work', () => {
      assert(Array.isArray(spatial.works)); assert.equal(spatial.works.length, 168);
      assert.equal(new Set(idList(spatial.works)).size, spatial.works.length);
      sameIds(idList(spatial.works), idList(works));
      assert.equal(spatial.metadata.record_count, spatial.works.length);
    });
    await run('spatial: primary and secondary zones are valid', () => {
      const expected = ['earth', 'planetary', 'interstellar', 'galactic', 'cosmic', 'abstract'];
      sameIds(spatial.zones.map(zone => zone.id), expected);
      assert.equal(spatial.zones.length, expected.length);
      const counts = {};
      for (const work of spatial.works) {
        assert(expected.includes(work.primary), `${work.id}: invalid primary zone ${work.primary}`);
        assert(Array.isArray(work.secondary), `${work.id}: secondary must be an array`);
        work.secondary.forEach(zone => assert(expected.includes(zone), `${work.id}: invalid secondary zone ${zone}`));
        counts[work.primary] = (counts[work.primary] || 0) + 1;
      }
      assert.deepEqual(counts, spatial.metadata.counts_by_primary);
    });
    await run('resources: required local files exist and are nonempty', async () => {
      const resources = ['index.html', 'report.html', 'assets/app.js', 'assets/model.mjs', 'assets/style.css', 'assets/cosmos.css', 'assets/universe.mjs', 'assets/chronology.mjs', 'assets/chronology.css', 'assets/bibliography.mjs', 'assets/bibliography.css', 'assets/taxonomy.mjs', 'assets/genre-hierarchy.json', 'assets/catalog.json', 'assets/catalog.csv', 'assets/content.json', 'assets/spatial.json', 'assets/bibliography.json', 'assets/report.md', 'assets/icon.svg', 'assets/earth-day.jpg', 'assets/earth-attribution.json', 'assets/vendor/three.module.min.js', 'assets/vendor/three.core.min.js', 'assets/vendor/three-LICENSE.txt'];
      await Promise.all(resources.map(async resource => { const info = await stat(path.join(dist, resource)); assert(info.isFile() && info.size > 0, `Missing or empty resource: ${resource}`); }));
    });
    await run('resources: runtime files and shards are at most 5 MiB; whole exports stay in repository', async () => {
      const repositoryExports = new Set(['assets/issue-analysis.json.gz']);
      async function walk(directory) {
        const entries = await readdir(directory, { withFileTypes: true });
        for (const entry of entries) {
          const filename = path.join(directory, entry.name);
          if (entry.isDirectory()) await walk(filename);
          else { const info = await stat(filename); assert(info.isFile(), `Unsupported dist entry: ${filename}`); const relative = path.relative(dist, filename); assert(repositoryExports.has(relative) || info.size <= 5 * 1024 * 1024, `${relative} exceeds 5 MiB (${info.size} bytes)`); }
        }
      }
      await walk(dist);
    });
    await run('resources: index local references and 168 report anchors', async () => {
      const index = await readFile(path.join(dist, 'index.html'), 'utf8');
      for (const [, reference] of index.matchAll(/(?:href|src)\s*=\s*["']([^"']+)["']/g)) {
        if (reference.startsWith('#') || /^(?:https?:|data:|mailto:)/.test(reference)) continue;
        const resource = reference.split(/[?#]/)[0];
        assert((await stat(path.resolve(dist, resource))).isFile(), `Broken index reference: ${reference}`);
      }
      const report = await readFile(path.join(dist, 'report.html'), 'utf8');
      const anchors = [...report.matchAll(/\bid=["'](record-\d{3})["']/g)].map(match => match[1]);
      assert.equal(anchors.length, 168); assert.equal(new Set(anchors).size, 168);
      works.forEach((_, index) => assert(anchors.includes(`record-${String(index + 1).padStart(3, '0')}`)));
    });

    await run('model: curated boundary toggle returns 160 or 168 records', () => {
      assert.equal(filtered({}).length, 160); assert.equal(filtered({ boundary: true }).length, 168);
    });
    await run('model: 1940—1959 has 20 works; year endpoints are inclusive', () => {
      const era = filtered({ era: '1940' }); assert.equal(era.length, 20);
      sameIds(idList(era), idList(filtered({ yearMin: 1940, yearMax: 1959 })));
      const expected = works.filter(work => work.inclusion_status === '科幻作品' && yearOf(work) === 2008);
      sameIds(idList(filtered({ yearMin: 2008, yearMax: 2008 })), idList(expected));
    });
    await run('model: serial sort year is used independently of book edition year', () => {
      const skylark = works.find(work => work.id === 'extra03');
      assert.equal(skylark.first_year, 1946); assert.equal(skylark.sort_year, 1928);
      assert(filtered({ era: '1900' }).some(work => work.id === skylark.id));
      assert(!filtered({ era: '1940' }).some(work => work.id === skylark.id));
    });
    await run('model: Three-Body title and series aliases each find three volumes', () => {
      for (const query of ['三体', '地球往事', '三体三部曲']) sameIds(idList(filtered({ query })), ['global10a', 'global10b', 'global10c']);
    });
    await run('model: combined filters intersect instead of replacing each other', () => {
      const base = { query: '三体', language: '中文', form: '长篇', branch: '硬科幻', science: '强反事实设定', yearMin: 2008, yearMax: 2010 };
      assert.equal(filtered(base).length, 3);
      sameIds(idList(filtered({ ...base, topic: '文明与历史' })), ['global10b', 'global10c']);
      sameIds(idList(filtered({ ...base, topic: '文明与历史', duration: '多代—百年' })), ['global10b']);
      assert.equal(filtered({ ...base, language: '法语' }).length, 0);
    });
    await run('model: one-sided year ranges and sorting', () => {
      sameIds(idList(filtered({ boundary: true, yearMax: 1799 })), idList(works.filter(work => yearOf(work) <= 1799)));
      const newest = filtered({ yearMin: 2020, sort: 'newest' });
      assert(newest.every(work => yearOf(work) >= 2020));
      assert(newest.every((work, index) => index === 0 || yearOf(newest[index - 1]) >= yearOf(work)));
      const oldest = filtered({ sort: 'oldest' });
      assert(oldest.every((work, index) => index === 0 || yearOf(oldest[index - 1]) <= yearOf(work)));
    });
    await run('model: URL preserves valid state, years and work ID', () => {
      const input = state({ query: '三体 文明', topic: '文明与历史', branch: '硬科幻', era: '2000', duration: '多代—百年', science: '强反事实设定', language: '中文', form: '长篇', boundary: true, yearMin: 2000, yearMax: 2010, sort: 'newest', layout: 'table', page: 3 });
      const encoded = searchFromState(input, 'global10b');
      assert.deepEqual(stateFromURL(`?${encoded}`, works), input);
      assert.equal(new URLSearchParams(encoded).get('work'), 'global10b');
      assert.equal(searchFromState(state(), ''), '');
    });
    await run('model: malformed URL values are cleaned', () => {
      const malformed = stateFromURL('?topic=missing&branch=missing&era=2099&duration=missing&science=missing&language=missing&form=missing&sort=reverse&layout=wide&boundary=yes&page=-8&yearMin=-100junk&yearMax=20e2', works);
      assert.deepEqual(malformed, state());
      for (const query of ['?yearMin=2020&yearMax=1900', '?yearMin=2000.5&yearMax=NaN', '?yearMin=&yearMax=2025junk']) {
        const result = stateFromURL(query, works); assert.equal(result.yearMin, null); assert.equal(result.yearMax, null);
      }
      assert.equal(stateFromURL('?page=999999', works).page, 1000);
      assert.equal(stateFromURL('?yearMin=0&yearMax=2025', works).yearMin, 0);
    });

    await run('bibliography: actual metadata/records container structure', () => {
      assert(recordObject(bibliography.metadata), 'bibliography.metadata must be an object');
      assert(Array.isArray(bibliography.records), 'bibliography.records must be an array (not works or items)');
      assert(text(bibliography.metadata.coverage), 'bibliography.metadata.coverage must state source scope');
      if (bibliography.metadata.fetched_count !== undefined) assert(Number.isSafeInteger(bibliography.metadata.fetched_count) && bibliography.metadata.fetched_count >= bibliography.records.length, 'fetched_count must be an integer at least as large as imported records');
    });
    await run('bibliography: unique Wikidata IDs, title strings and HTTPS source_url', () => {
      const seen = new Set();
      for (const record of bibliography.records) {
        assert(recordObject(record), 'Bibliography record must be an object');
        assert(typeof record.id === 'string' && /^Q[1-9]\d*$/.test(record.id), `Invalid Wikidata ID: ${record.id}`);
        assert(!seen.has(record.id), `Duplicate Wikidata ID: ${record.id}`); seen.add(record.id);
        assert(text(record.title), `${record.id}: title must be a nonempty string`);
        assert(https(record.source_url), `${record.id}: source_url must be a valid HTTPS URL`);
        for (const key of ['authors', 'subjects']) if (record[key] !== undefined) assert(Array.isArray(record[key]) && record[key].every(text), `${record.id}: ${key} must be a string array`);
        if (record.first_year !== undefined && record.first_year !== null) assert(Number.isInteger(record.first_year), `${record.id}: first_year must be an integer or null`);
      }
    });
    await run('bibliography: full records preserve source fields and all index identities', async () => {
      if (!bibliography.records.length && flags.has('--allow-empty-bibliography')) return;
      const [source, full] = await Promise.all([readArchive('research/expanded-catalog.json.gz'), readArchive('research/structured-bibliography.json.gz')]);
      const fullById = new Map(full.records.map(record => [record.id, record]));
      assert.equal(fullById.size, bibliography.records.length);
      assert.deepEqual(full.related_entities, source.related_entities);
      for (const record of source.works) {
        const exported = fullById.get(record.id);
        assert(exported, `${record.id}: missing full record`);
        for (const [key, value] of Object.entries(record)) assert.deepEqual(exported[key], value, `${record.id}: original field changed: ${key}`);
      }
      for (const record of bibliography.records) assert(fullById.has(record.id), `${record.id}: index ID absent in full records`);
      assert.equal(full.records.filter(record => record.topic_candidates.length).length, full.metadata.records_with_topic_candidates);
    });
    await run('bibliography: every lazy detail chunk exists and retains full record data', async () => {
      if (!bibliography.records.length && flags.has('--allow-empty-bibliography')) return;
      const full = await readArchive('research/structured-bibliography.json.gz');
      const fullById = new Map(full.records.map(record => [record.id, record]));
      const chunks = new Map();
      for (const record of bibliography.records) {
        assert(/^\.\/assets\/bibliography-details\/\d{3}\.json$/.test(record.detail_url));
        if (!chunks.has(record.detail_url)) {
          const data = JSON.parse(await readFile(path.join(project, 'dist', record.detail_url), 'utf8'));
          chunks.set(record.detail_url, new Map(data.records.map(item => [item.id, item])));
        }
        assert.deepEqual(chunks.get(record.detail_url).get(record.id), fullById.get(record.id), `${record.id}: detail differs from full export`);
      }
      assert.equal([...chunks.values()].reduce((sum, chunk) => sum + chunk.size, 0), bibliography.records.length);
    });
    await run('bibliography: publication requires at least one external record', () => {
      assert(flags.has('--allow-empty-bibliography') || bibliography.records.length > 0, 'Empty development placeholder; fetch real records before publication, or use --allow-empty-bibliography for development only');
    });
    console.log(`\n${passed} checks passed; ${failures.length} failed. Catalog: ${works.length}; external bibliography: ${bibliography.records.length}.`);
    if (!bibliography.records.length && flags.has('--allow-empty-bibliography')) console.log('Development placeholder explicitly allowed. Run without this flag before publication.');
    if (failures.length) process.exitCode = 1;
  } catch (error) {
    console.error(`Validation could not complete: ${error.message}`); process.exitCode = 1;
  }
}
