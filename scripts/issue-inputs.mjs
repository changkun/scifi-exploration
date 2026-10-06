import {readdir} from 'node:fs/promises';
// Each round remains an immutable input. Natural ordering retains earlier
// interpretations while allowing the next research round to fill gaps.
export async function listIssueInputs(root){
 const files=await readdir(new URL('research/',root));
 const periods=['before-1900','1900-1979','since-1980','source-reading'];
 return files.filter(f=>/^issues-(before-1900|1900-1979|since-1980|source-reading)(-round(?:[2-9]|[1-9]\d+))?\.json$/.test(f))
  .sort((a,b)=>{
   const round=f=>Number(f.match(/-round(\d+)\.json$/)?.[1]||1);
   const period=f=>periods.findIndex(p=>f.startsWith('issues-'+p));
   return round(a)-round(b)||period(a)-period(b);
  }).map(f=>'research/'+f);
}

// Spatial judgments have their own evidence-backed inputs. An issue label or
// a bibliographic genre never supplies a map position.
export async function listSpatialInputs(root){
 const files=await readdir(new URL('research/',root));
 return files.filter(f=>/^spatial-reading-round[1-9]\d*\.json$/.test(f))
  .sort((a,b)=>Number(a.match(/round(\d+)/)[1])-Number(b.match(/round(\d+)/)[1]))
  .map(f=>'research/'+f);
}

export async function listDimensionInputs(root){
 const files=await readdir(new URL('research/',root));
 return files.filter(f=>/^knowledge-dimensions-round[1-9]\d*\.json$/.test(f))
  .sort((a,b)=>Number(a.match(/round(\d+)/)[1])-Number(b.match(/round(\d+)/)[1]))
  .map(f=>'research/'+f);
}
