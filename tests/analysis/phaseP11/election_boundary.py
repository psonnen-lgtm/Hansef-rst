"""Single negative mathematical acceptance probe; no election/office code executed."""
import json,subprocess,sys
from pathlib import Path
from model import ledger,settle,civic_weights,votes
out=Path(sys.argv[1]);assert not out.exists()
root=Path(__file__).resolve().parents[3]
base={'merchant':[130,170,180,320],'supplier':[270,200,240,130],'host':[200,230,180,150],'player':[0,0,0,0]}
proof={'id':'pre-vote-sale','n':90,'foreign':90,'mode':'A','verified':True,'marketPrice':30,'price':30}
state=settle(ledger(day=359),359,{'player':{'buys':0,'sales':[proof],'donations':[],'donationAvailable':0}})
def score(day,state):
    actors={a:{'base':b,**civic_weights(a,day,state['claims'])} for a,b in base.items()}
    return votes([400,250,200,150],actors)
before=score(360,state);afterState=settle(state,361,{'player':{'buys':90}});after=score(361,afterState)
assert before['player']>max(before[a] for a in base if a!='player')
assert after['player']==0
financial={'initialGold':10000,'saleReceipt':2700,'rebuyCost':2700,'finalGold':10000,'initialOwnedQuantity':90,'finalOwnedQuantity':90,'initialMarketStock':20,'stockAtElection':110,'finalMarketStock':20,'actualPublicConsumptionProved':False}
evidence={'testedAnalysisCommit':subprocess.check_output(['git','rev-parse','HEAD'],cwd=root,text=True).strip(),'constructionOnly':True,'noCareerOrOfficeAssigned':True,'day360Votes':before,'day361VotesAfterRebuy':after,'financial':financial,'technicalExecutionPass':True,'protectionAcceptancePass':False,'finding':'revocation corrects current votes, but cannot retroactively remove a title already legitimately protected under grandfathering; simple availability alone does not prove final public consumption','decisionNeeded':'whether temporary genuine availability is sufficient on election day, or only irrevocably confirmed supply may affect the ballot; no automatic implementation','readyForProduction':False}
out.write_text(json.dumps(evidence,ensure_ascii=False,indent=2)+'\n');print(json.dumps(evidence,ensure_ascii=False))
