import {ERA_BOUNDS,DURATIONS,SCIENCES,DEFAULT_STATE,languageOf,filterWorks,stateFromURL,searchFromState} from './model.mjs';
import {mountUniverse} from './universe.mjs';
import {mountChronology} from './chronology.mjs';
import {mountBibliography} from './bibliography.mjs';
import {mountTaxonomy} from './taxonomy.mjs';
const $=id=>document.getElementById(id);
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const unique=arr=>[...new Set(arr)].sort((a,b)=>a.localeCompare(b,'zh-CN'));
const PAGE_SIZE=18;
let universe,chronology,bibliography,taxonomy,spatial={},spatialById=new Map(),currentView='universe';
let works=[],content={},byId=new Map(),state={...DEFAULT_STATE},selectedWork='',compareIds=[],toastTimer;
const viewNames=['universe','chronology','bibliography','taxonomy','library','history','themes','routes','method'];
const filterNames={topic:'议题',branch:'分支',era:'年代',duration:'跨度',science:'科学前提',language:'语言',form:'形态'};
const tag=(label,key='topic')=>`<button class="tag${key==='branch'?' neutral':''}" data-filter="${key}" data-value="${escape(label)}">${escape(label)}</button>`;
const compareButton=w=>`<button class="compare-button" data-compare="${w.id}" aria-pressed="${compareIds.includes(w.id)}" aria-label="${compareIds.includes(w.id)?'从比较移除':'加入比较'}：${escape(w.title_zh)}">${compareIds.includes(w.id)?'✓ 已加入比较':'+ 比较'}</button>`;
const anchor=id=>{const w=byId.get(id);return w?`<button class="anchor-link" data-work="${id}">${escape(w.title_zh)}<small>${escape(w.year_display)}</small></button>`:'';};
function setOptions(id,options){$(id).insertAdjacentHTML('beforeend',options.map(item=>{const o=typeof item==='string'?{id:item,label:item}:item;return `<option value="${escape(o.id)}">${escape(o.label)}</option>`;}).join(''));}
function updateURL(){const search=searchFromState(state,selectedWork);history.replaceState(null,'',location.pathname+(search?'?'+search:'')+(location.hash||'#universe'));}
function readComparison(){try{const ids=JSON.parse(localStorage.getItem('sf-atlas-comparison')||'[]');return Array.isArray(ids)?unique(ids.filter(id=>byId.has(id))).slice(0,3):[];}catch{return [];}}
function saveComparison(){try{localStorage.setItem('sf-atlas-comparison',JSON.stringify(compareIds));}catch{}}
function updateFilters(){for(const key of Object.keys(filterNames))$(`filter-${key}`).value=state[key];$('search-input').value=state.query;$('include-boundary').checked=state.boundary;$('chronology-boundary').checked=state.boundary;$('sort').value=state.sort;}
function syncVisuals(){
 universe?.update(filterWorks(works,state),state.topic);
 chronology?.update(filterWorks(works,{...state,yearMin:null,yearMax:null}));
 chronology?.setRange(state.yearMin,state.yearMax);
 $('chronology-filter-status').textContent=`当前研究目录：${filterWorks(works,state).length} 条。时间与目录筛选共同生效；扩展书目在独立入口浏览。`;
}
function renderLibrary(){
 const filtered=filterWorks(works,state),pageCount=Math.max(1,Math.ceil(filtered.length/PAGE_SIZE));
 state.page=Math.min(state.page,pageCount);const start=(state.page-1)*PAGE_SIZE,page=filtered.slice(start,start+PAGE_SIZE);
 $('result-count').innerHTML=`<strong>${filtered.length}</strong> 条结果 <span>／ ${state.boundary?168:160} 条${state.boundary?'全部记录':'科幻作品'}</span>`;
 $('active-filters').innerHTML=Object.keys(filterNames).filter(key=>state[key]).map(key=>`<button data-clear="${key}" aria-label="移除${filterNames[key]}筛选：${escape(state[key])}">${escape(key==='era'?ERA_BOUNDS.find(e=>e.id===state.era)?.label:state[key])} <span aria-hidden="true">×</span></button>`).join('');
 if(state.yearMin!=null||state.yearMax!=null)$('active-filters').insertAdjacentHTML('beforeend',`<button data-clear-years aria-label="移除发表年份范围筛选">发表年份 ${state.yearMin??'最早'}—${state.yearMax??'最新'} <span aria-hidden="true">×</span></button>`);
 $('cards-toggle').setAttribute('aria-pressed',String(state.layout==='cards'));$('table-toggle').setAttribute('aria-pressed',String(state.layout==='table'));
 if(!filtered.length){$('results').innerHTML='<div class="empty-state"><h3>这组条件暂时没有作品</h3><p>试着移除一个筛选，或用更短的关键词搜索。</p><button data-reset>重置筛选</button></div>';}
 else if(state.layout==='cards')$('results').innerHTML=`<div class="work-grid">${page.map(w=>`<article class="work-card"><div class="card-top"><span class="card-year">${escape(w.year_display)}</span><span class="form-label">${escape(w.form)}</span></div><h3><button class="title-button" data-work="${w.id}">${escape(w.title_zh)}</button></h3><p class="card-author">${escape(w.author)}</p><p class="card-question">${escape(w.issue)}</p><div class="tag-list">${w.topics.slice(0,2).map(t=>tag(t)).join('')}</div><div class="card-bottom"><span>${escape(w.duration)} · ${escape(w.science_class)}</span>${compareButton(w)}</div></article>`).join('')}</div>`;
 else $('results').innerHTML=`<div class="table-scroll"><table class="work-table"><thead><tr><th scope="col">作品 / 作者</th><th scope="col">发表年份</th><th scope="col">底层议题</th><th scope="col">叙事跨度</th><th scope="col">科学前提</th><th scope="col">比较</th></tr></thead><tbody>${page.map(w=>`<tr><td><button class="title-button" data-work="${w.id}">${escape(w.title_zh)}</button><small>${escape(w.author)}</small></td><td>${escape(w.year_display)}</td><td><div class="tag-list">${w.topics.map(t=>tag(t)).join('')}</div></td><td>${escape(w.duration)}</td><td>${escape(w.science_class)}</td><td>${compareButton(w)}</td></tr>`).join('')}</tbody></table></div>`;
 $('page-status').textContent=filtered.length?`${start+1}—${Math.min(start+PAGE_SIZE,filtered.length)} / ${filtered.length} · 第 ${state.page}/${pageCount} 页`:'0 条结果';
 $('previous-page').disabled=state.page<=1;$('next-page').disabled=state.page>=pageCount;
 updateURL();syncVisuals();
}
function renderNavigation(){
 if(viewNames.includes(location.hash.slice(1)))currentView=location.hash.slice(1);
 const view=currentView;
 for(const name of viewNames)$(`${name}-view`).hidden=name!==view;
 document.querySelectorAll('[data-view]').forEach(a=>{if(a.dataset.view===view)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 document.title=`${({universe:'宇宙图景',chronology:'时间长廊',bibliography:'全景书目',taxonomy:'分支谱系',library:'研究目录',history:'历史脉络',themes:'议题地图',routes:'阅读路线',method:'研究方法'})[view]} · 科幻文明图谱`;
}
function renderContent(){
 $('history-list').innerHTML=content.periods.map((period,i)=>`<article class="history-item"><div class="history-date">${escape(period.time_label)}<small>${String(i+1).padStart(2,'0')}</small></div><div><h3>${escape(period.title)}</h3><p>${escape(period.description)}</p></div><div class="anchor-list">${period.anchor_work_ids.map(anchor).join('')}</div></article>`).join('');
 $('theme-list').innerHTML=content.topics.map((topic,i)=>`<article class="theme-item"><div class="theme-top"><span>${String(i+1).padStart(2,'0')} / QUESTION</span><span>${works.filter(w=>w.topics.includes(topic.title)).length} 条代表记录</span></div><h3>${escape(topic.title)}</h3><p>${escape(topic.core_question)}</p><div class="theme-examples">${topic.anchor_work_ids.map(anchor).join('')}</div><button class="browse-button" data-filter="topic" data-value="${escape(topic.title)}">按这一议题浏览 →</button></article>`).join('');
 $('route-list').innerHTML=content.routes.map((route,i)=>`<article class="route-item"><div class="route-description"><span class="eyebrow">PATH ${String(i+1).padStart(2,'0')}</span><h3>${escape(route.title)}</h3><p>${escape(route.description)}</p><small>${route.work_ids.length} 条目录 · 可按问题调整次序</small></div><ol class="route-steps">${route.steps.map((step,index)=>`<li data-step="${index+1}"><h4>${escape(step.label)}${step.relationship?' · '+escape(step.relationship):''}</h4><div class="route-books">${step.work_ids.map(anchor).join('')}</div>${step.scope_note?`<p class="route-scope">${escape(step.scope_note)}</p>`:''}</li>`).join('')}</ol></article>`).join('');
}
function safeSource(url){try{const u=new URL(url);return u.protocol==='https:'||u.protocol==='http:'?u:null;}catch{return null;}}
function sourceLabel(u){const host=u.hostname.replace(/^www\./,'');if(host==='sf-encyclopedia.com')return 'The Encyclopedia of Science Fiction · '+decodeURIComponent(u.pathname.split('/').pop()).replaceAll('_',' ');return host+' · 原始资料';}
function openWork(id){
 const w=byId.get(id);if(!w)return;selectedWork=id;const place=spatialById.get(id),zone=spatial.zones?.find(z=>z.id===place?.primary);
 $('work-detail').innerHTML=`<span class="eyebrow">${escape(w.inclusion_status)} / ${escape(w.form)}</span><h2 id="work-dialog-heading">${escape(w.title_zh)}</h2><p class="original-title">${escape(w.title_original)}</p><p class="detail-author">${escape(w.author)} · ${escape(w.language_tradition)}</p><div class="detail-question">${escape(w.issue)}</div>${place?`<div class="space-evidence"><strong>空间导航：${escape(zone?.label)} · ${escape(place.confidence)}</strong><p>${escape(place.rationale)}</p><p>仅用于空间阅读导航，不是物理位置或距离。</p></div>`:''}<div class="detail-section"><h3>书目与时间</h3><dl><dt>所记录发表年份</dt><dd>${escape(w.year_display)}</dd><dt>版本备注</dt><dd>${escape(w.year_note)}</dd><dt>故事所在时代</dt><dd>${escape(w.story_era)}</dd><dt>主体叙事跨度</dt><dd>${escape(w.duration)}</dd><dt>最大时间视野</dt><dd>${escape(w.reach)}</dd>${w.series_name?`<dt>系列</dt><dd>${escape(w.series_name)}</dd>`:''}</dl></div><div class="detail-section detail-tags"><h3>议题与分支</h3><div class="tag-list">${w.topics.map(t=>tag(t)).join('')}</div><div class="tag-list" style="margin-top:8px">${w.branches.map(b=>tag(b,'branch')).join('')}</div></div><div class="detail-section"><h3>科学前提 · ${escape(w.science_class)}</h3><p>${escape(w.science_note)}</p><p>这是关键设定与当前知识关系的定性分类，不是作品质量或未来预测准确率。</p></div><div class="detail-section"><h3>资料来源与证据边界</h3><ul class="source-links">${w.sources.map(s=>safeSource(s)).filter(Boolean).map((u,i)=>`<li><a href="${escape(u.href)}" target="_blank" rel="noopener noreferrer">${i+1}. ${escape(sourceLabel(u))} ↗</a></li>`).join('')}</ul><p>${escape(w.evidence_note)}</p></div><div class="detail-actions">${compareButton(w)}<a href="./report.html#record-${String(works.indexOf(w)+1).padStart(3,'0')}">查看报告中的记录 ↗</a></div>`;
 if(!$('work-dialog').open)$('work-dialog').showModal();updateURL();
}
function closeWork(){if($('work-dialog').open)$('work-dialog').close();selectedWork='';updateURL();}
function updateComparison(){
 $('compare-tray').hidden=!compareIds.length;$('compare-count').textContent=`已选 ${compareIds.length} / 3 部作品`;$('compare-titles').textContent=compareIds.map(id=>byId.get(id).title_zh).join(' · ');$('open-comparison').disabled=compareIds.length<2;
 document.querySelectorAll('[data-compare]').forEach(button=>{const active=compareIds.includes(button.dataset.compare);button.setAttribute('aria-pressed',String(active));button.textContent=active?'✓ 已加入比较':'+ 比较';button.setAttribute('aria-label',`${active?'从比较移除':'加入比较'}：${byId.get(button.dataset.compare)?.title_zh||''}`);});saveComparison();
}
function toggleCompare(id){if(compareIds.includes(id))compareIds=compareIds.filter(x=>x!==id);else if(compareIds.length>=3){showToast('最多同时比较 3 部作品，请先移除一部。');return;}else compareIds.push(id);updateComparison();}
function showComparison(){
 if(compareIds.length<2)return;closeWork();const selected=compareIds.map(id=>byId.get(id));
 const rows=[['底层问题',w=>escape(w.issue)],['发表年份与形态',w=>`${escape(w.year_display)} · ${escape(w.form)}<small>${escape(w.year_note)}</small>`],['故事所在时代',w=>escape(w.story_era)],['主体叙事跨度',w=>escape(w.duration)],['最大时间视野',w=>escape(w.reach)],['底层议题',w=>w.topics.map(t=>tag(t)).join(' ')],['科幻分支',w=>w.branches.map(t=>tag(t,'branch')).join(' ')],['科学前提',w=>`${escape(w.science_class)}<small>${escape(w.science_note)}</small>`]];
 $('comparison-content').innerHTML=`<div class="table-scroll"><table class="comparison-table"><thead><tr><th scope="col">比较维度</th>${selected.map(w=>`<th scope="col">${escape(w.title_zh)}<small>${escape(w.author)}</small></th>`).join('')}</tr></thead><tbody>${rows.map(([label,render])=>`<tr><th scope="row">${label}</th>${selected.map(w=>`<td>${render(w)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;$('comparison-dialog').showModal();
}
function showToast(message){clearTimeout(toastTimer);$('toast').textContent=message;$('toast').hidden=false;toastTimer=setTimeout(()=>$('toast').hidden=true,3500);}
function applyFilter(key,value){closeWork();if($('comparison-dialog').open)$('comparison-dialog').close();state[key]=value;state.page=1;location.hash='library';renderNavigation();updateFilters();renderLibrary();$('library-view').scrollIntoView({behavior:'smooth',block:'start'});}
function resetFilters(){state={...DEFAULT_STATE,layout:state.layout};updateFilters();renderLibrary();}
function registerEvents(){
 for(const key of Object.keys(filterNames))$(`filter-${key}`).addEventListener('change',e=>{state[key]=e.target.value;state.page=1;renderLibrary();});
 $('search-input').addEventListener('input',e=>{state.query=e.target.value;state.page=1;renderLibrary();});$('search-form').addEventListener('submit',e=>e.preventDefault());
 for(const id of ['include-boundary','chronology-boundary'])$(id).addEventListener('change',e=>{state.boundary=e.target.checked;state.page=1;updateFilters();renderLibrary();});$('sort').addEventListener('change',e=>{state.sort=e.target.value;state.page=1;renderLibrary();});$('reset-filters').addEventListener('click',resetFilters);$('chronology-reset').addEventListener('click',resetFilters);
 for(const layout of ['cards','table'])$(`${layout}-toggle`).addEventListener('click',()=>{state.layout=layout;renderLibrary();});
 for(const direction of ['previous','next'])$(`${direction}-page`).addEventListener('click',()=>{state.page+=direction==='next'?1:-1;renderLibrary();$('search-form').scrollIntoView({behavior:'smooth',block:'start'});});
 document.addEventListener('click',e=>{const target=e.target.closest('button');if(!target)return;if(target.dataset.work)openWork(target.dataset.work);else if(target.dataset.compare)toggleCompare(target.dataset.compare);else if(target.dataset.filter)applyFilter(target.dataset.filter,target.dataset.value);else if(target.dataset.clear)applyFilter(target.dataset.clear,'');else if(target.hasAttribute('data-clear-years')){state.yearMin=null;state.yearMax=null;state.page=1;renderLibrary();}else if(target.hasAttribute('data-reset'))resetFilters();});
 $('close-work').addEventListener('click',closeWork);$('work-dialog').addEventListener('cancel',()=>{selectedWork='';updateURL();});$('close-comparison').addEventListener('click',()=>$('comparison-dialog').close());
 for(const id of ['work-dialog','comparison-dialog'])$(id).addEventListener('click',e=>{if(e.target===$(id)){const r=$(id).getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom){id==='work-dialog'?closeWork():$(id).close();}}});
 $('clear-comparison').addEventListener('click',()=>{compareIds=[];updateComparison();});$('open-comparison').addEventListener('click',showComparison);
 addEventListener('hashchange',renderNavigation);addEventListener('popstate',()=>{const id=new URLSearchParams(location.search).get('work');selectedWork=id&&byId.has(id)?id:'';state=stateFromURL(location.search,works);updateFilters();renderLibrary();renderNavigation();if(selectedWork)openWork(selectedWork);else closeWork();});
 document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','SELECT','TEXTAREA'].includes(document.activeElement.tagName)&&!$('work-dialog').open&&!$('comparison-dialog').open){e.preventDefault();location.hash='library';renderNavigation();$('search-input').focus();}});
}
async function loadBibliographySource(fetcher=fetch){
 const response=await fetcher('./assets/bibliography.json');if(!response.ok)throw new Error('扩展书目索引暂时无法载入');
 const data=await response.json();let records;
 if(data.format==='source-index-manifest-v1'){
  if(!Array.isArray(data.chunks)||new Set(data.chunks).size!==data.chunks.length)throw new Error('扩展书目分片清单无效或重复');
  for(const chunk of data.chunks)if(typeof chunk!=='string'||!/^\.\/assets\/bibliography-index\/[A-Za-z0-9_-]+\.json$/.test(chunk))throw new Error('扩展书目索引分片路径无效');
  const parts=await Promise.all(data.chunks.map(async chunk=>{const partResponse=await fetcher(chunk);if(!partResponse.ok)throw new Error(`扩展书目分片未完整载入：${chunk}`);const part=await partResponse.json();if(!Array.isArray(part.records))throw new Error(`扩展书目分片缺少 records：${chunk}`);return part.records;}));
  records=parts.flat();
  const count=data.metadata?.record_count;if(!Number.isSafeInteger(count)||count<0||records.length!==count)throw new Error('扩展书目分片数量与清单声明不一致');
 }else{
  if(!Array.isArray(data.records))throw new Error('扩展书目缺少 records 或受支持的分片清单');records=data.records;
  if(data.metadata?.record_count!=null&&records.length!==data.metadata.record_count)throw new Error('扩展书目数量与来源声明不一致');
 }
 const ids=new Set();for(const record of records){if(!record||typeof record.id!=='string'||!/^Q[1-9]\d*$/.test(record.id)||ids.has(record.id))throw new Error('扩展书目记录编号无效或重复');ids.add(record.id);}
 return {records,metadata:data.metadata||{}};
}
async function loadExpandedBibliography(){
 let data;
 try{data=await loadBibliographySource();bibliography.update(data.records,data.metadata);}catch(error){bibliography.update(null,{coverage:'扩展书目尚未完整载入；未展示不完整分片。请刷新重试，已有研究目录、三维图景与报告仍可浏览。'});console.warn(error);return;}
 try{const response=await fetch('./assets/genre-hierarchy.json');if(!response.ok)throw new Error('分支谱系暂时无法载入');taxonomy.update(await response.json(),data.records);}catch(error){const summary=$('taxonomy-root').querySelector('.taxonomy-summary');if(summary)summary.textContent='分支谱系暂时无法载入；扩展书目已完整载入，仍可继续浏览与筛选。';console.warn(error);}
}
async function init(){try{
 const responses=await Promise.all([fetch('./assets/catalog.json'),fetch('./assets/content.json'),fetch('./assets/spatial.json')]);if(responses.some(r=>!r.ok))throw new Error('数据暂时无法载入');
 const [catalog,navigation,spaceData]=await Promise.all(responses.map(r=>r.json()));works=catalog.works;content=navigation;spatial=spaceData;spatialById=new Map(spatial.works.map(w=>[w.id,w]));byId=new Map(works.map(w=>[w.id,w]));state=stateFromURL(location.search,works);compareIds=readComparison();
 setOptions('filter-topic',content.topics.map(t=>t.title));setOptions('filter-branch',unique(works.flatMap(w=>w.branches)));setOptions('filter-era',ERA_BOUNDS);setOptions('filter-duration',DURATIONS);setOptions('filter-science',SCIENCES);setOptions('filter-language',unique(works.map(languageOf)));setOptions('filter-form',unique(works.map(w=>w.form)));
 universe=mountUniverse($('universe-root'),{works,spatial,onWork:openWork,onTopic:value=>{state.topic=value;state.page=1;updateFilters();renderLibrary();},onReset:resetFilters,onTimeline:()=>{location.hash='chronology';renderNavigation();}});
 chronology=mountChronology($('chronology-root'),{works,onWork:openWork,onRange:(min,max)=>{state.yearMin=min;state.yearMax=max;state.page=1;renderLibrary();}});
 bibliography=mountBibliography($('bibliography-root'),{records:null,curatedWorks:works,onWork:openWork});
 taxonomy=mountTaxonomy($('taxonomy-root'),{onGenre:label=>{bibliography.setFacet('genre',label);location.hash='bibliography';renderNavigation();}});
 loadExpandedBibliography();
 const requestedWork=new URLSearchParams(location.search).get('work');updateFilters();renderContent();registerEvents();renderNavigation();renderLibrary();updateComparison();if(requestedWork&&byId.has(requestedWork))openWork(requestedWork);
}catch(error){$('result-count').textContent='目录暂时无法载入';$('results').innerHTML='<div class="error-panel"><p>载入目录时出现问题，请刷新页面重试。</p><a href="./report.html">直接阅读完整报告 ↗</a></div>';console.error(error);}}
init();
