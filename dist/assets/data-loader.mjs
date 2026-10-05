// Complete data is served from this immutable, published repository commit.
const DATASET_ORIGIN = "https://raw.githubusercontent.com/changkun/scifi-exploration/664bc4afed13e252125e95c18e0dc51078d27ce4/dist/";
function datasetURL(relative) {
 if(typeof relative !== 'string' || !/^\.\/assets\/[A-Za-z0-9_/-]+\.json$/.test(relative) || relative.includes('..')) throw new Error('Dataset path is invalid');
 return DATASET_ORIGIN + relative.slice(2);
}
export async function loadBibliographySource(fetcher=fetch) {
 const response=await fetcher(datasetURL('./assets/bibliography.json'));if(!response.ok)throw new Error('完整书目索引暂时无法载入');
 const data=await response.json();let records;
 if(data.format==='source-index-manifest-v1'){
  if(!Array.isArray(data.chunks)||new Set(data.chunks).size!==data.chunks.length)throw new Error('书目分片清单无效或重复');
  for(const chunk of data.chunks)if(typeof chunk!=='string'||!/^\.\/assets\/bibliography-index\/[A-Za-z0-9_-]+\.json$/.test(chunk))throw new Error('书目分片路径无效');
  records=(await Promise.all(data.chunks.map(async chunk=>{const r=await fetcher(datasetURL(chunk));if(!r.ok)throw new Error('书目分片未完整载入');const part=await r.json();if(!Array.isArray(part.records))throw new Error('书目分片结构无效');return part.records;}))).flat();
 }else{records=data.records;if(!Array.isArray(records))throw new Error('书目结构无效');}
 if(!Number.isSafeInteger(data.metadata?.record_count)||records.length!==data.metadata.record_count)throw new Error('书目数量与来源声明不一致');
 const ids=new Set();for(const record of records){if(!record||!/^Q[1-9]\d*$/.test(record.id)||ids.has(record.id))throw new Error('书目编号无效或重复');ids.add(record.id);}
 return {records,metadata:data.metadata};
}
const shardCache=new Map();
export async function loadCompletionSource(fetcher=fetch){
 const r=await fetcher(datasetURL('./assets/completion.json'));if(!r.ok)throw new Error('补全状态未载入');const manifest=await r.json();
 if(manifest.format!=='completion-manifest-v1'||!Array.isArray(manifest.chunks)||new Set(manifest.chunks).size!==manifest.chunks.length)throw new Error('补全清单无效');
 const records=(await Promise.all(manifest.chunks.map(async path=>{if(!/^\.\/assets\/completion-index\/\d{3}\.json$/.test(path))throw new Error('补全分片路径无效');const part=await fetcher(datasetURL(path));if(!part.ok)throw new Error('补全分片未完整载入');const data=await part.json();if(!Array.isArray(data.records))throw new Error('补全分片无效');return data.records;}))).flat();
 if(records.length!==manifest.metadata.record_count||new Set(records.map(r=>r.id)).size!==records.length)throw new Error('补全状态缺失或重复');
 return {records,metadata:manifest.metadata};
}
export async function loadLibraryDetail(work,fetcher=fetch){
 const path=work.library_detail_url;if(!path)return null;if(!/^\.\/assets\/library-details\/\d{3}\.json$/.test(path))throw new Error('外部详情路径无效');
 if(!shardCache.has(path))shardCache.set(path,(async()=>{const r=await fetcher(datasetURL(path));if(!r.ok)throw new Error('外部书目详情暂时无法载入');const data=await r.json();return new Map(data.records.map(r=>[r.id,r]));})().catch(e=>{shardCache.delete(path);throw e;}));
 const result=(await shardCache.get(path)).get(work.id);if(!result)throw new Error('外部书目对应记录缺失');return result;
}
export async function loadSourceDetail(work,fetcher=fetch) {
 const relative=work.source_index?.detail_url;if(!relative)return null;
 if(!/^\.\/assets\/bibliography-details\/\d{3}\.json$/.test(relative))throw new Error('详情分片路径无效');
 if(!shardCache.has(relative))shardCache.set(relative,(async()=>{const response=await fetcher(datasetURL(relative));if(!response.ok)throw new Error('来源详情暂时无法载入');const data=await response.json();if(!Array.isArray(data.records))throw new Error('详情分片结构无效');return new Map(data.records.map(record=>[record.id,record]));})().catch(error=>{shardCache.delete(relative);throw error;}));
 const record=(await shardCache.get(relative)).get(work.source_id);if(!record)throw new Error('完整来源记录未找到');return record;
}
