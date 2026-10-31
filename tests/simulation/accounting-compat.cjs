// Test-only normalization of the exact Phase-1.6b accounting edits.
// Historical behavior/source guards remain strict for everything else.
module.exports=source=>source
 .replace('cost=q.costs[j],completedBefore=s.completed,goldBefore=s.gold;', 'cost=q.costs[j];')
 .replace('metrics.quests+=s.completed-completedBefore;metrics.questProfit+=s.gold-goldBefore-sold*s.markets[s.city][j].price;', '')
 .replace('if(q){s.active=0;', 'if(q){const before=s.completed; s.active=0;')
 .replace('tx(q.j,q.n,-1);}}dest=-1;', 'tx(q.j,q.n,-1);if(s.completed>before){metrics.quests++;metrics.questProfit+=q.reward;}}}dest=-1;');
