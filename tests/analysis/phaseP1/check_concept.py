"""Read-only source inventory and small arithmetic checks for a written concept.
No HTML evaluation, game harness, migration, election engine or career execution.
"""
import hashlib,json,re,subprocess,sys
from pathlib import Path
from itertools import permutations
ROOT=Path(__file__).resolve().parents[3]
HERE=Path(__file__).resolve().parent
out=Path(sys.argv[1])
if out.exists(): raise SystemExit('new output required')
proposal=json.loads((HERE/'proposal.json').read_text())
html=(ROOT/'Hansefuerst_0_4.html').read_text()
base=proposal['base'];checks=[]
def check(name,fn):
    evidence=fn();checks.append({'name':name,'passed':True,'scope':'document-arithmetic-or-read-only-inventory','evidence':evidence});print('PASS '+name)
def hare(n,weights,keys):
    assert n>=0 and len(weights)==len(keys) and len(set(keys))==len(keys)
    assert all(isinstance(w,int) and w>=0 for w in weights) and sum(weights)>0
    total=sum(weights);floor=[n*w//total for w in weights]
    order=sorted(range(len(weights)),key=lambda i:(-(n*weights[i]%total),keys[i]))
    for i in order[:n-sum(floor)]:floor[i]+=1
    assert sum(floor)==n and min(floor)>=0
    return floor

def cities():
    literal=re.search(r'const CITIES=Object.freeze\((\[[^\n]+?\])\)',html)
    if not literal: literal=re.search(r'const EXPANSION_CITIES\s*=\s*(\[[^\n]+?\])',html)
    assert literal,'city literal missing'
    names=json.loads(literal.group(1).replace("'",'"'))
    assert names==[c['name'] for c in proposal['cities']]
    rows=[]
    for c in proposal['cities']:
        assert c['minPopulation']<=c['population']<=c['maxPopulation']
        assert c['electors']==c['population']//5 and c['electors']<=c['population']
        groups=hare(c['electors'],[g['weight'] for g in proposal['groups']],[g['id'] for g in proposal['groups']])
        rows.append({**c,'nonElectors':c['population']-c['electors'],'groups':groups})
    return {'rows':rows,'populationTotal':sum(c['population'] for c in rows),'electorsTotal':sum(c['electors'] for c in rows)}
check('actual eleven city identities, proposed totals and disjoint groups',cities)
def invariants():
    rows=[]
    for n in [1,3,7,1000,1200,1800,5000,8000]:
        for candidates in range(2,7):
            keys=[f'candidate-{i}' for i in range(candidates)]+['undecided']
            weights=[(i+1)*71 for i in range(candidates)]+[400]
            result=hare(n,weights,keys)
            assert sum(result[:-1])+result[-1]==n
            assert sum(result[:-1])==n-result[-1]
            assert hare(n,weights,keys)==result
            rows.append({'electors':n,'candidates':candidates,'allocation':result})
    assert hare(3,[1,1,1,1],['d','c','b','a'])==[0,1,1,1]
    return {'cases':len(rows),'rows':rows,'tieRule':'lexical stored priority keys, deterministic equal remainder example'}
check('integer allocations, conservation and repeated same input',invariants)
def transfer():
    before=hare(1000,[1260,2240,2100,1400],['p','a','b','u'])
    after=hare(1000,[2460,2240,2100,1400],['p','a','b','u'])
    assert before==[180,320,300,200] and after==[300,273,256,171]
    return {'before':before,'after':after,'delta':[b-a for a,b in zip(before,after)],'sumDelta':sum(b-a for a,b in zip(before,after)),'note':'illustrative affinity example, not a guaranteed festival vote award'}
check('120 supporters transferred from existing pools with no new electors',transfer)
def batches():
    base=[200,200,200,400];actions=[(0,160),(1,90),(2,110)]
    rows=[]
    for order in permutations(actions):
        weights=base.copy()
        for actor,strength in order:weights[actor]+=strength
        rows.append(hare(1000,weights,['a','b','c','u']))
    assert all(r==rows[0] for r in rows)
    # One cumulative bucket avoids rounding each click into a new award.
    cap=80;half=300
    awards=[cap*sum(parts)//(sum(parts)+half) for parts in [[200],[50]*4,[1]*200]]
    assert len(set(awards))==1
    assert cap*10**9//(10**9+half)<cap
    return {'eventOrders':6,'sameResult':rows[0],'donation200Vs4x50Vs200x1Affinity':awards,'scope':'arithmetic only; resource reservation and duplicate-ID engine not implemented'}
check('same-day accepted event set order and pooled diminishing donation',batches)
def budgets():
    rows=[]
    for c in proposal['cities']:
        e=c['electors'];budget=1200+(e+4)//5;festival=600+(e+4)//5;reserve=2*budget
        assert festival<=budget
        balance=budget-festival
        assert balance>=0 and balance+festival==budget
        # Failed/unaffordable action has zero accepted cost/effect, conceptual constraint.
        rows.append({'city':c['name'],'campaignCap':budget,'initialCash':reserve,'festivalCost':festival,'remainingCampaignAfterFestival':balance,'yearlyIncomeCap':900+(e+9)//10})
    return {'rows':rows,'noAIActionsExecuted':True}
check('bounded public budget and festival affordability arithmetic',budgets)
def calendar():
    m=proposal['mayor'];assert m['electionDay']-m['campaignFirstDay']+1==m['campaignDays']==90
    assert m['nominationLastDay']+1==m['campaignFirstDay']
    assert proposal['hanse']['totalDelegates']==len(proposal['cities'])*proposal['hanse']['delegatesPerCity']==33
    return {'campaignDays':90,'annualDays':360,'delegates':33,'notTested':['actual count trigger','runoff','load around election','mayor/elder assignment']}
check('calendar interval and delegate count arithmetic',calendar)
def inventory():
    patterns={'rank':r'\b(?:s|x)\.rank\b|\brank\(|legacyRank|Fernkaufmann|Ratsherr|electionAvailableAt',
      'politicalFunctions':r'function (?:promote|mayorQuote|runMayorElection|politicalSupport|politicalOfficeProof|hanseQuote|runHanseAssembly|politicsClock|politicsHallView|politicalCareerModel|politicalCareerBoard|politicalAction|politicalTrade|politicalLeagueAccess|politicalHome|requestPoliticalEndorsement|acceptHanseAgreement|witnessHanseAgreement|finishHanseAgreement|resignMayor|reviewMayor|freshPolitics|migratePolitics|validatePolitics|donationGain|donate|trade|completeQuests|advance|save|exportGame|importGame|fresh|newMerchantGame)\('}
    entries={name:[{'line':i,'excerpt':line[:650]} for i,line in enumerate(html.splitlines(),1) if re.search(pattern,line)]for name,pattern in patterns.items()}
    files=subprocess.check_output(['git','ls-files'],cwd=ROOT,text=True).splitlines();testfiles=[]
    for filename in files:
        if filename.startswith('tests/') and Path(filename).suffix in ['.js','.cjs','.py'] and not filename.startswith('tests/analysis/phaseP1/'):
            content=(ROOT/filename).read_text()
            matched=[i for i,line in enumerate(content.splitlines(),1) if re.search(r'Fernkaufmann|Ratsherr|legacyRank|\.rank\b|mayorQuote|runMayorElection|hanseQuote',line)]
            if matched:testfiles.append({'file':filename,'lines':matched,'historicalFileRemainsUnchanged':True})
    raw=(ROOT/'Hansefuerst_0_4.html').read_bytes();assert raw==subprocess.check_output(['git','show',base+':Hansefuerst_0_4.html'],cwd=ROOT)
    return {'htmlSHA256':hashlib.sha256(raw).hexdigest(),'sourceOccurrences':entries,'affectedExistingTestFiles':testfiles,'noCodeEvaluated':True}
check('complete lexical source occurrence and affected test file inventory',inventory)
result={'phase':'P1-election-order','status':'concept-validation-only','base':base,'testedAnalysisCommit':subprocess.check_output(['git','rev-parse','HEAD'],cwd=ROOT,text=True).strip(),'productCodeCommit':subprocess.check_output(['git','log','-1','--format=%H','--','Hansefuerst_0_4.html'],cwd=ROOT,text=True).strip(),'checks':checks,'notRun':['game simulations','political careers','election prototype','productive migration','browser tests','full regression suites'],'readyForProduction':False}
out.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print(str(len(checks))+' concept checks completed; no gameplay executed')
