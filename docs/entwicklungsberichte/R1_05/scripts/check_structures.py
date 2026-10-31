#!/usr/bin/env python3
"""Analyse privately unpacked data; emit metadata, never original game bytes."""
import argparse, pathlib, struct, json, csv
p=argparse.ArgumentParser();p.add_argument('unpacked',type=pathlib.Path);p.add_argument('output',type=pathlib.Path);a=p.parse_args();a.output.mkdir(parents=True,exist_ok=True)
b=(a.unpacked/'datei.1').read_bytes();v=struct.unpack_from('<256H',b);m=[v[i*16:i*16+16] for i in range(16)]
r={'file':'DATEI.1','offset':0,'encoding':'16x16 uint16 little endian','symmetric':all(m[i][j]==m[j][i] for i in range(16) for j in range(16)),'diagonal_zero':all(m[i][i]==0 for i in range(16)),'minimum_nonzero':min(x for x in v if x),'maximum':max(v),'unit':None,'city_index_mapping':'candidate: order of 419-byte city blocks; not code-traced','travel_time_formula':None}
(a.output/'matrix_structure.json').write_text(json.dumps(r,indent=2))
rows=[]
for name in ['datei.psa','datei.psb']:
 b=(a.unpacked/name).read_bytes()
 for i in range(16):
  o=0x220+i*419;n=b[o];city=b[o+1:o+1+n].decode('cp437');assert 1<=n<=20
  rows.append({'file':name,'index':i,'name_length_offset':hex(o),'stride':419,'city':city})
with (a.output/'city_records.csv').open('w') as f:
 w=csv.DictWriter(f,fieldnames=rows[0].keys());w.writeheader();w.writerows(rows)
print(json.dumps(r,indent=2))
