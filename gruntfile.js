module.exports = function(grunt) {

    //Configure task(s)
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: 'src/js/*.js',
                dest: 'public/js/script.min.js'
            },
            dev: {
                options: {
                    beautify:true,
                    mangle:false,
                    compress: false,
                    preserveComments: 'all'
                },
                src: 'src/js/**/*.js',
                dest: 'public/js/script.min.js'
            }
            
        },
        sass: {
            dev: {
                options: {
                    outputStyle: 'expanded'
                },
                files: {
                    'public/css/styles.css' : 'src/scss/**/*.scss'
                }
            },
            build: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'public/css/styles.css' : 'src/scss/**/*.scss'
                }
            }
        },
        watch: {
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['uglify:dev']
            },
            css: {
                files: ['src/scss/**/*.scss'],
                tasks: ['sass:dev']
            }
        }
    });

    //Load the plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');

    //Register task(s)

    grunt.registerTask('default',['uglify:dev', 'sass:dev']);
    grunt.registerTask('build',['uglify:build', 'sass:build']);
    

};