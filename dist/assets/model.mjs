import {CLASSIFICATION_REGISTRY} from './classifications.mjs';
export const ERA_BOUNDS = [
 {id:'before1800',label:'1800 年以前',min:-Infinity,max:1799},
 {id:'1800',label:'1800—1899',min:1800,max:1899},
 {id:'1900',label:'1900—1939',min:1900,max:1939},
 {id:'1940',label:'1940—1959',min:1940,max:1959},
 {id:'1960',label:'1960—1979',min:1960,max:1979},
 {id:'1980',label:'1980—1999',min:1980,max:1999},
 {id:'2000',label:'2000—2009',min:2000,max:2009},
 {id:'2010',label:'2010—2019',min:2010,max:2019},
 {id:'2020',label:'2020 年及以后',min:2020,max:9999}
];
export const DURATIONS=['日—月','年—一生','多代—百年','千年—文明史','百万年—宇宙尺度','多尺度或非线性','待核'];
export const SCIENCES=['近现实外推','依赖未证技术','强反事实设定','混合或不适用'];
export const DEFAULT_STATE={query:'',topic:'',branch:'',era:'',duration:'',science:'',language:'',form:'',boundary:false,yearMin:null,yearMax:null,sort:'oldest',layout:'cards',page:1,level:'',space:'',yearStatus:'',genre:'',type:'',audit:'',missing:'',issueStatus:'',facet:'',classification:''};
export const languageOf=w=>(w.language_tradition||'语言未知').split(/[·／]/)[0];
export function filterWorks(works,state){
 const query=state.query.trim().normalize('NFKC').toLocaleLowerCase();
 const terms=query.split(/\s+/).filter(Boolean);
 const era=ERA_BOUNDS.find(e=>e.id===state.era);
 return works.filter(w=>{
  if(!state.boundary&&['科幻前史','混合与边界参照'].includes(w.inclusion_status))return false;
  if(state.level&&w.research_level!==state.level)return false;
  if(state.space&&w.spatial_primary!==state.space)return false;
  if(state.audit==='missing'&&!w.completion?.missing_fields.length)return false;
  if(state.audit==='knowledge'&&!w.knowledge)return false;
  if(state.audit==='crosschecked'&&!w.completion?.has_library_correspondence)return false;
  if(state.audit==='conflict'&&!w.completion?.has_conflict)return false;
  if(state.audit==='identity'&&!w.completion?.has_identity_review)return false;
  if(state.audit==='pending'&&w.completion?.source_verified===true)return false;
  if(state.issueStatus==='analyzed'&&w.issue_analysis_status==='missing')return false;
  if(state.issueStatus==='missing'&&w.issue_analysis_status!=='missing')return false;
  if(state.facet&&!(w.issue_facets||[]).some(f=>f.label===state.facet))return false;
  if(state.classification&&!state.classification.split('|').every(id=>(w.classification_assignments||[]).some(c=>c.id===id)))return false;
  if(state.missing&&!w.completion?.missing_fields.includes(state.missing))return false;
  if(state.genre&&!(w.source_subject||[]).some(g=>g.id===state.genre||g.label===state.genre))return false;
  if(state.type&&!(w.source_types||[]).some(t=>t.label===state.type||t.id===state.type))return false;
  const year=w.sort_year??w.first_year;
  if(state.yearStatus==='unknown'&&year!=null)return false;
  if(state.yearStatus==='known'&&year==null)return false;
  if((state.yearMin!=null||state.yearMax!=null||state.era)&&year==null)return false;
  if(state.yearMin!=null&&year<state.yearMin)return false;
  if(state.yearMax!=null&&year>state.yearMax)return false;
  if(state.topic&&(state.topic==='__unknown__'?w.topics.length>0:!w.topics.includes(state.topic)))return false;
  if(state.branch&&(state.branch==='__unknown__'?w.branches.length>0:!w.branches.includes(state.branch)))return false;
  if(era&&((w.sort_year??w.first_year)<era.min||(w.sort_year??w.first_year)>era.max))return false;
  if(state.duration&&(state.duration==='__unknown__'?!['待分类','待核'].includes(w.duration):w.duration!==state.duration))return false;
  if(state.science&&(state.science==='__unknown__'?w.science_class!=='待分类':w.science_class!==state.science))return false;
  if(state.language&&!(w.languages||[languageOf(w)]).includes(state.language))return false;
  if(state.form&&!(w.forms||[w.form]).includes(state.form))return false;
  const haystack=w.search_text||[w.title_zh,w.title_original,w.author,w.series_name,w.issue,w.story_era,w.reach,w.science_note,w.language_tradition,...w.topics,...w.branches].join(' ').toLocaleLowerCase();
  return terms.every(t=>haystack.includes(t));
 }).sort((a,b)=>{const ay=a.sort_year??a.first_year,by=b.sort_year??b.first_year;if(state.sort!=='title'&&(ay==null||by==null))return ay==null?(by==null?a.id.localeCompare(b.id):1):-1;return state.sort==='title'?a.title_zh.localeCompare(b.title_zh,'zh-CN'):state.sort==='newest'?(b.sort_year??b.first_year)-(a.sort_year??a.first_year):(a.sort_year??a.first_year)-(b.sort_year??b.first_year);});
}
export function stateFromURL(search,works){
 const params=new URLSearchParams(search),state={...DEFAULT_STATE};
 for(const key of ['query','topic','branch','era','duration','science','language','form','level','space','yearStatus','genre','type','audit','missing','issueStatus','facet','classification'])if(params.has(key))state[key]=params.get(key);
 state.boundary=params.get('boundary')==='1';
 for(const key of ['yearMin','yearMax']){const value=params.get(key);if(value!==null&&/^-?\d{1,6}$/.test(value))state[key]=Number(value);}
 if(state.yearMin!=null&&state.yearMax!=null&&state.yearMin>state.yearMax){state.yearMin=null;state.yearMax=null;}
 if(['oldest','newest','title'].includes(params.get('sort')))state.sort=params.get('sort');
 if(params.get('layout')==='table')state.layout='table';
 state.page=Math.max(1,Math.min(1000,Number.parseInt(params.get('page'),10)||1));
 const allowed={topic:[...new Set(works.flatMap(w=>w.topics))],branch:[...new Set(works.flatMap(w=>w.branches))],era:ERA_BOUNDS.map(e=>e.id),duration:[...new Set([...DURATIONS,...works.map(w=>w.duration)])],science:[...new Set([...SCIENCES,...works.map(w=>w.science_class)])],language:[...new Set(works.map(languageOf))],form:[...new Set(works.map(w=>w.form))]};
 allowed.issueStatus=['analyzed','missing'];allowed.facet=[...new Set(works.flatMap(w=>(w.issue_facets||[]).map(f=>f.label)))];
 allowed.topic.push('__unknown__');allowed.branch.push('__unknown__');allowed.duration.push('__unknown__');allowed.science.push('__unknown__');allowed.level=['researched','enriched','candidate','bibliographic'];allowed.space=['earth','planetary','interstellar','galactic','cosmic','abstract','unknown'];allowed.yearStatus=['known','unknown'];allowed.genre=[...new Set(works.flatMap(w=>(w.source_subject||[]).flatMap(g=>[g.id,g.label])))];allowed.type=[...new Set(works.flatMap(w=>(w.source_types||[]).flatMap(t=>[t.id,t.label])))];allowed.language=[...new Set(works.flatMap(w=>w.languages||[languageOf(w)]))];allowed.form=[...new Set(works.flatMap(w=>w.forms||[w.form]))];allowed.audit=['missing','knowledge','crosschecked','conflict','identity','pending'];allowed.missing=['title','original_title','author','publication_date','original_language','language_statements','form','spatial','story_era','story_duration','temporal_reach','science','topics','issue','branches','relationships','external_identifiers'];
 const classificationIds=new Set(CLASSIFICATION_REGISTRY.categories.map(c=>c.id));
 if(state.classification){const ids=[...new Set(state.classification.split('|'))];state.classification=ids.every(id=>classificationIds.has(id))?ids.join('|'):'';}
 for(const key of Object.keys(allowed))if(state[key]&&!allowed[key].includes(state[key]))state[key]='';
 return state;
}
export function searchFromState(state,workId){
 const p=new URLSearchParams();
 for(const key of ['query','topic','branch','era','duration','science','language','form','level','space','yearStatus','genre','type','audit','missing','issueStatus','facet','classification'])if(state[key])p.set(key,state[key]);
 if(state.boundary)p.set('boundary','1');
 for(const key of ['yearMin','yearMax'])if(state[key]!=null)p.set(key,String(state[key]));
 if(state.sort!==DEFAULT_STATE.sort)p.set('sort',state.sort);
 if(state.layout!=='cards')p.set('layout',state.layout);
 if(state.page>1)p.set('page',String(state.page));
 if(workId)p.set('work',workId);
 return p.toString();
}
