import {createV23NavigationContext,isV23NavigationReview,validateV23NavigationReview as previous} from './classification-v23-navigation-evidence-v3-preserved.mjs';
import {validateRound96RegistryHistoricalAppendix} from './round96-fixed-historical-update.mjs';
export {createV23NavigationContext,isV23NavigationReview};
export function validateV23NavigationReview(review,context={}){const original=validateRound96RegistryHistoricalAppendix(context.registry,{repoDir:context.repoDir});return previous(review,{...context,registry:{...context.registry,discovery_evidence_updates:original}});}
