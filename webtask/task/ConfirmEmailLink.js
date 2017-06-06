module.exports = function(ctx, cb) {
  var sendgrid = require("sendgrid")("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")
  var data = ctx.data
  var token = data.token
  if (typeof token === "undefined") {
      cb(null, 'Token is requied in url!')
  }
  
  var request = require('request');
  const endpoint = 'https://api.graph.cool/simple/v1/cj32ti8u8khzz0122jd4cwzh6'
  const query = '{ allUsers(first:1,filter: {resetPasswordToken: "'+token+'"}) { id role resetPasswordToken email emailVerified }}'

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
    data = response['allUsers'][0]
    if (typeof data === "undefined") {
      cb(null, 'Your token seems like expired or wrong, Please resend it and confirm the same!')
    }
    else{
      if(data.resetPasswordToken ==  token && data.emailVerified === false){
        const mutation = 'mutation {updateUser(id: "'+data.id+'", emailVerified: true) {id }}'
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
          console.log(JSON.parse(response).data)
          
          if(data.role == "ATHLETE"){
            html = "<h2>Congrats dear Athlete!</h2><br/><br/><p>You’re officially a part of Miniche Sports.</p><p>We hope you use it to serve your purposes.</p><p>And feel free to shoot us a line anytime, good or bad — we’re always looking to improve the app, so every little helps. You can always get in touch at support.</p><br/><br/><h3>Yours truly,</h3><h3>The Miniche Sports Team</h3>"
          }
          else{
            if(data.role == "OWNER"){
              html = "<h2>Congrats dear Institute!</h2><br/><br/><p>You’re officially a part of Miniche Sports.</p><p>We hope you use it to serve your purposes.</p><p>And feel free to shoot us a line anytime, good or bad — we’re always looking to improve the app, so every little helps. You can always get in touch at support.</p><br/><br/><h3>Yours truly,</h3><h3>The Miniche Sports Team</h3>"
            }
            else{
              if(data.role == "COACH"){
                html = "<h2>Congrats dear Coach!</h2><br/><br/><p>You’re officially a part of Miniche Sports.</p><p>We hope you use it to serve your purposes.</p><p>And feel free to shoot us a line anytime, good or bad — we’re always looking to improve the app, so every little helps. You can always get in touch at support.</p><br/><br/><h3>Yours truly,</h3><h3>The Miniche Sports Team</h3>"
              }
              else{
                html = ""
              }
            }
          }
          var email = new sendgrid.Email({
            to: data.email,
            from: "miniche@yopmail.com",
            subject: "Welcome to Miniche Sports!",
            html: html
          });
          sendgrid.send(email, function(err, json) {
           if (err) { 
             cb(err);
           } else { 
             cb(null, "Your message has been submitted!");
           }
          });
          cb(null, 'Your email has been confirmed successfully')
        })
      }
      else{
          cb(null, 'Your token seems like expired or wrong, Please resend it and confirm the same!')
      } 
    }
  })
};