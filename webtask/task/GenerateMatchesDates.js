function combination(arr, num) {
  var r= [];

  for(var i = 0 ; i < arr.length ; i++) {
    if(num===1) r.push([arr[i]]);
    else {
      combination(arr.slice(i+1), num-1).forEach(function(val) {
        r.push([].concat(arr[i], val));
      });
    }
  }
  return r;
}

function addDays(theDate, days) {
  return new Date(theDate.getTime() + days*24*60*60*1000);
}

module.exports = function(ctx, cb) {
  var data = ctx.body.data;
  var numberOfTeams = data.numberOfTeams;
  var startDate = new Date(data.startDate);
  console.log(data);
  var eventId = data.id;
  var request = require('request-promise');
  const endpoint = 'https://api.graph.cool/simple/v1/cj32ti8u8khzz0122jd4cwzh6'
  const query = 'query{allEventTeams(filter:{event: {id: "'+ eventId +'"}}){id team{id}}}'
  
  var createEventDate = function (eventId, teamA, teamB, matchType, matchDate){
    var mutation = 'mutation{ createEventDate( eventId: "'+ eventId +'" teamAId: "'+ teamA +'" teamBId: "'+ teamB +'" matchType: '+ matchType + ' date: "'+ matchDate.toISOString() +'" ){ id } }';
    request.post({
      url: endpoint,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({query: mutation}),
    }).on('error', (e) => {
      console.log('Error createEventDate post: ' + e.toString())
    }).on('data', (response) => {
      console.log(JSON.parse(response))
    })
  }

  var scheduleMatchOfTeams = function(teamsList, matchType, startDate){
    var teamCombinations = combination(teamsList, 2);
    teamCombinations.forEach(function(twoTeams, idx){
      var teamA = twoTeams[0];
      var teamB = twoTeams[1];
      var matchDate = addDays(startDate, idx);
      console.log('\nteam1 ', teamA, '\nteam2 ', teamB, '\nmatchDate', matchDate.toISOString())
      createEventDate(eventId, teamA, teamB, matchType, matchDate);
    })
  }

  request.post({
    url: endpoint,
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({query: query}),
  }).on('error', (e) => {
    console.log('Error liking post: ' + e.toString());
    cb(e, {})
  }).on('data', (response) => {
    response = JSON.parse(response).data;
    var allEventTeams = response['allEventTeams'];
    var teamIds = [];
    allEventTeams.forEach(function(key){
      teamIds.push(key.team.id);
    })
    var poolATeams = teamIds.slice(0, numberOfTeams/2);
    var poolBTeams = teamIds.slice(numberOfTeams/2);
    console.log('\npoolATeamCombinations');
    scheduleMatchOfTeams(poolATeams, 'POOLA', startDate);
    console.log('\npoolBTeamCombinations')
    scheduleMatchOfTeams(poolBTeams, 'POOLB', startDate);
    console.log(response['allEventTeams'])
  })
    
  cb(null, {"status":"Matchdates has been Created successfully!"} )
};