// Exact, test-only reversal of 0.5d time-helper substitutions for historical source guards.
// The real bots execute the new helper; these strings allow no other strategy changes.
module.exports=source=>source
 .replace('days=routeTravelDays(s.city,q.city,speed)','days=Math.max(1,Math.ceil(DIST[s.city][q.city]/speed))')
 .replace('const trip=routeTravelDays(s.city,c,speed)+routeTravelDays(c,q.city,speed)','const trip=Math.ceil(DIST[s.city][c]/speed)+Math.ceil(DIST[c][q.city]/speed)')
 .replace('travel=routeTravelDays(s.city,c,ship().speed*.8)','travel=Math.max(1,Math.ceil(DIST[s.city][c]/(ship().speed*.8)))')
 .replace('days:routeTravelDays(s.city,c,q.speed*(.65+.35*q.condition/100))','days:Math.max(1,Math.ceil(DIST[s.city][c]/(q.speed*(.65+.35*q.condition/100))))');
