var bcrypt = require('bcrypt');
var randomstring = require("randomstring");
// socket.handshake.session to get the session

module.exports = function(io, mongoose) {

   var User = mongoose.model('User', {
      fullName: String,
      email: String,
      password: String
   });
   var Polls = mongoose.model('Polls', {
      _id: String,
      title: String,
      owner: mongoose.Schema.Types.ObjectId,
      polls: [{
         pollType: String,
         question: String,
         answers: [{
            answer: String,
            correct: Boolean
         }]
      }]
   });

   io.on('connection', function (socket) {

      socket.on('disconnect', function(){ console.log('user disconnected') });

      socket.on('register', function (message) {
         var errors = [];
         // the full name can't be less thant 4 chars
         if (message.fullName.length < 4) { errors.push('Your full name seems too short') }
         // the email should be validated
         var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         if (!re.test(message.email)) { errors.push('Email is not valid') }
         // the password should be at lest 8 chars
         if (message.password < 8) { errors.push('Password should be at least 8 characters') }
         // check if email does already exists
         User.find({email: message.email}, function (err, data) {
            if (err) return console.log(err);
            if (data.length > 0) { errors.push('User already exists') }
            if (errors.length > 0) { socket.emit('register-refused', errors) }
            else {
               bcrypt.hash(message.password, 10, function(err, hash) {
                  var user = new User({
                     fullname: message.fullName,
                     email: message.email,
                     password: hash
                  });
                  user.save(function (err, user) {
                     if (err) return console.error(err);
                     socket.handshake.session.user = user._id;
                     if (message.stayConnected) { socket.handshake.session.save() }
                     socket.emit('register-accepted');
                  });
               });
            }
         });
      });

      socket.on('connection', function (message) {
         User.findOne({email: message.email}, function(err, user) {
            if(err) return next(err);
            if (user) {
               bcrypt.compare(message.password, user.password, function(err, res) {
                  if (res) {
                     socket.handshake.session.user = user._id;
                     if (message.stayConnected) { socket.handshake.session.save() }
                     socket.emit('connection-accepted');
                  } else {
                     socket.emit('connection-refused', ['Wrong credentials']);
                  }
               });
            } else {
               socket.emit('connection-refused', ['Wrong credentials']);
            }
         });
      });

      socket.on('connection-state', function () {
         if (typeof socket.handshake.session.user != 'undefined') {
            socket.emit('connection-accepted');
         } else {
            socket.emit('connection-not-connected', ['You are not connected']);
         }
      });

      socket.on('connection-terminated', function () {
         delete socket.handshake.session.user;
         socket.handshake.session.save();
      });

      socket.on('polls-add-or-edit', function (polls) {
         if (typeof socket.handshake.session.user != 'undefined'){
            if (polls._id === null) { // new polls
               if (typeof polls.title == 'undefined' || polls.title === '') {
                  socket.emit('polls-add-refused', ['Polls should at least have a title']);
                  return;
               }
               (function addPolls() {
                  var validId = randomstring.generate({
                     charset: 'alphanumeric',
                     readable: true,
                     length: Math.floor(Math.random() * 6) + 1
                  });

                  Polls.count({_id: validId}, function (err, count){
                     if (err) {
                        socket.emit('polls-add-refused', ['An unknown error occurred, sorry !']);
                        return console.error(err);
                     }
                     if(count === 0) { // Random id does not exists
                        polls._id = validId;
                        // Add the owner in the backend for more security
                        polls.owner = socket.handshake.session.user;
                        var pollsDB = new Polls(polls);


                        pollsDB.save(function (err, polls) {
                           if (err) {
                              socket.emit('polls-add-refused', ['An unknown error occurred, sorry !']);
                              return console.error(err);
                           }
                           socket.emit('polls-add-accepted');
                        });
                     } else {
                        addPolls(); // retry new random id
                     }
                  });
               })();
            } else { // updating polls
               if (typeof polls.title == 'undefined' || polls.title === '') {
                  socket.emit('polls-edit-refused', ['Polls should at least have a title']);
                  return;
               }
               Polls.findOneAndUpdate({_id: polls._id}, polls, function(err, pollsDB) {
                  if (err) {
                     socket.emit('polls-edit-refused', ['An unknown error occurred, sorry !']);
                     return console.error(err);
                  }
                  if (pollsDB) {
                     socket.emit('polls-edit-accepted');
                  } else {
                     socket.emit('polls-edit-refused', ['Cant find the resquested polls']);
                  }
               });
            }
         }
      });

      socket.on('polls-simplified', function () {
         if (typeof socket.handshake.session.user != 'undefined'){
            // todo search items of current user and simplify them
            Polls.find({owner: socket.handshake.session.user}, function(err, pollsDB) {
               if (err) {
                  socket.emit('polls-simplified-refused', ['An unknown error occurred, sorry !']);
                  return console.error(err);
               }
               var simplifiedPolls = [];
               pollsDB.forEach(function(poll){
                  simplifiedPolls.push({
                     id: poll._id,
                     title: poll.title,
                     share: false,
                     titleHovered: false
                  });
               });
               socket.emit('polls-simplified-accepted', simplifiedPolls);
            });
         }
      });

      socket.on('polls-get', function (id) {
         if (typeof socket.handshake.session.user != 'undefined'){
            Polls.findOne({owner: socket.handshake.session.user, _id: id}, function(err, pollsDB) {
               if (err) {
                  socket.emit('polls-get-refused', ['An unknown error occurred, sorry !']);
                  return console.error(err);
               }
               if (pollsDB) {
                  delete pollsDB.owner;
                  socket.emit('polls-get-accepted', pollsDB);
               } else {
                  socket.emit('polls-get-refused', ['Could not find desired polls']);
               }
            });
         }
      });
   });
};
