var express = require('express');
var config = require('./config/config');
var glob = require('glob');

// Instantiate mongoDB
var mongoose = require('mongoose');
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
   throw new Error('unable to connect to database at ' + config.db);
});

// Instantiate express
var app = express();
var server = require('http').Server(app);

// Instantiate sessions
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var sessionMiddleware = session({
   resave: true,
   saveUninitialized: true,
   store: new MongoStore({mongooseConnection: db}),
   secret: config.sessionSecret,
   cookie: {
      httpOnly: false
   }
});
app.use(sessionMiddleware);

// Instantiate session with socket.io
ioSession = require("express-socket.io-session");

// Instantiate socket.io
var io = require('socket.io')(server);
io.use(ioSession(sessionMiddleware, {
   autoSave: true
}));
require('./app/messages')(io, mongoose);

// Start app
server.listen(config.port, function () {
   console.log('Express server listening on port ' + config.port);
});

// Bootstrap express with needed dependencies
module.exports = require('./config/express')(app, config);
