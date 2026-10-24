"""Standalone report figure from derived results; no engine execution."""
from pathlib import Path
import os,sys,json,statistics
os.environ.setdefault('MPLCONFIGDIR','/tmp/hanse05e-matplotlib')
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
src=Path(sys.argv[1]);out=Path(sys.argv[2]);d=json.loads(src.read_text());ids=['cautious','normal','aggressive','optimized','remote'];labels=['Vorsichtig','Normal','Aggressiv','Optimiert*','Fernhandel'];cities=list(d['cities']['normal']);plt.rcParams.update({'font.size':10,'axes.spines.top':False,'axes.spines.right':False})
fig,(a,b)=plt.subplots(1,2,figsize=(15,5.5),gridspec_kw={'width_ratios':[1,1.5]});values=[[c['final']['wealth'] for c in d['cases'] if c['strategy']==p] for p in ids];a.boxplot(values,tick_labels=labels,showfliers=True,flierprops={'markersize':2},medianprops={'color':'#b45309','linewidth':2});a.set_yscale('log');a.set_ylabel('Endvermögen in Gold · logarithmische Skala');a.set_title('250 reguläre Lübeck-Starts je Handelsweise');a.tick_params(axis='x',rotation=25);a.axhline(9960,ls=':',color='#334155');a.grid(axis='y',alpha=.2)
heat=np.array([[100*d['cities'][p][c]['casesVisited']/250 for c in cities] for p in ids]);im=b.imshow(heat,vmin=0,vmax=100,cmap='YlGnBu',aspect='auto');b.set_xticks(range(11),cities,rotation=45,ha='right');b.set_yticks(range(5),labels);b.set_title('Anteil der Partien, die einen Ort erreichen (%)');
for i in range(5):
 for j in range(11):b.text(j,i,f'{heat[i,j]:.0f}',ha='center',va='center',fontsize=8,color='white' if heat[i,j]>60 else '#0f172a')
fig.colorbar(im,ax=b,label='% der 250 Partien');fig.suptitle('Hansefürst 0.5e · elf Städte, 1.440 Tage / höchstens 800 Entscheidungen',fontweight='bold');fig.text(.02,.015,'* Optimiert kennt alle aktuellen Marktpreise. Fernhandel folgt bewusst einer Tour; Verlust-/Erholungsfälle haben andere Endbedingungen und sind hier ausgeschlossen.',fontsize=9);fig.tight_layout(rect=[0,.06,1,.94]);fig.savefig(out,dpi=160);plt.close(fig);print(out)
