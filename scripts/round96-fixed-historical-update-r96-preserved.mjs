import {readFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
const PINS='research/classification-discovery-audits/round96-fixed-historical-update-pins.json',SHA='40d2e682dc38d421e4e1fcf2353aeac45700423cc73391446bafd47fcb3ab353';
const KEY=new Set(['discovery:quick-retry-root-classification-candidates-round12:1:Q134705721','discovery:quick-retry-root-classification-candidates-round13:1:Q74534314']);
const state=new WeakMap(),cached=new Map();
const h=b=>createHash('sha256').update(b).digest('hex');
const stable=x=>x===null||typeof x!=='object'?JSON.stringify(x):Array.isArray(x)?'['+x.map(stable).join(',')+']':'{'+Object.keys(x).sort().map(k=>JSON.stringify(k)+':'+stable(x[k])).join(',')+'}';
const rh=x=>h(Buffer.from(stable(x))),eq=(a,b)=>stable(a)===stable(b);
function must(ok,s){if(!ok)throw Error('Fixed R96 historical update: '+s)}
function read(repo,file,sha,packet){must(file.startsWith('research/')&&!file.includes('..'),'public dependency');const f=packet&&existsSync(join(packet,file))?join(packet,file):join(repo,file),b=readFileSync(f);must(h(b)===sha,'exact public bytes '+file);return JSON.parse(b)}
export function createRound96FixedHistoricalContext({repoDir,packetDir=null}={}){
 const p=read(repoDir,PINS,SHA,packetDir),docs=new Map();for(const d of p.dependencies)docs.set(d.file,read(repoDir,d.file,d.sha256,packetDir));
 const old=docs.get(p.baseline_registry_file),audit=docs.get(p.audit_file);must(eq(audit.updates,p.updates)&&p.updates.length===2&&p.members.length===2,'exact two updates');
 for(const pin of p.members){const u=p.updates.find(x=>x.work_id===pin.id),c=old.discovery_candidates.find(x=>x.id===pin.candidate_id),e=c?.work_evidence.find(x=>x.id===pin.id);must(eq(c,pin.candidate)&&eq(e,pin.evidence),'original C/evidence exact');
  const a=docs.get(u.analysis_input.file).records[u.analysis_input.record_index],l=docs.get(u.log_input.file).records[u.log_input.record_index];must(rh(a)===u.analysis_input.record_sha256&&rh(l)===u.log_input.record_sha256,'entire raw A/L records');must(eq(a.identity,u.identity)&&eq(l.identity,u.identity)&&a.id===pin.id&&l.id===pin.id,'raw identity');
  must(a.verification_status==='knowledge_added_unverified'&&eq(a.fields,pin.core)&&a.fields.issue_facets.length>=2,'limited new core');must(eq(a.source_evidence,u.source_evidence_roles)&&eq(a.sources,u.sources),'actual scoped roles, no invented Vitavil-shape fields');
  must(e.discovery_source_mode==='bibliographic_candidate_no_core_analysis'&&e.actual_content_source_read===false&&e.actual_bibliographic_source_read===true,'old bibliography remains bibliography');
  must(u.new_queries_from_annotation===0&&u.new_core_from_annotation===0&&u.independent_verification_upgrade===false&&u.original_full_text_read===false,'no new requests/core/verification');
  must((l.actual_search_count??l.actual_query_count)===pin.actual_identity_query_count&&pin.actual_identity_query_count===(pin.id==='Q74534314'?0:1),'real original identity request count');
  if(pin.id==='Q74534314')must(l.saved_return_reuse_no_new_request===true&&l.saved_return_original_request_identity?.index===17&&l.saved_return_original_request_identity?.id==='Q74632358'&&l.saved_return_original_request_identity?.q==='"Sebastian A. Corn" "Brundurilor" recenzie','exact reused index17 request, not second query');
 }
 const context=Object.freeze({updates:2,mode:'round96_exact_frozen_raw_A_L_core_continuation'});state.set(context,{p,old,docs});return context;
}
function get(c){if(c.trustedContext){const x=state.get(c.trustedContext);must(x,'trusted context');return x}must(typeof c.repoDir==='string'&&c.repoDir,'repoDir');if(!cached.has(c.repoDir))cached.set(c.repoDir,createRound96FixedHistoricalContext(c));return state.get(cached.get(c.repoDir))}
export function validateRound96RegistryHistoricalAppendix(registry,context={}){
 const s=get(context);must(eq(registry.discovery_evidence_updates,[...s.old.discovery_evidence_updates,...s.p.updates]),'only exact two fixed deltas after old updates');must(eq(registry.metadata.evidence_update_inputs,[...s.old.metadata.evidence_update_inputs,{file:s.p.audit_file,sha256:s.p.audit_sha256}]),'only exact audit input append');
 for(const k of ['axes','categories','field_values','discovery_reviews','promoted_discoveries'])must(eq(registry[k],s.old[k]),'unrelated registry field unchanged '+k);
 must(eq(registry.discovery_candidates.slice(0,210),s.old.discovery_candidates),'old210 candidate rows unchanged');return s.old.discovery_evidence_updates;
}
export function validateRound96FixedHistoricalUpdate(update,context={}){
 if(!KEY.has(update?.candidate_id+':'+update?.work_id))return false;
 const s=get(context),expected=s.p.updates.find(x=>x.work_id===update.work_id),pin=s.p.members.find(x=>x.id===update.work_id);must(eq(update,expected),'entire exact update row');must(eq(context.candidate,pin.candidate)&&eq(context.evidence,pin.evidence),'old C/evidence immutable');
 const w=context.work,a=s.docs.get(update.analysis_input.file).records[update.analysis_input.record_index],l=s.docs.get(update.log_input.file).records[update.log_input.record_index];
 must(w?.id===pin.id&&eq({title:w.title_zh,author:w.author},pin.identity),'current identity');must(rh(w.source_index)===pin.current_source_index_sha256,'full original source grain');must(rh(w.source_search_log)===pin.current_full_source_log_sha256&&eq(w.source_search_log.raw_reading_log,l),'complete current raw/history preserved');
 const active=w.knowledge?.assertions?.filter(x=>x.input_file===update.active_analysis_input&&x.id===pin.id);must(active?.length===1&&rh(active[0])===pin.active_assertion_sha256&&eq(Object.fromEntries(Object.entries(active[0]).filter(([k])=>k!=='input_file')),a),'exact active A');
 must(eq(w.issue,a.fields.issue)&&eq(w.issue_facets,a.fields.issue_facets)&&a.sources.every(url=>w.knowledge.sources.includes(url)),'same limited core/sources');must(w.issue_analysis_status==='knowledge_added_unverified'&&w.completion.source_verified===false,'unverified level preserved');return true;
}
