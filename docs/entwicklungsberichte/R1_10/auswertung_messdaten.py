"""Aggregate recorded R1.10 observations only. No game execution or simulation."""
from pathlib import Path
import csv,json
root=Path(__file__).resolve().parent
with (root/'R1_10_reisen.csv').open(newline='') as f:trips=list(csv.DictReader(f))
with (root/'R1_10_ereignisse.csv').open(newline='') as f:events=list(csv.DictReader(f))
n=len(trips);days=sum(int(t['days']) for t in trips)
identified=[e for e in events if e['counted_in_message_rate']=='True']
observations=[e for e in events if e['counted_in_extended_observation_rate']=='True']
for t in trips:
 assert int(t['cash_before'])-int(t['cash_after_trip'])==int(t['port_fee_shown'])+int(t['unallocated_trip_outflow'])
print(json.dumps({'trips':n,'cumulative_travel_days':days,'mean_days':days/n,'additional_messages':len(identified),'trips_with_message':len({e['trip'] for e in identified}),'messages_per_trip':len(identified)/n,'messages_per_100_travel_days':100*len(identified)/days,'extended_observations_including_inspector_assessment':len(observations),'mean_attributed_event_cost':None,'warning':'Dependent save restoration; small sample. Financing is not profit or event cost.'},ensure_ascii=False,indent=2))
