#!/usr/bin/env python3
"""Read FAT12 images as data; never execute contents. Python standard library only."""
import argparse, pathlib, struct, hashlib, json, csv

def analyse(src, dest, extract):
 b=src.read_bytes(); u16=lambda o:struct.unpack_from('<H',b,o)[0]
 ss=u16(11); spc=b[13]; reserved=u16(14); fats=b[16]; roots=u16(17); nf=u16(22)
 root=(reserved+fats*nf)*ss; data=root+((roots*32+ss-1)//ss)*ss; fat=b[reserved*ss:(reserved+nf)*ss]
 def chain(c):
  seen=set(); out=bytearray()
  while 2<=c<0xff8:
   if c in seen: raise ValueError('FAT cycle')
   seen.add(c); out+=b[data+(c-2)*ss*spc:data+(c-1)*ss*spc]
   p=c+c//2; v=int.from_bytes(fat[p:p+2],'little'); c=(v>>4 if c&1 else v&0xfff)
  return out
 rows=[]
 def walk(buf,prefix=''):
  for o in range(0,len(buf),32):
   e=buf[o:o+32]
   if len(e)<32 or e[0]==0: break
   if e[0]==0xe5 or e[11]&8 or e[11]==15: continue
   name=e[:8].decode('cp437').rstrip(); ext=e[8:11].decode('cp437').rstrip(); name+=('.'+ext if ext else '')
   if name in ('.','..'):continue
   path=prefix+name; c=int.from_bytes(e[26:28],'little'); size=int.from_bytes(e[28:32],'little')
   if e[11]&16: walk(chain(c),path+'/');continue
   payload=bytes(chain(c)[:size]); rows.append(dict(image=src.name,path=path,size=size,sha256=hashlib.sha256(payload).hexdigest()))
   if extract:
    target=dest/'extracted'/src.stem/path; target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(payload)
 walk(b[root:root+roots*32]); return dict(name=src.name,size=len(b),sha256=hashlib.sha256(b).hexdigest(),bpb=dict(bytes_per_sector=ss,sectors_per_cluster=spc,reserved=reserved,fats=fats,root_entries=roots,sectors_per_fat=nf)),rows

def main():
 p=argparse.ArgumentParser();p.add_argument('input',type=pathlib.Path);p.add_argument('output',type=pathlib.Path);p.add_argument('--extract-private',action='store_true');a=p.parse_args();a.output.mkdir(parents=True,exist_ok=True)
 inv=[];rows=[]
 for f in sorted(a.input.iterdir()):
  if f.suffix.lower()=='.ima':
   meta,files=analyse(f,a.output,a.extract_private);inv.append(meta);rows+=files
  elif f.suffix.lower()=='.pdf':inv.append(dict(name=f.name,size=f.stat().st_size,sha256=hashlib.sha256(f.read_bytes()).hexdigest()))
 (a.output/'inventory.json').write_text(json.dumps(inv,indent=2))
 with (a.output/'disk_files.csv').open('w') as s:
  w=csv.DictWriter(s,fieldnames=['image','path','size','sha256']);w.writeheader();w.writerows(rows)
 print(json.dumps(inv,indent=2)); print('\n'.join(f"{r['image']} {r['path']} {r['size']}" for r in rows))
if __name__=='__main__':main()
