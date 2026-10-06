import {createHash} from 'node:crypto';
import {readFileSync,existsSync} from 'node:fs';
import {join,basename} from 'node:path';
// Private selection7 closed guard: original300 are preserved,298 adoptable,2 withheld.
// No old mode/guard is imported or modified. All existing reads remain original scoped reads.
export const EARLY_SELECTION7_PUBLISHED_SPATIAL_INPUTS=Object.freeze({
  "early-published-spatial-selection7-round1.json": "193418aaaabdf5ce70c4f20c5424f70837a74593744c1abe4391397075a8c307",
  "early-published-spatial-selection7-round2.json": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
  "early-published-spatial-selection7-round3.json": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
  "early-published-spatial-selection7-round4.json": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
  "early-published-spatial-selection7-round5.json": "88d6610201cd396975169e92b66a74fe68088e9fff2dcc01a10554433c2c66a7",
  "early-published-spatial-selection7-round6.json": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962"
});
export const EARLY_SELECTION7_CHECKPOINT_INPUTS=Object.freeze({
  "early-published-spatial-expansion-selection7-checkpoint1.json": "f87de08b384521f6f05c890e61449375c104d7374a3c66b7e23bcd5ca577d5f0",
  "early-published-spatial-expansion-selection7-checkpoint2.json": "2d183ccc10036a55b3feeeb1ed593fb760f2e07f2454143e3179649557fdbf4f",
  "early-published-spatial-expansion-selection7-checkpoint3.json": "ecf01c80351f314f9e995d63a541de9396ab4b2359b4578a71998fa67b86e31a",
  "early-published-spatial-expansion-selection7-checkpoint4.json": "f35c7d1b67fe378231e524eb56709f08a91c7424845d82852d7b1546e743df02",
  "early-published-spatial-expansion-selection7-checkpoint5.json": "17ba3a413420079dc0ef99dbf0bc75e133bec667f324f0859a75e2952c1bb734",
  "early-published-spatial-expansion-selection7-checkpoint6.json": "b512055ca30e0d922aa2761a346d8f5da393795b0afbe4bf6376d825ea8f1585"
});
export const EARLY_SELECTION7_ROOT_REVIEW_INPUTS=Object.freeze({
  "round94-root-first-checkpoints-semantic-review-private.json": "d63f62677c9fd66bfb8437e1a8159c6f5ed47e4fd820b97cf0dc80f6340d3606",
  "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json": "c5c0eada9581676fec59ef5ad254f2cafe69b2b396e66e2758ff570423218704",
  "round94-selection7-part5-semantic-review-modern-private.json": "42214d0003ba95558a9d9eeb7a854ea12c243a368c6804b0d69d1fa3722ef6a0"
});
export const EARLY_SELECTION7_SOURCE_ROLE_ADAPTER_INPUTS=Object.freeze({
  "early-published-spatial-selection7-member-source-role-adapter-v1.json": "a26a7c7c612b81259c0e9429ce1758032bd740ad0a6ed5b2d72e6ab616f52ddf",
  "early-published-spatial-selection7-additional-source-role-adapter-v1.json": "47966d3c62fa1a37a2aab52c7518f07c42ac8e8c79072d4dccd6d1aef16dd31f"
});
export const EARLY_SELECTION7_WITHHELD_IDS=Object.freeze([
  "Q6798449",
  "Q29918070"
]);
export const EARLY_SELECTION7_SPATIAL_SELECTION_FILE="early-published-spatial-expansion-selection7.json";
export const EARLY_SELECTION7_SPATIAL_SELECTION_SHA256="cbc5ea16771f0d7710a9527f68a07be5d9b6d24a873ab0c0f5a2d2be2cac58b2";
export const EARLY_SELECTION7_CANONICAL_SNAPSHOT_SHA256="7b4ac5886d4ff44d1f86d343c7213b8dc7027eacea4c85fddebcb7a5e64d8b8f";
export const EARLY_SELECTION7_SKIP_ADAPTER_FILE="round94-early-S7-global-two-exclusion-adapter-private.json";
export const EARLY_SELECTION7_SKIP_ADAPTER_SHA256="a0b36dfa88c736a3fa6e3bad4629e6e713e3fc7676d59866de7d28b00324ba72";
export const EARLY_SELECTION7_PUBLISHED_RECEIPT_FILE="round93-published-site.json";
export const EARLY_SELECTION7_PUBLISHED_RECEIPT_SHA256="22f50998216fb6ef30ec41736d8c383428d8e5a7216fdd7a5f981919b1416ecd";
const FIXED_ID_TO_FILE=Object.freeze({
  "Q137806760": "early-published-spatial-selection7-round1.json",
  "Q134098155": "early-published-spatial-selection7-round1.json",
  "Q136452465": "early-published-spatial-selection7-round1.json",
  "Q113214640": "early-published-spatial-selection7-round1.json",
  "Q137003729": "early-published-spatial-selection7-round1.json",
  "Q131445223": "early-published-spatial-selection7-round1.json",
  "Q135206358": "early-published-spatial-selection7-round1.json",
  "Q55230555": "early-published-spatial-selection7-round1.json",
  "Q102076238": "early-published-spatial-selection7-round1.json",
  "Q134529150": "early-published-spatial-selection7-round1.json",
  "Q139881240": "early-published-spatial-selection7-round1.json",
  "Q62698506": "early-published-spatial-selection7-round1.json",
  "Q133306305": "early-published-spatial-selection7-round1.json",
  "Q139881238": "early-published-spatial-selection7-round1.json",
  "Q137874076": "early-published-spatial-selection7-round1.json",
  "Q139881234": "early-published-spatial-selection7-round1.json",
  "Q24034555": "early-published-spatial-selection7-round1.json",
  "Q110276832": "early-published-spatial-selection7-round1.json",
  "Q125458800": "early-published-spatial-selection7-round1.json",
  "Q134715513": "early-published-spatial-selection7-round1.json",
  "Q19263901": "early-published-spatial-selection7-round1.json",
  "Q21893609": "early-published-spatial-selection7-round1.json",
  "Q54807336": "early-published-spatial-selection7-round1.json",
  "Q21512452": "early-published-spatial-selection7-round1.json",
  "Q55230372": "early-published-spatial-selection7-round1.json",
  "Q131382269": "early-published-spatial-selection7-round1.json",
  "Q133445347": "early-published-spatial-selection7-round1.json",
  "Q133445431": "early-published-spatial-selection7-round1.json",
  "Q114414730": "early-published-spatial-selection7-round1.json",
  "Q137824848": "early-published-spatial-selection7-round1.json",
  "Q16608557": "early-published-spatial-selection7-round1.json",
  "Q108912961": "early-published-spatial-selection7-round1.json",
  "Q134720546": "early-published-spatial-selection7-round1.json",
  "Q15221218": "early-published-spatial-selection7-round1.json",
  "Q16010795": "early-published-spatial-selection7-round1.json",
  "Q16646479": "early-published-spatial-selection7-round1.json",
  "Q3563140": "early-published-spatial-selection7-round1.json",
  "Q54802746": "early-published-spatial-selection7-round1.json",
  "Q2391923": "early-published-spatial-selection7-round1.json",
  "Q2509857": "early-published-spatial-selection7-round1.json",
  "Q7736686": "early-published-spatial-selection7-round1.json",
  "Q108535556": "early-published-spatial-selection7-round1.json",
  "Q131472325": "early-published-spatial-selection7-round1.json",
  "Q135094390": "early-published-spatial-selection7-round1.json",
  "Q16671459": "early-published-spatial-selection7-round1.json",
  "Q7100133": "early-published-spatial-selection7-round1.json",
  "Q7770704": "early-published-spatial-selection7-round1.json",
  "Q27976097": "early-published-spatial-selection7-round1.json",
  "Q6061022": "early-published-spatial-selection7-round1.json",
  "Q6304848": "early-published-spatial-selection7-round1.json",
  "Q131382101": "early-published-spatial-selection7-round2.json",
  "Q10566247": "early-published-spatial-selection7-round2.json",
  "Q133801718": "early-published-spatial-selection7-round2.json",
  "Q55230504": "early-published-spatial-selection7-round2.json",
  "Q6029515": "early-published-spatial-selection7-round2.json",
  "Q6322734": "early-published-spatial-selection7-round2.json",
  "Q7577520": "early-published-spatial-selection7-round2.json",
  "Q7578576": "early-published-spatial-selection7-round2.json",
  "Q16573425": "early-published-spatial-selection7-round2.json",
  "Q55230385": "early-published-spatial-selection7-round2.json",
  "Q7776565": "early-published-spatial-selection7-round2.json",
  "Q106371425": "early-published-spatial-selection7-round2.json",
  "Q26995822": "early-published-spatial-selection7-round2.json",
  "Q3212482": "early-published-spatial-selection7-round2.json",
  "Q48814849": "early-published-spatial-selection7-round2.json",
  "Q6798449": "early-published-spatial-selection7-round2.json",
  "Q131308078": "early-published-spatial-selection7-round2.json",
  "Q131381573": "early-published-spatial-selection7-round2.json",
  "Q131381598": "early-published-spatial-selection7-round2.json",
  "Q133873710": "early-published-spatial-selection7-round2.json",
  "Q1748402": "early-published-spatial-selection7-round2.json",
  "Q5063196": "early-published-spatial-selection7-round2.json",
  "Q55230380": "early-published-spatial-selection7-round2.json",
  "Q5694612": "early-published-spatial-selection7-round2.json",
  "Q7733264": "early-published-spatial-selection7-round2.json",
  "Q11122092": "early-published-spatial-selection7-round2.json",
  "Q122058672": "early-published-spatial-selection7-round2.json",
  "Q131461766": "early-published-spatial-selection7-round2.json",
  "Q134608990": "early-published-spatial-selection7-round2.json",
  "Q3235224": "early-published-spatial-selection7-round2.json",
  "Q7732587": "early-published-spatial-selection7-round2.json",
  "Q7732812": "early-published-spatial-selection7-round2.json",
  "Q785354": "early-published-spatial-selection7-round2.json",
  "Q12055126": "early-published-spatial-selection7-round2.json",
  "Q3149129": "early-published-spatial-selection7-round2.json",
  "Q55230522": "early-published-spatial-selection7-round2.json",
  "Q131222069": "early-published-spatial-selection7-round2.json",
  "Q131381209": "early-published-spatial-selection7-round2.json",
  "Q131381216": "early-published-spatial-selection7-round2.json",
  "Q131381239": "early-published-spatial-selection7-round2.json",
  "Q134723266": "early-published-spatial-selection7-round2.json",
  "Q1605815": "early-published-spatial-selection7-round2.json",
  "Q18011224": "early-published-spatial-selection7-round2.json",
  "Q202531": "early-published-spatial-selection7-round2.json",
  "Q27657024": "early-published-spatial-selection7-round2.json",
  "Q3038780": "early-published-spatial-selection7-round2.json",
  "Q55230360": "early-published-spatial-selection7-round2.json",
  "Q5608658": "early-published-spatial-selection7-round2.json",
  "Q7755685": "early-published-spatial-selection7-round2.json",
  "Q7776538": "early-published-spatial-selection7-round2.json",
  "Q108535553": "early-published-spatial-selection7-round3.json",
  "Q11311483": "early-published-spatial-selection7-round3.json",
  "Q130259107": "early-published-spatial-selection7-round3.json",
  "Q11286446": "early-published-spatial-selection7-round3.json",
  "Q131381177": "early-published-spatial-selection7-round3.json",
  "Q131381230": "early-published-spatial-selection7-round3.json",
  "Q131516753": "early-published-spatial-selection7-round3.json",
  "Q131518567": "early-published-spatial-selection7-round3.json",
  "Q134706062": "early-published-spatial-selection7-round3.json",
  "Q135094293": "early-published-spatial-selection7-round3.json",
  "Q15035008": "early-published-spatial-selection7-round3.json",
  "Q19364507": "early-published-spatial-selection7-round3.json",
  "Q20050124": "early-published-spatial-selection7-round3.json",
  "Q2059694": "early-published-spatial-selection7-round3.json",
  "Q28403633": "early-published-spatial-selection7-round3.json",
  "Q2933712": "early-published-spatial-selection7-round3.json",
  "Q2998291": "early-published-spatial-selection7-round3.json",
  "Q29994393": "early-published-spatial-selection7-round3.json",
  "Q3210154": "early-published-spatial-selection7-round3.json",
  "Q3211715": "early-published-spatial-selection7-round3.json",
  "Q44603212": "early-published-spatial-selection7-round3.json",
  "Q4657458": "early-published-spatial-selection7-round3.json",
  "Q4803807": "early-published-spatial-selection7-round3.json",
  "Q4849957": "early-published-spatial-selection7-round3.json",
  "Q5148482": "early-published-spatial-selection7-round3.json",
  "Q5174346": "early-published-spatial-selection7-round3.json",
  "Q51933377": "early-published-spatial-selection7-round3.json",
  "Q5280748": "early-published-spatial-selection7-round3.json",
  "Q5305569": "early-published-spatial-selection7-round3.json",
  "Q5331267": "early-published-spatial-selection7-round3.json",
  "Q55230552": "early-published-spatial-selection7-round3.json",
  "Q5577739": "early-published-spatial-selection7-round3.json",
  "Q5877964": "early-published-spatial-selection7-round3.json",
  "Q6314575": "early-published-spatial-selection7-round3.json",
  "Q659151": "early-published-spatial-selection7-round3.json",
  "Q7692416": "early-published-spatial-selection7-round3.json",
  "Q7745563": "early-published-spatial-selection7-round3.json",
  "Q7992271": "early-published-spatial-selection7-round3.json",
  "Q4142541": "early-published-spatial-selection7-round3.json",
  "Q4726459": "early-published-spatial-selection7-round3.json",
  "Q5170149": "early-published-spatial-selection7-round3.json",
  "Q54807231": "early-published-spatial-selection7-round3.json",
  "Q55230442": "early-published-spatial-selection7-round3.json",
  "Q55230509": "early-published-spatial-selection7-round3.json",
  "Q74378": "early-published-spatial-selection7-round3.json",
  "Q7713157": "early-published-spatial-selection7-round3.json",
  "Q7714276": "early-published-spatial-selection7-round3.json",
  "Q7758417": "early-published-spatial-selection7-round3.json",
  "Q7761136": "early-published-spatial-selection7-round3.json",
  "Q7835408": "early-published-spatial-selection7-round3.json",
  "Q131380944": "early-published-spatial-selection7-round4.json",
  "Q131472078": "early-published-spatial-selection7-round4.json",
  "Q131518563": "early-published-spatial-selection7-round4.json",
  "Q135094093": "early-published-spatial-selection7-round4.json",
  "Q20009838": "early-published-spatial-selection7-round4.json",
  "Q21190041": "early-published-spatial-selection7-round4.json",
  "Q2362130": "early-published-spatial-selection7-round4.json",
  "Q27796013": "early-published-spatial-selection7-round4.json",
  "Q28403609": "early-published-spatial-selection7-round4.json",
  "Q28419608": "early-published-spatial-selection7-round4.json",
  "Q29918070": "early-published-spatial-selection7-round4.json",
  "Q3210024": "early-published-spatial-selection7-round4.json",
  "Q3222317": "early-published-spatial-selection7-round4.json",
  "Q3791648": "early-published-spatial-selection7-round4.json",
  "Q40860689": "early-published-spatial-selection7-round4.json",
  "Q105222224": "early-published-spatial-selection7-round4.json",
  "Q131308066": "early-published-spatial-selection7-round4.json",
  "Q131461675": "early-published-spatial-selection7-round4.json",
  "Q1431808": "early-published-spatial-selection7-round4.json",
  "Q15034499": "early-published-spatial-selection7-round4.json",
  "Q17126345": "early-published-spatial-selection7-round4.json",
  "Q2822148": "early-published-spatial-selection7-round4.json",
  "Q3016630": "early-published-spatial-selection7-round4.json",
  "Q3208305": "early-published-spatial-selection7-round4.json",
  "Q3822080": "early-published-spatial-selection7-round4.json",
  "Q3902528": "early-published-spatial-selection7-round4.json",
  "Q4114666": "early-published-spatial-selection7-round4.json",
  "Q4928148": "early-published-spatial-selection7-round4.json",
  "Q5281512": "early-published-spatial-selection7-round4.json",
  "Q548368": "early-published-spatial-selection7-round4.json",
  "Q55230375": "early-published-spatial-selection7-round4.json",
  "Q55230499": "early-published-spatial-selection7-round4.json",
  "Q5877936": "early-published-spatial-selection7-round4.json",
  "Q594567": "early-published-spatial-selection7-round4.json",
  "Q63066709": "early-published-spatial-selection7-round4.json",
  "Q6907938": "early-published-spatial-selection7-round4.json",
  "Q7201198": "early-published-spatial-selection7-round4.json",
  "Q7678446": "early-published-spatial-selection7-round4.json",
  "Q7831185": "early-published-spatial-selection7-round4.json",
  "Q7916983": "early-published-spatial-selection7-round4.json",
  "Q85786245": "early-published-spatial-selection7-round4.json",
  "Q55230409": "early-published-spatial-selection7-round4.json",
  "Q55230549": "early-published-spatial-selection7-round4.json",
  "Q5998865": "early-published-spatial-selection7-round4.json",
  "Q6009281": "early-published-spatial-selection7-round4.json",
  "Q6907565": "early-published-spatial-selection7-round4.json",
  "Q7426802": "early-published-spatial-selection7-round4.json",
  "Q7718000": "early-published-spatial-selection7-round4.json",
  "Q7774455": "early-published-spatial-selection7-round4.json",
  "Q779016": "early-published-spatial-selection7-round4.json",
  "Q131376801": "early-published-spatial-selection7-round5.json",
  "Q131376803": "early-published-spatial-selection7-round5.json",
  "Q133800124": "early-published-spatial-selection7-round5.json",
  "Q29884044": "early-published-spatial-selection7-round5.json",
  "Q3201692": "early-published-spatial-selection7-round5.json",
  "Q3222051": "early-published-spatial-selection7-round5.json",
  "Q3854497": "early-published-spatial-selection7-round5.json",
  "Q5247733": "early-published-spatial-selection7-round5.json",
  "Q54807279": "early-published-spatial-selection7-round5.json",
  "Q130738105": "early-published-spatial-selection7-round5.json",
  "Q131461555": "early-published-spatial-selection7-round5.json",
  "Q131461643": "early-published-spatial-selection7-round5.json",
  "Q134612524": "early-published-spatial-selection7-round5.json",
  "Q18152780": "early-published-spatial-selection7-round5.json",
  "Q19947585": "early-published-spatial-selection7-round5.json",
  "Q20724576": "early-published-spatial-selection7-round5.json",
  "Q21893619": "early-published-spatial-selection7-round5.json",
  "Q2298506": "early-published-spatial-selection7-round5.json",
  "Q2420936": "early-published-spatial-selection7-round5.json",
  "Q2447953": "early-published-spatial-selection7-round5.json",
  "Q3453308": "early-published-spatial-selection7-round5.json",
  "Q3563298": "early-published-spatial-selection7-round5.json",
  "Q43543759": "early-published-spatial-selection7-round5.json",
  "Q4839827": "early-published-spatial-selection7-round5.json",
  "Q4863413": "early-published-spatial-selection7-round5.json",
  "Q5057899": "early-published-spatial-selection7-round5.json",
  "Q5305671": "early-published-spatial-selection7-round5.json",
  "Q5375581": "early-published-spatial-selection7-round5.json",
  "Q5700973": "early-published-spatial-selection7-round5.json",
  "Q7601479": "early-published-spatial-selection7-round5.json",
  "Q7785669": "early-published-spatial-selection7-round5.json",
  "Q7864589": "early-published-spatial-selection7-round5.json",
  "Q8036762": "early-published-spatial-selection7-round5.json",
  "Q8069191": "early-published-spatial-selection7-round5.json",
  "Q85808079": "early-published-spatial-selection7-round5.json",
  "Q131471753": "early-published-spatial-selection7-round5.json",
  "Q134080548": "early-published-spatial-selection7-round5.json",
  "Q135209407": "early-published-spatial-selection7-round5.json",
  "Q30084993": "early-published-spatial-selection7-round5.json",
  "Q3088925": "early-published-spatial-selection7-round5.json",
  "Q3335725": "early-published-spatial-selection7-round5.json",
  "Q4658106": "early-published-spatial-selection7-round5.json",
  "Q4808579": "early-published-spatial-selection7-round5.json",
  "Q54800874": "early-published-spatial-selection7-round5.json",
  "Q5518056": "early-published-spatial-selection7-round5.json",
  "Q615035": "early-published-spatial-selection7-round5.json",
  "Q7251700": "early-published-spatial-selection7-round5.json",
  "Q7332612": "early-published-spatial-selection7-round5.json",
  "Q7679252": "early-published-spatial-selection7-round5.json",
  "Q7726841": "early-published-spatial-selection7-round5.json",
  "Q10658260": "early-published-spatial-selection7-round6.json",
  "Q130737796": "early-published-spatial-selection7-round6.json",
  "Q131445236": "early-published-spatial-selection7-round6.json",
  "Q131461432": "early-published-spatial-selection7-round6.json",
  "Q12411852": "early-published-spatial-selection7-round6.json",
  "Q1300587": "early-published-spatial-selection7-round6.json",
  "Q131376686": "early-published-spatial-selection7-round6.json",
  "Q131380757": "early-published-spatial-selection7-round6.json",
  "Q132774503": "early-published-spatial-selection7-round6.json",
  "Q133984305": "early-published-spatial-selection7-round6.json",
  "Q15094083": "early-published-spatial-selection7-round6.json",
  "Q16955002": "early-published-spatial-selection7-round6.json",
  "Q22248349": "early-published-spatial-selection7-round6.json",
  "Q2647380": "early-published-spatial-selection7-round6.json",
  "Q2972319": "early-published-spatial-selection7-round6.json",
  "Q43635157": "early-published-spatial-selection7-round6.json",
  "Q4880455": "early-published-spatial-selection7-round6.json",
  "Q5440721": "early-published-spatial-selection7-round6.json",
  "Q5441458": "early-published-spatial-selection7-round6.json",
  "Q65125622": "early-published-spatial-selection7-round6.json",
  "Q11826490": "early-published-spatial-selection7-round6.json",
  "Q11946479": "early-published-spatial-selection7-round6.json",
  "Q12720858": "early-published-spatial-selection7-round6.json",
  "Q131461463": "early-published-spatial-selection7-round6.json",
  "Q131471704": "early-published-spatial-selection7-round6.json",
  "Q131516770": "early-published-spatial-selection7-round6.json",
  "Q134464020": "early-published-spatial-selection7-round6.json",
  "Q18430829": "early-published-spatial-selection7-round6.json",
  "Q28419607": "early-published-spatial-selection7-round6.json",
  "Q3116252": "early-published-spatial-selection7-round6.json",
  "Q42723496": "early-published-spatial-selection7-round6.json",
  "Q4808643": "early-published-spatial-selection7-round6.json",
  "Q5368262": "early-published-spatial-selection7-round6.json",
  "Q54802781": "early-published-spatial-selection7-round6.json",
  "Q54807395": "early-published-spatial-selection7-round6.json",
  "Q7738320": "early-published-spatial-selection7-round6.json",
  "Q125817634": "early-published-spatial-selection7-round6.json",
  "Q131517849": "early-published-spatial-selection7-round6.json",
  "Q17009376": "early-published-spatial-selection7-round6.json",
  "Q25395087": "early-published-spatial-selection7-round6.json",
  "Q28419265": "early-published-spatial-selection7-round6.json",
  "Q3021982": "early-published-spatial-selection7-round6.json",
  "Q30607982": "early-published-spatial-selection7-round6.json",
  "Q3206352": "early-published-spatial-selection7-round6.json",
  "Q3222992": "early-published-spatial-selection7-round6.json",
  "Q3234544": "early-published-spatial-selection7-round6.json",
  "Q4726516": "early-published-spatial-selection7-round6.json",
  "Q54806997": "early-published-spatial-selection7-round6.json",
  "Q7619863": "early-published-spatial-selection7-round6.json",
  "Q7805574": "early-published-spatial-selection7-round6.json"
});
const FIXED_S_RECORD_SHA_BY_ID=Object.freeze({
  "Q137806760": "99d09d0b9cba1a1b729b6693e9ba569ffd901e8826e171a20073824d1ec13a8e",
  "Q134098155": "31f6c3df55981aea0c34a48d64622d59e12f03343eb4881319dc9645124c7f7a",
  "Q136452465": "f200fc973efd0c9440463ac8a406b7004f95b043284ab9eda3a1f160cf5877a7",
  "Q113214640": "2a761a21708945d8cfd9728b8d0ac06b4e7e4784e744eaa34092da80bbb39601",
  "Q137003729": "5f2a0a73a04971727272592ae47cfac9bcfd08254ea4556b901bb3c1c6cff92c",
  "Q131445223": "1e28772ffcbf51473945692dfdce412eace0677d43e3f2eb844068ac8155f355",
  "Q135206358": "3e97375f481bfcf86ca86abde969bf115c339083b3ade89f7ce343a749ccdb72",
  "Q55230555": "f4bc4f1319e7c137a5f812b566821522c2573545577b3b68d1b72db4221361ab",
  "Q102076238": "0c188855d4f7e63c0071e53c2ace68f3e5cd5fe29a9d85e470276b43496f1a39",
  "Q134529150": "de52bbbbfe76795c6dfda985d4b6449fc3d3b8cd600c225210f5b2208af89b3c",
  "Q139881240": "3da8e51c4ce94ea6f4a90493612d07e61a9ec39406086b24adda2b9a7abd0db7",
  "Q62698506": "94bfdc3773c910ce5756ebe04d0742341208c2806e226de6687386e8b5c37573",
  "Q133306305": "be7c86c6376737c3beb8feed8e140bfd728f80b674957d197bc77438a0d1ffe1",
  "Q139881238": "6e0d640badb4c1c07bbcabf86e1391c4d2fecb65676402fbcfe860bc93c401bf",
  "Q137874076": "75523074216d4f9f00e257c6b961f576bd73f9b9b22a042175e988167a67e055",
  "Q139881234": "fcc8e62936ec9d04b4dc1d9bd0e0e28552fb6aef373a91b137c568710f435eda",
  "Q24034555": "ec19e5aceb466ec60960d198c47fc417b13fef75f6be7843fe66ca29d3bb43ea",
  "Q110276832": "d5e443bbb52d3378062daaa3f1d0dca94da10a9b8dd2e6ad94bc9ee0bf1f6e88",
  "Q125458800": "fc8a7b84f8a6278670f150d82bb9829f4d800aa928b06f5f9e5580ceceaa9f92",
  "Q134715513": "5e63d4944e38cac71f197504186c428b01e1cee5b4bf98920f7a64c6e2a0bfc0",
  "Q19263901": "2c66971f6e51aab6c565e37287b4e2260f2d4a8fe6f60ad704631c143288a7d9",
  "Q21893609": "4410459b8cb472875d7d054ee55ca82ec0ccc543ea13e58fe809f95dcc45ac4e",
  "Q54807336": "e96f6eff257ced2cf239f320e5478c1706726fccb3b55e0bd3d6470809f8d9f2",
  "Q21512452": "3bf7a623890c4d88c3738407b36b574c6304f6da63c8256c32b5aee6e1bbd1eb",
  "Q55230372": "84ecf24d192bd3666b49de4fdda2211d5d3bca23f7ad1b813a33ffda76db91ef",
  "Q131382269": "f5cccf8decc089cfccc2ece52fc20c63a583606617bb2ce8ce4857fb01cbe7f2",
  "Q133445347": "092e35379698a98fb017b8ca1888b0c97e694143a4e45e26062a7446f77b4cbe",
  "Q133445431": "8139d3a66c68a9a9b4bfd3e72a8de7671d09c089114732e3689d555d0cb7838b",
  "Q114414730": "5507b06e0883fcb2e4acf926fec02569cb02e5803be8d7b6cf7addca5001732f",
  "Q137824848": "5225b04f29455a737b2ee2d5c1908c68280b8592c74a3d33f522c11416e657fe",
  "Q16608557": "b8537321725e87a4c353ed884394285b478d2c0c5736cf2f06ad1a66bf4ec350",
  "Q108912961": "b4a13fa03f3b8ea99d1109f818d12714334456793541bb7fb32ba467d095da97",
  "Q134720546": "51de839c1cc87a4d9d772a994ea57f7fd3b36c033e929287405b648b5ee448d5",
  "Q15221218": "d7583af2cf40c939cf0094b38d3671bab5e14d03ade17a651b4d628a1f9a0a10",
  "Q16010795": "712bd574f2f7a1d401185fabe5f606cb13bc724d525c0b4df6a189a716df73d3",
  "Q16646479": "cdbd8f1e60095412baa843395049d63259749aa95dbe1589ad51b67ccc54efc0",
  "Q3563140": "05b11210e87c9b65be1953fff13081d7badf2a05c682e74aa66053ecd1a2f340",
  "Q54802746": "ae91cc6930294660c7a00fb2cd13807123a223c0fd436cbe04dda2771cce8440",
  "Q2391923": "bcf3ab4a09ef663c25682c072fbd35c26dda0732c55cc6300e05c6324644c054",
  "Q2509857": "556c84d3ffeec773b3cfc378485fb8589c946f6a5d99946f988308e3e715d8db",
  "Q7736686": "3e3225692950df160c4c47b1e8150f2da4021be63cfb6856d195531c77972fad",
  "Q108535556": "2e9375e67b05ca2fd209ac9b85cf39b026fe71a99962b1cdc07bc1d04da12782",
  "Q131472325": "6ad460b76007bdb31c9dc4e4c829d164169d6b53192355dd7eb63e259b324cd7",
  "Q135094390": "8c59e00ff8b018638076d5fa1c0566919eaa980766b8d29f2df892f67f70de18",
  "Q16671459": "4221cf556a25e2852cee5788e0d9e0de6d0adc82f96c53321b4c2b515b13cbf8",
  "Q7100133": "cb3b7038f0fa6dfeb83f21645359dcdd991b6fb1afac7a895c6c7fc15723d77f",
  "Q7770704": "a67bb81c17909646b276310d8fded187c8b2e513473cf7a075a0f5faa00c9b1e",
  "Q27976097": "21e7ec8bbf89dacb5078e39b5d11c00705ca4752e2ac4869631a28a2ebf35c37",
  "Q6061022": "a0e3567e2530b4d6155a3398c425bf793c9a344d322eb3fc14a3f0586bae4d2d",
  "Q6304848": "2830e44c82533c413e825583f071a95c71698aaa095c7311c98ccd61d2be9ce6",
  "Q131382101": "0d5f38a8e2941120afa44274caddb8e369539df8e5faf53183e103c42bbf877d",
  "Q10566247": "5a5f9fe9673a68e249eee351d667eebe0d8a5fff6598785c7bddd0258d92c3eb",
  "Q133801718": "263f9a635a81d1532ac950912b850fdd117f3e4c0fa75bd7797c2ab4a8371846",
  "Q55230504": "c3018b5c9b9e445c9b4ee80004592912ee58c06becfb9966e527f27649db60e3",
  "Q6029515": "4286603c00afca3439d04d0fad3308361e09f75faf4d83a31629dc612f98b78e",
  "Q6322734": "4fcef02f60631bee09aa5f0030046d1c761d5b65c7d97267fdfe7429d0499083",
  "Q7577520": "991de861a172990ce9a72be6367556a64f5008cfcfa15c1c2679632a44e45710",
  "Q7578576": "277d2b8246d9a657f159eba0830a064be949b21b181672fe29d22b2d05f84db4",
  "Q16573425": "d43224b3c830be5c14378247f7e272195b26930275bbe1e33f5acc06373f2021",
  "Q55230385": "3020bcd7eb6965b2b7dc6d64a52dcd5ef7dc373daee6e99856edc0f74cd1922b",
  "Q7776565": "4d576256398cabaa5e904521b618f8dd150690abb3e029c33e0697f578142032",
  "Q106371425": "6c40c201dc69592894894cf6951faed38da5cac759f0cd6d92b4638f1119fcd2",
  "Q26995822": "252558668c42431d4e9f8566eb92fcc428e29a9b6ebcf11e427e1e58093d1d79",
  "Q3212482": "b2b292f87e0ba5715ebe4138499abcd3d583280b7f5a9f8b9df93ad9d2ea9b28",
  "Q48814849": "43f327a28e83d62a23cbfd7a34ed44d380f7e4fce0d4753b0cb69cba8ad2dd36",
  "Q6798449": "d5c7ed2e433c8018d289e5633e6235a1e3b855c853ba9d4e5546c7b47a54ea51",
  "Q131308078": "f366695ecc4926bb122b0c5aaf6c2a4314648e2a86369a268eb7fad09232ef5b",
  "Q131381573": "119848921b83a5e672a16b92ff7863d036a46bd500b46c4587d9f7eae520879d",
  "Q131381598": "c4f5616e09965bbc8746598fb176da0bc9908654efef09a224f652dcdf8a0623",
  "Q133873710": "7f11a712154b1f8e80bec6b3c03db1d4392f7fd3dbd093fdb74468ba3d4ee7c5",
  "Q1748402": "19df62d053fac0e3ba4d831c24bf5882ce5c4ca2d4f4acd1115471bf3428e79c",
  "Q5063196": "fa7c84865633b9ffb4ac6c47aa85fa43e51aed8aae8dc555ecf3b04457a0e2d3",
  "Q55230380": "d11551752050b9e77b3b7d41c62a4e5a3f9059293cc5a56fd093ef836b29ab98",
  "Q5694612": "a8ea3a909e7dc0b3085af93a222174f12d43d5b5dce79b090140fd2f7a7cfe96",
  "Q7733264": "df34942b1e2445067d52371e62c995590a283264e5eb1395fa084b1c8764f2a5",
  "Q11122092": "3cad54e2c23939454481c22a0cc84c1ab769a67ebd728e8f59c94aa66619d69e",
  "Q122058672": "8f6f29dbde66a5c17c3bcbfabc8edb8206d6f2910d41c3484ca52584298653c2",
  "Q131461766": "34a729660641aa7cfbfbd0294072d0fdcb83e3d8b3dcc903f2156bda5bca4db2",
  "Q134608990": "5d2a62aced392655fdd4ac9acdb966d8d2875d733e2e490463ced52396b3eba6",
  "Q3235224": "c4c8415517109858d204964791140b96150434d3a0d84e29ad8d048992668bdf",
  "Q7732587": "e8ea727fc3ee2b4c50d9569bf7f595ba7bd11e3649644c2ddac3fae6ec7f22b2",
  "Q7732812": "dfa2e92e89bc5d18c5147938a1addac7508bb95e5e061991858d9b2ae30e6842",
  "Q785354": "1f0b82f47c2b9ef448222d03d989929c0c19c815e2fb42d00b5e88e785a19e38",
  "Q12055126": "610683d97c01c3d8c64ff51bce182c26a82883d21ba4eae5e1070e9b26fb924e",
  "Q3149129": "ad7e7a1f0b32e6f45874b0d56be50aafe0deaef515d3881461e928df89652b02",
  "Q55230522": "c4929258b98d4689ede055b9ac601ab1b11aa01a742fff246eeb30ca869abf35",
  "Q131222069": "cb34a65a96d419cdb0d9ece3b6b265c34882725a74ffd9cb94dddc93e35b05d7",
  "Q131381209": "22677dcd79bb253a1c9905af6ab64d6733d6111d602f4918233e9baf2a0fcce8",
  "Q131381216": "07ef3c7050700c6629cd99e440259e85fe0b2e778faff5cfb566bbb9aceb5ffd",
  "Q131381239": "4ce976e09f8843a0759d5763946e61d001fcb7c04b3da6f107c21e46ef1be411",
  "Q134723266": "5e1d68a80c253fb4049a89c18889297a21dca2994031703f633617b6c3027864",
  "Q1605815": "8437a4a64b55a010ddd18fd0a5f0708ba9d0e58a2e739a7313626ed34f3b2a6c",
  "Q18011224": "c29c29879cc83ba452352387c7e25e7d050b6e1b858c3206af954de3f8f816a2",
  "Q202531": "30b9a253c3d0cfdbd4c9300af82fb0fd71904ffdb4bcab2525a6d0a2707a2a29",
  "Q27657024": "4f631f55fb0acb6dd19b3d457a015199ba31dce233de6d26736d13aef442a5a9",
  "Q3038780": "f6a72e49a95dc1034efea5b67d0e45dbc9d75e06208ab546d1ca9fa715a1cd42",
  "Q55230360": "2b38dcf0bb59f79c017445c8458db7871fc2af06b2ec1d9d4f290a1abd8f204a",
  "Q5608658": "be2786ba935e4a3fddb57792894a72e0f81dc3befe9f78f5a253dacb3c30fec3",
  "Q7755685": "d17c1ba30ef9be98565ce5cc006874cb98d24f430e507fe27f002638ae7da730",
  "Q7776538": "0cc49776d28a4f30235919b24e3a538bc3f4100fb09e532d4318cebc1ccadc7f",
  "Q108535553": "471349c4dfc32843e447ccd7f7ac1490f0adf0b27797f917443c48232fb49587",
  "Q11311483": "6ba9bddec80f35cc689c65c4ee45d24d62787cb7a39e9b55732e94f7f0fad2b4",
  "Q130259107": "448cfa8aaaf95991b569ef2ce63c7ed748dd33ce0ba54fbe8ce9572eb4d853a0",
  "Q11286446": "38c78b7924d88cba8fc119f7f4a56860516c384cf4f3d025b18fe270d86f5fcf",
  "Q131381177": "a6d73a07258ccc408b53f5b21e4570675e642b11411c42ef4310fbf61cba57f1",
  "Q131381230": "29d321fd2bc9a5e2f5451a0d53d1a0dfe95059effe9101bcbe45fcf56fffa8aa",
  "Q131516753": "c1be03465e5a6f6cc5995d21391c9712cbcaaff0646d9fcb8bd81b1569ed8490",
  "Q131518567": "1a676753eff599a89d53f0ccd824870f29fe8fa770b07ad4c83f9dd98528e91a",
  "Q134706062": "d0f1d8a7c9fcf69e71bb5afeb12d5a6481e19158347e75fc0203138075fed8f2",
  "Q135094293": "f536082ab5a1af6c7905b0fdc9c19dc296d578002f9602059db8b10fb8450ea6",
  "Q15035008": "47a3028705aca092c13b74fdc9476ddd6e10c40a5f1218540c0da10dca44d845",
  "Q19364507": "4e8f60e9f5d0848b9a87071cb832bb664ced975a546a50a9e44bca28a25a174e",
  "Q20050124": "b80c7b84658f2b4db176f3497210f7dabb0c95a0195b94e53976d8c963ee7fec",
  "Q2059694": "da2d98c28f1b830a3943b43a01dc99cdd7006a4418d84528c9dd7a232c570112",
  "Q28403633": "6db483494714aa25ac12ac43210a7a6368997efa530aa6a325300d2c3eea9a61",
  "Q2933712": "2da8dd37dfbfaf77f3bce028c8e2c0b3bc892ce7ec33f75dd566906e4e7a1225",
  "Q2998291": "81fb076ed1d8ede6f71b33569a8b2ae492e65317073612aa3d6431345dbc82dc",
  "Q29994393": "48d7fbb4e0e1194d6e6762c7c4dbd429454cb680edd908884039e7e6faa50f41",
  "Q3210154": "efea776021e4c948c6b016fdea3dabeaa4bd9a2eb70b277e5e8c60b4d020b032",
  "Q3211715": "ed8095a651e66809ea17286c2eab6217d5fbb4bf02929583628a6388f9a0bfae",
  "Q44603212": "949f18d9cf237a674d0b108b5bcff310511602252c48ebefc526c771dfc70d84",
  "Q4657458": "ede6a5a26e47f0ac8853572200f1ab12b06ed48775759b4210bde5dba7cfb22b",
  "Q4803807": "60ff666fa1c20570d6c4aa89d71bc36e69cced17e6a13b6d83b01cb0c8d4585f",
  "Q4849957": "084c646c20c2f08c8b9b773dcaa1a49c5e5b1ef2a333806cb8995d34154f5b7c",
  "Q5148482": "5a8eb75591c7c88ce24dff22fcceb0b6c7598c92430c527025138867b4bf65db",
  "Q5174346": "5d30fc3ba57d1b89a8e30364e49a48cb7496a761dd4d28ce1da5a3eb1f4c682d",
  "Q51933377": "9133bededf41f9cabb777cb1197f202153d06c321a1dba5a140a20f1678529f7",
  "Q5280748": "99aab87ac70299571b2fdfddc8db8f8c2a3dad8372f26e212da3dd88d9a1d693",
  "Q5305569": "20d865a4ac0b16c5eef9d55ce71a180a30da4beb20c267252d17e57a46bb0007",
  "Q5331267": "c9a81d0a9e9bb34eeda32fe9bce764a078f2dbfa36ad0e53254f3e715c349bfd",
  "Q55230552": "e617121689bce455df684435609d9edf30254165a6b8da540f9550d75dba2fd8",
  "Q5577739": "e9743dd738fe6ccfd09262cace819eb6d12bea1c6771c0917efc5f9dad839e78",
  "Q5877964": "d76fa86bd71f977f554ea5fcd0c51a142ebdf2e238892d1bc54737a6111093e0",
  "Q6314575": "39d8ec60ce7bf2c69687a372689e8350e540a28e462d95578dda0eb19da14234",
  "Q659151": "9348f0a059c0234e976ab59915b497ad9b479bab5a20ef78d53ffad551a4f491",
  "Q7692416": "ba2a778ff02b7b523b07d5a121b37803312afd4d6c4b14b2d7533097c769c001",
  "Q7745563": "a35d0dea01d539c5ab5ca102954a3b9968ec54dd424ef3a3aae5eca04220743b",
  "Q7992271": "4756ab00baa7b7f3ca8ebf1977649e06d9af67c1cf434fe17b061af769ae6282",
  "Q4142541": "3549114a9ab1a0d19b38cf4ecd964921cb4b33a0abda4ce82e61610492cf2196",
  "Q4726459": "029c56379dcd314abea87c4214d8185924df740d5677e196d4f91aacd909d872",
  "Q5170149": "cd322dc49b0f7e0767910c26af37c9e8f64df2d510ad91b6439ea71b41fafbfe",
  "Q54807231": "d71fc4f537426700f95eb358b754eaa713487f96497fcff875d198e071bd0f7d",
  "Q55230442": "d84b5e73d1137fee94bf78cd7f677ab4f2b824e5b97cfe524922acfbb4475b73",
  "Q55230509": "e76195bdcbec480ecdded1d46b0d9e31b71af5923e3a093d4e50e613c12b5bbc",
  "Q74378": "957618ef14962d91263ff02a6b7aecc88c7486a795beb9280c19d1aac7d3dc2f",
  "Q7713157": "1bb3272f42d75eaf9f5ac51f5f7c391d5143decb23f7de59423bbe5a8a53c7dd",
  "Q7714276": "93308dd72e84d0d3eba2d5a887d9afed4a34c77c30ed9639e9fe490594bdabb2",
  "Q7758417": "6ac9230a73cd60f65e472fceff901bf44d28a76dcd7743d58f1e7849cca174f3",
  "Q7761136": "04c4c488c1bbb4212ef206d2713b404fff58acc22de3112da96a4b876df0aaa4",
  "Q7835408": "6066510203ec1246d0ee15e0944de02145064877f8fb047b27c6c5d759f96698",
  "Q131380944": "99ae5e9762635146bbe239d52647354986fb93a6caaa3ea06d7f1a05d9913263",
  "Q131472078": "3155ffbf0f1e0cfa89e623a31b866d58e1a0d09f2efe7b941d37d78a3e3a7c7a",
  "Q131518563": "fd5b92a77ba6b8c48b6f9f36f1a8c8a19fdd83521ad9be764d75eaefde5718ad",
  "Q135094093": "0adf51da3f0cdb4c71b8f451e12b01ea2d5d5e71e97cc8be632f2e63d6fe2a60",
  "Q20009838": "f3a4da3e80494677ad9938f775d53ce0dce2c848addd0ab40a411610b0b40ad6",
  "Q21190041": "78641e4c37a7a335af380f26c0a2bddd7cc8797faa7a4c503b26f61b4a683de6",
  "Q2362130": "c5fcbd67d729cc38c6bc258fe87a953854639abd67197e2919c24dc49aeb9cb5",
  "Q27796013": "bfd9fc27b8277c0cfdc554f69318829c91f6d6ef8644a4cfeb5095a48ef11298",
  "Q28403609": "f1e20fa01e546fa66c1356ef2d273601a062a99936121b06e84cc22ea3db756b",
  "Q28419608": "7ba27c7ca6221066b0253954747bd0730ee365b158ac38010a032e4d4a56d184",
  "Q29918070": "6a1ae1243e1248a9c0797d0d0ecad3e775419bdd260fca88860c79a2ec4b4925",
  "Q3210024": "e31aa40da1c8d76520c9782393af4159c188b00f08d8ce833627f626ed14f1ae",
  "Q3222317": "1aa89da9e4480134af67dc25a2fa13a26c7041e6f2262976a564fbdb135500a4",
  "Q3791648": "1f906b4c60665993f4c4853a2970669f2d2502f4686c269220b1d69b5171eb23",
  "Q40860689": "ab6ac81eee67b4d376470aeaa657863c2f670c9ed9a31c2e9ec0f04c3f60dd48",
  "Q105222224": "2b620a5a3973425ef2097e2db4eb4146abebfc5e5ebfac9a0493f0cee24f125b",
  "Q131308066": "73c7491f81555de1e8bacabd9aa09ab44559177df2639254355975f4569ba579",
  "Q131461675": "0de419fa7d892166344e2ec5c63eed2d59cdd5dca46ec247606ed0a2ebc79b94",
  "Q1431808": "f006fd0ae375041f29d14354d5ad6d818208f4828f618c3014ff76dc13447fb4",
  "Q15034499": "a4ab4bd6b882a790885740f405aa39bacc48ec77a770c8b8317282762c7976b3",
  "Q17126345": "c09c08139824078b80aa0adecb85746b87362a3ccdece35bda74b9d82146670d",
  "Q2822148": "2ab5b3ae03dfaded4100bcb23c4bb6fe5cc3ef62bf8ebdd6ea265a70524ea051",
  "Q3016630": "1a7715a8d59c65af33014e7380697a18409cde677cc1d2771e5463aadaafc6af",
  "Q3208305": "ca73633086bf4c639b654da9d2ac14fd548a9c706339ea6ff4ca1609e1c96150",
  "Q3822080": "0af8c777a851357e766de47ce787f244f4ae728be1e7a5eeb4f8c86fc1ae9ca4",
  "Q3902528": "c3f0532a8098e411acd201d75f18c584ad98280fe7cbfc9dbdc78f8314def2d4",
  "Q4114666": "012bb3bdc5a5d3c1ba4d940c40c1d73299983dbb4fb83a1f94ed9dc28b56276f",
  "Q4928148": "d0325c9962e1bef5cfd157904bd9a50257881264f234c36007c99173b468bf33",
  "Q5281512": "064499df79481b85961ccb1e10bd4b67d0b42f2292863279cb3ca2024b8a2457",
  "Q548368": "0f8addbbef82025c62a881d69fe4715ec54410fee90c216a9192305e419936fd",
  "Q55230375": "907621e7c34b7e2d7883a7b389b388711bc1358003d52c8b91cea7535d64c9aa",
  "Q55230499": "5497cd2c6dfd05cc80013bc0b01e51f8f497ef8ac6cf9c34cd6e38cf6ad3def8",
  "Q5877936": "ecb2bc8ee61149b42393f9b8f1b5ab17c4ed09d85f751ad4d6071d0970113cd9",
  "Q594567": "7119b9d4d0c50536ad8e66b6104f305bcbbdbf9801b6b179c11fcd4c4839390b",
  "Q63066709": "b051e1c0bde7330668c16981dc71cdc7d3ac60e347c646adc15c622cc19b098b",
  "Q6907938": "c265a34b6edc11e77083cdc1fdd411dbf9a02552607059894c3c44d1f52704a9",
  "Q7201198": "f01d2c0803a2f48ffe19806237638268058643d3fabc87a6f97f6ccde4c88c3b",
  "Q7678446": "bf544504dd65f105137198acfc1db60b3f13fb6ab64c580d2727ecbede72a333",
  "Q7831185": "f077f112ff2bceac6db7f38745e621e69816da68c5b8c1eb47ff1800502f8103",
  "Q7916983": "137bb928a98077682ca74fef90369a99d55aebb0d6d485e3b1585fe4f281d8a7",
  "Q85786245": "79cef6a6199a70146adad39104839fb3e8e89dced0fe82665a20510921891e44",
  "Q55230409": "0b63da36e951395ebedcf754e4c15900c5b7a848ea94a9b109d72c829f447436",
  "Q55230549": "5e8dcfe590df035dd89d8c59b831010617ee6ac45fd371fc9d3423aee44e798f",
  "Q5998865": "143d0b6053f4537012b2823933bbee29a53e45daeb78da27d7b85f48e6e3b4f2",
  "Q6009281": "296e2c35eea93d3b15fc669b7cf9e01cfeace33f0fe36b2cfd1ff6000b0497bb",
  "Q6907565": "b399bfa7dd9cb721cd2cc4de23f45c5c11cbb34a9c8c66c6b03a62597773e7d1",
  "Q7426802": "ef738a68b6e4509636f345e785617cab4a4825fab378df2713e13a9fe3e71f36",
  "Q7718000": "61601a55c1dd0a74ffa74d95f312953468c294b54a75f2b31e50b23f8dc200f9",
  "Q7774455": "9d672c9aac634614a4322b4a12814a65a9ed7c030f5eb38c6dd2f580dc3dec24",
  "Q779016": "dd914ba9e9e3fac14eb7e034a8f8861351b08a292f8724f9ff6db60b74dcd483",
  "Q131376801": "a82eed492d6952a6d49b4cf5e402b6c75ba232ef9a53e47a012f2cbfd826d5f3",
  "Q131376803": "b0905d3f67922460cad860883e4f898873201670ef6449b2f639ef51f73b2cd5",
  "Q133800124": "a34e0ab655104a090a58b3eee3af808897ef88f3ddc9d2353aff8a7be7f3f79a",
  "Q29884044": "f82a8ebf2d30970710e188a42ce46a66001da83680f32ec46ae8590960dc3940",
  "Q3201692": "7db7476f4a580c47077496a3bd9d3c1d6a40b8896f22bd84dc389d15e30a255c",
  "Q3222051": "726b95266a10da46cb4c36efcac64641dd5745f9fa6dae2916c6a13aeeecf004",
  "Q3854497": "9f4f2415166c630313889c91d5d69c824421fc6d02157ef6a59cff5ecca8e129",
  "Q5247733": "2f4bb28d6700ba490d4ae4dc2e288b372cbbde05353c287e84327966044f34fb",
  "Q54807279": "0d54b1f9fa63509019643157d4d5a17065baf7accd39ea5aad930084f85b365f",
  "Q130738105": "d40cd30da96127122beb360749cbffbf464b2b5be5f8d9820017c577928897a9",
  "Q131461555": "66093b66c48ecac3b3bf16faf00893497f083f81fdc138936c3fc7e54471ee65",
  "Q131461643": "70d59889f7a87eb4993faec65186038dcc813cabcbd3ff786b7801e53b8e7728",
  "Q134612524": "32860b8de64814bb505a800331d9c0c7b8183656287e819758fb58875e5ff941",
  "Q18152780": "318d3f6129d1ab010b7db21d0e1df6f9dface7b3f1141de778acce7493b66237",
  "Q19947585": "9f4cf9f487ba19b388d53ab9b4b4dbf621b24b8f4f3d0bc628b15d130d5ea299",
  "Q20724576": "61b9b8a2b37b055d46edbbaf634f9fcf340ba4b2982ed5fe0608f6997fdfc281",
  "Q21893619": "ad77a0862008eda34bfaaf75596d80661fb6868344fefbac99cca639ee584983",
  "Q2298506": "20fd858ca7dd65a88590d2750cc4e20a17e0ec3a2edeffe024d0a6c624df3afe",
  "Q2420936": "ac4c75352c15b72e16988ae0df0620cf4a23caf4e0acfe1b1c1d23c3fa1631da",
  "Q2447953": "8e027434f6ec0edd0f73827e6eb132ab7fb38a68cc81130afe2b872aacf73c45",
  "Q3453308": "3cc2c5882f1e569224210d816fdb82aad7b19f73e96e9f386200a70a5b0bf7bf",
  "Q3563298": "f37d87377d9bedfc2fe6f35d795ac6da2c22d7139b17b4b25e76b4efade68309",
  "Q43543759": "9817d5164643be7394e4594d8fc413bd3b5686457a1fa7e397ad668bb4d48697",
  "Q4839827": "7fc236d4ade5750261984e47bf9ed3b699fe60ab08572f0d4776b539f35d0996",
  "Q4863413": "2e181e9add0b4f61b16cac5c69b69e3c391c0e8af3b1a3c7f2e081b749e9aa0b",
  "Q5057899": "b6ddc9e4d1be8565e5fbe3f6e3420ae666d911dfffe7f2c41693c9d694418e12",
  "Q5305671": "aa6d2efe16d430c1b3277f2b7b81c89a8beb4c17465360fb44a105facbb22d23",
  "Q5375581": "e5eda0f4c9a64ece7b3cba963c8aed565253dde29490d1d40dd325185fe9a620",
  "Q5700973": "a36b2b1f4aa8fb36abd82bcc1ff6b2e3b46f3ef6d8c52b034821ff10cc5af447",
  "Q7601479": "d2cd4141f2c28abf4b13cd0f6c0f5016b9d542b44a9096a8ff186f7284b2de99",
  "Q7785669": "b434e20878d4ec595b97754be75307b3f09f0d8f676acc64b47f998b9b7f4b7c",
  "Q7864589": "6329be8f90cc94ed49a44bc5b1745eeff3cd74e0f3111771e0f5cc1069aff3c0",
  "Q8036762": "be7c5ef444de2fce4351837b2aa6f61789841fa6b4941e9bb3bae3d4d58ae7bc",
  "Q8069191": "3f43b3b6be71208da2055a67f2b4b20ceb8f8141a7ca0a024ab4cde44c6248b3",
  "Q85808079": "14caf86ad656965b79266a141c51b9ea6770fc1cec5aea0be9fd9d2a6822e397",
  "Q131471753": "fbe7b278f7b2fdcd10a90a78e54e2c4f6615aebbbf3abbcaf234a1ef9e3f25ac",
  "Q134080548": "35d3067f3f01a09e80364056c49b390ab8b0568c30415fe9a4b57e773873d61a",
  "Q135209407": "54aeb17b76e8c960df7a8f0482bb13b2f9cefc75bae0f30e1106244c2c6dadeb",
  "Q30084993": "0d40ffacda4e3b2e533d6e635a1d32408cd2546b29e596babffc90ea52f47b15",
  "Q3088925": "058f1744fc74cd89564431dc03fbcd84fe00b001ab318b0f996aa771691448ea",
  "Q3335725": "1ead6f625b3479227e3d944aa28156704ccb33088adb3be304e8a58ed009fb51",
  "Q4658106": "73d5fb3204219a0be959998d9a1a9ad391d4281008915d67ea9c8aa69f09d4e9",
  "Q4808579": "3c566ab5ec9e6f82ffb25624c29b923c99ca81bc6bc373b5e15f78e6bcd21b93",
  "Q54800874": "0e301f47995a8f3ce0602abeca99bc0dcda1771889e80932f0e09d120f6e0cd4",
  "Q5518056": "49a00aed681b598580649cba98eb80c15b7aba2685e46cadfc773a637aa62d35",
  "Q615035": "c9ee5621f41320110a032c8bc0402db434c02468cc7071587ddae3e44f6a39af",
  "Q7251700": "95ef2998ce4ede65df55da862aaeb738cba797dd7ec48748252b25225a8b0376",
  "Q7332612": "18ba0b14433726c65be40316a04884cefd406c920d0bc70167e73deb6d7f6826",
  "Q7679252": "b704d038c93065ba52ae758557c0a657ae649de4902bacbedff8671c30c96166",
  "Q7726841": "600176fe3a8359fcf4131f2dda961eb7df4ab58c8897ec1676123249a3da560c",
  "Q10658260": "4200c2281a1667a3f61b8286d613a36f8032ecc33c22aee727b798528ce36786",
  "Q130737796": "6de1a219479e331eb7fa164fa34874bd643834d35aefe1d9a37d3a96af98dc7f",
  "Q131445236": "258c2709295ab7d3b1e00ee183aa67018f94b7229f59012df0c3642218b91d1b",
  "Q131461432": "969dd4784a9a34d21c9450d06bc2be2b2cb8634d0b4012b92b6f6133f7d15898",
  "Q12411852": "2158dfc06668f2575ce8ac84fa3906653c0e764f58858d33a074ad4ae410f610",
  "Q1300587": "b06cff961547d54f4320ed8e4b2b8327a490506a71d585de9f1459beb10efabe",
  "Q131376686": "92107147a200f8037114d7c9d75f1dd5b20f83de151f458f2584eefcfd40eef7",
  "Q131380757": "a6db777e806b36f6d438deac9706474ec6a6a37675204b47ab64da49bc3df55c",
  "Q132774503": "b8e75f64dd10227bc5993b14241839173e04df056b15f75010971f77444cd01b",
  "Q133984305": "58ec7277b234bfe8a2ec494bdbe7cda59c1adff2722c60adb76648af23b2f7c6",
  "Q15094083": "729f25eaf3a7a81bbf7d2c215664fd4aadc0e549d2859e3d9d00d36fc874bedd",
  "Q16955002": "db913c93ea2695ca81bd7dc6dc7c2919aef95f6beb9c6d5716ac6f57d78a1567",
  "Q22248349": "5b8435033b798fecb374e1459af9565c7de8a85bbcac0fa94056888220a2bc44",
  "Q2647380": "4bc0ce762555f101a4d20f691ddd37fe40ab426b866f5cd4c0089c12ac5af097",
  "Q2972319": "80963607ca65a5fa3fdf9a45809171d7b0f1be953a806a9b20c0f23e8a42688e",
  "Q43635157": "0b4b0560716b3e9dd1b1d62fec3cd3fee4cbd548a3ff379ed4ac4adfd39ab461",
  "Q4880455": "e5474c919ddf5fa44c95a4b2e1bd02e1fcb76e348c59d3037a78390f9223fce6",
  "Q5440721": "fc59233d5d14135d924d96ae94b5d889426c4774869794cc0930e70e7519c28d",
  "Q5441458": "2d16911632245c28673a7e47687d144d1271740953feb63a0fd41ce49d5bf64b",
  "Q65125622": "ceb03dc02033bf701e5ef3d61f66ffe9ce3e624646c00856bb47822629eee6c7",
  "Q11826490": "628c72a62a22f5d81b2e3b0a5e8bae5e48595993a345e95a6555e084a42d5ea6",
  "Q11946479": "64dbf3048a8a0bce78c6869fd5489b159eabbfc4fc384a626657de9a9890d134",
  "Q12720858": "f8ddb73a42117b23e9dcfb8c4926090814a9116610404543ccdc4ed92fee9549",
  "Q131461463": "921a79cbc1b510eaf003cbfb423efb1bc50f104732ddeb7ba2c08087252e6b35",
  "Q131471704": "bf30f5f2b8b3dcc8649614de89bc636717db34cc9c379b4d004ff15eba6e53fc",
  "Q131516770": "cd26351860979014f4f2c8eb3d096ed0bd81baff69c3d57baf8242e92f771aa3",
  "Q134464020": "a5dc91e818ec55fdefbfcc536f1297ff9f6472a88dcdfb41a34aeb17b9c29950",
  "Q18430829": "047417754b7293a74544c4935a8613bea05c76ed0f4443f5c20819247b0e6863",
  "Q28419607": "54bbb4639699d8db935b5349bc97e78bdd3b065673ed8895ad2333d1949cbb59",
  "Q3116252": "c7083f4f7f2df5786977d8bcc8f40a837bca9e8bf52aaf58adc84f5cd18be07d",
  "Q42723496": "5995129dc8ed0851faf44715f262d7744ab36246f48e6f4341cc003c64f9647c",
  "Q4808643": "fafb8830d3ff5d14d4f89cf6077b547e7b169bf2f94f4bfd00966d3d964e4ea1",
  "Q5368262": "cfe054cf72c6cb208dd35f08a98184ebf251a2a7dc408c9e3f3702b8e2e86953",
  "Q54802781": "2be43dc6b44cab8248d7edaaa918176b43b86dd3dc26c260240518fa3006a0af",
  "Q54807395": "cfc9dac5fca904a45d4770f030a945a28ded4d9848a282a4ffbcefb819efa170",
  "Q7738320": "2fc88d97495cd6dd1d92245e2665e0836641c246da694376d212995d19c7b3f0",
  "Q125817634": "ce113fd119c9b429bea44f48de5c3fe7f593b8c016b4dae02156faf970999051",
  "Q131517849": "a6b9bfe81baf8c4c6bb7ec0026f7981f374bc722e9802cf4635ddc42c82737bf",
  "Q17009376": "5a07617432d534248f79b2e441df8c44134f7cb6afae2e405e05ce4797a9a59d",
  "Q25395087": "f3827be2851bd925be0a02f302ee312902912770f8e41896a139a97330f53593",
  "Q28419265": "105d9c916916e77090f69a914f8c086d309de684a765d63944c1fd37fde82e1a",
  "Q3021982": "2b9ec77b00e18e42effdf3770a9cf5b4278c3d1b212bf8daff4c7671abe44162",
  "Q30607982": "7faf4034a2f5f501ebabcd80eb41211bcf634e35fd93797cc1046b97d36e393a",
  "Q3206352": "b005a8636f9ba9320693c51e270b33c45f582e11291144fdab4db9d284d54c94",
  "Q3222992": "268e263733508f4f2ea8f71b8e4e6ce181454f8894a28f36b16cb55fb751b414",
  "Q3234544": "afbd8cec5acfa981f2fcf7d77b0bd5f690b8a6be2411532e8cdfcb247842aad5",
  "Q4726516": "456858936703fcc2f5705fff11211f19a26a36fcccf9860b1fe6f54b3367f675",
  "Q54806997": "412e03095ff199d1ad405206e79162928b3b52154e86c3800834189dc9a4451d",
  "Q7619863": "9b3386590394f1ffaacdb86ac7b1a7cbeee57901341dbd7b682c60e74920b813",
  "Q7805574": "35659ed32b12e0e393d81081eba20a84d8432a0de567cbf492d2d6557c2f356d"
});
const FIXED_PUBLIC_DEPENDENCIES=Object.freeze({
  "research/issue-input-snapshots/root-recent-round1.json": "9c21e5e5829ecd250d4241b37ae8a6739f745e7e211557867c372e44910e9b9b",
  "research/issues-source-reading-round21.json": "9a2686bad677ad50e72f9e8e2acc19ffe0c71b3acf761e0af844cc1a5d68c1ed",
  "research/issue-input-snapshots/root-recent-round1-log.json": "c9202a9d03ea4cca7b27cf31fe2d48dae5723d632af188b6a91d5e67644c1588",
  "research/issue-input-snapshots/quick-retry-global-round1.json": "f79194bf910034aaab1af9b0b3cbfd1b1b575ed8acc5b1ecf07db1057880fee1",
  "research/issues-source-reading-round77.json": "cc23c9e956b5758068d01ae9b831aecc0d4608adcbf4e8681d8acf7ce4000c14",
  "research/issue-input-snapshots/quick-retry-global-round1-log.json": "c2b22bbab981ea72227c138efbaad3aba42bc38fbf756d74b82f302c8078f948",
  "research/issue-input-snapshots/quick-retry-lane-1.json": "6ac6307da6880daa689e10a48c35466fac9ed028ea6a42764b0ab4af29d072bb",
  "research/issue-input-snapshots/root-fast-round12.json": "083d29ba896a6159026ef884f6cc075705498d56c2987161043399104a506d46",
  "research/issues-source-reading-round31.json": "b32ed55cf0ae81594afc64d1b9ad48e64d0c8e9388762d2adb915e635c5380f0",
  "research/issue-input-snapshots/root-fast-round12-log.json": "f79cc94f7764c1d1fae269c201cc002c66740886da9cce5f7dce090770052ae1",
  "research/issue-input-snapshots/early-recent-round15.json": "d75ea892c3b037c3b5107d24f86da1e6b97bf6240975e43a1ec566b82b895743",
  "research/issues-source-reading-round32.json": "3a4cc284acad5e8f6782a939531b369780027bfae7ef8ca8775f17a743c75235",
  "research/issue-input-snapshots/early-recent-round15-log.json": "deef0d28fd4f44924363f1524d42389c20048ed1b8b826b43431cb78f9a5aebc",
  "research/issue-input-snapshots/quick-retry-modern-round20.json": "e60412e5c22b082db77572519be95f7bf5de20e4f12a416171310679a0a8fd1d",
  "research/issues-source-reading-round84.json": "cb9c63005da7c37c79959239e8af2a05582cb109f28e5e5900bf0ceebdd5e16b",
  "research/issue-input-snapshots/quick-retry-modern-round20-log.json": "dd37cc8253059261a26691d98861423b4058a71ba62ea18df6ff30f34b2b3fab",
  "research/issue-input-snapshots/quick-retry-lane-2.json": "f1e3bce7c91b9744ab300726ea85acd26e5f195553ce022a63559cc16e04bda5",
  "research/issue-input-snapshots/modern-recent-round16.json": "9a8ff8f268eb70c5c814a53272d0f2a12c54a8fbdb180927aee8f837dcb3ba89",
  "research/issue-input-snapshots/modern-recent-round16-log.json": "5b3ae12325a9405e5fa274322b0d3d98c2fab5e26ec21a3f8af45d7e7c91dbb7",
  "research/issue-input-snapshots/global-recent-round14.json": "9f082aaa438b0e526947bba5a270eed7faf346104cc06269a4bff6e4acdfb57f",
  "research/issue-input-snapshots/global-recent-round14-log.json": "4b2a94c344c5ff88f565951ca3058acb221d381f4b31e403f3afcb84b013ebc6",
  "research/issue-input-snapshots/early-recent-round17.json": "fb46ac7f15cf858fa9f07ac5145a4e36082085339a3069b2321e0dea33eaf4aa",
  "research/issues-source-reading-round34.json": "87e4edb0332ee3da1763054caf458b4ebe3675a6e27d42463ea4b28cbca95154",
  "research/issue-input-snapshots/early-recent-round17-log.json": "fcf9351b75d2df60e8e96bf667e431b290aa25e0bbf455cae7278d14f56620b8",
  "research/issue-input-snapshots/quick-retry-early-round2.json": "b0ab6bc93f92bd634028b7a97093db944e87005fe94d81536c39522364069ddb",
  "research/issue-input-snapshots/quick-retry-early-round2-log.json": "e2a1c6c74ea9e03c31032e8f35a95f59ef419338c93503d589c0430a4012b726",
  "research/issue-input-snapshots/quick-retry-lane-3.json": "ac16324a0ef149c7042828b0988fb133af9f30d08c6b8bc5b1a3e5be26af026c",
  "research/issues-since-1980-round2.json": "653dc9e28f3dfc42b2e1e72e781e1a03645c76400adaa9e6b9bf0df1a34ea0d6",
  "research/issue-input-snapshots/modern-recent-round4.json": "e9d60c8470569f9b32788545a7c2ef8169b7295987fc2881fa52af051fa93cde",
  "research/issues-source-reading-round22.json": "03b3b855c84e2e961de79120ea81eb0cf4f3dcee604977f2801fb56464a21974",
  "research/issue-input-snapshots/modern-recent-round4-log.json": "77ea9123fa06f93d9f78afb25a053b0b880208341b4af451fe4ba146f8556f5c",
  "research/issue-input-snapshots/quick-retry-modern-round2.json": "d2bb67475ffd68cc8ced993ced6a943affd2ddf2adfe763c4a502e1981cd4322",
  "research/issues-source-reading-round78.json": "de3229babd07f971eb1eeda5cd880c63077481b125843baa1901115d5671606d",
  "research/issue-input-snapshots/quick-retry-modern-round2-log.json": "e3e5d9a1cb829e7cb581890d203ecea318f1bd995a1432f7c732f9e5da3ec956",
  "research/issue-input-snapshots/early-recent-round11.json": "7dcfcab4ebe159ed6c4abc2daa90b3c86d929fc9a4b51a0f7140c75bdb573623",
  "research/issues-source-reading-round27.json": "9deed743ee88a4a376c943212c0ec0517b45dc3273d9f2dccbd83a5354006eb2",
  "research/issue-input-snapshots/early-recent-round11-log.json": "be1391da592be7badbeba8a77a7df8cb9356db724afb3479c0ae8fa01b091bb7",
  "research/issue-input-snapshots/early-recent-round19.json": "70515669151c968f9cd2d9061bd22e54602c99d3cbc2db199c67f83a50da7db9",
  "research/issues-source-reading-round35.json": "79206b2c69c27e3938be8c3251500797972e01e1227c1ea97e721ed5d1782cf2",
  "research/issue-input-snapshots/early-recent-round19-log.json": "4380690ad63ebcc51377f5f495e8a05a1fc0e0e107c9b822c6ab36341e3a129d",
  "research/issue-input-snapshots/root-fast-round56.json": "6f10fe4ff54d8d7568ecc0e0b474aeef5df14200dcb2abb6aed85a26cd1818d6",
  "research/issues-source-reading-round48.json": "e1a86c30b0695177de47b503c306c63b1582994f47f3ac6141d9fb8658fbf219",
  "research/issue-input-snapshots/root-fast-round56-log.json": "cbbdda8d8486d0d8a706ab2b4d88ba93aecbe74de92b7036ca8f7d28431e404f",
  "research/issue-input-snapshots/modern-recent-round20.json": "22392dc809d3f7da8cf86d136b9543f7bc5fb138811a4ff8ec0dff10ac78f6d5",
  "research/issue-input-snapshots/modern-recent-round20-log.json": "c8d538432db98fe83ab832b9594a7d6edd0fbaad3bd37bba9b2a11e4beeb2c91",
  "research/issue-input-snapshots/quick-retry-global-round2.json": "98bd00945028b06844ccf7c1180ff507e6ed045ff5a67e83d840a0f581d0152f",
  "research/issue-input-snapshots/quick-retry-global-round2-log.json": "229a95ab34cd910d2c9ff8a939955c1849d3a6e8cdafdfdeafee7a4f6896fb20",
  "research/issues-since-1980-round4.json": "9fc4a4ca9145ecd01aca1773950d5ba8232377e49c7c4bc12161e678ddbbdb6c",
  "research/issue-input-snapshots/global-recent-round16.json": "e0d2b9aab9143a22408d2e4481cee88b5f6c457159dd7a79fc6f9965c7467750",
  "research/issues-source-reading-round33.json": "f75cb15eee2d9b052076443e5bd0845c4f121ed33bb57892e912d4520daa66c4",
  "research/issue-input-snapshots/global-recent-round16-log.json": "1242824887e690622011ed2d89e479b6eede56404bb760ce531fbb884ae36988",
  "research/issue-input-snapshots/modern-recent-round5.json": "0345526bbea594980cfd2ef19c743eff645bf84219a420f2c034523551c5bfc1",
  "research/issues-source-reading-round23.json": "801effa904e182476154f108f08ed41781fd438103bc7d33b8a5d9e0a9eb5795",
  "research/issue-input-snapshots/modern-recent-round5-log.json": "4d495257515614ffdf7dbaf4beaf0010703fe5f5638e5d409f9d033550b3d2ae",
  "research/issue-input-snapshots/root-fast-round65.json": "291605b6049cb5420c2c0ad503c5a15ae005c79504c04502d75726f56cfd7e5a",
  "research/issues-source-reading-round51.json": "457d6b583b12ef8f7f37519e1a8fdb1d4676572bf8b2b93e0128370ff50afe73",
  "research/issue-input-snapshots/root-fast-round65-log.json": "63dcff024f988dcf76e94c3b6571ee4fe7119870334f391ce8e9b5a23d405a5a",
  "research/issue-input-snapshots/global-recent-round17.json": "5b7cf8a5b9c272fb181defe7e7d053497cba3286182a5ec3614e5cd95f87c724",
  "research/issue-input-snapshots/global-recent-round17-log.json": "aa93f16944fefde244770e53ca20717e505c5e9b83e0edb8006706c9cbb7d20f",
  "research/issue-input-snapshots/early-recent-round20.json": "67295a887671ac37a6e5f6b427bc262dc7034d2050a9bf1ff8819d8a142d58d6",
  "research/issues-source-reading-round36.json": "0c0a8bba33dd9e0338d549ee74d82127d52cea4004316cc2418c4428c0ed9bbc",
  "research/issue-input-snapshots/early-recent-round20-log.json": "a27f53cea34126e3fc2e1cf247a90f06ec0f03c60adfc84f5e93d4dd00653be7",
  "research/issue-input-snapshots/modern-recent-round21.json": "aa252fdde85397a29a1809590f9ca4373458e9cb5388b88571119f1c9c3e5a37",
  "research/issue-input-snapshots/modern-recent-round21-log.json": "6abd829d1dbf0e092b85056e49f150f52ad555da756e29539e2291952fad266e",
  "research/issue-input-snapshots/modern-recent-round13.json": "494cf89d7a473555bc52ffffb7f3d2e4570cc4cc1f472068a2e7edae0913fbf7",
  "research/issues-source-reading-round28.json": "ff796a6490a51dabb6c70fba284fb2adad9e421f988856c42a262c1fae84a9d1",
  "research/issue-input-snapshots/modern-recent-round13-log.json": "0e73897970f8c5e67bdfd923a93c0f866eebf809dbf5380df160b62986ca9e7e",
  "research/issue-input-snapshots/modern-recent-round22.json": "cbe641324338e83e868b5a7fc600adbd12bcc68fc5713d056d87762815b46244",
  "research/issue-input-snapshots/modern-recent-round22-log.json": "29b960184380c9071f8b5b6212a6a2c406bfde47e87df1b814b3e10db0ffff4f",
  "research/issue-input-snapshots/early-recent-round21.json": "4b44b8849b7a770c000b77393485db175b5bbc1547493fe0764def26c395b545",
  "research/issue-input-snapshots/early-recent-round21-log.json": "669cc7b192a35fd7627e7406628b18f82e219763e127e42f0b035060e21e964c",
  "research/issue-input-snapshots/quick-retry-modern-round3.json": "a5edd71a8e2f41bc3a38d3523007d065abac8c884ee9bb5964b8e62a478ba628",
  "research/issue-input-snapshots/quick-retry-modern-round3-log.json": "117238a0e0b9f3cf03f2cd2becb514328629890e262b75c80cc9ca25aea55fe2",
  "research/issue-input-snapshots/global-recent-round5.json": "f1be8885187f82eae88c781f54678dc3e2ea76fbb3566dbeb7421561b1c5c7fe",
  "research/issue-input-snapshots/global-recent-round5-log.json": "2e849f3a41c3cdbb96c51ef82053aa47120681a6f04fd7bad1cd65e7144e49a3",
  "research/issue-input-snapshots/quick-retry-root-round6.json": "dbaaf93530ee4fcd9715d1f410799587ed27101b114183aa01e38d633702d910",
  "research/issues-source-reading-round79.json": "81989e91db3f607b2b333d76e864917bdb60c8afc887b262946349868e99c363",
  "research/issue-input-snapshots/quick-retry-root-round6-log.json": "60014edc0c8afb67ae831f1970c7a8838cc4c6db8a9b110eb767f872f6d0df65",
  "research/issue-input-snapshots/quick-retry-lane-0.json": "5fce5b2b8279d784d7d141536d8e923508897fe00cf0f03aa907e610a8c23596",
  "research/issue-input-snapshots/early-recent-round22.json": "585cc17a1a6f495f167289be8ac9004386138d769166e2fd70fe2d97284538f7",
  "research/issue-input-snapshots/early-recent-round22-log.json": "da16dd0b17f911c51107f46e32e402b5d36f5b4aa3e40c97f8d33f725c6f90c2",
  "research/issues-source-reading-round2.json": "8dd22264f944b332800a15e7f2c14ef7b67e6694675f04da6967daf9f7c72c85",
  "research/issue-input-snapshots/modern-recent-round23.json": "8c8dffa2ab630adb6d2e1ea5dd9245bccd406a26a0f4857ad67adb62b0f852c6",
  "research/issue-input-snapshots/modern-recent-round23-log.json": "6d30b7cdc6bfba4c5f4d75d288cc2be7bc1e746bf8571cec0d2287bfffa4886c",
  "research/issue-input-snapshots/quick-retry2-modern-round2.json": "4df5a67994da0b8a2457d9562425d926e4b973a78b36f0c8ce7b5049844953f9",
  "research/issues-source-reading-round86.json": "b0e5e1e67dc0d4b073a0a1296f9899978a749a9ab159b319ba560c1fe10fd604",
  "research/issue-input-snapshots/quick-retry2-modern-round2-log.json": "f2311237186dc642890676e3aff8bd0c044bc6d49c013b03b27d37fbe6d1db05",
  "research/issue-input-snapshots/quick-retry2-lane-2.json": "1d0623bb95ec95be038d68eeeda5404a04ebc150f86e82133086b36d194428ae",
  "research/issue-input-snapshots/source-round17.json": "e39be450e71e754c7705cbc92730aade616ec20cb0cbac760617bc1ea45c882b",
  "research/issues-source-reading-round17.json": "55b7dc6c9985f9e4ae64c2cf27e9f48cf16c77f679eed22933e166625afb7498",
  "research/issue-input-snapshots/global-recent-round21.json": "e1a2fb4fc1ae9a2a4f8cbd2ad213cf9bb4514bc133bdc45ea2deae624f9cc148",
  "research/issue-input-snapshots/global-recent-round21-log.json": "57192e8293fcac182dbe69b9789fb4c50cdfe8cf97ae115803d72c3bc06bbb6b",
  "research/issues-since-1980-round11.json": "9ed8de4411b7bd487d659ae93666968950dcf9276e463dcba35be2e06a3e7e91",
  "research/issue-input-snapshots/root-fast-round88.json": "d70183618e5569aff0e5fcc758a3b7252401090b2e51c0f165ca02cef3724d86",
  "research/issues-source-reading-round63.json": "ffa8aa8aa8f584cb09a4c2ce1a574023b6e1f2b9858d732d27fc096608ed00e9",
  "research/issue-input-snapshots/root-fast-round88-log.json": "846c55b373ec0982e1fb8fc9c54e536b5a8142d53eb9214b0a5ab6f311798955",
  "research/issue-input-snapshots/known-year-early-round1.json": "da95f3333c65079377841cdfac60ead671b8edab3e43e747e9f47c23d7c23b29",
  "research/issues-source-reading-round71.json": "c47cae33e17b1c31c037cc308e9b5dbf1dc6de75cb1aa8778edc5fe42cd22b17",
  "research/issue-input-snapshots/known-year-early-round1-log.json": "d097522df3a175d39e1f961319bb4b93a1fb2a3c42bd6b73b3aaf3c1ce6969e5",
  "research/issue-input-snapshots/known-year-first-pass-lane-3.json": "b193cb6e5cbf290ee699db0a540b6b05c6c1855dccf59651ecb3eacfaa865e0c",
  "research/issue-input-snapshots/early-recent-round6.json": "fbbf8b5e970d1c95e354812b0fd43bbe979660dbcded154ca1f4f1395f39df2d",
  "research/issue-input-snapshots/early-recent-round6-log.json": "eae44269d6ecd2dba531c28e19f42bd239adb93197bf7210acd89ce6705587ee",
  "research/issue-input-snapshots/modern-recent-round24.json": "37ca1c76eb2b49ac0333f0d5410d8de344af4fbd24926b81007dd74dc04a63ed",
  "research/issues-source-reading-round37.json": "6fbb4eca5e0513e58aae36e8c900446b74a9385980c19fe42c38b16e74a0fa79",
  "research/issue-input-snapshots/modern-recent-round24-log.json": "dbe0d07f043a23d6423caafd01c489895e212baf686ac4c66e90df9af5c2ce5c",
  "research/issue-input-snapshots/quick-retry-modern-round4.json": "2bd47b40040d9f010c7e02fc181f10425e75917e9bb1243fedf3b161f17efec7",
  "research/issue-input-snapshots/quick-retry-modern-round4-log.json": "d2b892bd983eeb30e80cdd30fa60e6c24b92f69895f52c27202ec19240fd7ed6",
  "research/issue-input-snapshots/modern-recent-round25.json": "fc962c402500f5c4f9c45f9993c04652dbdae60d66e22be32f81dc86e7eba6b7",
  "research/issue-input-snapshots/modern-recent-round25-log.json": "aac64c9a9556fbde9bf3e9dad7fd8127ed58e114d271c97e923859ac3435871f",
  "research/issue-input-snapshots/early-recent-round12.json": "1abe77e93c9fa6f693ea0a403af2dd545648260293cd04b79b0da9c651f9c493",
  "research/issues-source-reading-round29.json": "506202638535957358bc47b31484861e67c1c067c7ec0e620f62bfe98c81bf83",
  "research/issue-input-snapshots/early-recent-round12-log.json": "2972783e42114baa98007adcfbffeae325effdb0cb46428e324cb35c75d59e8a",
  "research/issue-input-snapshots/early-recent-round24.json": "2d11d960ed91548a601063540bf173138aa53e469c3f7601fdbf6d3cfe61658d",
  "research/issue-input-snapshots/early-recent-round24-log.json": "5b90af01636a11c404df2a7d940f20db2bd9e4e9963713adad048c67a69dc2ce",
  "research/issue-input-snapshots/modern-recent-round7.json": "a2e55cc764a72f0290362ca7e08afacd4dbe71279feee9b30b38f34d21604328",
  "research/issue-input-snapshots/modern-recent-round7-log.json": "d4453a6748a71dee00c207057c62cf72f5722f287140c55aa2871d14fad695fc",
  "research/issue-input-snapshots/early-recent-round25.json": "187f5e324b689f8226a131f18aa5fe3e23b1e1e1c05dfe8ee38d73ed4e300bfb",
  "research/issue-input-snapshots/early-recent-round25-log.json": "86d5f251cda0d773fd80e5adc1aaf92d7ea2cc0845beccbb1c5c7351bae4f8df",
  "research/issue-input-snapshots/known-year-global-round2.json": "c7f7dd9f2f71b8fef6ae6edc50f6653884513331a6bee59094b8316b2bd87d09",
  "research/issues-source-reading-round73.json": "e3793f7a9199f785c1d4344a606e20cc5be76371399153c2983c5d0940683175",
  "research/issue-input-snapshots/known-year-global-round2-log.json": "f205b1e020b0c5cca353680d19ef64ca7cb8a9a878f93e1d782869769c189c62",
  "research/issue-input-snapshots/known-year-first-pass-lane-1.json": "c4f5abbb4b3f5b116c9f627a6a4f0d8408a90b5c5d091360dd76e4c4cbff3730",
  "research/issue-input-snapshots/root-known-year-round2.json": "102b8fc157018f93aa70051f2c17b06eb7bb1ad293e55a9e62514918e1263341",
  "research/issue-input-snapshots/root-known-year-round2-log.json": "4778694324f54f7fac300a241906299f6a6a86644fd401c02a9ece4457304cd0",
  "research/issue-input-snapshots/known-year-first-pass-lane-0.json": "077a719fe2f381730b263d4de580902b409476dbeeb36e570c8c3008c1ec63b6",
  "research/issue-input-snapshots/modern-recent-round26.json": "b974fbed3d980d9f398deb03ba373086d04aa7ad34f4ad9c4dbf632311de7b6d",
  "research/issue-input-snapshots/modern-recent-round26-log.json": "6311a25d39e46255ba2128be859d31228d027fdd59bad65bc5a2afc2fb50e104",
  "research/issue-input-snapshots/global-recent-round25.json": "5e041a99c500eb07fc7887f8e2fb9ac0b91178b5039cadda552250df5723883f",
  "research/issue-input-snapshots/global-recent-round25-log.json": "1af1304b3038a6b9763cc932f0ad85dd38e01e4906284fcb01ce95ceba8a0994",
  "research/issue-input-snapshots/modern-recent-round27.json": "24c6c4d3e19e25db59fd712ef25f4af7f004ba886fbab48354575f1f981919b2",
  "research/issue-input-snapshots/modern-recent-round27-log.json": "341816c159ed52c5f27b33dd71487c5b44fb6622b82e1ab44d335e6117aecf76",
  "research/issue-input-snapshots/early-recent-round26.json": "d4f07671c26aabc66f7c32d0db0d6402d0e1026911017aaf00b8f6cef5ad9683",
  "research/issues-source-reading-round38.json": "c196423da31a290485f7d3bc41773362621ea4ac585a026340bb95844816360f",
  "research/issue-input-snapshots/early-recent-round26-log.json": "1533141ba9f1b98a68303330290c282dc034636686bd90605fb88effdc8f5a4d",
  "research/issue-input-snapshots/root-fast-round6.json": "484eaf520952ccd779b9051c2fa8bcb7fdf489f5860425fc4d645d9f0ea0b06e",
  "research/issues-source-reading-round24.json": "1cb1d01713c0dc677ad4ba4b4b5056be3f164a19888fc1566718e85353937a3e",
  "research/issue-input-snapshots/root-fast-round6-log.json": "ef3a16ab9f628601029e1b308e74ac89b9ccf02e2c1aa4ccb0ea9fd034d59bca",
  "research/issue-input-snapshots/quick-retry-modern-round5.json": "3b493b04bbed0981b897329338bb0d94d880524b9354c640f7cd0de9c44e886c",
  "research/issue-input-snapshots/quick-retry-modern-round5-log.json": "dd4366ff9b8d8c09411c8bd66eed1dfff86efb6c548c5f23143be41e75d77c38",
  "research/issue-input-snapshots/modern-recent-round28.json": "a46b7a36a6a35eca1a21de706db9f5c1456b9aa859fe94d2c324d072b8a12778",
  "research/issue-input-snapshots/modern-recent-round28-log.json": "d42f88b1501c55a4aa156d366710b840ea910da15e0d001ea773899b940cb80f",
  "research/issue-input-snapshots/known-year-early-round2.json": "a2e18bc7a147ec5889b29c763fc31237efcc94279bcf9de5c870d0b90d7368ec",
  "research/issue-input-snapshots/known-year-early-round2-log.json": "6f01e0bb43a67c303755ad9bbf7c87439f8b955af288185fa5da8b9ad4a427e8",
  "research/issue-input-snapshots/early-recent-round27.json": "99bb436d3235807ff64391794ff79d1c8a565d169dc978d12781f6d603a1260e",
  "research/issue-input-snapshots/early-recent-round27-log.json": "9cb1d6603b86f46e3e565b40c2b7e14a520b277f59c7d4dd2c42f1a327339d2e",
  "research/issues-since-1980-round5.json": "680ed52c7bdf6d194a9e6d04223a01c32f26a61f2bc6ac77d1f8a7bbb52bbb74",
  "research/issue-input-snapshots/quick-retry-global-round5.json": "70f8a38939ec44393fbc65d8e09b8efee1d8fa659c0b3f2295ddf3a4e7dcab33",
  "research/issue-input-snapshots/quick-retry-global-round5-log.json": "c9a2fa2f518daf63c75bf7a68edcba45311a608fd4a5e8fd4e23b31dc5a2f4c9",
  "research/issue-input-snapshots/modern-recent-round29.json": "a1452a63aad19ab12647ddc83e41774e1bf514f3d0a1f6203b0b000ff484083e",
  "research/issue-input-snapshots/modern-recent-round29-log.json": "ecc8ac4fbc42cf4af62969e921dc41b6ecb5725d86498d7d9605adfd25860a6a",
  "research/issues-since-1980-round15.json": "6d5296484f51d40d9f270297aa5c38625d11f29f4382dadfdfed5b5056be4cbb",
  "research/issues-since-1980-round13.json": "c470cc7944487811f08284e5aba033fdfaa0fb72a998fd0f9e52194ec0f8760d",
  "research/issue-input-snapshots/global-recent-round28.json": "0e9678ade023cc6d4c14a4a6e0b28446481709953ce9b308a6fe1347c163fa8a",
  "research/issues-source-reading-round39.json": "c11dc90706066e652a608a6ce30207eb44b08ffadf0812c423dfa02431409fdd",
  "research/issue-input-snapshots/global-recent-round28-log.json": "e10f7eae9d99d0724ffec98728a58200681ac7c18c76c847c56edf45b41eb5c2",
  "research/issues-source-reading-round3.json": "4177b5f5d14fb5f2ed9073717483c24c597d357bf407febb177b5f8e1030dd40",
  "research/issue-input-snapshots/early-recent-round8.json": "dd14d98d2340f18b6abd11c8e0772b4605ddfce37475a7ab9a7643dfb78c2baa",
  "research/issues-source-reading-round25.json": "ec8d7744ba5fd066ce1947e73bdc43ed5ca5f6264e6bb0fcd430b90452333e6c",
  "research/issue-input-snapshots/early-recent-round8-log.json": "4f9220cedf4d11277b1246158ed02b58b6537ada276419ec0c463e21512bf844",
  "research/issues-since-1980-round6.json": "74f3afecda57889c7e97c8e97629243bb998c1f8538bb058bc268822fc2d661a",
  "research/issue-input-snapshots/modern-recent-round30.json": "2c644ace8d66d8cb17de7c1fd37e7c2113105c97b25e5388b7cc0fcc5046d829",
  "research/issue-input-snapshots/modern-recent-round30-log.json": "8fb14fcda0df1ec0f58413df414d2fa1d2c06aec7971c2881444185bc5e65d6c",
  "research/issue-input-snapshots/early-recent-round28.json": "d4c859797875f789d114414ecb3d28a951ac500553f0a22e70ebbea06eced830",
  "research/issue-input-snapshots/early-recent-round28-log.json": "05485a76809aa2a120af589d42c723ea5395374dabeeb9ab1f34b0839aacac60",
  "research/issue-input-snapshots/global-recent-round29.json": "5899acbef629f3f6e7a2f48324e3d1a8445295cd92cc4ce71f08ee44ba4f68dd",
  "research/issues-source-reading-round40.json": "045b65e4f2d8990e5690ad4a8b8e1ac5e814cf62b24770e7547ceadeb7267fba",
  "research/issue-input-snapshots/global-recent-round29-log.json": "693fcd14748c0fcae32d83ad83767f570e399d30b86d2c30b3647aae4ec658bf",
  "research/issue-input-snapshots/quick-retry2-modern-round3.json": "e35d2e7731f201a6d1c73bd5b91fb6a1461d557f5ba7974f5f8f96f0710f9108",
  "research/issues-source-reading-round87.json": "28c32765e9e306056e88f758b790d9ffc12b56e17d8e4711181de967e83a5b20",
  "research/issue-input-snapshots/quick-retry2-modern-round3-log.json": "f1c975bbf37312c848a20e84999166dc2b63db3f383a9cc283175683d99859af",
  "research/issues-source-reading-round4.json": "9dbc9be2f08455a36d0d6c122a7767d6ec8e35e6e1fc6548a422000a40ae00ff",
  "research/issue-input-snapshots/quick-retry-early-round20.json": "bc8b86928ef13969f0a3ba625e271825c748569d8194a87c436d75f558c63214",
  "research/issues-source-reading-round81.json": "0d96749960ebc49612e613f4d04ea7f8fe43d0dba07a1cde028611c8e216abb2",
  "research/issue-input-snapshots/quick-retry-early-round20-log.json": "4516247a90775bc23dbb8ad3130628b470bfde3dc3666cf4d08969ba4b0537b5",
  "research/issues-since-1980-round10.json": "84c4b863b0083bf19064d76dc00820336ab3c02a41450cbd9de8d7ee3ca7046b",
  "research/issues-since-1980-round18.json": "dcce04dd9bcefe8c6377520a8bedda8099b1e3b3668e4f5c867de88832d7a29d",
  "research/issue-input-snapshots/quick-retry-modern-round6.json": "e562ae5e98280f2e0f06e75be5cfefe2e1165d2fe1ac91503295e726911b7a36",
  "research/issue-input-snapshots/quick-retry-modern-round6-log.json": "641036183cee1843b2469514bcda13ace1524bcd66202f6f62171f6b0ed9bef3",
  "research/issue-input-snapshots/quick-retry-root-round11.json": "3549dd99c5eb82bba365497355324e51fceb664a300a20189c27499ec26c0228",
  "research/issues-source-reading-round83.json": "e807b09a206aa337ea1604abf924309b55faead26c2178149d078efc1fb01650",
  "research/issue-input-snapshots/quick-retry-root-round11-log.json": "9c44fe047e21fd0096896753e34360bd7477feebb5f25702b07eb3eec7bdb39c",
  "research/issue-input-snapshots/root-fast-round8.json": "8b594633e68881ec2ed7f5516b92b70dbb239aec6c10cf74dd10e733f699680a",
  "research/issues-source-reading-round26.json": "7a5404435262f2f7a188299ff309542af0f5d2c93361e8b5c776f9e1cc5a53fb",
  "research/issue-input-snapshots/root-fast-round8-log.json": "39bb1333f519684f19dce732f058a111a1bbb3a892226b6271c107dda2d2aac8",
  "research/issues-since-1980-round3.json": "ff29b0baeefaaf7a08af40f966a8486fe36c222b4b2520903197b7c84c6581c5",
  "research/issue-input-snapshots/quick-retry-global-round20.json": "879d61f85c3898242397f3776348f77980f7accf97b5cbb415bc5a8cad29e630",
  "research/issue-input-snapshots/quick-retry-global-round20-log.json": "6bbae955e0cef2064739aa6ffc0781249c37dead3780e9aac6803980cdad9998",
  "research/issue-input-snapshots/modern-recent-round31.json": "ff37e7ac296f7db8b4d9c3f267fd10b741cafc9e9d1eb7338ec7925a8a3d9705",
  "research/issue-input-snapshots/modern-recent-round31-log.json": "5133bdafc710a7b78da06a4d6a763657bb35f3170cdc5092552bc5456875434c",
  "research/issues-since-1980-round9.json": "1f82f41c467312401148650443c63281bed0e66d18ec5135167ad5abf023f259",
  "research/issue-input-snapshots/early-recent-round29.json": "ec4dec4cc4e50bd6d79875cb138d17e05605f9062dab3f137b0eb5311ad04888",
  "research/issue-input-snapshots/early-recent-round29-log.json": "29b111bc1bec29cdc6a55e00b884e11da48530344938a033ce1aaf65eec1f3af",
  "research/issue-input-snapshots/global-recent-round30.json": "55526a22de13d19c6c31c78ea5b72b5ad3a1adef29d26bcc18b85fdf3dd27931",
  "research/issues-source-reading-round41.json": "9045d3e429574d788343c2bafeee25795da3ae18394b2078264698a9df3ebb3b",
  "research/issue-input-snapshots/global-recent-round30-log.json": "7a608421a2692679190b1364a5d73a64b914e3b6536fe97da2d7972f6ee1ee09",
  "research/issues-source-reading-round10.json": "38510ef8649c93ee0747631e27842eff6b0c6f2e7d281974bfee55f3f8ffeb1d",
  "research/issue-input-snapshots/global-recent-round31.json": "d5dcfd1d2609d5dd1e69e8708a9eba1b107f87f22101192f2107d002ec25e13e",
  "research/issues-source-reading-round42.json": "40281a477853eb6ad615c93aea688d82aaede24b30fb95d9b4381cb37c0cba66",
  "research/issue-input-snapshots/global-recent-round31-log.json": "995350448b384166a07bae0699dbf434dfc6accd5b41d560c26a086a196ada2f",
  "research/issue-input-snapshots/early-recent-round9.json": "ed23497fb0c9ed3f04e8e9818fb4e17d1df62f4af82669833bf6675d11dfa261",
  "research/issue-input-snapshots/early-recent-round9-log.json": "7221de292e8852177f5f50b9e8f10a953189955ad1610d51cc9ac0495b018193",
  "research/issues-since-1980-round8.json": "aebc0d004d3c4f4cfa3afd24657be0d6569a8956cc9b5a416da6e6673a75d961",
  "research/issues-since-1980-round7.json": "1c1fd8375793074ff38a3a660aa8a2e0adb0f9d3092d7bdc93737a285ddae5e5",
  "research/issue-input-snapshots/modern-recent-round32.json": "5de29e4c3a43de8fd82ed9cbf04987f2d6c6a6510333cac88a05483fe5fd0047",
  "research/issue-input-snapshots/modern-recent-round32-log.json": "2feecce3eab1b8cd20acfffc284bbdb57ee6181b2f99c6e2791b5a125eebb51c",
  "research/issue-input-snapshots/early-recent-round30.json": "2f237d0eea6a6bb109c636390c1db971960efcac3dc7e3ea95b7a120361bd15c",
  "research/issue-input-snapshots/early-recent-round30-log.json": "092e951e66f03de82dfd41cb7b5b72f30fe6f521ffbc85729387cb0ee2ac044d",
  "research/issue-input-snapshots/known-year-early-round3.json": "b9de1514c464705a3a61f2b5e276eee805755b57de5c4377b3a4dab284a70236",
  "research/issues-source-reading-round72.json": "3d89d465ed62a1a7e36508b75ee3574910bcbda734511e5f9508ab4dd4deaf59",
  "research/issue-input-snapshots/known-year-early-round3-log.json": "d6840cf56628ad5030d7592425027de60d14064531fe39843cd7caea0e9d1bab",
  "research/issue-input-snapshots/modern-recent-round14.json": "9ee92daff8b34fa656126dee246ed5eadefd52576528aabdd08bc0996d985bb2",
  "research/issue-input-snapshots/modern-recent-round14-log.json": "2b16aa45a405b90ad0d26701898fd140f59509d5b1552e7a11c19b80af09a82c",
  "research/issue-input-snapshots/quick-retry-global-round6.json": "c1240ec988d646d5cfa38368617aa389722bf6674a48c86341018c41adbcafe3",
  "research/issues-source-reading-round80.json": "3ba262b0f1528ddb6e4ab0cd5b2d47bcc295646690a784ea696fbfbd3c288e82",
  "research/issue-input-snapshots/quick-retry-global-round6-log.json": "045a950e439f35ed8dc6c41b5769e7707dad297caf3df147d487a0f928c7ecd6",
  "research/issues-source-reading-round9.json": "fe6b87a1dfc84906a677930baadfc16cf51daaead2f299b0cca164bdafa1b9a6",
  "research/issue-input-snapshots/global-recent-round32.json": "a294931a9fe7f2341f88863496a0b91b96b33d88300045d3737e883a6b8f193c",
  "research/issues-source-reading-round43.json": "e96863885b11a057cb33f08dd8442d333b314e09e3a5c9971fc88e07dd01bdd9",
  "research/issue-input-snapshots/global-recent-round32-log.json": "065fccf3c1a2a4493fda54eefdb23b11aa5b1df05ec756c19856a214c676ad04",
  "research/issues-source-reading-round11.json": "896490728824032502741a55cd0afc1fe6cc003b77da861901a41e4df3df907f",
  "research/issue-input-snapshots/root-known-year-round6.json": "67c34a7e3c89a04e967ab0fb0258b772617abb027b39278a770e80b707036a78",
  "research/issue-input-snapshots/root-known-year-round6-log.json": "49a91bd908a9fe638ed867bb8e6352ed56c14fbb5cdde051c42494d457f45d9f",
  "research/issues-since-1980-round12.json": "96ed2e0ba4a84c4dda0beeb7786353357c556b7b8bda8954b18a2b9df567a211",
  "research/issue-input-snapshots/modern-recent-round33.json": "933a28da7c364cf9fa15b69cd7f9232dd5be68925785c3a6d273ffd3909dc9cd",
  "research/issue-input-snapshots/modern-recent-round33-log.json": "5cdfc803b51628a91f28d995daca7d752a1675c8d4ccbdcc2251e51689722716",
  "research/issue-input-snapshots/early-recent-round31.json": "4e4c202fb8e5fc00a2b51a0f318b47125d22576d7a5dc520deb3929ce066a4d4",
  "research/issue-input-snapshots/early-recent-round31-log.json": "0a6eb08f716b7592a4598f3ad35fd00bddf7a6565ffc261cd995ab59a62aba88",
  "research/issue-input-snapshots/root-fast-round13.json": "671c6a76fae33cba713208ebf6a52e3a55ddb1c63ef132e3552fe5b0c22f0104",
  "research/issue-input-snapshots/root-fast-round13-log.json": "1a0f614cdd6d6d902c5b4c286081ebf8d81c7b3ecde8870c5deb5c88d2fb76c1",
  "research/issue-input-snapshots/known-year-global-round3.json": "2655f3327569ab8286bda2b63b28cb25f18907e711361ea75e45af9318535054",
  "research/issue-input-snapshots/known-year-global-round3-log.json": "9f0adf259b385bd57ed4fff4f4f5a9345f3b0fa56eba89da14a6b019e0876224",
  "research/issue-input-snapshots/global-recent-round33.json": "e96139b6d9a920a5da4426b9da3ecf45b29e92bd24e432ecb153f662b6c6ef3a",
  "research/issues-source-reading-round44.json": "a7a8ca6f88badd67f19b0035041948ed4683800976f8898cb62eb1535c2282a8",
  "research/issue-input-snapshots/global-recent-round33-log.json": "480add4d9cfd58935fdea07645f49b31616a732bdcca6dbfff6fe451f0504edc",
  "research/issue-input-snapshots/quick-retry-modern-round7.json": "a5fbea852910ea49a4a837bfbfb2b3528e92904bd69b9d23f88202593da1d34e",
  "research/issue-input-snapshots/quick-retry-modern-round7-log.json": "0998fc0e8d92bd5749d2aa82ba41d9a53a9015be9354e74b558ce6dced7533fe",
  "research/issue-input-snapshots/global-recent-round34-corrected.json": "7d7e51941f49f58a39ca06da91578d8fc37d591169f01d7378ecc769801f3392",
  "research/issues-source-reading-round45.json": "c026c6661d356098d355f54aa3959fb9ddf00f244cf91ce5291be41b91ecf429",
  "research/issue-input-snapshots/modern-recent-round34.json": "194db55ce01b3e710f8883e91a1372e78a4c0d30d14548973e61c55112b16533",
  "research/issue-input-snapshots/modern-recent-round34-log.json": "0f62b4121af78aac6b1607b3ee644755aecbdae3ae0f8aad7c5ffb40f3655713",
  "research/issue-input-snapshots/early-recent-round32.json": "ff69c0e1dec5781d171710d67239ec2305d187800080930d5fabb7c91ecf64f4",
  "research/issue-input-snapshots/early-recent-round32-log.json": "86034e1bfeed7ea9e74dfa477a8727e1d1991b7539837ead4095882fc633e1e2",
  "research/issue-input-snapshots/global-recent-round35.json": "9dff90b85fa897b331e1795eafac1e6d8505b41b6a9c6b1f0293b251f493f757",
  "research/issues-source-reading-round46.json": "3b738dcd9535fba1f86bb7ac89ac345a6a1dfa996b929a72bf028c10aa146175",
  "research/issue-input-snapshots/global-recent-round35-log.json": "06b2aa8ba14e61a72f0f534a7358a527312182acdeb28bec6043682809ee2f50",
  "research/issue-input-snapshots/source-round16.json": "5ac9ba2ed1ee87b45f343d9dd1b41d0ad07ab5cb7659082e4561a12afb9b02c9",
  "research/issues-source-reading-round16.json": "0a375208cc1b8c238375a14f2f03d30311c87a2b2290a5154305a920289d594d",
  "research/issue-input-snapshots/quick-retry-global-round7.json": "9dcdf3c8772661e3dbba609e9d2e02ec0193459e2cca1bf551671a5b992b44cf",
  "research/issue-input-snapshots/quick-retry-global-round7-log.json": "646c4add6ada26c646deb5c4ea369a95a92ab2dc1abee1b977f10db6de194321",
  "research/issue-input-snapshots/quick-retry-root-assist-early-round8.json": "2adedd1dee2a1fb187d6ffe75e8edfd35fba0686a743ce58f245315ed298498c",
  "research/issue-input-snapshots/quick-retry-root-assist-early-round8-log.json": "a9ac39b2822f758b9a7f82c332a49a6e2da8430c0eadf2f081cb07261b68d398",
  "research/issue-input-snapshots/modern-recent-round35.json": "6e46665b4d50010e8b76b47d953ffd2cc6647cd212f112517fe2cad38c519a2d",
  "research/issue-input-snapshots/modern-recent-round35-log.json": "7de6a20e5cc5677f443ff72e981f8f9e9358a5ec07ac92710dd79148de4ef044",
  "research/issue-input-snapshots/known-year-global-round4.json": "77363cfef30395b97d2755e25bba39d5d8e0d1ec1a24efd697cc6e74d5d0bdfb",
  "research/issues-source-reading-round74.json": "7cda3635b7d34d1822a2b361f0a9260fb291676ed7330484b283ba4d1604b8d2",
  "research/issue-input-snapshots/known-year-global-round4-log.json": "b8b5cae3fdab1a8c83676e5b1ba7231665fade0e6e5c8f7535db8cff81a48a60",
  "research/issue-input-snapshots/quick-retry-root-assist-modern-round1.json": "0d77301fc8e42de0b3056092261db76443cc075033ebfc515bd3435b34535101",
  "research/issues-source-reading-round85.json": "83d3df1c2de828764f9d773d69aec202fee975665a654a5da7d0a60937c9e032",
  "research/issue-input-snapshots/quick-retry-root-assist-modern-round1-log.json": "7af3af709a03ae68a50a6e7df5e0273aec22b794f957e16f8ea69bbdc9b16fa5",
  "research/issue-input-snapshots/quick-retry-modern-round21.json": "2e3722530f4fc23da0517d872188cd7cd627353555d818b707132f83bf3b3dbf",
  "research/issue-input-snapshots/quick-retry-modern-round21-log.json": "ed45d53920c05911d16d21a3954628ccd8c3dc2ed07860b912cbda1b7dc74483",
  "research/issue-input-snapshots/quick-retry2-root-assisted-early-round1.json": "a33dc4cdfcf947941099b24f09fec8d4060ab1db7f7a45f2c58c9b0385414e3d",
  "research/issues-source-reading-round89.json": "3b7c16345c4e14224c94e5867549e882dfc374a8f7538d5207305179c85e9ca6",
  "research/issue-input-snapshots/quick-retry2-root-assisted-early-round1-log.json": "de67d0bb613e8203aa459bf2477a841a27d0f40b453bd8e7f789585575cc2a67",
  "research/issue-input-snapshots/quick-retry2-lane-0.json": "63042ce16ccdf6f42ce33b78c52284ce82e0efb2cb84e1ac6b7b2faf4b65c1f7",
  "research/issues-source-reading-round12.json": "49408ceeff163f4377abc55e9c1d400674f2f7a280379737cb36e135ec8c7ae6",
  "research/issue-input-snapshots/early-recent-round33.json": "19abd26eb0c277ab4b1b41b3ab819e762f074929cb43fa6a648136657a3f40ac",
  "research/issue-input-snapshots/early-recent-round33-log.json": "47012f612a3b9a8cdd863dd1241b8508e7fa7c4901840c33f492f313198dfcb2",
  "research/issue-input-snapshots/modern-recent-round36.json": "c5ef9587cd9b14e8889a432032b21058ea7227b6a21c4b42d0ca4aecda517483",
  "research/issue-input-snapshots/modern-recent-round36-log.json": "00b0b5de919c55f7a9f0f118c1f6f6bc166b311b0ef5e91060cf36026561d984",
  "research/issue-input-snapshots/global-recent-round36.json": "db6731c1f77d6adc8240eeb95f69b0d829c6e8d7c49db4ccdba331433e92ba7e",
  "research/issues-source-reading-round47.json": "6c23109ecb8941a1c931931e5889b23b77ee046a76073ee29cfb44dcb6029f20",
  "research/issue-input-snapshots/global-recent-round36-log.json": "d918148db35e3a6069acbf2e88bcc4f9f4f50cface98e42db179c846335eb642",
  "research/issue-input-snapshots/early-recent-round13.json": "315959adfe42a1b85c8219ae55e7f586fb08c7d461e3b68be2f044c841e42c2a",
  "research/issue-input-snapshots/early-recent-round13-log.json": "600d0ff8850e556d4ed5c0b9a219211eca7a111f2e5a87bdfac4cf088d75fcb6",
  "research/issue-input-snapshots/modern-recent-round11.json": "ded4b1e71c59350f397ccf81b127c597a75e76341ac72c4f43b13fdbe2fa7432",
  "research/issue-input-snapshots/modern-recent-round11-log.json": "0eddfaa3113f427b8453fe90f0933739473e82027976e8cdd07245e3212b5860",
  "research/issue-input-snapshots/early-recent-round10.json": "5dfd820cbbf532eafd8f548d57d3fed46b61bc26828fcf24402f9493e69ffcbd",
  "research/issue-input-snapshots/early-recent-round10-log.json": "f55812d72cd1a43e32d929ec118b5b21af83f215264f3921151d6596d88f865f",
  "research/issue-input-snapshots/root-fast-round9.json": "f1fab6ef759ac15843712bb507100fc9217bca2ed1101886dc7811ed7224c2a4",
  "research/issue-input-snapshots/root-fast-round9-log.json": "16acd18ad5b489a14e1f16e696222236fd8edb71ce450c9d38eb55c90182fd1e",
  "research/issue-input-snapshots/global-recent-round37.json": "3fa7474506380a2d7c148aa116868b8f1b5c34fbc9d71e086fa57079ce36e26b",
  "research/issue-input-snapshots/global-recent-round37-log.json": "0a18a884eae0263d1313d721e9b29ea60447ca86829c162661e6dd02e5b9f4ba"
});
const FIXED_SEMANTIC_ADAPTER_RECORDS=Object.freeze({
  "Q7679252": {
    "id": "Q7679252",
    "identity": {
      "title": "Tales from Jabba's Palace",
      "author": "凱文·詹姆士·安德森"
    },
    "member_title": "A Boy and His Monster: The Rancor Keeper’s Tale",
    "source_spatial_input_file": "early-published-spatial-selection7-round5.json",
    "source_spatial_input_sha256": "88d6610201cd396975169e92b66a74fe68088e9fff2dcc01a10554433c2c66a7",
    "source_spatial_input_record_sha256": "b704d038c93065ba52ae758557c0a657ae649de4902bacbedff8671c30c96166",
    "source_analysis_archive": "research/issue-input-snapshots/global-recent-round35.json",
    "source_analysis_sha256": "9dff90b85fa897b331e1795eafac1e6d8505b41b6a9c6b1f0293b251f493f757",
    "source_analysis_record_sha256": "edb06432d5e88014538d9785e2522212847de5fdc7c78440debd2084a4665222",
    "source_log_archive": "research/issue-input-snapshots/global-recent-round35-log.json",
    "source_log_sha256": "06b2aa8ba14e61a72f0f534a7358a527312182acdeb28bec6043682809ee2f50",
    "source_log_record_sha256": "48c62c68a490b87098649b97e4f9a924986044da288cf28753e78240dd7cb30d",
    "changed_record_keys": [
      "field_notes",
      "analysis_basis",
      "spatial_basis_mode",
      "sources",
      "source_evidence"
    ],
    "original_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位Tales from Jabba’s Palace所收A Boy and His Monster的Jabba宫殿、rancor囚养与Luke到来阶段，准确该宫殿位于Tatooine；Malakili带它去遥远行星的计划未完成，不扩成整集星际舞台。"
    },
    "original_record": {
      "id": "Q7679252",
      "identity": {
        "title": "Tales from Jabba's Palace",
        "author": "凱文·詹姆士·安德森"
      },
      "fields": {
        "spatial_primary": "planetary",
        "spatial_secondary": [],
        "spatial_rationale": "仅定位Tales from Jabba’s Palace所收A Boy and His Monster的Jabba宫殿、rancor囚养与Luke到来阶段，准确该宫殿位于Tatooine；Malakili带它去遥远行星的计划未完成，不扩成整集星际舞台。"
      },
      "field_notes": {
        "spatial_primary": "复用原已保存有限材料中的明确场所；没有本轮新查询、打开、全文阅读或独立核验，部分片段/选篇范围不扩为整作。",
        "spatial_secondary": "复用原已保存有限材料中的明确场所；没有本轮新查询、打开、全文阅读或独立核验，部分片段/选篇范围不扩为整作。",
        "spatial_rationale": "复用原已保存有限材料中的明确场所；没有本轮新查询、打开、全文阅读或独立核验，部分片段/选篇范围不扩为整作。"
      },
      "verification_status": "knowledge_added_unverified",
      "analysis_basis": "reuse_original_scoped_material_unverified",
      "spatial_basis_mode": "saved_explicit_setting",
      "integration_relation": "published_core",
      "sources": [
        "https://www.penguinrandomhouse.com/books/3549/tales-from-jabbas-palace-star-wars-legends-by-kevin-anderson-editor/",
        "https://starwars.fandom.com/wiki/A_Boy_and_His_Monster%3A_The_Rancor_Keeper%27s_Tale"
      ],
      "source_evidence": [
        {
          "url": "https://www.penguinrandomhouse.com/books/3549/tales-from-jabbas-palace-star-wars-legends-by-kevin-anderson-editor/",
          "type": "saved_original_limited_setting",
          "support_scope": "仅定位Tales from Jabba’s Palace所收A Boy and His Monster的Jabba宫殿、rancor囚养与Luke到来阶段，准确该宫殿位于Tatooine；Malakili带它去遥远行星的计划未完成，不扩成整集星际舞台。",
          "original_support_scope": "实际读官方出版页检索返回集合题名与Anderson editor、Jabba宫廷人物范围；该短返回不支持选篇详细情节。；实际读该集合内选篇的完整社区梗概返回，Malakili/rancor相处、Lady Valarian帮助逃离计划及Luke杀怪打断；二手梗概，未读短篇原文。",
          "original_source_evidence": [],
          "new_read_performed": false,
          "supports_spatial_independently": true,
          "original_link_read_status": "preserved_original_scope_only"
        },
        {
          "url": "https://starwars.fandom.com/wiki/A_Boy_and_His_Monster%3A_The_Rancor_Keeper%27s_Tale",
          "type": "saved_original_limited_setting",
          "support_scope": "仅定位Tales from Jabba’s Palace所收A Boy and His Monster的Jabba宫殿、rancor囚养与Luke到来阶段，准确该宫殿位于Tatooine；Malakili带它去遥远行星的计划未完成，不扩成整集星际舞台。",
          "original_support_scope": "实际读官方出版页检索返回集合题名与Anderson editor、Jabba宫廷人物范围；该短返回不支持选篇详细情节。；实际读该集合内选篇的完整社区梗概返回，Malakili/rancor相处、Lady Valarian帮助逃离计划及Luke杀怪打断；二手梗概，未读短篇原文。",
          "original_source_evidence": [],
          "new_read_performed": false,
          "supports_spatial_independently": true,
          "original_link_read_status": "preserved_original_scope_only"
        }
      ],
      "original_lookup_urls": [
        "https://www.penguinrandomhouse.com/books/3549/tales-from-jabbas-palace-star-wars-legends-by-kevin-anderson-editor/",
        "https://starwars.fandom.com/wiki/A_Boy_and_His_Monster%3A_The_Rancor_Keeper%27s_Tale"
      ],
      "original_source_evidence": [],
      "source_scope": "实际读官方出版页检索返回集合题名与Anderson editor、Jabba宫廷人物范围；该短返回不支持选篇详细情节。；实际读该集合内选篇的完整社区梗概返回，Malakili/rancor相处、Lady Valarian帮助逃离计划及Luke杀怪打断；二手梗概，未读短篇原文。",
      "frozen_knowledge_reading_scope": null,
      "frozen_knowledge_issue_note": "出版/作者简介或明确评论的首轮分析，不是独立身份、全文或科学核验。",
      "source_analysis_file": "global-recent-round35.json",
      "source_analysis_archive": "research/issue-input-snapshots/global-recent-round35.json",
      "source_analysis_sha256": "9dff90b85fa897b331e1795eafac1e6d8505b41b6a9c6b1f0293b251f493f757",
      "source_analysis_record_sha256": "edb06432d5e88014538d9785e2522212847de5fdc7c78440debd2084a4665222",
      "source_core_assertion_file": "research/issues-source-reading-round46.json",
      "source_core_assertion_file_sha256": "3b738dcd9535fba1f86bb7ac89ac345a6a1dfa996b929a72bf028c10aa146175",
      "source_core_assertion_record_sha256": "90390108127018579e4ea927e2fd13636360fbd550e8b49228a927884c9b4ba1",
      "source_log_file": "global-recent-round35-log.json",
      "source_log_archive": "research/issue-input-snapshots/global-recent-round35-log.json",
      "source_log_sha256": "06b2aa8ba14e61a72f0f534a7358a527312182acdeb28bec6043682809ee2f50",
      "source_log_record_sha256": "48c62c68a490b87098649b97e4f9a924986044da288cf28753e78240dd7cb30d",
      "original_analysis_record": {
        "id": "Q7679252",
        "identity": {
          "title": "Tales from Jabba's Palace",
          "author": "凱文·詹姆士·安德森"
        },
        "fields": {
          "topics": [
            "生命与人类定义",
            "权力与制度",
            "生存与风险"
          ],
          "issue": "这部多人故事集的选例“A Boy and His Monster”让Malakili照料被Jabba囚养的rancor，在建立关系后计划带它去遥远行星脱离囚禁。逃离日期却撞上Luke到来并杀死怪兽，使一个角色的英雄行动成为另一个角色的救援失败；把生命只理解为威胁或财产，会遮蔽它同照护者已有的关系。",
          "issue_facets": [
            {
              "label": "囚养职责与解放计划",
              "question": "受雇照顾权势者的怪兽，照护者怎样处理职责与让它自由的愿望？",
              "basis": "选篇具体梗概写Jabba交给Malakili照养rancor，Malakili却因相处形成rapport而安排同它离开。"
            },
            {
              "label": "英雄胜利与被救生命",
              "question": "从另一个人物的视角看，击败怪兽的行动会留下哪些不可恢复的损失？",
              "basis": "同一选篇梗概明确逃离计划定在Luke抵达当天，Luke杀死rancor使Malakili计划落空。"
            }
          ]
        },
        "field_notes": {
          "topics": "本实体实际读到的明确简介具体内容，解释待核。",
          "issue": "出版/作者简介或明确评论的首轮分析，不是独立身份、全文或科学核验。",
          "issue_facets": "每项具体材料依据与提问分开，不借同名/整系列扩情节。",
          "entity_identity": "Tales from Jabba’s Palace为Kevin J. Anderson编辑的多作者选集，不是其单著长篇。仅以他所写“A Boy and His Monster: The Rancor Keeper’s Tale”具体事件选例，不代表全书各篇；原库署名保留。",
          "source_scope": "实际读官方出版页检索返回集合题名与Anderson editor、Jabba宫廷人物范围；该短返回不支持选篇详细情节。；实际读该集合内选篇的完整社区梗概返回，Malakili/rancor相处、Lady Valarian帮助逃离计划及Luke杀怪打断；二手梗概，未读短篇原文。"
        },
        "verification_status": "knowledge_added_unverified",
        "sources": [
          "https://www.penguinrandomhouse.com/books/3549/tales-from-jabbas-palace-star-wars-legends-by-kevin-anderson-editor/",
          "https://starwars.fandom.com/wiki/A_Boy_and_His_Monster%3A_The_Rancor_Keeper%27s_Tale"
        ]
      },
      "original_analysis_metadata": {
        "status": "frozen_checkpoint",
        "date": "2026-10-05",
        "lane": 1,
        "queue": "fast-first-lane-1.json",
        "queue_sha256": "6b98a14c536f5668385f5eea35f448c2548e6d9cdd2f4a7574e83234747b6233",
        "scope": "保留原lane所有权，优先已有且题名作者对应的OL简介，再按来源年近往远。",
        "method": "快速首遍：准确熟悉作品用existing knowledge明确待核；其他每身份一轮精准搜索/简单来源读取，困难延后；只填作品特定短核心和两facet，原字段保留。",
        "verification": "knowledge_added_unverified；社区/图书馆作品简介只支持以下明确内容，非独立核验或全书阅读。",
        "source_snapshot": "research/canonical-universe.json.gz",
        "source_snapshot_sha256": "dd13dcd146a4f0dd20430a1f6f0b2f5156ee46d7fe66ff9fcdfb223c8a1dce08",
        "starts_at_fast_index": 1192,
        "record_count": 33,
        "facet_count": 66,
        "attempted_count": 38,
        "deferred_count": 5,
        "skipped_existing_count": 0,
        "ends_at_fast_index": 1229,
        "next_fast_index": 1230,
        "freeze_date": "2026-10-05",
        "session_inherited_baseline_sha256": "73b274aee5aee431d8d0f12edca80dee8bdff3a581e71f0a39a5587eee733a2e",
        "snapshot_point": "冻结自查时读取的完整统一快照；不声称与批次开始同一版本。",
        "audit_snapshot_sha256": "dd13dcd146a4f0dd20430a1f6f0b2f5156ee46d7fe66ff9fcdfb223c8a1dce08",
        "self_check": "原身份与当前缺口、唯一lane索引、合法topics、三议题字段、两项具体facet、实际URL范围与知识声明、独立空间仅原未知字段检查通过；不是独立书目、全文或科学核验。",
        "source_scope_counts": {
          "existing_work_specific_knowledge_records": 4,
          "records_with_actual_material": 32,
          "records_with_actual_web_material": 26,
          "records_with_local_official_dump_synopsis": 6,
          "records_without_current_material": 1,
          "actual_material_records_without_existing_knowledge_basis": 29,
          "existing_knowledge_records_with_actual_sources": 3,
          "complete_original_text_reads": 0,
          "original_or_authorized_story_selected_passages_only": 0,
          "brief_member_opening_quoted_in_secondary_source_records": 1,
          "publisher_quote_within_synopsis_records": 1,
          "author_conception_interview_records": 1,
          "low_strength_reader_recollection_records": 1,
          "anthology_selected_member_records": 3
        }
      },
      "original_reading_log": {
        "id": "Q7679252",
        "identity": {
          "title": "Tales from Jabba's Palace",
          "author": "凱文·詹姆士·安德森"
        },
        "fast_index": 1196,
        "lane_index": 1151,
        "source_sort_year": 1995,
        "priority_rank": 4853,
        "status": "analysis_added_unverified",
        "publication_status": "source_candidate_year_not_independently_verified",
        "queries": [
          "\"Tales from Jabba's Palace\" stories summary"
        ],
        "local_material_lookup": null,
        "sources": [
          {
            "url": "https://www.penguinrandomhouse.com/books/3549/tales-from-jabbas-palace-star-wars-legends-by-kevin-anderson-editor/",
            "material_kind": "publisher_anthology_identity_and_scope_search_cache",
            "support_scope": "实际读官方出版页检索返回集合题名与Anderson editor、Jabba宫廷人物范围；该短返回不支持选篇详细情节。",
            "reading_status": "actually_read_support_scope_only"
          },
          {
            "url": "https://starwars.fandom.com/wiki/A_Boy_and_His_Monster%3A_The_Rancor_Keeper%27s_Tale",
            "material_kind": "community_specific_member_story_summary_search_cache",
            "support_scope": "实际读该集合内选篇的完整社区梗概返回，Malakili/rancor相处、Lady Valarian帮助逃离计划及Luke杀怪打断；二手梗概，未读短篇原文。",
            "reading_status": "actually_read_support_scope_only"
          }
        ],
        "no_material_reason": null,
        "failure_count": 0,
        "verification_status": "knowledge_added_unverified"
      },
      "original_log_metadata": {
        "status": "frozen_checkpoint",
        "date": "2026-10-05",
        "lane": 1,
        "queue": "fast-first-lane-1.json",
        "queue_sha256": "6b98a14c536f5668385f5eea35f448c2548e6d9cdd2f4a7574e83234747b6233",
        "scope": "保留原lane所有权，优先已有且题名作者对应的OL简介，再按来源年近往远。",
        "method": "快速首遍：准确熟悉作品用existing knowledge明确待核；其他每身份一轮精准搜索/简单来源读取，困难延后；只填作品特定短核心和两facet，原字段保留。",
        "verification": "knowledge_added_unverified；社区/图书馆作品简介只支持以下明确内容，非独立核验或全书阅读。",
        "source_snapshot": "research/canonical-universe.json.gz",
        "source_snapshot_sha256": "dd13dcd146a4f0dd20430a1f6f0b2f5156ee46d7fe66ff9fcdfb223c8a1dce08",
        "starts_at_fast_index": 1192,
        "record_count": 33,
        "facet_count": 66,
        "attempted_count": 38,
        "deferred_count": 5,
        "skipped_existing_count": 0,
        "ends_at_fast_index": 1229,
        "next_fast_index": 1230,
        "freeze_date": "2026-10-05",
        "session_inherited_baseline_sha256": "73b274aee5aee431d8d0f12edca80dee8bdff3a581e71f0a39a5587eee733a2e",
        "snapshot_point": "冻结自查时读取的完整统一快照；不声称与批次开始同一版本。",
        "audit_snapshot_sha256": "dd13dcd146a4f0dd20430a1f6f0b2f5156ee46d7fe66ff9fcdfb223c8a1dce08",
        "self_check": "原身份与当前缺口、唯一lane索引、合法topics、三议题字段、两项具体facet、实际URL范围与知识声明、独立空间仅原未知字段检查通过；不是独立书目、全文或科学核验。"
      },
      "original_counter_fields": {
        "failure_count": 0
      },
      "original_counter_presence": {
        "actual_search_count": false,
        "actual_query_count": false,
        "actual_open_count": false,
        "actual_open_attempt_count": false,
        "actual_content_source_read": false,
        "actual_search_performed": false,
        "original_full_text_read": false,
        "original_full_text_read_count": false,
        "original_fulltext_read_count": false
      },
      "original_cache_declarations": {},
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_archive": null,
      "original_ownership_index": null,
      "original_ownership_record": null,
      "original_prior_source_log_present": false,
      "prior_source_log": null,
      "preserved_source_search_log": {
        "input_file": "research/issue-source-searches.json",
        "log_date": "2026-10-04",
        "id": "Q7679252",
        "identity": {
          "title": "Tales from Jabba's Palace",
          "author": "凱文·詹姆士·安德森"
        },
        "attempt_state": "content_material_read",
        "queries": [
          "\"Tales from Jabba's Palace\" stories summary"
        ],
        "query_note": "仅记录已保存的实际查询；打开、点击、查找另见原始日志，不补造查询词。",
        "materials_checked": [
          {
            "url": "https://www.penguinrandomhouse.com/books/3549/tales-from-jabbas-palace-star-wars-legends-by-kevin-anderson-editor/",
            "material_kind": "publisher_anthology_identity_and_scope_search_cache",
            "support_scope": "实际读官方出版页检索返回集合题名与Anderson editor、Jabba宫廷人物范围；该短返回不支持选篇详细情节。",
            "reading_status": "actually_read_support_scope_only",
            "material_type": "publisher_anthology_identity_and_scope_search_cache",
            "result": "actual_source_scope_read",
            "reading_scope": "实际读官方出版页检索返回集合题名与Anderson editor、Jabba宫廷人物范围；该短返回不支持选篇详细情节。",
            "read_date": "2026-10-05"
          },
          {
            "url": "https://starwars.fandom.com/wiki/A_Boy_and_His_Monster%3A_The_Rancor_Keeper%27s_Tale",
            "material_kind": "community_specific_member_story_summary_search_cache",
            "support_scope": "实际读该集合内选篇的完整社区梗概返回，Malakili/rancor相处、Lady Valarian帮助逃离计划及Luke杀怪打断；二手梗概，未读短篇原文。",
            "reading_status": "actually_read_support_scope_only",
            "material_type": "community_specific_member_story_summary_search_cache",
            "result": "actual_source_scope_read",
            "reading_scope": "实际读该集合内选篇的完整社区梗概返回，Malakili/rancor相处、Lady Valarian帮助逃离计划及Luke杀怪打断；二手梗概，未读短篇原文。",
            "read_date": "2026-10-05"
          }
        ],
        "reading_scope": "实际读官方出版页检索返回集合题名与Anderson editor、Jabba宫廷人物范围；该短返回不支持选篇详细情节。；实际读该集合内选篇的完整社区梗概返回，Malakili/rancor相处、Lady Valarian帮助逃离计划及Luke杀怪打断；二手梗概，未读短篇原文。",
        "reason_unconfirmed": "材料只支持明示范围；原作全文、版本与文学解释尚未逐项独立核验。",
        "next_step": "按确切作品、单册或系列粒度继续查正文和更具体材料，保留日期与身份疑点。",
        "issue_result": "added_to_frozen_input_unverified",
        "attempt_input": "global-recent-round35-log.json",
        "raw_reading_log": {
          "id": "Q7679252",
          "identity": {
            "title": "Tales from Jabba's Palace",
            "author": "凱文·詹姆士·安德森"
          },
          "fast_index": 1196,
          "lane_index": 1151,
          "source_sort_year": 1995,
          "priority_rank": 4853,
          "status": "analysis_added_unverified",
          "publication_status": "source_candidate_year_not_independently_verified",
          "queries": [
            "\"Tales from Jabba's Palace\" stories summary"
          ],
          "local_material_lookup": null,
          "sources": [
            {
              "url": "https://www.penguinrandomhouse.com/books/3549/tales-from-jabbas-palace-star-wars-legends-by-kevin-anderson-editor/",
              "material_kind": "publisher_anthology_identity_and_scope_search_cache",
              "support_scope": "实际读官方出版页检索返回集合题名与Anderson editor、Jabba宫廷人物范围；该短返回不支持选篇详细情节。",
              "reading_status": "actually_read_support_scope_only"
            },
            {
              "url": "https://starwars.fandom.com/wiki/A_Boy_and_His_Monster%3A_The_Rancor_Keeper%27s_Tale",
              "material_kind": "community_specific_member_story_summary_search_cache",
              "support_scope": "实际读该集合内选篇的完整社区梗概返回，Malakili/rancor相处、Lady Valarian帮助逃离计划及Luke杀怪打断；二手梗概，未读短篇原文。",
              "reading_status": "actually_read_support_scope_only"
            }
          ],
          "no_material_reason": null,
          "failure_count": 0,
          "verification_status": "knowledge_added_unverified"
        },
        "publication_status": "source_candidate_year_not_independently_verified",
        "failure_count": 0,
        "local_material_lookup": null
      },
      "preserved_source_search_log_sha256": "514c3dfc46c32c37ec07394e5475e93f23bb680f07f68c4a1f844e5d68b87efb",
      "frozen_canonical_identity_scope": {
        "id": "Q7679252",
        "title_zh": "Tales from Jabba's Palace",
        "author": "凱文·詹姆士·安德森",
        "form": "合集／组篇（来源描述候选）",
        "forms": [
          "文学作品",
          "合集／组篇（来源描述候选）"
        ],
        "source_entity_kind": "work_or_unspecified",
        "source_types": [
          {
            "id": "Q7725634",
            "label": "文学作品"
          }
        ]
      },
      "source_canonical_record_sha256": "7772bbcecc6a4b9dae25d391a2ad51509e62a7b4a3425d34bbe3bc3465a3dfd0",
      "source_canonical_snapshot_sha256": "7b4ac5886d4ff44d1f86d343c7213b8dc7027eacea4c85fddebcb7a5e64d8b8f",
      "spatial_selection_file": "work/evidence/early-published-spatial-expansion-selection7-checkpoint5.json",
      "spatial_selection_sha256": "17ba3a413420079dc0ef99dbf0bc75e133bec667f324f0859a75e2952c1bb734",
      "spatial_selection_index": 248,
      "new_actual_search_count": 0,
      "new_actual_open_count": 0,
      "new_core_count": 0,
      "new_full_original_read_count": 0,
      "independently_verified": false,
      "identity_caveat": null
    },
    "adapted_record": {
      "id": "Q7679252",
      "identity": {
        "title": "Tales from Jabba's Palace",
        "author": "凱文·詹姆士·安德森"
      },
      "fields": {
        "spatial_primary": "planetary",
        "spatial_secondary": [],
        "spatial_rationale": "仅定位Tales from Jabba’s Palace所收A Boy and His Monster的Jabba宫殿、rancor囚养与Luke到来阶段，准确该宫殿位于Tatooine；Malakili带它去遥远行星的计划未完成，不扩成整集星际舞台。"
      },
      "field_notes": {
        "spatial_primary": "准确所选A Boy and His Monster成员的既有知识空间补充，待独立核对。Tatooine定位不冒称来自原PRH出版页或本轮独立地理阅读；原PRH仅集合身份，社区梗概仅已记录成员情节。原URL、原A/L阅读范围和全部旧历史保留，0新查询/打开/全文/核验。",
        "spatial_secondary": "准确所选A Boy and His Monster成员的既有知识空间补充，待独立核对。Tatooine定位不冒称来自原PRH出版页或本轮独立地理阅读；原PRH仅集合身份，社区梗概仅已记录成员情节。原URL、原A/L阅读范围和全部旧历史保留，0新查询/打开/全文/核验。",
        "spatial_rationale": "准确所选A Boy and His Monster成员的既有知识空间补充，待独立核对。Tatooine定位不冒称来自原PRH出版页或本轮独立地理阅读；原PRH仅集合身份，社区梗概仅已记录成员情节。原URL、原A/L阅读范围和全部旧历史保留，0新查询/打开/全文/核验。"
      },
      "verification_status": "knowledge_added_unverified",
      "analysis_basis": "existing_knowledge_unverified",
      "spatial_basis_mode": "exact_existing_knowledge",
      "integration_relation": "published_core",
      "sources": [],
      "source_evidence": [
        {
          "url": "https://www.penguinrandomhouse.com/books/3549/tales-from-jabbas-palace-star-wars-legends-by-kevin-anderson-editor/",
          "type": "existing_knowledge_with_preserved_old_lookup",
          "support_scope": "仅定位Tales from Jabba’s Palace所收A Boy and His Monster的Jabba宫殿、rancor囚养与Luke到来阶段，准确该宫殿位于Tatooine；Malakili带它去遥远行星的计划未完成，不扩成整集星际舞台。",
          "original_support_scope": "实际读官方出版页检索返回集合题名与Anderson editor、Jabba宫廷人物范围；该短返回不支持选篇详细情节。；实际读该集合内选篇的完整社区梗概返回，Malakili/rancor相处、Lady Valarian帮助逃离计划及Luke杀怪打断；二手梗概，未读短篇原文。",
          "original_source_evidence": [],
          "new_read_performed": false,
          "supports_spatial_independently": false,
          "original_link_read_status": "identity_or_collection_scope_only_lookup",
          "original_url_specific_support_scope": "实际读官方出版页检索返回集合题名与Anderson editor、Jabba宫廷人物范围；该短返回不支持选篇详细情节。",
          "original_url_specific_material_kind": "publisher_anthology_identity_and_scope_search_cache"
        },
        {
          "url": "https://starwars.fandom.com/wiki/A_Boy_and_His_Monster%3A_The_Rancor_Keeper%27s_Tale",
          "type": "existing_knowledge_with_preserved_old_lookup",
          "support_scope": "仅定位Tales from Jabba’s Palace所收A Boy and His Monster的Jabba宫殿、rancor囚养与Luke到来阶段，准确该宫殿位于Tatooine；Malakili带它去遥远行星的计划未完成，不扩成整集星际舞台。",
          "original_support_scope": "实际读官方出版页检索返回集合题名与Anderson editor、Jabba宫廷人物范围；该短返回不支持选篇详细情节。；实际读该集合内选篇的完整社区梗概返回，Malakili/rancor相处、Lady Valarian帮助逃离计划及Luke杀怪打断；二手梗概，未读短篇原文。",
          "original_source_evidence": [],
          "new_read_performed": false,
          "supports_spatial_independently": false,
          "original_link_read_status": "original_member_plot_summary_not_independent_spatial_read",
          "original_url_specific_support_scope": "实际读该集合内选篇的完整社区梗概返回，Malakili/rancor相处、Lady Valarian帮助逃离计划及Luke杀怪打断；二手梗概，未读短篇原文。",
          "original_url_specific_material_kind": "community_specific_member_story_summary_search_cache"
        }
      ],
      "original_lookup_urls": [
        "https://www.penguinrandomhouse.com/books/3549/tales-from-jabbas-palace-star-wars-legends-by-kevin-anderson-editor/",
        "https://starwars.fandom.com/wiki/A_Boy_and_His_Monster%3A_The_Rancor_Keeper%27s_Tale"
      ],
      "original_source_evidence": [],
      "source_scope": "实际读官方出版页检索返回集合题名与Anderson editor、Jabba宫廷人物范围；该短返回不支持选篇详细情节。；实际读该集合内选篇的完整社区梗概返回，Malakili/rancor相处、Lady Valarian帮助逃离计划及Luke杀怪打断；二手梗概，未读短篇原文。",
      "frozen_knowledge_reading_scope": null,
      "frozen_knowledge_issue_note": "出版/作者简介或明确评论的首轮分析，不是独立身份、全文或科学核验。",
      "source_analysis_file": "global-recent-round35.json",
      "source_analysis_archive": "research/issue-input-snapshots/global-recent-round35.json",
      "source_analysis_sha256": "9dff90b85fa897b331e1795eafac1e6d8505b41b6a9c6b1f0293b251f493f757",
      "source_analysis_record_sha256": "edb06432d5e88014538d9785e2522212847de5fdc7c78440debd2084a4665222",
      "source_core_assertion_file": "research/issues-source-reading-round46.json",
      "source_core_assertion_file_sha256": "3b738dcd9535fba1f86bb7ac89ac345a6a1dfa996b929a72bf028c10aa146175",
      "source_core_assertion_record_sha256": "90390108127018579e4ea927e2fd13636360fbd550e8b49228a927884c9b4ba1",
      "source_log_file": "global-recent-round35-log.json",
      "source_log_archive": "research/issue-input-snapshots/global-recent-round35-log.json",
      "source_log_sha256": "06b2aa8ba14e61a72f0f534a7358a527312182acdeb28bec6043682809ee2f50",
      "source_log_record_sha256": "48c62c68a490b87098649b97e4f9a924986044da288cf28753e78240dd7cb30d",
      "original_analysis_record": {
        "id": "Q7679252",
        "identity": {
          "title": "Tales from Jabba's Palace",
          "author": "凱文·詹姆士·安德森"
        },
        "fields": {
          "topics": [
            "生命与人类定义",
            "权力与制度",
            "生存与风险"
          ],
          "issue": "这部多人故事集的选例“A Boy and His Monster”让Malakili照料被Jabba囚养的rancor，在建立关系后计划带它去遥远行星脱离囚禁。逃离日期却撞上Luke到来并杀死怪兽，使一个角色的英雄行动成为另一个角色的救援失败；把生命只理解为威胁或财产，会遮蔽它同照护者已有的关系。",
          "issue_facets": [
            {
              "label": "囚养职责与解放计划",
              "question": "受雇照顾权势者的怪兽，照护者怎样处理职责与让它自由的愿望？",
              "basis": "选篇具体梗概写Jabba交给Malakili照养rancor，Malakili却因相处形成rapport而安排同它离开。"
            },
            {
              "label": "英雄胜利与被救生命",
              "question": "从另一个人物的视角看，击败怪兽的行动会留下哪些不可恢复的损失？",
              "basis": "同一选篇梗概明确逃离计划定在Luke抵达当天，Luke杀死rancor使Malakili计划落空。"
            }
          ]
        },
        "field_notes": {
          "topics": "本实体实际读到的明确简介具体内容，解释待核。",
          "issue": "出版/作者简介或明确评论的首轮分析，不是独立身份、全文或科学核验。",
          "issue_facets": "每项具体材料依据与提问分开，不借同名/整系列扩情节。",
          "entity_identity": "Tales from Jabba’s Palace为Kevin J. Anderson编辑的多作者选集，不是其单著长篇。仅以他所写“A Boy and His Monster: The Rancor Keeper’s Tale”具体事件选例，不代表全书各篇；原库署名保留。",
          "source_scope": "实际读官方出版页检索返回集合题名与Anderson editor、Jabba宫廷人物范围；该短返回不支持选篇详细情节。；实际读该集合内选篇的完整社区梗概返回，Malakili/rancor相处、Lady Valarian帮助逃离计划及Luke杀怪打断；二手梗概，未读短篇原文。"
        },
        "verification_status": "knowledge_added_unverified",
        "sources": [
          "https://www.penguinrandomhouse.com/books/3549/tales-from-jabbas-palace-star-wars-legends-by-kevin-anderson-editor/",
          "https://starwars.fandom.com/wiki/A_Boy_and_His_Monster%3A_The_Rancor_Keeper%27s_Tale"
        ]
      },
      "original_analysis_metadata": {
        "status": "frozen_checkpoint",
        "date": "2026-10-05",
        "lane": 1,
        "queue": "fast-first-lane-1.json",
        "queue_sha256": "6b98a14c536f5668385f5eea35f448c2548e6d9cdd2f4a7574e83234747b6233",
        "scope": "保留原lane所有权，优先已有且题名作者对应的OL简介，再按来源年近往远。",
        "method": "快速首遍：准确熟悉作品用existing knowledge明确待核；其他每身份一轮精准搜索/简单来源读取，困难延后；只填作品特定短核心和两facet，原字段保留。",
        "verification": "knowledge_added_unverified；社区/图书馆作品简介只支持以下明确内容，非独立核验或全书阅读。",
        "source_snapshot": "research/canonical-universe.json.gz",
        "source_snapshot_sha256": "dd13dcd146a4f0dd20430a1f6f0b2f5156ee46d7fe66ff9fcdfb223c8a1dce08",
        "starts_at_fast_index": 1192,
        "record_count": 33,
        "facet_count": 66,
        "attempted_count": 38,
        "deferred_count": 5,
        "skipped_existing_count": 0,
        "ends_at_fast_index": 1229,
        "next_fast_index": 1230,
        "freeze_date": "2026-10-05",
        "session_inherited_baseline_sha256": "73b274aee5aee431d8d0f12edca80dee8bdff3a581e71f0a39a5587eee733a2e",
        "snapshot_point": "冻结自查时读取的完整统一快照；不声称与批次开始同一版本。",
        "audit_snapshot_sha256": "dd13dcd146a4f0dd20430a1f6f0b2f5156ee46d7fe66ff9fcdfb223c8a1dce08",
        "self_check": "原身份与当前缺口、唯一lane索引、合法topics、三议题字段、两项具体facet、实际URL范围与知识声明、独立空间仅原未知字段检查通过；不是独立书目、全文或科学核验。",
        "source_scope_counts": {
          "existing_work_specific_knowledge_records": 4,
          "records_with_actual_material": 32,
          "records_with_actual_web_material": 26,
          "records_with_local_official_dump_synopsis": 6,
          "records_without_current_material": 1,
          "actual_material_records_without_existing_knowledge_basis": 29,
          "existing_knowledge_records_with_actual_sources": 3,
          "complete_original_text_reads": 0,
          "original_or_authorized_story_selected_passages_only": 0,
          "brief_member_opening_quoted_in_secondary_source_records": 1,
          "publisher_quote_within_synopsis_records": 1,
          "author_conception_interview_records": 1,
          "low_strength_reader_recollection_records": 1,
          "anthology_selected_member_records": 3
        }
      },
      "original_reading_log": {
        "id": "Q7679252",
        "identity": {
          "title": "Tales from Jabba's Palace",
          "author": "凱文·詹姆士·安德森"
        },
        "fast_index": 1196,
        "lane_index": 1151,
        "source_sort_year": 1995,
        "priority_rank": 4853,
        "status": "analysis_added_unverified",
        "publication_status": "source_candidate_year_not_independently_verified",
        "queries": [
          "\"Tales from Jabba's Palace\" stories summary"
        ],
        "local_material_lookup": null,
        "sources": [
          {
            "url": "https://www.penguinrandomhouse.com/books/3549/tales-from-jabbas-palace-star-wars-legends-by-kevin-anderson-editor/",
            "material_kind": "publisher_anthology_identity_and_scope_search_cache",
            "support_scope": "实际读官方出版页检索返回集合题名与Anderson editor、Jabba宫廷人物范围；该短返回不支持选篇详细情节。",
            "reading_status": "actually_read_support_scope_only"
          },
          {
            "url": "https://starwars.fandom.com/wiki/A_Boy_and_His_Monster%3A_The_Rancor_Keeper%27s_Tale",
            "material_kind": "community_specific_member_story_summary_search_cache",
            "support_scope": "实际读该集合内选篇的完整社区梗概返回，Malakili/rancor相处、Lady Valarian帮助逃离计划及Luke杀怪打断；二手梗概，未读短篇原文。",
            "reading_status": "actually_read_support_scope_only"
          }
        ],
        "no_material_reason": null,
        "failure_count": 0,
        "verification_status": "knowledge_added_unverified"
      },
      "original_log_metadata": {
        "status": "frozen_checkpoint",
        "date": "2026-10-05",
        "lane": 1,
        "queue": "fast-first-lane-1.json",
        "queue_sha256": "6b98a14c536f5668385f5eea35f448c2548e6d9cdd2f4a7574e83234747b6233",
        "scope": "保留原lane所有权，优先已有且题名作者对应的OL简介，再按来源年近往远。",
        "method": "快速首遍：准确熟悉作品用existing knowledge明确待核；其他每身份一轮精准搜索/简单来源读取，困难延后；只填作品特定短核心和两facet，原字段保留。",
        "verification": "knowledge_added_unverified；社区/图书馆作品简介只支持以下明确内容，非独立核验或全书阅读。",
        "source_snapshot": "research/canonical-universe.json.gz",
        "source_snapshot_sha256": "dd13dcd146a4f0dd20430a1f6f0b2f5156ee46d7fe66ff9fcdfb223c8a1dce08",
        "starts_at_fast_index": 1192,
        "record_count": 33,
        "facet_count": 66,
        "attempted_count": 38,
        "deferred_count": 5,
        "skipped_existing_count": 0,
        "ends_at_fast_index": 1229,
        "next_fast_index": 1230,
        "freeze_date": "2026-10-05",
        "session_inherited_baseline_sha256": "73b274aee5aee431d8d0f12edca80dee8bdff3a581e71f0a39a5587eee733a2e",
        "snapshot_point": "冻结自查时读取的完整统一快照；不声称与批次开始同一版本。",
        "audit_snapshot_sha256": "dd13dcd146a4f0dd20430a1f6f0b2f5156ee46d7fe66ff9fcdfb223c8a1dce08",
        "self_check": "原身份与当前缺口、唯一lane索引、合法topics、三议题字段、两项具体facet、实际URL范围与知识声明、独立空间仅原未知字段检查通过；不是独立书目、全文或科学核验。"
      },
      "original_counter_fields": {
        "failure_count": 0
      },
      "original_counter_presence": {
        "actual_search_count": false,
        "actual_query_count": false,
        "actual_open_count": false,
        "actual_open_attempt_count": false,
        "actual_content_source_read": false,
        "actual_search_performed": false,
        "original_full_text_read": false,
        "original_full_text_read_count": false,
        "original_fulltext_read_count": false
      },
      "original_cache_declarations": {},
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_archive": null,
      "original_ownership_index": null,
      "original_ownership_record": null,
      "original_prior_source_log_present": false,
      "prior_source_log": null,
      "preserved_source_search_log": {
        "input_file": "research/issue-source-searches.json",
        "log_date": "2026-10-04",
        "id": "Q7679252",
        "identity": {
          "title": "Tales from Jabba's Palace",
          "author": "凱文·詹姆士·安德森"
        },
        "attempt_state": "content_material_read",
        "queries": [
          "\"Tales from Jabba's Palace\" stories summary"
        ],
        "query_note": "仅记录已保存的实际查询；打开、点击、查找另见原始日志，不补造查询词。",
        "materials_checked": [
          {
            "url": "https://www.penguinrandomhouse.com/books/3549/tales-from-jabbas-palace-star-wars-legends-by-kevin-anderson-editor/",
            "material_kind": "publisher_anthology_identity_and_scope_search_cache",
            "support_scope": "实际读官方出版页检索返回集合题名与Anderson editor、Jabba宫廷人物范围；该短返回不支持选篇详细情节。",
            "reading_status": "actually_read_support_scope_only",
            "material_type": "publisher_anthology_identity_and_scope_search_cache",
            "result": "actual_source_scope_read",
            "reading_scope": "实际读官方出版页检索返回集合题名与Anderson editor、Jabba宫廷人物范围；该短返回不支持选篇详细情节。",
            "read_date": "2026-10-05"
          },
          {
            "url": "https://starwars.fandom.com/wiki/A_Boy_and_His_Monster%3A_The_Rancor_Keeper%27s_Tale",
            "material_kind": "community_specific_member_story_summary_search_cache",
            "support_scope": "实际读该集合内选篇的完整社区梗概返回，Malakili/rancor相处、Lady Valarian帮助逃离计划及Luke杀怪打断；二手梗概，未读短篇原文。",
            "reading_status": "actually_read_support_scope_only",
            "material_type": "community_specific_member_story_summary_search_cache",
            "result": "actual_source_scope_read",
            "reading_scope": "实际读该集合内选篇的完整社区梗概返回，Malakili/rancor相处、Lady Valarian帮助逃离计划及Luke杀怪打断；二手梗概，未读短篇原文。",
            "read_date": "2026-10-05"
          }
        ],
        "reading_scope": "实际读官方出版页检索返回集合题名与Anderson editor、Jabba宫廷人物范围；该短返回不支持选篇详细情节。；实际读该集合内选篇的完整社区梗概返回，Malakili/rancor相处、Lady Valarian帮助逃离计划及Luke杀怪打断；二手梗概，未读短篇原文。",
        "reason_unconfirmed": "材料只支持明示范围；原作全文、版本与文学解释尚未逐项独立核验。",
        "next_step": "按确切作品、单册或系列粒度继续查正文和更具体材料，保留日期与身份疑点。",
        "issue_result": "added_to_frozen_input_unverified",
        "attempt_input": "global-recent-round35-log.json",
        "raw_reading_log": {
          "id": "Q7679252",
          "identity": {
            "title": "Tales from Jabba's Palace",
            "author": "凱文·詹姆士·安德森"
          },
          "fast_index": 1196,
          "lane_index": 1151,
          "source_sort_year": 1995,
          "priority_rank": 4853,
          "status": "analysis_added_unverified",
          "publication_status": "source_candidate_year_not_independently_verified",
          "queries": [
            "\"Tales from Jabba's Palace\" stories summary"
          ],
          "local_material_lookup": null,
          "sources": [
            {
              "url": "https://www.penguinrandomhouse.com/books/3549/tales-from-jabbas-palace-star-wars-legends-by-kevin-anderson-editor/",
              "material_kind": "publisher_anthology_identity_and_scope_search_cache",
              "support_scope": "实际读官方出版页检索返回集合题名与Anderson editor、Jabba宫廷人物范围；该短返回不支持选篇详细情节。",
              "reading_status": "actually_read_support_scope_only"
            },
            {
              "url": "https://starwars.fandom.com/wiki/A_Boy_and_His_Monster%3A_The_Rancor_Keeper%27s_Tale",
              "material_kind": "community_specific_member_story_summary_search_cache",
              "support_scope": "实际读该集合内选篇的完整社区梗概返回，Malakili/rancor相处、Lady Valarian帮助逃离计划及Luke杀怪打断；二手梗概，未读短篇原文。",
              "reading_status": "actually_read_support_scope_only"
            }
          ],
          "no_material_reason": null,
          "failure_count": 0,
          "verification_status": "knowledge_added_unverified"
        },
        "publication_status": "source_candidate_year_not_independently_verified",
        "failure_count": 0,
        "local_material_lookup": null
      },
      "preserved_source_search_log_sha256": "514c3dfc46c32c37ec07394e5475e93f23bb680f07f68c4a1f844e5d68b87efb",
      "frozen_canonical_identity_scope": {
        "id": "Q7679252",
        "title_zh": "Tales from Jabba's Palace",
        "author": "凱文·詹姆士·安德森",
        "form": "合集／组篇（来源描述候选）",
        "forms": [
          "文学作品",
          "合集／组篇（来源描述候选）"
        ],
        "source_entity_kind": "work_or_unspecified",
        "source_types": [
          {
            "id": "Q7725634",
            "label": "文学作品"
          }
        ]
      },
      "source_canonical_record_sha256": "7772bbcecc6a4b9dae25d391a2ad51509e62a7b4a3425d34bbe3bc3465a3dfd0",
      "source_canonical_snapshot_sha256": "7b4ac5886d4ff44d1f86d343c7213b8dc7027eacea4c85fddebcb7a5e64d8b8f",
      "spatial_selection_file": "work/evidence/early-published-spatial-expansion-selection7-checkpoint5.json",
      "spatial_selection_sha256": "17ba3a413420079dc0ef99dbf0bc75e133bec667f324f0859a75e2952c1bb734",
      "spatial_selection_index": 248,
      "new_actual_search_count": 0,
      "new_actual_open_count": 0,
      "new_core_count": 0,
      "new_full_original_read_count": 0,
      "independently_verified": false,
      "identity_caveat": null
    },
    "adapted_record_sha256": "a606bdc577bf413d6df28bdbba809090ad2ff2c59b8149fe6246fc4730f83a0b",
    "reason": "准确所选A Boy and His Monster成员的既有知识空间补充，待独立核对。Tatooine定位不冒称来自原PRH出版页或本轮独立地理阅读；原PRH仅集合身份，社区梗概仅已记录成员情节。原URL、原A/L阅读范围和全部旧历史保留，0新查询/打开/全文/核验。"
  },
  "Q5305569": {
    "id": "Q5305569",
    "identity": {
      "title": "Drakas!",
      "author": "S. M. Stirling"
    },
    "source_spatial_input_file": "early-published-spatial-selection7-round3.json",
    "source_spatial_input_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_input_record_sha256": "20d865a4ac0b16c5eef9d55ce71a180a30da4beb20c267252d17e57a46bb0007",
    "source_analysis_archive": "research/issue-input-snapshots/global-recent-round30.json",
    "source_analysis_sha256": "55526a22de13d19c6c31c78ea5b72b5ad3a1adef29d26bcc18b85fdf3dd27931",
    "source_analysis_record_sha256": "2cb33f80522039a6bc37dcaf55f4e61a5673547c888e4817a922d9e67f0212f2",
    "source_log_archive": "research/issue-input-snapshots/global-recent-round30-log.json",
    "source_log_sha256": "7a608421a2692679190b1364a5d73a64b914e3b6536fe97da2d7972f6ee1ee09",
    "source_log_record_sha256": "72da72297f04388e7f8a0a57c9d3712a3659af05c9dd7dbbd85bf17d38f921ea",
    "changed_record_keys": [
      "source_evidence"
    ],
    "original_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "仅取本合集Custer Under the Baobab选例中Custer参与Drakia对当地bushmen的殖民暴力，舞台为地球另类历史中的非洲；历史分叉不自动转成非物理空间。"
    },
    "original_record": {
      "id": "Q5305569",
      "identity": {
        "title": "Drakas!",
        "author": "S. M. Stirling"
      },
      "fields": {
        "spatial_primary": "earth",
        "spatial_secondary": [],
        "spatial_rationale": "仅取本合集Custer Under the Baobab选例中Custer参与Drakia对当地bushmen的殖民暴力，舞台为地球另类历史中的非洲；历史分叉不自动转成非物理空间。"
      },
      "field_notes": {
        "spatial_primary": "复用原已保存有限材料中的明确场所；没有本轮新查询、打开、全文阅读或独立核验，部分片段/选篇范围不扩为整作。",
        "spatial_secondary": "复用原已保存有限材料中的明确场所；没有本轮新查询、打开、全文阅读或独立核验，部分片段/选篇范围不扩为整作。",
        "spatial_rationale": "复用原已保存有限材料中的明确场所；没有本轮新查询、打开、全文阅读或独立核验，部分片段/选篇范围不扩为整作。"
      },
      "verification_status": "knowledge_added_unverified",
      "analysis_basis": "reuse_original_scoped_material_unverified",
      "spatial_basis_mode": "saved_explicit_setting",
      "integration_relation": "published_core",
      "sources": [
        "https://www.baen.com/chapters/W200008/0671319469_toc.htm",
        "https://uchronia.net/label/stirdrakax.html"
      ],
      "source_evidence": [
        {
          "url": "https://www.baen.com/chapters/W200008/0671319469_toc.htm",
          "type": "saved_original_limited_setting",
          "support_scope": "仅取本合集Custer Under the Baobab选例中Custer参与Drakia对当地bushmen的殖民暴力，舞台为地球另类历史中的非洲；历史分叉不自动转成非物理空间。",
          "original_support_scope": "实际读Baen官方十二篇目录缓存，明确含Custer Under the Baobab；目录只支持集合/选篇身份，未点原文。；实际专业另类历史书目本选篇摘要，Custer被逐/加入Drakia/追杀bushmen；不采社区资料对原被逐原因的不同表述。",
          "original_source_evidence": [],
          "new_read_performed": false,
          "supports_spatial_independently": true,
          "original_link_read_status": "preserved_original_scope_only"
        },
        {
          "url": "https://uchronia.net/label/stirdrakax.html",
          "type": "saved_original_limited_setting",
          "support_scope": "仅取本合集Custer Under the Baobab选例中Custer参与Drakia对当地bushmen的殖民暴力，舞台为地球另类历史中的非洲；历史分叉不自动转成非物理空间。",
          "original_support_scope": "实际读Baen官方十二篇目录缓存，明确含Custer Under the Baobab；目录只支持集合/选篇身份，未点原文。；实际专业另类历史书目本选篇摘要，Custer被逐/加入Drakia/追杀bushmen；不采社区资料对原被逐原因的不同表述。",
          "original_source_evidence": [],
          "new_read_performed": false,
          "supports_spatial_independently": true,
          "original_link_read_status": "preserved_original_scope_only"
        }
      ],
      "original_lookup_urls": [
        "https://www.baen.com/chapters/W200008/0671319469_toc.htm",
        "https://uchronia.net/label/stirdrakax.html"
      ],
      "original_source_evidence": [],
      "source_scope": "实际读Baen官方十二篇目录缓存，明确含Custer Under the Baobab；目录只支持集合/选篇身份，未点原文。；实际专业另类历史书目本选篇摘要，Custer被逐/加入Drakia/追杀bushmen；不采社区资料对原被逐原因的不同表述。",
      "frozen_knowledge_reading_scope": null,
      "frozen_knowledge_issue_note": "出版/作者简介或明确评论的首轮分析，不是独立身份、全文或科学核验。",
      "source_analysis_file": "global-recent-round30.json",
      "source_analysis_archive": "research/issue-input-snapshots/global-recent-round30.json",
      "source_analysis_sha256": "55526a22de13d19c6c31c78ea5b72b5ad3a1adef29d26bcc18b85fdf3dd27931",
      "source_analysis_record_sha256": "2cb33f80522039a6bc37dcaf55f4e61a5673547c888e4817a922d9e67f0212f2",
      "source_core_assertion_file": "research/issues-source-reading-round41.json",
      "source_core_assertion_file_sha256": "9045d3e429574d788343c2bafeee25795da3ae18394b2078264698a9df3ebb3b",
      "source_core_assertion_record_sha256": "edd155d3edaf27b4b65fe9e753b1e7a8113efb09ee7ac227a25f711659b3a494",
      "source_log_file": "global-recent-round30-log.json",
      "source_log_archive": "research/issue-input-snapshots/global-recent-round30-log.json",
      "source_log_sha256": "7a608421a2692679190b1364a5d73a64b914e3b6536fe97da2d7972f6ee1ee09",
      "source_log_record_sha256": "72da72297f04388e7f8a0a57c9d3712a3659af05c9dd7dbbd85bf17d38f921ea",
      "original_analysis_record": {
        "id": "Q5305569",
        "identity": {
          "title": "Drakas!",
          "author": "S. M. Stirling"
        },
        "fields": {
          "topics": [
            "殖民与他者",
            "权力与制度",
            "文明与历史"
          ],
          "issue": "Drakas!本轮只以William Sanders的Custer Under the Baobab为选例：Custer被美国军队逐出后转入Drakia军队，再被派去追杀bushmen。改变服役旗帜没有自动中止殖民暴力，另类历史也可检验同一种军事经验如何在不同制度中继续伤害被征服者。",
          "issue_facets": [
            {
              "label": "军队转换与暴力延续",
              "question": "一个人换到另一军事制度后，同样的征服技能为什么仍可能被再次使用？",
              "basis": "专业另类历史书目明确Custer离开US Army后加入Drakia，被派去track down and kill bushmen。"
            },
            {
              "label": "改写历史与他者处境",
              "question": "历史名人有了不同命运，叙事怎样同时看见不拥有军权者承担的后果？",
              "basis": "选篇让Custer在约1880年的Draka制度服役，其新行动目标仍是当地bushmen而非解放他们。"
            }
          ]
        },
        "field_notes": {
          "topics": "本实体实际读到的明确简介具体内容，解释待核。",
          "issue": "出版/作者简介或明确评论的首轮分析，不是独立身份、全文或科学核验。",
          "issue_facets": "每项具体材料依据与提问分开，不借同名/整系列扩情节。",
          "entity_identity": "S M Stirling编辑的2000共享世界合集Drakas!，仅Sanders选篇；官方目录佐证收录，Uchronia简介佐证具体任务，不称Stirling写了每篇或认可殖民正当性。",
          "source_scope": "实际读Baen官方十二篇目录缓存，明确含Custer Under the Baobab；目录只支持集合/选篇身份，未点原文。；实际专业另类历史书目本选篇摘要，Custer被逐/加入Drakia/追杀bushmen；不采社区资料对原被逐原因的不同表述。"
        },
        "verification_status": "knowledge_added_unverified",
        "sources": [
          "https://www.baen.com/chapters/W200008/0671319469_toc.htm",
          "https://uchronia.net/label/stirdrakax.html"
        ]
      },
      "original_analysis_metadata": {
        "status": "frozen_checkpoint",
        "date": "2026-10-05",
        "lane": 1,
        "queue": "fast-first-lane-1.json",
        "queue_sha256": "6b98a14c536f5668385f5eea35f448c2548e6d9cdd2f4a7574e83234747b6233",
        "scope": "保留原lane所有权，优先已有且题名作者对应的OL简介，再按来源年近往远。",
        "method": "快速首遍：准确熟悉作品用existing knowledge明确待核；其他每身份一轮精准搜索/简单来源读取，困难延后；只填作品特定短核心和两facet，原字段保留。",
        "verification": "knowledge_added_unverified；社区/图书馆作品简介只支持以下明确内容，非独立核验或全书阅读。",
        "source_snapshot": "research/canonical-universe.json.gz",
        "source_snapshot_sha256": "de72874181728dcfabc331d0f4793bd734f4eb4b182a60df369da229c336ae72",
        "starts_at_fast_index": 996,
        "record_count": 30,
        "facet_count": 60,
        "attempted_count": 39,
        "deferred_count": 9,
        "skipped_existing_count": 0,
        "ends_at_fast_index": 1034,
        "next_fast_index": 1035,
        "freeze_date": "2026-10-05",
        "session_inherited_baseline_sha256": "c914df0dca01bc7f283e529134f1783346e58867253816f9c1a64c1db5b2e8f8",
        "snapshot_point": "冻结自查时读取的完整统一快照；不声称与批次开始同一版本。",
        "audit_snapshot_sha256": "de72874181728dcfabc331d0f4793bd734f4eb4b182a60df369da229c336ae72",
        "self_check": "原身份与当前缺口、唯一lane索引、合法topics、三议题字段、两项具体facet、实际URL范围与知识声明、独立空间仅原未知字段检查通过；不是独立书目、全文或科学核验。",
        "source_scope_counts": {
          "existing_work_specific_knowledge_records": 4,
          "records_with_actual_material": 30,
          "records_with_actual_web_material": 24,
          "records_with_local_official_dump_synopsis": 6,
          "records_without_current_material": 0,
          "actual_material_records_without_existing_knowledge_basis": 26,
          "existing_knowledge_records_with_actual_sources": 4,
          "complete_original_text_reads": 0,
          "original_or_authorized_story_selected_passages_only": 0
        }
      },
      "original_reading_log": {
        "id": "Q5305569",
        "identity": {
          "title": "Drakas!",
          "author": "S. M. Stirling"
        },
        "fast_index": 1001,
        "lane_index": 932,
        "source_sort_year": 2000,
        "priority_rank": 4085,
        "status": "analysis_added_unverified",
        "publication_status": "source_candidate_year_not_independently_verified",
        "queries": [
          "\"Drakas!\" anthology contents Stirling"
        ],
        "local_material_lookup": null,
        "sources": [
          {
            "url": "https://www.baen.com/chapters/W200008/0671319469_toc.htm",
            "material_kind": "publisher_anthology_contents_identity_only",
            "support_scope": "实际读Baen官方十二篇目录缓存，明确含Custer Under the Baobab；目录只支持集合/选篇身份，未点原文。",
            "reading_status": "actually_read_support_scope_only"
          },
          {
            "url": "https://uchronia.net/label/stirdrakax.html",
            "material_kind": "specialist_selected_alternate_history_story_synopsis",
            "support_scope": "实际专业另类历史书目本选篇摘要，Custer被逐/加入Drakia/追杀bushmen；不采社区资料对原被逐原因的不同表述。",
            "reading_status": "actually_read_support_scope_only"
          }
        ],
        "no_material_reason": null,
        "failure_count": 0,
        "verification_status": "knowledge_added_unverified"
      },
      "original_log_metadata": {
        "status": "frozen_checkpoint",
        "date": "2026-10-05",
        "lane": 1,
        "queue": "fast-first-lane-1.json",
        "queue_sha256": "6b98a14c536f5668385f5eea35f448c2548e6d9cdd2f4a7574e83234747b6233",
        "scope": "保留原lane所有权，优先已有且题名作者对应的OL简介，再按来源年近往远。",
        "method": "快速首遍：准确熟悉作品用existing knowledge明确待核；其他每身份一轮精准搜索/简单来源读取，困难延后；只填作品特定短核心和两facet，原字段保留。",
        "verification": "knowledge_added_unverified；社区/图书馆作品简介只支持以下明确内容，非独立核验或全书阅读。",
        "source_snapshot": "research/canonical-universe.json.gz",
        "source_snapshot_sha256": "de72874181728dcfabc331d0f4793bd734f4eb4b182a60df369da229c336ae72",
        "starts_at_fast_index": 996,
        "record_count": 30,
        "facet_count": 60,
        "attempted_count": 39,
        "deferred_count": 9,
        "skipped_existing_count": 0,
        "ends_at_fast_index": 1034,
        "next_fast_index": 1035,
        "freeze_date": "2026-10-05",
        "session_inherited_baseline_sha256": "c914df0dca01bc7f283e529134f1783346e58867253816f9c1a64c1db5b2e8f8",
        "snapshot_point": "冻结自查时读取的完整统一快照；不声称与批次开始同一版本。",
        "audit_snapshot_sha256": "de72874181728dcfabc331d0f4793bd734f4eb4b182a60df369da229c336ae72",
        "self_check": "原身份与当前缺口、唯一lane索引、合法topics、三议题字段、两项具体facet、实际URL范围与知识声明、独立空间仅原未知字段检查通过；不是独立书目、全文或科学核验。"
      },
      "original_counter_fields": {
        "failure_count": 0
      },
      "original_counter_presence": {
        "actual_search_count": false,
        "actual_query_count": false,
        "actual_open_count": false,
        "actual_open_attempt_count": false,
        "actual_content_source_read": false,
        "actual_search_performed": false,
        "original_full_text_read": false,
        "original_full_text_read_count": false,
        "original_fulltext_read_count": false
      },
      "original_cache_declarations": {},
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_archive": null,
      "original_ownership_index": null,
      "original_ownership_record": null,
      "original_prior_source_log_present": false,
      "prior_source_log": null,
      "preserved_source_search_log": {
        "input_file": "research/issue-source-searches.json",
        "log_date": "2026-10-04",
        "id": "Q5305569",
        "identity": {
          "title": "Drakas!",
          "author": "S. M. Stirling"
        },
        "attempt_state": "content_material_read",
        "queries": [
          "\"Drakas!\" anthology contents Stirling"
        ],
        "query_note": "仅记录已保存的实际查询；打开、点击、查找另见原始日志，不补造查询词。",
        "materials_checked": [
          {
            "url": "https://www.baen.com/chapters/W200008/0671319469_toc.htm",
            "material_kind": "publisher_anthology_contents_identity_only",
            "support_scope": "实际读Baen官方十二篇目录缓存，明确含Custer Under the Baobab；目录只支持集合/选篇身份，未点原文。",
            "reading_status": "actually_read_support_scope_only",
            "material_type": "publisher_anthology_contents_identity_only",
            "result": "actual_source_scope_read",
            "reading_scope": "实际读Baen官方十二篇目录缓存，明确含Custer Under the Baobab；目录只支持集合/选篇身份，未点原文。",
            "read_date": "2026-10-05"
          },
          {
            "url": "https://uchronia.net/label/stirdrakax.html",
            "material_kind": "specialist_selected_alternate_history_story_synopsis",
            "support_scope": "实际专业另类历史书目本选篇摘要，Custer被逐/加入Drakia/追杀bushmen；不采社区资料对原被逐原因的不同表述。",
            "reading_status": "actually_read_support_scope_only",
            "material_type": "specialist_selected_alternate_history_story_synopsis",
            "result": "actual_source_scope_read",
            "reading_scope": "实际专业另类历史书目本选篇摘要，Custer被逐/加入Drakia/追杀bushmen；不采社区资料对原被逐原因的不同表述。",
            "read_date": "2026-10-05"
          }
        ],
        "reading_scope": "实际读Baen官方十二篇目录缓存，明确含Custer Under the Baobab；目录只支持集合/选篇身份，未点原文。；实际专业另类历史书目本选篇摘要，Custer被逐/加入Drakia/追杀bushmen；不采社区资料对原被逐原因的不同表述。",
        "reason_unconfirmed": "材料只支持明示范围；原作全文、版本与文学解释尚未逐项独立核验。",
        "next_step": "按确切作品、单册或系列粒度继续查正文和更具体材料，保留日期与身份疑点。",
        "issue_result": "added_to_frozen_input_unverified",
        "attempt_input": "global-recent-round30-log.json",
        "raw_reading_log": {
          "id": "Q5305569",
          "identity": {
            "title": "Drakas!",
            "author": "S. M. Stirling"
          },
          "fast_index": 1001,
          "lane_index": 932,
          "source_sort_year": 2000,
          "priority_rank": 4085,
          "status": "analysis_added_unverified",
          "publication_status": "source_candidate_year_not_independently_verified",
          "queries": [
            "\"Drakas!\" anthology contents Stirling"
          ],
          "local_material_lookup": null,
          "sources": [
            {
              "url": "https://www.baen.com/chapters/W200008/0671319469_toc.htm",
              "material_kind": "publisher_anthology_contents_identity_only",
              "support_scope": "实际读Baen官方十二篇目录缓存，明确含Custer Under the Baobab；目录只支持集合/选篇身份，未点原文。",
              "reading_status": "actually_read_support_scope_only"
            },
            {
              "url": "https://uchronia.net/label/stirdrakax.html",
              "material_kind": "specialist_selected_alternate_history_story_synopsis",
              "support_scope": "实际专业另类历史书目本选篇摘要，Custer被逐/加入Drakia/追杀bushmen；不采社区资料对原被逐原因的不同表述。",
              "reading_status": "actually_read_support_scope_only"
            }
          ],
          "no_material_reason": null,
          "failure_count": 0,
          "verification_status": "knowledge_added_unverified"
        },
        "publication_status": "source_candidate_year_not_independently_verified",
        "failure_count": 0,
        "local_material_lookup": null
      },
      "preserved_source_search_log_sha256": "ad526e13926ead9cd90eb2d694963b745dd381a514c8d20cc31f8fbd2b82f853",
      "frozen_canonical_identity_scope": {
        "id": "Q5305569",
        "title_zh": "Drakas!",
        "author": "S. M. Stirling",
        "form": "长篇（来源描述候选）",
        "forms": [
          "文学作品",
          "长篇（来源描述候选）"
        ],
        "source_entity_kind": "work_or_unspecified",
        "source_types": [
          {
            "id": "Q7725634",
            "label": "文学作品"
          }
        ]
      },
      "source_canonical_record_sha256": "dda730955f5be5ee1eda5028e544cbce7a64ad677bcc52f0c3540b8b3e02c457",
      "source_canonical_snapshot_sha256": "7b4ac5886d4ff44d1f86d343c7213b8dc7027eacea4c85fddebcb7a5e64d8b8f",
      "spatial_selection_file": "work/evidence/early-published-spatial-expansion-selection7-checkpoint3.json",
      "spatial_selection_sha256": "ecf01c80351f314f9e995d63a541de9396ab4b2359b4578a71998fa67b86e31a",
      "spatial_selection_index": 128,
      "new_actual_search_count": 0,
      "new_actual_open_count": 0,
      "new_core_count": 0,
      "new_full_original_read_count": 0,
      "independently_verified": false,
      "identity_caveat": null
    },
    "adapted_record": {
      "id": "Q5305569",
      "identity": {
        "title": "Drakas!",
        "author": "S. M. Stirling"
      },
      "fields": {
        "spatial_primary": "earth",
        "spatial_secondary": [],
        "spatial_rationale": "仅取本合集Custer Under the Baobab选例中Custer参与Drakia对当地bushmen的殖民暴力，舞台为地球另类历史中的非洲；历史分叉不自动转成非物理空间。"
      },
      "field_notes": {
        "spatial_primary": "复用原已保存有限材料中的明确场所；没有本轮新查询、打开、全文阅读或独立核验，部分片段/选篇范围不扩为整作。",
        "spatial_secondary": "复用原已保存有限材料中的明确场所；没有本轮新查询、打开、全文阅读或独立核验，部分片段/选篇范围不扩为整作。",
        "spatial_rationale": "复用原已保存有限材料中的明确场所；没有本轮新查询、打开、全文阅读或独立核验，部分片段/选篇范围不扩为整作。"
      },
      "verification_status": "knowledge_added_unverified",
      "analysis_basis": "reuse_original_scoped_material_unverified",
      "spatial_basis_mode": "saved_explicit_setting",
      "integration_relation": "published_core",
      "sources": [
        "https://www.baen.com/chapters/W200008/0671319469_toc.htm",
        "https://uchronia.net/label/stirdrakax.html"
      ],
      "source_evidence": [
        {
          "url": "https://www.baen.com/chapters/W200008/0671319469_toc.htm",
          "type": "preserved_original_bibliographic_only",
          "support_scope": "仅取本合集Custer Under the Baobab选例中Custer参与Drakia对当地bushmen的殖民暴力，舞台为地球另类历史中的非洲；历史分叉不自动转成非物理空间。",
          "original_support_scope": "实际读Baen官方十二篇目录缓存，明确含Custer Under the Baobab；目录只支持集合/选篇身份，未点原文。；实际专业另类历史书目本选篇摘要，Custer被逐/加入Drakia/追杀bushmen；不采社区资料对原被逐原因的不同表述。",
          "original_source_evidence": [],
          "new_read_performed": false,
          "supports_spatial_independently": false,
          "original_link_read_status": "preserved_original_scope_only"
        },
        {
          "url": "https://uchronia.net/label/stirdrakax.html",
          "type": "saved_original_limited_setting",
          "support_scope": "仅取本合集Custer Under the Baobab选例中Custer参与Drakia对当地bushmen的殖民暴力，舞台为地球另类历史中的非洲；历史分叉不自动转成非物理空间。",
          "original_support_scope": "实际读Baen官方十二篇目录缓存，明确含Custer Under the Baobab；目录只支持集合/选篇身份，未点原文。；实际专业另类历史书目本选篇摘要，Custer被逐/加入Drakia/追杀bushmen；不采社区资料对原被逐原因的不同表述。",
          "original_source_evidence": [],
          "new_read_performed": false,
          "supports_spatial_independently": true,
          "original_link_read_status": "preserved_original_scope_only"
        }
      ],
      "original_lookup_urls": [
        "https://www.baen.com/chapters/W200008/0671319469_toc.htm",
        "https://uchronia.net/label/stirdrakax.html"
      ],
      "original_source_evidence": [],
      "source_scope": "实际读Baen官方十二篇目录缓存，明确含Custer Under the Baobab；目录只支持集合/选篇身份，未点原文。；实际专业另类历史书目本选篇摘要，Custer被逐/加入Drakia/追杀bushmen；不采社区资料对原被逐原因的不同表述。",
      "frozen_knowledge_reading_scope": null,
      "frozen_knowledge_issue_note": "出版/作者简介或明确评论的首轮分析，不是独立身份、全文或科学核验。",
      "source_analysis_file": "global-recent-round30.json",
      "source_analysis_archive": "research/issue-input-snapshots/global-recent-round30.json",
      "source_analysis_sha256": "55526a22de13d19c6c31c78ea5b72b5ad3a1adef29d26bcc18b85fdf3dd27931",
      "source_analysis_record_sha256": "2cb33f80522039a6bc37dcaf55f4e61a5673547c888e4817a922d9e67f0212f2",
      "source_core_assertion_file": "research/issues-source-reading-round41.json",
      "source_core_assertion_file_sha256": "9045d3e429574d788343c2bafeee25795da3ae18394b2078264698a9df3ebb3b",
      "source_core_assertion_record_sha256": "edd155d3edaf27b4b65fe9e753b1e7a8113efb09ee7ac227a25f711659b3a494",
      "source_log_file": "global-recent-round30-log.json",
      "source_log_archive": "research/issue-input-snapshots/global-recent-round30-log.json",
      "source_log_sha256": "7a608421a2692679190b1364a5d73a64b914e3b6536fe97da2d7972f6ee1ee09",
      "source_log_record_sha256": "72da72297f04388e7f8a0a57c9d3712a3659af05c9dd7dbbd85bf17d38f921ea",
      "original_analysis_record": {
        "id": "Q5305569",
        "identity": {
          "title": "Drakas!",
          "author": "S. M. Stirling"
        },
        "fields": {
          "topics": [
            "殖民与他者",
            "权力与制度",
            "文明与历史"
          ],
          "issue": "Drakas!本轮只以William Sanders的Custer Under the Baobab为选例：Custer被美国军队逐出后转入Drakia军队，再被派去追杀bushmen。改变服役旗帜没有自动中止殖民暴力，另类历史也可检验同一种军事经验如何在不同制度中继续伤害被征服者。",
          "issue_facets": [
            {
              "label": "军队转换与暴力延续",
              "question": "一个人换到另一军事制度后，同样的征服技能为什么仍可能被再次使用？",
              "basis": "专业另类历史书目明确Custer离开US Army后加入Drakia，被派去track down and kill bushmen。"
            },
            {
              "label": "改写历史与他者处境",
              "question": "历史名人有了不同命运，叙事怎样同时看见不拥有军权者承担的后果？",
              "basis": "选篇让Custer在约1880年的Draka制度服役，其新行动目标仍是当地bushmen而非解放他们。"
            }
          ]
        },
        "field_notes": {
          "topics": "本实体实际读到的明确简介具体内容，解释待核。",
          "issue": "出版/作者简介或明确评论的首轮分析，不是独立身份、全文或科学核验。",
          "issue_facets": "每项具体材料依据与提问分开，不借同名/整系列扩情节。",
          "entity_identity": "S M Stirling编辑的2000共享世界合集Drakas!，仅Sanders选篇；官方目录佐证收录，Uchronia简介佐证具体任务，不称Stirling写了每篇或认可殖民正当性。",
          "source_scope": "实际读Baen官方十二篇目录缓存，明确含Custer Under the Baobab；目录只支持集合/选篇身份，未点原文。；实际专业另类历史书目本选篇摘要，Custer被逐/加入Drakia/追杀bushmen；不采社区资料对原被逐原因的不同表述。"
        },
        "verification_status": "knowledge_added_unverified",
        "sources": [
          "https://www.baen.com/chapters/W200008/0671319469_toc.htm",
          "https://uchronia.net/label/stirdrakax.html"
        ]
      },
      "original_analysis_metadata": {
        "status": "frozen_checkpoint",
        "date": "2026-10-05",
        "lane": 1,
        "queue": "fast-first-lane-1.json",
        "queue_sha256": "6b98a14c536f5668385f5eea35f448c2548e6d9cdd2f4a7574e83234747b6233",
        "scope": "保留原lane所有权，优先已有且题名作者对应的OL简介，再按来源年近往远。",
        "method": "快速首遍：准确熟悉作品用existing knowledge明确待核；其他每身份一轮精准搜索/简单来源读取，困难延后；只填作品特定短核心和两facet，原字段保留。",
        "verification": "knowledge_added_unverified；社区/图书馆作品简介只支持以下明确内容，非独立核验或全书阅读。",
        "source_snapshot": "research/canonical-universe.json.gz",
        "source_snapshot_sha256": "de72874181728dcfabc331d0f4793bd734f4eb4b182a60df369da229c336ae72",
        "starts_at_fast_index": 996,
        "record_count": 30,
        "facet_count": 60,
        "attempted_count": 39,
        "deferred_count": 9,
        "skipped_existing_count": 0,
        "ends_at_fast_index": 1034,
        "next_fast_index": 1035,
        "freeze_date": "2026-10-05",
        "session_inherited_baseline_sha256": "c914df0dca01bc7f283e529134f1783346e58867253816f9c1a64c1db5b2e8f8",
        "snapshot_point": "冻结自查时读取的完整统一快照；不声称与批次开始同一版本。",
        "audit_snapshot_sha256": "de72874181728dcfabc331d0f4793bd734f4eb4b182a60df369da229c336ae72",
        "self_check": "原身份与当前缺口、唯一lane索引、合法topics、三议题字段、两项具体facet、实际URL范围与知识声明、独立空间仅原未知字段检查通过；不是独立书目、全文或科学核验。",
        "source_scope_counts": {
          "existing_work_specific_knowledge_records": 4,
          "records_with_actual_material": 30,
          "records_with_actual_web_material": 24,
          "records_with_local_official_dump_synopsis": 6,
          "records_without_current_material": 0,
          "actual_material_records_without_existing_knowledge_basis": 26,
          "existing_knowledge_records_with_actual_sources": 4,
          "complete_original_text_reads": 0,
          "original_or_authorized_story_selected_passages_only": 0
        }
      },
      "original_reading_log": {
        "id": "Q5305569",
        "identity": {
          "title": "Drakas!",
          "author": "S. M. Stirling"
        },
        "fast_index": 1001,
        "lane_index": 932,
        "source_sort_year": 2000,
        "priority_rank": 4085,
        "status": "analysis_added_unverified",
        "publication_status": "source_candidate_year_not_independently_verified",
        "queries": [
          "\"Drakas!\" anthology contents Stirling"
        ],
        "local_material_lookup": null,
        "sources": [
          {
            "url": "https://www.baen.com/chapters/W200008/0671319469_toc.htm",
            "material_kind": "publisher_anthology_contents_identity_only",
            "support_scope": "实际读Baen官方十二篇目录缓存，明确含Custer Under the Baobab；目录只支持集合/选篇身份，未点原文。",
            "reading_status": "actually_read_support_scope_only"
          },
          {
            "url": "https://uchronia.net/label/stirdrakax.html",
            "material_kind": "specialist_selected_alternate_history_story_synopsis",
            "support_scope": "实际专业另类历史书目本选篇摘要，Custer被逐/加入Drakia/追杀bushmen；不采社区资料对原被逐原因的不同表述。",
            "reading_status": "actually_read_support_scope_only"
          }
        ],
        "no_material_reason": null,
        "failure_count": 0,
        "verification_status": "knowledge_added_unverified"
      },
      "original_log_metadata": {
        "status": "frozen_checkpoint",
        "date": "2026-10-05",
        "lane": 1,
        "queue": "fast-first-lane-1.json",
        "queue_sha256": "6b98a14c536f5668385f5eea35f448c2548e6d9cdd2f4a7574e83234747b6233",
        "scope": "保留原lane所有权，优先已有且题名作者对应的OL简介，再按来源年近往远。",
        "method": "快速首遍：准确熟悉作品用existing knowledge明确待核；其他每身份一轮精准搜索/简单来源读取，困难延后；只填作品特定短核心和两facet，原字段保留。",
        "verification": "knowledge_added_unverified；社区/图书馆作品简介只支持以下明确内容，非独立核验或全书阅读。",
        "source_snapshot": "research/canonical-universe.json.gz",
        "source_snapshot_sha256": "de72874181728dcfabc331d0f4793bd734f4eb4b182a60df369da229c336ae72",
        "starts_at_fast_index": 996,
        "record_count": 30,
        "facet_count": 60,
        "attempted_count": 39,
        "deferred_count": 9,
        "skipped_existing_count": 0,
        "ends_at_fast_index": 1034,
        "next_fast_index": 1035,
        "freeze_date": "2026-10-05",
        "session_inherited_baseline_sha256": "c914df0dca01bc7f283e529134f1783346e58867253816f9c1a64c1db5b2e8f8",
        "snapshot_point": "冻结自查时读取的完整统一快照；不声称与批次开始同一版本。",
        "audit_snapshot_sha256": "de72874181728dcfabc331d0f4793bd734f4eb4b182a60df369da229c336ae72",
        "self_check": "原身份与当前缺口、唯一lane索引、合法topics、三议题字段、两项具体facet、实际URL范围与知识声明、独立空间仅原未知字段检查通过；不是独立书目、全文或科学核验。"
      },
      "original_counter_fields": {
        "failure_count": 0
      },
      "original_counter_presence": {
        "actual_search_count": false,
        "actual_query_count": false,
        "actual_open_count": false,
        "actual_open_attempt_count": false,
        "actual_content_source_read": false,
        "actual_search_performed": false,
        "original_full_text_read": false,
        "original_full_text_read_count": false,
        "original_fulltext_read_count": false
      },
      "original_cache_declarations": {},
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_archive": null,
      "original_ownership_index": null,
      "original_ownership_record": null,
      "original_prior_source_log_present": false,
      "prior_source_log": null,
      "preserved_source_search_log": {
        "input_file": "research/issue-source-searches.json",
        "log_date": "2026-10-04",
        "id": "Q5305569",
        "identity": {
          "title": "Drakas!",
          "author": "S. M. Stirling"
        },
        "attempt_state": "content_material_read",
        "queries": [
          "\"Drakas!\" anthology contents Stirling"
        ],
        "query_note": "仅记录已保存的实际查询；打开、点击、查找另见原始日志，不补造查询词。",
        "materials_checked": [
          {
            "url": "https://www.baen.com/chapters/W200008/0671319469_toc.htm",
            "material_kind": "publisher_anthology_contents_identity_only",
            "support_scope": "实际读Baen官方十二篇目录缓存，明确含Custer Under the Baobab；目录只支持集合/选篇身份，未点原文。",
            "reading_status": "actually_read_support_scope_only",
            "material_type": "publisher_anthology_contents_identity_only",
            "result": "actual_source_scope_read",
            "reading_scope": "实际读Baen官方十二篇目录缓存，明确含Custer Under the Baobab；目录只支持集合/选篇身份，未点原文。",
            "read_date": "2026-10-05"
          },
          {
            "url": "https://uchronia.net/label/stirdrakax.html",
            "material_kind": "specialist_selected_alternate_history_story_synopsis",
            "support_scope": "实际专业另类历史书目本选篇摘要，Custer被逐/加入Drakia/追杀bushmen；不采社区资料对原被逐原因的不同表述。",
            "reading_status": "actually_read_support_scope_only",
            "material_type": "specialist_selected_alternate_history_story_synopsis",
            "result": "actual_source_scope_read",
            "reading_scope": "实际专业另类历史书目本选篇摘要，Custer被逐/加入Drakia/追杀bushmen；不采社区资料对原被逐原因的不同表述。",
            "read_date": "2026-10-05"
          }
        ],
        "reading_scope": "实际读Baen官方十二篇目录缓存，明确含Custer Under the Baobab；目录只支持集合/选篇身份，未点原文。；实际专业另类历史书目本选篇摘要，Custer被逐/加入Drakia/追杀bushmen；不采社区资料对原被逐原因的不同表述。",
        "reason_unconfirmed": "材料只支持明示范围；原作全文、版本与文学解释尚未逐项独立核验。",
        "next_step": "按确切作品、单册或系列粒度继续查正文和更具体材料，保留日期与身份疑点。",
        "issue_result": "added_to_frozen_input_unverified",
        "attempt_input": "global-recent-round30-log.json",
        "raw_reading_log": {
          "id": "Q5305569",
          "identity": {
            "title": "Drakas!",
            "author": "S. M. Stirling"
          },
          "fast_index": 1001,
          "lane_index": 932,
          "source_sort_year": 2000,
          "priority_rank": 4085,
          "status": "analysis_added_unverified",
          "publication_status": "source_candidate_year_not_independently_verified",
          "queries": [
            "\"Drakas!\" anthology contents Stirling"
          ],
          "local_material_lookup": null,
          "sources": [
            {
              "url": "https://www.baen.com/chapters/W200008/0671319469_toc.htm",
              "material_kind": "publisher_anthology_contents_identity_only",
              "support_scope": "实际读Baen官方十二篇目录缓存，明确含Custer Under the Baobab；目录只支持集合/选篇身份，未点原文。",
              "reading_status": "actually_read_support_scope_only"
            },
            {
              "url": "https://uchronia.net/label/stirdrakax.html",
              "material_kind": "specialist_selected_alternate_history_story_synopsis",
              "support_scope": "实际专业另类历史书目本选篇摘要，Custer被逐/加入Drakia/追杀bushmen；不采社区资料对原被逐原因的不同表述。",
              "reading_status": "actually_read_support_scope_only"
            }
          ],
          "no_material_reason": null,
          "failure_count": 0,
          "verification_status": "knowledge_added_unverified"
        },
        "publication_status": "source_candidate_year_not_independently_verified",
        "failure_count": 0,
        "local_material_lookup": null
      },
      "preserved_source_search_log_sha256": "ad526e13926ead9cd90eb2d694963b745dd381a514c8d20cc31f8fbd2b82f853",
      "frozen_canonical_identity_scope": {
        "id": "Q5305569",
        "title_zh": "Drakas!",
        "author": "S. M. Stirling",
        "form": "长篇（来源描述候选）",
        "forms": [
          "文学作品",
          "长篇（来源描述候选）"
        ],
        "source_entity_kind": "work_or_unspecified",
        "source_types": [
          {
            "id": "Q7725634",
            "label": "文学作品"
          }
        ]
      },
      "source_canonical_record_sha256": "dda730955f5be5ee1eda5028e544cbce7a64ad677bcc52f0c3540b8b3e02c457",
      "source_canonical_snapshot_sha256": "7b4ac5886d4ff44d1f86d343c7213b8dc7027eacea4c85fddebcb7a5e64d8b8f",
      "spatial_selection_file": "work/evidence/early-published-spatial-expansion-selection7-checkpoint3.json",
      "spatial_selection_sha256": "ecf01c80351f314f9e995d63a541de9396ab4b2359b4578a71998fa67b86e31a",
      "spatial_selection_index": 128,
      "new_actual_search_count": 0,
      "new_actual_open_count": 0,
      "new_core_count": 0,
      "new_full_original_read_count": 0,
      "independently_verified": false,
      "identity_caveat": null
    },
    "adapted_record_sha256": "59f89c389d306e48b6ea5b48e91edd9a14808779ee8fc64c85ee1f5440f01573",
    "reason": "原L按URL明确：Baen仅Drakas!目录/成员身份，不能独立支持Custer Under the Baobab地理剧情；Uchronia准确选篇摘要仍是原有限剧情材料。只收紧Baen这一URL的2个证据角色属性，不改scope、URL、mode或任何空间字段。"
  },
  "Q5700973": {
    "id": "Q5700973",
    "identity": {
      "title": "Heirs of Empire",
      "author": "David Weber"
    },
    "source_spatial_input_file": "early-published-spatial-selection7-round5.json",
    "source_spatial_input_sha256": "88d6610201cd396975169e92b66a74fe68088e9fff2dcc01a10554433c2c66a7",
    "source_spatial_input_record_sha256": "a36b2b1f4aa8fb36abd82bcc1ff6b2e3b46f3ef6d8c52b034821ff10cc5af447",
    "source_analysis_archive": "research/issues-since-1980-round11.json",
    "source_analysis_sha256": "9ed8de4411b7bd487d659ae93666968950dcf9276e463dcba35be2e06a3e7e91",
    "source_analysis_record_sha256": "27e5dd916a97c3800da0290d1aecf21c8cdfe029e0c7edf81aded246301c303c",
    "source_log_archive": null,
    "source_log_sha256": null,
    "source_log_record_sha256": null,
    "changed_record_keys": [
      "field_notes",
      "analysis_basis",
      "spatial_basis_mode",
      "sources",
      "source_evidence"
    ],
    "original_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位Heirs of Empire材料明确年轻人被困的远方行星及当地宗教、技术冲突；地球出身与返乡目标不当作这阶段实际地球行动。"
    },
    "original_record": {
      "id": "Q5700973",
      "identity": {
        "title": "Heirs of Empire",
        "author": "David Weber"
      },
      "fields": {
        "spatial_primary": "planetary",
        "spatial_secondary": [],
        "spatial_rationale": "仅定位Heirs of Empire材料明确年轻人被困的远方行星及当地宗教、技术冲突；地球出身与返乡目标不当作这阶段实际地球行动。"
      },
      "field_notes": {
        "spatial_primary": "复用原已保存有限材料中的明确场所；没有本轮新查询、打开、全文阅读或独立核验，部分片段/选篇范围不扩为整作。",
        "spatial_secondary": "复用原已保存有限材料中的明确场所；没有本轮新查询、打开、全文阅读或独立核验，部分片段/选篇范围不扩为整作。",
        "spatial_rationale": "复用原已保存有限材料中的明确场所；没有本轮新查询、打开、全文阅读或独立核验，部分片段/选篇范围不扩为整作。"
      },
      "verification_status": "knowledge_added_unverified",
      "analysis_basis": "reuse_original_scoped_material_unverified",
      "spatial_basis_mode": "saved_explicit_setting",
      "integration_relation": "published_core",
      "sources": [
        "https://www.simonandschuster.com/books/Heirs-of-Empire/Weber/9780671877071"
      ],
      "source_evidence": [
        {
          "url": "https://www.simonandschuster.com/books/Heirs-of-Empire/Weber/9780671877071",
          "type": "saved_original_limited_setting",
          "support_scope": "仅定位Heirs of Empire材料明确年轻人被困的远方行星及当地宗教、技术冲突；地球出身与返乡目标不当作这阶段实际地球行动。",
          "original_support_scope": "实际阅读出版方页面，仅支持Heirs of Empire单书身份、1996版本与页数；没有情节简介。上述Sean、被困禁技术社会与组织当地力量来自明确作品知识，本轮未读原文，不把单纯书目页面作为情节核验。",
          "original_source_evidence": [],
          "new_read_performed": false,
          "supports_spatial_independently": true,
          "original_link_read_status": "preserved_original_scope_only"
        }
      ],
      "original_lookup_urls": [
        "https://www.simonandschuster.com/books/Heirs-of-Empire/Weber/9780671877071"
      ],
      "original_source_evidence": [],
      "source_scope": "实际阅读出版方页面，仅支持Heirs of Empire单书身份、1996版本与页数；没有情节简介。上述Sean、被困禁技术社会与组织当地力量来自明确作品知识，本轮未读原文，不把单纯书目页面作为情节核验。",
      "frozen_knowledge_reading_scope": null,
      "frozen_knowledge_issue_note": "作品知识与实际材料支持范围见source_scope，解释仍待原作核对。",
      "source_analysis_file": "issues-since-1980-round11.json",
      "source_analysis_archive": "research/issues-since-1980-round11.json",
      "source_analysis_sha256": "9ed8de4411b7bd487d659ae93666968950dcf9276e463dcba35be2e06a3e7e91",
      "source_analysis_record_sha256": "27e5dd916a97c3800da0290d1aecf21c8cdfe029e0c7edf81aded246301c303c",
      "source_core_assertion_file": "research/issues-since-1980-round11.json",
      "source_core_assertion_file_sha256": "9ed8de4411b7bd487d659ae93666968950dcf9276e463dcba35be2e06a3e7e91",
      "source_core_assertion_record_sha256": "384543167b4617a347be28ad74c5c0e3d7e099b02ba289ef37fa24eccada8372",
      "source_log_file": null,
      "source_log_archive": null,
      "source_log_sha256": null,
      "source_log_record_sha256": null,
      "original_analysis_record": {
        "id": "Q5700973",
        "identity": {
          "title": "Heirs of Empire",
          "author": "David Weber"
        },
        "fields": {
          "topics": [
            "知识与认识",
            "权力与制度",
            "技术与责任"
          ],
          "issue": "Sean等年轻人因阴谋远离地球并被困在禁止技术的宗教社会，必须以残存知识和有限物资争取当地人的信任，借社会与军事变化找到生存和返回的可能。小说把外来者的技术优势同当地人的信仰与政治选择并置，追问解除禁令是否足以使干预正当，以及背负帝国继承身份的人怎样避免把别人的世界仅当作返乡工具。",
          "issue_facets": [
            {
              "label": "禁技术权威与外来知识",
              "question": "少数外来者利用知识改变当地力量关系时，怎样同时承认当地人的行动资格？",
              "basis": "被困的年轻人面对压制技术的宗教统治，以有限装备和所知技术组织当地力量。"
            },
            {
              "label": "返乡目标与介入责任",
              "question": "为自己的生存和返乡改变他国社会，必须向受到改变的人承担什么责任？",
              "basis": "Sean等人必须在远离地球的世界求生，脱困计划却涉及当地政治与战争。"
            }
          ]
        },
        "field_notes": {
          "topics": "按该文本具体设定选择，不按作者或系列主题继承。",
          "issue": "作品知识与实际材料支持范围见source_scope，解释仍待原作核对。",
          "issue_facets": "来源只支持书目或版本时明说；不视为情节独立核验。",
          "entity_identity": "以底库单卷实体为单位，保留版本、原作与扩写边界。",
          "source_scope": "实际阅读出版方页面，仅支持Heirs of Empire单书身份、1996版本与页数；没有情节简介。上述Sean、被困禁技术社会与组织当地力量来自明确作品知识，本轮未读原文，不把单纯书目页面作为情节核验。"
        },
        "verification_status": "knowledge_added_unverified",
        "sources": [
          "https://www.simonandschuster.com/books/Heirs-of-Empire/Weber/9780671877071"
        ]
      },
      "original_analysis_metadata": {
        "status": "frozen_checkpoint",
        "date": "2026-10-04",
        "scope": "sort_year >= 1980 与日期未知、当前底库缺 issue 的具体熟悉实体；只补 topics/issue/issue_facets。",
        "method": "具体作品知识与实际原文、作者、出版方简介阅读；解释性补充逐条保留待核标注，来源支持范围明确。",
        "verification": "knowledge_added_unverified，字段自检不等于原作或独立书目核验。",
        "source_snapshot": "research/canonical-universe.json.gz",
        "source_snapshot_sha256": "85b347dc1ad872c7ec6b9a4d5cc5a5088ea48b0bbd78d180ee71c822c9279dcc",
        "preceding_checkpoint": {
          "file": "work/evidence/global-round10.json",
          "sha256": "84c4b863b0083bf19064d76dc00820336ab3c02a41450cbd9de8d7ee3ca7046b",
          "record_count": 40
        },
        "skip_previous_ids": [
          "Q100427780",
          "Q103898910",
          "Q1047909",
          "Q104814854",
          "Q104848710",
          "Q1068060",
          "Q1068344",
          "Q107213370",
          "Q107610330",
          "Q107970380",
          "Q108456731",
          "Q10855967",
          "Q109284514",
          "Q109525662",
          "Q109525712",
          "Q109661040",
          "Q1099716",
          "Q110825800",
          "Q111027604",
          "Q11395416",
          "Q11517193",
          "Q11602397",
          "Q1171420",
          "Q11859725",
          "Q1189364",
          "Q122425801",
          "Q122425845",
          "Q123521600",
          "Q124021681",
          "Q1256948",
          "Q125740678",
          "Q125924434",
          "Q128035050",
          "Q128506",
          "Q130284308",
          "Q131007242",
          "Q131314393",
          "Q131375511",
          "Q131381177",
          "Q131381266",
          "Q131381611",
          "Q131381613",
          "Q131381664",
          "Q131381668",
          "Q131382098",
          "Q131382099",
          "Q131382115",
          "Q131382135",
          "Q131382162",
          "Q131382196",
          "Q131382278",
          "Q131382376",
          "Q131382806",
          "Q131382813",
          "Q131382870",
          "Q131382888",
          "Q131382891",
          "Q131382897",
          "Q131382898",
          "Q131382911",
          "Q131382913",
          "Q131382915",
          "Q131471710",
          "Q131471753",
          "Q131472518",
          "Q131517621",
          "Q131517780",
          "Q131517783",
          "Q131517788",
          "Q131517790",
          "Q131717412",
          "Q1321644",
          "Q134731854",
          "Q135088692",
          "Q13512122",
          "Q13512152",
          "Q13581036",
          "Q135925979",
          "Q136417279",
          "Q1431808",
          "Q1472204",
          "Q15034603",
          "Q15035002",
          "Q15035025",
          "Q15035525",
          "Q15035527",
          "Q15096441",
          "Q151337",
          "Q15987819",
          "Q1617340",
          "Q16258116",
          "Q16271779",
          "Q1627253",
          "Q1637730",
          "Q1637738",
          "Q16651302",
          "Q16654854",
          "Q17008262",
          "Q17016080",
          "Q17071479",
          "Q1708598",
          "Q17182944",
          "Q1748402",
          "Q1757054",
          "Q17625679",
          "Q18289389",
          "Q18289391",
          "Q18389116",
          "Q18391798",
          "Q18620356",
          "Q19263901",
          "Q196151",
          "Q19892923",
          "Q2017025",
          "Q20604151",
          "Q2071504",
          "Q212194",
          "Q21558225",
          "Q22247892",
          "Q2240456",
          "Q2252121",
          "Q2253255",
          "Q2269230",
          "Q2297804",
          "Q2319431",
          "Q23307323",
          "Q2346621",
          "Q2357633",
          "Q2362526",
          "Q2377147",
          "Q24037175",
          "Q2419894",
          "Q2421826",
          "Q24255710",
          "Q24255737",
          "Q2439089",
          "Q247364",
          "Q2521688",
          "Q25217435",
          "Q2525080",
          "Q25389538",
          "Q25551",
          "Q2627586",
          "Q2656138",
          "Q2699842",
          "Q2703898",
          "Q2705377",
          "Q2725656",
          "Q2759020",
          "Q27916566",
          "Q27956412",
          "Q27976003",
          "Q27976114",
          "Q28682687",
          "Q28683258",
          "Q2870331",
          "Q2873157",
          "Q2874783",
          "Q2884527",
          "Q2906615",
          "Q2933712",
          "Q29918076",
          "Q29918133",
          "Q29994368",
          "Q3001930",
          "Q3005722",
          "Q3006304",
          "Q3016630",
          "Q3026086",
          "Q3026093",
          "Q3038780",
          "Q3040928",
          "Q3045861",
          "Q3053590",
          "Q30598023",
          "Q30601997",
          "Q3062494",
          "Q3075680",
          "Q30887961",
          "Q3088925",
          "Q3090152",
          "Q3116252",
          "Q3144233",
          "Q3149116",
          "Q3149129",
          "Q3157174",
          "Q3201692",
          "Q3203122",
          "Q3204498",
          "Q3205133",
          "Q3205332",
          "Q3207891",
          "Q3208305",
          "Q3209796",
          "Q3209843",
          "Q3210024",
          "Q3212201",
          "Q3213998",
          "Q3222317",
          "Q3223851",
          "Q3231336",
          "Q3232671",
          "Q3232800",
          "Q3233818",
          "Q3233920",
          "Q3297215",
          "Q3305528",
          "Q3316723",
          "Q3330947",
          "Q3335725",
          "Q3373093",
          "Q337347",
          "Q3375455",
          "Q3390937",
          "Q3400447",
          "Q3412966",
          "Q3416949",
          "Q3424461",
          "Q3453308",
          "Q3458498",
          "Q3458677",
          "Q3497210",
          "Q3497490",
          "Q3517860",
          "Q3518604",
          "Q3522305",
          "Q3532226",
          "Q3542384",
          "Q3549538",
          "Q3557786",
          "Q3557788",
          "Q3557789",
          "Q3563298",
          "Q3569407",
          "Q3592822",
          "Q3655248",
          "Q3697826",
          "Q3769828",
          "Q3791300",
          "Q3791346",
          "Q3822080",
          "Q3822355",
          "Q3828618",
          "Q3886715",
          "Q39058106",
          "Q3940338",
          "Q40860689",
          "Q41663473",
          "Q41793715",
          "Q4230753",
          "Q43336631",
          "Q43543759",
          "Q43563283",
          "Q43569582",
          "Q43569711",
          "Q435722",
          "Q44286429",
          "Q44286620",
          "Q44391460",
          "Q44391610",
          "Q44391758",
          "Q46480455",
          "Q46509775",
          "Q46520004",
          "Q4655391",
          "Q4657695",
          "Q4691060",
          "Q469889",
          "Q47005478",
          "Q471142",
          "Q4729609",
          "Q4791614",
          "Q48796217",
          "Q48813319",
          "Q490313",
          "Q4927917",
          "Q4957980",
          "Q5018114",
          "Q5036850",
          "Q5063196",
          "Q5123535",
          "Q5137866",
          "Q5174346",
          "Q51951960",
          "Q5223299",
          "Q52314160",
          "Q52315034",
          "Q5245254",
          "Q526802",
          "Q5278652",
          "Q5330486",
          "Q534975",
          "Q53679467",
          "Q5377672",
          "Q5416574",
          "Q5421917",
          "Q5422501",
          "Q5436486",
          "Q5441458",
          "Q5447634",
          "Q54488359",
          "Q54488510",
          "Q5451430",
          "Q5451502",
          "Q5458359",
          "Q5460012",
          "Q5463014",
          "Q5472993",
          "Q5482407",
          "Q548368",
          "Q55231789",
          "Q55608595",
          "Q5578532",
          "Q5599637",
          "Q56300945",
          "Q56303017",
          "Q56307799",
          "Q5636343",
          "Q5643614",
          "Q5645685",
          "Q5670736",
          "Q569790",
          "Q5767559",
          "Q583366",
          "Q5936015",
          "Q5967461",
          "Q5977633",
          "Q5998865",
          "Q6014063",
          "Q602216",
          "Q6035299",
          "Q60741201",
          "Q60749168",
          "Q60749323",
          "Q615035",
          "Q62113776",
          "Q62604562",
          "Q62625624",
          "Q62625842",
          "Q62698506",
          "Q63104549",
          "Q63105591",
          "Q63215133",
          "Q63677209",
          "Q65043785",
          "Q6510209",
          "Q65766594",
          "Q65766601",
          "Q65926496",
          "Q670552",
          "Q6749555",
          "Q676256",
          "Q6811186",
          "Q6907938",
          "Q6940441",
          "Q7011334",
          "Q7020012",
          "Q7076198",
          "Q7167995",
          "Q723020",
          "Q72819755",
          "Q7282724",
          "Q7301391",
          "Q7378920",
          "Q7426767",
          "Q7533267",
          "Q75454649",
          "Q7619030",
          "Q7701574",
          "Q7702704",
          "Q7713709",
          "Q7714842",
          "Q7732767",
          "Q7736902",
          "Q7754103",
          "Q7757367",
          "Q7760342",
          "Q7775193",
          "Q778638",
          "Q779016",
          "Q7800850",
          "Q7805574",
          "Q7833847",
          "Q7841736",
          "Q785354",
          "Q7883033",
          "Q7908040",
          "Q7920454",
          "Q7936915",
          "Q7960897",
          "Q7973042",
          "Q8031727",
          "Q8038655",
          "Q8069036",
          "Q8073247",
          "Q828031",
          "Q853427",
          "Q85795576",
          "Q864250",
          "Q880455",
          "Q88960404",
          "Q89096358",
          "Q89211750",
          "Q89671414",
          "Q89888024",
          "Q901913",
          "Q90986752",
          "Q90987189",
          "Q91101467",
          "Q91102067",
          "Q91102683",
          "Q91229166",
          "Q91295020",
          "Q91332037",
          "Q91332050",
          "Q91458",
          "Q91463306",
          "Q91463385",
          "Q9183865",
          "Q923111",
          "Q937944",
          "Q95047",
          "Q95057",
          "Q96409420",
          "Q97038682",
          "Q97968391",
          "Q99292818"
        ],
        "record_count": 40,
        "issue_facets": 104,
        "facet_count": 104,
        "selfcheck": {
          "date": "2026-10-04",
          "canonical_snapshot_sha256": "7daef102ef253260b7419bf68bfff76925b60e1c5e24d85f8e2e6d5c1c5dba71",
          "unique_ids": 40,
          "identity_exact_match": 40,
          "missing_at_check": 40,
          "only_three_fields": true,
          "legal_topics": true,
          "two_to_four_facets": true,
          "at_least_two_sentences": true,
          "concrete_facet_basis": true,
          "structural_validation_only": true
        },
        "source_reference_count": 47,
        "source_unique_urls": 47,
        "coverage_note": "40个本轮具体单卷／长篇实体：Weber单作及合著26，Asher14。实际阅读范围逐项标示，Heirs of Empire剧情为作品知识，书目页不作情节证明。仍有完整分片缺口，自然检查点不代表全面覆盖或原作核验。",
        "remaining_evidence_limits": [
          {
            "id": "Q105989561",
            "title": "Alien Archaeology",
            "reason": "实际作者微简介及2015访谈只支持Penny Royal为受雇完成复杂任务的角色、外星技术带来超预期后果；不足以可靠展开具体完整冲突，暂不补issue。",
            "actually_read_materials": [
              "https://www.nealasher.co.uk/short-stories/",
              "https://www.sffworld.com/2015/03/neal-asher-interview/"
            ]
          },
          {
            "id": "Q106430742",
            "title": "Softly Spoke the Gabbleduck",
            "reason": "实际作者微简介、合集宣传和检索所示公开开篇支持猎人与猎物、Tameera射杀sheq及异种神话，但没有阅读全文；未将合集一般特征或读者剧情概括当原作核验，暂保留缺口。",
            "actually_read_materials": [
              "https://www.nealasher.co.uk/short-stories/",
              "https://www.skyhorsepublishing.com/good-books/9781597805315/the-gabble/"
            ]
          }
        ]
      },
      "original_reading_log": null,
      "original_log_metadata": null,
      "original_counter_fields": {},
      "original_counter_presence": {
        "actual_search_count": false,
        "actual_query_count": false,
        "actual_open_count": false,
        "actual_open_attempt_count": false,
        "actual_content_source_read": false,
        "actual_search_performed": false,
        "original_full_text_read": false,
        "original_full_text_read_count": false,
        "original_fulltext_read_count": false
      },
      "original_cache_declarations": {},
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_archive": null,
      "original_ownership_index": null,
      "original_ownership_record": null,
      "original_prior_source_log_present": false,
      "prior_source_log": null,
      "preserved_source_search_log": {
        "input_file": "research/issue-source-searches.json",
        "log_date": "2026-10-04",
        "id": "Q5700973",
        "identity": {
          "title": "Heirs of Empire",
          "author": "David Weber"
        },
        "attempt_state": "content_material_read",
        "queries": [],
        "query_note": "仅保留实际保存的查询；没有保存的不补造，逐材料记录实际支持范围。",
        "materials_checked": [
          {
            "url": "https://www.simonandschuster.com/books/Heirs-of-Empire/Weber/9780671877071",
            "result": "actual_source_scope_read",
            "material_type": "出版方单书书目页",
            "reading_scope": "实际读取题名、作者、1996版与页数；无情节简介。Sean等剧情来自熟悉作品知识，保留待核，不能把此页当情节证据。",
            "read_date": "2026-10-04"
          }
        ],
        "reading_scope": "实际阅读出版方页面，仅支持Heirs of Empire单书身份、1996版本与页数；没有情节简介。上述Sean、被困禁技术社会与组织当地力量来自明确作品知识，本轮未读原文，不把单纯书目页面作为情节核验。",
        "reason_unconfirmed": "材料范围以外的具体作品知识和文学解释仍待独立核对。",
        "next_step": "按本条短篇、长篇、合集或系列的确切范围，逐项对照原作。",
        "issue_result": "added_to_private_round11_unverified",
        "raw_reading_log": {
          "id": "Q5700973",
          "identity": {
            "title": "Heirs of Empire",
            "author": "David Weber"
          },
          "sources": [
            {
              "url": "https://www.simonandschuster.com/books/Heirs-of-Empire/Weber/9780671877071",
              "material_kind": "出版方单书书目页",
              "support_scope": "实际读取题名、作者、1996版与页数；无情节简介。Sean等剧情来自熟悉作品知识，保留待核，不能把此页当情节证据。",
              "reading_status": "actually_read_support_scope_only"
            }
          ],
          "queries": [],
          "verification_status": "knowledge_added_unverified"
        },
        "attempt_input": "global-source-searches-round11.json"
      },
      "preserved_source_search_log_sha256": "4552e6cba74932b015e5f682ba4c88b47fd070eee1e7ec65d2b2ff97eb35eb51",
      "frozen_canonical_identity_scope": {
        "id": "Q5700973",
        "title_zh": "Heirs of Empire",
        "author": "David Weber",
        "form": "长篇（来源描述候选）",
        "forms": [
          "文学作品",
          "长篇（来源描述候选）"
        ],
        "source_entity_kind": "work_or_unspecified",
        "source_types": [
          {
            "id": "Q7725634",
            "label": "文学作品"
          }
        ]
      },
      "source_canonical_record_sha256": "6606d9e2a01b53085661c132a5c690a0dd01441b3a780bcb59321ab2908a475d",
      "source_canonical_snapshot_sha256": "7b4ac5886d4ff44d1f86d343c7213b8dc7027eacea4c85fddebcb7a5e64d8b8f",
      "spatial_selection_file": "work/evidence/early-published-spatial-expansion-selection7-checkpoint5.json",
      "spatial_selection_sha256": "17ba3a413420079dc0ef99dbf0bc75e133bec667f324f0859a75e2952c1bb734",
      "spatial_selection_index": 228,
      "new_actual_search_count": 0,
      "new_actual_open_count": 0,
      "new_core_count": 0,
      "new_full_original_read_count": 0,
      "independently_verified": false,
      "identity_caveat": null
    },
    "adapted_record": {
      "id": "Q5700973",
      "identity": {
        "title": "Heirs of Empire",
        "author": "David Weber"
      },
      "fields": {
        "spatial_primary": "planetary",
        "spatial_secondary": [],
        "spatial_rationale": "仅定位Heirs of Empire材料明确年轻人被困的远方行星及当地宗教、技术冲突；地球出身与返乡目标不当作这阶段实际地球行动。"
      },
      "field_notes": {
        "spatial_primary": "原Heirs of Empire分析与scope明确：Simon & Schuster页面仅支持书目身份、版本和页数，Sean所在禁技术行星剧情来自明确作品知识。空间依此准确既有知识补充待核，原出版URL和真实身份阅读范围保留，不作为独立地理资料；0本轮新查询/打开/全文/核验。",
        "spatial_secondary": "原Heirs of Empire分析与scope明确：Simon & Schuster页面仅支持书目身份、版本和页数，Sean所在禁技术行星剧情来自明确作品知识。空间依此准确既有知识补充待核，原出版URL和真实身份阅读范围保留，不作为独立地理资料；0本轮新查询/打开/全文/核验。",
        "spatial_rationale": "原Heirs of Empire分析与scope明确：Simon & Schuster页面仅支持书目身份、版本和页数，Sean所在禁技术行星剧情来自明确作品知识。空间依此准确既有知识补充待核，原出版URL和真实身份阅读范围保留，不作为独立地理资料；0本轮新查询/打开/全文/核验。"
      },
      "verification_status": "knowledge_added_unverified",
      "analysis_basis": "existing_knowledge_unverified",
      "spatial_basis_mode": "exact_existing_knowledge",
      "integration_relation": "published_core",
      "sources": [],
      "source_evidence": [
        {
          "url": "https://www.simonandschuster.com/books/Heirs-of-Empire/Weber/9780671877071",
          "type": "existing_knowledge_with_preserved_old_lookup",
          "support_scope": "仅定位Heirs of Empire材料明确年轻人被困的远方行星及当地宗教、技术冲突；地球出身与返乡目标不当作这阶段实际地球行动。",
          "original_support_scope": "实际阅读出版方页面，仅支持Heirs of Empire单书身份、1996版本与页数；没有情节简介。上述Sean、被困禁技术社会与组织当地力量来自明确作品知识，本轮未读原文，不把单纯书目页面作为情节核验。",
          "original_source_evidence": [],
          "new_read_performed": false,
          "supports_spatial_independently": false,
          "original_link_read_status": "identity_or_bibliographic_only_lookup"
        }
      ],
      "original_lookup_urls": [
        "https://www.simonandschuster.com/books/Heirs-of-Empire/Weber/9780671877071"
      ],
      "original_source_evidence": [],
      "source_scope": "实际阅读出版方页面，仅支持Heirs of Empire单书身份、1996版本与页数；没有情节简介。上述Sean、被困禁技术社会与组织当地力量来自明确作品知识，本轮未读原文，不把单纯书目页面作为情节核验。",
      "frozen_knowledge_reading_scope": null,
      "frozen_knowledge_issue_note": "作品知识与实际材料支持范围见source_scope，解释仍待原作核对。",
      "source_analysis_file": "issues-since-1980-round11.json",
      "source_analysis_archive": "research/issues-since-1980-round11.json",
      "source_analysis_sha256": "9ed8de4411b7bd487d659ae93666968950dcf9276e463dcba35be2e06a3e7e91",
      "source_analysis_record_sha256": "27e5dd916a97c3800da0290d1aecf21c8cdfe029e0c7edf81aded246301c303c",
      "source_core_assertion_file": "research/issues-since-1980-round11.json",
      "source_core_assertion_file_sha256": "9ed8de4411b7bd487d659ae93666968950dcf9276e463dcba35be2e06a3e7e91",
      "source_core_assertion_record_sha256": "384543167b4617a347be28ad74c5c0e3d7e099b02ba289ef37fa24eccada8372",
      "source_log_file": null,
      "source_log_archive": null,
      "source_log_sha256": null,
      "source_log_record_sha256": null,
      "original_analysis_record": {
        "id": "Q5700973",
        "identity": {
          "title": "Heirs of Empire",
          "author": "David Weber"
        },
        "fields": {
          "topics": [
            "知识与认识",
            "权力与制度",
            "技术与责任"
          ],
          "issue": "Sean等年轻人因阴谋远离地球并被困在禁止技术的宗教社会，必须以残存知识和有限物资争取当地人的信任，借社会与军事变化找到生存和返回的可能。小说把外来者的技术优势同当地人的信仰与政治选择并置，追问解除禁令是否足以使干预正当，以及背负帝国继承身份的人怎样避免把别人的世界仅当作返乡工具。",
          "issue_facets": [
            {
              "label": "禁技术权威与外来知识",
              "question": "少数外来者利用知识改变当地力量关系时，怎样同时承认当地人的行动资格？",
              "basis": "被困的年轻人面对压制技术的宗教统治，以有限装备和所知技术组织当地力量。"
            },
            {
              "label": "返乡目标与介入责任",
              "question": "为自己的生存和返乡改变他国社会，必须向受到改变的人承担什么责任？",
              "basis": "Sean等人必须在远离地球的世界求生，脱困计划却涉及当地政治与战争。"
            }
          ]
        },
        "field_notes": {
          "topics": "按该文本具体设定选择，不按作者或系列主题继承。",
          "issue": "作品知识与实际材料支持范围见source_scope，解释仍待原作核对。",
          "issue_facets": "来源只支持书目或版本时明说；不视为情节独立核验。",
          "entity_identity": "以底库单卷实体为单位，保留版本、原作与扩写边界。",
          "source_scope": "实际阅读出版方页面，仅支持Heirs of Empire单书身份、1996版本与页数；没有情节简介。上述Sean、被困禁技术社会与组织当地力量来自明确作品知识，本轮未读原文，不把单纯书目页面作为情节核验。"
        },
        "verification_status": "knowledge_added_unverified",
        "sources": [
          "https://www.simonandschuster.com/books/Heirs-of-Empire/Weber/9780671877071"
        ]
      },
      "original_analysis_metadata": {
        "status": "frozen_checkpoint",
        "date": "2026-10-04",
        "scope": "sort_year >= 1980 与日期未知、当前底库缺 issue 的具体熟悉实体；只补 topics/issue/issue_facets。",
        "method": "具体作品知识与实际原文、作者、出版方简介阅读；解释性补充逐条保留待核标注，来源支持范围明确。",
        "verification": "knowledge_added_unverified，字段自检不等于原作或独立书目核验。",
        "source_snapshot": "research/canonical-universe.json.gz",
        "source_snapshot_sha256": "85b347dc1ad872c7ec6b9a4d5cc5a5088ea48b0bbd78d180ee71c822c9279dcc",
        "preceding_checkpoint": {
          "file": "work/evidence/global-round10.json",
          "sha256": "84c4b863b0083bf19064d76dc00820336ab3c02a41450cbd9de8d7ee3ca7046b",
          "record_count": 40
        },
        "skip_previous_ids": [
          "Q100427780",
          "Q103898910",
          "Q1047909",
          "Q104814854",
          "Q104848710",
          "Q1068060",
          "Q1068344",
          "Q107213370",
          "Q107610330",
          "Q107970380",
          "Q108456731",
          "Q10855967",
          "Q109284514",
          "Q109525662",
          "Q109525712",
          "Q109661040",
          "Q1099716",
          "Q110825800",
          "Q111027604",
          "Q11395416",
          "Q11517193",
          "Q11602397",
          "Q1171420",
          "Q11859725",
          "Q1189364",
          "Q122425801",
          "Q122425845",
          "Q123521600",
          "Q124021681",
          "Q1256948",
          "Q125740678",
          "Q125924434",
          "Q128035050",
          "Q128506",
          "Q130284308",
          "Q131007242",
          "Q131314393",
          "Q131375511",
          "Q131381177",
          "Q131381266",
          "Q131381611",
          "Q131381613",
          "Q131381664",
          "Q131381668",
          "Q131382098",
          "Q131382099",
          "Q131382115",
          "Q131382135",
          "Q131382162",
          "Q131382196",
          "Q131382278",
          "Q131382376",
          "Q131382806",
          "Q131382813",
          "Q131382870",
          "Q131382888",
          "Q131382891",
          "Q131382897",
          "Q131382898",
          "Q131382911",
          "Q131382913",
          "Q131382915",
          "Q131471710",
          "Q131471753",
          "Q131472518",
          "Q131517621",
          "Q131517780",
          "Q131517783",
          "Q131517788",
          "Q131517790",
          "Q131717412",
          "Q1321644",
          "Q134731854",
          "Q135088692",
          "Q13512122",
          "Q13512152",
          "Q13581036",
          "Q135925979",
          "Q136417279",
          "Q1431808",
          "Q1472204",
          "Q15034603",
          "Q15035002",
          "Q15035025",
          "Q15035525",
          "Q15035527",
          "Q15096441",
          "Q151337",
          "Q15987819",
          "Q1617340",
          "Q16258116",
          "Q16271779",
          "Q1627253",
          "Q1637730",
          "Q1637738",
          "Q16651302",
          "Q16654854",
          "Q17008262",
          "Q17016080",
          "Q17071479",
          "Q1708598",
          "Q17182944",
          "Q1748402",
          "Q1757054",
          "Q17625679",
          "Q18289389",
          "Q18289391",
          "Q18389116",
          "Q18391798",
          "Q18620356",
          "Q19263901",
          "Q196151",
          "Q19892923",
          "Q2017025",
          "Q20604151",
          "Q2071504",
          "Q212194",
          "Q21558225",
          "Q22247892",
          "Q2240456",
          "Q2252121",
          "Q2253255",
          "Q2269230",
          "Q2297804",
          "Q2319431",
          "Q23307323",
          "Q2346621",
          "Q2357633",
          "Q2362526",
          "Q2377147",
          "Q24037175",
          "Q2419894",
          "Q2421826",
          "Q24255710",
          "Q24255737",
          "Q2439089",
          "Q247364",
          "Q2521688",
          "Q25217435",
          "Q2525080",
          "Q25389538",
          "Q25551",
          "Q2627586",
          "Q2656138",
          "Q2699842",
          "Q2703898",
          "Q2705377",
          "Q2725656",
          "Q2759020",
          "Q27916566",
          "Q27956412",
          "Q27976003",
          "Q27976114",
          "Q28682687",
          "Q28683258",
          "Q2870331",
          "Q2873157",
          "Q2874783",
          "Q2884527",
          "Q2906615",
          "Q2933712",
          "Q29918076",
          "Q29918133",
          "Q29994368",
          "Q3001930",
          "Q3005722",
          "Q3006304",
          "Q3016630",
          "Q3026086",
          "Q3026093",
          "Q3038780",
          "Q3040928",
          "Q3045861",
          "Q3053590",
          "Q30598023",
          "Q30601997",
          "Q3062494",
          "Q3075680",
          "Q30887961",
          "Q3088925",
          "Q3090152",
          "Q3116252",
          "Q3144233",
          "Q3149116",
          "Q3149129",
          "Q3157174",
          "Q3201692",
          "Q3203122",
          "Q3204498",
          "Q3205133",
          "Q3205332",
          "Q3207891",
          "Q3208305",
          "Q3209796",
          "Q3209843",
          "Q3210024",
          "Q3212201",
          "Q3213998",
          "Q3222317",
          "Q3223851",
          "Q3231336",
          "Q3232671",
          "Q3232800",
          "Q3233818",
          "Q3233920",
          "Q3297215",
          "Q3305528",
          "Q3316723",
          "Q3330947",
          "Q3335725",
          "Q3373093",
          "Q337347",
          "Q3375455",
          "Q3390937",
          "Q3400447",
          "Q3412966",
          "Q3416949",
          "Q3424461",
          "Q3453308",
          "Q3458498",
          "Q3458677",
          "Q3497210",
          "Q3497490",
          "Q3517860",
          "Q3518604",
          "Q3522305",
          "Q3532226",
          "Q3542384",
          "Q3549538",
          "Q3557786",
          "Q3557788",
          "Q3557789",
          "Q3563298",
          "Q3569407",
          "Q3592822",
          "Q3655248",
          "Q3697826",
          "Q3769828",
          "Q3791300",
          "Q3791346",
          "Q3822080",
          "Q3822355",
          "Q3828618",
          "Q3886715",
          "Q39058106",
          "Q3940338",
          "Q40860689",
          "Q41663473",
          "Q41793715",
          "Q4230753",
          "Q43336631",
          "Q43543759",
          "Q43563283",
          "Q43569582",
          "Q43569711",
          "Q435722",
          "Q44286429",
          "Q44286620",
          "Q44391460",
          "Q44391610",
          "Q44391758",
          "Q46480455",
          "Q46509775",
          "Q46520004",
          "Q4655391",
          "Q4657695",
          "Q4691060",
          "Q469889",
          "Q47005478",
          "Q471142",
          "Q4729609",
          "Q4791614",
          "Q48796217",
          "Q48813319",
          "Q490313",
          "Q4927917",
          "Q4957980",
          "Q5018114",
          "Q5036850",
          "Q5063196",
          "Q5123535",
          "Q5137866",
          "Q5174346",
          "Q51951960",
          "Q5223299",
          "Q52314160",
          "Q52315034",
          "Q5245254",
          "Q526802",
          "Q5278652",
          "Q5330486",
          "Q534975",
          "Q53679467",
          "Q5377672",
          "Q5416574",
          "Q5421917",
          "Q5422501",
          "Q5436486",
          "Q5441458",
          "Q5447634",
          "Q54488359",
          "Q54488510",
          "Q5451430",
          "Q5451502",
          "Q5458359",
          "Q5460012",
          "Q5463014",
          "Q5472993",
          "Q5482407",
          "Q548368",
          "Q55231789",
          "Q55608595",
          "Q5578532",
          "Q5599637",
          "Q56300945",
          "Q56303017",
          "Q56307799",
          "Q5636343",
          "Q5643614",
          "Q5645685",
          "Q5670736",
          "Q569790",
          "Q5767559",
          "Q583366",
          "Q5936015",
          "Q5967461",
          "Q5977633",
          "Q5998865",
          "Q6014063",
          "Q602216",
          "Q6035299",
          "Q60741201",
          "Q60749168",
          "Q60749323",
          "Q615035",
          "Q62113776",
          "Q62604562",
          "Q62625624",
          "Q62625842",
          "Q62698506",
          "Q63104549",
          "Q63105591",
          "Q63215133",
          "Q63677209",
          "Q65043785",
          "Q6510209",
          "Q65766594",
          "Q65766601",
          "Q65926496",
          "Q670552",
          "Q6749555",
          "Q676256",
          "Q6811186",
          "Q6907938",
          "Q6940441",
          "Q7011334",
          "Q7020012",
          "Q7076198",
          "Q7167995",
          "Q723020",
          "Q72819755",
          "Q7282724",
          "Q7301391",
          "Q7378920",
          "Q7426767",
          "Q7533267",
          "Q75454649",
          "Q7619030",
          "Q7701574",
          "Q7702704",
          "Q7713709",
          "Q7714842",
          "Q7732767",
          "Q7736902",
          "Q7754103",
          "Q7757367",
          "Q7760342",
          "Q7775193",
          "Q778638",
          "Q779016",
          "Q7800850",
          "Q7805574",
          "Q7833847",
          "Q7841736",
          "Q785354",
          "Q7883033",
          "Q7908040",
          "Q7920454",
          "Q7936915",
          "Q7960897",
          "Q7973042",
          "Q8031727",
          "Q8038655",
          "Q8069036",
          "Q8073247",
          "Q828031",
          "Q853427",
          "Q85795576",
          "Q864250",
          "Q880455",
          "Q88960404",
          "Q89096358",
          "Q89211750",
          "Q89671414",
          "Q89888024",
          "Q901913",
          "Q90986752",
          "Q90987189",
          "Q91101467",
          "Q91102067",
          "Q91102683",
          "Q91229166",
          "Q91295020",
          "Q91332037",
          "Q91332050",
          "Q91458",
          "Q91463306",
          "Q91463385",
          "Q9183865",
          "Q923111",
          "Q937944",
          "Q95047",
          "Q95057",
          "Q96409420",
          "Q97038682",
          "Q97968391",
          "Q99292818"
        ],
        "record_count": 40,
        "issue_facets": 104,
        "facet_count": 104,
        "selfcheck": {
          "date": "2026-10-04",
          "canonical_snapshot_sha256": "7daef102ef253260b7419bf68bfff76925b60e1c5e24d85f8e2e6d5c1c5dba71",
          "unique_ids": 40,
          "identity_exact_match": 40,
          "missing_at_check": 40,
          "only_three_fields": true,
          "legal_topics": true,
          "two_to_four_facets": true,
          "at_least_two_sentences": true,
          "concrete_facet_basis": true,
          "structural_validation_only": true
        },
        "source_reference_count": 47,
        "source_unique_urls": 47,
        "coverage_note": "40个本轮具体单卷／长篇实体：Weber单作及合著26，Asher14。实际阅读范围逐项标示，Heirs of Empire剧情为作品知识，书目页不作情节证明。仍有完整分片缺口，自然检查点不代表全面覆盖或原作核验。",
        "remaining_evidence_limits": [
          {
            "id": "Q105989561",
            "title": "Alien Archaeology",
            "reason": "实际作者微简介及2015访谈只支持Penny Royal为受雇完成复杂任务的角色、外星技术带来超预期后果；不足以可靠展开具体完整冲突，暂不补issue。",
            "actually_read_materials": [
              "https://www.nealasher.co.uk/short-stories/",
              "https://www.sffworld.com/2015/03/neal-asher-interview/"
            ]
          },
          {
            "id": "Q106430742",
            "title": "Softly Spoke the Gabbleduck",
            "reason": "实际作者微简介、合集宣传和检索所示公开开篇支持猎人与猎物、Tameera射杀sheq及异种神话，但没有阅读全文；未将合集一般特征或读者剧情概括当原作核验，暂保留缺口。",
            "actually_read_materials": [
              "https://www.nealasher.co.uk/short-stories/",
              "https://www.skyhorsepublishing.com/good-books/9781597805315/the-gabble/"
            ]
          }
        ]
      },
      "original_reading_log": null,
      "original_log_metadata": null,
      "original_counter_fields": {},
      "original_counter_presence": {
        "actual_search_count": false,
        "actual_query_count": false,
        "actual_open_count": false,
        "actual_open_attempt_count": false,
        "actual_content_source_read": false,
        "actual_search_performed": false,
        "original_full_text_read": false,
        "original_full_text_read_count": false,
        "original_fulltext_read_count": false
      },
      "original_cache_declarations": {},
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_archive": null,
      "original_ownership_index": null,
      "original_ownership_record": null,
      "original_prior_source_log_present": false,
      "prior_source_log": null,
      "preserved_source_search_log": {
        "input_file": "research/issue-source-searches.json",
        "log_date": "2026-10-04",
        "id": "Q5700973",
        "identity": {
          "title": "Heirs of Empire",
          "author": "David Weber"
        },
        "attempt_state": "content_material_read",
        "queries": [],
        "query_note": "仅保留实际保存的查询；没有保存的不补造，逐材料记录实际支持范围。",
        "materials_checked": [
          {
            "url": "https://www.simonandschuster.com/books/Heirs-of-Empire/Weber/9780671877071",
            "result": "actual_source_scope_read",
            "material_type": "出版方单书书目页",
            "reading_scope": "实际读取题名、作者、1996版与页数；无情节简介。Sean等剧情来自熟悉作品知识，保留待核，不能把此页当情节证据。",
            "read_date": "2026-10-04"
          }
        ],
        "reading_scope": "实际阅读出版方页面，仅支持Heirs of Empire单书身份、1996版本与页数；没有情节简介。上述Sean、被困禁技术社会与组织当地力量来自明确作品知识，本轮未读原文，不把单纯书目页面作为情节核验。",
        "reason_unconfirmed": "材料范围以外的具体作品知识和文学解释仍待独立核对。",
        "next_step": "按本条短篇、长篇、合集或系列的确切范围，逐项对照原作。",
        "issue_result": "added_to_private_round11_unverified",
        "raw_reading_log": {
          "id": "Q5700973",
          "identity": {
            "title": "Heirs of Empire",
            "author": "David Weber"
          },
          "sources": [
            {
              "url": "https://www.simonandschuster.com/books/Heirs-of-Empire/Weber/9780671877071",
              "material_kind": "出版方单书书目页",
              "support_scope": "实际读取题名、作者、1996版与页数；无情节简介。Sean等剧情来自熟悉作品知识，保留待核，不能把此页当情节证据。",
              "reading_status": "actually_read_support_scope_only"
            }
          ],
          "queries": [],
          "verification_status": "knowledge_added_unverified"
        },
        "attempt_input": "global-source-searches-round11.json"
      },
      "preserved_source_search_log_sha256": "4552e6cba74932b015e5f682ba4c88b47fd070eee1e7ec65d2b2ff97eb35eb51",
      "frozen_canonical_identity_scope": {
        "id": "Q5700973",
        "title_zh": "Heirs of Empire",
        "author": "David Weber",
        "form": "长篇（来源描述候选）",
        "forms": [
          "文学作品",
          "长篇（来源描述候选）"
        ],
        "source_entity_kind": "work_or_unspecified",
        "source_types": [
          {
            "id": "Q7725634",
            "label": "文学作品"
          }
        ]
      },
      "source_canonical_record_sha256": "6606d9e2a01b53085661c132a5c690a0dd01441b3a780bcb59321ab2908a475d",
      "source_canonical_snapshot_sha256": "7b4ac5886d4ff44d1f86d343c7213b8dc7027eacea4c85fddebcb7a5e64d8b8f",
      "spatial_selection_file": "work/evidence/early-published-spatial-expansion-selection7-checkpoint5.json",
      "spatial_selection_sha256": "17ba3a413420079dc0ef99dbf0bc75e133bec667f324f0859a75e2952c1bb734",
      "spatial_selection_index": 228,
      "new_actual_search_count": 0,
      "new_actual_open_count": 0,
      "new_core_count": 0,
      "new_full_original_read_count": 0,
      "independently_verified": false,
      "identity_caveat": null
    },
    "adapted_record_sha256": "57fd6f97bf5337dae024a9923c1b740da8d092f952b49b51c05cab13e093c3c9",
    "reason": "原Heirs of Empire分析与scope明确：Simon & Schuster页面仅支持书目身份、版本和页数，Sean所在禁技术行星剧情来自明确作品知识。空间依此准确既有知识补充待核，原出版URL和真实身份阅读范围保留，不作为独立地理资料；0本轮新查询/打开/全文/核验。"
  }
});
const FIXED_ADAPTER_BY_ID=Object.freeze({
  "Q7679252": "early-published-spatial-selection7-member-source-role-adapter-v1.json",
  "Q5305569": "early-published-spatial-selection7-additional-source-role-adapter-v1.json",
  "Q5700973": "early-published-spatial-selection7-additional-source-role-adapter-v1.json"
});
const FIXED_IDENTITY_ALIASES=Object.freeze({
  "Q137806760": {
    "same_exact_id": true,
    "source_declared_title": "Annihilation",
    "source_index_title_en": null,
    "canonical_display_title": "Annihilation"
  },
  "Q134098155": {
    "same_exact_id": true,
    "source_declared_title": "Moonstorm",
    "source_index_title_en": "Moonstorm",
    "canonical_display_title": "Moonstorm"
  },
  "Q136452465": {
    "same_exact_id": true,
    "source_declared_title": "In the Belly of the Whale",
    "source_index_title_en": "In the Belly of the Whale",
    "canonical_display_title": "In the Belly of the Whale"
  },
  "Q113214640": {
    "same_exact_id": true,
    "source_declared_title": "Il sangue delle madri",
    "source_index_title_en": null,
    "canonical_display_title": "Il sangue delle madri"
  },
  "Q137003729": {
    "same_exact_id": true,
    "source_declared_title": "Proies et prédateurs",
    "source_index_title_en": null,
    "canonical_display_title": "Proies et prédateurs"
  },
  "Q131445223": {
    "same_exact_id": true,
    "source_declared_title": "The All-Consuming World",
    "source_index_title_en": "The All-Consuming World",
    "canonical_display_title": "The All-Consuming World"
  },
  "Q135206358": {
    "same_exact_id": true,
    "source_declared_title": "The Equations of the Dead",
    "source_index_title_en": "The Equations of the Dead",
    "canonical_display_title": "The Equations of the Dead"
  },
  "Q55230555": {
    "same_exact_id": true,
    "source_declared_title": "To Lose the Earth",
    "source_index_title_en": "To Lose the Earth",
    "canonical_display_title": "To Lose the Earth"
  },
  "Q102076238": {
    "same_exact_id": true,
    "source_declared_title": "Voces en la ribera del mundo",
    "source_index_title_en": "Voces en la ribera del mundo",
    "canonical_display_title": "Voces en la ribera del mundo"
  },
  "Q134529150": {
    "same_exact_id": true,
    "source_declared_title": "Dandelion",
    "source_index_title_en": null,
    "canonical_display_title": "Dandelion"
  },
  "Q139881240": {
    "same_exact_id": true,
    "source_declared_title": "Renegades",
    "source_index_title_en": "Renegades",
    "canonical_display_title": "Renegades"
  },
  "Q62698506": {
    "same_exact_id": true,
    "source_declared_title": "Record of a Spaceborn Few",
    "source_index_title_en": "Record of a Spaceborn Few",
    "canonical_display_title": "Record of a Spaceborn Few"
  },
  "Q133306305": {
    "same_exact_id": true,
    "source_declared_title": "All These Worlds",
    "source_index_title_en": "All These Worlds",
    "canonical_display_title": "All These Worlds"
  },
  "Q139881238": {
    "same_exact_id": true,
    "source_declared_title": "Zero Hour",
    "source_index_title_en": "Zero Hour",
    "canonical_display_title": "Zero Hour"
  },
  "Q137874076": {
    "same_exact_id": true,
    "source_declared_title": "Shangri-La",
    "source_index_title_en": null,
    "canonical_display_title": "Shangri-La"
  },
  "Q139881234": {
    "same_exact_id": true,
    "source_declared_title": "Paradise",
    "source_index_title_en": "Paradise",
    "canonical_display_title": "Paradise"
  },
  "Q24034555": {
    "same_exact_id": true,
    "source_declared_title": "The Long Cosmos",
    "source_index_title_en": "The Long Cosmos",
    "canonical_display_title": "The Long Cosmos"
  },
  "Q110276832": {
    "same_exact_id": true,
    "source_declared_title": "Descender #4",
    "source_index_title_en": "Descender #4",
    "canonical_display_title": "Descender #4"
  },
  "Q125458800": {
    "same_exact_id": true,
    "source_declared_title": "The Fury of Rachel Monette",
    "source_index_title_en": "The Fury of Rachel Monette",
    "canonical_display_title": "The Fury of Rachel Monette"
  },
  "Q134715513": {
    "same_exact_id": true,
    "source_declared_title": "Damage",
    "source_index_title_en": "Damage",
    "canonical_display_title": "Damage"
  },
  "Q19263901": {
    "same_exact_id": true,
    "source_declared_title": "Poseidon's Wake",
    "source_index_title_en": "Poseidon's Wake",
    "canonical_display_title": "Poseidon's Wake"
  },
  "Q21893609": {
    "same_exact_id": true,
    "source_declared_title": "New Blood",
    "source_index_title_en": "New Blood",
    "canonical_display_title": "New Blood"
  },
  "Q54807336": {
    "same_exact_id": true,
    "source_declared_title": "The Autobiography of James T. Kirk",
    "source_index_title_en": "The Autobiography of James T. Kirk",
    "canonical_display_title": "The Autobiography of James T. Kirk"
  },
  "Q21512452": {
    "same_exact_id": true,
    "source_declared_title": "Mortal Dictata",
    "source_index_title_en": "Mortal Dictata",
    "canonical_display_title": "Mortal Dictata"
  },
  "Q55230372": {
    "same_exact_id": true,
    "source_declared_title": "Disavowed",
    "source_index_title_en": "Disavowed",
    "canonical_display_title": "Disavowed"
  },
  "Q131382269": {
    "same_exact_id": true,
    "source_declared_title": "Trade Secret",
    "source_index_title_en": "Trade Secret",
    "canonical_display_title": "Trade Secret"
  },
  "Q133445347": {
    "same_exact_id": true,
    "source_declared_title": "Tales From the Clarke",
    "source_index_title_en": "Tales From the Clarke",
    "canonical_display_title": "Tales From the Clarke"
  },
  "Q133445431": {
    "same_exact_id": true,
    "source_declared_title": "The Observers",
    "source_index_title_en": "The Observers",
    "canonical_display_title": "The Observers"
  },
  "Q114414730": {
    "same_exact_id": true,
    "source_declared_title": "On a Red Station, Drifting",
    "source_index_title_en": "On a Red Station, Drifting",
    "canonical_display_title": "On a Red Station, Drifting"
  },
  "Q137824848": {
    "same_exact_id": true,
    "source_declared_title": "Opération suicide",
    "source_index_title_en": null,
    "canonical_display_title": "Opération suicide"
  },
  "Q16608557": {
    "same_exact_id": true,
    "source_declared_title": "Annihilation",
    "source_index_title_en": "Annihilation",
    "canonical_display_title": "Annihilation"
  },
  "Q108912961": {
    "same_exact_id": true,
    "source_declared_title": "Mobile Suit Gundam AGE: First Evolution",
    "source_index_title_en": "Mobile Suit Gundam AGE: First Evolution",
    "canonical_display_title": "Mobile Suit Gundam AGE: First Evolution"
  },
  "Q134720546": {
    "same_exact_id": true,
    "source_declared_title": "A Soldier's Duty",
    "source_index_title_en": "A Soldier's Duty",
    "canonical_display_title": "A Soldier's Duty"
  },
  "Q15221218": {
    "same_exact_id": true,
    "source_declared_title": "Firebird",
    "source_index_title_en": "Firebird",
    "canonical_display_title": "Firebird"
  },
  "Q16010795": {
    "same_exact_id": true,
    "source_declared_title": "Ascension",
    "source_index_title_en": "Ascension",
    "canonical_display_title": "Ascension"
  },
  "Q16646479": {
    "same_exact_id": true,
    "source_declared_title": "Conviction",
    "source_index_title_en": "Conviction",
    "canonical_display_title": "Conviction"
  },
  "Q3563140": {
    "same_exact_id": true,
    "source_declared_title": "时间漩涡",
    "source_index_title_en": "Vortex",
    "canonical_display_title": "时间漩涡"
  },
  "Q54802746": {
    "same_exact_id": true,
    "source_declared_title": "To Brave the Storm",
    "source_index_title_en": "To Brave the Storm",
    "canonical_display_title": "To Brave the Storm"
  },
  "Q2391923": {
    "same_exact_id": true,
    "source_declared_title": "The Coming of the Terraphiles",
    "source_index_title_en": "The Coming of the Terraphiles",
    "canonical_display_title": "The Coming of the Terraphiles"
  },
  "Q2509857": {
    "same_exact_id": true,
    "source_declared_title": "Mass Effect: Retribution",
    "source_index_title_en": "Mass Effect: Retribution",
    "canonical_display_title": "质量效应：报应"
  },
  "Q7736686": {
    "same_exact_id": true,
    "source_declared_title": "The Glamour Chase",
    "source_index_title_en": "The Glamour Chase",
    "canonical_display_title": "The Glamour Chase"
  },
  "Q108535556": {
    "same_exact_id": true,
    "source_declared_title": "Kur of Gor",
    "source_index_title_en": "Kur of Gor",
    "canonical_display_title": "Kur of Gor"
  },
  "Q131472325": {
    "same_exact_id": true,
    "source_declared_title": "Utriusque Cosmi",
    "source_index_title_en": "Utriusque Cosmi",
    "canonical_display_title": "Utriusque Cosmi"
  },
  "Q135094390": {
    "same_exact_id": true,
    "source_declared_title": "Trips: 1972-73",
    "source_index_title_en": "Trips: 1972-73",
    "canonical_display_title": "Trips: 1972-73"
  },
  "Q16671459": {
    "same_exact_id": true,
    "source_declared_title": "Omen",
    "source_index_title_en": "Omen",
    "canonical_display_title": "Omen"
  },
  "Q7100133": {
    "same_exact_id": true,
    "source_declared_title": "Orbus",
    "source_index_title_en": "Orbus",
    "canonical_display_title": "Orbus"
  },
  "Q7770704": {
    "same_exact_id": true,
    "source_declared_title": "The Tuloriad",
    "source_index_title_en": "The Tuloriad",
    "canonical_display_title": "The Tuloriad"
  },
  "Q27976097": {
    "same_exact_id": true,
    "source_declared_title": "The Spacetime Pool",
    "source_index_title_en": "The Spacetime Pool",
    "canonical_display_title": "The Spacetime Pool"
  },
  "Q6061022": {
    "same_exact_id": true,
    "source_declared_title": "Invincible",
    "source_index_title_en": "Invincible",
    "canonical_display_title": "Invincible"
  },
  "Q6304848": {
    "same_exact_id": true,
    "source_declared_title": "Juggler of Worlds",
    "source_index_title_en": "Juggler of Worlds",
    "canonical_display_title": "Juggler of Worlds"
  },
  "Q131382101": {
    "same_exact_id": true,
    "source_declared_title": "The January Dancer",
    "source_index_title_en": "The January Dancer",
    "canonical_display_title": "The January Dancer"
  },
  "Q10566247": {
    "same_exact_id": true,
    "source_declared_title": "飛越顛峰Next Generation",
    "source_index_title_en": "Top o Nerae! Next Generation",
    "canonical_display_title": "飛越顛峰Next Generation"
  },
  "Q133801718": {
    "same_exact_id": true,
    "source_declared_title": "Les Chevaliers Trinitaires",
    "source_index_title_en": null,
    "canonical_display_title": "Les Chevaliers Trinitaires"
  },
  "Q55230504": {
    "same_exact_id": true,
    "source_declared_title": "The Buried Age",
    "source_index_title_en": "The Buried Age",
    "canonical_display_title": "The Buried Age"
  },
  "Q6029515": {
    "same_exact_id": true,
    "source_declared_title": "Inferno",
    "source_index_title_en": "Inferno",
    "canonical_display_title": "Inferno"
  },
  "Q6322734": {
    "same_exact_id": true,
    "source_declared_title": "異星來客四：來自星座萊拉的新訪客",
    "source_index_title_en": "K-PAX IV: A New Visitor from the Constellation Lyra",
    "canonical_display_title": "異星來客四：來自星座萊拉的新訪客"
  },
  "Q7577520": {
    "same_exact_id": true,
    "source_declared_title": "Spindrift",
    "source_index_title_en": "Spindrift",
    "canonical_display_title": "Spindrift"
  },
  "Q7578576": {
    "same_exact_id": true,
    "source_declared_title": "Splinter",
    "source_index_title_en": "Splinter",
    "canonical_display_title": "Splinter"
  },
  "Q16573425": {
    "same_exact_id": true,
    "source_declared_title": "Flaming London",
    "source_index_title_en": "Flaming London",
    "canonical_display_title": "Flaming London"
  },
  "Q55230385": {
    "same_exact_id": true,
    "source_declared_title": "Evolution",
    "source_index_title_en": "Evolution",
    "canonical_display_title": "Evolution"
  },
  "Q7776565": {
    "same_exact_id": true,
    "source_declared_title": "The Year's Best Science Fiction: Twenty-Third Annual Collection",
    "source_index_title_en": "The Year's Best Science Fiction: Twenty-Third Annual Collection",
    "canonical_display_title": "The Year's Best Science Fiction: Twenty-Third Annual Collection"
  },
  "Q106371425": {
    "same_exact_id": true,
    "source_declared_title": "A Case of Consilience",
    "source_index_title_en": "A Case of Consilience",
    "canonical_display_title": "A Case of Consilience"
  },
  "Q26995822": {
    "same_exact_id": true,
    "source_declared_title": "Aliens: Original Sin",
    "source_index_title_en": "Aliens: Original Sin",
    "canonical_display_title": "Aliens: Original Sin"
  },
  "Q3212482": {
    "same_exact_id": true,
    "source_declared_title": "The Road to Dune",
    "source_index_title_en": "The Road to Dune",
    "canonical_display_title": "The Road to Dune"
  },
  "Q48814849": {
    "same_exact_id": true,
    "source_declared_title": "The Rocket Company",
    "source_index_title_en": "The Rocket Company",
    "canonical_display_title": "The Rocket Company"
  },
  "Q6798449": {
    "same_exact_id": true,
    "source_declared_title": "Mazer in Prison",
    "source_index_title_en": "Mazer in Prison",
    "canonical_display_title": "Mazer in Prison"
  },
  "Q131308078": {
    "same_exact_id": true,
    "source_declared_title": "A Princess of Earth",
    "source_index_title_en": "A Princess of Earth",
    "canonical_display_title": "A Princess of Earth"
  },
  "Q131381573": {
    "same_exact_id": true,
    "source_declared_title": "Frek and the Elixir",
    "source_index_title_en": "Frek and the Elixir",
    "canonical_display_title": "Frek and the Elixir"
  },
  "Q131381598": {
    "same_exact_id": true,
    "source_declared_title": "Stamping Butterflies",
    "source_index_title_en": "Stamping Butterflies",
    "canonical_display_title": "Stamping Butterflies"
  },
  "Q133873710": {
    "same_exact_id": true,
    "source_declared_title": "Les Gardiens d'Aleph-Deux",
    "source_index_title_en": null,
    "canonical_display_title": "Les Gardiens d'Aleph-Deux"
  },
  "Q1748402": {
    "same_exact_id": true,
    "source_declared_title": "鋼鐵議會",
    "source_index_title_en": "Iron Council",
    "canonical_display_title": "鋼鐵議會"
  },
  "Q5063196": {
    "same_exact_id": true,
    "source_declared_title": "Century Rain",
    "source_index_title_en": "Century Rain",
    "canonical_display_title": "Century Rain"
  },
  "Q55230380": {
    "same_exact_id": true,
    "source_declared_title": "Enigma",
    "source_index_title_en": "Enigma",
    "canonical_display_title": "Enigma"
  },
  "Q5694612": {
    "same_exact_id": true,
    "source_declared_title": "Heaven",
    "source_index_title_en": "Heaven",
    "canonical_display_title": "Heaven"
  },
  "Q7733264": {
    "same_exact_id": true,
    "source_declared_title": "The False Peace",
    "source_index_title_en": "The False Peace",
    "canonical_display_title": "The False Peace"
  },
  "Q11122092": {
    "same_exact_id": true,
    "source_declared_title": "機動戰士海盜GUNDAM~骷髏之心~",
    "source_index_title_en": "Mobile Suit Crossbone Gundam: Skull Heart",
    "canonical_display_title": "機動戰士海盜GUNDAM~骷髏之心~"
  },
  "Q122058672": {
    "same_exact_id": true,
    "source_declared_title": "La Cage de Londres",
    "source_index_title_en": null,
    "canonical_display_title": "La Cage de Londres"
  },
  "Q131461766": {
    "same_exact_id": true,
    "source_declared_title": "Off on a Starship",
    "source_index_title_en": "Off on a Starship",
    "canonical_display_title": "Off on a Starship"
  },
  "Q134608990": {
    "same_exact_id": true,
    "source_declared_title": "Le dragon aux plumes de sang",
    "source_index_title_en": null,
    "canonical_display_title": "Le dragon aux plumes de sang"
  },
  "Q3235224": {
    "same_exact_id": true,
    "source_declared_title": "Force Heretic: Refugee",
    "source_index_title_en": "Force Heretic: Refugee",
    "canonical_display_title": "Force Heretic: Refugee"
  },
  "Q7732587": {
    "same_exact_id": true,
    "source_declared_title": "The Ethos Effect",
    "source_index_title_en": "The Ethos Effect",
    "canonical_display_title": "The Ethos Effect"
  },
  "Q7732812": {
    "same_exact_id": true,
    "source_declared_title": "The Expanse",
    "source_index_title_en": "The Expanse",
    "canonical_display_title": "The Expanse"
  },
  "Q785354": {
    "same_exact_id": true,
    "source_declared_title": "Time's Eye",
    "source_index_title_en": "Time's Eye",
    "canonical_display_title": "Time's Eye"
  },
  "Q12055126": {
    "same_exact_id": true,
    "source_declared_title": "Směr času",
    "source_index_title_en": null,
    "canonical_display_title": "Směr času"
  },
  "Q3149129": {
    "same_exact_id": true,
    "source_declared_title": "外交豁免权",
    "source_index_title_en": "Diplomatic Immunity",
    "canonical_display_title": "外交豁免权"
  },
  "Q55230522": {
    "same_exact_id": true,
    "source_declared_title": "The Genesis Wave, Book Three",
    "source_index_title_en": "The Genesis Wave, Book Three",
    "canonical_display_title": "The Genesis Wave, Book Three"
  },
  "Q131222069": {
    "same_exact_id": true,
    "source_declared_title": "The Days Between",
    "source_index_title_en": "The Days Between",
    "canonical_display_title": "The Days Between"
  },
  "Q131381209": {
    "same_exact_id": true,
    "source_declared_title": "Metaplanetary: A Novel of Interplanetary Civil War",
    "source_index_title_en": "Metaplanetary: A Novel of Interplanetary Civil War",
    "canonical_display_title": "Metaplanetary: A Novel of Interplanetary Civil War"
  },
  "Q131381216": {
    "same_exact_id": true,
    "source_declared_title": "The Secret of Life",
    "source_index_title_en": "The Secret of Life",
    "canonical_display_title": "The Secret of Life"
  },
  "Q131381239": {
    "same_exact_id": true,
    "source_declared_title": "Whole Wide World",
    "source_index_title_en": "Whole Wide World",
    "canonical_display_title": "Whole Wide World"
  },
  "Q134723266": {
    "same_exact_id": true,
    "source_declared_title": "The Children of Winter",
    "source_index_title_en": "The Children of Winter",
    "canonical_display_title": "The Children of Winter"
  },
  "Q1605815": {
    "same_exact_id": true,
    "source_declared_title": "The Eyre Affair",
    "source_index_title_en": "The Eyre Affair",
    "canonical_display_title": "The Eyre Affair"
  },
  "Q18011224": {
    "same_exact_id": true,
    "source_declared_title": "Dogged Persistence",
    "source_index_title_en": "Dogged Persistence",
    "canonical_display_title": "Dogged Persistence"
  },
  "Q202531": {
    "same_exact_id": true,
    "source_declared_title": "骗局",
    "source_index_title_en": "Deception Point",
    "canonical_display_title": "骗局"
  },
  "Q27657024": {
    "same_exact_id": true,
    "source_declared_title": "Hammerfall",
    "source_index_title_en": "Hammerfall",
    "canonical_display_title": "Hammerfall"
  },
  "Q3038780": {
    "same_exact_id": true,
    "source_declared_title": "墮落的龍",
    "source_index_title_en": "Fallen Dragon",
    "canonical_display_title": "墮落的龍"
  },
  "Q55230360": {
    "same_exact_id": true,
    "source_declared_title": "Dark Passions, Book Two",
    "source_index_title_en": "Dark Passions, Book Two",
    "canonical_display_title": "Dark Passions, Book Two"
  },
  "Q5608658": {
    "same_exact_id": true,
    "source_declared_title": "Gridlinked",
    "source_index_title_en": "Gridlinked",
    "canonical_display_title": "Gridlinked"
  },
  "Q7755685": {
    "same_exact_id": true,
    "source_declared_title": "The Outpost",
    "source_index_title_en": "The Outpost",
    "canonical_display_title": "The Outpost"
  },
  "Q7776538": {
    "same_exact_id": true,
    "source_declared_title": "The Year's Best Science Fiction: Eighteenth Annual Collection",
    "source_index_title_en": "The Year's Best Science Fiction: Eighteenth Annual Collection",
    "canonical_display_title": "The Year's Best Science Fiction: Eighteenth Annual Collection"
  },
  "Q108535553": {
    "same_exact_id": true,
    "source_declared_title": "Witness of Gor",
    "source_index_title_en": "Witness of Gor",
    "canonical_display_title": "Witness of Gor"
  },
  "Q11311483": {
    "same_exact_id": true,
    "source_declared_title": "s-CRY-ed",
    "source_index_title_en": "s-CRY-ed",
    "canonical_display_title": "s-CRY-ed"
  },
  "Q130259107": {
    "same_exact_id": true,
    "source_declared_title": "命运",
    "source_index_title_en": "Destiny",
    "canonical_display_title": "命运"
  },
  "Q11286446": {
    "same_exact_id": true,
    "source_declared_title": "惑星軌道零號站",
    "source_index_title_en": "Igna-Cross Reigōeki",
    "canonical_display_title": "惑星軌道零號站"
  },
  "Q131381177": {
    "same_exact_id": true,
    "source_declared_title": "The Coming",
    "source_index_title_en": "The Coming",
    "canonical_display_title": "The Coming"
  },
  "Q131381230": {
    "same_exact_id": true,
    "source_declared_title": "Dervish Is Digital",
    "source_index_title_en": "Dervish Is Digital",
    "canonical_display_title": "Dervish Is Digital"
  },
  "Q131516753": {
    "same_exact_id": true,
    "source_declared_title": "Steppenpferd",
    "source_index_title_en": "Steppenpferd",
    "canonical_display_title": "Steppenpferd"
  },
  "Q131518567": {
    "same_exact_id": true,
    "source_declared_title": "Sheena 5",
    "source_index_title_en": "Sheena 5",
    "canonical_display_title": "Sheena 5"
  },
  "Q134706062": {
    "same_exact_id": true,
    "source_declared_title": "A Day's Work on the Moon",
    "source_index_title_en": "A Day's Work on the Moon",
    "canonical_display_title": "A Day's Work on the Moon"
  },
  "Q135094293": {
    "same_exact_id": true,
    "source_declared_title": "Selected Stories",
    "source_index_title_en": "Selected Stories",
    "canonical_display_title": "Selected Stories"
  },
  "Q15035008": {
    "same_exact_id": true,
    "source_declared_title": "Space",
    "source_index_title_en": "Space",
    "canonical_display_title": "Space"
  },
  "Q19364507": {
    "same_exact_id": true,
    "source_declared_title": "Deepsix",
    "source_index_title_en": "Deepsix",
    "canonical_display_title": "Deepsix"
  },
  "Q20050124": {
    "same_exact_id": true,
    "source_declared_title": "Genesis",
    "source_index_title_en": "Genesis",
    "canonical_display_title": "Genesis"
  },
  "Q2059694": {
    "same_exact_id": true,
    "source_declared_title": "1632",
    "source_index_title_en": "1632",
    "canonical_display_title": "1632"
  },
  "Q28403633": {
    "same_exact_id": true,
    "source_declared_title": "The SFWA Grand Masters, Volume 2",
    "source_index_title_en": "The SFWA Grand Masters, Volume 2",
    "canonical_display_title": "The SFWA Grand Masters, Volume 2"
  },
  "Q2933712": {
    "same_exact_id": true,
    "source_declared_title": "计算中的上帝",
    "source_index_title_en": "Calculating God",
    "canonical_display_title": "计算中的上帝"
  },
  "Q2998291": {
    "same_exact_id": true,
    "source_declared_title": "CosmoQueer",
    "source_index_title_en": "CosmoQueer",
    "canonical_display_title": "CosmoQueer"
  },
  "Q29994393": {
    "same_exact_id": true,
    "source_declared_title": "Radiant Green Star",
    "source_index_title_en": "Radiant Green Star",
    "canonical_display_title": "Radiant Green Star"
  },
  "Q3210154": {
    "same_exact_id": true,
    "source_declared_title": "La Lune seule le sait",
    "source_index_title_en": null,
    "canonical_display_title": "La Lune seule le sait"
  },
  "Q3211715": {
    "same_exact_id": true,
    "source_declared_title": "La planète",
    "source_index_title_en": null,
    "canonical_display_title": "La planète"
  },
  "Q44603212": {
    "same_exact_id": true,
    "source_declared_title": "Nuxlum",
    "source_index_title_en": null,
    "canonical_display_title": "Nuxlum"
  },
  "Q4657458": {
    "same_exact_id": true,
    "source_declared_title": "A Hymn Before Battle",
    "source_index_title_en": "A Hymn Before Battle",
    "canonical_display_title": "A Hymn Before Battle"
  },
  "Q4803807": {
    "same_exact_id": true,
    "source_declared_title": "Ascendant Sun",
    "source_index_title_en": "Ascendant Sun",
    "canonical_display_title": "Ascendant Sun"
  },
  "Q4849957": {
    "same_exact_id": true,
    "source_declared_title": "Balance Point",
    "source_index_title_en": "Balance Point",
    "canonical_display_title": "Balance Point"
  },
  "Q5148482": {
    "same_exact_id": true,
    "source_declared_title": "Colony",
    "source_index_title_en": "Colony",
    "canonical_display_title": "Colony"
  },
  "Q5174346": {
    "same_exact_id": true,
    "source_declared_title": "Cosmonaut Keep",
    "source_index_title_en": "Cosmonaut Keep",
    "canonical_display_title": "Cosmonaut Keep"
  },
  "Q51933377": {
    "same_exact_id": true,
    "source_declared_title": "Titan A.E.: Akima's Story",
    "source_index_title_en": "Titan A.E.: Akima's Story",
    "canonical_display_title": "Titan A.E.: Akima's Story"
  },
  "Q5280748": {
    "same_exact_id": true,
    "source_declared_title": "Dirge",
    "source_index_title_en": "Dirge",
    "canonical_display_title": "Dirge"
  },
  "Q5305569": {
    "same_exact_id": true,
    "source_declared_title": "Drakas!",
    "source_index_title_en": "Drakas!",
    "canonical_display_title": "Drakas!"
  },
  "Q5331267": {
    "same_exact_id": true,
    "source_declared_title": "Eater",
    "source_index_title_en": "Eater",
    "canonical_display_title": "Eater"
  },
  "Q55230552": {
    "same_exact_id": true,
    "source_declared_title": "The Valiant",
    "source_index_title_en": "The Valiant",
    "canonical_display_title": "The Valiant"
  },
  "Q5577739": {
    "same_exact_id": true,
    "source_declared_title": "Going, Going, Gone",
    "source_index_title_en": "Going, Going, Gone",
    "canonical_display_title": "Going, Going, Gone"
  },
  "Q5877964": {
    "same_exact_id": true,
    "source_declared_title": "Hokas Pokas!",
    "source_index_title_en": "Hokas Pokas!",
    "canonical_display_title": "Hokas Pokas!"
  },
  "Q6314575": {
    "same_exact_id": true,
    "source_declared_title": "Jupiter",
    "source_index_title_en": "Jupiter",
    "canonical_display_title": "Jupiter"
  },
  "Q659151": {
    "same_exact_id": true,
    "source_declared_title": "Ruby Red",
    "source_index_title_en": "Ruby Red",
    "canonical_display_title": "Ruby Red"
  },
  "Q7692416": {
    "same_exact_id": true,
    "source_declared_title": "TechnoKill",
    "source_index_title_en": "TechnoKill",
    "canonical_display_title": "TechnoKill"
  },
  "Q7745563": {
    "same_exact_id": true,
    "source_declared_title": "The Last Albatross",
    "source_index_title_en": "The Last Albatross",
    "canonical_display_title": "The Last Albatross"
  },
  "Q7992271": {
    "same_exact_id": true,
    "source_declared_title": "Wheelers",
    "source_index_title_en": "Wheelers",
    "canonical_display_title": "Wheelers"
  },
  "Q4142541": {
    "same_exact_id": true,
    "source_declared_title": "Blue Lard",
    "source_index_title_en": "Blue Lard",
    "canonical_display_title": "Blue Lard"
  },
  "Q4726459": {
    "same_exact_id": true,
    "source_declared_title": "Alien Secrets",
    "source_index_title_en": "Alien Secrets",
    "canonical_display_title": "Alien Secrets"
  },
  "Q5170149": {
    "same_exact_id": true,
    "source_declared_title": "Core",
    "source_index_title_en": "Core",
    "canonical_display_title": "Core"
  },
  "Q54807231": {
    "same_exact_id": true,
    "source_declared_title": "Quarantine",
    "source_index_title_en": "Quarantine",
    "canonical_display_title": "Quarantine"
  },
  "Q55230442": {
    "same_exact_id": true,
    "source_declared_title": "New Worlds, New Civilizations",
    "source_index_title_en": "New Worlds, New Civilizations",
    "canonical_display_title": "New Worlds, New Civilizations"
  },
  "Q55230509": {
    "same_exact_id": true,
    "source_declared_title": "The Conquered",
    "source_index_title_en": "The Conquered",
    "canonical_display_title": "The Conquered"
  },
  "Q74378": {
    "same_exact_id": true,
    "source_declared_title": "Time",
    "source_index_title_en": "Time",
    "canonical_display_title": "Time"
  },
  "Q7713157": {
    "same_exact_id": true,
    "source_declared_title": "The Alleluia Files",
    "source_index_title_en": "The Alleluia Files",
    "canonical_display_title": "The Alleluia Files"
  },
  "Q7714276": {
    "same_exact_id": true,
    "source_declared_title": "The Armageddon Inheritance",
    "source_index_title_en": "The Armageddon Inheritance",
    "canonical_display_title": "The Armageddon Inheritance"
  },
  "Q7758417": {
    "same_exact_id": true,
    "source_declared_title": "The Privateer",
    "source_index_title_en": "The Privateer",
    "canonical_display_title": "The Privateer"
  },
  "Q7761136": {
    "same_exact_id": true,
    "source_declared_title": "The Road to Mars",
    "source_index_title_en": "The Road to Mars",
    "canonical_display_title": "The Road to Mars"
  },
  "Q7835408": {
    "same_exact_id": true,
    "source_declared_title": "Transvergence",
    "source_index_title_en": "Transvergence",
    "canonical_display_title": "Transvergence"
  },
  "Q131380944": {
    "same_exact_id": true,
    "source_declared_title": "The Martian Race",
    "source_index_title_en": "The Martian Race",
    "canonical_display_title": "The Martian Race"
  },
  "Q131472078": {
    "same_exact_id": true,
    "source_declared_title": "Mount Olympus",
    "source_index_title_en": "Mount Olympus",
    "canonical_display_title": "Mount Olympus"
  },
  "Q131518563": {
    "same_exact_id": true,
    "source_declared_title": "People Came from Earth",
    "source_index_title_en": "People Came from Earth",
    "canonical_display_title": "People Came from Earth"
  },
  "Q135094093": {
    "same_exact_id": true,
    "source_declared_title": "Rainbow Mars",
    "source_index_title_en": "Rainbow Mars",
    "canonical_display_title": "Rainbow Mars"
  },
  "Q20009838": {
    "same_exact_id": true,
    "source_declared_title": "Tempio",
    "source_index_title_en": null,
    "canonical_display_title": "Tempio"
  },
  "Q21190041": {
    "same_exact_id": true,
    "source_declared_title": "The Winds of Marble Arch",
    "source_index_title_en": "The Winds of Marble Arch",
    "canonical_display_title": "The Winds of Marble Arch"
  },
  "Q2362130": {
    "same_exact_id": true,
    "source_declared_title": "Temple",
    "source_index_title_en": "Temple",
    "canonical_display_title": "Temple"
  },
  "Q27796013": {
    "same_exact_id": true,
    "source_declared_title": "Precursor",
    "source_index_title_en": "Precursor",
    "canonical_display_title": "Precursor"
  },
  "Q28403609": {
    "same_exact_id": true,
    "source_declared_title": "The SFWA Grand Masters, Volume 1",
    "source_index_title_en": "The SFWA Grand Masters, Volume 1",
    "canonical_display_title": "The SFWA Grand Masters, Volume 1"
  },
  "Q28419608": {
    "same_exact_id": true,
    "source_declared_title": "Future War",
    "source_index_title_en": "Future War",
    "canonical_display_title": "Future War"
  },
  "Q29918070": {
    "same_exact_id": true,
    "source_declared_title": "Huddle",
    "source_index_title_en": "Huddle",
    "canonical_display_title": "Huddle"
  },
  "Q3210024": {
    "same_exact_id": true,
    "source_declared_title": "Forever Free",
    "source_index_title_en": "Forever Free",
    "canonical_display_title": "Forever Free"
  },
  "Q3222317": {
    "same_exact_id": true,
    "source_declared_title": "The Naked God",
    "source_index_title_en": "The Naked God",
    "canonical_display_title": "The Naked God"
  },
  "Q3791648": {
    "same_exact_id": true,
    "source_declared_title": "冰站（小說）",
    "source_index_title_en": "Ice Station",
    "canonical_display_title": "冰站（小說）"
  },
  "Q40860689": {
    "same_exact_id": true,
    "source_declared_title": "The Sky Road",
    "source_index_title_en": "The Sky Road",
    "canonical_display_title": "The Sky Road"
  },
  "Q105222224": {
    "same_exact_id": true,
    "source_declared_title": "两只小鸟",
    "source_index_title_en": "Two Small Birds",
    "canonical_display_title": "两只小鸟"
  },
  "Q131308066": {
    "same_exact_id": true,
    "source_declared_title": "Whiptail",
    "source_index_title_en": "Whiptail",
    "canonical_display_title": "Whiptail"
  },
  "Q131461675": {
    "same_exact_id": true,
    "source_declared_title": "Reading the Bones",
    "source_index_title_en": "Reading the Bones",
    "canonical_display_title": "Reading the Bones"
  },
  "Q1431808": {
    "same_exact_id": true,
    "source_declared_title": "LOOP (鈴木光司小説)",
    "source_index_title_en": "Loop",
    "canonical_display_title": "LOOP (鈴木光司小説)"
  },
  "Q15034499": {
    "same_exact_id": true,
    "source_declared_title": "Heroes Die",
    "source_index_title_en": "Heroes Die",
    "canonical_display_title": "Heroes Die"
  },
  "Q17126345": {
    "same_exact_id": true,
    "source_declared_title": "Tales in Space",
    "source_index_title_en": "Tales in Space",
    "canonical_display_title": "Tales in Space"
  },
  "Q2822148": {
    "same_exact_id": true,
    "source_declared_title": "Abzalon",
    "source_index_title_en": null,
    "canonical_display_title": "Abzalon"
  },
  "Q3016630": {
    "same_exact_id": true,
    "source_declared_title": "Darwinia",
    "source_index_title_en": "Darwinia",
    "canonical_display_title": "Darwinia"
  },
  "Q3208305": {
    "same_exact_id": true,
    "source_declared_title": "Echoes of Honor",
    "source_index_title_en": "Echoes of Honor",
    "canonical_display_title": "Echoes of Honor"
  },
  "Q3822080": {
    "same_exact_id": true,
    "source_declared_title": "The Cassini Division",
    "source_index_title_en": "The Cassini Division",
    "canonical_display_title": "The Cassini Division"
  },
  "Q3902528": {
    "same_exact_id": true,
    "source_declared_title": "Picatrix. La scala per l'inferno",
    "source_index_title_en": null,
    "canonical_display_title": "Picatrix. La scala per l'inferno"
  },
  "Q4114666": {
    "same_exact_id": true,
    "source_declared_title": "Return to Deathworld",
    "source_index_title_en": "Return to Deathworld",
    "canonical_display_title": "Return to Deathworld"
  },
  "Q4928148": {
    "same_exact_id": true,
    "source_declared_title": "Bloom",
    "source_index_title_en": "Bloom",
    "canonical_display_title": "Bloom"
  },
  "Q5281512": {
    "same_exact_id": true,
    "source_declared_title": "迪斯科2000文集",
    "source_index_title_en": "Disco 2000",
    "canonical_display_title": "迪斯科2000文集"
  },
  "Q548368": {
    "same_exact_id": true,
    "source_declared_title": "Heaven's Reach",
    "source_index_title_en": "Heaven's Reach",
    "canonical_display_title": "Heaven's Reach"
  },
  "Q55230375": {
    "same_exact_id": true,
    "source_declared_title": "Dujonian's Hoard",
    "source_index_title_en": "Dujonian's Hoard",
    "canonical_display_title": "Dujonian's Hoard"
  },
  "Q55230499": {
    "same_exact_id": true,
    "source_declared_title": "The Best and the Brightest",
    "source_index_title_en": "The Best and the Brightest",
    "canonical_display_title": "The Best and the Brightest"
  },
  "Q5877936": {
    "same_exact_id": true,
    "source_declared_title": "Hoka! Hoka! Hoka!",
    "source_index_title_en": "Hoka! Hoka! Hoka!",
    "canonical_display_title": "Hoka! Hoka! Hoka!"
  },
  "Q594567": {
    "same_exact_id": true,
    "source_declared_title": "Komarr",
    "source_index_title_en": "Komarr",
    "canonical_display_title": "科玛"
  },
  "Q63066709": {
    "same_exact_id": true,
    "source_declared_title": "The Alien Years",
    "source_index_title_en": "The Alien Years",
    "canonical_display_title": "The Alien Years"
  },
  "Q6907938": {
    "same_exact_id": true,
    "source_declared_title": "Moonseed",
    "source_index_title_en": "Moonseed",
    "canonical_display_title": "Moonseed"
  },
  "Q7201198": {
    "same_exact_id": true,
    "source_declared_title": "Planet of Twilight",
    "source_index_title_en": "Planet of Twilight",
    "canonical_display_title": "Planet of Twilight"
  },
  "Q7678446": {
    "same_exact_id": true,
    "source_declared_title": "Taklamakan",
    "source_index_title_en": "Taklamakan",
    "canonical_display_title": "Taklamakan"
  },
  "Q7831185": {
    "same_exact_id": true,
    "source_declared_title": "Traces",
    "source_index_title_en": "Traces",
    "canonical_display_title": "Traces"
  },
  "Q7916983": {
    "same_exact_id": true,
    "source_declared_title": "Vast",
    "source_index_title_en": "Vast",
    "canonical_display_title": "Vast"
  },
  "Q85786245": {
    "same_exact_id": true,
    "source_declared_title": "Moonfall",
    "source_index_title_en": "Moonfall",
    "canonical_display_title": "Moonfall"
  },
  "Q55230409": {
    "same_exact_id": true,
    "source_declared_title": "Heart of the Sun",
    "source_index_title_en": "Heart of the Sun",
    "canonical_display_title": "Heart of the Sun"
  },
  "Q55230549": {
    "same_exact_id": true,
    "source_declared_title": "The Tempest",
    "source_index_title_en": "The Tempest",
    "canonical_display_title": "The Tempest"
  },
  "Q5998865": {
    "same_exact_id": true,
    "source_declared_title": "Illegal Alien",
    "source_index_title_en": "Illegal Alien",
    "canonical_display_title": "Illegal Alien"
  },
  "Q6009281": {
    "same_exact_id": true,
    "source_declared_title": "In Death Ground",
    "source_index_title_en": "In Death Ground",
    "canonical_display_title": "In Death Ground"
  },
  "Q6907565": {
    "same_exact_id": true,
    "source_declared_title": "Moon Six",
    "source_index_title_en": "Moon Six",
    "canonical_display_title": "Moon Six"
  },
  "Q7426802": {
    "same_exact_id": true,
    "source_declared_title": "Saturn Rukh",
    "source_index_title_en": "Saturn Rukh",
    "canonical_display_title": "Saturn Rukh"
  },
  "Q7718000": {
    "same_exact_id": true,
    "source_declared_title": "The Billion Dollar Boy",
    "source_index_title_en": "The Billion Dollar Boy",
    "canonical_display_title": "The Billion Dollar Boy"
  },
  "Q7774455": {
    "same_exact_id": true,
    "source_declared_title": "The White Abacus",
    "source_index_title_en": "The White Abacus",
    "canonical_display_title": "The White Abacus"
  },
  "Q779016": {
    "same_exact_id": true,
    "source_declared_title": "土衛六 (小說)",
    "source_index_title_en": "Titan",
    "canonical_display_title": "土衛六 (小說)"
  },
  "Q131376801": {
    "same_exact_id": true,
    "source_declared_title": "The Fleet of Stars",
    "source_index_title_en": "The Fleet of Stars",
    "canonical_display_title": "The Fleet of Stars"
  },
  "Q131376803": {
    "same_exact_id": true,
    "source_declared_title": "Deception Well",
    "source_index_title_en": "Deception Well",
    "canonical_display_title": "Deception Well"
  },
  "Q133800124": {
    "same_exact_id": true,
    "source_declared_title": "Au-delà de nulle part",
    "source_index_title_en": null,
    "canonical_display_title": "Au-delà de nulle part"
  },
  "Q29884044": {
    "same_exact_id": true,
    "source_declared_title": "Все, способные держать оружие…",
    "source_index_title_en": null,
    "canonical_display_title": "Все, способные держать оружие…"
  },
  "Q3201692": {
    "same_exact_id": true,
    "source_declared_title": "The Neutronium Alchemist",
    "source_index_title_en": "The Neutronium Alchemist",
    "canonical_display_title": "The Neutronium Alchemist"
  },
  "Q3222051": {
    "same_exact_id": true,
    "source_declared_title": "Shards of Alderaan",
    "source_index_title_en": "Shards of Alderaan",
    "canonical_display_title": "Shards of Alderaan"
  },
  "Q3854497": {
    "same_exact_id": true,
    "source_declared_title": "Memorie di un cuoco d'astronave",
    "source_index_title_en": null,
    "canonical_display_title": "Memorie di un cuoco d'astronave"
  },
  "Q5247733": {
    "same_exact_id": true,
    "source_declared_title": "Deathstalker War",
    "source_index_title_en": "Deathstalker War",
    "canonical_display_title": "Deathstalker War"
  },
  "Q54807279": {
    "same_exact_id": true,
    "source_declared_title": "First Contact",
    "source_index_title_en": "First Contact",
    "canonical_display_title": "First Contact"
  },
  "Q130738105": {
    "same_exact_id": true,
    "source_declared_title": "Abandon in Place",
    "source_index_title_en": "Abandon in Place",
    "canonical_display_title": "Abandon in Place"
  },
  "Q131461555": {
    "same_exact_id": true,
    "source_declared_title": "Primrose and Thorn",
    "source_index_title_en": "Primrose and Thorn",
    "canonical_display_title": "Primrose and Thorn"
  },
  "Q131461643": {
    "same_exact_id": true,
    "source_declared_title": "Fugue on a Sunken Continent",
    "source_index_title_en": "Fugue on a Sunken Continent",
    "canonical_display_title": "Fugue on a Sunken Continent"
  },
  "Q134612524": {
    "same_exact_id": true,
    "source_declared_title": "Wildside",
    "source_index_title_en": "Wildside",
    "canonical_display_title": "Wildside"
  },
  "Q18152780": {
    "same_exact_id": true,
    "source_declared_title": "Mosaic",
    "source_index_title_en": "Mosaic",
    "canonical_display_title": "Mosaic"
  },
  "Q19947585": {
    "same_exact_id": true,
    "source_declared_title": "Myst: The Book of Ti'Ana",
    "source_index_title_en": "Myst: The Book of Ti'Ana",
    "canonical_display_title": "Myst: The Book of Ti'Ana"
  },
  "Q20724576": {
    "same_exact_id": true,
    "source_declared_title": "Expansion",
    "source_index_title_en": "Expansion",
    "canonical_display_title": "Expansion"
  },
  "Q21893619": {
    "same_exact_id": true,
    "source_declared_title": "Chute dans le réel",
    "source_index_title_en": null,
    "canonical_display_title": "Chute dans le réel"
  },
  "Q2298506": {
    "same_exact_id": true,
    "source_declared_title": "Solarstation",
    "source_index_title_en": null,
    "canonical_display_title": "Solarstation"
  },
  "Q2420936": {
    "same_exact_id": true,
    "source_declared_title": "La photo",
    "source_index_title_en": null,
    "canonical_display_title": "La photo"
  },
  "Q2447953": {
    "same_exact_id": true,
    "source_declared_title": "枪贩",
    "source_index_title_en": "The Gun Seller",
    "canonical_display_title": "枪贩"
  },
  "Q3453308": {
    "same_exact_id": true,
    "source_declared_title": "The Reality Dysfunction",
    "source_index_title_en": "The Reality Dysfunction",
    "canonical_display_title": "The Reality Dysfunction"
  },
  "Q3563298": {
    "same_exact_id": true,
    "source_declared_title": "Voyage",
    "source_index_title_en": "Voyage",
    "canonical_display_title": "Voyage"
  },
  "Q43543759": {
    "same_exact_id": true,
    "source_declared_title": "The Stone Canal",
    "source_index_title_en": "The Stone Canal",
    "canonical_display_title": "The Stone Canal"
  },
  "Q4839827": {
    "same_exact_id": true,
    "source_declared_title": "Backwards",
    "source_index_title_en": "Backwards",
    "canonical_display_title": "Backwards"
  },
  "Q4863413": {
    "same_exact_id": true,
    "source_declared_title": "Infinity's Shore",
    "source_index_title_en": "Infinity's Shore",
    "canonical_display_title": "Infinity's Shore"
  },
  "Q5057899": {
    "same_exact_id": true,
    "source_declared_title": "Celestial Matters",
    "source_index_title_en": "Celestial Matters",
    "canonical_display_title": "Celestial Matters"
  },
  "Q5305671": {
    "same_exact_id": true,
    "source_declared_title": "Drakon",
    "source_index_title_en": "Drakon",
    "canonical_display_title": "Drakon"
  },
  "Q5375581": {
    "same_exact_id": true,
    "source_declared_title": "與台伯河相遇",
    "source_index_title_en": "Encounter with Tiber",
    "canonical_display_title": "與台伯河相遇"
  },
  "Q5700973": {
    "same_exact_id": true,
    "source_declared_title": "Heirs of Empire",
    "source_index_title_en": "Heirs of Empire",
    "canonical_display_title": "Heirs of Empire"
  },
  "Q7601479": {
    "same_exact_id": true,
    "source_declared_title": "Starborne",
    "source_index_title_en": "Starborne",
    "canonical_display_title": "Starborne"
  },
  "Q7785669": {
    "same_exact_id": true,
    "source_declared_title": "This Day All Gods Die",
    "source_index_title_en": "This Day All Gods Die",
    "canonical_display_title": "This Day All Gods Die"
  },
  "Q7864589": {
    "same_exact_id": true,
    "source_declared_title": "UFOs: The Greatest Stories",
    "source_index_title_en": "UFOs: The Greatest Stories",
    "canonical_display_title": "UFOs: The Greatest Stories"
  },
  "Q8036762": {
    "same_exact_id": true,
    "source_declared_title": "Worldwar: Upsetting the Balance",
    "source_index_title_en": "Worldwar: Upsetting the Balance",
    "canonical_display_title": "Worldwar: Upsetting the Balance"
  },
  "Q8069191": {
    "same_exact_id": true,
    "source_declared_title": "Zenon: Girl of the 21st Century",
    "source_index_title_en": "Zenon: Girl of the 21st Century",
    "canonical_display_title": "Zenon: Girl of the 21st Century"
  },
  "Q85808079": {
    "same_exact_id": true,
    "source_declared_title": "The Other End of Time",
    "source_index_title_en": "The Other End of Time",
    "canonical_display_title": "The Other End of Time"
  },
  "Q131471753": {
    "same_exact_id": true,
    "source_declared_title": "Wang's Carpets",
    "source_index_title_en": "Wang's Carpets",
    "canonical_display_title": "Wang's Carpets"
  },
  "Q134080548": {
    "same_exact_id": true,
    "source_declared_title": "Les Oubliés de Vulcain",
    "source_index_title_en": null,
    "canonical_display_title": "Les Oubliés de Vulcain"
  },
  "Q135209407": {
    "same_exact_id": true,
    "source_declared_title": "The Spine Divers",
    "source_index_title_en": "The Spine Divers",
    "canonical_display_title": "The Spine Divers"
  },
  "Q30084993": {
    "same_exact_id": true,
    "source_declared_title": "The Bohr Maker",
    "source_index_title_en": "The Bohr Maker",
    "canonical_display_title": "The Bohr Maker"
  },
  "Q3088925": {
    "same_exact_id": true,
    "source_declared_title": "Brightness Reef",
    "source_index_title_en": "Brightness Reef",
    "canonical_display_title": "Brightness Reef"
  },
  "Q3335725": {
    "same_exact_id": true,
    "source_declared_title": "The Nano Flower",
    "source_index_title_en": "The Nano Flower",
    "canonical_display_title": "The Nano Flower"
  },
  "Q4658106": {
    "same_exact_id": true,
    "source_declared_title": "A Man of the People",
    "source_index_title_en": "A Man of the People",
    "canonical_display_title": "A Man of the People"
  },
  "Q4808579": {
    "same_exact_id": true,
    "source_declared_title": "Assault at Selonia",
    "source_index_title_en": "Assault at Selonia",
    "canonical_display_title": "Assault at Selonia"
  },
  "Q54800874": {
    "same_exact_id": true,
    "source_declared_title": "Warped",
    "source_index_title_en": "Warped",
    "canonical_display_title": "Warped"
  },
  "Q5518056": {
    "same_exact_id": true,
    "source_declared_title": "Galax-Arena",
    "source_index_title_en": "Galax-Arena",
    "canonical_display_title": "Galax-Arena"
  },
  "Q615035": {
    "same_exact_id": true,
    "source_declared_title": "The Carpet Makers",
    "source_index_title_en": "The Carpet Makers",
    "canonical_display_title": "The Carpet Makers"
  },
  "Q7251700": {
    "same_exact_id": true,
    "source_declared_title": "Proteus In The Underworld",
    "source_index_title_en": "Proteus In The Underworld",
    "canonical_display_title": "Proteus In The Underworld"
  },
  "Q7332612": {
    "same_exact_id": true,
    "source_declared_title": "Rider at the Gate",
    "source_index_title_en": "Rider at the Gate",
    "canonical_display_title": "Rider at the Gate"
  },
  "Q7679252": {
    "same_exact_id": true,
    "source_declared_title": "Tales from Jabba's Palace",
    "source_index_title_en": "Tales from Jabba's Palace",
    "canonical_display_title": "Tales from Jabba's Palace"
  },
  "Q7726841": {
    "same_exact_id": true,
    "source_declared_title": "The Color of Distance",
    "source_index_title_en": "The Color of Distance",
    "canonical_display_title": "The Color of Distance"
  },
  "Q10658260": {
    "same_exact_id": true,
    "source_declared_title": "Rymdväktaren",
    "source_index_title_en": null,
    "canonical_display_title": "Rymdväktaren"
  },
  "Q130737796": {
    "same_exact_id": true,
    "source_declared_title": "Bibi",
    "source_index_title_en": "Bibi",
    "canonical_display_title": "Bibi"
  },
  "Q131445236": {
    "same_exact_id": true,
    "source_declared_title": "Quasar",
    "source_index_title_en": "Quasar",
    "canonical_display_title": "Quasar"
  },
  "Q131461432": {
    "same_exact_id": true,
    "source_declared_title": "Harvest the Fire",
    "source_index_title_en": "Harvest the Fire",
    "canonical_display_title": "Harvest the Fire"
  },
  "Q12411852": {
    "same_exact_id": true,
    "source_declared_title": "שמים לוהטים בחצות",
    "source_index_title_en": null,
    "canonical_display_title": "שמים לוהטים בחצות"
  },
  "Q1300587": {
    "same_exact_id": true,
    "source_declared_title": "美日開戰",
    "source_index_title_en": "Debt of Honor",
    "canonical_display_title": "美日開戰"
  },
  "Q131376686": {
    "same_exact_id": true,
    "source_declared_title": "The Stars Are Also Fire",
    "source_index_title_en": "The Stars Are Also Fire",
    "canonical_display_title": "The Stars Are Also Fire"
  },
  "Q131380757": {
    "same_exact_id": true,
    "source_declared_title": "A Martian Childhood",
    "source_index_title_en": "A Martian Childhood",
    "canonical_display_title": "A Martian Childhood"
  },
  "Q132774503": {
    "same_exact_id": true,
    "source_declared_title": "Oddly Enough",
    "source_index_title_en": "Oddly Enough",
    "canonical_display_title": "Oddly Enough"
  },
  "Q133984305": {
    "same_exact_id": true,
    "source_declared_title": "Aller simple pour Saguenal",
    "source_index_title_en": null,
    "canonical_display_title": "Aller simple pour Saguenal"
  },
  "Q15094083": {
    "same_exact_id": true,
    "source_declared_title": "Diamond Mask",
    "source_index_title_en": "Diamond Mask",
    "canonical_display_title": "Diamond Mask"
  },
  "Q16955002": {
    "same_exact_id": true,
    "source_declared_title": "The Martian Child",
    "source_index_title_en": "The Martian Child",
    "canonical_display_title": "The Martian Child"
  },
  "Q22248349": {
    "same_exact_id": true,
    "source_declared_title": "La Douane de mer",
    "source_index_title_en": null,
    "canonical_display_title": "La Douane de mer"
  },
  "Q2647380": {
    "same_exact_id": true,
    "source_declared_title": "The Worlds of Aldebaran",
    "source_index_title_en": "The Worlds of Aldebaran",
    "canonical_display_title": "The Worlds of Aldebaran"
  },
  "Q2972319": {
    "same_exact_id": true,
    "source_declared_title": "Hot Sky at Midnight",
    "source_index_title_en": "Hot Sky at Midnight",
    "canonical_display_title": "Hot Sky at Midnight"
  },
  "Q43635157": {
    "same_exact_id": true,
    "source_declared_title": "The Refuge",
    "source_index_title_en": "The Refuge",
    "canonical_display_title": "The Refuge"
  },
  "Q4880455": {
    "same_exact_id": true,
    "source_declared_title": "Beggars and Choosers",
    "source_index_title_en": "Beggars and Choosers",
    "canonical_display_title": "Beggars and Choosers"
  },
  "Q5440721": {
    "same_exact_id": true,
    "source_declared_title": "Federation",
    "source_index_title_en": "Federation",
    "canonical_display_title": "Federation"
  },
  "Q5441458": {
    "same_exact_id": true,
    "source_declared_title": "Feersum Endjinn",
    "source_index_title_en": "Feersum Endjinn",
    "canonical_display_title": "Feersum Endjinn"
  },
  "Q65125622": {
    "same_exact_id": true,
    "source_declared_title": "六翼天使2億6661萬3336之翼",
    "source_index_title_en": "Seraphim: 2-oku 6661-man 3336 no Tsubasa",
    "canonical_display_title": "六翼天使2億6661萬3336之翼"
  },
  "Q11826490": {
    "same_exact_id": true,
    "source_declared_title": "Pożytek ze smoka",
    "source_index_title_en": null,
    "canonical_display_title": "Pożytek ze smoka"
  },
  "Q11946479": {
    "same_exact_id": true,
    "source_declared_title": "Emissary",
    "source_index_title_en": "Emissary",
    "canonical_display_title": "Emissary"
  },
  "Q12720858": {
    "same_exact_id": true,
    "source_declared_title": "Aqua",
    "source_index_title_en": null,
    "canonical_display_title": "Aqua"
  },
  "Q131461463": {
    "same_exact_id": true,
    "source_declared_title": "Alien Bootlegger",
    "source_index_title_en": "Alien Bootlegger",
    "canonical_display_title": "Alien Bootlegger"
  },
  "Q131471704": {
    "same_exact_id": true,
    "source_declared_title": "Friendship Bridge",
    "source_index_title_en": "Friendship Bridge",
    "canonical_display_title": "Friendship Bridge"
  },
  "Q131516770": {
    "same_exact_id": true,
    "source_declared_title": "Sacred Cow",
    "source_index_title_en": "Sacred Cow",
    "canonical_display_title": "Sacred Cow"
  },
  "Q134464020": {
    "same_exact_id": true,
    "source_declared_title": "Ombres blanches",
    "source_index_title_en": null,
    "canonical_display_title": "Ombres blanches"
  },
  "Q18430829": {
    "same_exact_id": true,
    "source_declared_title": "In a Bomb Crater",
    "source_index_title_en": "In a Bomb Crater",
    "canonical_display_title": "In a Bomb Crater"
  },
  "Q28419607": {
    "same_exact_id": true,
    "source_declared_title": "Invaders!",
    "source_index_title_en": "Invaders!",
    "canonical_display_title": "Invaders!"
  },
  "Q3116252": {
    "same_exact_id": true,
    "source_declared_title": "Mindstar Rising",
    "source_index_title_en": "Mindstar Rising",
    "canonical_display_title": "Mindstar Rising"
  },
  "Q42723496": {
    "same_exact_id": true,
    "source_declared_title": "De robotromans",
    "source_index_title_en": null,
    "canonical_display_title": "De robotromans"
  },
  "Q4808643": {
    "same_exact_id": true,
    "source_declared_title": "無限彙編者",
    "source_index_title_en": "Assemblers of Infinity",
    "canonical_display_title": "無限彙編者"
  },
  "Q5368262": {
    "same_exact_id": true,
    "source_declared_title": "Elvissey",
    "source_index_title_en": "Elvissey",
    "canonical_display_title": "Elvissey"
  },
  "Q54802781": {
    "same_exact_id": true,
    "source_declared_title": "Here There Be Dragons",
    "source_index_title_en": "Here There Be Dragons",
    "canonical_display_title": "Here There Be Dragons"
  },
  "Q54807395": {
    "same_exact_id": true,
    "source_declared_title": "Worf's First Adventure",
    "source_index_title_en": "Worf's First Adventure",
    "canonical_display_title": "Worf's First Adventure"
  },
  "Q7738320": {
    "same_exact_id": true,
    "source_declared_title": "第三方",
    "source_index_title_en": "The Gripping Hand",
    "canonical_display_title": "第三方"
  },
  "Q125817634": {
    "same_exact_id": true,
    "source_declared_title": "Chanur's legacy",
    "source_index_title_en": "Chanur's legacy",
    "canonical_display_title": "Chanur's legacy"
  },
  "Q131517849": {
    "same_exact_id": true,
    "source_declared_title": "The Round-Eyed Barbarians",
    "source_index_title_en": "The Round-Eyed Barbarians",
    "canonical_display_title": "The Round-Eyed Barbarians"
  },
  "Q17009376": {
    "same_exact_id": true,
    "source_declared_title": "Isaac Asimov Presents The Great SF Stories 25",
    "source_index_title_en": "Isaac Asimov Presents The Great SF Stories 25",
    "canonical_display_title": "Isaac Asimov Presents The Great SF Stories 25"
  },
  "Q25395087": {
    "same_exact_id": true,
    "source_declared_title": "Mars",
    "source_index_title_en": "Mars",
    "canonical_display_title": "Mars"
  },
  "Q28419265": {
    "same_exact_id": true,
    "source_declared_title": "The Best of Astounding: Classic Short Novels from the Golden Age of Science Fiction",
    "source_index_title_en": "The Best of Astounding: Classic Short Novels from the Golden Age of Science Fiction",
    "canonical_display_title": "The Best of Astounding: Classic Short Novels from the Golden Age of Science Fiction"
  },
  "Q3021982": {
    "same_exact_id": true,
    "source_declared_title": "Demain, une oasis",
    "source_index_title_en": null,
    "canonical_display_title": "Demain, une oasis"
  },
  "Q30607982": {
    "same_exact_id": true,
    "source_declared_title": "Universe 2",
    "source_index_title_en": "Universe 2",
    "canonical_display_title": "Universe 2"
  },
  "Q3206352": {
    "same_exact_id": true,
    "source_declared_title": "Green Shadows, White Whale",
    "source_index_title_en": "Green Shadows, White Whale",
    "canonical_display_title": "Green Shadows, White Whale"
  },
  "Q3222992": {
    "same_exact_id": true,
    "source_declared_title": "Brother to Dragons",
    "source_index_title_en": "Brother to Dragons",
    "canonical_display_title": "Brother to Dragons"
  },
  "Q3234544": {
    "same_exact_id": true,
    "source_declared_title": "The Memory of Earth",
    "source_index_title_en": "The Memory of Earth",
    "canonical_display_title": "The Memory of Earth"
  },
  "Q4726516": {
    "same_exact_id": true,
    "source_declared_title": "Aliens: Earth Hive",
    "source_index_title_en": "Aliens: Earth Hive",
    "canonical_display_title": "Aliens: Earth Hive"
  },
  "Q54806997": {
    "same_exact_id": true,
    "source_declared_title": "Chains of Command",
    "source_index_title_en": "Chains of Command",
    "canonical_display_title": "Chains of Command"
  },
  "Q7619863": {
    "same_exact_id": true,
    "source_declared_title": "Stopping at Slowyear",
    "source_index_title_en": "Stopping at Slowyear",
    "canonical_display_title": "Stopping at Slowyear"
  },
  "Q7805574": {
    "same_exact_id": true,
    "source_declared_title": "Timelike Infinity",
    "source_index_title_en": "Timelike Infinity",
    "canonical_display_title": "Timelike Infinity"
  }
});
const FIXED_REVIEW_BY_ID=Object.freeze({
  "Q137806760": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q134098155": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q136452465": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q113214640": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q137003729": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q131445223": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q135206358": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q55230555": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q102076238": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q134529150": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q139881240": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q62698506": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q133306305": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q139881238": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q137874076": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q139881234": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q24034555": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q110276832": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q125458800": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q134715513": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q19263901": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q21893609": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q54807336": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q21512452": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q55230372": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q131382269": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q133445347": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q133445431": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q114414730": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q137824848": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q16608557": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q108912961": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q134720546": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q15221218": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q16010795": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q16646479": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q3563140": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q54802746": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q2391923": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q2509857": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q7736686": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q108535556": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q131472325": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q135094390": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q16671459": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q7100133": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q7770704": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q27976097": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q6061022": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q6304848": "round94-root-first-checkpoints-semantic-review-private.json",
  "Q131382101": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q10566247": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q133801718": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q55230504": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q6029515": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q6322734": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q7577520": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q7578576": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q16573425": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q55230385": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q7776565": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q106371425": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q26995822": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q3212482": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q48814849": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q6798449": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q131308078": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q131381573": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q131381598": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q133873710": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q1748402": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q5063196": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q55230380": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q5694612": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q7733264": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q11122092": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q122058672": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q131461766": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q134608990": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q3235224": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q7732587": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q7732812": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q785354": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q12055126": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q3149129": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q55230522": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q131222069": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q131381209": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q131381216": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q131381239": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q134723266": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q1605815": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q18011224": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q202531": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q27657024": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q3038780": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q55230360": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q5608658": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q7755685": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q7776538": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q108535553": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q11311483": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q130259107": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q11286446": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q131381177": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q131381230": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q131516753": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q131518567": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q134706062": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q135094293": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q15035008": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q19364507": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q20050124": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q2059694": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q28403633": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q2933712": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q2998291": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q29994393": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q3210154": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q3211715": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q44603212": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q4657458": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q4803807": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q4849957": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q5148482": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q5174346": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q51933377": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q5280748": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q5305569": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q5331267": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q55230552": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q5577739": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q5877964": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q6314575": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q659151": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q7692416": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q7745563": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q7992271": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q4142541": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q4726459": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q5170149": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q54807231": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q55230442": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q55230509": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q74378": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q7713157": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q7714276": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q7758417": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q7761136": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q7835408": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q131380944": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q131472078": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q131518563": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q135094093": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q20009838": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q21190041": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q2362130": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q27796013": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q28403609": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q28419608": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q29918070": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q3210024": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q3222317": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q3791648": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q40860689": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q105222224": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q131308066": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q131461675": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q1431808": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q15034499": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q17126345": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q2822148": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q3016630": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q3208305": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q3822080": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q3902528": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q4114666": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q4928148": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q5281512": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q548368": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q55230375": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q55230499": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q5877936": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q594567": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q63066709": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q6907938": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q7201198": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q7678446": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q7831185": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q7916983": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q85786245": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q55230409": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q55230549": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q5998865": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q6009281": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q6907565": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q7426802": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q7718000": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q7774455": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q779016": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q10658260": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q130737796": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q131445236": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q131461432": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q12411852": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q1300587": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q131376686": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q131380757": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q132774503": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q133984305": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q15094083": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q16955002": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q22248349": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q2647380": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q2972319": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q43635157": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q4880455": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q5440721": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q5441458": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q65125622": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q11826490": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q11946479": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q12720858": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q131461463": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q131471704": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q131516770": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q134464020": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q18430829": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q28419607": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q3116252": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q42723496": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q4808643": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q5368262": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q54802781": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q54807395": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q7738320": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q125817634": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q131517849": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q17009376": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q25395087": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q28419265": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q3021982": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q30607982": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q3206352": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q3222992": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q3234544": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q4726516": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q54806997": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q7619863": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q7805574": "round94-early-S7-parts2-3-4-6-global-semantic-review-private.json",
  "Q131376801": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q131376803": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q133800124": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q29884044": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q3201692": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q3222051": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q3854497": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q5247733": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q54807279": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q130738105": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q131461555": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q131461643": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q134612524": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q18152780": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q19947585": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q20724576": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q21893619": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q2298506": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q2420936": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q2447953": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q3453308": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q3563298": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q43543759": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q4839827": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q4863413": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q5057899": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q5305671": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q5375581": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q5700973": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q7601479": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q7785669": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q7864589": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q8036762": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q8069191": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q85808079": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q131471753": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q134080548": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q135209407": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q30084993": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q3088925": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q3335725": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q4658106": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q4808579": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q54800874": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q5518056": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q615035": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q7251700": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q7332612": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q7679252": "round94-selection7-part5-semantic-review-modern-private.json",
  "Q7726841": "round94-selection7-part5-semantic-review-modern-private.json"
});
const FIXED_REVIEW_KIND=Object.freeze({
  "Q137806760": "root_packet",
  "Q134098155": "root_packet",
  "Q136452465": "root_packet",
  "Q113214640": "root_packet",
  "Q137003729": "root_packet",
  "Q131445223": "root_packet",
  "Q135206358": "root_packet",
  "Q55230555": "root_packet",
  "Q102076238": "root_packet",
  "Q134529150": "root_packet",
  "Q139881240": "root_packet",
  "Q62698506": "root_packet",
  "Q133306305": "root_packet",
  "Q139881238": "root_packet",
  "Q137874076": "root_packet",
  "Q139881234": "root_packet",
  "Q24034555": "root_packet",
  "Q110276832": "root_packet",
  "Q125458800": "root_packet",
  "Q134715513": "root_packet",
  "Q19263901": "root_packet",
  "Q21893609": "root_packet",
  "Q54807336": "root_packet",
  "Q21512452": "root_packet",
  "Q55230372": "root_packet",
  "Q131382269": "root_packet",
  "Q133445347": "root_packet",
  "Q133445431": "root_packet",
  "Q114414730": "root_packet",
  "Q137824848": "root_packet",
  "Q16608557": "root_packet",
  "Q108912961": "root_packet",
  "Q134720546": "root_packet",
  "Q15221218": "root_packet",
  "Q16010795": "root_packet",
  "Q16646479": "root_packet",
  "Q3563140": "root_packet",
  "Q54802746": "root_packet",
  "Q2391923": "root_packet",
  "Q2509857": "root_packet",
  "Q7736686": "root_packet",
  "Q108535556": "root_packet",
  "Q131472325": "root_packet",
  "Q135094390": "root_packet",
  "Q16671459": "root_packet",
  "Q7100133": "root_packet",
  "Q7770704": "root_packet",
  "Q27976097": "root_packet",
  "Q6061022": "root_packet",
  "Q6304848": "root_packet",
  "Q131382101": "global_record",
  "Q10566247": "global_record",
  "Q133801718": "global_record",
  "Q55230504": "global_record",
  "Q6029515": "global_record",
  "Q6322734": "global_record",
  "Q7577520": "global_record",
  "Q7578576": "global_record",
  "Q16573425": "global_record",
  "Q55230385": "global_record",
  "Q7776565": "global_record",
  "Q106371425": "global_record",
  "Q26995822": "global_record",
  "Q3212482": "global_record",
  "Q48814849": "global_record",
  "Q6798449": "global_record",
  "Q131308078": "global_record",
  "Q131381573": "global_record",
  "Q131381598": "global_record",
  "Q133873710": "global_record",
  "Q1748402": "global_record",
  "Q5063196": "global_record",
  "Q55230380": "global_record",
  "Q5694612": "global_record",
  "Q7733264": "global_record",
  "Q11122092": "global_record",
  "Q122058672": "global_record",
  "Q131461766": "global_record",
  "Q134608990": "global_record",
  "Q3235224": "global_record",
  "Q7732587": "global_record",
  "Q7732812": "global_record",
  "Q785354": "global_record",
  "Q12055126": "global_record",
  "Q3149129": "global_record",
  "Q55230522": "global_record",
  "Q131222069": "global_record",
  "Q131381209": "global_record",
  "Q131381216": "global_record",
  "Q131381239": "global_record",
  "Q134723266": "global_record",
  "Q1605815": "global_record",
  "Q18011224": "global_record",
  "Q202531": "global_record",
  "Q27657024": "global_record",
  "Q3038780": "global_record",
  "Q55230360": "global_record",
  "Q5608658": "global_record",
  "Q7755685": "global_record",
  "Q7776538": "global_record",
  "Q108535553": "global_record",
  "Q11311483": "global_record",
  "Q130259107": "global_record",
  "Q11286446": "global_record",
  "Q131381177": "global_record",
  "Q131381230": "global_record",
  "Q131516753": "global_record",
  "Q131518567": "global_record",
  "Q134706062": "global_record",
  "Q135094293": "global_record",
  "Q15035008": "global_record",
  "Q19364507": "global_record",
  "Q20050124": "global_record",
  "Q2059694": "global_record",
  "Q28403633": "global_record",
  "Q2933712": "global_record",
  "Q2998291": "global_record",
  "Q29994393": "global_record",
  "Q3210154": "global_record",
  "Q3211715": "global_record",
  "Q44603212": "global_record",
  "Q4657458": "global_record",
  "Q4803807": "global_record",
  "Q4849957": "global_record",
  "Q5148482": "global_record",
  "Q5174346": "global_record",
  "Q51933377": "global_record",
  "Q5280748": "global_record",
  "Q5305569": "global_record",
  "Q5331267": "global_record",
  "Q55230552": "global_record",
  "Q5577739": "global_record",
  "Q5877964": "global_record",
  "Q6314575": "global_record",
  "Q659151": "global_record",
  "Q7692416": "global_record",
  "Q7745563": "global_record",
  "Q7992271": "global_record",
  "Q4142541": "global_record",
  "Q4726459": "global_record",
  "Q5170149": "global_record",
  "Q54807231": "global_record",
  "Q55230442": "global_record",
  "Q55230509": "global_record",
  "Q74378": "global_record",
  "Q7713157": "global_record",
  "Q7714276": "global_record",
  "Q7758417": "global_record",
  "Q7761136": "global_record",
  "Q7835408": "global_record",
  "Q131380944": "global_record",
  "Q131472078": "global_record",
  "Q131518563": "global_record",
  "Q135094093": "global_record",
  "Q20009838": "global_record",
  "Q21190041": "global_record",
  "Q2362130": "global_record",
  "Q27796013": "global_record",
  "Q28403609": "global_record",
  "Q28419608": "global_record",
  "Q29918070": "global_record",
  "Q3210024": "global_record",
  "Q3222317": "global_record",
  "Q3791648": "global_record",
  "Q40860689": "global_record",
  "Q105222224": "global_record",
  "Q131308066": "global_record",
  "Q131461675": "global_record",
  "Q1431808": "global_record",
  "Q15034499": "global_record",
  "Q17126345": "global_record",
  "Q2822148": "global_record",
  "Q3016630": "global_record",
  "Q3208305": "global_record",
  "Q3822080": "global_record",
  "Q3902528": "global_record",
  "Q4114666": "global_record",
  "Q4928148": "global_record",
  "Q5281512": "global_record",
  "Q548368": "global_record",
  "Q55230375": "global_record",
  "Q55230499": "global_record",
  "Q5877936": "global_record",
  "Q594567": "global_record",
  "Q63066709": "global_record",
  "Q6907938": "global_record",
  "Q7201198": "global_record",
  "Q7678446": "global_record",
  "Q7831185": "global_record",
  "Q7916983": "global_record",
  "Q85786245": "global_record",
  "Q55230409": "global_record",
  "Q55230549": "global_record",
  "Q5998865": "global_record",
  "Q6009281": "global_record",
  "Q6907565": "global_record",
  "Q7426802": "global_record",
  "Q7718000": "global_record",
  "Q7774455": "global_record",
  "Q779016": "global_record",
  "Q10658260": "global_record",
  "Q130737796": "global_record",
  "Q131445236": "global_record",
  "Q131461432": "global_record",
  "Q12411852": "global_record",
  "Q1300587": "global_record",
  "Q131376686": "global_record",
  "Q131380757": "global_record",
  "Q132774503": "global_record",
  "Q133984305": "global_record",
  "Q15094083": "global_record",
  "Q16955002": "global_record",
  "Q22248349": "global_record",
  "Q2647380": "global_record",
  "Q2972319": "global_record",
  "Q43635157": "global_record",
  "Q4880455": "global_record",
  "Q5440721": "global_record",
  "Q5441458": "global_record",
  "Q65125622": "global_record",
  "Q11826490": "global_record",
  "Q11946479": "global_record",
  "Q12720858": "global_record",
  "Q131461463": "global_record",
  "Q131471704": "global_record",
  "Q131516770": "global_record",
  "Q134464020": "global_record",
  "Q18430829": "global_record",
  "Q28419607": "global_record",
  "Q3116252": "global_record",
  "Q42723496": "global_record",
  "Q4808643": "global_record",
  "Q5368262": "global_record",
  "Q54802781": "global_record",
  "Q54807395": "global_record",
  "Q7738320": "global_record",
  "Q125817634": "global_record",
  "Q131517849": "global_record",
  "Q17009376": "global_record",
  "Q25395087": "global_record",
  "Q28419265": "global_record",
  "Q3021982": "global_record",
  "Q30607982": "global_record",
  "Q3206352": "global_record",
  "Q3222992": "global_record",
  "Q3234544": "global_record",
  "Q4726516": "global_record",
  "Q54806997": "global_record",
  "Q7619863": "global_record",
  "Q7805574": "global_record",
  "Q131376801": "modern_record",
  "Q131376803": "modern_record",
  "Q133800124": "modern_record",
  "Q29884044": "modern_record",
  "Q3201692": "modern_record",
  "Q3222051": "modern_record",
  "Q3854497": "modern_record",
  "Q5247733": "modern_record",
  "Q54807279": "modern_record",
  "Q130738105": "modern_record",
  "Q131461555": "modern_record",
  "Q131461643": "modern_record",
  "Q134612524": "modern_record",
  "Q18152780": "modern_record",
  "Q19947585": "modern_record",
  "Q20724576": "modern_record",
  "Q21893619": "modern_record",
  "Q2298506": "modern_record",
  "Q2420936": "modern_record",
  "Q2447953": "modern_record",
  "Q3453308": "modern_record",
  "Q3563298": "modern_record",
  "Q43543759": "modern_record",
  "Q4839827": "modern_record",
  "Q4863413": "modern_record",
  "Q5057899": "modern_record",
  "Q5305671": "modern_record",
  "Q5375581": "modern_record",
  "Q5700973": "modern_record",
  "Q7601479": "modern_record",
  "Q7785669": "modern_record",
  "Q7864589": "modern_record",
  "Q8036762": "modern_record",
  "Q8069191": "modern_record",
  "Q85808079": "modern_record",
  "Q131471753": "modern_record",
  "Q134080548": "modern_record",
  "Q135209407": "modern_record",
  "Q30084993": "modern_record",
  "Q3088925": "modern_record",
  "Q3335725": "modern_record",
  "Q4658106": "modern_record",
  "Q4808579": "modern_record",
  "Q54800874": "modern_record",
  "Q5518056": "modern_record",
  "Q615035": "modern_record",
  "Q7251700": "modern_record",
  "Q7332612": "modern_record",
  "Q7679252": "modern_record",
  "Q7726841": "modern_record"
});
const FIXED_RECORD_REVIEWS=Object.freeze({
  "Q131382101": {
    "id": "Q131382101",
    "identity": {
      "title": "The January Dancer",
      "author": "邁克爾·F·弗林"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[0]",
    "source_spatial_record_sha256": "0d5f38a8e2941120afa44274caddb8e369539df8e5faf53183e103c42bbf877d",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确The January Dancer本卷知识限定遗物随星舰、船长与争夺者在不同恒星世界间的流转；古老起源和拯救文明的可能性不自动成为宇宙尺度。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "4fc638c1bee2fb5f6bec8765be9fc499c55d71cd8b3767a872d4444b8027be22",
      "facet_bases_sha256": "9f2a18f32e4621e8226adee4816d556c416a4f3d55543168e38932f5a580fc60",
      "source_scope_sha256": "965c3d1a82dd19b147adf784d3f408e48bcb47c20206bb3b247591f7e161c928"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "5cf7dd212202455c525952fe76b612ac753f951cc0de4ccc39fa6a9a944b6ab5",
    "source_log_record_sha256": "533655b76c32366c1fbe6cfb14db853f0e9478c9ce43049c15d23be4a7b5c7b7",
    "wholeprior_sha256": "231efc77c0f329686bebc9359048602e8a125a21118a874778e95c60ef894d7b"
  },
  "Q10566247": {
    "id": "Q10566247",
    "identity": {
      "title": "飛越顛峰Next Generation",
      "author": "GAINAX"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[1]",
    "source_spatial_record_sha256": "5a5f9fe9673a68e249eee351d667eebe0d8a5fff6598785c7bddd0258d92c3eb",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确NeXT GENERATION漫画共同前提限定归返舰队与银河联邦、Sirius间的人类星际战争；不借原动画怪兽战或将联邦名称当全银河实际到访。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "908e4501dcc32d82a9019ba04784ea4cd4c82ff293ad23f0dd3b4c316ccc5f62",
      "facet_bases_sha256": "ce4efc4b5ecb60af0e09af0916cac7e5a974a469315c6d105545bbaed31330c1",
      "source_scope_sha256": "17ec898d7a0f903851a946304e4ecf25b5abe5b570f1b347b2ac3b969259bb87"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "current_unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {
      "raw_search_artifact": "work/evidence/quick-retry-modern-r4-search-b.json"
    },
    "original_ownership_exact": {
      "original_ownership_file": "work/evidence/quick-retry-lane-2.json",
      "original_ownership_sha256": "f1e3bce7c91b9744ab300726ea85acd26e5f195553ce022a63559cc16e04bda5",
      "original_ownership_index": 113
    },
    "source_analysis_record_sha256": "1ba5b397d87f4b4bd8802770b07b2831732482dbed8637ef84c4a420d0ec1b73",
    "source_log_record_sha256": "541091cf5c378013c67b8690b2274a7aad8b57cd8c27fe05c7ec7aae0e4aa055",
    "wholeprior_sha256": "2d3f901157cc6db863a212fef91feb32de17a5b23d6e5c02f799a68763827964"
  },
  "Q133801718": {
    "id": "Q133801718",
    "identity": {
      "title": "Les Chevaliers Trinitaires",
      "author": "Corinne Guitteaud"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[2]",
    "source_spatial_record_sha256": "263f9a635a81d1532ac950912b850fdd117f3e4c0fa75bd7797c2ab4a8371846",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅取原书介明确杀手保护小行星女总统的局部小天体社会阶段；旧日认识和特别飞船回忆不提供全星际航线。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "a8d7496c0b4ec5fefe199aa5bfe9a18b9ead9df71c794d8feca0091b299a8ac0",
      "facet_bases_sha256": "3308c3af0d0b44d26294569075c54bd36f89a957ec5e9d6f83b4a2124baecfd2",
      "source_scope_sha256": "6bf8d7faffc58a9321f7f68a93c17c5611df4e2e7cf7daeadc7db4d5f96049ba"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "005a6e2c2881b5823760a80d7e7f31e06311e6a52cf86f2f8ac0353c272c55ce",
    "source_log_record_sha256": "182ee12d685563ab1f2f54cba0867d3cf7219eede672b32aec0d8b8a0e633152",
    "wholeprior_sha256": "d6a4c8df3e36917706c2dcb9fab07ed00417772d3b5d70db283f95160065b5c0"
  },
  "Q55230504": {
    "id": "Q55230504",
    "identity": {
      "title": "The Buried Age",
      "author": "Christopher L. Bennett"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[3]",
    "source_spatial_record_sha256": "c3018b5c9b9e445c9b4ee80004592912ee58c06becfb9966e527f27649db60e3",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确The Buried Age单卷知识限定Picard由星舰经历转入外星考古与古老幸存者相关行动；超过恐龙年代是时间背景，不变成宇宙舞台。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "5e0731bc221b5e377f5baf6ea77492f663f137356e8918d975256a2e68df4025",
      "facet_bases_sha256": "948e3c17652d197360096b24a4980ddce02068519d839da023dcbf0d2962c3f7",
      "source_scope_sha256": "306eac084b593b3962d518b7f4563ac3e8dc0034d00101a61e36f82685020984"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "5ea0d7e20a16e7533d1b9c77f91482dcd07b3acb4cdec7add58a9ec11140a45f",
    "source_log_record_sha256": "d0949638860605a3e25873d0c8cac846ebb118f5e6690f6a043934ed3b199502",
    "wholeprior_sha256": "373ca7924c482e9392d6d55a56dde73c1fad1e777d39e5061997f101b91cfd40"
  },
  "Q6029515": {
    "id": "Q6029515",
    "identity": {
      "title": "Inferno",
      "author": "Troy Denning"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[4]",
    "source_spatial_record_sha256": "4286603c00afca3439d04d0fad3308361e09f75faf4d83a31629dc612f98b78e",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确Inferno单卷知识限定人物、舰船在银河内战中的不同恒星世界行动；政治联盟范围与后续卷战役不补作本卷全部实到场所。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "0ba019d43e230c87617cd5d0e4f5437df29e281992f3a9c50eb0f50460bd8c69",
      "facet_bases_sha256": "5bd0ca9f02b6dca9e99d21318513c0dea150e2a1f2344ca52d5c9cfc7ee245f1",
      "source_scope_sha256": "306eac084b593b3962d518b7f4563ac3e8dc0034d00101a61e36f82685020984"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "e69f36083f866d2b641e448ed5ed66627487a15bd6f7bb33394caebe12bcc627",
    "source_log_record_sha256": "9077938a0eb097dbb3513cb4fd701ce51135cb8b8d9afb26d5e7b6e07942fbf6",
    "wholeprior_sha256": "3e07f2505da1f5fc428b17891eaaf30fe4d8ea1160ff8e50bcd728abc3d39836"
  },
  "Q6322734": {
    "id": "Q6322734",
    "identity": {
      "title": "異星來客四：來自星座萊拉的新訪客",
      "author": "吉恩·布魯爾"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[5]",
    "source_spatial_record_sha256": "4fcef02f60631bee09aa5f0030046d1c761d5b65c7d97267fdfe7429d0499083",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "准确K-PAX IV本册知识限定Dr. B接待Fled的地球精神病院与美国机构介入阶段；Fled自称K-PAX来源和带走人群的计划不当作已证实星际抵达。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "7d75066c6b60bd4bf0996db4aac7a56f6d9d6679e3fb26ecca695851b0bb4b1c",
      "facet_bases_sha256": "615752cf273b896e5a4ff31bf3a85c8bf73420638643e26f55e507e8ce962277",
      "source_scope_sha256": "2584d5117ec9a5e6edeb9e4ef21386f53b3083555adca042d9e642dbbb665453"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "252e6d41d6a9003eaee4ae6fb08ceb4df5c5ac43f4148bffcfe6e3d07f25796c",
    "source_log_record_sha256": "5a4e8c3d35e12fae279d79e78554414f5e64ac737675fb18522fb9712c54034e",
    "wholeprior_sha256": "2f4c462b462763c895065ff14244836b6801b17c0e4929c5f800590d302a93d9"
  },
  "Q7577520": {
    "id": "Q7577520",
    "identity": {
      "title": "Spindrift",
      "author": "艾倫‧史提爾"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[6]",
    "source_spatial_record_sha256": "991de861a172990ce9a72be6367556a64f5008cfcfa15c1c2679632a44e45710",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确Spindrift单卷知识限定Galileo对太阳系外对象的远航及返回者相关调查；毁灭银河的威胁是风险背景，不据此扩大为全银河实际行程。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "4ba94d7b20524c64a9a38aaededc1c0f5a53ca1580858a9693b8ed0ff83516b6",
      "facet_bases_sha256": "bd9dd7ed62832321f2cd3ed2531d0bb09a445efea46dcb70cb0c0664b2bc304e",
      "source_scope_sha256": "2f7532b68d80685f7526eda971cc42661e1d4c465fef9542f292e3099b7381b1"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {
      "record_sha256": "7aedf659338aa1680b22f25cd8ad0160430019ba092a96caf854330040565bf2",
      "source_artifact": "work/evidence/fast-first-lane-2.json"
    },
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "fdb9f61355a3f658ee3f6d0fbb6c2cd273109796e5bc52818170925dfda64cbc",
    "source_log_record_sha256": "90375e45d43e0bbdcc8502433a2835959ed33b0107f5602cdfe529890757abab",
    "wholeprior_sha256": "cc18caa7dac9b4d8eb959f1966d0361e4de93bef9f1d0b293b09713db1e84f88"
  },
  "Q7578576": {
    "id": "Q7578576",
    "identity": {
      "title": "Splinter",
      "author": "Adam Roberts"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[7]",
    "source_spatial_record_sha256": "277d2b8246d9a657f159eba0830a064be949b21b181672fe29d22b2d05f84db4",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "仅取Hector返回父亲地球牧场的实际生活与末日信徒共同体；地球被击碎是父亲对异常的解释，私人幻象也不自动转成真实外星或abstract舞台。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "56c4c683bb837097de304394382c83d0170795363efb4ffc82eba58fb8855f94",
      "facet_bases_sha256": "b6d07226c849e0eda0cedd64db8cc62ea83d8f6e47a01bcd868b936ea591e13a",
      "source_scope_sha256": "31b05768e7c1e80b3d67785477381a651e5e7d0912cb664817b57f9a950ddaa8"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "b02a9a5cd39a622a2e96fa76ad858433cf2d95099d39476e5b4faf44dfbfeff0",
    "source_log_record_sha256": "f0febc721e1156c5b8e32afc62dbfc348fe6bd522b23000d799f56dac5713ea7",
    "wholeprior_sha256": "b7ebd78dc7f7bd40af42237800ff52fa42fd8c94d46c2aa0a126edb9d4e91895"
  },
  "Q16573425": {
    "id": "Q16573425",
    "identity": {
      "title": "Flaming London",
      "author": "喬·R·蘭斯代爾"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[8]",
    "source_spatial_record_sha256": "d43224b3c830be5c14378247f7e272195b26930275bbe1e33f5acc06373f2021",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "准确Flaming London单作知识限定火星入侵时的地球伦敦与Twain、Verne等人物冒险；时间裂缝是因果结构，不单凭时间旅行另赋abstract。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "473a59846cb96851d1edce250f73ac1a0451f43aabdf6bef25cd651da035486e",
      "facet_bases_sha256": "acb1c2eadf7e892de5ffa1b93b0ca286ba6ec480c1095799e2da7f45933d77a7",
      "source_scope_sha256": "69b197d0daf9e244469b12c2de8ea7e300a422c3148a35ae5e043a2f685c339e"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "94c9879c2fe831952f9919cc363c2ab4ff194ce6610dacb16f07dc843cc132b0",
    "source_log_record_sha256": "c83445e990393a56dd2a8e5d3ca52ab2d826dfa889b8cab6af91f3739f7adad3",
    "wholeprior_sha256": "cbf9dffead4cf1c7c85ff04fd244a8ec51ce6f662674661ef6608eb885068b62"
  },
  "Q55230385": {
    "id": "Q55230385",
    "identity": {
      "title": "Evolution",
      "author": "Heather Jarman"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[9]",
    "source_spatial_record_sha256": "3020bcd7eb6965b2b7dc6d64a52dcd5ef7dc373daee6e99856edc0f74cd1922b",
    "reviewed_spatial_fields": {
      "spatial_primary": "abstract",
      "spatial_secondary": [],
      "spatial_rationale": "仅取第三卷明确Doctor被困于人类难理解的异质维度这一阶段；Q派出的救援旅程未读完整，不据此填宇宙范围或全系列航线。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "3bf60e9a0205b448dadbb56cd13d23249c476f82f2c09199401f3ea7ebee0c25",
      "facet_bases_sha256": "cf5a672ac2a4b0873d676d922b6694ba063599b796403bfab8c766e8faeebd2a",
      "source_scope_sha256": "23a9fac83cc205693f5f3c23ffb4b914c4009cac20a94db9f25963dc7378eb53"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "failure_count": 0
    },
    "original_cache_declarations_exact": {
      "ownership_sha256": "c4f5abbb4b3f5b116c9f627a6a4f0d8408a90b5c5d091360dd76e4c4cbff3730"
    },
    "original_ownership_exact": {
      "original_ownership_file": "work/evidence/known-year-first-pass-lane-1.json",
      "original_ownership_sha256": "c4f5abbb4b3f5b116c9f627a6a4f0d8408a90b5c5d091360dd76e4c4cbff3730",
      "original_ownership_index": 19
    },
    "source_analysis_record_sha256": "1ca6607110d3ca258de29673c9a7f62764f9a0bb3f2c169ab86e181b92de0052",
    "source_log_record_sha256": "5b16928c39531fa5f4099c0cd816f78078f1190c02cf656de9a3e340e560400e",
    "wholeprior_sha256": "af2d336ab232d5f097462fc79139e91b17d80cbf820425610df4ff6e51e0899b"
  },
  "Q7776565": {
    "id": "Q7776565",
    "identity": {
      "title": "The Year's Best Science Fiction: Twenty-Third Annual Collection",
      "author": "作者未知"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[10]",
    "source_spatial_record_sha256": "4d576256398cabaa5e904521b618f8dd150690abb3e029c33e0697f578142032",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位本选集已述成员A Case of Consilience的地下菌类智慧生命所在世界及接触前哨；不表示整年度选集的空间相同，也不补站点的宿主恒星名。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "2f539d4d8a47c9ce7e9ff0ee20e5c13632161a1d5c2961e4fc78aebf49631272",
      "facet_bases_sha256": "f495de245410e1a78b189ade371925ca9e64ce7195fb8aed062e93bf2f17c990",
      "source_scope_sha256": "78132bdf2c224795e059e1fd21093c2e68066e60a6a69d9efcde69ad7de8f249"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": true,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "page_open_attempt_count": 0,
      "failed_page_open_count": 0,
      "failure_count": 0
    },
    "original_cache_declarations_exact": {
      "private_raw_search_return": {
        "path": "work/evidence/root-known-year-query2-Q7776565.txt",
        "scope": "本身份实际一次精准查询；打开（包括失败）另见相同id open2文件。"
      }
    },
    "original_ownership_exact": {
      "original_ownership_file": "known-year-first-pass-lane-0.json",
      "original_ownership_sha256": "077a719fe2f381730b263d4de580902b409476dbeeb36e570c8c3008c1ec63b6",
      "original_ownership_index": 22
    },
    "source_analysis_record_sha256": "1aeb36f8e55f2ea68650f7405b1545189ce87c7a41736225bed619a617bb942d",
    "source_log_record_sha256": "038b904e8a029c6778b7df7045865fdad204ba452431193ca07e42fffd6c45ba",
    "wholeprior_sha256": "11bb13f144f8d7d4ed37cad7376528b5ab64212e14134abfe67b9fa6bc46e4a8"
  },
  "Q106371425": {
    "id": "Q106371425",
    "identity": {
      "title": "A Case of Consilience",
      "author": "肯·麦克劳德"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[11]",
    "source_spatial_record_sha256": "6c40c201dc69592894894cf6951faed38da5cac759f0cd6d92b4638f1119fcd2",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅取本单篇已述地下菌类智慧生命世界与接触空间前哨；沟通仍有限，不补原材料未给出的母星名称或完整星际航程。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "4ecded947c9ba908d2a127b5892d988992c7597f144ea1b065ab513a84c66645",
      "facet_bases_sha256": "e1f4a5e470768ad2e86832a39b7c6240f48c14536e2fe48958750e0edd3d79d6",
      "source_scope_sha256": "3342b52070b67883c807bb65cc1988b230726496bf653c8545647f7ab674b322"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": true,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "page_open_attempt_count": 1,
      "failed_page_open_count": 1,
      "failure_count": 0
    },
    "original_cache_declarations_exact": {
      "private_raw_search_return": {
        "path": "work/evidence/root-known-year-query2-Q106371425.txt",
        "scope": "本身份实际一次精准查询；打开（包括失败）另见相同id open2文件。"
      }
    },
    "original_ownership_exact": {
      "original_ownership_file": "known-year-first-pass-lane-0.json",
      "original_ownership_sha256": "077a719fe2f381730b263d4de580902b409476dbeeb36e570c8c3008c1ec63b6",
      "original_ownership_index": 23
    },
    "source_analysis_record_sha256": "cc7bf03bf1d73368248d2a9d0c4540b37b1a57e15c0b78de535313a228fa8c4e",
    "source_log_record_sha256": "7f56fd69ea1f42ef9f7157004f81d133db0f6f3a09aab100e077ba0945bc4c60",
    "wholeprior_sha256": "4a777e14d1922b53f16e97ad40812d18f97081b560a0c30b77ae2f8efdbe3cd7"
  },
  "Q26995822": {
    "id": "Q26995822",
    "identity": {
      "title": "Aliens: Original Sin",
      "author": "迈克尔·詹·弗莱德曼"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[12]",
    "source_spatial_record_sha256": "252558668c42431d4e9f8566eb92fcc428e29a9b6ebcf11e427e1e58093d1d79",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "原单作综述明确Betty抵达轨道花园殖民地Domes Epsilon并遭遇异形，限这一局部轨道栖地；不据电影品牌补其他世界或恒星航程。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "bcb899707cd7aabb5d098b2d81867e0cfee1fa8e33d5c74561043954d54469a3",
      "facet_bases_sha256": "65b13939b6f621f5fc76af3598386a11c4f4fa3010f5999db14a0f1be7787e1b",
      "source_scope_sha256": "4f3fd5739312c94ff703c0bd714eace8c6762bc036afaa8d18066a5d5cfecbf2"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "63580c6e346ec6a9403e67355816a8288c11194ac1351b68bb033923b86170a4",
    "source_log_record_sha256": "df24292daee712696ac8e42ad73ed673ace14c7dbf7f2c09d0f8f5231d447dbe",
    "wholeprior_sha256": "59b03ce281a7516c8db9688d2f1ef73d7126282ab9b74202c04ad0beaacfcf74"
  },
  "Q3212482": {
    "id": "Q3212482",
    "identity": {
      "title": "The Road to Dune",
      "author": "弗兰克·赫伯特 / 凱文·詹姆士·安德森 / 布萊恩·帕特里克·赫伯特"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[13]",
    "source_spatial_record_sha256": "b2b292f87e0ba5715ebe4138499abcd3d583280b7f5a9f8b9df93ad9d2ea9b28",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位本合集具名收入Spice Planet的香料行星开发与帝国资源治理框架；刑罚行星是矿工来源，不补章节已经访问那些世界，也不代替所有Dune资料的舞台。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "e2bd6a05e9b812159b567c6370c500dceccd5787aafec868484474017d852526",
      "facet_bases_sha256": "47de658ca63edf9b0b16c4109e67263a0d3ffda247ca18a00d5aa5732d8d6368",
      "source_scope_sha256": "2453e8ad44766842f86150e4e6657c5db05898d66dcc68126eed91cd06c5177c"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "failure_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "5e1d779a2c78e5805256d4a5d6c1aba342d88bcf3139abfd62550131039dcc22",
    "source_log_record_sha256": "1590387940d22b31265d8615b16a717d9c1b5378c12b9de3d5b8049b2c2a9fb3",
    "wholeprior_sha256": "85dd495922c023f46c4dba10588afcf96879b5b1f9f2e27784f02f63ab3abe62"
  },
  "Q48814849": {
    "id": "Q48814849",
    "identity": {
      "title": "The Rocket Company",
      "author": "作者未知"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[14]",
    "source_spatial_record_sha256": "43f327a28e83d62a23cbfd7a34ed44d380f7e4fce0d4753b0cb69cba8ad2dd36",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "准确The Rocket Company书本知识仅取投资、制造、监管与经营选择的地球工程和市场阶段；降低轨道进入成本是项目目标，不把书介目标直接说成已成功抵达太空。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "2edceffd3105d07f7f586fc2d0e055b901fab151b77561e7021e47f8724c9acf",
      "facet_bases_sha256": "62f2ef97bf5857b7e7d52466b086af3639b20084a960218a5adb6a59fb612490",
      "source_scope_sha256": "73e51ab98a21311fe359c70698b30d10593c7a949e1999f90ff1975e167a3c30"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "cc08db769f707cea1a1aebfe76ddfcffc7feeb1b3b2dabf258789cca443b7a34",
    "source_log_record_sha256": "bb5dd78d78b957bd424057ce0072138dd0e8499486e06a77a562f3fcb3656df5",
    "wholeprior_sha256": "a819d54d1fbbeeb0a718968a91537a89b3cd1174d113880d88bf94ac6feae3b9"
  },
  "Q6798449": {
    "id": "Q6798449",
    "identity": {
      "title": "Mazer in Prison",
      "author": "奥森·斯科特·卡德"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[15]",
    "source_spatial_record_sha256": "d5c7ed2e433c8018d289e5633e6235a1e3b855c853ba9d4e5546c7b47a54ea51",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "准确Mazer in Prison单篇知识限定地球安排的近光速航行及与地球控制系统的关系；不套末战进攻虫族母星的别作情节，不声称该篇已到达它。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "190e1a25f1d2952a9ad30f5b2c74cb3da2d73efde8843763667c02e077bb4376",
      "facet_bases_sha256": "bbd1056883243b28585b499a377b643293ee5cc55c54d347b2975456b109d05a",
      "source_scope_sha256": "e987d3ea98b184d1e7c3b702a7f049c3954ad6487a69dcaef70e7e19930027cc"
    },
    "result": "skip_this_adoption_keep_original",
    "reason": "Mazer in Prison的现有近光速航行和地球控制关系没有限定太阳系实际行程；作者也确认没有可靠精确已有知识能补足。保持空间unknown，不改为earth或interstellar。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "33eeef0ec1276278d79709f2510401e08770d6418c28401a6846883be088388b",
    "source_log_record_sha256": "19aa92abb4a5468619a0adb0a0ca057e35840d72a1e0b28094a2e82eb6467a13",
    "wholeprior_sha256": "3380480b5fef2f78acea77eeeef3daf0625e75b005a9f470219561e330bb148d"
  },
  "Q131308078": {
    "id": "Q131308078",
    "identity": {
      "title": "A Princess of Earth",
      "author": "迈克尔•雷斯尼克"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[16]",
    "source_spatial_record_sha256": "f366695ecc4926bb122b0c5aaf6c2a4314648e2a86369a268eb7fad09232ef5b",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "准确A Princess of Earth单篇知识限定鳏夫在地球暴雪中接待陌生人的家庭场景；John Carter与Dejah Thoris身份在对话中被主张，不据此增加真实火星场景。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "125cc483bb5e8a1f40c34a2b5b062be5cec4dd55b51eb98c6c5c5aaf908fa9fb",
      "facet_bases_sha256": "2cbb91e0b691680ca0b12653982dc413ce1a34ca5c7c417630184cf648cfe8a5",
      "source_scope_sha256": "c124bb958a7e9c76f4f7ddc473177496601c12a93a13bb670f1af43f5b75e231"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "eca732990f558da15cc8851fdc6634ee361e5600a2d767dabb4d7a30cdaaadc2",
    "source_log_record_sha256": "a5b9dbd8942fac5d5bb536d84b8d673df0d45e943b2ca0671ddaad29d99cda95",
    "wholeprior_sha256": "e6642619487d3bcee3da8f8f4f2e4766849aabdb378931e587a3026e8bc32ede"
  },
  "Q131381573": {
    "id": "Q131381573",
    "identity": {
      "title": "Frek and the Elixir",
      "author": "鲁迪·拉克"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[17]",
    "source_spatial_record_sha256": "119848921b83a5e672a16b92ff7863d036a46bd500b46c4587d9f7eae520879d",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "准确Frek and the Elixir本作知识仅取Frek在生物技术重塑地球社会中的初始生活与被利用阶段；外来者向银河营销人类的欲望不当作已访问的银河范围。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "9d67bcd0a7abb671d4acf0d19f5ba2f0b8db17eff8210031224bb57746b645c6",
      "facet_bases_sha256": "e6cfe9c1ab3140fd7117ea88c474b7a4d14c92e80df3f58545e83a29712cf329",
      "source_scope_sha256": "b315b68bc336b2c91909a94b755ef28ea64a29ac8db1bae4eaad74c3477c0ead"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "6f474c410cf8e650c56fac6657c85441cb7cd198bacd9f7cbc27c550c5dd6a66",
    "source_log_record_sha256": "4818ae41b23c3b027f31123a164f989029cda72f91f8c80c70085f9a9cc3c75e",
    "wholeprior_sha256": "a3586a023f9f14ef2adb10bb1af82abe780a67261c425b275c1fa8f93efb2a93"
  },
  "Q131381598": {
    "id": "Q131381598",
    "identity": {
      "title": "Stamping Butterflies",
      "author": "Jon Courtenay Grimwood"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[18]",
    "source_spatial_record_sha256": "c4f5616e09965bbc8746598fb176da0bc9908654efef09a224f652dcdf8a0623",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "仅取出版社明确近未来马拉喀什刺客这一地球阶段；遥远戴森球皇帝与彼此视对方为梦的关系保留歧义，不把梦中对方自动当另一已证实物理舞台。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "93b6acc69d45a6a3b26da21ec019a9c50e60fd1ce0f6d5607559db4f6bd6575f",
      "facet_bases_sha256": "50f53e6485811c458a5de3daced323cc45f0c204973bbdc37517d77a0a4d7f41",
      "source_scope_sha256": "3c2f7b20dbceb147de8b91a8fb40062c357c520aaeaf13fcf4a039230a4138e7"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "cd87d3c3a94f44bcd239adcebb5a55b32dbcd4f09dee1797a44b2ecafa8cc804",
    "source_log_record_sha256": "234fef1cac5f8c5d919e66b58c13fc912b0dd764d75f35bae8b4fcbc96733f18",
    "wholeprior_sha256": "5343871c918c923512f29d676327313a59a3979f8f83378e928cf18a03679f00"
  },
  "Q133873710": {
    "id": "Q133873710",
    "identity": {
      "title": "Les Gardiens d'Aleph-Deux",
      "author": "Colin Marchika"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[19]",
    "source_spatial_record_sha256": "7f11a712154b1f8e80bec6b3c03db1d4392f7fd3dbd093fdb74468ba3d4ee7c5",
    "reviewed_spatial_fields": {
      "spatial_primary": "abstract",
      "spatial_secondary": [],
      "spatial_rationale": "原书介明确实际Aleph-un平行空间穿越及失船者归来带回Aleph-deux；只定位这种非通常空间关系，不从到银河远处的能力推定全部人物的完整实际旅程。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "d7a2ceba4b76bdff5d9e5ad32ccf969d0083508c6da099fdf0b373ce27e67c9f",
      "facet_bases_sha256": "ef8d13a595aca6c67df557c02bfe40c6dafb8a459197faabea50b336c7229cb4",
      "source_scope_sha256": "1408e03205a1bfad309e0ada623b17c79c5d69c5d06fdc87430b173751ec4501"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "7717cbf9f351f0df4e5de9bfd4fe8ee8a3675464510b3a146d78089101927128",
    "source_log_record_sha256": "5628b7acb0ac4cb8968dd91512e12e3897652100cbdf9fdee106000e58a933ec",
    "wholeprior_sha256": "ace09750362671e59f5d4b01ea2184ee777a0fafa5ea328aa20c6bcf7f6ac837"
  },
  "Q1748402": {
    "id": "Q1748402",
    "identity": {
      "title": "鋼鐵議會",
      "author": "柴納·米耶維"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[20]",
    "source_spatial_record_sha256": "19df62d053fac0e3ba4d831c24bf5882ce5c4ca2d4f4acd1115471bf3428e79c",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "准确Iron Council单作知识限定Bas-Lag虚构世界上New Crobuzon与移动铁路共同体；陆地移动与新怪谭形式不自动产生星际或abstract空间。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "ad6c95e8ef268e6cf6d7d1cc379c1e67021aacaa1d877d0a90791bcdaa3e72be",
      "facet_bases_sha256": "46f0c5a0b4350c0fd3b0b28add3ef3e89bc38907d4fad34c20d2f801162fdb80",
      "source_scope_sha256": "c91b266ea4b26437fa8ad655f52d39cf50932f67c5d150f7220e871bd481dd14"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "90de46a714e9735ceec30cc6b46778717f6229d1f6c627dcc02985eb87486d12",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "74234e98afe7498fb5daf1f36ac2d78acc339464f950703b8c019892f982b90b"
  },
  "Q5063196": {
    "id": "Q5063196",
    "identity": {
      "title": "Century Rain",
      "author": "阿拉斯泰尔·雷诺兹"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[21]",
    "source_spatial_record_sha256": "fa7c84865633b9ffb4ac6c47aa85fa43e51aed8aae8dc555ecf3b04457a0e2d3",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "准确Century Rain知识限定Verity进入的实体二十世纪地球复制世界及其中的巴黎调查；纳米灾难后的原地球是另一历史背景，不把实体复制品自动当虚拟程序或平行宇宙。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "aa01118058be66ae054e4ebe57a9969a912d128d65ec58c76e057e74b192804d",
      "facet_bases_sha256": "3ebed2f3ca2e8788042273cd84b457a33d3f773efc02cf5b40178353f89040c6",
      "source_scope_sha256": "00626059ca13c67ff969dfad5b2f9fd10a9df86f1234918e28047ac50e6ab34f"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "ebd2878be1889c8ff9dd7b87678c2c29edbbadd2b3cdc10697c5f57f5a8612c8",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "74234e98afe7498fb5daf1f36ac2d78acc339464f950703b8c019892f982b90b"
  },
  "Q55230380": {
    "id": "Q55230380",
    "identity": {
      "title": "Enigma",
      "author": "迈克尔·詹·弗莱德曼"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[22]",
    "source_spatial_record_sha256": "d11551752050b9e77b3b7d41c62a4e5a3f9059293cc5a56fd093ef836b29ab98",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确Stargazer: Enigma本卷知识限定Picard舰队、攻击者与追踪穿梭机的星际行动；不借后来Enterprise任务或把舰队组织名称当银河实到。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "897e994a1dd53cee167721e6a99c877759ec9b954b99c9a56871f6ac707daaf5",
      "facet_bases_sha256": "56d02ac56dddfe0d71c6a8697fa15315c208fb1bdef9fe1e7c67da64b9618d8b",
      "source_scope_sha256": "23a9fac83cc205693f5f3c23ffb4b914c4009cac20a94db9f25963dc7378eb53"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "failure_count": 0
    },
    "original_cache_declarations_exact": {
      "ownership_sha256": "c4f5abbb4b3f5b116c9f627a6a4f0d8408a90b5c5d091360dd76e4c4cbff3730"
    },
    "original_ownership_exact": {
      "original_ownership_file": "work/evidence/known-year-first-pass-lane-1.json",
      "original_ownership_sha256": "c4f5abbb4b3f5b116c9f627a6a4f0d8408a90b5c5d091360dd76e4c4cbff3730",
      "original_ownership_index": 37
    },
    "source_analysis_record_sha256": "618993bc643d77e8ebaec7633a15a218db62237daedbe4ba110f286f3fe9086e",
    "source_log_record_sha256": "cf1803c7438c4a0925464f847cb41122319682788738ca21c58b55eace6b52ea",
    "wholeprior_sha256": "1bc996bfb099f2086097ed2dc8b7fb0dbacf6182ae40927af62bc414a6c198d4"
  },
  "Q5694612": {
    "id": "Q5694612",
    "identity": {
      "title": "Heaven",
      "author": "艾恩·史都華 / Jack Cohen"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[23]",
    "source_spatial_record_sha256": "a8ea3a909e7dc0b3085af93a222174f12d43d5b5dce79b090140fd2f7a7cfe96",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确Heaven单卷知识限定Samuel与Second-Best Sailor、不同生命世界与传教舰队的恒星际遭遇；Cosmic Unity的思想使命不等同宇宙实到舞台。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "6483bc063c9bdcbe5512821e5dfc0c09cccc1b0a6f7ee407c2b0ae4c009010cf",
      "facet_bases_sha256": "a0099be057f0caff97b118e55bc1c48a8e8cdd3298f5b942aa62c2dbeca20e49",
      "source_scope_sha256": "9dc5c866a0e451167db001223fa7544556d0f46056e77b89dcecb9250c3f6c14"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "0a97b0587d4319540387afe280ccfd8a50cf4aa6b747abb98957101b650a140b",
    "source_log_record_sha256": "a396a27e1a717acd75a63b1028c426610f0baac4f6507e1d2b98828cece6de6b",
    "wholeprior_sha256": "48b455a7b5c952e1874e27d6ddf152ae0eb6283f02b0fb87de16f4307d24b55f"
  },
  "Q7733264": {
    "id": "Q7733264",
    "identity": {
      "title": "The False Peace",
      "author": "Jude Watson"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[24]",
    "source_spatial_record_sha256": "df34942b1e2445067d52371e62c995590a283264e5eb1395fa084b1c8764f2a5",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "准确The False Peace单卷知识限定Coruscant参议院及绝地阻止袭击的城市行星场景；银河秩序后果不是已遍历银河的空间证据。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "2b0c41182bdb74e1af7b381705c72a73b56f761538a7c878d286c22e5f32b564",
      "facet_bases_sha256": "22b878aeff0a7eee3bec7c66956ddc531c954d424843b0fa1fc9893ca5f95099",
      "source_scope_sha256": "7a1e6c9325b44ae3fed3913fc803eb14392112d8824258061aadc4c12569a6cf"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "current_unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {
      "raw_search_artifact": "work/evidence/quick-retry-modern-r5-search-a.json"
    },
    "original_ownership_exact": {
      "original_ownership_file": "work/evidence/quick-retry-lane-2.json",
      "original_ownership_sha256": "f1e3bce7c91b9744ab300726ea85acd26e5f195553ce022a63559cc16e04bda5",
      "original_ownership_index": 139
    },
    "source_analysis_record_sha256": "9bb8881293f50c247603c520f9eb2efccc0d4d1a1d9c14d22d85d5ddd4f3562c",
    "source_log_record_sha256": "d901bc3cbedae3874fa2bd2cc689288eca25f35eed78c815cf0f6a162f1a70d3",
    "wholeprior_sha256": "85013c770c2aa1ec5b38d0489391a186e30689a87e4ab12b88227b230a26d545"
  },
  "Q11122092": {
    "id": "Q11122092",
    "identity": {
      "title": "機動戰士海盜GUNDAM~骷髏之心~",
      "author": "作者未知"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[25]",
    "source_spatial_record_sha256": "3cad54e2c23939454481c22a0cc84c1ab769a67ebd728e8f59c94aa66619d69e",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位Skull Heart已分析选例的太阳系海盗军记录与一年战争回忆框架；木星战争、Ball与Dom的记录不扩为别册或动画全部事件。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "2823b21d59107db8bcb78e8431a7e8d43c598910fe1f93a3a2966448b716354b",
      "facet_bases_sha256": "376687afb5abcbc9519a4c9ed22ccb3741c1d410ea3f33ce8ab3fda5210449db",
      "source_scope_sha256": "2e7844aa7c2f1e684018f4f97690559e40cc0f7477e5304f45432f1863edebc8"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "failure_count": 0
    },
    "original_cache_declarations_exact": {
      "ownership_sha256": "c4f5abbb4b3f5b116c9f627a6a4f0d8408a90b5c5d091360dd76e4c4cbff3730",
      "private_raw_search_return": {
        "path": "work/evidence/known-year-global-r2-search-40.json",
        "sha256": "169badae92de9e4f6e0d15aadf41e71135a46702ac19895730693fa59e6cb068",
        "scope": "本身份一次short精准查询完整真实返回；只采用日志中明确所述范围。"
      }
    },
    "original_ownership_exact": {
      "original_ownership_file": "work/evidence/known-year-first-pass-lane-1.json",
      "original_ownership_sha256": "c4f5abbb4b3f5b116c9f627a6a4f0d8408a90b5c5d091360dd76e4c4cbff3730",
      "original_ownership_index": 40
    },
    "source_analysis_record_sha256": "330a342b9cd62e6aec8db1bfd429674a32d04d93c498203cac5bf7660794f8ff",
    "source_log_record_sha256": "d055032d3f2c4e3e78441087fdf4104cac2c2e367acd567831fea73f7f8f3aa3",
    "wholeprior_sha256": "2e3dfd424fda314ed6f4823d981f5bff2ce268ed99fa51cac3a020e56b34c946"
  },
  "Q122058672": {
    "id": "Q122058672",
    "identity": {
      "title": "La Cage de Londres",
      "author": "Jean-Pierre Guillet"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[26]",
    "source_spatial_record_sha256": "8f6f29dbde66a5c17c3bcbfabc8edb8206d6f2910d41c3484ca52584298653c2",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "准确La Cage de Londres本作知识限定火星再次入侵后的地球人类圈舍与George的供血生活；火星人身份不是George已经抵达火星的空间证据。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "b95797842eead11ff02bd6228866a6ad7b16769ab8e4aedf962ef534bc747eb5",
      "facet_bases_sha256": "801a5553aa71e3ce2c5dc723fa5412e21fa5e4d2aff9d1ca7029b6ccecab2aab",
      "source_scope_sha256": "d1449abce38a309ebe8b428aba6d331413a316449497ec3df8670202a3088e6a"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "cd8ac02139f2dfd9fde71b39fe91128acb1eb972ebf0216d16aa4f99307ecac4",
    "source_log_record_sha256": "5c7703a7ec9b25a04287fe2799890ab232e55ce5df515b9540188fa70a0b24ab",
    "wholeprior_sha256": "133d00f4efc3e13dbb0e71ab21b28fe7a85c0242e87c1af55b038cff301785f4"
  },
  "Q131461766": {
    "id": "Q131461766",
    "identity": {
      "title": "Off on a Starship",
      "author": "William Barton"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[27]",
    "source_spatial_record_sha256": "34a729660641aa7cfbfbd0294072d0fdcb83e3d8b3dcc903f2156bda5bca4db2",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "原单篇评论明确年轻读者乘探测器离开地球、抵达衰败帝国遗迹并寻找归途；限定已发生的跨恒星世界处境，不从帝国辖域推出全银河行程。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "35e722f179642b2f057f3d9c16f52c906452637d387130b706ede0ce5ab3cf68",
      "facet_bases_sha256": "df7bd817ec71541efb634ae3c4388da4376b750ef9476d6ad5c0eef332008f21",
      "source_scope_sha256": "e976bffe29017b5ed5f8cab22d516f959dd3c939503fe3860b066e38ade0e91c"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "c0ffe20f32a8642e8201024ddc747605a2485fce218a901484fb052d5ba0e18e",
    "source_log_record_sha256": "c9bb1d1ffa4ec9b54c5fed03825cfd6885d72649b9fb2ae98605fcc4106c67cd",
    "wholeprior_sha256": "0902256e62b7fa15694d33e0f1c1c8220c61e5cd0e18b7112e74b234ebc99e3b"
  },
  "Q134608990": {
    "id": "Q134608990",
    "identity": {
      "title": "Le dragon aux plumes de sang",
      "author": "皮尔·博代奇"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[28]",
    "source_spatial_record_sha256": "5d2a62aced392655fdd4ac9acdb966d8d2875d733e2e490463ced52396b3eba6",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "原第二卷书介明确吟游者跨世界向分散人类唱述历史并被重新召回使命；只按这条世界间活动定位，不把整个文明的历史记忆视为实际银河全景。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "7781c7a520096fd8129a741dfa2ed949d9c1760a22c670927d4a57d8ec7dae19",
      "facet_bases_sha256": "9b6c4d54e7a8bbebdd5f97d8dc1f7bfd03b5d65790a31d8302980e686e53bb39",
      "source_scope_sha256": "837d00d993986e33cccc0a524066f35ed257b34de6c8bdb5a103266c5a34b01d"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "78b8d77a423bad2f3b2ad09344fecf1542b71b710a12854b514b46bed79e77c2",
    "source_log_record_sha256": "4e971605dd9f7fcfff6e70fb3a98f5eb4ff97b11a8f2dc8a5f05d7e268033c83",
    "wholeprior_sha256": "cdd871e23694990756ad859b0e225a06cb35068c38b15982eda5904b8b10714e"
  },
  "Q3235224": {
    "id": "Q3235224",
    "identity": {
      "title": "Force Heretic: Refugee",
      "author": "西恩·威廉斯 / Shane Dix"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[29]",
    "source_spatial_record_sha256": "c4c8415517109858d204964791140b96150434d3a0d84e29ad8d048992668bdf",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确Force Heretic: Refugee本册知识限定人物在不同恒星世界的战时行动与Luke的搜寻；不将联盟名称与尤赞冯势力等同整个银河被实际到访。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "88a4eaf8b3d58514dde0aa37a65715118c41b86af699f6650128ca818d8dfff4",
      "facet_bases_sha256": "aecdbca354f8282b436bd1f7d50f2e98e6f61c83af7715769f7ebfa3e90f7ba3",
      "source_scope_sha256": "0ac8c97a092b9fb7e4dc3ca87d6a686231aa24a9379579039d7859b1c9d3ec07"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": "known-year-first-pass-lane-3.json",
      "original_ownership_sha256": "b193cb6e5cbf290ee699db0a540b6b05c6c1855dccf59651ecb3eacfaa865e0c",
      "original_ownership_index": 42
    },
    "source_analysis_record_sha256": "10cb1f04363ab1b10a31449fd912b2a2e9d3ea869cc09655d5c7f85d23cdf3e3",
    "source_log_record_sha256": "8aa01fea62c08bc926e7794e969fc4c5d2e84f672e67fca39d166dca2ac24a3c",
    "wholeprior_sha256": "5d83ca9755954352e74efc7b519d3ef777166fa9fd6e36ad326ede5a6f9de0a4"
  },
  "Q7732587": {
    "id": "Q7732587",
    "identity": {
      "title": "The Ethos Effect",
      "author": "小L·E·莫德西特"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[30]",
    "source_spatial_record_sha256": "e8ea727fc3ee2b4c50d9569bf7f595ba7bd11e3649644c2ddac3fae6ec7f22b2",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "原作者书介明确退役军官成为IIS私人组织飞行员后进入星际冲突；只定位所述任务尺度，不把基金会势力范围或尚未发生的战争预判当作完整实到范围。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "3b857de924e572e57d102e65a127c22d8ce076c7a434173307c6b56ec2fd20ac",
      "facet_bases_sha256": "9d77295851abe94f906c732c2772555bd12c260db7f67e06625b2813be83b810",
      "source_scope_sha256": "128494686798807eb6df67e4bfdfd372b5418f82f406bcd2883957dac69bf85f"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "fccf48281936c91f693b7ca2cccfa72a84900be6570c5a932a08bbe908581d16",
    "source_log_record_sha256": "ef7004f6bbedfcac9a97703ac21f10771b6a0ec494906801c345bcb8d09fbc0f",
    "wholeprior_sha256": "02b1efca42054087ea52cff7c945427a6a8d49d879b88020710ffaa79433ea00"
  },
  "Q7732812": {
    "id": "Q7732812",
    "identity": {
      "title": "The Expanse",
      "author": "Jeanne Kalogridis / J.M. Dillard"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[31]",
    "source_spatial_record_sha256": "dfa2e92e89bc5d18c5147938a1addac7508bb95e5e061991858d9b2ae30e6842",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确The Expanse小说化本卷知识限定Enterprise在地球袭击后的星际航行与危险区域任务；不以整季或之后Xindi战役的全部地点代替本书。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "6dcc2f5879845d8077ab06a6b4095b84f6aa8dddc5d92bf0725f4c41bc11d1eb",
      "facet_bases_sha256": "ecc4133551e37a53bbbd120a1088454eaf8e5e3995e26c9146e2a21614f5442a",
      "source_scope_sha256": "7ae8ef2875ef11c5e6def350aa0e846df6beda3f0df149859ca601989e1d2785"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "c4a5de6087766b0edf2ce93454cc0f164f479a8a6ee4ce41540ce75be63d3e86",
    "source_log_record_sha256": "2e21b0745539161cf11e46ec7f5b557d6fabf90e2abc47610703f11e9e1b040b",
    "wholeprior_sha256": "62a647422227c75ffaa28408670795849647c0d75e96c222a58d163f59755b59"
  },
  "Q785354": {
    "id": "Q785354",
    "identity": {
      "title": "Time's Eye",
      "author": "亞瑟·查理斯·克拉克 / 斯蒂芬·巴科斯特"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[32]",
    "source_spatial_record_sha256": "1f0b82f47c2b9ef448222d03d989929c0c19c815e2fb42d00b5e88e785a19e38",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "准确Time’s Eye单卷知识限定被拼接为不同时代碎片的地球与Babylon附近的共同生存、军队冲突；时代不一致和外部观察者不自动构成跨星或宇宙舞台。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "c32613f6d103620afa506a3aac0cc8ee99eda1c1a422522e40890537c228ecc4",
      "facet_bases_sha256": "e8c3f2dcd98f0ea32b7747402d1df73621397e1bd8f948e66501319996b0d3e1",
      "source_scope_sha256": "3e1edabe5399b6898ec3701c8092b18bbb631942c6cbc78ead10f290a3f9b42a"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "1652b02b3608c724627932baef1b6e32b5b70459f6c2a33c8de6e11d4aaabb82",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "74234e98afe7498fb5daf1f36ac2d78acc339464f950703b8c019892f982b90b"
  },
  "Q12055126": {
    "id": "Q12055126",
    "identity": {
      "title": "Směr času",
      "author": "亞瑟·查理斯·克拉克"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[33]",
    "source_spatial_record_sha256": "610683d97c01c3d8c64ff51bce182c26a82883d21ba4eae5e1070e9b26fb924e",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅按本捷克语集确知成员Out of the Cradle, Endlessly Orbiting定位月球探索与孩子诞生；地球之外出生是本成员阶段，不代表全合集各篇共享舞台。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "4319e78db2c9d21c6a7d79227e7425a09d8a0943f09cfb97151160c6625f1109",
      "facet_bases_sha256": "704f0b9bf5180f70a31ae06b1a8455f3eabfe4f2e500c68cb029b91e4ff00b44",
      "source_scope_sha256": "2e7844aa7c2f1e684018f4f97690559e40cc0f7477e5304f45432f1863edebc8"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "failure_count": 1
    },
    "original_cache_declarations_exact": {
      "ownership_sha256": "6ac6307da6880daa689e10a48c35466fac9ed028ea6a42764b0ab4af29d072bb",
      "private_raw_search_return": {
        "path": "work/evidence/quick-retry-global-r5-search-146.json",
        "sha256": "d992e352ef6b130e246a8d04136d61dfc15559946964029b1c1db33a02633452",
        "scope": "本身份一次short精准查询完整真实返回；只采用日志中明确所述范围。"
      }
    },
    "original_ownership_exact": {
      "original_ownership_file": "work/evidence/quick-retry-lane-1.json",
      "original_ownership_sha256": "6ac6307da6880daa689e10a48c35466fac9ed028ea6a42764b0ab4af29d072bb",
      "original_ownership_index": 146
    },
    "source_analysis_record_sha256": "10413ba116da98499363145a752e4fa8cf2c7d925ce129b1b55462ad4f41bd09",
    "source_log_record_sha256": "82a28e476eef9e72da402d6d79e516ab7d785ca764b55c0e7db14498cdf0e300",
    "wholeprior_sha256": "c7d61b8b90839a8d15e4d8d2f5b0b3f2861dea959b776bf88382be01837d8ed1"
  },
  "Q3149129": {
    "id": "Q3149129",
    "identity": {
      "title": "外交豁免权",
      "author": "洛伊絲·莫瑪絲特·布約德"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[34]",
    "source_spatial_record_sha256": "ad7e7a1f0b32e6f45874b0d56be50aafe0deaef515d3881461e928df89652b02",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确Diplomatic Immunity本卷知识限定Miles抵达quaddie自由栖地、商船航线与跨恒星政体之间的任务；接待站内是局部环境，不借全Vorkosigan系列扩大实际路线。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "11f5a5bdbe829c51785a302a40011d63feb89f696c5c9d73b386e6cc39043bb4",
      "facet_bases_sha256": "72984af2583d629cc52b403f7e8e587c393ba526c51b6bedc244cd74c1a31b5e",
      "source_scope_sha256": "85c20bcf8305e74f8629ee1aaf1f7102d0bf679bc669f5b91f193e766ba1de9a"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "a7c617e38cac0cffce2a693dcf942b63d1c3d5aced0b6e3dde2a944cd8b2f1d8",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "74234e98afe7498fb5daf1f36ac2d78acc339464f950703b8c019892f982b90b"
  },
  "Q55230522": {
    "id": "Q55230522",
    "identity": {
      "title": "The Genesis Wave, Book Three",
      "author": "约翰·沃尔霍特 / John Vornholt"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[35]",
    "source_spatial_record_sha256": "c4929258b98d4689ede055b9ac601ab1b11aa01a742fff246eeb30ca869abf35",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确The Genesis Wave第三卷知识限定Picard及相关星舰面对不同星际世界的冲击与救援；Genesis波扫过银河是灾难范围，不等于人物遍历全银河。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "8918882e7efd1e64877d92b133bb02fb7979761eeb3dc7137733da8fefe75201",
      "facet_bases_sha256": "e55fd0286d624e9c1bd0c3a453e523b1fbc592e1c96eeb024ceb66d6e6fa9626",
      "source_scope_sha256": "fa2b3221904737928eb56295d4dea0b5f6798c5f5f6cf47f2106bcbfced02dee"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "5269de1d63c0c68c8d199091d3705d2b8704afaf5922df5decfee5c3ec0ff1f4",
    "source_log_record_sha256": "867be46a9677322379a17d7944572dcdc2d77aeaf4674e6a16f183956ee0fad1",
    "wholeprior_sha256": "92fe57a86d48481abef4fd93fbfdadbfbfb14dde5e2f3c5040d80a11ac9bc40a"
  },
  "Q131222069": {
    "id": "Q131222069",
    "identity": {
      "title": "The Days Between",
      "author": "艾倫‧史提爾"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[36]",
    "source_spatial_record_sha256": "cb34a65a96d419cdb0d9ece3b6b265c34882725a74ffd9cb94dddc93e35b05d7",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确The Days Between单篇知识限定Gillis在Coyote恒星际殖民航程中独自苏醒的船内生活；他记录的幻想世界不作为真实到访场所，也不把目的地计划说成此阶段已抵达。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "ef76780e51a6888ad5289c697bbda19f3227377fe5807ff3c85e0932c81748a3",
      "facet_bases_sha256": "952432322fc8fba83ef5138cd562bf2eeb734a639a8758d4cb1ef739fadcd47f",
      "source_scope_sha256": "88ee34d8f2711318e64bc5ce61f3920eb929b3fe800c7122bf20165d225501d6"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "0acf964b0131aaad219900d1d0704145b51df9564c02f138a3153f31265ed24a",
    "source_log_record_sha256": "4708995c104cbf3dd102959f466331de8fff38432bce4dbbe51c9acf20b57bc7",
    "wholeprior_sha256": "f66e9923992a2bf521c37d8f0f373376ced6c0386f52cce8e11284b6bb2dde6c"
  },
  "Q131381209": {
    "id": "Q131381209",
    "identity": {
      "title": "Metaplanetary: A Novel of Interplanetary Civil War",
      "author": "Tony Daniel"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[37]",
    "source_spatial_record_sha256": "22677dcd79bb253a1c9905af6ab64d6733d6111d602f4918233e9baf2a0fcce8",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "准确Metaplanetary单作知识限定太阳系内外行星、纳米结构与行星间内战；电子意识形态不自动创造虚拟主舞台，去中心社会也不等同跨恒星旅行。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "d9151b011f1f11474137350128e924cd4e881705ad5140ebb04edbbf992b70ae",
      "facet_bases_sha256": "a9a8c94fee47193595a5cde3036d3313c921b6b89009a0cd92b984e6ac466f7d",
      "source_scope_sha256": "7dcd3fea415d40d6b4c7a54debedc63dd02adba3d434e0f3c72e378aee7440d0"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "9db0c56757a4fe96f89f3b421711a7f33212e2015c174433382dd4997c3ae835",
    "source_log_record_sha256": "8e0330d31647f794167b6e671f6a74947534a9b0f0e5a26c7f15ed54bbac0b2c",
    "wholeprior_sha256": "d7bafa6aed449a7449c311c5f0c1df434cdcd262b4bbf6b480eaab6e5255502e"
  },
  "Q131381216": {
    "id": "Q131381216",
    "identity": {
      "title": "The Secret of Life",
      "author": "Paul J. McAuley"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[38]",
    "source_spatial_record_sha256": "07ef3c7050700c6629cd99e440259e85fe0b2e778faff5cfb566bbb9aceb5ffd",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [
        "earth"
      ],
      "spatial_rationale": "准确The Secret of Life本作知识限定太平洋生态危机与Mariella的火星调查；两个实际行星阶段不扩大为太阳系之外，生命异源假说亦不代替地点证据。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "52612e974d446a562a4d1759932f86c9144fba4525bc6eccb0e8be47855d3b24",
      "facet_bases_sha256": "851888c99f93b9d309d9d7ef455742c3741592c431d7597858493cc25bd48c23",
      "source_scope_sha256": "17d938f570de7beaac0271b2095509046903c1fba16e76c935c457cfed9310f5"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "a57872cbafb5b2c4c1fdb1243aba92e35dd25704839478f708c6147984477e7f",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "6428d3dcbdbb05cd67d0dd8d34494353710fe3d006dad822412641226a6c44b0"
  },
  "Q131381239": {
    "id": "Q131381239",
    "identity": {
      "title": "Whole Wide World",
      "author": "Paul J. McAuley"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[39]",
    "source_spatial_record_sha256": "4ce976e09f8843a0759d5763946e61d001fcb7c04b3da6f107c21e46ef1be411",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "原具体本作材料明确Infowar之后的伦敦、街头摄像机和谋杀调查；网络窥视与AI监控不自动改写成虚拟世界舞台。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "cf16d7b49673212cc37d82033276c0be009322967787cf494d6a6dda12593b4e",
      "facet_bases_sha256": "6ceeec03556a731d441c10cf5670fe6b1d5da38d3eb04fab7cf48e43abc975a8",
      "source_scope_sha256": "a3a27a5fc66fb423e69c64aa4dcf90c6ed17099b0ae6479620d1fe144749f525"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "d7cc18a7caed4e315ba830d77ca50d0cf45b76bfc97f858fd99fa3db23aeaa39",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "8d61e0279690ed7efedd0df6955114f393789a03e85e184f0e9872d0d504ac11"
  },
  "Q134723266": {
    "id": "Q134723266",
    "identity": {
      "title": "The Children of Winter",
      "author": "Eric Brown"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[40]",
    "source_spatial_record_sha256": "5e1d68a80c253fb4049a89c18889297a21dca2994031703f633617b6c3027864",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "作者本篇说明明确失事船后裔定居在椭圆轨道行星与冰封城市，限这一虚构行星；祖辈坠船来历不自动成为主角已进行星际旅行。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "6fbb26dd7208f2f838800a151e1d0d3bc77c9af974714705c70b6a90c49043b2",
      "facet_bases_sha256": "3d74e638ff405eb4205222eed5e360ff0d0421ed18acbe324c69b428cb47c1f5",
      "source_scope_sha256": "c4c71998bf4cb6e9cfc0090e1ad2f55dc0929a4afda7d5141d89ef1271516ca9"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "be44de609c9c59d1021993b238ae2c5b71d995d0370f98ef4bbaa3e693f8a1f6",
    "source_log_record_sha256": "2a4ee62d0bfd4763297547dd493b9becc80409fbbddbcc2157ad9fdabeb96986",
    "wholeprior_sha256": "275b774cb9bc52a8945206e7f19f0a048a7af56aaee0f4504fa6534f11097616"
  },
  "Q1605815": {
    "id": "Q1605815",
    "identity": {
      "title": "The Eyre Affair",
      "author": "Jasper Fforde"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[41]",
    "source_spatial_record_sha256": "8437a4a64b55a010ddd18fd0a5f0708ba9d0e58a2e739a7313626ed34f3b2a6c",
    "reviewed_spatial_fields": {
      "spatial_primary": "abstract",
      "spatial_secondary": [
        "earth"
      ],
      "spatial_rationale": "准确The Eyre Affair单作知识限定Thursday实际进入Jane Eyre文本世界的阶段与另种1985英国；abstract对应可进入的文学世界，不仅由另类历史或时间差产生。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "7affd8651ed6c38a672a79267389fa456012811b31056a0fab1b0296a99ad762",
      "facet_bases_sha256": "51f2645e1bb898feb4f7216f534b6929e669ddad635498bed97e385f5621e64c",
      "source_scope_sha256": "53b289846746d69ee119d1d0553e30f9d9ac85094bddc68cc57ec684c513caf7"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "6efc36ee37aedcda8b266c28e017b51b18d3de1d25f3ddbbf56ff6732454dbcd",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "a0207188d24f6f7f349e39166ecfa8a03eca56db19a0e80ad155b8212756999f"
  },
  "Q18011224": {
    "id": "Q18011224",
    "identity": {
      "title": "Dogged Persistence",
      "author": "凱文·詹姆士·安德森"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[42]",
    "source_spatial_record_sha256": "c29c29879cc83ba452352387c7e25e7d050b6e1b858c3206af954de3f8f816a2",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位Dogged Persistence具名成员Human, Martian—One, Two, Three的火星劳改营；不把其他成员或刑罚机构背景并成整合集同一舞台。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "428c3a3a8b547a38f4bae8acce0677035f400a12d4291bea4fe2d45e4762329b",
      "facet_bases_sha256": "515af5934a066616487570e557002b3f1e58668195d61c575c4a304091d2a416",
      "source_scope_sha256": "5b9995199e6ac7c67091ec370fa5c09ba08b2ebab6bcd4d59fe7b96528a1a0dc"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "failure_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "4cb0e1acdefe144a376523c1e611941a09b0749b9ef6d41dbc80e169538f9b20",
    "source_log_record_sha256": "7fa5a42e0fe9e95bdc1df8ab6ab9765da644dc5e20cdec69aa4359eeb7775839",
    "wholeprior_sha256": "877329da39002b80fb4dc275262200ef8d2aadb4a062f4e55d3ae953aef2b473"
  },
  "Q202531": {
    "id": "Q202531",
    "identity": {
      "title": "骗局",
      "author": "丹·布朗"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[43]",
    "source_spatial_record_sha256": "30b9a253c3d0cfdbd4c9300af82fb0fd71904ffdb4bcab2525a6d0a2707a2a29",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "原本作明确北极冰层、NASA信誉、总统选举与地球调查追杀；发现来自太空也不把人物调查舞台变成实际外星旅行。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "1243ae832c74728e0f529d9dd6db4ddd59ade51035ea30c9aa391e123c3fbe2a",
      "facet_bases_sha256": "310b5415afbc1b1bc46af2eda7b6d1d09c583a31e11257516f309b06a31c895f",
      "source_scope_sha256": "acf6462a5c2789e11cc7a16a9dabe945309989e0c1ffd90aac3d6b230f725a05"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "2fadf43a2ea46f293915eef57a23f4efb932113acfefd99ea08d0dc686e6e4d2",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "74234e98afe7498fb5daf1f36ac2d78acc339464f950703b8c019892f982b90b"
  },
  "Q27657024": {
    "id": "Q27657024",
    "identity": {
      "title": "Hammerfall",
      "author": "C·J·彻里"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[44]",
    "source_spatial_record_sha256": "4f631f55fb0acb6dd19b3d457a015199ba31dce233de6d26736d13aef442a5a9",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "原本卷简介明确冲突集中于一颗沙漠行星，限此虚构世界的当地居民处境；两个敌对星际帝国及纳米武器危害为背景，不扩大主角实到范围。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "96ba692df3951e5305d4c822d0c0e0d7fa28c04b355cb91c638077b65096ce43",
      "facet_bases_sha256": "eae27405fca81c4d31785eb0792f8a45e5262bfd53487c50d49bdfe915f87744",
      "source_scope_sha256": "306eac084b593b3962d518b7f4563ac3e8dc0034d00101a61e36f82685020984"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "7e058b9f90869b64921bd0fb6ac3243278cb2940708e198d8d2ff0dd67366bf5",
    "source_log_record_sha256": "87357f4220ff26b672b51d7585907288841bc0572b646dd96990986d10d29160",
    "wholeprior_sha256": "306513b1c699c5efa77ed236e4374e9b79a810af1065545e8da0dffe91f51230"
  },
  "Q3038780": {
    "id": "Q3038780",
    "identity": {
      "title": "墮落的龍",
      "author": "彼德·漢彌頓"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[45]",
    "source_spatial_record_sha256": "f6a72e49a95dc1034efea5b67d0e45dbc9d75e06208ab546d1ca9fa715a1cd42",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确Fallen Dragon单卷知识限定公司军队进攻不同恒星殖民世界的行动；个人梦想及所谓资产变现的经济势力不等于已遍历整个银河。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "c84cb5f815a89a609527e6ad0d43981d0336fdd8aa9f210efa2cb48fb72f75a7",
      "facet_bases_sha256": "0087b8f23db58d1062fe91c3dc4ca26c1d347c308636e362e77965bf5a401059",
      "source_scope_sha256": "c11414fcec79b4b57098eb146c80806c3e5ad776f5ca6019ab5091365208fd2d"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "97a5fd6c88b6e478821105180472a185bbbe0c5f385cb7c35c5140164812fa3c",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "99cc871d257d7c7efc7c014665ab5958ad2e443a29b65ecb41c501a5a51a95c3"
  },
  "Q55230360": {
    "id": "Q55230360",
    "identity": {
      "title": "Dark Passions, Book Two",
      "author": "Susan Wright"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[46]",
    "source_spatial_record_sha256": "2b38dcf0bb59f79c017445c8458db7871fc2af06b2ec1d9d4f290a1abd8f204a",
    "reviewed_spatial_fields": {
      "spatial_primary": "abstract",
      "spatial_secondary": [],
      "spatial_rationale": "准确Dark Passions Book Two知识限定Mirror Universe中Kira、Annika等人的政治与私人关系；这是具体平行宇宙舞台，不根据亲密、秘密或权力斗争推标签。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "3148ae7dc311f3090ea831672d0d9219162b33b8db8cf9dc8de1e7d03f0cf938",
      "facet_bases_sha256": "f0dd267d2520c57dd6028bf8bb7ae83a837ffa02b9e141bcb94c3ee7f6b8177f",
      "source_scope_sha256": "5375ed7d5a0c01bc717c9ecfc89565948bf1309f75238aadcde98e5d9b0b17df"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "5b928168e6ad6274ee15855801a54ee37afbe70ef7ca6b0083c912622387c5bd",
    "source_log_record_sha256": "f5393efcfdc4f39fdeac2308ea606b96d0b7d29676950b9c96b30d401370cd98",
    "wholeprior_sha256": "05ea25e3702faf93d6c436b2cb4f31bd732d464f6159e608bc1132a34dd50ce8"
  },
  "Q5608658": {
    "id": "Q5608658",
    "identity": {
      "title": "Gridlinked",
      "author": "Neal Asher"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[47]",
    "source_spatial_record_sha256": "be2786ba935e4a3fddb57792894a72e0f81dc3befe9f78f5a253dacb3c30fec3",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "原本作明确调查Samarkand事故以及复仇者与机器人跨星系追踪的行动；gridlink是认知技术关系，不自动将物理星际舞台改成abstract。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "a9a67bbee5e7bdfdb43a386912864bf2e9c6490755a438a9ee6bb36487067b68",
      "facet_bases_sha256": "b014c709e0fc9f6b557adc1208d6025ffce6464c99b44aca37e9ac57fbb97ce9",
      "source_scope_sha256": "462a05571cd62c53dbd377879b039036818b88abb5390d87bac67fb9aba6d5c2"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "6d1a1adbe1fd5e1d5acdfd3800eff6a670fa99018af15935551360c11757b874",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "027d5d6115659c375569927fb15c5aec8fc8cfaa89ae08d5119565cc80e3d853"
  },
  "Q7755685": {
    "id": "Q7755685",
    "identity": {
      "title": "The Outpost",
      "author": "迈克尔•雷斯尼克"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[48]",
    "source_spatial_record_sha256": "d17c1ba30ef9be98565ce5cc006874cb98d24f430e507fe27f002638ae7da730",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "准确The Outpost知识仅定位英雄聚集的边缘酒馆所在虚构世界与他们被战争检验的共同场景；酒馆中各自讲述的传奇不自动成为全书已证实的完整星际行程。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "a967746c1cca6faf10fdbfbffdcdf03d6b3847c72802da48219d256475f1d1d3",
      "facet_bases_sha256": "220faa10de5367386762b4c1d85448cbbcf5f14a888b342a41829db643085a4a",
      "source_scope_sha256": "e0f1a7980d1e47e15f5016fd4b942770ce42f8a596ed6a5e0ce9bf07bcbae090"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "f577ffac09451775344859b33997ed88dc17dde4d8226222a540dfee1fe4ec26",
    "source_log_record_sha256": "e0a163f65a8e822695432d7aa1ecde6a1dd23cdc0c037bea8832a8646ab1c982",
    "wholeprior_sha256": "ce0c1c3f5726246fad44ab0badf715a41b4fe03732c3590a59ce0a01ddedb390"
  },
  "Q7776538": {
    "id": "Q7776538",
    "identity": {
      "title": "The Year's Best Science Fiction: Eighteenth Annual Collection",
      "author": "作者未知"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round2.json",
    "source_spatial_file_sha256": "f29a529c8bd01bed0bc41d88fda7afa93270fcc650442cc9f739ae39d5156cd7",
    "source_spatial_record_pointer": "$.records[49]",
    "source_spatial_record_sha256": "0cc49776d28a4f30235919b24e3a538bc3f4100fb09e532d4318cebc1ccadc7f",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅取本年度选集已述成员The Juniper Tree的月球殖民社区和家庭冲突；不把另一选篇或地球社会的熟悉关系当该集统一空间。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "264054d841fd6beb434b37064ed88119153cde044f6a19d97ec10004400f5a98",
      "facet_bases_sha256": "4ba250faf54f5ffe1990859549294f183403ff6d652a9f36b5d7edb6a3b861ef",
      "source_scope_sha256": "1326eb57a9238987b450d098d854382747da1667841c3185baa07a88eb30c601"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "failure_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "c44aaa1cdbeaa7116b3bc4c739f35777a10fd34f503033a12ec8bda042cd4997",
    "source_log_record_sha256": "30415a8258d5c08257e5848ed9a29feae0a4c6cd453290fa8db46a30af033eb7",
    "wholeprior_sha256": "2f131ecee6494017542cba54a6339195391b30d73dab7198dfbe23f7d254b6bc"
  },
  "Q108535553": {
    "id": "Q108535553",
    "identity": {
      "title": "Witness of Gor",
      "author": "約翰．諾曼"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[0]",
    "source_spatial_record_sha256": "471349c4dfc32843e447ccd7f7ac1490f0adf0b27797f917443c48232fb49587",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "原书介明确Janice被带到Gor后照料囚徒，限此虚构行星的生活；她的地球来源不等于本卷已描述另一段实际地球行动。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "3fa05f2546fd34dedb40a08f0296f484d5856f8c5aab17aac029327fe741f46d",
      "facet_bases_sha256": "99b815c93b8a1a8b7c1ccc1dc418e2378f01cc04ab53a02614a3c64dfbb4363f",
      "source_scope_sha256": "7446417242bd6e6fb08bbb5cc68d278d9a0097b3979b5310b37bb0640637e1e0"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "fa35dc849420292123823a9bb10131f0edc59317c666a63d8668f06a24f707e6",
    "source_log_record_sha256": "4273337d6fc26c71d3187acbb836a4b39b289b0850f16849bf25c95bfdc9fe15",
    "wholeprior_sha256": "7dfd1907875d8c0fee013c3e61b22a938df5277f8e87e3038cf1d3b2175603b3"
  },
  "Q11311483": {
    "id": "Q11311483",
    "identity": {
      "title": "s-CRY-ed",
      "author": "黑田洋介"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[1]",
    "source_spatial_record_sha256": "6ba9bddec80f35cc689c65c4ee45d24d62787cb7a39e9b55732e94f7f0fad2b4",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "原漫画版材料明确日本隆起后的LostGround与当地武装警察冲突，限这一地球场景；Alter能力不据此成为虚拟空间或动画全剧情。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "ad25e36fe5b39f1de343d478f0686b9194cfdec02b67cd7cfa5ca02d16a00102",
      "facet_bases_sha256": "1fc3b006551dd65db125645dcbe2f1e73eeff5a8b6d234a61e81cc6b34ac115a",
      "source_scope_sha256": "5802fc0641b0d249a46724f17524d77b4a3d3ba52b25c7ff01cef1360507dbd4"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": true,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "current_unsuccessful_attempt_count": 0,
      "actual_open_count": 0
    },
    "original_cache_declarations_exact": {
      "raw_search_artifact": "work/evidence/quick-retry2-modern-r3-search-batch1.json",
      "raw_search_sha256": "98cf5ecf316bc57d39c1de118929ec88c498e9de685f8d4b3a6a47f363317fd7",
      "raw_search_record_sha256": "6de517316271d03223c0a27ed602c71381095029d465fad23c52ee1eae3d43bf"
    },
    "original_ownership_exact": {
      "original_ownership_file": "work/evidence/quick-retry2-lane-2.json",
      "original_ownership_sha256": "1d0623bb95ec95be038d68eeeda5404a04ebc150f86e82133086b36d194428ae",
      "original_ownership_index": 75
    },
    "source_analysis_record_sha256": "daf93408373e97d1e231ee4b55bf208ff51b19533bd3c4dc8f9ce4b5e7ccd94d",
    "source_log_record_sha256": "b95e10ca1ae00533ff37e8bbd7f968fc2cb06b821e10b71a1d3effa62cfd60a3",
    "wholeprior_sha256": "5f554c212ef061a9769cc7956c7b586b304473a82a834c0372a6b635e272e5f7"
  },
  "Q130259107": {
    "id": "Q130259107",
    "identity": {
      "title": "命运",
      "author": "刘慈欣"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[2]",
    "source_spatial_record_sha256": "448cfa8aaaf95991b569ef2ce63c7ed748dd33ce0ba54fbe8ce9572eb4d853a0",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [
        "planetary"
      ],
      "spatial_rationale": "准确《命运》单篇知识限定史前与被改写后的地球，以及改变撞击轨迹的近地阶段；不同历史不自动改为空间平行世界，恐龙统治也不扩大到别的行星。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "fb151a4ae864471f5a9455fccb25378534561e0f9effc9e860953183d4171646",
      "facet_bases_sha256": "7374c65952d392f076c6542b00cc918d756a40ed103a770e1877b6efd6847903",
      "source_scope_sha256": "729f26e569f3af84d75f3fd9c7f2ae4f39c112e61745841ae7659c860cc841c8"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "37b717ee326ad143a3ce03180c60c216707d2c80aab406d6ac60d8f8f26a6fa9",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "74234e98afe7498fb5daf1f36ac2d78acc339464f950703b8c019892f982b90b"
  },
  "Q11286446": {
    "id": "Q11286446",
    "identity": {
      "title": "惑星軌道零號站",
      "author": "CHOCO"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[3]",
    "source_spatial_record_sha256": "38c78b7924d88cba8fc119f7f4a56860516c384cf4f3d025b18fe270d86f5fcf",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位第4册明确的Igna空间站环与Miranda任职、克隆相关局部栖地；宿主行星和恒星未明确，不从标题或三百年时间补全坐标与星际航线。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "ae25ec7b01b8756aa123ecbbf72596dca18e4a814d373a164fadbbdd29dc8419",
      "facet_bases_sha256": "72ebec56b577a317ab23dc8ece9dd36bc0abedcb80e5373eb57be361fc478582",
      "source_scope_sha256": "d3c7fd2ae7ad8ff798a4a9588d385a3890076ce9bf8d5dc66f0be3ba2697d84f"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": true,
      "actual_query_count": false,
      "actual_open_count": true,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": true,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "actual_search_count": 1,
      "actual_open_count": 0,
      "prior_known_failure_count": 2,
      "new_unsuccessful_attempt_count": 0,
      "unsuccessful_attempt_count": 0,
      "cumulative_known_unsuccessful_attempt_count": 2
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": "quick-retry-lane-3.json",
      "original_ownership_sha256": "ac16324a0ef149c7042828b0988fb133af9f30d08c6b8bc5b1a3e5be26af026c",
      "original_ownership_index": 632
    },
    "source_analysis_record_sha256": "b246331bf60f09eee8d36d2463d780d47cfa10a32bd031f4f50985ab59beb9fa",
    "source_log_record_sha256": "d348a009f9da556d355bf3d4c8b40b29fcf90756c2e6335d0cf228bb255cead0",
    "wholeprior_sha256": "0bd6547457c32bbf481b0f4859ee6d480b4207e9b3a7d3fc72d4c00086cdb450"
  },
  "Q131381177": {
    "id": "Q131381177",
    "identity": {
      "title": "The Coming",
      "author": "乔·霍尔德曼"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[4]",
    "source_spatial_record_sha256": "a6d73a07258ccc408b53f5b21e4570675e642b11411c42ef4310fbf61cba57f1",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本作明确2054年地球、美国社会与欧洲冲突中的多职业反应；来自深空的讯息是远方信息，不证明这些人物已进行星际旅行。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "e481fa5646b94704bec4b4561e2d7cce76f529498511861e23e6085c4e15c741",
      "facet_bases_sha256": "35213846de41aa3028e1f112f553f9245f9ea58147af7cf7e6e99eedaa74288e",
      "source_scope_sha256": "e197a8b32b855855edeb7ed445cee7672defacf46f3ec1c9d34dbf0e15bcd3e2"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "78086c94c9ed3f6bb4dcf06c9c0471e4a2593bd74e34e1a578324bd4de7d9f5f",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "88e462d39641d4a738bfc473363baecc7972bd513dc10ea1f76bbd35ba11a24e"
  },
  "Q131381230": {
    "id": "Q131381230",
    "identity": {
      "title": "Dervish Is Digital",
      "author": "帕特·卡蒂甘"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[5]",
    "source_spatial_record_sha256": "29d321fd2bc9a5e2f5451a0d53d1a0dfe95059effe9101bcbe45fcf56fffa8aa",
    "reviewed_spatial_fields": {
      "spatial_primary": "abstract",
      "spatial_secondary": [],
      "spatial_rationale": "仅取原材料明确AR设计工作室、虚拟赌场与Goku在AR采用儿童形象的调查阶段；不是因为存在AI就将所有实体身体和现实警务归入abstract。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "87870ddc4f3459431a20cbcc828113ab99ba2eb52bd62c5d4679e225ad77ea8f",
      "facet_bases_sha256": "312868f0454fcc944db47cced343bd901b83bbb816d39bc5a6db95278bf004da",
      "source_scope_sha256": "e917b23fce69804c6eabbca42673675f402ed19ce23f7a43a068a803748fe5a6"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "a8f8b0d8889cfb0e32a6139d81b4f28ba315f2ba6a17f3a7027d9a5f6c270195",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "cc8975b0d30fad1bb4fcc255b15cb9dac4a690f0306d60f381e346a51a05b6af"
  },
  "Q131516753": {
    "id": "Q131516753",
    "identity": {
      "title": "Steppenpferd",
      "author": "布莱恩·阿尔迪斯"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[6]",
    "source_spatial_record_sha256": "c1be03465e5a6f6cc5995d21391c9712cbcaaff0646d9fcb8bd81b1569ed8490",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本篇评论明确Predjin神父留在地球最后岛屿的修道院，限此地方生活；外来入侵者的起源不自动成为他实际到访的星际场所。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "63481f9861c7741f1957ea84439aed5b9e14d512547731888fa49ba23199a1ac",
      "facet_bases_sha256": "cf01f86dfeff0cac7df5e6c9cac220e50435411a841678a03d813613bd711a26",
      "source_scope_sha256": "bf047ce195ed34dd810b782bf085e71af0c06b85b88b154278ef31f32a26d57e"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "current_unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {
      "raw_search_artifact": "work/evidence/quick-retry-modern-r6-search-a.json"
    },
    "original_ownership_exact": {
      "original_ownership_file": "work/evidence/quick-retry-lane-2.json",
      "original_ownership_sha256": "f1e3bce7c91b9744ab300726ea85acd26e5f195553ce022a63559cc16e04bda5",
      "original_ownership_index": 161
    },
    "source_analysis_record_sha256": "fc9d58b7ef743df0ecd2bf56c75d5f106683c0fc335753f6e729197e1b997ce6",
    "source_log_record_sha256": "e8f9cc0e41e26a63baaea3fe3a466ebcbcfb173c97e63c2ac1624f1f77a8f1af",
    "wholeprior_sha256": "079d30449526d02cb993b851e446bf89a05b5da57da7e579a11c0026bfd479e6"
  },
  "Q131518567": {
    "id": "Q131518567",
    "identity": {
      "title": "Sheena 5",
      "author": "斯蒂芬·巴科斯特"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[7]",
    "source_spatial_record_sha256": "1a676753eff599a89d53f0ccd824870f29fe8fa770b07ad4c83f9dd98528e91a",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本单篇材料明确Sheena 5驾驶资源小行星并在任务期间养育后代，限小天体与运输船内环境；不套Manifold长篇的其他航程或后代最终去向。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "57611894087e511a70999ab6c80383d42d852e80f66ac6d332a984e3b8289762",
      "facet_bases_sha256": "a6b5fe05250b3d20bdb544f159d1f1c909cd8ee80d84ff5335091367778af7bf",
      "source_scope_sha256": "184b1a292139c38a0a78b40859011a7a515c576537214670e668d32738fdba02"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "e7e4b02c53bc396bbbe3b68149fc51513690a8721b9e44d71e161e2526cd19ee",
    "source_log_record_sha256": "4119723b398b98f8f11892432616e0f4bb55e87f714d470fd1da7df92ed67c71",
    "wholeprior_sha256": "07c72d219ba426c7472d5ae9586e6d5b7cce07769ddf5c56f70277b56c52cecd"
  },
  "Q134706062": {
    "id": "Q134706062",
    "identity": {
      "title": "A Day's Work on the Moon",
      "author": "Mike Shepherd"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[8]",
    "source_spatial_record_sha256": "d0f1d8a7c9fcf69e71bb5afeb12d5a6481e19158347e75fc0203138075fed8f2",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "作者本篇说明直接把妮琪送比萨的日常劳动置于月球，限这条前提；不补未见的交通工具、故障或后来外行星经历。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "c3c4ae5e7fa37ff0b0593bfadff09c9313563f06dffa504a72f71dcb45d70e01",
      "facet_bases_sha256": "5143a0406e842e1443fd7baaa90e0148e7b7a3132f94ba2408d9e38733a6cfeb",
      "source_scope_sha256": "97aad2576a2e79dffb88f754375112a2989e844b234c8f72c3b547baf0206e66"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": "known-year-first-pass-lane-3.json",
      "original_ownership_sha256": "b193cb6e5cbf290ee699db0a540b6b05c6c1855dccf59651ecb3eacfaa865e0c",
      "original_ownership_index": 65
    },
    "source_analysis_record_sha256": "93fe6f810f99d6387bb43d43ff5c141906a384c2cc0a6430be9d78a06e21b34e",
    "source_log_record_sha256": "517174122a6a335ab811ad85d4679e67d543d3be755619f22c53d3ad0844b789",
    "wholeprior_sha256": "9210f8e0b1e1e2481af28a65037c2d81c03051fd958aebf4395ac8082e463d50"
  },
  "Q135094293": {
    "id": "Q135094293",
    "identity": {
      "title": "Selected Stories",
      "author": "席奧多爾·史鐸金"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[9]",
    "source_spatial_record_sha256": "f536082ab5a1af6c7905b0fdc9c19dc296d578002f9602059db8b10fb8450ea6",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "仅取此Selected Stories确认成员Thunder and Roses的核战后地球幸存者与劝止报复场景；不概括全集舞台，剩余武器的能力也不证明报复已经执行。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "5ecab0befb29e0a9d1c28bef566f169c9a71edf34f73e767d9342305e344af68",
      "facet_bases_sha256": "36c20e4631b50ad779053fd4adf7fbb3b7b9a7c663a018042ae196c0b7374c6a",
      "source_scope_sha256": "f676a3a044bfb01e85996816548b86a8b3f9495850f3994a5112967d24d20aa7"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": true,
      "actual_query_count": false,
      "actual_open_count": true,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": true,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "actual_search_count": 1,
      "actual_open_count": 1,
      "prior_known_failure_count": 1,
      "new_unsuccessful_attempt_count": 0,
      "unsuccessful_attempt_count": 0,
      "cumulative_known_unsuccessful_attempt_count": 1
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": "quick-retry-lane-0.json",
      "original_ownership_sha256": "5fce5b2b8279d784d7d141536d8e923508897fe00cf0f03aa907e610a8c23596",
      "original_ownership_index": 162
    },
    "source_analysis_record_sha256": "8d079178a99fe2395fb316ad767ebc3e1c8ede276b72b32e12b793240e2d3769",
    "source_log_record_sha256": "170d05348653f8e63249ec60da8aa406849da8f119ac22352aafdc2f47fa5501",
    "wholeprior_sha256": "f51d3560b83ed451b221622932ec3bcc5243be46040052d8c0e8ac7f9067d193"
  },
  "Q15035008": {
    "id": "Q15035008",
    "identity": {
      "title": "Space",
      "author": "斯蒂芬·巴科斯特"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[10]",
    "source_spatial_record_sha256": "47a3028705aca092c13b74fdc9476ddd6e10c40a5f1218540c0da10dca44d845",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "本卷书介明确外星量子通道跨越星际距离并由Malenfant进入，限此已述探索尺度；反复灭绝的生命史不是实际宇宙全景到访。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "fc22793da6c5f807e44bcc3be82a93591d6b4a0d107b8edd506ba6ecef8db014",
      "facet_bases_sha256": "a3685722e90cb4fdac58a683c1441f4089463ae673767a334d84af0c74b00b1f",
      "source_scope_sha256": "0126806ac6ecb1f3c55a9369be682ab37c0b5473035c7a0bab50fc56d74e878f"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "5c6de101e1fbe8013d3cbf67fe03233ee6fd54794b4e03450f60380e91674193",
    "source_log_record_sha256": "5699bb006c9a8d7efda73d65d00d15c6b50eff3552f3a33af6467edd1b675f45",
    "wholeprior_sha256": "bbf3c19979cef47d8c043817a1244e2f7be1121ca2d77df7fe7f154d202eb7a2"
  },
  "Q19364507": {
    "id": "Q19364507",
    "identity": {
      "title": "Deepsix",
      "author": "杰克·麦克德维特"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[11]",
    "source_spatial_record_sha256": "4e8f60e9f5d0848b9a87071cb832bb664ced975a546a50a9e44bca28a25a174e",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "原本卷明确Hutch进入Maleiva III调查消失文明，限这一虚构行星与迫近天体碰撞；不补此次材料未给出的事故、救援路线或其他世界。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "a608306b6df1947ee43ab2c4d6e03934ffe2bce349eae7df9bf6d007d07c3de7",
      "facet_bases_sha256": "2bdfdf0ce6b99428ff913215804769fc59c4e630c0a016a93ce564035b08daea",
      "source_scope_sha256": "4c64591d237057ba4af03d92ef8e7b9c61e68f8f842b9206ae30394dfa213e20"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "3265807477ee31bae1a85828b61d76ab5c330d9946e35f2e31095a02c732d905",
    "source_log_record_sha256": "8a8898424e9932157930077383247a302612402a70ad8f709ce5ada6fdd77de5",
    "wholeprior_sha256": "66a6f5548b3d231daa5be91c0eecf61e2d394f98b3f592f627ea7f57eb72d1ba"
  },
  "Q20050124": {
    "id": "Q20050124",
    "identity": {
      "title": "Genesis",
      "author": "波尔·安德森"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[12]",
    "source_spatial_record_sha256": "b80c7b84658f2b4db176f3497210f7dabb0c95a0195b94e53976d8c963ee7fec",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "只取书介明确十亿年后重返地球并调查Gaia的阶段；星空探索愿望、长寿和上传人格不直接赋星际实到路线或abstract舞台。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "f1aea069990428a2c1f244653a58a167d784a035c8c7911570c71fd80b28d453",
      "facet_bases_sha256": "40749001a16e0f52c691ee53a9e1cc0d9325c7454c246f83e57bc9ed1956b654",
      "source_scope_sha256": "306eac084b593b3962d518b7f4563ac3e8dc0034d00101a61e36f82685020984"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "b22ca1175e978fa1c26b025f7efb1e67eb08cc788c1289b1eafe1aa2d7512fc5",
    "source_log_record_sha256": "984a7a99fcd557a82665c96a3732740fbba0650ef3b0da21fa5f8b021d80dd5b",
    "wholeprior_sha256": "0a3d857cbd0d6acc2c2b93c16c87af28e23b7d7aeb3a610f3065a1a50cd68427"
  },
  "Q2059694": {
    "id": "Q2059694",
    "identity": {
      "title": "1632",
      "author": "إريك فلينت"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[13]",
    "source_spatial_record_sha256": "da2d98c28f1b830a3943b43a01dc99cdd7006a4418d84528c9dd7a232c570112",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "原本作明确美国小镇整体迁至1632年德国，限这两个地球地区及其历史位置；不可返回不等于主舞台已在非通常空间。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "cac0de43c01e1a4f1d809be66c39f4d536a180303ada7662119c19206f713395",
      "facet_bases_sha256": "cfcb7f50d210db9b98a23df7499557f9f313ac1d8946292597c442b8beb52407",
      "source_scope_sha256": "eddd64ed6396592d8426925e0c40de64795d60b5ddd674db856bf5644baa9552"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "6e92b9134a6356fa99ad39fc13a1b7e6a35bfd48a56a45991340e4b31e85783f",
    "source_log_record_sha256": "7cfbf44d671f59f02d29b884479264e7db48d7bbd587b7dbd4e0585242d4add6",
    "wholeprior_sha256": "17eeb373021fb712785d4e5eb9465770d6a75ecbe498d478a155cfe868708d6f"
  },
  "Q28403633": {
    "id": "Q28403633",
    "identity": {
      "title": "The SFWA Grand Masters, Volume 2",
      "author": "弗雷德里克·波爾"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[14]",
    "source_spatial_record_sha256": "6db483494714aa25ac12ac43210a7a6368997efa530aa6a325300d2c3eea9a61",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位本选集确知Clarke成员The Star的外恒星超新星遗迹考察及文明记录；不是整集共享舞台，宗教传统与漫长年代不扩成cosmic。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "942c70c2dd043c71ab2b0a04dbdde5e845b64fd7af2e8ffccb9f02c7456cb5b0",
      "facet_bases_sha256": "26f0f0910c80eb168490692abaff247222a07c2f9bed5849f2b2ae7b7b9d772c",
      "source_scope_sha256": "814fb87715db3f9a41c07c8a191c15e673f7aa9a72b077147db923d407db193f"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "98e54abf4707a08eb112971cd53943a83aa24e35a4a7900de325cf44e91760ef",
    "source_log_record_sha256": "9bfd54c0016b8496c621773af348f2307f8693c2909e6992d857ce8d2ae69c99",
    "wholeprior_sha256": "51be54bb860b21191c967f5ba7a462cb5bb35b6361e7e8b2dab4556d24781a4e"
  },
  "Q2933712": {
    "id": "Q2933712",
    "identity": {
      "title": "计算中的上帝",
      "author": "罗伯特·J·索耶"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[15]",
    "source_spatial_record_sha256": "2da8dd37dfbfaf77f3bce028c8e2c0b3bc892ce7ec33f75dd566906e4e7a1225",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "准确Calculating God单作知识仅取外星研究者到地球博物馆与人类古生物学家的相遇、讨论；异星大灭绝记录和超新星风险不当作这阶段已赴其他星球。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "8948c9f2be9203e7f1695b53856e29b7c39e82681136e1b6343c927d7a4484d8",
      "facet_bases_sha256": "b230c6717c2f1494173679a75e24448256fbcaeb6cefb5886353a7aa032a0a86",
      "source_scope_sha256": "b8bcf0c2a3d7023d8da831f4bf659e4da7cc09836639edd59b3e9f262e493e2c"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "3b25a72692d4898bf9187a1fce7558369f71cec6ec8d55c5bbfbc8059a88e54d",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "74234e98afe7498fb5daf1f36ac2d78acc339464f950703b8c019892f982b90b"
  },
  "Q2998291": {
    "id": "Q2998291",
    "identity": {
      "title": "CosmoQueer",
      "author": "Kevin Saad"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[16]",
    "source_spatial_record_sha256": "81fb076ed1d8ede6f71b33569a8b2ae492e65317073612aa3d6431345dbc82dc",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "具名本卷书评明确Kristof与Stefan驾驶飞船并卷入星际战争，限已述船舶与外星遭遇；巨大身体和情色荒诞不转成宇宙尺度或抽象空间。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "02330206e1e3ddebf017c25fc66967eccca89f53019a70e7ef990ad2cb3b64ea",
      "facet_bases_sha256": "c9f4c5961ade2419c18eb6d1adfb4e712eaa32fcdf9fd83302cc38a9d0743ff2",
      "source_scope_sha256": "2e7844aa7c2f1e684018f4f97690559e40cc0f7477e5304f45432f1863edebc8"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "failure_count": 2
    },
    "original_cache_declarations_exact": {
      "ownership_sha256": "6ac6307da6880daa689e10a48c35466fac9ed028ea6a42764b0ab4af29d072bb",
      "private_raw_search_return": {
        "path": "work/evidence/quick-retry-global-r20-search-634.json",
        "sha256": "c9cc19ef9d9c00f2595bfc26fbb020ddaa7c367d5bedfe615757947e2e2e5c81",
        "scope": "本身份一次short精准查询完整真实返回；只采用日志中明确所述范围。"
      }
    },
    "original_ownership_exact": {
      "original_ownership_file": "work/evidence/quick-retry-lane-1.json",
      "original_ownership_sha256": "6ac6307da6880daa689e10a48c35466fac9ed028ea6a42764b0ab4af29d072bb",
      "original_ownership_index": 634
    },
    "source_analysis_record_sha256": "a4ffd77bdf7cc67eb3e7bb9c90f3e1f4c0ee2a7326a36fc08d0587e8e16557aa",
    "source_log_record_sha256": "433f38ed42b725308c1f6c2ae1f1fbfaefafae41d3b87268f09c4160a1678c5a",
    "wholeprior_sha256": "58006aad81844e808098b0b10ec2b1b7986ff9b0364504e5429711de9b95d2e9"
  },
  "Q29994393": {
    "id": "Q29994393",
    "identity": {
      "title": "Radiant Green Star",
      "author": "卢修斯·谢泼德"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[17]",
    "source_spatial_record_sha256": "48d7fbb4e0e1194d6e6762c7c4dbd429454cb680edd908884039e7e6faa50f41",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本篇评论明确未来越南巡回马戏团与Phillip成长，限地球当地场景；数字人格、基因改造与马戏展示不直接产生虚拟主舞台。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "d6da8a0542637ec4e0096818dfcb14367bb96223046ff604b0d8b0a365ba97b9",
      "facet_bases_sha256": "65518df006c6dc98a959188a16ffec46069c63115ffecdbb6b23d267f3808ff1",
      "source_scope_sha256": "7a95e30e47d8d1f25e7038b11253f05b0075059530a1aae992c556338affbab6"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "current_unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {
      "raw_search_artifact": "work/evidence/quick-retry-modern-r20-search-b.json"
    },
    "original_ownership_exact": {
      "original_ownership_file": "work/evidence/quick-retry-lane-2.json",
      "original_ownership_sha256": "f1e3bce7c91b9744ab300726ea85acd26e5f195553ce022a63559cc16e04bda5",
      "original_ownership_index": 634
    },
    "source_analysis_record_sha256": "16c62e5ee91cda3f7db38d1afac4bfc29968de9c33ce8ed60f608028c6285ebf",
    "source_log_record_sha256": "a8761a149d5309c3f2d14e2b79b423b10b194ae7f74391d7ff944b499924f7ba",
    "wholeprior_sha256": "59f39e6b10d8eb24b047e3ae3e8a6e09072cf7bafa0d51938cf0cca0a32e24ba"
  },
  "Q3210154": {
    "id": "Q3210154",
    "identity": {
      "title": "La Lune seule le sait",
      "author": "约翰·赫里奥"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[18]",
    "source_spatial_record_sha256": "efea776021e4c948c6b016fdea3dabeaa4bd9a2eb70b277e5e8c60b4d020b032",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本单卷明确月球背面劳役基地、政治犯与Jules Verne任务，限这一月球场景；Ishkiss的外星来源与技术交换不当作主角已到访其母星。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "cbdc589530a374ba453b36fdcd3cf4d608bb4a9d91a91221981c8e12404c92b4",
      "facet_bases_sha256": "426b99d6ac689c9c194e87e140c73dfae80347f4341c3ddc99ba716fb28af852",
      "source_scope_sha256": "24aa5dffa6d2f599367b5c774ab8b327807952643db1354e8d064c462178cc01"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "b8280bc25a8683a2e4debf26dc19f4becbb5538c97b90f214a8bf5b78b79c269",
    "source_log_record_sha256": "202ca15be39d5c468838018254cd8cf6161055a32bdfa611a351d0378709dbc4",
    "wholeprior_sha256": "66fc8be536a0ab9fed15192f4479452d41c73f92027d2e72e0baeb9d60d15250"
  },
  "Q3211715": {
    "id": "Q3211715",
    "identity": {
      "title": "La planète",
      "author": "作者未知"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[19]",
    "source_spatial_record_sha256": "ed8095a651e66809ea17286c2eab6217d5fbb4bf02929583628a6388f9a0bfae",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅取Bételgeuse第1册La Planète中Hector/Inge所在殖民船的存活阶段与本星球iums环境；不借其他册或原Aldebaran系列补人物行程。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "0e6ebfaa148444859a435bcf1cede66c9b255b635c0dd1af572910c824c47b26",
      "facet_bases_sha256": "07a888c8e09ffdc0096f6a5a004e9a03722ab416a55f35a0793c67ab974ef334",
      "source_scope_sha256": "c38cde4c1343ebf138cb88319239fdf813c680daf061965a09f797f2075a3e2f"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": true,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "current_unsuccessful_attempt_count": 0,
      "actual_open_count": 0
    },
    "original_cache_declarations_exact": {
      "raw_search_artifact": "work/evidence/quick-retry2-modern-r3-search-batch2.json",
      "raw_search_sha256": "febbb681a0e3eaab1fe57d22e783b9b9f79c5fbeb15526eb640e97a2d54d69b9",
      "raw_search_record_sha256": "5cfe88c5510daea5c25186ca686d36f10ab9e613efe1c0925bb772ebcf68bb10"
    },
    "original_ownership_exact": {
      "original_ownership_file": "work/evidence/quick-retry2-lane-2.json",
      "original_ownership_sha256": "1d0623bb95ec95be038d68eeeda5404a04ebc150f86e82133086b36d194428ae",
      "original_ownership_index": 80
    },
    "source_analysis_record_sha256": "e03a75e2156f1c6f07483e535f09e072e447b27de7d58700ca3aca30e1d68225",
    "source_log_record_sha256": "bc6f91ce0800acf2f6a85a71bdbf4801c0ad4dd19a998a018afe48221a32e659",
    "wholeprior_sha256": "f14c9c36fa32ebb2f3b6b65a11cc22dc88a78fdc5045e2c517f56fddbe0d6765"
  },
  "Q44603212": {
    "id": "Q44603212",
    "identity": {
      "title": "Nuxlum",
      "author": "José Antonio Suárez"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[20]",
    "source_spatial_record_sha256": "949f18d9cf237a674d0b108b5bcff310511602252c48ebefc526c771dfc70d84",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "第一部材料明确六人从Lagrange 4前往并面对Nuxlum恶劣环境，限这个虚构行星；没有宿主恒星距离依据，不从迁移愿望扩大为全星际航线。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "2585c7c3b228a968ea9044d9b115ee83daabcc545110dab9e7c9cc69e499350b",
      "facet_bases_sha256": "e9f4d518fd1de66e1aee21693e24ac21030a199eb280c2cd1b543be2cacfc9b3",
      "source_scope_sha256": "36403bb8b1218035371a5358d2ced61c3d84d6f4eac6b2c5c7b26857aa272bba"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "f187ea78ea80ba9240b47a671661e0b7d541d42922b4b7e64c31132db620d766",
    "source_log_record_sha256": "a9ac2005422df0f61b2611f8124c952da0477006fe7f649817f129ad6e43efcf",
    "wholeprior_sha256": "3108c39e93b50106bfdab968f9d4dd93e329ba471af005dec2b26ae83e4ca9f6"
  },
  "Q4657458": {
    "id": "Q4657458",
    "identity": {
      "title": "A Hymn Before Battle",
      "author": "John Ringo"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[21]",
    "source_spatial_record_sha256": "ede6a5a26e47f0ac8853572200f1ab12b06ed48775759b4210bde5dba7cfb22b",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确A Hymn Before Battle首卷知识限定人类与联盟参与的不同恒星世界军事行动；不借后续Posleen系列入侵地球的全部战役，也不将联盟范围当完整实到范围。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "32bb50848f95595da4e9acdecf6404034ae2b8d0c61c8841269e5f7ff1bb3c3b",
      "facet_bases_sha256": "3b6990964384e4960db14be173bd92f426854e1d3ca27757f808497ad72e189c",
      "source_scope_sha256": "26b2832272bfd6fd3f84174ffe46217c96eae8606833e95ad2d3325e1d03481d"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "current_unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {
      "raw_search_artifact": null
    },
    "original_ownership_exact": {
      "original_ownership_file": "work/evidence/quick-retry-lane-2.json",
      "original_ownership_sha256": "f1e3bce7c91b9744ab300726ea85acd26e5f195553ce022a63559cc16e04bda5",
      "original_ownership_index": 163
    },
    "source_analysis_record_sha256": "c65748a2cd387963b824fffb740e283acb420d136774d127ac4f5256cb1fd9d0",
    "source_log_record_sha256": "9fb0b6193591457ef8eef3439333e5a817f908c2ee05e5d356bf33c0a0d079aa",
    "wholeprior_sha256": "a4a7d08834cbab5b53ce78c0399501b920d46183025cef599ab2ddc29ea016c2"
  },
  "Q4803807": {
    "id": "Q4803807",
    "identity": {
      "title": "Ascendant Sun",
      "author": "凱薩琳·艾薩蘿"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[22]",
    "source_spatial_record_sha256": "60ff666fa1c20570d6c4aa89d71bc36e69cced17e6a13b6d83b01cb0c8d4585f",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确Ascendant Sun本卷知识限定Kelric在Skolian/Aristos星际社会及不同世界之间的逃亡、工作与俘虏经历；通信控制计划不变成已成功掌握全宇宙通道。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "99bd6d395179dffca6f975a9b4172a232b1cd8ea537c25f4b0e0698644044bc2",
      "facet_bases_sha256": "fcd79096223e149e844f8c55eb6a002eee58c98c69ba227fd82910266fc55acf",
      "source_scope_sha256": "cdab00c071e05ce772b296334be32b85805d02a9806a2214a89f8881f88816d1"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "afc503cd1e47bcacedc598569c290a64bb5902e6506ccec5d61d52ceb9e7d72f",
    "source_log_record_sha256": "cf47c043f61fe2045aa72afaa4f28db75097d26f7865561d30ab3290ca405917",
    "wholeprior_sha256": "357fc7e2ea4fd597a1efe00808cca51dd2f20f60b21aeafdab60daeab138cc5a"
  },
  "Q4849957": {
    "id": "Q4849957",
    "identity": {
      "title": "Balance Point",
      "author": "Kathy Tyers"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[23]",
    "source_spatial_record_sha256": "084c646c20c2f08c8b9b773dcaa1a49c5e5b1ef2a333806cb8995d34154f5b7c",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本卷书介明确难民已安置于Duro并参与生态修复，限这一虚构行星；Yuuzhan Vong将其选作下一目标仍保留为威胁，不补战争结果。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "6dd707754f1903bd07bf67a9aca9b207706b398dc9635a9b056ff0b7e31a5892",
      "facet_bases_sha256": "7237f80935bb1ba4915d40f9d9f02f08a5b28a89c354412ad65ad631d7021f42",
      "source_scope_sha256": "306eac084b593b3962d518b7f4563ac3e8dc0034d00101a61e36f82685020984"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "b0d38ebfc8935278aad4858b705feb60d60485337936463fad3c0033b1aefff6",
    "source_log_record_sha256": "5aa333316806fe1c3ec96a04d373b77f4da6da9a38a4648db4ac69a070c5ca99",
    "wholeprior_sha256": "9b6bfbb6d2a32a0000c64333f2186652cb71bf9f8aa1fbba2e33e9868aa9f103"
  },
  "Q5148482": {
    "id": "Q5148482",
    "identity": {
      "title": "Colony",
      "author": "Rob Grant"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[24]",
    "source_spatial_record_sha256": "5a8eb75591c7c88ce24dff22fcceb0b6c7598c92430c527025138867b4bf65db",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确Colony单书知识限定Willflower的世代恒星际殖民航行；十代失能是船内生活，不声称目的地已抵达，也不从航行时间单独推银河范围。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "dafa12c43b64835bab8749c9f5b77e58cc1978a6d96acd47060bd1257f36ff54",
      "facet_bases_sha256": "c845ab496db2334fdc86f0966804e4fc647d3335eb11efe0e6dc212a870bae6d",
      "source_scope_sha256": "41e8e917921c54c0d3ff7511f8bd3cc2f7e305980d75f7c0e0ece0b2d44a5a4c"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "828f4450bd8b34821f0aa6bea5be36fee532974d7ca8348518f12229280aee08",
    "source_log_record_sha256": "63c4d228ef18d53cb0e19f123966729f41ad01e15b243ad1cc09cff0d2439d0d",
    "wholeprior_sha256": "9473b60d4036e3bf99d8dc60b54bc38e8ded478c23bacbb245cf5e62f56ac8b1"
  },
  "Q5174346": {
    "id": "Q5174346",
    "identity": {
      "title": "Cosmonaut Keep",
      "author": "肯·麦克劳德"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[25]",
    "source_spatial_record_sha256": "5d30fc3ba57d1b89a8e30364e49a48cb7496a761dd4d28ce1da5a3eb1f4c682d",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确Cosmonaut Keep知识限定地球轨道站与远方Mingulay殖民世界这两条已述叙事的恒星际空间关系；Gregor重新掌握航行的目标不说成已经实现。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "ac318e31707492cac5825638b834031f1c664232568b23eea5e0f26dea5bb339",
      "facet_bases_sha256": "db1d87eda90e810826feab90c7235c432e930465c39b2f5e396b71c3c1897c26",
      "source_scope_sha256": "590047eacf618cc75cad2663200a6ac75619cb414416ade8da6d80d76aa7d1a8"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "a15871c1346674876e53baa9f991b8e25dc43ad31c992b1e974a0132ad3ba594",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "aee614573f86d573272bf6e278e12f9ff887ac07b68af0717442f61b87389c63"
  },
  "Q51933377": {
    "id": "Q51933377",
    "identity": {
      "title": "Titan A.E.: Akima's Story",
      "author": "凱文·詹姆士·安德森 / 蕾貝卡·莫斯塔"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[26]",
    "source_spatial_record_sha256": "9133bededf41f9cabb777cb1197f202153d06c321a1dba5a140a20f1678529f7",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确Akima’s Story独立前传知识限定地球毁灭后的不同聚居地、学飞与离开避难地的星际难民生活；不借电影后半段寻找Titan的结局或整个系列补全场所。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "5fe2b3dacf91d6f848d8c7725416cad6739fe30d3933892c2754ae724f3c1dfb",
      "facet_bases_sha256": "76390f7a6bb70605955165ad4595701044a7ece4672d9671e8ae5f5bb07b9265",
      "source_scope_sha256": "ff1da4848534e62e56cbe39c4724df5f0b65e2ac73c98bf92bcce8b339bcb6ff"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "445ebd61a1394ecc80b9fc036a1ec44f91865d47e1f903103469b021c374df26",
    "source_log_record_sha256": "90d36f8c72b9fc947d80e102bf13b69061d02bbc64c8f4afc2968b055360df3e",
    "wholeprior_sha256": "1f218b749258f6604aa2b0ef6c410444c9c2fe82f4cc1b21aa32f0bda9c2404a"
  },
  "Q5280748": {
    "id": "Q5280748",
    "identity": {
      "title": "Dirge",
      "author": "艾伦·迪安·福斯特"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[27]",
    "source_spatial_record_sha256": "99aab87ac70299571b2fdfddc8db8f8c2a3dad8372f26e212da3dd88d9a1d693",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本卷明确Argus V殖民地灭亡及其小卫星信号的调查路径，限这一虚构行星系统局部；他者美貌与跨种外交不推出全银河行程。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "9b1fe2904c2898cb3092d63554f0a8727d1228aecaab3f1e881a757f72f4fc80",
      "facet_bases_sha256": "10eeea7056bc36485b629fe8d37f3c5ebe0e880bfc1e816b250bcadf58ae7dd0",
      "source_scope_sha256": "306eac084b593b3962d518b7f4563ac3e8dc0034d00101a61e36f82685020984"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "bae3d3d913c1b0ffcfa08388caf6cd197adc93553bcfa9c4a63f9790d27cefbf",
    "source_log_record_sha256": "1a5b131a8fd2524f15fd756e931e39e411205cb2a5acfe4bed76e0ae8ce5fbeb",
    "wholeprior_sha256": "bf1c95d17c62997cd7c7f31b1ec55194746d44bfbdd3ca74dab5060bf3c64ee8"
  },
  "Q5305569": {
    "id": "Q5305569",
    "identity": {
      "title": "Drakas!",
      "author": "S. M. Stirling"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[28]",
    "source_spatial_record_sha256": "20d865a4ac0b16c5eef9d55ce71a180a30da4beb20c267252d17e57a46bb0007",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "仅取本合集Custer Under the Baobab选例中Custer参与Drakia对当地bushmen的殖民暴力，舞台为地球另类历史中的非洲；历史分叉不自动转成非物理空间。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "ac1a7993715d10fc2e1bd4b0d1bde1b1d1c49d92a86946ee8a9edf0ede2fd975",
      "facet_bases_sha256": "af48dd6107940238db0477ab800b2875b779343479aecea53222390545bb5faa",
      "source_scope_sha256": "6c2d70a387305a1c757271a20ebc02b7d357c5a991c89cbf7750202140d538f4"
    },
    "result": "accepted_space_values_with_exact_source_role_adapter_required",
    "reason": "Drakas!中Baen目录只支持集合/成员身份；Uchronia专属摘要支持Custer/Drakia/bushmen情节。空间值可保留，但两URL角色必须独立适配，不能将Baen目录当场所查读。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "failure_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "2cb33f80522039a6bc37dcaf55f4e61a5673547c888e4817a922d9e67f0212f2",
    "source_log_record_sha256": "72da72297f04388e7f8a0a57c9d3712a3659af05c9dd7dbbd85bf17d38f921ea",
    "wholeprior_sha256": "ad526e13926ead9cd90eb2d694963b745dd381a514c8d20cc31f8fbd2b82f853"
  },
  "Q5331267": {
    "id": "Q5331267",
    "identity": {
      "title": "Eater",
      "author": "傑格瑞·班福德"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[29]",
    "source_spatial_record_sha256": "c9a81d0a9e9bb34eeda32fe9bce764a078f2dbfa36ad0e53254f3e715c349bfd",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "准确Eater本作知识仅定位Knowlton夫妇在地球的天文学研究与相互陪伴阶段；太阳系边缘异常是观测对象，不凭吞星能力扩为他们实际到访的宇宙场所。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "f34a45e4f874a5b14c5ea2590d17567ab58ffeffd43713eb75673e97719280b8",
      "facet_bases_sha256": "d7b01078b0c3c045a16aa9b086b4c5a8cc5970cc1391f4817e4b997b481be0f4",
      "source_scope_sha256": "306eac084b593b3962d518b7f4563ac3e8dc0034d00101a61e36f82685020984"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "12d8bebde98f3bec915594c1dd770015419f8c8b6dbf2d558d56a15ad3a15a69",
    "source_log_record_sha256": "dba3764c891945bcd7d3a440b84cff6f1aefc29fef1f6e7cfea5739427f39ee9",
    "wholeprior_sha256": "92ef449771afbde5b1993904a02a45e4190696303e514fec691a577364cea54a"
  },
  "Q55230552": {
    "id": "Q55230552",
    "identity": {
      "title": "The Valiant",
      "author": "迈克尔·詹·弗莱德曼"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[30]",
    "source_spatial_record_sha256": "e617121689bce455df684435609d9edf30254165a6b8da540f9550d75dba2fd8",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确The Valiant单作知识限定Stargazer对来访者与星际失踪线索的调查；访客自称三百年前银河屏障幸存者后裔，不自动把旧航程当已证实本卷全银河实到。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "6b63a319733d0b250f357882d1a3b06bbe935a67901806121fa47df259d3d1e8",
      "facet_bases_sha256": "3783564bc06cff8e46b94196cbb5be084b0f85d2f761da67274149875024304b",
      "source_scope_sha256": "13c0dd82b67761bf76da2547f436d7bf2e1354f236da4fbcb52ccf089e8d235f"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": "known-year-first-pass-lane-3.json",
      "original_ownership_sha256": "b193cb6e5cbf290ee699db0a540b6b05c6c1855dccf59651ecb3eacfaa865e0c",
      "original_ownership_index": 69
    },
    "source_analysis_record_sha256": "69bafb270685de9d04eaa844e33364f5af15140819839e06f7a59c65d3a2f13c",
    "source_log_record_sha256": "f034042f902b4e950be7bee7d3b2978073032fbbb8b22267822f77a21e271d4a",
    "wholeprior_sha256": "645a332e83ee8415565cf89ad188cf8d1be566e4d47abe74eb831251e9008c7a"
  },
  "Q5577739": {
    "id": "Q5577739",
    "identity": {
      "title": "Going, Going, Gone",
      "author": "杰克·沃马克"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[31]",
    "source_spatial_record_sha256": "e9743dd738fe6ccfd09262cace819eb6d12bea1c6771c0917efc5f9dad839e78",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "仅取原材料明确Walter的纽约生活与Bobby Kennedy竞选干预阶段；两位女性关于不同纽约的说法不代替其来源世界被独立确认。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "3e517dcfa67ed36ada3112b6e7541da8823aaf4b96fd544010a808557bfadea6",
      "facet_bases_sha256": "3c4a3ac13c8db2f05757f7d99c9853862b3b811b58c87ee6966b0c8719af0958",
      "source_scope_sha256": "b6764f92e4da576245a4bebf9457cda261d4811f705132401b55a2ace9d7d796"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "24639f2c15be4210b98fa48bd1cbfaac60de6ee2dedd0c6512cda3dc66cc39c9",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "795118f5b4ca9e73bd9ccfe45d91c79b3dd82e5fd8e3b4d96439baefbedbec3b"
  },
  "Q5877964": {
    "id": "Q5877964",
    "identity": {
      "title": "Hokas Pokas!",
      "author": "波尔·安德森 / 戈登·R·迪克森"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[32]",
    "source_spatial_record_sha256": "d76fa86bd71f977f554ea5fcd0c51a142ebdf2e238892d1bc54737a6111093e0",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅取Hokas Pokas!书介明确的Hoka角色在外星球面对外来军队的选例；扮演拿破仑与法国人不成为真实地球法国场景，不代表每个成员同地。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "245f83d327957700b93761942d0b6f9fa989a8fc29a7edcc05eb0b941120b5ab",
      "facet_bases_sha256": "4d9856a0c06436f33caf070e155309648739ffe63b629ad68d1b60bdad392d60",
      "source_scope_sha256": "f5401e5580f06be5106f6a4765a58406fdd09f0c93b37d168dcd18c27ced3b3c"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "77c84ddbc31578a50b579568cc8657008d7ef1d90959140e5721a03c718485d3",
    "source_log_record_sha256": "424b9cf5d5da4967fdc48a2015f3ff4cd21fdb104b21619c611cdda17609a008",
    "wholeprior_sha256": "e886693548acdade3513a4ee3a1309b104b6982b367aa54334ecf66e71352206"
  },
  "Q6314575": {
    "id": "Q6314575",
    "identity": {
      "title": "Jupiter",
      "author": "班·保華"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[33]",
    "source_spatial_record_sha256": "39d8ec60ce7bf2c69687a372689e8350e540a28e462d95578dda0eb19da14234",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本书介明确Grant加入木星探索并面对大洋中的新发现，限木星局部环境；预定报告的政治任务不增加其他世界。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "5046a0022105124fe213bf3daa4bce8352baccaf16d6d86073de1e5ce88f03c8",
      "facet_bases_sha256": "bda842ed6c0315d6bb2dd91c34b349fe1b7a524816c5f18f5a75fd2c203a389e",
      "source_scope_sha256": "3022b097bfbbaeeb20b4f3df6fe1d91113423aaafdba2afaf006f1546a74b87c"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "526a65fdca63f2a28e3223a2405419faf90b3a151394f1150f427ed731ecaa0c",
    "source_log_record_sha256": "7f99d9d69042a316f06e092fde13b67a571d4b65736023e179ea761ec7329380",
    "wholeprior_sha256": "d8f9f5c705ebc8e4d5aa73c5605824ec8b0a2606a95beb2b9941a6789c27d75a"
  },
  "Q659151": {
    "id": "Q659151",
    "identity": {
      "title": "Ruby Red",
      "author": "克莉絲汀.吉兒"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[34]",
    "source_spatial_record_sha256": "9348f0a059c0234e976ab59915b497ad9b479bab5a20ef78d53ffad551a4f491",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "准确Ruby Red单作知识限定十八世纪与现代伦敦的时行经历；时间变化发生在地球，不把家族时行能力本身改成abstract空间。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "c38e52935b8f02fb95c090eb6ee49aceff0148ad8442606bfea0c84c7ff77537",
      "facet_bases_sha256": "82589c16f960905c10f1eb23f5e27f57a025015634cba1c82a0261ea6df12c46",
      "source_scope_sha256": "5bf7f2693f553086bca47cf6a8898cebb867f0f9c0a55d4cb7e70ffb2fa64fc1"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "0eaa1299343eb7fa6998266693df44c1b86afe039491f08f8c708d9277297411",
    "source_log_record_sha256": "3c81d0a1f71de271c6cf81a7d548925123f3d3b16041a0f7a7fc582e85c0bb24",
    "wholeprior_sha256": "1a5434f4f65d676e0ff3dc4359e9155b601d9034dc9a18bf1cae9c34f34e83e6"
  },
  "Q7692416": {
    "id": "Q7692416",
    "identity": {
      "title": "TechnoKill",
      "author": "Dan Cragg / David Sherman"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[35]",
    "source_spatial_record_sha256": "ba2a778ff02b7b523b07d5a121b37803312afd4d6c4b14b2d7533097c769c001",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅取本卷书介明确有资源发现的外星世界及追查腐败阶段；不补其宿主恒星名、总统的全部管辖范围或星际舰队总行程。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "664482e38bd9dcf661ab2d6925e8233d7e90acb2f92a618bec622fc2ca0cf3c5",
      "facet_bases_sha256": "436e2db7b0c180f0333ce97ebf72c1ed0531e412c5899d09cfa1c16af388139d",
      "source_scope_sha256": "4e71d1e4ec5e459efb1ef7efbf906312c50c37bd4444282b8162e4a7044ee4d7"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "c21f1ce910b10d7db80207408e0726b0b05a110e85ac2e16bbfce5397c361a93",
    "source_log_record_sha256": "a55a68c5d769e411d18b3b9d8f17b1f673099752cd3e6aebe9a303db4609ba72",
    "wholeprior_sha256": "ff290dc00dd0224fb3345fbf764fabfea51992dfb882c52e9217a48e27fb8d16"
  },
  "Q7745563": {
    "id": "Q7745563",
    "identity": {
      "title": "The Last Albatross",
      "author": "Ian Irvine"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[36]",
    "source_spatial_record_sha256": "a35d0dea01d539c5ab5ca102954a3b9968ec54dd424ef3a3aae5eca04220743b",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "作者本作书介明确南极冰融化、灾难计划与追逐的地球环境；生态末日信念不另作真实外星或超空间场景。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "b958e0352118ab536facd757542ddb0c6febfff291de66a6192d7f2c8f13a0b0",
      "facet_bases_sha256": "dee6b189cc2e7bf316561a04399a02e1901ab98578d0e44ba35390dc0c5924c2",
      "source_scope_sha256": "790aaefab92a6175de0f93c341e15605cf0ce9e539a8e54a3c9a0db8b4521e51"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "c3e56797a3f037662ec87691269f55e75aa8d63038af79235b13ae9037480729",
    "source_log_record_sha256": "2cc98320717b6521c8a429c70b017dad4f9f76b224b52dc560477f6d6abac85c",
    "wholeprior_sha256": "4a246ed84c92c4a181367f45fb2daa888b033c51caff0876dd0b169f128d1a49"
  },
  "Q7992271": {
    "id": "Q7992271",
    "identity": {
      "title": "Wheelers",
      "author": "艾恩·史都華 / Jack Cohen"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[37]",
    "source_spatial_record_sha256": "4756ab00baa7b7f3ca8ebf1977649e06d9af67c1cf434fe17b061af769ae6282",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "原单卷评论明确Callisto器物、木星生命及彗星处理的太阳系局部舞台；彗星可能撞地球是风险，不补未见的外恒星行程。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "36a1560fdc72d4e986140574dca42fe2e4c924493f67027cfd17a51bfd734413",
      "facet_bases_sha256": "1f77d1974fa4a6c9c9afd4b01fbd0ea2d800a1a7b13bacf6f1e4a4eab5aabbd7",
      "source_scope_sha256": "130f7866761c486d044ad5f116e0238454519c372a13140632a0f0e720f8552b"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "41405ec0481d0fb89e09a1793d8de92424164540c3675c8a1dcdac12a0188af1",
    "source_log_record_sha256": "338132ebc206b8d05b1fc7c84fd32887dc1229ed401ce97c8cdb5d642a8f53b0",
    "wholeprior_sha256": "e11d1a792e06e08cc23fbdb5f0fae23e206058484be381689cf4117243c3c251"
  },
  "Q4142541": {
    "id": "Q4142541",
    "identity": {
      "title": "Blue Lard",
      "author": "弗拉基米尔·索罗金 / Sorokin"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[38]",
    "source_spatial_record_sha256": "3549114a9ab1a0d19b38cf4ecd964921cb4b33a0abda4ce82e61610492cf2196",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "准确Blue Lard本作知识限定未来实验室与蓝脂被送往另类苏联、欧洲统治背景的地球阶段；月球反应堆是资源用途，不证明故事人物实际已在月球行动。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "902fdb4922e4bb4f4b1103c94556c775edf6648028b79a25cc6ceab58464f969",
      "facet_bases_sha256": "ca2dd54bd9b73c19f5f9be3041e7dbbf6575c9ab525d32e6828fe38f820d5b6e",
      "source_scope_sha256": "3e7d6b10b523ce0e686f1dff7e80c8aac516fd69bc0377597eb4360597b6d73b"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "de3c26167375f2d31607bde7b3e308fd15676aa55eebe633367735a5e67640ab",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "38f473f13c08a929096887469fe81c981acdca9ea5ace80b3a5c50846c46f309"
  },
  "Q4726459": {
    "id": "Q4726459",
    "identity": {
      "title": "Alien Secrets",
      "author": "Annette Curtis Klause"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[39]",
    "source_spatial_record_sha256": "029c56379dcd314abea87c4214d8185924df740d5677e196d4f91aacd909d872",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "具名本作评论明确Puck在星际乘船航程中遇Hush并调查遗物、走私与谋杀，限此行动尺度；未补外星族群的全部领地或特定恒星名。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "53aa6d74916821b58dcd3c7e15dbedb50c87555b052309930c8f2fca85b7b8bc",
      "facet_bases_sha256": "f458d91562325e833ce86aaaae9027524e7c315055e260bf486e9f0e8fffd5b8",
      "source_scope_sha256": "06d004119ee77d8e8caed3d5b1ecdc6ccc1757726f9609ad640887ede8aa8a72"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "be76c60a217b4cf1787a9e59b7cd311a03d4975f3771e21e94799a13d88e80da",
    "source_log_record_sha256": "af1b5c0bc708fed10e218d60ab56d0d988130741d8154666b1368a6cb3bdd71e",
    "wholeprior_sha256": "ef74474c0749bcd05498e3d826ae1f224a2a7cd77dd00025aae98be9cef754d0"
  },
  "Q5170149": {
    "id": "Q5170149",
    "identity": {
      "title": "Core",
      "author": "Paul Preuss"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[40]",
    "source_spatial_record_sha256": "cd322dc49b0f7e0767910c26af37c9e8f64df2d510ad91b6439ea71b41fafbfe",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本小说概要明确地球磁场变化、钻孔观测与核心远程干预，限地球内部和地表研究；不借同名电影添加载人飞行器穿地心场景。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "c5bac34c378a7e1dd3f6b4714719284ab9078a214bedfb1b4cb2bd253878faff",
      "facet_bases_sha256": "fe61d1263e0dff2d960cebac2245a5bc4b47e5a20a83d8333b21223a7e71cb27",
      "source_scope_sha256": "748b9b0cd70463444cbcfa666c633e117b37a2dc9232601b0e9efe98d56e12a1"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "a145ae65c54778aac34e7b4f7cf041f43a79c7f7552e23cdc7ca30ff1b5fa287",
    "source_log_record_sha256": "77155878b8d47d9b01bf9c44d5560b390986ab53422f71a7a9ce23a41231c311",
    "wholeprior_sha256": "a5e15e602c013701604fb3398ec17a725a4e67b8c8619b331796629bf3f5ed5c"
  },
  "Q54807231": {
    "id": "Q54807231",
    "identity": {
      "title": "Quarantine",
      "author": "约翰·沃尔霍特"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[41]",
    "source_spatial_record_sha256": "d71fc4f537426700f95eb358b754eaa713487f96497fcff875d198e071bd0f7d",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅取本作明确受Cardassian控制且疫病流行的非军事区行星及补给危机；能送药与计划清除生命不说成已成功送达或毁灭。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "8cba245d8d9df5a14554a23eb09504006f7c89f0a26c8c29a918cdde94ef7ed7",
      "facet_bases_sha256": "8f91104e9d14daf190323fefeb570244ac2b87d37d4f80a9af3a44d5753fd19f",
      "source_scope_sha256": "306eac084b593b3962d518b7f4563ac3e8dc0034d00101a61e36f82685020984"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "6908cafff457887e8f9e1cd01861ea670cc579fd4b39fb982fbf4bf564320f98",
    "source_log_record_sha256": "bbef12632725979d69ed8739528403d158c4329891e815ea5b7f451e80b0e584",
    "wholeprior_sha256": "a04a62be4b5407a9039dbbbad32face83804fd3dc23254d399ab5522fa2fd286"
  },
  "Q55230442": {
    "id": "Q55230442",
    "identity": {
      "title": "New Worlds, New Civilizations",
      "author": "迈克尔·詹·弗莱德曼"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[42]",
    "source_spatial_record_sha256": "d84b5e73d1137fee94bf78cd7f677ab4f2b824e5b97cfe524922acfbb4475b73",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确这份Star Trek插画导览知识限定书介已述的多个不同恒星世界、空间站和社会的视觉呈现；是虚构世界图文导览范围，不声称读过每段正文或发生了真实舰船旅程。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "d19f090fae0d81ba8db4a4edaff97fba17cb9e0705bf1b2f9a34d539f6ae39a1",
      "facet_bases_sha256": "5323455ad7f5d6b22726560fda647a093897138ea50788b6a5fe8c5513262fbb",
      "source_scope_sha256": "729f79143daaa747fd8f0ff7c5836e62a71c188d8cce04116d65669f38bbcc08"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "bd1c0f65de103fbb64744d40c591f92bd97beb98445a62a12a121c17abdbea35",
    "source_log_record_sha256": "bf3ad69e4921e5030d0ebcb25c2008becd1fd8ecc6ffbd53bbf4ddd835745897",
    "wholeprior_sha256": "0c262ca1b093c16ebdaec3e561f767ca6dca6415042e2ae3decfa42161699d19"
  },
  "Q55230509": {
    "id": "Q55230509",
    "identity": {
      "title": "The Conquered",
      "author": "Dafydd ab Hugh"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[43]",
    "source_spatial_record_sha256": "e76195bdcbec480ecdded1d46b0d9e31b71af5923e3a093d4e50e613c12b5bbc",
    "reviewed_spatial_fields": {
      "spatial_primary": "galactic",
      "spatial_secondary": [],
      "spatial_rationale": "准确Rebels第1卷知识限Bajor/DS9所在星区与已述Defiant赴Gamma Quadrant的两处银河星区；不借后两卷、整联邦辖域或敌方势力补全银河到访。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "1c6609f98bcb65ad187e7b1bd45b0189816ac879ffa6ed536a69f51e84dd5ac9",
      "facet_bases_sha256": "83bb6a606ada1abae46da60ece5e8e52d09e95d4d98b1e38db79d6a57ff07504",
      "source_scope_sha256": "73981c568d9fd7ed616cbf383ff361078dbcbb51820dd36e9580cad63d74e0d8"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "073a73b75794f819e83ed840e77b015c7efc201106d7c708c28f7b8d5fd02fed",
    "source_log_record_sha256": "e475981936ad4ae79e519e9eadf9f7c025e4a4093c4305020318a4ee4bf2b842",
    "wholeprior_sha256": "22d0541383509c695a4964bcb421756e8a78fef1efbbf11004a72b5e8f722300"
  },
  "Q74378": {
    "id": "Q74378",
    "identity": {
      "title": "Time",
      "author": "斯蒂芬·巴科斯特"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[44]",
    "source_spatial_record_sha256": "957618ef14962d91263ff02a6b7aecc88c7486a795beb9280c19d1aac7d3dc2f",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位官方本卷书介明确的2010地球政治、生态危机与Malenfant建船争议阶段；深空殖民方案与造船不说成该阶段已抵达远方世界。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "1ef08e79c26ed6c135b03d8ea43ae7a951380fbe050dc974cc7e054472c61cd2",
      "facet_bases_sha256": "8f9c5a6e7650a9478d046f3a5c9d734d5bc87d307ab414cf10a16c7f1ac5574e",
      "source_scope_sha256": "5d6f7ae0547f740cbccb6c025ff7e79f13bf8f0c9e9db4070d077a9725268c9b"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "failure_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "8666572ef19253fda3d2e85e70726deb8cde1b298e5888f8fa3b72fead4cc07a",
    "source_log_record_sha256": "0666f26d067925d5a50730a41eefae2902feee50c9a4af9d687924c0583c881f",
    "wholeprior_sha256": "2caf849721386e3e1361a36704657e77a22c8180785276898e5cdec6902730f3"
  },
  "Q7713157": {
    "id": "Q7713157",
    "identity": {
      "title": "The Alleluia Files",
      "author": "Sharon Shinn"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[45]",
    "source_spatial_record_sha256": "1bb3272f42d75eaf9f5ac51f5f7c391d5143decb23f7de59423bbe5a8a53c7dd",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "准确The Alleluia Files本卷知识限定Samaria虚构行星上的Tamar、Jared与Lucinda活动；Jovah是否轨道飞船仍按原材料疑问层级保留，不用宗教传说直接增加轨道到访。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "9d3daf7bcae1f189776513ece0135e00afb1dec90c76eaa44333cd8bf36b5197",
      "facet_bases_sha256": "0617b8a5c09fdf186860828a4d3b2c3da7cf3f2bb1d54a0749558c6b34fbedf1",
      "source_scope_sha256": "c072e79a1a63641b7ca60d9f26167c5d8fba05272a06e99382115b181d994219"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "5dc7150d84b5d925e74803173181dcbb276f591f71aed00b8b52ccfae3f02fdc",
    "source_log_record_sha256": "46b2d2fa923a7a447240cc51441537f99462b43aa6c896b823ec631d83d55be6",
    "wholeprior_sha256": "5d91681fa47f93e1468e7f93067e59ffd6e10848c5fa6ad0eb6b1b1fed10d55c"
  },
  "Q7714276": {
    "id": "Q7714276",
    "identity": {
      "title": "The Armageddon Inheritance",
      "author": "David Weber"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[46]",
    "source_spatial_record_sha256": "93308dd72e84d0d3eba2d5a887d9afed4a34c77c30ed9639e9fe490594bdabb2",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [
        "earth"
      ],
      "spatial_rationale": "准确The Armageddon Inheritance本卷知识限定Colin前往旧帝国不同恒星世界调查与Horus留守地球的两条行动；古帝国的巨大辖域不等于本卷全部实到区域。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "fa4578b38ba21797eba78850f3023f72535c4fea865aa5b04682808ef0a3f961",
      "facet_bases_sha256": "9ef0100ab6c73b41087e3d49ae05278406ae8a8525d2be68165d0d3aeb21863c",
      "source_scope_sha256": "2a8a376a6bb55bd0b9305c3fbcc5e4b6742521e01edd05fd6a8ff8adc9d95968"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "22c2b849e16b3d9e1fbed659aabec50d320e34f52a6c68c19161567a81a040b8",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "dcad46abc733011237d206aeb2b6ea9136b8331ddbe6689da3babe94878ed1db"
  },
  "Q7758417": {
    "id": "Q7758417",
    "identity": {
      "title": "The Privateer",
      "author": "詹姆斯·杜汉 / S. M. Stirling"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[47]",
    "source_spatial_record_sha256": "6ac9230a73cd60f65e472fceff901bf44d28a76dcd7743d58f1e7849cca174f3",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅取本卷评论明确Raeder等留在小行星带营救同伴的阶段；舰队撤回与秘密任务不补为未见的全部恒星际航线。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "e7738e9282bdd7e278ac3bc0292e907df183ba62a44327cca11b1922fa304ad9",
      "facet_bases_sha256": "049d470c6113ef31d7fbf62a49131811890e95dc2937a3e9d873c044bda49eda",
      "source_scope_sha256": "0e0b7698174dec90040568d815c35e3461b02a38752bf2298fcaaa636f399187"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "410a9e9bbe0ff71cc7ad12fc711200222fcd197999cf29872a0e52eedf10b379",
    "source_log_record_sha256": "25d29cafa2a565504f010e20a1cf7d4cc6ab907ab90b582800a6b6f6a789101e",
    "wholeprior_sha256": "984bfcc1bd518825837d6d2cffd47650e84ed7f7eb4f13f0dbb362f7818f6f45"
  },
  "Q7761136": {
    "id": "Q7761136",
    "identity": {
      "title": "The Road to Mars",
      "author": "埃里克·埃德尔"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[48]",
    "source_spatial_record_sha256": "04c4c488c1bbb4212ef206d2713b404fff58acc22de3112da96a4b876df0aaa4",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅取本书介明确的行星巡演和表演组合所在宇宙船的局部生活；未明确跨恒星距离，不凭The Road to Mars书名确认已抵达火星或银河。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "db46dec860e42637bb355a0df52d388c8833e380a7548a64c02924485a673833",
      "facet_bases_sha256": "d260e5769e36ba26bc1b55f01ea63ed1f12b6beabd63b9914ee2d547e6071c65",
      "source_scope_sha256": "306eac084b593b3962d518b7f4563ac3e8dc0034d00101a61e36f82685020984"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "640e45328bd001e50811bfa611585cf8fa9aaaa2d33ae6e9f294ec3cc6ae00b9",
    "source_log_record_sha256": "59f26be9fd25ddad43fe384f14cbf4fe86b1a54ec6d6316c9258903d8a7859e9",
    "wholeprior_sha256": "8edab53060bc3c28ae3d160075f59cf2e5fda0a1d0de476b1d36d23a5ab758e6"
  },
  "Q7835408": {
    "id": "Q7835408",
    "identity": {
      "title": "Transvergence",
      "author": "Charles Sheffield"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round3.json",
    "source_spatial_file_sha256": "55e9b6e848ba836c7a664fe708ac8b28cbb3fb135deee3f0f1cc1a08705ad4de",
    "source_spatial_record_pointer": "$.records[49]",
    "source_spatial_record_sha256": "6066510203ec1246d0ee15e0944de02145064877f8fb047b27c6c5d759f96698",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确Transvergence修订合编本知识限定研究者在不同恒星世界调查Builders遗物与Zardalu事件；不把远古统治全旋臂的范围或Builders起源当现今实际遍历范围。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "2eccec41e62d8cf92e36881c5812e52d50bb86366c6058ddb21edf381fe97642",
      "facet_bases_sha256": "9f7c819cbaa3bfa3ebac44addc6c0137f17bb12a8130c0197a23fe3b9c75067a",
      "source_scope_sha256": "c9ea6460f5aa99cf1e32ef87238a698ca6b9108b43bb6d18e7f2e50d4cf3a0fc"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "04fe2e1180d053b2fda281188870e8ea21da0c89443eeb26fdd078910b7a2d31",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "bdfbc569776f3a28f0bcc67171bf540cce03311527099d555d6506b33107ed07"
  },
  "Q131380944": {
    "id": "Q131380944",
    "identity": {
      "title": "The Martian Race",
      "author": "傑格瑞·班福德"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[0]",
    "source_spatial_record_sha256": "99ae5e9762635146bbe239d52647354986fb93a6caaa3ea06d7f1a05d9913263",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [
        "earth"
      ],
      "spatial_rationale": "准确The Martian Race单书知识限定地球组织的竞赛及实际火星远征与返航条件；私人权利出售和政府奖金不能替代未说明的其他行星路线。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "3bcf298a4182ae9a5fa49af56f11a7b682692c902f29f03e579b0d7b9dd08af2",
      "facet_bases_sha256": "bcced739de18ba62549be8d0797c35e29282055880d296c5661bdd1e835733b9",
      "source_scope_sha256": "bbab79d4741805b2cdd03453b85607bb258ce9da006b4c9067fae329f48f4a23"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "4dc2ccb131577d0dd259ea824945eb25d6d0ce43e047f5b1b0cd20d6e4634833",
    "source_log_record_sha256": "6a9f36fb3fcef36ee721bf59d830760cf0a577847d33f4081bd1caf04c7db330",
    "wholeprior_sha256": "00cffedf84d3a77aba9d94f3574ae8db099b019d0110b26518b100c29e880e3e"
  },
  "Q131472078": {
    "id": "Q131472078",
    "identity": {
      "title": "Mount Olympus",
      "author": "班·保華"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[1]",
    "source_spatial_record_sha256": "3155ffbf0f1e0cfa89e623a31b866d58e1a0d09f2efe7b941d37d78a3e3a7c7a",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本篇材料明确两名探险者前往火星高山，限这一火星探索；自我认识变化不构成另一个非物理舞台。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "2f094c881e1cf73328bc064acc2d2eaff6d564ef5bbc7610dc2420709b524723",
      "facet_bases_sha256": "f2be157a7d04d84e34b7c84be20722237f314dbb6dbf5987e0ab8910a0b112c2",
      "source_scope_sha256": "5bf55f6eb4e3ecd6c0b5bcd848d5e3bb19c0ecc273f7c84bd0ecc42078a65a53"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "current_unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {
      "raw_search_artifact": "work/evidence/quick-retry-modern-r6-search-a.json"
    },
    "original_ownership_exact": {
      "original_ownership_file": "work/evidence/quick-retry-lane-2.json",
      "original_ownership_sha256": "f1e3bce7c91b9744ab300726ea85acd26e5f195553ce022a63559cc16e04bda5",
      "original_ownership_index": 166
    },
    "source_analysis_record_sha256": "d2a1209fc0752c77cfbca0e3d5409a4612ebadabc1d463b66e8bb54f730df2fe",
    "source_log_record_sha256": "e1f5d6e88792927c9e7579ddcfeb6bb299e78e16e26c6a5f6fe43fa310f723f1",
    "wholeprior_sha256": "419d77b40e320044205d1912ae8da4067cf61b116cd1134be41bf8f9c608c921"
  },
  "Q131518563": {
    "id": "Q131518563",
    "identity": {
      "title": "People Came from Earth",
      "author": "斯蒂芬·巴科斯特"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[2]",
    "source_spatial_record_sha256": "fd5b92a77ba6b8c48b6f9f36f1a8c8a19fdd83521ad9be764d75eaefde5718ad",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本篇材料明确多代人类在月球低重力环境生活并逐渐丧失技术与地球记忆，限月球居住阶段；地球是故乡信息，不据此另称已描述在地球行动。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "1e2efb17b304af33ee0b47cac7734c95e1989c398c9c11d0246cc247e6737287",
      "facet_bases_sha256": "014f55bbab64ea886bdb23d856c9ca166560cfe9ab98188ef0490b3f2a8e3af9",
      "source_scope_sha256": "fc5c59acf855820dddc1523a10d9b275911882709f17d07db5b5f7a75da60d1c"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "45eda07224923dff19b24ab153a0293151111436f59adb83d0619e848a481175",
    "source_log_record_sha256": "8151f2a0a099fa81d8e6f8540e94ea12db72270465d7f49a38392387802f2b01",
    "wholeprior_sha256": "7caaf10b2a6e4cd2fca8be36553a5c6482d70155eefe8ccb1d0db8c0fdb047fd"
  },
  "Q135094093": {
    "id": "Q135094093",
    "identity": {
      "title": "Rainbow Mars",
      "author": "拉瑞·尼文"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[3]",
    "source_spatial_record_sha256": "0adf51da3f0cdb4c71b8f451e12b01ea2d5d5e71e97cc8be632f2e63d6fe2a60",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [
        "earth"
      ],
      "spatial_rationale": "仅定位Rainbow Mars题名故事：Svetz从未来地球执行任务并调查有运河的历史火星；不把时间旅行本身改为空间平行世界，也不扩为全部所收成员的共同舞台。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "d32a7f270c2b3583879324e334d145f87d0f86ce7761c2ee8ebfc7d9282bebb0",
      "facet_bases_sha256": "e540406f8f1d18ed90bd4ed20233349a3726f1ddcfa8536238eb947b48939f1e",
      "source_scope_sha256": "8ce3c20620f3ccf3292b7a7ef0812a50f8c29ad4edbb88f551db0dd6f6037501"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": "known-year-first-pass-lane-3.json",
      "original_ownership_sha256": "b193cb6e5cbf290ee699db0a540b6b05c6c1855dccf59651ecb3eacfaa865e0c",
      "original_ownership_index": 74
    },
    "source_analysis_record_sha256": "86d80db58b212d8ba97e67badc585ba146b7d951f8279f731a08dd90a9fccc62",
    "source_log_record_sha256": "7a882e4af57a4a1efe717bc3c9a639806b0f67b7a1377d024fbc09b12c20c2ae",
    "wholeprior_sha256": "d2d2fd0b486a9af463bb55002c062ea775c3bfeba94c71586d142d4b8e80fb07"
  },
  "Q20009838": {
    "id": "Q20009838",
    "identity": {
      "title": "Tempio",
      "author": "Giorgio Sangiorgi"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[4]",
    "source_spatial_record_sha256": "f3a4da3e80494677ad9938f775d53ce0dce2c848addd0ab40a411610b0b40ad6",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本作材料明确月球异常建筑、Daniel值守与抚养婴儿的阶段，限月球当地；建筑神秘关联与人类未来不补更远星体位置。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "29c22cfe2911b27d5bc81a50530aa55495b45baf53c342e9ba7ff9ffa60e030e",
      "facet_bases_sha256": "1ac470cc753654a14fb68faf6d2b465ad9f2c856074baf5d67230a471e80f53b",
      "source_scope_sha256": "052f7194ad38f7836762706ec1640d29a0e6f01f32c7b17f24a6733f73c97c3a"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "e48ea3816945551fc6483073b686d556d4d2da01f1485aaa852e8db38f952816",
    "source_log_record_sha256": "28612257c96a98bd12ad694c67c655ae87b723eb06818c3d30d8a7addc2f0073",
    "wholeprior_sha256": "112e1b74a40fa2f14d4fa411e07090b3b176874a7a80189e56c8c1f0a01f738b"
  },
  "Q21190041": {
    "id": "Q21190041",
    "identity": {
      "title": "The Winds of Marble Arch",
      "author": "康妮·威利斯"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[5]",
    "source_spatial_record_sha256": "78641e4c37a7a335af380f26c0a2bddd7cc8797faa7a4c503b26f61b4a683de6",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位此身份采用的The Winds of Marble Arch题名篇：叙述者在伦敦地铁追踪异常气味与婚姻变化；不把此局部分析概括为同名后续合集的全部空间。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "c0747f94aaf8c4f41c317ee4d3ed26f291a9a4202dbef2a7a9a79a7dc276529b",
      "facet_bases_sha256": "856f371d16fb688eb8ec2182a8dfa7f40d8e63b4f8763d35e114b31344c87e31",
      "source_scope_sha256": "47773c1554d6fb4090c5e3a6225a5817878540b7608af79bfdd572c58ceb56b3"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "current_unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {
      "raw_search_artifact": "work/evidence/quick-retry-modern-r20-search-b.json"
    },
    "original_ownership_exact": {
      "original_ownership_file": "work/evidence/quick-retry-lane-2.json",
      "original_ownership_sha256": "f1e3bce7c91b9744ab300726ea85acd26e5f195553ce022a63559cc16e04bda5",
      "original_ownership_index": 635
    },
    "source_analysis_record_sha256": "c87a9617a6546a212942c8974f8c30bf940840f308d3a3a201795e0f4c9b9bf1",
    "source_log_record_sha256": "0888e8c74a5e6e4fd4f92504c08695d4f8e3e54acd5e7b9bc18c0b4d998c554b",
    "wholeprior_sha256": "f4faa5ccba719f9b930bbc5410b614f21e43bb3507a57b5917eaf9f081627cdf"
  },
  "Q2362130": {
    "id": "Q2362130",
    "identity": {
      "title": "Temple",
      "author": "Matthew Reilly"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[6]",
    "source_spatial_record_sha256": "c5fcbd67d729cc38c6bc258fe87a953854639abd67197e2919c24dc49aeb9cb5",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本书材料明确Race被带往秘鲁丛林译解手稿并打开石庙，限地球秘鲁现场；遗物的未知力量或起源不增加外星到访。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "90dd3a927459bcb9aa6506977c901f960297e84721e7c5656089c89c0ed8b7e8",
      "facet_bases_sha256": "fe6092647ecfde8594af0560dc20b5c4b9c769da7dcc73437ed598ff62fa097c",
      "source_scope_sha256": "306eac084b593b3962d518b7f4563ac3e8dc0034d00101a61e36f82685020984"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "16ca4cc3ac8053a4487238a5324757742727de4f45e4caee6c32f97331f5c64f",
    "source_log_record_sha256": "940c8bac77e190712f774e442bbdd100f680d8bf5c5ebf9dc91c31fc9e31be0d",
    "wholeprior_sha256": "433ca37f73e50bab63d48b66530ece6ccbae1de7a12d2ddfb13e38c596ff97a8"
  },
  "Q27796013": {
    "id": "Q27796013",
    "identity": {
      "title": "Precursor",
      "author": "C·J·彻里"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[7]",
    "source_spatial_record_sha256": "bfd9fc27b8277c0cfdc554f69318829c91f6d6ef8644a4cfeb5095a48ef11298",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本卷材料明确atevi世界的航天飞机与Bren参与的太空交涉，限其行星及轨道站阶段；共享星际技术与Phoenix既往航行不自动成为本阶段实到其他恒星。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "eb71419d527e7295479228d0a1dd9ab17c4d40da9353f87b715aa07393f41f01",
      "facet_bases_sha256": "218941aa7c401d4bcc7fe846747994cf618021af9aa676e3682d8ff4a1cf3546",
      "source_scope_sha256": "f92e850690c6f18cba05fecba7c82c058e6fd78bf78d5ffd8bb371fc91219f3f"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "e0a7dc22d57d0884c22da751be5259e0532399205cc1d50241d046706d59b476",
    "source_log_record_sha256": "e6ace60012466bc4b85b3c195fa889f7d49656c6b7d3d0680fb9e495dc146ad5",
    "wholeprior_sha256": "62a54d4573a3fa2bd7a6c04aacc58462e21c9a139b58d15989a28ac7f28502e3"
  },
  "Q28403609": {
    "id": "Q28403609",
    "identity": {
      "title": "The SFWA Grand Masters, Volume 1",
      "author": "作者未知"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[8]",
    "source_spatial_record_sha256": "f1e20fa01e546fa66c1356ef2d273601a062a99936121b06e84cc22ea3db756b",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位The SFWA Grand Masters第1卷所收Simak的Desertion中Fowler与Towser转换为木星原生形态后的体验；不是整卷共同舞台，身体转换也不等于abstract空间。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "d9930fc2df8bee29fc9b874a269f8c5c73ae220b3d20ec66af355a60eaec8ee4",
      "facet_bases_sha256": "fc676d12c8bd65cebf83a5972e735e41b6f5781dc44aa974b246163bce8bbe41",
      "source_scope_sha256": "9a6d2314b9773cc220f4a06d0a5f35efe748b09ab1a2dfa2a5c438e4a279d2ce"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "failure_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "5d5be9737398615f516ef3b7a405a5d9d68a46548fbe8be103038375b6e8175b",
    "source_log_record_sha256": "2656a6503d82f9bf42d876561f8a26917526e4cad4227b994f80458ab69930b1",
    "wholeprior_sha256": "d3097dec0e7e8df362f2fefea1a9996ff2999ee5fb3dea2a7fff0fb8ca132b96"
  },
  "Q28419608": {
    "id": "Q28419608",
    "identity": {
      "title": "Future War",
      "author": "作者未知"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[9]",
    "source_spatial_record_sha256": "7ba27c7ca6221066b0253954747bd0730ee365b158ac38010a032e4d4a56d184",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位Future War所收Dick成员Second Variety的核战后地球战场、地堡及对人形杀人机的判断；不将月球逃亡目标写成已抵达，也不概括整部选集。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "41fd208f52ebe20be3773a5a6b59b575b6cfc7fa5382b5b5805fe103fef1f115",
      "facet_bases_sha256": "f38e547750c5987c590edd1efb9b072e3c38d7ace8f5b82a567d227e5e9118c7",
      "source_scope_sha256": "b07ed625436c567a6769f91e4676a2e4081d8d1521f57dc7871621d01d483a8c"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "failure_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "6e340c6680cf83a628f7f6c818a202df30e6014d9c82418a7a69b85dcba26cf4",
    "source_log_record_sha256": "fb35453a2856d5b621de0bfd2c25116823a34df9900bb37037eb616d9479d3d7",
    "wholeprior_sha256": "452666fdb5a2359df5fa3477b5205919f5a2d74d86995d35d862bf2c3a41c3e9"
  },
  "Q29918070": {
    "id": "Q29918070",
    "identity": {
      "title": "Huddle",
      "author": "斯蒂芬·巴科斯特"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[10]",
    "source_spatial_record_sha256": "6a1ae1243e1248a9c0797d0d0ecad3e775419bdd260fca88860c79a2ec4b4925",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "仅取原单篇材料明确企鹅形态后人类在严酷地球冰原上的群居与离开阶段；改变身体不产生独立的虚拟空间或另一颗行星。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "334a61b78d2a264d42d115425d590fe3cba81f3c39d5244febc90ddc32b3047b",
      "facet_bases_sha256": "f413f49e3f90e2f12f38f77baf0d7abdc36926134bc4db867dc6d36e0b8e5812",
      "source_scope_sha256": "b8fc39d4bb3d3c7541bebc0f761965fa149457475715ef56146fcee089bd4658"
    },
    "result": "skip_this_adoption_keep_original",
    "reason": "Huddle专属有限材料和原L没有充分限定Earth，不能借企鹅身体、冰原或相邻Grey Earth段落补地点。原A其中Earth用语仍保留为原分析，不作为本轮独立场所证据。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": "known-year-first-pass-lane-3.json",
      "original_ownership_sha256": "b193cb6e5cbf290ee699db0a540b6b05c6c1855dccf59651ecb3eacfaa865e0c",
      "original_ownership_index": 76
    },
    "source_analysis_record_sha256": "fd3020191eadb3fabfe5735135acad32dffee3678543df68ed394122ada71a1e",
    "source_log_record_sha256": "dc644e65cf91490825da3f8291e9efc10cf7071d8a7abdb7ecbf3b3659304317",
    "wholeprior_sha256": "c44eb59a0433eab114dd784d99dbb2c85e08b0c1d577da23164b28bb9a2a2cf9"
  },
  "Q3210024": {
    "id": "Q3210024",
    "identity": {
      "title": "Forever Free",
      "author": "乔·霍尔德曼"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[11]",
    "source_spatial_record_sha256": "e31aa40da1c8d76520c9782393af4159c188b00f08d8ce833627f626ed14f1ae",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅取原本书材料明确曼德拉等居住的寒冷保留星球与由此出发的阶段；不能从昔日星际战争或夺船目标补未说明的沿途恒星与最终归宿。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "3e1ba822a986cdd823a701bc433a4a95080e3038303ed07830f348479256890d",
      "facet_bases_sha256": "44b596b1e19e5c011dda2b420bfcd5570b598b9adc958a3c34d2f38260918be6",
      "source_scope_sha256": "b9d177b0af62b8795ffaf786896b5f4cbde82f1b46fb4f6867aac3ac0bb6143e"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "f1a3ad18bee756bc776c0087242f97c8b7affd6fb5a3dd0abb0453405dee48ca",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "ff2815093d801cd19f717f7ae313d0c68c3dc8736c1d81c01c762f94f1710164"
  },
  "Q3222317": {
    "id": "Q3222317",
    "identity": {
      "title": "The Naked God",
      "author": "彼德·漢彌頓"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[12]",
    "source_spatial_record_sha256": "1aa89da9e4480134af67dc25a2fa13a26c7041e6f2262976a564fbdb135500a4",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [
        "abstract"
      ],
      "spatial_rationale": "准确The Naked God末卷知识限定共同体不同恒星世界及附身者把行星移向另一维度的已述行为；跨维度迁移另作次范围，死后天堂承诺与超越力量不等于角色遍历整个宇宙。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "0db5635c042df370677d30fd0e7ef525762370d8db7bd4e40c3fd3dbe4889369",
      "facet_bases_sha256": "19351c761e50307d1aee09fc6ace0ea529ae92fb00d2696b640cdd3c31d6609e",
      "source_scope_sha256": "e7953d8699627c039da0252e3367ee2474a24a6e58385d8a5fc42c654398e467"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "5d1c9f0bad5fb9e49bd46029aa67900ff95a756ee58ecd50da80a720f344f420",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "a03360a59716cf363886ffa4c0a87ad49a48dc8f8b91aaf9dcac047bd06433e9"
  },
  "Q3791648": {
    "id": "Q3791648",
    "identity": {
      "title": "冰站（小說）",
      "author": "Matthew Reilly"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[13]",
    "source_spatial_record_sha256": "1f906b4c60665993f4c4853a2970669f2d2502f4686c269220b1d69b5171eb23",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本小说材料明确Scarecrow等人在南极冰下调查异常并与他国队伍竞争，限地球南极现场；UFO身份与起源不推出主角已有星际行程。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "4b17cd1671b89c86972870492c2dc49c71134d98298bef48c0332ed83a3d91b7",
      "facet_bases_sha256": "0c2c3cceb6491b8f2a1f1438e09049562f99997a44390ed1b11d6384f0839a09",
      "source_scope_sha256": "6e67a9c4c4b607a187539e009ee9392ffd002924e5c95aae2b4ca75bf9ebb3df"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "bcbbc10f9b245ecc9df689a4d4646cece3270f44f7812087bbcd2b23ca11e095",
    "source_log_record_sha256": "7f5e7d68e742bdd19ad3a270a1c2cd3a7334988cb4be4c01ae9ed9ac747a827e",
    "wholeprior_sha256": "b5aa79e240665ace4034d610607124d6278cd71af0d1f22be7fc3dbe17ea85c0"
  },
  "Q40860689": {
    "id": "Q40860689",
    "identity": {
      "title": "The Sky Road",
      "author": "肯·麦克劳德"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[14]",
    "source_spatial_record_sha256": "ab6ac81eee67b4d376470aeaa657863c2f670c9ed9a31c2e9ec0f04c3f60dd48",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "准确The Sky Road单书知识限定Clovis的地球造船社会与Myra早先在哈萨克斯坦的政治行动；重返太空是建设目标，不把发射或远方目的地当已抵达。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "ecb725fa6b474b9dac8e5745a62f8f1e10db7775964c64978a8922ecc68446fe",
      "facet_bases_sha256": "40ac5dc0db4e656d4880388a4772febc44ff14a978b073f23f3f108465027cfa",
      "source_scope_sha256": "495dbb250f26b4ebd8d740da3543aecba2ea19073f440237f2c02deb72ed2b64"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "28862b73beff193e9873c3127a887052ceabf93aaa31c6f571ed3e94130753a0",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "64b81c7fe047e261fe93c8ac9c985af0bae85af0051f83c7163eb95a1bb5ca12"
  },
  "Q105222224": {
    "id": "Q105222224",
    "identity": {
      "title": "两只小鸟",
      "author": "韩松"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[15]",
    "source_spatial_record_sha256": "2b620a5a3973425ef2097e2db4eb4146abebfc5e5ebfac9a0493f0cee24f125b",
    "reviewed_spatial_fields": {
      "spatial_primary": "abstract",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位本单篇材料明确奥兹玛逃到新宇宙而仍受未知力量牵制的跨界阶段；不用题名的小鸟补地球场所，也不从新宇宙这一说法推其完整物理尺度和已遍历范围。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "b376c14ddc9e5e20a5460c0726b423ed0581573e8edcdc28c3763fd69832532e",
      "facet_bases_sha256": "92c9c27772fdd6a43410b81e91577ae1df031f1f95ae2782aa2fabe8857d472e",
      "source_scope_sha256": "729f26e569f3af84d75f3fd9c7f2ae4f39c112e61745841ae7659c860cc841c8"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "8dde94a70b369a29a79f795240fa9052cc24ad1d6dc7e4fe404af3be3359c0b7",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "74234e98afe7498fb5daf1f36ac2d78acc339464f950703b8c019892f982b90b"
  },
  "Q131308066": {
    "id": "Q131308066",
    "identity": {
      "title": "Whiptail",
      "author": "罗伯特·里德"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[16]",
    "source_spatial_record_sha256": "73c7491f81555de1e8bacabd9aa09ab44559177df2639254355975f4569ba579",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本篇材料直接说明不同生物学的地球及年轻人与Chrome在废弃城市中走访，限这一地球环境；改变生物规则与建筑记忆不另作空间跨界。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "d139a8ce8c1ad9bc60a785fdfa55f4d024c8ffb5329195065d6b88eb0eb7dc86",
      "facet_bases_sha256": "ae737bbd3b057176890e789f38b21bbb59515ba770fbb8487d06bbc05c450514",
      "source_scope_sha256": "53f8bc21228fd3038edd8f686271bcb7e284692d8c3fda76ad5b5c8b2ae36819"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "ec33e21869d29eb1cba9710c59b0ebc675163aa9c8dd1a5b04f3aa41d6a143d3",
    "source_log_record_sha256": "ecee6f2fee43d5db8c7c409d39494ce4ccf58c92cb1614b9f6996808c7f6ff48",
    "wholeprior_sha256": "46c1101a675ef7203a5ecb10296de345f935cf5565cd164abf6241f6a4b4b7f3"
  },
  "Q131461675": {
    "id": "Q131461675",
    "identity": {
      "title": "Reading the Bones",
      "author": "Sheila Finch"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[17]",
    "source_spatial_record_sha256": "0de419fa7d892166344e2ec5c63eed2d59cdd5dca46ec247606ed0a2ebc79b94",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位1998 Reading the Bones中Krishna殖民者与Freh生活、疏散的虚构行星阶段；不借后来扩写长篇添加未见的迁徙目的地或场景。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "4827741cd8ddc7732ee1fba522e5c648bf3117babd2bbf4f2706f36489654a25",
      "facet_bases_sha256": "94239571c54e142651be7a49b15e87036813094fdefb05cbc610f61d1ee36579",
      "source_scope_sha256": "59cffb96792e93efa301a2e8d24a9c8e72b38665544f6035a34918d47a45cbaa"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "d8b48b011e49323603fe0aeaf64d284dad6a7af22d74afa4b33b539230f65f6b",
    "source_log_record_sha256": "20a62ba63977ddf411e314e6660951d7b2bb099c1de79634d9c0da86db768507",
    "wholeprior_sha256": "c448c41fe07837a21435548e2a3844bd5dd2884282466b8ffb723bffe85c466d"
  },
  "Q1431808": {
    "id": "Q1431808",
    "identity": {
      "title": "LOOP (鈴木光司小説)",
      "author": "铃木光司"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[18]",
    "source_spatial_record_sha256": "f006fd0ae375041f29d14354d5ad6d818208f4828f618c3014ff76dc13447fb4",
    "reviewed_spatial_fields": {
      "spatial_primary": "abstract",
      "spatial_secondary": [
        "earth"
      ],
      "spatial_rationale": "准确铃木光司Loop小说知识限定真实地球的追查与被建立的虚拟世界Loop这一嵌套关系；只解释第三部小说，不以电影改编或同名计算项目替代。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "db1363e1d9cf6568ac188217703ddfe53fa3628484a778755d67babec8ed389e",
      "facet_bases_sha256": "608982f56476613fe0f09f1577fd6bdc51f9abc9229b833fd3d51c0ddb085b1b",
      "source_scope_sha256": "0e0ebb824d2272b4678d2516f296f34ae875a19d4ceb2611c3c33839023f20d8"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "cb07b4e004203de53e04d640dd5d50c7bac5f2a1b9258a2459832e005c0f90ec",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "03433828c8c95f0dd7e79738fb26a01631590cf077d01cd5a71ee81c8fd2baa9"
  },
  "Q15034499": {
    "id": "Q15034499",
    "identity": {
      "title": "Heroes Die",
      "author": "Matthew Stover"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[19]",
    "source_spatial_record_sha256": "a4ab4bd6b882a790885740f405aa39bacc48ec77a770c8b8317282762c7976b3",
    "reviewed_spatial_fields": {
      "spatial_primary": "abstract",
      "spatial_secondary": [
        "earth"
      ],
      "spatial_rationale": "准确Heroes Die单作知识限定地球公司体系与演员实际进入Otherworld的冒险；异界居民受到真实伤害，不只是电影布景，仍不借后续Caine系列补世界或行程。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "33efc102cf923b97f0febacef235047ddb303ba4339445b49d9d96fd18e8a27b",
      "facet_bases_sha256": "4c67cf80e060f1798d0e13b801e6b1d42dfa9954e6545e80dbb72687143e9ab7",
      "source_scope_sha256": "c24b6b2372f0287fdb9e759b0f7634a2b0313b5dc0ea214f7a651d388a2688cd"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "c9b2f10dac575ae1e31b40e9dff4e296fb448f821cd076ece71f714a2f845dd1",
    "source_log_record_sha256": "e4becae3db1774187358c14d5c465a1a6a2d81872738d13cf38057b28e7e9e6f",
    "wholeprior_sha256": "c1ab5d9ac69d9bfcd6e93f8712e14a232789e05a207daaf6b0c54dff523ba422"
  },
  "Q17126345": {
    "id": "Q17126345",
    "identity": {
      "title": "Tales in Space",
      "author": "Peter Crowther"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[20]",
    "source_spatial_record_sha256": "c09c08139824078b80aa0adecb85746b87362a3ccdece35bda74b9d82146670d",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位Tales in Space所收Bradbury的Kaleidoscope中散落的宇航员与向地球坠落的近地太空阶段；地面孩子看到流星只是另一个观察视角，不概括整部选集或外恒星目的地。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "8e002a2a286003001e5981545a8f2f4f59a687f040e24d5862843b0cc3581ea6",
      "facet_bases_sha256": "2d21ce43353ff070f08297ab0049889bcc6cbe429c61f39aee6960bb9b689123",
      "source_scope_sha256": "7d9c2add7940f5907722bbdb131569dbdea82428718f8c2c9bcf8fa8c64fdcbf"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "46580ac01fce1fd350a23b41c5359b0da137fdb74003b488dd133bd4797586b8",
    "source_log_record_sha256": "72a5fcb5d503fa6c67792598e20dd53af054cfc77663d9ac48a32fb36e915a1f",
    "wholeprior_sha256": "e561e3b1b7427aa75dc2d98e82b099b9d7319819b079d3445a0dea85e22a7b42"
  },
  "Q2822148": {
    "id": "Q2822148",
    "identity": {
      "title": "Abzalon",
      "author": "皮尔·博代奇"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[21]",
    "source_spatial_record_sha256": "2ab5b3ae03dfaded4100bcb23c4bb6fe5cc3ef62bf8ebdd6ea265a70524ea051",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "本书材料明确被送入巨型飞船的人群进入超过百年的恒星际航行，限该船及实际航行阶段；不从时长推出银河范围，也不称目的地已经抵达。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "dc8657606a455b9fadc03121ff3a97bcdb4204afa0702a34ac2a4985ef0b3a2e",
      "facet_bases_sha256": "47150bbe025d3bca60fb96481e3e2e1d9e9364ae7468012497cea5b615613bfb",
      "source_scope_sha256": "dab9b6348573f156495bb127587b781188b01ca148d1871d42957b3a3ffa288c"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "397342a73acb51bc7eea303141b7475849e5e206278061717dd4a808a33f6e81",
    "source_log_record_sha256": "3a76d4a481f3b92290563ee701e68b2eaf862ff703dedcc73d35b64dabdf8b79",
    "wholeprior_sha256": "1b7d2a3aaf039eb3ea5bdf1e13783bbfcd512391b1d020af5fa19a60010e6d5e"
  },
  "Q3016630": {
    "id": "Q3016630",
    "identity": {
      "title": "Darwinia",
      "author": "羅伯特·查爾斯·威爾森"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[22]",
    "source_spatial_record_sha256": "1a7715a8d59c65af33014e7380697a18409cde677cc1d2771e5463aadaafc6af",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位Darwinia材料明确被异常森林取代的欧洲及Guilford Law的考察阶段；后续现实性质的揭示按原核心保留，不用这一局部范围扩张为全部宇宙或抽象系统场景。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "f2589d76c02f28dc0d87fd809abd9b2852aa136fb2fec22e4981e8d2ef8fd832",
      "facet_bases_sha256": "70c79d8d355e470bf6cce7fd6293d082602a1994eeaa47845bb7f129ed0db0ef",
      "source_scope_sha256": "1c0545ed7ecb956fcade5155de691e43a7ff41ed5596a0bd2c57f75dfba3471e"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "064323c20e32929acc8dcb03f378e814db9e37f11c2cb06c20e2c07b52325684",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "b9e9442b89c85060da906b7c0161db57643d68030866e8b5f873fe84e949a251"
  },
  "Q3208305": {
    "id": "Q3208305",
    "identity": {
      "title": "Echoes of Honor",
      "author": "David Weber"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[23]",
    "source_spatial_record_sha256": "ca73633086bf4c639b654da9d2ac14fd548a9c706339ea6ff4ca1609e1c96150",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位Echoes of Honor材料明确Honor实际存活的监狱星Hell与组织囚犯的阶段；Manticore媒体复仇动员和回家计划不补为已完成的远方路线。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "ddd94d9e921f6268dccedc5c2f359877f0932c975aa641e2a36ccc2e2ddd1e24",
      "facet_bases_sha256": "51d1467a0b5d889d0f5458322645577e522bd13b843ee3adb09c449426dc7124",
      "source_scope_sha256": "ca3fec6b1d6ee4ad26fe764a7256823cdccd2492c546955f669c1a112454c437"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "c3766ad430d8b009593bf15a85f5685bbabf9e37213308201158da03ad1847f6",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "0fb910f646133bb9103339fd579ceae853552525dbf82a7fc40e020871614905"
  },
  "Q3822080": {
    "id": "Q3822080",
    "identity": {
      "title": "The Cassini Division",
      "author": "肯·麦克劳德"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[24]",
    "source_spatial_record_sha256": "0af8c777a851357e766de47ce787f244f4ae728be1e7a5eeb4f8c86fc1ae9ca4",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "准确The Cassini Division知识限定太阳系、木星附近后人类与相关行星卫星行动；数字病毒、AI与敌意不直接使整个主舞台成为非物理空间。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "2a0e2ed1f8f45b9ea95de2f49a2a5fdf0a06fd4da99c9030501e58c0583df8f3",
      "facet_bases_sha256": "3b4bda6baf0840d75232fd7387475a73645223033961092fb6a406624b2c22b5",
      "source_scope_sha256": "d81607f33e7077ef660014d8a5fba3368dd6efe59b1f0f0a3b8e5e32c3e558b5"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "187a4dcd54a8e12146b0315242ad6bf3acb8228b6a27d9cfef83583e018ffd11",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "d78bbcd7c2ae8fe06cf1e9732dc6465a599d39dc255dca672bcc0c43ff72175a"
  },
  "Q3902528": {
    "id": "Q3902528",
    "identity": {
      "title": "Picatrix. La scala per l'inferno",
      "author": "Valerio Evangelisti"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[25]",
    "source_spatial_record_sha256": "c3f0532a8098e411acd201d75f18c584ad98280fe7cbfc9dbdc78f8314def2d4",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位本书材料中宗教裁判官在地球调查异常并求助穆斯林学者的阶段；发现或解释地球与火星通道，不等于这些人物已经穿越并到达火星。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "3ad1d6dde6aea280172627869fcd4a26d54c639b1dec179947fc3be14120cb60",
      "facet_bases_sha256": "7198353a769be666ae0f82711a0cc587c22196f65c17cf25102bd4ef7a9eb5b9",
      "source_scope_sha256": "957191102973779f7273996bd5a6ae248c9941e9d65a4b89adf08059bee4a494"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "205c74c399addc6026d479b7f9b95abad2bd33c02350998246b8751e07415036",
    "source_log_record_sha256": "231b0e91d5c70e52b64e4aa13906c058ba1c13219b6aae6234e4832c3840d783",
    "wholeprior_sha256": "b9bf493a56ab65abee175b221f902aa9cf1cd943e80dfe0e68d71b69a0c9114b"
  },
  "Q4114666": {
    "id": "Q4114666",
    "identity": {
      "title": "Return to Deathworld",
      "author": "Ant Skalandis"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[26]",
    "source_spatial_record_sha256": "012bb3bdc5a5d3c1ba4d940c40c1d73299983dbb4fb83a1f94ed9dc28b56276f",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位本卷材料明确大议会使者来到Pyrrus求援的阶段，限此虚构行星；001号物体的接近与潜在银河威胁不当成已调查或遍历的空间。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "e70e46d47e9a8053db034fe1f6b4305e9bedbf35a0a30514e82713c9c2d95eca",
      "facet_bases_sha256": "8cec794132520596dbd58ab322fced0d42b00ee0054b147024cf4ce1c8e7a361",
      "source_scope_sha256": "57d73cb9ebc76f72bdda2fbb27e6f51d46225988d47124cbc45b176082772eb2"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "current_unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {
      "raw_search_artifact": "work/evidence/quick-retry-modern-r6-search-b.json"
    },
    "original_ownership_exact": {
      "original_ownership_file": "work/evidence/quick-retry-lane-2.json",
      "original_ownership_sha256": "f1e3bce7c91b9744ab300726ea85acd26e5f195553ce022a63559cc16e04bda5",
      "original_ownership_index": 177
    },
    "source_analysis_record_sha256": "ac99553332e6d8d42256bf8575e7cd64b1d3e7ee332d91286ea356380f91d358",
    "source_log_record_sha256": "1ee15978da0fb964377f91e846221217100d25eac45b95f8ba176cafc62597c0",
    "wholeprior_sha256": "13dac4f65c00cb586d5d7443f024c5fa67d4b97a445ce770207333d8d07fc2da"
  },
  "Q4928148": {
    "id": "Q4928148",
    "identity": {
      "title": "Bloom",
      "author": "威尔·麦卡锡"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[27]",
    "source_spatial_record_sha256": "d0325c9962e1bef5cfd157904bd9a50257881264f234c36007c99173b468bf33",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [
        "earth"
      ],
      "spatial_rationale": "准确Bloom本作知识限定被mycora吞噬的地球、内太阳系与小行星带及木星卫星残存社会、返回灾区的考察；人工生命扩散不推为恒星际实到路线。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "107e4634d715209f3c0788fe772c7bcba325c7d34d542035653ceeaea5997807",
      "facet_bases_sha256": "6e9947332997b76ac1ae9be5445eb615cec6753e8ed97ffbd934ba09defe3dac",
      "source_scope_sha256": "fe6e66a70137f7f9c49300fa9ed08953ab4d41cb93145b56a08faf2cb61dec1d"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "3817ab31a9ca7a37a64c303ab7a133051f4ea3c6ee51c0b944312dd0795be099",
    "source_log_record_sha256": "40c6ce137503741aa42284aa5705b3fefb9c839fd621c89aeeeb84311e192024",
    "wholeprior_sha256": "a92dfd6f68632833843c7ad83eaf744a69c2640ae14b1180b031d6ed49f2e658"
  },
  "Q5281512": {
    "id": "Q5281512",
    "identity": {
      "title": "迪斯科2000文集",
      "author": "Sarah Champion"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[28]",
    "source_spatial_record_sha256": "064499df79481b85961ccb1e10bd4b67d0b42f2292863279cb3ca2024b8a2457",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位Disco 2000所收Witnessing the Millennium中伦敦跨年人群、电视镜头与叙述者公园停留；人神秘消失不证明已进入另一世界，其他成员舞台保持未知。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "80952d8030e40b4bfeb0a269ad8756223d243fb007df8aa1d0a1777788cf3cd1",
      "facet_bases_sha256": "c3695439f04fc794efbff6111f1dda2e22a226526fcb3847ca069a325cbf9e86",
      "source_scope_sha256": "14ec2b5e020e74af06bb0eb80f300e0524671a8dcaa47f10882edbc1e6aac2ec"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": "known-year-first-pass-lane-3.json",
      "original_ownership_sha256": "b193cb6e5cbf290ee699db0a540b6b05c6c1855dccf59651ecb3eacfaa865e0c",
      "original_ownership_index": 87
    },
    "source_analysis_record_sha256": "002b12b84ec1397ab45702f5b34da1e54f34ddcffdc2690b6d81feb4dfcff663",
    "source_log_record_sha256": "f46ce044b7797948b4a0aa38828c823aebec858c774e0bb243bb69fd26caab03",
    "wholeprior_sha256": "af44ff0b33dafdfda2fbc241469c527176c8dd590ce669600c2fe1713751fd0c"
  },
  "Q548368": {
    "id": "Q548368",
    "identity": {
      "title": "Heaven's Reach",
      "author": "大衛·布林"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[29]",
    "source_spatial_record_sha256": "0f8addbbef82025c62a881d69fe4715ec54410fee90c216a9192305e419936fd",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确Heaven’s Reach末卷知识限Streaker在Jijo及其他恒星环境间逃亡的实际航行；智慧起源、银河秩序与白矮星风险是背景和压力，不据此声称全宇宙场景已被到访。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "889dca8bcb22c587f0ef1f80e0400e4a11bc61b214d5dbc1f238dbc8a21af48f",
      "facet_bases_sha256": "7e37f1120048049b4a2b112aa3b5c6a7edf540059197c91008d92b8d8335df3b",
      "source_scope_sha256": "1c0545ed7ecb956fcade5155de691e43a7ff41ed5596a0bd2c57f75dfba3471e"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "88e0413143e63fc02eb74a13f3cc1350ac6467f7e344921b15ad43d2e158e2ab",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "29e379c4b70e6603daea69167a51a3eadc41260827bbd5223e51b3067147936c"
  },
  "Q55230375": {
    "id": "Q55230375",
    "identity": {
      "title": "Dujonian's Hoard",
      "author": "迈克尔·詹·弗莱德曼"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[30]",
    "source_spatial_record_sha256": "907621e7c34b7e2d7883a7b389b388711bc1358003d52c8b91cea7535d64c9aa",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确Dujonian’s Hoard单作知识限定Picard等星舰队员在不同恒星世界的寻宝与救人行动；宝藏可能改变银河力量格局，不据此增为全银河或宇宙遍历。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "34c41d5efeab47b5d68ae0b1345ef67585ef942a0161d80bdff9bc354930c118",
      "facet_bases_sha256": "cb7ee1258acc2dcb843dcb6d87f02c9a41ef52baf448603f011aa7c125fb9161",
      "source_scope_sha256": "0ca07448b130a832296b7517c736b30e0a29347a05c00bb4a1d4d0dca665ec21"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {
      "record_sha256": "5782ff6aad145ea82b922cac75ed311c98005d1f0c76b1efed0fe15e757a81f9",
      "source_artifact": "work/evidence/fast-first-lane-2.json"
    },
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "972d0169d280c3f5bba42eec4a14ed7f482a1d4dfd1d942041b7f03832cf89ee",
    "source_log_record_sha256": "bf136c86d7fd6a0fa92a4ecc01da287a0cdc2057f7405486a4ae4b3bed6437c3",
    "wholeprior_sha256": "4dc27cfaa172a0eadd0111fc00d598c771a0aa9480bbeb425b2bd3845713c73c"
  },
  "Q55230499": {
    "id": "Q55230499",
    "identity": {
      "title": "The Best and the Brightest",
      "author": "Susan Wright"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[31]",
    "source_spatial_record_sha256": "5497cd2c6dfd05cc80013bc0b01e51f8f497ef8ac6cf9c34cd6e38cf6ad3def8",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "准确The Best and the Brightest本卷知识限定地球旧金山Starfleet Academy的学员训练与私人关系；星舰品牌、学生来自异星和毕业后航行都不直接成为本阶段场景。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "3e8bf637c98285eb9eb5507e290056f5c1c76d3d3193b54f44d3814a8a95bae9",
      "facet_bases_sha256": "2e16f567270b7f2db1e76939ebf2d57628f61683284624f7052e24fba4e763c7",
      "source_scope_sha256": "66d9ab7b11adc660788b796743c1ec119327628dfbf5ed9ac3ff6cc04030826d"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": "known-year-first-pass-lane-3.json",
      "original_ownership_sha256": "b193cb6e5cbf290ee699db0a540b6b05c6c1855dccf59651ecb3eacfaa865e0c",
      "original_ownership_index": 88
    },
    "source_analysis_record_sha256": "519f1b7e9156da305903b5447f90f75d0126f38f9d69314525ade4a2615dc36d",
    "source_log_record_sha256": "6339d6d94ff75c9ba8bb2789362e71a71f31b28814ac0c2fedaffe2c9482ed7b",
    "wholeprior_sha256": "129a3a80142ed1ec944b55ea4f09f0d4923a6e7380f012cffc2270708cee43d1"
  },
  "Q5877936": {
    "id": "Q5877936",
    "identity": {
      "title": "Hoka! Hoka! Hoka!",
      "author": "波尔·安德森 / 戈登·R·迪克森"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[32]",
    "source_spatial_record_sha256": "ecb2bc8ee61149b42393f9b8f1b5ab17c4ed09d85f751ad4d6071d0970113cd9",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本组篇与准确Hoka成员知识限定Hokas所在的虚构行星Toka和Jones在当地的接触；西部、福尔摩斯及海盗故事的角色扮演不等于实际地球历史场景，不假称全篇读取。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "1a8bcb10da46a9dc2d1db552594f63d29c07cc4d96ded242c6d01c2cc33e8f06",
      "facet_bases_sha256": "e7f614184c3c88f5a9dcaab89f3ef1324c248007818e53b7db0d6541102307bb",
      "source_scope_sha256": "2e7844aa7c2f1e684018f4f97690559e40cc0f7477e5304f45432f1863edebc8"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "failure_count": 1
    },
    "original_cache_declarations_exact": {
      "ownership_sha256": "6ac6307da6880daa689e10a48c35466fac9ed028ea6a42764b0ab4af29d072bb",
      "private_raw_search_return": {
        "path": "work/evidence/quick-retry-global-r6-search-179.json",
        "sha256": "0b5dc9f80db605d7cce03ae66bf171088ebe7e20ff8fc88e2e5df186add6a9ec",
        "scope": "本身份一次short精准查询完整真实返回；只采用日志中明确所述范围。"
      }
    },
    "original_ownership_exact": {
      "original_ownership_file": "work/evidence/quick-retry-lane-1.json",
      "original_ownership_sha256": "6ac6307da6880daa689e10a48c35466fac9ed028ea6a42764b0ab4af29d072bb",
      "original_ownership_index": 179
    },
    "source_analysis_record_sha256": "06ae53ffda19f825bc2c4070d68bdf509795bf2bf781e3ea5dd7ac92c66a7dd6",
    "source_log_record_sha256": "5242d5a4e5786823e24ca16732aef0ef1616c963ab2e4b127961b939d2a4f3cb",
    "wholeprior_sha256": "d3dc65b22ec9fa2d14aadbf6df1799698c31548c5d906bace021c68a90f6810c"
  },
  "Q594567": {
    "id": "Q594567",
    "identity": {
      "title": "科玛",
      "author": "洛伊絲·莫瑪絲特·布約德"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[33]",
    "source_spatial_record_sha256": "7119b9d4d0c50536ad8e66b6104f305bcbbdbf9801b6b179c11fcd4c4839390b",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "准确Komarr单卷知识限定迈尔斯调查与Ekaterin私人生活所在的Komarr行星；不借整个Vorkosigan系列其他世界的行动扩大本卷定位。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "8f79248ea33b921267bea98682fefa6b48c257abf19e778c499d8ea7b1764cd2",
      "facet_bases_sha256": "ea50cd7786539c85b233d11f56b03d858e5050bf0eeb59d81c1401fe28f8c5f0",
      "source_scope_sha256": "5adcce7e26f1e2ad36475ed89889cb76c7d5162d31523676e06641f7b0f40c8f"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "bf2380f3111651107c83a2a4cf0e0df7c2b22dcfa3846ac5ea326a30f8c13304",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "74234e98afe7498fb5daf1f36ac2d78acc339464f950703b8c019892f982b90b"
  },
  "Q63066709": {
    "id": "Q63066709",
    "identity": {
      "title": "The Alien Years",
      "author": "羅伯特·西爾柏格"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[34]",
    "source_spatial_record_sha256": "b051e1c0bde7330668c16981dc71cdc7d3ac60e347c646adc15c622cc19b098b",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本作材料明确入侵后的地球及Carmichael家族跨代反抗，限这一地球社会；入侵者来源未知，不成为家族实际到访的外星场所。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "569550a140a230d02a8115bd6538d8b1f91b121a0532b5684a910aa5e69a3ca9",
      "facet_bases_sha256": "e1a02f715b0df170871cb21e36f023f17e7fe3fbe5ae1bbcfcc04f1dd9ac2d28",
      "source_scope_sha256": "b6764f92e4da576245a4bebf9457cda261d4811f705132401b55a2ace9d7d796"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "d2b514499788f24ad5f1ea44d6b9b2940a5a85b6af7d7422ee2628bd86b2324d",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "a3f776aeb4b8f2e382a2ff81dc124baf0aa21b921a22618e197dcb86db446ec1"
  },
  "Q6907938": {
    "id": "Q6907938",
    "identity": {
      "title": "Moonseed",
      "author": "斯蒂芬·巴科斯特"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[35]",
    "source_spatial_record_sha256": "c265a34b6edc11e77083cdc1fdd411dbf9a02552607059894c3c44d1f52704a9",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位Moonseed材料已明确的地球地质破坏、采样风险及科学应对阶段；逃离和控制方案仍保留为方案，不凭标题或计划补月球抵达。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "4b7782fa943650a11a7bd034ffa9f815c2edf47f50f7250585d001910b0ce59a",
      "facet_bases_sha256": "00c46877becd29384355c228b7830cfd74a0f8a071ad5722ff9fd5a1176dc074",
      "source_scope_sha256": "7935833cdf1ed6e7f21947b138a22adab4cdad2715b60a120101b40814a894e7"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "60cda64c3664020853e15c8f0110d55806031a9a6ad3156ff6c306d44b8b7b0b",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "74234e98afe7498fb5daf1f36ac2d78acc339464f950703b8c019892f982b90b"
  },
  "Q7201198": {
    "id": "Q7201198",
    "identity": {
      "title": "Planet of Twilight",
      "author": "Barbara Hambly"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[36]",
    "source_spatial_record_sha256": "f01d2c0803a2f48ffe19806237638268058643d3fabc87a6f97f6ccde4c88c3b",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "准确Planet of Twilight本卷知识限定Nam Chorios行星上Leia囚禁、疫病及相关冲突；共和国与帝国受威胁的政治范围不当作人物已遍历银河。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "95f7b97f74fd54b0d91803745155abd24b1a38622d2ebbb93788d584f45e616e",
      "facet_bases_sha256": "23ec90f03ba73ae3b371b997a74034b683b67a82aec09c174bab86323600bbc3",
      "source_scope_sha256": "cd1ba2fc22c6643a5d7b297a4f7b66b64359114685403a89519e101d5a21b021"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "failure_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "6e4ddf68076567ba072e00007c02074d5b56e8fe14eaa5b2d26f930bf04bb1aa",
    "source_log_record_sha256": "9db2a79067b23b0987ab74dd0061232ef45da734717d7d83359667dec6d1e2f4",
    "wholeprior_sha256": "d163f67812ee23ddf38175fa075841c667c719e9bbbc882952b616ac9d6d3255"
  },
  "Q7678446": {
    "id": "Q7678446",
    "identity": {
      "title": "Taklamakan",
      "author": "布鲁斯·斯特林"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[37]",
    "source_spatial_record_sha256": "bf544504dd65f105137198acfc1db60b3f13fb6ab64c580d2727ecbede72a333",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "准确Taklamakan单篇知识限定塔克拉玛干地下设施及调查者的行动；居民生活在物理布景搭建的假宇宙和假飞船，不能把其相信的星际旅行当真实航程，也不直接等同虚拟空间。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "d8175a4cca34de44e67d03707812628c4cd0a4cc75f66f0100ce1cec73d23879",
      "facet_bases_sha256": "9cf02f464be933d5327c999ca41fb78a77b32d19ecb866b598f1dc5ed00bbab9",
      "source_scope_sha256": "b6764f92e4da576245a4bebf9457cda261d4811f705132401b55a2ace9d7d796"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "5eebee041bf174591edae0c5ed82dbc45ee74533618f5196695e477a2dc57079",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "bb3fbaa44bad8e4ef83db51c6d7e476bc0aca05d128ab5084fc5109176cf19c7"
  },
  "Q7831185": {
    "id": "Q7831185",
    "identity": {
      "title": "Traces",
      "author": "斯蒂芬·巴科斯特"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[38]",
    "source_spatial_record_sha256": "f077f112ff2bceac6db7f38745e621e69816da68c5b8c1eb47ff1800502f8103",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位Traces出版社明确篇例Mittelwelt的地球德国历史分叉；另一篇自然规则变化保持其已述设定边界，不凭可能世界术语给整集赋abstract或cosmic舞台。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "c75ebf463dc8b75943fe2a634ddf3c5a7dd97212275db244d85b118128ea8aca",
      "facet_bases_sha256": "8498869b733f01ea5eb5486625efcf6020ef1d20119feff87061b1f33185d240",
      "source_scope_sha256": "47a1799e166f271a59561ce2403a1cd73c9736f199f99d44e351b09304935c92"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "page_open_attempt_count": 0,
      "failed_page_open_count": 0,
      "failure_count": 0
    },
    "original_cache_declarations_exact": {
      "private_raw_search_return": {
        "path": "work/evidence/root-known-year-query6-group-2.txt",
        "scope": "本组四个实际查询的完整返回，不冒充每个身份各自的独立结果集。"
      }
    },
    "original_ownership_exact": {
      "original_ownership_file": "known-year-first-pass-lane-0.json",
      "original_ownership_sha256": "077a719fe2f381730b263d4de580902b409476dbeeb36e570c8c3008c1ec63b6",
      "original_ownership_index": 90
    },
    "source_analysis_record_sha256": "956c23f4b2088bb35a233fb9977e08cfe41049095679b40dddada71b6d3fe2b1",
    "source_log_record_sha256": "f5b9f3826dfafcd500aea1b2663b14c3f6a0b71e33cbf28bf2db453a3d208518",
    "wholeprior_sha256": "d6a68bed47a9f3819af51fba91a86b898f7be1dcaab6b9fbecfc928db4c897bc"
  },
  "Q7916983": {
    "id": "Q7916983",
    "identity": {
      "title": "Vast",
      "author": "Linda Nagata"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[39]",
    "source_spatial_record_sha256": "137bb928a98077682ca74fef90369a99d55aebb0d6d485e3b1585fe4f281d8a7",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "本书原材料明确Null Boundary幸存者在漫长恒星际航程中追寻Chenzeme来源，限已述飞船与跨恒星行动；长时间、自我记忆分片和哲学细胞不独自扩大为空间宇宙全景。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "ef6a5610bd1743b240ad8bc113c49667a869b01a7d6d0f93f9266533eb5e2b34",
      "facet_bases_sha256": "6b58064d119df8b43c5deeaef3d217198a70bc8ddb1377a6a0ff5ebdd2fe6253",
      "source_scope_sha256": "420980816cbc24f622227ac6525265542fed0d4f1dfe708306790a73e5229fae"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "51d8d2424a11c514de7333f622fdd25265a60bc62cf4549a885cdd07d0fbc1fe",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "1fbda2095c8a0332515bda273254e3b68f010a3cd79f3962c4dc8af62a47acf7"
  },
  "Q85786245": {
    "id": "Q85786245",
    "identity": {
      "title": "Moonfall",
      "author": "杰克·麦克德维特"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[40]",
    "source_spatial_record_sha256": "79cef6a6199a70146adad39104839fb3e8e89dced0fe82665a20510921891e44",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [
        "earth"
      ],
      "spatial_rationale": "准确McDevitt的Moonfall小说限定月球基地撤离及地球对月球碎片威胁的应对；只解释这部1998小说，不套同名电影的情节或未知宇宙场景。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "33010ec94086b0089edefc6817eb02ff7930185701f25e6c821b8109af50cc56",
      "facet_bases_sha256": "719e3f7a10204b19df33dde94bd18e0b6278f787880b1d4798f2fcd7e38dca75",
      "source_scope_sha256": "856da06eefc6e08cfe71af7eb04057e1b635c4737df5cf590955d6bf70fa882b"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "7b3e12897457041253c7f54b1978260c8f209ed5cd610baf76842b86723d1c3e",
    "source_log_record_sha256": "ecbd3168921ea740401fab2f95a85bb491059ff62878955eb4c45b6249def7f8",
    "wholeprior_sha256": "05c0d1553bfe699ed0c8151a83bbc5e1c7b42d0db14ed0d8f357bf518b463402"
  },
  "Q55230409": {
    "id": "Q55230409",
    "identity": {
      "title": "Heart of the Sun",
      "author": "Pamela Sargent / 喬治·茲包斯基 / Pamela Sargent and George Zebrowski"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[41]",
    "source_spatial_record_sha256": "0b63da36e951395ebedcf754e4c15900c5b7a848ea94a9b109d72c829f447436",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本卷材料明确外星栖居地轨道将其带向有人居住的行星，限这一行星和轨道环境；Enterprise身份与未知文明遗产不单独证明本材料展示多个恒星的行动。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "50d7254965a9480b818736b02ed130e80c04029e66d58d26633d5e466fda2f72",
      "facet_bases_sha256": "0a0fc22f38d2d3ed8bf464b892f527cde6fb84349b1d8ffe8a16f12cd2d285ae",
      "source_scope_sha256": "f9cfb9c0ccb816ab57f05ec497a837f15e200ffe9b44e756bdfe2a198de25d6d"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "79f23560fccef4a26ddce3fcfcb55ad6d4c68ef617df15601ad2578b5827afd8",
    "source_log_record_sha256": "680327477b9d0cc11705932537fc5e26396d611f85d31446555ee701bb3e0388",
    "wholeprior_sha256": "acf4076446916af573e80d0d4c619687dc12cef193ae54fae1df85bfa2c3175b"
  },
  "Q55230549": {
    "id": "Q55230549",
    "identity": {
      "title": "The Tempest",
      "author": "Susan Wright"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[42]",
    "source_spatial_record_sha256": "5e8dcfe590df035dd89d8c59b831010617ee6ac45fd371fc9d3423aee44e798f",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本卷材料明确Bajoran星系风暴、Deep Space Nine站内滞留者与当地风暴测量，限一个行星系统；没有本卷跨星系实际行动依据，不凭整部Star Trek品牌扩大尺度。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "53dd883b5ce1b0d59fefb81769d87205a869465d141113fbe394da211711ffc6",
      "facet_bases_sha256": "8acf2f6d2a550c3d1439156b96ae0b7590695a9457410feb3bc031fcb07df210",
      "source_scope_sha256": "8ef814ec673a3420c47453bdc80cb3f96139fb80a1e0db0308a98164f87162fe"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "current_unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {
      "raw_search_artifact": "work/evidence/quick-retry-modern-r6-search-b.json"
    },
    "original_ownership_exact": {
      "original_ownership_file": "work/evidence/quick-retry-lane-2.json",
      "original_ownership_sha256": "f1e3bce7c91b9744ab300726ea85acd26e5f195553ce022a63559cc16e04bda5",
      "original_ownership_index": 188
    },
    "source_analysis_record_sha256": "e117fd51071be5e201f28d3a7c78f17292ac2e44bfb07068097a17ae82e3ad54",
    "source_log_record_sha256": "f89442ca6da814b3be13791534b8535e27031c96a8cc50d8329f5aee6bf6dd47",
    "wholeprior_sha256": "6d32a7d12249fd2e947948586268a54757f7e96889c78def839c59f5806859c4"
  },
  "Q5998865": {
    "id": "Q5998865",
    "identity": {
      "title": "Illegal Alien",
      "author": "罗伯特·J·索耶"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[43]",
    "source_spatial_record_sha256": "143d0b6053f4537012b2823933bbee29a53e45daeb78da27d7b85f48e6e3b4f2",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本作材料明确Hask在洛杉矶受审，限地球法庭、研究者与公众回应阶段；可能的星际报复仍是威胁，不改为人物实际赴星际的舞台。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "3b73a485c56c221682f29b054d9c3752f42f99cdbeca951e7e26d265cfde864f",
      "facet_bases_sha256": "335b95d4bce38c32a5b7718ef5843dc63f2ab732db8bfd6c01be808f2cbe4d8e",
      "source_scope_sha256": "e90654555ca06f2dc93ab8b7b5c328a80b1e803f6c9781ec23ec6a5463481525"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "cd125d4bb55d8e9b5840a2b2d23291f7c4244d10b3d4b495241cff578a449162",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "74234e98afe7498fb5daf1f36ac2d78acc339464f950703b8c019892f982b90b"
  },
  "Q6009281": {
    "id": "Q6009281",
    "identity": {
      "title": "In Death Ground",
      "author": "David Weber / Steve White"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[44]",
    "source_spatial_record_sha256": "296e2c35eea93d3b15fc669b7cf9e01cfeace33f0fe36b2cfd1ff6000b0497bb",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "本卷材料明确探索舰越过未知跃迁点并在另一侧遭异种舰艇攻击，限其跨恒星接触和战争行动；盟友与灭绝目标的政治范围不推出全银河到访。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "24dd585f524c079bb0a0f6552614dfee7aee28aa15af3ade7e745a9bc40e9a22",
      "facet_bases_sha256": "e0b78baa8f468dc2e8a28864ddf24257aa5238640701cd48c030bd84200c095c",
      "source_scope_sha256": "c52f0f60cabbc9630cbf5ef2d61f1d198a431affd45fe310afd9bef275df0e79"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "26b6daeffb8d38c8a368d64e5ab4039a7e4bcb6624124f4256820af2e123e932",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "7a885a96ab41457436ad12384c9a2591aa2a3bc97aac2872ecd3188c064c449c"
  },
  "Q6907565": {
    "id": "Q6907565",
    "identity": {
      "title": "Moon Six",
      "author": "斯蒂芬·巴科斯特"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[45]",
    "source_spatial_record_sha256": "b399bfa7dd9cb721cd2cc4de23f45c5c11cbb34a9c8c66c6b03a62597773e7d1",
    "reviewed_spatial_fields": {
      "spatial_primary": "abstract",
      "spatial_secondary": [
        "planetary"
      ],
      "spatial_rationale": "本篇材料明确巴多在月球连续滑入不同现实，飞船、同行者和历史随之改变；空间跨界由此具体设定支持，月球为明确次场所，不只因为时间变化赋abstract。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "5f0a0978998f2c17e6101b23ae8bef88b6ce26b45377d7da34b8e958a2eef004",
      "facet_bases_sha256": "fb9cb37e0b7b9ab0b9f8749cfe79185e0c3d3af103b96341ddc8a4a4681900d9",
      "source_scope_sha256": "afb9f87d2d14038ce8117162b4cb99dd518ab130b58f6d43fbefa366e1e77454"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": "known-year-first-pass-lane-3.json",
      "original_ownership_sha256": "b193cb6e5cbf290ee699db0a540b6b05c6c1855dccf59651ecb3eacfaa865e0c",
      "original_ownership_index": 96
    },
    "source_analysis_record_sha256": "db42674f564e652a4f7ac67488fa6746ceedd2d09e38d3ab96290b7b83240317",
    "source_log_record_sha256": "bdce744d4b1d42cd12ca8da89305e3755fcf4383fa3e266e354b4043ef11c926",
    "wholeprior_sha256": "07c2c653d9b2195c498ac7e14b53eedcfce9d5f407503bc065060eb851dbd827"
  },
  "Q7426802": {
    "id": "Q7426802",
    "identity": {
      "title": "Saturn Rukh",
      "author": "羅伯特·弗爾沃德"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[46]",
    "source_spatial_record_sha256": "ef738a68b6e4509636f345e785617cab4a4825fab378df2713e13a9fe3e71f36",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本作材料明确六人在土星造燃料并与当地Rukh共同面对反应堆危机，限土星当地；返航依赖生产成功仍是条件，不说成已经完成。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "13c14f97e9525e8fbbc512ef3511e68200f37d22e89a0ea138f6253e5e94f1f5",
      "facet_bases_sha256": "8f4d4b5c0ca6766f4b23e56d005e011cdc04429dc0024dd641c40e178b8ec699",
      "source_scope_sha256": "c19909ac74a7f5a959df5e78376dfdd50657bf62f0f15619601261dc03e045a4"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "c3851ea58bd1f882cfaec7a48e950bf7fa4a3574cb944af5ca5df56917a2ed46",
    "source_log_record_sha256": "2a79bf79da5109bccbef8ab2672184dc0d12949a22ea6f08a417cdead92edb9a",
    "wholeprior_sha256": "04588c872de3cc7e30f7de90ce42c555ef6465c4b232ba890888b79fb52759b4"
  },
  "Q7718000": {
    "id": "Q7718000",
    "identity": {
      "title": "The Billion Dollar Boy",
      "author": "Charles Sheffield"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[47]",
    "source_spatial_record_sha256": "61601a55c1dd0a74ffa74d95f312953468c294b54a75f2b31e50b23f8dc200f9",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [
        "earth"
      ],
      "spatial_rationale": "本作材料明确Shelby原在地球享有服务网络，后来被困距地球二十七光年的采矿殖民地，限这两个已述场所与其距离关系；不补殖民地宿主星名。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "1766e282d9a57c0743f9f67116705a1c29033765998bb669a5d78227954973b2",
      "facet_bases_sha256": "6d789a01acc698142d09c74c4713b5c8429f7dace6ee73f55068e0ba935d1bbd",
      "source_scope_sha256": "6646fc9b7da3474089f292c6c7d7fb6edc93de81a5257d2985b4e805acb08946"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "0158641f407b670d3af04c59286a512da7ecd018f2c8e686421b9041977ac2f2",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "1709a61652826da8ea31e4e2ca87b2b03451f4e5d72e920a703685bb7033225a"
  },
  "Q7774455": {
    "id": "Q7774455",
    "identity": {
      "title": "The White Abacus",
      "author": "達米恩·布羅德里克"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[48]",
    "source_spatial_record_sha256": "9d672c9aac634614a4322b4a12814a65a9ed7c030f5eb38c6dd2f580dc3dec24",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位The White Abacus材料明确Telmah来到地球并与Ratio结交的阶段；其遥远故乡仍是来源背景，不据此称已描述在多颗恒星间行动。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "c480d4ba2594223fce5e94811d85d014722ef3b5717e1caed35582dd730f6470",
      "facet_bases_sha256": "83fccad06cabeb65b8eeaae1bbee79483b2878c62077061ea1c7d31edf099660",
      "source_scope_sha256": "75bd7ebaf251c991531e8a19aa90bf8b38ad13dd0226731174ea05fb9ba7118c"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "b251986966b5a92b5ffa32d48b9b8167ecf4991dbf9feeb2f5d9231a14dd5107",
    "source_log_record_sha256": "d3e3d28c80c0f66505ab9120ad215237d91e9fc2533ca1236b1cb88b029aab54",
    "wholeprior_sha256": "5d0b3c709cdb5180e41aaa9ab812ede41957daede2acf9583c7c6c2a973b8bcd"
  },
  "Q779016": {
    "id": "Q779016",
    "identity": {
      "title": "土衛六 (小說)",
      "author": "斯蒂芬·巴科斯特"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round4.json",
    "source_spatial_file_sha256": "b5e357279c0814987a9525710eb4003560313853cd9b526339efee8d7afee708",
    "source_spatial_record_pointer": "$.records[49]",
    "source_spatial_record_sha256": "dd914ba9e9e3fac14eb7e034a8f8861351b08a292f8724f9ff6db60b74dcd483",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [
        "earth"
      ],
      "spatial_rationale": "准确Baxter的Titan小说知识限定地球筹备及抵达土星卫星Titan的远征；远期生命变化与长时间前景不扩大为cosmic空间，也不借同名其他作品。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "2c752cef3cb351896810b99de3dbe07704bf2329139562c4743c584c4dabf290",
      "facet_bases_sha256": "f25c9d2d71d249d0ec21641b5dbb676078ade70d0363c14d388fde808aa809a3",
      "source_scope_sha256": "7935833cdf1ed6e7f21947b138a22adab4cdad2715b60a120101b40814a894e7"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "d51ee0c1d25d59b1f5c7fbff8f7b4a26c22af60db71e09bfc3c654bb93ee883e",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "74234e98afe7498fb5daf1f36ac2d78acc339464f950703b8c019892f982b90b"
  },
  "Q10658260": {
    "id": "Q10658260",
    "identity": {
      "title": "Rymdväktaren",
      "author": "Peter Nilson"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[0]",
    "source_spatial_record_sha256": "4200c2281a1667a3f61b8286d613a36f8032ecc33c22aee727b798528ce36786",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [
        "earth"
      ],
      "spatial_rationale": "本作图书馆简介明确月球修道院当前相遇与Lorentzen讲述的一生地球经历，区分月球现时框架和地球回忆；研究宇宙本身不等于实际宇宙遍历。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "56eaef882b69a1dce03cf6af5d8ee1d506995b02969bfc194070b0e134179014",
      "facet_bases_sha256": "382d3d441db3401002daa7ad850b0de0cc5c04f74bb6f77b03fa4eb97e62eb43",
      "source_scope_sha256": "b202903a955572bb0283cdace4310218967e440f4e42eaf89f954f97e786ab8f"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "233dd0aa90039e8e0411bdf63c4788594b428da48f7b86139713a99cd59ec533",
    "source_log_record_sha256": "a639bc42ec256ab886c86ff83ae842e9255b802eae306a5f139102fb45219150",
    "wholeprior_sha256": "ce20ec750a41b48fa0d73d5089bad828ea5940ec467f56259a9bd4fb8148a335"
  },
  "Q130737796": {
    "id": "Q130737796",
    "identity": {
      "title": "Bibi",
      "author": "迈克尔•雷斯尼克 / Susan Shwartz"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[1]",
    "source_spatial_record_sha256": "6de1a219479e331eb7fa164fa34874bd643834d35aefe1d9a37d3a96af98dc7f",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本篇专门评论明确Jeremy从美国到Uganda援助营地并承担照护劳动，限这一地球行动；HIV和战争背景不补未见的超自然或异星场所。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "6a73253e73fb1eb282dfbf137d940909e13264c48c9984a1a05e292b594a0757",
      "facet_bases_sha256": "b44d1290678b0e25136560e06a493bc21dddb71d9917370189459215381d59e1",
      "source_scope_sha256": "cdacbdac8504a09ccb02cfbffcb0853c9c68edd4b085bae662b665c1019eca1a"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "507fc19fe932ea038de93c799f1503c519a3e3933972834638ef236e33b2097b",
    "source_log_record_sha256": "e59072b9c9294c0c51e93240fd3ee37fd8517c532112e54d9abac47941820946",
    "wholeprior_sha256": "2319a07cf43b94b0857a35e97a922f28e5931179b34c959aaed46677bf9c87c1"
  },
  "Q131445236": {
    "id": "Q131445236",
    "identity": {
      "title": "Quasar",
      "author": "Jamil Nasir"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[2]",
    "source_spatial_record_sha256": "258c2709295ab7d3b1e00ee183aa67018f94b7229f59012df0c3642218b91d1b",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位Quasar资料明确的毁坏地球与封闭城市、Ted的照护阶段；梦与现实关系不稳定不直接证明已进入另一个物理宇宙或可确定虚拟主舞台。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "aead59c10fb5c6d6e85a0437b903461c4b2ad2dd9e6a7019fdb19c44510c08ab",
      "facet_bases_sha256": "0e96367aeb2219519e3010874b4879eb478bdd132d6336994caafa13bd9b6564",
      "source_scope_sha256": "47a1486615abc4dcb007bb558c264ed5116b52f9348ad50186fe691ca25879d6"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "e1d4352a756b8a1976568f8c135eefe996494118010852ac53c7f43df0fe902c",
    "source_log_record_sha256": "b13011844b21aee36f2880bd0f909ca26577f01305cccf5ed09d728f3048e3d2",
    "wholeprior_sha256": "fa89228bfe7f02c7b1c47f3987e33cb9d8dc53e1e08d2a8618aef36406d4fea9"
  },
  "Q131461432": {
    "id": "Q131461432",
    "identity": {
      "title": "Harvest the Fire",
      "author": "波尔·安德森"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[3]",
    "source_spatial_record_sha256": "969dd4784a9a34d21c9450d06bc2be2b2cb8634d0b4012b92b6f6133f7d15898",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本卷评论明确月球及Proserpina殖民地Lunarian能源危机、反物质劫取与太阳系AI控制，限这组太阳系场所；人格被装入机器不本身增加虚拟空间。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "a0cbfaa2d2e977b26de3dba831b9392ae457459c25cdcb0fd45b2c9763bacac1",
      "facet_bases_sha256": "d3153f3f617ff914b809ec9c9dbc2bf0eb3c76b5716b5a5815999c35297ba212",
      "source_scope_sha256": "04585805ccd82f7dc42c4da076b834a929b62e74a0f4f3075312e2f715c64050"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "216550ee8cf1d9bc405fb76d7f16e9374f960414f748ba000c7654d51fcfc142",
    "source_log_record_sha256": "a214039df2191b1fd1e6937edbd60c017559de53abe0a17748dbb77d2ecc2f9c",
    "wholeprior_sha256": "122c3d0f85320ca3ddbaeba842fe98d96fbd423443291c816c9fa4e763268748"
  },
  "Q12411852": {
    "id": "Q12411852",
    "identity": {
      "title": "שמים לוהטים בחצות",
      "author": "羅伯特·西爾柏格"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[4]",
    "source_spatial_record_sha256": "2158dfc06668f2575ce8ac84fa3906653c0e764f58858d33a074ad4ae410f610",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本希伯来语身份的图书馆摘要明确地球生态崩溃后的氧气、防护与财富差异，限这段地球处境；富人能够迁居卫星世界的机会不说成每个人已经抵达。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "02f02d59ef5146b1d4ba51115411a834695e5e9e3f7c60acf949996fa4f69054",
      "facet_bases_sha256": "be2e7af9499e17c250b94c88d8022c94a01fda4b366912f34f921122d874492a",
      "source_scope_sha256": "88c131e84ef5a0f1bae168ced2de745dc382206d57b73eef982eccbed374b73a"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "760bca873645b679e4f6fc716bc2f78df177faf52ae6769f8fe70d13031e97d7",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "e8fcc04387575a5e87fd93097cb60d74f71600dca024405877724c81bc237172"
  },
  "Q1300587": {
    "id": "Q1300587",
    "identity": {
      "title": "美日開戰",
      "author": "汤姆·克兰西"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[5]",
    "source_spatial_record_sha256": "b06cff961547d54f4320ed8e4b2b8327a490506a71d585de9f1459beb10efabe",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本小说材料明确东京命案及美日战争、安全顾问判断的地球政治阶段；不从科技武器或国际秩序推太空场景。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "07a8ecfad0292652ae505bfaa97b2aba517f3e48ad07e12b5928866984db5e37",
      "facet_bases_sha256": "45d406a94efb5e483fe12fe29c2fdb1a6db378c9904e73e7234f82efe4117202",
      "source_scope_sha256": "6c84e99eb4e2fc1861819df0a119d42aab4de3dea3866759ba494d56ea738c38"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "b42e7bf873ea0c078b97507f372b27ef0d0690e00b59e150d04665f89bea1936",
    "source_log_record_sha256": "3d71ae5781738b8b27cc806e284d164e0047f76baded801a33afd43d5d4de978",
    "wholeprior_sha256": "c079521cd1db09bee086361d8e78b2d44a881fc1366cc2303d6dd5e4a5acd41b"
  },
  "Q131376686": {
    "id": "Q131376686",
    "identity": {
      "title": "The Stars Are Also Fire",
      "author": "波尔·安德森"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[6]",
    "source_spatial_record_sha256": "92107147a200f8037114d7c9d75f1dd5b20f83de151f458f2584eefcfd40eef7",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本卷评论明确Dagny维持月球社会与后世太阳系机器网络控制，限月球和太阳系身体活动；数百年与cybercosm制度不本身改成cosmic或abstract。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "ca4e47e72a07ad2518853647a9e57fcda9aff7c3263300ad86b9cd4f5f7ed9f2",
      "facet_bases_sha256": "11ad5f3afb08339221a081a29175a8a3ea71e6d4751946c5b1b77498d07f0b6e",
      "source_scope_sha256": "074621c7f627cd90963a3c17e19940027b303951e1f298bece4c8a6938f1d073"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "c0edb84c8fcae209624d78b2577e8c093151021c04e60f286a2dd9ea2a901347",
    "source_log_record_sha256": "4bda6d2defa559427c5e94d96b5d721c51d5ab01423e53dc8430b33fe52a23b4",
    "wholeprior_sha256": "3b6d763b328e7f4c7f203daef23e6a181f80c6cbd87646a6df88139a257e6e5c"
  },
  "Q131380757": {
    "id": "Q131380757",
    "identity": {
      "title": "A Martian Childhood",
      "author": "金·斯坦利·罗宾逊"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[7]",
    "source_spatial_record_sha256": "a6db777e806b36f6d438deac9706474ec6a6a37675204b47ab64da49bc3df55c",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位A Martian Childhood单篇所采用的Green Mars开章知识：Nirgal在Mars的Zygote栖居地成长；先辈Earth记忆不是孩子已到访地球，不借后续火星革命行程。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "86390dfb801bbf984151e6cd3cc783fce2c4618c8d34cdee984fb8576a2922ba",
      "facet_bases_sha256": "170a617e54da9f540acd52e38cddabbcc76637c2cc583ebce315d4a103a1592b",
      "source_scope_sha256": "aca243ca40492fc2268f4956fbf2487184b48a0b6bec4420d129e8684a9f10e2"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "2485e63c2c20995313eac9be4cc5c5963943720780b37913fb6430b363dad1cf",
    "source_log_record_sha256": "20baace7878b7fa7fdc1b2891d0e3c9d6f2e7f4c79a3f25f744585265450b24a",
    "wholeprior_sha256": "d1392903913e614c3e39edb3693adb8c16acc863e1e8d9cae307de6a70685291"
  },
  "Q132774503": {
    "id": "Q132774503",
    "identity": {
      "title": "Oddly Enough",
      "author": "#$%$#"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[8]",
    "source_spatial_record_sha256": "b8e75f64dd10227bc5993b14241839173e04df056b15f75010971f77444cd01b",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位Oddly Enough所收Old Glory中未来美国的家庭与学校作文、曾祖父烧旗和告密事件；准确选篇已有知识，不概括其他成员，也不从其他怪异篇例传播空间标签。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "e94b11be38c78cac28d6e90a70493107530082e343cd6db62858ec1c82d6630d",
      "facet_bases_sha256": "ce9cf211f9fd966289acc04f0d479380c0a1d3790f1000db9caf5f21bded9dea",
      "source_scope_sha256": "2e7844aa7c2f1e684018f4f97690559e40cc0f7477e5304f45432f1863edebc8"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "failure_count": 1
    },
    "original_cache_declarations_exact": {
      "ownership_sha256": "6ac6307da6880daa689e10a48c35466fac9ed028ea6a42764b0ab4af29d072bb",
      "private_raw_search_return": {
        "path": "work/evidence/quick-retry-global-r7-search-207.json",
        "sha256": "a5166d8b4ad4ae055c49a0e7b956258197c1bf58c7b0376443c9b8f4f9ef07e8",
        "scope": "本身份一次short精准查询完整真实返回；只采用日志中明确所述范围。"
      }
    },
    "original_ownership_exact": {
      "original_ownership_file": "work/evidence/quick-retry-lane-1.json",
      "original_ownership_sha256": "6ac6307da6880daa689e10a48c35466fac9ed028ea6a42764b0ab4af29d072bb",
      "original_ownership_index": 207
    },
    "source_analysis_record_sha256": "0a59f683b5a48dca99ab2b0f04449aff1f9838e31e151f4b9bfa4dcb01b46ecf",
    "source_log_record_sha256": "43488ccb3ec52bb34ff82670a2a6c576ead25253166a4fde222411b7dab5c5a6",
    "wholeprior_sha256": "07cb79ab32cf576d83b5bf17421242f22eb0c897bd561c8a538b51ab61ff8d82"
  },
  "Q133984305": {
    "id": "Q133984305",
    "identity": {
      "title": "Aller simple pour Saguenal",
      "author": "Jean-Louis Trudel"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[9]",
    "source_spatial_record_sha256": "58ec7277b234bfe8a2ec494bdbe7cda59c1adff2722c60adb76648af23b2f7c6",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本作概要明确Sylvain在Nou-Québec殖民行星追查重金属污染、非法采矿和父母事故，限当地环境；Québec传统不直接使本地成为地球加拿大。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "74dfab28e4990f10ea23d09f8c211803ba43dfeb2b1112e23d9b56e76eb531db",
      "facet_bases_sha256": "4c5f3e8f5a5580f641cfedd468708abdd6c04dd1c9222601e9ac2ad39a7c3a9e",
      "source_scope_sha256": "5235b493998da44addb4c5cc278a01f51e4d36abebc9fe56cb7b4ef4078f3b15"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "a81e4ea8a5be74705adec594a8e2d3d60d1fd03742b5f66c873a4426cfd97266",
    "source_log_record_sha256": "92378c1e37ce3ba6d2f018418f984743203d5332225473e4abdd9fc621d7a0fb",
    "wholeprior_sha256": "530fe8be18a373d89133c3d4fd204484c66cb8d7f7d50a731cbeee3d3bc5b60f"
  },
  "Q15094083": {
    "id": "Q15094083",
    "identity": {
      "title": "Diamond Mask",
      "author": "朱利安·梅"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[10]",
    "source_spatial_record_sha256": "729f25eaf3a7a81bbf7d2c215664fd4aadc0e549d2859e3d9d00d36fc874bedd",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "准确Diamond Mask单书知识仅定位地球Remillard家族力量、Dorothea与Jon/Fury个人选择相遇的地球阶段；精神能力与其他星际社会背景不扩大该限定阶段。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "f264aef1c646646c83c0e684a1cc29f61fb7774cc7bb03579f1017a80c4ff1e4",
      "facet_bases_sha256": "5366fb511870a3b436359d911038de1d7d3cf1d6f0ace951cf1b6a9aa6127dcf",
      "source_scope_sha256": "3279036a0bbe2e5b9a5800068ce0e5e48de534d4ab3ec7ea51958e70fb1d0f65"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": true,
      "actual_query_count": false,
      "actual_open_count": true,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": true,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "actual_search_count": 1,
      "actual_open_count": 0,
      "prior_known_failure_count": 2,
      "new_unsuccessful_attempt_count": 0,
      "unsuccessful_attempt_count": 0,
      "cumulative_known_unsuccessful_attempt_count": 2
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": "quick-retry-lane-0.json",
      "original_ownership_sha256": "5fce5b2b8279d784d7d141536d8e923508897fe00cf0f03aa907e610a8c23596",
      "original_ownership_index": 640
    },
    "source_analysis_record_sha256": "c6b901ff3262ae8ffa41e76c976d2d323be002da51f84bcd1149721954446264",
    "source_log_record_sha256": "ce5010f420b78d9daf80a573187b41b1d34da901b7541cce12e21cfc5a6278dc",
    "wholeprior_sha256": "88354559ef0ef2b47d08e91e6b586259d5e52fa5e2954b987bbfdf29f1740db6"
  },
  "Q16955002": {
    "id": "Q16955002",
    "identity": {
      "title": "The Martian Child",
      "author": "大衛·傑洛德"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[11]",
    "source_spatial_record_sha256": "db913c93ea2695ca81bd7dc6dc7c2919aef95f6beb9c6d5716ac6f57d78a1567",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "准确1994 The Martian Child单篇知识限定收养父子在地球的共同生活；男孩自称火星人未被当成已证实火星舞台，不借后来扩写小说或电影增加情节。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "616248ee5368ead7396c3835fab6995395ef0342a3c2a7e75f5e21723399966b",
      "facet_bases_sha256": "50aee02eaec2531058310118848a4cc448681792dc20967ff500c19bf5c4fe06",
      "source_scope_sha256": "e24d223ff25ca517e74210a50e49d6ecd7ccab9280e7b6bad79d59cd86ebe98a"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "failure_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "8110d2d59d22df83e146887bcb1422853f832002698386917a9d27069fcd54aa",
    "source_log_record_sha256": "01fec0ca50cc3a66d669065bbdad29cc07bc1ef1dd25dd4757c22d55d6ef6091",
    "wholeprior_sha256": "1b00cd83e4c8fb27f5819754f3291e69d2ec063309923874087b1bb0621a74ba"
  },
  "Q22248349": {
    "id": "Q22248349",
    "identity": {
      "title": "La Douane de mer",
      "author": "让·多麦颂"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[12]",
    "source_spatial_record_sha256": "5b8435033b798fecb374e1459af9565c7de8a85bbcac0fa94056888220a2bc44",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "只定位La Douane de mer叙事框架明确的Venice海关死亡开场及对地球的回顾；来访精神来自另一世界的说法不使叙述者已到访对方世界，也不定义死后谈话的完整空间。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "ebc7b614c3189cc4d3606181f8d54ad2662913d808e68a2e29fde2920c088c29",
      "facet_bases_sha256": "d0979dffbd90a1de1cd5635c371bcc285f8d957acd15e444eb709affbe919ad7",
      "source_scope_sha256": "065aa393606b0f1fb578a3eeed392d2b1e6be263b7943e307a205cced226ba5a"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "a002319c33d3a2701dd174e0eac975588813c6cf4b8234cf6f3e6f817fdd2170",
    "source_log_record_sha256": "b5183efb9eff9a4293217d51343b099619dd79456ff622f6bceb5e8befd5f5d9",
    "wholeprior_sha256": "24b9cd26c55b59e827e1a106ace9bf06f61c09df19062345438a6ba76d62856f"
  },
  "Q2647380": {
    "id": "Q2647380",
    "identity": {
      "title": "The Worlds of Aldebaran",
      "author": "作者未知"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[13]",
    "source_spatial_record_sha256": "4bc0ce762555f101a4d20f691ddd37fe40ab426b866f5cd4c0089c12ac5af097",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位The Worlds of Aldebaran系列首周期的Aldebaran殖民地及Arena Bianca村落事件；不借后续Betelgeuse/Antares周期场景，失联的地球保持来源背景。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "5d1e888208bf285fc6259e7c6a61d065bb25ca5ffa5bd0a3dbe62a5c75b2477d",
      "facet_bases_sha256": "f39078db05c2c8d4b45510d7c2a14b0e36cf91760711a307ea7bf990238a7713",
      "source_scope_sha256": "2e7844aa7c2f1e684018f4f97690559e40cc0f7477e5304f45432f1863edebc8"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "failure_count": 0
    },
    "original_cache_declarations_exact": {
      "ownership_sha256": "c4f5abbb4b3f5b116c9f627a6a4f0d8408a90b5c5d091360dd76e4c4cbff3730",
      "private_raw_search_return": {
        "path": "work/evidence/known-year-global-r4-search-117.json",
        "sha256": "26bf3cfe657f98c8e6d9091029f9afb2f44a09f371a8af9e56d0eebb7d3d039f",
        "scope": "本身份一次short精准查询完整真实返回；只采用日志中明确所述范围。"
      }
    },
    "original_ownership_exact": {
      "original_ownership_file": "work/evidence/known-year-first-pass-lane-1.json",
      "original_ownership_sha256": "c4f5abbb4b3f5b116c9f627a6a4f0d8408a90b5c5d091360dd76e4c4cbff3730",
      "original_ownership_index": 117
    },
    "source_analysis_record_sha256": "d92c99adfcc3f0d2d030cc572f48ae5dd6c8cae7a0790f917489f36b422acbd0",
    "source_log_record_sha256": "b43c342f32e6e08ac7e235bbf945319c415d2635a1e9b6c27b98af1cbdaaa2f2",
    "wholeprior_sha256": "03cd6dbbbef61c4397027cb0416c972b5bf163bbf9ae8899206e25aa048720ce"
  },
  "Q2972319": {
    "id": "Q2972319",
    "identity": {
      "title": "Hot Sky at Midnight",
      "author": "羅伯特·西爾柏格"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[14]",
    "source_spatial_record_sha256": "80963607ca65a5fa3fdf9a45809171d7b0f1be953a806a9b20c0f23e8a42688e",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [
        "earth"
      ],
      "spatial_rationale": "本卷材料明确受损地表与富人进入私营轨道殖民地Valparaiso Nuevo的分层环境，限地球和近地避难设施；转移空间不等于已经获得永久安全。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "16d5433fb9b949c02fd470682ba4a96d59d4dcfcf2def738a21c406b2d481b1c",
      "facet_bases_sha256": "937d487f37233bcc24a5b0ad66059baf69d3e92665d03387143a58f63df5ccac",
      "source_scope_sha256": "b6764f92e4da576245a4bebf9457cda261d4811f705132401b55a2ace9d7d796"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "e8cf5b65b388c70cbc429303837323e472f67d2e4a515420ce845811273a0ca0",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "8cbf26b24e8d0519a98515b801ff91fb1977f19101886d63fb239f0af7fc562a"
  },
  "Q43635157": {
    "id": "Q43635157",
    "identity": {
      "title": "The Refuge",
      "author": "Juan Miguel Aguilera / Javier Redal"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[15]",
    "source_spatial_record_sha256": "0b4b0560716b3e9dd1b1d62fec3cd3fee4cbd548a3ff379ed4ac4adfd39ab461",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [
        "earth"
      ],
      "spatial_rationale": "仅定位The Refuge材料明确被轰击的地球、火星来者的救援飞船和海豚参与操纵的近行星阶段；火星来源及发现火星文明不直接当作全部获救者已在火星定居。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "8d7b42543f50da63e9e586fba5e814330e99a886e1ba5cb78fb4e43c42b34f41",
      "facet_bases_sha256": "059e5fa3a1ba5055817b21da8a5c6b70d0790dc2f52d684e7cbf95a3af7b7e72",
      "source_scope_sha256": "58d5d09d4f249e9a92417f01cd7d806884368acbe4ac27b56350457dcef3f235"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "b35c7b529b3fef1650994d1093effea776ac6a87a2add2386c2563f997a467c6",
    "source_log_record_sha256": "bbf3182def17ea8cff3485f83df9889193ed90b1c6d36ae2d67913edf10c1ee6",
    "wholeprior_sha256": "613f3918984228b4ff34b6bc59a8ed8d027286d8867dbe4fb058c90b09512c72"
  },
  "Q4880455": {
    "id": "Q4880455",
    "identity": {
      "title": "Beggars and Choosers",
      "author": "Nancy Kress"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[16]",
    "source_spatial_record_sha256": "e5474c919ddf5fa44c95a4b2e1bd02e1fcb76e348c59d3037a78390f9223fce6",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本卷材料明确遗传改造后的美国社会、失眠者岛屿及依赖关系，限地球社会行动；先进纳米研究和崩溃范围不产生非物理空间。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "718056ebd8e9793d71fa28c5b31fb86478ed44f7fe28d2bae7a663d14e8a8d5c",
      "facet_bases_sha256": "9d8f32648b83cd6fc4f3172b920a5c3fcc2055947ab5b181bf85b9a552117ba1",
      "source_scope_sha256": "cf5964cd65bdbf43ca0197e61e2e47d6b913aa9c6ab43736ddfd53b3af3108a0"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "b26f4cbe8f3ad90a95ab22961409492470a3fc42bafc2f5c42a7bc549c81936e",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "6e2ffa52ed0d2b3131a9248a2db5beef162d48bbe19b03461805dc910865b276"
  },
  "Q5440721": {
    "id": "Q5440721",
    "identity": {
      "title": "Federation",
      "author": "Judith Reeves-Stevens / Garfield Reeves-Stevens"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[17]",
    "source_spatial_record_sha256": "fc59233d5d14135d924d96ae94b5d889426c4774869794cc0930e70e7519c28d",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确Federation单作知识限定两个Enterprise时代之间救援Cochrane及不同恒星世界的行动关联；绑架者想征服银河仍是意图，不替代本书已实际到访的空间尺度。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "fa1187944459a6dba337ca6d054837eb103067d4f6269965193ef8876c8accfb",
      "facet_bases_sha256": "1160daae02c55cae29c97537029d8d276923e1b57f1031416e3334da49d0997d",
      "source_scope_sha256": "e6d86d755ebcff00ba970d01441011f3571aa9c7a4c7eff2c1468ecd1a9ed19e"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "a8ac77c62bb84eb0b64c791136e07d94085dd6a3542a72f3aa0f2fd42ea3369e",
    "source_log_record_sha256": "0c2c5d0956ff6244975664287e8045dbde98aa08b81d98b7b82a33f6d3061605",
    "wholeprior_sha256": "7036b5b425795dc5b6ec3d0e71eac29311df1dc830a2fc017e5e351951be44d8"
  },
  "Q5441458": {
    "id": "Q5441458",
    "identity": {
      "title": "Feersum Endjinn",
      "author": "伊恩·班克斯"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[18]",
    "source_spatial_record_sha256": "2d16911632245c28673a7e47687d144d1271740953feb63a0fd41ce49d5bf64b",
    "reviewed_spatial_fields": {
      "spatial_primary": "abstract",
      "spatial_secondary": [
        "earth"
      ],
      "spatial_rationale": "本卷资料明确远未来地球内战与Bascule进入crypt网络寻踪，限网络层和地球身体层；太阳危机及技术神话不增加cosmic实到范围。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "5acf61af950afcc061eaf1d9d2c9b36c37c0f187f86f958f2e4dd7f0dc374e8d",
      "facet_bases_sha256": "89ece7c70f3516fb93c8fde45bf34299c07264c43439ce562066a7c65fb532a7",
      "source_scope_sha256": "9e0a243cc35ff9d6479804715b9582f0adb8052c4dbd8f7013f8839533ba57bc"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "c0b077580c99459c8cc129db33403094a069b538116d049011a7ce7f50e7b771",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "74234e98afe7498fb5daf1f36ac2d78acc339464f950703b8c019892f982b90b"
  },
  "Q65125622": {
    "id": "Q65125622",
    "identity": {
      "title": "六翼天使2億6661萬3336之翼",
      "author": "押井守"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[19]",
    "source_spatial_record_sha256": "ceb03dc02033bf701e5ef3d61f66ffe9ce3e624646c00856bb47822629eee6c7",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "准确Seraphim这部漫画知识限定地球天使病流行、公共卫生军事权力与Sera同行者的调查旅程；天使称谓不作为真实宇宙天界，未补未完成漫画的结局。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "14805590f2ea154a964188fa6bd31366044c76b7dfc3f00bdc22c350ab9df77a",
      "facet_bases_sha256": "e903ec32a0df0422046a8f50ea699e9222f302c55d5c5c92b209fc9811b19b0c",
      "source_scope_sha256": "2e7844aa7c2f1e684018f4f97690559e40cc0f7477e5304f45432f1863edebc8"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "failure_count": 0
    },
    "original_cache_declarations_exact": {
      "ownership_sha256": "c4f5abbb4b3f5b116c9f627a6a4f0d8408a90b5c5d091360dd76e4c4cbff3730",
      "private_raw_search_return": {
        "path": "work/evidence/known-year-global-r4-search-120.json",
        "sha256": "36ccc84a7435a519fcb9e9960b7b553fb68941670c6a016b3cfae7004dfdfc66",
        "scope": "本身份一次short精准查询完整真实返回；只采用日志中明确所述范围。"
      }
    },
    "original_ownership_exact": {
      "original_ownership_file": "work/evidence/known-year-first-pass-lane-1.json",
      "original_ownership_sha256": "c4f5abbb4b3f5b116c9f627a6a4f0d8408a90b5c5d091360dd76e4c4cbff3730",
      "original_ownership_index": 120
    },
    "source_analysis_record_sha256": "a99c26fa43b359a7152908f8c3c4c49f53e68a38cf034cd8a033431b91322696",
    "source_log_record_sha256": "c5f6d4df2449a9bf4ab1cf43afc64a62d5615f85a0c0f80ed6116afd2c9a5aaf",
    "wholeprior_sha256": "ce0dbf00f2d62de429284ff3b3ae1f5dafa6b7c81b32ebb889a1d821c372f3ea"
  },
  "Q11826490": {
    "id": "Q11826490",
    "identity": {
      "title": "Pożytek ze smoka",
      "author": "斯坦尼斯瓦夫·莱姆"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[20]",
    "source_spatial_record_sha256": "628c72a62a22f5d81b2e3b0a5e8bae5e48595993a345e95a6555e084a42d5ea6",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位此身份所见Pożytek ze smoka同名篇中整个行星经济喂养龙状存在的阶段，宿主未明确；不借其他Lem故事命名星球或扩成真实银河经济。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "b06189b3ae688444481f7396dfaa4c186acc138f63d3b5e8a4e88132b647401e",
      "facet_bases_sha256": "507a8f3b25196c50927848ca65bd662cec3e89a9018712605005725b78aa6dce",
      "source_scope_sha256": "5da21e6e03e61f6131d7f36922eb1e4d7d4c18def090d5bdb746a84d7e44f273"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "current_unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {
      "raw_search_artifact": "work/evidence/quick-retry-root-assist-modern-r1-search-a.json"
    },
    "original_ownership_exact": {
      "original_ownership_file": "work/evidence/quick-retry-lane-0.json",
      "original_ownership_sha256": "5fce5b2b8279d784d7d141536d8e923508897fe00cf0f03aa907e610a8c23596",
      "original_ownership_index": 211
    },
    "source_analysis_record_sha256": "e0eb5b10947ac01150ebcd4638365a0197c567b3b68ca40a29016804136c6035",
    "source_log_record_sha256": "7ac071f732ca5bc0d682250cbe5391638475dff09ad2a215bc66751094a26fd8",
    "wholeprior_sha256": "e8a5304e7e18ac75b5c356f61b45903809490614e16211083a22760c52ee6f76"
  },
  "Q11946479": {
    "id": "Q11946479",
    "identity": {
      "title": "Emissary",
      "author": "Jeanne Kalogridis"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[21]",
    "source_spatial_record_sha256": "64dbf3048a8a0bce78c6869fd5489b159eabbfc4fc384a626657de9a9890d134",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "准确Emissary小说化知识限定Bajor附近旧Cardassian空间站与稳定虫洞入口的本卷接触阶段；向非线性居民解释时间和爱的经验不独自作完整abstract舞台，也不借电视剧后续行程。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "55fa3db0a22c45fa7bb1de118ac923536d8fd43499516a52d0d23d6b25905df4",
      "facet_bases_sha256": "2a70baea92edf22b3e55503532dcf8ebd0611f1eb6e170462ff7938dfa9d66c7",
      "source_scope_sha256": "e4acc9b0b30faf60a1a33fe220c10b9014f71203cbd529d4568a6d81102a068b"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "current_unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {
      "raw_search_artifact": "work/evidence/quick-retry-modern-r21-search-a.json"
    },
    "original_ownership_exact": {
      "original_ownership_file": "work/evidence/quick-retry-lane-2.json",
      "original_ownership_sha256": "f1e3bce7c91b9744ab300726ea85acd26e5f195553ce022a63559cc16e04bda5",
      "original_ownership_index": 640
    },
    "source_analysis_record_sha256": "bc04af40e15278d9d00ddd1916337736a7a7117c94dab9995edacd7125a4f196",
    "source_log_record_sha256": "e77be58410202645045f775d291ad974afe577581cb20bcc28711c6c5a680f01",
    "wholeprior_sha256": "fa22ee1a6fd92ae10846e4dc2719f9a4ae73faf15205916593b28246d793031a"
  },
  "Q12720858": {
    "id": "Q12720858",
    "identity": {
      "title": "Aqua",
      "author": "Jean-Marc Ligny"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[22]",
    "source_spatial_record_sha256": "f8ddb73a42117b23e9dcfb8c4926090814a9116610404543ccdc4ed92fee9549",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本作评论明确Tibesti、Chad与Libya等地球水资源冲突和绑架安排，限当地政治行动；卫星用于遥感不等于人物实际在轨道活动。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "940047ba4788ac0a02ccd68e4ed15ce0cf1eea2e05e353e87904dd2da96dab12",
      "facet_bases_sha256": "630ee95690424a623ae6e175f7c6c3bb4b0c782f0bef255c2e001d2698777ffa",
      "source_scope_sha256": "7fc3d5a439e54351d153459759bc244ed6d070576e92a7c06e9add6e69f97e47"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "a19d3ed0b7f4f5e8c9c801ed1ea59e1ab4c102e57c39ac4d4f89513a5b274001",
    "source_log_record_sha256": "66f9afb21eef2bbde543cbe3d5d399f1e5cbedfd38807b70ad2f3ac5c9d00819",
    "wholeprior_sha256": "5437e6f5d5f8515a48881771b4d05ada16bc24c9f1df3ea9c6271c5f3fae1da5"
  },
  "Q131461463": {
    "id": "Q131461463",
    "identity": {
      "title": "Alien Bootlegger",
      "author": "Rebecca Ore"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[23]",
    "source_spatial_record_sha256": "921a79cbc1b510eaf003cbfb423efb1bc50f104732ddeb7ba2c08087252e6b35",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位Alien Bootlegger题名篇中来访者落脚地球Franklin County并误读当地威士忌产业；别的恒星是来者来源，不代替本阶段实际星际旅行。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "57d69b8649502c2696d0f767a7905c185a9b79a79985fe745234c3fa10e1a1b2",
      "facet_bases_sha256": "68455de7f25ecfa2cefcc4e4960c8f3267865c3e7763fe66927b8797a1b7211e",
      "source_scope_sha256": "cd51f68e135e091a1ae4852432835a368308997a80d07584341e5cce7c753df1"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "3523c88d6ae9ec010c759abf0cb738e971bb70af1066b6ffa559dac951c3ea95",
    "source_log_record_sha256": "33eb067f17fb6788eca6745cd70bf3dbb49d8f49b99cb7714412657015bfea3d",
    "wholeprior_sha256": "6d5f957f1b2aacef0263169c9f7d5dfb3da79cdbc02a8f6344a8b2e7d28ea6a9"
  },
  "Q131471704": {
    "id": "Q131471704",
    "identity": {
      "title": "Friendship Bridge",
      "author": "布莱恩·阿尔迪斯"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[24]",
    "source_spatial_record_sha256": "bf30f5f2b8b3dcc8649614de89bc636717db34cc9c379b4d004ff15eba6e53fc",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本篇专段明确英国见证者在苏联统治瓦解后的中亚观察混乱，限地球当地；不补其未说明的职业、目的地或终局。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "671b156621e1a2e8202ca2fd383751c479a228c914115215c1d8ec2355897423",
      "facet_bases_sha256": "6aa5b16217c9530c953083cca9caa3f30b5770e44c15821af83e2f966387b309",
      "source_scope_sha256": "dd09ba9144d060fd9a58a70bc0337ff1140eedd61f5b940fce4cd6e320f17c10"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": true,
      "actual_query_count": false,
      "actual_open_count": true,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": true,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "actual_search_count": 1,
      "actual_open_count": 0,
      "actual_open_failed_count": 0,
      "prior_known_failure_count": 2,
      "new_unsuccessful_attempt_count": 0,
      "unsuccessful_attempt_count": 0,
      "cumulative_known_unsuccessful_attempt_count": 2,
      "failure_count": 2
    },
    "original_cache_declarations_exact": {
      "ownership_sha256": "63042ce16ccdf6f42ce33b78c52284ce82e0efb2cb84e1ac6b7b2faf4b65c1f7",
      "execution_assignment_sha256": "f3b3bb3bec9f613a3e7fdbd18b510afae6e01c54c944a2174a0a1c11d12d055f",
      "original_owner_record_sha256": "234b8c40dab68fa53ffc1164487e911ac0abd56a9991e3ba92a5a3b223e95e53",
      "current_prior_sha256": "8bd758386bb340601a965313e9cd7d6e4f09b9db41eb586631fe410294cc95a7",
      "source_snapshot_sha256": "0f431db4614200d8f610fedc67575b8a2e8c763d923782ce200506feb635578a",
      "assignment_source_snapshot_sha256": "eb28f22eae2739df9ea0a6836b93d14ae4358af1408a78a7e9811ca66e95e57a",
      "response_cache_references": [
        {
          "file": "quick-retry2-root-assisted-early-round1-responses-a-private.json",
          "sha256": "228d74d5461f8153cfa619240a8fa6ed6a66135da2f8a0a2a12a40b04aa3d3d7",
          "section": "searches",
          "index": 4,
          "record_sha256": "cb04f2775740f7c60e73fbd48f8861f7335040c3fac31c62b57338983680446f"
        }
      ]
    },
    "original_ownership_exact": {
      "original_ownership_file": "quick-retry2-lane-0.json",
      "original_ownership_sha256": "63042ce16ccdf6f42ce33b78c52284ce82e0efb2cb84e1ac6b7b2faf4b65c1f7",
      "original_ownership_index": 108
    },
    "source_analysis_record_sha256": "d44392d372ceeaec1a4e8148764c4ed9e5d45bca2fa7f81b8f37dffc775290ac",
    "source_log_record_sha256": "0fd766eef8bda15ba60087382e91e082a64f895021aaa96918f4da4750009c3b",
    "wholeprior_sha256": "59dded0bd983c97f5c28316a46a8ab6e7ea38896c36906dfd369d9467f5906f0"
  },
  "Q131516770": {
    "id": "Q131516770",
    "identity": {
      "title": "Sacred Cow",
      "author": "布鲁斯·斯特林"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[25]",
    "source_spatial_record_sha256": "cd26351860979014f4f2c8eb3d096ed0bd81baff69c3d57baf8242e92f771aa3",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本篇书评明确富裕印度的电影产业赴疫后英国拍片，限地球制作与被利用的当地空间；生产重心逆转不增加外星场所。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "ec2c41ae25f0f050ef484bdf5ea3fbed73afc5c7fce9b8143020495f76859dcf",
      "facet_bases_sha256": "e4a61ffb5ba0831c3981fbbdf0a9007813e531c5f148f1afc98ad06cea66a01e",
      "source_scope_sha256": "b6764f92e4da576245a4bebf9457cda261d4811f705132401b55a2ace9d7d796"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "3def300635f1c3a3a657ea4344f4f38e9f24abea7b30a75b4c8d1ed21de17254",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "6ad8edda90acadf8ef1e2c8363faa93729c83c7da75680e771cecb9e74a4415a"
  },
  "Q134464020": {
    "id": "Q134464020",
    "identity": {
      "title": "Ombres blanches",
      "author": "Richard Canal"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[26]",
    "source_spatial_record_sha256": "a5dc91e818ec55fdefbfcc536f1297ff9f6472a88dcdfb41a34aeb17b9c29950",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本书评论明确喀麦隆雅温得与巴米累克争端及雇佣信息专家介入，限地球地方政治行动；网络技术职业不独自证明主舞台为虚拟世界。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "b1421523f836ed05c7f442153e908587db40596f114766e959a9b6d59b7c8254",
      "facet_bases_sha256": "64d129ec581b2726d72c3ed21c87cb54b13dd85ed40d1f2bca85df47f6ec4b5d",
      "source_scope_sha256": "5d751a18b50fc025598ee49da248f52930ecfedf16b7412694a9980a440ec16a"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "5bc492904bc53399ff666417821577df15a77e48f137f220c92dec648d5f2f13",
    "source_log_record_sha256": "9a5ec065ca58969e04e1b9b4f7d7e8eae8e9710187cc46adb881c70343b0fd2f",
    "wholeprior_sha256": "7c9ae8b0f69b119f220cb8ee02b047f8fba1a372eb7b5fe73f96687945e4fd70"
  },
  "Q18430829": {
    "id": "Q18430829",
    "identity": {
      "title": "In a Bomb Crater",
      "author": "安杰伊·萨普科夫斯基"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[27]",
    "source_spatial_record_sha256": "047417754b7293a74544c4935a8613bea05c76ed0f4443f5c20819247b0e6863",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本篇材料明确另类历史波兰的外国准军事、民族主义帮派与宗教统治，限地球当地；现实分叉未显示空间跨界，不仅凭alternative reality字样赋abstract。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "0adcdb91bb50b7bc7de742b9939c57abdd77a53379393fd25bd278426a621e6e",
      "facet_bases_sha256": "7dcef65e7b12137095c5f490383b1c303b6751eca8c28e6cb5df6c42dcf5a5c4",
      "source_scope_sha256": "7d6743c6a14d9c71791ad5ea7e300e762f96ea6c3a3bd5b3f62d350fc720bc6b"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "current_unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {
      "raw_search_artifact": "work/evidence/quick-retry-root-assist-modern-r1-search-a.json"
    },
    "original_ownership_exact": {
      "original_ownership_file": "work/evidence/quick-retry-lane-0.json",
      "original_ownership_sha256": "5fce5b2b8279d784d7d141536d8e923508897fe00cf0f03aa907e610a8c23596",
      "original_ownership_index": 215
    },
    "source_analysis_record_sha256": "699cadeb754e742edcfdd5df83f9c8a7263495c66dbc1ab71d75f6ff6f44a557",
    "source_log_record_sha256": "56f869d6d4a1e8902ffe615e87f0a386d290374f48b217ee65809beb190e21ed",
    "wholeprior_sha256": "6876d5e2aa543e267a79969adaea23308a7a84ca90dc14fa244ff06977bd9392"
  },
  "Q28419607": {
    "id": "Q28419607",
    "identity": {
      "title": "Invaders!",
      "author": "作者未知"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[28]",
    "source_spatial_record_sha256": "54bbb4639699d8db935b5349bc97e78bdd3b065673ed8895ad2333d1949cbb59",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [
        "planetary"
      ],
      "spatial_rationale": "仅定位Invaders!确认成员The Liberation of Earth的地球解放战争，及Bloodchild的Tlic行星上Gan寄宿生育选择；两篇不同场所分别保留，不称整集共有一个路线。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "6394d5605ff0c85874c64a5f64f970e652a45cc8f572650d041f2fcf8d1935a1",
      "facet_bases_sha256": "fd536cdf4fff716d278000730f159a399f3866f99dfff7413dfe4d2bed072f02",
      "source_scope_sha256": "5747f3243275ad729315fd2e57a593f10984221424417d5fe0f807c5b7d7ce9d"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "e7f06982e983469c657f2572e470de61244dc054313dcaadce379a1b67be5e27",
    "source_log_record_sha256": "b5cf5d47b025c73aea9adc56e92b751fab6cf197725df996deb281fa4c1ceb53",
    "wholeprior_sha256": "ba42e8ce15be3b78425b4d19c46b8c5d1a3968bf5885a622a8d286b56829b578"
  },
  "Q3116252": {
    "id": "Q3116252",
    "identity": {
      "title": "Mindstar Rising",
      "author": "彼德·漢彌頓"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[29]",
    "source_spatial_record_sha256": "c7083f4f7f2df5786977d8bcc8f40a837bca9e8bf52aaf58adc84f5cd18be07d",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本卷材料明确气候变化后的英国、Greg私家调查与企业能源争夺，限地球环境；军用精神增强不直接变为虚拟空间。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "1e5550b39c20ce2cd68857e3fa2293c1c6443d97d341eadf59f9f0ae34094840",
      "facet_bases_sha256": "fb1f7bfb720fd6a98dda8ac1491ed110a57ed2749d02dda5fac25cb9aa5ac2e8",
      "source_scope_sha256": "c11414fcec79b4b57098eb146c80806c3e5ad776f5ca6019ab5091365208fd2d"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "0ac4524b477c454d2d03b039713d720e07351fef266d96150ac31b8367642811",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "f5cc7b7f20d0e637b6625853a00fea61f0d78b268cbcb4d978851618890ec853"
  },
  "Q42723496": {
    "id": "Q42723496",
    "identity": {
      "title": "De robotromans",
      "author": "艾萨克·阿西莫夫"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[30]",
    "source_spatial_record_sha256": "5995129dc8ed0851faf44715f262d7744ab36246f48e6f4341cc003c64f9647c",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位De robotromans合订本所采用的The Caves of Steel中Baley与Daneel在封闭地球城市调查；Spacer身份不等于本案到访其星球，不借另两卷地点。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "b6dcdaf799f719a1ffef67c83200433363987383ef6593180352c39565aaf48d",
      "facet_bases_sha256": "40d4cf1f797a092af49f667400a51b8257ae638468449228ff4e83d648bcd276",
      "source_scope_sha256": "28fc8fa5fa30b12da1a9d99427a90a5856f10a1266771cb8535e984d7ea8bcf0"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "failure_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "5d2d01efef0e4caba21186d0317b26f041c30833a160232da92c0f65f1417b4d",
    "source_log_record_sha256": "7ebb9a4235fd388dab155a1af78368ecada0c7e200ce764dcef1aec3f5901571",
    "wholeprior_sha256": "8ce6b560b38eb9c38f370f4ca5097c3bb755c2dda95f4cc4e2713769a778b5bb"
  },
  "Q4808643": {
    "id": "Q4808643",
    "identity": {
      "title": "無限彙編者",
      "author": "凱文·詹姆士·安德森 / 道格·比森"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[31]",
    "source_spatial_record_sha256": "fafb8830d3ff5d14d4f89cf6077b547e7b169bf2f94f4bfd00966d3d964e4ea1",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本作材料明确月球基地发现逐原子建造的巨大结构，限月球现场与当地扩张；地球恐慌和被吞噬风险不当作结构已抵达地球或外恒星。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "8a29f042b9d4111a864393cbb04be0458ecfe5856435aa2ca01fef0b7ad8fdca",
      "facet_bases_sha256": "68af02945ca364947ad4585b1d18001a81276063b8a7f9eee3c9e09c51311c05",
      "source_scope_sha256": "f40ea5f31012186e7f2bb2cd57c7499bf93bf94b220d4f10571947f3d88231e7"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "ec3e10151ddb19ab2ee443f9de8cddc2bc5a8d2d261c1e5c027b4bcfdd0e8f11",
    "source_log_record_sha256": "61cc46b478c0d54865283da9906bbafe967f059c9eb8d4b33acac6c98bbb1815",
    "wholeprior_sha256": "ee70c032586e96f215e766dd1ce2e6e8f60fc67a294c47feacbd1238145ad9af"
  },
  "Q5368262": {
    "id": "Q5368262",
    "identity": {
      "title": "Elvissey",
      "author": "杰克·沃马克"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[32]",
    "source_spatial_record_sha256": "cfe054cf72c6cb208dd35f08a98184ebf251a2a7dc408c9e3f3702b8e2e86953",
    "reviewed_spatial_fields": {
      "spatial_primary": "abstract",
      "spatial_secondary": [
        "earth"
      ],
      "spatial_rationale": "准确Elvissey单作知识限定Dryco现实与Iz进入的另一版本地球美国，后者的Elvis经历不同于自己的历史；实际跨现实由本作知识支持，不只是年代改变或偶像宗教造成abstract。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "9fe4f7940a82092660d62301ac417d83640f6075fdd5f6260407528b1dd852e2",
      "facet_bases_sha256": "02a15459206ab65d48152b49afcdb95bc272ddd912c6d0e7fa9fc0bb659b77dc",
      "source_scope_sha256": "b6764f92e4da576245a4bebf9457cda261d4811f705132401b55a2ace9d7d796"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "8721fb603b05950cb3fbe2e5d8310ba4c6a590fe09e2bbb2ad452a9bed01fd13",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "308a07a85396cde15c0c0f2770cfc9a1ebb2ac3ef514c72c886a63461302481c"
  },
  "Q54802781": {
    "id": "Q54802781",
    "identity": {
      "title": "Here There Be Dragons",
      "author": "John Peel"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[33]",
    "source_spatial_record_sha256": "2be43dc6b44cab8248d7edaaa918176b43b86dd3dc26c260240518fa3006a0af",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本卷材料明确隐蔽人类行星的本地龙蜥、猎人掠取和调查者被囚，限该虚构行星；猎人自称星际职业和古武器破坏力不增加主角已访全部星域。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "dae66e2f918c81cadfeee2a74fa37ef8037e78e12ca730c202379d23d7606635",
      "facet_bases_sha256": "189bd88df68eff5d431a360d581ddee91da7c7f562ea87750aab12a14559a6e4",
      "source_scope_sha256": "306eac084b593b3962d518b7f4563ac3e8dc0034d00101a61e36f82685020984"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "a43c058eca1b107117be879ee956b81db50a2d2493a6168770081692142b681b",
    "source_log_record_sha256": "451c3cb07f95e78cd066deafe5b0a367dabdbeff2c0a8ce81e6c7ba1d645e4f7",
    "wholeprior_sha256": "04cb2e55f41c9d88e4b9e843055f3ba1a6dec1d3d3ec7cbc4883382f9a059428"
  },
  "Q54807395": {
    "id": "Q54807395",
    "identity": {
      "title": "Worf's First Adventure",
      "author": "彼得·大卫"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[34]",
    "source_spatial_record_sha256": "cfc9dac5fca904a45d4770f030a945a28ded4d9848a282a4ffbcefb819efa170",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位Worf’s First Adventure材料明确的学院演习卫星事故及同学共同行动，限本地卫星设施；Worf由地球家庭抚养是背景，不借Starfleet全系列航路补星区。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "701c24aefaf22abba700af13782d29c1c3a2bba30c63fcd4cf505be668a037cf",
      "facet_bases_sha256": "579bc5e54cade053588d89f3f02d439232276ff7333b4a3ff39e030f025617a6",
      "source_scope_sha256": "2e7844aa7c2f1e684018f4f97690559e40cc0f7477e5304f45432f1863edebc8"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "failure_count": 0
    },
    "original_cache_declarations_exact": {
      "ownership_sha256": "c4f5abbb4b3f5b116c9f627a6a4f0d8408a90b5c5d091360dd76e4c4cbff3730",
      "private_raw_search_return": {
        "path": "work/evidence/known-year-global-r4-search-126.json",
        "sha256": "ee8ae39b8330b8dde218ccbc4a95ecb657338b4b4526786ec943e3f69f3faa4a",
        "scope": "本身份一次short精准查询完整真实返回；只采用日志中明确所述范围。"
      }
    },
    "original_ownership_exact": {
      "original_ownership_file": "work/evidence/known-year-first-pass-lane-1.json",
      "original_ownership_sha256": "c4f5abbb4b3f5b116c9f627a6a4f0d8408a90b5c5d091360dd76e4c4cbff3730",
      "original_ownership_index": 126
    },
    "source_analysis_record_sha256": "2e9254859268214923acfe642e2093a198650f7063942865fc6c5249fb1d9518",
    "source_log_record_sha256": "7e9f27b8b20d7a72386e3588e4ffe7a36ae73f94395fc1cca62bd53e0157084f",
    "wholeprior_sha256": "e40d8e064c1bb9656139b6579cb2580aba33a21627423825a7f93cb8de4a101f"
  },
  "Q7738320": {
    "id": "Q7738320",
    "identity": {
      "title": "第三方",
      "author": "拉瑞·尼文 / 傑里·波奈爾"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[35]",
    "source_spatial_record_sha256": "2fc88d97495cd6dd1d92245e2665e0836641c246da694376d212995d19c7b3f0",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确The Gripping Hand单卷知识限定人类与Moties在Mote恒星系及外部人类恒星区域的接触、隔离与船舶行动；政治封锁银河的说法不代替本卷全银河实到。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "df27809f3dfaacec4d5b1028d85aba3a254d7727e6cc8d3c909c6f6e9852ea26",
      "facet_bases_sha256": "6b67ab9cc794e2d805e744c0cbb93a40a6b1905a21cb99d11134997c8608c7ee",
      "source_scope_sha256": "6936a4039473b21383d76d21537dacf3122f52f9ebf42f65ec2d0f327d2a503c"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {
      "record_sha256": "2ae66a55f469465f1f9cfd76e8eb7ce2b789300eafdd126ee2f70114f6535835",
      "source_artifact": "work/evidence/fast-first-lane-2.json"
    },
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "94d598202fe60d9345d595ef8c2bc0f640ff9e50a2578746df8743a4de756f89",
    "source_log_record_sha256": "1454fbdcba4d7167d37d86dd21e66738cb5323ace9dc2745ec92a1ee289c7956",
    "wholeprior_sha256": "3e746e47a82a2aa7523a328dac4b3d9e5a2af37616fd0d4322c93f4ab0d2bd3b"
  },
  "Q125817634": {
    "id": "Q125817634",
    "identity": {
      "title": "Chanur's legacy",
      "author": "C·J·彻里"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[36]",
    "source_spatial_record_sha256": "ce113fd119c9b429bea44f48de5c3fe7f593b8c016b4dae02156faf970999051",
    "reviewed_spatial_fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确Chanur’s Legacy单卷知识限定Hilfy经营船舶、运送物件并卷入Compact不同恒星的站点与种族政治；高额报酬和宗教物件内容未被补为已知真相，不套早前Chanur各卷。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "708e9197a9f356bf4e803ca736766ebdcd5b8aa9c4c6fdbf5a77aa993c71db15",
      "facet_bases_sha256": "8c8d6455ff14a6680069176aff6033344ce22ff736f9974b32de9e389190b7f1",
      "source_scope_sha256": "c3c3fca64a2e7a50001921eccb7de661b657aadf9bb5e478c187849bb71ad480"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "5496dd3d5e6847c3419254a00238bb381c345155ee54d710ac43e6fb9561821c",
    "source_log_record_sha256": "6d4aecb17b0c5b55d5936c85c8e81e4a95e82bcd2d90cc2d1cefdf2ef225112c",
    "wholeprior_sha256": "692c02ba8734bde1c2927e7426b7ae8884a9274bed1c689be31b28c0dba3156c"
  },
  "Q131517849": {
    "id": "Q131517849",
    "identity": {
      "title": "The Round-Eyed Barbarians",
      "author": "里昂·斯普拉格·德坎普"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[37]",
    "source_spatial_record_sha256": "a6b9bfe81baf8c4c6bb7ec0026f7981f374bc722e9802cf4635ddc42c82737bf",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本篇资料明确中国先到美洲后的中西探险者及当地女子争执，限十六世纪地球替代历史；不同发现顺序不自动转成空间平行世界。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "393b46606aa771c07e10176e59f66e369a35b8b0d2acd356a6dffb82d40164df",
      "facet_bases_sha256": "58f3f953d52d74e878b7008f80b7d61395cf431b3e23d86b8ea8f1463c19f632",
      "source_scope_sha256": "74658a2daddc5306b75ad9ae0bfeca7dd13e92e1f1359270858de5a556e419de"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "458444b05f819a0698e893e2f87537f16455787e440c4d429dcc2155eaf9913d",
    "source_log_record_sha256": "7503c8b625a7ebe81d2539743c63f3c7f9051f1cecee434d9a10e6b97217ae79",
    "wholeprior_sha256": "29381b37d0ebfd35033670fe112382286b3f748357a4c3a9e91f5c95526347c6"
  },
  "Q17009376": {
    "id": "Q17009376",
    "identity": {
      "title": "Isaac Asimov Presents The Great SF Stories 25",
      "author": "作者未知"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[38]",
    "source_spatial_record_sha256": "5a07617432d534248f79b2e441df8c44134f7cb6afae2e405e05ce4797a9a59d",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位The Great SF Stories第25卷确认收入的A Rose for Ecclesiastes中诗人与火星文明的接触，限火星当地；宗教文本、诗歌影响力与其余成员都不增加别的场所。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "200cc6cb841f813c2b762b46ef7978b77dcaad4788aeaf58ac40d66620e199cb",
      "facet_bases_sha256": "4c214ec6d0129957695def0c682b024a2e3c7f231b0a785626604fccba8c6bb4",
      "source_scope_sha256": "4eb67f2e1787192216fb3604ffeb5bff7be47671a3f5f1bfada3b72d4a26c133"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "failure_count": 1
    },
    "original_cache_declarations_exact": {
      "ownership_sha256": "6ac6307da6880daa689e10a48c35466fac9ed028ea6a42764b0ab4af29d072bb",
      "private_raw_search_return": {
        "path": "work/evidence/quick-retry-global-r7-search-220.json",
        "sha256": "eddceb93e307d30731436ad444cb5934508983c1ccaa3b8732c5074fb8da044d",
        "scope": "本身份一次short精准查询完整真实返回；只采用日志中明确所述范围。"
      }
    },
    "original_ownership_exact": {
      "original_ownership_file": "work/evidence/quick-retry-lane-1.json",
      "original_ownership_sha256": "6ac6307da6880daa689e10a48c35466fac9ed028ea6a42764b0ab4af29d072bb",
      "original_ownership_index": 220
    },
    "source_analysis_record_sha256": "ceb722c860dedc5c8b99a282d150ada30ab77360d1131c31ae197fe0bbb74b07",
    "source_log_record_sha256": "386a9ad08a4fdfc95aa46a1daf144e01efb570230741811eb367f432f061e50c",
    "wholeprior_sha256": "b2812db19c62254e0d423f096d2f375a11f01f5c4ffc87a2baa206f7f92e051f"
  },
  "Q25395087": {
    "id": "Q25395087",
    "identity": {
      "title": "Mars",
      "author": "班·保華"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[39]",
    "source_spatial_record_sha256": "f3827be2851bd925be0a02f302ee312902912770f8e41896a139a97330f53593",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本作书封明确国际队伍已在火星着陆、建穹顶和探索，限实际火星基地与环境；未知病毒按小说设定，不当现实发现，也不补未揭晓的重大结果。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "c7f4313a1ef7150853ba1da348b6e29f8ea9f417dfca0d1ece760d5c7acfc999",
      "facet_bases_sha256": "6e07c9d9c75faeef38aa1e0f91ccbbc43f20e725f839732fcc0c413faad6e077",
      "source_scope_sha256": "306eac084b593b3962d518b7f4563ac3e8dc0034d00101a61e36f82685020984"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "0eaa4093c5f4b2081575d388ed73d9e4625dadcff2e39e8b70a2cecd5dbd6a7b",
    "source_log_record_sha256": "1008a6511fd2f22acde66779fbf5eb61ab2f26148b19653ee198b0b72f9a4155",
    "wholeprior_sha256": "40c6a62eafff37056999a5218e9db8b81152a216591f5c901d698160a9900281"
  },
  "Q28419265": {
    "id": "Q28419265",
    "identity": {
      "title": "The Best of Astounding: Classic Short Novels from the Golden Age of Science Fiction",
      "author": "作者未知"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[40]",
    "source_spatial_record_sha256": "105d9c916916e77090f69a914f8c086d309de684a765d63944c1fd37fde82e1a",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [
        "earth"
      ],
      "spatial_rationale": "仅定位The Best of Astounding所收Sucker Bait的行星考察与The Shadow Out of Time的地球意识失位、澳洲遗迹经历；这两项确知成员分别保留，不称整集共用路线，也不由意识交换推已进入非物理世界。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "708dee70bda8fd91ef9557f97423782ebbe351e46ebbf3cee3d9fb656dd3efb7",
      "facet_bases_sha256": "6e2dffe692587a39ef5a57c6b6bd3d9842767a69ef87c2579cc51ef67db1f02b",
      "source_scope_sha256": "72ff8611785a45a84a8261e4ac307a573ff2fde0facda8090b66104033412ae6"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "ac68a9063ae32c26e5cc14d4174bc55e3558325eb799a680dc6b6aae07995647",
    "source_log_record_sha256": "90a3708ebca1d90c3f52d2f4164ba9195d8f640731ccf21c64c9106a4441064f",
    "wholeprior_sha256": "385bdf9d0173ce21b9e06f46bc6119267a814de15e4c22366ac221a02de5a977"
  },
  "Q3021982": {
    "id": "Q3021982",
    "identity": {
      "title": "Demain, une oasis",
      "author": "Ayerdhal"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[41]",
    "source_spatial_record_sha256": "2b9ec77b00e18e42effdf3770a9cf5b4278c3d1b212bf8daff4c7671abe44162",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本作材料明确欧洲医生被强制送入非洲村落照护的阶段，限地球发展不均场所；富裕北方投入太空征服是宏观背景，不等于这位医生实际赴太空。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "b591c6d25f2761ad0de91a8f2b5708d1196945a092a702a0e36848b7159905b4",
      "facet_bases_sha256": "0345f47b89470d2072702a50c013d80ee0f74709eee1635aeb0c2f27e95f3117",
      "source_scope_sha256": "0092c6dfa91f8a7d8bd6973c2afcb6d2aea3877250ef770c2873f56518ce33b2"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "13b90161e577f48ab76bdce2752586c7bba1c261d6d224de088c600c69b14807",
    "source_log_record_sha256": "cdf2158046e573b519e6a555c392ccb87244e903ba89a648b300b1a8a9fa36a1",
    "wholeprior_sha256": "637535a57999b31fcd9db8d10d627cf08271e32fd32b56ce59b6983459f09c5e"
  },
  "Q30607982": {
    "id": "Q30607982",
    "identity": {
      "title": "Universe 2",
      "author": "羅伯特·西爾柏格"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[42]",
    "source_spatial_record_sha256": "7faf4034a2f5f501ebabcd80eb41211bcf634e35fd93797cc1046b97d36e393a",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位Universe 2所录评论明确Cary James成员中的火星班船谋杀场景，限这段太阳系运输；未说明的航路与戏仿篇具体结局不被补入，更不概括整集。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "a2ba41b8e2ddc55f835bcb097d55142eb4c5eeb3b069715a133e985a7aa4b3ab",
      "facet_bases_sha256": "e00bc380591454f2f2f6d095792f67c21b42cfc1e50d76cd919c55363803d6af",
      "source_scope_sha256": "a5a67a21ca575603e1604fcb401ad7f47dcd3936f9a36869aae4b2540fede0ef"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": true,
      "actual_query_count": false,
      "actual_open_count": true,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": true,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "actual_search_count": 1,
      "actual_open_count": 1,
      "actual_open_failed_count": 1,
      "prior_known_failure_count": 2,
      "new_unsuccessful_attempt_count": 0,
      "unsuccessful_attempt_count": 0,
      "cumulative_known_unsuccessful_attempt_count": 2,
      "failure_count": 2
    },
    "original_cache_declarations_exact": {
      "ownership_sha256": "63042ce16ccdf6f42ce33b78c52284ce82e0efb2cb84e1ac6b7b2faf4b65c1f7",
      "execution_assignment_sha256": "f3b3bb3bec9f613a3e7fdbd18b510afae6e01c54c944a2174a0a1c11d12d055f",
      "original_owner_record_sha256": "a7e1ee02841dcb3777ebe32e724f9d8f93097079f60f9389bd66eb6bbe4f2781",
      "current_prior_sha256": "5027ee1ab47d34761bb02d200eec8aa6d2ba69b1a1b9850bf83612f597e08b11",
      "source_snapshot_sha256": "0f431db4614200d8f610fedc67575b8a2e8c763d923782ce200506feb635578a",
      "assignment_source_snapshot_sha256": "eb28f22eae2739df9ea0a6836b93d14ae4358af1408a78a7e9811ca66e95e57a",
      "response_cache_references": [
        {
          "file": "quick-retry2-root-assisted-early-round1-responses-a-private.json",
          "sha256": "228d74d5461f8153cfa619240a8fa6ed6a66135da2f8a0a2a12a40b04aa3d3d7",
          "section": "searches",
          "index": 9,
          "record_sha256": "153a4d7f4c0525d1c64bc13e8e7f2cca4cc2826c52325e08ddc173d77c349225"
        },
        {
          "file": "quick-retry2-root-assisted-early-round1-opens-private.json",
          "sha256": "9ecdf2fd271497d3972a274eadd934e31410401b765a9389351f75e35631ee82",
          "section": "opens",
          "index": 0,
          "record_sha256": "1c1bc775f56e44689bcc5b5ac7e67cf5cd8ff206dcdf24a7c0e898b2c1aa7eca"
        }
      ]
    },
    "original_ownership_exact": {
      "original_ownership_file": "quick-retry2-lane-0.json",
      "original_ownership_sha256": "63042ce16ccdf6f42ce33b78c52284ce82e0efb2cb84e1ac6b7b2faf4b65c1f7",
      "original_ownership_index": 113
    },
    "source_analysis_record_sha256": "7c9659639e5fe3a0fa35bc67c4f51b019bf0e5ba41a06f28ef4e76b93a82fb0f",
    "source_log_record_sha256": "52807fa6afe38bf4a89de8b7fbac7d26929f4f0681884aeee105dff4a1bcb2a0",
    "wholeprior_sha256": "48305b1d84ea5dc77b9dd9a1153f60f6df65f3c314c4e8ea84ccbc4cc09c1830"
  },
  "Q3206352": {
    "id": "Q3206352",
    "identity": {
      "title": "Green Shadows, White Whale",
      "author": "雷·布拉德伯里"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[43]",
    "source_spatial_record_sha256": "b005a8636f9ba9320693c51e270b33c45f582e11291144fdab4db9d284d54c94",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本书材料明确年轻编剧在爱尔兰为Huston工作并接触酒馆人物，限地球回忆叙事；神话色彩不直接当作已证实另一物理世界。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "f3c13b229e126029b328518461702ddaeb04fe909b40b51ee10eca031a4c1502",
      "facet_bases_sha256": "2831ab0cadb245770b72db685c7a74cc3d713ef916b5f33cc92bd8f1fa8d21a1",
      "source_scope_sha256": "306eac084b593b3962d518b7f4563ac3e8dc0034d00101a61e36f82685020984"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "25957dbc5676af43edabe7d862b2a98a8f92d9f6fd84a67448aee08c5a5ae743",
    "source_log_record_sha256": "6feab6892aaa5254bca26392523f9f5b07cc50e838828012260271617066b7aa",
    "wholeprior_sha256": "423b8c0d4af266c8b7021016fd8bf33e30c575340bcfc52a5e920486d4d47c04"
  },
  "Q3222992": {
    "id": "Q3222992",
    "identity": {
      "title": "Brother to Dragons",
      "author": "Charles Sheffield"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[44]",
    "source_spatial_record_sha256": "268e263733508f4f2ea8f71b8e4e6ce181454f8894a28f36b16cb55fb751b414",
    "reviewed_spatial_fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本作出版社材料明确美国孤儿院、街头与TANDI有毒废弃物/人的处置区，限地球社会空间；核废料与未来制度不增加宇宙场所。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "eba9f04877a37b0cc2b0ebf1bf980fbac4fa5fba72e98bdab99e1d55905daf9e",
      "facet_bases_sha256": "77d332f8af5e41bf6e26006ee3443bb2ec2d1cf50ea15a8d11e766179fa0b6bf",
      "source_scope_sha256": "b9f807886039753b5c03eb02425de88f998d1ffd9c2220801ba5538eb330b8ee"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "1d94ecda9f9b3adc8208f73f163dd18d1775b611605a5fbd02b897a60509fb86",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "f0346571fe296ac3805a8375e39754427b23d4af12c5bcf854cedca81dfd4e21"
  },
  "Q3234544": {
    "id": "Q3234544",
    "identity": {
      "title": "The Memory of Earth",
      "author": "奥森·斯科特·卡德"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[45]",
    "source_spatial_record_sha256": "afbd8cec5acfa981f2fcf7d77b0bd5f690b8a6be2411532e8cdfcb247842aad5",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本卷材料明确Harmony世界的Oversoul与家庭、共同体行动，限此虚构行星；恢复航天后送核心回地球维修仍是要求，不称本卷已返回地球。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "85a833d335b63de1f554e8e9f74ad9dfaf8ce66a337f42fe12ef097acda829c0",
      "facet_bases_sha256": "123a7f9bc71313d8b1969cadaa3e9da8cec7f7349fbb9f34e439e6b65d6612d8",
      "source_scope_sha256": "79ec907556effffba54b1757b44d1aa11932b46accfc27927d19a6f8cf61c6d9"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "872e898db02b2c9360bbf95dd8eca7e213cea4bf36b96cf279481603ea0fbdef",
    "source_log_record_sha256": "921936224298b47a15a6d4b7bd0ddb29dd36309be0180e09e9bbe12bfcc56342",
    "wholeprior_sha256": "85f019329ceb03ca043ecf86dc1c0d89657146401cb775aa4ebf12a37ef44761"
  },
  "Q4726516": {
    "id": "Q4726516",
    "identity": {
      "title": "Aliens: Earth Hive",
      "author": "史蒂夫·佩里"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[46]",
    "source_spatial_record_sha256": "456858936703fcc2f5705fff11211f19a26a36fcccf9860b1fe6f54b3367f675",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [
        "earth"
      ],
      "spatial_rationale": "本首卷书介明确异形星球的考察游击战与地球侵袭，分别保留局部虚构行星和地球阶段；不借下一卷或影视其他行程推更大星域。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "863a1c3dee2077239cb536c5673d445e775fa7ccb0ccf612eeb43589757b9b4a",
      "facet_bases_sha256": "c9f35c9c1230cb8303a5d023454ccdd4a225d696197effaa3330a0e33bc5ba16",
      "source_scope_sha256": "dc1af7f1a0d383eb263deedc773e4f79fb366daee125be88372ca327bb817a36"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "unsuccessful_attempt_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "0b76e80bd64c8e2a53dfc038f48e4be1e17c9a58ccf13550a251d4a956a14796",
    "source_log_record_sha256": "a705057e7f041c36251437441477343e39ed64476036a7a0faf63a6d153060e4",
    "wholeprior_sha256": "af186679f907386951dda83feeda0971df1844afbd3427a6827c2315ad3a8297"
  },
  "Q54806997": {
    "id": "Q54806997",
    "identity": {
      "title": "Chains of Command",
      "author": "Bill McCay / Eloise Flood"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[47]",
    "source_spatial_record_sha256": "412e03095ff199d1ad405206e79162928b3b52154e86c3800834189dc9a4451d",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本卷简介明确Picard与船员在陌生行星遇见人类奴隶及主人回返，限这一行星阶段；人类身份与复仇计划不扩成多个恒星的到访。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "89892ac8d6c93e713033955e1f1b39a2b01ad71dad7de77b1c94fdd3c84214f7",
      "facet_bases_sha256": "47c2d8ce6850d8e84f343de2253d9a511e18098fe5c40278fc19bf344616dff7",
      "source_scope_sha256": "862d59fa24686ec3a9e3ce0d6ad06b06c0a3b56abe62445e452d02cc078b659f"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {
      "failure_count": 0
    },
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "fcc4cf07baec0b82f74b4a31411ac73c7b77b22c496bbb4946c5379300fa5438",
    "source_log_record_sha256": "041dab56bc3b777b205aa0fdeda4c0d886a0cb4529f1babfd120d1f4cd399792",
    "wholeprior_sha256": "20be306e9f5e847d34e1e71f9c3eb00a462b267ca30f9784d7dbabcb8a07b08e"
  },
  "Q7619863": {
    "id": "Q7619863",
    "identity": {
      "title": "Stopping at Slowyear",
      "author": "弗雷德里克·波爾"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[48]",
    "source_spatial_record_sha256": "9b3386590394f1ffaacdb86ac7b1a7cbeee57901341dbd7b682c60e74920b813",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本作概要明确货船抵达Slowyear后面对当地惩罚习俗与羊源疾病，限Slowyear行星；星际货船类型不代替概要未说明的其他停靠星系。"
    },
    "spatial_basis_mode": "saved_explicit_setting",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "28da5e963be3889f292d7679d98eefabee051930e9f6b0d89cc50e4154ae446f",
      "facet_bases_sha256": "38528a3c301cf6699a5fd3609c4b2f245e94662d5c389eae9f3f0242d8ba52f4",
      "source_scope_sha256": "3cd606215c6bb733f596786bf427114d7d00147f8161619ab60219a37db5d21f"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": true,
      "actual_search_performed": true,
      "original_full_text_read": true,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "86aeae4a069447ebf395b6430faeff5326964cb94a45f12187f6a26ffde088e2",
    "source_log_record_sha256": "33c95712720c39f6192ffd7652b82ebb6a8c896b51ce7a9cbc6725225c9a04ec",
    "wholeprior_sha256": "52e5e3b105471f36cd7414742880a3c21ffb76c7a9fd49a4035a1a320162c667"
  },
  "Q7805574": {
    "id": "Q7805574",
    "identity": {
      "title": "Timelike Infinity",
      "author": "斯蒂芬·巴科斯特"
    },
    "reviewer": "global_history",
    "source_spatial_file": "work/evidence/early-published-spatial-selection7-round6.json",
    "source_spatial_file_sha256": "ff1320f3c6279041c8d69912a9f629fb146912fcb0b30fb5812f31c3f1f2b962",
    "source_spatial_record_pointer": "$.records[49]",
    "source_spatial_record_sha256": "35659ed32b12e0e393d81081eba20a84d8432a0de567cbf492d2d6557c2f356d",
    "reviewed_spatial_fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [
        "earth"
      ],
      "spatial_rationale": "准确Timelike Infinity单书知识限定Poole的太阳系时间通道工程与未来被Qax占领的地球，限这些实际身体场景；跨时间和量子激进目标不直接增加abstract或cosmic空间。"
    },
    "spatial_basis_mode": "exact_existing_knowledge",
    "actual_semantic_read_scope": [
      "all_three_spatial_values",
      "full_source_scope",
      "original_issue",
      "all_original_facet_bases"
    ],
    "basis_digest": {
      "issue_sha256": "b7d88e288176129783619450364a638297ac9ba248428114b9e169fe4e64d65b",
      "facet_bases_sha256": "940233b06468fe15129953b440aaa25998aa50dff1a8d552a73300c609c35bbd",
      "source_scope_sha256": "7935833cdf1ed6e7f21947b138a22adab4cdad2715b60a120101b40814a894e7"
    },
    "result": "accepted_conservative_navigation_unverified",
    "reason": "限原单篇/本卷/具名成员或导览范围；地点来源与existing knowledge模式不升独立查读，计划/来源/时间背景不扩成已抵达的空间尺度。",
    "original_counter_presence_exact": {
      "actual_search_count": false,
      "actual_query_count": false,
      "actual_open_count": false,
      "actual_open_attempt_count": false,
      "actual_content_source_read": false,
      "actual_search_performed": false,
      "original_full_text_read": false,
      "original_full_text_read_count": false,
      "original_fulltext_read_count": false
    },
    "original_counter_fields_exact": {},
    "original_cache_declarations_exact": {},
    "original_ownership_exact": {
      "original_ownership_file": null,
      "original_ownership_sha256": null,
      "original_ownership_index": null
    },
    "source_analysis_record_sha256": "d324507c0a5924f2c4d0dc725ae37dc6458b5db731d50c1b402080753db03440",
    "source_log_record_sha256": null,
    "wholeprior_sha256": "74234e98afe7498fb5daf1f36ac2d78acc339464f950703b8c019892f982b90b"
  },
  "Q131376801": {
    "id": "Q131376801",
    "identity": {
      "title": "The Fleet of Stars",
      "author": "波尔·安德森"
    },
    "selection_index": 200,
    "original_spatial_record_sha256": "a82eed492d6952a6d49b4cf5e402b6c75ba232ef9a53e47a012f2cbfd826d5f3",
    "original_analysis_archive": "research/issue-input-snapshots/modern-recent-round32.json",
    "original_analysis_file_sha256": "5de29e4c3a43de8fd82ed9cbf04987f2d6c6a6510333cac88a05483fe5fd0047",
    "original_analysis_record_sha256": "ecfc7cd0344765266fd645cbe1e9a1c28485a443b6277647fafc088c49f6a6a2",
    "original_log_archive": "research/issue-input-snapshots/modern-recent-round32-log.json",
    "original_log_file_sha256": "2feecce3eab1b8cd20acfffc284bbdb57ee6181b2f99c6e2791b5a125eebb51c",
    "original_log_record_sha256": "e8f5dc7388863e8e1ed3a7a40416822a6712ed41d5ca445f89f0fcf8cdb4eac4",
    "original_history_sha256": "be21dc97aef2d20f463efb1d401097ab7c661d2d213ab2a0166cf23ea81bda45",
    "fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本卷评论明确Guthrie进入太阳系调查Teramind与相关引力透镜，限这条已述太阳系活动；控制者伪造的远方机器文明不作为真实到访场所。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "太阳系阶段，不把伪造的远方机器文明作实访",
    "source_mode_adapter_record_sha256": null
  },
  "Q131376803": {
    "id": "Q131376803",
    "identity": {
      "title": "Deception Well",
      "author": "Linda Nagata"
    },
    "selection_index": 201,
    "original_spatial_record_sha256": "b0905d3f67922460cad860883e4f898873201670ef6449b2f639ef51f73b2cd5",
    "original_analysis_archive": "research/issues-since-1980-round12.json",
    "original_analysis_file_sha256": "96ed2e0ba4a84c4dda0beeb7786353357c556b7b8bda8954b18a2b9df567a211",
    "original_analysis_record_sha256": "a0b76e9e85c8ae5e6832d9087e891a650a6a945f0cc0ae5754a0352b929b94c6",
    "original_log_archive": null,
    "original_log_file_sha256": null,
    "original_log_record_sha256": null,
    "original_history_sha256": "72b1b9ad64d5f2cb263e23f4be866cfe2d8b1379fdf944ce274c9b0e82dbb96e",
    "fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本卷材料明确Deception Well地表及Silk空间电梯的夺取、阻止下降与调查，限此虚构行星系统；Chenzeme追击与共融承诺不补未见的恒星间沿途。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "Deception Well本地与升降设施，不外推追踪航程",
    "source_mode_adapter_record_sha256": null
  },
  "Q133800124": {
    "id": "Q133800124",
    "identity": {
      "title": "Au-delà de nulle part",
      "author": "贾克·阿达利"
    },
    "selection_index": 202,
    "original_spatial_record_sha256": "a34e0ab655104a090a58b3eee3af808897ef88f3ddc9d2353aff8a7be7f3f79a",
    "original_analysis_archive": "research/issue-input-snapshots/early-recent-round30.json",
    "original_analysis_file_sha256": "2f237d0eea6a6bb109c636390c1db971960efcac3dc7e3ea95b7a120361bd15c",
    "original_analysis_record_sha256": "52790e91acfefa240a1748019d36c05a04f406081494bd622707e0d8a38284b9",
    "original_log_archive": "research/issue-input-snapshots/early-recent-round30-log.json",
    "original_log_file_sha256": "092e951e66f03de82dfd41cb7b5b72f30fe6f521ffbc85729387cb0ee2ac044d",
    "original_log_record_sha256": "b785a112dacb5cc9437ac35401e8458354dd72f868ec538d4e6996dfe1bb55aa",
    "original_history_sha256": "71d67f9fe57e3c4d743551b1328c1c2f49c3782cf6e12db5e455d1880595569d",
    "fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本书材料明确年轻美国人追索Hopi知识的地球任务，限收到网上求救后这段行动；消息自称来自2126年，不据此称人物已实际赴未来或远空。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "Hopi寻找阶段在地球，2126信号不等于时间旅行",
    "source_mode_adapter_record_sha256": null
  },
  "Q29884044": {
    "id": "Q29884044",
    "identity": {
      "title": "Все, способные держать оружие…",
      "author": "Andrey Lazarchuk"
    },
    "selection_index": 203,
    "original_spatial_record_sha256": "f82a8ebf2d30970710e188a42ce46a66001da83680f32ec46ae8590960dc3940",
    "original_analysis_archive": "research/issue-input-snapshots/modern-recent-round32.json",
    "original_analysis_file_sha256": "5de29e4c3a43de8fd82ed9cbf04987f2d6c6a6510333cac88a05483fe5fd0047",
    "original_analysis_record_sha256": "896acb2a57b2b560d8984de6403389036937a13861fefa414ff7b128101d3b00",
    "original_log_archive": "research/issue-input-snapshots/modern-recent-round32-log.json",
    "original_log_file_sha256": "2feecce3eab1b8cd20acfffc284bbdb57ee6181b2f99c6e2791b5a125eebb51c",
    "original_log_record_sha256": "08ad05103dfe6b9a8283d2db62b17c82e75f6c048e0ec3f1257caaf76f64b037",
    "original_history_sha256": "0812ecb3a15a054964f9934140c072ed70c57823bd03d1beb839a4b2c4a393c5",
    "fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本书材料明确德国战胜苏联的另类地球历史与三代家庭卷入的政治行动；来自未来的移民及改写历史不单独证明另有空间平行世界。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "三代政治历史不改变地球空间",
    "source_mode_adapter_record_sha256": null
  },
  "Q3201692": {
    "id": "Q3201692",
    "identity": {
      "title": "The Neutronium Alchemist",
      "author": "彼德·漢彌頓"
    },
    "selection_index": 204,
    "original_spatial_record_sha256": "7db7476f4a580c47077496a3bd9d3c1d6a40b8896f22bd84dc389d15e30a255c",
    "original_analysis_archive": "research/issues-since-1980-round6.json",
    "original_analysis_file_sha256": "74f3afecda57889c7e97c8e97629243bb998c1f8538bb058bc268822fc2d661a",
    "original_analysis_record_sha256": "cb1bbaa55a23255668917ec4da872a9124e06562ceea5d986b2a79e47634c872",
    "original_log_archive": null,
    "original_log_file_sha256": null,
    "original_log_record_sha256": null,
    "original_history_sha256": "b092fcc69d2c98f4a179244e9c0697e7d65cfacb95d77380c37546012c05affe",
    "fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确The Neutronium Alchemist本卷知识限定Joshua、Mzu等在共同体不同恒星世界之间追寻武器与应对附身的行动；毁星能力不证明宇宙或全银河被遍历。"
    },
    "effective_spatial_basis_mode": "exact_existing_knowledge",
    "status": "accept_scoped_unverified",
    "semantic_note": "Commonwealth多恒星世界，不由联盟规模推全银河",
    "source_mode_adapter_record_sha256": null
  },
  "Q3222051": {
    "id": "Q3222051",
    "identity": {
      "title": "Shards of Alderaan",
      "author": "凱文·詹姆士·安德森 / 蕾貝卡·莫斯塔"
    },
    "selection_index": 205,
    "original_spatial_record_sha256": "726b95266a10da46cb4c36efcac64641dd5745f9fa6dae2916c6a13aeeecf004",
    "original_analysis_archive": "research/issue-input-snapshots/modern-recent-round14.json",
    "original_analysis_file_sha256": "9ee92daff8b34fa656126dee246ed5eadefd52576528aabdd08bc0996d985bb2",
    "original_analysis_record_sha256": "537495bd4fddc876ea440e68bd82c3a269923a1c264d62b22c088e4b74daae53",
    "original_log_archive": "research/issue-input-snapshots/modern-recent-round14-log.json",
    "original_log_file_sha256": "2b16aa45a405b90ad0d26701898fd140f59509d5b1552e7a11c19b80af09a82c",
    "original_log_record_sha256": "352ffa6754a79e81c599699dd938f51ade5ed5af3d1aec7279b6b6545402e5d6",
    "original_history_sha256": "f1eab198115340ed665c965f1fbce929da151f957dfd25404d08b3100412bcb9",
    "fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本卷材料明确Jason与Jaina前往被毁Alderaan取碎片，限原行星遗迹所在的局部空间；碎片代表母亲故乡，不直接增加她在旧Alderaan的完整生活场景。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "Alderaan残骸限定，不继承整个系列路线",
    "source_mode_adapter_record_sha256": null
  },
  "Q3854497": {
    "id": "Q3854497",
    "identity": {
      "title": "Memorie di un cuoco d'astronave",
      "author": "Massimo Mongai"
    },
    "selection_index": 206,
    "original_spatial_record_sha256": "9f4f2415166c630313889c91d5d69c824421fc6d02157ef6a59cff5ecca8e129",
    "original_analysis_archive": "research/issue-input-snapshots/global-recent-round32.json",
    "original_analysis_file_sha256": "a294931a9fe7f2341f88863496a0b91b96b33d88300045d3737e883a6b8f193c",
    "original_analysis_record_sha256": "557938eb765c5f95f329ec42e8cad7e9eeba9c4000fbadcc516be92b54a65a37",
    "original_log_archive": "research/issue-input-snapshots/global-recent-round32-log.json",
    "original_log_file_sha256": "065fccf3c1a2a4493fda54eefdb23b11aa5b1df05ec756c19856a214c676ad04",
    "original_log_record_sha256": "af06c15006dfc494a6b3eaa68b7673d619c0e250cca2a4feb6142f79d3edde55",
    "original_history_sha256": "289b61fa662a956f380706bfa9d38d6d1cfe514875b47e3445810623f773f3c8",
    "fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确Memorie di un cuoco d’astronave单书知识限定Rudy随星舰接触不同恒星世界与物种的厨师工作；不凭菜谱名称补特定星球，也不借后续厨师作品行程。"
    },
    "effective_spatial_basis_mode": "exact_existing_knowledge",
    "status": "accept_scoped_unverified",
    "semantic_note": "Rudy航船与异星回忆，准确既有知识待核",
    "source_mode_adapter_record_sha256": null
  },
  "Q5247733": {
    "id": "Q5247733",
    "identity": {
      "title": "Deathstalker War",
      "author": "賽門·葛林"
    },
    "selection_index": 207,
    "original_spatial_record_sha256": "2f4bb28d6700ba490d4ae4dc2e288b372cbbde05353c287e84327966044f34fb",
    "original_analysis_archive": "research/issue-input-snapshots/quick-retry2-modern-round3.json",
    "original_analysis_file_sha256": "e35d2e7731f201a6d1c73bd5b91fb6a1461d557f5ba7974f5f8f96f0710f9108",
    "original_analysis_record_sha256": "d95e63040a2e917392d8b4bc78482d4e15f6fc635e1539535afce3a47ed527ab",
    "original_log_archive": "research/issue-input-snapshots/quick-retry2-modern-round3-log.json",
    "original_log_file_sha256": "f1c975bbf37312c848a20e84999166dc2b63db3f383a9cc283175683d99859af",
    "original_log_record_sha256": "fe8c30bda4277fabcd27e3a780d358864b5907ca526637c266646fa010d05ba2",
    "original_history_sha256": "c43445160b5c27a6163b498efe0993b5905262cf8d64e6a19c4ffb80da068b3c",
    "fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "本卷出版社明确战争行动由Mistworld、Virimonde展开至首都Golgotha，限多个已述世界之间的星际行动；女皇的帝国领土不等于角色全域实到。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "Mistworld/Virimonde/Golgotha具名多星世界",
    "source_mode_adapter_record_sha256": null
  },
  "Q54807279": {
    "id": "Q54807279",
    "identity": {
      "title": "First Contact",
      "author": "Jeanne Kalogridis / J.M. Dillard"
    },
    "selection_index": 208,
    "original_spatial_record_sha256": "0d54b1f9fa63509019643157d4d5a17065baf7accd39ea5aad930084f85b365f",
    "original_analysis_archive": "research/issue-input-snapshots/modern-recent-round33.json",
    "original_analysis_file_sha256": "933a28da7c364cf9fa15b69cd7f9232dd5be68925785c3a6d273ffd3909dc9cd",
    "original_analysis_record_sha256": "e067c0119df6623bba6c4f627c093eebb353fd3937a631cb241c2e11fe63377b",
    "original_log_archive": "research/issue-input-snapshots/modern-recent-round33-log.json",
    "original_log_file_sha256": "5cdfc803b51628a91f28d995daca7d752a1675c8d4ccbdcc2251e51689722716",
    "original_log_record_sha256": "1801cb741867e77f24afe67d9c9188d22ce41e7defd6bbe5a64e1767f44328bb",
    "original_history_sha256": "0d686db4c60fabaa7d3f2f331cb90957cf790b4b877f94d1f652c179af076f6f",
    "fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [
        "planetary"
      ],
      "spatial_rationale": "准确1996电影的First Contact小说化知识限2063地球Montana首飞准备与近地轨道的Borg冲突；时间回溯不自行产生abstract舞台，不套其他Star Trek首接触故事。"
    },
    "effective_spatial_basis_mode": "exact_existing_knowledge",
    "status": "accept_scoped_unverified",
    "semantic_note": "2063地球与近地Borg冲突，小说共同前提既有知识",
    "source_mode_adapter_record_sha256": null
  },
  "Q130738105": {
    "id": "Q130738105",
    "identity": {
      "title": "Abandon in Place",
      "author": "Jerry Oltion"
    },
    "selection_index": 209,
    "original_spatial_record_sha256": "d40cd30da96127122beb360749cbffbf464b2b5be5f8d9820017c577928897a9",
    "original_analysis_archive": "research/issue-input-snapshots/early-recent-round31.json",
    "original_analysis_file_sha256": "4e4c202fb8e5fc00a2b51a0f318b47125d22576d7a5dc520deb3929ce066a4d4",
    "original_analysis_record_sha256": "7b0ea7846dc11a863721e6f32288faa4e8cb565012f1c600ca73ad59b3e7ada8",
    "original_log_archive": "research/issue-input-snapshots/early-recent-round31-log.json",
    "original_log_file_sha256": "0a6eb08f716b7592a4598f3ad35fd00bddf7a6565ffc261cd995ab59a62aba88",
    "original_log_record_sha256": "b0bc9cabac8577ef8695ea80c06f2e12c5cbe518e2f6b0534bf59add992f6a08",
    "original_history_sha256": "c707569348e9f3be386e911593396c058335ec35e5de496194850b684cc8148b",
    "fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [
        "earth"
      ],
      "spatial_rationale": "仅定位Abandon in Place原中篇所对应的发射场、幽灵Saturn V入轨及Rick改向月球的已述阶段；不补后来扩写长篇的结果，赴月方向不等于已抵达。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "原中篇已述近地轨道/赴月方向；未断言抵达月面",
    "source_mode_adapter_record_sha256": null
  },
  "Q131461555": {
    "id": "Q131461555",
    "identity": {
      "title": "Primrose and Thorn",
      "author": "Bud Sparhawk"
    },
    "selection_index": 210,
    "original_spatial_record_sha256": "66093b66c48ecac3b3bf16faf00893497f083f81fdc138936c3fc7e54471ee65",
    "original_analysis_archive": "research/issue-input-snapshots/modern-recent-round33.json",
    "original_analysis_file_sha256": "933a28da7c364cf9fa15b69cd7f9232dd5be68925785c3a6d273ffd3909dc9cd",
    "original_analysis_record_sha256": "6666f2bfcbe13e895cc342def02ca5f11aad8346508b0df281069606e1344737",
    "original_log_archive": "research/issue-input-snapshots/modern-recent-round33-log.json",
    "original_log_file_sha256": "5cdfc803b51628a91f28d995daca7d752a1675c8d4ccbdcc2251e51689722716",
    "original_log_record_sha256": "8fbb960a7686c4b593d8d6d97bd112bc58ce882453a07a9409d7649e16d8a979",
    "original_history_sha256": "8e92c633d2c004dc70ab0b68034308dc091406e30865a14d2bd10e9077191530",
    "fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "作者对Primrose and Thorn原篇明确木星大气帆船竞赛与受损航手滞留，限木星当地；后续救援篇没有在这里作为已读或已经实施的结局。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "木星大气帆船阶段，不借后续Rescue",
    "source_mode_adapter_record_sha256": null
  },
  "Q131461643": {
    "id": "Q131461643",
    "identity": {
      "title": "Fugue on a Sunken Continent",
      "author": "G. David Nordley"
    },
    "selection_index": 211,
    "original_spatial_record_sha256": "70d59889f7a87eb4993faec65186038dcc813cabcbd3ff786b7801e53b8e7728",
    "original_analysis_archive": "research/issue-input-snapshots/quick-retry-modern-round6.json",
    "original_analysis_file_sha256": "e562ae5e98280f2e0f06e75be5cfefe2e1165d2fe1ac91503295e726911b7a36",
    "original_analysis_record_sha256": "67e053f50bef202c62ed2688c221ea7b0cacd758cd98edebaca097723af9b9db",
    "original_log_archive": "research/issue-input-snapshots/quick-retry-modern-round6-log.json",
    "original_log_file_sha256": "641036183cee1843b2469514bcda13ace1524bcd66202f6f62171f6b0ed9bef3",
    "original_log_record_sha256": "92929dfc2dc3e1c1d699caef0342763965d356f4e756d261a31c19f7db7e4195",
    "original_history_sha256": "9ffe0e3b0655784d3a92420e5d22c3df9e63feb3e6fb71c260ff1df0b46d0375",
    "fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本篇评论明确Mastine与同伴在外星世界观光并发现当地袭击计划，限这一虚构行星；长途旅行未给跨恒星距离，不凭旅游职业扩大路线。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "Mastine本地游客与冲突，不借母文化移动",
    "source_mode_adapter_record_sha256": null
  },
  "Q134612524": {
    "id": "Q134612524",
    "identity": {
      "title": "Wildside",
      "author": "史蒂芬·古德"
    },
    "selection_index": 212,
    "original_spatial_record_sha256": "32860b8de64814bb505a800331d9c0c7b8183656287e819758fb58875e5ff941",
    "original_analysis_archive": "research/issue-input-snapshots/root-fast-round13.json",
    "original_analysis_file_sha256": "671c6a76fae33cba713208ebf6a52e3a55ddb1c63ef132e3552fe5b0c22f0104",
    "original_analysis_record_sha256": "81734e80bac9248afba9f1a631f538d97c67d4a4c83da81be8bb86d1963aa292",
    "original_log_archive": "research/issue-input-snapshots/root-fast-round13-log.json",
    "original_log_file_sha256": "1a0f614cdd6d6d902c5b4c286081ebf8d81c7b3ecde8870c5deb5c88d2fb76c1",
    "original_log_record_sha256": "777959e8a7b4e3882b4f5326f340c3a2b7d9e7a44280d8236aa0d588fe8ea27c",
    "original_history_sha256": "a9b24e32d63d7e273e753dc7a6bb2be9ba1ef50b4ecf7c09ac010dbcc9c4281a",
    "fields": {
      "spatial_primary": "abstract",
      "spatial_secondary": [
        "earth"
      ],
      "spatial_rationale": "本作材料明确Charlie等通过入口进入没有人类的平行地球并利用资源，限这两个地球现实之间的实际关系；未知入口安全与生态风险不补更多世界。"
    },
    "effective_spatial_basis_mode": "exact_existing_knowledge",
    "status": "accept_scoped_unverified",
    "semantic_note": "实越平行地球门；不是只因生态差异赋abstract",
    "source_mode_adapter_record_sha256": null
  },
  "Q18152780": {
    "id": "Q18152780",
    "identity": {
      "title": "Mosaic",
      "author": "杰里·泰勒"
    },
    "selection_index": 213,
    "original_spatial_record_sha256": "318d3f6129d1ab010b7db21d0e1df6f9dface7b3f1141de778acce7493b66237",
    "original_analysis_archive": "research/issue-input-snapshots/known-year-global-round3.json",
    "original_analysis_file_sha256": "2655f3327569ab8286bda2b63b28cb25f18907e711361ea75e45af9318535054",
    "original_analysis_record_sha256": "4853fef23c345bbe2314c26af09be44147a976f5525d29e5575f308624c776e3",
    "original_log_archive": "research/issue-input-snapshots/known-year-global-round3-log.json",
    "original_log_file_sha256": "9f0adf259b385bd57ed4fff4f4f5a9345f3b0fa56eba89da14a6b019e0876224",
    "original_log_record_sha256": "c258f835016235a6cf1811e9fef06cd8c22804efde05744487664230c8c8a9c9",
    "original_history_sha256": "ea8a6bfcfed0e667d4403fe64d5e00ad7465d0f4945a51a7d561a92a8eb5cc9d",
    "fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位Mosaic当前危机中Tuvok登陆队被困的荒野行星与附近舰船交战；Janeway不同阶段的回顾保持原范围，不用Voyager全系列路线补星区。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "Tuvok野外星球与当次Voyager危机，不借全部航程",
    "source_mode_adapter_record_sha256": null
  },
  "Q19947585": {
    "id": "Q19947585",
    "identity": {
      "title": "Myst: The Book of Ti'Ana",
      "author": "兰德·米勒"
    },
    "selection_index": 214,
    "original_spatial_record_sha256": "9f4cf9f487ba19b388d53ab9b4b4dbf621b24b8f4f3d0bc628b15d130d5ea299",
    "original_analysis_archive": "research/issue-input-snapshots/global-recent-round33.json",
    "original_analysis_file_sha256": "e96139b6d9a920a5da4426b9da3ecf45b29e92bd24e432ecb153f662b6c6ef3a",
    "original_analysis_record_sha256": "6435e96ecd02874b706943c53df14e841e2a3ee47a7246baa0aaa1680e00ca30",
    "original_log_archive": "research/issue-input-snapshots/global-recent-round33-log.json",
    "original_log_file_sha256": "480add4d9cfd58935fdea07645f49b31616a732bdcca6dbfff6fe451f0504edc",
    "original_log_record_sha256": "5e47641343c4768609054773895787f51153bdf21011a8fda65df7c8dde012e4",
    "original_history_sha256": "00c386b9ee820d13e2cf79dc7c5fcdddaa7b0f96b761233485deb467231344ce",
    "fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "准确The Book of Ti’Ana本卷知识限定Anna由地表进入同一地球地下D’ni文明的经历及当地冲突；D’ni连接其他Ages的能力不自动成为这条限定关系中已述的全世界行程。"
    },
    "effective_spatial_basis_mode": "exact_existing_knowledge",
    "status": "accept_scoped_unverified",
    "semantic_note": "Anna地表/地下Dni阶段，连接Ages能力非已述到访",
    "source_mode_adapter_record_sha256": null
  },
  "Q20724576": {
    "id": "Q20724576",
    "identity": {
      "title": "Expansion",
      "author": "彼德·漢彌頓"
    },
    "selection_index": 215,
    "original_spatial_record_sha256": "61b9b8a2b37b055d46edbbaf634f9fcf340ba4b2982ed5fe0608f6997fdfc281",
    "original_analysis_archive": "research/issue-input-snapshots/quick-retry-modern-round7.json",
    "original_analysis_file_sha256": "a5fbea852910ea49a4a837bfbfb2b3528e92904bd69b9d23f88202593da1d34e",
    "original_analysis_record_sha256": "79cbf2172fe136424b6f4fffb484643f799ddc63f42034a409db9ae8388c209a",
    "original_log_archive": "research/issue-input-snapshots/quick-retry-modern-round7-log.json",
    "original_log_file_sha256": "0998fc0e8d92bd5749d2aa82ba41d9a53a9015be9354e74b558ce6dced7533fe",
    "original_log_record_sha256": "8c3dfb6c96c11e046f4a8159841725e3da8844218cfaf4d449476d1ccac41a93",
    "original_history_sha256": "56439c693b6e1e4fbdda4771339c68613e894f0391a4682c700238ad2964494f",
    "fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位Expansion这一分卷材料明确Lalonde沦陷后当地士兵、牧师与记者求生的阶段；古代智慧种族历史与附身扩张的预期不补已到访的其他恒星。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "法国拆卷Lalonde冲突，不复制完整英语三部曲",
    "source_mode_adapter_record_sha256": null
  },
  "Q21893619": {
    "id": "Q21893619",
    "identity": {
      "title": "Chute dans le réel",
      "author": "羅伯特·西爾柏格"
    },
    "selection_index": 216,
    "original_spatial_record_sha256": "ad77a0862008eda34bfaaf75596d80661fb6868344fefbac99cca639ee584983",
    "original_analysis_archive": "research/issue-input-snapshots/modern-recent-round33.json",
    "original_analysis_file_sha256": "933a28da7c364cf9fa15b69cd7f9232dd5be68925785c3a6d273ffd3909dc9cd",
    "original_analysis_record_sha256": "e57cc80d4d6a0584e5ec0b095433faa6e024764c768900d39a8d61a226e3c202",
    "original_log_archive": "research/issue-input-snapshots/modern-recent-round33-log.json",
    "original_log_file_sha256": "5cdfc803b51628a91f28d995daca7d752a1675c8d4ccbdcc2251e51689722716",
    "original_log_record_sha256": "22e7fa1042d005455e24a9354e73fbe30a546c5fabcb8d812f2424a90c428273",
    "original_history_sha256": "7c24c2f8ce23bf4dab2c10c34b39e2b2fcce42d1c0adc3156d56392abc82e208",
    "fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位Chute dans le réel目录确认的Tower of Glass小说：Krug以人工生命劳动在地球建通信高塔；星际信号是工程目标，不称已经抵达发信文明或全合辑共用场所。"
    },
    "effective_spatial_basis_mode": "exact_existing_knowledge",
    "status": "accept_scoped_unverified",
    "semantic_note": "合集仅The Tower of Glass地球塔；宇宙通信非到访",
    "source_mode_adapter_record_sha256": null
  },
  "Q2298506": {
    "id": "Q2298506",
    "identity": {
      "title": "Solarstation",
      "author": "安德里亚斯·埃施巴赫"
    },
    "selection_index": 217,
    "original_spatial_record_sha256": "20fd858ca7dd65a88590d2750cc4e20a17e0ec3a2edeffe024d0a6c624df3afe",
    "original_analysis_archive": "research/issues-source-reading-round2.json",
    "original_analysis_file_sha256": "8dd22264f944b332800a15e7f2c14ef7b67e6694675f04da6967daf9f7c72c85",
    "original_analysis_record_sha256": "5e5430adb0d2450c205a538699423015ab89f944d335e79a83af1572526e3456",
    "original_log_archive": null,
    "original_log_file_sha256": null,
    "original_log_record_sha256": null,
    "original_history_sha256": "74234e98afe7498fb5daf1f36ac2d78acc339464f950703b8c019892f982b90b",
    "fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本作材料明确向地球输送能源的NIPPON轨道站、停机与未授权对接，限近地轨道设施；侵入者起源未知，不增加恒星际线路。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "Nippon太阳能近地空间站；未知入侵者来源不补",
    "source_mode_adapter_record_sha256": null
  },
  "Q2420936": {
    "id": "Q2420936",
    "identity": {
      "title": "La photo",
      "author": "作者未知"
    },
    "selection_index": 218,
    "original_spatial_record_sha256": "ac4c75352c15b72e16988ae0df0620cf4a23caf4e0acfe1b1c1d23c3fa1631da",
    "original_analysis_archive": "research/issue-input-snapshots/quick-retry-global-round20.json",
    "original_analysis_file_sha256": "879d61f85c3898242397f3776348f77980f7accf97b5cbb415bc5a8cad29e630",
    "original_analysis_record_sha256": "8c6d30102688a50b366af3ec1f389632223abf627b20414f810ef482e94a2826",
    "original_log_archive": "research/issue-input-snapshots/quick-retry-global-round20-log.json",
    "original_log_file_sha256": "6bbae955e0cef2064739aa6ffc0781249c37dead3780e9aac6803980cdad9998",
    "original_log_record_sha256": "9a3a87a53136315d8e295437d49054fb9b6f24c1828ab2b3109d37e62b11e8b2",
    "original_history_sha256": "9cf68ae72762ab480da742e00e40f99fac009cb40f8c49290bceb90f758a39e7",
    "fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "准确Aldebaran第三册La Photo知识限定Mark与Kim在殖民行星Aldebaran的越狱后行动和先锋博物馆；照片里的旧巴黎是历史证据，不称两人已去地球，也不借其他册行程。"
    },
    "effective_spatial_basis_mode": "exact_existing_knowledge",
    "status": "accept_scoped_unverified",
    "semantic_note": "Aldebaran第3卷博物馆/监禁，旧巴黎照片非地球实访",
    "source_mode_adapter_record_sha256": null
  },
  "Q2447953": {
    "id": "Q2447953",
    "identity": {
      "title": "枪贩",
      "author": "休·劳瑞"
    },
    "selection_index": 219,
    "original_spatial_record_sha256": "8e027434f6ec0edd0f73827e6eb132ab7fb38a68cc81130afe2b872aacf73c45",
    "original_analysis_archive": "research/issue-input-snapshots/early-recent-round31.json",
    "original_analysis_file_sha256": "4e4c202fb8e5fc00a2b51a0f318b47125d22576d7a5dc520deb3929ce066a4d4",
    "original_analysis_record_sha256": "eb36e61c1f64fcd6d65b6922ede1660aa85e056c5d92b8e929ed2f2b541a221c",
    "original_log_archive": "research/issue-input-snapshots/early-recent-round31-log.json",
    "original_log_file_sha256": "0a6eb08f716b7592a4598f3ad35fd00bddf7a6565ffc261cd995ab59a62aba88",
    "original_log_record_sha256": "c6f6efef63f00ff8eea4e9a7a7e25553b27e4c288015cdb10265c6a7aeeb5bd3",
    "original_history_sha256": "be2b96bf531adb65d56592fb1d3a7211df149272a08455af4f142f70daa928a5",
    "fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本书材料明确Lang警告美国工业家并卷入国际军火阴谋，限地球国家与军事交易环境；新型武器和宣传计划不补太空行动。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "军火公司地球政治行动，武器技术非星际路线",
    "source_mode_adapter_record_sha256": null
  },
  "Q3453308": {
    "id": "Q3453308",
    "identity": {
      "title": "The Reality Dysfunction",
      "author": "彼德·漢彌頓"
    },
    "selection_index": 220,
    "original_spatial_record_sha256": "3cc2c5882f1e569224210d816fdb82aad7b19f73e96e9f386200a70a5b0bf7bf",
    "original_analysis_archive": "research/issues-since-1980-round6.json",
    "original_analysis_file_sha256": "74f3afecda57889c7e97c8e97629243bb998c1f8538bb058bc268822fc2d661a",
    "original_analysis_record_sha256": "6c83aefb6630c604543e4b19b9faee098ba3b5dc8bb4a4279b49eb3a36c9757f",
    "original_log_archive": null,
    "original_log_file_sha256": null,
    "original_log_record_sha256": null,
    "original_history_sha256": "b6d436920bf26a469b9b9eb1904df222172d691b5072e8e4205329a4f79f5c9e",
    "fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确The Reality Dysfunction首卷知识限定Lalonde等殖民世界与不同恒星之间的生物飞船、人类航行和危机传播；附身实体与死者来处不直接作角色实到的abstract或cosmic场所。"
    },
    "effective_spatial_basis_mode": "exact_existing_knowledge",
    "status": "accept_scoped_unverified",
    "semantic_note": "本卷具名星际航船与世界；死者回归不自动abstract",
    "source_mode_adapter_record_sha256": null
  },
  "Q3563298": {
    "id": "Q3563298",
    "identity": {
      "title": "Voyage",
      "author": "斯蒂芬·巴科斯特"
    },
    "selection_index": 221,
    "original_spatial_record_sha256": "f37d87377d9bedfc2fe6f35d795ac6da2c22d7139b17b4b25e76b4efade68309",
    "original_analysis_archive": "research/issues-since-1980-round5.json",
    "original_analysis_file_sha256": "680ed52c7bdf6d194a9e6d04223a01c32f26a61f2bc6ac77d1f8a7bbb52bbb74",
    "original_analysis_record_sha256": "8898f261033a446294b5c8068c673d6ba23e04d9e7b1a23bbd3b5a88f9645103",
    "original_log_archive": null,
    "original_log_file_sha256": null,
    "original_log_record_sha256": null,
    "original_history_sha256": "74234e98afe7498fb5daf1f36ac2d78acc339464f950703b8c019892f982b90b",
    "fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [
        "earth"
      ],
      "spatial_rationale": "准确Voyage小说知识限定另类NASA制度发展的地球准备与实际1986火星远征；只改变航天历史不构成空间平行世界，不套同名其他小说。"
    },
    "effective_spatial_basis_mode": "exact_existing_knowledge",
    "status": "accept_scoped_unverified",
    "semantic_note": "替代NASA火星航程，不因另类历史作abstract",
    "source_mode_adapter_record_sha256": null
  },
  "Q43543759": {
    "id": "Q43543759",
    "identity": {
      "title": "The Stone Canal",
      "author": "肯·麦克劳德"
    },
    "selection_index": 222,
    "original_spatial_record_sha256": "9817d5164643be7394e4594d8fc413bd3b5686457a1fa7e397ad668bb4d48697",
    "original_analysis_archive": "research/issues-since-1980-round7.json",
    "original_analysis_file_sha256": "1c1fd8375793074ff38a3a660aa8a2e0adb0f9d3092d7bdc93737a285ddae5e5",
    "original_analysis_record_sha256": "aca45bb65813a7e38d23d7404bf34f987dabf12d706e9ed2eda2ca409d58c32c",
    "original_log_archive": null,
    "original_log_file_sha256": null,
    "original_log_record_sha256": null,
    "original_history_sha256": "4e592b9c8ee837fa9aea0a20f985c9a8f38ddc398797dba0e7864e8bda2efc6d",
    "fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "准确The Stone Canal知识限定克隆Jon、Reid与Dee当前生活的New Mars虚构行星与船城；记忆中的地球历史仍按回忆层级保留，不从克隆与上传自动推abstract。"
    },
    "effective_spatial_basis_mode": "exact_existing_knowledge",
    "status": "accept_scoped_unverified",
    "semantic_note": "New Mars克隆当下与地球记忆；意识连续性非空间",
    "source_mode_adapter_record_sha256": null
  },
  "Q4839827": {
    "id": "Q4839827",
    "identity": {
      "title": "Backwards",
      "author": "Rob Grant"
    },
    "selection_index": 223,
    "original_spatial_record_sha256": "7fc236d4ade5750261984e47bf9ed3b699fe60ab08572f0d4776b539f35d0996",
    "original_analysis_archive": "research/issue-input-snapshots/modern-recent-round33.json",
    "original_analysis_file_sha256": "933a28da7c364cf9fa15b69cd7f9232dd5be68925785c3a6d273ffd3909dc9cd",
    "original_analysis_record_sha256": "400a02bc7772d77573647cacf76ffc0427e9efd838769bfd9e9990778724fd03",
    "original_log_archive": "research/issue-input-snapshots/modern-recent-round33-log.json",
    "original_log_file_sha256": "5cdfc803b51628a91f28d995daca7d752a1675c8d4ccbdcc2251e51689722716",
    "original_log_record_sha256": "6840f92773c950e615fcf5f91d7e3006935faffda6a9bd8f5107e6ddf5e41aa9",
    "original_history_sha256": "418cf5e2eb65f6c9e096b76de5accc16ddd3699d7276be04cf7f77d5aa365c66",
    "fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本小说出版社明确Lister回到时间倒流的地球并面对身体逆向成长，限此地球阶段；时间方向异常不自行构成另一个非通常空间，也不借电视剧同名集细节。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "出版社明示地球逆时间阶段，未借电视全季",
    "source_mode_adapter_record_sha256": null
  },
  "Q4863413": {
    "id": "Q4863413",
    "identity": {
      "title": "Infinity's Shore",
      "author": "大衛·布林"
    },
    "selection_index": 224,
    "original_spatial_record_sha256": "2e181e9add0b4f61b16cac5c69b69e3c391c0e8af3b1a3c7f2e081b749e9aa0b",
    "original_analysis_archive": "research/issue-input-snapshots/early-recent-round31.json",
    "original_analysis_file_sha256": "4e4c202fb8e5fc00a2b51a0f318b47125d22576d7a5dc520deb3929ce066a4d4",
    "original_analysis_record_sha256": "e833dc58651b46ebddc62347dddd8111bdc125ca05f8bf45988c7a16a9c4406d",
    "original_log_archive": "research/issue-input-snapshots/early-recent-round31-log.json",
    "original_log_file_sha256": "0a6eb08f716b7592a4598f3ad35fd00bddf7a6565ffc261cd995ab59a62aba88",
    "original_log_record_sha256": "a94a6bd87ddb7f5aecbc397aae336a1817a03b558b4e1d3fccaac18a3c5686dc",
    "original_history_sha256": "ae12b3bf2ac77d90d9832ae72cc53f1a14b42a61ac4e08e0111dcf2e884b20d0",
    "fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "准确Infinity’s Shore本卷知识限定Jijo行星上非法定居者、来客与Streaker关联的当前冲突；银河导师等级与追索信息的范围不代替本卷实到全银河。"
    },
    "effective_spatial_basis_mode": "exact_existing_knowledge",
    "status": "accept_scoped_unverified",
    "semantic_note": "Jijo当次危机；六族来源不扩实际空间",
    "source_mode_adapter_record_sha256": null
  },
  "Q5057899": {
    "id": "Q5057899",
    "identity": {
      "title": "Celestial Matters",
      "author": "Richard Garfinkle"
    },
    "selection_index": 225,
    "original_spatial_record_sha256": "b6ddc9e4d1be8565e5fbe3f6e3420ae666d911dfffe7f2c41693c9d694418e12",
    "original_analysis_archive": "research/issue-input-snapshots/modern-recent-round33.json",
    "original_analysis_file_sha256": "933a28da7c364cf9fa15b69cd7f9232dd5be68925785c3a6d273ffd3909dc9cd",
    "original_analysis_record_sha256": "9a2300fe128d33d299ade5fb9356b5cb5a758036e6e49af6e380014d0af8a38e",
    "original_log_archive": "research/issue-input-snapshots/modern-recent-round33-log.json",
    "original_log_file_sha256": "5cdfc803b51628a91f28d995daca7d752a1675c8d4ccbdcc2251e51689722716",
    "original_log_record_sha256": "c7dcf23453aa56bff83eb283cc0bc2ce1520678f3c1e906717ec244c9a22de02",
    "original_history_sha256": "89c5be4c70ce780e9f7e6b333f383e318f4b61d40826b8c01a7c9fbe6502a616",
    "fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [
        "earth"
      ],
      "spatial_rationale": "本卷评论明确地心四元素宇宙中Aias建船前往太阳并在航程遇险，限地球及该反事实太阳系统；不同自然法则本身不另算abstract或cosmic舞台。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "反事实地心太阳系航行，世界物理非常规非abstract",
    "source_mode_adapter_record_sha256": null
  },
  "Q5305671": {
    "id": "Q5305671",
    "identity": {
      "title": "Drakon",
      "author": "S. M. Stirling"
    },
    "selection_index": 226,
    "original_spatial_record_sha256": "aa6d2efe16d430c1b3277f2b7b81c89a8beb4c17465360fb44a105facbb22d23",
    "original_analysis_archive": "research/issue-input-snapshots/root-fast-round8.json",
    "original_analysis_file_sha256": "8b594633e68881ec2ed7f5516b92b70dbb239aec6c10cf74dd10e733f699680a",
    "original_analysis_record_sha256": "430b627fad80ae3138e58171163a63f6659e15bd10dc941b599b3cdfd61f084e",
    "original_log_archive": "research/issue-input-snapshots/root-fast-round8-log.json",
    "original_log_file_sha256": "39bb1333f519684f19dce732f058a111a1bbb3a892226b6271c107dda2d2aac8",
    "original_log_record_sha256": "4d535647303ba5374f61de4be2955050354ef37141dab50dbb7d4bab14bfb555",
    "original_history_sha256": "6c64d88aafc0fb593151115fd346baade8fdb6268b65d29fecb5c4f8e61c5c70",
    "fields": {
      "spatial_primary": "abstract",
      "spatial_secondary": [
        "earth"
      ],
      "spatial_rationale": "本书材料明确Gwendolyn由高技术平行地球意外进入侦探所在的地球现实，限这两个现实之间的来客关系；不是仅凭架空历史或技术差异赋abstract。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "Gwendolyn从平行地球来到此地；实跨越非仅技术差",
    "source_mode_adapter_record_sha256": null
  },
  "Q5375581": {
    "id": "Q5375581",
    "identity": {
      "title": "與台伯河相遇",
      "author": "巴兹·奥尔德林 / 約翰·巴恩斯"
    },
    "selection_index": 227,
    "original_spatial_record_sha256": "e5eda0f4c9a64ece7b3cba963c8aed565253dde29490d1d40dd325185fe9a620",
    "original_analysis_archive": "research/issue-input-snapshots/root-fast-round8.json",
    "original_analysis_file_sha256": "8b594633e68881ec2ed7f5516b92b70dbb239aec6c10cf74dd10e733f699680a",
    "original_analysis_record_sha256": "6869c82c80eb6665189532b46b8aa675a1fa392eb89444066d8534ad16df0799",
    "original_log_archive": "research/issue-input-snapshots/root-fast-round8-log.json",
    "original_log_file_sha256": "39bb1333f519684f19dce732f058a111a1bbb3a892226b6271c107dda2d2aac8",
    "original_log_record_sha256": "6c5eab1a53a1ba5c5aae7425443adebc4eb91a002dd1cbfd5231e0f017089f78",
    "original_history_sha256": "7c992413d938fe9288723966de28f7e71fbd59a09d4a2c5c01843f956dd7085b",
    "fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "本书材料明确解谜任务经后代延续到火星城市并向太阳系外探索，限这条已述跨恒星路径；古老来者不是神，神话车辆名称不新增超自然空间。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "多代火星及太阳系外探索限定，不借古访客来路补银河",
    "source_mode_adapter_record_sha256": null
  },
  "Q5700973": {
    "id": "Q5700973",
    "identity": {
      "title": "Heirs of Empire",
      "author": "David Weber"
    },
    "selection_index": 228,
    "original_spatial_record_sha256": "a36b2b1f4aa8fb36abd82bcc1ff6b2e3b46f3ef6d8c52b034821ff10cc5af447",
    "original_analysis_archive": "research/issues-since-1980-round11.json",
    "original_analysis_file_sha256": "9ed8de4411b7bd487d659ae93666968950dcf9276e463dcba35be2e06a3e7e91",
    "original_analysis_record_sha256": "27e5dd916a97c3800da0290d1aecf21c8cdfe029e0c7edf81aded246301c303c",
    "original_log_archive": null,
    "original_log_file_sha256": null,
    "original_log_record_sha256": null,
    "original_history_sha256": "4552e6cba74932b015e5f682ba4c88b47fd070eee1e7ec65d2b2ff97eb35eb51",
    "fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位Heirs of Empire材料明确年轻人被困的远方行星及当地宗教、技术冲突；地球出身与返乡目标不当作这阶段实际地球行动。"
    },
    "effective_spatial_basis_mode": "exact_existing_knowledge",
    "status": "accept_only_with_exact_source_role_adapter",
    "semantic_note": "当地反技术行星阶段依据既有知识；S&S仅身份资料",
    "source_mode_adapter_record_sha256": "c06a45bf2105853311aa6ad9e992e23f9e6855d8c824c32c2bfd2c44720402ee"
  },
  "Q7601479": {
    "id": "Q7601479",
    "identity": {
      "title": "Starborne",
      "author": "羅伯特·西爾柏格"
    },
    "selection_index": 229,
    "original_spatial_record_sha256": "d2cd4141f2c28abf4b13cd0f6c0f5016b9d542b44a9096a8ff186f7284b2de99",
    "original_analysis_archive": "research/issues-source-reading-round9.json",
    "original_analysis_file_sha256": "fe6b87a1dfc84906a677930baadfc16cf51daaead2f299b0cca164bdafa1b9a6",
    "original_analysis_record_sha256": "b91f12d0758f340ff942a18f88446c31e2a1a9e9b0d4bc21f26568259be1902e",
    "original_log_archive": null,
    "original_log_file_sha256": null,
    "original_log_record_sha256": null,
    "original_history_sha256": "64b2ec39a4bec166657d08b1d075b3d2e01197ad270295a7a0ecdf6cc5465882",
    "fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "本作材料明确移民飞船实际到访多个不适合定居的候选星球并持续航行，限该恒星际航程；与地球失联不证明已经获得新家或达到宇宙边界。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "移民航船的两处候选异星阶段，不补最终定居结果",
    "source_mode_adapter_record_sha256": null
  },
  "Q7785669": {
    "id": "Q7785669",
    "identity": {
      "title": "This Day All Gods Die",
      "author": "Stephen R. Donaldson"
    },
    "selection_index": 230,
    "original_spatial_record_sha256": "b434e20878d4ec595b97754be75307b3f09f0d8f676acc64b47f998b9b7f4b7c",
    "original_analysis_archive": "research/issue-input-snapshots/global-recent-round34-corrected.json",
    "original_analysis_file_sha256": "7d7e51941f49f58a39ca06da91578d8fc37d591169f01d7378ecc769801f3392",
    "original_analysis_record_sha256": "74e58ae51735ca1643a8313d7efb7486b643039954214e1d1b4cbf4bc608c0e7",
    "original_log_archive": null,
    "original_log_file_sha256": null,
    "original_log_record_sha256": null,
    "original_history_sha256": "6c530d0c8a4c73155d034dfbd16353beacd3eb20ab498d573d09b5c4ddd8758c",
    "fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确This Day All Gods Die末卷知识限定Trumpet船员在异种控制区与人类星际设施之间求生并向地球方向行动；不称材料中的夺船计划已成功，也不把企业总辖域当全部实际到访。"
    },
    "effective_spatial_basis_mode": "exact_existing_knowledge",
    "status": "accept_scoped_unverified",
    "semantic_note": "本卷Trumpet追踪/外星冲突，未断言成功返回地球",
    "source_mode_adapter_record_sha256": null
  },
  "Q7864589": {
    "id": "Q7864589",
    "identity": {
      "title": "UFOs: The Greatest Stories",
      "author": "作者未知"
    },
    "selection_index": 231,
    "original_spatial_record_sha256": "6329be8f90cc94ed49a44bc5b1745eeff3cd74e0f3111771e0f5cc1069aff3c0",
    "original_analysis_archive": "research/issue-input-snapshots/early-recent-round31.json",
    "original_analysis_file_sha256": "4e4c202fb8e5fc00a2b51a0f318b47125d22576d7a5dc520deb3929ce066a4d4",
    "original_analysis_record_sha256": "a688621b778b0b5abfa5be747f392d08e2ee82a54638697b7dd57182e3e22f5d",
    "original_log_archive": "research/issue-input-snapshots/early-recent-round31-log.json",
    "original_log_file_sha256": "0a6eb08f716b7592a4598f3ad35fd00bddf7a6565ffc261cd995ab59a62aba88",
    "original_log_record_sha256": "1181d177bacb8446f1bdf841b1c08dce888c3d476343147e8b7a35960309fabe",
    "original_history_sha256": "387c0308a182029ff5b97ab4f5d552772f1c5f463683c67184286716cf3d5b02",
    "fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位UFOs: The Greatest Stories所收Asimov成员What is This Thing Called Love?中外星调查者观察地球人类的经历；目录仅证收录，不能把其舞台传播至其他成员。"
    },
    "effective_spatial_basis_mode": "exact_existing_knowledge",
    "status": "accept_scoped_unverified",
    "semantic_note": "合集只What Is This Thing Called Love?；编目只证成员",
    "source_mode_adapter_record_sha256": null
  },
  "Q8036762": {
    "id": "Q8036762",
    "identity": {
      "title": "Worldwar: Upsetting the Balance",
      "author": "哈利·托特達夫"
    },
    "selection_index": 232,
    "original_spatial_record_sha256": "be7c5ef444de2fce4351837b2aa6f61789841fa6b4941e9bb3bae3d4d58ae7bc",
    "original_analysis_archive": "research/issue-input-snapshots/modern-recent-round33.json",
    "original_analysis_file_sha256": "933a28da7c364cf9fa15b69cd7f9232dd5be68925785c3a6d273ffd3909dc9cd",
    "original_analysis_record_sha256": "1045e40c8346aee2dc915125728ff1de2f9c66b467a9cdf8045930a1e30ab50f",
    "original_log_archive": "research/issue-input-snapshots/modern-recent-round33-log.json",
    "original_log_file_sha256": "5cdfc803b51628a91f28d995daca7d752a1675c8d4ccbdcc2251e51689722716",
    "original_log_record_sha256": "32ddb85f3bcb90c31dd3fd40be678c9c365c90dfb1192d5453f550b6c1198a25",
    "original_history_sha256": "4fbe8fd12a27e154b8d9262ab435086b6f06408c742e2008eb44d40a33cd380b",
    "fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位Worldwar第三卷Upsetting the Balance中的美国、德国、中国等地球战线；不借第四卷结局或Race故乡扩舞台，核武规模也不等于宇宙空间。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "Worldwar第3卷地球多地，不复制第4卷结局",
    "source_mode_adapter_record_sha256": null
  },
  "Q8069191": {
    "id": "Q8069191",
    "identity": {
      "title": "Zenon: Girl of the 21st Century",
      "author": "瑪麗蓮·桑德勒"
    },
    "selection_index": 233,
    "original_spatial_record_sha256": "3f43b3b6be71208da2055a67f2b4b20ceb8f8141a7ca0a024ab4cde44c6248b3",
    "original_analysis_archive": "research/issue-input-snapshots/root-fast-round13.json",
    "original_analysis_file_sha256": "671c6a76fae33cba713208ebf6a52e3a55ddb1c63ef132e3552fe5b0c22f0104",
    "original_analysis_record_sha256": "969f46c99adda62f1e3c7c2161acbd7c80e07fb9a898b35dbff9777b22dd7a45",
    "original_log_archive": "research/issue-input-snapshots/root-fast-round13-log.json",
    "original_log_file_sha256": "1a0f614cdd6d6d902c5b4c286081ebf8d81c7b3ecde8870c5deb5c88d2fb76c1",
    "original_log_record_sha256": "f715ebf50f18f0308d8890aa7cf3d8ba39da8512af26600f643338065f8c4792",
    "original_history_sha256": "a2ec4ec02301fe6ab05e12941eb578d343778744e84f5e4df1dd5b06f70d65e9",
    "fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本作材料明确Zenon到地球后面对不同习惯与关系，限实际地球生活阶段；原空间居住地的宿主与轨道没有明确，保留为来源背景。"
    },
    "effective_spatial_basis_mode": "exact_existing_knowledge",
    "status": "accept_scoped_unverified",
    "semantic_note": "原儿童书的地球生活阶段，不借电视改编轨道起源",
    "source_mode_adapter_record_sha256": null
  },
  "Q85808079": {
    "id": "Q85808079",
    "identity": {
      "title": "The Other End of Time",
      "author": "弗雷德里克·波爾"
    },
    "selection_index": 234,
    "original_spatial_record_sha256": "14caf86ad656965b79266a141c51b9ea6770fc1cec5aea0be9fd9d2a6822e397",
    "original_analysis_archive": "research/issue-input-snapshots/modern-recent-round33.json",
    "original_analysis_file_sha256": "933a28da7c364cf9fa15b69cd7f9232dd5be68925785c3a6d273ffd3909dc9cd",
    "original_analysis_record_sha256": "6098224327dc0c92626d75223ce73371600d298f90ae4e9462f48fca80b7036a",
    "original_log_archive": "research/issue-input-snapshots/modern-recent-round33-log.json",
    "original_log_file_sha256": "5cdfc803b51628a91f28d995daca7d752a1675c8d4ccbdcc2251e51689722716",
    "original_log_record_sha256": "4bc94352556a648e2ed500bba7d12f8aed62c1e6c7509bd2124db800282f9352",
    "original_history_sha256": "0c64f3bc66ee9365b75af9cb2eb92162ce3d10b115b62f69bc7785709325bc28",
    "fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "准确The Other End of Time首卷知识限定地球旧轨道设施的人员被带到远方外星世界的经历；复制体与两阵营冲突不扩大为全宇宙行动，也不借后两卷补归程。"
    },
    "effective_spatial_basis_mode": "exact_existing_knowledge",
    "status": "accept_scoped_unverified",
    "semantic_note": "原小说地球空间站/囚禁至外星阶段，不借续卷",
    "source_mode_adapter_record_sha256": null
  },
  "Q131471753": {
    "id": "Q131471753",
    "identity": {
      "title": "Wang's Carpets",
      "author": "格雷格·伊根"
    },
    "selection_index": 235,
    "original_spatial_record_sha256": "fbe7b278f7b2fdcd10a90a78e54e2c4f6615aebbbf3abbcaf234a1ef9e3f25ac",
    "original_analysis_archive": "research/issues-since-1980-round2.json",
    "original_analysis_file_sha256": "653dc9e28f3dfc42b2e1e72e781e1a03645c76400adaa9e6b9bf0df1a34ea0d6",
    "original_analysis_record_sha256": "60eeda9bbd35b48456b482979e6cad5a799e1487bcb5d65e77d5d98534d393e7",
    "original_log_archive": null,
    "original_log_file_sha256": null,
    "original_log_record_sha256": null,
    "original_history_sha256": "74234e98afe7498fb5daf1f36ac2d78acc339464f950703b8c019892f982b90b",
    "fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "准确Wang’s Carpets独立短篇知识限定远行者在外星海洋调查海毯生命的接触阶段；其计算结构内部可能承载世界，不说调查者已进入或遍历内部宇宙，也不套后来Diaspora版本其他路线。"
    },
    "effective_spatial_basis_mode": "exact_existing_knowledge",
    "status": "accept_scoped_unverified",
    "semantic_note": "Wang海洋实体舞台；计算世界非实际跨入宇宙",
    "source_mode_adapter_record_sha256": null
  },
  "Q134080548": {
    "id": "Q134080548",
    "identity": {
      "title": "Les Oubliés de Vulcain",
      "author": "Danielle Martinigol"
    },
    "selection_index": 236,
    "original_spatial_record_sha256": "35d3067f3f01a09e80364056c49b390ab8b0568c30415fe9a4b57e773873d61a",
    "original_analysis_archive": "research/issue-input-snapshots/early-recent-round31.json",
    "original_analysis_file_sha256": "4e4c202fb8e5fc00a2b51a0f318b47125d22576d7a5dc520deb3929ce066a4d4",
    "original_analysis_record_sha256": "3e1692c3e28ddda8b64c0f3857429f900dc0d8b911f282b4befc677a503ed5ad",
    "original_log_archive": "research/issue-input-snapshots/early-recent-round31-log.json",
    "original_log_file_sha256": "0a6eb08f716b7592a4598f3ad35fd00bddf7a6565ffc261cd995ab59a62aba88",
    "original_log_record_sha256": "8af208546a355606f55f9eb467dba327c3fa0a843b84913f81231ccdf50de137",
    "original_history_sha256": "0ec2d6b9a3759659462311d737b14a9324470e43fbe792ce0762e56120f1f1eb",
    "fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本作材料明确Charley来到接收其他行星垃圾的Vulcain，限此虚构行星及居民生活；垃圾来源和身体改造能力不直接成为他已访问的其他世界。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "Vulcain垃圾星本地，不补垃圾的远方来源",
    "source_mode_adapter_record_sha256": null
  },
  "Q135209407": {
    "id": "Q135209407",
    "identity": {
      "title": "The Spine Divers",
      "author": "Ray Aldridge"
    },
    "selection_index": 237,
    "original_spatial_record_sha256": "54aeb17b76e8c960df7a8f0482bb13b2f9cefc75bae0f30e1106244c2c6dadeb",
    "original_analysis_archive": "research/issue-input-snapshots/quick-retry-modern-round7.json",
    "original_analysis_file_sha256": "a5fbea852910ea49a4a837bfbfb2b3528e92904bd69b9d23f88202593da1d34e",
    "original_analysis_record_sha256": "b919290a3ca8d187de810057488a4ab959608b268c73f4acf8edc83afe6aeb21",
    "original_log_archive": "research/issue-input-snapshots/quick-retry-modern-round7-log.json",
    "original_log_file_sha256": "0998fc0e8d92bd5749d2aa82ba41d9a53a9015be9354e74b558ce6dced7533fe",
    "original_log_record_sha256": "0e29fb491ca6aa3aba319ac5eb2ed930eed40c5a5256cda7bdd267f305aff1c6",
    "original_history_sha256": "62d0298a660afdfb836fb3d30640aa38e43e7d930437c2046b71e93a24aca92f",
    "fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本篇评论明确影像旅行者到另一行星村落记录Spine Divers猎鱼，限这一当地旅游与劳动环境；没有恒星间距离，不从长途工作经历扩大。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "Mastine游客本地与危险潜水，不补恒星距离",
    "source_mode_adapter_record_sha256": null
  },
  "Q30084993": {
    "id": "Q30084993",
    "identity": {
      "title": "The Bohr Maker",
      "author": "Linda Nagata"
    },
    "selection_index": 238,
    "original_spatial_record_sha256": "0d40ffacda4e3b2e533d6e635a1d32408cd2546b29e596babffc90ea52f47b15",
    "original_analysis_archive": "research/issues-since-1980-round12.json",
    "original_analysis_file_sha256": "96ed2e0ba4a84c4dda0beeb7786353357c556b7b8bda8954b18a2b9df567a211",
    "original_analysis_record_sha256": "3038d6b9c951b4f1b07f026d5781c2885273be892d76499e787c6f2846198714",
    "original_log_archive": null,
    "original_log_file_sha256": null,
    "original_log_record_sha256": null,
    "original_history_sha256": "6e71c226a26945ee5777d1d2cf2f9c3eec0bea8d4d1fdfee7d7f767cc7b262fe",
    "fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [
        "earth"
      ],
      "spatial_rationale": "本卷材料明确地球贫民区的Phousita与轨道Celestial Cities的Nikko、技术许可及装置感染，限地球与近地轨道两个场所；改变人类定义不直接等于abstract空间。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "地球贫民区与轨道城市，后人类不自动abstract",
    "source_mode_adapter_record_sha256": null
  },
  "Q3088925": {
    "id": "Q3088925",
    "identity": {
      "title": "Brightness Reef",
      "author": "大衛·布林"
    },
    "selection_index": 239,
    "original_spatial_record_sha256": "058f1744fc74cd89564431dc03fbcd84fe00b001ab318b0f996aa771691448ea",
    "original_analysis_archive": "research/issues-since-1980-round6.json",
    "original_analysis_file_sha256": "74f3afecda57889c7e97c8e97629243bb998c1f8538bb058bc268822fc2d661a",
    "original_analysis_record_sha256": "01b2d53f36c4e9aa336edf0c86fa61bb55a75800c80df71bed70eb7126737997",
    "original_log_archive": null,
    "original_log_file_sha256": null,
    "original_log_record_sha256": null,
    "original_history_sha256": "96d3b6f83cdf1b83fb1b4a05167cfd51cdacf3425b360a24164a6c45bc51a404",
    "fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本卷材料明确Jijo六族共同生活与来访星舰的接触，限这一虚构行星；银河禁止定居制度不是人物遍历银河的实到范围。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "Jijo六族当次来船冲突，银河法条非全银河活动",
    "source_mode_adapter_record_sha256": null
  },
  "Q3335725": {
    "id": "Q3335725",
    "identity": {
      "title": "The Nano Flower",
      "author": "彼德·漢彌頓"
    },
    "selection_index": 240,
    "original_spatial_record_sha256": "1ead6f625b3479227e3d944aa28156704ccb33088adb3be304e8a58ed009fb51",
    "original_analysis_archive": "research/issues-since-1980-round6.json",
    "original_analysis_file_sha256": "74f3afecda57889c7e97c8e97629243bb998c1f8538bb058bc268822fc2d661a",
    "original_analysis_record_sha256": "580c12905d382b83f5e8866973916ef44aa6829499c88093b05a75c240c16e0b",
    "original_log_archive": null,
    "original_log_file_sha256": null,
    "original_log_record_sha256": null,
    "original_history_sha256": "efad5fef767f7bc9bd4a1cad2dc855f042fd4e50fd44a8e8b257a36768f9ff61",
    "fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "准确The Nano Flower本卷知识只定位Julia与Greg在地球英国的家庭、企业与来源调查阶段；异常技术与匿名花的可能外星来源不当作这阶段已到访外星。"
    },
    "effective_spatial_basis_mode": "exact_existing_knowledge",
    "status": "accept_scoped_unverified",
    "semantic_note": "Julia/Greg英国调查阶段；生物技术异源非实际访问",
    "source_mode_adapter_record_sha256": null
  },
  "Q4658106": {
    "id": "Q4658106",
    "identity": {
      "title": "A Man of the People",
      "author": "厄休拉·勒吉恩"
    },
    "selection_index": 241,
    "original_spatial_record_sha256": "73d5fb3204219a0be959998d9a1a9ad391d4281008915d67ea9c8aa69f09d4e9",
    "original_analysis_archive": "research/issue-input-snapshots/global-recent-round34-corrected.json",
    "original_analysis_file_sha256": "7d7e51941f49f58a39ca06da91578d8fc37d591169f01d7378ecc769801f3392",
    "original_analysis_record_sha256": "c698edfb3b5c71d0ce87ae8e1c0276ff9e088f4b0488bf0a9fbdbc0adcbac03a",
    "original_log_archive": null,
    "original_log_file_sha256": null,
    "original_log_record_sha256": null,
    "original_history_sha256": "16e082370fe423a83779e6c3a6fef3034e77f9b9ed806cac8404e0839951e935",
    "fields": {
      "spatial_primary": "interstellar",
      "spatial_secondary": [],
      "spatial_rationale": "本单篇材料明确Havzhiva在Hain成长并到Yeowe/Werel任Ekumen使节，限这些不同恒星世界的连续经历；不将Four Ways全部成员行动加入这篇范围。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "仅A Man of the People中Hain/Yeowe/Werel外交路线",
    "source_mode_adapter_record_sha256": null
  },
  "Q4808579": {
    "id": "Q4808579",
    "identity": {
      "title": "Assault at Selonia",
      "author": "羅傑·麥克布萊·艾倫"
    },
    "selection_index": 242,
    "original_spatial_record_sha256": "3c566ab5ec9e6f82ffb25624c29b923c99ca81bc6bc373b5e15f78e6bcd21b93",
    "original_analysis_archive": "research/issue-input-snapshots/modern-recent-round34.json",
    "original_analysis_file_sha256": "194db55ce01b3e710f8883e91a1372e78a4c0d30d14548973e61c55112b16533",
    "original_analysis_record_sha256": "20ef6041be5affa9096940ad8cc7538077b508fb3b2a9ea03b4a575ff7040745",
    "original_log_archive": "research/issue-input-snapshots/modern-recent-round34-log.json",
    "original_log_file_sha256": "0f62b4121af78aac6b1607b3ee644755aecbdae3ae0f8aad7c5ffb40f3655713",
    "original_log_record_sha256": "bf4e0433ac182b1cc2a652ab26be03f860fe4bc5343ac988ca8312f27687403f",
    "original_history_sha256": "8906ae3fba448a828fb0126eb35ffc87b523abc55f1b0f712366bcf849291fa7",
    "fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本卷材料明确Han被囚Corellia及逃向Selonia、同一系统Centerpoint设施的威胁，限Corellian行星系统；逃亡意图与Starbuster能力不推全银河到访。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "Corellian星系/Centerpoint/Selonia阶段，不泛化整个星战银河",
    "source_mode_adapter_record_sha256": null
  },
  "Q54800874": {
    "id": "Q54800874",
    "identity": {
      "title": "Warped",
      "author": "K•W•傑特"
    },
    "selection_index": 243,
    "original_spatial_record_sha256": "0e301f47995a8f3ce0602abeca99bc0dcda1771889e80932f0e09d120f6e0cd4",
    "original_analysis_archive": "research/issue-input-snapshots/global-recent-round34-corrected.json",
    "original_analysis_file_sha256": "7d7e51941f49f58a39ca06da91578d8fc37d591169f01d7378ecc769801f3392",
    "original_analysis_record_sha256": "626bbc95a2da0a0e8a5f9fb09565cfcbc0904e4025b31e6bea66153954d5fe94",
    "original_log_archive": null,
    "original_log_file_sha256": null,
    "original_log_record_sha256": null,
    "original_history_sha256": "3bb0437a6057241fc236e231f370b1aa4f79d90c950fdd75c7c41c678f27486a",
    "fields": {
      "spatial_primary": "abstract",
      "spatial_secondary": [
        "planetary"
      ],
      "spatial_rationale": "本卷材料明确holosuite扭曲娱乐世界、Sisko进入其中与其DS9站内政治关联，限这两层实际活动；不是仅因AI存在赋abstract，也不借其他站点故事扩路线。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "Sisko实入模拟世界，与DS9站场区分；AI本身非abstract",
    "source_mode_adapter_record_sha256": null
  },
  "Q5518056": {
    "id": "Q5518056",
    "identity": {
      "title": "Galax-Arena",
      "author": "Gillian Rubinstein"
    },
    "selection_index": 244,
    "original_spatial_record_sha256": "49a00aed681b598580649cba98eb80c15b7aba2685e46cadfc773a637aa62d35",
    "original_analysis_archive": "research/issue-input-snapshots/early-recent-round32.json",
    "original_analysis_file_sha256": "ff69c0e1dec5781d171710d67239ec2305d187800080930d5fabb7c91ecf64f4",
    "original_analysis_record_sha256": "97f159091d2fd6e41b8772bcb7aad2646cee0955da8a5eadb5b1c1690f3c9602",
    "original_log_archive": "research/issue-input-snapshots/early-recent-round32-log.json",
    "original_log_file_sha256": "86034e1bfeed7ea9e74dfa477a8727e1d1991b7539837ead4095882fc633e1e2",
    "original_log_record_sha256": "a4ff44c4323e844e99c2218b9bd0bf6bb018c559156eef4e4edfaa78fff5e573",
    "original_history_sha256": "612f8e529a77eaac94c30a372ffa4d954cd546dd0a871381bea808944bce79cc",
    "fields": {
      "spatial_primary": "earth",
      "spatial_secondary": [],
      "spatial_rationale": "本作评论明确Joella发现所谓Vexan是老人伪装、竞技地点仍在地球，限真实地球舞台；被绑者关于外星的早先信念不成为真实空间定位。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "假Vexan绑架揭示地球舞台，不采人物错误宇宙信念",
    "source_mode_adapter_record_sha256": null
  },
  "Q615035": {
    "id": "Q615035",
    "identity": {
      "title": "The Carpet Makers",
      "author": "安德里亚斯·埃施巴赫"
    },
    "selection_index": 245,
    "original_spatial_record_sha256": "c9ee5621f41320110a032c8bc0402db434c02468cc7071587ddae3e44f6a39af",
    "original_analysis_archive": "research/issues-since-1980-round8.json",
    "original_analysis_file_sha256": "aebc0d004d3c4f4cfa3afd24657be0d6569a8956cc9b5a416da6e6673a75d961",
    "original_analysis_record_sha256": "bb968dda7c7b8911f78d79a31e9ba27502af668324452cf1045b5823f014e828",
    "original_log_archive": null,
    "original_log_file_sha256": null,
    "original_log_record_sha256": null,
    "original_history_sha256": "c4a3695c88f93f2461c4f37dd44e206752d244e9d449ef37eb41efc98e09a0c9",
    "fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "准确The Carpet Makers单书知识限定制毯人长期生活与外来者调查的虚构行星社会；访客来自星际及帝国辖域巨大，不代表这条行星劳动叙事实际遍历全银河。"
    },
    "effective_spatial_basis_mode": "exact_existing_knowledge",
    "status": "accept_scoped_unverified",
    "semantic_note": "织毯者行星当地，帝国背景与访客来处不扩银河",
    "source_mode_adapter_record_sha256": null
  },
  "Q7251700": {
    "id": "Q7251700",
    "identity": {
      "title": "Proteus In The Underworld",
      "author": "Charles Sheffield"
    },
    "selection_index": 246,
    "original_spatial_record_sha256": "95ef2998ce4ede65df55da862aaeb738cba797dd7ec48748252b25225a8b0376",
    "original_analysis_archive": "research/issues-since-1980-round13.json",
    "original_analysis_file_sha256": "c470cc7944487811f08284e5aba033fdfaa0fb72a998fd0f9e52194ec0f8760d",
    "original_analysis_record_sha256": "69a02d7e24dc6e9725f29e940d187a4bb25f317b18aa24df8f8c3910b873f199",
    "original_log_archive": null,
    "original_log_file_sha256": null,
    "original_log_record_sha256": null,
    "original_history_sha256": "c5cb26f5f8603000c79491209acfca8434006058f83d6b33959f02582b5c0ad2",
    "fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本卷材料明确太阳系多个空间站受凶兽威胁与Humanity Test判断，限这些太阳系设施；身体变化不本身产生虚拟或另维度舞台。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "太阳系空间站迁移，身体变化不自动abstract",
    "source_mode_adapter_record_sha256": null
  },
  "Q7332612": {
    "id": "Q7332612",
    "identity": {
      "title": "Rider at the Gate",
      "author": "C·J·彻里"
    },
    "selection_index": 247,
    "original_spatial_record_sha256": "18ba0b14433726c65be40316a04884cefd406c920d0bc70167e73deb6d7f6826",
    "original_analysis_archive": "research/issue-input-snapshots/modern-recent-round34.json",
    "original_analysis_file_sha256": "194db55ce01b3e710f8883e91a1372e78a4c0d30d14548973e61c55112b16533",
    "original_analysis_record_sha256": "6f96a0fa538c3160a223df335714f48c7ced08aec6ef71f0c6c6341843d64684",
    "original_log_archive": "research/issue-input-snapshots/modern-recent-round34-log.json",
    "original_log_file_sha256": "0f62b4121af78aac6b1607b3ee644755aecbdae3ae0f8aad7c5ffb40f3655713",
    "original_log_record_sha256": "0c324b1857592b4cf7e4338f0866ac7b6028379eb98d06a628062069f462c44e",
    "original_history_sha256": "102616c21481e570def68809f08ac5b53baa7c28867bf4f3af81e05eccea8944",
    "fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本作材料明确被困人类与Nighthorses共同生活的远方行星，限该环境及当地心灵交流；遥远来源没有距离依据，不推出本卷多个恒星的实到行程。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "本地异星人类/Nighthorse关系，未继承地球来程",
    "source_mode_adapter_record_sha256": null
  },
  "Q7679252": {
    "id": "Q7679252",
    "identity": {
      "title": "Tales from Jabba's Palace",
      "author": "凱文·詹姆士·安德森"
    },
    "selection_index": 248,
    "original_spatial_record_sha256": "b704d038c93065ba52ae758557c0a657ae649de4902bacbedff8671c30c96166",
    "original_analysis_archive": "research/issue-input-snapshots/global-recent-round35.json",
    "original_analysis_file_sha256": "9dff90b85fa897b331e1795eafac1e6d8505b41b6a9c6b1f0293b251f493f757",
    "original_analysis_record_sha256": "edb06432d5e88014538d9785e2522212847de5fdc7c78440debd2084a4665222",
    "original_log_archive": "research/issue-input-snapshots/global-recent-round35-log.json",
    "original_log_file_sha256": "06b2aa8ba14e61a72f0f534a7358a527312182acdeb28bec6043682809ee2f50",
    "original_log_record_sha256": "48c62c68a490b87098649b97e4f9a924986044da288cf28753e78240dd7cb30d",
    "original_history_sha256": "514c3dfc46c32c37ec07394e5475e93f23bb680f07f68c4a1f844e5d68b87efb",
    "fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "仅定位Tales from Jabba’s Palace所收A Boy and His Monster的Jabba宫殿、rancor囚养与Luke到来阶段，准确该宫殿位于Tatooine；Malakili带它去遥远行星的计划未完成，不扩成整集星际舞台。"
    },
    "effective_spatial_basis_mode": "exact_existing_knowledge",
    "status": "accept_only_with_exact_source_role_adapter",
    "semantic_note": "只Boy and His Monster宫殿/Tatooine：地点既有知识；PRH/Fandom不作独立空间证明",
    "source_mode_adapter_record_sha256": "ef74b6a3b5a102a54d6acd7a22019d7a471bb3fc34248f00cc119b31db3ea85f"
  },
  "Q7726841": {
    "id": "Q7726841",
    "identity": {
      "title": "The Color of Distance",
      "author": "Amy Thomson"
    },
    "selection_index": 249,
    "original_spatial_record_sha256": "600176fe3a8359fcf4131f2dda961eb7df4ab58c8897ec1676123249a3da560c",
    "original_analysis_archive": "research/issue-input-snapshots/modern-recent-round34.json",
    "original_analysis_file_sha256": "194db55ce01b3e710f8883e91a1372e78a4c0d30d14548973e61c55112b16533",
    "original_analysis_record_sha256": "cd6c01334483537b86440e052fc81bffa025aceeb43abd0f2dddc7c2efe21577",
    "original_log_archive": "research/issue-input-snapshots/modern-recent-round34-log.json",
    "original_log_file_sha256": "0f62b4121af78aac6b1607b3ee644755aecbdae3ae0f8aad7c5ffb40f3655713",
    "original_log_record_sha256": "1e3dc8fcbb14eb47cf328b2e05630921466b90716d007a846d4003cb7c831fe2",
    "original_history_sha256": "a0e1476193333adcdf7825dc0cce7d338b13a6f1bd7765a92fe4a77a333b6a9a",
    "fields": {
      "spatial_primary": "planetary",
      "spatial_secondary": [],
      "spatial_rationale": "本作材料明确Juna留在Tendu所在行星、身体适应与本地生活，限该虚构行星；回家和再次人类接触是归属问题，不代替具体返航路线。"
    },
    "effective_spatial_basis_mode": "saved_explicit_setting",
    "status": "accept_scoped_unverified",
    "semantic_note": "Juna与Tendu本地世界，不借续作地球返程",
    "source_mode_adapter_record_sha256": null
  }
});
const FIXED_ROOT_REVIEW_IDS=Object.freeze([
  "Q137806760",
  "Q134098155",
  "Q136452465",
  "Q113214640",
  "Q137003729",
  "Q131445223",
  "Q135206358",
  "Q55230555",
  "Q102076238",
  "Q134529150",
  "Q139881240",
  "Q62698506",
  "Q133306305",
  "Q139881238",
  "Q137874076",
  "Q139881234",
  "Q24034555",
  "Q110276832",
  "Q125458800",
  "Q134715513",
  "Q19263901",
  "Q21893609",
  "Q54807336",
  "Q21512452",
  "Q55230372",
  "Q131382269",
  "Q133445347",
  "Q133445431",
  "Q114414730",
  "Q137824848",
  "Q16608557",
  "Q108912961",
  "Q134720546",
  "Q15221218",
  "Q16010795",
  "Q16646479",
  "Q3563140",
  "Q54802746",
  "Q2391923",
  "Q2509857",
  "Q7736686",
  "Q108535556",
  "Q131472325",
  "Q135094390",
  "Q16671459",
  "Q7100133",
  "Q7770704",
  "Q27976097",
  "Q6061022",
  "Q6304848"
]);
const hash=b=>createHash('sha256').update(b).digest('hex');
const sorted=v=>Array.isArray(v)?v.map(sorted):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sorted(v[k])])):v;
export const earlySelection7RecordSha=v=>hash(JSON.stringify(sorted(v)));
const equal=(a,b)=>a===undefined||b===undefined?a===b:earlySelection7RecordSha(a)===earlySelection7RecordSha(b);
const loaded=new Map();
function exactFile(archive,sha,{repoDir,evidenceDir},role){
  if(!repoDir||!/^research\/(?:[A-Za-z0-9_-]+\.json|(?:issue|spatial)-input-snapshots\/[A-Za-z0-9_-]+\.json)$/.test(archive))throw new Error('Early selection7 archive path rejected: '+role);
  const sf=basename(archive), spatial=archive.startsWith('research/spatial-input-snapshots/');
  const pin=spatial?(sf===EARLY_SELECTION7_SPATIAL_SELECTION_FILE?EARLY_SELECTION7_SPATIAL_SELECTION_SHA256:sf===EARLY_SELECTION7_SKIP_ADAPTER_FILE?EARLY_SELECTION7_SKIP_ADAPTER_SHA256:sf===EARLY_SELECTION7_PUBLISHED_RECEIPT_FILE?EARLY_SELECTION7_PUBLISHED_RECEIPT_SHA256:EARLY_SELECTION7_PUBLISHED_SPATIAL_INPUTS[sf]||EARLY_SELECTION7_CHECKPOINT_INPUTS[sf]||EARLY_SELECTION7_ROOT_REVIEW_INPUTS[sf]||EARLY_SELECTION7_SOURCE_ROLE_ADAPTER_INPUTS[sf]):FIXED_PUBLIC_DEPENDENCIES[archive];
  if(!pin||pin!==sha)throw new Error('Early selection7 unpinned dependency: '+role);
  const path=join(repoDir,archive),bytes=readFileSync(path);
  if(hash(bytes)!==sha)throw new Error('Early selection7 archive digest mismatch: '+role);
  let d=loaded.get(path+sha);if(!d){d=JSON.parse(bytes);loaded.set(path+sha,d);}
  if(evidenceDir){const pp=join(evidenceDir,basename(archive));if(existsSync(pp)&&hash(readFileSync(pp))!==sha)throw new Error('Early selection7 private/public byte mismatch: '+role);}
  return d;
}
function exactRow(d,id,sha,role){
 const matches=[...(d.records||[]),...(d.deferred||[])].filter(r=>r.id===id&&(!sha||earlySelection7RecordSha(r)===sha));
 if(matches.length!==1)throw new Error('Early selection7 exact row cardinality: '+role+'/'+id);return matches[0];
}
const nodes=l=>!l?[]:[l,...(l.previous_attempts||[]).flatMap(nodes)];
const scope=w=>Object.fromEntries(['id','title_zh','author','form','forms','source_entity_kind','source_types'].map(k=>[k,w[k]??null]));
const originalSpatialProjection=w=>Object.fromEntries(['spatial_primary','spatial_secondary','spatial_rationale'].map(k=>[k,{present:Object.hasOwn(w.knowledge?.fields||{},k),value:w.knowledge?.fields?.[k]??null}]));
export function earlySelection7FixedCandidateIds(){return new Set(Object.keys(FIXED_ID_TO_FILE));}
export function earlySelection7PublishedSpatialIds(){return new Set(Object.keys(FIXED_ID_TO_FILE).filter(id=>!EARLY_SELECTION7_WITHHELD_IDS.includes(id)));}
export function isEarlySelection7PublishedSpatialRecord(r){
 return !!r&&(Object.hasOwn(FIXED_ID_TO_FILE,r.id)||Object.hasOwn(EARLY_SELECTION7_PUBLISHED_SPATIAL_INPUTS,r.source_spatial_input_file)||r.spatial_selection_sha256===EARLY_SELECTION7_SPATIAL_SELECTION_SHA256);
}
// Three fixed source-mode/URL-role corrections change no spatial field, URL set,
// original reading scope, A/L, absent metadata or full previous/prior history.
function adaptedSpatialRecord(original,ctx){
 const fixed=FIXED_SEMANTIC_ADAPTER_RECORDS[original.id];
 if(!fixed)return original;
 const f=FIXED_ID_TO_FILE[original.id];
 if(fixed.source_spatial_input_file!==f||fixed.source_spatial_input_sha256!==EARLY_SELECTION7_PUBLISHED_SPATIAL_INPUTS[f]||fixed.source_spatial_input_record_sha256!==earlySelection7RecordSha(original)||!equal(fixed.original_record,original)||!equal(fixed.original_fields,original.fields)||fixed.source_analysis_archive!==original.source_analysis_archive||fixed.source_analysis_sha256!==original.source_analysis_sha256||fixed.source_analysis_record_sha256!==original.source_analysis_record_sha256||fixed.source_log_archive!==original.source_log_archive||fixed.source_log_sha256!==original.source_log_sha256||fixed.source_log_record_sha256!==original.source_log_record_sha256)throw new Error('Early selection7 exact source-role original binding rejected');
 if(ctx){
  const af=FIXED_ADAPTER_BY_ID[original.id],d=exactFile('research/spatial-input-snapshots/'+af,EARLY_SELECTION7_SOURCE_ROLE_ADAPTER_INPUTS[af],ctx,'fixed source mode/role adapter');
  const a=exactRow(d,original.id,null,'fixed source mode/role adapter');
  if(d.metadata?.status!=='frozen_exact_source_mode_role_adapter'||!equal(a,fixed))throw new Error('Early selection7 exact source-role adapter body rejected');
 }
 const out=fixed.adapted_record,changes=Object.keys(original).filter(k=>!equal(original[k],out[k]));
 if(!equal(changes,fixed.changed_record_keys)||Object.keys(out).some(k=>!Object.hasOwn(original,k))||!equal(out.fields,original.fields)||earlySelection7RecordSha(out)!==fixed.adapted_record_sha256)throw new Error('Early selection7 fixed derived source-role digest rejected');
 return out;
}
export function bindEarlySelection7SpatialRecord(r){
 const file=FIXED_ID_TO_FILE[r.id];if(!file||EARLY_SELECTION7_WITHHELD_IDS.includes(r.id)||earlySelection7RecordSha(r)!==FIXED_S_RECORD_SHA_BY_ID[r.id])throw new Error('Early selection7 candidate is not exact/adoptable');
 return {...adaptedSpatialRecord(r),source_spatial_input_file:file,source_spatial_input_sha256:EARLY_SELECTION7_PUBLISHED_SPATIAL_INPUTS[file],source_spatial_input_archive:'research/spatial-input-snapshots/'+file,source_spatial_input_record_sha256:earlySelection7RecordSha(r)};
}
function validateScopedReview(original,r,ctx){
 const rvf=FIXED_REVIEW_BY_ID[r.id],rv=exactFile('research/spatial-input-snapshots/'+rvf,EARLY_SELECTION7_ROOT_REVIEW_INPUTS[rvf],ctx,'closed semantic review');
 if(FIXED_REVIEW_KIND[r.id]==='root_packet'){
  const p=rv.packets?.find(x=>x.file==='work/evidence/'+FIXED_ID_TO_FILE[r.id]);
  if(rv.status!=='private_semantic_review_only_not_adopted_not_published'||rv.new_search_count!==0||rv.new_open_count!==0||rv.independent_verification_upgrade_count!==0||p?.sha256!==EARLY_SELECTION7_PUBLISHED_SPATIAL_INPUTS[FIXED_ID_TO_FILE[r.id]]||p?.records!==50||p?.proposed_field_count!==150||p?.decision!=='accept_original_scoped_values_for_later_integration'||!equal(p.reviewed_ids,FIXED_ROOT_REVIEW_IDS))throw new Error('Early selection7 root exact50 review rejected');
 }else{
  const rr=exactRow(rv,r.id,null,'record semantic review');if(!equal(rr,FIXED_RECORD_REVIEWS[r.id]))throw new Error('Early selection7 exact semantic review row rejected');
  if(FIXED_REVIEW_KIND[r.id]==='global_record'){
   if(!['accepted_conservative_navigation_unverified','accepted_space_values_with_exact_source_role_adapter_required'].includes(rr.result)||rr.source_spatial_file_sha256!==EARLY_SELECTION7_PUBLISHED_SPATIAL_INPUTS[FIXED_ID_TO_FILE[r.id]]||rr.source_spatial_record_sha256!==earlySelection7RecordSha(original)||!equal(rr.reviewed_spatial_fields,original.fields))throw new Error('Early selection7 global limited decision rejected');
  }else if(!['accept_scoped_unverified','accept_only_with_exact_source_role_adapter'].includes(rr.status)||rr.original_spatial_record_sha256!==earlySelection7RecordSha(original)||!equal(rr.fields,original.fields)||rr.effective_spatial_basis_mode!==r.spatial_basis_mode)throw new Error('Early selection7 modern limited decision rejected');
 }
 const ex=exactFile('research/spatial-input-snapshots/'+EARLY_SELECTION7_SKIP_ADAPTER_FILE,EARLY_SELECTION7_SKIP_ADAPTER_SHA256,ctx,'exact2 withheld adapter');
 if(ex.metadata?.status!=='frozen_exact_two_record_adoption_exclusion_adapter'||!equal(ex.records.map(x=>x.id).sort(),[...EARLY_SELECTION7_WITHHELD_IDS].sort()))throw new Error('Early selection7 exact skip closure rejected');
 const receipt=exactFile('research/spatial-input-snapshots/'+EARLY_SELECTION7_PUBLISHED_RECEIPT_FILE,EARLY_SELECTION7_PUBLISHED_RECEIPT_SHA256,ctx,'R93 actual publication receipt');
 if(receipt.canonical_sha256!==EARLY_SELECTION7_CANONICAL_SNAPSHOT_SHA256||receipt.github_main_commit!=='b7b1885e144f9e27b99a91a6334850cbb98da277')throw new Error('Early selection7 actual publication binding rejected');
}
export function validateEarlySelection7PublishedSpatialEvidence(r,{repoDir,evidenceDir,currentWork,issueAssertions,sourceSearchLog,spatialAdoptionPhase='auto'}={}){
 const fail=why=>{throw new Error('Early selection7 published spatial rejected ('+why+'): '+r.id);};
 const ctx={repoDir,evidenceDir},file=FIXED_ID_TO_FILE[r.id];
 if(EARLY_SELECTION7_WITHHELD_IDS.includes(r.id))fail('fixed withheld insufficient-setting candidate; unknown preserved');
 if(!file||r.source_spatial_input_file!==file||r.source_spatial_input_sha256!==EARLY_SELECTION7_PUBLISHED_SPATIAL_INPUTS[file]||r.source_spatial_input_archive!=='research/spatial-input-snapshots/'+file)fail('exact fixed ID/input declaration');
 const sd=exactFile(r.source_spatial_input_archive,r.source_spatial_input_sha256,ctx,'S');
 if(sd.metadata?.status!=='frozen_checkpoint'||sd.records?.length!==50)fail('fixed frozen S checkpoint');
 const original=exactRow(sd,r.id,r.source_spatial_input_record_sha256,'S');
 const expectedOriginal=adaptedSpatialRecord(original,ctx),expectedFields=expectedOriginal.fields;
 const extra=new Set(['source_spatial_input_file','source_spatial_input_sha256','source_spatial_input_archive','source_spatial_input_record_sha256']);
 if(Object.keys(r).some(k=>!Object.hasOwn(original,k)&&!extra.has(k)))fail('unapproved derived key');
 for(const k of Object.keys(original))if(!Object.hasOwn(r,k)||!equal(r[k],expectedOriginal[k]))fail('changed original S key '+k);
 if(Object.keys(original).some(k=>extra.has(k)))fail('original S unexpectedly has derived aliases');
 const sel=exactFile('research/spatial-input-snapshots/'+EARLY_SELECTION7_SPATIAL_SELECTION_FILE,EARLY_SELECTION7_SPATIAL_SELECTION_SHA256,ctx,'closed300 selection');
 if(sel.metadata?.status!=='frozen_spatial_assignment_closed_checkpoints'||sel.records?.length!==300||sel.metadata.canonical_snapshot_sha256!==EARLY_SELECTION7_CANONICAL_SNAPSHOT_SHA256||sel.metadata.original_proposal_count!==300||sel.metadata.published_receipt_sha256!==EARLY_SELECTION7_PUBLISHED_RECEIPT_SHA256||r.source_canonical_snapshot_sha256!==EARLY_SELECTION7_CANONICAL_SNAPSHOT_SHA256)fail('fixed closed selection/snapshot');
 const cf=basename(r.spatial_selection_file||'');
 if(!Object.hasOwn(EARLY_SELECTION7_CHECKPOINT_INPUTS,cf)||r.spatial_selection_sha256!==EARLY_SELECTION7_CHECKPOINT_INPUTS[cf]||r.spatial_selection_file!=='work/evidence/'+cf)fail('exact original checkpoint declaration');
 const cp=exactFile('research/spatial-input-snapshots/'+cf,EARLY_SELECTION7_CHECKPOINT_INPUTS[cf],ctx,'checkpoint');
 const s=sel.records[r.spatial_selection_index],old=s?.canonical_record;
 if(cp.metadata?.status!=='frozen_spatial_assignment'||cp.records?.length!==50||cp.metadata.canonical_sha256!==EARLY_SELECTION7_CANONICAL_SNAPSHOT_SHA256||!s||s.id!==r.id||s.selection_index!==r.spatial_selection_index||!cp.records.some(x=>equal(x,s))||!equal(s.identity,r.identity)||!old||old.spatial_primary!=='unknown'||earlySelection7RecordSha(old)!==r.source_canonical_record_sha256||earlySelection7RecordSha(old)!==s.canonical_record_sha256)fail('exact selection identity/current-row digest');
 if(!equal(original.fields,s.reviewed_spatial_proposal.fields)||!equal(r.fields,expectedFields)||r.spatial_basis_mode!==expectedOriginal.spatial_basis_mode)fail('fixed space proposal');
 validateScopedReview(original,r,ctx);
 if(!currentWork||currentWork.id!==r.id||currentWork.issue_analysis_status==='missing'||!equal(scope(currentWork),scope(old))||!equal(scope(old),r.frozen_canonical_identity_scope))fail('current identity/source grain');
 // The five new descriptive dimensions remain free to grow: only source identity,
 // dates, displayed core, original assertion/history and space are constrained.
 for(const k of ['first_year','sort_year','source_first_year','year_display','year_note','title_original','languages','language_tradition','source_id','research_id','entity_link','source_index','research','issue','issue_facets','topics','issue_analysis_status'])
  if(Object.hasOwn(currentWork,k)!==Object.hasOwn(old,k)||!equal(currentWork[k],old[k]))fail('current core/date '+k);
 if(currentWork.completion?.source_verified!==old.completion?.source_verified)fail('verification upgrade');
 if(issueAssertions!==undefined&&!equal(issueAssertions,currentWork.knowledge?.assertions))fail('assertion context');
 if(sourceSearchLog!==undefined&&!equal(sourceSearchLog,currentWork.source_search_log))fail('process context');
 if(!equal(r.preserved_source_search_log,old.source_search_log)||!equal(currentWork.source_search_log,old.source_search_log)||earlySelection7RecordSha(old.source_search_log)!==r.preserved_source_search_log_sha256||!equal(r.preserved_source_search_log,s.preserved_source_search_log))fail('full source/prior/previous history');
 const ad=exactFile(r.source_analysis_archive,r.source_analysis_sha256,ctx,'A');
 const a=exactRow(ad,r.id,r.source_analysis_record_sha256,'A');
 if(r.source_analysis_file!==basename(r.source_analysis_archive)||r.source_analysis_archive!==s.active_analysis_archive||r.source_analysis_sha256!==s.active_analysis_sha256||!equal(a,r.original_analysis_record)||!equal(a,s.original_analysis_record)||!equal(ad.metadata,r.original_analysis_metadata)||!equal(ad.metadata,s.original_analysis_metadata)||!equal(a.identity,s.original_analysis_identity||s.identity)||a.verification_status!=='knowledge_added_unverified'||a.fields?.issue!==old.issue)fail('exact A/metadata/identity');
 if(!equal(a.identity,r.identity)){
  const fixedAlias=FIXED_IDENTITY_ALIASES[r.id],exactAlias=!!fixedAlias&&a.identity.author===r.identity.author&&old.source_index?.title_en===a.identity.title&&r.identity.title===fixedAlias.canonical_display_title&&a.identity.title===fixedAlias.source_declared_title&&equal(s.identity_alias_resolution,fixedAlias);
  if(!exactAlias)fail('unapproved original-title alias');
 }
 const agg=exactFile(r.source_core_assertion_file,r.source_core_assertion_file_sha256,ctx,'active aggregate A');
 const ca=s.canonical_assertion;
 if(r.source_core_assertion_file!==s.source_core_assertion_file||earlySelection7RecordSha(ca)!==r.source_core_assertion_record_sha256||ca.input_file!==r.source_core_assertion_file||!equal(exactRow(agg,r.id,null,'active aggregate').fields?.issue,ca.fields?.issue)||!equal(exactRow(agg,r.id,null,'active aggregate').fields?.issue_facets,ca.fields?.issue_facets)||!equal(exactRow(agg,r.id,null,'active aggregate').fields?.topics,ca.fields?.topics)||!currentWork.knowledge?.assertions?.some(x=>equal(x,ca)))fail('active original assertion');
 const oldAssertions=old.knowledge?.assertions||[],nowAssertions=currentWork.knowledge?.assertions||[];
 if(nowAssertions.length<oldAssertions.length||oldAssertions.some((x,i)=>!equal(x,nowAssertions[i])))fail('old assertion prefix/history');
 const oldSources=old.sources||[];
 if(!Array.isArray(currentWork.sources)||oldSources.length>currentWork.sources.length||oldSources.some((x,i)=>x!==currentWork.sources[i]))fail('old source links/order');
 let l=null;
 if(s.original_log_record!==null){
  if(!r.source_log_archive||r.source_log_archive!==s.original_log_archive||r.source_log_file!==basename(r.source_log_archive)||r.source_log_sha256!==s.original_log_sha256)fail('232 exact original L declaration');
  const ld=exactFile(r.source_log_archive,r.source_log_sha256,ctx,'L');l=exactRow(ld,r.id,r.source_log_record_sha256,'L');
  if(!equal(l,r.original_reading_log)||!equal(l,s.original_log_record)||!equal(ld.metadata,r.original_log_metadata)||!equal(ld.metadata,s.original_log_metadata)||!equal(l.identity,r.identity)||!nodes(old.source_search_log).some(n=>equal(n.raw_reading_log,l)))fail('232 exact original L/body/full process');
 }else{
  // This fixed68 subset never retained a companion L for the active A.
  // Some have later unrelated attempts: the whole actual process stays exact.
  if(['source_log_file','source_log_archive','source_log_sha256','source_log_record_sha256','original_reading_log','original_log_metadata'].some(k=>r[k]!==null))fail('fabricated companion L in fixed68');
 }
 const counters=Object.fromEntries(Object.entries(l||{}).filter(([k])=>k.endsWith('_count')));
 const keys=['actual_search_count','actual_query_count','actual_open_count','actual_open_attempt_count','actual_content_source_read','actual_search_performed','original_full_text_read','original_full_text_read_count','original_fulltext_read_count'];
 const presence=Object.fromEntries(keys.map(k=>[k,Object.hasOwn(l||{},k)]));
 if(!equal(counters,r.original_counter_fields)||!equal(presence,r.original_counter_presence))fail('counter values and missing presence');
 const caches=Object.fromEntries(Object.entries(l||{}).filter(([k])=>['cache','artifact','raw_search','raw_open','sha256'].some(v=>k.includes(v))));
 if(!equal(caches,r.original_cache_declarations))fail('original cache declarations');
 const rawScope=l?.reading_scope||l?.exact_support_scope||a.field_notes?.source_scope||a.field_notes?.issue;
 if(!equal(r.source_scope,rawScope)||!equal(r.frozen_knowledge_reading_scope,l?.reading_scope||l?.exact_support_scope||null)||!equal(r.frozen_knowledge_issue_note,a.field_notes?.issue))fail('exact original reading scope/issue note');
 if(ad.metadata?.ownership_file){
  if(r.original_ownership_file!==ad.metadata.ownership_file||r.original_ownership_sha256!==ad.metadata.ownership_sha256||!r.original_ownership_archive)fail('original owner declaration');
  const od=exactFile(r.original_ownership_archive,r.original_ownership_sha256,ctx,'owner');
  const own=[...(od.records||[]),...(od.deferred||[])][r.original_ownership_index];
  if(!own||own.id!==r.id||!equal(own,r.original_ownership_record)||r.original_prior_source_log_present!==Object.hasOwn(own,'prior_source_log')||!equal(r.prior_source_log,own.prior_source_log??null))fail('original owner/index/fullprior');
 }else{
  if(['original_ownership_file','original_ownership_sha256','original_ownership_archive','original_ownership_index','original_ownership_record','prior_source_log'].some(k=>r[k]!==null)||r.original_prior_source_log_present!==false)fail('fabricated missing original owner');
 }
 if(!equal(Object.keys(r.fields).sort(),['spatial_primary','spatial_rationale','spatial_secondary'])||!['earth','planetary','interstellar','galactic','cosmic','abstract'].includes(r.fields.spatial_primary)||!Array.isArray(r.fields.spatial_secondary)||r.fields.spatial_secondary.includes(r.fields.spatial_primary)||!r.fields.spatial_rationale?.trim())fail('only fixed three spatial fields');
 if(r.verification_status!=='knowledge_added_unverified'||r.integration_relation!=='published_core'||r.independently_verified!==false||r.new_actual_search_count!==0||r.new_actual_open_count!==0||r.new_core_count!==0||r.new_full_original_read_count!==0)fail('no new request/core/read/verification');
 const mode=r.spatial_basis_mode;
 if(!['exact_existing_knowledge','saved_explicit_setting'].includes(mode)||!equal(r.original_lookup_urls,a.sources||[])||!equal(r.original_source_evidence,a.source_evidence||[]))fail('fixed original source roles');
 if(mode==='exact_existing_knowledge'){
  if(r.analysis_basis!=='existing_knowledge_unverified'||r.sources.length||r.source_evidence.some(e=>e.type!=='existing_knowledge_with_preserved_old_lookup'||e.new_read_performed!==false||e.supports_spatial_independently!==false))fail('knowledge old URLs promoted to read');
 }else{
  if(r.analysis_basis!=='reuse_original_scoped_material_unverified'||!equal(r.sources,a.sources)||!r.sources.length||r.source_evidence.some(e=>e.new_read_performed!==false||!r.sources.includes(e.url)||(r.id==='Q5305569'&&e.url==='https://www.baen.com/chapters/W200008/0671319469_toc.htm'?e.type!=='preserved_original_bibliographic_only'||e.supports_spatial_independently!==false:e.type!=='saved_original_limited_setting'||e.supports_spatial_independently!==true)))fail('saved original limited-setting boundary');
 }
 if(!['pre','post','auto'].includes(spatialAdoptionPhase))fail('phase');
 const spatialKeys=['spatial_primary','spatial_secondary','spatial_rationale'];
 if(currentWork.spatial_primary==='unknown'){
  if(spatialAdoptionPhase==='post'||spatialKeys.some(k=>Object.hasOwn(old.knowledge?.fields||{},k))||!equal(currentWork.spatial_evidence,old.spatial_evidence)||!equal(originalSpatialProjection(currentWork),originalSpatialProjection(old)))fail('true original unknown projection');
  for(const k of ['spatial_secondary','spatial_rationale','original_spatial_evidence'])if(Object.hasOwn(currentWork,k)!==Object.hasOwn(old,k)||!equal(currentWork[k],old[k]))fail('pre top/evidence absence');
 }else{
  if(spatialAdoptionPhase==='pre'||currentWork.spatial_primary!==r.fields.spatial_primary)fail('post primary');
  const ev=currentWork.spatial_evidence,f=currentWork.knowledge?.fields;
  if(!ev||!['primary','secondary','rationale'].every(k=>Object.hasOwn(ev,k))||ev.primary!==r.fields.spatial_primary||!equal(ev.secondary,r.fields.spatial_secondary)||ev.rationale!==r.fields.spatial_rationale)fail('post evidence three values');
  if(!f||!spatialKeys.every(k=>Object.hasOwn(f,k)&&equal(f[k],r.fields[k])))fail('post knowledge three presence/values');
  for(const k of ['spatial_secondary','spatial_rationale'])if(Object.hasOwn(currentWork,k)&&!equal(currentWork[k],r.fields[k]))fail('post optional top values');
 }
 return mode==='exact_existing_knowledge'?'existing_knowledge_unverified':'scoped_reading';
}
