"""Read-only historical audit and labelled arithmetic models; never imports/starts a game engine.
Run from any directory: python <this-file> <new-output.json>. Output is never overwritten.
"""
from pathlib import Path
import sys, json, gzip, hashlib, statistics, collections, subprocess, re
ROOT=Path(__file__).resolve().parents[2]
BASE='e082e54e1aa76963323e712d4864bebe2e3859c3'
sha=lambda b:hashlib.sha256(b).hexdigest()
inputs={}
def read(name):
 p=ROOT/name;b=p.read_bytes();inputs[name]=sha(b)
 return json.loads(gzip.decompress(b) if name.endswith('.gz') else b)
def manifest(name):
 b=(ROOT/name).read_bytes();inputs[name]=sha(b)
 return {line.split('  ',1)[1]:line.split('  ',1)[0] for line in b.decode().splitlines() if '  ' in line}
def static_function(html,name):
 # Project source uses single-line bodies or an unindented outer closing brace.
 lines=html.splitlines();start=next(i for i,s in enumerate(lines) if s.startswith('function '+name+'('));s=lines[start]
 if s.endswith('}'):return s
 end=next(i for i in range(start+1,len(lines)) if lines[i]=='}')
 return '\n'.join(lines[start:end+1])
current=(ROOT/'Hansefuerst_0_4.html').read_text();prior=subprocess.check_output(['git','show','a826d9d531efc1ea148a1aa2d38657e1f8a45e7d:Hansefuerst_0_4.html'],cwd=ROOT).decode()
function_names=['trade','regionalPrice','regionalStock','regionalMarketDay','initialMarkets','creditLimit','netWorth','shipSaleValue','shipbuildingQuote','startShipbuilding','repairShip','armShip','rollTravel','arrive','takeBath','observe','bookView','regionalReport','warehouseTransfer','warehouseRentDay','politicalSupport','runMayorElection','runHanseAssembly']
functions={n:{'byteExactTo08c0':static_function(current,n)==static_function(prior,n),'sha256':sha(static_function(current,n).encode())} for n in function_names}
# These are rules and sources, not recently changed market/map/politics display functions.
assert all(v['byteExactTo08c0'] for v in functions.values())
earlier=read('docs/entwicklungsberichte/2026-10-27_0.8c0_nachweise.json')
for n,v in earlier['functions'].items():
 if n in functions:assert functions[n]['sha256']==v['currentSHA256'],n
summary=read('tests/simulation/phase05h3-20261025-01/summary.json.gz');checksums=manifest('tests/simulation/phase05h3-20261025-01/SHA256SUMS');groups={};verified=[]
for strategy in ['cautious','normal','aggressive','optimized','remote','explorer']:
 rows=[];profit=fees=pirate=days=trips=units=premiums=0;bygood=collections.defaultdict(lambda:dict(sold=0,profit=0));cashchecks=0
 for seed in range(10001,10013):
  name=f'tests/simulation/phase05h3-20261025-01/regional-{strategy}-{seed}.json.gz';x=read(name);assert inputs[name]==checksums[name];verified.append(name);row=x['row'];assert x['status']=='ok' and x['task']==dict(model='regional',strategy=strategy,seed=seed)
  e=row['events'];p=sum((v.get('profit') or 0) for v in e if v['type']=='sell');f=sum(v.get('fee',0) for v in e if v['type']=='travel');l=sum(v['quantity']*(v.get('averageCost') or 0) for v in e if v['type']=='pirate_loss');u=sum(v['quantity'] for v in e if v['type']=='sell');t=sum(v['type']=='travel' for v in e)
  assert p==row['trading']['realisedTradeProfit'];assert f==row['costs']['harborFees'];assert l==row['trading']['cargoLossCost'];assert u==row['trading']['soldUnits'];assert t==row['trading']['journeys'];rewards=sum(v['reward'] for v in e if v['type']=='quest_reward');assert rewards==row['deliveries']['premiums'];premiums+=rewards
  # These six historical trade policies make no optional financial/build/repair/info transactions.
  assert not any(row['costs'][k] for k in ['repairs','arms','shipPurchases','rumors','donations']);assert not any(row['finance'].values())
  assert row['final']['gold']==row['initial']['gold']+row['trading']['salesRevenue']-row['trading']['purchaseCost']-f+rewards;cashchecks+=1
  for v in e:
   if v['type']=='sell':bygood[v['good']]['sold']+=v['quantity'];bygood[v['good']]['profit']+=v.get('profit') or 0
  rows.append(row);profit+=p;fees+=f;pirate+=l;days+=row['days'];trips+=t;units+=u
 group={'cases':12,'daysMin':min(r['days'] for r in rows),'daysMax':max(r['days'] for r in rows),'wealthMedian':statistics.median(r['final']['wealth'] for r in rows),'cashMedian':statistics.median(r['final']['gold'] for r in rows),'tradeProfit':profit,'questPremiumsSeparately':premiums,'fees':fees,'pirateBookCost':pirate,'journeys':trips,'soldUnits':units,'netPerDay':(profit-fees-pirate)/days,'netPerJourney':(profit-fees-pirate)/trips,'grossRealisedProfitPerSoldUnit':profit/units,'feeAndPirateFraction':(fees+pirate)/profit,'blocked':sum(r['stopping']['economicTravelBlocked'] for r in rows),'nonpositiveWealth':sum(r['final']['wealth']<=0 for r in rows),'cashLedgersVerified':cashchecks,'byGood':dict(bygood)}
 assert group['wealthMedian']==summary['groups']['regional/'+strategy]['wealth']['median'];assert abs(group['netPerDay']-summary['groups']['regional/'+strategy]['netPerDay'])<1e-9;groups[strategy]=group
probe_name='tests/simulation/phase05h3-20261025-01/choice-probes.json.gz';probe=read(probe_name);assert inputs[probe_name]==checksums[probe_name];routes=[]
for route in sorted({r['route'] for r in probe['rows']}):
 for size in [22,90]:
  rows=[r for r in probe['rows'] if r['model']=='R1' and r['route']==route and r['requested']==size];assert len(rows)==3;trips=[t for r in rows for t in r['trips']];assert len(trips)==48
  net=sum(t['net'] for t in trips);n=sum(t['n'] for t in trips);days=sum(t['days'] for t in trips)
  routes.append(dict(route=route,requested=size,cases=3,trips=48,actualBoughtUnits=n,days=days,net=net,netPerTrip=net/48,netPerDay=net/days,netPerActualBoughtUnit=net/n,negative=sum(t['net']<0 for t in trips)))
# Same F market, same seeds, different free-information/decision policy. Not a paid-information experiment.
fsummary=read('tests/simulation/phase05h2-20261025-01/summary.json.gz');info_manifest=manifest('tests/simulation/phase05h2-20261025-01/SHA256SUMS');assert inputs['tests/simulation/phase05h2-20261025-01/summary.json.gz']==info_manifest['tests/simulation/phase05h2-20261025-01/summary.json.gz'];info_comparison={}
for strategy in ['cautious','normal','aggressive','explorer']:
 item={}
 for market in ['F','F_info']:
  g=fsummary['groups'][market+'/'+strategy];item[market]={k:g[k] for k in ['results','wealth','netPerDay','blocked','insolvent']}
 info_comparison[strategy]=item
# Direct archived V11 endpoints; all 110 main cases, no regeneration of their careers.
manifest6=manifest('tests/simulation/phase06c-20261025-01/SHA256SUMS');career={}
for arms in ['normal','early-arms']:
 rows=[]
 for city in range(11):
  for policy in ['balanced','early','remote','wealth','services']:
   name=f'tests/simulation/phase06c-20261025-01/main/{city}-{policy}-{arms}-93002.json.gz'
   if not (ROOT/name).exists():continue
   x=read(name);assert inputs[name]==manifest6[name];verified.append(name);rows.append(x['row'])
 # Discover exact stored policy names if the frozen catalog used longer identifiers.
 if len(rows)!=55:
  rows=[]
  for p in sorted((ROOT/'tests/simulation/phase06c-20261025-01/main').glob(f'*-{arms}-93002.json.gz')):
   name=str(p.relative_to(ROOT));x=read(name);assert inputs[name]==manifest6[name]
   if name not in verified:verified.append(name)
   rows.append(x['row'])
 assert len(rows)==55
 career[arms]=dict(cases=55,wealthMedian=statistics.median(r['wealth'] for r in rows),goldMedian=statistics.median(r['gold'] for r in rows),mayors=sum(r['mayorDay'] is not None for r in rows),eldermen=sum(r['eldDay'] is not None for r in rows),mayorDayMedian=statistics.median(r['mayorDay'] for r in rows if r['mayorDay'] is not None),elderDayMedian=statistics.median(r['eldDay'] for r in rows if r['eldDay'] is not None))
# Deterministic arithmetic only. Fictional prices/lambda, no route or market is advanced.
quantity=[dict(quantity=n,flatGross=10*n,impactGross=10*n-.05*n*(n-1),fee=6,flatAfterFee=10*n-6,impactAfterFee=10*n-.05*n*(n-1)-6) for n in [10,45,90,140]]
# A potential demonstrates algebraic split/roundtrip safety, not a shipped implementation.
potential=lambda stock:20000*stock-25*stock*stock # integer milli-gold example
whole=lambda stock:round(potential(stock)/1000)
assert whole(110)-whole(20)==sum(whole(i)-whole(i-1) for i in range(21,111))
assert (whole(110)-whole(20))+(whole(20)-whole(110))==0
information=[dict(quantity=n,incrementalMarginPerUnit=d,fee=fee,grossDecisionBenefit=n*d,netDecisionBenefit=n*d-fee,coverageFractionForBreakEven=fee/(n*d)) for n,d in [(8,2),(45,4),(90,4)] for fee in [20,60]]
capacity=[dict(type=typ,materials=materials,total=sum(materials),maxOrderBaseCapacity30=30,extraNeeded=max(0,sum(materials)-30),currentBuildWage=wage,currentBuildDays=days) for typ,materials,wage,days in [('Schnigge',[24,8,6,6],2500,20),('Kogge',[44,14,12,12],3700,35),('Holk',[75,24,20,22],6200,55)]]
input_details=read('tests/simulation/phase05j-20261025-01/economy-details.json')
result=dict(phase='0.8d.0',baseCommit=BASE,gameCommit='4570c8a4d0bcefb3a739b0955544887d127af1e4',gameSHA256=sha(current.encode()),scope='read-only archived events, static source comparisons, fictional arithmetic models; no engine import/execution/tests/deployment',functions=functions,verifiedRawFiles=len(verified),verifiedInputFileNames=verified,historicalRegionalGroups=groups,historicalR1RouteProbes=routes,historicalFreeInformationComparison=info_comparison,historicalV11Main=career,historicalBuildCostsTakenFromEarlierAudit=earlier['historicalActualBuildCosts'],historicalBuildAuditLedgerCount=input_details['cashLedgersVerified'],analyticModels=dict(label='fictional uncalibrated deterministic arithmetic, no simulations',quantityPrice20To30Lambda005=quantity,integerPotentialSplitAndRoundtripIdentity=True,informationValueSensitivity=information,warehouse30ShipbuildingCapacity=capacity,unarmedSoloPirateLossProbability=.13*(1-.39),fullyArmedSoloPirateLossProbability=.13*(1-.94),singleShipExpectedStormRepairAtFullCondition=.14*6.5*8,fullArmingCost=550+1100+1650,threeArmingCapacityCost=30),inputSHA256=inputs)
out=Path(sys.argv[1]);out.open('x').write(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print('Read-only audit:',len(verified),'archived files verified; 23 unchanged source functions; no engine started. Output:',out)
