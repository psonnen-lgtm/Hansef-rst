// Archived endpoints are read only. Derived snapshots are synthetic QA states, not new careers.
const fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib');
const standard='phase06b-20261025-01/main/60-45000-0-balanced-91001.json.gz',historical='phase06b-20261025-01/pilot/30-85000-0-balanced-90001.json.gz';
const copy=x=>JSON.parse(JSON.stringify(x)),read=file=>JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(__dirname,file)))).row.final;
function state(kind='candidate',legacy=false){
 const x=copy(read(legacy?historical:standard)),p=x.politics;
 if(kind==='elder')return x;
 x.rank=3;p.elderman=null;
 if(kind==='ready')return x;
 if(kind==='office'||kind==='proved'){
  p.terms=p.terms.map(()=>null);p.office={city:0,start:p.appointments[0].day,until:p.appointments[0].day+360,firstReceipt:6};p.records=p.records.slice(0,kind==='proved'?10:6);p.endorsements=p.endorsements.map(()=>null);return x;
 }
 x.rank=2;p.records=p.records.filter(r=>r.city===0&&r.kind!=='league').slice(0,6);p.office=null;p.terms=p.terms.map(()=>null);p.appointments=p.appointments.map(()=>null);p.endorsements=p.endorsements.map(()=>null);p.nextElection=p.nextElection.map(()=>0);return x;
}
module.exports={state,read,standard,historical};
