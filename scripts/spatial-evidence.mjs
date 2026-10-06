// Isolated fixed-input extensions; earlier R88 and R87 guards are preserved.
import {validateSpatialEvidence as validateEarlier,initialResearchSpatialBuildArguments as earlierBuildArguments} from './spatial-evidence-r88-preserved.mjs';
import {isEarlyS7SpatialRecord,validateEarlyS7SpatialEvidence} from './early-s7-spatial-evidence-v2.mjs';
import {isModernPublishedSpatialRecord,validateModernPublishedSpatialEvidence} from './modern-published-spatial-evidence-v3.mjs';
import {MODERN_SELECTION2_PUBLISHED_SPATIAL_INPUTS,MODERN_SELECTION2_SPATIAL_SELECTION_SHA256,modernSelection2PublishedSpatialIds,validateModernSelection2PublishedSpatialEvidence} from './modern-published-spatial-selection2-evidence-v1.mjs';
import {MODERN_SELECTION3_PUBLISHED_SPATIAL_INPUTS,MODERN_SELECTION3_SPATIAL_SELECTION_SHA256,modernSelection3PublishedSpatialIds,validateModernSelection3PublishedSpatialEvidence} from './modern-published-spatial-selection3-evidence-v1.mjs';
import {MODERN_SELECTION4_PUBLISHED_SPATIAL_INPUTS,MODERN_SELECTION4_SPATIAL_SELECTION_SHA256,modernSelection4PublishedSpatialIds,validateModernSelection4PublishedSpatialEvidence} from './modern-published-spatial-selection4-evidence-v1.mjs';
import {R91_FIXED_SAME_BATCH_SPATIAL_INPUTS,r91FixedSameBatchSpatialIds,validateR91FixedSameBatchSpatialEvidence} from './r91-fixed-samebatch-spatial-evidence-v2.mjs';
import {isEarlySelection5PublishedSpatialRecord,validateEarlySelection5PublishedSpatialEvidence} from './early-published-spatial-selection5-evidence-v2.mjs';
import {isR92FixedSameBatchSpatialRecord,validateR92FixedSameBatchSpatialEvidence} from './r92-fixed-samebatch-spatial-evidence-v1.mjs';
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
 if(isR92FixedSameBatchSpatialRecord(record))return validateR92FixedSameBatchSpatialEvidence(record,options);
 if(isEarlySelection5PublishedSpatialRecord(record,options))return validateEarlySelection5PublishedSpatialEvidence(record,options);
 if(Object.hasOwn(R91_FIXED_SAME_BATCH_SPATIAL_INPUTS,record.source_spatial_input_file)||modernIds('r91-same-batch',r91FixedSameBatchSpatialIds,options).has(record.id))return validateR91FixedSameBatchSpatialEvidence(record,options);
 if(Object.hasOwn(MODERN_SELECTION4_PUBLISHED_SPATIAL_INPUTS,record.source_spatial_input_file)||record.spatial_selection_sha256===MODERN_SELECTION4_SPATIAL_SELECTION_SHA256||modernIds('selection4',modernSelection4PublishedSpatialIds,options).has(record.id))return validateModernSelection4PublishedSpatialEvidence(record,options);
 if(Object.hasOwn(MODERN_SELECTION3_PUBLISHED_SPATIAL_INPUTS,record.source_spatial_input_file)||record.spatial_selection_sha256===MODERN_SELECTION3_SPATIAL_SELECTION_SHA256||modernIds('selection3',modernSelection3PublishedSpatialIds,options).has(record.id))return validateModernSelection3PublishedSpatialEvidence(record,options);
 if(Object.hasOwn(MODERN_SELECTION2_PUBLISHED_SPATIAL_INPUTS,record.source_spatial_input_file)||record.spatial_selection_sha256===MODERN_SELECTION2_SPATIAL_SELECTION_SHA256||modernIds('selection2',modernSelection2PublishedSpatialIds,options).has(record.id))return validateModernSelection2PublishedSpatialEvidence(record,options);
 if(isModernPublishedSpatialRecord(record,options))return validateModernPublishedSpatialEvidence(record,options);
 if(isEarlyS7SpatialRecord(record,options))return validateEarlyS7SpatialEvidence(record,options);
 return validateEarlier(record,options);
}
