"""Count actual events before the first Eldermann promotion in saved main cases."""
import gzip
import json
import pathlib
import statistics

out = pathlib.Path(__file__).resolve().parent / 'phase06b-20261025-01'
cities = json.loads((out.parent / 'politics-concept-profiles.json').read_text())['cities']
rows = []
for p in sorted((out / 'main').glob('*.json.gz')):
    r = json.loads(gzip.decompress(p.read_bytes()))['row']
    if r['rank'] != 4:
        continue
    before = []
    for e in r['events']:
        before.append(e)
        if e['type'] == 'promotion' and e.get('rank') == 4:
            break
    assert before[-1]['type'] == 'promotion' and before[-1]['rank'] == 4
    trips = [e for e in before if e['type'] == 'travel']
    visited = {cities[r['home']]['name']} | {e['to'] for e in trips}
    rows.append(dict(task=r['task'],day=r['eldDay'],journeys=len(trips),
                     purchases=sum(e['type']=='buy' for e in before),
                     sales=sum(e['type']=='sell' for e in before),
                     localServices=sum(e['type']=='political_service' and e['kind']!='league' for e in before),
                     leagueServices=sum(e['type']=='political_service' and e['kind']=='league' for e in before),
                     citiesVisited=len(visited)))
assert len(rows) == 208
result = dict(kind='saved_pre_title_events_only_no_engine_execution',cases=208,
              journeysMin=min(r['journeys'] for r in rows),
              journeysMedian=statistics.median(r['journeys'] for r in rows),
              journeysMax=max(r['journeys'] for r in rows),
              localServicesMin=min(r['localServices'] for r in rows),
              localServicesMedian=statistics.median(r['localServices'] for r in rows),
              localServicesMax=max(r['localServices'] for r in rows),
              citiesVisitedMin=min(r['citiesVisited'] for r in rows),rows=rows,
              limit='These are bot actions, not human play hours or a fun measurement.')
with (out / 'activity-at-title.json').open('x') as f:
    json.dump(result, f, indent=2)
    f.write('\n')
print({k:v for k,v in result.items() if k not in ['rows','limit']})
