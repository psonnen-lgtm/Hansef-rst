"""Static publication figure, saved data only."""
import os,json,pathlib,numpy as np
os.environ.setdefault('MPLCONFIGDIR','/tmp/hanse05j-matplotlib');os.environ.setdefault('XDG_CACHE_HOME','/tmp/hanse05j-cache')
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
root=pathlib.Path(__file__).resolve().parents[2];s=json.loads((root/'tests/simulation/phase05j-20261025-01/summary.json').read_text())
fig,ax=plt.subplots(2,2,figsize=(13,9),layout='constrained');fig.suptitle('Hansefürst 0.5j – Materialbau und tatsächliche Handelsverläufe',fontsize=17)
x=np.arange(3);labels=['Schnigge','Kogge','Holk'];mat=[1312,2484,4337];wage=[2500,3700,6200];old=[3800,6200,10500]
ax[0,0].bar(x,wage,label='Werftlohn',color='#9b733c');ax[0,0].bar(x,mat,bottom=wage,label='Material zu Basispreisen',color='#397b62');ax[0,0].scatter(x,old,color='black',marker='x',label='Bisheriger Goldpreis',zorder=5);ax[0,0].set_xticks(x,labels);ax[0,0].set_ylabel('Gold');ax[0,0].set_title('Kalkulation ohne doppelte Kosten');ax[0,0].legend(fontsize=8)
data=[[c['effectiveCost'] for c in s['effectiveBuildCosts'] if c['type']==t] for t in range(3)]
ax[0,1].boxplot(data,tick_labels=labels);ax[0,1].scatter([1,2,3],old,marker='x',color='black');ax[0,1].set_title('Tatsächlicher Materialverbrauch + Lohn, je 72 Bauten');ax[0,1].set_ylabel('Gold, ohne Transport/Piratenverluste')
labs=[];vals=[];pos=np.arange(9)
for i,p in enumerate(p for p in s['paired'] if p['type']>=0):labs.append(labels[p['type']]+'\n'+{0:'Lübeck',4:'Stettin',6:'Bergen'}[p['yard']]);vals.append(p['wealthDeltaMedian']/1000)
ax[1,0].bar(pos,vals,color=['#397b62' if v>=0 else '#ad6346' for v in vals]);ax[1,0].set_xticks(pos,labs,rotation=45,ha='right',fontsize=8);ax[1,0].axhline(0,color='black',lw=.8);ax[1,0].set_title('Gepaarte Vermögensdifferenz: Materialbau − Sofortkauf');ax[1,0].set_ylabel('Tausend Gold, Median von zwölf Seeds')
g=[g for g in s['groups'] if g['model']=='material' and g['type']>=0];ax[1,1].bar(pos,[v['procurementTripsMedian'] for v in g],color='#397b62');ax[1,1].set_xticks(pos,labs,rotation=45,ha='right',fontsize=8);ax[1,1].set_ylabel('Markierte Beschaffungsreisen je Partie, Median');ax[1,1].set_title('Transportbedarf der beiden Neubauten')
for a in ax.flat:a.grid(axis='y',alpha=.2);a.set_axisbelow(True)
fig.savefig(root/'docs/entwicklungsberichte/2026-10-25_0.5j_schiffbauvergleich.png',dpi=150)
