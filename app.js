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

// Bootstrap express with needed dependencies
module.exports = require('./config/express')(app, config);

// Start app
app.listen(config.port, function () {
   console.log('Express server listening on port ' + config.port);
});

