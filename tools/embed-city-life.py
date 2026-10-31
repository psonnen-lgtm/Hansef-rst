"""Embed the city renderer, CSS and original PNG bytes in the standalone game."""
from pathlib import Path
import re,base64,json
root=Path(__file__).resolve().parents[1]
file=root/'Hansefuerst_0_4.html'
html=file.read_text()
def section(text,start,end,content,anchor):
    block=start+'\n'+content+'\n'+end
    if start in text:
        return re.sub(re.escape(start)+r'[\s\S]*?'+re.escape(end),lambda _:block,text,count=1)
    assert anchor in text,anchor
    return text.replace(anchor,block+'\n'+anchor,1)
html=section(html,'/* BEGIN CITY LIFE CSS */','/* END CITY LIFE CSS */',(root/'assets/cities/city-life.css').read_text(),'</style>')
layouts=json.loads((root/'assets/cities/city-layouts.json').read_text())
html=re.sub(r'// BEGIN CITY LIFE LAYOUTS[\s\S]*?// END CITY LIFE LAYOUTS\n','',html)
html=section(html,'// BEGIN CITY LIFE LAYOUTS','// END CITY LIFE LAYOUTS','const CITY_LIFE_SCENES=Object.freeze('+json.dumps(layouts,ensure_ascii=False,separators=(',',':'))+');','// BEGIN CITY LIFE JS' if '// BEGIN CITY LIFE JS' in html else '// Pixel graphics, drawn locally; no external assets or network required.')
html=section(html,'// BEGIN CITY LIFE JS','// END CITY LIFE JS',(root/'assets/cities/city-life.js').read_text(),'// Pixel graphics, drawn locally; no external assets or network required.')
catalog=json.loads((root/'assets/cities/city-assets.json').read_text())
assets={name:'data:image/webp;base64,'+base64.b64encode((root/path).read_bytes()).decode() for name,path in catalog.items()}
template='<template id="citySceneAssets">'+''.join('<img data-city-art="'+name+'" src="'+uri+'">' for name,uri in assets.items())+'</template>'
html=section(html,'<!-- BEGIN CITY LIFE ASSETS -->','<!-- END CITY LIFE ASSETS -->',template,'<input id="file"')
html=html.replace('<section class="scene">','<section class="scene" id="cityScene">',1)
old='function drawCity(){if(s.city>=5)'
new='function drawCity(){if(CityLife.mount(s.city,show,drawCity))return;if(s.city>=5)'
if old in html:html=html.replace(old,new,1)
assert new in html
file.write_text(html)
print('Embedded city assets/renderer; original rules and room assets retained.')
