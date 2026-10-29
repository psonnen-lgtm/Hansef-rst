"""Export tables and two figures using saved checkpoints only; no game execution."""
import json,csv,gzip,collections,os
from pathlib import Path
os.environ['MPLCONFIGDIR']='/tmp/q105-matplotlib'
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.ticker import FuncFormatter
P=Path(__file__).resolve().parent;O=P/'results';a=json.loads((O/'audit.json').read_text());B=a['baseline'];F=a['fees'];fees=json.loads((O/'fees.json').read_text())['fees']
A=list(csv.DictReader((O/'affordability.csv').open()))
names={'cautious':'Vorsichtig','normal':'Normal','aggressive':'Aggressiv (1.500 Kredit)','optimized_observed':'Optimiert, beobachtet','poor_then_normal':'Fehlentscheidungen → normal'}
scenes={'luebeck_kogge':'Lübeck/Kogge','bergen_kogge':'Bergen/Kogge','nowgorod_kogge':'Nowgorod/Kogge','luebeck_schnigge':'Lübeck/Schnigge*','luebeck_convoy':'Lübeck/Kogge+Holk*'}
fmt=lambda x:'–' if x is None else f'{x:,.0f}'.replace(',','.')
def span(xs):
 xs=[x for x in xs if x is not None];return 'nicht erreicht' if not xs else fmt(min(xs)) if min(xs)==max(xs) else fmt(min(xs))+'–'+fmt(max(xs))
def tab(headers,rows):return '\n'.join(['| '+' | '.join(headers)+' |','|'+'|'.join('---' for _ in headers)+'|']+['| '+' | '.join(str(x) for x in row)+' |' for row in rows])+'\n'
T={}
T['scenario']=tab(['Szenario, je15 Fälle','Endtage','Sinnvoll beladene Reisen','Bargeld Ende','E erstmals (Tag)'],[[label,span(r['days'] for r in B if r['scenario']==sc),span(r['meaningfulTrips'] for r in B if r['scenario']==sc),span(r['gold'] for r in B if r['scenario']==sc),span(r['firstEstablishedDay'] for r in B if r['scenario']==sc)] for sc,label in scenes.items()])
T['style']=tab(['Lübeck/Kogge, je3 Seeds','Endkasse','Kasse − Schuld','Erwirtschafteter Nettozuwachs','Freie Reserve Ende'],[[names[s],span(r['gold'] for r in B if r['scenario']=='luebeck_kogge' and r['strategy']==s),span(r['netCash'] for r in B if r['scenario']=='luebeck_kogge' and r['strategy']==s),span(r['operatingNet'] for r in B if r['scenario']=='luebeck_kogge' and r['strategy']==s),span(r['freeCash'] for r in B if r['scenario']=='luebeck_kogge' and r['strategy']==s)] for s in names])
rows=[]
for sc in list(scenes)[:3]:
 for fee in fees:
  rs=[r for r in A if r['scenario']==sc and int(r['fee'])==fee];n=[int(r['nominalDay']) for r in rs if r['nominalDay']];s=[int(r['stabilizedDay']) for r in rs if r['stabilizedDay']];v=[int(r['stabilizedLoadedTrips']) for r in rs if r['stabilizedLoadedTrips']]
  rows.append([scenes[sc],fmt(fee),f'{len(n)}/15; Tag '+span(n),f'{len(s)}/15; Tag '+span(s),span(v)])
T['affordability']=tab(['Regulärer Start','Gebühr','Nominal erreicht','Mit E + Restreserve erreicht','Beladene Reisen bis tragbar'],rows)
rows=[]
for fee in fees:
 for timing in ['nominal','stabilized']:
  rs=[r for r in F if r['fee']==fee and r['timing']==timing];paid=[r for r in rs if r['paid']];rows.append([fmt(fee),'Erstes Bargeld' if timing=='nominal' else 'E + Restreserve',f'{len(paid)}/6',sum(r['lastingStagnation'] for r in paid),sum(r['stagnationHint'] for r in paid),sum(r['stopReason']=='insufficient_travel_cash' for r in paid),sum(r['postObservationComplete'] for r in paid)])
T['feeoutcomes']=tab(['Gebühr','Zahlungszeitpunkt','Bezahlt','Anhaltender Stillstand','Auch vorübergehende Hinweise','Abfahrt geldbedingt blockiert','≥120 Tage +3 Reisen beobachtet'],rows)
rows=[]
for r in F:
 if r['timing']=='stabilized':rows.append([fmt(r['fee']),scenes[r['scenario']]+' / '+names[r['strategy']],fmt(r['paymentDay']),fmt(r['goldAfterPayment']),fmt(r['freeAfterPayment']),r['postMeaningfulTrips'],fmt(r['postNetOperating']),fmt(r['gold']),r['postDays'] if r['paid'] else '–'])
T['paid_stabilized']=tab(['Gebühr','Fall','Zahltag','Restkasse','Freie Reserve danach','Beladene Reisen danach','Netto danach','Endkasse','Folgetage'],rows)
rows=[]
for r in F:
 if r['scenario']=='luebeck_kogge' and r['strategy']=='cautious':rows.append([fmt(r['fee']),r['timing'],r['paymentDay'],r['meaningfulBeforePayment'],fmt(r['goldAfterPayment']),fmt(r['freeAfterPayment']),r['postMeaningfulTrips'],fmt(r['gold']),r['days']])
T['cautious']=tab(['Gebühr','Zeitpunkt','Zahltag','Beladen vorher','Restkasse','Freie Reserve','Beladen danach','Endkasse','Endtag'],rows)
# Actual checkpoint trajectories at four reference dates, no interpolation.
rows=[]
for sc in scenes:
 key=sc+'__cautious__10003';r=json.loads(gzip.decompress((O/'runs'/(key+'.json.gz')).read_bytes()));points=[x for x in r['snapshots'] if x['phase']=='checkpoint']
 for target in [30,60,120,240]:
  m=[x for x in points if x['day']<=target][-1];rows.append([scenes[sc],target,m['day'],fmt(m['gold']),fmt(m['debt']),fmt(m['freeCash']),m['established']])
T['checkpoints']=tab(['Vorsichtig, Seed10003','Referenztag','Beobachtet an Tag','Bargeld','Schuld','Freie Reserve','E erfüllt'],rows)
(O/'tables.json').write_text(json.dumps(T,ensure_ascii=False,indent=2)+'\n')
plt.rcParams.update({'svg.hashsalt':'q105','font.family':'DejaVu Sans','font.size':10})
formatter=FuncFormatter(lambda x,_:f'{x:,.0f}'.replace(',','.'))
fig,axes=plt.subplots(2,1,figsize=(10,7),sharex=True,layout='constrained')
for sc,color in zip(list(scenes)[:3],['#1c5d99','#be6d22','#5e548e']):
 r=json.loads(gzip.decompress((O/'runs'/(sc+'__cautious__10003.json.gz')).read_bytes()));pts=[x for x in r['snapshots'] if x['phase']=='checkpoint']
 for ax,key in zip(axes,['gold','freeCash']):ax.plot([m['day'] for m in pts],[m[key] for m in pts],'.-',color=color,label=scenes[sc],lw=1,ms=3)
axes[0].set_title('Vorsichtiger Handel: Routen verändern den Kapitalaufbau\nSeed 10003 · gleiche 5.000 Gold und Kogge · keine Aufnahmeausgabe',loc='left')
for ax,label in zip(axes,['Bargeld (Gold)','Freie Reserve nach R* (Gold)']):ax.set_ylabel(label);ax.yaxis.set_major_formatter(formatter);ax.grid(alpha=.2)
axes[0].legend();axes[1].axhline(0,color='#666666',lw=.7);axes[1].set_xlabel('Simulierte Tage; Linien verbinden nur tatsächlich beobachtete Kontrollpunkte')
fig.savefig(O/'regionale_entwicklung.svg',metadata={'Date':'2026-10-29','Creator':'Q1.05 saved-data export'});plt.close(fig)
fig,ax=plt.subplots(figsize=(10,5),layout='constrained')
for suffix,label,color in [('', 'Ohne Gebühr','#777777'),('__12500__nominal','12.500: erste Bezahlbarkeit','#b02e35'),('__12500__stabilized','12.500: gedeckte Restreserve','#187a5e')]:
 r=json.loads(gzip.decompress((O/'runs'/('luebeck_kogge__cautious__10003'+suffix+'.json.gz')).read_bytes()));pts=r['snapshots'];ax.plot([m['day'] for m in pts],[m['gold'] for m in pts],'.-',label=label,color=color,lw=1,ms=3)
 if r['payment']:ax.axvline(r['payment']['day'],color=color,lw=.7,ls='--')
ax.set_title('Vorsichtiger Lübecker: Zahlungstermin entscheidet über Fortsetzung\nSeed 10003 · Kogge · jede Linie endet am eigenen Prüfende',loc='left');ax.set_xlabel('Simulierte Tage');ax.set_ylabel('Bargeld (Gold)');ax.yaxis.set_major_formatter(formatter);ax.grid(alpha=.2);ax.legend()
fig.savefig(O/'vorsichtiger_zahlungszeitpunkt.svg',metadata={'Date':'2026-10-29','Creator':'Q1.05 saved-data export'});plt.close(fig)
print(json.dumps({'tables':list(T),'figures':2,'noGameExecution':True}))
