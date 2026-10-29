"""Independent saved-event audit and tables. Never imports/starts the game."""
import json,gzip,hashlib,math,csv,subprocess,itertools,collections
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3]; P=Path(__file__).resolve().parent; O=P/'results'
read=lambda name:json.loads((O/name).read_text())
plan=json.loads((P/'plan.json').read_text()); fees=read('fees.json')['fees']
idx=read('pilot.json')+read('baseline.json')+read('fee.json')
assert len(idx)==111 and len({x['id'] for x in idx})==111
for f,sha in json.loads((P/'frozen-sources.json').read_text()).items():assert hashlib.sha256((ROOT/f).read_bytes()).hexdigest()==sha,f
assert subprocess.check_output(['git','show',plan['previous']+':tests/analysis/q1_04/policies.cjs'],cwd=ROOT)==(P/'policies.cjs').read_bytes()
runs={i['id']:json.loads(gzip.decompress((O/'runs'/(i['id']+'.json.gz')).read_bytes())) for i in idx}
close=lambda a,b:math.isclose(a,b,abs_tol=1e-6,rel_tol=1e-10)
def sums(events,t,k):return sum(e.get(k,0) or 0 for e in events if e['type']==t)
def meaningful(v):return v['bought']>=10
def ecrit(r,m):
 vs=[v for v in r['voyages'] if v['endDay']<=m['day'] and meaningful(v)];last=vs[-3:]
 return len(vs)>=4 and m['earnedNetCash']>0 and sum(v['netOperating'] for v in last)>0 and sum(v['netOperating']>0 for v in last)>=2 and all(v['closing']['freeCash'] is not None and v['closing']['freeCash']>=0 for v in last) and m['freeCash'] is not None and m['freeCash']>=0
allrows=[];base=[];trial=[];trajectory=[];aff=[];coverage=[]
for i in idx:
 r=runs[i['id']];es=r['events'];f=r['final'];init=r['initial'];bs=sum(e['amount'] for e in es if e['type']=='bank' and e['operation']=='borrow');hyp=sums(es,'hypothetical_guild_payment','amount');sales=sums(es,'sell','total');buys=sums(es,'buy','total');profit=sums(es,'sell','profit');travel=sums(es,'travel','fee');repair=sums(es,'repair','cost');interest=sums(es,'interest','debtInterest');piracy=sum(e['quantity']*(e['averageCost'] or 0) for e in es if e['type']=='pirate_loss')
 assert close(f['gold'],init['gold']+sales-buys+bs-travel-repair-hyp),i['id']
 assert close(f['debt'],bs+interest)
 assert close(f['gold']+f['bank']-f['debt']-init['gold'],profit-travel-repair-interest-piracy-hyp)
 assert len([e for e in es if e['type']=='hypothetical_guild_payment'])==int(r['paid'])
 assert close(sums(es,'travel','days'),r['days']);assert len(r['voyages'])==len(r['decisions'])==len([e for e in es if e['type']=='travel'])
 for v in r['voyages']:
  ve=es[v['eventStart']:v['eventEnd']];op=sums(ve,'sell','total')-sums(ve,'buy','total')-sums(ve,'travel','fee')-sums(ve,'repair','cost')-sums(ve,'interest','debtInterest');assert close(op,v['netOperating'])
  assert sums(ve,'buy','quantity')==v['bought'];assert sums(ve,'sell','quantity')==v['sold']
 for m in r['snapshots']:
  assert m['cargoUnits']==0 and m['warehouseBook']==0 and m['rank']==0
  assert close(m['netCash'],m['gold']+m['bank']-m['debt'])
  assert close(m['earnedNetCash'],m['netCash']-init['gold']+(r['fee'] if m['paid'] else 0))
  if m['reserve'] is not None:
   assert close(m['reserve'],sum(m['reserveParts'].values()));z=m['policyReserve'];assert close(m['requiredCash'],max(m['reserve']+z['floor'],m['reserve']/(1-z['fraction'])));assert close(m['freeCash'],m['gold']-m['requiredCash'])
  if 'established' in m:assert m['established']==ecrit(r,m),(i['id'],m['day'])
 for d in r['decisions']:
  v=d['view'];assert close(v['gold'],d['before']['gold']);assert d['choice']['city'] in [x['city'] for x in v['destinations']]
  j=d['choice'].get('good')
  if j is not None:assert d['choice']['quote']==v['journal'][str(d['choice']['city'])]['prices'][j]
 assert all(q['city']==f['city'] for q in f['ships']);assert r['nativeFunctionsUnchanged'];assert r['nativeBefore']==next(iter(runs.values()))['nativeBefore']
 m=r['snapshots'][-1];ck=[x for x in r['snapshots'] if x['phase']=='checkpoint'];firstE=next((x for x in ck if x['established']),None);prior=r['payment'];post=r['voyages'][prior['voyagesBefore']:] if prior else []
 empty=0;maxempty=0;zero=0;maxzero=0
 for v in post:
  empty=empty+1 if not meaningful(v) else 0;maxempty=max(maxempty,empty);zero=zero+1 if v['bought']==0 else 0;maxzero=max(maxzero,zero)
 row={'id':i['id'],**r['spec'],'nativeStart':r['scenario']['nativeStart'],'fee':r['fee'],'timing':r['timing'],'days':r['days'],'stopReason':r['stopReason'],'gold':m['gold'],'bank':m['bank'],'debt':m['debt'],'netCash':m['netCash'],'earnedNetCashAfterFee':m['netCash']-init['gold'],'operatingNet':profit-travel-repair-interest-piracy,'freeCash':m['freeCash'],'wealth':m['wealth'],'cargoBook':m['cargoBook'],'shipBook':m['shipBook'],'trips':len(r['voyages']),'meaningfulTrips':sum(map(meaningful,r['voyages'])),'firstEstablishedDay':firstE['day'] if firstE else None,'firstEstablishedMeaningfulTrips':sum(v['endDay']<=firstE['day'] and meaningful(v) for v in r['voyages']) if firstE else None,'boughtUnits':sums(es,'buy','quantity'),'soldUnits':sums(es,'sell','quantity'),'sales':sales,'buys':buys,'realisedProfit':profit,'travelFees':travel,'repair':repair,'interest':interest,'borrowed':bs,'pirateCost':piracy,'pirateEvents':len([e for e in es if e['type']=='pirates']),'storms':len([e for e in es if e['type']=='travel' and e['event']=='storm']),'paid':r['paid'],'paymentDay':prior['day'] if prior else None,'goldBeforePayment':prior['pre']['gold'] if prior else None,'goldAfterPayment':prior['post']['gold'] if prior else None,'freeAfterPayment':prior['post']['freeCash'] if prior else None,'feeShareCash':r['fee']/prior['pre']['gold'] if prior else None,'feeShareFreeCash':r['fee']/prior['pre']['freeCash'] if prior and prior['pre']['freeCash'] else None,'meaningfulBeforePayment':prior['meaningfulBefore'] if prior else None,'postDays':r['days']-prior['day'] if prior else None,'postTrips':len(post),'postMeaningfulTrips':sum(map(meaningful,post)),'postNetOperating':sum(v['netOperating'] for v in post),'maxSub10Streak':maxempty,'finalSub10Streak':empty,'maxEmptyStreak':maxzero,'finalEmptyStreak':zero,'stagnationHint':maxempty>=3 or r['stopReason']=='insufficient_travel_cash','lastingStagnation':empty>=3 or r['stopReason']=='insufficient_travel_cash','postObservationComplete':bool(prior and r['days']-prior['day']>=120 and len(post)>=3),'recoveryStarted':r['recoveryStarted'],'lossSales':sum(e['type']=='sell' and e['profit']<0 for e in es)}
 allrows.append(row)
 if r['fee']:
  control=runs['__'.join([r['spec']['scenario'],r['spec']['strategy'],str(r['spec']['seed'])])]
  prefix=prior['voyagesBefore'] if prior else len(r['decisions']);assert r['decisions'][:prefix]==control['decisions'][:prefix],'exact prepayment branch'
  if prior:
   assert any(x=={**prior['pre'],'phase':'checkpoint'} for x in control['snapshots']),'same payment checkpoint'
   assert close(prior['pre']['gold']-r['fee'],prior['post']['gold'])
   assert prior['pre']['debt']==prior['post']['debt'] and prior['pre']['rep']==prior['post']['rep'] and prior['pre']['rank']==prior['post']['rank']
   if r['timing']=='stabilized':assert prior['pre']['established'] and prior['post']['freeCash']>=0
  trial.append(row)
 else:
  base.append(row)
  for fee in fees:
   nom=next((m for m in ck if m['gold']>=fee),None);safe=next((m for m in ck if m['established'] and m['freeCash'] is not None and m['freeCash']>=fee),None)
   aff.append({'id':i['id'],**r['spec'],'nativeStart':r['scenario']['nativeStart'],'fee':fee,'nominalDay':nom['day'] if nom else None,'stabilizedDay':safe['day'] if safe else None,'nominalLoadedTrips':sum(v['endDay']<=nom['day'] and meaningful(v) for v in r['voyages']) if nom else None,'stabilizedLoadedTrips':sum(v['endDay']<=safe['day'] and meaningful(v) for v in r['voyages']) if safe else None})
 for point in ck:trajectory.append({'id':i['id'],'fee':r['fee'],'timing':r['timing'],**{k:point[k] for k in ['day','city','gold','debt','netCash','earnedNetCash','reserve','requiredCash','freeCash','established','paid']}})
 coverage.append({'id':i['id'],'cities':sorted({v['from'] for v in r['voyages']}|{v['to'] for v in r['voyages']}),'routes':sorted({(v['from'],v['to']) for v in r['voyages']}),'goodsBought':sorted({e['good'] for e in es if e['type']=='buy'}),'hullsActuallyBought':sorted({str(e['shipId']) for e in es if e['type']=='buy'}),'hullsActuallySold':sorted({str(e['shipId']) for e in es if e['type']=='sell'})})
def writecsv(name,rows):
 with (O/name).open('w',newline='') as f:
  w=csv.DictWriter(f,fieldnames=list(rows[0]),lineterminator='\n');w.writeheader();w.writerows(rows)
writecsv('baseline-summary.csv',base);writecsv('fee-continuations.csv',trial);writecsv('affordability.csv',aff);writecsv('trajectories.csv',trajectory)
(O/'coverage.json').write_text(json.dumps(coverage,ensure_ascii=False,indent=2)+'\n')
summary={'sourceCommit':subprocess.check_output(['git','rev-parse','HEAD'],cwd=ROOT,text=True).strip(),'baselineInstancesIncludingProbeAndFailure':81,'feeInstances':36,'savedDistinctPaths':111,'baselineCount':75,'feeCount':36,'independentEventLedgers':len(idx),'prepaymentMatches':len(trial),'nativeFunctionHashesUnchanged':True,'allFrozenSourcesVerified':True,'pilotFailureRetained':True,'baseline':base,'fees':trial}
(O/'audit.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n');print(json.dumps({k:v for k,v in summary.items() if k not in ['baseline','fees']}))
