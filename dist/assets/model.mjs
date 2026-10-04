export const ERA_BOUNDS = [
 {id:'before1800',label:'1800 年以前',min:0,max:1799},
 {id:'1800',label:'1800—1899',min:1800,max:1899},
 {id:'1900',label:'1900—1939',min:1900,max:1939},
 {id:'1940',label:'1940—1959',min:1940,max:1959},
 {id:'1960',label:'1960—1979',min:1960,max:1979},
 {id:'1980',label:'1980—1999',min:1980,max:1999},
 {id:'2000',label:'2000—2009',min:2000,max:2009},
 {id:'2010',label:'2010—2019',min:2010,max:2019},
 {id:'2020',label:'2020—2025',min:2020,max:2025}
];
export const DURATIONS=['日—月','年—一生','多代—百年','千年—文明史','百万年—宇宙尺度','多尺度或非线性','待核'];
export const SCIENCES=['近现实外推','依赖未证技术','强反事实设定','混合或不适用'];
export const DEFAULT_STATE={query:'',topic:'',branch:'',era:'',duration:'',science:'',language:'',form:'',boundary:false,sort:'oldest',layout:'cards',page:1};
export const languageOf=w=>w.language_tradition.split(/[·／]/)[0];
export function filterWorks(works,state){
 const query=state.query.trim().toLocaleLowerCase();
 const terms=query.split(/\s+/).filter(Boolean);
 const era=ERA_BOUNDS.find(e=>e.id===state.era);
 return works.filter(w=>{
  if(!state.boundary&&w.inclusion_status!=='科幻作品')return false;
  if(state.topic&&!w.topics.includes(state.topic))return false;
  if(state.branch&&!w.branches.includes(state.branch))return false;
  if(era&&((w.sort_year??w.first_year)<era.min||(w.sort_year??w.first_year)>era.max))return false;
  if(state.duration&&w.duration!==state.duration)return false;
  if(state.science&&w.science_class!==state.science)return false;
  if(state.language&&languageOf(w)!==state.language)return false;
  if(state.form&&w.form!==state.form)return false;
  const haystack=[w.title_zh,w.title_original,w.author,w.issue,w.story_era,w.reach,w.science_note,w.language_tradition,...w.topics,...w.branches].join(' ').toLocaleLowerCase();
  return terms.every(t=>haystack.includes(t));
 }).sort((a,b)=>state.sort==='title'?a.title_zh.localeCompare(b.title_zh,'zh-CN'):state.sort==='newest'?(b.sort_year??b.first_year)-(a.sort_year??a.first_year):(a.sort_year??a.first_year)-(b.sort_year??b.first_year));
}
export function stateFromURL(search,works){
 const params=new URLSearchParams(search),state={...DEFAULT_STATE};
 for(const key of ['query','topic','branch','era','duration','science','language','form'])if(params.has(key))state[key]=params.get(key);
 state.boundary=params.get('boundary')==='1';
 if(['oldest','newest','title'].includes(params.get('sort')))state.sort=params.get('sort');
 if(params.get('layout')==='table')state.layout='table';
 state.page=Math.max(1,Math.min(1000,Number.parseInt(params.get('page'),10)||1));
 const allowed={topic:[...new Set(works.flatMap(w=>w.topics))],branch:[...new Set(works.flatMap(w=>w.branches))],era:ERA_BOUNDS.map(e=>e.id),duration:DURATIONS,science:SCIENCES,language:[...new Set(works.map(languageOf))],form:[...new Set(works.map(w=>w.form))]};
 for(const key of Object.keys(allowed))if(state[key]&&!allowed[key].includes(state[key]))state[key]='';
 return state;
}
export function searchFromState(state,workId){
 const p=new URLSearchParams();
 for(const key of ['query','topic','branch','era','duration','science','language','form'])if(state[key])p.set(key,state[key]);
 if(state.boundary)p.set('boundary','1');
 if(state.sort!==DEFAULT_STATE.sort)p.set('sort',state.sort);
 if(state.layout!=='cards')p.set('layout',state.layout);
 if(state.page>1)p.set('page',String(state.page));
 if(workId)p.set('work',workId);
 return p.toString();
}
