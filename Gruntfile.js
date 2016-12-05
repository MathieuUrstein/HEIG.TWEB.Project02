var reloadPort = 35729;

module.exports = function (grunt) {
   // load all grunt tasks
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-sass');
   grunt.loadNpmTasks("grunt-ts");
   grunt.loadNpmTasks('grunt-develop');
   grunt.loadNpmTasks('grunt-contrib-watch');

   grunt.initConfig({
      develop: {
         server: {
            file: 'app.js'
         }
      },
      copy: {
         bootstrap: {
            expand: true,
            cwd: 'node_modules/bootstrap/scss/',
            src: '**',
            dest: 'static/styles/bootstrap'
         },
         zone: {
            expand: true,
            cwd: 'node_modules/zone.js/dist/',
            src: 'zone.js',
            dest: 'static/public/angular/dependencies'
         },
         reflect: {
            expand: true,
            cwd: 'node_modules/reflect-metadata/',
            src: 'Reflect.js',
            dest: 'static/public/angular/dependencies'
         },
         system: {
            expand: true,
            cwd: 'node_modules/systemjs/dist/',
            src: 'system.src.js',
            dest: 'static/public/angular/dependencies'
         },
         rxjs: {
            expand: true,
            cwd: 'node_modules/',
            src: 'rxjs/**',
            dest: 'static/public/angular/dependencies'
         },
         angularBundles: {
            expand: true,
            cwd: 'node_modules/',
            src: '@angular/**',
            dest: 'static/public/angular/dependencies/'
         },
         angularTemplates: {
            expand: true,
            cwd: 'static/angular/',
            src: '**/*.html',
            dest: 'static/public/angular/'
         },
         systemjsConfig: {
            expand: true,
            cwd: 'static/angular/',
            src: 'systemjs.config.js',
            dest: 'static/public/angular/'
         }
      },
      sass: {
         bootstrap: {
            files: {
               'static/public/styles/styles.css': 'static/styles/styles.scss'
            }
         },
         angular: {
            files: [{
               expand: true,
               cwd: 'static/angular/',
               src: ['**/*.scss'],
               dest: 'static/public/angular',
               ext: '.css'
            }]
         }
      },
      ts: {
         angular : {
            src: 'static/angular/app/**/*.ts',
            dest: 'static/public/angular/app/',
            options: {
               target: 'es6',
               module: 'commonjs',
               moduleResolution: 'node',
               sourceMap: true,
               emitDecoratorMetadata: true,
               experimentalDecorators: true,
               lib: [ 'es2015', 'dom' ],
               noImplicitAny: true,
               suppressImplicitAnyIndexErrors: true,

               fast: 'always'
            }
         }
      },
      watch: {
         options: {
            spawn: false,
            livereload: { liveCSS: false }  // disable CSS injection
         },
         jsBackend: {
            files: [
               'app.js',
               'app/**/*.js',
               'config/*.js'
            ],
            tasks: ['develop', 'delayed-livereload']
         },
         frontend: {
            files: [
               'static/public/**/*.js',
               'static/public/**/*.html',
               'static/public/**/*.css'
            ],
            options: {
               livereload: reloadPort
            }
         },
         css: {
            files: [
               'static/styles/*.scss'
            ],
            tasks: ['sass'],
            options: {
               livereload: reloadPort
            }
         },
         views: {
            files: [
               'app/views/**/*.ejs'
            ],
            options: {
               livereload: reloadPort
            }
         },
         ts: {
            files: [
               'static/angular/**/*.ts'
            ],
            tasks: ['ts']
         },
         angularTemplates: {
            files: [
               'static/angular/**/*.html'
            ],
            tasks: ['copy:angularTemplates']
         },
         angularStyles: {
            files: [
               'static/angular/**/*.scss'
            ],
            tasks: ['sass:angular']
         }
      }
   });

   // Make de delayed if needed (when app restarted for example)
   grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
      var request = require('request');
      var done = this.async();
      setTimeout(function () {
         request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
            var reloaded = !err && res.statusCode === 200;
            if (reloaded)
               grunt.log.ok('Delayed live reload successful.');
            else
               grunt.log.error('Unable to make a delayed live reload.');
            done(reloaded);
         });
      }, 500);
   });

   grunt.registerTask('default', [
      'copy',
      'sass',
      'ts',
      'develop',
      'watch'
   ]);
};
