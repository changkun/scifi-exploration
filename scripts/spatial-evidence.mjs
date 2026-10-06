import {isR105FixedSameBatchSpatialRecord,validateR105FixedSameBatchSpatialEvidence} from './r105-fixed-samebatch-spatial-evidence-v3.mjs';
import {isEarlySelection18PublishedSpatialRecord,validateEarlySelection18PublishedSpatialEvidence} from './early-published-spatial-selection18-evidence-v2.mjs';
import {isR104FixedSameBatchSpatialRecord,validateR104FixedSameBatchSpatialEvidence} from './r104-fixed-samebatch-spatial-evidence-v2.mjs';
import {isEarlySelection17PublishedSpatialRecord,validateEarlySelection17PublishedSpatialEvidence} from './early-published-spatial-selection17-evidence-v1.mjs';
import {isEarlySelection16PublishedSpatialRecord,validateEarlySelection16PublishedSpatialEvidence} from './early-published-spatial-selection16-evidence-v1.mjs';
import {isEarlySelection15PublishedSpatialRecord,validateEarlySelection15PublishedSpatialEvidence} from './early-published-spatial-selection15-evidence-v1.mjs';
import {isEarlySelection14PublishedSpatialRecord,validateEarlySelection14PublishedSpatialEvidence} from './early-published-spatial-selection14-evidence-v2.mjs';
import {isEarlySelection13PublishedSpatialRecord,validateEarlySelection13PublishedSpatialEvidence} from './early-published-spatial-selection13-evidence-v3.mjs';
import {isEarlySelection12PublishedSpatialRecord,validateEarlySelection12PublishedSpatialEvidence} from './early-published-spatial-selection12-evidence-v2.mjs';
import {isEarlySelection11PublishedSpatialRecord,validateEarlySelection11PublishedSpatialEvidence} from './early-published-spatial-selection11-evidence-v1.mjs';
import {isR99FixedSameBatchSpatialRecord,validateR99FixedSameBatchSpatialEvidence} from './r99-fixed-samebatch-spatial-evidence-v1.mjs';
import {isR98FixedSameBatchSpatialRecord,validateR98FixedSameBatchSpatialEvidence} from './r98-fixed-samebatch-spatial-evidence-v2.mjs';
import {isEarlySelection10PublishedSpatialRecord,validateEarlySelection10PublishedSpatialEvidence} from './early-published-spatial-selection10-evidence-v1.mjs';
import {isR97FixedSameBatchSpatialRecord,validateR97FixedSameBatchSpatialEvidence} from './r97-fixed-samebatch-spatial-evidence-v1.mjs';
import {isEarlySelection9PublishedSpatialRecord,validateEarlySelection9PublishedSpatialEvidence} from './early-published-spatial-selection9-evidence-v1.mjs';
import {isR96FixedSameBatchSpatialRecord,validateR96FixedSameBatchSpatialEvidence} from './r96-fixed-samebatch-spatial-evidence-v2.mjs';
import {isR95FixedSameBatchSpatialRecord,validateR95FixedSameBatchSpatialEvidence} from './r95-fixed-samebatch-spatial-evidence-v1.mjs';
import {isEarlySelection8PublishedSpatialRecord,validateEarlySelection8PublishedSpatialEvidence} from './early-published-spatial-selection8-evidence-v1.mjs';
import {isEarlySelection6PublishedSpatialRecord,validateEarlySelection6PublishedSpatialEvidence} from './early-published-spatial-selection6-evidence-v1.mjs';
import {isR93FixedSameBatchSpatialRecord,validateR93FixedSameBatchSpatialEvidence} from './r93-fixed-samebatch-spatial-evidence-v1.mjs';
import {isEarlySelection7PublishedSpatialRecord,validateEarlySelection7PublishedSpatialEvidence} from './early-published-spatial-selection7-evidence-v1.mjs';
import {isR94FixedSameBatchSpatialRecord,validateR94FixedSameBatchSpatialEvidence} from './r94-fixed-samebatch-spatial-evidence-v1.mjs';
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
export function initialResearchSpatialBuildArguments(record,options={}){
 if(isEarlySelection18PublishedSpatialRecord(record)||isEarlySelection17PublishedSpatialRecord(record)||isEarlySelection16PublishedSpatialRecord(record)||isEarlySelection15PublishedSpatialRecord(record)||isEarlySelection14PublishedSpatialRecord(record)||isEarlySelection13PublishedSpatialRecord(record)||isEarlySelection12PublishedSpatialRecord(record)||isEarlySelection11PublishedSpatialRecord(record)||isEarlySelection10PublishedSpatialRecord(record)||isEarlySelection9PublishedSpatialRecord(record)||isEarlySelection8PublishedSpatialRecord(record)||isEarlySelection7PublishedSpatialRecord(record)){
  const currentWork=options.currentWork;
  return {...options,currentWork,issueAssertions:currentWork?.knowledge?.assertions,sourceSearchLog:currentWork?.source_search_log,spatialAdoptionPhase:currentWork?.spatial_primary==='unknown'?'pre':'post'};
 }
 return earlierBuildArguments(record,options);
}
export function validateSpatialEvidence(record,options={}){
 if(isR105FixedSameBatchSpatialRecord(record))return validateR105FixedSameBatchSpatialEvidence(record,options);
 if(isEarlySelection18PublishedSpatialRecord(record))return validateEarlySelection18PublishedSpatialEvidence(record,options);
 if(isR104FixedSameBatchSpatialRecord(record))return validateR104FixedSameBatchSpatialEvidence(record,options);
 if(isEarlySelection17PublishedSpatialRecord(record))return validateEarlySelection17PublishedSpatialEvidence(record,options);
 if(isEarlySelection16PublishedSpatialRecord(record))return validateEarlySelection16PublishedSpatialEvidence(record,options);
 if(isEarlySelection15PublishedSpatialRecord(record))return validateEarlySelection15PublishedSpatialEvidence(record,options);
 if(isEarlySelection14PublishedSpatialRecord(record))return validateEarlySelection14PublishedSpatialEvidence(record,options);
 if(isEarlySelection13PublishedSpatialRecord(record))return validateEarlySelection13PublishedSpatialEvidence(record,options);
 if(isEarlySelection12PublishedSpatialRecord(record))return validateEarlySelection12PublishedSpatialEvidence(record,options);
 if(isEarlySelection11PublishedSpatialRecord(record))return validateEarlySelection11PublishedSpatialEvidence(record,options);
 if(isR99FixedSameBatchSpatialRecord(record))return validateR99FixedSameBatchSpatialEvidence(record,options);
 if(isR98FixedSameBatchSpatialRecord(record))return validateR98FixedSameBatchSpatialEvidence(record,options);
 if(isR97FixedSameBatchSpatialRecord(record))return validateR97FixedSameBatchSpatialEvidence(record,options);
 if(isR96FixedSameBatchSpatialRecord(record))return validateR96FixedSameBatchSpatialEvidence(record,options);
 if(isEarlySelection9PublishedSpatialRecord(record))return validateEarlySelection9PublishedSpatialEvidence(record,options);
 if(isEarlySelection10PublishedSpatialRecord(record))return validateEarlySelection10PublishedSpatialEvidence(record,options);
 if(isR95FixedSameBatchSpatialRecord(record))return validateR95FixedSameBatchSpatialEvidence(record,options);
 if(isEarlySelection8PublishedSpatialRecord(record))return validateEarlySelection8PublishedSpatialEvidence(record,options);
 if(isEarlySelection7PublishedSpatialRecord(record))return validateEarlySelection7PublishedSpatialEvidence(record,options);
 if(isR94FixedSameBatchSpatialRecord(record))return validateR94FixedSameBatchSpatialEvidence(record,options);
 if(isEarlySelection6PublishedSpatialRecord(record))return validateEarlySelection6PublishedSpatialEvidence(record,options);
 if(isR93FixedSameBatchSpatialRecord(record))return validateR93FixedSameBatchSpatialEvidence(record,options);
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
