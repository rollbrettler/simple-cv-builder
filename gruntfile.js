module.exports = function(grunt){

    "use strict";
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        
        copy: {
          pictures: {
            src: 'pictures/*',
            dest: 'build/',
          },
          fonts: {
            expand: true,
            cwd: 'bower_components/font-awesome/fonts/',
            src: '**',
            dest: 'build/fonts/',
            flatten: true,
            filter: 'isFile',
          },
          htaccess: {
            src: '.htaccess',
            dest: 'build/'
          },
          manifest: {
            src: 'offline.manifest',
            dest: 'build/'
          },
        },
        uncss: {
          dist: {
            files: {
              'build/style.css': ['build/index.html','build/great-company.html']
              }
            }
        },
        
        cssc: {
            build: {
                options: {
                    consolidateViaDeclarations: true,
                    consolidateViaSelectors:    true,
                    consolidateMediaQueries:    true
                },
                files: {
                    'build/style.css': 'build/style.css'
                }
            }
        },

        cssmin: {
            build: {
                src: 'build/style.css',
                dest: 'build/style.css'
            }
        },

        less: {
          development: {
            options: {
              paths: ["less"]
            },
            files: {
              "style.css": "less/style.less"
            }
          },
          production: {
            options: {
              paths: ["less"],
              cleancss: true
            },
            files: {
              "build/style.css": "less/style.less"
            }
          }
        },

        watch: {
            html: {
                files: ['index.html'],
                tasks: ['htmlhint']
            },/*
            js: {
                files: ['assets/js/base.js'],
                tasks: ['uglify']
            },*/
            css: {
                files: ['less/style.less'],
                tasks: ['buildcss']
            }
        },

        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,                      
                    // Force tags to have a closing pair
                    'tagname-lowercase': true,             
                    // Force tags to be lowercase
                    'attr-lowercase': true,                
                    // Force attribute names to be lowercase e.g. <div id="header"> is invalid
                    'attr-value-double-quotes': true,      
                    // Force attributes to have double quotes rather than single
                    'doctype-first': true,                 
                    // Force the DOCTYPE declaration to come first in the document
                    'spec-char-escape': true,              
                    // Force special characters to be escaped
                    'id-unique': true,                     
                    // Prevent using the same ID multiple times in a document
                    'head-script-disabled': true,          
                    // Prevent script tags being loaded in the  for performance reasons
                    'style-disabled': true                 
                    // Prevent style tags. CSS should be loaded through 
                },
                src: ['index.html']
            }
        },

        uglify: {
            build: {
                files: {
                    'build/script.js': [
                        'bower_components/jquery/jquery.min.js',
                        'bower_components/skrollr/dist/skrollr.min.js',
                        'bower_components/bootstrap/js/carousel.js',
                        'script.js'
                    ]
                }
            }
        },
        connect: {
            server: {
              options: {
                  keepalive: true,
                port: 8000,
                hostname: 'localhost',
                base: 'build'
              }
            }
          },
        
        jade: {
          debug: {
            pretty: true,
            options: {
              data: function(dest, src) {
                // Return an object of data to pass to templates
                var locals = require('./locals.json');
                locals.debug = true;
                return locals;
              }
            },
            files: {
              "debug.html": ["templates/index.jade"]
            }
          },
          compile: {
            options: {
              data: function(dest, src) {
                // Return an object of data to pass to templates
                var locals = require('./locals.json');
                locals.debug = false;
                locals.public = true;
                return locals;
              }
            },
            files: {
              "build/index.html": ["templates/index.jade"]
            }
          },
          private: {
            options: {
              data: function(dest, src) {
                // Return an object of data to pass to templates
                var locals = require('./locals.json');
                locals.debug = false;
                locals.public = false;
                locals.futureCompany = "short line that only your new company can see";
                return locals;
              }
            },
            files: {
              "build/great-company.html": ["templates/index.jade"]
            }
          },
        },

    });
    
    grunt.registerTask('default',   ['jade', 'uglify', 'buildcss', 'copy']);
    grunt.registerTask('buildcss',  ['less', 'uncss', 'cssc', 'cssmin']);

};