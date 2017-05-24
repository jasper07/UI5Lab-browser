'use strict';

module.exports = function(grunt) {

    grunt.initConfig({

        dir: {
            src: 'src',
            test: 'test',
            dist: 'dist',
            bower_components: 'bower_components'
        },

        connect: {
            options: {
                port: 8080,
                hostname: '*',
                open: {
                    target: 'http://localhost:8080/test-resources/ui5lab/browser'
                }
            },
            src: {},
            dist: {}
        },

        openui5_connect: {
            src: {
                options: {
                    resources: [
                        '<%= dir.bower_components %>/openui5-sap.ui.core/resources',
                        '<%= dir.bower_components %>/openui5-sap.m/resources',
                        '<%= dir.bower_components %>/openui5-sap.f/resources',
                        '<%= dir.bower_components %>/openui5-sap.ui.layout/resources',
                        '<%= dir.bower_components %>/openui5-themelib_sap_belize/resources',
                        '<%= dir.src %>',
                        '../UI5Lab-library-simple/src',
                        '../StripToastr/dist'
                    ],
                    testresources: [
                        '<%= dir.bower_components %>/openui5-sap.ui.core/test-resources',
                        '<%= dir.bower_components %>/openui5-sap.m/test-resources',
                        '<%= dir.bower_components %>/openui5-sap.f/test-resources',
                        '<%= dir.bower_components %>/openui5-sap.ui.layout/test-resources',
                        '<%= dir.bower_components %>/openui5-themelib_sap_belize/test-resources',
                        '<%= dir.test %>',
                        '../UI5Lab-library-simple/test',
                        '../StripToastr/test'
                    ]
                }
            },
            dist: {
                options: {
                    resources: [
                        '<%= dir.bower_components %>/openui5-sap.ui.core/resources',
                        '<%= dir.bower_components %>/openui5-sap.m/resources',
                        '<%= dir.bower_components %>/openui5-sap.f/resources',
                        '<%= dir.bower_components %>/openui5-sap.ui.layout/resources',
                        '<%= dir.bower_components %>/openui5-themelib_sap_belize/resources',
                        '<%= dir.dist %>/resources'
                    ],
                    testresources: [
                        '<%= dir.bower_components %>/openui5-sap.ui.core/test-resources',
                        '<%= dir.bower_components %>/openui5-sap.m/test-resources',
                        '<%= dir.bower_components %>/openui5-sap.f/test-resources',
                        '<%= dir.bower_components %>/openui5-sap.ui.layout/test-resources',
                        '<%= dir.bower_components %>/openui5-themelib_sap_belize/test-resources',
                        '<%= dir.dist %>/test-resources'
                    ]
                }
            }
        },

        openui5_preload: {
            component: {
                options: {
                    resources: '<%= dir.src %>',
                    dest: '<%= dir.dist %>/resources'
                },
                libraries: true
            }
        },

        clean: {
            dist: '<%= dir.dist %>/'
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= dir.src %>',
                    src: [
                        '**'
                    ],
                    dest: '<%= dir.dist %>/resources'
                }, {
                    expand: true,
                    cwd: '<%= dir.test %>',
                    src: [
                        '**'
                    ],
                    dest: '<%= dir.dist %>/test-resources'
                }]
            }
        },

        eslint: {
            options: { quiet: true },
            src: ['<%= dir.src %>'],
            test: ['<%= dir.test %>'],
            gruntfile: ['Gruntfile.js']
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-openui5');
    grunt.loadNpmTasks('grunt-eslint');

    // Server task
    grunt.registerTask('serve', function(target) {
        grunt.task.run('openui5_connect:' + (target || 'src') + ':keepalive');
    });

    // Linting task
    grunt.registerTask('lint', ['eslint']);

    // Build task
    grunt.registerTask('build', ['openui5_preload', 'copy']);

    // Default task
    grunt.registerTask('default', [
        'serve'
    ]);
};