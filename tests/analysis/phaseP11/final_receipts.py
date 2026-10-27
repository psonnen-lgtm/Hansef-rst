"""Small conservation proof for proposed final public acceptance, not a game engine.
Existing market plus one finite public-need counter. No second market/pricing model.
"""
import json,sys,subprocess
from pathlib import Path
from model import civic_weights
out=Path(sys.argv[1]);assert not out.exists()
root=Path(__file__).resolve().parents[3]
def acceptance(mode,n,foreign,available,stock,need,debt,price=30,base=16,buys=0):
    assert mode in ['A','B','C'] and 0<=foreign<=n<=available and 0<=buys<=stock
    net=n-buys if mode!='C' else 0
    debtAfter=max(0,debt-net)
    eligible=min(foreign,max(0,net-debt)) if mode!='C' else foreign if debtAfter==0 and buys==0 else 0
    public=min(need,eligible)
    if mode=='C':
        # Only actually accepted donation units leave reserved cargo.
        cargoAfter=available-public;marketAfter=stock-buys;gold=0;donated=public
    else:
        cargoAfter=available-n+buys;marketAfter=stock+n-buys-public
        salePrice=price if mode=='A' else max(4,min(base,price-1));assert mode=='A' or salePrice<price
        gold=n*salePrice-buys*price;donated=0
    assert available+stock==cargoAfter+marketAfter+public
    return {'mode':mode,'sold':n if mode!='C' else 0,'publicAccepted':public,'needRemaining':need-public,'debtAfter':debtAfter,'cargoAfter':cargoAfter,'marketAfter':marketAfter,'goldDelta':gold,'actualDonation':donated,'totalGoodsConservedIncludingConsumption':True}
rows=[]
for mode in ['A','B','C']:
    x=acceptance(mode,90,90,90,20,90,0);assert x['publicAccepted']==90 and x['marketAfter']==20
    x['marketRebuy90Possible']=x['marketAfter']>=90;assert not x['marketRebuy90Possible']
    # Even buying all20 remaining goods cannot recover consumed90.
    assert x['cargoAfter']+min(20,x['marketAfter'])<90
    rows.append(x)
# Own removal then restitution: only actual extra foreign supply is accepted.
x=acceptance('A',90,90,90,0,90,20);assert x['publicAccepted']==70 and x['debtAfter']==0 and x['marketAfter']==20 and x['needRemaining']==20;rows.append(x)
# Buy then sell the same20 from the town is not help, not consumption, no credit.
x=acceptance('A',20,0,20,20,90,0,buys=20);assert x['publicAccepted']==0 and x['marketAfter']==20 and x['goldDelta']==0;rows.append(x)
# Shared limited need is debited exactly once when final goods are accepted.
x=acceptance('A',60,60,60,20,90,0);y=acceptance('C',60,60,60,x['marketAfter'],x['needRemaining'],0)
assert x['publicAccepted']+y['publicAccepted']==90 and y['needRemaining']==0;rows.append({'competition':{'first':x,'second':y},'note':'first binding reservation changes resource assignment legitimately; both actors use same rules, no batch-order invariance promised here'})
evidence={'testedAnalysisCommit':subprocess.check_output(['git','rev-parse','HEAD'],cwd=root,text=True).strip(),'kind':'proposed final-acceptance quantity proof only','cases':rows,'passedCases':len(rows),'scope':'no game HTML, careers, markets or productive save implementation','recommendation':'only final irreversibly accepted need units should create durable ballot-relevant supply credit; no reward for provisional freely reversible stock availability','requiresOwnerDecision':['real public goods consumption','joint stock/reservation/gold/credit commit','ordinary market supply stock differs by consumed quantity','chronic-needs renewal cadence'],'readyForProduction':False}
out.write_text(json.dumps(evidence,ensure_ascii=False,indent=2)+'\n');print(json.dumps(evidence,ensure_ascii=False))
