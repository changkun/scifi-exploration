import {readFile} from 'node:fs/promises';
import {gunzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {resolve, sep} from 'node:path';
import {pathToFileURL} from 'node:url';

// Storage paths do not alter the historical canonical input_file identifier.
export const PROCESS_LOGICAL_PATH = 'research/issue-source-searches.json';
export const PROCESS_GZIP_PATH = PROCESS_LOGICAL_PATH + '.gz';
export const PROCESS_STORAGE_MANIFEST = 'research/issue-source-searches.storage.json';
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const missing = () => Object.assign(new Error('Complete process archive is missing'), {code:'ENOENT'});
async function optionalRead(file) {
 try {return await readFile(file);} catch(error) {if(error.code==='ENOENT')return null;throw error;}
}
function decode(plain, compressed, manifestBytes, {optional=false}={}) {
 if(plain===null && compressed===null) {
  if(manifestBytes!==null)throw new Error('Orphan process storage manifest: archive is missing');
  if(optional)return null;
  throw missing();
 }
 const rawBytes = compressed!==null ? gunzipSync(compressed) : plain;
 if(compressed!==null && plain!==null && !rawBytes.equals(plain))throw new Error('Conflicting process JSON and gzip bytes');
 const storagePath = compressed!==null ? PROCESS_GZIP_PATH : PROCESS_LOGICAL_PATH;
 const storageBytes = compressed!==null ? compressed : plain;
 const proof={logical_path:PROCESS_LOGICAL_PATH,storage_path:storagePath,codec:compressed!==null?'gzip':'identity',raw_bytes:rawBytes.length,raw_sha256:digest(rawBytes),storage_bytes:storageBytes.length,storage_sha256:digest(storageBytes)};
 if(compressed!==null && manifestBytes===null)throw new Error('Compressed process archive storage manifest is missing');
 if(manifestBytes!==null) {
  const manifest=JSON.parse(manifestBytes);
  if(manifest.format!=='lossless-json-storage-v1')throw new Error('Unknown process storage manifest');
  for(const [key,value] of Object.entries(proof))if(manifest[key]!==value)throw new Error('Process storage integrity mismatch: '+key);
 }
 const data=JSON.parse(rawBytes);
 if(!data || !Array.isArray(data.records))throw new Error('Invalid complete process archive');
 return {...proof,rawBytes,storageBytes,data};
}
export async function readProcessLog(root,{optional=false}={}) {
 const base=root instanceof URL ? root : pathToFileURL(resolve(root)+sep);
 const [plain,compressed,manifest]=await Promise.all([PROCESS_LOGICAL_PATH,PROCESS_GZIP_PATH,PROCESS_STORAGE_MANIFEST].map(path=>optionalRead(new URL(path,base))));
 return decode(plain,compressed,manifest,{optional});
}
export function readProcessLogGitSnapshot(repository,commit) {
 if(!/^[a-f0-9]{40}$/.test(commit))throw new Error('Use an exact process archive commit');
 const resolved=execFileSync('git',['rev-parse',`${commit}^{commit}`],{cwd:repository,encoding:'utf8'}).trim();
 if(resolved!==commit)throw new Error('Process archive commit mismatch');
 const read=path=>{
  try {execFileSync('git',['cat-file','-e',`${commit}:${path}`],{cwd:repository,stdio:['ignore','ignore','ignore']});}
  catch(error) {if(error.status===128)return null;throw error;}
  return execFileSync('git',['show',`${commit}:${path}`],{cwd:repository,maxBuffer:256*1024*1024});
 };
 return decode(read(PROCESS_LOGICAL_PATH),read(PROCESS_GZIP_PATH),read(PROCESS_STORAGE_MANIFEST));
}
