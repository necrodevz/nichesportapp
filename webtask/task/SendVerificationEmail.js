module.exports = function(ctx, cb) {
  var sendgrid = require("sendgrid")("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")
  var data = ctx.body.data
  var html = ""
  if (data.role == "ATHLETE" ){
    html = "<h2>Dear Athlete,</h2><br/><br/><p>We are happy to welcome you in Miniche Sports!</p><p>Before you start, we kindly ask you to confirm your email address.</p><p>Please click <a href='https://wt-21eb92e1c95383d733a9816d60a7cc4e-0.run.webtask.io/confirm_email_ink?token="+ data.resetPasswordToken +"'>here</a></p><p>If you have any questions, please send us email. We will be happy to help!</p><br/><br/><h3>Thank you,</h3><h3>The Miniche sport team</h3>"
  }else{
    if(data.role == "COACH"){
      html = "<h2>Dear Coach,</h2><br/><br/><p>We are happy to welcome you in Miniche Sports!</p><p>Email id: "+ data.email +"</p><p>Password: "+ data.password +"</p><p>Before you start, we kindly ask you to confirm your email address.</p><p>Please click <a href='https://wt-21eb92e1c95383d733a9816d60a7cc4e-0.run.webtask.io/confirm_email_ink?token="+ data.resetPasswordToken +"'>here</a></p><p>If you have any questions, please send us email. We will be happy to help!</p><br/><br/><h3>Thank you,</h3><h3>The Miniche sport team</h3>"
    }else{
      if(data.role == "OWNER"){
        html = "<h2>Dear Institute,</h2><br/><br/><p>We are happy to welcome you in Miniche Sports!</p><p>Email id: "+ data.email +"</p><p>Password: "+ data.password +"</p><p>Before you start, we kindly ask you to confirm your email address.</p><p>Please click <a href='https://wt-21eb92e1c95383d733a9816d60a7cc4e-0.run.webtask.io/confirm_email_ink?token="+ data.resetPasswordToken +"'>here</a></p><p>If you have any questions, please send us email. We will be happy to help!</p><br/><br/><h3>Thank you,</h3><h3>The Miniche sport team</h3>"
      }
    }
  }
  var email = new sendgrid.Email({
    to: data.email,
    from: "miniche@yopmail.com",
    subject: "Confirm your email to activate your account",
    html: html
  });
  sendgrid.send(email, function(err, json) {
    if (err) { 
      cb(err);
    } else { 
      cb(null, {"status":"Your message has been submitted!"});
    }
  });
};