"""Standalone plot from saved JSON, without running the game."""
from pathlib import Path
import json,os
os.environ.setdefault("MPLCONFIGDIR","/tmp/hanse06c-matplotlib")
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
root=Path(__file__).resolve().parents[2]
s=json.loads((root/'tests/simulation/phase06c-20261025-01/summary.json').read_text())
cities=s['cities'];names=[c['name'] for c in cities];y=list(range(11))
fig,axes=plt.subplots(1,2,figsize=(14,8.5))
colors=['#315d62','#b47735']
for ax,metric,title,label in [(axes[0],'worth180Median','Früher Vermögensaufbau','Gold, letzter beobachteter Stand bis Tag 180'),(axes[1],'eldDayMedian','Weg zum Eldermann','Spieltage bis zum Titel, nur erfolgreiche Fälle')]:
    for offset,condition,color,legend in [(-.18,'normal',colors[0],'Normaler Beginn'),(.18,'earlyArms',colors[1],'Frühe Bewaffnung: 3.300 G bezahlt')]:
        values=[c[condition][metric] for c in cities]
        ax.barh([v+offset for v in y],values,height=.33,color=color,label=legend)
        if metric=='eldDayMedian':
            for i,(city,value) in enumerate(zip(cities,values)):
                ax.text(value+18,i+offset,f"{city[condition]['eld']}/5",va='center',fontsize=9)
    ax.set_yticks(y,names);ax.invert_yaxis();ax.set_title(title,fontweight='bold');ax.set_xlabel(label);ax.grid(axis='x',alpha=.22);ax.set_axisbelow(True);ax.spines[['top','right']].set_visible(False)
axes[1].set_xlim(0,1720)
axes[0].legend(loc='lower right',fontsize=9)
fig.suptitle('Elf Starthäfen: gleiche Ausstattung, unterschiedliche Wege',fontsize=17,fontweight='bold',y=.98)
fig.text(.5,.025,'Hauptvergleich: 110 neue Verläufe · ein gepaarter Seed · fünf Strategien je Stadt und Bedingung\nZahlen rechts: Eldermänner / fünf Fälle. Bedingte Mediane sind keine Erfolgswahrscheinlichkeiten oder menschlichen Stunden.',ha='center',fontsize=10)
fig.tight_layout(rect=[0,.075,1,.94]);file=root/'docs/entwicklungsberichte/2026-10-25_0.6c_startvergleich.png';assert not file.exists();fig.savefig(file,dpi=150);plt.close(fig)
