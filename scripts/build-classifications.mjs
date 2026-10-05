import {readFile, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root = new URL('../', import.meta.url);
const bytes = await readFile(new URL('research/classification-registry.json', root));
const registry = JSON.parse(bytes);
const axes = new Set(registry.axes.map(axis => axis.id));
const ids = new Set();
for (const category of registry.categories) {
  if (ids.has(category.id) || !axes.has(category.axis) || !category.definition || category.members.length < 2) throw new Error('Invalid classification: ' + category.id);
  ids.add(category.id);
  if (new Set(category.members.map(member => member.work_id)).size !== category.members.length || category.members.some(member => !member.basis || !member.evidence_scope || member.status !== 'interpretive_grouping_unverified')) throw new Error('Classification evidence absent: ' + category.id);
}
await writeFile(new URL('dist/assets/classification-registry.json', root), bytes);
await writeFile(new URL('dist/assets/classification-data.mjs', root), '// Generated from the versioned research registry.\nexport const CLASSIFICATION_REGISTRY = ' + JSON.stringify(registry) + ';\n');
console.log(JSON.stringify({categories: ids.size, axes: axes.size, sha256: createHash('sha256').update(bytes).digest('hex')}));
