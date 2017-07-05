module.exports = function(context, callback){
  var email = context.query.email;
  var password = context.query.password;
  var request = require("request");
  
  var options = { method: 'POST',
    url: 'https://rajiv.au.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: 
     { 
       grant_type: 'client_credentials', 
       scope: "openid",
       client_id: 'eTdwhzSAxZlcZovf5KG26f4vS1K4lLcr',
       client_secret: '2EOb1KdRl1kt-QNxwzOgh8qi_gx2QPZKwh3cjZyqT4G7yL_bNwhdIJTjnL_osNlP',
       audience: 'https://rajiv.au.auth0.com/api/v2/' },
    json: true };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
console.log(body['access_token']);
    var options = { method: 'POST',
      url: 'https://rajiv.au.auth0.com/dbconnections/signup',
      headers: { 'content-type': 'application/json' },
      body: { clientId: 'LGxdgJxMixOhkW03OpbBT5I4KNVoXO9b',
      connection:"Username-Password-Authentication",
      responseType: "token" ,
      scope: "openid",
         email: email,
         password: password },
      json: true };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
     
     
     var options = { method: 'POST',
  url: 'https://rajiv.au.auth0.com/oauth/ro',
  body: '{"client_id": "eTdwhzSAxZlcZovf5KG26f4vS1K4lLcr","connection": "Username-Password-Authentication","grant_type": "password","username": "'+email+'","password": "'+password+'","scope": "openid"}',
  headers: {'content-type': 'application/json'} };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  callback(null, body);
});

     
    });
  });  
}