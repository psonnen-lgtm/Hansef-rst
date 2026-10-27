"""Small political accounting specification, never imports/evaluates the game.
All inputs are constructed/previously verified receipts. No market simulation.
"""
from copy import deepcopy
from fractions import Fraction as F
MODES={'A':F(1),'B':F(3,2),'C':F(2)}
GROUPS=['households','crafts','seafaring','commerce']
SUPPLY=[F(1),F(1,2),F(1,2),F(1,4)]
GIVING=[F(1),F(1,2),F(1,4),F(1,2)]

def integer(x,low=0):
    if type(x) is not int or x<low:raise ValueError('integer domain')
    return x

def allocate(n,weights):
    integer(n);assert weights and all(type(w) is int and w>=0 for w in weights.values()) and sum(weights.values())>0
    keys=sorted(weights);total=sum(weights.values());a={k:n*weights[k]//total for k in keys}
    for k in sorted(keys,key=lambda k:(-(n*weights[k]%total),k))[:n-sum(a.values())]:a[k]+=1
    assert sum(a.values())==n
    return a

def certify(samples,base,day):
    """Two consecutive externally scheduled observations; prices corroborate only.
    Each observed debt sums persistent actor-specific net withdrawals, no yearly reset.
    """
    integer(base,1);integer(day)
    if len(samples)!=2 or samples[1]['day']-samples[0]['day']!=1:return None
    for s in samples:
        integer(s['stock']);integer(s['debt']);integer(s['price'],1)
        if s['stock']+s['debt']>40 or s.get('special',False):return None
    corrected=max(s['stock']+s['debt'] for s in samples)
    return {'id':'constructed-need:'+str(day),'day':day,'expires':day+90,'capacity':min(90,110-corrected),'remaining':min(90,110-corrected),
            'base':base,'claims':[],'debts':{},'seen':[],'lastDay':day-1,
            'scarcityObservation':deepcopy(samples),'priceCorroborates':samples[-1]['price']*4>=base*5}

def ledger(day=0,capacity=90):
    return {'id':'constructed-need:'+str(day),'day':day,'expires':day+90,'capacity':capacity,'remaining':capacity,
            'base':16,'claims':[],'debts':{},'seen':[],'lastDay':day-1}

def settle(previous,day,entries):
    """Pure day batch. Whole returned state replaces previous or nothing changes.
    Entries per actor: buys, sale receipts, donation receipts, reserved donation stock.
    No gold/stock effects are performed by this math specification.
    """
    x=deepcopy(previous);integer(day);assert day>x['lastDay']
    active=x['day']<=day<=x['expires'];offers={};repairs=0
    ids=set(x['seen'])
    for actor,e in sorted(entries.items()):
        integer(e.get('buys',0));integer(e.get('donationAvailable',0))
        for r in e.get('sales',[])+e.get('donations',[]):
            if r['id'] in ids:raise ValueError('duplicate receipt')
            ids.add(r['id']);integer(r['n'],1);integer(r['foreign']);assert r['foreign']<=r['n']
            assert r['verified'] is True
            if r['mode'] not in MODES:raise ValueError('mode')
            if r['mode']=='B' and not (4<=r['price']<=x['base'] and r['price']<r['marketPrice']):raise ValueError('no voluntary fair discount')
        assert all(r['mode'] in ['A','B'] for r in e.get('sales',[]))
        assert all(r['mode']=='C' for r in e.get('donations',[]))
        assert sum(r['n'] for r in e.get('donations',[]))<=e.get('donationAvailable',0),'no free donation stock'
    for actor,e in sorted(entries.items()):
        sales=sum(r['n'] for r in e.get('sales',[]));buys=e.get('buys',0);old=x['debts'].get(actor,0)
        net= sales-buys;withdraw=max(0,-net)
        # Undo own revocable supply at this same market/good, also years later.
        # Higher multiplier first, newest date next; fixed ordering independent of clicks.
        for c in sorted(x['claims'],key=lambda c:(-MODES[c['mode']],-c['day'],c['actor'])):
            if c['actor']!=actor or c['mode']=='C':continue
            used=min(withdraw,c['n']);c['n']-=used;withdraw-=used
            if active:x['remaining']=min(x['capacity'],x['remaining']+used)
        newDebt=max(0,old-net);x['debts'][actor]=newDebt
        repairs+=min(old,max(0,net))
        eligible=max(0,net-old)
        modeForeign={m:sum(r['foreign'] for r in e.get('sales',[]) if r['mode']==m) for m in ['A','B']}
        # One actor's simultaneous modes compete pro rata for its eligible net inflow.
        qualified=min(eligible,sum(modeForeign.values()))
        split=allocate(qualified,modeForeign) if qualified else {'A':0,'B':0}
        donated=sum(r['foreign'] for r in e.get('donations',[])) if newDebt==0 else 0
        offers[actor]={**split,'C':donated}
    if active:
        # Restoring one's own withdrawal improves availability but earns no new credit.
        x['remaining']=max(0,x['remaining']-repairs)
        totalByActor={a:sum(v.values()) for a,v in offers.items() if sum(v.values())}
        actual=allocate(min(x['remaining'],sum(totalByActor.values())),totalByActor) if totalByActor else {}
        for actor,n in actual.items():
            split=allocate(n,offers[actor]) if n else {}
            for mode,q in split.items():
                if q:x['claims'].append({'actor':actor,'mode':mode,'n':q,'day':day,'source':x['id']})
            x['remaining']-=n
    x['claims']=[c for c in x['claims'] if c['n']]
    x['lastDay']=day;x['seen']=sorted(ids)
    assert 0<=x['remaining']<=x['capacity']
    assert all(d>=0 for d in x['debts'].values())
    return x

def civic_weights(actor,day,claims,donations=(),festivals=(),services=()):
    units=[F(0) for _ in GROUPS];pop=[F(0) for _ in GROUPS];giving=[F(0) for _ in GROUPS]
    supplyCohorts={}
    for c in claims:
        if c['actor']!=actor or c['day']>day:continue
        m=MODES[c['mode']]*c['n']
        for g,f in enumerate(SUPPLY):units[g]+=m*f
        supplyCohorts[c['day']]=supplyCohorts.get(c['day'],F(0))+m
    for d,m in supplyCohorts.items():
        decay=max(F(0),F(60-(day-d),60));peak=120*m/(30+m)
        for g,f in enumerate(SUPPLY):pop[g]+=min(F(120),peak*decay)*f
    goldBuckets={}
    for d,gold in donations:
        if d>day:continue
        integer(gold,1)
        for g,f in enumerate(GIVING):units[g]+=F(gold,100)*f
        bucket=(d-1)//30*30+1;goldBuckets[bucket]=goldBuckets.get(bucket,0)+gold
    for d,gold in goldBuckets.items():
        decay=max(F(0),F(60-(day-d),60));peak=F(120*gold,300+gold)
        for g,f in enumerate(GIVING):giving[g]+=peak*decay*f
    # Each category separately capped before joint popularity cap.
    for g in range(4):pop[g]=min(F(120)*SUPPLY[g],pop[g])+min(F(120)*GIVING[g],giving[g])
    fest=[F(0) for _ in GROUPS]
    for d in festivals:
        if d>day:continue
        decay=max(F(0),F(90-(day-d),90))
        for g,f in enumerate([F(1),F(3,4),F(3,5),F(1,2)]):fest[g]+=180*decay*f
    for g in range(4):pop[g]=min(F(300),pop[g]+min(F(180),fest[g]))
    for d in services:
        if d<=day:
            for g,f in enumerate([F(1,2),F(1),F(1,2),F(3,2)]):units[g]+=20*f
    trust=[int(600*u/(100+u)) for u in units]
    return {'trust':trust,'popularity':[int(v) for v in pop],'units':[str(v) for v in units]}

def votes(groups,actors):
    rows={a:0 for a in actors};rows['undecided']=0
    for g,n in enumerate(groups):
        weights={a:x['base'][g]+x['trust'][g]+x['popularity'][g] for a,x in actors.items()};weights['undecided']=400
        for a,q in allocate(n,weights).items():rows[a]+=q
    assert sum(rows.values())==sum(groups)
    return rows
