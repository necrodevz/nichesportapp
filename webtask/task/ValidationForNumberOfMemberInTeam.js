module.exports = function(ctx, cb) {
  if (ctx.headers.authorization && ctx.headers.authorization.split(":")[1] == ctx.secrets.minicheSecretKey){
    var data = ctx.body.data
    var new_status = data.status
    var old_status = ""
    var approvedNumberOfAthelets = 0
    var totalNumberOfAthelets = 0
    var request = require('request')
    var response = {}
    var mutation1 = ""
    const endpoint = 'https://api.graph.cool/simple/v1/cj32ti8u8khzz0122jd4cwzh6'
    const query = '{ AtheletTeam(id:"'+data.id+'"){ status athlete{user{id firstName lastName}} team{ name institute{owner{id}} id totalNumberOfAthelets approvedNumberOfAthelets}}}'
    request.post({
      url: endpoint,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({query: query}),
    }).on('error', (e) => {
      console.log('Error liking post: ' + e.toString())
    }).on('data', (response) => {
      response = JSON.parse(response).data
      old_status = response['AtheletTeam']['status']
      team_id = response['AtheletTeam']['team']['id']
      approvedNumberOfAthelets = response['AtheletTeam']['team']['approvedNumberOfAthelets']
      totalNumberOfAthelets = response['AtheletTeam']['team']['totalNumberOfAthelets']
      var athelet_user_id = response['AtheletTeam']['athlete']['user']['id']
      var institute_user_id = response['AtheletTeam']['team']['institute']['owner']['id']
      var team_name = response['AtheletTeam']['team']['name']
      var athelet_name = response['AtheletTeam']['athlete']['user']['firstName'] + " " + response['AtheletTeam']['athlete']['user']['lastName']
      
      if( new_status == "APPROVEDBYCOACH" || new_status == "APPROVEDBYATHLETE" ){
        if (old_status == new_status){
          cb(null, {error: 'Sorry!, You already accepted this request' })
        }
        else{
          if (new_status!=old_status && parseInt(approvedNumberOfAthelets) >= parseInt(totalNumberOfAthelets)){
            cb(null, {error: 'Sorry!, You will not Accept this request due to total Number Of Athelets' })
          }
          else{
            approvedNumberOfAthelets = parseInt(approvedNumberOfAthelets) + 1
            const mutation = 'mutation{  updateTeam(  id:"'+team_id+'"  approvedNumberOfAthelets: '+approvedNumberOfAthelets+'  ){  id  }}'
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
              if (new_status == "APPROVEDBYCOACH"){
                 mutation1 = 'mutation {  createNotification( userId: "'+ athelet_user_id +'"    type: "AtheletTeam" typeId:"'+ data.id +'"  title: "'+team_name+' has accepted your request"  ) {    id  }}'
              }
              if(new_status == "APPROVEDBYATHLETE"){
                 mutation1 = 'mutation {  createNotification( userId: "'+ institute_user_id +'"    type: "AtheletTeam" typeId:"'+ data.id +'"  title: "'+athelet_name+' has accepted your request"  ) {    id  }}'
              }
              request.post({
                url: endpoint,
                headers: {
                  'content-type': 'application/json',
                },
                body: JSON.stringify({query: mutation1}),
              }).on('error', (e) => {
                console.log('Error liking post: ' + e.toString())
                cb(e, {})
              }).on('data', (response) => {
                cb(null, {"status":"Approved Number Of Athelets has been updated successfully!"} )
              })  
              
            })  
          }
        }
      }
      else{
        if (new_status == "REJECTEDBYCOACH"){
           mutation1 = 'mutation {  createNotification( userId: "'+ athelet_user_id +'"    type: "AtheletTeam" typeId:"'+ data.id +'"  title: "'+team_name+' has declined your request"  ) {    id  }}'
        }
        if(new_status == "REJECTEDBYATHLETE"){
           mutation1 = 'mutation {  createNotification( userId: "'+ institute_user_id +'"    type: "AtheletTeam" typeId:"'+ data.id +'"  title: "'+athelet_name+' has declined your request"  ) {    id  }}'
        }
        request.post({
          url: endpoint,
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({query: mutation1}),
        }).on('error', (e) => {
          console.log('Error liking post: ' + e.toString())
          cb(e, {})
        }).on('data', (response) => {
          cb(null, {"status":"Approved Number Of Athelets has been updated successfully!"} )
        })  
      }
    })
  }
  else{
    cb(null, {"status":"Authorization Error"});
  }
};