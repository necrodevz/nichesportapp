module.exports = function(ctx, cb) {
  var sendgrid = require("sendgrid")("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")
  var request = require('request');
  
  var data = ctx.data
  var email = data.email
  if (typeof email === "undefined") {
      cb(null, 'Email is requied in url!')
  }

  const endpoint = 'https://api.graph.cool/simple/v1/cj32ti8u8khzz0122jd4cwzh6'
  const query = '{User(email:"'+email+'"){ id }}'
    
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
    var user_id = response['User']['id']
    var token = Math.random().toString(36).substring(7);
    html = '<h2>Hello Dear</h2><p>Please click on this link and reset your password!</p><p>Link <a href="http://nichesportsappdev.herokuapp.com/resetPassword?token='+token+'">Here</a></p><h3>The Miniche Sports Team</h3>'
    var email = new sendgrid.Email({
      to: data.email,
      from: "miniche@yopmail.com",
      subject: "Reset Password Link!",
      html: html
    });
    sendgrid.send(email, function(err, json) {
      if (err) { 
        cb(err);
      }
      else { 
        const mutation = 'mutation{  updateUser(id:"'+ user_id +'" resetPasswordToken: "'+ token  +'"){id  }}'
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
          cb(null, {"status":"Reset Password Token has been updated successfully!"} )
        })         
      }
    });
  })
};