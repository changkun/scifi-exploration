import {readFileSync,existsSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {createHash} from 'node:crypto';
const PINS_FILE='research/classification-discovery-audits/classification-v23-navigation-guard-pins.json';
const PINS_SHA='88b4f91e0633c55d2c0a298a32933359b769234e14d9b5fb516470ee079de47f';
const MODE='v23_exact_scoped_navigation_review';
const REVIEW='research/classification-discovery-audits/classification-v23-navigation-adoption-proposal.json';
const contexts=new WeakMap(),publicContexts=new Map();
const hash=b=>createHash('sha256').update(b).digest('hex');
function stable(x){if(x===null||typeof x!=='object')return JSON.stringify(x);if(Array.isArray(x))return '['+x.map(stable).join(',')+']';return '{'+Object.keys(x).sort().map(k=>JSON.stringify(k)+':'+stable(x[k])).join(',')+'}'}
const equal=(a,b)=>stable(a)===stable(b),rh=x=>hash(Buffer.from(stable(x)));
const has=(x,k)=>Object.prototype.hasOwnProperty.call(x||{},k);
function assert(ok,msg){if(!ok)throw Error('V23 fixed navigation guard: '+msg)}
function at(x,p){assert(/^\$(?:\.[A-Za-z_]+(?:\[\d+\])?)+$/.test(p),'fixed pointer');for(const m of p.matchAll(/\.([A-Za-z_]+)(?:\[(\d+)\])?/g)){x=x[m[1]];if(m[2]!==undefined)x=x[Number(m[2])]}return x}
function read(repo,file,digest,packetDir){assert(file.startsWith('research/')&&!file.includes('..'),'public archive path');const f=packetDir&&existsSync(join(packetDir,file))?join(packetDir,file):join(repo,file);const b=readFileSync(f);assert(hash(b)===digest,'exact public archive '+file);return JSON.parse(b)}
export function createV23NavigationContext({repoDir,packetDir=null}={}){
 assert(typeof repoDir==='string'&&repoDir,'repoDir required');const p=read(repoDir,PINS_FILE,PINS_SHA,packetDir),docs=new Map();
 for(const d of p.dependencies)docs.set(d.file,read(repoDir,d.file,d.sha256,packetDir));
 const base=docs.get(p.base_registry_file),raw=docs.get(p.raw_proposal_file),adopt=docs.get(p.review_file);
 assert(base.categories.length===49&&base.discovery_candidates.length===205&&base.discovery_reviews.length===39,'exact original49/205/39');
 assert(p.categories.length===2&&p.reviews.length===4&&p.members.length===6,'closed2/4/6');
 const members=new Map();for(const pin of p.members){const m=at(raw,pin.original_raw_member_pointer);assert(rh(m)===pin.original_raw_member_sha256&&m.id===pin.id,'entire original member');
  const c=at(base,m.candidate_reference.pointer);assert(equal(c,m.original_candidate)&&rh(c)===m.candidate_reference.record_sha256,'whole original candidate');
  assert(equal(at(docs.get(m.original_candidate_input_reference.file),m.original_candidate_input_reference.record_pointer),m.original_candidate_input_record),'original C input');
  const L=docs.get(m.original_frozen_log_reference.file);assert(equal(L.metadata??null,m.original_frozen_log_metadata??null)&&equal(at(L,m.original_frozen_log_reference.record_pointer),m.original_frozen_log_record),'original log/metadata exact');
  const A=docs.get(m.original_frozen_analysis_reference.file);assert(equal(A.metadata??null,m.original_frozen_analysis_metadata??null),'original A metadata exact');
  if(m.original_frozen_analysis_reference.record_absent){assert(m.original_frozen_analysis_record===null&&!A.records.some(x=>x.id===m.id),'genuine original A absence')}else assert(equal(at(A,m.original_frozen_analysis_reference.record_pointer),m.original_frozen_analysis_record),'original A record');
  if(m.original_analysis_record_provenance_presence===null)assert(m.original_frozen_analysis_record===null&&m.original_frozen_analysis_reference.record_absent===true,'exact original A record/presence absence remains null');
  else for(const [key,value]of Object.entries(m.original_analysis_record_provenance_presence)){assert(value.present===has(m.original_frozen_analysis_record,key)&&equal(value.value,m.original_frozen_analysis_record?.[key]??null),'actual original A presence '+key)}
  for(const [key,value]of Object.entries(m.original_log_record_provenance_presence)){assert(value.present===has(m.original_frozen_log_record,key)&&equal(value.value,m.original_frozen_log_record?.[key]??null),'actual original log presence '+key)}
  if(m.active_core_file_reference){assert(equal(at(docs.get(m.active_core_file_reference.file),m.active_core_file_reference.record_pointer),m.active_core_original_record),'exact active public A')}else assert(m.active_core_assertion===null&&m.current_core_status==='core_missing_preserved_form_or_production_scope_only','missing core remains no assertion');
  assert(m.new_query_count===0&&m.new_open_count===0&&m.new_target_text_read===false&&m.new_core_from_membership===0&&m.independent_verification_upgrade===false,'no new read/core/verification');members.set(m.id,{pin,m});
 }
 const ctx=Object.freeze({mode:MODE,memberCount:6,reviewCount:4});contexts.set(ctx,{p,base,raw,adopt,members});return ctx;
}
export function isV23NavigationReview(r){return r?.evidence_mode===MODE&&r?.review_input===REVIEW}
/** Exact six-member source-scope mode; no generic URL/bibliography exemption. */
export function validateV23NavigationReview(review,context={}){
 let ctx=context.trustedContext;if(!ctx){const key=resolve(context.repoDir||'');if(!publicContexts.has(key))publicContexts.set(key,createV23NavigationContext({repoDir:key}));ctx=publicContexts.get(key)}
 const s=contexts.get(ctx);assert(s&&['pre','post'].includes(context.phase),'trusted fixed context and explicit pre/post');
 const expected=s.p.reviews.find(x=>x.candidate_id===review?.candidate_id);assert(expected&&equal(review,expected),'entire exact four-project review');
 const reg=context.registry;assert(reg&&equal(reg.categories.slice(0,49),s.base.categories)&&equal(reg.discovery_reviews.slice(0,39),s.base.discovery_reviews),'old categories/reviews prefix');
 assert(equal(reg.discovery_candidates.slice(0,205),s.base.discovery_candidates),'all205 old candidates preserved');
 for(const k of ['axes','field_values','promoted_discoveries','discovery_evidence_updates'])assert(equal(reg[k],s.base[k]),'old registry scope unchanged '+k);
 assert(reg.categories.length===51&&reg.discovery_reviews.length===43,'only2 categories/4 reviews appended');
 for(const cat of s.p.categories)assert(equal(reg.categories.find(x=>x.id===cat.id),cat),'whole appended category/members exact');
 for(const r of s.p.reviews)assert(reg.discovery_reviews.some(x=>equal(x,r)),'all4 exact review rows');
 const c=reg.discovery_candidates.find(x=>x.id===review.candidate_id);assert(rh(c)===expected.original_candidate_record_sha256,'entire original candidate immutable');
 let checked=0;for(const id of expected.reviewed_project_member_ids){const v=s.members.get(id),w=context.worksById?.get(id);assert(v&&w&&w.id===id,'fixed current member');const {pin,m}=v;
  assert(equal(m.identity,{title:w.title_zh,author:w.author}),'current identity');assert(equal(w.source_index,m.current_source_index),'full source identity/grain');
  for(const[k,val]of Object.entries(pin.current_grain)){if(!k.startsWith('spatial'))assert(equal(w[k]??null,val),'original grain/date '+k)}
  assert(equal(w.source_search_log,m.current_full_source_search_log)&&rh(w.source_search_log)===m.current_full_source_search_log_sha256,'whole prior/source roles/counters unchanged');
  assert(w.issue_analysis_status===pin.actual_issue_analysis_status&&w.completion?.source_verified===m.source_verified_preserved,'core/verification status unchanged');
  assert(equal(Object.fromEntries(['topics','issue','issue_facets'].map(k=>[k,w[k]??null])),pin.core),'core values unchanged');
  assert(equal(Object.fromEntries(['topics','issue','issue_facets'].map(k=>[k,{present:has(w.knowledge?.fields,k),value:w.knowledge?.fields?.[k]??null}])),pin.knowledge_core_presence),'knowledge core absence/value exact');
  const aa=w.knowledge?.assertions||[];assert(equal(aa.slice(0,pin.old_assertion_prefix_sha256.length).map(rh),pin.old_assertion_prefix_sha256),'all old assertions ordered prefix');
  if(m.active_core_assertion)assert(aa.filter(a=>rh(a)===m.active_core_assertion_sha256).length===1,'same active core assertion');else assert(!aa.some(a=>a.fields?.issue),'no invented core for absent A');
  if(context.phase==='post'){const cat=s.p.categories.find(x=>x.id===pin.category_id),member=cat.members.find(x=>x.work_id===id);assert(w.classification_assignments?.some(x=>x.id===cat.id&&x.membership_boundary===member.membership_boundary),'actual post classification and precise boundary')}
  checked++;
 }
 return {mode:MODE,phase:context.phase,reviewed_members:checked,knowledge_added_unverified:true,new_core:0,new_queries:0,new_opens:0,independently_verified:false};
}
