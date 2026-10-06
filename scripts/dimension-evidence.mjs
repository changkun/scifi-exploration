import {createKnowledgeDimensionContext, validateKnowledgeDimensionEvidence, DIMENSION_INPUT_FILE} from './knowledge-dimensions-evidence.mjs';
import {createKnowledgeDimensionRound2Context, validateKnowledgeDimensionRound2Evidence} from './knowledge-dimensions-round2-evidence.mjs';
import {createKnowledgeDimensionRound3Context, validateKnowledgeDimensionRound3Evidence} from './knowledge-dimensions-round3-evidence.mjs';
import {createKnowledgeDimensionRound4Context, validateKnowledgeDimensionRound4Evidence} from './knowledge-dimensions-round4-evidence.mjs';
import {createKnowledgeDimensionRound5Context, validateKnowledgeDimensionRound5Evidence} from './knowledge-dimensions-round5-evidence.mjs';
import {createKnowledgeDimensionRound6Context, validateKnowledgeDimensionRound6Evidence} from './knowledge-dimensions-round6-evidence.mjs';
import {createKnowledgeDimensionRound7Context, validateKnowledgeDimensionRound7Evidence} from './knowledge-dimensions-round7-evidence.mjs';
import {createKnowledgeDimensionRound8Context, validateKnowledgeDimensionRound8Evidence} from './knowledge-dimensions-round8-evidence.mjs';
import {createKnowledgeDimensionRound9Context, validateKnowledgeDimensionRound9Evidence} from './knowledge-dimensions-round9-evidence.mjs';
import {createKnowledgeDimensionRound10Context, validateKnowledgeDimensionRound10Evidence} from './knowledge-dimensions-round10-evidence.mjs';

// Each batch keeps its own closed evidence boundary. Future inputs must add
// an explicit route; they cannot inherit an earlier batch's assumptions.
export function createDimensionEvidenceContext({repoDir}) {
  return new Map([
    [DIMENSION_INPUT_FILE, {trustedContext: createKnowledgeDimensionContext({repoDir}), validate: validateKnowledgeDimensionEvidence}],
    ['research/knowledge-dimensions-round2.json', {trustedContext: createKnowledgeDimensionRound2Context({repoDir}), validate: validateKnowledgeDimensionRound2Evidence}],
    ['research/knowledge-dimensions-round3.json', {trustedContext: createKnowledgeDimensionRound3Context({repoDir}), validate: validateKnowledgeDimensionRound3Evidence}],
    ['research/knowledge-dimensions-round4.json', {trustedContext: createKnowledgeDimensionRound4Context({repoDir}), validate: validateKnowledgeDimensionRound4Evidence}],
    ['research/knowledge-dimensions-round5.json', {trustedContext: createKnowledgeDimensionRound5Context({repoDir}), validate: validateKnowledgeDimensionRound5Evidence}],
    ['research/knowledge-dimensions-round6.json', {trustedContext: createKnowledgeDimensionRound6Context({repoDir}), validate: validateKnowledgeDimensionRound6Evidence}],
    ['research/knowledge-dimensions-round7.json', {trustedContext: createKnowledgeDimensionRound7Context({repoDir}), validate: validateKnowledgeDimensionRound7Evidence}],
    ['research/knowledge-dimensions-round8.json', {trustedContext: createKnowledgeDimensionRound8Context({repoDir}), validate: validateKnowledgeDimensionRound8Evidence}],
    ['research/knowledge-dimensions-round9.json', {trustedContext: createKnowledgeDimensionRound9Context({repoDir}), validate: validateKnowledgeDimensionRound9Evidence}],
    ['research/knowledge-dimensions-round10.json', {trustedContext: createKnowledgeDimensionRound10Context({repoDir}), validate: validateKnowledgeDimensionRound10Evidence}],
  ]);
}

export function validateDimensionEvidence(record, {context, inputFile, ...options}) {
  const route = context.get(inputFile);
  if (!route) throw new Error('Dimension input needs an explicit evidence route: ' + inputFile);
  return route.validate(record, {...options, inputFile, trustedContext: route.trustedContext});
}
