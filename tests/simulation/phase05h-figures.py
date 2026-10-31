"""Standalone exportable figure from measured records; no engine execution."""
from pathlib import Path
import os,sys,json
os.environ.setdefault('MPLCONFIGDIR','/tmp/hanse05h-matplotlib')
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
d=json.loads(Path(sys.argv[1]).read_text());out=Path(sys.argv[2]);assert not out.exists()
models=['control','A','B','C'];ml=['Bisher','A · moderat','B · stärker','C · dynamisch'];strategies=['cautious','normal','aggressive','optimized','remote','explorer'];sl=['Vorsichtig','Normal','Aggressiv','Optimiert*','Feste Ferntour','Erkundung'];colors=['#64748b','#0d9488','#c07717','#7c3aed']
plt.rcParams.update({'font.size':10,'axes.spines.top':False,'axes.spines.right':False})
fig,axes=plt.subplots(2,2,figsize=(14,10),gridspec_kw={'height_ratios':[1,1]});a,b,c,e=axes.flat
heat=np.array([[d['groups'][m+'/'+s]['cityCount']['mean'] for m in models] for s in strategies]);im=a.imshow(heat,vmin=1,vmax=11,cmap='YlGnBu',aspect='auto');a.set_xticks(range(4),ml);a.set_yticks(range(6),sl);a.set_title('Wie viele Städte erreicht eine Partie? · Mittelwert',loc='left',fontweight='bold')
for i in range(6):
 for j in range(4):a.text(j,i,f'{heat[i,j]:.1f}'.replace('.',','),ha='center',va='center',color='white' if heat[i,j]>7 else '#0f172a')
x=np.arange(3)
for mi,m in enumerate(models):
 vals=[d['groups'][m+'/'+s]['lhShare']*100 for s in strategies[:3]];bars=b.bar(x+(mi-1.5)*.2,vals,.18,color=colors[mi],label=ml[mi]);b.bar_label(bars,fmt='%.0f',fontsize=8,padding=2)
b.set_xticks(x,sl[:3]);b.set_ylim(0,110);b.set_ylabel('% aller Reisen');b.set_title('Anteil Lübeck–Hamburg bei Standardhändlern',loc='left',fontweight='bold');b.legend(ncol=2,fontsize=8);b.grid(axis='y',alpha=.2)
x=np.arange(3)
for mi,m in enumerate(models):
 vals=[d['groups'][m+'/'+s]['longNetPerDay'] or 0 for s in ['optimized','remote','explorer']];bars=c.bar(x+(mi-1.5)*.2,vals,.18,color=colors[mi]);c.bar_label(bars,fmt='%.0f',fontsize=8,padding=2)
c.set_xticks(x,['Optimiert*','Feste Ferntour','Erkundung']);c.set_ylabel('Gold je tatsächlichem Reisetag');c.set_title('Nettohandel auf Reisen ab 10 Spieltagen',loc='left',fontweight='bold');c.grid(axis='y',alpha=.2)
x=np.arange(3)
for mi,m in enumerate(models):
 roles=d['models'][m]['years'][3]['roles'];vals=[roles[str(r)]['meanStock'] for r in [1,0,-1]];bars=e.bar(x+(mi-1.5)*.2,vals,.18,color=colors[mi]);e.bar_label(bars,fmt='%.0f',fontsize=8,padding=2)
e.set_xticks(x,['Überschuss','Neutral','Mangel']);e.set_ylim(0,265);e.set_ylabel('Mittlerer Marktbestand in Fass');e.set_title('Bleiben Ortsprofile erhalten? · viertes Spieljahr',loc='left',fontweight='bold');e.axhline(240,color='#94a3b8',ls=':',lw=1);e.grid(axis='y',alpha=.2)
fig.suptitle('Hansefürst 0.5h · regionale Wirtschaft als isolierter Prototyp',fontweight='bold',fontsize=15)
fig.text(.03,.035,'288 unterschiedliche Partien = 4 Modelle × 6 Strategien × 12 gemeinsame Seeds; 1.440 Tage / höchstens 800 Entscheidungen.\n* Optimiert kennt alle Livepreise. Erkundung kennt nur örtliche Preise und eigene Notizen; feste Ferntour erzwingt elf Städte.\nNettohandel = Warengewinn minus Hafengebühren und Piratenwarenkosten; ohne Prämien, Zinsen und Schiffswertänderung.\nKeine produktive Aktivierung. Selten gewählte Fernrouten und kleine Stichproben begrenzen die Aussagekraft.',fontsize=9)
fig.tight_layout(rect=[0,.13,1,.95],h_pad=2.8,w_pad=2);fig.savefig(out,dpi=160);plt.close(fig);print(out)
