import {createHash} from 'node:crypto';
import {readFileSync,existsSync} from 'node:fs';
import {join,basename} from 'node:path';
// Private proposal. Exactly 200 immutable spatial records; no older spatial behavior changes.
export const EARLY_SELECTION5_PUBLISHED_SPATIAL_INPUTS=Object.freeze({
  "early-published-spatial-selection5-round1.json": "6c9338f8c9fb22fe58a7dc2c4b7b4302cf22f3b8a85f3482000d20edced8af7e",
  "early-published-spatial-selection5-round2.json": "fae3c5c62806d3001b31eb2ffc1fa3e60579a7a35e57cdfb0851799db31f0204",
  "early-published-spatial-selection5-round3.json": "47ef56f35c2189aeeb5e8869d75f6358ec2c0583b70d105426416dbe6adccbfc",
  "early-published-spatial-selection5-round4.json": "f603e4182cffdccb5ad1880e6119f9140c2091e8d9882bab2d8ba9d07b24a937"
});
export const EARLY_SELECTION5_SPATIAL_SELECTION_FILE='early-published-spatial-expansion-selection5.json';
export const EARLY_SELECTION5_SPATIAL_SELECTION_SHA256='5e036333e4da33598fed12900ab34e16b8e723bf84082a6f1d9a5c0b2247540e';
export const EARLY_SELECTION5_CANONICAL_SNAPSHOT_SHA256='eacb62430a90cc1cf8abf83b1322322cd68bf094da99dbdc596475759ead7cd9';
const FIXED_ID_TO_FILE=Object.freeze({
  "Q100149217": "early-published-spatial-selection5-round2.json",
  "Q100896057": "early-published-spatial-selection5-round2.json",
  "Q104834417": "early-published-spatial-selection5-round3.json",
  "Q105101562": "early-published-spatial-selection5-round2.json",
  "Q105359432": "early-published-spatial-selection5-round2.json",
  "Q106080227": "early-published-spatial-selection5-round4.json",
  "Q108101049": "early-published-spatial-selection5-round2.json",
  "Q108456731": "early-published-spatial-selection5-round3.json",
  "Q108535559": "early-published-spatial-selection5-round4.json",
  "Q108749689": "early-published-spatial-selection5-round1.json",
  "Q108907333": "early-published-spatial-selection5-round1.json",
  "Q108913112": "early-published-spatial-selection5-round4.json",
  "Q108913130": "early-published-spatial-selection5-round4.json",
  "Q109284514": "early-published-spatial-selection5-round1.json",
  "Q109567925": "early-published-spatial-selection5-round2.json",
  "Q110757464": "early-published-spatial-selection5-round2.json",
  "Q110890426": "early-published-spatial-selection5-round1.json",
  "Q111140804": "early-published-spatial-selection5-round2.json",
  "Q111770755": "early-published-spatial-selection5-round2.json",
  "Q112254519": "early-published-spatial-selection5-round2.json",
  "Q113009361": "early-published-spatial-selection5-round1.json",
  "Q113084558": "early-published-spatial-selection5-round4.json",
  "Q114346350": "early-published-spatial-selection5-round3.json",
  "Q114812022": "early-published-spatial-selection5-round1.json",
  "Q115095209": "early-published-spatial-selection5-round1.json",
  "Q116457250": "early-published-spatial-selection5-round1.json",
  "Q117067532": "early-published-spatial-selection5-round1.json",
  "Q117398305": "early-published-spatial-selection5-round2.json",
  "Q11859870": "early-published-spatial-selection5-round4.json",
  "Q119488591": "early-published-spatial-selection5-round1.json",
  "Q122166736": "early-published-spatial-selection5-round1.json",
  "Q122639757": "early-published-spatial-selection5-round1.json",
  "Q123232540": "early-published-spatial-selection5-round1.json",
  "Q123572104": "early-published-spatial-selection5-round1.json",
  "Q123584250": "early-published-spatial-selection5-round2.json",
  "Q123739638": "early-published-spatial-selection5-round1.json",
  "Q124611398": "early-published-spatial-selection5-round1.json",
  "Q124975608": "early-published-spatial-selection5-round1.json",
  "Q125456218": "early-published-spatial-selection5-round3.json",
  "Q125460059": "early-published-spatial-selection5-round2.json",
  "Q125460602": "early-published-spatial-selection5-round1.json",
  "Q125726065": "early-published-spatial-selection5-round1.json",
  "Q126736527": "early-published-spatial-selection5-round1.json",
  "Q128035050": "early-published-spatial-selection5-round2.json",
  "Q129500814": "early-published-spatial-selection5-round2.json",
  "Q130259113": "early-published-spatial-selection5-round1.json",
  "Q130284308": "early-published-spatial-selection5-round2.json",
  "Q131056627": "early-published-spatial-selection5-round1.json",
  "Q131194677": "early-published-spatial-selection5-round4.json",
  "Q131308108": "early-published-spatial-selection5-round1.json",
  "Q131310687": "early-published-spatial-selection5-round2.json",
  "Q131314393": "early-published-spatial-selection5-round1.json",
  "Q131382193": "early-published-spatial-selection5-round4.json",
  "Q131382210": "early-published-spatial-selection5-round4.json",
  "Q131382258": "early-published-spatial-selection5-round4.json",
  "Q131382350": "early-published-spatial-selection5-round3.json",
  "Q131382368": "early-published-spatial-selection5-round3.json",
  "Q131382369": "early-published-spatial-selection5-round3.json",
  "Q131382376": "early-published-spatial-selection5-round3.json",
  "Q131382751": "early-published-spatial-selection5-round2.json",
  "Q131382856": "early-published-spatial-selection5-round2.json",
  "Q131382896": "early-published-spatial-selection5-round1.json",
  "Q131382905": "early-published-spatial-selection5-round1.json",
  "Q131437819": "early-published-spatial-selection5-round1.json",
  "Q131445140": "early-published-spatial-selection5-round2.json",
  "Q131461889": "early-published-spatial-selection5-round4.json",
  "Q131461935": "early-published-spatial-selection5-round2.json",
  "Q131461950": "early-published-spatial-selection5-round2.json",
  "Q131461977": "early-published-spatial-selection5-round2.json",
  "Q131462039": "early-published-spatial-selection5-round1.json",
  "Q131472441": "early-published-spatial-selection5-round4.json",
  "Q131472454": "early-published-spatial-selection5-round3.json",
  "Q131472487": "early-published-spatial-selection5-round3.json",
  "Q131472522": "early-published-spatial-selection5-round2.json",
  "Q131517353": "early-published-spatial-selection5-round3.json",
  "Q131517785": "early-published-spatial-selection5-round3.json",
  "Q131518001": "early-published-spatial-selection5-round3.json",
  "Q131518223": "early-published-spatial-selection5-round1.json",
  "Q131518707": "early-published-spatial-selection5-round2.json",
  "Q131765689": "early-published-spatial-selection5-round1.json",
  "Q131835778": "early-published-spatial-selection5-round1.json",
  "Q132223021": "early-published-spatial-selection5-round2.json",
  "Q132310151": "early-published-spatial-selection5-round4.json",
  "Q133445493": "early-published-spatial-selection5-round4.json",
  "Q133445688": "early-published-spatial-selection5-round4.json",
  "Q133800799": "early-published-spatial-selection5-round3.json",
  "Q133823814": "early-published-spatial-selection5-round4.json",
  "Q133825657": "early-published-spatial-selection5-round4.json",
  "Q134053481": "early-published-spatial-selection5-round4.json",
  "Q134462805": "early-published-spatial-selection5-round2.json",
  "Q134474913": "early-published-spatial-selection5-round4.json",
  "Q134478936": "early-published-spatial-selection5-round1.json",
  "Q134583662": "early-published-spatial-selection5-round3.json",
  "Q134720550": "early-published-spatial-selection5-round4.json",
  "Q134720556": "early-published-spatial-selection5-round3.json",
  "Q134740690": "early-published-spatial-selection5-round1.json",
  "Q135000521": "early-published-spatial-selection5-round3.json",
  "Q135088692": "early-published-spatial-selection5-round3.json",
  "Q135092825": "early-published-spatial-selection5-round3.json",
  "Q135092828": "early-published-spatial-selection5-round2.json",
  "Q135092849": "early-published-spatial-selection5-round3.json",
  "Q135093195": "early-published-spatial-selection5-round4.json",
  "Q135093212": "early-published-spatial-selection5-round2.json",
  "Q135093488": "early-published-spatial-selection5-round3.json",
  "Q135194729": "early-published-spatial-selection5-round3.json",
  "Q135273589": "early-published-spatial-selection5-round1.json",
  "Q135903065": "early-published-spatial-selection5-round1.json",
  "Q136749524": "early-published-spatial-selection5-round1.json",
  "Q136831448": "early-published-spatial-selection5-round1.json",
  "Q136831508": "early-published-spatial-selection5-round2.json",
  "Q137004341": "early-published-spatial-selection5-round1.json",
  "Q137004576": "early-published-spatial-selection5-round1.json",
  "Q137752661": "early-published-spatial-selection5-round2.json",
  "Q137752724": "early-published-spatial-selection5-round2.json",
  "Q137752739": "early-published-spatial-selection5-round1.json",
  "Q137824853": "early-published-spatial-selection5-round3.json",
  "Q137972767": "early-published-spatial-selection5-round1.json",
  "Q138013063": "early-published-spatial-selection5-round1.json",
  "Q138016412": "early-published-spatial-selection5-round2.json",
  "Q138035557": "early-published-spatial-selection5-round1.json",
  "Q138657774": "early-published-spatial-selection5-round1.json",
  "Q139600840": "early-published-spatial-selection5-round1.json",
  "Q139733973": "early-published-spatial-selection5-round1.json",
  "Q139790858": "early-published-spatial-selection5-round1.json",
  "Q139881255": "early-published-spatial-selection5-round2.json",
  "Q139922517": "early-published-spatial-selection5-round2.json",
  "Q139955612": "early-published-spatial-selection5-round1.json",
  "Q139973324": "early-published-spatial-selection5-round1.json",
  "Q139979338": "early-published-spatial-selection5-round1.json",
  "Q141523042": "early-published-spatial-selection5-round3.json",
  "Q14755067": "early-published-spatial-selection5-round4.json",
  "Q14903769": "early-published-spatial-selection5-round4.json",
  "Q15035526": "early-published-spatial-selection5-round4.json",
  "Q15984037": "early-published-spatial-selection5-round4.json",
  "Q16258116": "early-published-spatial-selection5-round4.json",
  "Q16271779": "early-published-spatial-selection5-round4.json",
  "Q16385557": "early-published-spatial-selection5-round4.json",
  "Q16570386": "early-published-spatial-selection5-round4.json",
  "Q16953588": "early-published-spatial-selection5-round4.json",
  "Q17016080": "early-published-spatial-selection5-round3.json",
  "Q17093978": "early-published-spatial-selection5-round4.json",
  "Q17102722": "early-published-spatial-selection5-round4.json",
  "Q17110831": "early-published-spatial-selection5-round4.json",
  "Q17402007": "early-published-spatial-selection5-round3.json",
  "Q17632295": "early-published-spatial-selection5-round3.json",
  "Q17633137": "early-published-spatial-selection5-round4.json",
  "Q18149437": "early-published-spatial-selection5-round4.json",
  "Q18177246": "early-published-spatial-selection5-round3.json",
  "Q18356750": "early-published-spatial-selection5-round4.json",
  "Q18356841": "early-published-spatial-selection5-round3.json",
  "Q18391798": "early-published-spatial-selection5-round4.json",
  "Q18786526": "early-published-spatial-selection5-round3.json",
  "Q19902649": "early-published-spatial-selection5-round4.json",
  "Q20166701": "early-published-spatial-selection5-round4.json",
  "Q20800638": "early-published-spatial-selection5-round3.json",
  "Q22907050": "early-published-spatial-selection5-round3.json",
  "Q24255710": "early-published-spatial-selection5-round3.json",
  "Q24521517": "early-published-spatial-selection5-round3.json",
  "Q27902538": "early-published-spatial-selection5-round3.json",
  "Q27903815": "early-published-spatial-selection5-round4.json",
  "Q27917009": "early-published-spatial-selection5-round3.json",
  "Q28004272": "early-published-spatial-selection5-round4.json",
  "Q28452086": "early-published-spatial-selection5-round3.json",
  "Q28683258": "early-published-spatial-selection5-round3.json",
  "Q29830993": "early-published-spatial-selection5-round3.json",
  "Q3697826": "early-published-spatial-selection5-round4.json",
  "Q39053152": "early-published-spatial-selection5-round4.json",
  "Q41663473": "early-published-spatial-selection5-round3.json",
  "Q43569711": "early-published-spatial-selection5-round3.json",
  "Q44606096": "early-published-spatial-selection5-round4.json",
  "Q47468233": "early-published-spatial-selection5-round4.json",
  "Q48817743": "early-published-spatial-selection5-round3.json",
  "Q5327140": "early-published-spatial-selection5-round4.json",
  "Q54488384": "early-published-spatial-selection5-round3.json",
  "Q54859991": "early-published-spatial-selection5-round3.json",
  "Q55230322": "early-published-spatial-selection5-round4.json",
  "Q55522655": "early-published-spatial-selection5-round3.json",
  "Q5599637": "early-published-spatial-selection5-round4.json",
  "Q56274909": "early-published-spatial-selection5-round2.json",
  "Q57616110": "early-published-spatial-selection5-round2.json",
  "Q60741201": "early-published-spatial-selection5-round2.json",
  "Q62113776": "early-published-spatial-selection5-round2.json",
  "Q63981675": "early-published-spatial-selection5-round3.json",
  "Q65230994": "early-published-spatial-selection5-round2.json",
  "Q65243928": "early-published-spatial-selection5-round2.json",
  "Q69566931": "early-published-spatial-selection5-round2.json",
  "Q7715536": "early-published-spatial-selection5-round4.json",
  "Q77430439": "early-published-spatial-selection5-round3.json",
  "Q7759446": "early-published-spatial-selection5-round4.json",
  "Q84953696": "early-published-spatial-selection5-round2.json",
  "Q96107494": "early-published-spatial-selection5-round2.json",
  "Q96346405": "early-published-spatial-selection5-round3.json",
  "Q96793141": "early-published-spatial-selection5-round2.json",
  "Q97627887": "early-published-spatial-selection5-round2.json",
  "Q97968391": "early-published-spatial-selection5-round2.json",
  "Q98218230": "early-published-spatial-selection5-round3.json",
  "Q98917088": "early-published-spatial-selection5-round2.json",
  "Q98925651": "early-published-spatial-selection5-round2.json",
  "Q99693764": "early-published-spatial-selection5-round2.json",
  "Q99841246": "early-published-spatial-selection5-round3.json"
});
const FIXED_PUBLIC_DEPENDENCIES=Object.freeze({
  "research/issue-input-snapshots/early-recent-round11-log.json": "be1391da592be7badbeba8a77a7df8cb9356db724afb3479c0ae8fa01b091bb7",
  "research/issue-input-snapshots/early-recent-round11.json": "7dcfcab4ebe159ed6c4abc2daa90b3c86d929fc9a4b51a0f7140c75bdb573623",
  "research/issue-input-snapshots/early-recent-round15-log.json": "deef0d28fd4f44924363f1524d42389c20048ed1b8b826b43431cb78f9a5aebc",
  "research/issue-input-snapshots/early-recent-round15.json": "d75ea892c3b037c3b5107d24f86da1e6b97bf6240975e43a1ec566b82b895743",
  "research/issue-input-snapshots/early-recent-round16-log.json": "01e7e46d3e8636bd5e6eae465bd02e57e477853bfdfc7ac61f489564ffc6fae7",
  "research/issue-input-snapshots/early-recent-round16.json": "cb4930ace6a0c8b99af95806753ec9443bd953864bc53a72e862dafad336b85e",
  "research/issue-input-snapshots/early-recent-round17-log.json": "fcf9351b75d2df60e8e96bf667e431b290aa25e0bbf455cae7278d14f56620b8",
  "research/issue-input-snapshots/early-recent-round17.json": "fb46ac7f15cf858fa9f07ac5145a4e36082085339a3069b2321e0dea33eaf4aa",
  "research/issue-input-snapshots/early-recent-round18-log.json": "ece75f45653d2b2aa132bb22ffdd575a1ac36b5821aa29a47bc7400b3b79d5d7",
  "research/issue-input-snapshots/early-recent-round18.json": "098338396f5e8d0788b849000a989da8bbbc557c620d4162568e674419d89916",
  "research/issue-input-snapshots/early-recent-round19-log.json": "4380690ad63ebcc51377f5f495e8a05a1fc0e0e107c9b822c6ab36341e3a129d",
  "research/issue-input-snapshots/early-recent-round19.json": "70515669151c968f9cd2d9061bd22e54602c99d3cbc2db199c67f83a50da7db9",
  "research/issue-input-snapshots/early-recent-round2-log.json": "49b697d92d071836107d84fb212d888230ad8146e3276683d01c20dc06da4364",
  "research/issue-input-snapshots/early-recent-round2.json": "56013edf33189d2ba0ed056dabef2280e266e6e8503157dfbaeb4568138fe926",
  "research/issue-input-snapshots/early-recent-round20-log.json": "a27f53cea34126e3fc2e1cf247a90f06ec0f03c60adfc84f5e93d4dd00653be7",
  "research/issue-input-snapshots/early-recent-round20.json": "67295a887671ac37a6e5f6b427bc262dc7034d2050a9bf1ff8819d8a142d58d6",
  "research/issue-input-snapshots/early-recent-round21-log.json": "669cc7b192a35fd7627e7406628b18f82e219763e127e42f0b035060e21e964c",
  "research/issue-input-snapshots/early-recent-round21.json": "4b44b8849b7a770c000b77393485db175b5bbc1547493fe0764def26c395b545",
  "research/issue-input-snapshots/early-recent-round3-log.json": "f12cca85f84fcb1109f617e735181ce896a7a379787f7043b0d02fceea5f0c15",
  "research/issue-input-snapshots/early-recent-round3.json": "b23b74f5b47553861d83a8a0ec9ca232284d4c8ad72ff7805b908658cea54e88",
  "research/issue-input-snapshots/global-recent-round13-log.json": "f8de14e5aebd76e9645c6783f5ac8d888a425a2c516b7199c61040e285c12c60",
  "research/issue-input-snapshots/global-recent-round13.json": "97491e6bd7e7e9847a90776e0dae37f1067c9a74be8465823b5ad1d55807861e",
  "research/issue-input-snapshots/global-recent-round14-log.json": "4b2a94c344c5ff88f565951ca3058acb221d381f4b31e403f3afcb84b013ebc6",
  "research/issue-input-snapshots/global-recent-round14.json": "9f082aaa438b0e526947bba5a270eed7faf346104cc06269a4bff6e4acdfb57f",
  "research/issue-input-snapshots/global-recent-round15-log.json": "a01609dedd5feb8fe4c5855c353e9ce317e6f6d4c22cc67748f0f3d3925879da",
  "research/issue-input-snapshots/global-recent-round15.json": "b5ffbfdab6af80a0c263e3ab749dcc96843b2514365de377fbb8713b925e193c",
  "research/issue-input-snapshots/global-recent-round16-log.json": "1242824887e690622011ed2d89e479b6eede56404bb760ce531fbb884ae36988",
  "research/issue-input-snapshots/global-recent-round16.json": "e0d2b9aab9143a22408d2e4481cee88b5f6c457159dd7a79fc6f9965c7467750",
  "research/issue-input-snapshots/global-recent-round17-log.json": "aa93f16944fefde244770e53ca20717e505c5e9b83e0edb8006706c9cbb7d20f",
  "research/issue-input-snapshots/global-recent-round17.json": "5b7cf8a5b9c272fb181defe7e7d053497cba3286182a5ec3614e5cd95f87c724",
  "research/issue-input-snapshots/global-recent-round18-log.json": "53ec8ba44db48fe862f1dff315b633bc424c57f3452519bbd723fc4d53aa4aff",
  "research/issue-input-snapshots/global-recent-round18.json": "635003a36ece07d03f0c37a2fbb469be8c51de0f25c175c44e0be6bc5bb284ab",
  "research/issue-input-snapshots/global-recent-round19-log.json": "71e9633b6d93861a0e1b54e07e3b54aad3cab301fc8921ce0b129d014b7fc5eb",
  "research/issue-input-snapshots/global-recent-round19.json": "a6809ef18d369fc637a4845bc59612fb19e8d7ad04a508aa61abda96273b4c1f",
  "research/issue-input-snapshots/global-recent-round4-log.json": "d5962eb687425b6468742c6db00667893a11f06da7afb12493f492e1ccd0374e",
  "research/issue-input-snapshots/global-recent-round4.json": "be25fd2e5ecc9e8dfa83b66a5562ec29cd1f52ab5e99a32828acdbb596d2c9b7",
  "research/issue-input-snapshots/global-recent-round5-log.json": "2e849f3a41c3cdbb96c51ef82053aa47120681a6f04fd7bad1cd65e7144e49a3",
  "research/issue-input-snapshots/global-recent-round5.json": "f1be8885187f82eae88c781f54678dc3e2ea76fbb3566dbeb7421561b1c5c7fe",
  "research/issue-input-snapshots/global-source-searches-round14.json": "b64c8f69caf88597a75ed00df2d5874a34ca0cd0bbcc632b22ce719e681743d4",
  "research/issue-input-snapshots/global-source-searches-round15.json": "26c28c5ccf6f09b706997df2929be3f9fbaecb756033da2887afee0b6c167979",
  "research/issue-input-snapshots/global-source-searches-round18.json": "f34c1b41b2f10d658c1d3caa8075cc99e43fcaad50c320588f3f2cb4829ecc72",
  "research/issue-input-snapshots/modern-recent-round1-log.json": "f9e2a1b8c51033ea64bef9b3dce6d85637997b34e24e3e4eec0330d055a5b861",
  "research/issue-input-snapshots/modern-recent-round1.json": "f4dac980309375647284cff1ec0061cad53482a7d6ddb2f99b36b8d3e8fc66c8",
  "research/issue-input-snapshots/modern-recent-round12-log.json": "9ed16f6300ec6fa263f83ac150b6cd61f6b1ebbd7588688f6a3af11b66d50213",
  "research/issue-input-snapshots/modern-recent-round12.json": "eade90c54f0ee45bc7a35baca044b509b7f06a81c42be34c503c532a35656ea8",
  "research/issue-input-snapshots/modern-recent-round13-log.json": "0e73897970f8c5e67bdfd923a93c0f866eebf809dbf5380df160b62986ca9e7e",
  "research/issue-input-snapshots/modern-recent-round13.json": "494cf89d7a473555bc52ffffb7f3d2e4570cc4cc1f472068a2e7edae0913fbf7",
  "research/issue-input-snapshots/modern-recent-round15-log.json": "129e49533566c38c030030bef12112b38dba59064d26c75b23d375f22411ef06",
  "research/issue-input-snapshots/modern-recent-round15.json": "e92174609bd9f76275c40e30ceaac4d218db94b60aa3d76f6fb0734a3ab667bc",
  "research/issue-input-snapshots/modern-recent-round16-log.json": "5b3ae12325a9405e5fa274322b0d3d98c2fab5e26ec21a3f8af45d7e7c91dbb7",
  "research/issue-input-snapshots/modern-recent-round16.json": "9a8ff8f268eb70c5c814a53272d0f2a12c54a8fbdb180927aee8f837dcb3ba89",
  "research/issue-input-snapshots/modern-recent-round17-log.json": "a66f2b24cf0eb1176511c579421ff95b69613d56b5e5f3d868fea3e8bf96559f",
  "research/issue-input-snapshots/modern-recent-round17.json": "0f19a3261303d6d210e986dcf92faaa563b1d2b6de9e27dda4133d4b1ded842e",
  "research/issue-input-snapshots/modern-recent-round18-log.json": "59b5d20a30eaa8671ef5307ea032e067e5f246643a0cecc4280373cde3f606b1",
  "research/issue-input-snapshots/modern-recent-round18.json": "619e7731ec15246f0eafd2f1f89a50c2d72a724224847c9eb4f27d158a4fe8ab",
  "research/issue-input-snapshots/modern-recent-round19-log.json": "f67a67babdcaa6f9f9a1e9f1a0b9a1961c970bb526f2c57e53acf0bd730c2994",
  "research/issue-input-snapshots/modern-recent-round19.json": "3d5809ed9cc1dc28050bab6b33ed7848ed4987e962c06251d5ab9f2bb9ea8abe",
  "research/issue-input-snapshots/modern-recent-round2-log.json": "6bf7b1b924283d0eec95f16fe5b923c2389a89030836cec29d73ef0b10090a51",
  "research/issue-input-snapshots/modern-recent-round2.json": "c886fdccaee345ed82346789c17e0cda9266e72b76b5d0e4ed5e886a90a26a88",
  "research/issue-input-snapshots/modern-recent-round21-log.json": "6abd829d1dbf0e092b85056e49f150f52ad555da756e29539e2291952fad266e",
  "research/issue-input-snapshots/modern-recent-round21.json": "aa252fdde85397a29a1809590f9ca4373458e9cb5388b88571119f1c9c3e5a37",
  "research/issue-input-snapshots/modern-recent-round22-log.json": "29b960184380c9071f8b5b6212a6a2c406bfde47e87df1b814b3e10db0ffff4f",
  "research/issue-input-snapshots/modern-recent-round22.json": "cbe641324338e83e868b5a7fc600adbd12bcc68fc5713d056d87762815b46244",
  "research/issue-input-snapshots/modern-recent-round3-log.json": "7f178e5bb0150d25dac9b7d4999a9d9a261d4b13e7437f51841f68d55a3cc213",
  "research/issue-input-snapshots/modern-recent-round3.json": "c633f220bd2fdafc38e2df359c347bff7b7d8347a700c0f4faa21e29f38b6f6f",
  "research/issue-input-snapshots/modern-recent-round4-log.json": "77ea9123fa06f93d9f78afb25a053b0b880208341b4af451fe4ba146f8556f5c",
  "research/issue-input-snapshots/modern-recent-round4.json": "e9d60c8470569f9b32788545a7c2ef8169b7295987fc2881fa52af051fa93cde",
  "research/issue-input-snapshots/modern-recent-round5-log.json": "4d495257515614ffdf7dbaf4beaf0010703fe5f5638e5d409f9d033550b3d2ae",
  "research/issue-input-snapshots/modern-recent-round5.json": "0345526bbea594980cfd2ef19c743eff645bf84219a420f2c034523551c5bfc1",
  "research/issue-input-snapshots/quick-retry-early-round1-log.json": "cbc74fce98088a50169d1a6412d6268c38dc886f7c30f048718411776b7a3641",
  "research/issue-input-snapshots/quick-retry-early-round1.json": "672f4d9afef5e46364ab79f7056fce296035ab585c6caebceed0e9e499e26a05",
  "research/issue-input-snapshots/quick-retry-early-round2-log.json": "e2a1c6c74ea9e03c31032e8f35a95f59ef419338c93503d589c0430a4012b726",
  "research/issue-input-snapshots/quick-retry-early-round2.json": "b0ab6bc93f92bd634028b7a97093db944e87005fe94d81536c39522364069ddb",
  "research/issue-input-snapshots/quick-retry-global-round2-log.json": "229a95ab34cd910d2c9ff8a939955c1849d3a6e8cdafdfdeafee7a4f6896fb20",
  "research/issue-input-snapshots/quick-retry-global-round2.json": "98bd00945028b06844ccf7c1180ff507e6ed045ff5a67e83d840a0f581d0152f",
  "research/issue-input-snapshots/quick-retry-global-round3-log.json": "80f94aab9d08716a8cbc409cb2a85524b006c4b5b59ec27cd483a0448504e6c7",
  "research/issue-input-snapshots/quick-retry-global-round3.json": "970116746727d11f3604c8792aed7ee64de4bebe6f3b5ccbffa5d3ebcc312d40",
  "research/issue-input-snapshots/quick-retry-lane-0.json": "5fce5b2b8279d784d7d141536d8e923508897fe00cf0f03aa907e610a8c23596",
  "research/issue-input-snapshots/quick-retry-lane-1.json": "6ac6307da6880daa689e10a48c35466fac9ed028ea6a42764b0ab4af29d072bb",
  "research/issue-input-snapshots/quick-retry-lane-2.json": "f1e3bce7c91b9744ab300726ea85acd26e5f195553ce022a63559cc16e04bda5",
  "research/issue-input-snapshots/quick-retry-lane-3.json": "ac16324a0ef149c7042828b0988fb133af9f30d08c6b8bc5b1a3e5be26af026c",
  "research/issue-input-snapshots/quick-retry-modern-round1-log.json": "a5d52823957a8094049c0b04aa8b63e36c5bff119b793d8a4365dc479503d541",
  "research/issue-input-snapshots/quick-retry-modern-round1.json": "675ff25665f1025958602524c4e9ba895dec048d2e5a09c8cb50d210f71cb61e",
  "research/issue-input-snapshots/quick-retry-modern-round2-log.json": "e3e5d9a1cb829e7cb581890d203ecea318f1bd995a1432f7c732f9e5da3ec956",
  "research/issue-input-snapshots/quick-retry-modern-round2.json": "d2bb67475ffd68cc8ced993ced6a943affd2ddf2adfe763c4a502e1981cd4322",
  "research/issue-input-snapshots/quick-retry-modern-round20-log.json": "dd37cc8253059261a26691d98861423b4058a71ba62ea18df6ff30f34b2b3fab",
  "research/issue-input-snapshots/quick-retry-modern-round20.json": "e60412e5c22b082db77572519be95f7bf5de20e4f12a416171310679a0a8fd1d",
  "research/issue-input-snapshots/quick-retry-modern-round3-log.json": "117238a0e0b9f3cf03f2cd2becb514328629890e262b75c80cc9ca25aea55fe2",
  "research/issue-input-snapshots/quick-retry-modern-round3.json": "a5edd71a8e2f41bc3a38d3523007d065abac8c884ee9bb5964b8e62a478ba628",
  "research/issue-input-snapshots/quick-retry-root-round3-log.json": "77a0adf77ac480fd0b7488be667cc26eaa576d975134d845db7602c3005ae0c6",
  "research/issue-input-snapshots/quick-retry-root-round3.json": "96db1caba91713cc68ca5fffcbb84bb7b2ffd3dd4c1e13332b1324f12223402f",
  "research/issue-input-snapshots/quick-retry2-global-round2-log.json": "ffb561bf57d9f6dac34d6f77d3768b3bf2ed23343c2baa902f88aba523c3504c",
  "research/issue-input-snapshots/quick-retry2-global-round2.json": "2043c70a9fa9f0fdb036766e000904e21237a8e7cb36371e2fe9d70e935c66a5",
  "research/issue-input-snapshots/quick-retry2-lane-1.json": "318f35175dd661e7939e6789e9d8d2a0d7e082e42277a69d31990e5da216b80f",
  "research/issue-input-snapshots/quick-retry2-lane-2.json": "1d0623bb95ec95be038d68eeeda5404a04ebc150f86e82133086b36d194428ae",
  "research/issue-input-snapshots/quick-retry2-modern-round2-log.json": "f2311237186dc642890676e3aff8bd0c044bc6d49c013b03b27d37fbe6d1db05",
  "research/issue-input-snapshots/quick-retry2-modern-round2.json": "4df5a67994da0b8a2457d9562425d926e4b973a78b36f0c8ce7b5049844953f9",
  "research/issue-input-snapshots/root-fast-round12-log.json": "f79cc94f7764c1d1fae269c201cc002c66740886da9cce5f7dce090770052ae1",
  "research/issue-input-snapshots/root-fast-round12.json": "083d29ba896a6159026ef884f6cc075705498d56c2987161043399104a506d46",
  "research/issue-input-snapshots/root-fast-round19-log.json": "038f75e7ebf3407f5bbbf512f1cfef311ad14beca66feb5a792c5c37f4a80fad",
  "research/issue-input-snapshots/root-fast-round19.json": "f27686abd5c4bee7ac14a19a569bbd04191429b12cead415e700322a05afac4d",
  "research/issue-input-snapshots/root-fast-round2-log.json": "3fbbc6bac3f8652ad107d6963a4d14b2b89625f48902d4225d9be50d0018b580",
  "research/issue-input-snapshots/root-fast-round2.json": "6ac5d5bdcc714f71a2a3cce4e5d4d6a6cb75df8ed0cd4d45e1a46b6ba107ce56",
  "research/issue-input-snapshots/root-fast-round26-log.json": "01c877b0376c429607b6760679a075d53c23cf6279ba6a9a7308e75d1ff62233",
  "research/issue-input-snapshots/root-fast-round26.json": "de525485da42b0203655d74dba7c32f56408b7bb47ea2358ca41d32be00ed7c5",
  "research/issue-input-snapshots/root-fast-round30-log.json": "3f620c9941779f3fe36bdfa1bca360a2bfacb3144fa4605cd7e9bf4bad8632c1",
  "research/issue-input-snapshots/root-fast-round30.json": "75d4e6becc00735ec0dcfba8f600be73e8a7eceb5a99eed68821f6ec2a6ac679",
  "research/issue-input-snapshots/root-fast-round32-log.json": "2f1580f8455ea6f453316ae4c5bda7ce82021c881236e65f259e29298c6f525d",
  "research/issue-input-snapshots/root-fast-round32.json": "ba6704cc79bdc64ee3115ea6a52713e1ee4dfbf7df9e0c3b5701f46071c8c4f5",
  "research/issue-input-snapshots/root-fast-round33-log.json": "d095ad155c1e3108730ab83af385a7c7e97e9c87f91404d9dae7a8e35958d6be",
  "research/issue-input-snapshots/root-fast-round33.json": "8449a3a6e3ebf620d970369232ce25fa4390bfad6b97436a17fe8a5eb793388f",
  "research/issue-input-snapshots/root-fast-round37-log.json": "0b074fc04c9832550da43b61776cfa80659f7804f9b886555f497d1d71154dbb",
  "research/issue-input-snapshots/root-fast-round37.json": "dcea815f30f7639662358dec96a2fdc5206be0ea634f9e9ac73cc976a706fd53",
  "research/issue-input-snapshots/root-fast-round40-log.json": "c958f4a72a00089543bf55a4f2bcebbac12acfb0184419150edb0ea197759fe5",
  "research/issue-input-snapshots/root-fast-round40.json": "436bd8385c3dfdb2758e00148b2118f45fa74a76107ae76d22e8b31cbab11d75",
  "research/issue-input-snapshots/root-fast-round42-log.json": "a4bf435322d725461b000216b7eaba685774548523dbe400a6e7fa147dc89eac",
  "research/issue-input-snapshots/root-fast-round42.json": "2713859135c0a5118d705776ee309d5049265e0c4336c90e09bafef9e283eb33",
  "research/issue-input-snapshots/root-fast-round45-log.json": "bcd38645925b17f8100e2bde3bcbdc58b74ec50c45a53381dbfc058f52920d85",
  "research/issue-input-snapshots/root-fast-round45.json": "9987b5476455234c4f81e99cc03858707585f811dfef7761cca64865cd655e0f",
  "research/issue-input-snapshots/root-fast-round47-log.json": "9c65bc7d5cfece13a011c6ccb284562f09a76749d2868fbaa078980ed1d95b6b",
  "research/issue-input-snapshots/root-fast-round47.json": "ee6a8fa912c5ff6f84fb3349526b3833f09e8fec4eefb72bfbf4c3f8304883b7",
  "research/issue-input-snapshots/root-fast-round49-log.json": "926f854bd3307123f010df17ddb9fd8065c068e53a7cb408943e4a406cc21748",
  "research/issue-input-snapshots/root-fast-round49.json": "f31021cf15d42fc184a22c011b304fadd40d546d751981c2b3e2e67ce66afb1b",
  "research/issue-input-snapshots/root-fast-round50-log.json": "2ac7064d87624af3111c9709551184faac4322fc7a96dba0b9e94c29d613094d",
  "research/issue-input-snapshots/root-fast-round50.json": "938d2400de5e11167db6098e75afe4f007f4cb860d518d06d47ef1b8043d83db",
  "research/issue-input-snapshots/root-fast-round53-log.json": "ae0f11bad06ce77b6fe48cda75206a490015598a7fa81597d62a228231f66dda",
  "research/issue-input-snapshots/root-fast-round53.json": "6d4e8df846f8aa75ba8ded967b2dca528747bacd29a5f7abe0b70c5e571cafa3",
  "research/issue-input-snapshots/root-fast-round59-log.json": "09551acc6cabfd7db7c66e25a8e3eabc8174686a53c3f42ce248d267951d9464",
  "research/issue-input-snapshots/root-fast-round59.json": "4af84f25d221a5fdecbcf503463bb4f32d6fb00f1d251a83d6cd2bc2311c25ae",
  "research/issue-input-snapshots/root-fast-round64-log.json": "dff41a0484485a65884e690007ed2361dbe65f31050466df5fa0973dc19e1da6",
  "research/issue-input-snapshots/root-fast-round64.json": "478be1f77e27502eaeb362dcc5d29d1819ca84b26a02ee07ea3be548c09cf94e",
  "research/issue-input-snapshots/root-fast-round68-log.json": "5b25aa5020fb4e787a7ddb13a0e53fc917be559c349f160eb465ad9595d52334",
  "research/issue-input-snapshots/root-fast-round68.json": "dd0b966302de4bc0cb2d465be83cce044e96fb234b392a6fe246c482c5b1a960",
  "research/issue-input-snapshots/root-fast-round72-log.json": "671ad551a20869bcd29dbc0d4c8936acdb94720049e8e2bc9946fe90a162e225",
  "research/issue-input-snapshots/root-fast-round72.json": "ae5823731e0d0132c406473ade310ec853bb36562b0f1a920552e114a33d702c",
  "research/issue-input-snapshots/root-fast-round73-log.json": "799d39e9b78949507a37fabbf39bbb30c49dfb78637ebd61d180e829bb6d0846",
  "research/issue-input-snapshots/root-fast-round73.json": "b74f36f5be6b3bb4b3dfadd3970a0757f34b88487edcbe41f6fbab0cad97b4a9",
  "research/issue-input-snapshots/root-fast-round74-log.json": "f0d4b3b07de179fec46626467dc8534842039902a403124d75d700af9e79ea35",
  "research/issue-input-snapshots/root-fast-round74.json": "54e095e46fbd4763956024687b5701c10132ee1235181644422696e1b5d2f255",
  "research/issues-since-1980-round10.json": "84c4b863b0083bf19064d76dc00820336ab3c02a41450cbd9de8d7ee3ca7046b",
  "research/issues-since-1980-round11.json": "9ed8de4411b7bd487d659ae93666968950dcf9276e463dcba35be2e06a3e7e91",
  "research/issues-since-1980-round12.json": "96ed2e0ba4a84c4dda0beeb7786353357c556b7b8bda8954b18a2b9df567a211",
  "research/issues-since-1980-round14.json": "c8c19b90d5ce809bc51aed27c1d442ab94a1af9d95383d34ec123e75bb75aba5",
  "research/issues-since-1980-round15.json": "6d5296484f51d40d9f270297aa5c38625d11f29f4382dadfdfed5b5056be4cbb",
  "research/issues-since-1980-round18.json": "dcce04dd9bcefe8c6377520a8bedda8099b1e3b3668e4f5c867de88832d7a29d",
  "research/issues-since-1980-round2.json": "653dc9e28f3dfc42b2e1e72e781e1a03645c76400adaa9e6b9bf0df1a34ea0d6",
  "research/issues-since-1980-round3.json": "ff29b0baeefaaf7a08af40f966a8486fe36c222b4b2520903197b7c84c6581c5",
  "research/issues-since-1980-round4.json": "9fc4a4ca9145ecd01aca1773950d5ba8232377e49c7c4bc12161e678ddbbdb6c",
  "research/issues-since-1980-round5.json": "680ed52c7bdf6d194a9e6d04223a01c32f26a61f2bc6ac77d1f8a7bbb52bbb74",
  "research/issues-since-1980-round6.json": "74f3afecda57889c7e97c8e97629243bb998c1f8538bb058bc268822fc2d661a",
  "research/issues-since-1980-round7.json": "1c1fd8375793074ff38a3a660aa8a2e0adb0f9d3092d7bdc93737a285ddae5e5",
  "research/issues-since-1980-round8.json": "aebc0d004d3c4f4cfa3afd24657be0d6569a8956cc9b5a416da6e6673a75d961",
  "research/issues-since-1980-round9.json": "1f82f41c467312401148650443c63281bed0e66d18ec5135167ad5abf023f259",
  "research/issues-source-reading-round11.json": "896490728824032502741a55cd0afc1fe6cc003b77da861901a41e4df3df907f",
  "research/issues-source-reading-round21.json": "9a2686bad677ad50e72f9e8e2acc19ffe0c71b3acf761e0af844cc1a5d68c1ed",
  "research/issues-source-reading-round22.json": "03b3b855c84e2e961de79120ea81eb0cf4f3dcee604977f2801fb56464a21974",
  "research/issues-source-reading-round23.json": "801effa904e182476154f108f08ed41781fd438103bc7d33b8a5d9e0a9eb5795",
  "research/issues-source-reading-round26.json": "7a5404435262f2f7a188299ff309542af0f5d2c93361e8b5c776f9e1cc5a53fb",
  "research/issues-source-reading-round27.json": "9deed743ee88a4a376c943212c0ec0517b45dc3273d9f2dccbd83a5354006eb2",
  "research/issues-source-reading-round28.json": "ff796a6490a51dabb6c70fba284fb2adad9e421f988856c42a262c1fae84a9d1",
  "research/issues-source-reading-round29.json": "506202638535957358bc47b31484861e67c1c067c7ec0e620f62bfe98c81bf83",
  "research/issues-source-reading-round30.json": "bf1a5e9b33b66a304e776ce36fc2a90e855fe3785d09390f4a234e78735fbe5a",
  "research/issues-source-reading-round31.json": "b32ed55cf0ae81594afc64d1b9ad48e64d0c8e9388762d2adb915e635c5380f0",
  "research/issues-source-reading-round32.json": "3a4cc284acad5e8f6782a939531b369780027bfae7ef8ca8775f17a743c75235",
  "research/issues-source-reading-round33.json": "f75cb15eee2d9b052076443e5bd0845c4f121ed33bb57892e912d4520daa66c4",
  "research/issues-source-reading-round34.json": "87e4edb0332ee3da1763054caf458b4ebe3675a6e27d42463ea4b28cbca95154",
  "research/issues-source-reading-round35.json": "79206b2c69c27e3938be8c3251500797972e01e1227c1ea97e721ed5d1782cf2",
  "research/issues-source-reading-round36.json": "0c0a8bba33dd9e0338d549ee74d82127d52cea4004316cc2418c4428c0ed9bbc",
  "research/issues-source-reading-round38.json": "c196423da31a290485f7d3bc41773362621ea4ac585a026340bb95844816360f",
  "research/issues-source-reading-round39.json": "c11dc90706066e652a608a6ce30207eb44b08ffadf0812c423dfa02431409fdd",
  "research/issues-source-reading-round4.json": "9dbc9be2f08455a36d0d6c122a7767d6ec8e35e6e1fc6548a422000a40ae00ff",
  "research/issues-source-reading-round40.json": "045b65e4f2d8990e5690ad4a8b8e1ac5e814cf62b24770e7547ceadeb7267fba",
  "research/issues-source-reading-round41.json": "9045d3e429574d788343c2bafeee25795da3ae18394b2078264698a9df3ebb3b",
  "research/issues-source-reading-round42.json": "40281a477853eb6ad615c93aea688d82aaede24b30fb95d9b4381cb37c0cba66",
  "research/issues-source-reading-round43.json": "e96863885b11a057cb33f08dd8442d333b314e09e3a5c9971fc88e07dd01bdd9",
  "research/issues-source-reading-round45.json": "c026c6661d356098d355f54aa3959fb9ddf00f244cf91ce5291be41b91ecf429",
  "research/issues-source-reading-round46.json": "3b738dcd9535fba1f86bb7ac89ac345a6a1dfa996b929a72bf028c10aa146175",
  "research/issues-source-reading-round47.json": "6c23109ecb8941a1c931931e5889b23b77ee046a76073ee29cfb44dcb6029f20",
  "research/issues-source-reading-round49.json": "a4de2b215d65c4266833aa56b1a3b5c6d4f3d8d38759705815179352b7ca674b",
  "research/issues-source-reading-round51.json": "457d6b583b12ef8f7f37519e1a8fdb1d4676572bf8b2b93e0128370ff50afe73",
  "research/issues-source-reading-round53.json": "f2a59e0d08aa7ef5b0f55656ac17ea8bedfe4b19913884ad9cf78bfe05f024ce",
  "research/issues-source-reading-round55.json": "c92919012b73151b119de4abff1496f8befb3c743961394640c196d0466bab9c",
  "research/issues-source-reading-round77.json": "cc23c9e956b5758068d01ae9b831aecc0d4608adcbf4e8681d8acf7ce4000c14",
  "research/issues-source-reading-round78.json": "de3229babd07f971eb1eeda5cd880c63077481b125843baa1901115d5671606d",
  "research/issues-source-reading-round84.json": "cb9c63005da7c37c79959239e8af2a05582cb109f28e5e5900bf0ceebdd5e16b",
  "research/issues-source-reading-round86.json": "b0e5e1e67dc0d4b073a0a1296f9899978a749a9ab159b319ba560c1fe10fd604"
});

const hash=b=>createHash('sha256').update(b).digest('hex');
const sorted=v=>Array.isArray(v)?v.map(sorted):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sorted(v[k])])):v;
export const earlySelection5RecordSha=v=>hash(JSON.stringify(sorted(v)));
const equal=(a,b)=>a===undefined||b===undefined?a===b:earlySelection5RecordSha(a)===earlySelection5RecordSha(b);
const loaded=new Map();
function exactFile(archive,sha,{repoDir,evidenceDir},role){
  if(!repoDir||!/^research\/(?:[A-Za-z0-9_-]+\.json|(?:issue|spatial)-input-snapshots\/[A-Za-z0-9_-]+\.json)$/.test(archive))throw new Error('Early selection5 archive path rejected: '+role);
  const spatial=archive==='research/spatial-input-snapshots/'+EARLY_SELECTION5_SPATIAL_SELECTION_FILE||Object.hasOwn(EARLY_SELECTION5_PUBLISHED_SPATIAL_INPUTS,basename(archive));
  const pin=spatial?(basename(archive)===EARLY_SELECTION5_SPATIAL_SELECTION_FILE?EARLY_SELECTION5_SPATIAL_SELECTION_SHA256:EARLY_SELECTION5_PUBLISHED_SPATIAL_INPUTS[basename(archive)]):FIXED_PUBLIC_DEPENDENCIES[archive];
  if(!pin||pin!==sha)throw new Error('Early selection5 unpinned dependency: '+role);
  const path=join(repoDir,archive),bytes=readFileSync(path);
  if(hash(bytes)!==sha)throw new Error('Early selection5 archive digest mismatch: '+role);
  let d=loaded.get(path+sha);if(!d){d=JSON.parse(bytes);loaded.set(path+sha,d);}
  if(evidenceDir){const pp=join(evidenceDir,basename(archive));if(existsSync(pp)&&hash(readFileSync(pp))!==sha)throw new Error('Early selection5 private/public byte mismatch: '+role);}
  return d;
}
function exactRow(d,id,sha,role){
 const matches=[...(d.records||[]),...(d.deferred||[])].filter(r=>r.id===id&&(!sha||earlySelection5RecordSha(r)===sha));
 if(matches.length!==1)throw new Error('Early selection5 exact row cardinality: '+role+'/'+id);return matches[0];
}
const nodes=l=>!l?[]:[l,...(l.previous_attempts||[]).flatMap(nodes)];
const scope=w=>Object.fromEntries(['id','title_zh','author','form','forms','source_entity_kind','source_types'].map(k=>[k,w[k]??null]));
const originalSpatialProjection=w=>Object.fromEntries(['spatial_primary','spatial_secondary','spatial_rationale'].map(k=>[k,{present:Object.hasOwn(w.knowledge?.fields||{},k),value:w.knowledge?.fields?.[k]??null}]));
export function earlySelection5PublishedSpatialIds(){return new Set(Object.keys(FIXED_ID_TO_FILE));}
export function isEarlySelection5PublishedSpatialRecord(r){
 return !!r&&(Object.hasOwn(FIXED_ID_TO_FILE,r.id)||Object.hasOwn(EARLY_SELECTION5_PUBLISHED_SPATIAL_INPUTS,r.source_spatial_input_file)||r.spatial_selection_sha256===EARLY_SELECTION5_SPATIAL_SELECTION_SHA256);
}
// The integration only appends these four aliases. Every pre-existing S key stays exact.
export function bindEarlySelection5SpatialRecord(r){
 const file=FIXED_ID_TO_FILE[r.id];if(!file)throw new Error('Early selection5 fixed ID missing');
 return {...r,source_spatial_input_file:file,source_spatial_input_sha256:EARLY_SELECTION5_PUBLISHED_SPATIAL_INPUTS[file],source_spatial_input_archive:'research/spatial-input-snapshots/'+file,source_spatial_input_record_sha256:earlySelection5RecordSha(r)};
}
export function validateEarlySelection5PublishedSpatialEvidence(r,{repoDir,evidenceDir,currentWork,issueAssertions,sourceSearchLog,spatialAdoptionPhase='auto'}={}){
 const fail=why=>{throw new Error('Early selection5 published spatial rejected ('+why+'): '+r.id);};
 const ctx={repoDir,evidenceDir},file=FIXED_ID_TO_FILE[r.id];
 if(!file||r.source_spatial_input_file!==file||r.source_spatial_input_sha256!==EARLY_SELECTION5_PUBLISHED_SPATIAL_INPUTS[file]||r.source_spatial_input_archive!=='research/spatial-input-snapshots/'+file)fail('exact fixed ID/input declaration');
 const sd=exactFile(r.source_spatial_input_archive,r.source_spatial_input_sha256,ctx,'S');
 if(sd.metadata?.status!=='frozen_checkpoint'||sd.records?.length!==50)fail('fixed frozen S checkpoint');
 const original=exactRow(sd,r.id,r.source_spatial_input_record_sha256,'S');
 const extra=new Set(['source_spatial_input_file','source_spatial_input_sha256','source_spatial_input_archive','source_spatial_input_record_sha256']);
 if(Object.keys(r).some(k=>!Object.hasOwn(original,k)&&!extra.has(k)))fail('unapproved derived key');
 for(const k of Object.keys(original))if(!Object.hasOwn(r,k)||!equal(r[k],original[k]))fail('changed original S key '+k);
 if(Object.keys(original).some(k=>extra.has(k)))fail('original S unexpectedly has derived aliases');
 const sel=exactFile('research/spatial-input-snapshots/'+EARLY_SELECTION5_SPATIAL_SELECTION_FILE,EARLY_SELECTION5_SPATIAL_SELECTION_SHA256,ctx,'selection');
 if(sel.metadata?.status!=='frozen_spatial_assignment'||sel.records?.length!==200||sel.metadata.canonical_sha256!==EARLY_SELECTION5_CANONICAL_SNAPSHOT_SHA256||r.spatial_selection_sha256!==EARLY_SELECTION5_SPATIAL_SELECTION_SHA256||r.source_canonical_snapshot_sha256!==EARLY_SELECTION5_CANONICAL_SNAPSHOT_SHA256)fail('fixed selection/snapshot');
 const s=sel.records[r.spatial_selection_index],old=s?.canonical_record;
 if(!s||s.id!==r.id||s.selection_index!==r.spatial_selection_index||!equal(s.identity,r.identity)||!old||old.spatial_primary!=='unknown'||earlySelection5RecordSha(old)!==r.source_canonical_record_sha256||earlySelection5RecordSha(old)!==s.canonical_record_sha256)fail('exact selection identity/current-row digest');
 if(!equal(r.fields,s.reviewed_spatial_proposal.fields)||r.spatial_basis_mode!==s.reviewed_spatial_proposal.spatial_basis_mode)fail('fixed space proposal');
 if(!currentWork||currentWork.id!==r.id||currentWork.issue_analysis_status==='missing'||!equal(scope(currentWork),scope(old))||!equal(scope(old),r.frozen_canonical_identity_scope))fail('current identity/source grain');
 // The five new descriptive dimensions remain free to grow: only source identity,
 // dates, displayed core, original assertion/history and space are constrained.
 for(const k of ['first_year','sort_year','source_first_year','year_display','issue','issue_facets','topics','issue_analysis_status'])
  if(Object.hasOwn(currentWork,k)!==Object.hasOwn(old,k)||!equal(currentWork[k],old[k]))fail('current core/date '+k);
 if(currentWork.completion?.source_verified!==old.completion?.source_verified)fail('verification upgrade');
 if(issueAssertions!==undefined&&!equal(issueAssertions,currentWork.knowledge?.assertions))fail('assertion context');
 if(sourceSearchLog!==undefined&&!equal(sourceSearchLog,currentWork.source_search_log))fail('process context');
 if(!equal(r.preserved_source_search_log,old.source_search_log)||!equal(currentWork.source_search_log,old.source_search_log)||earlySelection5RecordSha(old.source_search_log)!==r.preserved_source_search_log_sha256||!equal(r.preserved_source_search_log,s.preserved_source_search_log))fail('full source/prior/previous history');
 const ad=exactFile(r.source_analysis_archive,r.source_analysis_sha256,ctx,'A');
 const a=exactRow(ad,r.id,r.source_analysis_record_sha256,'A');
 if(r.source_analysis_file!==basename(r.source_analysis_archive)||r.source_analysis_archive!==s.active_analysis_archive||r.source_analysis_sha256!==s.active_analysis_sha256||!equal(a,r.original_analysis_record)||!equal(a,s.original_analysis_record)||!equal(ad.metadata,r.original_analysis_metadata)||!equal(ad.metadata,s.original_analysis_metadata)||!equal(a.identity,r.identity)||a.verification_status!=='knowledge_added_unverified'||a.fields?.issue!==old.issue)fail('exact A/metadata/identity');
 const agg=exactFile(r.source_core_assertion_file,r.source_core_assertion_file_sha256,ctx,'active aggregate A');
 const ca=s.canonical_assertion;
 if(r.source_core_assertion_file!==s.source_core_assertion_file||earlySelection5RecordSha(ca)!==r.source_core_assertion_record_sha256||ca.input_file!==r.source_core_assertion_file||!exactRow(agg,r.id,null,'active aggregate').fields?.issue||!currentWork.knowledge?.assertions?.some(x=>equal(x,ca)))fail('active original assertion');
 const oldAssertions=old.knowledge?.assertions||[],nowAssertions=currentWork.knowledge?.assertions||[];
 if(nowAssertions.length<oldAssertions.length||oldAssertions.some((x,i)=>!equal(x,nowAssertions[i])))fail('old assertion prefix/history');
 const oldSources=old.sources||[];
 if(!Array.isArray(currentWork.sources)||oldSources.length>currentWork.sources.length||oldSources.some((x,i)=>x!==currentWork.sources[i]))fail('old source links/order');
 let l=null;
 if(s.original_log_record!==null){
  if(!r.source_log_archive||r.source_log_archive!==s.original_log_archive||r.source_log_file!==basename(r.source_log_archive)||r.source_log_sha256!==s.original_log_sha256)fail('175 exact original L declaration');
  const ld=exactFile(r.source_log_archive,r.source_log_sha256,ctx,'L');l=exactRow(ld,r.id,r.source_log_record_sha256,'L');
  if(!equal(l,r.original_reading_log)||!equal(l,s.original_log_record)||!equal(ld.metadata,r.original_log_metadata)||!equal(ld.metadata,s.original_log_metadata)||!equal(l.identity,r.identity)||!nodes(old.source_search_log).some(n=>equal(n.raw_reading_log,l)))fail('175 exact original L/body/full process');
 }else{
  // This exact pinned subset never retained a companion L for the active A.
  // Some have later unrelated attempts: the whole actual process stays exact.
  if(['source_log_file','source_log_archive','source_log_sha256','source_log_record_sha256','original_reading_log','original_log_metadata'].some(k=>r[k]!==null))fail('fabricated companion L in fixed 25');
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
  if(r.analysis_basis!=='reuse_original_scoped_material_unverified'||!equal(r.sources,a.sources)||!r.sources.length||r.source_evidence.some(e=>e.type!=='saved_original_limited_setting'||e.new_read_performed!==false||e.supports_spatial_independently!==true||!r.sources.includes(e.url)))fail('saved original limited-setting boundary');
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
