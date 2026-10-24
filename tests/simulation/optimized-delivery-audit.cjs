// Read-only audit of archived events. Does not run the game or rewrite results.
const fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const archive=path.join(__dirname,'phase15e-results.json.gz');
assert.equal(crypto.createHash('sha256').update(fs.readFileSync(archive)).digest('hex'),'fd9267609cb9af83c75c0310a08af7740c663ffd37423d46e34d34f08e154426');
const data=JSON.parse(zlib.gunzipSync(fs.readFileSync(archive)));
const rows=data.rows.filter(r=>r.strategy==='optimized');assert.equal(rows.length,10);
const summary=[];
for(const row of rows){
 const cities=new Map(),cargo=new Map(),usedSales=new Set();let rewards=0,premiums=0,previousSale=null;
 const start=row.events.find(e=>e.type==='travel').from;
 function lots(id,good){const key=String(id)+'/'+good;if(!cargo.has(key))cargo.set(key,[]);return cargo.get(key)}
 function consume(id,good,n,destination){let eligible=0;const list=lots(id,good);while(n>0){const l=list[0];assert(l,'cargo must come from recorded purchase');const used=Math.min(n,l.n);if(l.city!==destination)eligible+=used;l.n-=used;n-=used;if(l.n===0)list.shift()}return eligible}
 for(let index=0;index<row.events.length;index++){
  const e=row.events[index];
  if(e.type==='buy'){const city=cities.get(String(e.shipId))??start;lots(e.shipId,e.good).push({city,n:e.quantity})}
  if(e.type==='pirate_loss')consume(e.shipId,e.good,e.quantity,null);
  if(e.type==='travel')for(const ship of e.ships){assert.equal(cities.get(String(ship.id))??start,e.from);cities.set(String(ship.id),e.to)}
  if(e.type==='sell'){
   const city=cities.get(String(e.shipId))??start;
   previousSale={index,good:e.good,day:e.simDay,city,quantity:e.quantity,eligible:consume(e.shipId,e.good,e.quantity,city)};
  }
  if(e.type==='quest_reward'){
   assert(previousSale&&previousSale.index===index-1,'reward immediately follows sale');
   assert.equal(previousSale.good,e.good);assert.equal(previousSale.day,e.simDay);
   assert(previousSale.eligible>=e.quantity&&e.quantity>0&&e.reward>0,'foreign FIFO cargo covers delivery');
   assert(!usedSales.has(previousSale.index),'one reward per recorded sale');usedSales.add(previousSale.index);
   rewards++;premiums+=e.reward;
  }
 }
 assert.equal(rewards,row.deliveries.completed);assert.equal(premiums,row.deliveries.premiums);
 assert.equal(rewards,row.final.completed-row.initial.completed);
 summary.push({seed:row.seed,rewards,premiums,foreignOriginVerified:true,offerAndDeadlineArchived:false});
}
assert.equal(summary.reduce((a,r)=>a+r.rewards,0),90);assert.equal(summary.reduce((a,r)=>a+r.premiums,0),84010);
console.log(JSON.stringify({scope:'archived FIFO provenance and reward/sale pairing, no simulation',rows:summary,totals:{rewards:90,premiums:84010},limitation:'Offers, deadlines and quest IDs are absent from historical events; those cannot be independently reconstructed from this archive.'},null,2));
