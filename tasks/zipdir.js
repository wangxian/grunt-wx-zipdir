/*
 * grunt-wx-zipdir
 * https://github.com/wangxian/grunt-wx-zipdir
 *
 * Copyright (c) 2013 wangxian
 * Licensed under the MIT license.
 */

'use strict';
var fs   = require("fs");
var path = require("path");
var exec = require('child_process').exec;

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('zipdir', 'Zip directory.', function() {
    var pkginfo = grunt.file.readJSON('package.json');
    var option  = this.data;
    var target  = this.target;

    if (option.dist != null) {
      option.dist = './';
    }

    if( grunt.util.kindOf(option.src) !== 'array') {
      grunt.log.error('initConfig Option src is not array.');
      return false;
    }

    option.src.forEach(function(v){
      grunt.log.ok('Copy directoriy '+ v +' -> '+ target);
      grunt.file.recurse(v, function(abspath, rootdir, subdir, filename){
        var _exclude = option.exclude.filter(function(vt){
          return abspath.indexOf(vt) !== -1;
        });
        // console.log(abspath);

        // exclude files
        var copyto = ( target +'/'+ abspath).replace(/\.\.\//g, '');
        if(_exclude.length === 0){
          // console.log( copyto );
          grunt.file.copy(abspath, copyto);
        }
      });
    });

    // Start add zip files
    if(! option.zipbin) {
      option.zipbin = 'zip';
    }

    var done = this.async();
    grunt.log.ok(option.zipbin +' -r '+ option.dest +' '+ target+'/');

    grunt.file.write(path.dirname(option.dest)+'/tmp', '');
    exec(option.zipbin +' -r '+ option.dest +' '+ target +'/', function(error, stdout, stderr){
      if (error !== null) {
        grunt.log.error('exec error: '+ error);
      }
      else {
        grunt.verbose.ok('stdout: '+ stdout);
        grunt.verbose.ok('stderr: '+ stderr);

        grunt.log.ok('Clean zip tmp dir -> '+ target +'/');
        grunt.file.delete(target);
        grunt.file.delete(path.dirname(option.dest) +'/tmp', {force: true});
        done(true);
      }
    });

  });

};
