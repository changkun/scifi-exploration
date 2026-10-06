import {createKnowledgeDimensionContext, validateKnowledgeDimensionEvidence, DIMENSION_INPUT_FILE} from './knowledge-dimensions-evidence.mjs';
import {createKnowledgeDimensionRound2Context, validateKnowledgeDimensionRound2Evidence} from './knowledge-dimensions-round2-evidence.mjs';
import {createKnowledgeDimensionRound3Context, validateKnowledgeDimensionRound3Evidence} from './knowledge-dimensions-round3-evidence.mjs';
import {createKnowledgeDimensionRound4Context, validateKnowledgeDimensionRound4Evidence} from './knowledge-dimensions-round4-evidence.mjs';

// Each batch keeps its own closed evidence boundary. Future inputs must add
// an explicit route; they cannot inherit an earlier batch's assumptions.
export function createDimensionEvidenceContext({repoDir}) {
  return new Map([
    [DIMENSION_INPUT_FILE, {trustedContext: createKnowledgeDimensionContext({repoDir}), validate: validateKnowledgeDimensionEvidence}],
    ['research/knowledge-dimensions-round2.json', {trustedContext: createKnowledgeDimensionRound2Context({repoDir}), validate: validateKnowledgeDimensionRound2Evidence}],
    ['research/knowledge-dimensions-round3.json', {trustedContext: createKnowledgeDimensionRound3Context({repoDir}), validate: validateKnowledgeDimensionRound3Evidence}],
    ['research/knowledge-dimensions-round4.json', {trustedContext: createKnowledgeDimensionRound4Context({repoDir}), validate: validateKnowledgeDimensionRound4Evidence}],
  ]);
}

export function validateDimensionEvidence(record, {context, inputFile, ...options}) {
  const route = context.get(inputFile);
  if (!route) throw new Error('Dimension input needs an explicit evidence route: ' + inputFile);
  return route.validate(record, {...options, inputFile, trustedContext: route.trustedContext});
}
