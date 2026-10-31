"""Standalone figure from saved summaries only; no game execution."""
import json,pathlib,os
os.environ.setdefault('MPLCONFIGDIR','/tmp/hanse05i-matplotlib')
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
root=pathlib.Path(__file__).resolve().parents[2];s=json.loads((root/'tests/simulation/phase05i-20261025-01/summary.json').read_text())
ids=['none','occasional','regional','bulk','stress'];labels=['Ohne Lager','Gelegentlich','Regional','Umfangreich','Knappes Gold'];x=np.arange(5)
fig,axes=plt.subplots(2,2,figsize=(13,9),layout='constrained');fig.suptitle('Hansefürst 0.5i – Lagerraum und laufende Miete',fontsize=18)
for offset,model,label,color in [(-.18,'before','Vorher, unbegrenzt','#8796a5'),(.18,'capacity','150 frei + bis 200 gemietet','#236e56')]:
    a=[next(g for g in s['groups'] if g['model']==model and g['strategy']==id) for id in ids]
    axes[0,0].bar(x+offset,[g['wealthMedian']/1000 for g in a],.36,label=label,color=color)
axes[0,0].set_title('Hauptvergleich: Endvermögen (Median, je 20 Seeds)');axes[0,0].set_ylabel('Tausend Gold, inklusive Lagerbuchwert');axes[0,0].legend(fontsize=9)
a=[next(g for g in s['groups'] if g['model']=='capacity' and g['strategy']==id) for id in ids]
axes[0,1].bar(x,[g['rentMedian'] for g in a],color='#ab793c');axes[0,1].set_title('Neue Regeln: gesamte Mietkosten (Median)');axes[0,1].set_ylabel('Gold über 1.440+ Spieltage')
axes[1,0].bar(x,[g['storageNetMedian'] for g in a],color='#236e56');axes[1,0].set_title('Lagerverkäufe: Warengewinn minus Miete');axes[1,0].set_ylabel('Gold (Median), ohne alternative Handelschancen')
t=[next(g for g in s['tourGroups'] if g['model']=='capacity' and g['strategy']==id) for id in ids]
axes[1,1].bar(x-.18,[g['eld'] for g in t],.36,label='Eldermann',color='#236e56');axes[1,1].bar(x+.18,[g['blocked'] for g in t],.36,label='Liquiditätsstopp der Strategie',color='#b65e43');axes[1,1].set_title('Feste Elf-Städte-Tour: je 6 Seeds');axes[1,1].set_ylabel('Partien');axes[1,1].set_ylim(0,7);axes[1,1].legend(fontsize=9)
for ax in axes.flat:ax.set_xticks(x,labels,rotation=15,ha='right');ax.grid(axis='y',alpha=.2);ax.set_axisbelow(True)
fig.savefig(root/'docs/entwicklungsberichte/2026-10-25_0.5i_lagervergleich.png',dpi=160)
