// Actual game contexts and saved-state fixtures. Requiring this module never advances time.
const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'../..'),base='99aae02577a60fdb89d069a1b644a44a2b743267';process.env.HANSE_GAME=path.join(root,'Hansefuerst_0_4.html');
const {create,hash}=require('./headless.cjs'),html=fs.readFileSync(process.env.HANSE_GAME,'utf8'),old=execFileSync('git',['show',base+':Hansefuerst_0_4.html'],{cwd:root,encoding:'utf8',maxBuffer:100000000}),key='hansefuerst-v04',clean=x=>JSON.parse(JSON.stringify(x));
function fixture(code='',source=null,seed=42){const g=create(seed,source),store={};g.eval(code);g.context.localStorage={getItem:k=>store[k]??null,setItem(k,v){store[k]=v}};g.context.notice=t=>{g.notice=t};g.context.alert=t=>{g.alert=t};g.context.openSheet=(title,html)=>{g.sheet={title,html}};g.store=store;g.sync=()=>store[key]=g.eval('JSON.stringify(s)');g.sync();return g}
function project(x){const y=clean(x);delete y.information.letters;y.information.version=1;y.v=12;return y}
function waitOffer(g){const d=g.eval('s.information.letters.nextDay-totalDay()');g.eval('advance('+d+');validate(s)');g.sync();return clean(g.eval('s.information.letters.offer'))}
module.exports={root,base,create,hash,html,old,key,clean,fixture,project,waitOffer};
