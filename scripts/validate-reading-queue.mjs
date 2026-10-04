import {readFile} from 'node:fs/promises';
import {gunzipSync} from 'node:zlib';
import assertStrict from 'node:assert/strict';
import {sourceSearchDetail} from '../dist/assets/completion.mjs';
const root=new URL('../',import.meta.url),read=async p=>JSON.parse(gunzipSync(await readFile(new URL(p,root))));
const [canonical,queue,materials]=await Promise.all(['research/canonical-universe.json.gz','research/issue-research-queue.json.gz','research/reading-materials.json.gz'].map(read));
const assert=(ok,note)=>{if(!ok)throw new Error(note);console.log('PASS '+note);};
const identities=new Map(canonical.works.map(w=>[w.id,w]));
assert(queue.records.length===identities.size&&new Set(queue.records.map(r=>r.id)).size===identities.size&&queue.records.every(r=>identities.has(r.id)),'全量身份恰好登记一次');
assert(queue.records.every(r=>(r.task.stage==='analysis_present')===(identities.get(r.id).issue_analysis_status!=='missing')),'资料取得没有升级为分析完成');
assert(queue.records.every(r=>r.task.stage!=='content_reading_next'||r.reading_materials.some(m=>m.has_description&&m.previous_identity_status==='title_author_correspondence'&&m.same_dump_title&&m.same_dump_authors)),'研读优先保留题名作者与原书目对应条件');
assert(!materials.records.some(r=>r.materials.some(m=>'text'in m||'description'in m)),'公开资料清单不含原简介文本');
assert(materials.records.every(r=>r.materials.every(m=>m.acquisition_status!=='returned'||/^[a-f0-9]{64}$/.test(m.record_sha256))),'已取得记录保留可追踪的散列值');
const counts={};for(const r of queue.records)counts[r.task.stage]=(counts[r.task.stage]||0)+1;
assert(JSON.stringify(counts)===JSON.stringify(queue.metadata.stages),'阶段统计逐条可复算');
const revised=canonical.works.filter(w=>w.content_corrections.length);
assert(revised.every(w=>w.content_corrections.every(c=>w.source_first_year===c.original_source_value&&w.source_index.first_year===c.original_source_value&&w.sort_year===c.proposed_value&&w.completion.field_statuses.publication_date==='primary_date_correction'&&w.completion.has_conflict)),'原刊日期更正保留源值和差异并更新当前纪年');
assert(revised.every(w=>w.content_corrections.every(c=>w.sources.includes(c.source_url)&&c.inspection_method&&c.support_scope)),'日期更正保留实际查读范围与一手链接');
const searchLogs=JSON.parse(await readFile(new URL('research/issue-source-searches.json',root),'utf8'));
const logged=canonical.works.filter(w=>w.source_search_log);
assert(logged.length===searchLogs.records.length&&new Set(logged.map(w=>w.id)).size===logged.length,'实际检索记录逐身份归档，空记录不算查读');
for(const r of searchLogs.records){
 const w=identities.get(r.id),q=queue.records.find(q=>q.id===r.id);
 assertStrict.deepEqual(w.source_search_log,{input_file:'research/issue-source-searches.json',log_date:searchLogs.metadata.created_at,...r});
 assertStrict.deepEqual(q.source_search_log,w.source_search_log);
}
assert(true,'检索词、材料入口、失败结果与未确认原因完整进入底库及下载队列');
assert(logged.every(w=>!w.completion.source_verified)&&canonical.metadata.source_search_logs.record_count===logged.length,'阅读或失败日志不升级为整条核验，归档数量可复算');
assert(logged.every(w=>{const html=sourceSearchDetail(w);return html.includes('实际检索与阅读记录')&&html.includes('当次仍待确认')&&html.includes('当次后续计划')&&w.source_search_log.materials_checked.every(m=>html.includes(m.url.replaceAll('&','&amp;')));})&&sourceSearchDetail({source_search_log:null})==='','详情显示实际阅读边界与材料链接，不为无日志条目生成过程');
