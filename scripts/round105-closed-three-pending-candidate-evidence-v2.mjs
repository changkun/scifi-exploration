import {readFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
// Only three fixed R105 pending directions. Original empty references remain empty.
const PINS={
  "input_file": "research/classification-discovery-inputs/round105-root-reviewed-three-pending-directions.json",
  "input_sha256": "50527e2eebe57ca9431ee09d8d58e848fc2ee9158596a2e70f7e2cef1833019f",
  "private_pre_file": "round105-root-reviewed-three-pending-directions-private.json",
  "baseline": "cc9fb459087d95fc86b5b321fd532897f3632bb7043e5acd50aebd8864eab159",
  "ids": [
    "pending:round105-early-S18-observation-without-relocation",
    "pending:round105-early-S18-self-adjusted-feelings-and-value-choice",
    "pending-proposal:round105-global-response-withdrawal-punishment"
  ],
  "members": [
    "Q19097751",
    "Q7728338",
    "Q2874783",
    "Q91295020",
    "Q19947806",
    "Q6009297"
  ],
  "original_proposals": [
    {
      "file": "research/classification-discovery-inputs/round105-early-original-two-pending-directions.json",
      "sha256": "3aa491122da3e72621d0d2bfd176c0c664e4a369990bce041bb261559fc1b1fa"
    },
    {
      "file": "research/classification-discovery-inputs/round105-global-original-response-withdrawal-note.json",
      "sha256": "8746045e55641778a6b63fa44f05bbc93454875188110ed381029e73c5495eec"
    }
  ],
  "original_analyses": [
    {
      "candidate_id": "pending:round105-early-S18-observation-without-relocation",
      "id": "Q19097751",
      "reference": {
        "file": "research/issues-before-1900.json",
        "file_sha256": "e75c4823aa33b13ea16dc523802c370cd11ba6a3dc295ca0ed470d154140aa19",
        "record_pointer": "$.records[50]",
        "record_sha256": "71d586c365c3cbe3a857060f0dd6d8a2e354a17a937f3b7b9f05aef659bf232d"
      }
    },
    {
      "candidate_id": "pending:round105-early-S18-observation-without-relocation",
      "id": "Q7728338",
      "reference": {
        "file": "research/issues-before-1900.json",
        "file_sha256": "e75c4823aa33b13ea16dc523802c370cd11ba6a3dc295ca0ed470d154140aa19",
        "record_pointer": "$.records[46]",
        "record_sha256": "6b3ec16eddbd9bb20d31b0f25bcc2ae5af35a41de2b1ade08714eb22883fce3c"
      }
    },
    {
      "candidate_id": "pending:round105-early-S18-self-adjusted-feelings-and-value-choice",
      "id": "Q2874783",
      "reference": {
        "file": "research/issues-since-1980-round2.json",
        "file_sha256": "653dc9e28f3dfc42b2e1e72e781e1a03645c76400adaa9e6b9bf0df1a34ea0d6",
        "record_pointer": "$.records[16]",
        "record_sha256": "83ec5d829914fd584d48c3ba01d523c476d0b9825444525aafa80488e570d84a"
      }
    },
    {
      "candidate_id": "pending:round105-early-S18-self-adjusted-feelings-and-value-choice",
      "id": "Q91295020",
      "reference": {
        "file": "research/issues-since-1980-round2.json",
        "file_sha256": "653dc9e28f3dfc42b2e1e72e781e1a03645c76400adaa9e6b9bf0df1a34ea0d6",
        "record_pointer": "$.records[59]",
        "record_sha256": "bde45385cfe346fb668d7ac77263af7fa6ef6f4b4ec4d57870e73bebeee19733"
      }
    },
    {
      "candidate_id": "pending-proposal:round105-global-response-withdrawal-punishment",
      "id": "Q19947806",
      "reference": {
        "file": "research/issues-1900-1979.json",
        "file_sha256": "2781f493620c79474ca28ced93019a42e63e6161bbcb92c7c5b316d5e5b01272",
        "record_pointer": "$.records[246]",
        "record_sha256": "3700e141ffdbb779e97c595086b1ff225e4aba6a3f874022c8ea51877258e4e4"
      }
    },
    {
      "candidate_id": "pending-proposal:round105-global-response-withdrawal-punishment",
      "id": "Q6009297",
      "reference": {
        "file": "research/issues-source-reading-round74.json",
        "file_sha256": "7cda3635b7d34d1822a2b361f0a9260fb291676ed7330484b283ba4d1604b8d2",
        "record_pointer": "$.records[105]",
        "record_sha256": "fa0053b47b743d6d66edce464de4464a7ed85d91596841c2edefa6df08d58714"
      }
    }
  ]
};
const H=b=>createHash('sha256').update(b).digest('hex');
function stable(x){if(x===null||typeof x!=='object')return JSON.stringify(x);if(Array.isArray(x))return '['+x.map(stable).join(',')+']';return '{'+Object.keys(x).sort().map(k=>JSON.stringify(k)+':'+stable(x[k])).join(',')+'}';}
const same=(a,b)=>stable(a)===stable(b),rh=x=>H(stable(x));
function need(ok,why){if(!ok)throw new Error('R105 closed three pending candidates: '+why);}
const memo=new Map();
function exact(repo,file,digest,overlay=null){
 need(typeof repo==='string'&&repo,'repoDir required');need(/^research\/[A-Za-z0-9_./-]+\.json$/.test(file)&&!file.includes('..'),'closed archive path');
 const target=join(repo,file),path=existsSync(target)?target:overlay;need(path&&existsSync(path),'exact public input '+file);const b=readFileSync(path);need(H(b)===digest,'exact bytes '+file);const key=path+digest;if(!memo.has(key))memo.set(key,JSON.parse(b));return memo.get(key);
}
const LABELS=Object.freeze(["身体驻地与远端视觉场景的分离", "主动调节感受与决定理由的有效性", "撤回回应作为惩罚机制"]);
export const ROUND105_CLOSED_PENDING_CANDIDATE_IDS=Object.freeze(PINS.ids);
export function isRound105ClosedPendingCandidate(candidate,evidence){return PINS.ids.includes(candidate?.id)||LABELS.includes(candidate?.proposed_label);}
export function validateRound105ClosedPendingCandidate(candidate,evidence,currentWork,{repoDir,evidenceDir}={}){
 if(!isRound105ClosedPendingCandidate(candidate,evidence))return false;
 need(PINS.ids.includes(candidate?.id),'fixed candidate ID; claimed knowledge mode cannot fall through');
 const overlay=evidenceDir?join(evidenceDir,PINS.private_pre_file):null;
 const pack=exact(repoDir,PINS.input_file,PINS.input_sha256,overlay),m=pack.metadata;
 need(m.status==='frozen_root_reviewed_pending_only_for_R105'&&m.target_round===105&&m.source_canonical_sha256===PINS.baseline&&m.new_pending_candidates===3&&m.evidence_identities===6&&m.all_eight_axes_open===true,'fixed reviewed metadata');
 need(['formal_promotions','assignments','new_queries','new_opens','new_core','independently_verified'].every(k=>Object.hasOwn(m,k)&&m[k]===0),'explicit no-operation and no-assignment metadata');
 need(same(pack.candidates.map(c=>c.id),PINS.ids)&&same(pack.candidates.flatMap(c=>c.work_evidence.map(e=>e.id)),PINS.members)&&same(pack.original_proposals,PINS.original_proposals),'exact three/six original reviewed bindings');
 for(const ref of PINS.original_proposals)exact(repoDir,ref.file,ref.sha256);
 const c=pack.candidates.find(c=>c.id===candidate.id);need(same(candidate,c),'whole exact reviewed candidate including boundaries and counters');
 need(c.review_status==='pending_further_comparison'&&c.verification_status==='knowledge_added_unverified'&&c.formal_category_promotion===false&&c.automatic_assignment===false&&c.independent_project_count===2,'pending, unverified and two distinct original works only');
 need(['new_core_count','new_query_count','new_open_count','independently_verified_count'].every(k=>Object.hasOwn(c,k)&&c[k]===0),'candidate exact zero current operations');
 const e=c.work_evidence.find(e=>e.id===evidence?.id),pin=PINS.original_analyses.find(p=>p.candidate_id===c.id&&p.id===evidence?.id);need(e&&pin&&same(evidence,e)&&same(e.source_analysis_ref,pin.reference),'whole exact original member and reference');
 need(e.discovery_source_mode==='scoped_existing_knowledge_analysis'&&e.knowledge_analysis===true&&e.actual_content_source_read===false&&e.independently_verified===false&&e.basis&&e.exact_support_scope,'knowledge role, limited scope and no new-read claim');
 const ref=pin.reference,doc=exact(repoDir,ref.file,ref.file_sha256),match=/^\$\.records\[(\d+)\]$/.exec(ref.record_pointer);need(match,'closed A pointer');const a=doc.records[Number(match[1])];need(a?.id===e.id&&rh(a)===ref.record_sha256&&same(a.identity,e.identity),'exact original A ID/file/record/identity');
 need(a.verification_status==='knowledge_added_unverified'&&a.fields?.issue&&a.fields.issue_facets?.length>=2,'original concrete unverified core');
 need(same(e.sources,a.sources||[]),'original URLs or empty array preserved; no invented geographic sources');
 if(Object.hasOwn(e,'original_issue'))need(e.original_issue===a.fields.issue,'exact original issue');
 if(Object.hasOwn(e,'original_facet_bases'))need(same(e.original_facet_bases,a.fields.issue_facets.map(f=>f.basis)),'exact original facet bases');
 if(Object.hasOwn(e,'original_field_notes'))need(same(e.original_field_notes,a.field_notes),'exact original field scope');
 if(Object.hasOwn(e,'original_material_scope'))need(same(e.original_material_scope,a.field_notes),'exact original material scope');
 if(Object.hasOwn(e,'original_caveat'))need(same(e.original_caveat,a.identity_caveat??null),'exact original identity caveat');
 const w=currentWork;need(w?.id===e.id&&same(e.identity,{title:w.title_zh,author:w.author}),'exact current identity');
 const active=w.knowledge?.assertions?.filter(x=>x.input_file===ref.file&&same(Object.fromEntries(Object.entries(x).filter(([k])=>k!=='input_file')),a));need(active?.length===1,'exact active old core assertion with complete fields/notes/sources retained');
 need(w.issue===a.fields.issue&&same(w.issue_facets,a.fields.issue_facets)&&w.knowledge.fields.issue===a.fields.issue&&same(w.knowledge.fields.issue_facets,a.fields.issue_facets),'current concrete original issue and facets retained');
 if(Object.hasOwn(e,'original_active_core_assertion_sha256'))need(rh(active[0])===e.original_active_core_assertion_sha256,'original active assertion digest');
 if(Object.hasOwn(e,'source_index_sha256'))need(rh(w.source_index)===e.source_index_sha256,'source bibliography index');
 need(w.issue_analysis_status==='knowledge_added_unverified'&&w.completion?.source_verified===false,'no core verification upgrade');
 need(!w.classification_assignments?.some(x=>x.id===c.id||x.label===c.proposed_label),'pending comparison never automatic assignment');
 need(e.sources.every(u=>w.knowledge.sources?.includes(u)),'old URLs retained only in old knowledge provenance');return true;
}
