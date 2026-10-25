"""Exportable figure from saved evidence only; no engine calls."""
from pathlib import Path
import os,sys,json
os.environ.setdefault('MPLCONFIGDIR','/tmp/hanse05h2-mpl')
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
d=json.loads(Path(sys.argv[1]).read_text());e=json.loads(Path(sys.argv[2]).read_text());out=Path(sys.argv[3]);assert not out.exists()
models=['B','B_info','F','F_info'];labels=['B bisher','B + Hinweise','F Warenfluss','F + Hinweise'];strategies=['cautious','normal','aggressive','optimized','remote','explorer'];sl=['Vorsichtig','Normal','Aggressiv','Oracle*','Feste Tour','Erkundung*'];colors=['#64748b','#0891b2','#b77918','#15803d']
plt.rcParams.update({'font.size':10,'axes.spines.top':False,'axes.spines.right':False});fig,axes=plt.subplots(2,2,figsize=(14,10));a,b,c,f=axes.flat
heat=np.array([[d['groups'][m+'/'+s]['cityCount']['mean'] for m in models] for s in strategies]);a.imshow(heat,vmin=1,vmax=11,cmap='YlGnBu',aspect='auto');a.set_xticks(range(4),labels,rotation=15);a.set_yticks(range(6),sl);a.set_title('Erreichte Städte je Partie · Mittelwert',fontweight='bold',loc='left')
for i in range(6):
 for j in range(4):a.text(j,i,f'{heat[i,j]:.1f}'.replace('.',','),ha='center',va='center',color='white' if heat[i,j]>7 else '#17212c')
x=np.arange(3)
for mi,m in enumerate(models):
 vals=[100*d['groups'][m+'/'+s]['lhShare'] for s in strategies[:3]];bars=b.bar(x+(mi-1.5)*.2,vals,.18,label=labels[mi],color=colors[mi]);b.bar_label(bars,fmt='%.0f',fontsize=8,padding=2)
b.set_xticks(x,sl[:3]);b.set_ylim(0,85);b.set_ylabel('% aller Reisen');b.set_title('Lübeck–Hamburg wird seltener gewählt',fontweight='bold',loc='left');b.legend(fontsize=8,ncol=2);b.grid(axis='y',alpha=.2)
x=np.arange(3)
for mi,m in enumerate(['B_info','F_info']):
 vals=[d['groups'][m+'/'+s]['longNetPerDay'] for s in ['normal','aggressive','remote']];bars=c.bar(x+(mi-.5)*.32,vals,.29,color=[colors[1],colors[3]][mi],label=['B + Hinweise','F + Hinweise'][mi]);c.bar_label(bars,fmt='%.0f',fontsize=9,padding=2)
c.set_xticks(x,['Normal','Aggressiv','Feste Tour*']);c.set_ylabel('Nettohandel in Gold je Reisetag');c.set_title('Fernreisen ab zehn Spieltagen',fontweight='bold',loc='left');c.legend(fontsize=8);c.grid(axis='y',alpha=.2)
x=np.arange(3)
for i,part in enumerate(['firstMeanNet','lastMeanNet']):
 vals=[e['routes']['F/'+r+'/90'][part] for r in ['Nowgorod–Brügge','Bergen–Lübeck','Lübeck–Hamburg']];bars=f.bar(x+(i-.5)*.33,vals,.30,color=['#15803d','#b45309'][i],label=['erste vier Fahrten','letzte vier Fahrten'][i]);f.bar_label(bars,fmt='%.0f',fontsize=9,padding=2)
f.set_xticks(x,['Nowgorod–Brügge','Bergen–Lübeck','Lübeck–Hamburg'],rotation=15);f.axhline(0,color='#475569',lw=1);f.set_ylabel('Gold je Fahrt');f.set_title('Große Wiederholladungen schwächen Margen · F',fontweight='bold',loc='left');f.legend(fontsize=8);f.grid(axis='y',alpha=.2)
fig.suptitle('Hansefürst 0.5h.2 · Warenfluss und begrenzte Handelsinformationen',fontweight='bold',fontsize=15)
fig.text(.025,.025,'288 Fälle = 4 Gruppen × 6 Strategien × 12 gepaarte Seeds; 1.440 Tage / höchstens 800 Entscheidungen.\n* Oracle kennt alle Livepreise; Erkundung hat eine eigene Suchpräferenz. Die feste Tour erhält keine Hinweise.\nNettohandel = Warengewinn minus Hafengebühren und Piratenwarenkosten; keine Prämien oder Schiffswertänderungen.\nRoutenproben: 16 Fahrten je Fixture, drei Seeds; höchstens 90 Fass, begrenzt durch Bestand und Kapital. Kleine Stichprobe, keine Gewinngarantie.\nProduktive Spieldatei und historische Daten unverändert.',fontsize=9)
fig.tight_layout(rect=[0,.15,1,.95],h_pad=2.8,w_pad=2);fig.savefig(out,dpi=160);plt.close(fig);print(out)
