"""Read secured event data only: cash ledger, quantities, procurement and pickup."""
import collections
import gzip
import json
import pathlib
import statistics

out = pathlib.Path(__file__).resolve().parent / 'phase05j-20261025-01'
rows = [json.loads(gzip.decompress(p.read_bytes()))['row']
        for p in sorted((out / 'main').glob('*.json.gz'))]
assert len(rows) == 240
groups = []
materials = collections.Counter()
for r in rows:
    events = r['events']
    def total(kind, field):
        return sum(e.get(field, 0) or 0 for e in events if e['type'] == kind)
    cash = (5000 + total('sell', 'total') - total('buy', 'total')
            - total('travel', 'fee') - total('warehouse_rent', 'cost')
            - total('warehouse_rent_change', 'cost')
            - total('shipbuilding_started', 'wage') - total('ship_purchase', 'cost'))
    assert abs(cash - r['gold']) < 1e-6
    assert not any(e['type'] == 'ship_sale' for e in events)
    for e in events:
        if e['type'] == 'shipbuilding_started':
            for m in e['materials']:
                materials[m['j']] += m['n']
for ship_type in range(3):
    for yard in [0, 4, 6]:
        selected = [r for r in rows if (r['model'], r['type'], r['yard'])
                    == ('material', ship_type, yard)]
        procurement, pickup, completion = [], [], []
        for r in selected:
            starts = [e['day'] for e in r['trace'] if e['event'] == 'procurement_begin']
            ends = [e['day'] for e in r['trace'] if e['event'] == 'construction_begin']
            assert len(starts) == len(ends) == 2
            procurement.extend(b - a for a, b in zip(starts, ends))
            for e in r['events']:
                if e['type'] == 'shipbuilding_completed':
                    completion.append(e['day'] - e['ready'])
                    trips = [t for t in r['events'] if t['type'] == 'travel'
                             and any(q['id'] == e['shipId'] for q in t['ships'])]
                    assert trips
                    pickup.append(trips[0]['simDay'] - trips[0]['days'] - e['ready'])
        groups.append(dict(type=ship_type, yard=yard,
                           procurementDaysMedian=statistics.median(procurement),
                           procurementDaysMin=min(procurement), procurementDaysMax=max(procurement),
                           readyToFirstDepartureDaysMedian=statistics.median(pickup),
                           readyToFirstDepartureDaysMin=min(pickup), readyToFirstDepartureDaysMax=max(pickup),
                           completionDelayMax=max(completion)))
result = dict(kind='saved_event_analysis_no_simulation', cashLedgersVerified=240,
              noMainShipSales=True, materialUnitsByGood=dict(materials), groups=groups,
              bankMaximum=max(r['final']['bank'] for r in rows),
              bankDebtMaximum=max(r['final']['debt'] for r in rows),
              rentTotal=sum(r['summary']['rent'] for r in rows),
              arrearsTotal=sum(r['summary']['arrears'] for r in rows))
with (out / 'economy-details.json').open('x') as f:
    json.dump(result, f, indent=2)
    f.write('\n')
print('PASS 240 saved event ledgers; procurement and first-departure measures extracted')
