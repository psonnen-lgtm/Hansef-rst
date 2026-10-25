"""Lossless transport encoding only. Assert every decoded RGBA byte stays identical."""
from pathlib import Path
import hashlib,json,PIL
from PIL import Image
directory=Path(__file__).resolve().parents[1]/'assets/cities/luebeck'
sha=lambda b:hashlib.sha256(b).hexdigest()
rows=[]
for name in ['luebeck-1350','cog']:
    source=directory/(name+'.png');target=directory/(name+'.webp')
    image=Image.open(source)
    image.save(target,format='WEBP',lossless=True,quality=100,method=6,exact=True)
    decoded=Image.open(target)
    assert image.size==decoded.size and image.convert('RGBA').tobytes()==decoded.convert('RGBA').tobytes()
    rows.append(dict(source=source.name,encoded=target.name,size=list(image.size),sourceBytes=source.stat().st_size,encodedBytes=target.stat().st_size,sourceSHA256=sha(source.read_bytes()),encodedSHA256=sha(target.read_bytes()),decodedRGBA256=sha(decoded.convert('RGBA').tobytes()),allDecodedPixelsIdentical=True))
(directory/'encoding.json').write_text(json.dumps(dict(scope='lossless format conversion only; no resizing, recolouring or image editing',encoder='Pillow '+PIL.__version__,files=rows),indent=2)+'\n')
print(json.dumps(rows,indent=2))
