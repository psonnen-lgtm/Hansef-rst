"""Standalone comparison figure from archived observations; no engine calls."""
from pathlib import Path
import os,sys,json
os.environ.setdefault('MPLCONFIGDIR','/tmp/hanse05h3-mpl')
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
d=json.loads(Path(sys.argv[1]).read_text());e=json.loads(Path(sys.argv[2]).read_text());out=Path(sys.argv[3]);assert not out.exists()
models=['legacy','F_info','regional'];labels=['Bisheriges Spiel','F + Info (0.5h.2)','Neu: regional'];ids=['cautious','normal','aggressive','optimized','remote','explorer'];sl=['Vorsichtig','Normal','Aggressiv','Oracle*','Feste Tour','Erkundung*'];colors=['#64748b','#b77918','#15803d']
plt.rcParams.update({'font.size':10,'axes.spines.top':False,'axes.spines.right':False});fig,axes=plt.subplots(2,2,figsize=(14,10));a,b,c,f=axes.flat
heat=np.array([[d['groups'][m+'/'+s]['cityCount']['mean'] for m in models] for s in ids]);a.imshow(heat,vmin=1,vmax=11,cmap='YlGnBu',aspect='auto');a.set_xticks(range(3),labels,rotation=12);a.set_yticks(range(6),sl);a.set_title('Erreichte Städte je Partie · Mittelwert',fontweight='bold',loc='left')
for i in range(6):
 for j in range(3):a.text(j,i,f'{heat[i,j]:.1f}'.replace('.',','),ha='center',va='center',color='white' if heat[i,j]>7 else '#17212c')
x=np.arange(3)
for mi,m in enumerate(models):
 vals=[100*d['groups'][m+'/'+s]['lhShare'] for s in ids[:3]];bars=b.bar(x+(mi-1)*.26,vals,.23,label=labels[mi],color=colors[mi]);b.bar_label(bars,fmt='%.0f',fontsize=8,padding=2)
b.set_xticks(x,sl[:3]);b.set_ylim(0,112);b.set_ylabel('% aller Reisen');b.set_title('Anteil Lübeck–Hamburg',fontweight='bold',loc='left');b.legend(fontsize=8);b.grid(axis='y',alpha=.2)
keys=[('Nowgorod–Brügge',22),('Nowgorod–Brügge',90),('Bergen–Lübeck',22),('Bergen–Lübeck',90)];x=np.arange(4)
for i,model in enumerate(['F','R1']):
 vals=[e['routes'][model+'/'+route+'/'+str(q)]['netPerDay'] for route,q in keys];bars=c.bar(x+(i-.5)*.34,vals,.30,color=['#b77918','#15803d'][i],label=['F vorher','R1 aktiviert'][i]);c.bar_label(bars,fmt='%.0f',fontsize=9,padding=2)
c.set_xticks(x,['Pelze/Tuch\n22 Fass','Pelze/Tuch\n90 Fass','Fisch/Getreide\n22 Fass','Fisch/Getreide\n90 Fass']);c.axhline(0,color='#475569',lw=1);c.set_ylabel('Nettohandel in Gold je Reisetag');c.set_title('Gezielte Wiederholrouten · drei gepaarte Seeds',fontweight='bold',loc='left');c.legend(fontsize=8);c.grid(axis='y',alpha=.2)
for mi,(model,label) in enumerate([('legacy','Bisheriges Spiel'),('F','F (0.5h.2)'),('regional','Neu: regional')]):f.plot(range(1,7),[y['normalizedPrice'] for y in e['markets'][model]],marker='o',label=label,color=colors[mi])
f.set_ylim(0,1.4);f.set_xticks(range(1,7));f.set_xlabel('Spieljahr');f.set_ylabel('Preisindex · Basiswerte = 1');f.set_title('Sechs Jahre ohne Händler · zwei Seeds',fontweight='bold',loc='left');f.legend(fontsize=8);f.grid(alpha=.2)
fig.suptitle('Hansefürst 0.5h.3 · aktivierte regionale Wirtschaft',fontweight='bold',fontsize=15)
fig.text(.025,.025,'216 unterschiedliche Fälle, 3 Gruppen × 6 Strategien × 12 Seeds; 234 Ausführungen einschließlich Pilot-Replays.\n* Oracle kennt alle Livepreise; Erkundung hat eine eigene Suchpräferenz. Normale Händler nutzen nur öffentliche Hinweise und eigene Preisnotizen.\nNettohandel = Warengewinn minus Hafengebühren und Piratenwarenkosten. Routenproben: höchstens 22/90 Fass, begrenzt durch Bestand und Kapital.\nKleine Stichproben; kein Beweis allgemeiner Exploitfreiheit oder menschlicher Spieldauer. Aktivierung im Arbeitszweig, keine automatische Zusammenführung.',fontsize=9)
fig.tight_layout(rect=[0,.13,1,.95],h_pad=2.6,w_pad=2);fig.savefig(out,dpi=160);plt.close(fig);print(out)
