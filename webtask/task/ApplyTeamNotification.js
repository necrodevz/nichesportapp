module.exports = function(ctx, cb) {
  if (ctx.headers.authorization && ctx.headers.authorization.split(":")[1] == ctx.secrets.minicheSecretKey){
    var data = ctx.body.data
    var request = require('request');
    const endpoint = 'https://api.graph.cool/simple/v1/cj32ti8u8khzz0122jd4cwzh6'
    const query = '{AtheletTeam(id :"'+ data.id +'"){id status athlete{user{id firstName lastName}} team{coach{user{id firstName lastName}}} team{institute{owner{id}}}}}'
    
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
      const status = response['AtheletTeam']['status'];
      var user_id = 0
      var mutation = ""
      var athlete_name = response['AtheletTeam']['athlete']['user']['firstName'] + " " + response['AtheletTeam']['athlete']['user']['lastName'];
      var team_name = response['AtheletTeam']['team']['name']
      var coach_name =  response['AtheletTeam']['team']['coach']['user']['firstName'] + " " + response['AtheletTeam']['team']['coach']['user']['lastName'];

      if (status == "COACHPENDING" ){
        user_id = response['AtheletTeam']['team']['coach']['user']['id'];
        mutation = 'mutation {  createNotification( userId: "'+ user_id +'"    type: "AtheletTeam" typeId:"'+ data.id +'"  title: "'+athlete_name+' has sent request to join '+ team_name +'") {id}}'
      }
      if (status == "ATHLETEPENDING" ){
        user_id = response['AtheletTeam']['athlete']['user']['id'];
        mutation = 'mutation {  createNotification( userId: "'+ user_id +'"    type: "AtheletTeam" typeId:"'+ data.id +'"  title: "Coach '+coach_name+' has sent request to join '+team_name+'"  ) {    id  }}'
      }
      request.post({
        url: endpoint,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({query: mutation}),
      }).on('error', (e) => {
        console.log('Error liking post: ' + e.toString())
        cb(e, {})
      }).on('data', (response) => {
        console.log(JSON.parse(response))
        cb(null, {"status":"Notification has been Created successfully!"} )
      })   
    })
  }
  else{
    cb(null, {"status":"Authorization Error"});
  }
};