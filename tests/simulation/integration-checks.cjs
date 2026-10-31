// Negative tests for information leakage and the strategy registry; no additional statistical seeds.
const assert=require('node:assert/strict'),{registry,setup,sources}=require('./integrated.cjs'),{create}=require('./headless.cjs');
const g=create(10001);for(const src of Object.values(sources))g.load(src);g.load(setup);
assert.deepEqual(registry.map(p=>p.id),['cautious','normal','aggressive','optimized','delivery','recovery5','recovery10','recovery20','recovery30']);
const view=g.eval(`({gold:s.gold,day:totalDay(),space:capacity()-load(),local:s.markets[s.city].map(m=>({price:m.price,stock:m.stock})),journal:Object.fromEntries(Object.entries(s.journal).map(([c,e])=>[c,{day:e.year*360+e.day,prices:[...e.prices]}])),destinations:[{city:1,days:2,fee:6}]})`);
const serialized=JSON.stringify(view);
assert.doesNotThrow(()=>g.eval(`planObserved('normal',${serialized})`));
assert.throws(()=>g.eval(`const fake=${serialized};fake.journal[1]={day:totalDay(),prices:GOODS.map(()=>999)};planObserved('normal',fake)`),/invented\/future quote/);
assert.throws(()=>g.eval(`const fakeLocal=${serialized};fakeLocal.local[0].price=1;planObserved('normal',fakeLocal)`),/nonlocal snapshot/);
// A future regression adding a global market read to a restricted planner is caught at runtime.
assert.throws(()=>g.eval(`__planning=true;try{s.markets[1][0].price}finally{__planning=false}`),/hidden market access/);
assert.throws(()=>g.eval(`assessDelivery({source:0,destination:1,quantity:1,reward:1,until:999})`),/invalid delivery observation/);
// Full-information optimization remains a distinct, explicitly authorized regime.
assert(registry.find(p=>p.id==='optimized').information.includes('all_markets_oracle'));
for(const p of registry.filter(p=>p.family==='recovery'))assert(p.information.includes('recovery: local_and_journal'));
console.log('PASS registry, real observation snapshots, rejection of invented quotes/local prices, remote-read fence, delivery quote provenance, oracle labels');
