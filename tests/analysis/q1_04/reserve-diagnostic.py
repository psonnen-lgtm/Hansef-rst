"""Post-hoc arithmetic diagnostic of an observed reserve failure. No simulations."""
from pathlib import Path
import json,sys
d=Path(__file__).parent/'results';out=d/'reserve-diagnostic.json';assert not out.exists()
pilot=json.loads((d/'pilot.json').read_text());base=json.loads((d/'baseline.json').read_text());fee=json.loads((d/'fee.json').read_text());selection=json.loads((d/'fees.json').read_text())
def reserve(strategy,s,after_fee,recovery):
 if strategy=='poor_then_normal': strategy='poor' if recovery is not None and s['day']<recovery else 'normal'
 fraction,floor={'cautious':(.55,800),'normal':(.25,300),'aggressive':(.05,40),'optimized_observed':(.15,300),'poor':(0,100)}[strategy]
 return max(floor,fraction*after_fee)
diagnostics=[]
for r in fee['rows']:
 s=next(s for s in r['snapshots'] if s['paid']);extra=reserve(r['strategy'],s,s['gold'],r['recoveryStarted']);needed=s['reserve']+extra
 diagnostics.append({'strategy':r['strategy'],'fee':r['fee'],'paymentDay':r['paymentDay'],'cashAfterPayment':s['gold'],'originalReserve':s['reserve'],'additionalStrategyBuffer':extra,'combinedReserve':needed,'combinedReserveCovered':s['gold']>=needed,'observedNotPredictiveValidation':True})
availability=[]
for amount in selection['candidates']:
 for r in pilot['rows']+base['rows']:
  first=next((s for s in r['snapshots'] if s['reserve'] is not None and s['gold']-amount>=s['reserve']+reserve(r['strategy'],s,s['gold']-amount,r['recoveryStarted'])),None)
  availability.append({'strategy':r['strategy'],'seed':r['seed'],'fee':amount,'firstCombinedProxyDay':first['day'] if first else None})
x={'phase':'Q1.04','readOnly':True,'newDynamicRuns':0,'postHoc':True,'notUsedForFeeSelectionOrRerunningPaths':True,'reason':'initial basket/fee/repair/debt proxy did not include operational cash retained by chosen policy','diagnosticOnly':'combined reserve = original proxy plus planned strategy retained cash at after-fee balance; not a proof of profitable continuation','actualPayments':diagnostics,'baselineArithmeticAvailability':availability,'limitations':['designed after observed cautious5600 failure, no independent predictive validation','more conservative than original proxy; not a new productive rule','availability uses unchanged uncharged baseline, not a rerun with delayed charge']}
out.write_text(json.dumps(x,ensure_ascii=False,indent=2)+'\n');print(json.dumps({'newDynamicRuns':0,'postHoc':True,'actualPaymentsChecked':len(diagnostics),'notCovered':[(x['strategy'],x['fee'],x['cashAfterPayment'],x['combinedReserve']) for x in diagnostics if not x['combinedReserveCovered']]}))
