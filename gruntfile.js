'use strict';

module.exports = function (grunt) {
    var name = 'aeon-ui';

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {});

    // Paths of the files
    var path = {
        src: 'resources',
        dest: 'public',
        dist: 'dist',
        bower: grunt.file.readJSON('./.bowerrc').directory || 'bower_components'
    };
    
    // Files to process with grunt
    var files = {
        vendor: {
            css: {
                src: [ path.bower + '/font-awesome/css/font-awesome.min.css' ],
                dest: path.dest + '/css/vendor.css'
            },
            js: {
                tasks: {
                    jshint: false,
                    uglify: false,
                },
                src: [
                    path.bower + '/showdown/dist/showdown.min.js',
                    
                    path.bower + '/angular/angular.min.js',
                    path.bower + '/angular-animate/angular-animate.min.js',
                    path.bower + '/angular-sanitize/angular-sanitize.min.js',
                    path.bower + '/angular-touch/angular-touch.min.js',
                    
                    path.bower + '/angular-bootstrap/ui-bootstrap-tpls.min.js',
                    path.bower + '/angular-toastr/dist/angular-toastr.tpls.min.js',
                    path.bower + '/angular-ui-router/release/angular-ui-router.min.js',
                    path.bower + '/ng-showdown/dist/ng-showdown.min.js'
                ],
                dest: path.dest + '/js/vendor.js'
            },
            icons: {
                src: '**/*',
                cwd: path.bower + '/font-awesome/fonts/',
                dest: path.dest + '/fonts/'
            }
        },
        'aeon-components': {
            js: {
                watch: path.src + '/scripts/theme/**/*.js',
                src: [
                    path.src + '/scripts/theme/' + name + '.js',
                    path.src + '/scripts/theme/**/*.js'
                ],
                dest: path.dest + '/js/' + name + '.js'
            }
        },
        'aeon-components.bower': {
            js: {
                src: [
                    path.src + '/scripts/theme/' + name + '.js',
                    path.src + '/scripts/theme/**/*.js'
                ],
                dest: path.dist + '/js/' + name + '.js'
            }
        },
        'aeon-ui': {
            less: {
                watch: path.src + '/styles/theme/**/*.less',
                src: name + '.less',
                cwd: path.src + '/styles/theme/',
                dest: path.dest + '/css/'
            }
        },
        'aeon-ui.bower': {
            less: {
                src: name + '.less',
                cwd: path.src + '/styles/theme/',
                dest: path.dist + '/css/'
            }
        },
        wiki: {
            assets: {
                watch: path.src + '/assets/**/*',
                expand: true,
                src: ['**/*'],
                cwd: path.src + '/assets',
                dest: path.dest
            },
            js: {
                watch: path.src + '/scripts/wiki/**/*.js',
                src: [
                    path.src + '/scripts/wiki/wiki.js',
                    path.src + '/scripts/wiki/**/*.js'
                ],
                dest: path.dest + '/js/wiki.js'
            },
            less: {
                watch: path.src + '/styles/wiki/**/*.less',
                src: 'wiki.less',
                cwd: path.src + '/styles/wiki/',
                dest: path.dest + '/css/'
            },
            html: {
                watch: path.src + '/views/**/*.html',
                src: '**/*',
                cwd: path.src + '/views/',
                dest: path.dest
            }
        }
    };
    
    var config = {
        // To clean the dest folder
        clean: {
            dest: path.dest
        },
        // To concatenate files
        concat: {},
        // To run tasks in parallel
        concurrent: {
            build: [],
            min: []
        },
        // To copy the static files
        copy: {},
        // To validate JS files with JSHint
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            grunt: {
                src: 'gruntfile.js'
            }
        },
        // To compile LESS files to CSS
        less: {
            dev: {
                options: {
                    compress: false,
                    yuicompress: false,
                    optimization: 2
                },
                files: []
            },
            dist: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: []
            }
        },
        // To minify JS files
        uglify: {},
        // To run tasks when files change
        watch: {
            options: { livereload: true },
            gruntfile: { files: ['gruntfile.js'] }
        }
    };
    
    // Create of the grunt configuration
    function createGruntConfig(files) {
        for(var name in files) {
            var group = files[name];
            
            for (var type in group) {
                if (type !== 'tasks') {
                    var filetype = group[type];
                    var taskname = name + '-' + type;

                    switch (type) {

                        // CSS Files (concat)
                        case 'css':
                            // Config for "concat"
                            config.concat[taskname] =  {
                                src: filetype.src,
                                dest: filetype.dest
                            };
                            config.concurrent.build.push('concat:' + taskname);

                            // If config watch
                            if (filetype.hasOwnProperty('watch')) {
                                config.watch[taskname] = {
                                    files: filetype.watch,
                                    tasks: [ 'concat:' + taskname ]
                                };
                            }
                            break;

                        // JS Files (concat,jshint,uglify)
                        case 'js':
                            // Config for "concat"
                            config.concat[taskname] = {
                                src: filetype.src,
                                dest: filetype.dest
                            };
                            config.concurrent.build.push('concat:' + taskname);

                            // Config for "jshint"
                            if (
                                !filetype.hasOwnProperty('tasks') || 
                                filetype.hasOwnProperty('tasks') && filetype.tasks.jshint !== false
                            ) {
                                config.jshint[taskname] = {
                                    src: filetype.src
                                };
                            }

                            // Config for "uglify"
                            if (
                                !filetype.hasOwnProperty('tasks') || 
                                filetype.hasOwnProperty('tasks') && filetype.tasks.uglify !== false
                            ) {
                                config.uglify[taskname] =  {
                                    src: filetype.dest,
                                    dest: filetype.dest
                                };
                                config.concurrent.min.push('uglify:' + taskname);
                            }

                            // If config watch
                            if (filetype.hasOwnProperty('watch')) {
                                config.watch[taskname] = {
                                    files: filetype.watch,
                                    tasks: [
                                        'jshint:' + taskname,
                                        'concat:' + taskname
                                    ]
                                };
                            }
                            break;

                        case 'less':
                            // Config for "less"
                            for (var build in config.less) {
                                config.less[build].files.push({
                                    expand: true,
                                    src: filetype.src,
                                    cwd: filetype.cwd,
                                    dest: filetype.dest,
                                    ext: '.css'
                                });
                            }

                            // If config watch
                            if (filetype.hasOwnProperty('watch')) {
                                config.watch[taskname] = {
                                    files: filetype.watch,
                                    tasks: [ 'less:dev' ]
                                };
                            }
                            break;

                        // Assets
                        default:
                            // Config for "copy"
                            config.copy[taskname] = {
                                expand: true,
                                src: filetype.src,
                                cwd: filetype.cwd,
                                dest: filetype.dest
                            };

                            // If config watch
                            if (filetype.hasOwnProperty('watch')) {
                                config.watch[taskname] = {
                                    files: filetype.watch,
                                    tasks: [ 'copy:' + taskname ]
                                };
                            }
                            break;
                    }
                }
            }
        }
        
        return config;
    }

    // Configuration for all the tasks
    grunt.initConfig(createGruntConfig(files));

    // Register Tasks
    grunt.registerTask('dev', 'Compile with dev configuration then start a watch', [
        'build:dev',
        'watch'
    ]);

    grunt.registerTask('dist', 'Compile with dist configuration', [
        'build:dist'
    ]);

    grunt.registerTask('build', function (target) {
        var build = (target === 'dev') ?
            ['jshint', 'clean', 'copy','less:dev', 'concurrent:build']:
            ['jshint', 'clean', 'copy','less:dist', 'concurrent:build', 'concurrent:min'];

        grunt.task.run(build);
    });

    grunt.registerTask('default', [
        'build'
    ]);

};