var http = require('http');
var path = require('path');
var express = require('express');

// Create Express webapp
var app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/',function(req,res){
    res.sendFile('index.html');
});

module.exports = app;

// Create http server and run it
var server = http.createServer(app);
var port = process.env.PORT || 3000;
server.listen(port, function() {
    console.log('Express server running on *:' + port);
});
