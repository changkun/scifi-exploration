import {readFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
// Isolated fixed two-candidate route. No generic empty-URL exception.
const PINS={
  "review_file": "research/classification-discovery-inputs/round106-root-reviewed-two-pending-directions.json",
  "review_sha256": "2eb6154896dcb0cd2e77b65c599886f5797e1fb75cd7e3b6586025b351c3712e",
  "private_review": "round106-root-reviewed-two-pending-directions-private.json",
  "original_proposal": {
    "file": "research/classification-discovery-inputs/round106-early-original-two-pending-directions.json",
    "sha256": "7303f6dd6ca0ed8588416ce8f1dbece608e6d0c0f7e4a42a59e18f78f577b4bf",
    "private_file": "round106-early-core19-two-pending-directions-private.json"
  },
  "prior_registry": {
    "file": "research/classification-registry-history/round106-before-two-pending-directions.json",
    "sha256": "bd4341acd35915f69d306320ca50b31b7878d7385b032686908b4be296902656",
    "private_file": "round106-classification-registry-before-two-private.json"
  },
  "expected_registry_record_sha256": "e14d29316f8c809abb0bdf8b401aa695620eb42e6c5574d33fa776f30d87f2ea",
  "ids": [
    "pending-proposal:round106-early-perceptual-repair-unexpected-visibility",
    "pending-proposal:round106-early-critical-narrative-coherence-testing"
  ],
  "labels": [
    "感官修复后的可见性变化",
    "科幻批评中的叙事连贯性检验"
  ],
  "bindings": [
    {
      "candidate_id": "pending-proposal:round106-early-perceptual-repair-unexpected-visibility",
      "id": "Q131518691",
      "label": "感官修复后的可见性变化",
      "original_analysis": {
        "file": "research/issue-input-snapshots/modern-easy-core-round106-part2.json",
        "file_sha256": "38be3040b627b430aa9c3c7eb5d6c653a2aef5e8e55366fc7aefc8a044b7d84c",
        "record_pointer": "$.records[1]",
        "record_sha256": "ef8403559cb42970e0ded2a3089385348b5d2bfcaefbfeac385caa9bea66096e"
      },
      "combined_core": {
        "file": "research/issues-source-reading-round106.json",
        "file_sha256": "9f6c66aef3ded6d72323ca8c7051b0c6a6ae45afeebea841ed2d076368216f62",
        "record_pointer": "$.records[13]",
        "record_sha256": "b79c12638e0e2882367bc5a7387a04c4e443a2ea0178d246b45446fbdd830df1"
      },
      "original_current_whole_work_sha256": "122608e907005f0cbe286e283740ffde06a7fc707a9323527b4a46c47d2f6f84",
      "original_source_grain": {
        "title_zh": "Camera Obscura",
        "title_original": "原题待核（见来源标题声明）",
        "author": "Thomas F. Monteleone",
        "first_year": 1977,
        "sort_year": 1977,
        "source_first_year": 1977,
        "year_display": "1977（来源待核）",
        "year_note": "来源 P577 最早年份候选；初刊、版本与日期精度尚待核查。",
        "form": "短篇／中篇（来源描述候选）",
        "forms": [
          "文学作品",
          "短篇／中篇（来源描述候选）"
        ],
        "source_entity_kind": "work_or_unspecified",
        "source_types": [
          {
            "id": "Q7725634",
            "label": "文学作品"
          }
        ],
        "source_index": {
          "id": "Q131518691",
          "title": "Camera Obscura",
          "title_zh": null,
          "title_en": "Camera Obscura",
          "title_missing": false,
          "authors": [
            "Thomas F. Monteleone"
          ],
          "author_names_en": [
            "Thomas F. Monteleone"
          ],
          "author_names_zh": [],
          "first_year": 1977,
          "subjects": [
            "科学幻想"
          ],
          "classification_status": "待分类：来源信息不足以提取候选",
          "source_entity_kind": "work_or_unspecified",
          "source_url": "https://www.wikidata.org/wiki/Q131518691",
          "edition_count": null,
          "source_subject": [
            {
              "id": "Q24925",
              "label": "科学幻想"
            }
          ],
          "source_types": [
            {
              "id": "Q7725634",
              "label": "文学作品"
            }
          ],
          "language_statements": [
            {
              "id": "Q1860",
              "label": "英语"
            }
          ],
          "title_aliases": [],
          "topic_candidates": [],
          "branch_candidates": [],
          "detail_url": "./assets/bibliography-details/048.json"
        },
        "research": null
      },
      "source_grain_sha256": "883869596f0ec7981914feed205f5143c99364c90ba93e86d5399354a39132b8"
    },
    {
      "candidate_id": "pending-proposal:round106-early-critical-narrative-coherence-testing",
      "id": "Q6010745",
      "label": "科幻批评中的叙事连贯性检验",
      "original_analysis": {
        "file": "research/issue-input-snapshots/round106-early-familiar-next2-nonfiction-proposals-private.json",
        "file_sha256": "2b618a7ead2fb35e954183ea8f2adc0ac587a74bca15f1c246cacd6483ea3e99",
        "record_pointer": "$.records[0]",
        "record_sha256": "7c98f3792b41408622983d836293e95cc109fc7d186aa40e696dd8b633364b2a"
      },
      "combined_core": {
        "file": "research/issues-source-reading-round106.json",
        "file_sha256": "9f6c66aef3ded6d72323ca8c7051b0c6a6ae45afeebea841ed2d076368216f62",
        "record_pointer": "$.records[2]",
        "record_sha256": "f354d3d15f3a7c669ca19e2ef547cc6db328c938a5f47718ca3fc962ed6b8ad2"
      },
      "original_current_whole_work_sha256": "38214673ab525c3bc866bf1906d7a79d5b9fe315f7da8b145545a07e881388d0",
      "original_source_grain": {
        "title_zh": "In Search of Wonder",
        "title_original": "原题待核（见来源标题声明）",
        "author": "Damon Knight",
        "first_year": 1956,
        "sort_year": 1956,
        "source_first_year": 1956,
        "year_display": "1956（来源待核）",
        "year_note": "来源 P577 最早年份候选；初刊、版本与日期精度尚待核查。",
        "form": "文学作品",
        "forms": [
          "文学作品"
        ],
        "source_entity_kind": "work_or_unspecified",
        "source_types": [
          {
            "id": "Q7725634",
            "label": "文学作品"
          }
        ],
        "source_index": {
          "id": "Q6010745",
          "title": "In Search of Wonder",
          "title_zh": null,
          "title_en": "In Search of Wonder",
          "title_missing": false,
          "authors": [
            "Damon Knight"
          ],
          "author_names_en": [
            "Damon Knight"
          ],
          "author_names_zh": [],
          "first_year": 1956,
          "subjects": [
            "科学幻想",
            "文学批评"
          ],
          "classification_status": "待分类：来源信息不足以提取候选",
          "source_entity_kind": "work_or_unspecified",
          "source_url": "https://www.wikidata.org/wiki/Q6010745",
          "edition_count": null,
          "source_subject": [
            {
              "id": "Q24925",
              "label": "科学幻想"
            },
            {
              "id": "Q58854",
              "label": "文学批评"
            }
          ],
          "source_types": [
            {
              "id": "Q7725634",
              "label": "文学作品"
            }
          ],
          "language_statements": [
            {
              "id": "Q1860",
              "label": "英语"
            }
          ],
          "title_aliases": [],
          "topic_candidates": [],
          "branch_candidates": [],
          "detail_url": "./assets/bibliography-details/014.json"
        },
        "research": null
      },
      "source_grain_sha256": "f3ea55a68da10262dbf278cbe11c127ba567c06caefb92e8051148972a243d19"
    }
  ]
};
const H=b=>createHash('sha256').update(b).digest('hex');
function stable(x){if(x===null||typeof x!=='object')return JSON.stringify(x);if(Array.isArray(x))return '['+x.map(stable).join(',')+']';return '{'+Object.keys(x).sort().map(k=>JSON.stringify(k)+':'+stable(x[k])).join(',')+'}';}
const rh=x=>H(stable(x)),same=(a,b)=>stable(a)===stable(b),memo=new Map();
function need(ok,why){if(!ok)throw new Error('R106 fixed two pending directions: '+why);}
function exact(repo,file,sha,evidenceDir,privateFile){
 need(typeof repo==='string'&&repo&&/^research\/[A-Za-z0-9_./-]+\.json$/.test(file)&&!file.includes('..'),'closed public archive path');
 const p=join(repo,file),path=existsSync(p)?p:evidenceDir&&privateFile?join(evidenceDir,privateFile):null;need(path&&existsSync(path),'exact archive '+file);const b=readFileSync(path);need(H(b)===sha,'original byte digest '+file);const key=path+sha;if(!memo.has(key))memo.set(key,JSON.parse(b));return memo.get(key);
}
function getPack({repoDir,evidenceDir}){return exact(repoDir,PINS.review_file,PINS.review_sha256,evidenceDir,PINS.private_review);}
export function validateRound106ClosedPendingRegistry(registry,context={}){
 // Keep this historical two-item segment fixed while leaving all future classification growth open.
 const p=PINS.prior_registry,prior=exact(context.repoDir,p.file,p.sha256,context.evidenceDir,p.private_file),pack=getPack(context);
 need(prior.discovery_candidates.length===226&&Array.isArray(registry?.discovery_candidates)&&registry.discovery_candidates.length>=228,'original prior and fixed pair must exist');
 need(same(registry.discovery_candidates.slice(0,226),prior.discovery_candidates),'exact original226 ordered pending prefix');
 need(same(registry.discovery_candidates.slice(226,228),pack.candidates),'fixed reviewed2 segment; shifted or removed marker cannot fall through');
 return true;
}
export const ROUND106_CLOSED_PENDING_CANDIDATE_IDS=Object.freeze(PINS.ids);
export function isRound106ClosedPendingCandidate(c){return PINS.ids.includes(c?.id)||PINS.labels.includes(c?.proposed_label);}
export function validateRound106ClosedPendingCandidate(candidate,evidence,currentWork,context={}){
 // Always verify the suffix before a route decision. Removing IDs/labels cannot fall back to the generic branch.
 validateRound106ClosedPendingRegistry(context.registry,context);
 if(!isRound106ClosedPendingCandidate(candidate))return false;
 need(PINS.ids.includes(candidate.id),'fixed candidate ID');const pack=getPack(context),m=pack.metadata;
 need(m.status==='frozen_root_authorized_two_pending_only_R106'&&m.target_round===106&&m.new_pending_candidates===2&&m.evidence_identities===2,'reviewed fixed scope');
 for(const k of ['formal_promotions','assignments','new_queries','new_opens','new_core','new_source_reads','original_full_text_reads','independently_verified'])need(Object.hasOwn(m,k)&&m[k]===0,'no new operation '+k);
 need(same(pack.candidates.map(c=>c.id),PINS.ids)&&same(pack.exact_core_bindings,PINS.bindings),'exact candidate and A bindings');
 const o=PINS.original_proposal,original=exact(context.repoDir,o.file,o.sha256,context.evidenceDir,o.private_file);const c=pack.candidates.find(c=>c.id===candidate.id),orig=original.candidates.find(c=>c.id===candidate.id),pin=PINS.bindings.find(p=>p.candidate_id===candidate.id);
 need(c&&orig&&pin&&same(candidate,c),'whole exact reviewed candidate');need(c.proposed_label===pin.label&&c.review_status==='pending_further_comparison'&&c.verification_status==='knowledge_added_unverified'&&c.formal_category_promotion===false&&c.automatic_assignment===false,'only pending, unverified, unassigned');
 for(const k of ['axis','proposed_dimension','proposed_label','definition_boundary','negative_boundary','membership_boundary','nearest_existing'])need(same(c[k],orig[k]),'original semantic boundary '+k);
 const e=c.work_evidence[0];need(c.work_evidence.length===1&&same(evidence,e)&&e.id===pin.id,'one exact member');
 for(const k of Object.keys(orig.work_evidence[0]))need(same(e[k],orig.work_evidence[0][k]),'original evidence '+k);
 need(e.discovery_source_mode==='scoped_existing_core_analysis'&&e.actual_content_source_read===false&&e.new_source_read_performed===false&&e.independently_verified===false,'no candidate new-read or verification claim');
 const readA=ref=>{const doc=exact(context.repoDir,ref.file,ref.file_sha256);const match=/^\$\.records\[(\d+)\]$/.exec(ref.record_pointer);need(match,'exact A pointer');const r=doc.records[Number(match[1])];need(r?.id===pin.id&&rh(r)===ref.record_sha256,'exact original A record');return r;};
 const a=readA(pin.original_analysis),core=readA(pin.combined_core);need(same(e.source_analysis_ref,pin.original_analysis)&&same(e.source_active_core_ref,pin.combined_core),'exact original and adopted refs');
 const {original_analysis_binding,original_log_binding,...withoutBindings}=core;need(same(withoutBindings,a)&&original_analysis_binding.record_sha256===rh(a),'combined19 equals original A fields/notes/identity/sources');
 need(same(e.identity,a.identity)&&same(e.support_fields,a.fields)&&same(e.sources,a.sources||[])&&a.verification_status==='knowledge_added_unverified'&&a.fields.issue_facets.length>=2,'exact original concrete core and URL presence');
 const w=currentWork;need(w?.id===pin.id&&same(e.identity,{title:w.title_zh,author:w.author}),'current exact identity');
 const grain=Object.fromEntries(Object.keys(pin.original_source_grain).map(k=>[k,w[k]]));need(same(grain,pin.original_source_grain)&&rh(grain)===pin.source_grain_sha256,'bibliographic source/date/version/grain retained');
 need(w.completion?.source_verified===false&&!w.classification_assignments?.some(x=>x.id===c.id||x.label===c.proposed_label),'no verification or automatic classification');
 if(context.adoptionPhase==='pre'){
  need(rh(w)===pin.original_current_whole_work_sha256&&w.issue_analysis_status==='missing','actual original published pre row; not synthetic post');
 }else{
  const active=w.knowledge?.assertions?.filter(x=>x.input_file===pin.combined_core.file&&same(Object.fromEntries(Object.entries(x).filter(([k])=>k!=='input_file')),core));need(active?.length===1,'exact active adopted core assertion');
  need(w.issue===a.fields.issue&&same(w.issue_facets,a.fields.issue_facets)&&w.knowledge.fields.issue===a.fields.issue&&same(w.knowledge.fields.issue_facets,a.fields.issue_facets),'current displayed issue/facets unchanged');
  need(w.issue_analysis_status==='knowledge_added_unverified'&&e.sources.every(u=>w.knowledge.sources.includes(u)),'unverified existing core and retained original URLs');
 }
 const expectedKnowledge=pin.id==='Q6010745';need(e.knowledge_analysis===expectedKnowledge&&e.candidate_evidence_mode===(expectedKnowledge?'exact_existing_knowledge':'saved_scoped_search_material'),'exact distinct material and knowledge roles');return true;
}
