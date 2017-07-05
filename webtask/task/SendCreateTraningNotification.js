module.exports = function(ctx, cb) {
  if (ctx.headers.authorization && ctx.headers.authorization.split(":")[1] == ctx.secrets.minicheSecretKey){
    var data = ctx.body.data
    var defaultStatus = [ 'APPROVEDBYATHLETE', 'APPROVEDBYCOACH', 'APPROVEDBYINSTITUTE']
    var request = require('request-promise');
    const endpoint = 'https://api.graph.cool/simple/v1/cj32ti8u8khzz0122jd4cwzh6'
    const query = '{ Training( id:"'+data.id+'" ){ trainingTeams{ team{ coach{ user{ firstName lastName } } atheletTeams{ status athlete{ user{ id } } } } } } }'

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
      var TrainingTeams = response['Training']['trainingTeams']
      for (var key in TrainingTeams) {
        var atheletTeams = TrainingTeams[key]['team']['atheletTeams']
        var coachName = TrainingTeams[key]['team']['coach']['user']['firstName'] + " " +  TrainingTeams[key]['team']['coach']['user']['lastName']
        for (var key in atheletTeams) {
          if (defaultStatus.indexOf(atheletTeams[key]['status']) === -1) {
            console.log("Status doesn't exist");
          }
          else {
            var user_id = atheletTeams[key]['athlete']['user']['id']
            var EventTeamId = atheletTeams[key]['id']
          
            mutation = 'mutation {  createNotification( userId: "'+ user_id +'"    type: "TrainingTeam" typeId:"'+ EventTeamId +'"  title: "'+coachName+' has scheduled training sessions"  ) {    id  }}'
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