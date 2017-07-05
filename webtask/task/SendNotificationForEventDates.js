module.exports = function(ctx, cb) {
  if (ctx.headers.authorization && ctx.headers.authorization.split(":")[1] == ctx.secrets.minicheSecretKey){
    var data = ctx.body.data
    var request = require('request-promise');
    const endpoint = 'https://api.graph.cool/simple/v1/cj32ti8u8khzz0122jd4cwzh6'
    const query = 'query{ EventDate(id:"'+ data.id +'"){ matchType event{ name } teamA{ name atheletTeams{ athlete{ user{ id } } } } teamB{ name atheletTeams{ athlete{ user{ id } } } } } }'
    request.post({
      url: endpoint,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({query: query}),
    }).on('error', (e) => {
      console.log('Error liking post: ' + e.toString())
      cb(e, {})
    }).on('data', (response) => {
      response = JSON.parse(response).data
      var EventDate = response["EventDate"];
      var matchType = EventDate["matchType"];
      if( matchType == "FINAL" || matchType == "SEMIFINAL"){
        var teamA = EventDate["teamA"]['atheletTeams'];
        var teamB = EventDate["teamB"]['atheletTeams'];
        var event_name = EventDate["event"]['name'];
        var teamB_name = EventDate["teamB"]['name'];
        var teamA_name = EventDate["teamA"]['name'];
        console.log(teamA)
        for (var key in teamA) {
          var user_id = teamA[key]["athlete"]["user"]["id"]
          mutation = 'mutation {  createNotification( userId: "'+ user_id +'"    type: "EventDate" typeId:"'+ data.id +'"  title: "Your Team '+teamA_name+' has selected for '+matchType+' in '+event_name+'") {    id  }}'
          request.post({
            url: endpoint,
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({query: mutation}),
          }).on('error', (e) => {
            console.log('Error liking post: ' + e.toString())
          }).on('data', (response) => {
            console.log(JSON.parse(response))
          })  
        }
        for (var key in teamB) {
          var user_id = teamB[key]["athlete"]["user"]["id"]
          mutation = 'mutation {  createNotification( userId: "'+ user_id +'"    type: "EventDate" typeId:"'+ data.id +'"  title: "Your Team '+teamB_name+' has selected for '+matchType+' in '+event_name+'") {    id  }}'
          request.post({
            url: endpoint,
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({query: mutation}),
          }).on('error', (e) => {
            console.log('Error liking post: ' + e.toString())
          }).on('data', (response) => {
            console.log(JSON.parse(response))
          })  
        }
      }
    })
    cb(null, {"status":"Notification has been Created successfully!"} )
  }
  else{
    cb(null, {"status":"Authorization Error"});
  }
};