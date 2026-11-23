/* Nord: pure date, numeric and scheduling helpers; no DOM or network. */
window.NordCore=(()=>{
  'use strict';
  const MS_DAY=86400000,TIMEZONE='Europe/Amsterdam';
  const iso = dt => new Date(dt).toISOString().slice(0,10);
  function dateAtHome(){ const parts = new Intl.DateTimeFormat('en-CA',{timeZone:TIMEZONE,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const map=Object.fromEntries(parts.map(p=>[p.type,p.value]));return `${map.year}-${map.month}-${map.day}`; }
  const addDays=(day,n)=>iso(Date.parse(day+'T12:00:00Z') + n*MS_DAY);
  const labelDate=(day,opts={weekday:'short',day:'numeric',month:'short'})=>new Intl.DateTimeFormat('nl-NL',{timeZone:'UTC',...opts}).format(new Date(day+'T12:00:00Z'));
  const n = x => x===null||x===undefined||(typeof x==='string'&&!x.trim())?null:Number.isFinite(Number(x))?Number(x):null;

  function prioritise(items,id){
    return [...items.filter(d=>d.id===id),...items.filter(d=>d.id!==id)];
  }
  function uniqueBy(items,key){
    const seen=new Set();
    return items.filter(item=>{const k=key(item);if(seen.has(k))return false;seen.add(k);return true;});
  }
  function groupBy(items,key){
    const groups=new Map();
    for(const item of items){const k=key(item);if(!groups.has(k))groups.set(k,[]);groups.get(k).push(item);}
    return [...groups.values()];
  }
  return Object.freeze({MS_DAY,dateAtHome,addDays,labelDate,n,prioritise,uniqueBy,groupBy});
})();
