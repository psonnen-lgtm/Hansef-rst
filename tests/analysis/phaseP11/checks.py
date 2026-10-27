"""Bounded synthetic receipt arithmetic. No game VM, markets or careers executed."""
import sys,json,hashlib,subprocess,re
from pathlib import Path
from copy import deepcopy
from itertools import permutations
from model import F,allocate,certify,ledger,settle,next_need,civic_weights,votes
ROOT=Path(__file__).resolve().parents[3];HERE=Path(__file__).resolve().parent
out=Path(sys.argv[1]);assert not out.exists(),'new output required'
checks=[]
def check(name,fn):
    try:checks.append({'name':name,'executed':True,'passed':True,'evidence':fn()});print('PASS '+name)
    except Exception as e:
        import traceback
        checks.append({'name':name,'executed':True,'passed':False,'error':traceback.format_exc()});print(traceback.format_exc())
def receipt(id,n,mode='A',foreign=None):
    return {'id':id,'n':n,'foreign':n if foreign is None else foreign,'mode':mode,'verified':True,'marketPrice':30,'price':16 if mode=='B' else 30 if mode=='A' else 0}
def entry(parts,mode='A',buys=0,foreign=None):
    receipts=[receipt('receipt-'+str(i),n,mode,foreign) for i,n in enumerate(parts)]
    return {'buys':buys,'sales':receipts if mode!='C' else [],'donations':receipts if mode=='C' else [],'donationAvailable':sum(parts) if mode=='C' else 0}
BASE={'merchant':[130,170,180,320],'supplier':[270,200,240,130],'host':[200,230,180,150],'player':[0,0,0,0]}
GROUPS=[400,250,200,150]
def standing(day,claims=(),donations=(),festivals=(),services=(),rivalActive=False):
    actors={}
    for actor,base in BASE.items():
        w=civic_weights(actor,day,claims,donations if actor=='player' else [(180,200)] if actor=='supplier' and rivalActive else [],festivals if actor=='player' else [300] if actor=='supplier' and rivalActive else [],services if actor=='player' else [240] if actor=='supplier' and rivalActive else [])
        actors[actor]={'base':base,**w}
    return {'actors':actors,'votes':votes(GROUPS,actors)}

check('finite whole-vote balance for multiple candidates',lambda:{'rows':[{'electors':e,'allocation':allocate(e,{'p':180,'r1':320,'r2':300,'u':200})} for e in [1,3,7,1000,5000,8000]]})
def scarcity():
    natural=[{'day':1,'stock':20,'debt':0,'price':30},{'day':2,'stock':20,'debt':0,'price':30}]
    n=certify(natural,16,2);assert n and n['capacity']==90
    own=[{'day':1,'stock':20,'debt':90,'price':30},{'day':2,'stock':20,'debt':90,'price':40}];assert certify(own,16,2) is None
    normal=[{'day':1,'stock':70,'debt':0,'price':100},{'day':2,'stock':70,'debt':0,'price':100}];assert certify(normal,16,2) is None
    cheap=[{**r,'price':4} for r in natural];assert certify(cheap,16,2)
    special=[{**r,'special':True} for r in natural];assert certify(special,16,2) is None
    return {'natural':n,'selfInducedRejected':own,'highPriceAloneRejected':True,'cheapRealStockShortageAccepted':True,'specialOverwriteExcluded':True,'noCounterfactualSimulation':True}
check('actual shortage observations versus own withdrawals and price-only signal',scarcity)
def splits():
    rows=[]
    for mode in ['A','B','C']:
        states=[]
        for parts in [[90],[10]*9,[1]*90]:
            state=settle(ledger(),1,{'player':entry(parts,mode)});w=civic_weights('player',1,state['claims']);states.append(w);rows.append({'mode':mode,'parts':len(parts),'accepted':sum(c['n'] for c in state['claims']),'remaining':state['remaining'],'weights':w})
        assert states[0]==states[1]==states[2]
    return {'rows':rows,'sameDayOnly':True,'no90ActionGamePath':True}
check('90 versus9x10 versus90x1 is identical for all three supply modes',splits)
def prices():
    rows=[]
    for mode,price in [('A',30),('B',16),('C',0)]:
        s=settle(ledger(),1,{'player':entry([90],mode)});w=civic_weights('player',1,s['claims']);v=standing(1,s['claims'])['votes']
        rows.append({'mode':mode,'quantity':90,'salePrice':price,'acquisitionCostPerUnit':8,'goldReceipts':price*90,'realizedFinancialResult':(price-8)*90,'householdTrust':w['trust'][0],'householdPopularity':w['popularity'][0],'votes':v,'units':w['units']})
    assert rows[0]['realizedFinancialResult']>rows[1]['realizedFinancialResult']>rows[2]['realizedFinancialResult']
    assert rows[0]['householdTrust']<rows[1]['householdTrust']<rows[2]['householdTrust']
    try:settle(ledger(),1,{'player':{**entry([90],'B'),'sales':[dict(receipt('bad',90,'B'),price=30)]}})
    except ValueError:pass
    else:raise AssertionError('fair label without a price concession')
    return {'rows':rows,'note':'C financial result is real goods cost, not a synthetic sale or cash debit'}
check('profitable normal delivery fair concession and irrevocable goods donation',prices)
def loops():
    rows=[]
    for mode in ['A','B']:
        same=settle(ledger(),1,{'player':entry([90],mode,buys=90)});assert not same['claims']
        sold=settle(ledger(),1,{'player':entry([90],mode)})
        bought=settle(sold,400,{'player':{'buys':90}});assert not bought['claims'];assert bought['debts']['player']==90
        restoration=entry([90],mode);restoration['sales'][0]['id']='new-restoration';repaid=settle(bought,401,{'player':restoration});assert not repaid['claims'];assert repaid['debts']['player']==0
        rows.append({'mode':mode,'sameDayMerit':0,'lateWithdrawalDay':400,'lateTrust':civic_weights('player',400,bought['claims'])['trust'],'debtAfterPurchase':90,'restorationNewMerit':0})
    donation=settle(ledger(),1,{'player':entry([90],'C')});late=settle(donation,400,{'player':{'buys':90}});assert sum(c['n'] for c in late['claims'])==90
    return {'rows':rows,'donatedUnitsRemainHistoricalMerit':90,'importantLimit':'election winner history is not revoked; a post-election withdrawal is a new subsequent civic action, not proof that the former date had the same available stock'}
check('buy sell and sale rebuy no new credit including long delayed withdrawal',loops)
def debt():
    state=ledger();state['debts']['player']=80
    restored=settle(state,1,{'player':entry([90])});assert sum(c['n'] for c in restored['claims'])==10
    own=ledger();own['debts']['player']=80
    donation=settle(own,1,{'player':entry([90],'C')});assert not donation['claims'];assert donation['debts']['player']==80
    local=settle(ledger(),1,{'player':entry([90],'A',foreign=0)});assert not local['claims']
    return {'previousWithdrawals':80,'grossReturn':90,'eligibleForeignExtra':10,'sameGoodDonationCannotEraseMarketDebt':True,'localOrUnknownOriginsNoSupplyMerit':True,'debtNoYearlyReset':True}
check('restore own removals first and do not manufacture rescue through gifts',debt)
def competition():
    inputs={'player':entry([60],'A'),'rival':{'buys':0,'sales':[receipt('rival-sale',60,'B')],'donations':[],'donationAvailable':0}}
    rows=[]
    for order in permutations(inputs):
        state=settle(ledger(),1,{k:inputs[k] for k in order});accepted={k:sum(c['n'] for c in state['claims'] if c['actor']==k) for k in inputs};rows.append(accepted)
        assert accepted=={'player':45,'rival':45} and state['remaining']==0
    baseline=ledger();state=settle(baseline,1,{'player':entry([90])})
    try:settle(state,2,{'player':entry([90])})
    except ValueError:pass
    else:raise AssertionError('duplicate source accepted')
    assert baseline==ledger()
    try:settle(ledger(),1,{'rival':{**entry([30],'C'),'donationAvailable':0}})
    except AssertionError:pass
    else:raise AssertionError('donation without physical goods')
    cash=2800;budget=1400;spend={'goods':240,'gift':200,'festival':800,'transport':60,'service':100};assert sum(spend.values())==budget and cash-budget>=0
    return {'orders':rows,'capacity':90,'totalClaimed':90,'duplicateRejected':True,'emptyCargoDonationRejected':True,'rivalPaidExample':spend,'annualSpend':1400,'cashAfter':1400,'noRivalMarketAIExecuted':True}
check('competition shared need order invariance no duplicates or free rival cargo',competition)
def decay():
    state=settle(ledger(),1,{'player':entry([90])});rows=[]
    for day in [1,30,61,180,360,361,720]:
        w=civic_weights('player',day,state['claims'],festivals=[1]);rows.append({'day':day,**w})
    assert len({tuple(w['trust']) for w in rows})==1
    assert rows[2]['popularity'][0]>0 and rows[3]['popularity']==[0]*4
    assert rows[4]['trust']==rows[5]['trust']==rows[6]['trust']
    return {'rows':rows,'noElectionOrYearReset':True,'historicalTrustRetainedUnlessOwnMarketWithdrawal':True}
check('year-round long trust and short enthusiasm decay independently',decay)
def gifts():
    rows=[]
    for donations in [[(15,200)],[(15,50)]*4,[(15,1)]*200]:
        w=civic_weights('player',30,[],donations=donations);rows.append(w)
    assert rows[0]==rows[1]==rows[2]
    regular=[(d,50) for d in range(15,360,30)]
    w=civic_weights('player',360,[],donations=regular);older=civic_weights('player',720,[],donations=regular)
    assert w['trust']==older['trust'] and older['popularity']==[0]*4
    huge=civic_weights('player',360,[],donations=[(345,10**9)]);assert huge['trust'][0]<600 and huge['popularity'][0]<=120
    return {'sameBucketSplit':rows[0],'annualGold':sum(g for _,g in regular),'day360':w,'day720NoNewGiving':older,'largeGoldStillBounded':huge}
check('repeated real donations split neutral and capped without annual reset',gifts)
def dates():
    claim=[]
    for day in range(1,91):claim.append({'actor':'player','mode':'A','n':1,'day':day})
    bulk=[{'actor':'player','mode':'A','n':90,'day':1}]
    a=civic_weights('player',90,claim);b=civic_weights('player',90,bulk);assert a['trust']==b['trust'];assert a['popularity']!=b['popularity']
    # Same genuine end state and day with different clicks was already checked above.
    return {'dailyVersusEarlyBulkDay90':{'daily':a,'bulk':b},'trustEqual':True,'popularityDifferentForRealDates':True,'notAnActionSplitExploit':True}
check('different real dates preserve long merit but may change current enthusiasm',dates)
def years():
    sharedRival=[{'actor':'supplier','mode':'A','n':30,'day':120}]
    scenarios=[('idle',[],[],[],[]),('reliable', [{'actor':'player','mode':'A','n':20,'day':d} for d in [30,100,170,240,310]],[],[],[180]),('giving',[],[(d,50) for d in range(15,360,30)],[],[]),('acute', [{'actor':'player','mode':'C','n':90,'day':300}],[],[],[]),('active-rival-and-engaged-player',[{'actor':'player','mode':'B','n':30,'day':d} for d in [60,180,300]],[(120,200)],[330],[240]),('year-vote-after-reliable-service',[{'actor':'player','mode':'A','n':20,'day':d} for d in [30,100,170,240,310]],[],[],[180])]
    rows=[]
    for name,claims,gold,fest,services in scenarios:
        checkpoints=[]
        for day in [30,90,180,270,360,361]:
            allClaims=claims+sharedRival;result=standing(day,allClaims,gold,fest,services,True);assert sum(result['votes'].values())==1000
            checkpoints.append({'day':day,'votes':result['votes'],'playerTrust':result['actors']['player']['trust'],'playerPopularity':result['actors']['player']['popularity']})
        final=checkpoints[-2]['votes'];cast=1000-final['undecided'];leader=max(BASE,key=lambda k:final[k]);assert cast==sum(final[k] for k in BASE)
        rows.append({'scenario':name,'checkpoints':checkpoints,'day360HighestVotes':leader,'cast':cast,'abstentions':final['undecided'],'officeAssigned':False,'notCareerSimulation':True})
    assert rows[0]['checkpoints'][-2]['votes']['player']==0
    return {'scenarios':rows,'note':'six fixed event-list examples; last case deliberately repeats the reliable endpoint as the annual arithmetic count, not a new economic run'}
check('six understandable annual event-list examples with active competitor',years)
def serialization():
    state=settle(ledger(),1,{'player':entry([45],'B')});saved=json.loads(json.dumps(state));a1=settle(state,2,{'player':{'buys':20}});a2=settle(saved,2,{'player':{'buys':20}});assert a1==a2
    assert civic_weights('player',360,a1['claims'])==civic_weights('player',360,a2['claims'])
    raw=(ROOT/'Hansefuerst_0_4.html').read_bytes();base='808d3a981093d99b3b57be94bc96184191398066';assert raw==subprocess.check_output(['git','show',base+':Hansefuerst_0_4.html'],cwd=ROOT)
    source=raw.decode();names=['regionalStock','regionalPrice','regionalMarketDay','trade','consumeOrigins','completePoliticalSupply','completeQuests','donate','donationGain','advance','politicsClock']
    inventory={n:next(i for i,l in enumerate(source.splitlines(),1) if re.match('function '+n+r'\(',l)) for n in names}
    prior={}
    for p in sorted((ROOT/'docs/entwicklungsberichte').glob('2026-10-27_P1_*.md')):
        old=subprocess.check_output(['git','show',base+':'+str(p.relative_to(ROOT))],cwd=ROOT);assert old==p.read_bytes();prior[str(p.relative_to(ROOT))]=hashlib.sha256(old).hexdigest()
    assert len(prior)==5
    return {'constructedJSONRoundTrip':True,'gameHash':hashlib.sha256(raw).hexdigest(),'sourceFunctions':inventory,'priorReportsUnchanged':prior,'noGameCodeEvaluated':True,'noRNGUsed':True,'notAProductSaveMigration':True}
check('reproducible constructed state export and read-only source preservation',serialization)

def lifetime():
    old=settle(ledger(),1,{'player':entry([30],'B')})
    recovery=[{'day':100,'stock':100,'debt':0},{'day':101,'stock':100,'debt':0}]
    scarce=[{'day':149,'stock':20,'debt':0,'price':30},{'day':150,'stock':20,'debt':0,'price':30}]
    new=next_need(old,scarce,recovery,16,150);assert new and new['claims']==old['claims'] and new['seen']==old['seen']
    e=entry([40]);e['sales'][0]['id']='new-episode-sale';new=settle(new,151,{'player':e});assert new['remaining']==50
    after=settle(new,152,{'player':{'buys':10}})
    # The higher valued old B claim is revoked first; no extra space in new certificate.
    assert after['remaining']==50
    assert sum(c['n'] for c in after['claims'] if c['source']==after['id'])+after['remaining']==90
    assert after['debts']['player']==10
    assert next_need(old,scarce,[],16,150) is None
    assert next_need(old,[{'day':50,'stock':20,'debt':0,'price':30},{'day':51,'stock':20,'debt':0,'price':30}],recovery,16,51) is None
    blocked=deepcopy(old);blocked['debts']['player']=90
    own=[{'day':149,'stock':20,'debt':90,'price':30},{'day':150,'stock':20,'debt':90,'price':30}]
    assert next_need(blocked,own,recovery,16,150) is None
    return {'oldClaimsPreserved':True,'oldReceiptsPreserved':True,'oldRevocationDoesNotRefillNewNeed':True,'newNeedCapacity':90,'currentAllocated':40,'currentRemainingAfterOldRevocation':50,'debtAfterWithdrawal':10,'noResetThroughNewEpisode':True,'recoveryAndExpiryRequired':True}
check('new shortage episode preserves lifetime debts and old receipts without extra capacity',lifetime)

result={'phase':'P1.1','base':'808d3a981093d99b3b57be94bc96184191398066','testedAnalysisCommit':subprocess.check_output(['git','rev-parse','HEAD'],cwd=ROOT,text=True).strip(),'productCodeCommit':'c42c25cf5cf372c210b47f25b00b9f0106044ed3','scope':'small synthetic receipt mathematics only','checks':checks,'notExecuted':['HTML game','economic simulation','mayor or elder career','productive migration','browser integration'],'readyForProduction':False}
out.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print(json.dumps({'groups':len(checks),'failures':sum(not c['passed'] for c in checks),'noGameExecution':True}));sys.exit(1 if any(not c['passed'] for c in checks) else 0)
