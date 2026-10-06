import {createHash} from 'node:crypto';
import {readFileSync,existsSync} from 'node:fs';
import {join,basename} from 'node:path';
import {matchesR91CandidateProcessAdapter} from './r91-candidate-process-adapter.mjs';
// Isolated exact25 R91 route. The original S/A/L and owner metadata are never
// rewritten; only seven declared legacy per-A hashes are normalized in derived S.
export const R91_FIXED_SAME_BATCH_SPATIAL_INPUTS=Object.freeze({
  "quick-retry2-early-spatial-round7.json": {
    "sha256": "11d2da811c00031b4d12a7de2c5d37ec8674c962f3680097a4869a7d98caca6d",
    "count": 3,
    "analysis_file": "quick-retry2-early-round7.json",
    "analysis_sha256": "3ff3fc9586cb081283bb687fa1fa79ec3097176a145a5a324f54d6f4df2b196e",
    "log_file": "quick-retry2-early-round7-log.json",
    "log_sha256": "a544b2b992803ead3fbcf97138f27fbc729019b333d82efded5972d8ce304e64",
    "owner_file": "quick-retry2-lane-3.json",
    "owner_sha256": "5047bf9f2c01bf298fa1b6fa839945fad465ebc2216baeb81a18eb39769e9e9c",
    "lane": 3,
    "metadata_owner_literal": "quick-retry2-lane-3.json",
    "original_analysis_record_hash_algorithm": "sortedcompact-json-v1"
  },
  "quick-retry2-early-spatial-round8.json": {
    "sha256": "5916f64c8bd264a7572372c63a962de2f2fff12d40c71bac5d7f5df2b5457f77",
    "count": 2,
    "analysis_file": "quick-retry2-early-round8.json",
    "analysis_sha256": "e17329f78160256f8b567a2bdce5f73e1547b958dfa7aecf8bd1e99defd3f528",
    "log_file": "quick-retry2-early-round8-log.json",
    "log_sha256": "8ae9cc2e96a9d56bc4fbb26f7656508c33469308bc03465ecaaef682734bb353",
    "owner_file": "quick-retry2-lane-3.json",
    "owner_sha256": "5047bf9f2c01bf298fa1b6fa839945fad465ebc2216baeb81a18eb39769e9e9c",
    "lane": 3,
    "metadata_owner_literal": "quick-retry2-lane-3.json",
    "original_analysis_record_hash_algorithm": "sortedcompact-json-v1"
  },
  "quick-retry2-early-spatial-round9.json": {
    "sha256": "98d89841d756233b16d93b70194df15a9455c5075ce441525d572798ee6ba967",
    "count": 3,
    "analysis_file": "quick-retry2-early-round9.json",
    "analysis_sha256": "e66c5b353cd66dbad34b1faf11eeb51895221b903736792999e58dfce688b6a2",
    "log_file": "quick-retry2-early-round9-log.json",
    "log_sha256": "3d7eaa6a306ad25394308723e2cc84b1090450683ed4fd3bbde872443ebb21bf",
    "owner_file": "quick-retry2-lane-3.json",
    "owner_sha256": "5047bf9f2c01bf298fa1b6fa839945fad465ebc2216baeb81a18eb39769e9e9c",
    "lane": 3,
    "metadata_owner_literal": "quick-retry2-lane-3.json",
    "original_analysis_record_hash_algorithm": "sortedcompact-json-v1"
  },
  "quick-retry2-early-spatial-round10.json": {
    "sha256": "17eabf60c4ab4c2e4f8f121be85e70db5e1fe6c6a8138e5c5c3accb036b32df6",
    "count": 5,
    "analysis_file": "quick-retry2-early-round10.json",
    "analysis_sha256": "811e1b7b5b6fc48e49d0963b6dae0eddbb3534e7e0675b41497e7f96e4799ac1",
    "log_file": "quick-retry2-early-round10-log.json",
    "log_sha256": "cb035398af686310a27fa2a1de9126ebfe7986bcc9143fbf92802a6521a32cb2",
    "owner_file": "quick-retry2-lane-3.json",
    "owner_sha256": "5047bf9f2c01bf298fa1b6fa839945fad465ebc2216baeb81a18eb39769e9e9c",
    "lane": 3,
    "metadata_owner_literal": "quick-retry2-lane-3.json",
    "original_analysis_record_hash_algorithm": "sortedcompact-json-v1"
  },
  "quick-retry2-early-spatial-round11.json": {
    "sha256": "3c25ba3809af0ffd54dc64825622309c38f01c27b6e32f7baf27995fbc53ba24",
    "count": 2,
    "analysis_file": "quick-retry2-early-round11.json",
    "analysis_sha256": "70e8e33479a073ba3f3bd7307b98c21a6836fe9a39ac9eedbcb93921d178a180",
    "log_file": "quick-retry2-early-round11-log.json",
    "log_sha256": "2b6c783f2611e74bd3ac805e4b66198c0714592145712b7c7eaceb5330424b85",
    "owner_file": "quick-retry2-lane-3.json",
    "owner_sha256": "5047bf9f2c01bf298fa1b6fa839945fad465ebc2216baeb81a18eb39769e9e9c",
    "lane": 3,
    "metadata_owner_literal": "quick-retry2-lane-3.json",
    "original_analysis_record_hash_algorithm": "sortedcompact-json-v1"
  },
  "quick-retry2-root-spatial-round7.json": {
    "sha256": "b69475631a1940158820cce6fb24fee569ac1676702f5e3d630e4f6d60de4587",
    "count": 3,
    "analysis_file": "quick-retry2-root-round7.json",
    "analysis_sha256": "e198dd7524d22f377f9eb6348665d9702efd6bb682cb7853484c3250197eba3a",
    "log_file": "quick-retry2-root-round7-log.json",
    "log_sha256": "c12f3445d43669423a30181e5e39ce48d9a33f388898f8b456ee838a9a68b30a",
    "owner_file": "quick-retry2-lane-0.json",
    "owner_sha256": "63042ce16ccdf6f42ce33b78c52284ce82e0efb2cb84e1ac6b7b2faf4b65c1f7",
    "lane": 0,
    "metadata_owner_literal": "work/evidence/quick-retry2-lane-0.json",
    "original_analysis_record_hash_algorithm": "sortedcompact-json-v1",
    "adopted_analysis_file": "quick-retry2-root-round7-corrected.json",
    "adopted_analysis_sha256": "979c4e84b5c11af9a6b86d22dcbe7e18da8eae2c7b4f6a708e1607604006edaa"
  },
  "quick-retry2-root-spatial-round8.json": {
    "sha256": "42a2079af00664a4bb68356943dde8561bdcba65d4de2ff9b4f123dd40cbbbb4",
    "count": 3,
    "analysis_file": "quick-retry2-root-round8.json",
    "analysis_sha256": "0c2669bad6f0438c816509168e0724e7624c7a4ed7046a4cad130cf054111d6a",
    "log_file": "quick-retry2-root-round8-log.json",
    "log_sha256": "7db34317b6ee189e2a0a6c83296e02cb16902ced58cf210bd0d14ae3116be3da",
    "owner_file": "quick-retry2-lane-0.json",
    "owner_sha256": "63042ce16ccdf6f42ce33b78c52284ce82e0efb2cb84e1ac6b7b2faf4b65c1f7",
    "lane": 0,
    "metadata_owner_literal": "work/evidence/quick-retry2-lane-0.json",
    "original_analysis_record_hash_algorithm": "python-indent-2-newline-v1",
    "adopted_analysis_file": "quick-retry2-root-round8-corrected.json",
    "adopted_analysis_sha256": "7f58ca5127b3b40425e273b252fb53d76c0b49010dd0f5e0f167ad8ebe801a8f"
  },
  "quick-retry2-root-spatial-round9.json": {
    "sha256": "57c442d1b93796b1cdc03d1d0e84fa5bc0fcb247656693e698df535277982602",
    "count": 1,
    "analysis_file": "quick-retry2-root-round9.json",
    "analysis_sha256": "a2240c84a3495c88f674d4a59e0b8ea417f1ad0589c1bf66b670e9defd3a6e07",
    "log_file": "quick-retry2-root-round9-log.json",
    "log_sha256": "862ed7a5ecb94d2568cbb1dd0c9ceb2d4de409cd15b348da00ded7492b0431c4",
    "owner_file": "quick-retry2-lane-0.json",
    "owner_sha256": "63042ce16ccdf6f42ce33b78c52284ce82e0efb2cb84e1ac6b7b2faf4b65c1f7",
    "lane": 0,
    "metadata_owner_literal": "work/evidence/quick-retry2-lane-0.json",
    "original_analysis_record_hash_algorithm": "python-indent-2-newline-v1"
  },
  "quick-retry2-root-spatial-round10.json": {
    "sha256": "da5bcafdf351189e15bb09e20ed869532d4fad23283b3a066d3ba41947d4015a",
    "count": 3,
    "analysis_file": "quick-retry2-root-round10.json",
    "analysis_sha256": "6a7f5a7b6cb88848fef1bb71bf842eee89b5cd28ecb213de482ed2ecfa2e48c6",
    "log_file": "quick-retry2-root-round10-log.json",
    "log_sha256": "f074ad43b48db9d9f2df322e76608f07f1320625ca5a5000eea29a02378a71fb",
    "owner_file": "quick-retry2-lane-0.json",
    "owner_sha256": "63042ce16ccdf6f42ce33b78c52284ce82e0efb2cb84e1ac6b7b2faf4b65c1f7",
    "lane": 0,
    "metadata_owner_literal": "work/evidence/quick-retry2-lane-0.json",
    "original_analysis_record_hash_algorithm": "python-indent-2-newline-v1"
  }
});
export const R91_FIXED_PRE_CONTEXT_FILE="r91-samebatch-spatial-pre-adoption-context-v1.json";
export const R91_FIXED_PRE_CONTEXT_SHA256="45027afb03c586dd53f32ad07a1a3b3ecabd0ab17ca111dad4346bfab9703744";
export const R91_FIXED_TOPIC_ADAPTER_FILE="round91-root-topic-label-adapter.json";
export const R91_FIXED_TOPIC_ADAPTER_SHA256="9c39250cf191e4e0e55f6cc552f4be0e0b6d830d6132c7880d79831649c4e899";
const hash=b=>createHash('sha256').update(b).digest('hex');
const sorted=v=>Array.isArray(v)?v.map(sorted):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sorted(v[k])])):v;
export const r91SameBatchRecordSha=v=>hash(JSON.stringify(sorted(v)));
const equal=(a,b)=>r91SameBatchRecordSha(a)===r91SameBatchRecordSha(b);
const clone=v=>JSON.parse(JSON.stringify(v));const memo=new Map();
function exactFile(archive,sha,{repoDir,evidenceDir},kind){
 if(!repoDir||!/^research\/(issue|spatial)-input-snapshots\/[^/]+\.json$/.test(archive))throw new Error('R91 fixed archive path: '+kind);
 const p=join(repoDir,archive),b=readFileSync(p);if(hash(b)!==sha)throw new Error('R91 fixed archive hash: '+kind);
 if(evidenceDir){const f=join(evidenceDir,basename(archive));if(existsSync(f)&&hash(readFileSync(f))!==sha)throw new Error('R91 private/archive bytes: '+kind);}
 if(!memo.has(p+sha))memo.set(p+sha,JSON.parse(b));return memo.get(p+sha);
}
function row(doc,id,kind){const rs=[...(doc.records||[]),...(doc.deferred||[])].filter(x=>x.id===id);if(rs.length!==1)throw new Error('R91 exact row cardinality: '+kind+'/'+id);return rs[0];}
const scope=w=>Object.fromEntries(['id','title_zh','author','form','forms','source_entity_kind','source_types'].map(k=>[k,w[k]??null]));
const withoutHeader=w=>Object.fromEntries(Object.entries(w).filter(([k])=>!['input_file','log_date'].includes(k)));
const spatialKeys=['spatial_primary','spatial_secondary','spatial_rationale'];
const spatialProjection=w=>Object.fromEntries(spatialKeys.map(k=>[k,{present:Object.hasOwn(w.knowledge?.fields||{},k),value:w.knowledge?.fields?.[k]??null}]));
const zones=new Set(['earth','planetary','interstellar','galactic','cosmic','abstract']);
export function r91FixedSameBatchSpatialIds(context={}){
 const ids=[];for(const [f,p] of Object.entries(R91_FIXED_SAME_BATCH_SPATIAL_INPUTS)){const d=exactFile('research/spatial-input-snapshots/'+f,p.sha256,context,'S');if(d.records.length!==p.count)throw new Error('R91 pinned count');ids.push(...d.records.map(r=>r.id));}if(ids.length!==25||new Set(ids).size!==25)throw new Error('R91 exact25 cardinality');return new Set(ids);
}
export function isR91FixedSameBatchSpatialRecord(r,ctx={}){return Object.hasOwn(R91_FIXED_SAME_BATCH_SPATIAL_INPUTS,r.source_spatial_input_file)||r91FixedSameBatchSpatialIds(ctx).has(r.id);}
// Normalization of the exact new raw L is additive to the complete frozen old
// process. No root raw-string web cache is reparsed as a fictional request.
export function r91SameBatchExpectedNormalizedSource(l,a,prior,logfile){
 const old=withoutHeader(prior),q=[...new Set((l.queries||[]).map(v=>typeof v==='string'?v:v.query))];
 const reading=l.reading_scope||l.exact_support_scope||a.field_notes.source_scope||a.field_notes.issue;
 const src=Object.hasOwn(l,'materials_checked')?l.materials_checked:Object.hasOwn(l,'sources')?l.sources:(l.urls_read||[]).map(url=>({url}));
 const ev=new Map((l.source_evidence||[]).map(e=>[e.url||e.source_url,e]));
 const materials=src.map(v=>{const m=typeof v==='string'?{url:v}:clone(v),e=ev.get(m.url)||{};m.material_type??=m.material_kind||l.material_kind||'实际有限来源材料';m.result??=l.actual_content_source_read!==false?'actual_source_scope_read':'catalog_only';m.reading_scope??=m.support_scope||m.scope||e.support_scope||reading;m.read_date??='2026-10-05';return m;});
 if(!q.length&&materials.length)throw new Error('R91 zero-query fabricated materials');
 const n={id:l.id,identity:clone(a.identity),attempt_state:l.attempt_state||'content_material_read',queries:q,new_queries:[...q],query_note:'仅实际新查询；queries合并历史，new_queries只本次。原始记录及全部旧历史保留，打开不充作查询。',materials_checked:materials,reading_scope:reading,reason_unconfirmed:l.reason_unconfirmed||l.no_material_reason||l.reason||'有限材料/已有知识支持明示范围，解释待独立核验。',next_step:l.next_step||'继续按准确作品、单卷或选篇范围独立核对；不足者延期。',issue_result:l.issue_result||'added_to_frozen_input_unverified',attempt_input:logfile,raw_reading_log:clone(l),verification_status:'knowledge_added_unverified',actual_search_performed:!!q.length,actual_search_count:q.length,knowledge_analysis:false,original_full_text_read:false};
 const outcomes=materials.filter(m=>!m.url);if(outcomes.length){n.search_outcomes=outcomes;n.materials_checked=materials.filter(m=>m.url);n.material_normalization_note='没有来源URL的真实检索结果说明只列search_outcomes；raw新记录保持原样，不造来源材料。';}
 for(const [k,v] of Object.entries(l))if(!Object.hasOwn(n,k)&&!['sources','materials_checked','queries','identity'].includes(k))n[k]=clone(v);
 n.previous_attempts=clone(old.previous_attempts||[]).concat([Object.fromEntries(Object.entries(old).filter(([k])=>k!=='previous_attempts'))]);
 n.queries=[...new Set(old.queries.concat(q))];n.materials_checked=clone(old.materials_checked).concat(n.materials_checked);
 return {input_file:prior.input_file,log_date:prior.log_date,...n};
}
export function validateR91FixedSameBatchSpatialEvidence(record,{repoDir,evidenceDir,currentWork,issueAssertions,sourceSearchLog,spatialAdoptionPhase='auto'}={}){
 const fail=why=>{throw new Error('R91 fixed same-batch space rejected ('+why+'): '+record.id);};const ctx={repoDir,evidenceDir};const p=R91_FIXED_SAME_BATCH_SPATIAL_INPUTS[record.source_spatial_input_file];
 if(!p||record.source_spatial_input_sha256!==p.sha256||record.source_spatial_input_archive!=='research/spatial-input-snapshots/'+record.source_spatial_input_file)fail('fixed S declaration');
 const sd=exactFile(record.source_spatial_input_archive,p.sha256,ctx,'S'),s=row(sd,record.id,'S');if(sd.metadata.status!=='frozen_checkpoint'||r91SameBatchRecordSha(s)!==record.source_spatial_input_record_sha256)fail('exact frozen S');
 const overrides=new Set(p.original_analysis_record_hash_algorithm==='python-indent-2-newline-v1'?['source_analysis_record_sha256']:[]);if(p.adopted_analysis_file){overrides.add('source_analysis_sha256');overrides.add('source_analysis_record_sha256');}
 for(const k of Object.keys(s))if(!overrides.has(k)&&!equal(record[k],s[k]))fail('changed original S '+k);
 const allowedExtra=new Set(['source_analysis_archive','source_log_archive','source_log_file','source_log_sha256','source_log_record_sha256','source_spatial_input_file','source_spatial_input_sha256','source_spatial_input_record_sha256','source_spatial_input_archive']);
 if(Object.keys(record).some(k=>!Object.hasOwn(s,k)&&!allowedExtra.has(k)))fail('unauthorized S adapter/marker');
 if(record.source_analysis_file!==p.analysis_file||record.source_analysis_sha256!==(p.adopted_analysis_sha256||p.analysis_sha256)||record.source_analysis_archive!=='research/issue-input-snapshots/'+(p.adopted_analysis_file||p.analysis_file)||record.source_log_sha256!==p.log_sha256||record.source_log_archive!=='research/issue-input-snapshots/'+p.log_file||Object.hasOwn(record,'source_log_file')&&record.source_log_file!==p.log_file)fail('fixed A/L declarations');
 const originalAd=exactFile('research/issue-input-snapshots/'+p.analysis_file,p.analysis_sha256,ctx,'original A'),originalA=row(originalAd,record.id,'original A');
 const ad=p.adopted_analysis_file?exactFile(record.source_analysis_archive,p.adopted_analysis_sha256,ctx,'corrected A'):originalAd,ld=exactFile(record.source_log_archive,p.log_sha256,ctx,'L'),a=row(ad,record.id,'adopted A'),l=row(ld,record.id,'L');
 if(p.adopted_analysis_file){const adapter=exactFile('research/spatial-input-snapshots/'+R91_FIXED_TOPIC_ADAPTER_FILE,R91_FIXED_TOPIC_ADAPTER_SHA256,ctx,'fixed five-topic adapter');if(adapter.metadata.status!=='frozen_exact_registered_topic_label_adapter'||adapter.records.length!==5)fail('fixed topic adapter phase');const ar=adapter.records.find(x=>x.id===record.id),expected=clone(originalA);if(ar){if(ar.original_analysis_file!==p.analysis_file||ar.original_analysis_sha256!==p.analysis_sha256||ar.original_analysis_record_sha256!==r91SameBatchRecordSha(originalA)||!equal(ar.original_topics,originalA.fields.topics))fail('fixed specific original topic row');expected.fields.topics=clone(ar.normalized_topics);}if(!equal(expected,a)||Object.entries(originalAd.metadata).some(([k,v])=>!equal(v,ad.metadata[k])))fail('only fixed five topic labels changed');}
 if(!['frozen_checkpoint','private_frozen_checkpoint'].includes(ad.metadata.status)||!['frozen_checkpoint','private_frozen_checkpoint'].includes(ld.metadata.status)||record.source_analysis_record_sha256!==r91SameBatchRecordSha(a)||record.source_log_record_sha256!==r91SameBatchRecordSha(l))fail('exact A/L row');
 const expectedOriginalHash=p.original_analysis_record_hash_algorithm==='python-indent-2-newline-v1'?hash(JSON.stringify(originalA,null,2)+'\n'):r91SameBatchRecordSha(originalA);if(s.source_analysis_record_sha256!==expectedOriginalHash)fail('fixed original legacy hash algorithm');
 if(ad.metadata.ownership_file!==p.metadata_owner_literal||ld.metadata.ownership_file!==p.metadata_owner_literal||ad.metadata.ownership_sha256!==p.owner_sha256||ld.metadata.ownership_sha256!==p.owner_sha256||sd.metadata.ownership_file!==p.owner_file||sd.metadata.ownership_sha256!==p.owner_sha256||sd.metadata.lane!==p.lane)fail('exact original metadata ownership');
 const od=exactFile('research/issue-input-snapshots/'+p.owner_file,p.owner_sha256,ctx,'owner');if(od.metadata.status!=='frozen_retry_assignment'||od.metadata.lane!==p.lane)fail('owner phase/lane');
 const own=od.records[record.original_ownership_index];if(!own||own.id!==record.id||record.ownership_index!==record.original_ownership_index||l.ownership_index!==record.original_ownership_index||record.original_ownership_file!==p.owner_file||record.original_ownership_sha256!==p.owner_sha256||!equal(l.prior_source_log,own.prior_source_log))fail('exact owner index/full prior');
 const cd=exactFile('research/spatial-input-snapshots/'+R91_FIXED_PRE_CONTEXT_FILE,R91_FIXED_PRE_CONTEXT_SHA256,ctx,'frozen pre context'),f=row(cd,record.id,'pre'),old=f.pre_canonical_work;
 if(f.source_spatial_input_file!==record.source_spatial_input_file||f.source_spatial_input_record_sha256!==r91SameBatchRecordSha(s)||f.original_owner_index!==record.original_ownership_index||f.original_owner_record_sha256!==r91SameBatchRecordSha(own)||f.original_owner_prior_sha256!==r91SameBatchRecordSha(own.prior_source_log)||f.pre_canonical_record_sha256!==r91SameBatchRecordSha(old)||!equal(old.source_search_log,own.prior_source_log)||old.issue_analysis_status!=='missing'||old.spatial_primary!=='unknown')fail('fixed original pre state');
 if(!currentWork||currentWork.id!==record.id||!equal(scope(currentWork),scope(old))||!equal(record.identity,{title:old.title_zh,author:old.author})||!equal(record.identity,a.identity)||!equal(record.identity,l.identity)||a.verification_status!=='knowledge_added_unverified'||record.verification_status!=='knowledge_added_unverified'||record.integration_relation!=='same_batch_core')fail('exact grain/identity/no upgrade');
 if(!equal(Object.keys(a.fields).sort(),['issue','issue_facets','topics'])||!a.fields.issue||a.fields.issue_facets.length<2||!equal(record.sources,a.sources)||!equal(record.source_evidence,a.source_evidence)||!record.sources.length)fail('same exact scoped A provenance');
 const counters=Object.fromEntries(Object.entries(l).filter(([k])=>k.endsWith('_count'))),presence=Object.fromEntries(['actual_search_performed','actual_search_count','actual_open_count','full_original_text_read'].map(k=>[k,Object.hasOwn(l,k)]));
 if(!equal(counters,f.original_log_counter_fields)||!equal(presence,f.original_log_counter_presence)||f.original_log_record_sha256!==r91SameBatchRecordSha(l)||f.original_analysis_record_sha256!==r91SameBatchRecordSha(originalA))fail('original scope/counter presence');
 const refs=[...(l.response_cache_references||[]),...(l.open_cache_references||[])];if((s.source_cache_references||[]).some(ref=>!refs.some(r=>equal(r,ref))||!a.source_cache_references?.some(r=>equal(r,ref))))fail('original scoped cache references');
 // Root raw JSON-string returns remain references in the exact original L;
 // root/global separately audit the private complete returned bytes.
 if(issueAssertions!==undefined&&!equal(issueAssertions,currentWork.knowledge?.assertions))fail('assertion context');if(sourceSearchLog!==undefined&&!equal(sourceSearchLog,currentWork.source_search_log))fail('process context');
 const assertions=currentWork.knowledge?.assertions||[],active=assertions.some(x=>equal(Object.fromEntries(Object.entries(x).filter(([k])=>k!=='input_file')),a));
 const expectedSource=r91SameBatchExpectedNormalizedSource(l,a,own.prior_source_log,p.log_file);
 const before=equal(currentWork.source_search_log,old.source_search_log),after=equal(currentWork.source_search_log,expectedSource)||matchesR91CandidateProcessAdapter(currentWork.source_search_log,expectedSource,{repoDir});
 if(!before&&!after)fail('whole additive normalized source/full old history');
 const oldCore=currentWork.issue_analysis_status==='missing'&&currentWork.issue===old.issue,newCore=currentWork.issue_analysis_status!=='missing'&&currentWork.issue===a.fields.issue;
 if(!(oldCore&&before&&!active||oldCore&&after&&active||newCore&&after&&active))fail('exact pre/staged/post core transition');
 if(!equal(Object.keys(record.fields).sort(),['spatial_primary','spatial_rationale','spatial_secondary'])||!zones.has(record.fields.spatial_primary)||!Array.isArray(record.fields.spatial_secondary)||record.fields.spatial_secondary.some(x=>!zones.has(x)||x===record.fields.spatial_primary)||!record.fields.spatial_rationale?.trim())fail('three actual space fields');
 if(!['auto','pre','post'].includes(spatialAdoptionPhase))fail('phase');
 if(currentWork.spatial_primary==='unknown'){
  if(spatialAdoptionPhase==='post'||!equal(currentWork.spatial_evidence,old.spatial_evidence)||!equal(spatialProjection(currentWork),spatialProjection(old)))fail('exact unknown pre spatial projection');
 }else{
  const e=currentWork.spatial_evidence,f=currentWork.knowledge?.fields;
  if(spatialAdoptionPhase==='pre'||!newCore||!after||!active||currentWork.spatial_primary!==record.fields.spatial_primary||!e||!['primary','secondary','rationale'].every(k=>Object.hasOwn(e,k))||e.primary!==record.fields.spatial_primary||!equal(e.secondary,record.fields.spatial_secondary)||e.rationale!==record.fields.spatial_rationale||!f||!spatialKeys.every(k=>Object.hasOwn(f,k)&&equal(f[k],record.fields[k])))fail('post actual core/source/three space fields');
 }
 return 'scoped_reading';
}
