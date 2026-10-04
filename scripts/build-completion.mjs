#!/usr/bin/env node
import {readFile,writeFile,mkdir,readdir,unlink} from 'node:fs/promises';
import {gunzipSync,gzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url),read=async p=>JSON.parse(await readFile(new URL(p,root),'utf8'));
const gz=async p=>JSON.parse(gunzipSync(await readFile(new URL(p,root))));
const [audit,library,source,catalog,links]=await Promise.all([gz('research/record-audit.json.gz'),gz('research/library-crosschecks.json.gz'),gz('research/structured-bibliography.json.gz'),read('dist/assets/catalog.json'),read('dist/assets/research-links.json')]);
const libraries=new Map(library.records.map(r=>[r.id,r])),sourceMap=new Map(source.records.map(r=>[r.id,r]));
const canonicalIds=new Set(audit.records.map(r=>r.id)),researchIds=new Set(links.links.map(r=>r.canonical_id));
const auditMap=new Map(audit.records.map(r=>[r.id,r])),researchByCanonical=new Map(links.links.map(l=>[l.canonical_id,catalog.works.find(w=>w.id===l.research_id)]));
const norm=v=>String(v||'').normalize('NFKC').toLocaleLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
const topics=new Set(catalog.works.flatMap(r=>r.topics)),spaces=new Set(['earth','planetary','interstellar','galactic','cosmic','abstract','unknown']);
const durations=new Set(['日—月','年—一生','多代—百年','千年—文明史','百万年—宇宙尺度','多尺度或非线性','待核']);
const sciences=new Set(['近现实外推','依赖未证技术','强反事实设定','混合或不适用']);
const knowledge=new Map(),knowledgeInputs=[];
const issueInputs=['research/issues-before-1900.json','research/issues-1900-1979.json','research/issues-since-1980.json'];
for(const p of ['research/knowledge-existing.json','research/knowledge-additional.json',...issueInputs]){
  let bytes;try{bytes=await readFile(new URL(p,root));}catch(e){if(e.code==='ENOENT'){console.log('Pending knowledge input: '+p);continue;}throw e;}
  const data=JSON.parse(bytes);knowledgeInputs.push({file:p,sha256:createHash('sha256').update(bytes).digest('hex'),count:data.records.length});
  const inputIds=new Set();
  for(const r of data.records){
    if(!canonicalIds.has(r.id)||inputIds.has(r.id)||knowledge.has(r.id)&&!issueInputs.includes(p))throw new Error('Invalid or duplicate knowledge identity: '+r.id);
    inputIds.add(r.id);
    if(!r.identity?.title||!r.identity?.author||r.verification_status!=='knowledge_added_unverified')throw new Error('Knowledge identity or status absent: '+r.id);
    if(r.identity_caveat!==undefined&&(typeof r.identity_caveat!=='string'||!r.identity_caveat.trim()))throw new Error('Invalid identity caveat: '+r.id);
    const original=sourceMap.get(r.id),prior=researchByCanonical.get(r.id),baseline=auditMap.get(r.id);
    const titles=[original?.title,original?.title_en,original?.title_zh,...Object.values(original?.source_labels||{}),...(original?.title_statements||[]).map(t=>t.value),...Object.values(original?.source_aliases||{}).flat(),prior?.title_zh,prior?.title_original,baseline.title].map(norm);
    const authors=[...(original?.authors||[]),...(original?.author_names_en||[]),...(original?.author_names_zh||[]),(original?.authors||[]).join(' / '),prior?.author,baseline.fields.author.value].map(norm);
    if(!titles.includes(norm(r.identity.title))||!authors.includes(norm(r.identity.author)))throw new Error('Knowledge title/author do not match canonical identity: '+r.id);
    if(Object.keys(r.fields).some(k=>!r.field_notes?.[k]))throw new Error('Knowledge field note absent: '+r.id);
    if(r.fields.spatial_primary&&!spaces.has(r.fields.spatial_primary))throw new Error('Invalid space: '+r.id);
    if(r.fields.duration&&!durations.has(r.fields.duration))throw new Error('Invalid duration: '+r.id);
    if(r.fields.science_class&&!sciences.has(r.fields.science_class))throw new Error('Invalid science: '+r.id);
    if((r.fields.topics||[]).some(t=>!topics.has(t)))throw new Error('Invalid topic: '+r.id);
    if(issueInputs.includes(p)){
      if(Object.keys(r.fields).some(k=>!['topics','issue','issue_facets'].includes(k)))throw new Error('Issue batch changes unrelated field: '+r.id);
      if(typeof r.fields.issue!=='string'||r.fields.issue.length<30||!r.fields.topics?.length)throw new Error('Issue analysis too sparse: '+r.id);
      const year=baseline.fields.publication_date.value??libraries.get(r.id)?.checks.find(c=>c.status==='title_author_correspondence'&&c.year_comparison?.status==='missing_source')?.year_comparison.library??null;
      if(p.includes('before-1900')&&!(year!=null&&year<1900)||p.includes('1900-1979')&&!(year>=1900&&year<=1979)||p.includes('since-1980')&&!(year==null||year>=1980))throw new Error('Issue batch outside assigned period: '+r.id);
    }
    if(r.fields.issue_facets&&(!Array.isArray(r.fields.issue_facets)||r.fields.issue_facets.length<2||r.fields.issue_facets.some(f=>!f.label||!f.question||!f.basis)))throw new Error('Issue facet lacks question or plot basis: '+r.id);
    if(p.includes('additional')&&researchIds.has(r.id))throw new Error('Additional knowledge overlaps researched: '+r.id);
    const assertion={input_file:p,...r},priorKnowledge=knowledge.get(r.id);
    if(!priorKnowledge){knowledge.set(r.id,{...r,assertions:[assertion]});continue;}
    const merged={...priorKnowledge,fields:{...priorKnowledge.fields},field_notes:{...priorKnowledge.field_notes},sources:[...new Set([...(priorKnowledge.sources||[]),...(r.sources||[])])],assertions:[...priorKnowledge.assertions,assertion]};
    for(const [key,value] of Object.entries(r.fields)){
      if(key==='topics')merged.fields.topics=[...new Set([...(merged.fields.topics||[]),...value])];
      else if(key==='issue_facets')merged.fields.issue_facets=[...(merged.fields.issue_facets||[]),...value];
      else if(merged.fields[key]==null)merged.fields[key]=value;
      // Original interpretations remain the display value; later analyses stay
      // in the exact assertions and in the optional alternative interpretation.
      else if(key==='issue'&&merged.fields.issue!==value)merged.issue_alternatives=[...(merged.issue_alternatives||[]),{value,note:r.field_notes.issue,input_file:p}];
      merged.field_notes[key]=[merged.field_notes[key],r.field_notes[key]].filter(Boolean).join('；补充说明：');
    }
    knowledge.set(r.id,merged);
  }
}
// Explicit subject headings generate navigation candidates only. Never infer
// plot duration, location or scientific plausibility from a heading or title.
const rules=[
 ['时间与因果','时间旅行',/time travel|time-travel|alternative histor|alternate histor/i],
 ['权力与制度','反乌托邦',/dystopi|totalitarian|dictatorship|political fiction/i],
 ['权力与制度','乌托邦',/^utopi/i],
 ['生态与资源','气候与生态科幻',/climate change|climatic changes|ecological fiction|environmental disasters|climate fiction/i],
 ['生存与风险','灾难与末世',/post-apocalyp|apocalyptic|end of the world|nuclear warfare|disaster fiction/i],
 ['技术与责任','机器人与人工智能',/artificial intelligence|robots|robotics/i],
 ['主体与意识','机器人与人工智能',/artificial intelligence|consciousness|mind uploading/i],
 ['资本与劳动','赛博朋克',/cyberpunk/i],
 ['技术与责任','赛博朋克',/cyberpunk/i],
 ['性别与亲密','女性主义与性别科幻',/feminist science fiction|gender identity|sex role|gender role/i],
 ['生命与人类定义','生物与后人类科幻',/genetic engineering|cloning|transhuman|posthuman|biopunk/i],
 ['殖民与他者','第一接触',/first contact|extraterrestrial beings|alien invasion/i],
 ['文明与历史','太空歌剧',/space opera|galactic empire/i],
 ['知识与认识','科学与认识',/epistemology|scientific discovery/i]
];
const detailDir=new URL('dist/assets/library-details/',root),indexDir=new URL('dist/assets/completion-index/',root);
await Promise.all([mkdir(detailDir,{recursive:true}),mkdir(indexDir,{recursive:true})]);
for(const dir of [detailDir,indexDir])for(const f of await readdir(dir))if(f.endsWith('.json'))await unlink(new URL(f,dir));
const detailUrls=new Map();
for(let start=0;start<library.records.length;start+=250){
 const n=String(start/250).padStart(3,'0'),url=`./assets/library-details/${n}.json`,part=library.records.slice(start,start+250);
 for(const r of part)detailUrls.set(r.id,url);
 await writeFile(new URL(n+'.json',detailDir),JSON.stringify({records:part}));
}
let candidateCount=0,matchedCount=0,dateConflicts=0,libraryMissingYearCandidates=0;
const records=audit.records.map(a=>{
 const cross=libraries.get(a.id),checks=cross?.checks||[],topicMap=new Map(),branchMap=new Map();
 for(const c of checks.filter(c=>c.status==='title_author_correspondence')){
  for(const heading of c.library.subject||[])for(const [topic,branch,pattern] of rules){
   const match=heading.match(pattern);if(!match)continue;
   const basis={field:'Open Library subject',value:heading,matched_text:match[0],source_url:c.source_url,external_id:c.id};
   if(!topicMap.has(topic))topicMap.set(topic,[]);topicMap.get(topic).push(basis);
   if(!branchMap.has(branch))branchMap.set(branch,[]);branchMap.get(branch).push(basis);
  }
 }
 const library_checks=checks.map(c=>({id:c.id,status:c.status,source_url:c.source_url,title:c.library?.title||null,authors:c.library?.author_name||[],title_match:c.title_match,author_match:c.author_match,scope_ok:c.scope_ok,year_comparison:c.year_comparison||{source:sourceMap.get(a.id)?.first_year??null,library:null,status:'not_returned'}}));
 if(topicMap.size)candidateCount++;if(checks.some(c=>c.status==='title_author_correspondence'))matchedCount++;
 if(checks.some(c=>c.status==='title_author_correspondence'&&c.year_comparison?.status==='different'))dateConflicts++;
 if(checks.some(c=>c.status==='title_author_correspondence'&&c.year_comparison?.status==='missing_source'))libraryMissingYearCandidates++;
 return {id:a.id,structural_result:a.verification.structural_result,field_statuses:Object.fromEntries(Object.entries(a.fields).map(([key,f])=>[key,f.status])),form_candidate:({novel_description:'长篇（来源描述候选）',short_text_description:'短篇／中篇（来源描述候选）',collection_or_fixup:'合集／组篇（来源描述候选）',series_description:'系列（来源描述候选）',series:'系列（来源类型候选）',chapter_or_serial_part:'章节／连载部分（来源类型候选）',edition_or_translation:'版本／译本（来源类型候选）'})[a.source_boundary.source_granularity_candidate]||null,form_basis:a.source_boundary,issues:a.issues,research_source_comparisons:a.research_source_comparisons,knowledge:knowledge.get(a.id)||null,library_checks,library_detail_url:detailUrls.get(a.id)||null,topic_candidates:[...topicMap].map(([topic,basis])=>({topic,basis,confidence:'外部书目主题词规则候选，待核'})),branch_candidates:[...branchMap].map(([branch,basis])=>({branch,basis,confidence:'外部书目主题词规则候选，待核'}))};
});
const metadata={format:'completion-overlay-v1',date:'2026-10-04',record_count:records.length,structural_checked:audit.metadata.structural_checked_count,knowledge_inputs:knowledgeInputs,knowledge_added:knowledge.size,library:library.metadata,library_correspondence:matchedCount,library_subject_candidate_records:candidateCount,library_date_differences:dateConflicts,library_missing_year_candidates:libraryMissingYearCandidates,note:'知识补充与规则候选均待独立核对。跨来源一致仅表示部分书目字段对应，不能认定整条已核验；日期差异和源实体粒度原样保留。'};
metadata.issue_batches=knowledgeInputs.filter(i=>issueInputs.includes(i.file));
metadata.issue_facet_records=records.filter(r=>r.knowledge?.fields.issue_facets?.length).length;
metadata.issue_facet_count=records.reduce((n,r)=>n+(r.knowledge?.fields.issue_facets?.length||0),0);
const chunks=[];
for(let start=0;start<records.length;start+=1000){const n=String(start/1000).padStart(3,'0');chunks.push(`./assets/completion-index/${n}.json`);await writeFile(new URL(n+'.json',indexDir),JSON.stringify({records:records.slice(start,start+1000)}));}
await writeFile(new URL('dist/assets/completion.json',root),JSON.stringify({format:'completion-manifest-v1',metadata,chunks},null,2)+'\n');
await writeFile(new URL('research/completion-overlay.json.gz',root),gzipSync(JSON.stringify({metadata,records}),{level:9}));
await writeFile(new URL('dist/assets/completion-overlay.json.gz',root),gzipSync(JSON.stringify({metadata,records}),{level:9}));
await writeFile(new URL('dist/assets/record-audit.json.gz',root),await readFile(new URL('research/record-audit.json.gz',root)));
console.log(JSON.stringify(metadata,null,2));
