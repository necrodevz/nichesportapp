module.exports = function(ctx, cb) {
  if (ctx.headers.authorization && ctx.headers.authorization.split(":")[1] == ctx.secrets.minicheSecretKey){
    var data = ctx.body.data
    var defaultStatus = [ 'APPROVEDBYATHLETE', 'APPROVEDBYCOACH', 'APPROVEDBYINSTITUTE']
    var request = require('request-promise');
    const endpoint = 'https://api.graph.cool/simple/v1/cj32ti8u8khzz0122jd4cwzh6'
    const query = '{ Event(id:"'+data.id+'"){ id name institute{ owner{ firstName} } teams{ id team{ coach{ user{ id } } atheletTeams{ status athlete{ user{ id } } } } } } }'

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
      var teams = response['Event']['teams']
      for (var key in teams) {
        var atheletTeams = teams[key]['team']['atheletTeams']
        var EventTeamId = teams[key]['id']
        var CoachUserId = teams[key]['team']['coach']['user']['id']
        var instituteName = response['Event']['institute']['owner']['firstName']
        var eventName = response['Event']['name']
        
        mutation = 'mutation {  createNotification( userId: "'+ CoachUserId +'"    type: "EventTeam" typeId:"'+ EventTeamId +'"  title: "'+instituteName+' has created '+eventName+'"  ) {    id  }}'
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
        
        for (var key in atheletTeams) {
          if (defaultStatus.indexOf(atheletTeams[key]['status']) === -1) {
            console.log("atheletTeams key doesn't exist");
          }
          else {
            var user_id = atheletTeams[key]['athlete']['user']['id']
          
            mutation = 'mutation {  createNotification( userId: "'+ user_id +'"    type: "EventTeam" typeId:"'+ EventTeamId +'"  title: "'+instituteName+' has created '+eventName+'"  ) {    id  }}'
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
      }
      cb(null, {"status":"Notification has been Created successfully!"} )
    })
  }
  else{
    cb(null, {"status":"Authorization Error"});
  }
};