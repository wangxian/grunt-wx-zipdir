/*
 * grunt-wx-zipdir
 * https://github.com/wangxian/grunt-wx-zipdir
 *
 * Copyright (c) 2013 wangxian
 * Licensed under the MIT license.
 */

'use strict';
var fs  = require("fs");
var zip = new require('node-zip')();

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
      grunt.file.recurse(v, function(abspath, rootdir, subdir, filename){
        var _exclude = option.exclude.filter(function(vt){
          return abspath.indexOf(vt) !== -1;
        });
        // console.log(abspath);

        // exclude files
        if(_exclude.length < 1){
          grunt.file.copy(abspath, target +'/'+ abspath);
        }
      });
      grunt.log.ok('Copy directoriy:'+ v);

      // Start add zip files
      grunt.file.recurse(target, function(abspath, rootdir, subdir, filename){
        // console.log(abspath);
        var input = fs.readFileSync(abspath, 'binary');
        zip.file(abspath, input, {binary: true});
      });

      var data = zip.generate({base64:false,compression:'DEFLATE'});
      var zipfilename = option.dest + target +'-'+ pkginfo.version +'.zip';

      // console.log(zipfilename);
      grunt.log.ok('Write zip file to:'+ zipfilename);
      grunt.file.write(zipfilename, data, {encoding: 'binary'});

      grunt.verbose.ok('Clean zip tmp dir:'+ target);
      grunt.file.delete(target);
    });
  });

};
