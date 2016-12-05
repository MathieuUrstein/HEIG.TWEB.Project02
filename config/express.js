var express = require('express');
var glob = require('glob');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');

module.exports = function(app, config) {
   // Define environment local variable
   var env = config.env;
   app.locals.ENV = env;
   app.locals.ENV_DEVELOPMENT = env == 'development';

   // Set express views options
   app.set('views', config.root + '/app/views');
   app.set('view engine', 'ejs');

   // Inject all dependencies
   // app.use(favicon(config.root + '/public/img/favicon.ico'));
   app.use(logger('dev'));
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({
      extended: true
   }));
   app.use(compress());
   app.use('/public', express.static(config.root + '/static/public'));
   app.use(methodOverride());

   // Import all models
   var models = glob.sync(config.root + '/app/models/*.js');
   models.forEach(function (model) {
      require(model);
   });

   // Import all controllers
   var controllers = glob.sync(config.root + '/app/controllers/*.js');
   controllers.forEach(function (controller) {
      require(controller)(app);
   });

   // If no controllers fits the request, return 404
   app.use(function (req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
   });

   // If development environment, render errors
   if(app.get('env') === 'development'){
      app.use(function (err, req, res, next) {
         res.status(err.status || 500);
         res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
         });
      });
   }

   // If not development, render status without errors
   app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
         message: err.message,
         error: {},
         title: 'error'
      });
   });

   return app;
};
