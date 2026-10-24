// Separate analysis policy. Real Lübeck start; normal reserve policy, observed prices only.
// A fixed tour deliberately visits every city, instead of optimizing the destination.
function simulatePhase05eRemote(maxDays=1440,maxDecisions=800){
 const tour=[1,8,10,6,0,2,3,4,5,7,9,0],original=planObserved;let leg=0;
 planObserved=(unused,view)=>{const city=tour[leg++%tour.length],destination=view.destinations.find(d=>d.city===city);if(!destination)throw Error('remote tour destination absent');return original('normal',{...view,destinations:[destination]})};
 try{return {...simulateObserved('normal',maxDays,maxDecisions),strategy:'remote',tour,information:'local_and_journal',destinationPolicy:'fixed_water_network_tour'}}finally{planObserved=original}
}
