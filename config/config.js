var path = require('path');
var rootPath = path.normalize(__dirname + '/..');
var env = process.env.NODE_ENV || 'development';

var config = {
   development: {
      env: 'development',
      root: rootPath,
      app: {
         name: 'project02'
      },
      sessionSecret: process.env.SESSION_SECRET || '715402055ca2c1d51a15f39bbed3f786',
      port: process.env.PORT || 3000,
      db: process.env.MONGO_URI || 'mongodb://localhost/project02-development'
   },
   test: {
      env: 'test',
      root: rootPath,
      app: {
         name: 'project02'
      },
      sessionSecret: process.env.SESSION_SECRET || '715402055ca2c1d51a15f39bbed3f786',
      db: process.env.MONGO_URI || 'mongodb://localhost/project02-test'
   },
   production: {
      env: 'production',
      root: rootPath,
      app: {
         name: 'project02'
      },
      sessionSecret: process.env.SESSION_SECRET || '715402055ca2c1d51a15f39bbed3f786',
      db: process.env.MONGO_URI || 'mongodb://localhost/project02-production'
   }
};

module.exports = config[env];
