// Historical test scripts keep their assertions but write fresh reports to a scratch directory.
if(process.env.HANSE_REGRESSION_OUTPUT){
 const fs=require('fs'),path=require('path'),write=fs.writeFileSync;
 const names=new Set(['phase15a-results.json','phase15b-results.json.gz','phase15b-summary.json','phase15c-results.json','phase15d-results.json.gz','phase15d-summary.json']);
 fs.writeFileSync=function(file,...args){const target=typeof file==='string'&&names.has(path.basename(file))?path.join(process.env.HANSE_REGRESSION_OUTPUT,path.basename(file)):file;return write.call(fs,target,...args)};
}
