import {readFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
const PINS='research/classification-discovery-audits/round97-doorways-historical-pins.json',SHA='41148190ed4cee6d363e1f86f9f9cc94f5d3ded64dd536c0eab3e3d5cb7e8a0f';
const ID='Q102076237',CID='discovery:quick-retry2-modern-classification-candidates-r4:2';
const state=new WeakMap(),cached=new Map();
const h=b=>createHash('sha256').update(b).digest('hex');
const stable=x=>x===null||typeof x!=='object'?JSON.stringify(x):Array.isArray(x)?'['+x.map(stable).join(',')+']':'{'+Object.keys(x).sort().map(k=>JSON.stringify(k)+':'+stable(x[k])).join(',')+'}';
const rh=x=>h(Buffer.from(stable(x))),eq=(a,b)=>stable(a)===stable(b);
function must(ok,s){if(!ok)throw Error('Fixed R97 Doorways historical continuation: '+s)}
function read(repo,file,sha,packet){must(file.startsWith('research/')&&!file.includes('..'),'public dependency');const f=packet&&existsSync(join(packet,file))?join(packet,file):join(repo,file),b=readFileSync(f);must(h(b)===sha,'exact public bytes '+file);return JSON.parse(b)}
export function createRound97DoorwaysHistoricalContext({repoDir,packetDir=null}={}){
 const p=read(repoDir,PINS,SHA,packetDir),docs=new Map();for(const d of p.dependencies)docs.set(d.file,read(repoDir,d.file,d.sha256,packetDir));
 const old=docs.get(p.baseline_registry_file),audit=docs.get(p.audit_file),u=p.update;
 must(eq(audit.updates,[u])&&old.discovery_evidence_updates.length===3&&old.discovery_candidates.length===210,'one after original three');
 const c=old.discovery_candidates.find(x=>x.id===CID),e=c?.work_evidence.find(x=>x.id===ID);must(eq(c,p.candidate)&&eq(e,p.evidence),'exact immutable original C and scope');
 must(e.discovery_source_mode==='bibliographic_candidate_no_core_analysis'&&e.actual_bibliographic_source_read===true&&e.actual_content_source_read===false,'old role is bibliography only');
 const a=docs.get(u.analysis_input.file).records[u.analysis_input.record_index],l=docs.get(u.log_input.file).records[u.log_input.record_index],ad=docs.get(u.scope_adapter.file),accept=docs.get(u.root_scope_acceptance.file);
 must(rh(a)===u.analysis_input.record_sha256&&rh(l)===u.log_input.record_sha256&&a.id===ID&&l.id===ID,'full original raw A/L');
 must(ad.original_analysis_record_sha256===rh(a)&&ad.adopted_analysis_record_sha256===p.aggregate_record_sha256&&ad.changes.length===10&&accept.adapter_sha256===u.scope_adapter.sha256&&accept.accepted_scoped_changes===10,'fixed accepted ten-cell adapter');
 const adopted=docs.get(u.active_analysis_input).records[p.aggregate_record_index];must(rh(adopted)===p.aggregate_record_sha256&&eq(adopted,ad.derived_analysis_record),'exact derived active A, not raw A');
 must(eq(adopted.identity,u.identity)&&eq(a.identity,u.identity)&&eq(l.identity,u.identity),'exact original/derived identity');
 must(eq(adopted.source_evidence,u.source_evidence_roles)&&eq(adopted.sources,u.sources)&&adopted.source_evidence[0].exact_support_scope===u.support_scope,'2010 limited source roles');
 must(l.actual_search_count===1&&l.actual_open_count===1&&u.actual_new_queries_for_original_R97_identity===1&&u.actual_new_opens_for_original_R97_identity===1,'real original one query/open');
 must(adopted.verification_status==='knowledge_added_unverified'&&rh(adopted.fields)===p.adopted_core_sha256&&adopted.fields.issue_facets.length===2,'limited unverified core');
 must(u.new_queries_from_annotation===0&&u.new_opens_from_annotation===0&&u.new_core_from_annotation===0&&u.independent_verification_upgrade===false&&u.original_full_text_read===false,'annotation has no new operation or upgrade');
 const context=Object.freeze({mode:u.update_mode,updates:1});state.set(context,{p,old,docs,a,l,adopted});return context;
}
function get(c){if(c.trustedContext){const x=state.get(c.trustedContext);must(x,'trusted context');return x}must(typeof c.repoDir==='string'&&c.repoDir,'repoDir');if(!cached.has(c.repoDir))cached.set(c.repoDir,createRound97DoorwaysHistoricalContext(c));return state.get(cached.get(c.repoDir))}
export function validateRound97DoorwaysRegistryHistoricalAppendix(registry,context={}){
 const s=get(context),u=s.p.update;
 must(eq(registry.discovery_evidence_updates,[...s.old.discovery_evidence_updates,u]),'only exact one appendix after complete original three');
 must(eq(registry.metadata.evidence_update_inputs,[...s.old.metadata.evidence_update_inputs,{file:s.p.audit_file,sha256:s.p.audit_sha256}]),'only fixed audit append');
 for(const k of ['axes','categories','field_values','discovery_reviews','promoted_discoveries'])must(eq(registry[k],s.old[k]),'old registry unchanged '+k);
 must(eq(registry.discovery_candidates.slice(0,210),s.old.discovery_candidates),'old210 candidate prefix exact');
 return {...registry,discovery_evidence_updates:s.old.discovery_evidence_updates,metadata:{...registry.metadata,evidence_update_inputs:s.old.metadata.evidence_update_inputs}};
}
export function validateRound97DoorwaysHistoricalUpdate(update,context={}){
 if(update?.candidate_id!==CID||update?.work_id!==ID)return false;
 const s=get(context),p=s.p,w=context.work,a=s.adopted;
 must(eq(update,p.update)&&eq(context.candidate,p.candidate)&&eq(context.evidence,p.evidence),'exact continuation/C/evidence whole rows');
 must(w?.id===ID&&eq({title:w.title_zh,author:w.author},update.identity)&&rh(w.source_index)===p.current_source_index_sha256,'source identity/date/grain unchanged');
 must(rh(w.source_search_log)===p.expected_full_current_source_log_sha256&&eq(w.source_search_log.raw_reading_log,s.l),'whole expected current source chain and original raw L');
 must(rh(w.source_search_log.prior_source_log)===p.baseline_full_source_log_sha256,'entire original canonical prior');
 const active=w.knowledge?.assertions?.filter(x=>x.input_file===update.active_analysis_input&&x.id===ID);
 must(active?.length===1&&rh(active[0])===p.expected_active_assertion_sha256&&eq(Object.fromEntries(Object.entries(active[0]).filter(([k])=>k!=='input_file')),a),'active is accepted fixed derived A');
 must(w.issue===a.fields.issue&&eq(w.issue_facets,a.fields.issue_facets)&&a.sources.every(url=>w.knowledge.sources.includes(url)),'limited exact issue/facets/sources');
 must(w.issue_analysis_status==='knowledge_added_unverified'&&w.completion.source_verified===false,'no independent verification upgrade');return true;
}
