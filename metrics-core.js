'use strict';
function calculateShow(seasons, progress, options = {}) {
 const now = options.now ?? Date.now();
 const specials = options.specials ?? false;
 if(!Array.isArray(seasons)) throw new Error('Missing season metadata');
 if(progress && !Array.isArray(progress.seasons)) throw new Error('Missing watched episode progress');
 const watched = new Set();
 for(const season of progress?.seasons || []) {
  if(!specials && season.number === 0) continue;
  if(!Array.isArray(season.episodes)) throw new Error('Missing watched season progress');
  for(const ep of season.episodes) if(ep.plays > 0 || ep.completed === true) watched.add(season.number + ':' + ep.number);
 }
 const seen = new Set();
 const out = {watched:watched.size, aired:0, remaining:0, minutes:0, missingRuntime:0, unknownDate:0, future:0};
 for(const season of seasons) {
  if(!specials && season.number === 0) continue;
  if(!Array.isArray(season.episodes)) throw new Error('Episode metadata not included');
  for(const ep of season.episodes) {
   const key = season.number + ':' + ep.number;
   if(seen.has(key)) continue;
   seen.add(key);
   const date = ep.first_aired ? Date.parse(ep.first_aired) : NaN;
   if(!Number.isFinite(date)) {if(!watched.has(key))out.unknownDate++;continue;}
   if(date > now) {out.future++;continue;}
   out.aired++;
   if(watched.has(key)) continue;
   out.remaining++;
   if(typeof ep.runtime === 'number' && Number.isFinite(ep.runtime) && ep.runtime > 0) out.minutes += ep.runtime;
   else out.missingRuntime++;
  }
 }
 return out;
}

function nextUnwatchedEpisode(seasons, progress, options = {}) {
 const specials=options.specials??false;
 if(!Array.isArray(seasons))throw new Error('Missing season metadata');
 const watched=new Set();
 for(const season of progress?.seasons||[]){
  for(const ep of season.episodes||[])if(ep.plays>0||ep.completed===true)watched.add(season.number+':'+ep.number);
 }
 const candidates=[];
 for(const season of seasons){
  if(!specials&&season.number===0)continue;
  if(!Array.isArray(season.episodes))throw new Error('Episode metadata not included');
  for(const ep of season.episodes){
   if(!Number.isInteger(ep.number)||!Number.isInteger(season.number))continue;
   if(watched.has(season.number+':'+ep.number))continue;
   candidates.push({season:season.number,number:ep.number,title:ep.title||'Untitled episode',first_aired:ep.first_aired||null});
  }
 }
 candidates.sort((a,b)=>a.season-b.season||a.number-b.number);
 return candidates[0]||null;
}

if(typeof module !== 'undefined') module.exports = {calculateShow,nextUnwatchedEpisode};
else globalThis.TraktMetrics = {calculateShow,nextUnwatchedEpisode};
