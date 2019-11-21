'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
  grunt.initConfig({

    dirs: {
      // configurable paths
      dist: 'dist',

      //child projects
      sapApi: 'sap-api'
    },
    
    hub: {
      api: {
        src: ['<%= dirs.sapApi %>/Gruntfile.js'],
        tasks: ['build'],
      }
    }
  });


  grunt.registerTask('buildSubprojects', [
    'hub:api'
  ]);


  grunt.registerTask('default', [
    'buildSubprojects'
  ]);
}
