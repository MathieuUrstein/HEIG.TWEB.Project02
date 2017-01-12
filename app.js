var express = require('express');
var config = require('./config/config');
var glob = require('glob');
var mongoose = require('mongoose');

// Connect to database
/*
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
   throw new Error('unable to connect to database at ' + config.db);
});
*/

// Instantiate express
var app = express();
var server = require('http').Server(app);
// Instantiate socket.io
var io = require('socket.io')(server);

// Start app
server.listen(config.port, function () {
   console.log('Express server listening on port ' + config.port);
});

// Bootstrap express with needed dependencies
module.exports = require('./config/express')(app, config);

io.on('connection', function (socket) {
   console.log('user connected');

   socket.on('disconnect', function(){
      console.log('user disconnected');
   });

   socket.on('client-emission', function(message) {
         io.emit('server-emission', {type:'new-message', text: message});
   });
});
