// Compose two independently tested provenance guards; all input archives remain immutable.
import {readFileSync,realpathSync} from 'node:fs';
import {join} from 'node:path';
import {validateSpatialEvidence as validateEarlier} from './spatial-evidence-early-r88.mjs';
import {PINS,INITIAL_MODE,INITIAL_INPUT_KIND,verifyPinnedBytes,createInitialResearchSpatialContext,
  getInitialResearchCanonicalArguments,validateSpatialEvidenceProposed} from './initial-research-spatial-guard-v5-public-only-proposal.mjs';
const roots=new Map();
function trusted(root){
  const path=realpathSync(root);
  if(!roots.has(path)){
    const bytes=verifyPinnedBytes(readFileSync(join(path,PINS.derivedSpatial.file)),PINS.derivedSpatial);
    roots.set(path,{ids:new Set(JSON.parse(bytes).records.map(record=>record.id)),contexts:new Map()});
  }
  return roots.get(path);
}
function context(root,stage){
  const data=trusted(root);
  if(!data.contexts.has(stage))data.contexts.set(stage,createInitialResearchSpatialContext({repoDir:root,stage}));
  return data.contexts.get(stage);
}
function marked(record){return record?.knowledge_provenance_mode===INITIAL_MODE ||
  Object.hasOwn(record??{},'initial_research_provenance') || record?.source_analysis_file===PINS.publicAnalysis.file ||
  record?.source_spatial_original_file===PINS.originalSpatial.name;}
function initial(record,options){return marked(record) || (options.repoDir && trusted(options.repoDir).ids.has(record.id));}
function stage(work){return work?.spatial_primary==='unknown'?'pre_adoption':'post_adoption';}
// The build's partially accumulated knowledge excludes correction overlays until
// its later pass. This special input instead uses the actual canonical snapshot
// read by the trusted constructor, which binds its exact old core and grain.
export function initialResearchSpatialBuildArguments(record,{repoDir,currentWork}={}){
  if(!repoDir||!initial(record,{repoDir}))return null;
  return {...getInitialResearchCanonicalArguments(context(repoDir,stage(currentWork)),record.id),repoDir};
}
export function validateSpatialEvidence(record,options={}){
  if(initial(record,options)){
    if(!options.repoDir)throw new Error('Initial research trusted public root absent: '+record.id);
    return validateSpatialEvidenceProposed(record,{...options,inputKind:INITIAL_INPUT_KIND,
      initialResearchContext:context(options.repoDir,stage(options.currentWork))});
  }
  return validateEarlier(record,options);
}
