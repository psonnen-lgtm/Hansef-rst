// Controlled post-title regression, not a regular economic comparison case.
const fs=require('node:fs'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process'),{fixture,cycle,sail}=require('./politics-checks.cjs'),{create,hash}=require('./headless.cjs');
function postTitleFixture(){const g=fixture();for(let i=0;i<4;i++)cycle(g);assert(g.eval('runMayorElection()'));cycle(g);cycle(g);for(const c of [1,2,10]){cycle(g,c);assert(g.eval('requestPoliticalEndorsement()'))}sail(g,0);assert(g.eval('acceptHanseAgreement()'));for(const c of [1,10]){sail(g,c);assert(g.eval('witnessHanseAgreement()'))}sail(g,0);assert(g.eval('finishHanseAgreement()'));assert(g.eval('runHanseAssembly()'));
assert(g.eval('runMayorElection()'));cycle(g);cycle(g);assert(g.eval('politicalOfficeProof()'));return g;}
if(require.main===module){const g=postTitleFixture();
const originalProofEnd=g.eval('s.politics.terms[0].end'),eldermanDay=g.eval('s.politics.elderman.day');
const state=JSON.parse(g.eval('JSON.stringify(s)')),h=create(42);h.context.archived=state;h.eval('s=migrate(archived)');assert(h.eval('!!s'));
const acceptedVoluntaryExit=g.eval('resignMayor()');h.eval('advance(s.politics.office.until-totalDay())');const passiveLoadValid=h.eval('migrate(s)!==null'),afterPassiveProofEnd=h.eval('s.politics.terms[0].end');
const expectBug=process.argv.includes('--expect-bug');assert.equal(acceptedVoluntaryExit,!expectBug);assert.equal(passiveLoadValid,!expectBug);if(!expectBug){assert.equal(afterPassiveProofEnd,originalProofEnd);assert.equal(h.eval('s.rank'),4);assert.equal(h.eval('s.politics.elderman.day'),eldermanDay)}
const result={kind:'controlled_post_title_regression_not_full_game',gameCommit:execFileSync('git',['log','-1','--format=%H','--','Hansefuerst_0_4.html'],{encoding:'utf8'}).trim(),gameSHA256:hash,expectBug,originalProofEnd,eldermanDay,acceptedVoluntaryExit,passiveLoadValid,afterPassiveProofEnd,passed:true};
assert(process.argv[2]);fs.writeFileSync(process.argv[2],JSON.stringify(result,null,2)+'\n',{flag:'wx'});console.log(expectBug?'CONFIRMED old proven tenure overwrite blocks resignation and invalidates later save':'PASS first proven tenure and Eldermann title survive renewed local office, resignation and expiry');

}
module.exports={postTitleFixture};
