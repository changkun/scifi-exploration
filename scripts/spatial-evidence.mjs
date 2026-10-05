// Isolated fixed-input extensions; earlier R88 and R87 guards are preserved.
import {validateSpatialEvidence as validateEarlier,initialResearchSpatialBuildArguments as earlierBuildArguments} from './spatial-evidence-r88-preserved.mjs';
import {isEarlyS7SpatialRecord,validateEarlyS7SpatialEvidence} from './early-s7-spatial-evidence-v2.mjs';
import {isModernPublishedSpatialRecord,validateModernPublishedSpatialEvidence} from './modern-published-spatial-evidence-v3.mjs';
export function initialResearchSpatialBuildArguments(record,options={}){return earlierBuildArguments(record,options);}
export function validateSpatialEvidence(record,options={}){
 if(isModernPublishedSpatialRecord(record,options))return validateModernPublishedSpatialEvidence(record,options);
 if(isEarlyS7SpatialRecord(record,options))return validateEarlyS7SpatialEvidence(record,options);
 return validateEarlier(record,options);
}
