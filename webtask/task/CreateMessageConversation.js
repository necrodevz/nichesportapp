module.exports = function(ctx, cb) {
  if (ctx.headers.authorization && ctx.headers.authorization.split(":")[1] == ctx.secrets.minicheSecretKey){
    var sendgrid = require("sendgrid")(ctx.secrets.sendgridKey);
    var data = ctx.body.data;
    var request = require('request');
    const endpoint = 'https://api.graph.cool/simple/v1/cj32ti8u8khzz0122jd4cwzh6';
    const query = '{ Message( id:"'+data.id+'" ){ sender{id} reciver{id} msg } }';
    request.post({
      url: endpoint,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({query: query}),
    }).on('error', (e) => {
      console.log('Error liking post: ' + e.toString());
      cb(e, {});
    }).on('data', (response) => {
      response = JSON.parse(response).data;
      var message = response["Message"];
      var senderId = message["sender"]["id"];
      var reciverId = message["reciver"]["id"];
      var lastMsg = message["msg"];
      const query = '{ allMessageConversations(last:1 filter:{ sender:{ id:"'+senderId+'" } reciver:{ id:"'+reciverId+'" } } ){ id count } }';
      request.post({
        url: endpoint,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({query: query}),
      }).on('error', (e) => {
        console.log('Error liking post: ' + e.toString());
        cb(e, {});
      }).on('data', (response) => {
        response = JSON.parse(response).data;
        console.log(response);
        var allMessageConversations = response["allMessageConversations"];
        if(typeof allMessageConversations[0] === "undefined"){
          const mutation = 'mutation{ createMessageConversation( senderId:"'+senderId+'" reciverId:"'+reciverId+'" lastMsg:"'+lastMsg+'" ){ id } }';
          request.post({
            url: endpoint,
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({query: mutation}),
          }).on('error', (e) => {
            console.log('Error liking post: ' + e.toString());
            cb(e, {});
          }).on('data', (response) => {
            response = JSON.parse(response).data;
            console.log(response);
          });
        }
        else{
          var messageConversation = allMessageConversations[0];
          var count = messageConversation.count + 1;
          const mutation1 = 'mutation{  updateMessageConversation( id:"'+messageConversation.id+'" lastMsg:"'+lastMsg+'" count:'+count+' ){ id } }';
          request.post({
            url: endpoint,
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({query: mutation1}),
          }).on('error', (e) => {
            console.log('Error liking post: ' + e.toString());
            cb(e, {});
          }).on('data', (response) => {
            response = JSON.parse(response).data;
            console.log(response);
          });
        }
      });
    });
    cb(null, { hello: ctx.data.name || 'Anonymous' });
  }
};