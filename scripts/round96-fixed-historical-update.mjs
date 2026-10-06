import {createRound96FixedHistoricalContext,validateRound96FixedHistoricalUpdate,validateRound96RegistryHistoricalAppendix as previous} from './round96-fixed-historical-update-r96-preserved.mjs';
import {validateRound97DoorwaysRegistryHistoricalAppendix} from './round97-doorways-historical-evidence.mjs';
export {createRound96FixedHistoricalContext,validateRound96FixedHistoricalUpdate};
export function validateRound96RegistryHistoricalAppendix(registry,context={}){const projected=validateRound97DoorwaysRegistryHistoricalAppendix(registry,context);return previous(projected,context);}
