function addDays(theDate, days) {
  return new Date(theDate.getTime() + days*24*60*60*1000);
}

module.exports = function(ctx, cb) {
  var eventId = ctx.body.eventId;
  var team1 = ctx.body.team1;
  var team2 = ctx.body.team2;
  console.log(eventId, team1, team2);
  var request = require('request-promise');
  const endpoint = 'https://api.graph.cool/simple/v1/cj32ti8u8khzz0122jd4cwzh6'

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

  var query = 'query{ allEventDates(filter: { event:{ id:"'+ eventId +'" } } orderBy: date_DESC first : 1 ) { date } }';
  request.post({
    url: endpoint,
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({query: query}),
  }).on('error', (e) => {
    console.log('Error getting latest date: ' + e.toString());
    cb(e, {})
  }).on('data', (response) => {
    response = JSON.parse(response).data;
    console.log(response);
    var latestMatchDate = new Date(response.allEventDates[0].date);
    if (latestMatchDate !== undefined){
      console.log(latestMatchDate);
      var matchDate = addDays(latelatestMatchDate, 3);
      console.log(matchDate);
      createEventDate(eventId, poolA.team1, poolB.team1, 'SEMIFINAL', matchDate);
      createEventDate(eventId, poolA.team2, poolB.team2, 'SEMIFINAL', matchDate);
    }
  })  
  cb(null, { hello: ctx.data.name || 'Anonymous' });
};