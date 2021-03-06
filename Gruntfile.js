/* 'use strict';

process.title = 'grunt';

var Liftoff = require('liftoff');
var v8flags = require('v8flags');
var extensions = require('interpret').jsVariants;
var nopt = require('nopt');
var gruntOptions = require('grunt-known-options');
var completion = require('../lib/completion.js');
var info = require('../lib/info.js');
var pkg = require('../package.json');

// Parse `gruntOptions` into a form that nopt can handle.
var aliases = {};
var known = {};

Object.keys(gruntOptions).forEach(function(key) {
  var short = gruntOptions[key].short;
  if (short) {
    aliases[short] = '--' + key;
  }
  known[key] = gruntOptions[key].type;
});

// Parse them and return an options object.
var options = nopt(known, aliases, process.argv, 2);

if ('completion' in options) {
  completion.print(options.completion);
} else if (options.version) {
  console.log('grunt-cli v' + pkg.version);
}

v8flags(function (err, v8flags) {
  var Grunt = new Liftoff({
    name: 'grunt',
    configName: 'Gruntfile',
    // Support a number of languages based on file extension
    extensions: extensions,
    // Flags that are v8 flags will be loaded into node instead of Gruntfile
    v8flags: v8flags
  });
  Grunt.launch({
    cwd: options.base,
    configPath: options.gruntfile,
    require: options.require,
    verbose: options.verbose
  }, function (env) {
    var tasks = options.argv.remain;
    delete options.argv;
    // No grunt install found!
    if (!env.modulePath) {
      if (options.version) {
        process.exit();
      }
      if (options.help) {
        info.help();
      }
      info.fatal('Unable to find local grunt.', 99);
    } else {
      options.gruntfile = env.configPath;
      var grunt = require(env.modulePath);
      grunt.tasks(tasks, options);
    }
  });
}); */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-war');
  // Project configuration.
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      war: {
          target: {
              options: {
                  war_dist_folder: 'd:/', /* Folder where to generate the WAR. */
                  war_name: 'angular2-webapp'                    /* The name fo the WAR file (.war will be the extension) */
              },
              files: [
                  {
                      expand: true,
                      cwd: 'dist',
                      src: ['**'],
                      dest: ''
                  }
              ]
          }
      }
  });

  grunt.registerTask('default', ['war']);
};