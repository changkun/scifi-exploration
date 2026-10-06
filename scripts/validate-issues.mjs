import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {gunzipSync} from 'node:zlib';
import {buildCanonicalUniverse,coverageOf} from '../dist/assets/canonical.mjs';
import {loadBibliographySource,loadCompletionSource} from '../dist/assets/data-loader.mjs';
import {filterWorks,DEFAULT_STATE,stateFromURL,searchFromState} from '../dist/assets/model.mjs';
import {issueDetail,renderIssueExplorer} from '../dist/assets/issues.mjs';
import {listIssueInputs,listSpatialInputs,listDimensionInputs} from './issue-inputs.mjs';
import {createKnowledgeDimensionContext,validateKnowledgeDimensionEvidence} from './knowledge-dimensions-evidence.mjs';
import {fileURLToPath} from 'node:url';
const root=new URL('../',import.meta.url),read=async p=>JSON.parse(await readFile(new URL(p,root),'utf8'));
const fetcher=async p=>({ok:true,json:()=>read('dist/'+p)});
const gz=async p=>JSON.parse(gunzipSync(await readFile(new URL(p,root))));
const [source,completion,catalog,spatial,links,archive,summary]=await Promise.all([loadBibliographySource(fetcher),loadCompletionSource(fetcher),read('dist/assets/catalog.json'),read('dist/assets/spatial.json'),read('dist/assets/research-links.json'),gz('research/issue-analysis.json.gz'),read('research/issue-completion-summary.json')]);
const works=buildCanonicalUniverse(source.records,catalog.works,spatial,links,completion.records).works;
let passed=0;const check=(name,fn)=>{fn();passed++;console.log('PASS '+name);};
const batches=await listIssueInputs(root);
const inputs=await Promise.all(batches.map(read));
check('all issue batches preserve their exact original assertions in the merged archive',()=>{for(let i=0;i<inputs.length;i++)for(const r of inputs[i].records){const w=works.find(w=>w.id===r.id);assert(w);assert(w.knowledge.assertions.some(a=>{const {input_file,...raw}=a;return input_file===batches[i]&&JSON.stringify(raw)===JSON.stringify(r);}));assert.equal(r.verification_status,'knowledge_added_unverified');assert.deepEqual(Object.keys(r.fields).sort(),['issue','issue_facets','topics']);}});
const originals=await Promise.all(['research/knowledge-existing.json','research/knowledge-additional.json'].map(read));
const priorKnowledge=new Map(originals.flatMap(d=>d.records).map(r=>[r.id,r]));
// Keep the separate spatial overlay in both sides of the issue-only comparison.
// This still rejects any spatial fields originating in an issue batch.
for(const input of await Promise.all((await listSpatialInputs(root)).map(read)))for(const r of input.records){
 const old=priorKnowledge.get(r.id);
 priorKnowledge.set(r.id,{...(old||r),fields:{...r.fields,...old?.fields},field_notes:{...r.field_notes,...old?.field_notes}});
}
// Hold separately guarded dimension additions constant in the issue-only
// comparison, just as for spatial overlays. Original issue inputs remain exact.
const dimensionContext=createKnowledgeDimensionContext({repoDir:fileURLToPath(root)});
for(const inputFile of await listDimensionInputs(root))for(const record of (await read(inputFile)).records){
 const currentWork=works.find(work=>work.id===record.id);
 const evidence=validateKnowledgeDimensionEvidence(record,{trustedContext:dimensionContext,currentWork,inputFile,dimensionAdoptionPhase:'post'});
 assert.equal(evidence.status,'knowledge_added_unverified',record.id+' guarded dimension overlay');
 const old=priorKnowledge.get(record.id);
 priorKnowledge.set(record.id,{...(old||record),fields:{...old?.fields,...record.fields},field_notes:{...old?.field_notes,...record.field_notes}});
}
const priorSupplements=completion.records.map(s=>({...s,knowledge:priorKnowledge.get(s.id)||null}));
const prior=buildCanonicalUniverse(source.records,catalog.works,spatial,links,priorSupplements).works,priorMap=new Map(prior.map(w=>[w.id,w]));
check('issue additions never fabricate unrelated bibliographic, spatial or temporal fields',()=>{for(const w of works){const old=priorMap.get(w.id);for(const key of ['id','source_index','research','first_year','sort_year','source_first_year','spatial_primary','spatial_evidence','duration','story_era','reach','science_class','science_note','original_language','title_zh','title_original','author','languages','forms','entity_link'])assert.deepEqual(w[key],old[key],w.id+' '+key);if(old.issue_analysis_status!=='missing')assert.equal(w.issue,old.issue);}});
check('core analysis is distinct from classification candidates and its missing-field status',()=>{for(const w of works){const has=Boolean(w.research?.issue||w.knowledge?.fields.issue);assert.equal(w.issue_analysis_status==='missing',!has);assert.equal(w.completion.missing_fields.includes('issue'),!has);assert.equal(w.completion.source_verified,false);if(!has)assert(w.issue.includes('分析尚未补充'));}});
check('all fine questions contain an explicit question and work-specific plot basis',()=>{for(const w of works.filter(w=>w.issue_facets.length)){assert(w.issue_facets.length>=2);assert.equal(w.issue_facets_status,'knowledge_added_unverified');for(const f of w.issue_facets){assert.equal(typeof f.label,'string');assert.equal(typeof f.question,'string');assert.equal(typeof f.basis,'string');assert(f.label.trim()&&f.question.length>5&&f.basis.length>8);assert(w.search_text.includes(f.question.normalize('NFKC').toLocaleLowerCase()));}}});
check('exact facet and analysis-state selections preserve shared signed-year URL state',()=>{const label=works.find(w=>w.issue_facets.length).issue_facets[0].label;const state={...DEFAULT_STATE,boundary:true,facet:label,issueStatus:'analyzed',yearMin:-500,yearMax:2025};assert.deepEqual(stateFromURL('?'+searchFromState(state),works),state);const filtered=filterWorks(works,{...DEFAULT_STATE,boundary:true,facet:label});assert(filtered.length>0);assert(filtered.every(w=>w.issue_facets.some(f=>f.label===label)));assert.equal(filterWorks(works,{...DEFAULT_STATE,boundary:true,issueStatus:'analyzed'}).length,summary.analyzed);assert.equal(filterWorks(works,{...DEFAULT_STATE,boundary:true,issueStatus:'missing'}).length,summary.analysis_missing);});
check('analysis downloads and counts come from the same canonical universe',()=>{assert.deepEqual(archive.records.map(r=>r.id),works.filter(w=>w.issue_analysis_status!=='missing').map(w=>w.id));assert.equal(summary.universe,works.length);assert.equal(summary.previously_analyzed,prior.filter(w=>w.issue_analysis_status!=='missing').length);assert.equal(summary.newly_analyzed,works.filter(w=>w.issue_analysis_status!=='missing'&&priorMap.get(w.id).issue_analysis_status==='missing').length);assert.equal(summary.analyzed,coverageOf(works).issue_analyzed);assert.equal(summary.facet_count,coverageOf(works).issue_facets);assert.equal(summary.newly_analyzed_ids.length,summary.newly_analyzed);for(const r of archive.records){const w=works.find(w=>w.id===r.id);assert.equal(r.issue,w.issue);assert.deepEqual(r.issue_facets,w.issue_facets);}});
check('UI keeps fine-grained interpretations, safely escapes text and counts works once per label',()=>{const w=works.find(w=>w.issue_facets.length);assert(issueDetail(w).includes('情节依据'));assert(!issueDetail({...w,issue_facets:[{label:'<script>',question:'<img>',basis:'<svg>'}]}).includes('<script>'));const mock={innerHTML:''};renderIssueExplorer(mock,[{...w,issue_facets:[w.issue_facets[0],w.issue_facets[0]]}]);assert(mock.innerHTML.includes('细分议题 · 1 个原始分析标签'));assert(mock.innerHTML.includes('1 条有核心问题分析'));});
check('specific title and text-unit doubts remain visible without silently rewriting source identity',()=>{for(const w of works){const notes=[...new Set((w.knowledge?.assertions||[]).map(a=>a.identity_caveat).filter(Boolean))];assert.deepEqual(w.knowledge_identity_notes,notes);if(notes.length)for(const n of notes)assert(issueDetail(w).includes(n.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))));}const chrome=works.find(w=>w.id==='Q2755162');assert(chrome.knowledge_identity_notes.length);assert.equal(chrome.source_index.title_en,'Burning Chrome');assert.equal(chrome.completion.source_verified,false);});
check('documented issue corrections change display without losing original assertions or upgrading verification',()=>{const w=works.find(w=>w.id==='Q5457612'),c=w.knowledge.corrections[0],old=w.knowledge.superseded_issue_fields[0];assert.equal(w.issue,c.fields.issue);assert.deepEqual(w.issue_facets,c.fields.issue_facets);assert.notEqual(w.issue,old.fields.issue);assert(w.knowledge.assertions.some(a=>a.fields.issue===old.fields.issue));assert(w.knowledge.assertions.some(a=>a.correction_note?.reason===c.correction_note.reason));assert.equal(w.issue_facets.length,old.fields.issue_facets.length);assert.equal(w.issue_analysis_status,'knowledge_added_unverified');assert.equal(w.completion.source_verified,false);assert(issueDetail(w).includes('分析更正记录'));assert(issueDetail(w).includes(c.correction_note.old_claim));});
check('cross-column plot correction retains the exact original and replaces only the scoped current interpretation',()=>{
 const w=works.find(work=>work.id==='Q131445245'),c=w.knowledge.corrections.find(correction=>correction.source_analysis_file==='quick-retry-early-round9.json');
 assert(c);assert.equal(w.issue,c.fields.issue);assert.deepEqual(w.issue_facets,c.fields.issue_facets);
 assert(c.correction_note.reason.includes('The Architect of Sleep'));
 assert.equal(c.correction_note.old_fields.issue,c.correction_note.old_claim);
 assert(w.knowledge.assertions.some(assertion=>assertion.fields.issue===c.correction_note.old_claim));
 assert(w.knowledge.superseded_issue_fields.some(old=>JSON.stringify(old.fields)===JSON.stringify(c.correction_note.old_fields)));
 assert(w.issue.includes('Salas Tarag'));assert(!w.issue.includes('Bentley'));assert(!w.issue.includes('Truck'));
 assert.equal(w.author,'Jim Aikin');assert.equal(w.completion.source_verified,false);
 assert(issueDetail(w).includes(c.correction_note.old_claim));
});
console.log(`${passed} issue checks passed; ${summary.newly_analyzed} newly analyzed, ${summary.facet_count} fine questions.`);
