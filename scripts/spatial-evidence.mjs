// Isolated fixed-input extensions; earlier R88 and R87 guards are preserved.
import {validateSpatialEvidence as validateEarlier,initialResearchSpatialBuildArguments as earlierBuildArguments} from './spatial-evidence-r88-preserved.mjs';
import {isEarlyS7SpatialRecord,validateEarlyS7SpatialEvidence} from './early-s7-spatial-evidence-v2.mjs';
import {isModernPublishedSpatialRecord,validateModernPublishedSpatialEvidence} from './modern-published-spatial-evidence-v3.mjs';
import {MODERN_SELECTION2_PUBLISHED_SPATIAL_INPUTS,MODERN_SELECTION2_SPATIAL_SELECTION_SHA256,modernSelection2PublishedSpatialIds,validateModernSelection2PublishedSpatialEvidence} from './modern-published-spatial-selection2-evidence-v1.mjs';
import {MODERN_SELECTION3_PUBLISHED_SPATIAL_INPUTS,MODERN_SELECTION3_SPATIAL_SELECTION_SHA256,modernSelection3PublishedSpatialIds,validateModernSelection3PublishedSpatialEvidence} from './modern-published-spatial-selection3-evidence-v1.mjs';
// Routing memo avoids rereading the same immutable ID lists for every old spatial assertion.
// The actual validators still verify exact file bytes and every original record binding.
const fixedModernIds=new Map();
function modernIds(phase,getIds,options){
 const key=JSON.stringify([phase,options.repoDir||null,options.evidenceDir||null]);
 if(!fixedModernIds.has(key))fixedModernIds.set(key,getIds(options));
 return fixedModernIds.get(key);
}
export function initialResearchSpatialBuildArguments(record,options={}){return earlierBuildArguments(record,options);}
export function validateSpatialEvidence(record,options={}){
 if(Object.hasOwn(MODERN_SELECTION3_PUBLISHED_SPATIAL_INPUTS,record.source_spatial_input_file)||record.spatial_selection_sha256===MODERN_SELECTION3_SPATIAL_SELECTION_SHA256||modernIds('selection3',modernSelection3PublishedSpatialIds,options).has(record.id))return validateModernSelection3PublishedSpatialEvidence(record,options);
 if(Object.hasOwn(MODERN_SELECTION2_PUBLISHED_SPATIAL_INPUTS,record.source_spatial_input_file)||record.spatial_selection_sha256===MODERN_SELECTION2_SPATIAL_SELECTION_SHA256||modernIds('selection2',modernSelection2PublishedSpatialIds,options).has(record.id))return validateModernSelection2PublishedSpatialEvidence(record,options);
 if(isModernPublishedSpatialRecord(record,options))return validateModernPublishedSpatialEvidence(record,options);
 if(isEarlyS7SpatialRecord(record,options))return validateEarlyS7SpatialEvidence(record,options);
 return validateEarlier(record,options);
}
