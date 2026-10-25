"""Lossless transport encoding only. Assert every decoded RGBA byte stays identical."""
from pathlib import Path
import hashlib,json,PIL,sys
from PIL import Image
root=Path(__file__).resolve().parents[1]/'assets/cities'
sha=lambda b:hashlib.sha256(b).hexdigest()
for city in sys.argv[1:] or ['luebeck']:
    directory=root/city
    # Existing originals/encodings are preserved rather than needlessly rewritten.
    manifest=directory/'encoding.json'
    if manifest.exists():
        for row in json.loads(manifest.read_text())['files']:
            assert sha((directory/row['source']).read_bytes())==row['sourceSHA256']
            assert sha((directory/row['encoded']).read_bytes())==row['encodedSHA256']
        print(city+': existing verified encoding retained');continue
    rows=[]
    for source in sorted(directory.glob('*.png')):
        target=source.with_suffix('.webp');assert not target.exists()
        image=Image.open(source)
        image.save(target,format='WEBP',lossless=True,quality=100,method=6,exact=True)
        decoded=Image.open(target)
        assert image.size==decoded.size and image.convert('RGBA').tobytes()==decoded.convert('RGBA').tobytes()
        rows.append(dict(source=source.name,encoded=target.name,size=list(image.size),sourceBytes=source.stat().st_size,encodedBytes=target.stat().st_size,sourceSHA256=sha(source.read_bytes()),encodedSHA256=sha(target.read_bytes()),decodedRGBA256=sha(decoded.convert('RGBA').tobytes()),allDecodedPixelsIdentical=True))
    assert rows,city
    manifest.write_text(json.dumps(dict(scope='lossless format conversion only; no resizing, recolouring or image editing',encoder='Pillow '+PIL.__version__,files=rows),indent=2)+'\n')
    print(city+': '+json.dumps(rows))
