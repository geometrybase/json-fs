/*jslint es5:true, indent:2, maxlen:80, node:true*/
'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({

    jslint: {
      all: {
        src: [
          '**/*.js',
          '**/*.json',
        ],
        exclude: [
//          'test/**/*',
          'node_modules/**/*'
        ],
        options: {
          errorsOnly: true,
          failOnError: true
        }
      }
    },

    mochacli: {
      options: {
        require: ['chai'],
        ui: 'tdd'
      },
      all: ['test/*.js']
    },

    mochacov: {
      html: {
        options: {
          reporter: 'html-cov',
          output: 'coverage.html'
        }
      },
      coveralls: {
        options: {
          coveralls: {
            serviceName: 'travis-ci'
          }
        }
      },
      options: {
        require: ['chai'],
        ui: 'tdd'
      },
      all: ['test/*.js']
    },

    watch: {
      scripts: {
        files: [
          '<%= jslint.all.src %>'
        ],
        tasks: ['test'],
        options: {
          interrupt: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.loadNpmTasks('grunt-mocha-cov');

  grunt.registerTask('travis', ['jslint', 'mochacli', 'mochacov:coveralls']);
  grunt.registerTask('test', ['jslint', 'mochacli', 'mochacov:html']);

  // Default task.
  grunt.registerTask('default', ['test']);

};
