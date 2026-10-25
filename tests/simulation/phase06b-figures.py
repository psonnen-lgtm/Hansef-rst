"""Publication figure from secured results only. No engine or strategy run."""
import os
import json
import pathlib
import numpy as np
os.environ.setdefault('MPLCONFIGDIR', '/tmp/hanse06b-matplotlib')
os.environ.setdefault('XDG_CACHE_HOME', '/tmp/hanse06b-cache')
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

root = pathlib.Path(__file__).resolve().parents[2]
out = root / 'tests/simulation/phase06b-20261025-01'
s = json.loads((out / 'summary.json').read_text())
pilot = json.loads((out / 'parameter-choice.json').read_text())
fig, ax = plt.subplots(2, 2, figsize=(14, 10), layout='constrained')
fig.suptitle('Hansefürst 0.6b – Politische Karriere im begrenzten Botvergleich', fontsize=17)
cities = s['byCity']
x = np.arange(len(cities))
ax[0, 0].bar(x-.18, [r['mayorDaysMedian'] for r in cities], .36, color='#95713e', label='Bürgermeister')
ax[0, 0].bar(x+.18, [r['eldDaysMedian'] for r in cities], .36, color='#397b62', label='Eldermann')
for i, r in enumerate(cities):
    ax[0, 0].text(i+.18, r['eldDaysMedian']+15, str(r['eld'])+'/20', ha='center', fontsize=7)
ax[0, 0].set_xticks(x, [r['name'] for r in cities], rotation=45, ha='right')
ax[0, 0].set_ylabel('Spieltage, Median nur erfolgreicher Titelvergaben')
ax[0, 0].set_title('Startstädte im Testadapter – Zahlen: Eldermannfälle')
ax[0, 0].legend()
policies = s['byPolicy']
labels = ['Vermögen', 'Frühe Politik', 'Versorgung', 'Fernhandel', 'Ausgewogen']
p = np.arange(5)
ax[0, 1].bar(p, [r['eld'] for r in policies], color='#397b62', label='Eldermann')
ax[0, 1].bar(p, [r['mayors']-r['eld'] for r in policies], bottom=[r['eld'] for r in policies], color='#b58d4b', label='Bürgermeister')
ax[0, 1].bar(p, [44-r['mayors'] for r in policies], bottom=[r['mayors'] for r in policies], color='#b46a4d', label='Ratsherr')
ax[0, 1].set_xticks(p, labels, rotation=20, ha='right')
ax[0, 1].set_ylabel('Anzahl von jeweils 44 Fällen')
ax[0, 1].set_ylim(0, 48)
ax[0, 1].set_title('Alle 12 unvollendeten Karrieren: späte Vermögensstrategie')
ax[0, 1].legend(fontsize=8)
groups = pilot['groups']
y = np.arange(4)
ax[1, 0].bar(y-.18, [r['mayorDaysMedian'] for r in groups], .36, color='#95713e', label='Bürgermeister')
ax[1, 0].bar(y+.18, [r['eldDaysMedian'] for r in groups], .36, color='#397b62', label='Eldermann')
ax[1, 0].set_xticks(y, [str(r['sectionDays'])+' Tage\n'+str(r['mayorWealth']//1000)+' Tsd. G' for r in groups])
ax[1, 0].set_ylabel('Spieltage, Median von jeweils 22 Piloten')
ax[1, 0].set_title('Parameterpilot: alle 88 Fälle erreichen beide Titel')
ax[1, 0].legend(fontsize=8)
ax[1, 1].bar(x, [r['gainPerDayMedian'] for r in cities], color='#397b62')
ax[1, 1].set_xticks(x, [r['name'] for r in cities], rotation=45, ha='right')
ax[1, 1].set_ylabel('Buchvermögenszuwachs / tatsächlichem Spieltag')
ax[1, 1].set_title('Gleicher Mix: fünf Richtlinien, zwei Budgets, vier Seeds')
for a in ax.flat:
    a.grid(axis='y', alpha=.2)
    a.set_axisbelow(True)
fig.text(.5, -.02, '308 unterschiedliche Fälle + 12 Replays; Hauptvergleich 2.160–2.180 Tage. Keine menschlichen Stunden abgeleitet.', ha='center', fontsize=10)
fig.savefig(root/'docs/entwicklungsberichte/2026-10-25_0.6b_karrierevergleich.png', dpi=150, bbox_inches='tight')
